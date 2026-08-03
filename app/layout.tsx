import "./globals.css";

import { Inter } from "next/font/google";
import "modern-normalize/modern-normalize.css";

import type { Metadata } from "next";

import TanstackProvider from "@/components/TanstackProvider/TanstackProvider";
import Header from "@/components/Header/Header";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travel Trucks",
  description: "Application for truck rental",
  icons: {
    icon: "/minibus-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interSans.variable}`}>
      <body>
        <TanstackProvider>
          <Header />
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
