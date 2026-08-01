import axios from "axios";

const instance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://mern-portfolio-back.vercel.app",
  timeout: 20000,
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      window.localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export default instance;
