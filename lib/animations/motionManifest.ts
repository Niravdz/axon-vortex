/**
 * AxonVortex Systems Console Motion Manifest
 * 
 * Strict Uniqueness Rule:
 * Every meaningful section has a dedicated motion signature.
 * No two consecutive sections on the same page may share the same animation signature.
 */

export interface SectionMotionConfig {
  signature: string;
  name: string;
  description: string;
  threshold?: string; // e.g. "top 82%"
  stagger?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "radial" | "diagonal" | "scale";
  revealMethod:
    | "masked-typography"
    | "layered-elevation"
    | "directional-slide"
    | "scroll-progress"
    | "clip-reveal"
    | "subtle-parallax"
    | "architectural-assembly"
    | "ambient-focus"
    | "counter-odometer"
    | "accordion-expand"
    | "contrast-split";
}

export const motionManifest: Record<string, Record<string, SectionMotionConfig>> = {
  home: {
    hero: {
      signature: "masked-hero-depth",
      name: "Cinematic Telemetry Hero",
      description: "Eyebrow telemetry reveals first, followed by line-by-line masked heading, supporting copy, and staggered CTA elevation.",
      revealMethod: "masked-typography",
      threshold: "top 95%",
      duration: 0.9,
    },
    businessProblem: {
      signature: "diagnostic-radar-reveal",
      name: "Diagnostic Radar Scan",
      description: "Horizontal radar scan with diagnostic cards emerging through elevated clipping and accent borders.",
      revealMethod: "clip-reveal",
      threshold: "top 82%",
      direction: "up",
    },
    connectedGrowth: {
      signature: "pipeline-assembly-stagger",
      name: "Pipeline Architectural Assembly",
      description: "6 connected pipeline stages assemble sequentially along a horizontal circuit with line drawing.",
      revealMethod: "architectural-assembly",
      threshold: "top 80%",
      direction: "right",
      stagger: 0.08,
    },
    solutionsOverview: {
      signature: "staggered-system-grid",
      name: "Alternating Depth System Grid",
      description: "Domain navigation and preview panels reveal with alternating directional entrance and Electric Blue edge lighting.",
      revealMethod: "layered-elevation",
      threshold: "top 80%",
      direction: "scale",
    },
    whyAxon: {
      signature: "contrast-dual-slide",
      name: "Bilateral Contrast Slide",
      description: "Left (Fragmented Agency) slides from left; Right (AxonVortex Unified) elevates with Amber glow.",
      revealMethod: "contrast-split",
      threshold: "top 80%",
      direction: "left",
    },
    whoWeHelp: {
      signature: "staggered-audience-matrix",
      name: "Audience Fit Matrix",
      description: "Audience cards elevate along staggered radial coordinates with micro-indicator pulse.",
      revealMethod: "layered-elevation",
      threshold: "top 82%",
      direction: "up",
      stagger: 0.09,
    },
    approach: {
      signature: "scroll-progress-timeline",
      name: "Scroll-Linked Process Timeline",
      description: "Progress line fills dynamically as steps illuminate in synchronization with viewport scroll.",
      revealMethod: "scroll-progress",
      threshold: "top 80%",
    },
    growthJourney: {
      signature: "horizontal-track-scrub",
      name: "Horizontal Journey Scrub",
      description: "Sequential progression stages scrub along a multi-checkpoint journey track.",
      revealMethod: "directional-slide",
      threshold: "top 82%",
      direction: "right",
    },
    buildingAxon: {
      signature: "editorial-terminal-reveal",
      name: "Public Lab Terminal Reveal",
      description: "Monospace telemetry log activates line-by-line with subtle count-up metrics.",
      revealMethod: "counter-odometer",
      threshold: "top 82%",
    },
    finalCta: {
      signature: "ambient-focus-reveal",
      name: "Calm Focus Centerpiece",
      description: "Centralized depth reveal with subtle Blue-to-Amber ambient edge highlight and zero layout shift.",
      revealMethod: "ambient-focus",
      threshold: "top 85%",
    },
  },

  solutions: {
    hero: {
      signature: "editorial-split-mask",
      name: "Editorial Split System Mask",
      description: "Left editorial column reveals line-by-line while right first-principles stack in elevation.",
      revealMethod: "masked-typography",
      threshold: "top 95%",
    },
    growthSystem: {
      signature: "system-assembly-depth",
      name: "System Assembly Depth",
      description: "3D matte panel elevates with subtle inner shadow highlight and need-statements cascade.",
      revealMethod: "layered-elevation",
      threshold: "top 82%",
    },
    domainExplorer: {
      signature: "staggered-system-grid",
      name: "Domain Ecosystem Architecture",
      description: "5 domain tabs expand with dynamic diagram transition and accent illumination.",
      revealMethod: "architectural-assembly",
      threshold: "top 80%",
    },
    problemMatcher: {
      signature: "interactive-matrix-slide",
      name: "Diagnostic Matrix Scan",
      description: "Problem-to-Domain matrix rows slide smoothly into place with indicator checks.",
      revealMethod: "directional-slide",
      threshold: "top 82%",
      direction: "left",
    },
    connectedGrowth: {
      signature: "horizontal-flow-reveal",
      name: "Continuous Loop Circuit",
      description: "Growth loop stages reveal along a horizontal circuit with directional step indicators.",
      revealMethod: "scroll-progress",
      threshold: "top 82%",
    },
    finalCta: {
      signature: "ambient-focus-reveal",
      name: "Calm Focus Centerpiece",
      description: "Centralized depth reveal with subtle Blue-to-Amber ambient edge highlight.",
      revealMethod: "ambient-focus",
      threshold: "top 85%",
    },
  },

  digitalMarketing: {
    hero: {
      signature: "signal-burst-reveal",
      name: "Market Signal Burst",
      description: "Directional signal lines draw as marketing engineering headline masks in through vertical depth.",
      revealMethod: "masked-typography",
      threshold: "top 95%",
    },
    reality: {
      signature: "horizontal-track-scrub",
      name: "Signal Journey Scrub",
      description: "From Visibility to Business Action stages progress along a connected signal path.",
      revealMethod: "directional-slide",
      threshold: "top 82%",
      direction: "right",
    },
    services: {
      signature: "alternating-feature-slide",
      name: "Alternating Channel Assembly",
      description: "Social, Meta, Google Ads, and SEO rows enter from alternating bilateral coordinates.",
      revealMethod: "directional-slide",
      threshold: "top 80%",
      direction: "left",
    },
    approach: {
      signature: "scroll-progress-timeline",
      name: "Campaign Engineering Timeline",
      description: "Execution milestones draw progressively with glowing node indicators.",
      revealMethod: "scroll-progress",
      threshold: "top 80%",
    },
    whoThisIsFor: {
      signature: "staggered-checklist-scale",
      name: "Fit Diagnostic Checklist",
      description: "Ideal client requirements scale into position with checkmark verification highlights.",
      revealMethod: "layered-elevation",
      threshold: "top 82%",
      direction: "scale",
    },
    finalCta: {
      signature: "ambient-focus-reveal",
      name: "Calm Focus Centerpiece",
      description: "Centralized depth reveal with subtle Blue-to-Amber ambient edge highlight.",
      revealMethod: "ambient-focus",
      threshold: "top 85%",
    },
  },

  aiAutomation: {
    hero: {
      signature: "neural-node-entrance",
      name: "Neural Node Entrance",
      description: "System nodes illuminate with clean masked typography and machine speed telemetry.",
      revealMethod: "masked-typography",
      threshold: "top 95%",
    },
    reality: {
      signature: "horizontal-track-scrub",
      name: "Intelligent Pipeline Flow",
      description: "Stages from input to automated action scrub along an autonomous workflow track.",
      revealMethod: "directional-slide",
      threshold: "top 82%",
      direction: "right",
    },
    services: {
      signature: "alternating-feature-slide",
      name: "Autonomous Workflow Assembly",
      description: "AI Chatbots, Agents, Automations, and Voice AI rows enter with staggered depth.",
      revealMethod: "directional-slide",
      threshold: "top 80%",
      direction: "left",
    },
    approach: {
      signature: "scroll-progress-timeline",
      name: "Autonomous System Timeline",
      description: "Implementation stages draw progressively with glowing node indicators.",
      revealMethod: "scroll-progress",
      threshold: "top 80%",
    },
    whoThisIsFor: {
      signature: "staggered-checklist-scale",
      name: "Automation Fit Matrix",
      description: "System fit requirements reveal with scale and verified indicator illumination.",
      revealMethod: "layered-elevation",
      threshold: "top 82%",
    },
    finalCta: {
      signature: "ambient-focus-reveal",
      name: "Calm Focus Centerpiece",
      description: "Centralized depth reveal with subtle Blue-to-Amber ambient edge highlight.",
      revealMethod: "ambient-focus",
      threshold: "top 85%",
    },
  },

  websitesEcommerce: {
    hero: {
      signature: "interface-layer-assembly",
      name: "Interface Layer Assembly",
      description: "Digital flagship headline reveals through vertical mask as architectural layers align.",
      revealMethod: "masked-typography",
      threshold: "top 95%",
    },
    reality: {
      signature: "horizontal-track-scrub",
      name: "Flagship Construction Flow",
      description: "Stages from Architecture to Conversion scrub along an interface progression track.",
      revealMethod: "directional-slide",
      threshold: "top 82%",
      direction: "right",
    },
    services: {
      signature: "alternating-feature-slide",
      name: "High-Performance Stack Assembly",
      description: "Websites, E-Commerce, and Shopify solutions enter with staggered dimensional cards.",
      revealMethod: "directional-slide",
      threshold: "top 80%",
      direction: "left",
    },
    approach: {
      signature: "scroll-progress-timeline",
      name: "Build Lifecycle Timeline",
      description: "Design-to-code sprint stages draw progressively.",
      revealMethod: "scroll-progress",
      threshold: "top 80%",
    },
    whoThisIsFor: {
      signature: "staggered-checklist-scale",
      name: "Commercial Fit Checklist",
      description: "Experience fit criteria scale smoothly into position.",
      revealMethod: "layered-elevation",
      threshold: "top 82%",
    },
    finalCta: {
      signature: "ambient-focus-reveal",
      name: "Calm Focus Centerpiece",
      description: "Centralized depth reveal with subtle Blue-to-Amber ambient edge highlight.",
      revealMethod: "ambient-focus",
      threshold: "top 85%",
    },
  },

  leadGeneration: {
    hero: {
      signature: "funnel-path-reveal",
      name: "Pipeline Capture Path",
      description: "Qualified commercial pipeline headline reveals with clean vertical mask.",
      revealMethod: "masked-typography",
      threshold: "top 95%",
    },
    reality: {
      signature: "horizontal-track-scrub",
      name: "Opportunity Pipeline Scrub",
      description: "From Target Identification to Booked Sales Meetings stages scrub horizontally.",
      revealMethod: "directional-slide",
      threshold: "top 82%",
      direction: "right",
    },
    services: {
      signature: "alternating-feature-slide",
      name: "Acquisition Engine Rows",
      description: "Inbound and outbound capture systems enter from alternating directions.",
      revealMethod: "directional-slide",
      threshold: "top 80%",
      direction: "left",
    },
    approach: {
      signature: "scroll-progress-timeline",
      name: "Pipeline Architecture Timeline",
      description: "Audience targeting to closing acceleration steps draw smoothly.",
      revealMethod: "scroll-progress",
      threshold: "top 80%",
    },
    whoThisIsFor: {
      signature: "staggered-checklist-scale",
      name: "Revenue Pipeline Fit Matrix",
      description: "Ideal B2B criteria scale into position.",
      revealMethod: "layered-elevation",
      threshold: "top 82%",
    },
    finalCta: {
      signature: "ambient-focus-reveal",
      name: "Calm Focus Centerpiece",
      description: "Centralized depth reveal with subtle Blue-to-Amber ambient edge highlight.",
      revealMethod: "ambient-focus",
      threshold: "top 85%",
    },
  },

  technologyTransformation: {
    hero: {
      signature: "systems-architecture-reveal",
      name: "Systems Unification Architecture",
      description: "Operating system headline reveals with technical monospace specs.",
      revealMethod: "masked-typography",
      threshold: "top 95%",
    },
    reality: {
      signature: "horizontal-track-scrub",
      name: "Transformation Journey Flow",
      description: "From Fragmented Tools to Unified Operating System stages scrub smoothly.",
      revealMethod: "directional-slide",
      threshold: "top 82%",
      direction: "right",
    },
    services: {
      signature: "alternating-feature-slide",
      name: "Enterprise Architecture Rows",
      description: "CRM, Custom Software, and Data Infrastructure enter with alternating slide.",
      revealMethod: "directional-slide",
      threshold: "top 80%",
      direction: "left",
    },
    approach: {
      signature: "scroll-progress-timeline",
      name: "Implementation Blueprint Timeline",
      description: "Architecture audit to production rollout steps draw progressively.",
      revealMethod: "scroll-progress",
      threshold: "top 80%",
    },
    whoThisIsFor: {
      signature: "staggered-checklist-scale",
      name: "Enterprise Readiness Checklist",
      description: "Readiness criteria scale into view with indicator highlights.",
      revealMethod: "layered-elevation",
      threshold: "top 82%",
    },
    finalCta: {
      signature: "ambient-focus-reveal",
      name: "Calm Focus Centerpiece",
      description: "Centralized depth reveal with subtle Blue-to-Amber ambient edge highlight.",
      revealMethod: "ambient-focus",
      threshold: "top 85%",
    },
  },

  approach: {
    hero: {
      signature: "editorial-split-mask",
      name: "Methodology Editorial Mask",
      description: "7-Stage strategic framework headline reveals line by line.",
      revealMethod: "masked-typography",
      threshold: "top 95%",
    },
    problem: {
      signature: "diagnostic-radar-reveal",
      name: "Root-Cause Diagnostic Matrix",
      description: "Symptom-to-Root-Cause matrix rows scan in with diagnostic borders.",
      revealMethod: "clip-reveal",
      threshold: "top 82%",
    },
    framework: {
      signature: "scroll-progress-timeline",
      name: "7-Stage Execution Timeline",
      description: "All 7 strategic stages illuminate and progress along a central circuit line.",
      revealMethod: "scroll-progress",
      threshold: "top 80%",
    },
    growthLoop: {
      signature: "loop-circular-reveal",
      name: "Continuous Growth Loop",
      description: "Closed-loop feedback cycle reveals with circular node highlights.",
      revealMethod: "architectural-assembly",
      threshold: "top 82%",
    },
    humanAi: {
      signature: "split-synthesis-slide",
      name: "Human Strategy + Machine Speed",
      description: "Left (Human judgment) and Right (AI execution) slide inward in synthesis.",
      revealMethod: "contrast-split",
      threshold: "top 82%",
      direction: "left",
    },
    dataPhilosophy: {
      signature: "manifesto-curtain-reveal",
      name: "Data Philosophy Manifesto",
      description: "Editorial pull-quote and manifesto statements reveal with clean vertical elevation.",
      revealMethod: "clip-reveal",
      threshold: "top 82%",
    },
    principles: {
      signature: "numbered-cascade-stagger",
      name: "Operating Principles Cascade",
      description: "Numbered principles 01–06 cascade sequentially with monospace indexing.",
      revealMethod: "layered-elevation",
      threshold: "top 80%",
    },
    finalCta: {
      signature: "ambient-focus-reveal",
      name: "Calm Focus Centerpiece",
      description: "Centralized depth reveal with subtle Blue-to-Amber ambient edge highlight.",
      revealMethod: "ambient-focus",
      threshold: "top 85%",
    },
  },

  about: {
    hero: {
      signature: "editorial-split-mask",
      name: "Foundational Ethos Mask",
      description: "Building from zero headline reveals line-by-line through clean mask.",
      revealMethod: "masked-typography",
      threshold: "top 95%",
    },
    whyExists: {
      signature: "manifesto-curtain-reveal",
      name: "Origin Manifesto Curtain",
      description: "Why AxonVortex Exists narrative reveals in readable groups with elevated depth.",
      revealMethod: "clip-reveal",
      threshold: "top 82%",
    },
    beliefs: {
      signature: "numbered-cascade-stagger",
      name: "Core Convictions Cascade",
      description: "Foundational beliefs 01–05 cascade sequentially with monospace index badges.",
      revealMethod: "layered-elevation",
      threshold: "top 80%",
    },
    buildingInPublic: {
      signature: "accordion-elevation-expand",
      name: "Public Documentation Log",
      description: "Tactile documentation items elevate with smooth expand and border lighting.",
      revealMethod: "accordion-expand",
      threshold: "top 82%",
    },
    whatWeBelieve: {
      signature: "contrast-dual-slide",
      name: "Conviction Bilateral Contrast",
      description: "What We Don't Believe In vs What We Do Believe In slide in from opposing coordinates.",
      revealMethod: "contrast-split",
      threshold: "top 82%",
      direction: "left",
    },
    finalCta: {
      signature: "ambient-focus-reveal",
      name: "Calm Focus Centerpiece",
      description: "Centralized depth reveal with subtle Blue-to-Amber ambient edge highlight.",
      revealMethod: "ambient-focus",
      threshold: "top 85%",
    },
  },

  growthAudit: {
    hero: {
      signature: "diagnostic-radar-reveal",
      name: "28-Point Audit Radar",
      description: "Telemetry header and 28-checkpoint diagnostic headline reveal through mask.",
      revealMethod: "masked-typography",
      threshold: "top 95%",
    },
    scope: {
      signature: "interactive-matrix-slide",
      name: "Full-Funnel Scope Matrix",
      description: "Diagnostic scope categories and checkpoint rows slide into focus.",
      revealMethod: "directional-slide",
      threshold: "top 82%",
      direction: "left",
    },
    deliverables: {
      signature: "staggered-card-elevation",
      name: "Deliverable Architectural Stack",
      description: "Audit deliverables elevate into view with layered 3D shadows.",
      revealMethod: "layered-elevation",
      threshold: "top 80%",
      direction: "up",
    },
    framework: {
      signature: "scroll-progress-timeline",
      name: "Audit Execution Timeline",
      description: "3-step audit lifecycle fills progressively along circuit track.",
      revealMethod: "scroll-progress",
      threshold: "top 80%",
    },
    idealClient: {
      signature: "staggered-checklist-scale",
      name: "Qualification Fit Matrix",
      description: "Ideal audit candidates scale smoothly into view with checkmark highlights.",
      revealMethod: "layered-elevation",
      threshold: "top 82%",
    },
    finalCta: {
      signature: "ambient-focus-reveal",
      name: "Calm Focus Centerpiece",
      description: "Centralized depth reveal with subtle Blue-to-Amber ambient edge highlight.",
      revealMethod: "ambient-focus",
      threshold: "top 85%",
    },
  },

  servicesDirectory: {
    hero: {
      signature: "editorial-split-mask",
      name: "Services Directory Masthead",
      description: "14 specialized capabilities headline reveals line by line.",
      revealMethod: "masked-typography",
      threshold: "top 95%",
    },
    explorer: {
      signature: "staggered-system-grid",
      name: "4-Domain Capability Directory",
      description: "Service domain console reveals with active capability card elevation.",
      revealMethod: "architectural-assembly",
      threshold: "top 80%",
    },
    finalCta: {
      signature: "ambient-focus-reveal",
      name: "Calm Focus Centerpiece",
      description: "Centralized depth reveal with subtle Blue-to-Amber ambient edge highlight.",
      revealMethod: "ambient-focus",
      threshold: "top 85%",
    },
  },

  serviceDetail: {
    hero: {
      signature: "capability-masthead-reveal",
      name: "Service Capability Masthead",
      description: "Category badge, headline, and description reveal line by line.",
      revealMethod: "masked-typography",
      threshold: "top 95%",
    },
    problem: {
      signature: "diagnostic-contrast-slide",
      name: "Problem Diagnosis Split",
      description: "Problem headline and challenge points enter with directional slide.",
      revealMethod: "directional-slide",
      threshold: "top 82%",
      direction: "left",
    },
    capabilities: {
      signature: "staggered-system-grid",
      name: "Technical Capability Grid",
      description: "Deliverable cards elevate with staggered 3D shadows and Electric Blue borders.",
      revealMethod: "layered-elevation",
      threshold: "top 80%",
      direction: "up",
    },
    process: {
      signature: "scroll-progress-timeline",
      name: "Engineering Lifecycle Timeline",
      description: "Step-by-step service delivery process draws progressively.",
      revealMethod: "scroll-progress",
      threshold: "top 80%",
    },
    benefits: {
      signature: "staggered-checklist-scale",
      name: "Commercial Outcomes Scale",
      description: "Expected outcomes and benefits scale into position with checkmark highlights.",
      revealMethod: "layered-elevation",
      threshold: "top 82%",
    },
    finalCta: {
      signature: "ambient-focus-reveal",
      name: "Calm Focus Centerpiece",
      description: "Centralized depth reveal with subtle Blue-to-Amber ambient edge highlight.",
      revealMethod: "ambient-focus",
      threshold: "top 85%",
    },
  },

  contact: {
    intake: {
      signature: "split-intake-reveal",
      name: "Bilateral Intake Split",
      description: "Left (Corporate consultation channels) slides from left; Right (Intake form) elevates smoothly.",
      revealMethod: "contrast-split",
      threshold: "top 90%",
      direction: "left",
    },
    alternativePaths: {
      signature: "staggered-card-elevation",
      name: "Alternative Exploration Stack",
      description: "Growth Audit, Insights, and Services cards elevate with staggered depth.",
      revealMethod: "layered-elevation",
      threshold: "top 82%",
      direction: "up",
    },
    faq: {
      signature: "accordion-elevation-expand",
      name: "Consultation FAQ Accordion",
      description: "FAQ items elevate with smooth expand and border lighting.",
      revealMethod: "accordion-expand",
      threshold: "top 82%",
    },
  },

  notFound: {
    errorConsole: {
      signature: "tactile-coordinate-reveal",
      name: "Tactile Coordinate Console",
      description: "Error 404 display elevates with gentle glow and immediate navigation access.",
      revealMethod: "layered-elevation",
      threshold: "top 95%",
    },
  },

  legal: {
    document: {
      signature: "minimal-document-reveal",
      name: "Restrained Legal Document Reveal",
      description: "Minimal header fade-up with immediate readable text and zero reading distractions.",
      revealMethod: "masked-typography",
      threshold: "top 95%",
    },
  },
};
