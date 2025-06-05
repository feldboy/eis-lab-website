import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "../lib/registry";
import GlobalStyles from "../styles/GlobalStyles";
import Footer from "../components/Footer";
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
  title: "EIS Lab - Ice Cream Innovation",
  description: "Join the EIS Lab family and become part of an innovative ice cream franchise",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import PageTransitionWrapper from '../components/PageTransitionWrapper'; // Import PageTransitionWrapper

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StyledComponentsRegistry>
          <ClientThemeProvider>
            <GlobalStyles />
            <PageTransitionWrapper>
              {children}
            </PageTransitionWrapper>
            <Footer />
          </ClientThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
