import { User } from "@/types/user";
import { api } from "./api";

const register = async (user: User) => {
  try {
    const response = await api.post("/citoyen/register", user);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export default {
  register,
};
