"use client";

import { motion } from "framer-motion";
import { ChevronRight, Shield, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const categories = [
  {
    title: "Personal Protection",
    description: "Discrete and professional protection for High-Net-Worth Individuals.",
    icon: Shield,
    services: [
      {
        name: "Close Protection (Bodyguards)",
        details: "Highly trained personnel providing physical security for individuals against threats. We ensure absolute safety while maintaining a discreet presence.",
        image: "https://res.cloudinary.com/de81b81yk/image/upload/v1782208149/484051788_648900844745209_5764833789580979374_n_juramx.jpg"
      },
      {
        name: "VIP Escort Services",
        details: "Secure transportation and route planning to ensure safe transit between locations. Our convoy teams are trained for rapid response and evasive driving.",
        image: "https://res.cloudinary.com/de81b81yk/image/upload/v1782208150/619250840_899560909679200_8091618227358801222_n_hyy9fg.jpg"
      }
    ]
  },
  {
    title: "Corporate Security",
    description: "Comprehensive security solutions for corporate entities and high-profile events.",
    icon: Briefcase,
    services: [
      {
        name: "Event Security",
        details: "Crowd control, access management, and emergency response planning for large gatherings. We ensure seamless operations for premium events.",
        image: "https://res.cloudinary.com/de81b81yk/image/upload/v1782208720/646094835_936925965942694_1612430073681070472_n_dqbena.jpg"
      },
      {
        name: "Venue Protection",
        details: "24/7 securing of corporate facilities, private estates, and temporary event spaces. Advanced surveillance integrated with elite guard deployment.",
        image: "https://res.cloudinary.com/de81b81yk/image/upload/v1782208149/646786558_936925915942699_7206008907785125021_n_jf4w45.jpg"
      }
    ]
  }
];

export default function ServicesPage() {
  let serviceCounter = 0;

  return (
    <div className="flex flex-col w-full min-h-screen bg-black-950">
      {/* Header */}
      <section className="relative py-32 border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=2033&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black-950 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Elite Security <span className="text-gold-500">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4"
          >
            Explore our specialized security packages designed for maximum protection and minimal intrusion.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {categories.map((category) => (
            <div key={category.title} className="mb-32 last:mb-0">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center p-3 bg-gold-500/10 rounded-xl text-gold-500 mb-4 border border-gold-500/20">
                  <category.icon className="h-8 w-8" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">{category.title}</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">{category.description}</p>
              </div>

              <div className="flex flex-col gap-24">
                {category.services.map((service) => {
                  serviceCounter++;
                  const isReverse = serviceCounter % 2 === 0;
                  
                  return (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className={`flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-20`}
                    >
                      {/* Image Side */}
                      <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                          style={{ backgroundImage: `url('${service.image}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                      </div>

                      {/* Text Side */}
                      <div className="w-full lg:w-1/2">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
                          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Service 0{serviceCounter}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{service.name}</h3>
                        <p className="text-xl text-gray-400 leading-relaxed mb-10 font-light">{service.details}</p>
                        <Link href={`/contact?service=${encodeURIComponent(service.name)}`}>
                          <Button size="lg" className="text-lg px-8 py-6 bg-transparent border border-gold-500/50 text-gold-500 hover:bg-gold-500 hover:text-black-950 transition-all duration-300">
                            Book {service.name} <ChevronRight className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
