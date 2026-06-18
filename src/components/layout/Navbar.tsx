"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "VIP Services", href: "/services" },
  { name: "Our Squad", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 glass border-b border-white/5">
        <nav className="flex items-center justify-between p-6 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
              <div className="relative h-12 w-12 group-hover:scale-105 transition-transform overflow-hidden rounded-full shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <img src="/logo.jpg" alt="Falcon Eye Security Logo" className="object-cover w-full h-full" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase hidden sm:block">
                Falcon Eye <span className="text-gold-500">Security</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-300 hover:text-gold-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
            <ThemeToggle />
            <Link href="/contact">
              <Button>Request Quote</Button>
            </Link>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50 bg-black-950/80 backdrop-blur-sm" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    <img src="/logo.jpg" alt="Falcon Eye Security Logo" className="object-cover w-full h-full" />
                  </div>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-300 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-white/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-white/5 hover:text-gold-500"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">Request Quote</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="h-24" />
    </>
  );
}
