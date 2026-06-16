"use client";

import { motion } from "framer-motion";
import { Shield, Users, Briefcase, ChevronRight, CheckCircle2 } from "lucide-react";
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
        details: "Highly trained personnel providing physical security for individuals against threats.",
      },
      {
        name: "VIP Escort Services",
        details: "Secure transportation and route planning to ensure safe transit between locations.",
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
        details: "Crowd control, access management, and emergency response planning for large gatherings.",
      },
      {
        name: "Venue Protection",
        details: "24/7 securing of corporate facilities, private estates, and temporary event spaces.",
      }
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-black-950">
      {/* Header */}
      <section className="relative py-24 border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=2033&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black-950 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Elite Security <span className="text-gold-500">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Explore our specialized security packages designed for maximum protection and minimal intrusion.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass p-8 md:p-12 rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-gold-500/10 rounded-xl">
                    <category.icon className="h-10 w-10 text-gold-500" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{category.title}</h2>
                    <p className="text-gray-400 mt-1">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {category.services.map((service, sIndex) => (
                    <div key={sIndex} className="bg-black-900/50 p-6 rounded-xl border border-white/5 hover:border-gold-500/30 transition-colors">
                      <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-gold-500" />
                        {service.name}
                      </h3>
                      <p className="text-gray-400 leading-relaxed pl-7">{service.details}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-white/10">
                  <Link href={`/contact?service=${encodeURIComponent(category.title)}`}>
                    <Button className="w-full">
                      Book {category.title}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
