import API from "./axios";

/* =========================
   USERS MANAGEMENT
========================= */

// sab users (vendors + customers + admin)
export const getAllUsers = ()=>{
  return API.get("/admin/users");
};

// vendor approve
export const approveVendor = (id)=>{
  return API.put(`/admin/approve/${id}`);
};



/* =========================
   BOOKINGS MANAGEMENT
========================= */

// sab bookings (admin view)
export const getAllBookings = ()=>{
  return API.get("/admin/bookings");
};



/* =========================
   DASHBOARD STATS
========================= */

// analytics / counts
export const getDashboardStats = ()=>{
  return API.get("/admin/stats");
};
