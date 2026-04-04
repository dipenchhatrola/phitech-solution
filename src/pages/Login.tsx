import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Login() {
  const [code, setCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (code.trim() === "" || mobile.trim() === "") {
      setError("Please enter client code and mobile number");
      return;
    }
    
    try {
      const response = await api.post("/auth/login", { clientId: code, mobile });
      localStorage.setItem("clientToken", response.data.token);
      localStorage.setItem("clientCode", code);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-blue-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Client Login</h2>
          <p className="text-blue-100 mt-2">Access your mould status dashboard</p>
        </div>
        
        <div className="p-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Client Code
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              placeholder="Enter your client code (e.g., C141)"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Mobile Number (Password)
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="password"
              placeholder="Enter your registered mobile"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                setError("");
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Login to Dashboard
          </button>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Demo credentials: 141, 142, 143
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
