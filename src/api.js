import axios from "axios";

const BASE_URL = "https://api.vnselectronics.az/api"; // backend URL
const getAccessToken = () => localStorage.getItem("customerAccessToken");
const getRefreshToken = () => localStorage.getItem("customerRefreshToken");
const setAccessToken = (token) => localStorage.setItem("customerAccessToken", token);

const api = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor: access token əlavə et
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: token expired olarsa refresh et
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 və _retry flag yoxdursa refresh et
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        // eyni URL hamı üçün
        const res = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });

        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest); // request-i təkrar et
      } catch (err) {
        // refresh token invalid olduqda logout
        localStorage.removeItem("customerAccessToken");
        localStorage.removeItem("customerRefreshToken");
        window.location.href = "/";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;