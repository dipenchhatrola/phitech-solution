import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
   }
};

const itemVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Mould() {
   return (
      <section className="py-12 md:py-20 bg-white">
         <div className="container-custom">
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.5 }}
               className="text-center mb-16"
            >
               <h2 className="section-title">Mould <span className="text-brand-600">Manufacturing</span></h2>
               <p className="text-slate-500 max-w-2xl mx-auto">We provide a wide range of mould manufacturing services.</p>
            </motion.div>

            <motion.div
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
               {/* Injection Moulding */}
               <motion.div variants={itemVariants} className="group p-8 border border-slate-100 rounded-2xl hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out cursor-pointer bg-white">
                  <div className="w-12 h-12 mb-6 text-brand-600 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1 origin-bottom-left">
                     <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-3 transition-all duration-300 group-hover:text-xl group-hover:text-brand-600">Injection Moulding</h4>
                  <p className="text-slate-500 text-sm leading-relaxed transition-all duration-300 group-hover:text-[15px] group-hover:text-slate-700">Injection Moulding is one of the most widely used methods for manufacturing plastic parts. It produces high-quality components.</p>
               </motion.div>

               {/* Blow Moulding */}
               <motion.div variants={itemVariants} className="group p-8 border border-slate-100 rounded-2xl hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out cursor-pointer bg-white">
                  <div className="w-12 h-12 mb-6 text-brand-600 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1 origin-bottom-left">
                     <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-3 transition-all duration-300 group-hover:text-xl group-hover:text-brand-600">Blow Mould</h4>
                  <p className="text-slate-500 text-sm leading-relaxed transition-all duration-300 group-hover:text-[15px] group-hover:text-slate-700">Blow Moulding is used in the manufacture of hollow plastic parts like bottles and containers.</p>
               </motion.div>

               {/* Compression Moulding */}
               <motion.div variants={itemVariants} className="group p-8 border border-slate-100 rounded-2xl hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out cursor-pointer bg-white">
                  <div className="w-12 h-12 mb-6 text-brand-600 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1 origin-bottom-left">
                     <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-3 transition-all duration-300 group-hover:text-xl group-hover:text-brand-600">Compression Moulding</h4>
                  <p className="text-slate-500 text-sm leading-relaxed transition-all duration-300 group-hover:text-[15px] group-hover:text-slate-700">A process where heated plastic material is placed in a heated mould cavity. The mould is closed with a top plug.</p>
               </motion.div>

               {/* Transfer Moulding */}
               <motion.div variants={itemVariants} className="group p-8 border border-slate-100 rounded-2xl hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out cursor-pointer bg-white">
                  <div className="w-12 h-12 mb-6 text-brand-600 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1 origin-bottom-left">
                     <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-3 transition-all duration-300 group-hover:text-xl group-hover:text-brand-600">Transfer Moulding</h4>
                  <p className="text-slate-500 text-sm leading-relaxed transition-all duration-300 group-hover:text-[15px] group-hover:text-slate-700">Similar to compression moulding, differing in that the material is first placed in a separate chamber, called a pot.</p>
               </motion.div>

               {/* SMC / BMC Composite */}
               <motion.div variants={itemVariants} className="group p-8 border border-slate-100 rounded-2xl hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out cursor-pointer bg-white">
                  <div className="w-12 h-12 mb-6 text-brand-600 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1 origin-bottom-left">
                     <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-3 transition-all duration-300 group-hover:text-xl group-hover:text-brand-600">SMC / BMC Composite Moulding</h4>
                  <p className="text-slate-500 text-sm leading-relaxed transition-all duration-300 group-hover:text-[15px] group-hover:text-slate-700">Ideal for large complex components. Widely used across various industries.</p>
               </motion.div>

               {/* Extrusion Moulding */}
               <motion.div variants={itemVariants} className="group p-8 border border-slate-100 rounded-2xl hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out cursor-pointer bg-white">
                  <div className="w-12 h-12 mb-6 text-brand-600 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1 origin-bottom-left">
                     <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-3 transition-all duration-300 group-hover:text-xl group-hover:text-brand-600">Extrusion Moulding</h4>
                  <p className="text-slate-500 text-sm leading-relaxed transition-all duration-300 group-hover:text-[15px] group-hover:text-slate-700">Extrusion Moulding creates continuous objects like pipes, tubes, weatherstripping, and window frames.</p>
               </motion.div>
            </motion.div>
         </div>
      </section>
   );
}
