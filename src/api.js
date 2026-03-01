import axios from "axios";

const BASE_URL = "https://api.vnselectronics.az/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    const status = error.response.status;
    const isAuthEndpoint =
      originalRequest?.url?.includes("/customer/login") ||
      originalRequest?.url?.includes("/auth/refresh/customer") ||
      originalRequest?.url?.includes("/customer/logout");

    if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = api.post("/auth/refresh/customer");
        }

        await refreshPromise;

        isRefreshing = false;
        refreshPromise = null;

        return api(originalRequest);
      } catch (refreshErr) {
        isRefreshing = false;
        refreshPromise = null;

        try {
          await api.post("/customer/logout");
        } catch (e) { 
          console.log(e)
        }
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;