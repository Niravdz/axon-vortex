import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { solutionCategories } from "@/data/sitemap";

export const metadata = {
  title: "Solutions — AxonVortex Digital Growth Systems",
  description: "Explore our multi-disciplinary growth systems combining Digital Marketing, AI Automation, Websites & E-Commerce, Lead Gen, and Enterprise Technology.",
};

export default function SolutionsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-20 text-editorial-primary">
      <div className="flex flex-col gap-4 max-w-3xl">
        <Badge variant="dot">GROWTH ARCHITECTURES</Badge>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-tight">
          Solutions Overview
        </h1>
        <p className="text-base sm:text-lg text-editorial-secondary font-heading">
          One Growth Partner. Multiple Connected Digital Solutions.
        </p>
        <p className="text-xs sm:text-sm text-editorial-muted font-sans leading-relaxed">
          We&apos;re not starting with a service. We start with your problem. Then we identify the right combination of strategy, marketing, technology and automation to solve it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {solutionCategories.map((cat, idx) => (
          <div
            key={cat.id}
            className="editorial-card p-8 sm:p-10 flex flex-col justify-between min-h-[320px] group"
          >
            <div className="card-hover-accent" />
            <div className="card-shift-content flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between text-editorial-muted border-b border-border pb-4 mb-4">
                  <span className="font-mono text-xs font-bold text-accent-orange">
                    0{idx + 1} — DOMAIN
                  </span>
                  <Plus className="w-4 h-4 text-editorial-secondary group-hover:text-accent-orange group-hover:rotate-45 transition-transform" />
                </div>

                <h2 className="text-2xl font-heading font-bold text-editorial-primary uppercase tracking-tight mb-2">
                  {cat.title}
                </h2>
                <p className="text-xs font-heading font-medium text-editorial-secondary mb-3">
                  {cat.tagline}
                </p>
                <p className="text-xs text-editorial-muted font-sans leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-border">
                  {cat.subservices.map((svc) => (
                    <span
                      key={svc}
                      className="px-2.5 py-1 rounded-sm bg-surface-muted text-[10px] font-mono text-editorial-secondary border border-border"
                    >
                      {svc}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/${cat.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-widest text-editorial-primary hover:text-accent-orange transition-colors"
                >
                  <span>View Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
