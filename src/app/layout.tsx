import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MetaPixel } from "@/components/MetaPixel";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Falcon Eye Security | Elite VIP Protection",
  description: "Discreet, world-class security for HNWIs, executives, diplomats & events. Providing premium security services in Sri Lanka.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} scroll-smooth antialiased`}>
      <head>
        <MetaPixel />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-gold-500 selection:text-white pt-24 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow flex flex-col">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
