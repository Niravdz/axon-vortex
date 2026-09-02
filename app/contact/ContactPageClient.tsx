"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, CheckCircle2, Navigation, AlertCircle, Compass } from "lucide-react";
import { SectionMasthead } from "@/components/ui/SectionMasthead";
import { Button } from "@/components/ui/Button";
import { authorityData } from "@/data/content/authorityConversion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPageClient() {
  const { contactSection, formSection, notReadyToTalk, faq } = authorityData;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const formSubmitted = false;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const notReadyRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);

  const prefersReducedMotion = useReducedMotion();

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(false);
    
    // As per the audit requirement: If no real backend is connected, implement an honest failure state.
    setTimeout(() => {
      setIsSubmitting(false);
      setFormError(true);
    }, 800);
  };

  useLayoutEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // We remove the ScrollTrigger delay for above-the-fold content to ensure immediate visibility.
      // Hero and Consultation Path animations are immediate.
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll("[data-anim='h-fade']"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
        );
      }

      // Consultation Path Drawing
      if (pathRef.current) {
        const line = pathRef.current.querySelector(".path-line");
        const nodes = pathRef.current.querySelectorAll(".path-node");
        const tl = gsap.timeline();
        if (line) {
          tl.fromTo(line, { height: 0 }, { height: "100%", duration: 1.5, ease: "power2.inOut" });
        }
        if (nodes.length) {
          tl.fromTo(nodes, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.2, ease: "back.out(1.5)" }, "-=1");
        }
      }

      mm.add("(min-width: 1024px)", () => {
        // Below the fold triggers
        if (formRef.current) {
          gsap.fromTo(
            formRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: formRef.current, start: "top 85%" } }
          );
        }
        if (notReadyRef.current) {
           gsap.fromTo(notReadyRef.current.querySelectorAll(".nr-link"),
             { opacity: 0, x: -20 },
             { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: notReadyRef.current, start: "top 85%" } }
           );
        }
      });
      
      mm.add("(max-width: 1023px)", () => {
         if (formRef.current) gsap.fromTo(formRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: formRef.current, start: "top 90%" } });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const PATH_STEPS = [
    { label: "Current State", icon: <CheckCircle2 className="w-5 h-5" /> },
    { label: "Desired State", icon: <Navigation className="w-5 h-5" /> },
    { label: "Friction", icon: <AlertCircle className="w-5 h-5" /> },
    { label: "Strategic Direction", icon: <Compass className="w-5 h-5" /> }
  ];

  return (
    <div ref={containerRef} className="w-full bg-sand text-slate selection:bg-brand-coral selection:text-sand overflow-x-clip">
      
      {/* 1. STRATEGIC OPENING & 2. CONSULTATION PATH & 3. FORM EXPERIENCE */}
      <section className="relative min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12 max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* LEFT COLUMN: Opening & Consultation Path */}
        <div className="lg:w-1/2 flex flex-col gap-16 lg:sticky lg:top-32 self-start">
          <div ref={heroRef} className="flex flex-col gap-8 max-w-xl">
            <div data-anim="h-fade" className="inline-block px-4 py-1.5 border border-brand-coral/30 rounded-full bg-brand-coral/5 text-brand-coral font-label text-xs uppercase tracking-widest font-semibold self-start">
              {contactSection.badge}
            </div>
            
            <h1 data-anim="h-fade" className="text-4xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tight leading-[0.9]">
              {contactSection.headline}
            </h1>
            
            <p data-anim="h-fade" className="text-xl md:text-2xl font-body font-light text-slate/80 leading-relaxed border-l-2 border-brand-coral/30 pl-6">
              {contactSection.subheading}
            </p>
            
            <div data-anim="h-fade" className="flex flex-col gap-2 mt-4">
              <span className="font-label font-bold text-sm uppercase tracking-widest text-slate">{contactSection.needToKnowLabel}</span>
              <ul className="flex flex-col gap-2 mt-2">
                {contactSection.needToKnowPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate/70 font-body">
                    <span className="text-brand-coral mt-1">―</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <p className="font-body text-slate/70 italic mt-4">{contactSection.closingParagraph}</p>
            </div>
          </div>

          {/* Consultation Path Visual */}
          <div ref={pathRef} className="hidden md:flex flex-col gap-8 border-t border-slate/10 pt-12 relative max-w-md">
            <h3 className="font-label text-xs font-bold uppercase tracking-widest text-slate/50">The Consultation Journey</h3>
            <div className="relative pl-6">
              <div className="absolute left-[11px] top-2 bottom-4 w-[2px] bg-slate/10" />
              <div className="path-line absolute left-[11px] top-2 w-[2px] bg-gradient-to-b from-brand-coral to-gold origin-top" style={{ height: "0%" }} />
              
              <div className="flex flex-col gap-8">
                {PATH_STEPS.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-6 group">
                    <div className="path-node w-6 h-6 rounded-full bg-sand border-2 border-brand-coral flex items-center justify-center text-brand-coral z-10 shadow-sm relative -left-[13px]">
                      <div className="w-1.5 h-1.5 bg-brand-coral rounded-full" />
                    </div>
                    <span className="font-headline font-bold uppercase tracking-wide text-lg text-slate group-hover:text-brand-coral transition-colors">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Form Experience */}
        <div ref={formRef} className="lg:w-1/2 w-full pt-8 lg:pt-0">
          <div className="bg-white p-8 md:p-12 lg:p-16 border-t border-l border-slate/10 shadow-2xl relative">
            <h2 className="text-2xl font-headline font-bold uppercase tracking-tight text-slate mb-10">
              {formSection.title}
            </h2>

            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-10">
                
                {/* Name & Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3 group">
                    <label htmlFor="name" className="text-xs font-label font-bold uppercase tracking-widest text-slate/60 group-focus-within:text-brand-coral transition-colors">
                      {formSection.fields.name.label} *
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      autoComplete="name"
                      required
                      className="w-full bg-transparent border-b-2 border-slate/10 pb-3 text-lg font-body text-slate focus:outline-none focus:border-brand-coral transition-colors placeholder:text-slate/30"
                      placeholder={formSection.fields.name.placeholder} 
                    />
                  </div>
                  
                  <div className="flex flex-col gap-3 group">
                    <label htmlFor="businessName" className="text-xs font-label font-bold uppercase tracking-widest text-slate/60 group-focus-within:text-brand-coral transition-colors">
                      {formSection.fields.businessName.label} *
                    </label>
                    <input 
                      type="text" 
                      id="businessName" 
                      name="businessName" 
                      autoComplete="organization"
                      required
                      className="w-full bg-transparent border-b-2 border-slate/10 pb-3 text-lg font-body text-slate focus:outline-none focus:border-brand-coral transition-colors placeholder:text-slate/30"
                      placeholder={formSection.fields.businessName.placeholder} 
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3 group">
                    <label htmlFor="email" className="text-xs font-label font-bold uppercase tracking-widest text-slate/60 group-focus-within:text-brand-coral transition-colors">
                      {formSection.fields.email.label} *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      autoComplete="email"
                      required
                      className="w-full bg-transparent border-b-2 border-slate/10 pb-3 text-lg font-body text-slate focus:outline-none focus:border-brand-coral transition-colors placeholder:text-slate/30"
                      placeholder={formSection.fields.email.placeholder} 
                    />
                  </div>
                  
                  <div className="flex flex-col gap-3 group">
                    <label htmlFor="phone" className="text-xs font-label font-bold uppercase tracking-widest text-slate/60 group-focus-within:text-brand-coral transition-colors">
                      {formSection.fields.phone.label} <span className="font-light italic lowercase">(Optional)</span>
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      autoComplete="tel"
                      className="w-full bg-transparent border-b-2 border-slate/10 pb-3 text-lg font-body text-slate focus:outline-none focus:border-brand-coral transition-colors placeholder:text-slate/30"
                      placeholder={formSection.fields.phone.placeholder} 
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-3 group">
                  <label htmlFor="message" className="text-xs font-label font-bold uppercase tracking-widest text-slate/60 group-focus-within:text-brand-coral transition-colors">
                    How can we help? *
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-slate/10 pb-3 text-lg font-body text-slate focus:outline-none focus:border-brand-coral transition-colors resize-y placeholder:text-slate/30"
                    placeholder={formSection.fields.tellUsMoreQuestions.join(' ')} 
                  />
                </div>

                {/* Implementation Note: Form submission is simulated here. Payload architecture is ready for an external endpoint. */}
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    disabled={isSubmitting}
                    className={`w-full justify-center text-lg py-5 bg-slate text-white hover:bg-brand-coral hover:text-brand-navy transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Initiating...' : formSection.cta.label}
                  </Button>
                  
                  {formError && (
                    <div className="mt-4 p-4 bg-brand-coral/10 border border-brand-coral/20 rounded text-center">
                      <p className="text-sm font-body text-slate font-medium">
                        Backend configuration missing. The form submission endpoint is not currently connected to a production server.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Privacy Limitiation Note: Reserved space for future privacy policy checkbox/link once the legal page is created */}
                <p className="text-xs font-body text-slate/40 text-center px-4 mt-2">
                  By submitting this form, you request a strategic consultation. Your information will be handled securely.
                </p>

              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
                <div className="w-20 h-20 rounded-full bg-brand-coral/10 border-2 border-brand-coral flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-brand-coral" />
                </div>
                <h3 className="text-3xl font-headline font-bold text-slate uppercase">
                  Request Received
                </h3>
                <p className="text-lg text-slate/70 font-body max-w-sm">
                  We&apos;ll review your situation and be in touch to schedule your consultation.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. ALTERNATIVE EXPLORATION */}
      <section ref={notReadyRef} className="py-24 px-6 md:px-12 bg-slate text-sand border-y border-white/5 relative">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="md:w-1/3 flex flex-col gap-4">
            <span className="font-label text-xs uppercase tracking-widest text-brand-coral font-bold">
              {notReadyToTalk.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-headline font-bold uppercase tracking-tight leading-tight">
              {notReadyToTalk.headline}
            </h2>
          </div>
          <div className="md:w-2/3 flex flex-col">
            {notReadyToTalk.options.map((opt, idx) => (
              <Link key={idx} href={opt.href} className="nr-link group flex items-center justify-between py-8 border-b border-white/10 hover:border-brand-coral transition-colors">
                <div className="flex flex-col gap-2">
                  <span className="font-headline font-bold text-2xl lg:text-3xl uppercase text-white group-hover:text-brand-coral transition-colors">
                    {opt.title}
                  </span>
                  <span className="text-lg text-sand/60 font-body">
                    {opt.description}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-coral group-hover:border-brand-coral transition-all shrink-0">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ (Clean Editorial Accordion) */}
      {faq && (
      <section ref={faqRef} className="py-24 px-6 md:px-12 bg-sand text-slate border-b border-slate/10 relative">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-1/3">
            <SectionMasthead badge={faq.badge} descriptor={faq.title} />
          </div>
          
          <div className="lg:w-2/3 flex flex-col border-t border-slate/20">
            {faq.items.map((item, i) => {
              const isExpanded = openFaqIndex === i;
              const contentId = `faq-content-${i}`;
              const buttonId = `faq-button-${i}`;
              
              return (
                <div key={i} className="faq-item border-b border-slate/20">
                  <button 
                    id={buttonId}
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={contentId}
                    onClick={() => toggleFaq(i)}
                    className="w-full py-8 flex items-start justify-between text-left group focus:outline-none"
                  >
                    <span className="text-xl md:text-2xl font-headline font-bold text-slate group-hover:text-brand-coral transition-colors pr-8">
                      <span className="font-mono text-sm text-slate/40 mr-6">{(i + 1).toString().padStart(2, '0')}</span>
                      {item.q}
                    </span>
                    <ChevronDown className={`w-6 h-6 text-slate/40 transition-transform duration-300 shrink-0 mt-1 ${isExpanded ? 'rotate-180 text-brand-coral' : 'group-hover:text-brand-coral'}`} />
                  </button>
                  <div 
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isExpanded}
                    inert={!isExpanded}
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isExpanded ? '600px' : '0px', opacity: isExpanded ? 1 : 0 }}
                  >
                    <div className="pb-8 pt-2 pl-12 text-lg font-body text-slate/70 leading-relaxed flex flex-col gap-4 max-w-2xl">
                      {item.a.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* 7. FINAL CONTACT CONCLUSION */}
      <section className="py-32 px-6 text-center bg-sand text-slate flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase text-slate/40">Direct Contact</h2>
        <a href="mailto:hello@axonvortex.com" className="text-4xl md:text-6xl lg:text-7xl font-headline font-black uppercase text-slate hover:text-brand-coral transition-colors">
          hello@axonvortex.com
        </a>
      </section>
      
    </div>
  );
}
