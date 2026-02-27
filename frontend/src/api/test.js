import API from "./axios";

export const testJWT  = ()=>{
  return API.get("/auth/me");   // backend me protected route hona chahiye
};
