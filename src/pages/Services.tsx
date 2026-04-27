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

const servicesList = [
   {
      title: "3D Scanning/CMM\nMeasurement",
      description: "We are providing service for 2D & 3D measurement. We can scan job from small to big size. Also can compare & check deviation in dimensions with old drawing. Scanning accuracy is ±25 micron.",
      image: "/images/services/3d_scanning_1777310262344.png"
   },
   {
      title: "Injection Moulding\nSimulation",
      description: "Our design department is having facility of CAE for injection moulding, provide depth analysis for complete moulding process on the world best CAE simulator “MOLDEX 3D”.",
      image: "/images/services/injection_moulding_1777310276042.png"
   },
   {
      title: "Mould / Product\nDesigning",
      description: "We work closely with our engineering staff from the initial design concept to the detailed mould design to enhance robustness, manufacturability, & maintainability of mould.",
      image: "/images/services/mould_design_1777310292145.png"
   },
   {
      title: "Product Designing",
      description: "We know our customers, and we design for them. Understanding the parts you need, we design for market acceptability. We promote creativity in product design allowing customer to create shapes & sizes.",
      image: "/images/services/product_design_1777310308441.png"
   }
];

export default function Services() {
   return (
      <section className="py-16 md:py-24 bg-[#f4f4f4]" id="services">
         <div className="container-custom">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.6 }}
               className="text-center mb-16"
            >
               <h2 className="text-[32px] md:text-[40px] font-bold text-[#4a4a4a] mb-5 tracking-tight">
                  Our <span className="text-[#c62828]">Services</span>
               </h2>
               <p className="text-[#666666] max-w-4xl mx-auto font-semibold text-[16px]">
                  Concept/Idea – Design – Prototype – Analysis – Manufacturing – Validation – Reality
               </p>
            </motion.div>

            <motion.div
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               className="grid grid-cols-1 lg:grid-cols-2 gap-y-20 sm:gap-y-16 gap-x-8 lg:gap-x-16 max-w-[1250px] mx-auto px-4 sm:px-8 mt-8 sm:mt-12"
            >
               {servicesList.map((service, index) => (
                  <motion.div
                     key={index}
                     variants={itemVariants}
                     className="bg-white rounded-[16px] p-6 sm:p-4 sm:pl-0 shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row transition-all duration-300 items-center sm:ml-10 mt-12 sm:mt-0 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
                  >
                     <div className="w-[85%] sm:w-[45%] flex-shrink-0 aspect-[4/3] overflow-hidden rounded-[12px] shadow-[0_8px_25px_rgb(0,0,0,0.15)] -mt-16 sm:mt-0 sm:-ml-10 sm:mr-8 z-10 bg-white">
                        <img
                           src={service.image}
                           alt={service.title.replace('\n', ' ')}
                           className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                     </div>
                     <div className="w-full sm:w-[55%] pt-8 sm:pt-0 sm:pr-2 flex flex-col justify-center text-center sm:text-left">
                        <h4 className="text-[20px] sm:text-[22px] font-bold text-[#d32f2f] mb-3 sm:mb-4 leading-[1.3] whitespace-pre-line">
                           {service.title}
                        </h4>
                        <p className="text-[#4a4a4a] text-[14px] leading-[1.6]">
                           {service.description}
                        </p>
                     </div>
                  </motion.div>
               ))}
            </motion.div>
         </div>
      </section>
   );
}
