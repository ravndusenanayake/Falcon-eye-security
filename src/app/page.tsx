"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Users, Briefcase, ChevronRight, Phone, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageSlider } from "@/components/ui/ImageSlider";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Video & Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black-950/70 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black-950/30 via-transparent to-black-950 z-10" />
          
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            {/* Temporary cinematic stock video for demo. Replace with client's actual video in the public folder e.g. "/videos/hero.mp4" */}
            <source src="https://cdn.pixabay.com/video/2021/08/21/85860-591703276_large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold mb-8"
          >
            <Shield className="h-4 w-4 text-gold-500" />
            <span className="text-sm font-medium text-gold-400 uppercase tracking-wider">Premium Security Services</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
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
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            For High-Net-Worth Individuals, executives, diplomats & high-profile events. Elite protection deployed across Sri Lanka.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                Hire Us
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="https://wa.me/94756322412" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8">
                <Phone className="mr-2 h-5 w-5" />
                WhatsApp Us
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-black-950 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Elite Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive security solutions tailored to your specific requirements and threat level.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "VIP Protection",
                description: "Close protection officers and bodyguards trained for high-threat environments and discreet escorting.",
                icon: Shield,
              },
              {
                title: "Event Security",
                description: "Comprehensive crowd control, venue access management, and emergency response for high-profile events.",
                icon: Users,
              },
              {
                title: "Corporate & Diplomat",
                description: "Secure transportation, asset protection, and executive guarding for corporate leaders and diplomats.",
                icon: Briefcase,
              }
            ].map((service, index) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass p-8 rounded-2xl border border-white/5 hover:border-gold-500/50 transition-colors group cursor-pointer"
              >
                <div className="p-4 bg-white/5 rounded-xl inline-block mb-6 group-hover:bg-gold-500/20 transition-colors">
                  <service.icon className="h-8 w-8 text-gold-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>
                <Link href="/services" className="inline-flex items-center text-gold-500 hover:text-gold-400 font-medium">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Credibility Section */}
      <section className="py-24 bg-black-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
              className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden glass"
            >
              {/* Placeholder for guards image */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582136014387-a2928509e51c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="glass-gold px-4 py-2 rounded-lg inline-block mb-4">
                  <span className="font-bold text-gold-400">100+</span>
                  <span className="text-white ml-2">Successful Deployments</span>
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
            <div className="inline-flex items-center justify-center p-3 bg-gold-500/10 rounded-full mb-6">
              <Camera className="h-6 w-6 text-gold-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Forces in Action</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Glimpses of our elite security personnel on deployment across various high-profile operations.</p>
          </div>
          <ImageSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold-500/5" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <Shield className="h-16 w-16 text-gold-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to secure your peace of mind?</h2>
          <p className="text-xl text-gray-400 mb-10">Contact us for a confidential consultation and threat assessment.</p>
          <Link href="/contact">
            <Button size="lg" className="text-lg px-10">Request Consultation</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
