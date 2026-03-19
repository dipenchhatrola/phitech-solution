import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
   }
};

const itemVariants = {
   hidden: { opacity: 0, y: 30 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Services() {
   return (
      <section className="py-20 bg-slate-50">
         <div className="container-custom">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.6 }}
               className="text-center mb-16"
            >
               <h2 className="section-title">Our <span className="text-brand-600">Services</span></h2>
               <p className="text-slate-500 max-w-2xl mx-auto font-medium">
                  Concept ideas • Design • Prototype • Analysis • Manufacturing • Validation • Feasibility
               </p>
            </motion.div>
            
            <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
            >
               <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow">
                  <div className="sm:w-2/5 bg-slate-200 h-48 sm:h-auto overflow-hidden group">
                     {/* Can place background image here for services */}
                     <div className="w-full h-full bg-brand-50 transition-transform duration-500 group-hover:scale-110"></div>
                  </div>
                  <div className="p-6 sm:w-3/5">
                     <h4 className="text-lg font-bold text-brand-600 mb-2">3D Scanning / CMM Measurement</h4>
                     <p className="text-slate-500 text-sm">We provide precise measurement services for your parts. High accuracy data generation for reverse engineering and quality inspection.</p>
                  </div>
               </motion.div>
               <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow">
                  <div className="sm:w-2/5 bg-slate-200 h-48 sm:h-auto overflow-hidden group">
                     <div className="w-full h-full bg-brand-50 transition-transform duration-500 group-hover:scale-110"></div>
                  </div>
                  <div className="p-6 sm:w-3/5">
                     <h4 className="text-lg font-bold text-brand-600 mb-2">Injection Moulding Simulation</h4>
                     <p className="text-slate-500 text-sm">Optimize your mould designs and foresee production challenges before cutting steel to save resources and ensure quality.</p>
                  </div>
               </motion.div>
               <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow">
                  <div className="sm:w-2/5 bg-slate-200 h-48 sm:h-auto overflow-hidden group">
                     <div className="w-full h-full bg-brand-50 transition-transform duration-500 group-hover:scale-110"></div>
                  </div>
                  <div className="p-6 sm:w-3/5">
                     <h4 className="text-lg font-bold text-brand-600 mb-2">Mould / Product Designing</h4>
                     <p className="text-slate-500 text-sm">Highly skilled engineering team leveraging advanced CAD tools to bring your concepts to manufacturable reality.</p>
                  </div>
               </motion.div>
               <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow">
                  <div className="sm:w-2/5 bg-slate-200 h-48 sm:h-auto overflow-hidden group">
                     <div className="w-full h-full bg-brand-50 transition-transform duration-500 group-hover:scale-110"></div>
                  </div>
                  <div className="p-6 sm:w-3/5">
                     <h4 className="text-lg font-bold text-brand-600 mb-2">Product Designing</h4>
                     <p className="text-slate-500 text-sm">End-to-end product design services from initial sketch to final production-ready 3D models.</p>
                  </div>
               </motion.div>
            </motion.div>
         </div>
      </section>
   );
}