import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function PendingApproval() {

  const navigate = useNavigate();

  useEffect(() => {

    const interval = setInterval(async () => {
      try {
        const res = await API.get("/auth/me"); // protected route

        if(res.data.user.role === "vendor" && res.data.user.isApproved){
          navigate("/vendor/dashboard");
        }

      } catch(err){
        console.log(err);
      }
    }, 3000); // every 3 sec

    return () => clearInterval(interval);

  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md">

        <h1 className="text-2xl font-bold text-yellow-600 mb-4">
          Account Under Review ⏳
        </h1>

        <p className="text-gray-600 mb-6">
          Your vendor account is waiting for admin approval.
          You will be able to access your dashboard once approved.
        </p>

        <p className="text-sm text-gray-400">
          Checking approval status automatically...
        </p>

      </div>
    </div>
  );
}
