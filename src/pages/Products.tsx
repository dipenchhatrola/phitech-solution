import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal, Image } from 'antd';
import api from '../utils/api';

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
   }
};

const itemVariants = {
   hidden: { opacity: 0, scale: 0.95, y: 20 },
   visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
   exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

export default function Products() {
   const [products, setProducts] = useState<any[]>([]);
   const [categories, setCategories] = useState<any[]>([]);
   const [activeCategory, setActiveCategory] = useState<string>('all');
   const [activeProduct, setActiveProduct] = useState<any>(null);
   const [isModalVisible, setIsModalVisible] = useState(false);

   useEffect(() => {
     const fetchData = async () => {
       try {
         const [productsRes, categoriesRes] = await Promise.all([
             api.get('/products'),
             api.get('/categories')
         ]);
         setProducts(productsRes.data.filter((p: any) => p.isPublic !== false));
         setCategories(categoriesRes.data);
       } catch (err) {
         console.error('Failed to load data');
       }
     };
     fetchData();
   }, []);

   const filteredProducts = activeCategory === 'all' 
     ? products 
     : products.filter(p => p.category && (p.category._id === activeCategory || p.category === activeCategory));

   return (
      <section className="py-12 md:py-20 bg-slate-50 min-h-screen">
         <div className="container-custom">
            <motion.div 
               initial={{ opacity: 0, y: -20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.6 }}
               className="text-center mb-12"
            >
               <h2 className="section-title">Our <span className="text-brand-600">Products</span></h2>
               <p className="text-slate-500 max-w-2xl mx-auto">
                  Phitech Solutions specializes in providing complete solutions for your mould manufacturing and product development requirements.
               </p>
            </motion.div>

            {/* Category Filter */}
            {categories.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    <button 
                        onClick={() => setActiveCategory('all')}
                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === 'all' ? 'bg-brand-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button 
                            key={cat._id}
                            onClick={() => setActiveCategory(cat._id)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === cat._id ? 'bg-brand-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            )}

            <motion.div 
               variants={containerVariants}
               initial="hidden"
               animate="visible"
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
               <AnimatePresence mode="popLayout">
                 {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                   <motion.div 
                      key={product._id} 
                      variants={itemVariants} 
                      layout
                      className="card group overflow-hidden bg-white shadow-md rounded-xl cursor-pointer"
                      onClick={() => { setActiveProduct(product); setIsModalVisible(true); }}
                   >
                      <div className="h-64 bg-slate-200 flex items-center justify-center relative overflow-hidden">
                         {product.photos && product.photos.length > 0 ? (
                           <img src={product.photos[0]} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                         ) : (
                           <span className="text-slate-400 z-10 transition-transform group-hover:scale-105 duration-500">{product.name} Image</span>
                         )}
                      </div>
                      <div className="p-6">
                         <h4 className="text-xl font-bold text-slate-800 mb-2">{product.name}</h4>
                         <div className="flex justify-end items-center mt-4">
                            <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center transform group-hover:translate-x-2 transition-transform shadow-md">→</div>
                         </div>
                      </div>
                   </motion.div>
                 )) : (
                   <div className="col-span-full text-center py-20 text-slate-500 font-medium bg-white rounded-xl shadow-sm border border-slate-100">
                      No products found in this category.
                   </div>
                 )}
               </AnimatePresence>
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
              {activeProduct?.description && (
                  <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h5 className="font-semibold text-slate-700 mb-1">Description</h5>
                      <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{activeProduct.description}</p>
                  </div>
              )}
              
              {activeProduct?.photos && activeProduct.photos.length > 0 ? (
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   <Image.PreviewGroup>
                      {activeProduct.photos.map((photo: string, index: number) => (
                         <div key={index} className="aspect-square rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm relative group cursor-pointer">
                            <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-110">
                                <Image 
                                   src={photo} 
                                   alt={`${activeProduct.name} ${index + 1}`}
                                   className="object-cover w-full h-full"
                                />
                            </div>
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
