import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="App min-h-screen flex flex-col pt-0">
      <Navbar />
      <main className={`flex-grow ${!isHomePage ? 'pt-24' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
