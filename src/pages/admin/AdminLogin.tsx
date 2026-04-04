import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isAdminAuthed, setAdminSession } from "../../utils/adminAuth";

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAdminAuthed()) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your admin credentials.");
      return;
    }

    if (
      username.trim() === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setAdminSession(username.trim());
      const state = location.state as { from?: { pathname?: string } } | null;
      const redirectTo = state?.from?.pathname ?? "/admin";
      navigate(redirectTo, { replace: true });
      return;
    }

    setError("Invalid username or password.");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-8 py-6 bg-slate-900 text-white">
          <h1 className="text-2xl font-semibold">Admin Login</h1>
          <p className="text-sm text-slate-300 mt-1">
            Secure access to the internal panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Username
            </label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
              type="text"
              placeholder="admin"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 text-white py-3 font-semibold hover:bg-slate-800 transition"
          >
            Sign In
          </button>

          <div className="rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-500">
            Demo credentials: admin / admin123
          </div>
        </form>
      </div>
    </div>
  );
}
