import { api } from "./api";

const registerReservation = async (reservationData: any) => {
  try {
    const response = await api.post("/reservation/register", reservationData);
    return response.data as {
      message: string;
      id: number | null;
      qrToken: string | null;
    };
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la réservation :", error);
    throw error;
  }
};

export default {
  registerReservation,
};
