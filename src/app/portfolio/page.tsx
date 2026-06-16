"use client";

import { motion } from "framer-motion";
import { Shield, Star, Award, CheckCircle } from "lucide-react";

// Placeholder data for portfolio
const guards = [
  {
    id: 1,
    name: "Officer D. Perera",
    role: "Senior Close Protection Officer",
    image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1776&auto=format&fit=crop",
    qualifications: ["Ex-Military", "Advanced VIP Escort", "Unarmed Combat Expert"],
  },
  {
    id: 2,
    name: "Officer M. Silva",
    role: "Event Security Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
    qualifications: ["Crowd Control Specialist", "Emergency First Responder", "Risk Assessment"],
  },
  {
    id: 3,
    name: "Officer R. Fernando",
    role: "Tactical Response Unit",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    qualifications: ["Special Forces Background", "Advanced Firearms", "Defensive Driving"],
  },
  {
    id: 4,
    name: "Officer K. Jayasuriya",
    role: "Corporate Security Specialist",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1887&auto=format&fit=crop",
    qualifications: ["Asset Protection", "Surveillance Expert", "First Aid Certified"],
  }
];

const stats = [
  { label: "Active Guards", value: "50+", icon: Shield },
  { label: "Successful Deployments", value: "200+", icon: Star },
  { label: "VIP Clients", value: "85+", icon: Award },
];

export default function PortfolioPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-black-950">
      {/* Header */}
      <section className="relative py-24 border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582136014387-a2928509e51c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/80 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold mb-6"
          >
            <Shield className="h-4 w-4 text-gold-500" />
            <span className="text-sm font-medium text-gold-400 uppercase tracking-wider">The Falcon Eye Standard</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Our <span className="text-gold-500">Squad</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Meet the highly trained professionals who form the backbone of our elite security operations.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-black-900 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center justify-center p-6 glass rounded-2xl"
              >
                <stat.icon className="h-10 w-10 text-gold-500 mb-4" />
                <span className="text-4xl font-bold text-white mb-2">{stat.value}</span>
                <span className="text-gray-400 font-medium uppercase tracking-wider text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roster Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Elite Personnel</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our officers are carefully selected, rigorously trained, and bound by strict confidentiality agreements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guards.map((guard, index) => (
              <motion.div
                key={guard.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-300"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-black-800">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    style={{ backgroundImage: `url(${guard.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{guard.name}</h3>
                    <p className="text-gold-500 text-sm font-medium mb-4">{guard.role}</p>
                    
                    <ul className="space-y-2">
                      {guard.qualifications.map((qual, qIdx) => (
                        <li key={qIdx} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle className="h-3.5 w-3.5 text-gold-500 shrink-0 mt-0.5" />
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
