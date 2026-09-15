export interface NavLinkItem {
  label: string;
  href: string;
  description?: string;
}

export interface ServiceDomainColumn {
  domain: string;
  description: string;
  items: NavLinkItem[];
}

export interface NavigationConfig {
  solutions: {
    label: string;
    tagline: string;
    description: string;
    items: NavLinkItem[];
    viewAll: NavLinkItem;
  };
  services: {
    label: string;
    tagline: string;
    description: string;
    columns: ServiceDomainColumn[];
    viewAll: NavLinkItem;
    cta: NavLinkItem;
  };
  company: {
    label: string;
    tagline: string;
    description: string;
    items: NavLinkItem[];
  };
  primaryCta: NavLinkItem;
}

export const navigationConfig: NavigationConfig = {
  solutions: {
    label: "Solutions",
    tagline: "ARCHITECTURAL GROWTH DOMAINS",
    description: "Five connected commercial disciplines engineered to eliminate fragmented digital operations.",
    items: [
      {
        label: "Digital Marketing",
        href: "/digital-marketing",
        description: "Signals moving from visibility toward business action",
      },
      {
        label: "AI & Automation",
        href: "/ai-automation",
        description: "Intelligent workflows connecting input to automated action",
      },
      {
        label: "Websites & E-Commerce",
        href: "/websites-ecommerce",
        description: "High-performance digital experiences built to convert",
      },
      {
        label: "Lead Generation",
        href: "/lead-generation",
        description: "Predictable, qualified commercial opportunity pipelines",
      },
      {
        label: "Technology & Digital Transformation",
        href: "/technology-digital-transformation",
        description: "Unifying disconnected tools into one operating system",
      },
    ],
    viewAll: {
      label: "View All Solutions",
      href: "/solutions",
      description: "Explore the complete multi-domain capability map",
    },
  },

  services: {
    label: "Services",
    tagline: "14 SPECIALIZED CAPABILITIES",
    description: "Specialized engineering capabilities deployed standalone or synchronized as a continuous growth engine.",
    columns: [
      {
        domain: "Digital Marketing",
        description: "Audience acquisition & market presence",
        items: [
          { label: "Social Media Marketing", href: "/services/social-media-marketing" },
          { label: "Meta Ads", href: "/services/meta-ads" },
          { label: "Google Ads", href: "/services/google-ads" },
          { label: "SEO", href: "/services/seo" },
        ],
      },
      {
        domain: "AI & Automation",
        description: "Autonomous workflows & machine speed",
        items: [
          { label: "AI Chatbots", href: "/services/ai-chatbots" },
          { label: "AI Agents", href: "/services/ai-agents" },
          { label: "Workflow & Business Automation", href: "/services/ai-automation" },
          { label: "Voice AI", href: "/services/voice-ai" },
        ],
      },
      {
        domain: "Websites & E-Commerce",
        description: "Digital flagships & commercial engines",
        items: [
          { label: "Website Development", href: "/services/website-development" },
          { label: "E-Commerce Development", href: "/services/ecommerce-development" },
          { label: "Shopify Development", href: "/services/shopify" },
        ],
      },
      {
        domain: "Growth & Technology",
        description: "Pipeline capture & enterprise systems",
        items: [
          { label: "Lead Generation", href: "/services/lead-generation" },
          { label: "CRM Systems", href: "/services/crm" },
          { label: "Custom Software", href: "/services/custom-software" },
        ],
      },
    ],
    viewAll: {
      label: "View All 14 Services",
      href: "/services",
      description: "Inspect full architectural directory",
    },
    cta: {
      label: "Start a Project",
      href: "/contact",
      description: "Initiate strategic brief",
    },
  },

  company: {
    label: "Company",
    tagline: "ETHOS & METHODOLOGY",
    description: "The principles, lifecycle framework, and engineering team behind AxonVortex.",
    items: [
      {
        label: "About AxonVortex",
        href: "/about",
        description: "Building from zero, radical transparency & core convictions",
      },
      {
        label: "Our Approach",
        href: "/approach",
        description: "7-stage strategic execution & continuous Growth Loop",
      },
      {
        label: "Digital Growth Audit",
        href: "/growth-audit",
        description: "Full-system evaluation across 28 checkpoints",
      },
      {
        label: "Insights & Knowledge Hub",
        href: "/insights",
        description: "Practical thinking, teardowns & framework library",
      },
      {
        label: "Contact & Commission",
        href: "/contact",
        description: "Direct consultation intake & corporate channels",
      },
    ],
  },

  primaryCta: {
    label: "Start a Project",
    href: "/contact",
  },
};
