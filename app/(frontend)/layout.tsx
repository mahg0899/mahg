import type { Metadata } from "next";
import { Geist, Geist_Mono, Bitcount_Prop_Single, Orbitron, Inter } from "next/font/google";
import Header from "./components/header";
import Footer from "./components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bitcount = Bitcount_Prop_Single({
  variable: "--font-bitcount",
  subsets: ["latin"],
  adjustFontFallback: false,
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAHG - Frontend Developer",
  description: "MAHG.me - Frontend Developer",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/mahg_logo.png" type="image/x-icon" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bitcount.variable} ${orbitron.variable} ${inter.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
