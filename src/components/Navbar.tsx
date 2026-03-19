import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkSlide, setIsDarkSlide] = useState(false);

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
    { path: "/", label: "Home" },
    { path: "/about-us", label: "About Us" },
    { path: "/product", label: "Products" },
    { path: "/mould", label: "Moulds" },
    { path: "/services", label: "Services" },
    { path: "/clients", label: "Clients" },
    { path: "/contact", label: "Contact Us" }
  ];

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
          <Link to="/" className="flex items-center space-x-1 group">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xl mr-1 group-hover:rotate-12 transition-transform">
              P
            </div>
            <span className={`text-2xl font-display font-light tracking-tight transition-colors duration-300 ${isWhiteText ? 'text-white' : 'text-slate-800'}`}>
              Phi<span className={`font-bold transition-colors duration-300 ${isWhiteText ? 'text-white' : 'text-brand-600'}`}>TECH</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300
                    ${isActive 
                      ? (isWhiteText ? 'text-white' : 'text-brand-600') 
                      : (isWhiteText ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-brand-600')
                    }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-1/2 h-0.5 transition-all duration-300 transform -translate-x-1/2 ${isActive ? 'w-1/2' : 'w-0 group-hover:w-1/2'} ${isWhiteText ? 'bg-white' : 'bg-brand-600'}`}></span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden focus:outline-none p-2 transition-colors duration-300 ${isWhiteText ? 'text-white' : 'text-slate-600 hover:text-brand-600'}`}
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
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="py-2 space-y-1 bg-white border border-slate-100 rounded-2xl p-4 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium
                  ${location.pathname === link.path 
                    ? 'bg-brand-50 text-brand-600' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}