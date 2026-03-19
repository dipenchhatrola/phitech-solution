import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-slate-100 py-8 border-t border-slate-200 mt-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container-custom mx-auto px-4 flex flex-col md:flex-row justify-between items-center max-w-[1240px]"
      >
        
        {/* Left Side: Copyright */}
        <p className="uppercase tracking-[0.25em] text-[10px] sm:text-[11px] font-bold text-slate-500 text-center md:text-left mb-6 md:mb-0">
          © {new Date().getFullYear()} PHITECH SOLUTIONS. ALL RIGHTS RESERVED.
        </p>

        {/* Right Side: Design Badge */}
        <div className="flex items-center justify-center">
          <div className="bg-[#e41e26] text-white text-[9px] sm:text-[10px] uppercase font-black px-2.5 py-1 tracking-[0.15em] flex items-center h-[24px]">
            DESIGN BY
          </div>
          <a 
            href="https://www.ashtrixcode.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.2em] text-slate-600 hover:text-[#e41e26] transition-colors ml-2 border-b border-slate-400 flex items-center h-[24px] pt-[2px]"
          >
            ASHTRIXCODE
          </a>
        </div>

      </motion.div>
    </footer>
  );
}