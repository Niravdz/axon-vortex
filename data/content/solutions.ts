export interface SolutionDomainDetail {
  number: string;
  id: string;
  title: string;
  tagline: string;
  descriptions: string[];
  helpWith: string[];
  bestFor: string[];
  cta: {
    label: string;
    href: string;
  };
}

export interface ProblemMatcherItem {
  problem: string;
  recommendation: string;
  href: string;
}

export interface ConnectedGrowthNode {
  name: string;
  purpose: string;
}

export const solutionsData = {
  hero: {
    badge: "02 // SOLUTIONS",
    headline: "Digital Solutions Built Around Your Growth.",
    intro:
      "From marketing and websites to AI, automation and business technology, AxonVortex connects the right solutions around your business goals.",
    statementPrimary: "We don't sell disconnected digital services.",
    statementSecondary: "We build connected growth systems.",
  },

  growthSystem: {
    badge: "SYSTEM ARCHITECTURE",
    title: "THE AXONVORTEX GROWTH SYSTEM",
    subtitle: "Different Capabilities. One Business Objective.",
    needStatements: [
      "Your business may need marketing.",
      "Or a better website.",
      "Or more leads.",
      "Or automation.",
      "Or better technology.",
      "Often, it needs several of these working together.",
    ],
    conclusion:
      "AxonVortex brings the right capabilities together based on the problem you're trying to solve.",
  },

  solutions: [
    {
      number: "01",
      id: "digital-marketing",
      title: "DIGITAL MARKETING",
      tagline: "Get Seen. Get Remembered. Get Chosen.",
      descriptions: [
        "Build visibility, attract the right audience and create meaningful demand.",
      ],
      helpWith: [
        "Social Media Marketing",
        "Content Marketing",
        "Meta Ads",
        "Google Ads",
        "SEO",
      ],
      bestFor: [
        "Need stronger online visibility",
        "Want to build an audience",
        "Need more qualified traffic",
        "Want to improve advertising performance",
        "Need a more structured content strategy",
      ],
      cta: {
        label: "Explore Digital Marketing",
        href: "/digital-marketing",
      },
    },
    {
      number: "02",
      id: "ai-automation",
      title: "AI & AUTOMATION",
      tagline: "AI That Works for Your Business.",
      descriptions: [
        "AI shouldn't be another expensive tool sitting unused.",
        "We identify practical opportunities to use AI and automation to improve efficiency, customer experience and business processes.",
      ],
      helpWith: [
        "AI Chatbots",
        "AI Customer Support",
        "AI Appointment Booking",
        "Voice AI",
        "AI Agents",
        "Workflow Automation",
      ],
      bestFor: [
        "Handle repetitive customer questions",
        "Lose leads because of slow response",
        "Spend too much time on manual tasks",
        "Want to improve customer support",
        "Want to explore practical AI opportunities",
      ],
      cta: {
        label: "Explore AI & Automation",
        href: "/ai-automation",
      },
    },
    {
      number: "03",
      id: "websites-ecommerce",
      title: "WEBSITES & E-COMMERCE",
      tagline: "Your Website Should Do More Than Exist.",
      descriptions: [
        "Your website is often the first serious interaction someone has with your business.",
        "We build digital experiences designed to communicate your value, create trust and move visitors toward action.",
      ],
      helpWith: [
        "Business Websites",
        "Landing Pages",
        "E-Commerce",
        "Shopify",
      ],
      bestFor: [
        "Need a new website",
        "Have an outdated website",
        "Need better conversion",
        "Want to move their business online",
        "Want to start or improve online sales",
      ],
      cta: {
        label: "Explore Websites & E-Commerce",
        href: "/websites-ecommerce",
      },
    },
    {
      number: "04",
      id: "lead-generation",
      title: "LEAD GENERATION",
      tagline: "Turn Attention Into Opportunity.",
      descriptions: [
        "Traffic and followers don't automatically become customers.",
        "We build lead-generation systems that connect marketing, landing pages, lead capture, CRM and follow-up.",
      ],
      helpWith: [
        "Lead Funnels",
        "Lead Campaigns",
        "Landing Pages",
        "CRM Integration",
        "Automated Follow-ups",
      ],
      bestFor: [
        "Need more enquiries",
        "Get traffic but few leads",
        "Generate leads but struggle with follow-up",
        "Lose potential customers",
        "Want a more structured conversion process",
      ],
      cta: {
        label: "Explore Lead Generation",
        href: "/lead-generation",
      },
    },
    {
      number: "05",
      id: "technology-digital-transformation",
      title: "TECHNOLOGY & DIGITAL TRANSFORMATION",
      tagline: "Connect Your Business. Simplify the Work. Build for What's Next.",
      descriptions: [
        "As businesses grow, disconnected tools and manual processes become increasingly expensive.",
        "We help businesses identify where technology can simplify operations, connect systems and support future growth.",
      ],
      helpWith: [
        "CRM",
        "ERP",
        "Custom Software",
        "Business Automation",
        "Digital Transformation",
      ],
      bestFor: [
        "Use too many disconnected systems",
        "Depend heavily on manual processes",
        "Need better customer or sales management",
        "Need custom business software",
        "Want to modernize their operations",
      ],
      cta: {
        label: "Explore Digital Transformation",
        href: "/technology-digital-transformation",
      },
    },
  ],

  problemMatcher: {
    badge: "DIAGNOSTIC MATCHER",
    title: "WHICH SOLUTION DO YOU NEED?",
    subtitle: "Start With the Problem. We'll Help Find the Solution.",
    items: [
      {
        problem: "“People don't know about my business.”",
        recommendation: "Digital Marketing",
        href: "/digital-marketing",
      },
      {
        problem: "“People visit us but don't take action.”",
        recommendation: "Websites & E-Commerce",
        href: "/websites-ecommerce",
      },
      {
        problem: "“We're getting attention but not enough enquiries.”",
        recommendation: "Lead Generation",
        href: "/lead-generation",
      },
      {
        problem: "“We're losing time on repetitive work.”",
        recommendation: "AI & Automation",
        href: "/ai-automation",
      },
      {
        problem: "“Our systems are disconnected.”",
        recommendation: "Technology & Digital Transformation",
        href: "/technology-digital-transformation",
      },
      {
        problem: "“I'm not sure what we actually need.”",
        recommendation: "Digital Growth Audit",
        href: "/contact?type=audit",
      },
    ],
    cta: {
      label: "Get a Digital Growth Audit",
      href: "/contact?type=audit",
    },
  },

  connectedGrowth: {
    badge: "INTEGRATION PHILOSOPHY",
    title: "CONNECTED GROWTH",
    subtitle: "The Best Solution Isn't Always One Service.",
    lead: "A business struggling with leads might need:",
    nodes: [
      {
        name: "Marketing",
        purpose: "to attract the right audience.",
      },
      {
        name: "Website",
        purpose: "to communicate value.",
      },
      {
        name: "Lead Generation",
        purpose: "to capture enquiries.",
      },
      {
        name: "CRM",
        purpose: "to organize opportunities.",
      },
      {
        name: "AI & Automation",
        purpose: "to improve response and follow-up.",
      },
      {
        name: "Data",
        purpose: "to understand what is working.",
      },
    ],
    approachPrimary: "That's the AxonVortex approach.",
    approachSecondary: "Build the system around the business — not the service around the sale.",
  },

  finalCta: {
    badge: "FINAL SOLUTIONS CTA",
    headline: "Don't Know Where to Start?",
    paragraphs: [
      "You don't need to choose the technology, platform or service before talking to us.",
      "Tell us what you're trying to achieve.",
      "We'll help identify the most practical next step.",
    ],
    primaryCta: {
      label: "Start Your Growth Journey",
      href: "/contact",
    },
    secondaryCta: {
      label: "Get a Digital Growth Audit",
      href: "/contact?type=audit",
    },
  },
};
