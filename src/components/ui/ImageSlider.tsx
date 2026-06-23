"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg"
];

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full mx-auto h-[400px] sm:h-[500px] lg:h-[700px] xl:h-[800px] overflow-hidden rounded-3xl glass border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Falcon Eye Security Operations"
        />
      </AnimatePresence>
      
      {/* Gradient Overlay for better blend */}
      <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-transparent to-transparent opacity-80" />
      
      {/* Slider Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentIndex ? "w-8 bg-gold-500" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
