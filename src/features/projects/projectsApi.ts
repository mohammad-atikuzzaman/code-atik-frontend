import axios from "axios";

export const getProjects = async (token: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/my-sites`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
