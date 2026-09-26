import type { Metadata, Viewport } from "next";
import { Poppins, Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AnimationProvider } from "@/components/providers/AnimationProvider";
import { PageLoader } from "@/components/layout/PageLoader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageTransition } from "@/components/animation/PageTransition";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { siteConfig } from "@/data/siteConfig";

// Official Primary Typeface: Poppins (Brand Guidelines v2.0)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Technical accent typography: Space Mono for restrained technical numbers
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
  themeColor: "#141619",
  colorScheme: "dark",
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
      className={`${poppins.variable} ${spaceMono.variable} dark`}
    >
      <body className="bg-[#141619] text-[#EFECE4] min-h-screen selection:bg-[#3B82F6] selection:text-white antialiased font-body relative overflow-x-hidden">
        <SmoothScrollProvider>
          <AnimationProvider>
            <PageLoader />
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
