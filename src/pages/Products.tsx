import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Modal, Image } from 'antd';
import api from '../utils/api';

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
   const [products, setProducts] = useState<any[]>([]);
   const [activeProduct, setActiveProduct] = useState<any>(null);
   const [isModalVisible, setIsModalVisible] = useState(false);

   useEffect(() => {
     const fetchProducts = async () => {
       try {
         const res = await api.get('/products');
         // Only show products where isPublic is explicitly true or missing (for retro-compatibility)
         setProducts(res.data.filter((p: any) => p.isPublic !== false));
       } catch (err) {
         console.error('Failed to load products');
       }
     };
     fetchProducts();
   }, []);

   const getFullUrl = (url: string) => {
     if (!url) return url;
     if (/^https?:\/\//i.test(url)) return url;
     const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
     const normalizedBase = base.replace(/\/+$/, '');
     const normalizedPath = url.startsWith('/') ? url : `/${url}`;
     return `${normalizedBase}${normalizedPath}`;
   };

   return (
      <section className="py-12 md:py-20 bg-slate-50">
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
               animate="visible"
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
               {products.length > 0 ? products.map((product) => (
                 <motion.div 
                    key={product._id} 
                    variants={itemVariants} 
                    className="card group overflow-hidden bg-white shadow-md rounded-xl cursor-pointer"
                    onClick={() => { setActiveProduct(product); setIsModalVisible(true); }}
                 >
                    <div className="h-64 bg-slate-200 flex items-center justify-center relative overflow-hidden">
                       {product.photos && product.photos.length > 0 ? (
                         <img src={getFullUrl(product.photos[0])} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                       ) : (
                         <span className="text-slate-400 z-10 transition-transform group-hover:scale-105 duration-500">{product.name} Image</span>
                       )}
                    </div>
                    <div className="p-6">
                       <h4 className="text-xl font-bold text-slate-800 mb-2">{product.name}</h4>
                       <p className="text-sm text-slate-600 mb-4 h-10 overflow-hidden line-clamp-2">{product.description}</p>
                       <div className="flex justify-end items-center">
                          <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center transform group-hover:translate-x-2 transition-transform shadow-md">→</div>
                       </div>
                    </div>
                 </motion.div>
               )) : (
                 <div className="col-span-full text-center py-10 text-slate-500 font-medium bg-white rounded-xl shadow-sm border border-slate-100">
                    No products available right now. Please check back later.
                 </div>
               )}
            </motion.div>
         </div>

         <Modal
            title={<span className="text-2xl font-bold text-slate-800">{activeProduct?.name}</span>}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            width={700}
            centered
         >
            <div className="mt-4">
              {activeProduct?.photos && activeProduct.photos.length > 0 ? (
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   <Image.PreviewGroup>
                      {activeProduct.photos.map((photo: string, index: number) => (
                         <div key={index} className="aspect-square rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                            <Image 
                               src={getFullUrl(photo)} 
                               alt={`${activeProduct.name} ${index + 1}`}
                               className="object-cover w-full h-full"
                            />
                         </div>
                      ))}
                   </Image.PreviewGroup>
                 </div>
              ) : (
                 <div className="p-10 text-center bg-slate-50 rounded-lg text-slate-400 border border-dashed border-slate-200">
                    <p>No photos available for this product.</p>
                 </div>
              )}
            </div>
         </Modal>
      </section>
   );
}
