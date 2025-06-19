import axios from "axios";

export const getStats = async () => {
  const response = await axios(`${import.meta.env.VITE_API_URL}/api/stats`);
  return response.data;
};
