import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVendorServices, deleteService, toggleServiceStatus } from "../api/vendor";
import { getVendorBookings } from "../api/booking";

export default function VendorDashboard(){

  const [services,setServices] = useState([]);
  const [pendingCount,setPendingCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    loadServices();
    loadBookings();
  },[]);

  // load vendor services
  const loadServices = async ()=>{
    try{
      const res = await getVendorServices();
      setServices(res.data);
    }catch(err){
      console.log(err);
    }
  };

  // load vendor bookings & count pending
  const loadBookings = async ()=>{
    try{
      const res = await getVendorBookings();
      const pending = res.data.filter(b=>b.status==="pending").length;
      setPendingCount(pending);
    }catch(err){
      console.log(err);
    }
  };

  // delete service
  const handleDelete = async (id)=>{
    if(!window.confirm("Delete this service?")) return;

    try{
      await deleteService(id);
      loadServices();
    }catch(err){
      console.log(err);
    }
  };

  // enable / disable
  const handleToggle = async (id)=>{
    try{
      await toggleServiceStatus(id);
      loadServices();
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name} 👋</h1>
          <p className="text-gray-500">Manage your services</p>
        </div>

        <div className="flex gap-4">

          {/* Booking Requests */}
          <Link
            to="/vendor/bookings"
            className="relative bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            Requests

            {pendingCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </Link>

          {/* Add Service */}
          <Link
            to="/vendor/add-service"
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
          >
            + Add Service
          </Link>

        </div>
      </div>

      {/* Service List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {services.map(service=>(
          <div key={service._id} className="bg-white shadow-lg rounded-xl p-5">

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{service.title}</h2>

              <span className={`text-xs px-2 py-1 rounded-full
                ${service.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {service.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            <p className="text-gray-500 text-sm">{service.category}</p>

            <p className="font-bold mt-2">₹ {service.price}</p>
            <p className="text-sm text-gray-400">{service.duration}</p>
            <p className="text-sm text-gray-400">{service.location}</p>

            <div className="flex gap-2 mt-4 flex-wrap">

              {/* Toggle */}
              <button
                onClick={()=>handleToggle(service._id)}
                className={`px-3 py-1 rounded-lg text-white ${
                  service.isAvailable ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {service.isAvailable ? "Disable" : "Enable"}
              </button>

              {/* Delete */}
              <button
                onClick={()=>handleDelete(service._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>

              {/* Manage Slots */}
              <Link
                to={`/vendor/service/${service._id}/availability`}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
              >
                Manage Slots
              </Link>

            </div>

          </div>
        ))}

        {services.length === 0 && (
          <p>No services added yet</p>
        )}

      </div>

    </div>
  );
}
