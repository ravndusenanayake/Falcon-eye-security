"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Shield, LayoutDashboard, Inbox, Users, Calendar, DollarSign, LogOut, Radio, AlertTriangle, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Inquiries", href: "/admin/inquiries", icon: Inbox },
  { name: "Staff", href: "/admin/staff", icon: Users },
  { name: "Deployments", href: "/admin/deployments", icon: Calendar },
  { name: "Assets & Devices", href: "/admin/devices", icon: Radio },
  { name: "Incidents", href: "/admin/incidents", icon: AlertTriangle },
  { name: "Finance", href: "/admin/finance", icon: DollarSign },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [user, loading, pathname, router]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium">Securing connection...</p>
        </div>
      </div>
    );
  }

  if (!user && pathname !== "/admin/login") {
    return null;
  }

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-black-950 flex items-center justify-center">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-black-950 overflow-hidden">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black-900 border-r border-white/5 flex flex-col transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-gold-500" />
            <span className="text-lg font-bold tracking-tight text-white uppercase">
              Admin
            </span>
          </Link>
          <button 
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = item.href === '/admin' 
              ? pathname === '/admin' 
              : (pathname === item.href || pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-gold-500/10 text-gold-500" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-black-950 font-bold">
              SA
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Super Admin</p>
              <p className="text-xs text-gray-500 truncate">owner@falcon.lk</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden w-full">
        <header className="h-16 border-b border-white/5 bg-black-900/50 backdrop-blur-md flex items-center px-4 lg:px-8 shrink-0 gap-4">
          <button 
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-white truncate">
            {navigation.find(n => pathname === n.href || pathname.startsWith(`${n.href}/`))?.name || "Dashboard"}
          </h1>
        </header>
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
