import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";
import { FaPhoneAlt, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const PhoneIcon = FaPhoneAlt as any;
const FacebookIcon = FaFacebookF as any;
const InstagramIcon = FaInstagram as any;
const LinkedinIcon = FaLinkedinIn as any;

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkSlide, setIsDarkSlide] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    api.get("/settings").then(res => setSettings(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname === "/") {
        const sections = navLinks.map(link => document.getElementById(link.id)).filter(Boolean);
        const scrollPosition = window.scrollY + 100; // offset for navbar

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

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
    { id: "mould", label: "Mould" },
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

  useEffect(() => {
    // Add Google Translate Script
    const addGoogleTranslateScript = () => {
      if (!window.googleTranslateElementInit) {
        const script = document.createElement("script");
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            { pageLanguage: 'en' },
            'google_translate_element'
          );
        };
      }
    };
    addGoogleTranslateScript();
  }, []);

  const isWhiteText = !scrolled && isDarkSlide;
  const isLoggedIn = !!localStorage.getItem("clientToken") || !!localStorage.getItem("adminToken");

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out bg-white shadow-md`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 lg:py-3">

          {/* Logo */}
          <button onClick={() => handleNavClick("home")} className="flex items-center focus:outline-none flex-shrink-0">
            <img src="/Logo.png" alt="PhiTECH Solutions" className="h-10 sm:h-12 lg:h-10 object-contain" />
          </button>

          {/* Desktop Right Side Colmkjkhuyn */}
          <div className="hidden lg:flex flex-col flex-grow justify-center ml-6 xl:ml-10">

            {/* Top Row: Contact Info & Socials - Hidden on scroll */}
            <motion.div 
              animate={{ 
                height: scrolled ? 0 : "auto", 
                opacity: scrolled ? 0 : 1,
                marginBottom: scrolled ? 0 : 8,
                paddingBottom: scrolled ? 0 : 8
              }}
              transition={{ duration: 0.3 }}
              className="flex justify-end items-center border-b border-slate-100 space-x-5 text-xs text-slate-600 overflow-hidden shrink-0"
            >
              <a href={`tel:${settings?.mobileNumber || '+91 94287 35418'}`} className="flex items-center space-x-1.5 hover:text-brand-600 transition-colors whitespace-nowrap">
                <PhoneIcon className="text-slate-400 w-3 h-3" />
                <span className="font-semibold text-slate-700">{settings?.mobileNumber || '+91 94287 35418'}</span>
              </a>
              <a href={`tel:${settings?.contactNumber || '+91 90339 67360'}`} className="flex items-center space-x-1.5 hover:text-brand-600 transition-colors whitespace-nowrap">
                <PhoneIcon className="text-slate-400 w-3 h-3" />
                <span className="font-semibold text-slate-700">{settings?.contactNumber || '+91 90339 67360'}</span>
              </a>

              <div className="flex items-center space-x-2 pl-4 border-l border-slate-200">
                <a href={settings?.facebook || '#'} target="_blank" rel="noreferrer" className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <FacebookIcon size={10} />
                </a>
                <a href={settings?.instagram || '#'} target="_blank" rel="noreferrer" className="w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                  <InstagramIcon size={10} />
                </a>
                <a href={settings?.linkedin || '#'} target="_blank" rel="noreferrer" className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                  <LinkedinIcon size={10} />
                </a>
              </div>

              <div className="border-l border-slate-200 pl-4 flex items-center h-full">
                <div id="google_translate_element" className="h-6 overflow-hidden flex items-center pt-1 scale-90 origin-right"></div>
              </div>
            </motion.div>

            {/* Bottom Row: Desktop Navigation */}
            <div className="flex justify-end items-center space-x-1 lg:space-x-3 xl:space-x-5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id && location.pathname === "/";
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-1.5 xl:px-3 py-1 text-[13px] font-medium transition-colors duration-300 focus:outline-none
                      ${isActive
                        ? 'text-brand-600 font-semibold'
                        : 'text-slate-700 hover:text-brand-600'
                      }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-1/2 h-0.5 transition-all duration-300 transform -translate-x-1/2 ${isActive ? 'w-1/2 bg-brand-600' : 'w-0 group-hover:w-1/2 bg-brand-600'}`}></span>
                  </button>
                )
              })}

              {/* Profile Icon */}
              <button
                onClick={() => navigate(isLoggedIn ? (localStorage.getItem("adminToken") ? "/admin" : "/dashboard") : "/login")}
                className={`ml-3 p-1.5 rounded-full border transition-all duration-300 border-slate-200 text-slate-600 hover:bg-slate-50`}
                title={isLoggedIn ? "Dashboard" : "Login"}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => navigate(isLoggedIn ? (localStorage.getItem("adminToken") ? "/admin" : "/dashboard") : "/login")}
              className={`p-2 rounded-full border transition-all duration-300 border-slate-200 text-slate-600`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`focus:outline-none p-2 transition-colors duration-300 text-slate-600 hover:text-brand-600`}
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
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
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
            {/* Mobile Google Translate */}
            <div className="px-4 py-3 border-t border-slate-100 mt-2">
              <div id="google_translate_element_mobile"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}
