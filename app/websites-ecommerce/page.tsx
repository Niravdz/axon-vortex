import { ServicePageShell } from "@/components/sections/ServicePageShell";

export const metadata = {
  title: "Websites & E-Commerce — AxonVortex",
  description: "Your Digital Presence Should Do More Than Exist. Business Websites, High-converting Landing Pages, Shopify, and E-Commerce.",
};

export default function WebsitesEcommercePage() {
  return (
    <ServicePageShell
      category="SOLUTIONS // 03"
      title="Websites & E-Commerce"
      tagline="Your Digital Presence Should Do More Than Exist."
      description="Build modern, ultra-fast digital experiences engineered to clearly communicate your value proposition, engage visitors, and convert attention into revenue."
      problemHeadline="Why Template Websites Fail Modern Businesses"
      problemPoints={[
        "Slow load speeds and bloated WordPress plugins dragging down Google search rank and mobile conversions.",
        "Generic designs that look like competitors and fail to establish trust or authority.",
        "Confusing customer navigation and lack of clear conversion funnels.",
      ]}
      capabilities={[
        { title: "Custom High-Performance Websites", desc: "Built with Next.js 15, React, and Tailwind CSS for instant load times and perfect SEO scores." },
        { title: "High-Converting Landing Pages", desc: "Laser-focused narrative structures and persuasive copy designed specifically for ad campaigns." },
        { title: "Shopify & Custom E-Commerce", desc: "Fluid checkout flows, custom product builders, inventory synchronization, and high AOV." },
        { title: "Spatial Web & 3D Interactivity", desc: "Interactive Three.js visual storytelling that differentiates your brand on the global stage." },
      ]}
      processSteps={[
        { step: "01", title: "Information Architecture", desc: "Structuring pages, user journeys, and editorial conversion hierarchies." },
        { step: "02", title: "Visual & System Design", desc: "Crafting bespoke dark/light palettes, typography, and interactive components." },
        { step: "03", title: "Engineering & Performance", desc: "Developing clean, accessible, 60fps responsive code with zero layout shift." },
        { step: "04", title: "Analytics & Launch", desc: "Event tracking, SEO schema verification, and secure production deployment." },
      ]}
      benefits={[
        "Sub-second page load speeds",
        "Higher conversion rates on all devices",
        "Uncompromising brand authority",
      ]}
    />
  );
}
