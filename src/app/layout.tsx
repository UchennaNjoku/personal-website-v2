import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import StickyCursor from "@/components/StickyCursor";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uchenna Njoku - Software Engineer",
  description: "Software Engineering Portfolio of Uchenna Njoku",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}> 
        {children}
      </body>
    </html>
  );
}
