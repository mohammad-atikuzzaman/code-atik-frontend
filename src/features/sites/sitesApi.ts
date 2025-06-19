import axios from "axios";

export const getSites = async (token: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/total-sites`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
