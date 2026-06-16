// types/appointment.ts  ← mets ça dans un fichier partagé
export interface AppointmentItem {
  id: number;
  image: string;
  title: string;
  localisation: string;
  date: string;
  heure: string;
  code: string;
}
