import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const registerUser = (data: { email: string; password: string }) =>
  API.post("/auth/register", data);

export const loginUser = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);
