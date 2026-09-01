import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { solutionCategories } from "@/data/sitemap";

export const metadata = {
  title: "Service Directory — AxonVortex",
  description: "Comprehensive catalog of digital marketing, AI automation, custom software, and conversion services.",
};

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-20 text-editorial-primary">
      <div className="flex flex-col gap-4 max-w-3xl">
        <Badge variant="dot">SERVICE DIRECTORY</Badge>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-tight">
          All Services
        </h1>
        <p className="text-base sm:text-lg text-editorial-secondary font-heading">
          Precision Capabilities for Modern Businesses.
        </p>
        <p className="text-xs sm:text-sm text-editorial-muted font-sans leading-relaxed">
          Explore our modular service capabilities across AI, digital marketing, conversion engineering, and enterprise transformation.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {solutionCategories.map((cat, i) => (
          <div key={cat.id} className="editorial-card p-8 sm:p-12 flex flex-col gap-6">
            <div className="card-shift-content flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-border pb-6">
                <div>
                  <span className="font-mono text-xs font-bold text-accent-orange">CATEGORY 0{i + 1}</span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-editorial-primary uppercase tracking-tight">{cat.title}</h2>
                  <p className="text-xs text-editorial-secondary font-heading">{cat.tagline}</p>
                </div>
                <Link
                  href={`/${cat.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-editorial-primary hover:text-accent-orange uppercase tracking-wider"
                >
                  <span>View Full Category</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.subservices.map((sub) => (
                  <div key={sub} className="p-4 rounded-sm bg-surface-muted border border-border flex items-center gap-3">
                    <span className="font-mono text-xs text-accent-orange font-bold">+</span>
                    <span className="text-xs font-sans text-editorial-primary">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
