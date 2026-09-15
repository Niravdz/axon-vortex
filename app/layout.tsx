import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AnimationProvider } from "@/components/providers/AnimationProvider";
import { PageLoader } from "@/components/layout/PageLoader";
import { AnimatedAxonBackground } from "@/components/layout/AnimatedAxonBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageTransition } from "@/components/animation/PageTransition";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { siteConfig } from "@/data/siteConfig";

// Primary typography: Space Grotesk (Regular 400, Medium 500, Semibold 600, Bold 700)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Technical accent typography: Space Mono (Regular 400, Bold 700)
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: [
    "AI-driven digital growth",
    "Digital marketing engineering",
    "AI automation systems",
    "Websites and e-commerce architectures",
    "Lead generation systems",
    "Technology and digital transformation",
  ],
  authors: [{ name: siteConfig.name }],
  metadataBase: new URL("https://axonvortex.com"),
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body className="bg-brand-white text-brand-black min-h-screen selection:bg-brand-red selection:text-white antialiased font-body relative">
        <SmoothScrollProvider>
          <AnimationProvider>
            <PageLoader />
            <AnimatedAxonBackground />
            <CustomCursor />
            <Navbar />
            <main className="relative z-base flex flex-col min-h-screen">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <CookieConsent />
          </AnimationProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
