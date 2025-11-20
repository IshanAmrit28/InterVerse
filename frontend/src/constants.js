// frontend/src/constants.js
export const API_BASE_URL = "http://localhost:3000";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
    LOGOUT: "/api/auth/logout",
  },
  INTERVIEW: {
    START: "/api/interview/start",
    END: "/api/interview/end",
    // Used for fetching a specific report by ID (GET /api/interview/:reportId)
    GET_REPORT: "/api/interview",
  },
};
