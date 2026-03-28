import React from 'react';
import Hero from './Hero';
import About from './About';
import Products from './Products';
import Mould from './Mould';
import Services from './Services';
import Clients from './Clients';
import Contact from './Contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Modular Page Sections */}
      <Hero />
      <About />
      <Products />
      <Mould />
      <Services />
      <Clients />
      <Contact />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919428735418"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8"
          fill="currentColor"
          stroke="none"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M12.012 2c5.506 0 9.988 4.478 9.988 9.98 0 5.505-4.482 9.983-9.988 9.983-1.744 0-3.414-.45-4.904-1.305l-5.385 1.41 1.436-5.247A9.919 9.919 0 012.024 11.98C2.024 6.478 6.506 2 12.012 2zm0 1.684c-4.57 0-8.293 3.72-8.293 8.296 0 1.458.38 2.88 1.103 4.137l.215.372-.853 3.12 3.193-.837.362.214a8.214 8.214 0 004.273 1.191c4.575 0 8.298-3.725 8.298-8.296 0-4.576-3.723-8.296-8.298-8.296zm4.618 11.233c-.253-.127-1.498-.74-1.73-.825-.233-.085-.4-.127-.568.127-.168.254-.654.825-.8 1-.148.174-.296.195-.548.07-.254-.128-1.07-.395-2.04-1.258-.756-.673-1.264-1.503-1.413-1.758-.15-.254-.016-.39.11-.518.114-.115.253-.298.38-.445.126-.148.168-.255.253-.424.084-.17.042-.318-.02-.445-.064-.128-.568-1.373-.778-1.882-.204-.496-.412-.428-.568-.436-.148-.008-.318-.008-.487-.008-.168 0-.444.063-.676.318-.232.254-.888.868-.888 2.118s.91 2.458 1.037 2.628c.126.17 1.792 2.735 4.34 3.834.607.263 1.08.42 1.448.537.608.195 1.163.167 1.6.102.493-.075 1.498-.613 1.708-1.205.21-.592.21-1.1.148-1.205-.064-.106-.233-.17-.487-.297z" />
        </svg>
      </a>
    </div>
  );
}
