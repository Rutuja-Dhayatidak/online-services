import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PendingApproval from "./pages/PendingApproval";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminVendors from "./pages/AdminVendors";

import VendorDashboard from "./pages/VendorDashboard";
import AddService from "./pages/AddService";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import AddAvailability from "./pages/AddAvailability";
import VendorBookings from "./pages/VendorBookings";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pending" element={<PendingApproval />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:id" element={<ServiceDetails />} />

      {/* CUSTOMER */}
      <Route path="/my-bookings" element={
        <ProtectedRoute role="customer">
          <MyBookings />
        </ProtectedRoute>
      } />

      {/* ADMIN */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />

      <Route path="/admin/users" element={
        <ProtectedRoute role="admin">
          <AdminUsers />
        </ProtectedRoute>
      } />

      <Route path="/admin/vendors" element={
        <ProtectedRoute role="admin">
          <AdminVendors />
        </ProtectedRoute>
      } />

      {/* VENDOR */}
      <Route path="/vendor/dashboard" element={
        <ProtectedRoute role="vendor">
          <VendorDashboard />
        </ProtectedRoute>
      } />

      <Route path="/vendor/add-service" element={
        <ProtectedRoute role="vendor">
          <AddService />
        </ProtectedRoute>
      } />

      <Route path="/vendor/service/:id/availability" element={
        <ProtectedRoute role="vendor">
          <AddAvailability />
        </ProtectedRoute>
      } />

      <Route path="/vendor/bookings" element={
        <ProtectedRoute role="vendor">
          <VendorBookings />
        </ProtectedRoute>
      } />

    </Routes>
  );
}

export default App;
