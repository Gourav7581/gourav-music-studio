import axios from "axios";

// Change this environment variable to switch between local and live API.
export const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://gourav-music-studio.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
