import { useEffect, useState } from "react";
import { getVendorBookings, updateBookingStatus } from "../api/booking";
import { MapPin, Phone, CalendarDays, Clock, User } from "lucide-react";

export default function VendorBookings(){

  const [bookings,setBookings] = useState([]);

  useEffect(()=>{
    loadBookings();
  },[]);

  const loadBookings = async ()=>{
    const res = await getVendorBookings();
    setBookings(res.data);
  };

  const handleStatus = async (id,status)=>{
    await updateBookingStatus(id,status);
    loadBookings();
  };

  const statusColor = (status)=>{
    switch(status){
      case "pending": return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "accepted": return "bg-green-50 text-green-600 border-green-200";
      case "cancelled": return "bg-red-50 text-red-600 border-red-200";
      case "completed": return "bg-blue-50 text-blue-600 border-blue-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">Service Requests</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {bookings.map(b=>(
          <div
            key={b._id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 p-6 flex flex-col justify-between"
          >

            {/* HEADER */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {b.service?.title || "Service Deleted"}
              </h2>

              <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full border capitalize ${statusColor(b.status)}`}>
                {b.status}
              </span>
            </div>

            {/* DETAILS */}
            <div className="space-y-2 text-sm text-gray-600">

              <div className="flex items-center gap-2">
                <User size={16}/> {b.customer?.name || "Unknown user"}
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16}/> {b.contactNumber}
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16}/> {b.address}, {b.city} - {b.pincode}
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={16}/> {new Date(b.bookingDate).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16}/> {b.timeSlot}
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${b.address} ${b.city} ${b.pincode}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm hover:underline inline-block mt-2"
              >
                View Location →
              </a>

            </div>

            {/* ACTION BUTTONS */}
            {b.status==="pending" && (
              <div className="flex gap-3 mt-6">
                <button
                  onClick={()=>handleStatus(b._id,"accepted")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Accept
                </button>

                <button
                  onClick={()=>handleStatus(b._id,"cancelled")}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Reject
                </button>
              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}
