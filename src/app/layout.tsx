import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "../lib/registry";
import GlobalStyles from "../styles/GlobalStyles";
import ClientThemeProvider from "../components/ClientThemeProvider";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EIS Lab - Ice Cream Innovation",
    template: "%s | EIS Lab"
  },
  description: "Join the EIS Lab family and become part of an innovative ice cream franchise. Discover our unique flavors and franchise opportunities.",
  keywords: ["ice cream", "franchise", "EIS Lab", "innovation", "desserts", "business opportunity"],
  authors: [{ name: "EIS Lab" }],
  creator: "EIS Lab",
  publisher: "EIS Lab",
  metadataBase: new URL('https://eislab.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "EIS Lab - Ice Cream Innovation",
    description: "Join the EIS Lab family and become part of an innovative ice cream franchise. Discover our unique flavors and franchise opportunities.",
    url: 'https://eislab.com',
    siteName: 'EIS Lab',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EIS Lab - Ice Cream Innovation',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "EIS Lab - Ice Cream Innovation",
    description: "Join the EIS Lab family and become part of an innovative ice cream franchise. Discover our unique flavors and franchise opportunities.",
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual code
  },
  category: 'food & beverage',
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1E1A4A",
};

import OnePagerTransitions from '../components/OnePagerTransitions'; // Import OnePagerTransitions

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "EIS Lab",
              "description": "Join the EIS Lab family and become part of an innovative ice cream franchise. Discover our unique flavors and franchise opportunities.",
              "url": "https://eislab.com",
              "logo": "https://eislab.com/images/logo.png",
              "sameAs": [
                "https://facebook.com/eislab",
                "https://instagram.com/eislab",
                "https://twitter.com/eislab"
              ]
            })
          }}
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <ClientThemeProvider>
            <OnePagerTransitions>
              {children}
            </OnePagerTransitions>
          </ClientThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
