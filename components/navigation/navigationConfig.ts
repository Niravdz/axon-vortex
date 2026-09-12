export interface NavLinkItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface ServiceDomainColumn {
  number: string;
  domain: string;
  description: string;
  items: NavLinkItem[];
}

export interface NavigationConfig {
  solutions: {
    label: string;
    number: string;
    tagline: string;
    description: string;
    items: NavLinkItem[];
    viewAll: NavLinkItem;
  };
  services: {
    label: string;
    number: string;
    tagline: string;
    description: string;
    columns: ServiceDomainColumn[];
    viewAll: NavLinkItem;
    cta: NavLinkItem;
  };
  company: {
    label: string;
    number: string;
    tagline: string;
    description: string;
    items: NavLinkItem[];
  };
  primaryCta: NavLinkItem;
}

export const navigationConfig: NavigationConfig = {
  solutions: {
    label: "Solutions",
    number: "01",
    tagline: "ARCHITECTURAL GROWTH DOMAINS",
    description: "Five connected commercial disciplines engineered to eliminate fragmented digital operations.",
    items: [
      {
        label: "Digital Marketing",
        href: "/digital-marketing",
        description: "Signals moving from visibility toward business action",
        badge: "01",
      },
      {
        label: "AI & Automation",
        href: "/ai-automation",
        description: "Intelligent workflows connecting input to automated action",
        badge: "02",
      },
      {
        label: "Websites & E-Commerce",
        href: "/websites-ecommerce",
        description: "High-performance digital experiences built to convert",
        badge: "03",
      },
      {
        label: "Lead Generation",
        href: "/lead-generation",
        description: "Predictable, qualified commercial opportunity pipelines",
        badge: "04",
      },
      {
        label: "Technology & Digital Transformation",
        href: "/technology-digital-transformation",
        description: "Unifying disconnected tools into one operating system",
        badge: "05",
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
    number: "02",
    tagline: "14 SPECIALIZED CAPABILITIES",
    description: "Specialized engineering capabilities deployed standalone or synchronized as a continuous growth engine.",
    columns: [
      {
        number: "01",
        domain: "Digital Marketing",
        description: "Audience acquisition & market presence",
        items: [
          { label: "Social Media Marketing", href: "/services/social-media-marketing", badge: "SVC-01" },
          { label: "Meta Ads", href: "/services/meta-ads", badge: "SVC-02" },
          { label: "Google Ads", href: "/services/google-ads", badge: "SVC-03" },
          { label: "SEO", href: "/services/seo", badge: "SVC-04" },
        ],
      },
      {
        number: "02",
        domain: "AI & Automation",
        description: "Autonomous workflows & machine speed",
        items: [
          { label: "AI Chatbots", href: "/services/ai-chatbots", badge: "SVC-05" },
          { label: "AI Agents", href: "/services/ai-agents", badge: "SVC-06" },
          { label: "Workflow & Business Automation", href: "/services/ai-automation", badge: "SVC-07" },
          { label: "Voice AI", href: "/services/voice-ai", badge: "SVC-08" },
        ],
      },
      {
        number: "03",
        domain: "Websites & E-Commerce",
        description: "Digital flagships & commercial engines",
        items: [
          { label: "Website Development", href: "/services/website-development", badge: "SVC-09" },
          { label: "E-Commerce Development", href: "/services/ecommerce-development", badge: "SVC-10" },
          { label: "Shopify Development", href: "/services/shopify", badge: "SVC-11" },
        ],
      },
      {
        number: "04",
        domain: "Growth & Technology",
        description: "Pipeline capture & enterprise systems",
        items: [
          { label: "Lead Generation", href: "/services/lead-generation", badge: "SVC-12" },
          { label: "CRM Systems", href: "/services/crm", badge: "SVC-13" },
          { label: "Custom Software", href: "/services/custom-software", badge: "SVC-14" },
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
    number: "03",
    tagline: "ETHOS & METHODOLOGY",
    description: "The principles, lifecycle framework, and engineering team behind AxonVortex.",
    items: [
      {
        label: "About AxonVortex",
        href: "/about",
        description: "Building from zero, radical transparency & core convictions",
        badge: "01",
      },
      {
        label: "Our Approach",
        href: "/approach",
        description: "7-stage strategic execution & continuous Growth Loop",
        badge: "02",
      },
      {
        label: "Digital Growth Audit",
        href: "/growth-audit",
        description: "Full-system evaluation across 28 checkpoints",
        badge: "03",
      },
      {
        label: "Insights & Knowledge Hub",
        href: "/insights",
        description: "Practical thinking, teardowns & framework library",
        badge: "04",
      },
      {
        label: "Contact & Commission",
        href: "/contact",
        description: "Direct consultation intake & corporate channels",
        badge: "05",
      },
    ],
  },

  primaryCta: {
    label: "Start a Project",
    href: "/contact",
  },
};
