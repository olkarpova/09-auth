import axios from "axios";

export const nextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,  // localhost:3000/api → Route Handlers
  withCredentials: true,  // КЛЮЧОВО! Браузер сам додає cookies до запитів
});



