export interface Brand {
  id: string;
  name: string;
  logo_url: string | null;
  slug: string;
  order: number;
  created_at: string;
}

export interface VehicleCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Vehicle {
  id: string;
  brand_id: string;
  category_id: string | null;
  name: string;
  version: string | null;
  slug: string;
  image_url: string | null;
  price_list: number | null;
  price_financing: number | null;
  includes_iva: boolean;
  fuel_type: string | null;
  transmission: string | null;
  description: string | null;
  features: Record<string, any>;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface UsedVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  kilometers: number;
  transmission: string | null;
  fuel_type: string | null;
  price_cash: number;
  category: string | null;
  image_url: string | null;
  is_offer: boolean;
  branch_id: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface Branch {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  region: string | null;
  phone: string | null;
  email: string | null;
  hours_weekday: string | null;
  hours_saturday: string | null;
  hours_sunday: string | null;
  latitude: number | null;
  longitude: number | null;
  services: string[];
  brands_served: string[];
  created_at: string;
}

export interface BranchStaff {
  id: string;
  branch_id: string;
  name: string;
  position: string | null;
  phone: string | null;
  email: string | null;
  photo_url: string | null;
  created_at: string;
}

export interface QuotationFormData {
  first_name: string;
  last_name: string;
  rut: string;
  phone: string;
  email: string;
  region: string;
  commune: string;
  brand: string;
  model: string;
  version: string;
  branch_id: string;
  message?: string;
}

export interface ServiceAppointmentFormData {
  full_name: string;
  email: string;
  rut: string;
  phone: string;
  brand: string;
  model: string;
  license_plate: string;
  year: number;
  kilometers: number;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  branch_id: string;
  notes?: string;
}

export interface FleetInquiryFormData {
  company_rut: string;
  contact_name: string;
  email: string;
  phone: string;
  units_quantity: number;
  brand: string;
  comments?: string;
}
