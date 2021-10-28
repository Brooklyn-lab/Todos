import axios from "axios";

// Наз. - экземпляр
export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
