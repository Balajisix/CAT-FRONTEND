export interface VehicleRegistrationData {
  license_plate: string;
  vehicle_type: string;
  color?: string;
  owner_name?: string;
  confidence?: number;
  detected_class_id?: number;
  image_path?: string;
}

export interface VehicleCheckResult {
  license_plate: string;
  is_authorized: boolean;
  message: string;
  status: 'authorized' | 'unauthorized';
  vehicle_type: string;
  direction: string;
}

export interface AuthorizedVehicle {
  id: number;
  license_plate: string;
  vehicle_type: string;
  color: string;
  owner_name: string;
  authorized: boolean;
  added_on: string;
}

export interface VehicleStatistics {
  total_authorized_vehicles: number;
  vehicle_types_distribution: Record<string, number>;
  recent_entries_24h: number;
  authorized_entries: number;
  unauthorized_entries: number;
  inbound_count: number;
  outbound_count: number;
}

export interface MovementData {
  label: string;
  date?: string;
  inbound: number;
  outbound: number;
}

export interface VehicleMovement {
  id: number;
  license_plate: string;
  vehicle_type: string;
  direction: 'inbound' | 'outbound';
  is_authorized: boolean;
  timestamp: string;
  driver_name: string;
  image_path: string;
}