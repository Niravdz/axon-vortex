"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, AlertCircle, Mail, Clock, ArrowUpRight, Check } from "lucide-react";
import { authorityData } from "@/data/content/authorityConversion";
import { DimensionalButton } from "@/components/ui/DimensionalButton";

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

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

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
      const message = err instanceof Error ? err.message : "Network error. Please try again or email us directly.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#141619] text-[#EFECE4] selection:bg-[#3B82F6] selection:text-white overflow-x-clip">
      {/* 0. TOP SPEC BAR */}
      <div className="w-full border-b border-white/[0.08] bg-[#101215] px-6 md:px-12 py-3">
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
              INTAKE PIPELINE OPEN
            </span>
          </div>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-20 md:pt-28 pb-16 px-6 md:px-12 border-b border-white/[0.08] bg-[#141619]">
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[300px] bg-[#3B82F6]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD]">
                {contactSection.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-[#F4BA00]/15 border border-[#F4BA00]/30 text-[#FDE68A]">
                DIRECT INTAKE
              </span>
              <span className="font-mono text-xs text-[#9AA3B2] uppercase tracking-widest">
                NO SALES FLUFF // PURE STRATEGY
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-semibold tracking-tight leading-[1.05] text-[#EFECE4]">
              Let&apos;s talk about your <br />
              <span className="text-[#3B82F6] drop-shadow-[0_0_24px_rgba(59,130,246,0.3)]">
                next stage of growth.
              </span>
            </h1>

            <p className="text-base md:text-lg font-body text-[#9AA3B2] max-w-2xl leading-relaxed border-l-2 border-[#3B82F6] pl-6 py-2 bg-[#1b1e22] rounded-r-xl">
              {contactSection.subheading}
            </p>

            {/* Need to Know List: Outer Raised Container with Inner Recessed Boxes */}
            <div className="p-6 rounded-2xl bg-[#1b1e22] border border-white/[0.08] shadow-[0_16px_36px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#9AA3B2]">
                {contactSection.needToKnowLabel}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {contactSection.needToKnowPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.78),0_1px_0_rgba(255,255,255,0.035)] flex items-center gap-2.5 font-heading font-medium text-xs text-[#EFECE4]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm font-body text-[#9AA3B2]">
              {contactSection.closingParagraph}
            </p>
          </div>

          {/* Right Column: Direct Contact Details Plate (Outer Raised with Inner Recessed Boxes) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="rounded-2xl border border-white/[0.08] bg-[#1b1e22] p-6 sm:p-8 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.72),0_6px_14px_-3px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col gap-6">
              <div className="border-b border-white/[0.06] pb-4">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#9AA3B2] block mb-1">
                  COMMUNICATION CHANNELS
                </span>
                <span className="font-heading font-semibold text-2xl text-[#EFECE4]">
                  Direct Line
                </span>
              </div>

              <div className="flex flex-col gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.78),0_1px_0_rgba(255,255,255,0.035)] flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#9AA3B2] font-semibold uppercase">Direct Email</span>
                    <a href="mailto:info@axonvortex.com" className="font-semibold text-[#EFECE4] hover:text-[#3B82F6] text-sm transition-colors">
                      info@axonvortex.com
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#101215] border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.78),0_1px_0_rgba(255,255,255,0.035)] flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#F4BA00] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#9AA3B2] font-semibold uppercase">Operating Hours</span>
                    <span className="font-semibold text-[#EFECE4] text-xs">
                      Mon – Fri, 09:00 – 18:00 IST
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#171a1e] border border-[#F4BA00]/30 shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
                <span className="font-mono text-xs font-semibold uppercase text-[#F4BA00] block mb-1">
                  Response SLA
                </span>
                <p className="text-xs text-[#9AA3B2] font-body leading-relaxed">
                  All submitted briefs are reviewed by a lead strategist. You will receive an architectural response within 24 business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MINIMAL INTAKE FORM PANEL */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#121519] border-b border-white/[0.08] relative">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl border border-white/[0.08] bg-[#1b1e22] p-8 sm:p-12 shadow-[0_24px_50px_-8px_rgba(0,0,0,0.85),0_8px_18px_-4px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.1)]">
            <div className="border-b border-white/[0.06] pb-6 mb-8 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#3B82F6] block mb-1">
                  DISCOVERY BRIEF
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-[#EFECE4]">
                  {formSection.title}
                </h2>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#F4BA00] shadow-[0_0_8px_#F4BA00] hidden sm:block" />
            </div>

            {/* Success State */}
            {formSuccess ? (
              <div className="p-8 rounded-2xl bg-[#171a1e] border border-[#3B82F6]/40 flex flex-col gap-6 text-center items-center transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="w-16 h-16 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Check className="w-8 h-8 text-[#93C5FD]" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs font-semibold uppercase text-[#F4BA00]">
                    REFERENCE ID: {formSuccess}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-[#EFECE4]">
                    Brief Logged Successfully
                  </h3>
                  <p className="text-sm font-body text-[#9AA3B2] max-w-lg leading-relaxed mt-2">
                    Thank you. Your details have been transmitted to our strategic pod. We will examine your business parameters and contact you within 1 business day.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <DimensionalButton
                    variant="amber"
                    size="md"
                    asLink
                    href="/solutions"
                  >
                    Explore Solutions
                  </DimensionalButton>
                  <DimensionalButton
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setFormSuccess(null);
                      setFormData({ name: "", businessName: "", email: "", phone: "", website: "", tellUsMore: "" });
                      setSelectedInterests([]);
                    }}
                  >
                    Submit Another Inquiry
                  </DimensionalButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                {formError && (
                  <div className="p-4 rounded-xl bg-red-500/20 text-red-200 border border-red-500/30 flex items-center gap-3 font-mono text-xs uppercase font-medium">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Text Inputs Grid (Carved Inset Neumorphic Inputs) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#EFECE4]">
                      {formSection.fields.name.label} <span className="text-[#F4BA00]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={formSection.fields.name.placeholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="p-3.5 rounded-xl border border-white/[0.06] bg-[#101215] text-[#EFECE4] placeholder-[#9AA3B2]/50 font-body text-sm focus:outline-none focus:border-[#3B82F6]/60 focus:ring-2 focus:ring-[#3B82F6]/30 transition-all shadow-[inset_0_2px_5px_rgba(0,0,0,0.82),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.035)]"
                    />
                  </div>

                  {/* Business Name */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#EFECE4]">
                      {formSection.fields.businessName.label} <span className="text-[#F4BA00]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={formSection.fields.businessName.placeholder}
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="p-3.5 rounded-xl border border-white/[0.06] bg-[#101215] text-[#EFECE4] placeholder-[#9AA3B2]/50 font-body text-sm focus:outline-none focus:border-[#3B82F6]/60 focus:ring-2 focus:ring-[#3B82F6]/30 transition-all shadow-[inset_0_2px_5px_rgba(0,0,0,0.82),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.035)]"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#EFECE4]">
                      {formSection.fields.email.label} <span className="text-[#F4BA00]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={formSection.fields.email.placeholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="p-3.5 rounded-xl border border-white/[0.06] bg-[#101215] text-[#EFECE4] placeholder-[#9AA3B2]/50 font-body text-sm focus:outline-none focus:border-[#3B82F6]/60 focus:ring-2 focus:ring-[#3B82F6]/30 transition-all shadow-[inset_0_2px_5px_rgba(0,0,0,0.82),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.035)]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#EFECE4]">
                      {formSection.fields.phone.label} <span className="text-[#F4BA00]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={formSection.fields.phone.placeholder}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="p-3.5 rounded-xl border border-white/[0.06] bg-[#101215] text-[#EFECE4] placeholder-[#9AA3B2]/50 font-body text-sm focus:outline-none focus:border-[#3B82F6]/60 focus:ring-2 focus:ring-[#3B82F6]/30 transition-all shadow-[inset_0_2px_5px_rgba(0,0,0,0.82),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.035)]"
                    />
                  </div>

                  {/* Website (Full Span) */}
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#EFECE4]">
                      {formSection.fields.website.label} <span className="text-[#9AA3B2]/60 text-[10px]">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      placeholder={formSection.fields.website.placeholder}
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="p-3.5 rounded-xl border border-white/[0.06] bg-[#101215] text-[#EFECE4] placeholder-[#9AA3B2]/50 font-body text-sm focus:outline-none focus:border-[#3B82F6]/60 focus:ring-2 focus:ring-[#3B82F6]/30 transition-all shadow-[inset_0_2px_5px_rgba(0,0,0,0.82),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.035)]"
                    />
                  </div>
                </div>

                {/* Interest Checkboxes */}
                <div className="flex flex-col gap-3 pt-2">
                  <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#EFECE4]">
                    {formSection.fields.interestLabel}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formSection.fields.interests.map((interest) => {
                      const isSelected = selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`px-3.5 py-2 rounded-xl border font-mono text-xs uppercase font-medium transition-all flex items-center gap-2 cursor-pointer ${
                            isSelected
                              ? "bg-[#3B82F6] text-white border-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.35),inset_0_1px_0_rgba(255,255,255,0.2)]"
                              : "bg-[#101215] text-[#9AA3B2] border-white/[0.06] shadow-[inset_0_1px_3px_rgba(0,0,0,0.7)] hover:border-white/20 hover:text-[#EFECE4]"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-white" : "bg-transparent border border-white/30"}`} />
                          <span>{interest}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tell Us More Textarea */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs font-semibold uppercase tracking-wider text-[#EFECE4]">
                    {formSection.fields.tellUsMoreLabel}
                  </label>
                  <p className="text-xs text-[#9AA3B2] font-body mb-1">
                    {formSection.fields.tellUsMoreQuestions.join(" ")}
                  </p>
                  <textarea
                    rows={4}
                    placeholder="Describe your current bottleneck, targets, or questions..."
                    value={formData.tellUsMore}
                    onChange={(e) => setFormData({ ...formData, tellUsMore: e.target.value })}
                    className="p-3.5 rounded-xl border border-white/[0.06] bg-[#101215] text-[#EFECE4] placeholder-[#9AA3B2]/50 font-body text-sm focus:outline-none focus:border-[#3B82F6]/60 focus:ring-2 focus:ring-[#3B82F6]/30 transition-all resize-y shadow-[inset_0_2px_5px_rgba(0,0,0,0.82),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.035)]"
                  />
                </div>

                {/* Privacy Consent Checkbox */}
                <div className="flex items-start gap-3 pt-2 border-t border-white/[0.06]">
                  <input
                    type="checkbox"
                    id="privacy-consent"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-[#3B82F6] rounded border border-white/20 bg-[#101215] cursor-pointer"
                  />
                  <label htmlFor="privacy-consent" className="text-xs font-body text-[#9AA3B2] leading-relaxed cursor-pointer">
                    I acknowledge that the information provided will be used by AxonVortex to evaluate our inquiry in accordance with the{" "}
                    <Link href="/privacy" className="text-[#3B82F6] font-medium underline hover:text-[#93C5FD]">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms" className="text-[#3B82F6] font-medium underline hover:text-[#93C5FD]">
                      Terms of Service
                    </Link>.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <DimensionalButton
                    type="submit"
                    variant="amber"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full justify-center"
                  >
                    {isSubmitting ? "Transmitting Brief..." : formSection.cta.label}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </DimensionalButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. NOT READY TO TALK? (ALTERNATIVE EXPLORATION) */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#141619] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD]">
                  {notReadyToTalk.badge}
                </span>
                <span className="font-mono text-xs uppercase font-medium tracking-widest text-[#9AA3B2]">
                  SELF-DIRECTED DISCOVERY
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
                {notReadyToTalk.headline}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-medium text-[#9AA3B2]">
              Explore Options Without Commitment
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notReadyToTalk.options.map((opt, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl border border-white/[0.08] bg-[#171a1e] shadow-[0_12px_32px_-4px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-[#21252a] hover:border-[#3B82F6]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#F4BA00]/20 text-[#FDE68A] border border-[#F4BA00]/30 mb-4 inline-block">
                    OPTION {idx + 1}
                  </span>
                  <h3 className="text-xl font-heading font-semibold text-[#EFECE4] mb-3">
                    {opt.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-body text-[#9AA3B2] leading-relaxed mb-6">
                    {opt.description}
                  </p>
                </div>

                <DimensionalButton
                  variant="outline"
                  size="sm"
                  asLink
                  href={opt.href}
                  className="w-full justify-between"
                >
                  <span>{opt.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </DimensionalButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#121519] relative">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="text-center flex flex-col items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD]">
              {faq.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-[#EFECE4]">
              {faq.title}
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faq.items.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/[0.08] bg-[#171a1e] shadow-[0_4px_14px_-2px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="font-heading font-semibold text-base sm:text-lg text-[#EFECE4]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#3B82F6] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm font-body text-[#9AA3B2] leading-relaxed border-t border-white/[0.06] bg-[#101215]/50 flex flex-col gap-2">
                      {item.a.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
