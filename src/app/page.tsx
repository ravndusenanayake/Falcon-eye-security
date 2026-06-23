"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Users, Briefcase, ChevronRight, Phone, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { VideoMarquee } from "@/components/ui/VideoMarquee";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-black-950">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="https://res.cloudinary.com/de81b81yk/video/upload/q_auto/f_auto/v1781763869/hero_u6bonl.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black-950/95 via-black-950/70 to-black-950/30 z-10" />

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col items-start pt-20 pb-16 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold mb-8 bg-black/40 backdrop-blur-md border border-white/10"
          >
            <Shield className="h-4 w-4 text-gold-500" />
            <span className="text-sm font-medium text-gold-400 uppercase tracking-wider">Premium Security Services</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 tracking-tight max-w-4xl"
          >
            Discreet, World-Class <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">
              Security
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl font-light leading-relaxed drop-shadow-lg"
          >
            For High-Net-Worth Individuals, executives, diplomats & high-profile events. Elite protection deployed across Sri Lanka.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4"
          >
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-shadow">
                Hire Us
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="https://wa.me/94756322412" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 bg-black/30 backdrop-blur-md border-white/20 hover:bg-white/10 text-white transition-colors">
                <Phone className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
            </a>
          </motion.div>

          {/* Floating UI Elements on the Video - Moved to bottom right */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 1 }}
             className="absolute bottom-8 right-6 z-20 hidden md:flex flex-col items-end gap-4"
          >
            <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live
              </span>
            </div>
            <div className="glass-gold p-4 rounded-xl border border-gold-500/30 bg-black/40 backdrop-blur-md text-right">
              <p className="text-sm font-semibold text-white mb-1">Falcon Eye Squads</p>
              <p className="text-xs text-gold-400">On Duty 24/7</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-black-950 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Elite Services</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Comprehensive security solutions tailored to your specific requirements and threat level.</p>
          </div>

          <div className="flex flex-col gap-32">
            {[
              {
                title: "VIP Protection",
                description: "Close protection officers and bodyguards trained for high-threat environments and discreet escorting.",
                image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=2033&auto=format&fit=crop",
              },
              {
                title: "Event Security",
                description: "Comprehensive crowd control, venue access management, and emergency response for high-profile events.",
                image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop",
              },
              {
                title: "Corporate & Diplomat",
                description: "Secure transportation, asset protection, and executive guarding for corporate leaders and diplomats.",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
              }
            ].map((service, index) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-20`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                </div>
                
                {/* Text Side */}
                <div className="w-full lg:w-1/2">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Service 0{index + 1}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{service.title}</h3>
                  <p className="text-xl text-gray-400 leading-relaxed mb-10 font-light">{service.description}</p>
                  <Link href="/services">
                    <Button size="lg" className="text-lg px-8 py-6 bg-transparent border border-gold-500/50 text-gold-500 hover:bg-gold-500 hover:text-black-950 transition-all duration-300">
                      Explore Service <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <VideoMarquee />

      {/* Trust & Credibility Section */}
      <section className="py-24 bg-black-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Falcon Eye?</h2>
              <div className="space-y-6">
                {[
                  "Highly trained personnel with military or law enforcement backgrounds",
                  "Strict confidentiality and Non-Disclosure Agreements (NDAs)",
                  "24/7 Rapid response capabilities",
                  "Customized threat assessment for every deployment"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="mt-1 p-1 rounded-full bg-gold-500/20 text-gold-500">
                      <Shield className="h-4 w-4" />
                    </div>
                    <p className="text-gray-300 text-lg">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link href="/portfolio">
                  <Button variant="outline">View Our Squad</Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group"
            >
              <div 
                className="absolute inset-0 bg-cover bg-top transition-transform duration-1000 group-hover:scale-110 opacity-70"
                style={{ backgroundImage: "url('https://res.cloudinary.com/de81b81yk/image/upload/v1782193185/467184105_558407270461234_2113352272362722298_n_hohr3c.jpg')" }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-950/90 via-black-950/20 to-transparent pointer-events-none" />
              
              {/* Expandable Details Card on Hover */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full pointer-events-none">
                <div className="bg-black-900/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl pointer-events-auto transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gold-500 transition-transform duration-500 origin-bottom scale-y-50 group-hover:scale-y-100" />
                  <div className="flex flex-col ml-4">
                    <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600 tracking-tight">100+</span>
                    <span className="text-sm md:text-base text-gray-200 uppercase tracking-widest font-bold mt-2">Successful Deployments</span>
                    
                    {/* CSS Grid hack for smooth auto-height animation */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                      <div className="overflow-hidden">
                        <p className="text-gray-400 mt-4 leading-relaxed font-light text-sm md:text-base border-t border-white/10 pt-4">
                          Our elite forces have flawlessly executed over a hundred high-profile security operations, ensuring absolute safety, zero compromises, and total confidentiality for diplomats, executives, and VIPs across Sri Lanka.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-24 bg-black-950 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-gold-500/5 opacity-50" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="text-gold-500 text-sm font-bold tracking-[0.2em] uppercase mb-4">
              Gallery
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Our Forces in Action</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light">Glimpses of our elite security personnel on deployment across various high-profile operations.</p>
          </div>
          <ImageSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center bg-black-950">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-50"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582136014387-a2928509e51c?q=80&w=2070&auto=format&fit=crop')" }}
        />
        
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/40 to-black-950/80" />
        
        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg tracking-tight"
          >
            Ready to secure your peace of mind?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light drop-shadow-md"
          >
            Contact us for a confidential consultation and a comprehensive threat assessment tailored to your needs.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/contact">
              <Button size="lg" className="text-lg px-12 h-14 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_40px_rgba(234,179,8,0.6)] transition-all duration-300 transform hover:-translate-y-1">
                Request Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
