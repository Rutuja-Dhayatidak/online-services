import { useParams } from "react-router-dom";
import { useState } from "react";
import { createBooking } from "../api/booking";

export default function ServiceDetails(){

  const {id} = useParams();

  const [form,setForm] = useState({
    bookingDate:"",
    timeSlot:"",
    address:"",
    city:"",
    pincode:"",
    contactNumber:""
  });

  const [msg,setMsg] = useState("");

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleBooking = async ()=>{
  if(!form.bookingDate || !form.timeSlot || !form.address || !form.contactNumber){
    setMsg("Please fill all required fields");
    return;
  }

  try{
    await createBooking({
      serviceId:id,
      ...form
    });

    setMsg("Booking Requested ✅");
  }catch(err){
    setMsg(err.response?.data?.message || "Booking failed ❌");
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">

      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-lg">

        <h1 className="text-2xl font-bold mb-6">Book Service</h1>

        <input
          type="date"
          name="bookingDate"
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
        />

        <select
          name="timeSlot"
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
        >
          <option value="">Select Time Slot</option>
          <option>9 AM - 11 AM</option>
          <option>11 AM - 1 PM</option>
          <option>2 PM - 4 PM</option>
          <option>6 PM - 8 PM</option>
        </select>

        <input
          name="address"
          placeholder="Full Address"
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
        />

        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
        />

        <input
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
        />

        <input
          name="contactNumber"
          placeholder="Contact Number"
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-4"
        />

        <button
          onClick={handleBooking}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg"
        >
          Confirm Booking
        </button>

        {msg && <p className="mt-4 text-center text-indigo-600">{msg}</p>}

      </div>
    </div>
  );
}
