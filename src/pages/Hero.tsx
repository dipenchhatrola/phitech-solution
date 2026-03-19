import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0); // Start on Delivering Innovation

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Dispatch custom event for Navbar to pick up dark slide
    useEffect(() => {
        const event = new CustomEvent('slideChange', { detail: { slide: currentSlide } });
        window.dispatchEvent(event);
    }, [currentSlide]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 3);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 3) % 3);

    // Helper component for Hexagons
    const HexBorder = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

    return (
        <section className="relative h-[650px] lg:h-[750px] overflow-hidden bg-slate-100 flex items-center justify-center">

            {/* SLIDE 0: Delivering Innovation (Horizontal Line of Circles) */}
            <div className={`absolute inset-0 bg-[#f5f6f8] transition-opacity duration-3000 flex flex-col items-center justify-center pt-6 ${currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>

                {/* Heading Text restored to match Image 1 */}
                <motion.div 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: currentSlide === 0 ? 0 : 30, opacity: currentSlide === 0 ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center w-full mb-4 z-10"
                >
                    <h1 className="text-3xl md:text-5xl font-display font-black text-[#e41e26] mb-2">Delivering Innovation</h1>
                    <p className="text-xl md:text-3xl text-slate-700 font-bold">We provide solution for</p>
                </motion.div>

                <div className="w-full max-w-5xl mx-auto flex justify-center items-center px-4 z-10">
                    <img
                        src="/slider-image.png"
                        alt="Innovation Services Hexagon Arch"
                        className="w-full h-[450px] drop-shadow-xl"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://phitech.co.in/wp-content/uploads/2023/07/Banner-1-product-1.png";
                        }}
                    />
                </div>

                <div className="text-center w-full mb-4 z-10">
                    <p className="text-xl md:text-3xl text-slate-700 font-bold">Mould</p>
                    <p className="text-xl md:text-3xl text-slate-700 font-bold">Manufacturing</p>
                </div>
            </div>

            {/* SLIDE 1: Factory Title Background */}
            <div className={`absolute inset-0 transition-opacity duration-3000 ${currentSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('https://phitech.co.in/wp-content/uploads/2023/07/Banner-2-min.jpg')" }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <motion.div 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: currentSlide === 1 ? 0 : 30, opacity: currentSlide === 1 ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
                >
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-wide font-display drop-shadow-lg">The leading manufacturer of</h2>
                    <h1 className="text-6xl md:text-[5.5rem] lg:text-[7rem] font-display font-black text-white mb-6 tracking-tight leading-none drop-shadow-2xl">Plastic Moulds</h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-slate-100 font-medium tracking-wide drop-shadow-lg">We provide a professional service for individual and corporate customers.</p>
                </motion.div>
            </div>

            {/* SLIDE 2: Services Hexagons Design Arch */}
            <div className={`absolute inset-0 bg-[#f5f6f8] transition-opacity duration-3000 flex flex-col items-center justify-center pt-6 ${currentSlide === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                <div className="w-full max-w-5xl mx-auto flex justify-center items-center px-4 z-10">
                    <img
                        src="/services-hexagons.png"
                        alt="Innovation Services Hexagon Arch"
                        className="w-full h-auto drop-shadow-xl"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://phitech.co.in/wp-content/uploads/2023/07/Banner-3-prod.png";
                        }}
                    />
                </div>
                <motion.div 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: currentSlide === 2 ? 0 : 30, opacity: currentSlide === 2 ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center w-full mb-4 z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-display font-black text-[#e41e26] mb-2">Services</h1>
                    <p className="text-xl md:text-3xl text-slate-700 font-bold">We provide</p>
                </motion.div>
            </div>

            {/* Carousel View Controls */}
            <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 rounded-full text-white flex items-center justify-center hover:bg-black/60 z-30 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 rounded-full text-white flex items-center justify-center hover:bg-black/60 z-30 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
                {[0, 1, 2].map((i) => (
                    <button key={i} onClick={() => setCurrentSlide(i)} className={`w-3 h-3 rounded-full transition-colors ${currentSlide === i ? 'bg-brand-600 scale-125' : 'bg-black/20 hover:bg-black/40'}`}></button>
                ))}
            </div>
        </section>
    );
}