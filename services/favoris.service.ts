import { api } from "./api";

const registerFavoris = async (data: any) => {
  try {
    const response = await api.post("/favoris/register", data);
    return response.data;
  } catch (error) {
    console.log("Erreur de l'enregistrement de favoris" + error);
    throw error;
  }
};

const getAllFavoris = async (id: number | string) => {
  try {
    const response = await api.get(`/favoris/findAllFavoris/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllFavorisWithService = async (id: number | string) => {
  try {
    const response = await api.get(`/favoris/findAllFavorisWithService/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deteleFavoris = async (
  serviceId: number | string,
  citoyenId: number | string,
) => {
  try {
    const response = await api.delete(
      `/favoris/delete/${serviceId}/${citoyenId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  registerFavoris,
  getAllFavoris,
  deteleFavoris,
  getAllFavorisWithService,
};
