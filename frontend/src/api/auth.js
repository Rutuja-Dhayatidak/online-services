import API from "./axios";

// register
export const registerUser = (data)=>{
  return API.post("/auth/register", data);
};

// login
export const loginUser = (data)=>{
  return API.post("/auth/login", data);
};
