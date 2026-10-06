"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2, Wrench, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Switch } from "@/src/components/ui/switch";
import { Badge } from "@/src/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import motBookingService from "@/src/services/MotBookingService";
import type { MotService } from "@/src/models/mot/MotService";
import { refreshMotServices } from "@/src/components/mot-bookings/wizard/useMotServices";

type ServiceFormState = {
  name: string;
  description: string;
  price: string;
};

const EMPTY_FORM: ServiceFormState = { name: "", description: "", price: "" };

export function MotServicesManagerCard() {
  const [services, setServices] = useState<MotService[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<MotService | null>(null);
  const [form, setForm] = useState<ServiceFormState>(EMPTY_FORM);
  const [deleting, setDeleting] = useState<MotService | null>(null);

  const loadServices = useCallback(async () => {
    try {
      const res = await motBookingService.getServices(true);
      setServices(res.items);
    } catch {
      toast.error("Failed to load MOT services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const syncWizardCache = async () => {
    try {
      await refreshMotServices();
    } catch {
      // ignore
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (service: MotService) => {
    setEditing(service);
    setForm({
      name: service.name,
      description: service.description || "",
      price: String(Number(service.price)),
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    const name = form.name.trim();
    const price = Number(form.price);
    if (!name) {
      toast.error("Service name is required");
      return;
    }
    if (!Number.isFinite(price) || price < 0) {
      toast.error("Enter a valid price");
      return;
    }

    setSaving(true);
    try {
      if (editing) {
        await motBookingService.updateService(editing.id, {
          name,
          description: form.description.trim() || null,
          price,
        });
        toast.success("Service updated");
      } else {
        await motBookingService.createService({
          name,
          description: form.description.trim() || null,
          price,
          display_order:
            services.length > 0
              ? Math.max(...services.map((s) => s.display_order)) + 1
              : 1,
        });
        toast.success("Service added");
      }
      setFormOpen(false);
      await loadServices();
      await syncWizardCache();
    } catch (err) {
      const detail =
        (err as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || (editing ? "Failed to update service" : "Failed to add service");
      toast.error(detail);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (service: MotService, isActive: boolean) => {
    const previous = services;
    setServices((prev) =>
      prev.map((s) => (s.id === service.id ? { ...s, is_active: isActive } : s)),
    );
    try {
      await motBookingService.updateService(service.id, { is_active: isActive });
      toast.success(
        isActive
          ? `"${service.name}" is now visible in booking`
          : `"${service.name}" hidden from booking`,
      );
      await syncWizardCache();
    } catch {
      setServices(previous);
      toast.error("Failed to update service status");
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setSaving(true);
    try {
      await motBookingService.deleteService(deleting.id);
      toast.success("Service deleted");
      setDeleting(null);
      await loadServices();
      await syncWizardCache();
    } catch {
      toast.error("Failed to delete service");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wrench className="h-5 w-5 text-primary" />
            MOT Services &amp; Prices
          </CardTitle>
          <Button size="sm" onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage the services customers can select during MOT booking. Changes
          apply to new bookings.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading services...
          </div>
        ) : services.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No services yet. Click &quot;Add Service&quot; to create your first
            one.
          </p>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className={`flex flex-wrap items-center gap-3 rounded-xl border p-4 transition-opacity ${
                service.is_active ? "" : "opacity-60"
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{service.name}</span>
                  {!service.is_active && (
                    <Badge variant="secondary">Hidden</Badge>
                  )}
                </div>
                {service.description && (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                )}
              </div>
              <span className="w-24 text-right font-bold text-primary">
                £{Number(service.price).toFixed(2)}
              </span>
              <div className="flex items-center gap-2">
                <Switch
                  checked={service.is_active}
                  onCheckedChange={(checked) =>
                    handleToggleActive(service, checked)
                  }
                  aria-label="Toggle active"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => openEdit(service)}
                  aria-label="Edit service"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setDeleting(service)}
                  aria-label="Delete service"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Service" : "Add Service"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mot-service-name">Service name</Label>
              <Input
                id="mot-service-name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g. Oil & Filter Change"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mot-service-description">Description</Label>
              <Input
                id="mot-service-description"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Optional short description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mot-service-price">Price (£)</Label>
              <Input
                id="mot-service-price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, price: e.target.value }))
                }
                placeholder="0.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFormOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editing ? "Save Changes" : "Add Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && setDeleting(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete service?</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{deleting?.name}&quot; will be permanently removed. Bookings
              that already selected it keep their saved price.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={saving}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={saving}>
              {saving ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
