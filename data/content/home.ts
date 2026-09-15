export interface ProblemItem {
  title: string;
  description: string;
}

export interface GrowthStep {
  step: string;
  name: string;
  category: string;
  description: string;
}

export interface SolutionSummary {
  id: string;
  title: string;
  tagline: string;
  description: string;
  services: string[];
  href: string;
}

export interface PillarItem {
  title: string;
  description: string;
}

export interface AudienceItem {
  title: string;
  description: string;
}

export interface WorkStep {
  step: string;
  title: string;
  description: string;
}

export const homeContent = {
  hero: {
    tagline: "Transforming Vision, Accelerating Growth.",
    title: "Build Smarter. Market Better. Grow Faster.",
    subtitle: "AI-driven digital growth for businesses ready to move forward.",
    description:
      "AxonVortex helps businesses build, market and scale smarter by combining AI, human strategy, creativity, marketing, automation and data. From building your digital presence to generating leads, improving customer experiences and automating repetitive work, we create practical digital growth systems around your business goals.",
    primaryCta: {
      label: "Start Your Growth Journey",
      href: "/contact",
    },
    secondaryCta: {
      label: "Explore Our Solutions",
      href: "#solutions",
    },
  },

  businessProblem: {
    badge: "SYSTEM DIAGNOSIS",
    headline: "YOUR BUSINESS IS GROWING. IS YOUR DIGITAL PRESENCE KEEPING UP?",
    intro:
      "You may have a great product or service. But if your website isn't converting, your social media isn't creating opportunities, your ads aren't performing, or your business still depends on repetitive manual work, growth becomes harder than it needs to be.",
    statement: "Your business doesn't need more digital noise. It needs a smarter digital system.",
    problems: [
      {
        title: "A weak digital presence",
        description: "Your business exists, but customers aren't finding or understanding you online.",
      },
      {
        title: "Disconnected marketing",
        description: "Your content, website, advertising and lead generation aren't working as one system.",
      },
      {
        title: "Wasted marketing spend",
        description: "You're spending money without knowing what is actually driving business.",
      },
      {
        title: "Missed opportunities",
        description: "Leads are coming in, but slow responses or poor follow-up are costing you customers.",
      },
      {
        title: "Too much manual work",
        description: "Your team spends valuable time on repetitive tasks that could be automated.",
      },
      {
        title: "AI without direction",
        description: "You have access to powerful AI tools, but no clear idea where they can create real business value.",
      },
    ],
  },

  connectedGrowth: {
    badge: "CONNECTED ARCHITECTURE",
    headline: "ONE GROWTH SYSTEM. CONNECTED AROUND YOUR BUSINESS.",
    subheading: "Marketing, technology and AI shouldn't operate in separate boxes.",
    objective: "AxonVortex connects the right capabilities around one objective: Business Growth.",
    steps: [
      {
        name: "ATTRACT",
        category: "Digital Marketing",
        description: "Build visibility and reach the right audience.",
      },
      {
        name: "ENGAGE",
        category: "Content + Website",
        description: "Create interest, communicate value and build trust.",
      },
      {
        name: "CONVERT",
        category: "Lead Generation",
        description: "Turn attention into enquiries and opportunities.",
      },
      {
        name: "MANAGE",
        category: "CRM + Technology",
        description: "Organize customer and business processes.",
      },
      {
        name: "AUTOMATE",
        category: "AI + Automation",
        description: "Reduce repetitive work and improve response.",
      },
      {
        name: "OPTIMIZE",
        category: "Data + Strategy",
        description: "Measure, learn and improve.",
      },
    ],
  },

  solutionsOverview: {
    badge: "OUR SOLUTIONS",
    headline: "One Growth Partner. Multiple Digital Solutions.",
    philosophy:
      "We don't start with a service. We start with your problem. Then we identify the right combination of strategy, marketing, technology and automation to solve it.",
    solutions: [
      {
        id: "digital-marketing",
        title: "DIGITAL MARKETING",
        tagline: "Get Seen. Get Remembered. Get Chosen.",
        description: "Build visibility, attract the right audience and create meaningful demand.",
        services: ["Social Media Marketing", "Content Marketing", "Meta Ads", "Google Ads", "SEO"],
        href: "/digital-marketing",
      },
      {
        id: "ai-automation",
        title: "AI & AUTOMATION",
        tagline: "AI That Works for Your Business.",
        description: "Use AI where it can save time, improve customer experience and create practical business value.",
        services: ["AI Chatbots", "AI Customer Support", "AI Appointment Booking", "Voice AI", "AI Agents", "Workflow Automation"],
        href: "/ai-automation",
      },
      {
        id: "websites-ecommerce",
        title: "WEBSITES & E-COMMERCE",
        tagline: "Your Digital Presence Should Do More Than Exist.",
        description: "Build digital experiences designed to communicate your value, create action and support growth.",
        services: ["Business Websites", "Landing Pages", "E-Commerce", "Shopify"],
        href: "/websites-ecommerce",
      },
      {
        id: "lead-generation",
        title: "LEAD GENERATION",
        tagline: "Turn Attention Into Opportunity.",
        description: "Create systems that help attract, capture, nurture and convert potential customers.",
        services: ["Lead Funnels", "Campaigns", "Landing Pages", "CRM Integration", "Automated Follow-ups"],
        href: "/lead-generation",
      },
      {
        id: "technology-digital-transformation",
        title: "TECHNOLOGY & DIGITAL TRANSFORMATION",
        tagline: "Connect Your Business. Simplify the Work. Build for What's Next.",
        description: "Use technology to connect systems, modernize processes and create a stronger foundation for growth.",
        services: ["CRM", "ERP", "Custom Software", "Business Automation", "Digital Transformation"],
        href: "/technology-digital-transformation",
      },
    ],
  },

  whyAxon: {
    badge: "STRATEGIC PHILOSOPHY",
    headline: "Technology Is Everywhere. Strategic Thinking Isn't.",
    subheading: "We don't believe adding more tools automatically creates growth.",
    pillars: [
      {
        title: "Strategy Before Technology",
        description: "We understand the business problem before recommending a tool, platform or technology.",
      },
      {
        title: "Practical AI",
        description: "We focus on useful applications of AI — not AI for the sake of saying your business uses AI.",
      },
      {
        title: "Human + AI",
        description: "AI brings speed, scale and automation. Human thinking brings context, creativity, judgment and strategy.",
      },
      {
        title: "Connected Growth",
        description: "Your website, content, advertising, leads, CRM and automation should work together.",
      },
      {
        title: "Data-Informed Decisions",
        description: "We use performance data to understand what happened, why it happened and what should happen next.",
      },
      {
        title: "Continuous Improvement",
        description: "Digital growth isn't a one-time project: Build → Launch → Measure → Learn → Improve → Scale.",
      },
    ],
  },

  whoWeHelp: {
    badge: "WHO WE HELP",
    headline: "Built for Businesses Ready to Grow Smarter.",
    audiences: [
      {
        title: "New Businesses",
        description: "Build the right digital foundation from the beginning.",
      },
      {
        title: "Small & Medium Businesses",
        description: "Turn scattered digital activity into a more structured growth system.",
      },
      {
        title: "Offline Businesses Moving Online",
        description: "Build your digital presence and create new ways for customers to discover and engage with your business.",
      },
      {
        title: "Businesses With a Weak Digital Presence",
        description: "Identify the gaps holding your online growth back and fix what matters first.",
      },
      {
        title: "Businesses Wasting Marketing Spend",
        description: "Bring strategy, creative, targeting and measurement together to make marketing more purposeful.",
      },
      {
        title: "Businesses Ready for AI",
        description: "Identify practical opportunities to use AI and automation across marketing, sales, customer service and operations.",
      },
    ],
  },

  howWeWork: {
    badge: "HOW WE WORK",
    headline: "From Business Challenge to Growth System.",
    conclusion: "Growth isn't a campaign. It's a continuous process of learning and improvement.",
    steps: [
      {
        title: "UNDERSTAND",
        description: "We learn about your business, customers, goals and current digital presence.",
      },
      {
        title: "DIAGNOSE",
        description: "We identify gaps, opportunities and the biggest barriers to growth.",
      },
      {
        title: "STRATEGIZE",
        description: "We create a practical roadmap based on your priorities and resources.",
      },
      {
        title: "CREATE",
        description: "We develop the content, campaigns, websites, systems and experiences required.",
      },
      {
        title: "AUTOMATE",
        description: "Where AI and automation can improve efficiency or customer experience, we integrate them into the workflow.",
      },
      {
        title: "MEASURE & IMPROVE",
        description: "We study performance, identify what worked and continuously improve the system.",
      },
    ],
  },

  growthJourney: {
    badge: "THE GROWTH JOURNEY",
    headline: "Start Where You Are. Build Toward Where You Want to Go.",
    subtext: "Every business starts somewhere. Your next stage starts with understanding where to begin.",
    stages: [
      { name: "DISCOVER", description: "Understand your current position and uncover opportunities." },
      { name: "BUILD", description: "Create the digital foundation your business needs." },
      { name: "ATTRACT", description: "Reach the right audience through content, search and advertising." },
      { name: "CONVERT", description: "Turn attention into enquiries, leads and customers." },
      { name: "AUTOMATE", description: "Reduce repetitive work and improve customer response." },
      { name: "SCALE", description: "Use technology, data and smarter systems to support the next stage of growth." },
    ],
  },

  buildingAxon: {
    badge: "BUILDING IN PUBLIC",
    headline: "We're Building AxonVortex From Zero — And We're Building It Differently.",
    intro:
      "AxonVortex is a new AI-driven digital growth agency. We're not here to pretend we've already built something huge. We're here to build something valuable. That means testing ideas, experimenting with AI, developing systems, studying what works, learning from what doesn't and continuously improving.",
    points: [
      { title: "Testing AI systems", description: "Exploring practical ways AI can improve business growth." },
      { title: "Building processes", description: "Creating systems that make execution smarter and more efficient." },
      { title: "Experimenting with marketing", description: "Testing content, campaigns and growth strategies." },
      { title: "Learning from results", description: "Using data and experience to improve our next move." },
      { title: "Documenting the journey", description: "Sharing the lessons, experiments and thinking behind what we're building." },
    ],
    closing: "No manufactured success stories. No inflated promises. Just the process of building something that works.",
  },

  finalCta: {
    headline: "Let's Find Your Next Growth Opportunity.",
    subheading:
      "You don't need to know exactly which service you need. You just need to know where your business is struggling or where you want to go next.",
    body: "Tell us about your business, your challenge and your goal. We'll help identify where digital strategy, marketing, technology or AI can make the biggest difference. Your vision deserves more than a digital presence. It deserves a growth system.",
    primaryCta: {
      label: "Talk to AxonVortex",
      href: "/contact",
    },
    secondaryCta: {
      label: "Get a Digital Growth Audit",
      href: "/contact?type=audit",
    },
  },
};
