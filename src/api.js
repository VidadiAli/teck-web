import axios from "axios";

const BASE_URL = "https://teck-web-back-1.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor → hər requestə access token əlavə et
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("customerAccessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor → access token expired olduqda refresh et
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("customerRefreshToken");
      if (!refreshToken) return Promise.reject(error);

      try {
        const res = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
        const newAccessToken = res.data.accessToken;

        localStorage.setItem("customerAccessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("customerAccessToken");
        localStorage.removeItem("customerRefreshToken");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
