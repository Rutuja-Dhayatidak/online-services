import API from "./axios";

// GET SERVICES (pagination + search + category)
export const getAllServices = (page=1,search="",category="All")=>{
  return API.get(
    `/services?page=${page}&limit=10&search=${search}&category=${category}`
  );
};
