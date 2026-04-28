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
               <motion.div variants={itemVariants} className="group p-8 border border-slate-100 rounded-2xl hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out bg-white flex flex-col">
                  <div className="flex items-center mb-6">
                     <img src="/Injection-Moulding.png" alt="Injection Moulding" className="w-16 h-16 mr-4 flex-shrink-0 object-contain transition-transform duration-300 group-hover:scale-110" />
                     <h4 className="text-lg md:text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-[#e41e26]">Injection Moulding</h4>
                  </div>
                  <p className="text-slate-600 text-sm md:text-[15px] font-medium leading-relaxed">Mould for applications like Automotive, Pipe Fittings, Packaging, Sanitary ware, Pumps, Toys and Valve, Solid moulded and Lined product, Electricals, Medical etc...</p>
               </motion.div>

               {/* Blow Moulding */}
               <motion.div variants={itemVariants} className="group p-8 border border-slate-100 rounded-2xl hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out bg-white flex flex-col">
                  <div className="flex items-center mb-6">
                     <img src="/Blow-mould.png" alt="Blow Mould" className="w-16 h-16 mr-4 flex-shrink-0 object-contain transition-transform duration-300 group-hover:scale-110" />
                     <h4 className="text-lg md:text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-[#e41e26]">Blow Mould</h4>
                  </div>
                  <p className="text-slate-600 text-sm md:text-[15px] font-medium leading-relaxed">Mould for applications like Food and Pharma Packing (Bottles) etc... (Polymer : LDPE, HDPE, PP, PVC, ABS, PET, PC)</p>
               </motion.div>

               {/* Compression Moulding */}
               <motion.div variants={itemVariants} className="group p-8 border border-slate-100 rounded-2xl hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out bg-white flex flex-col">
                  <div className="flex items-center mb-6">
                     <img src="/Compression-moulding.png" alt="Compression Moulding" className="w-16 h-16 mr-4 flex-shrink-0 object-contain transition-transform duration-300 group-hover:scale-110" />
                     <h4 className="text-lg md:text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-[#e41e26]">Compression Moulding</h4>
                  </div>
                  <p className="text-slate-600 text-sm md:text-[15px] font-medium leading-relaxed">Mould for application like Electrical, Kitchen ware, Industrial, Machine Tools, Solid Moulded and Lined, Food Processing, Pumps and Valves etc...</p>
               </motion.div>

               {/* Transfer Moulding */}
               <motion.div variants={itemVariants} className="group p-8 border border-slate-100 rounded-2xl hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out bg-white flex flex-col">
                  <div className="flex items-center mb-6">
                     <img src="/Transfer-moulding.png" alt="Transfer Moulding" className="w-16 h-16 mr-4 flex-shrink-0 object-contain transition-transform duration-300 group-hover:scale-110" />
                     <h4 className="text-lg md:text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-[#e41e26]">Transfer Moulding</h4>
                  </div>
                  <p className="text-slate-600 text-sm md:text-[15px] font-medium leading-relaxed">Mould for application like Industrial, Machine Tools, Chemical and Pharma Equipment etc.. (Polymer : PP, PVDF, PFA, ETFE, NYLON, PI, PEEK )</p>
               </motion.div>

               {/* Sheet & Dow Composite Moulding */}
               <motion.div variants={itemVariants} className="group p-8 border border-slate-100 rounded-2xl hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out bg-white flex flex-col">
                  <div className="flex items-center mb-6">
                     <img src="/Sheet-Dow.png" alt="Sheet & Dow Composite Moulding" className="w-16 h-16 mr-4 flex-shrink-0 object-contain transition-transform duration-300 group-hover:scale-110" />
                     <h4 className="text-lg md:text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-[#e41e26]">Sheet & Dow Composite Moulding</h4>
                  </div>
                  <p className="text-slate-600 text-sm md:text-[15px] font-medium leading-relaxed">Mould for Fibre Glass Composite Sheet and Dow moulded parts, Automotive, Industrial, Electricals etc... (Polymer : Fibre Glass Reinforced Plastic)</p>
               </motion.div>

               {/* Pultrusion Moulding */}
               <motion.div variants={itemVariants} className="group p-8 border border-slate-100 rounded-2xl hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out bg-white flex flex-col">
                  <div className="flex items-center mb-6">
                     <img src="/Transfer.png" alt="Pultrusion Moulding" className="w-16 h-16 mr-4 flex-shrink-0 object-contain transition-transform duration-300 group-hover:scale-110" />
                     <h4 className="text-lg md:text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-[#e41e26]">Pultrusion Moulding</h4>
                  </div>
                  <p className="text-slate-600 text-sm md:text-[15px] font-medium leading-relaxed">Mould for Fibre Glass Composite Pultrusion products like Pipe, Sections, Profiles, Machine Tools, Industrial, Electricals etc... (Polymer : Fibre Glass Reinforced Plastic)</p>
               </motion.div>
            </motion.div>
         </div>
      </section>
   );
}
