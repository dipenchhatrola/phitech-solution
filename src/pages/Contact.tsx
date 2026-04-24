import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { message } from 'antd';
import api from '../utils/api';

export default function Contact() {
   const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      message: ''
   });
   const [loading, setLoading] = useState(false);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      
      try {
         const response = await api.post('/contact', formData);
         message.success(response.data.message || 'Inquiry submitted successfully.');
         // Reset form
         setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            service: '',
            message: ''
         });
      } catch (error: any) {
         console.error('Submission error:', error);
         message.error(error.response?.data?.message || 'Failed to submit inquiry. Please try again.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <section className="py-12 md:py-24 bg-[#f4f6f8] relative overflow-hidden">
         {/* Very faint map-like dotted background representation */}
         <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:16px_16px] opacity-50 z-0 rounded-full" style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)' }}></div>
         
         <div className="container-custom relative z-10 max-w-[1100px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-stretch justify-center">
               
               {/* Left Side: Contact Info */}
               <motion.div 
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="lg:w-1/2 flex flex-col justify-start pt-2 pr-4 lg:pr-12"
               >
                  <h2 className="text-[2rem] font-bold text-[#444444] mb-10 font-sans tracking-tight leading-tight">
                     Contact <span className="text-[#e41e26]">Information</span>
                  </h2>
                  
                  <ul className="space-y-6 text-[15px] text-[#444444] font-medium mb-10 leading-relaxed">
                     <li className="flex items-start">
                        <svg className="w-5 h-5 mt-0.5 mr-4 flex-shrink-0 text-[#555555]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                        <div>
                           <a href="tel:+919428735418" className="hover:text-red-600 underline decoration-[#b0b0b0] underline-offset-4 mr-1">+91 94287 35418</a> | 
                           <a href="tel:+919033967360" className="hover:text-red-600 underline decoration-[#b0b0b0] underline-offset-4 ml-1">+91 90339 67360</a>
                        </div>
                     </li>
                     <li className="flex items-start">
                        <svg className="w-5 h-5 mt-1 mr-4 flex-shrink-0 text-[#555555]" fill="currentColor" viewBox="0 0 24 24"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                        <div>
                           <div className="mb-1"><a href="mailto:info@phitech.co.in" className="hover:text-red-600 underline decoration-[#b0b0b0] underline-offset-4 pointer-events-auto">info@phitech.co.in</a> <span className="text-[#666666] font-normal">(Commercial)</span></div>
                           <div><a href="mailto:design@phitech.co.in" className="hover:text-red-600 underline decoration-[#b0b0b0] underline-offset-4 pointer-events-auto">design@phitech.co.in</a> <span className="text-[#666666] font-normal">(Technical)</span></div>
                        </div>
                     </li>
                     <li className="flex items-start">
                        <svg className="w-5 h-5 mt-1 mr-4 flex-shrink-0 text-[#555555]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        <div className="leading-relaxed">
                           Shed No. 1, Plot No. C-11P, Survey No. 48/1 P-2, Maruti<br/>
                           Industrial Area, Near P.G.V.C.L. Office, Vavdi Industrial Area,<br/>
                           Gujarat-India 360004.
                        </div>
                     </li>
                  </ul>

                  {/* Social Icons */}
                  <div className="flex space-x-3 mb-8">
                     {/* Facebook */}
                     <a href="https://www.facebook.com/techphi" className="w-[34px] h-[34px] rounded-full bg-[#1877f2] flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                     </a>
                     {/* Instagram */}
                     <a href="https://www.instagram.com/phitechsolutions" className="w-[34px] h-[34px] rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                     </a>
                  </div>

                  {/* Small Map Embed (zoomed out to show India roughly) */}
                  <div className="w-[440px] max-w-full h-[250px] border-[3px] border-white shadow-md relative group bg-gray-200">
                     <iframe
                        title="Phitech Solutions Location India"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        src="https://maps.google.com/maps?q=PhiTECH%20Solutions,%20Vavdi,%20Rajkot&t=&z=6&ie=UTF8&iwloc=&output=embed"
                     ></iframe>
                  </div>
               </motion.div>

               {/* Right Side: Form Box */}
               <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="lg:w-[480px] bg-[#53504e] rounded-[4px] p-8 pb-10 shadow-2xl text-white w-full border-[1.5px] border-[#5a5755]"
               >
                  <h3 className="text-2xl font-bold mb-6 font-sans tracking-tight leading-snug">
                     Fill Out The Form Below & We'll<br/>Be In Touch Right Away!
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-[14px]">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                        <input name="firstName" value={formData.firstName} onChange={handleChange} required type="text" placeholder="First Name" className="w-full px-3 py-2.5 bg-[#fafafa] border border-transparent rounded-[3px] focus:outline-none focus:ring-1 focus:ring-[#e41e26] text-slate-800 placeholder-slate-400 text-[13px]" />
                        <input name="lastName" value={formData.lastName} onChange={handleChange} required type="text" placeholder="Last Name" className="w-full px-3 py-2.5 bg-[#fafafa] border border-transparent rounded-[3px] focus:outline-none focus:ring-1 focus:ring-[#e41e26] text-slate-800 placeholder-slate-400 text-[13px]" />
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                        <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="Email Address" className="w-full px-3 py-2.5 bg-[#fafafa] border border-transparent rounded-[3px] focus:outline-none focus:ring-1 focus:ring-[#e41e26] text-slate-800 placeholder-slate-400 text-[13px]" />
                        <input name="phone" value={formData.phone} onChange={handleChange} required type="tel" placeholder="Phone Number" className="w-full px-3 py-2.5 bg-[#fafafa] border border-transparent rounded-[3px] focus:outline-none focus:ring-1 focus:ring-[#e41e26] text-slate-800 placeholder-slate-400 text-[13px]" />
                     </div>
                     
                     {/* Select service dropdown with thin chevron */}
                     <div className="relative">
                        <select name="service" value={formData.service} onChange={handleChange} required className="appearance-none w-full px-3 py-2.5 bg-[#fafafa] border border-transparent rounded-[3px] focus:outline-none focus:ring-1 focus:ring-[#e41e26] text-slate-500 text-[14px] font-normal cursor-pointer">
                           <option value="">Select Service</option>
                           <option value="Mould Manufacturing">Mould Manufacturing</option>
                           <option value="3D Scanning/CMM">3D Scanning/CMM</option>
                           <option value="Product Designing">Product Designing</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                     </div>
                     
                     <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Your Message" rows={4} className="w-full px-3 py-3 bg-[#fafafa] border border-transparent rounded-[3px] focus:outline-none focus:ring-1 focus:ring-[#e41e26] text-slate-800 placeholder-slate-400 text-[13px] resize-none"></textarea>
                     
                     <div className="flex flex-col space-y-4 pt-1">
                        {/* reCAPTCHA style box */}
                        <div className="flex items-center justify-between bg-[#f9f9f9] border border-[#d3d3d3] rounded-[3px] p-[6px] pl-3 w-full sm:w-[270px]">
                           <div className="flex items-center">
                              <input type="checkbox" required className="w-[20px] h-[20px] mr-2 cursor-pointer" />
                              <span className="text-[13.5px] text-[#4d4d4d] font-sans">I'm not a robot</span>
                           </div>
                           <div className="flex flex-col items-center justify-center mr-1">
                              <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" className="w-7 h-7" alt="reCAPTCHA" />
                              <div className="text-[9px] text-[#555] font-sans flex mt-[1px] space-x-[2px]">
                                 <span className="hover:underline cursor-pointer">Privacy</span>
                                 <span>-</span>
                                 <span className="hover:underline cursor-pointer">Terms</span>
                              </div>
                           </div>
                        </div>

                        <button type="submit" disabled={loading} className={`bg-[#e0141e] hover:bg-[#c9121a] text-white font-bold py-[9px] px-7 rounded-[4px] transition-colors self-start text-[14px] shadow-sm ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                           {loading ? 'Submitting...' : 'Submit'}
                        </button>
                     </div>
                  </form>
               </motion.div>

            </div>
         </div>
      </section>
   );
}
