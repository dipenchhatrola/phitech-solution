import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../utils/api";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Dashboard() {
  const [clientCode, setClientCode] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const code = localStorage.getItem("clientCode");
    const token = localStorage.getItem("clientToken");
    if (code && token) {
      setClientCode(code);
      fetchDashboardData();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const [mouldsRes, productsRes] = await Promise.all([
        api.get("/moulds/mine"),
        api.get("/products")
      ]);
      setData(mouldsRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  const getProductImage = (productName: string) => {
    const matchedProduct = products.find(p => p.name === productName);
    if (matchedProduct && matchedProduct.photos && matchedProduct.photos.length > 0) {
      const url = matchedProduct.photos[0];
      if (/^https?:\/\//i.test(url)) return url;
      const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
      const normalizedBase = base.replace(/\/+$/, '');
      const normalizedPath = url.startsWith('/') ? url : `/${url}`;
      return `${normalizedBase}${normalizedPath}`;
    }
    return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop"; // Default placeholder
  };

  const getStatusVisuals = (status: string) => {
    switch(status) {
      case "Pending": 
        return { color: "bg-amber-100 text-amber-800 border-amber-200", dot: "bg-amber-500", progress: 25 };
      case "In Machine": 
        return { color: "bg-blue-100 text-blue-800 border-blue-200", dot: "bg-blue-500 animate-pulse", progress: 65 };
      case "Completed": 
        return { color: "bg-emerald-100 text-emerald-800 border-emerald-200", dot: "bg-emerald-500", progress: 100 };
      default: 
        return { color: "bg-slate-100 text-slate-800 border-slate-200", dot: "bg-slate-500", progress: 0 };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 p-6 md:p-8 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-white/50"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-2 mt-4 md:mt-0">
              Welcome back, <span className="text-brand-600">{clientCode}</span>
            </h2>
            <p className="text-slate-500 text-lg">Track your mould manufacturing progress in real-time.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 text-center">
              <p className="text-sm text-slate-400 font-medium">Active Moulds</p>
              <p className="text-2xl font-bold text-slate-800">{data.length}</p>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white h-96 rounded-3xl shadow-sm animate-pulse m-2 p-6">
                <div className="w-full h-48 bg-slate-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-16 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-sm"
          >
            <div className="w-24 h-24 mb-6 rounded-full bg-brand-50 flex items-center justify-center">
              <svg className="w-12 h-12 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No Active Moulds</h3>
            <p className="text-slate-500 text-center max-w-md">We couldn't find any mould manufacturing records actively assigned to your client code at this moment.</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {data.map((item, index) => {
                const visual = getStatusVisuals(item.status);
                const mouldImage = item.image;
                const imageUrl = mouldImage || getProductImage(item.productId);
                const percentage = typeof item.percentage === "number" ? item.percentage : visual.progress;
                
                return (
                  <motion.div 
                    key={item._id || index} 
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all duration-300"
                  >
                    {/* Image Header */}
                    <div className="h-56 w-full relative overflow-hidden bg-slate-100">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 duration-300 opacity-60"></div>
                      <img 
                        src={imageUrl} 
                        alt={item.productId} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop"; }}
                      />
                      <div className="absolute top-4 right-4 z-20">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/90 border shadow-sm ${visual.color}`}>
                          <span className={`w-2 h-2 rounded-full ${visual.dot}`}></span>
                          {item.status}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-6 z-20">
                        <h3 className="text-2xl font-display font-bold text-white drop-shadow-md">{item.productId}</h3>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Percentage</p>
                          <p className="text-lg font-semibold text-slate-800">{percentage}%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Start Date</p>
                          <p className="text-sm font-medium text-slate-700">
                            {new Date(item.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className="flex justify-between text-xs font-medium mb-2">
                          <span className="text-slate-500">Progress</span>
                          <span className="text-slate-800 font-bold">{percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            className={`h-2.5 rounded-full ${item.status === 'Pending' ? 'bg-amber-400' : item.status === 'In Machine' ? 'bg-blue-500' : 'bg-emerald-500'}`}
                          ></motion.div>
                        </div>
                      </div>
                      
                      <div className="text-center pt-4 mt-6 border-t border-slate-100">
                        <p className="text-xs text-slate-400 font-medium">Expected Completion</p>
                        <p className="text-sm font-bold text-slate-800 mt-1">
                          {new Date(item.expectedCompletion).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric'})}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
