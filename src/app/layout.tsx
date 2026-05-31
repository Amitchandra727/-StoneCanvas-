import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LiveChat from "@/components/features/live-chat";
import ThemeProvider from "@/components/providers/theme-provider";
import WhatsAppButton from "@/components/features/whatsapp-button";
import MobileNav from "@/components/layout/mobile-nav";
import { metadata } from "./metadata";

export { metadata };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <LiveChat />
          <WhatsAppButton />
          <MobileNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
