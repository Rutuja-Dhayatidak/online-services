import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children, role}) {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // not logged in
  if(!token) return <Navigate to="/login" />;

  // role mismatch
  if(role && user?.role !== role)
    return <Navigate to="/login" />;

  return children;
}
