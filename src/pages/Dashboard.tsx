import { mouldData } from "../data/mouldData";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [clientCode, setClientCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const code = localStorage.getItem("clientCode");
    if (code) {
      setClientCode(code);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const data = mouldData.filter(
    (item) => item.clientCode === clientCode
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "In Machine": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Mould Status Dashboard</h2>
        <div className="bg-blue-100 px-4 py-2 rounded-lg">
          <span className="text-sm text-gray-600">Client Code:</span>
          <span className="ml-2 font-bold text-blue-700">{clientCode}</span>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <p className="text-xl text-yellow-700">No Data Found</p>
          <p className="text-gray-600 mt-2">No mould records available for this client code.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <div className="grid grid-cols-2 font-semibold text-gray-700">
                <div>Product</div>
                <div>Status</div>
              </div>
            </div>
            
            {data.map((item, index) => (
              <div key={index} className={`px-6 py-4 ${index !== data.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="grid grid-cols-2 items-center">
                  <div>
                    <h3 className="font-medium text-gray-800">{item.product}</h3>
                    <p className="text-sm text-gray-500">ID: {item.clientCode}-{index + 1}</p>
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Status Legend</h3>
            <div className="flex space-x-4">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Pending</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">In Machine</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}