export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  categorySlug: string;
  features: string[];
}

export interface SolutionCategory {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  subservices: string[];
}

export const solutionCategories: SolutionCategory[] = [
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Get Seen. Get Remembered. Get Chosen.",
    description: "Build visibility, attract the right audience and create meaningful demand through data-informed multi-channel execution.",
    subservices: ["Social Media Marketing", "Content Marketing", "Meta Ads", "Google Ads", "SEO"],
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    title: "AI & Automation",
    tagline: "AI That Works for Your Business.",
    description: "Use AI where it can save time, improve customer experience, accelerate sales velocity, and eliminate repetitive manual workflows.",
    subservices: ["AI Chatbots", "AI Customer Support", "AI Appointment Booking", "Voice AI", "AI Agents", "Workflow Automation"],
  },
  {
    id: "websites-ecommerce",
    slug: "websites-ecommerce",
    title: "Websites & E-Commerce",
    tagline: "Your Digital Presence Should Do More Than Exist.",
    description: "High-performance digital experiences engineered to communicate clear value, maximize conversions, and scale business growth.",
    subservices: ["Business Websites", "Landing Pages", "E-Commerce", "Shopify"],
  },
  {
    id: "lead-generation",
    slug: "lead-generation",
    title: "Lead Generation",
    tagline: "Turn Attention Into Opportunity.",
    description: "Predictable, structured lead capture and nurturing architectures that convert market interest into qualified appointments and revenue.",
    subservices: ["Lead Funnels", "Campaigns", "CRM Integration", "Automated Follow-ups"],
  },
  {
    id: "technology-digital-transformation",
    slug: "technology-digital-transformation",
    title: "Technology & Digital Transformation",
    tagline: "Connect Your Business. Simplify the Work. Build for What's Next.",
    description: "Unify business software, modernize legacy processes, and establish custom enterprise architectures built for long-term scalability.",
    subservices: ["CRM Systems", "ERP Solutions", "Custom Software", "Business Automation", "Digital Transformation"],
  },
];

export const mainNavigationTree = [
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Digital Marketing", href: "/digital-marketing" },
      { label: "AI & Automation", href: "/ai-automation" },
      { label: "Websites & E-Commerce", href: "/websites-ecommerce" },
      { label: "Lead Generation", href: "/lead-generation" },
      { label: "Technology & Digital Transformation", href: "/technology-digital-transformation" },
    ],
  },
  { label: "Approach", href: "/approach" },
  { label: "About", href: "/about" },
  { label: "Growth Audit", href: "/growth-audit" },
  { label: "Insights", href: "/insights" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];
