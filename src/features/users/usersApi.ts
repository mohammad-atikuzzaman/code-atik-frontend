import axios from "axios";

export const getUsers = async (token: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
