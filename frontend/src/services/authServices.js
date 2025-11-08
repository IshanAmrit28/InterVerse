import axios from "axios";

const API_URL = "http://localhost:3000/api/auth"; // adjust if backend URL differs

// ✅ Signup user
export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// ✅ Login user
export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// ✅ Logout user
export const logout = () => {
  localStorage.removeItem("token");
};

// ✅ Get stored JWT token
export const getToken = () => {
  return localStorage.getItem("token");
};

// ✅ Get current logged-in user (decoded from token if needed)
export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const user = JSON.parse(window.atob(base64));
    return user;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// ✅ Attach token to axios requests automatically (optional)
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
