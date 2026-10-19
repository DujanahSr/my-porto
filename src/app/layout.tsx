/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Abu Dujanah Siregar | Backend & Full-Stack Developer",
  description: "Portfolio of Abu Dujanah Siregar — Backend & Full-Stack Developer specializing in Java Spring Boot, React.js, Microservices & Distributed Architecture.",
  robots: { index: true, follow: true },
};

import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CommandPalette } from "@/components/CommandPalette";
import { MiniTerminalREPL } from "@/components/MiniTerminalREPL";
import { SubmersibleDiveMode } from "@/components/submersible/SubmersibleDiveMode";
import { XRayBlueprintMode } from "@/components/xray/XRayBlueprintMode";
import { ArchitecturalCoPilot } from "@/components/copilot/ArchitecturalCoPilot";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <CustomCursor />
          <Preloader />
          <LanguageProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <CommandPalette />
            <MiniTerminalREPL />
            <SubmersibleDiveMode />
            <XRayBlueprintMode />
            <ArchitecturalCoPilot />
          </LanguageProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
