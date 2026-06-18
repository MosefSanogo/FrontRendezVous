import { FavorisType } from "@/types/favoris.type";

export const existInFavoris = (
  data: FavorisType[],
  serviceId: number | string,
) => {
  return data.some((v) => v.service_id === serviceId);
};
