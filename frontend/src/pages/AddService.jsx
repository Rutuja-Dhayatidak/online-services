import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createService } from "../api/vendor";

export default function AddService(){

  const navigate = useNavigate();

  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState("");
  const [error,setError] = useState("");

  const [form,setForm] = useState({
    title:"",
    description:"",
    category:"",
    price:"",
    duration:"",
    location:""
  });

  const serviceCategories = [
    "Electrician",
    "Plumber",
    "Cleaner",
    "AC Repair"
  ];

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
    setError("");
    setMessage("");
  };

  // validation
  const validateForm = ()=>{
    if(!form.title.trim()) return "Service title required";
    if(!form.category) return "Please select category";
    if(!form.price || form.price <= 0) return "Enter valid price";
    if(!form.location.trim()) return "Location required";
    return null;
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const validationError = validateForm();
    if(validationError){
      setError(validationError);
      return;
    }

    try{
      setLoading(true);

      await createService({
        ...form,
        price:Number(form.price)
      });

      setMessage("Service created successfully ✅");

      // reset form
      setForm({
        title:"",
        description:"",
        category:"",
        price:"",
        duration:"",
        location:""
      });

      // redirect after short delay
      setTimeout(()=>{
        navigate("/vendor/dashboard");
      },1000);

    }catch(err){
      setError(err.response?.data?.message || "Failed to create service ❌");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">

        <h1 className="text-3xl font-bold mb-2">Create New Service</h1>
        <p className="text-gray-500 mb-6">Add your service details</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-600 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="text-sm text-gray-600">Service Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="AC Repair"
              className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-gray-600">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select Category</option>
              {serviceCategories.map((cat,i)=>(
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              name="description"
              value={form.description}
              rows="3"
              onChange={handleChange}
              placeholder="Describe your service..."
              className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Price & Duration */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-600">Price *</label>
              <div className="flex items-center border rounded-lg mt-1">
                <span className="px-3 text-gray-500">₹</span>
                <input
                  name="price"
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="500"
                  className="w-full py-2 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Duration</label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="2 hours"
                className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-gray-600">Service Location *</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Pune"
              className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Service..." : "Create Service"}
          </button>

        </form>
      </div>
    </div>
  );
}
