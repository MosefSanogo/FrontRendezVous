export interface TimeSlot {
  id: number;
  service_id: number;
  sous_service_id: number;
  date: string;
  heure: string;
  capacity_total: number;
  capacity_restante: number;
  create_at: string;
}

export interface AvailabilityDay {
  date: string;
  total_slots: number;
  time_slots: TimeSlot[];
}
