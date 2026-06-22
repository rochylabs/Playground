import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deutsch A1 Prüfungsvorbereitung",
  description: "Interactive German A1 exam preparation — Listening, Speaking, Reading & Writing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="text-center text-xs text-gray-400 py-4">
          Deutsch A1 Prep · Viel Erfolg! 🇩🇪
        </footer>
      </body>
    </html>
  );
}
