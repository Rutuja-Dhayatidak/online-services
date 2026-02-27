import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function AddAvailability(){

  const {id} = useParams();

  const [date,setDate] = useState("");
  const [slots,setSlots] = useState([]);
  const [msg,setMsg] = useState("");

  const timeSlots = [
    "9 AM - 11 AM",
    "11 AM - 1 PM",
    "2 PM - 4 PM",
    "6 PM - 8 PM"
  ];

  const toggleSlot = (slot)=>{
    if(slots.includes(slot))
      setSlots(slots.filter(s=>s!==slot));
    else
      setSlots([...slots,slot]);
  };

  const handleSave = async ()=>{
    if(!date || slots.length===0){
      setMsg("Select date & slots");
      return;
    }

    try{
      await API.post(`/services/${id}/availability`,{
        date,
        slots
      });

      setMsg("Availability saved ✅");
      setDate("");
      setSlots([]);

    }catch(err){
      setMsg(err.response?.data?.message || "Failed ❌");
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto">

      <h2 className="text-2xl font-bold mb-4">Add Availability</h2>

      <input
        type="date"
        value={date}
        onChange={e=>setDate(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <div className="grid grid-cols-2 gap-3 mb-4">
        {timeSlots.map(slot=>(
          <button
            key={slot}
            onClick={()=>toggleSlot(slot)}
            className={`p-2 border rounded ${
              slots.includes(slot) ? "bg-indigo-600 text-white" : ""
            }`}
          >
            {slot}
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Save Availability
      </button>

      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}
