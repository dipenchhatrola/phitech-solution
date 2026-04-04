import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAdminSession, getAdminSession } from "../utils/adminAuth";

const navBase =
  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors";

export default function AdminLayout() {
  const navigate = useNavigate();
  const session = getAdminSession();

  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col">
          <div className="px-6 py-6 border-b border-slate-800">
            <div className="text-lg font-semibold">Admin Panel</div>
            <div className="text-sm text-slate-400 mt-1">
              Signed in as {session?.username ?? "Admin"}
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `${navBase} ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`
              }
            >
              Mould Status
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `${navBase} ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`
              }
            >
              Users
            </NavLink>
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `${navBase} ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`
              }
            >
              Products
            </NavLink>
          </nav>

          <div className="px-3 pb-4">
            <button
              onClick={handleLogout}
              className={`${navBase} w-full justify-center bg-slate-800 text-slate-200 hover:bg-red-600 hover:text-white`}
            >
              Logout
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="bg-white border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold">Administration</h1>
                <p className="text-sm text-slate-500">
                  Static admin console for internal visibility
                </p>
              </div>
              <div className="text-sm text-slate-500">
                Session expires after 8 hours
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            <Outlet />
          </main>

          <footer className="bg-white border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
            © {new Date().getFullYear()} Phitech Admin. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
