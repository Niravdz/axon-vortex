import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Authority & Conversion — AxonVortex Growth Principles",
  description: "Strategy-first AI positioning, Human + AI philosophy, Building in Public, and Digital Growth Audits.",
};

const principles = [
  { title: "Strategy Before Technology", desc: "Understand the problem before choosing the tool." },
  { title: "Practical AI", desc: "Use AI where it creates meaningful, measurable business value." },
  { title: "Human + AI", desc: "Combine computational automation with strategic human judgment." },
  { title: "Connected Growth", desc: "Make all digital systems, pipelines, and tools work together as one." },
  { title: "Continuous Improvement", desc: "Build, measure, learn, and continuously iterate." },
  { title: "Business Impact", desc: "Prioritize revenue-driving outcomes over vanity metrics." },
];

const faqs = [
  {
    q: "What is AxonVortex?",
    a: "AxonVortex is an AI-driven digital growth agency helping businesses build, market and scale smarter through a combination of strategy, marketing, creativity, technology, AI, automation and data.",
  },
  {
    q: "Do you only provide AI services?",
    a: "No. AI is one part of our broader digital growth approach. Depending on the business challenge, the right solution may involve marketing, websites, lead generation, technology, automation, AI or a combination.",
  },
  {
    q: "Do I need to know which service I need?",
    a: "No. You can start by explaining your business challenge and goal. We'll help identify the most relevant next step.",
  },
  {
    q: "Are you a new agency?",
    a: "Yes. AxonVortex is being built from zero. We believe transparency is more valuable than pretending to have achievements we don't have.",
  },
  {
    q: "Do you work with existing systems?",
    a: "Yes, where appropriate. We can evaluate existing websites, marketing channels, CRM systems, tools and workflows before recommending changes.",
  },
];

export default function AuthorityConversionPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-24 text-editorial-primary">
      {/* Hero */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <Badge variant="dot">STRATEGIC POSITIONING</Badge>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-tight">
          Authority & Conversion
        </h1>
        <p className="text-base sm:text-lg text-editorial-secondary font-heading">
          AI Is Powerful. Strategy Makes It Useful.
        </p>
        <p className="text-xs sm:text-sm text-editorial-muted font-sans leading-relaxed">
          Technology can accelerate execution. But without the right strategy, faster execution simply creates more noise. AxonVortex builds practical digital growth systems around real business goals.
        </p>
      </div>

      {/* Human + AI Section */}
      <div className="editorial-card p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="card-shift-content flex flex-col gap-4">
          <Badge variant="code">THE SYNTHESIS</Badge>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-editorial-primary uppercase tracking-tight">
            AI Brings Speed. Humans Bring Judgment.
          </h2>
          <p className="text-xs sm:text-sm text-editorial-secondary font-sans leading-relaxed">
            The goal isn&apos;t to choose between humans and AI. It&apos;s to make both work better together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans">
          <div className="p-6 rounded-sm bg-surface-muted border border-border flex flex-col gap-2">
            <span className="font-mono text-accent-orange font-bold uppercase tracking-wider">AI PROVIDES</span>
            <ul className="text-editorial-secondary flex flex-col gap-1.5 pt-2">
              <li>• Computational Speed</li>
              <li>• Scale & Triage</li>
              <li>• Pattern Recognition</li>
              <li>• 24/7 Automation</li>
              <li>• Rapid Processing</li>
            </ul>
          </div>

          <div className="p-6 rounded-sm bg-surface-muted border border-border flex flex-col gap-2">
            <span className="font-mono text-editorial-primary font-bold uppercase tracking-wider">HUMANS PROVIDE</span>
            <ul className="text-editorial-secondary flex flex-col gap-1.5 pt-2">
              <li>• Business Strategy</li>
              <li>• Market Context</li>
              <li>• Creative Direction</li>
              <li>• Critical Judgment</li>
              <li>• Customer Empathy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Principles */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Badge variant="dot">OPERATING PRINCIPLES</Badge>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-editorial-primary uppercase tracking-tight">
            What Governs Every Growth System We Build
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((pr, i) => (
            <div key={i} className="editorial-card p-8 flex flex-col justify-between min-h-[200px] group">
              <div className="card-hover-accent" />
              <div className="card-shift-content flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between text-editorial-muted border-b border-border pb-3 mb-4">
                    <span className="font-mono text-xs font-bold text-accent-orange">0{i + 1} — PRINCIPLE</span>
                    <Plus className="w-4 h-4 text-editorial-secondary" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-editorial-primary mb-2">{pr.title}</h3>
                  <p className="text-xs text-editorial-secondary font-sans leading-relaxed">{pr.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Building in Public Statement */}
      <div className="p-8 sm:p-12 rounded-sm bg-surface border border-border flex flex-col gap-5">
        <Badge variant="code">RADICAL TRANSPARENCY</Badge>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-editorial-primary uppercase tracking-tight">
          We&apos;re Building AxonVortex From Zero.
        </h2>
        <p className="text-xs sm:text-sm text-editorial-secondary font-sans leading-relaxed max-w-3xl">
          We&apos;re not here to pretend we&apos;ve already built something huge. We&apos;re here to build something valuable. That means testing ideas, experimenting with AI, developing systems, studying what works, learning from what doesn&apos;t and continuously improving in public. No manufactured success stories. No inflated promises.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Badge variant="dot">CLARITY & TRANSPARENCY</Badge>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-editorial-primary uppercase tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-8 rounded-sm editorial-card flex flex-col gap-3">
              <h3 className="text-base font-heading font-bold text-editorial-primary">{faq.q}</h3>
              <p className="text-xs sm:text-sm text-editorial-secondary font-sans leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="p-10 sm:p-14 rounded-sm bg-surface border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div className="flex flex-col gap-2 max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-editorial-primary uppercase tracking-tight">
            Let&apos;s Build Something Smarter.
          </h3>
          <p className="text-xs sm:text-sm text-editorial-secondary font-sans">
            Find what&apos;s holding your digital growth back with a comprehensive diagnostic audit.
          </p>
        </div>
        <Button variant="primary" size="md" withArrow asLink href="/contact?type=audit">
          Request Growth Audit
        </Button>
      </div>
    </div>
  );
}

