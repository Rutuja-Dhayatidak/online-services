import { useEffect, useState } from "react";
import { getAllUsers, approveVendor } from "../api/admin";
import { Link } from "react-router-dom";

export default function AdminUsers(){

  const [vendors,setVendors] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    fetchUsers();
  },[]);

  const fetchUsers = async ()=>{
    try{
      const res = await getAllUsers();

      // sirf vendors filter
      const onlyVendors = res.data.filter(user=>user.role==="vendor");

      // pending first
      onlyVendors.sort((a,b)=>a.isApproved - b.isApproved);

      setVendors(onlyVendors);
      setLoading(false);

    }catch(err){
      console.log(err);
    }
  };

  const handleApprove = async (id)=>{
    try{
      await approveVendor(id);
      alert("Vendor Approved ✅");
      fetchUsers();
    }catch(err){
      console.log(err);
      alert("Approval Failed ❌");
    }
  };

  if(loading) return <p className="p-10 text-lg">Loading vendors...</p>;

  return (
    <div className="p-10 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">Vendor Approval Panel</h1>

        <div className="flex gap-3">
          {/* Back */}
          <Link
            to="/admin/dashboard"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Dashboard
          </Link>

          {/* Refresh */}
          <button
            onClick={fetchUsers}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Refresh
          </button>
        </div>

      </div>


      {/* Vendor List */}
      <div className="grid gap-5 max-w-3xl">

        {vendors.length === 0 && (
          <p className="text-gray-500">No vendors found</p>
        )}

        {vendors.map(vendor=>(
          <div key={vendor._id}
               className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center">

            <div>
              <p className="font-semibold text-lg">{vendor.name}</p>
              <p className="text-sm text-gray-500">{vendor.email}</p>

              {!vendor.isApproved ? (
                <p className="text-yellow-600 font-medium mt-1">
                  ⏳ Pending Approval
                </p>
              ):(
                <p className="text-green-600 font-medium mt-1">
                  ✔ Approved
                </p>
              )}
            </div>

            {!vendor.isApproved && (
              <button
                onClick={()=>handleApprove(vendor._id)}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Approve
              </button>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}
