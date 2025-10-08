import axios from "axios";
import Cookies from "js-cookie";


const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // send cookies automatically
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Response interceptor: auto logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Session expired. Logging out...");

      // Clear storage and cookies
      localStorage.clear();
      Cookies.remove("access");
      Cookies.remove("refresh");

      // Redirect to login
      window.location.href = "/Login";
    }
    return Promise.reject(error);
  }
);

export default api;
