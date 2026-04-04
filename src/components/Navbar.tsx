import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkSlide, setIsDarkSlide] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSlideChange = ((e: CustomEvent) => {
      setIsDarkSlide(e.detail.slide === 1);
    }) as EventListener;
    window.addEventListener('slideChange', handleSlideChange);
    return () => window.removeEventListener('slideChange', handleSlideChange);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about-us", label: "About Us" },
    { id: "product", label: "Products" },
    { id: "mould", label: "Moulds" },
    { id: "services", label: "Services" },
    { id: "clients", label: "Clients" },
    { id: "contact", label: "Contact Us" }
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    
    // Smooth scrolling handling
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      } else {
         window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const isWhiteText = !scrolled && isDarkSlide;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-100' : 'py-5 bg-transparent'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button onClick={() => handleNavClick("home")} className="flex items-center space-x-1 group focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xl mr-1 group-hover:rotate-12 transition-transform">
              P
            </div>
            <span className={`text-2xl font-display font-light tracking-tight transition-colors duration-300 ${isWhiteText ? 'text-white' : 'text-slate-800'}`}>
              Phi<span className={`font-bold transition-colors duration-300 ${isWhiteText ? 'text-white' : 'text-brand-600'}`}>TECH</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id && location.pathname === "/";
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none
                    ${isActive 
                      ? (isWhiteText ? 'text-white' : 'text-brand-600') 
                      : (isWhiteText ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-brand-600')
                    }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-1/2 h-0.5 transition-all duration-300 transform -translate-x-1/2 ${isActive ? 'w-1/2' : 'w-0 group-hover:w-1/2'} ${isWhiteText ? 'bg-white' : 'bg-brand-600'}`}></span>
                </button>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden focus:outline-none p-2 transition-colors duration-300 ${isWhiteText ? 'text-white' : 'text-slate-600 hover:text-brand-600'}`}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="py-2 space-y-1 bg-white border border-slate-100 rounded-2xl p-4 shadow-xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:bg-slate-50
                  ${activeSection === link.id && location.pathname === "/"
                    ? 'bg-brand-50 text-brand-600' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
                  }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
