import { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = "https://your-backend-name.onrender.com/api/bookings";

  // fetch bookings
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login again");
        return;
      }

      const res = await axios.get(`${API}/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setBookings(res.data);
      setError("");

    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  // first load + auto refresh
  useEffect(() => {
    fetchBookings();

    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  // badge colors
  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    completed: "bg-blue-100 text-blue-700",
    cancelled: "bg-gray-200 text-gray-700"
  };

  if (loading)
    return <div className="p-6 text-center">Loading bookings...</div>;

  return (
    
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {error && (
        <div className="mb-4 text-red-600">{error}</div>
      )}

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="bg-white shadow rounded-xl p-5 mb-4">

            {/* title + status */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {b.service?.title || "Service"}
              </h2>

              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[b.status]}`}>
                {b.status?.toUpperCase()}
              </span>
            </div>

            {/* details */}
            <div className="mt-3 text-gray-600 space-y-1">
              <p>📍 {b.service?.location}</p>
              <p>👨‍🔧 Vendor: {b.vendor?.name}</p>
              <p>📞 {b.contactNumber}</p>
              <p>📅 {new Date(b.bookingDate).toLocaleDateString()}</p>
              <p>⏰ {b.timeSlot}</p>
            </div>

            {/* price */}
            <div className="mt-4 text-lg font-bold text-indigo-600">
              ₹ {b.service?.price}
            </div>

          </div>
        ))
      )}

    </div>
  );
}
