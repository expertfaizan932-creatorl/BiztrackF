export interface MotService {
  id: string;
  tenant_id: string;
  name: string;
  description?: string | null;
  price: number;
  is_active: boolean;
  display_order: number;
}

export interface MotServiceCreate {
  name: string;
  description?: string | null;
  price: number;
  is_active?: boolean;
  display_order?: number;
}

export interface MotServiceUpdate {
  name?: string;
  description?: string | null;
  price?: number;
  is_active?: boolean;
  display_order?: number;
}

export interface MotServicesResponse {
  items: MotService[];
  total: number;
}