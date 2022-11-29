import axios from "axios";
import { TOKEN_KEY } from "../constants";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem(TOKEN_KEY),
  };
  return config;
});

export default api;
