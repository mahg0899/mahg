import type { Metadata } from "next";
import { Geist, Geist_Mono, Bitcount_Prop_Single, Orbitron, Inter } from "next/font/google";
import Header from "./components/header";
import Footer from "./components/footer";
import "./globals.css";
import { getSeoData } from "@/lib/getSeoData";

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

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getSeoData();

    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mahg.me'),
      title: {
        default: seo.siteTitle,
        template: `%s${seo.metaTitleSuffix}`,
      },
      description: seo.siteDescription,
      openGraph: {
        type: 'website',
        title: seo.siteTitle,
        description: seo.siteDescription,
        siteName: seo.siteTitle,
        ...(seo.defaultImageUrl && {
          images: [{ url: seo.defaultImageUrl, width: 1200, height: 630 }],
        }),
      },
      twitter: {
        card: seo.twitterCard,
        title: seo.siteTitle,
        description: seo.siteDescription,
        ...(seo.twitterHandle && { creator: seo.twitterHandle }),
        ...(seo.defaultImageUrl && { images: [seo.defaultImageUrl] }),
      },
      other: {
        'theme-color': seo.themeColor,
      },
      ...(seo.faviconUrl && {
        icons: { icon: seo.faviconUrl },
      }),
    };
  } catch {
    return {
      title: 'MAHG - Frontend Developer',
      description: 'MAHG.me - Frontend Developer',
    };
  }
}

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
    <html lang="es">
      <link rel="shortcut icon" href="/mahg.ico" type="image/x-icon" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bitcount.variable} ${orbitron.variable} ${inter.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
