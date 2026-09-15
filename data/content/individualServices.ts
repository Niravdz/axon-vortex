export interface IndividualServiceData {
  slug: string;
  category: string;
  number?: string;
  title: string;
  hero: {
    headline: string;
    paragraphs: string[];
    cta: {
      label: string;
      href: string;
    };
  };
  problem: {
    headline: string;
    paragraphs?: string[];
    points?: string[];
    purposeLead?: string;
    flow?: string[];
    extraPoints?: string[];
    conclusion?: string;
  };
  whatWeDo: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  approach?: {
    title: string;
    steps: {
      number?: string;
      title: string;
      description: string;
    }[];
  };
  whoItIsFor: {
    headline: string;
    points: string[];
  };
  finalCta: {
    headline: string;
    cta: {
      label: string;
      href: string;
    };
  };
}

export const individualServicesData: Record<string, IndividualServiceData> = {
  "social-media-marketing": {
    slug: "social-media-marketing",
    category: "DIGITAL MARKETING",
    number: "01",
    title: "SOCIAL MEDIA MARKETING",
    hero: {
      headline: "Your Social Media Should Do More Than Look Active.",
      paragraphs: [
        "Build attention, trust and meaningful business opportunities with a social media strategy built around your goals.",
        "AxonVortex combines strategy, content, creativity and data to help businesses turn social media from a posting activity into a structured growth channel.",
      ],
      cta: {
        label: "Build My Social Media Strategy",
        href: "/contact",
      },
    },
    problem: {
      headline: "Posting Consistently Doesn't Always Mean Growing.",
      paragraphs: [
        "You may be posting regularly but seeing little meaningful business impact.",
        "You may have followers but very few enquiries.",
        "Or your content may look good without giving people a reason to remember, trust or choose your business.",
      ],
      purposeLead: "Social media needs a purpose. Your content should help people:",
      flow: ["Discover", "Understand", "Trust", "Engage", "Act"],
    },
    whatWeDo: {
      title: "WHAT WE DO",
      items: [
        {
          title: "Social Media Strategy",
          description:
            "Define your audience, positioning, content pillars, platforms and objectives.",
        },
        {
          title: "Content Planning",
          description:
            "Build content around education, authority, business problems, AI, brand storytelling and conversion opportunities.",
        },
        {
          title: "Content Creation",
          description:
            "Create platform-appropriate posts, reels, carousels, stories and other content formats.",
        },
        {
          title: "Community Management",
          description:
            "Help maintain meaningful interactions with your audience and respond to relevant conversations.",
        },
        {
          title: "Platform Strategy",
          description:
            "Adapt content and distribution for platforms such as Instagram, Facebook and LinkedIn instead of blindly duplicating the same content everywhere.",
        },
        {
          title: "Performance Analysis",
          description:
            "Study what content is attracting attention, engagement and business interest — then use those insights to improve the next cycle.",
        },
      ],
    },
    approach: {
      title: "OUR APPROACH",
      steps: [
        { number: "01", title: "Understand", description: "Your business, audience and objectives." },
        { number: "02", title: "Position", description: "Define what your brand should be known for." },
        { number: "03", title: "Plan", description: "Build content pillars, themes and campaigns." },
        { number: "04", title: "Create", description: "Develop content designed for the platform and audience." },
        { number: "05", title: "Distribute", description: "Publish and optimize for the right audience." },
        { number: "06", title: "Learn", description: "Use performance data to improve future content." },
      ],
    },
    whoItIsFor: {
      headline: "Social Media Marketing is suitable for:",
      points: [
        "New businesses building awareness",
        "Small businesses trying to establish an online presence",
        "Businesses with inconsistent content",
        "Businesses struggling to turn social attention into enquiries",
        "Brands that need a clearer content strategy",
      ],
    },
    finalCta: {
      headline: "Don't Just Post. Build a Presence That Works.",
      cta: {
        label: "Build My Social Media Strategy",
        href: "/contact",
      },
    },
  },

  "meta-ads": {
    slug: "meta-ads",
    category: "DIGITAL MARKETING",
    number: "02",
    title: "META ADS",
    hero: {
      headline: "Stop Paying for Attention That Doesn't Move Your Business Forward.",
      paragraphs: [
        "Create targeted Meta campaigns designed around the audience, offer and business outcome that matter.",
        "AxonVortex combines audience strategy, creative thinking, campaign structure and performance analysis to build more purposeful Facebook and Instagram advertising.",
      ],
      cta: {
        label: "Plan My Meta Campaign",
        href: "/contact",
      },
    },
    problem: {
      headline: "Running Ads Is Easy. Building the Right Campaign Is Not.",
      points: [
        "Unclear campaign objectives",
        "Weak offers",
        "Poor audience targeting",
        "Creative that doesn't connect",
        "Traffic without conversion",
        "Limited tracking",
        "Spending without learning",
      ],
      conclusion: "More ad spend isn't automatically the answer. The system needs to work together:",
      flow: ["Audience", "Offer", "Creative", "Campaign", "Landing Page", "Conversion", "Measurement"],
    },
    whatWeDo: {
      title: "WHAT WE DO",
      items: [
        {
          title: "Campaign Strategy",
          description: "Define objectives, audiences, offers and campaign structure.",
        },
        {
          title: "Audience Research",
          description: "Identify relevant audience segments and customer intent.",
        },
        {
          title: "Creative Direction",
          description: "Develop creative concepts and messaging designed to earn attention.",
        },
        {
          title: "Campaign Setup",
          description: "Structure campaigns around the chosen business objective.",
        },
        {
          title: "Conversion Tracking",
          description: "Create the measurement foundation required to understand campaign performance.",
        },
        {
          title: "Optimization",
          description:
            "Review performance and improve targeting, creative, budget allocation and campaign structure where appropriate.",
        },
      ],
    },
    whoItIsFor: {
      headline: "Meta Ads is suitable for:",
      points: [
        "Businesses looking to reach new audiences",
        "Businesses launching offers or campaigns",
        "Businesses that want a structured paid social strategy",
        "Businesses already advertising but struggling with performance",
        "Businesses looking to connect advertising with lead generation",
      ],
    },
    finalCta: {
      headline: "Turn Paid Attention Into Meaningful Opportunities.",
      cta: {
        label: "Plan My Meta Campaign",
        href: "/contact",
      },
    },
  },

  "google-ads": {
    slug: "google-ads",
    category: "DIGITAL MARKETING",
    number: "03",
    title: "GOOGLE ADS",
    hero: {
      headline: "Be Visible When Customers Are Already Looking.",
      paragraphs: [
        "Reach relevant searchers with Google Ads campaigns built around intent, business objectives and conversion.",
        "AxonVortex helps businesses structure and optimize Google advertising around the searches that matter.",
      ],
      cta: {
        label: "Plan My Google Ads Strategy",
        href: "/contact",
      },
    },
    problem: {
      headline: "Showing Up Isn't Enough.",
      paragraphs: [
        "A campaign can receive clicks without producing meaningful business results.",
        "Common reasons include:",
      ],
      points: [
        "Bidding on overly broad keywords",
        "Irrelevant search traffic",
        "Ad copy that fails to set expectations",
        "Landing pages that don't convert",
        "Poor conversion tracking",
        "Wasted budget on low-intent searches",
      ],
      conclusion: "We focus on intent, structure and conversion.",
    },
    whatWeDo: {
      title: "WHAT WE DO",
      items: [
        {
          title: "Search Strategy",
          description: "Identify high-intent keywords and structure campaigns around real business relevance.",
        },
        {
          title: "Campaign Structure",
          description: "Build clean, manageable campaign structures designed for performance and control.",
        },
        {
          title: "Ad Copywriting",
          description: "Write clear, relevant ad copy aligned with search intent and landing-page messaging.",
        },
        {
          title: "Keyword Management",
          description: "Maintain targeted keyword lists, match types and negative keywords to reduce wasted spend.",
        },
        {
          title: "Conversion Tracking",
          description: "Implement tracking to measure calls, form submissions, purchases and other key actions.",
        },
        {
          title: "Ongoing Optimization",
          description: "Continuously refine bids, search terms, ad copy and budget distribution based on real results.",
        },
      ],
    },
    whoItIsFor: {
      headline: "Google Ads is suitable for:",
      points: [
        "Service businesses targeting search demand",
        "Businesses with established customer intent",
        "Businesses looking for qualified leads",
        "E-commerce stores driving product search traffic",
        "Businesses looking to capture active demand",
      ],
    },
    finalCta: {
      headline: "Capture Demand When It Matters Most.",
      cta: {
        label: "Plan My Google Ads Strategy",
        href: "/contact",
      },
    },
  },

  "seo": {
    slug: "seo",
    category: "DIGITAL MARKETING",
    number: "04",
    title: "SEO",
    hero: {
      headline: "Build Long-Term Search Visibility That Grows With Your Business.",
      paragraphs: [
        "SEO is not about chasing algorithms. It is about making your website clearly understand what you offer and making it easier for search engines and users to choose you.",
        "AxonVortex builds practical SEO systems around technical foundations, content relevance and search intent.",
      ],
      cta: {
        label: "Improve My Search Visibility",
        href: "/contact",
      },
    },
    problem: {
      headline: "Traffic Without Strategy Doesn't Create Growth.",
      paragraphs: [
        "A website can rank for irrelevant searches without producing business opportunities.",
        "Or a great business can remain invisible because search engines cannot easily crawl, understand or index its value.",
      ],
      points: [
        "Weak technical structure",
        "Missing or thin content",
        "Poor keyword alignment",
        "Slow loading speeds",
        "Lack of local relevance",
        "Disconnected content strategy",
      ],
    },
    whatWeDo: {
      title: "WHAT WE DO",
      items: [
        {
          title: "Technical SEO",
          description: "Ensure search engines can crawl, index and understand your site efficiently.",
        },
        {
          title: "On-Page Optimization",
          description: "Align titles, headings, structure and page content with target search intent.",
        },
        {
          title: "Content & Keyword Strategy",
          description: "Identify the searches that matter most to your audience and build content around them.",
        },
        {
          title: "Local SEO",
          description: "Optimize Google Business Profiles and local signals for location-based search visibility.",
        },
        {
          title: "Site Structure & Architecture",
          description: "Organize site hierarchy to build topical relevance and improve user navigation.",
        },
        {
          title: "Performance Monitoring",
          description: "Track search rankings, organic traffic and conversion behavior over time.",
        },
      ],
    },
    whoItIsFor: {
      headline: "SEO is suitable for:",
      points: [
        "Businesses seeking sustainable organic traffic",
        "Websites with low search visibility",
        "Local businesses targeting nearby customers",
        "Businesses launching new websites or products",
        "Companies looking to build long-term digital authority",
      ],
    },
    finalCta: {
      headline: "Make Your Business Easy to Find When Customers Search.",
      cta: {
        label: "Improve My Search Visibility",
        href: "/contact",
      },
    },
  },

  "ai-chatbots": {
    slug: "ai-chatbots",
    category: "AI & AUTOMATION",
    number: "05",
    title: "AI CHATBOTS",
    hero: {
      headline: "Turn Website Visits Into Meaningful Conversations.",
      paragraphs: [
        "Help visitors find answers, understand your services and take action with conversational AI built around your business knowledge.",
        "AxonVortex builds practical AI chatbots that improve customer support, qualify leads and guide users 24/7.",
      ],
      cta: {
        label: "Build My AI Chatbot",
        href: "/contact",
      },
    },
    problem: {
      headline: "Visitors Leave When They Can't Find Answers Quickly.",
      paragraphs: [
        "Potential customers arrive on your site with specific questions. If they have to search through pages or wait hours for a reply, they leave.",
      ],
      points: [
        "Slow response times to inquiries",
        "Repetitive questions overwhelming support teams",
        "Missed after-hours lead opportunities",
        "Confusing website navigation",
        "Lack of interactive qualification",
      ],
    },
    whatWeDo: {
      title: "WHAT WE DO",
      items: [
        {
          title: "Knowledge Base Integration",
          description: "Train AI on your business services, FAQs, documentation and pricing guidelines.",
        },
        {
          title: "Lead Qualification Workflows",
          description: "Collect visitor contact details and qualify intent before handing off to sales.",
        },
        {
          title: "Custom Brand Voice & Tone",
          description: "Ensure the chatbot communicates in alignment with your brand standards.",
        },
        {
          title: "Multi-Platform Deployment",
          description: "Deploy chatbots across websites, WhatsApp, Facebook Messenger and CRM systems.",
        },
        {
          title: "Human Handoff Protocols",
          description: "Seamlessly route complex inquiries to team members with conversation context.",
        },
        {
          title: "Analytics & Continuous Training",
          description: "Review unanswered questions and continuously refine response accuracy.",
        },
      ],
    },
    whoItIsFor: {
      headline: "AI Chatbots are suitable for:",
      points: [
        "Service businesses receiving frequent repetitive inquiries",
        "E-commerce stores providing customer service support",
        "Companies looking to capture and qualify leads around the clock",
        "Businesses wanting faster response times without expanding support staff",
      ],
    },
    finalCta: {
      headline: "Engage Every Visitor With Intelligent 24/7 Conversations.",
      cta: {
        label: "Build My AI Chatbot",
        href: "/contact",
      },
    },
  },

  "ai-agents": {
    slug: "ai-agents",
    category: "AI & AUTOMATION",
    number: "06",
    title: "AI AGENTS",
    hero: {
      headline: "Autonomous AI Designed to Execute Complex Business Tasks.",
      paragraphs: [
        "Move beyond simple chatbots to intelligent AI agents capable of researching, reasoning, routing information and executing multi-step business workflows.",
        "AxonVortex builds task-specific AI agents that enhance team productivity and streamline operations.",
      ],
      cta: {
        label: "Deploy AI Agents",
        href: "/contact",
      },
    },
    problem: {
      headline: "Knowledge Workers Spend Hours on Repetitive Research and Triage.",
      paragraphs: [
        "Modern business processes require synthesizing information across multiple tools, reading unstructured documents and performing multi-step tasks.",
      ],
      points: [
        "Time-consuming data collection and research",
        "Manual email categorization and draft responses",
        "Repetitive lead research and enrichment",
        "Delayed internal decision-making",
        "Inconsistent task execution across team members",
      ],
    },
    whatWeDo: {
      title: "WHAT WE DO",
      items: [
        {
          title: "Task Architecture & Scoping",
          description: "Deconstruct business workflows into reliable, deterministic agent tasks.",
        },
        {
          title: "Tool & API Integration",
          description: "Equip agents with access to internal databases, CRMs, search engines and email systems.",
        },
        {
          title: "Research & Synthesis Agents",
          description: "Build agents that summarize documents, compare competitor offerings and prepare briefings.",
        },
        {
          title: "Lead Enrichment Agents",
          description: "Automatically research new prospects and enrich CRM records before sales outreach.",
        },
        {
          title: "Guardrails & Safety Architecture",
          description: "Implement validation layers and human-in-the-loop approvals for critical actions.",
        },
        {
          title: "Performance Monitoring",
          description: "Track execution speed, accuracy and cost-efficiency of deployed agent systems.",
        },
      ],
    },
    whoItIsFor: {
      headline: "AI Agents are suitable for:",
      points: [
        "Growing teams spending significant time on information retrieval",
        "Sales teams needing automated lead research and prep",
        "Operations departments handling multi-system data flows",
        "Businesses exploring autonomous internal workflows",
      ],
    },
    finalCta: {
      headline: "Equip Your Business With Intelligent Autonomous Agents.",
      cta: {
        label: "Deploy AI Agents",
        href: "/contact",
      },
    },
  },

  "ai-automation": {
    slug: "ai-automation",
    category: "AI & AUTOMATION",
    number: "07",
    title: "AI AUTOMATION",
    hero: {
      headline: "Connect Your Systems. Eliminate Manual Friction.",
      paragraphs: [
        "Connect fragmented business tools and eliminate repetitive manual data entry with intelligent automation workflows.",
        "AxonVortex builds end-to-end automation pipelines that ensure information moves seamlessly between marketing, sales, operations and customer support.",
      ],
      cta: {
        label: "Automate My Workflows",
        href: "/contact",
      },
    },
    problem: {
      headline: "Disconnected Tools Create Manual Bottlenecks.",
      paragraphs: [
        "When business applications don't talk to each other, team members become the human bridges copying data, sending manual updates and checking statuses.",
      ],
      points: [
        "Manual data entry between forms, CRMs and spreadsheets",
        "Delayed lead notifications leading to slow response times",
        "Inconsistent follow-up schedules",
        "Disorganized customer onboarding workflows",
        "High risk of human error during repetitive tasks",
      ],
    },
    whatWeDo: {
      title: "WHAT WE DO",
      items: [
        {
          title: "Process Mapping & Audit",
          description: "Identify repetitive bottlenecks and map efficient automated workflow logic.",
        },
        {
          title: "CRM & Pipeline Automation",
          description: "Trigger automated lead routing, stage changes, task assignments and notification alerts.",
        },
        {
          title: "Multi-Tool Integration",
          description: "Connect website forms, CRMs, email marketing, messaging platforms and databases.",
        },
        {
          title: "Automated Communication Flows",
          description: "Trigger personalized email and SMS follow-ups based on customer actions.",
        },
        {
          title: "Data Sync & Normalization",
          description: "Ensure customer records remain accurate and synchronized across all business platforms.",
        },
        {
          title: "Error Handling & Reliability",
          description: "Build robust fallbacks and alerting to ensure automated workflows never drop critical data.",
        },
      ],
    },
    whoItIsFor: {
      headline: "AI Automation is suitable for:",
      points: [
        "Businesses managing multiple SaaS applications",
        "Sales teams needing automated follow-up workflows",
        "Operations teams overwhelmed by manual data entry",
        "Companies looking to scale transaction volume without hiring proportional overhead",
      ],
    },
    finalCta: {
      headline: "Let Machines Handle Repetition So Your Team Can Focus on Growth.",
      cta: {
        label: "Automate My Workflows",
        href: "/contact",
      },
    },
  },

  "voice-ai": {
    slug: "voice-ai",
    category: "AI & AUTOMATION",
    number: "08",
    title: "VOICE AI",
    hero: {
      headline: "Natural Voice AI for Customer and Business Workflows.",
      paragraphs: [
        "Deliver immediate, natural voice interactions for inbound call answering, appointment confirmation and lead qualification.",
        "AxonVortex builds practical voice AI solutions designed to handle high-frequency phone interactions with conversational nuance.",
      ],
      cta: {
        label: "Explore Voice AI",
        href: "/contact",
      },
    },
    problem: {
      headline: "Missed Phone Calls Mean Missed Revenue Opportunities.",
      paragraphs: [
        "When prospective customers call your business, voicemail often results in them calling a competitor instead.",
      ],
      points: [
        "Unanswered calls during peak hours or after business hours",
        "High staff cost dedicated to routine phone inquiries",
        "Inconsistent call qualification and scheduling",
        "Delays in confirming appointments and bookings",
        "Lack of structured call logging in CRM systems",
      ],
    },
    whatWeDo: {
      title: "WHAT WE DO",
      items: [
        {
          title: "Inbound Call Answering",
          description: "Answer customer inquiries instantly with conversational voice AI trained on your business data.",
        },
        {
          title: "Automated Appointment Scheduling",
          description: "Allow callers to check availability and book calendar slots over natural speech.",
        },
        {
          title: "Call Triage & Routing",
          description: "Qualify caller intent and route urgent matters directly to the appropriate team members.",
        },
        {
          title: "CRM Voice Logging",
          description: "Automatically transcribe calls, summarize action items and update contact records.",
        },
        {
          title: "Voice Persona & Tone Customization",
          description: "Select voice models and conversational parameters that match your brand identity.",
        },
        {
          title: "Safety & Fallback Protocols",
          description: "Seamlessly transfer calls to live human operators when questions exceed predefined boundaries.",
        },
      ],
    },
    whoItIsFor: {
      headline: "Voice AI is suitable for:",
      points: [
        "Service businesses receiving high volumes of phone inquiries",
        "Clinics, salons and consultancies needing 24/7 appointment booking",
        "Real estate and field service firms managing inbound lead calls",
        "Companies looking to eliminate voicemail abandonment",
      ],
    },
    finalCta: {
      headline: "Never Miss Another Inbound Customer Phone Call.",
      cta: {
        label: "Explore Voice AI",
        href: "/contact",
      },
    },
  },

  "website-development": {
    slug: "website-development",
    category: "WEBSITES & E-COMMERCE",
    number: "09",
    title: "WEBSITE DEVELOPMENT",
    hero: {
      headline: "Websites Engineered for Trust, Clarity and Conversion.",
      paragraphs: [
        "Your website is the central hub of your digital growth system. It should communicate your value clearly, build immediate credibility and turn visitors into active opportunities.",
        "AxonVortex designs and develops high-performance websites built around business goals.",
      ],
      cta: {
        label: "Build My Website",
        href: "/contact",
      },
    },
    problem: {
      headline: "A Generic Website Can Cost You Customers Before You Ever Speak to Them.",
      paragraphs: [
        "Visitors form opinions about your business in seconds. Confusing messaging, slow load times or outdated design create friction that pushes potential clients away.",
      ],
      points: [
        "Outdated visual design that undermines trust",
        "Confusing value proposition and cluttered layout",
        "Poor mobile performance and slow loading speeds",
        "Weak calls to action that fail to guide users",
        "Disconnected from marketing analytics and CRM systems",
      ],
    },
    whatWeDo: {
      title: "WHAT WE DO",
      items: [
        {
          title: "Information Architecture & Wireframing",
          description: "Structure page hierarchies to guide visitors intuitively toward key conversion points.",
        },
        {
          title: "Custom UI/UX Design",
          description: "Design bespoke digital interfaces that reflect your brand authority and market positioning.",
        },
        {
          title: "Modern Front-End Development",
          description: "Build clean, responsive, ultra-fast web experiences optimized for all device sizes.",
        },
        {
          title: "Conversion-Focused Copywriting",
          description: "Craft clear, persuasive messaging that addresses customer challenges and articulates value.",
        },
        {
          title: "Technical SEO & Speed Optimization",
          description: "Implement semantic markup, Core Web Vitals optimization and metadata foundations.",
        },
        {
          title: "Analytics & Lead Capture Integration",
          description: "Connect forms, tracking pixels, analytics and CRM pipelines for complete visibility.",
        },
      ],
    },
    whoItIsFor: {
      headline: "Website Development is suitable for:",
      points: [
        "Businesses establishing a modern digital presence",
        "Companies with outdated websites hurting conversion rates",
        "Firms launching new service offerings or repositioning in their market",
        "Businesses looking for an integrated growth website rather than a static brochure",
      ],
    },
    finalCta: {
      headline: "Build a Digital Presence That Drives Real Business Growth.",
      cta: {
        label: "Build My Website",
        href: "/contact",
      },
    },
  },

  "ecommerce-development": {
    slug: "ecommerce-development",
    category: "WEBSITES & E-COMMERCE",
    number: "10",
    title: "E-COMMERCE DEVELOPMENT",
    hero: {
      headline: "Digital Storefronts Designed for Smooth Customer Journeys and Higher Conversions.",
      paragraphs: [
        "Build seamless online shopping experiences that make discovering, evaluating and purchasing products effortless.",
        "AxonVortex develops scalable e-commerce systems with frictionless checkout, clear product presentation and robust inventory management.",
      ],
      cta: {
        label: "Build My E-Commerce Store",
        href: "/contact",
      },
    },
    problem: {
      headline: "Friction in the Shopping Journey Costs You Sales.",
      paragraphs: [
        "E-commerce success depends on simplicity. Complex checkout steps, slow loading catalogs or confusing navigation directly increase cart abandonment.",
      ],
      points: [
        "High cart abandonment rates during checkout",
        "Cluttered product pages lacking clear value propositions",
        "Slow catalog filtering and search performance",
        "Poor mobile checkout experience",
        "Disconnected inventory and order management systems",
      ],
    },
    whatWeDo: {
      title: "WHAT WE DO",
      items: [
        {
          title: "Store Architecture & Category Design",
          description: "Organize product taxonomies and intuitive filtering to make product discovery effortless.",
        },
        {
          title: "Product Page Optimization",
          description: "Design high-converting product pages with clear visuals, trust indicators and benefit-driven copy.",
        },
        {
          title: "Frictionless Checkout Systems",
          description: "Implement streamlined, secure checkout flows supporting modern payment methods.",
        },
        {
          title: "Payment Gateway & Tax Integration",
          description: "Configure multi-currency payment processors, automated tax calculations and shipping rules.",
        },
        {
          title: "Inventory & ERP Synchronization",
          description: "Connect storefronts with backend inventory, fulfillment and accounting systems.",
        },
        {
          title: "Conversion Rate Optimization (CRO)",
          description: "Analyze user recordings, cart funnels and search queries to optimize purchase rates.",
        },
      ],
    },
    whoItIsFor: {
      headline: "E-Commerce Development is suitable for:",
      points: [
        "Brands launching new digital retail storefronts",
        "Existing online stores struggling with low conversion rates",
        "Traditional retail businesses transitioning into direct-to-consumer sales",
        "Growing e-commerce brands needing scalable multi-channel architecture",
      ],
    },
    finalCta: {
      headline: "Create an Online Store Designed to Sell More Products.",
      cta: {
        label: "Build My E-Commerce Store",
        href: "/contact",
      },
    },
  },

  "shopify": {
    slug: "shopify",
    category: "WEBSITES & E-COMMERCE",
    number: "11",
    title: "SHOPIFY",
    hero: {
      headline: "Custom Shopify Stores Engineered for Scale and Performance.",
      paragraphs: [
        "Leverage the full power of Shopify with bespoke theme design, app integration and conversion optimization.",
        "AxonVortex builds custom Shopify experiences tailored to your brand identity, customer workflows and operational needs.",
      ],
      cta: {
        label: "Build My Shopify Store",
        href: "/contact",
      },
    },
    problem: {
      headline: "Off-The-Shelf Templates Limit Your Brand and Functionality.",
      paragraphs: [
        "Generic themes often carry bloated code, slow down page speeds and force your brand into rigid, cookie-cutter layouts that fail to stand out.",
      ],
      points: [
        "Bloated app stacks slowing down store load times",
        "Inflexible templates that cannot support custom product options",
        "Inconsistent mobile shopping and navigation experience",
        "Complicated checkout apps hurting conversion rates",
        "Disorganized theme code making future updates risky",
      ],
    },
    whatWeDo: {
      title: "WHAT WE DO",
      items: [
        {
          title: "Custom Shopify Theme Development",
          description: "Develop lightweight, bespoke Shopify themes that load instantly and showcase your brand identity.",
        },
        {
          title: "Shopify Plus Architecture",
          description: "Configure advanced customization, checkout extensibility and multi-store setups for high-growth brands.",
        },
        {
          title: "App Stack Audit & Optimization",
          description: "Replace unnecessary third-party apps with native Liquid and custom script solutions to boost speed.",
        },
        {
          title: "Custom Product Bundles & Subscriptions",
          description: "Implement recurring billing, custom bundles and dynamic upselling workflows.",
        },
        {
          title: "Migration & Data Transfer",
          description: "Seamlessly migrate products, customer accounts and order histories from WooCommerce or Magento.",
        },
        {
          title: "Speed & Core Web Vitals Optimization",
          description: "Fine-tune asset delivery, image compression and Liquid code to achieve top performance scores.",
        },
      ],
    },
    whoItIsFor: {
      headline: "Shopify Services are suitable for:",
      points: [
        "Direct-to-consumer brands looking for bespoke Shopify design",
        "Existing Shopify merchants needing theme optimization and custom features",
        "Retail businesses migrating to Shopify from legacy e-commerce platforms",
        "High-volume stores requiring Shopify Plus checkout extensibility",
      ],
    },
    finalCta: {
      headline: "Upgrade Your Shopify Store Into a High-Converting Engine.",
      cta: {
        label: "Build My Shopify Store",
        href: "/contact",
      },
    },
  },

  "lead-generation": {
    slug: "lead-generation",
    category: "LEAD GENERATION",
    number: "12",
    title: "LEAD GENERATION",
    hero: {
      headline: "Turn Attention Into Qualified Business Opportunities.",
      paragraphs: [
        "Traffic is not the same as leads. Leads are not the same as customers. A strong lead-generation system connects every stage between them.",
        "AxonVortex designs and implements comprehensive lead funnels combining offer strategy, landing pages, CRM pipelines and automated follow-ups.",
      ],
      cta: {
        label: "Build My Lead System",
        href: "/contact",
      },
    },
    problem: {
      headline: "More Leads Aren't Always the Answer. The Entire System Must Connect.",
      paragraphs: [
        "If your offer is unclear, more traffic won't fix it. If your landing page doesn't convert, more advertising won't fix it. If your team doesn't follow up quickly, leads go cold.",
      ],
      points: [
        "Getting website visits but very few qualified inquiries",
        "Generating leads but struggling with slow manual follow-up",
        "Losing prospective clients between initial interest and proposal",
        "Managing contacts across scattered spreadsheets and inboxes",
        "Lack of visibility into which marketing channels produce revenue",
      ],
      conclusion: "That's why we build integrated lead systems:",
      flow: ["Attract", "Capture", "Manage", "Follow Up", "Convert", "Improve"],
    },
    whatWeDo: {
      title: "WHAT WE DO",
      items: [
        {
          title: "Offer & Value Proposition Design",
          description: "Develop compelling lead magnets, audits and entry-point offers that motivate prospects to act.",
        },
        {
          title: "High-Converting Landing Pages",
          description: "Build dedicated landing pages with focused messaging, social proof and streamlined forms.",
        },
        {
          title: "Multi-Channel Acquisition Campaigns",
          description: "Drive targeted traffic through paid search, Meta ads and organic search channels.",
        },
        {
          title: "CRM Pipeline Architecture",
          description: "Structure CRM pipelines to organize leads, assign owners and track deal stages in real time.",
        },
        {
          title: "Automated Multi-Touch Follow-Ups",
          description: "Trigger automated email, SMS and scheduling sequences to nurture inquiries immediately.",
        },
        {
          title: "Lead Attribution & Analytics",
          description: "Track complete customer journeys from first touch to closed sale to optimize ROI.",
        },
      ],
    },
    whoItIsFor: {
      headline: "Lead Generation is suitable for:",
      points: [
        "B2B and professional service firms needing consistent qualified inquiries",
        "High-ticket service providers looking for structured qualification pipelines",
        "Companies getting digital traffic without proportional lead volume",
        "Businesses wanting to replace random marketing with a predictable acquisition system",
      ],
    },
    finalCta: {
      headline: "Stop Losing Opportunities Between Click and Customer.",
      cta: {
        label: "Build My Lead System",
        href: "/contact",
      },
    },
  },

  "crm": {
    slug: "crm",
    category: "TECHNOLOGY & DIGITAL TRANSFORMATION",
    number: "13",
    title: "CRM",
    hero: {
      headline: "Structure Your Customer Relationships and Sales Pipelines for Growth.",
      paragraphs: [
        "Create a single source of truth for managing leads, customer communications, deals and account histories.",
        "AxonVortex designs and implements custom CRM architectures that organize your business operations and empower your team.",
      ],
      cta: {
        label: "Implement My CRM",
        href: "/contact",
      },
    },
    problem: {
      headline: "Customer Information Scattered Across Inboxes and Spreadsheets Creates Chaos.",
      paragraphs: [
        "When team members manage client details independently, critical notes get lost, follow-ups slip through the cracks and leadership lacks visibility into sales pipelines.",
      ],
      points: [
        "Leads forgotten in individual team email inboxes",
        "Outdated spreadsheets with conflicting customer data",
        "No structured visibility into pipeline stages and deal values",
        "Difficulty tracking communication history when team members change",
        "Manual reporting taking hours of administrative time each week",
      ],
    },
    whatWeDo: {
      title: "WHAT WE DO",
      items: [
        {
          title: "CRM Selection & Architecture Design",
          description: "Select and structure the right CRM platform aligned with your business model and team size.",
        },
        {
          title: "Custom Pipeline & Deal Stage Modeling",
          description: "Configure sales pipelines that accurately reflect your customer journey and closing criteria.",
        },
        {
          title: "Contact & Deal Data Migration",
          description: "Clean, normalize and migrate historical customer records from spreadsheets and legacy tools.",
        },
        {
          title: "Email & Calendar Synchronization",
          description: "Integrate team mailboxes and calendars so all interactions log automatically.",
        },
        {
          title: "Automated Task & Reminder Workflows",
          description: "Trigger reminders and assignments at critical deal milestones to ensure consistent follow-up.",
        },
        {
          title: "Executive Dashboards & Reporting",
          description: "Build real-time reporting dashboards showing conversion rates, pipeline health and forecasts.",
        },
      ],
    },
    whoItIsFor: {
      headline: "CRM Implementation is suitable for:",
      points: [
        "Growing businesses transitioning away from spreadsheets",
        "Sales teams needing structured pipeline visibility",
        "Service firms managing multi-stakeholder client accounts",
        "Companies looking to integrate customer communications across marketing, sales and support",
      ],
    },
    finalCta: {
      headline: "Unify Your Customer Data in One Clear, Scalable System.",
      cta: {
        label: "Implement My CRM",
        href: "/contact",
      },
    },
  },

  "custom-software": {
    slug: "custom-software",
    category: "TECHNOLOGY & DIGITAL TRANSFORMATION",
    number: "14",
    title: "CUSTOM SOFTWARE",
    hero: {
      headline: "Software Engineered Around Your Unique Business Requirements.",
      paragraphs: [
        "When off-the-shelf software falls short, custom web applications and business portals solve specific operational challenges and provide a durable competitive advantage.",
        "AxonVortex architects and develops robust custom software solutions built for reliability, security and scale.",
      ],
      cta: {
        label: "Build Custom Software",
        href: "/contact",
      },
    },
    problem: {
      headline: "Forcing Your Business Into Rigid Off-The-Shelf Tools Creates Inefficiency.",
      paragraphs: [
        "Pre-packaged SaaS platforms often charge expensive monthly seat licenses while forcing your team to adapt their proprietary workflows to rigid software limitations.",
      ],
      points: [
        "Paying multiple software subscriptions for overlapping, underutilized features",
        "Critical business workflows requiring awkward manual workarounds",
        "Inability to integrate proprietary customer data with external platforms",
        "Lack of customized portals for clients, partners or internal teams",
        "Data security concerns around multi-tenant third-party SaaS tools",
      ],
    },
    whatWeDo: {
      title: "WHAT WE DO",
      items: [
        {
          title: "System Architecture & Requirements Engineering",
          description: "Translate complex business logic into scalable technical blueprints and database schemas.",
        },
        {
          title: "Custom Client & Partner Portals",
          description: "Build secure, authenticated web portals for customer onboarding, document sharing and project status.",
        },
        {
          title: "Internal Operational Dashboards",
          description: "Develop custom internal tools that unify data streams and streamline team task execution.",
        },
        {
          title: "API Development & System Integrations",
          description: "Engineer custom REST and GraphQL APIs to connect proprietary databases with third-party platforms.",
        },
        {
          title: "Cloud Infrastructure & Database Engineering",
          description: "Deploy secure, auto-scaling cloud architectures with automated backups and monitoring.",
        },
        {
          title: "Ongoing Maintenance & Feature Evolution",
          description: "Provide continuous technical support, security patching and iterative feature development.",
        },
      ],
    },
    whoItIsFor: {
      headline: "Custom Software is suitable for:",
      points: [
        "Businesses with unique operational workflows that standard software cannot satisfy",
        "Companies looking to build proprietary client portals or internal tools",
        "Firms looking to replace fragile spreadsheet ecosystems with centralized databases",
        "Enterprises seeking a distinct competitive advantage through bespoke technology",
      ],
    },
    finalCta: {
      headline: "Build the Exact Software System Your Business Needs to Grow.",
      cta: {
        label: "Build Custom Software",
        href: "/contact",
      },
    },
  },
};
