import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AnimationProvider } from "@/components/providers/AnimationProvider";
import { PageLoader } from "@/components/layout/PageLoader";
import { AnimatedAxonBackground } from "@/components/layout/AnimatedAxonBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/data/siteConfig";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-primary",
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
  themeColor: "#FFF8EC",
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
      className={poppins.variable}
    >
      <body className="bg-[#FFF8EC] text-[#0F2747] min-h-screen selection:bg-accent-orange selection:text-white antialiased font-sans relative">
        <SmoothScrollProvider>
          <AnimationProvider>
            <PageLoader />
            <AnimatedAxonBackground />
            <CustomCursor />
            <Navbar />
            <main className="relative z-base flex flex-col min-h-screen">
              {children}
            </main>
            <Footer />
          </AnimationProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
