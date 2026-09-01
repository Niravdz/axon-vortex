"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Mail, CheckCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const interestOptions = [
  "Digital presence",
  "Social media",
  "Advertising",
  "SEO",
  "Website",
  "E-commerce",
  "Lead generation",
  "AI",
  "Automation",
  "CRM",
  "Custom software",
  "Digital transformation",
  "Not sure yet",
];

export default function ContactPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (opt: string) => {
    setSelectedInterests((prev) =>
      prev.includes(opt) ? prev.filter((item) => item !== opt) : [...prev, opt]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-16 text-editorial-primary">
      {/* Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <Badge variant="dot">COMMISSION & DIAGNOSIS</Badge>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold uppercase tracking-tight text-editorial-primary leading-tight">
          Let&apos;s Talk About Your Next Stage of Growth
        </h1>
        <p className="text-base sm:text-lg text-editorial-secondary font-heading">
          You don&apos;t need to know exactly which service you need.
        </p>
        <p className="text-xs sm:text-sm text-editorial-muted font-sans leading-relaxed">
          Tell us about your business, where you are, where you want to go, and what&apos;s currently getting in the way. We&apos;ll help identify where digital strategy, marketing, technology, or AI could make the biggest difference.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-8 editorial-card p-8 sm:p-12">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
              <div className="w-12 h-12 rounded-sm bg-surface-muted border border-border flex items-center justify-center text-accent-orange">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-editorial-primary uppercase">
                Transmission Received
              </h2>
              <p className="text-xs sm:text-sm text-editorial-secondary font-sans max-w-md">
                Thank you for contacting AxonVortex. An engineering and growth strategist will review your objectives and follow up within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-editorial-muted uppercase tracking-widest">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="p-3.5 rounded-sm bg-surface-muted border border-border text-editorial-primary text-xs font-sans focus:outline-none focus:border-editorial-primary"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-editorial-muted uppercase tracking-widest">Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your company or organization"
                    className="p-3.5 rounded-sm bg-surface-muted border border-border text-editorial-primary text-xs font-sans focus:outline-none focus:border-editorial-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-editorial-muted uppercase tracking-widest">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="p-3.5 rounded-sm bg-surface-muted border border-border text-editorial-primary text-xs font-sans focus:outline-none focus:border-editorial-primary"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-editorial-muted uppercase tracking-widest">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="p-3.5 rounded-sm bg-surface-muted border border-border text-editorial-primary text-xs font-sans focus:outline-none focus:border-editorial-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono text-editorial-muted uppercase tracking-widest">Current Website URL</label>
                <input
                  type="url"
                  placeholder="https://yourbusiness.com"
                  className="p-3.5 rounded-sm bg-surface-muted border border-border text-editorial-primary text-xs font-sans focus:outline-none focus:border-editorial-primary"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <label className="text-[10px] font-mono text-editorial-muted uppercase tracking-widest">
                  What are you looking to improve? (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((opt) => {
                    const isSelected = selectedInterests.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleInterest(opt)}
                        className={`px-3 py-1.5 rounded-sm text-xs font-sans border transition-all ${isSelected
                          ? "bg-editorial-primary text-background font-bold border-editorial-primary"
                          : "bg-surface-muted text-editorial-secondary border-border hover:border-border-bright"
                          }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono text-editorial-muted uppercase tracking-widest">
                  Tell us more about your challenge & goals *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="What are you trying to achieve? What is currently getting in the way?"
                  className="p-3.5 rounded-sm bg-surface-muted border border-border text-editorial-primary text-xs font-sans focus:outline-none focus:border-editorial-primary"
                />
              </div>

              <Button variant="primary" size="md" withArrow type="submit" className="mt-2">
                Start the Conversation
              </Button>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="editorial-card p-8 flex flex-col gap-4">
            <span className="font-mono text-xs text-accent-orange font-bold uppercase tracking-wider">DIRECT TELEMETRY</span>
            <div className="flex items-center gap-3 text-xs font-sans text-editorial-primary">
              <Mail className="w-4 h-4 text-editorial-secondary" />
              <span>{siteConfig.contact.email}</span>
            </div>
            <p className="text-xs text-editorial-muted font-sans leading-relaxed pt-2">
              {siteConfig.contact.address}
            </p>
          </div>

          <div className="editorial-card p-8 flex flex-col gap-4">
            <span className="font-mono text-xs text-editorial-primary font-bold uppercase tracking-wider">WHAT HAPPENS NEXT</span>
            <ol className="text-xs text-editorial-secondary font-sans flex flex-col gap-3">
              <li className="flex gap-2">
                <span className="font-mono text-accent-orange">01.</span>
                <span>We review your current digital footprint and ecosystem.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-accent-orange">02.</span>
                <span>We schedule an initial 30-minute diagnostic session.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-accent-orange">03.</span>
                <span>We outline a customized growth architecture roadmap.</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

