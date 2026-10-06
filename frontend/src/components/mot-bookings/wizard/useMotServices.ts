"use client";

import { useEffect, useState } from "react";
import motBookingService from "@/src/services/MotBookingService";
import {
  DEFAULT_MOT_SERVICE_OPTIONS,
  type MotServiceOption,
} from "./wizardTypes";
import { setMotServiceOptions } from "./wizardUtils";

let cachedServices: MotServiceOption[] | null = null;
let loadPromise: Promise<MotServiceOption[]> | null = null;
const listeners = new Set<(services: MotServiceOption[]) => void>();

function toOption(s: {
  id: string;
  name: string;
  description?: string | null;
  price: number | string;
  display_order: number;
}): MotServiceOption {
  return {
    id: s.id,
    label: s.name,
    description: s.description || "",
    price: Number(s.price),
  };
}

async function fetchPublicServices(): Promise<MotServiceOption[] | null> {
  try {
    const match = window.location.pathname.match(/^\/([^/]+)\/mot\//);
    if (!match) return null;
    const res = await motBookingService.getPublicServices(match[1]);
    return [...res.items]
      .sort(
        (a, b) =>
          a.display_order - b.display_order || a.name.localeCompare(b.name),
      )
      .map(toOption);
  } catch {
    return null;
  }
}

async function fetchServices(): Promise<MotServiceOption[]> {
  try {
    const res = await motBookingService.getActiveServices();
    const mapped = [...res.items]
      .sort(
        (a, b) =>
          a.display_order - b.display_order || a.name.localeCompare(b.name),
      )
      .map(toOption);
    if (mapped.length > 0) return mapped;
  } catch {
    // fall through to public endpoint (e.g. unauthenticated booking wizard)
  }
  const publicServices = await fetchPublicServices();
  if (publicServices && publicServices.length > 0) return publicServices;
  if (cachedServices) return cachedServices;
  return DEFAULT_MOT_SERVICE_OPTIONS;
}

function loadServices(): Promise<MotServiceOption[]> {
  if (!loadPromise) {
    loadPromise = fetchServices().then((services) => {
      cachedServices = services;
      setMotServiceOptions(services);
      listeners.forEach((l) => l(services));
      return services;
    });
  }
  return loadPromise;
}

export function refreshMotServices(): Promise<MotServiceOption[]> {
  loadPromise = null;
  return loadServices();
}

export function useMotServices(): MotServiceOption[] {
  const [services, setServices] = useState<MotServiceOption[]>(
    cachedServices ?? [],
  );

  useEffect(() => {
    const listener = (s: MotServiceOption[]) => setServices(s);
    listeners.add(listener);
    if (cachedServices) {
      setServices(cachedServices);
    } else {
      loadServices();
    }
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return services;
}
