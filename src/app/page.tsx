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
      <section className="relative py-32 border-b border-white/5 overflow-hidden group min-h-[500px] flex items-center">
        {/* Full Section Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-105"
          style={{ backgroundImage: "url('https://res.cloudinary.com/de81b81yk/image/upload/v1782193185/467184105_558407270461234_2113352272362722298_n_hohr3c.jpg')" }}
        />
        {/* Dynamic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black-950 via-black-950/80 to-transparent z-0" />
        <div className="absolute inset-0 bg-black-950/40 group-hover:bg-black-950/80 transition-colors duration-700 z-0 backdrop-blur-[2px] group-hover:backdrop-blur-sm" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            {/* Always Visible Topic */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-xl"
            >
              Why Choose <br className="hidden sm:block" />
              <span className="text-gold-500">Falcon Eye?</span>
            </motion.h2>

            <p className="hidden lg:block text-gold-400 font-medium tracking-widest uppercase text-sm mb-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
              Hover to discover our standard
            </p>

            {/* Expandable Details on Hover (Always expanded on mobile) */}
            <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
              <div className="overflow-hidden">
                <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 border-t border-gold-500/30">
                  {[
                    "Highly trained personnel with military or law enforcement backgrounds",
                    "Strict confidentiality and Non-Disclosure Agreements (NDAs)",
                    "24/7 Rapid response capabilities",
                    "Customized threat assessment for every deployment"
                  ].map((point, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 sm:gap-4"
                    >
                      <div className="mt-1 p-1 rounded-full bg-gold-500/20 text-gold-500 shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                        <Shield className="h-4 w-4" />
                      </div>
                      <p className="text-gray-200 text-base sm:text-lg md:text-xl font-light drop-shadow-md">{point}</p>
                    </motion.div>
                  ))}

                  <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                    <Link href="/portfolio" className="w-full sm:w-auto">
                      <Button size="lg" className="w-full sm:w-auto bg-gold-500 hover:bg-gold-400 text-black-950 px-8 h-14 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all">
                        View Our Squad
                      </Button>
                    </Link>

                    <div className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-4 bg-black/60 lg:bg-black/40 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 shadow-xl">
                      <span className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">100+</span>
                      <span className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-widest font-bold leading-tight">Successful<br />Deployments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-24 bg-black-950 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-gold-500/5 opacity-50" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="text-gold-500 text-sm font-bold tracking-[0.2em] uppercase mb-4">
              Gallery
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Our Forces in Action</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light">Glimpses of our elite security personnel on deployment across various high-profile operations.</p>
          </div>
        </div>
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 relative z-10">
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
