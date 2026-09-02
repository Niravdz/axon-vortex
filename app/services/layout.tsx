import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — AxonVortex Digital Growth Capabilities",
  description:
    "Explore AxonVortex capabilities across digital marketing, AI and automation, websites and e-commerce, lead generation, and digital transformation.",
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
