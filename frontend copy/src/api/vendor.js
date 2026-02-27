import API from "./axios";

/* =========================
   SERVICES (Vendor)
========================= */

// Add new service
export const createService = (data)=>{
  return API.post("/services", data);
};

// Get my services
export const getVendorServices = ()=>{
  return API.get("/services/vendor");
};

// Delete my service
export const deleteService = (id)=>{
  return API.delete(`/services/${id}`);
};

export const toggleServiceStatus = (id)=>{
  return API.patch(`/services/${id}/toggle`);
};


/* =========================
   BOOKINGS (Vendor)
========================= */

// Get bookings of my services
export const getVendorBookings = ()=>{
  return API.get("/vendor/bookings");
};


export const addAvailability = (serviceId,data)=>{
  return API.put(`/services/${serviceId}/availability`,data);
};
