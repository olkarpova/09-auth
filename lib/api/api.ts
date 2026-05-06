import axios from "axios";

export const nextServer = axios.create({
  // baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,  // localhost:3000/api → Route Handlers
  baseURL: "/api", //changed 30.04.26
  withCredentials: true,  // КЛЮЧОВО! Браузер сам додає cookies до запитів
});



