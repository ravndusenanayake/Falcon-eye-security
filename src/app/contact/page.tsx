"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Mail, Phone, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

function ContactForm() {
  const searchParams = useSearchParams();
  const defaultService = searchParams.get("service") || "";

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-10 rounded-2xl border border-gold-500/30 text-center"
      >
        <div className="w-20 h-20 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-gold-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Inquiry Received</h3>
        <p className="text-gray-400 mb-8">
          Thank you for reaching out. A security specialist will review your requirements and contact you shortly to arrange a confidential consultation.
        </p>
        <Button onClick={() => setStatus("idle")} variant="outline">Submit Another Request</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass p-8 md:p-10 rounded-2xl border border-white/5 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">First Name</label>
          <input required type="text" id="firstName" name="firstName" className="w-full bg-black-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all" placeholder="John" />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">Last Name</label>
          <input required type="text" id="lastName" name="lastName" className="w-full bg-black-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all" placeholder="Doe" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
          <input required type="email" id="email" name="email" className="w-full bg-black-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all" placeholder="john@company.com" />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number (WhatsApp Preferred)</label>
          <input required type="tel" id="phone" name="phone" className="w-full bg-black-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all" placeholder="+94 77 XXX XXXX" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="service" className="block text-sm font-medium text-gray-300">Required Service</label>
        <select required id="service" name="service" defaultValue={defaultService} className="w-full bg-black-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all appearance-none">
          <option value="" disabled>Select a service...</option>
          <option value="Personal Protection">Personal Protection (Bodyguards)</option>
          <option value="Corporate Security">Corporate Security (Events/Venues)</option>
          <option value="Diplomatic Escort">Diplomatic Escort</option>
          <option value="Other">Other Specialized Needs</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="details" className="block text-sm font-medium text-gray-300">Security Details / Threat Assessment Needs</label>
        <textarea required id="details" name="details" rows={4} className="w-full bg-black-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none" placeholder="Please provide brief details about your operational requirements, dates, and locations. All information is held in strict confidence." />
      </div>

      {/* Honeypot field for basic bot protection */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="pt-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Shield className="h-4 w-4 text-gold-500" />
          <span>SSL Secured & Confidential</span>
        </div>
        <Button type="submit" disabled={status === "submitting"} size="lg" className="px-8">
          {status === "submitting" ? "Processing..." : "Submit Inquiry"}
        </Button>
      </div>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-black-950 pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Request a <span className="text-gold-500">Consultation</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Contact us for a confidential threat assessment. Our specialists are available 24/7 for urgent operational requirements.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="glass p-8 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6">Direct Contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-lg text-gold-500">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Operations Line (24/7)</p>
                    <a href="tel:0750000000" className="text-lg text-white hover:text-gold-500 transition-colors">075 XXX XXXX</a>
                    <p className="text-xs text-gold-500 mt-1">WhatsApp Available</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-lg text-gold-500">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Email Address</p>
                    <a href="mailto:info@falconeyesecurity.lk" className="text-lg text-white hover:text-gold-500 transition-colors">info@falconeyesecurity.lk</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-lg text-gold-500">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Headquarters</p>
                    <p className="text-lg text-white">Colombo, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-gold p-6 rounded-2xl border border-gold-500/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-gold-500 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white mb-2">Emergency Response</h4>
                  <p className="text-sm text-gray-300">For immediate threats or urgent deployments within the next 24 hours, please call our Operations Line directly instead of using the form.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Suspense fallback={<div className="glass h-[500px] rounded-2xl animate-pulse" />}>
              <ContactForm />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
