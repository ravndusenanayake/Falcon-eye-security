"use client";

import React from "react";
import { motion } from "framer-motion";

const videos = [
  "https://res.cloudinary.com/de81b81yk/video/upload/v1782190951/AQN8RhnyG3qS6zjOZPdJqyPB25dH_-8zuv7igRQZI4N8I82IWQTqrHxw7Wkr5lDMtsT9cBb_BXkiNGSuNokboW88TAFTPE4YM1M3nuleTdetfw_b89rdj.mp4",
  "https://res.cloudinary.com/de81b81yk/video/upload/v1782190953/AQOD7Gi6y74kyKSBLvdOhGIM6gp4YIbKKUCspWV5NSYK0KXbmH5q3zy2C0gt650zaDj2QGSWuF-Qm_2Mr9ibTFonN10kuIZGj06sx2UJD5qHwg_fokt2e.mp4",
  "https://res.cloudinary.com/de81b81yk/video/upload/v1782191104/AQPPf90fbxROX6mdKhmdo_RF9Xj5X5pQyDGiAqOlZKc3js1eINoYYTe0mTjxpw5itQtGoAxyjkTYdzU9rKoQxTEJ2kQwPB4Aka4_iuuzlz.mp4",
  "https://res.cloudinary.com/de81b81yk/video/upload/v1782190945/AQOrklQ1rEEloTbeMHZSRi8JOhprn5PH9xvduLpjFzCgpIHAWztN2sEFShMo61MztHyk59azmRZxUD4pR7XDo34Lkd3RFRUyLC3H9afM9T67LA_xiadqe.mp4",
  "https://res.cloudinary.com/de81b81yk/video/upload/v1782190944/AQNZFJsB-XKUK2BMfVS4aSPV3wumBEnX-92zEkTBwmmJ0jDlsqwzrll0G9M6hAvOlTeiHMK1xdYLp4sbmKZE-Mhezpe23G3FkV3lpQseRApiAw_vj8g3x.mp4"
];

export function VideoMarquee() {
  // Duplicate the array to create a seamless infinite loop
  const duplicatedVideos = [...videos, ...videos];

  return (
    <section className="py-24 bg-black-900 border-y border-white/5 overflow-hidden relative">
      <div className="text-center mb-16 px-6">
        <div className="text-gold-500 text-sm font-bold tracking-[0.2em] uppercase mb-4">
          Field Operations
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Real-World Deployments</h2>
        <p className="text-gray-400 max-w-2xl mx-auto font-light text-xl">
          Witness our elite personnel executing precise security protocols in live environments.
        </p>
      </div>

      <div className="relative w-full flex">
        {/* Left and Right Fade Overlays for smooth entry/exit */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black-900 to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex gap-6 w-max px-3 hover:[animation-play-state:paused]"
        >
          {duplicatedVideos.map((videoSrc, index) => (
            <div
              key={index}
              className="relative w-[280px] sm:w-[320px] aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] bg-black-950 shrink-0 group"
            >
              <video
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold text-white tracking-widest uppercase">Live Feed</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
