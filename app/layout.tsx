import "./globals.css";

import { Manrope } from "next/font/google";
import "modern-normalize/modern-normalize.css";

import type { Metadata } from "next";

import TanstackProvider from "@/components/shared/TanstackProvider/TanstackProvider";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PsyConnect | Find Your Perfect Psychologist Online",
  description: "Connect with verified professional therapists, psychologists, and life coaches online. Browse specialists, filter by approach, and book your session instantly to start your mental health journey.",
  keywords: ["online therapy", "find psychologist", "mental health", "book therapist", "psychological help", "PsyConnect"],
  icons: {
    icon: "/favicon-icon.jpg"
  },
   openGraph: {
    title: "PsyConnect | Find Your Perfect Psychologist Online",
    description: "Connect with verified professional therapists, psychologists, and life coaches online. Browse specialists, filter by approach, and book your session instantly to start your mental health journey.",
    url: "https://psy-connect-smoky.vercel.app", 
    siteName: "PsyConnect",
    images: [
      {
        url: "/hero.png", 
        width: 1200,
        height: 630,
        alt: "PsyConnect Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PsyConnect | Find Your Perfect Psychologist Online",
    description: "Connect with verified professional therapists, psychologists, and life coaches online. Browse specialists, filter by approach, and book your session instantly to start your mental health journey.",
    images: ["/hero.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body>
        <TanstackProvider>
          <Header />
          {children}
         <Footer />
        </TanstackProvider>
      </body>
    </html>
  );
}
