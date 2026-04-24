import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Login() {
  const [city, setCity] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (city.trim() === "" || code.trim() === "") {
      setError("Please enter city name and client code");
      return;
    }
    
    try {
      const response = await api.post("/auth/login", { city, clientId: code });
      localStorage.setItem("clientToken", response.data.token);
      localStorage.setItem("clientCode", code);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
        <div className="bg-brand-600 p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white">Client Login</h2>
            <p className="text-brand-100 mt-2">Access your mould status dashboard</p>
          </div>
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-brand-900/20 rounded-full blur-2xl"></div>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-slate-700 text-sm font-semibold">
              City Name
            </label>
            <input
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              type="text"
              placeholder="Enter your city name"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setError("");
              }}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-slate-700 text-sm font-semibold">
              Client Code
            </label>
            <input
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              type="password"
              placeholder="Enter your client code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-brand-200 hover:bg-brand-700 hover:shadow-brand-300 transition-all active:scale-[0.98]"
          >
            Login to Dashboard
          </button>

          <div className="pt-4 border-t border-slate-100">
             <p className="text-xs text-slate-400 text-center">
               Password is your unique Client Code. Please contact administration for credentials.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
