import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
   }
};

const itemVariants = {
   hidden: { opacity: 0, scale: 0.95, y: 20 },
   visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Products() {
   return (
      <section className="py-20 bg-slate-50">
         <div className="container-custom">
            <motion.div 
               initial={{ opacity: 0, y: -20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.6 }}
               className="text-center mb-16"
            >
               <h2 className="section-title">Our <span className="text-brand-600">Products</span></h2>
               <p className="text-slate-500 max-w-2xl mx-auto">
                  Phitech Solutions specializes in providing complete solutions for your mould manufacturing and product development requirements.
               </p>
            </motion.div>

            <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
               <motion.div variants={itemVariants} className="card group overflow-hidden">
                  <div className="h-64 bg-slate-200 flex items-center justify-center relative overflow-hidden">
                     <span className="text-slate-400 z-10 transition-transform group-hover:scale-105 duration-500">[Mould Image]</span>
                  </div>
                  <div className="p-6 flex justify-between items-center bg-white">
                     <h4 className="text-xl font-bold text-slate-800">Mould</h4>
                     <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center transform group-hover:translate-x-2 transition-transform shadow-md">→</div>
                  </div>
               </motion.div>

               <motion.div variants={itemVariants} className="card group overflow-hidden">
                  <div className="h-64 bg-slate-200 flex items-center justify-center relative overflow-hidden">
                     <span className="text-slate-400 z-10 transition-transform group-hover:scale-105 duration-500">[Moulded Article Image]</span>
                  </div>
                  <div className="p-6 flex justify-between items-center bg-white">
                     <h4 className="text-xl font-bold text-slate-800">Moulded Article</h4>
                     <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center transform group-hover:translate-x-2 transition-transform shadow-md">→</div>
                  </div>
               </motion.div>
            </motion.div>
         </div>
      </section>
   );
}