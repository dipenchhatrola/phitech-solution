import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { clearAdminSession, getAdminSession } from "../utils/adminAuth";
import { 
  DashboardOutlined, 
  ToolOutlined, 
  UserOutlined, 
  TagsOutlined, 
  ShoppingOutlined, 
  CommentOutlined, 
  SettingOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  CloseOutlined,
  MailOutlined
} from "@ant-design/icons";

const navBase =
  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const session = getAdminSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin/login");
  };

  const navLinks = [
    { to: "/admin", label: "Dashboard", icon: <DashboardOutlined />, end: true },
    { to: "/admin/mould-status", label: "Mould Status", icon: <ToolOutlined /> },
    { to: "/admin/users", label: "Users", icon: <UserOutlined /> },
    { to: "/admin/categories", label: "Category", icon: <TagsOutlined /> },
    { to: "/admin/products", label: "Product", icon: <ShoppingOutlined /> },
    { to: "/admin/clients", label: "Testimonials", icon: <CommentOutlined /> },
    { to: "/admin/inquiries", label: "Inquiries", icon: <MailOutlined /> },
    { to: "/admin/settings", label: "Settings", icon: <SettingOutlined /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex overflow-hidden w-full">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          bg-slate-900 text-slate-100 flex flex-col h-screen z-[70] transition-all duration-300 ease-in-out
          ${isCollapsed ? "lg:w-20" : "lg:w-64"}
          ${isMobileOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0"}
          fixed lg:relative
        `}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          {/* Sidebar Header */}
          <div className={`px-6 py-7 border-b border-slate-800 flex items-center justify-between ${isCollapsed ? "lg:justify-center lg:px-0" : ""}`}>
            <div className={`transition-all duration-300 ${isCollapsed ? "lg:hidden opacity-0 w-0" : "opacity-100 w-auto"}`}>
              <div className="text-lg font-bold tracking-tight whitespace-nowrap">Phitech Admin</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-0.5 whitespace-nowrap">
                Internal Console
              </div>
            </div>
            
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex-shrink-0"
            >
              {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
            
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <CloseOutlined />
            </button>
          </div>

          <nav className="px-3 py-6 space-y-2 flex-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                title={isCollapsed ? link.label : ""}
                className={({ isActive }) =>
                  `${navBase} ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                  } ${isCollapsed ? "lg:justify-center lg:px-0" : ""}`
                }
              >
                <span className={`text-lg flex-shrink-0 ${isCollapsed ? "lg:text-xl" : ""}`}>{link.icon}</span>
                <span className={`transition-all duration-300 ${isCollapsed ? "lg:hidden lg:opacity-0 lg:w-0" : "opacity-100 w-auto"}`}>
                  {link.label}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Profile / Logout Section */}
        <div className={`p-4 border-t border-slate-800 bg-slate-900/50 mt-auto`}>
          <div className={`px-2 mb-4 transition-all duration-300 ${isCollapsed ? "lg:hidden lg:opacity-0 lg:h-0" : "opacity-100"}`}>
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Active User</div>
            <div className="text-sm font-semibold text-slate-200 truncate">{session?.username ?? "Administrator"}</div>
          </div>
          
          <button
            onClick={handleLogout}
            className={`
              ${navBase} w-full justify-center bg-slate-800/50 text-slate-400 hover:bg-red-600 hover:text-white transition-all
              ${isCollapsed ? "lg:px-0" : ""}
            `}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogoutOutlined className={isCollapsed ? "lg:text-xl" : ""} />
            <span className={`transition-all duration-300 ${isCollapsed ? "lg:hidden lg:opacity-0 lg:w-0" : "opacity-100 w-auto ml-2"}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex-shrink-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
              >
                <MenuOutlined className="text-xl" />
              </button>
              <h1 className="text-xl font-bold text-slate-800 truncate">
                {navLinks.find(l => 
                  l.end ? location.pathname === l.to : location.pathname.startsWith(l.to)
                )?.label || "Administration"}
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Session Status</div>
                <div className="text-xs text-emerald-500 font-medium flex items-center gap-1.5 justify-end">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  Active
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar bg-slate-50">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 px-8 py-3 text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2 flex-shrink-0">
          <div>© {new Date().getFullYear()} Phitech Solutions Dashboard</div>
          <div className="flex gap-4">
            <span className="hover:text-indigo-600 cursor-pointer">Support</span>
            <span className="hover:text-indigo-600 cursor-pointer">Privacy</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

