import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";

const HOST_NAME = "";

// Create an Axios instance with the base URL
const apiInstance: AxiosInstance = axios.create({
  baseURL: HOST_NAME,
  //   withCredentials: true,
  timeout: 10000, // 10 seconds timeout
});

// Request Interceptor to add Authorization header
apiInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("authToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // console.error("❌ Request error:", error);
    return Promise.reject(error);
  },
);

// Response Interceptor to handle responses globally
apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 401) {
      //   console.warn("⚠️ Unauthorized! Redirecting to login...");
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }

    if (status === 500) {
      //   console.error("❌ Server error (500). Please try again later.");
    }

    return Promise.reject(error);
  },
);

export default apiInstance;
