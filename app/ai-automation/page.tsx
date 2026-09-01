import { ServicePageShell } from "@/components/sections/ServicePageShell";

export const metadata = {
  title: "AI & Automation — AxonVortex",
  description: "AI That Works for Your Business. AI Chatbots, Support, Appointment Booking, Voice AI, and Workflow Automation.",
};

export default function AIAutomationPage() {
  return (
    <ServicePageShell
      category="SOLUTIONS // 02"
      title="AI & Automation"
      tagline="AI That Works for Your Business."
      description="Use AI where it can save time, improve customer experience, accelerate sales velocity, and eliminate repetitive manual workflows."
      problemHeadline="The AI Disconnect: Tools Without Business Direction"
      problemPoints={[
        "Paying for multiple disconnected AI subscriptions without a cohesive workflow.",
        "Slow customer support and lead response times causing high drop-off rates.",
        "Manual scheduling and data entry consuming hundreds of valuable team hours.",
      ]}
      capabilities={[
        { title: "Custom AI Chatbots & Knowledge Retrieval", desc: "Trained on your business documentation to answer customer questions 24/7 with zero hallucination." },
        { title: "Automated Appointment Booking", desc: "Conversational qualification and direct calendar booking without back-and-forth friction." },
        { title: "Autonomous AI Agents", desc: "Multi-step workflows that research, process documents, route data, and trigger follow-ups." },
        { title: "Voice AI & Receptionists", desc: "Natural conversational phone handling for inbound calls, appointments, and support triage." },
      ]}
      processSteps={[
        { step: "01", title: "Workflow Audit", desc: "Mapping internal friction points and repetitive operational bottlenecks." },
        { step: "02", title: "System Architecture", desc: "Designing knowledge pipelines, API hooks, and fallback safety boundaries." },
        { step: "03", title: "Deployment & Integration", desc: "Connecting AI agents directly into your CRM, email, and messaging platforms." },
        { step: "04", title: "Supervised Tuning", desc: "Reviewing transcript logs and refining responses for maximum accuracy." },
      ]}
      benefits={[
        "Instant sub-second response times",
        "80% reduction in manual data entry",
        "Seamless CRM synchronization",
      ]}
    />
  );
}
