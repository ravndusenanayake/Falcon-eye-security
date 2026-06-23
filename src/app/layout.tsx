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
  title: "Falcon Eye Security | Elite VIP Protection & Corporate Security",
  description: "Discreet, world-class security for HNWIs, executives, diplomats & events. Providing premium security services in Sri Lanka.",
  keywords: ["Security Company Sri Lanka", "VIP Protection", "Bodyguards", "Event Security", "Corporate Security", "Falcon Eye Security"],
  openGraph: {
    title: "Falcon Eye Security | Elite VIP Protection",
    description: "Discreet, world-class security for HNWIs, executives, diplomats & events.",
    url: "https://falconeyesecurity.com",
    siteName: "Falcon Eye Security",
    images: [
      {
        url: "https://images.unsplash.com/photo-1582136014387-a2928509e51c?q=80&w=2070&auto=format&fit=crop", 
        width: 1200,
        height: 630,
        alt: "Falcon Eye Security Operations",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Falcon Eye Security | Elite VIP Protection",
    description: "Premium security services in Sri Lanka. VIP Protection, Corporate Security, and Event Security.",
    images: ["https://images.unsplash.com/photo-1582136014387-a2928509e51c?q=80&w=2070&auto=format&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} scroll-smooth antialiased dark`}>
      <head>
        <MetaPixel />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-gold-500 selection:text-white transition-colors duration-300">
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
