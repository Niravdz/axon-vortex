"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, Mail, Clock, Check, ArrowUpRight } from "lucide-react";
import { authorityData } from "@/data/content/authorityConversion";
import { SiteTextureBackground } from "@/components/layout/SiteTextureBackground";
import { RecessedAccordion } from "@/components/patterns/RecessedAccordion";
import { TactileButton } from "@/components/ui/TactileButton";
import { MatteSection } from "@/components/ui/MatteSection";
import { cn } from "@/lib/utils";

export default function ContactPageClient() {
  const { contactSection, formSection, notReadyToTalk, faq } = authorityData;

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    website: "",
    tellUsMore: "",
  });
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name || !formData.email) {
      setFormError("Please provide your name and work email.");
      return;
    }

    if (!privacyConsent) {
      setFormError("Please acknowledge the privacy policy to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          interests: selectedInterests,
          privacyConsent,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setFormSuccess(data.referenceId || "AXON-RECEIVED");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Network error. Please try again or email us directly at info@axonvortex.com.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Convert FAQs into RecessedAccordion items
  const faqItems = faq.items.map((item) => ({
    title: item.q,
    content: <p className="leading-relaxed">{item.a}</p>,
  }));

  return (
    <SiteTextureBackground className="overflow-x-clip">
      <div className="w-full text-[#EFECE4]">
        {/* 0. TOP SPEC BAR */}
        <div className="w-full border-b border-white/[0.08] bg-[#101215] px-4 sm:px-8 lg:px-12 py-3">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2 text-[#9AA3B2]">
              <Link href="/" className="hover:text-[#3B82F6] font-medium transition-colors">
                Home
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-[#3B82F6] font-semibold">Contact &amp; Commission</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] animate-pulse" />
              <span className="font-semibold text-[#EFECE4] tracking-widest text-[11px]">
                INTAKE PIPELINE OPEN // 24H SLA
              </span>
            </div>
          </div>
        </div>

        {/* 1. INTRODUCTORY SECTION & CONTACT FORM */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Strong Introductory Statement */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#3B82F6]/30 text-xs font-mono tracking-wider w-fit text-[#93C5FD]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                <span>{contactSection.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold tracking-tight uppercase leading-[1.04] text-[#EFECE4]">
                {contactSection.headline}
              </h1>

              <div className="flex flex-col gap-3 font-body text-base text-[#9AA3B2] leading-relaxed border-l-2 border-[#3B82F6] pl-4">
                <p className="text-base text-[#EFECE4]">{contactSection.subheading}</p>
                <div className="flex flex-col gap-1.5 pt-1">
                  <span className="font-mono text-xs text-[#9AA3B2] uppercase">{contactSection.needToKnowLabel}</span>
                  {contactSection.needToKnowPoints.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-[#9AA3B2]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#9AA3B2] pt-2">{contactSection.closingParagraph}</p>
              </div>

              {/* Service Commitments Box */}
              <div className="p-6 rounded-[16px] bg-[#141619] border border-white/[0.06] flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-3 text-xs font-mono text-[#9AA3B2]">
                  <Clock className="w-4 h-4 text-[#F4BA00]" />
                  <span>RESPONSE TIME: WITHIN 24 BUSINESS HOURS</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#9AA3B2]">
                  <Mail className="w-4 h-4 text-[#3B82F6]" />
                  <span>DIRECT INTAKE: INFO@AXONVORTEX.COM</span>
                </div>
              </div>

              {/* Not Ready to Talk Alternative */}
              <div className="p-6 rounded-[16px] bg-[#1b1e22] border border-white/[0.08] flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#F4BA00] font-semibold">
                  {notReadyToTalk.headline}
                </span>
                <div className="flex flex-col gap-1 text-xs text-[#9AA3B2]">
                  {notReadyToTalk.statements.map((s, idx) => (
                    <p key={idx}>{s}</p>
                  ))}
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  {notReadyToTalk.options.map((opt, idx) => (
                    <Link
                      key={idx}
                      href={opt.href}
                      className="flex items-center justify-between p-2 rounded-[8px] bg-[#141619] border border-white/[0.04] hover:border-[#3B82F6]/40 transition-colors text-xs font-mono text-[#EFECE4]"
                    >
                      <span>{opt.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#3B82F6]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Raised Form Shell with Recessed Inputs */}
            <div className="lg:col-span-7">
              <MatteSection radius="24" className="p-6 sm:p-10 lg:p-12 border-white/[0.1]">
                {formSuccess ? (
                  <div className="p-8 sm:p-10 rounded-[16px] bg-[#101215] border border-[#3B82F6]/40 shadow-[inset_0_2px_6px_rgba(0,0,0,0.85)] flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1b1e22] border border-[#3B82F6]/50 flex items-center justify-center text-[#3B82F6]">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-heading font-semibold uppercase text-[#EFECE4]">
                      Inquiry Received
                    </h3>
                    <p className="text-xs sm:text-sm font-body text-[#9AA3B2] max-w-md leading-relaxed">
                      Thank you. Your commercial inquiry has been logged in our queue. Our senior engineering leads will review your challenge and follow up within 24 business hours.
                    </p>
                    <div className="p-3 rounded-[8px] bg-[#171a1e] font-mono text-xs text-[#F4BA00]">
                      REFERENCE ID: {formSuccess}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="border-b border-white/[0.08] pb-4">
                      <h2 className="text-2xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                        {formSection.title}
                      </h2>
                      <p className="font-body text-xs sm:text-sm text-[#9AA3B2] mt-1">
                        Tell us about your business goals and current system friction points.
                      </p>
                    </div>

                    {formError && (
                      <div className="p-4 rounded-[10px] bg-red-950/40 border border-red-500/40 flex items-center gap-3 text-xs font-mono text-red-300">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* Service / Interest Selection Pills */}
                    <div className="flex flex-col gap-2.5">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#9AA3B2]">
                        Areas of Strategic Focus:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {formSection.fields.interests.map((opt: string, idx: number) => {
                          const isSelected = selectedInterests.includes(opt);

                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => toggleInterest(opt)}
                              className={cn(
                                "px-3.5 py-1.5 rounded-[8px] font-mono text-xs transition-all duration-200 cursor-pointer",
                                isSelected
                                  ? "bg-[#3B82F6] text-white border border-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                                  : "bg-[#101215] text-[#9AA3B2] border border-white/[0.06] hover:text-[#EFECE4] hover:bg-[#171a1e]"
                              )}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-xs text-[#9AA3B2] uppercase">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Mercer"
                          className="w-full px-4 py-3 rounded-[10px] bg-[#101215] border border-white/[0.08] text-xs sm:text-sm text-[#EFECE4] placeholder-[#9AA3B2]/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] focus:outline-none focus:border-[#3B82F6]/60 transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-xs text-[#9AA3B2] uppercase">
                          Business / Organization
                        </label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="e.g. Apex Dynamics Ltd"
                          className="w-full px-4 py-3 rounded-[10px] bg-[#101215] border border-white/[0.08] text-xs sm:text-sm text-[#EFECE4] placeholder-[#9AA3B2]/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] focus:outline-none focus:border-[#3B82F6]/60 transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-xs text-[#9AA3B2] uppercase">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full px-4 py-3 rounded-[10px] bg-[#101215] border border-white/[0.08] text-xs sm:text-sm text-[#EFECE4] placeholder-[#9AA3B2]/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] focus:outline-none focus:border-[#3B82F6]/60 transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-xs text-[#9AA3B2] uppercase">
                          Phone / WhatsApp (Optional)
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 555 019 2834"
                          className="w-full px-4 py-3 rounded-[10px] bg-[#101215] border border-white/[0.08] text-xs sm:text-sm text-[#EFECE4] placeholder-[#9AA3B2]/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] focus:outline-none focus:border-[#3B82F6]/60 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs text-[#9AA3B2] uppercase">
                        Website or Current Digital Channels
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://yourcompany.com"
                        className="w-full px-4 py-3 rounded-[10px] bg-[#101215] border border-white/[0.08] text-xs sm:text-sm text-[#EFECE4] placeholder-[#9AA3B2]/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] focus:outline-none focus:border-[#3B82F6]/60 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs text-[#9AA3B2] uppercase">
                        Project Scope &amp; Core Challenge
                      </label>
                      <textarea
                        rows={4}
                        value={formData.tellUsMore}
                        onChange={(e) => setFormData({ ...formData, tellUsMore: e.target.value })}
                        placeholder="Describe your current bottlenecks, upcoming commercial targets, or specific system capabilities needed..."
                        className="w-full px-4 py-3 rounded-[10px] bg-[#101215] border border-white/[0.08] text-xs sm:text-sm text-[#EFECE4] placeholder-[#9AA3B2]/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] focus:outline-none focus:border-[#3B82F6]/60 transition-colors resize-y"
                      />
                    </div>

                    {/* Privacy Consent Checkbox */}
                    <div className="flex items-start gap-3 pt-1">
                      <input
                        id="privacy-consent"
                        type="checkbox"
                        checked={privacyConsent}
                        onChange={(e) => setPrivacyConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded bg-[#101215] border border-white/[0.2] text-[#3B82F6] focus:ring-0 cursor-pointer"
                      />
                      <label
                        htmlFor="privacy-consent"
                        className="font-body text-xs text-[#9AA3B2] leading-relaxed cursor-pointer"
                      >
                        I understand that AxonVortex processes commercial inquiries strictly under our{" "}
                        <Link href="/privacy" className="text-[#3B82F6] underline hover:text-[#60A5FA]">
                          Privacy Policy
                        </Link>{" "}
                        with zero unsolicited third-party sharing.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <TactileButton
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        className="w-full justify-center min-h-[50px] shadow-[0_4px_20px_rgba(244,186,0,0.35)]"
                      >
                        {isSubmitting ? "Submitting Inquiry..." : formSection.cta.label}
                      </TactileButton>
                    </div>
                  </form>
                )}
              </MatteSection>
            </div>
          </div>
        </section>

        {/* 2. FREQUENTLY ASKED QUESTIONS */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[#EFECE4]/[0.08]">
          <div className="max-w-4xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col gap-3 text-center items-center">
              <span className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] font-semibold">
                COMMISSION CLARIFICATIONS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tight text-[#EFECE4]">
                {faq.title}
              </h2>
            </div>

            <RecessedAccordion items={faqItems} defaultOpenIndex={0} />
          </div>
        </section>
      </div>
    </SiteTextureBackground>
  );
}

export { ContactPageClient };
