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
