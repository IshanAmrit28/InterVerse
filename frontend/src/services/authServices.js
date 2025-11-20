// frontend/src/services/authServices.js
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../constants";

const USER_KEY = "user";
const TOKEN_KEY = "token";
const EXPIRY_KEY = "user_expiry";

// Helper to set expiration (24 hours from now)
const setSessionExpiry = () => {
  const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 1 day in ms
  localStorage.setItem(EXPIRY_KEY, expiryTime.toString());
};

// Check if session is valid
const isSessionValid = () => {
  const expiryStr = localStorage.getItem(EXPIRY_KEY);
  if (!expiryStr) return false;

  const expiry = parseInt(expiryStr, 10);
  return Date.now() < expiry;
};

export const signup = async (userData) => {
  const response = await axios.post(
    `${API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNUP}`,
    userData
  );
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(
    `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`,
    credentials
  );

  if (response.data.token && response.data.user) {
    // Store core auth data
    localStorage.setItem(TOKEN_KEY, response.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
    setSessionExpiry();
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(EXPIRY_KEY);
};

export const getCurrentUser = () => {
  if (!isSessionValid()) {
    logout();
    return null;
  }

  const userStr = localStorage.getItem(USER_KEY);
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

export const getToken = () => {
  if (!isSessionValid()) return null;
  return localStorage.getItem(TOKEN_KEY);
};
