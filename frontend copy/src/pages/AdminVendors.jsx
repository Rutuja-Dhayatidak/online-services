import { useEffect, useState } from "react";
import { getAllUsers } from "../api/admin";

export default function AdminVendors(){

  const [vendors,setVendors] = useState([]);

  useEffect(()=>{
    fetchVendors();
  },[]);

  const fetchVendors = async ()=>{
    try{
      const res = await getAllUsers();

      // sirf approved vendors
      const approved = res.data.filter(
        u => u.role === "vendor" && u.isApproved
      );

      setVendors(approved);

    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">All Vendors</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {vendors.map(vendor=>(
          <div key={vendor._id}
               className="bg-white shadow-lg rounded-xl p-6">

            <h2 className="text-xl font-semibold">{vendor.name}</h2>
            <p className="text-gray-500 text-sm">{vendor.email}</p>

            <p className="text-green-600 mt-2 font-medium">
              Approved Vendor
            </p>

          </div>
        ))}

        {vendors.length === 0 && (
          <p>No vendors found</p>
        )}

      </div>
    </div>
  );
}
