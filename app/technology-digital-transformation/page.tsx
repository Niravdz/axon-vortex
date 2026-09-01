import { ServicePageShell } from "@/components/sections/ServicePageShell";

export const metadata = {
  title: "Technology & Digital Transformation — AxonVortex",
  description: "Connect Your Business. Simplify the Work. Build for What's Next. CRM, ERP, Custom Software, and Digital Transformation.",
};

export default function TechnologyDigitalTransformationPage() {
  return (
    <ServicePageShell
      category="SOLUTIONS // 05"
      title="Technology & Digital Transformation"
      tagline="Connect Your Business. Simplify the Work. Build for What's Next."
      description="Use modern cloud architectures and intelligent software to connect fragmented systems, eliminate manual data silos, and establish a scalable foundation for growth."
      problemHeadline="Disconnected Legacy Systems Slowing Growth"
      problemPoints={[
        "Teams re-entering the same customer data across multiple spreadsheets and outdated tools.",
        "Inability to get real-time business reporting or track accurate customer lifetime value.",
        "Off-the-shelf software restricting your business model instead of empowering it.",
      ]}
      capabilities={[
        { title: "Custom CRM & ERP Integrations", desc: "Unifying sales, operations, inventory, and finance into one synchronized source of truth." },
        { title: "Bespoke Web & Cloud Software", desc: "Custom portals, internal dashboards, and client platforms tailored to your exact workflow." },
        { title: "End-to-End Business Automation", desc: "Replacing brittle manual processes with fault-tolerant, automated serverless pipelines." },
        { title: "Modernization & Cloud Migration", desc: "Upgrading legacy databases and servers to secure, resilient modern infrastructure." },
      ]}
      processSteps={[
        { step: "01", title: "Systems Architecture Audit", desc: "Mapping data flow, bottlenecks, and security dependencies across your organization." },
        { step: "02", title: "Technical Blueprint", desc: "Selecting optimal tech stacks, schema models, and secure API boundaries." },
        { step: "03", title: "Agile Development", desc: "Building modular systems with continuous testing and internal validation." },
        { step: "04", title: "Deployment & Training", desc: "Seamless cutover with zero downtime and staff workflow enablement." },
      ]}
      benefits={[
        "Elimination of double data entry across departments",
        "Real-time operational visibility and metrics",
        "Future-proof architecture ready for enterprise scale",
      ]}
    />
  );
}
