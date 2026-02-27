import { Navigate } from "react-router-dom";

export default function VendorRoute({children}){

  const user = JSON.parse(localStorage.getItem("user"));

  if(user?.role !== "vendor")
    return <Navigate to="/login" />;

  if(!user?.isApproved)
    return <Navigate to="/pending" />;

  return children;
}
