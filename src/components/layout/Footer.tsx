"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Link as LinkIcon, Mail, MapPin, Phone } from "lucide-react";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-black-900 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-gold-500" />
              <span className="text-2xl font-bold tracking-tight text-white uppercase">
                Falcon Eye <span className="text-gold-500">Security</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Discreet, world-class security for High-Net-Worth Individuals, executives, diplomats, and high-profile events across Sri Lanka. Your safety is our highest priority.
            </p>
            <div className="flex gap-4 mt-8">
              <a href="https://web.facebook.com/profile.php?id=100088758960548" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-gold-500 hover:bg-gold-500/10 transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-gold-500 hover:bg-gold-500/10 transition-colors">
                <LinkIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              <li><Link href="/services#close-protection-bodyguards" className="text-gray-400 hover:text-gold-500 transition-colors">VIP Protection</Link></li>
              <li><Link href="/services#vip-escort-services" className="text-gray-400 hover:text-gold-500 transition-colors">Executive Guarding</Link></li>
              <li><Link href="/services#event-security" className="text-gray-400 hover:text-gold-500 transition-colors">Event Security</Link></li>
              <li><Link href="/services#venue-protection" className="text-gray-400 hover:text-gold-500 transition-colors">Diplomat Escort</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                <span>Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="h-5 w-5 text-gold-500 shrink-0" />
                <span>076 772 2412 / 075 632 2412</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="h-5 w-5 text-gold-500 shrink-0" />
                <span>info@falconeyesecurity.lk</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Falcon Eye Security. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-gold-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-500 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
