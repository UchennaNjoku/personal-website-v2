import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import React from "react";
import Cursor from "@/components/Cursor";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Uchenna Njoku — Software Engineer",
  description:
    "Software engineer at Bloomberg and researcher in multi-agent reinforcement learning. Previously Goldman Sachs, Cisco · Splunk and Amazon Web Services.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090c14" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
  ],
};

// Runs before paint so the saved or system theme applies without a flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t}catch(e){}
// Scroll-reveal hides content only once scripts are confirmed running; if they never
// start, unhide everything instead of leaving a blank page.
var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.reveal='';setTimeout(function(){if(!window.__revealReady)delete d.dataset.reveal},2500)}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${plexSans.variable} ${plexMono.variable} bg-canvas font-sans text-paper antialiased`}>
        {children}
        <Cursor />
      </body>
    </html>
  );
}
