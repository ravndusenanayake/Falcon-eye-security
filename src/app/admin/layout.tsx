"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, LayoutDashboard, Inbox, Users, Calendar, DollarSign, LogOut } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Inquiries", href: "/admin/inquiries", icon: Inbox },
  { name: "Staff", href: "/admin/staff", icon: Users },
  { name: "Deployments", href: "/admin/deployments", icon: Calendar },
  { name: "Finance", href: "/admin/finance", icon: DollarSign },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-black-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-black-900 border-r border-white/5 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-gold-500" />
            <span className="text-lg font-bold tracking-tight text-white uppercase">
              Admin Portal
            </span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
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
            <div>
              <p className="text-sm font-medium text-white">Super Admin</p>
              <p className="text-xs text-gray-500">owner@falcon.lk</p>
            </div>
          </div>
          <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors">
            <LogOut className="h-5 w-5 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-white/5 bg-black-900/50 backdrop-blur-md flex items-center px-8 shrink-0">
          <h1 className="text-xl font-semibold text-white">
            {navigation.find(n => pathname === n.href || pathname.startsWith(`${n.href}/`))?.name || "Dashboard"}
          </h1>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
