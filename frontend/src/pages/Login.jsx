import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

export default function Login() {
const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message,setMessage] = useState("");

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {
      const res = await loginUser(form);

      // token save
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));

      setMessage("Login Successful ✅");
      const user = res.data.user;

setTimeout(()=>{

  if(user.role === "admin"){
    navigate("/admin/dashboard");
  }
  else if(user.role === "vendor" && !user.isApproved){
    navigate("/pending");
  }
  else if(user.role === "vendor" && user.isApproved){
    navigate("/vendor/dashboard");
  }
  else{
    navigate("/services");
  }

},800);

    } 
    catch (err) {

  const errorMessage = err.response?.data?.message;

  if(errorMessage === "Vendor not approved by admin"){
    setMessage("⏳ Your vendor account is under review. Please wait for admin approval.");
  }
  else if(errorMessage === "Invalid credentials"){
    setMessage("❌ Wrong email or password");
  }
  else{
    setMessage(errorMessage || "Login failed");
  }
}

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {message && (
          <p className="text-center mb-4 font-semibold text-indigo-600">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="email"
            type="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?
          <Link to="/" className="text-indigo-600 font-medium ml-1 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
