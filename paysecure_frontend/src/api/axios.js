// api/axios.js
import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Auto refresh on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await axios.post(BASE_URL + "token/refresh/", {}, { withCredentials: true });
        return axiosInstance(error.config); // retry request
      } catch (err) {
        console.error("Session expired, please login again.");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
