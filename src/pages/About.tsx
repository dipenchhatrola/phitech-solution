import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
   return (
      <section className="py-12 md:py-20 bg-white">
         <div className="container-custom px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
               <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full md:w-1/2 relative group"
               >
                  <div className="relative z-10 w-full flex items-center justify-center p-4">
                     <img 
                        src="https://phitech.co.in/wp-content/uploads/2023/07/About-min-2.png" 
                        alt="Engineering Caliper and Blueprints" 
                        className="w-full max-w-[500px] h-auto drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
                     />
                  </div>
               </motion.div>
               <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="w-full md:w-1/2"
               >
                  <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-2">About Company</h2>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-600 mb-4 md:mb-6 tracking-tight">Phitech Solutions</h3>
                  <div className="prose prose-lg text-slate-600">
                     <p className="mb-4">
                        Our company is renowned and reliable when it comes to delivering incredibly high standard services and products. We are an ISO 9001:2015 certified company and our dedicated team is highly specialized and trained. We handle our projects systematically and work hand-in-hand to formulate the best result possible for our clients.
                     </p>
                     <div className="bg-brand-50 border-l-4 border-brand-600 p-6 mt-8 rounded-r-lg">
                        <p className="text-brand-900 font-medium m-0">
                           We specialize in highly precise and accurate production. Your search for plastic mould ends here.
                        </p>
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>
   );
}
