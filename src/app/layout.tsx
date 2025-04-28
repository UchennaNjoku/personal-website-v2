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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}> 
        {children}
      </body>
    </html>
  );
}
