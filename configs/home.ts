// types/navigation.ts
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
export interface rdv {
  service: number | string;
  sousService: number | string;
  timeSlot: number | string;
  date: string | null;
  heure: string | null;
  nom: string;
  image: string;
  adresse: string;
}
export type HomeStackParamList = {
  MainTabs: { screen?: string };
  Home: undefined;
  Search: undefined;
  Detail: { id: string | number };
  Confirme: { rdv: rdv };
  Succes: undefined;
  Code: { rdv: any };
  Compte: undefined;
  Langue: undefined;
  Notification: undefined;
};

export type HomeStackNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;
