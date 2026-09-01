import { ServicePageShell } from "@/components/sections/ServicePageShell";

export const metadata = {
  title: "Lead Generation — AxonVortex",
  description: "Turn Attention Into Opportunity. Lead Funnels, Multi-channel Campaigns, CRM Integration, and Automated Follow-ups.",
};

export default function LeadGenerationPage() {
  return (
    <ServicePageShell
      category="SOLUTIONS // 04"
      title="Lead Generation"
      tagline="Turn Attention Into Opportunity."
      description="Create predictable systems that attract, capture, qualify, nurture, and convert high-intent prospective customers into sales conversations."
      problemHeadline="The Broken Pipeline: Leads Lost in the Void"
      problemPoints={[
        "Paying for ad clicks but losing 90% of visitors due to generic, non-targeted landing pages.",
        "Leads sitting unattended for hours before a sales rep reaches out, destroying close rates.",
        "No automated multi-touch nurturing system for prospects who aren't ready to buy on day one.",
      ]}
      capabilities={[
        { title: "Predictable Lead Funnels", desc: "Multi-step qualification flows that filter out low-intent inquiries and prioritize high-value prospects." },
        { title: "Targeted Paid Lead Campaigns", desc: "Coordinated Meta, Google, and LinkedIn ad funnels with direct ROI tracking." },
        { title: "Automated Instant Follow-Ups", desc: "Instant SMS and email response sequences within 60 seconds of form submission." },
        { title: "CRM Integration & Pipeline Routing", desc: "Direct sync into HubSpot, Salesforce, or GoHighLevel with automated rep assignments." },
      ]}
      processSteps={[
        { step: "01", title: "Offer & Angle Definition", desc: "Formulating compelling lead magnets, diagnostic audits, and high-value propositions." },
        { step: "02", title: "Funnel Build & Testing", desc: "Constructing frictionless mobile forms, landing pages, and confirmation sequences." },
        { step: "03", title: "Automation Hookup", desc: "Connecting webhook triggers, notification alerts, and automated scheduling." },
        { step: "04", title: "Pipeline Scaling", desc: "Iterating on lead quality, qualification questions, and conversion velocity." },
      ]}
      benefits={[
        "Consistent monthly pipeline of qualified prospects",
        "Zero lead leakage with sub-60-second follow-up",
        "Higher close rates from pre-educated prospects",
      ]}
    />
  );
}
