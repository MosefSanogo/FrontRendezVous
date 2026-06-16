export interface Service {
  id: number;
  nom: string;
  description: string;
  ville_id: number;
  adresse: string;
  image_url: string;
  category: string;
  tel: string;
  email: string;
  actif: number;
  created_at: string; // ou Date si tu pars en Date
  ville_name: string;
}

export interface ServiceView {
  id: number;
  agencyName: string;
  address: string;
  phone: string;
  email: string;
  ville: string;
  img: string;
  category: string;
  welcomeMessage: string;
}

export interface SousService {
  id: number;
  service_id: number;
  nom: string;
  actif: number;
}
