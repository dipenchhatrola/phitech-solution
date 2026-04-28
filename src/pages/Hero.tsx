import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0); // Start on Delivering Innovation

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    // Dispatch custom event for Navbar to pick up dark slide
    useEffect(() => {
        const event = new CustomEvent('slideChange', { detail: { slide: currentSlide } });
        window.dispatchEvent(event);
    }, [currentSlide]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 3);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 3) % 3);

    // Removed HexBorder to pass CI build unused-vars

    return (
        <section className="relative h-[650px]  overflow-hidden bg-slate-100 flex items-center justify-center">

            {/* SLIDE 0: Delivering Innovation (Horizontal Line of Circles) */}
            <div className={`absolute inset-0 transition-opacity duration-5000 flex flex-col items-center justify-center pt-28 pb-4 px-4 ${currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat "
                    style={{ backgroundImage: "url('/Banner-1.jpg')" }}
                >
                    {/* <div className="absolute inset-0 bg-white/80"></div> */}
                </div>

                {/* Heading Text restored to match Image 1 */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: currentSlide === 0 ? 0 : 30, opacity: currentSlide === 0 ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center w-full z-10 mb-2 lg:mb-4"
                >
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-[#da251d] tracking-tight">Delivering Innovation</h1>
                    <p className="text-base md:text-xl lg:text-2xl text-slate-600 font-bold tracking-wide">We provide solution for</p>
                </motion.div>

                <div className="relative w-full max-w-[85%] md:max-w-xl lg:max-w-2xl mx-auto z-10 flex-shrink-0">
                    <img
                        src="/slider-image.png"
                        alt="Innovation Services Hexagon Arch"
                        className="w-full object-contain drop-shadow-2xl"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://phitech.co.in/wp-content/uploads/2023/07/Banner-1-product-1.png";
                        }}
                    />
                    <div className="absolute bottom-[8%] md:bottom-[10%] left-1/2 -translate-x-1/2 text-center w-full z-10">
                        <p className="text-base md:text-xl lg:text-2xl text-slate-700 font-bold leading-tight md:leading-tight">Mould</p>
                        <p className="text-base md:text-xl lg:text-2xl text-slate-700 font-bold leading-tight md:leading-tight">Manufacturing</p>
                    </div>
                </div>
            </div>

            {/* SLIDE 1: Factory Title Background - Increased height to match layout of image 1 */}
            <div className={`absolute inset-0 transition-opacity duration-5000 ${currentSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
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
                    // Increased pt-20 to pt-32 and added extra pb-8 for better vertical balance
                    className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-32 pb-8"
                >
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-wide font-display drop-shadow-lg">The leading manufacturer of</h2>
                    <h1 className="text-4xl md:text-6xl lg:text-[6rem] font-display font-black text-white mb-2 md:mb-4 tracking-tight leading-none drop-shadow-2xl">Plastic Moulds</h1>
                    <p className="text-base md:text-xl lg:text-2xl text-slate-100 font-medium tracking-wide drop-shadow-lg max-w-3xl mx-auto">We provide a professional service for individual and corporate customers.</p>
                </motion.div>
            </div>

            {/* SLIDE 2: Services Hexagons Design Arch */}
            <div className={`absolute inset-0 transition-opacity duration-5000 flex flex-col items-center justify-center pt-28 pb-4 px-4 ${currentSlide === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat "
                    style={{ backgroundImage: "url('/Banner-3-min.jpg')" }}
                >
                    {/* <div className="absolute inset-0 bg-white/80"></div> */}
                </div>
                <div className="w-full max-w-[85%] md:max-w-xl lg:max-w-2xl mx-auto flex justify-center items-center z-10 flex-shrink-0 mb-2 lg:mb-4">
                    <img
                        src="/services-hexagons.png"
                        alt="Innovation Services Hexagon Arch"
                        className="w-full h-auto object-contain drop-shadow-xl"
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
                    className="text-center w-full z-10"
                >
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-black text-[#e41e26] mb-0 md:mb-1">Services</h1>
                    <p className="text-base md:text-xl lg:text-2xl text-slate-700 font-bold">We provide</p>
                </motion.div>
            </div>

            {/* Carousel View Controls */}
            <button onClick={prevSlide} className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-black/40 rounded-full text-white flex items-center justify-center hover:bg-black/60 z-30 transition-colors">
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextSlide} className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-black/40 rounded-full text-white flex items-center justify-center hover:bg-black/60 z-30 transition-colors">
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>


        </section>
    );
}