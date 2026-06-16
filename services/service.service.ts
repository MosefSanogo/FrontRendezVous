import { api } from "./api";

const findAllServices = async () => {
  try {
    const response = await api.get("/service/findAllServices");
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

const findAllSousServices = async (id: number | string) => {
  try {
    const response = await api.get(`/service/findAllSousServices/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sous-services:", error);
    throw error;
  }
};

const getSousServiceActif = async (id: number | string) => {
  try {
    const response = await api.get(`/service/getSousServiceActif/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching active sous-service:", error);
    throw error;
  }
};

const findByServiceId = async (serviceId: number | string) => {
  try {
    const response = await api.get(`/service/findByServiceId/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sous-services by service ID:", error);
    throw error;
  }
};

export default {
  findAllServices,
  findAllSousServices,
  getSousServiceActif,
  findByServiceId,
};
