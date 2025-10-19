import axios, { AxiosHeaders } from "axios";
import { env } from "../../environment/Environment";

const api = axios.create({
  baseURL: env.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = new AxiosHeaders();
  }

  // const token = localStorage.getItem("one-piece-key");
  // if (token) config.headers.set("Authorization", `Bearer ${token}`);

  return config;
});

export default api;
