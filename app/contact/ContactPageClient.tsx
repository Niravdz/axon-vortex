"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Clock, ArrowUpRight, Check } from "lucide-react";
import { BauhausBadge } from "@/components/ui/BauhausBadge";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { authorityData } from "@/data/content/authorityConversion";

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
    <div className="w-full bg-brand-white text-brand-black selection:bg-brand-red selection:text-white overflow-x-clip">
      
      {/* 0. TOP SPEC BAR */}
      <div className="w-full border-b-2 border-brand-black bg-brand-gray/50 px-6 md:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase">
          <div className="flex items-center gap-2 text-brand-black/70">
            <Link href="/" className="hover:text-brand-red font-bold transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-red font-black">Contact &amp; Commission</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
            <span className="font-bold text-brand-black tracking-wider">INTAKE PIPELINE OPEN</span>
          </div>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-16 md:pt-24 pb-16 px-6 md:px-12 border-b-2 border-brand-black bg-brand-white">
        <ScrollReveal variant="fade-up" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <BauhausBadge variant="red" shape="square">
                {contactSection.badge}
              </BauhausBadge>
              <BauhausBadge variant="yellow" shape="pill">
                DIRECT INTAKE
              </BauhausBadge>
              <span className="font-mono text-xs text-brand-black/60 font-bold uppercase tracking-widest">
                NO SALES FLUFF // PURE STRATEGY
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tighter leading-[0.92] text-brand-black">
              Let&apos;s talk about your <br />
              <span className="text-brand-red">next stage of growth.</span>
            </h1>

            <p className="text-lg md:text-xl font-body text-brand-black/80 max-w-2xl leading-relaxed border-l-4 border-brand-red pl-6 py-2 bg-brand-gray/30">
              {contactSection.subheading}
            </p>

            {/* Need to Know List */}
            <div className="p-6 bg-brand-gray border-2 border-brand-black shadow-hard-md flex flex-col gap-3">
              <span className="font-mono text-xs font-black uppercase tracking-widest text-brand-black/60">
                {contactSection.needToKnowLabel}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {contactSection.needToKnowPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-brand-white border border-brand-black flex items-center gap-2 font-display font-black text-sm uppercase text-brand-black"
                  >
                    <span className="font-mono text-xs text-brand-red">0{idx + 1}</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm font-sans text-brand-black/80">
              {contactSection.closingParagraph}
            </p>
          </div>

          {/* Right Column: Direct Contact Details Plate */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="border-2 border-brand-black bg-brand-gray p-6 sm:p-8 shadow-hard-lg flex flex-col gap-6">
              <div className="border-b-2 border-brand-black pb-4">
                <span className="font-mono text-xs font-black uppercase tracking-widest text-brand-black/60 block mb-1">
                  COMMUNICATION CHANNELS
                </span>
                <span className="font-display font-black text-2xl uppercase text-brand-black">
                  Direct Line
                </span>
              </div>

              <div className="flex flex-col gap-4 font-mono text-xs">
                <div className="p-4 bg-brand-white border-2 border-brand-black flex items-start gap-3 shadow-hard-sm">
                  <Phone className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-brand-black/50 font-bold uppercase">Phone / WhatsApp</span>
                    <a href="tel:+919933112213" className="font-bold text-brand-black hover:text-brand-red text-sm">
                      +91 9933112213
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-brand-white border-2 border-brand-black flex items-start gap-3 shadow-hard-sm">
                  <Mail className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-brand-black/50 font-bold uppercase">Direct Email</span>
                    <a href="mailto:info@axonvortex.com" className="font-bold text-brand-black hover:text-brand-blue text-sm">
                      info@axonvortex.com
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-brand-white border-2 border-brand-black flex items-start gap-3 shadow-hard-sm">
                  <Clock className="w-4 h-4 text-brand-yellow shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-brand-black/50 font-bold uppercase">Operating Hours</span>
                    <span className="font-bold text-brand-black text-xs">
                      Mon – Fri, 09:00 – 18:00 IST
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-brand-yellow/30 border-2 border-brand-black">
                <span className="font-mono text-xs font-black uppercase text-brand-black block mb-1">
                  Response SLA
                </span>
                <p className="text-xs text-brand-black/80 font-sans leading-relaxed">
                  All submitted briefs are reviewed by a lead strategist. You will receive an architectural response within 24 business hours.
                </p>
              </div>
            </div>
          </div>

        </ScrollReveal>
      </section>

      {/* 2. INTAKE FORM */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-gray border-b-2 border-brand-black">
        <ScrollReveal variant="fade-up" className="max-w-4xl mx-auto">
          
          <div className="border-2 border-brand-black bg-brand-white p-8 sm:p-12 shadow-hard-lg">
            
            <div className="border-b-2 border-brand-black pb-6 mb-8 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-brand-red block mb-1">
                  STAGE 01 // DISCOVERY
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-black uppercase text-brand-black">
                  {formSection.title}
                </h2>
              </div>
              <span className="w-3 h-3 bg-brand-yellow border border-brand-black hidden sm:block" />
            </div>

            {/* Success State */}
            {formSuccess ? (
              <div className="p-8 bg-brand-gray border-2 border-brand-black flex flex-col gap-6 text-center items-center transition-all duration-300">
                <div className="w-16 h-16 bg-brand-yellow border-2 border-brand-black flex items-center justify-center shadow-hard-sm">
                  <Check className="w-8 h-8 text-brand-black" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs font-black uppercase text-brand-red">
                    REFERENCE ID: {formSuccess}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-brand-black">
                    Brief Logged Successfully
                  </h3>
                  <p className="text-sm font-sans text-brand-black/80 max-w-lg leading-relaxed mt-2">
                    Thank you. Your details have been transmitted to our strategic pod. We will examine your business parameters and contact you within 1 business day.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    variant="primary"
                    size="md"
                    className="bg-brand-black text-white hover:bg-brand-red"
                    asLink
                    href="/solutions"
                  >
                    Explore Solutions
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    className="border-2 border-brand-black"
                    onClick={() => {
                      setFormSuccess(null);
                      setFormData({ name: "", businessName: "", email: "", phone: "", website: "", tellUsMore: "" });
                      setSelectedInterests([]);
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                
                {formError && (
                  <div className="p-4 bg-brand-red text-white border-2 border-brand-black flex items-center gap-3 font-mono text-xs uppercase font-bold transition-all duration-200">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Text Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-black uppercase tracking-wider text-brand-black">
                      {formSection.fields.name.label} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={formSection.fields.name.placeholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="p-3.5 border-2 border-brand-black bg-brand-gray/30 focus:bg-brand-white focus:outline-none focus:border-brand-red font-sans text-sm text-brand-black transition-colors"
                    />
                  </div>

                  {/* Business Name */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-black uppercase tracking-wider text-brand-black">
                      {formSection.fields.businessName.label} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={formSection.fields.businessName.placeholder}
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="p-3.5 border-2 border-brand-black bg-brand-gray/30 focus:bg-brand-white focus:outline-none focus:border-brand-red font-sans text-sm text-brand-black transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-black uppercase tracking-wider text-brand-black">
                      {formSection.fields.email.label} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={formSection.fields.email.placeholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="p-3.5 border-2 border-brand-black bg-brand-gray/30 focus:bg-brand-white focus:outline-none focus:border-brand-red font-sans text-sm text-brand-black transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-black uppercase tracking-wider text-brand-black">
                      {formSection.fields.phone.label} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={formSection.fields.phone.placeholder}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="p-3.5 border-2 border-brand-black bg-brand-gray/30 focus:bg-brand-white focus:outline-none focus:border-brand-red font-sans text-sm text-brand-black transition-colors"
                    />
                  </div>

                  {/* Website (Full Span) */}
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="font-mono text-xs font-black uppercase tracking-wider text-brand-black">
                      {formSection.fields.website.label} <span className="text-brand-black/50 text-[10px]">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      placeholder={formSection.fields.website.placeholder}
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="p-3.5 border-2 border-brand-black bg-brand-gray/30 focus:bg-brand-white focus:outline-none focus:border-brand-red font-sans text-sm text-brand-black transition-colors"
                    />
                  </div>

                </div>

                {/* Interest Checkboxes */}
                <div className="flex flex-col gap-3 pt-2">
                  <label className="font-mono text-xs font-black uppercase tracking-wider text-brand-black">
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
                          className={`px-3.5 py-2 border-2 font-mono text-xs uppercase font-bold transition-all flex items-center gap-2 ${
                            isSelected
                              ? "bg-brand-red text-white border-brand-black shadow-hard-sm"
                              : "bg-brand-white text-brand-black border-brand-black/40 hover:border-brand-black"
                          }`}
                        >
                          <span className={`w-2 h-2 ${isSelected ? "bg-white" : "bg-transparent border border-brand-black"}`} />
                          <span>{interest}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tell Us More Textarea */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs font-black uppercase tracking-wider text-brand-black">
                    {formSection.fields.tellUsMoreLabel}
                  </label>
                  <p className="text-xs text-brand-black/60 font-sans mb-1">
                    {formSection.fields.tellUsMoreQuestions.join(" ")}
                  </p>
                  <textarea
                    rows={4}
                    placeholder="Describe your current bottleneck, targets, or questions..."
                    value={formData.tellUsMore}
                    onChange={(e) => setFormData({ ...formData, tellUsMore: e.target.value })}
                    className="p-3.5 border-2 border-brand-black bg-brand-gray/30 focus:bg-brand-white focus:outline-none focus:border-brand-red font-sans text-sm text-brand-black transition-colors resize-y"
                  />
                </div>

                {/* Privacy Consent Checkbox */}
                <div className="flex items-start gap-3 pt-2 border-t-2 border-brand-black/20">
                  <input
                    type="checkbox"
                    id="privacy-consent"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="w-4 h-4 mt-1 accent-brand-red border-2 border-brand-black cursor-pointer"
                  />
                  <label htmlFor="privacy-consent" className="text-xs font-sans text-brand-black/80 leading-relaxed cursor-pointer">
                    I acknowledge that the information provided will be used by AxonVortex to evaluate our inquiry in accordance with the{" "}
                    <Link href="/privacy" className="text-brand-red font-bold underline hover:text-brand-black">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms" className="text-brand-red font-bold underline hover:text-brand-black">
                      Terms of Service
                    </Link>.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-brand-red text-white hover:bg-brand-black text-base py-4 border-2 border-brand-black shadow-hard-md"
                  >
                    {isSubmitting ? "Transmitting Brief..." : formSection.cta.label}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>

              </form>
            )}

          </div>

        </ScrollReveal>
      </section>

      {/* 3. NOT READY TO TALK? (ALTERNATIVE EXPLORATION) */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-white border-b-2 border-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-brand-black pb-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <BauhausBadge variant="blue" shape="square">
                  {notReadyToTalk.badge}
                </BauhausBadge>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                  SELF-DIRECTED DISCOVERY
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
                {notReadyToTalk.headline}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase font-bold text-brand-black/60">
              {notReadyToTalk.tagline}
            </span>
          </ScrollReveal>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notReadyToTalk.options.map((opt, idx) => (
              <Link
                key={idx}
                data-stagger-item
                href={opt.href}
                className="p-8 border-2 border-brand-black bg-brand-white shadow-hard-md hover:shadow-hard-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col justify-between min-h-[220px] group"
              >
                <div>
                  <div className="flex items-center justify-between border-b-2 border-brand-black pb-3 mb-4">
                    <span className="font-mono text-xs font-black text-brand-red">
                      ROUTE 0{idx + 1}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-brand-black group-hover:text-brand-red transition-colors" />
                  </div>
                  <h3 className="text-xl font-display font-black uppercase text-brand-black group-hover:text-brand-red transition-colors mb-2">
                    {opt.title}
                  </h3>
                </div>
                <p className="text-sm text-brand-black/80 font-sans leading-relaxed">
                  {opt.description}
                </p>
              </Link>
            ))}
          </ScrollReveal>

        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-gray border-b-2 border-brand-black">
        <ScrollReveal variant="fade-up" className="max-w-4xl mx-auto flex flex-col gap-10">
          
          <div className="flex flex-col gap-3 border-b-2 border-brand-black pb-6">
            <div className="flex items-center gap-2">
              <BauhausBadge variant="yellow" shape="square">
                {faq.badge}
              </BauhausBadge>
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-brand-black/60">
                TRANSPARENCY ACCORD
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-brand-black">
              {faq.title}
            </h2>
          </div>

          <div className="flex flex-col border-2 border-brand-black bg-brand-white shadow-hard-md">
            {faq.items.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="border-b-2 last:border-b-0 border-brand-black">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-black text-base sm:text-lg uppercase text-brand-black hover:bg-brand-yellow/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-brand-red">0{idx + 1}</span>
                      <span>{item.q}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-brand-red" : ""}`}
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-2 bg-brand-gray/30 border-t border-brand-black/10 flex flex-col gap-3 text-sm font-sans text-brand-black/80 leading-relaxed">
                        {item.a.map((ans, i) => (
                          <p key={i}>{ans}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </ScrollReveal>
      </section>

    </div>
  );
}
