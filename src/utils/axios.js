import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:4444",
  // baseURL: 'https://cerulean-ostrich-gear.cyclic.app',
  baseURL: "https://mern-portfolio-back.vercel.app",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
