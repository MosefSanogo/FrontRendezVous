import { api } from "./api";

const generateTimeSlots = async (
  service_id: string | number,
  sous_service_id: string | number,
  date: string,
) => {
  try {
    const response = await api.post("/time-slot/generate", {
      service_id,
      sous_service_id,
      date,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la génération des créneaux horaires :",
      error,
    );
    throw error;
  }
};

export default {
  generateTimeSlots,
};
