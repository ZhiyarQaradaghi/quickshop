import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token ? "exists" : "missing");

    if (token) {
      console.log("Token parts:", token.split(".").length);
      if (token.split(".").length !== 3) {
        console.error("Invalid token format:", token);
      }
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Authorization header set:", config.headers.Authorization);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
