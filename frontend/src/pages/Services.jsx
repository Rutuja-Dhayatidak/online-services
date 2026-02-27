import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllServices } from "../api/services";

export default function Services(){

  const [services,setServices] = useState([]);
  const [activeCategory,setActiveCategory] = useState("All");
  const [search,setSearch] = useState("");
  const [page,setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  // load services from backend
  const loadServices = async ()=>{
    try{
      setLoading(true);

      const res = await getAllServices(page,search,activeCategory);

      setServices(res.data.services);
      setTotalPages(res.data.totalPages);

    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    loadServices();
  },[page,activeCategory]);

  // static categories (DB se nahi lena)
  const categories = ["All","AC Repair","Plumbing","Electrician","Cleaning"];

  // 🔐 go to bookings
  const goToBookings = ()=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
    }else{
      navigate("/my-bookings");
    }
  };

  // 🔐 book service
  const handleBook = (id)=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
    }else{
      navigate(`/services/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Browse Services</h1>

        <button
          onClick={goToBookings}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
        >
          My Bookings
        </button>
      </div>

      {/* SEARCH BAR */}
      <form
        className="mb-6"
        onSubmit={(e)=>{
          e.preventDefault();
          setPage(1);
          loadServices();
        }}
      >
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full max-w-xl px-5 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
        />
      </form>

      {/* CATEGORY FILTER */}
      <div className="flex gap-3 flex-wrap mb-8">
        {categories.map(cat=>(
          <button
            key={cat}
            onClick={()=>{
              setActiveCategory(cat);
              setPage(1);
            }}
            className={`px-5 py-2 rounded-full border transition
              ${activeCategory===cat
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 hover:bg-indigo-50"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SERVICES GRID */}
      {loading ? (
        <p>Loading services...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map(service=>(
            <div key={service._id} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition">

              <h2 className="text-xl font-semibold">{service.title}</h2>
              <p className="text-indigo-500 text-sm">{service.category}</p>

              <div className="mt-2 text-sm text-gray-600">
                <p>👨‍🔧 {service.vendor?.name}</p>
                <p>📍 {service.location}</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold text-indigo-600">
                  ₹ {service.price}
                </p>

                <button
                  onClick={()=>handleBook(service._id)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Book
                </button>
              </div>

            </div>
          ))}

          {services.length===0 && (
            <p className="text-gray-500">No services found</p>
          )}

        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-10">

        <button
          onClick={()=>setPage(page-1)}
          disabled={page===1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {page} / {totalPages}
        </span>

        <button
          onClick={()=>setPage(page+1)}
          disabled={page===totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}
