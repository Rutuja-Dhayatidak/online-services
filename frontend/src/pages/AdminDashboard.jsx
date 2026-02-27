import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats, getAllUsers } from "../api/admin";

export default function AdminDashboard(){

  const [stats,setStats] = useState(null);
  const [vendors,setVendors] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    fetchStats();
  },[]);

  const fetchStats = async ()=>{
    try{
      const statsRes = await getDashboardStats();
      setStats(statsRes.data);

      const usersRes = await getAllUsers();

      // approved vendors
      const approvedVendors = usersRes.data.filter(
        u => u.role === "vendor" && u.isApproved
      );

      setVendors(approvedVendors);

    }catch(err){
      console.log(err);
    }
  };

  if(!stats) return <p className="p-10 text-lg">Loading dashboard...</p>;

  return (
    <div className="p-10 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card title="Total Users" value={stats.totalUsers} color="blue" />

        {/* Total Vendors with names */}
      <div onClick={()=>navigate("/admin/vendors")} className="cursor-pointer">
  <Card title="Total Vendors" value={stats.totalVendors} color="purple" clickable>
    <p className="text-xs text-indigo-500 mt-2">Click to view vendors</p>
  </Card>
</div>

        {/* Clickable Pending Vendors */}
        <div onClick={()=>navigate("/admin/users")} className="cursor-pointer">
          <Card title="Pending Vendors" value={stats.pendingVendors} color="yellow" clickable>
            <p className="text-xs text-indigo-500 mt-2">Click to manage</p>
          </Card>
        </div>

        <Card title="Total Bookings" value={stats.totalBookings} color="green" />

      </div>
    </div>
  );
}



function Card({title,value,color,clickable,children}){

  const colors = {
    blue:"bg-blue-500",
    purple:"bg-purple-500",
    yellow:"bg-yellow-500",
    green:"bg-green-500"
  };

  return(
    <div className={`bg-white shadow-xl rounded-2xl p-6 transition
    ${clickable ? "hover:scale-105 hover:shadow-2xl" : ""}`}>

      <p className="text-gray-500">{title}</p>

      <h2 className={`text-3xl font-bold mt-2 ${colors[color]} text-white inline-block px-4 py-1 rounded-lg`}>
        {value}
      </h2>

      {children}

    </div>
  );
}
