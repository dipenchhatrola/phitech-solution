import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

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
  const [clientsList, setClientsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get('/clients');
        setClientsList(res.data);
      } catch (err) {
        console.error('Failed to load clients', err);
      }
    };
    fetchClients();
  }, []);

  const getFullUrl = (url: string) => {
    return url;
  };

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
          {clientsList.map((client) => {
            const content = (
               <motion.div 
                 variants={logoVariants}
                 key={client._id}
                 className="bg-white border border-[#eaeaea] rounded-md h-[85px] sm:h-[100px] flex items-center justify-center p-3 hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden"
               >
                 <img 
                   src={getFullUrl(client.image)} 
                   alt={client.name} 
                   className="max-w-[85%] max-h-[85%] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:scale-105"
                   loading="lazy"
                 />
               </motion.div>
            );

            if (client.link) {
              return <a href={client.link} target="_blank" rel="noopener noreferrer" key={client._id}>{content}</a>;
            }
            return <div key={client._id}>{content}</div>;
          })}
        </motion.div>
      </div>
    </section>
  );
}
