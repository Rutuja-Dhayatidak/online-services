import axios from "axios";

const API = axios.create({
  baseURL: "https://online-services-backend.onrender.com/api"
});

// request ke pehle chalega
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
