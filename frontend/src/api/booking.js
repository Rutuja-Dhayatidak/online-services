import API from "./axios";

// create booking
export const createBooking = (data)=>{
  return API.post("/bookings",data);
};

// customer bookings
export const getMyBookings = ()=>{
  return API.get("/bookings/my");
};

// ⭐ vendor bookings (ADD THIS)
export const getVendorBookings = ()=>{
  return API.get("/bookings/vendor");
};

// vendor update booking status
export const updateBookingStatus = (id,status)=>{
  return API.put(`/bookings/${id}/status`,{status});
};

// customer cancel booking
export const cancelBooking = (id)=>{
  return API.put(`/bookings/${id}/cancel`);
};
