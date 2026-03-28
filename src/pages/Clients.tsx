import React from 'react';
import { motion } from 'framer-motion';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

export default function Clients() {
  const clientsList = [
    { name: "Macarize Industries", url: "https://phitech.co.in/wp-content/uploads/2023/07/Macarize.jpg" },
    { name: "Radhe Group", url: "https://phitech.co.in/wp-content/uploads/2023/07/Radhe-group.jpg" },
    { name: "Max Power Engineers", url: "https://phitech.co.in/wp-content/uploads/2023/07/Max-Power-Engineers.jpg" },
    { name: "Laftron Electronics", url: "https://phitech.co.in/wp-content/uploads/2023/07/Leftron-Electronics.jpg" },
    { name: "JVR", url: "https://phitech.co.in/wp-content/uploads/2023/07/JVR.jpg" },

    { name: "Jalpa Plastic", url: "https://phitech.co.in/wp-content/uploads/2023/07/Jalpa-Plastic.jpg" },
    { name: "Funwoods", url: "https://phitech.co.in/wp-content/uploads/2023/07/Funwoods.jpg" },
    { name: "Escaper", url: "https://phitech.co.in/wp-content/uploads/2023/07/Escaper.jpg" },
    { name: "Elite Plastic", url: "https://phitech.co.in/wp-content/uploads/2023/07/Elite-Plastic.jpg" },
    { name: "Curata", url: "https://phitech.co.in/wp-content/uploads/2023/07/Curata.jpg" },

    { name: "Cubs & Kitties", url: "https://phitech.co.in/wp-content/uploads/2023/07/Cubs-Kitties.jpg" },
    { name: "CMK", url: "https://phitech.co.in/wp-content/uploads/2023/07/CMK.jpg" },
    { name: "BDK Life Sciences", url: "https://phitech.co.in/wp-content/uploads/2023/07/BDK-Life-Sciences.jpg" },
    { name: "A-One Group", url: "https://phitech.co.in/wp-content/uploads/2023/07/A-one-Group.jpg" },
    { name: "Aadhya Consultancy", url: "https://phitech.co.in/wp-content/uploads/2023/07/Aadhya-Consultancy.jpg" },

    { name: "Wild Monkey", url: "https://phitech.co.in/wp-content/uploads/2023/07/Wild-Monkey.jpg" },
    { name: "Smart Plastic Industry", url: "https://phitech.co.in/wp-content/uploads/2023/07/Smart-Plastic-Industry.jpg" },
    { name: "SmartSense Consulting Pvt. Ltd", url: "https://phitech.co.in/wp-content/uploads/2023/07/Smarsense-Consulting-Pvt-Ltd.jpg" },
    { name: "SK Plastic", url: "https://phitech.co.in/wp-content/uploads/2023/07/SK-Plastic.jpg" },
    { name: "Shree Ganesh", url: "https://phitech.co.in/wp-content/uploads/2023/07/Shree-Ganesh.jpg" },

    { name: "Savaj Premium Kitchen", url: "https://phitech.co.in/wp-content/uploads/2023/07/Savaj-Premium-Kitchen.jpg" },
    { name: "Saffron", url: "https://phitech.co.in/wp-content/uploads/2023/07/Saffron.jpg" },
    { name: "Quasto", url: "https://phitech.co.in/wp-content/uploads/2023/07/Quasto.jpg" },
    { name: "Playway Systems", url: "https://phitech.co.in/wp-content/uploads/2023/07/Playway-Systems.jpg" },
    { name: "NJ Flow", url: "https://phitech.co.in/wp-content/uploads/2023/07/NJ-Flow.jpg" }
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container-custom mx-auto px-4 max-w-[1240px]">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 pt-4"
        >
          <h2 className="text-[34px] sm:text-[42px] font-bold text-[#333] mb-2 font-display">
            Our <span className="text-[#e41e26]">Clients</span>
          </h2>
          <p className="text-[#666] font-medium text-[16px] sm:text-[18px]">
            Clients we are working with
          </p>
        </motion.div>

        {/* 5-Column Grid */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[15px] max-w-[1150px] mx-auto"
        >
          {clientsList.map((client, index) => (
            <motion.div 
              variants={logoVariants}
              key={index}
              className="bg-white border border-[#eaeaea] rounded-md h-[85px] sm:h-[100px] flex items-center justify-center p-3 hover:shadow-lg transition-shadow cursor-default group overflow-hidden"
            >
              <img 
                src={client.url} 
                alt={client.name} 
                className="max-w-[85%] max-h-[85%] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
