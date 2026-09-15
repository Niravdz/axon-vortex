"use client";

import React from "react";
import { LegalDocumentLayout, LegalPlaceholder } from "./LegalDocumentLayout";

const SECTIONS = [
  { id: "sec-1", title: "1. Who these terms apply to" },
  { id: "sec-2", title: "2. What we do" },
  { id: "sec-3", title: "3. Getting started" },
  { id: "sec-4", title: "4. Payment terms" },
  { id: "sec-5", title: "5. What you're responsible for" },
  { id: "sec-6", title: "6. No guaranteed results" },
  { id: "sec-7", title: "7. Deliverables, revisions & approval" },
  { id: "sec-8", title: "8. Intellectual property" },
  { id: "sec-9", title: "9. Term, cancellation & termination" },
  { id: "sec-10", title: "10. Confidentiality" },
  { id: "sec-11", title: "11. Limitation of liability" },
  { id: "sec-12", title: "12. Force majeure" },
  { id: "sec-13", title: "13. Independent contractor relationship" },
  { id: "sec-14", title: "14. Governing law & disputes" },
  { id: "sec-15", title: "15. Changes to these Terms" },
  { id: "sec-16", title: "16. General" },
  { id: "sec-17", title: "17. Contact" },
];

export default function TermsOfServiceContent() {
  return (
    <LegalDocumentLayout
      title="Terms of Service"
      badge="COMMERCIAL GOVERNANCE"
      lastUpdated="September 2026"
      sections={SECTIONS}
      unresolvedCount={13}
    >
      {/* 1. Who these terms apply to */}
      <section id="sec-1" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          1. Who these terms apply to
        </h2>
        <p className="text-sm sm:text-base text-brand-black/90">
          These Terms of Service (&ldquo;Terms&rdquo;) govern any engagement between <LegalPlaceholder text="AxonVortex Legal Entity Name" /> (&ldquo;AxonVortex,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) and the business or individual engaging our services (&ldquo;Client,&rdquo; &ldquo;you&rdquo;), whether through a signed proposal, Statement of Work (&ldquo;SOW&rdquo;), email confirmation, or by using axonvortex.com&apos;s Growth Audit or contact process to request services.
        </p>
        <p className="text-sm text-brand-black/80">
          By engaging AxonVortex — through a signed proposal, a deposit payment, or written confirmation to proceed — you agree to these Terms. Where a signed SOW or proposal states different terms for a specific engagement, that document takes priority over these Terms for that engagement only.
        </p>
      </section>

      {/* 2. What we do */}
      <section id="sec-2" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          2. What we do
        </h2>
        <p className="text-sm text-brand-black/80">
          AxonVortex provides digital marketing and AI-assisted growth services, which may include social media management, paid advertising (Meta/Google), content creation, website and landing page development, SEO, AI chatbot/automation setup, and lead generation systems — as agreed in your specific proposal or SOW. The exact scope, deliverables, and timeline for your engagement will be set out in writing before work begins.
        </p>
        <p className="text-sm text-brand-black/80">
          AxonVortex is operated with specialized production pods. We don&apos;t claim to be an inflated enterprise agency, and our capacity, response times, and delivery pace reflect rigorous, focused execution.
        </p>
      </section>

      {/* 3. Getting started */}
      <section id="sec-3" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          3. Getting started
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-brand-black/80">
          <li><strong>Enquiry &amp; Growth Audit</strong> — you tell us about your business; we assess fit and scope.</li>
          <li><strong>Proposal / SOW</strong> — we send a written proposal covering scope, deliverables, timeline, and price. Nothing is billed until you approve it.</li>
          <li><strong>Confirmation &amp; deposit</strong> — you confirm in writing (email is fine) and pay any agreed deposit. Work begins once both are received.</li>
        </ol>
        <p className="text-sm text-brand-black/80">
          We reserve the right to decline any engagement, including after an initial enquiry, at our discretion.
        </p>
      </section>

      {/* 4. Payment terms */}
      <section id="sec-4" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          4. Payment terms
        </h2>
        <p className="text-sm text-brand-black/80">
          <strong>Structure.</strong> Depending on the engagement, you&apos;ll be billed either as a <strong>monthly retainer</strong> (fixed fee for ongoing services, billed in advance each cycle) or a <strong>fixed project fee</strong> (billed against milestones set out in your SOW) — whichever applies will be stated in your proposal.
        </p>
        <p className="text-sm text-brand-black/80">
          <strong>Invoicing.</strong> Invoices are due within <LegalPlaceholder text="7 / 14 days — standard" /> of the invoice date, unless your SOW states otherwise. Retainers are invoiced at the start of each billing cycle; project fees are invoiced at each milestone.
        </p>
        <p className="text-sm text-brand-black/80">
          <strong>Late payment.</strong> If payment is more than <LegalPlaceholder text="7 days overdue" />, we may pause work without it counting as a breach on our part, and may charge interest of <LegalPlaceholder text="X% per month" /> on the overdue amount, where permitted by law.
        </p>
        <p className="text-sm text-brand-black/80">
          <strong>No refunds once work begins.</strong> Once we&apos;ve started work on a billing cycle or milestone, that payment is non-refundable — this reflects the time and resources committed, not the outcome of the work. If you cancel partway through a cycle (see Section 9), you remain responsible for the fees for work already in progress, and we won&apos;t bill you for cycles that haven&apos;t started.
        </p>
        <p className="text-sm text-brand-black/80">
          <strong>Currency &amp; international payments.</strong> Fees are quoted in <LegalPlaceholder text="INR / USD — default currency" />. International clients are responsible for any currency conversion difference, wire fees, or payment-processor charges on their end. Taxes (GST, withholding tax, VAT, etc.) applicable in your jurisdiction are your responsibility unless we&apos;ve explicitly agreed otherwise in writing.
        </p>
        <p className="text-sm text-brand-black/80">
          <strong>Third-party costs (ad spend, tools, licenses).</strong> Advertising spend (Meta, Google, etc.), software subscriptions, stock assets, or other third-party costs required for your project are <strong>separate from our fees</strong> and are either billed to you directly by the platform or passed through to you with prior written agreement. We do not guarantee, and are not responsible for, the pricing, availability, or policies of third-party platforms.
        </p>
      </section>

      {/* 5. What you're responsible for */}
      <section id="sec-5" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          5. What you&apos;re responsible for
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-sm text-brand-black/80">
          <li>Provide accurate, complete information about your business</li>
          <li>Give timely feedback and approvals (delays on your end can delay delivery — this doesn&apos;t count against our timelines)</li>
          <li>Provide necessary access (ad accounts, website admin, brand assets, etc.) when requested</li>
          <li>Ensure any content, logos, testimonials, or claims you ask us to use are accurate and that you have the rights to use them</li>
          <li>Comply with the terms of service of any third-party platform (Meta, Google, Shopify, etc.) we work within on your behalf</li>
        </ul>
        <p className="text-sm text-brand-black/80">
          You&apos;re responsible for the accuracy of business claims (pricing, offers, guarantees, certifications, etc.) that appear in content we create at your direction — we build what you approve, but you own what&apos;s said about your business.
        </p>
      </section>

      {/* 6. No guaranteed results */}
      <section id="sec-6" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          6. No guaranteed results
        </h2>
        <p className="text-sm text-brand-black/80">
          Digital marketing outcomes depend on many factors outside our control — your market, competition, offer, pricing, platform algorithm changes, ad account history, seasonality, and more. <strong>We do not guarantee specific results</strong> (traffic, leads, sales, rankings, ROI, follower counts, or any other metric), and no statement by us, in a proposal, on our website, or elsewhere should be read as a guarantee unless it&apos;s explicitly written as one in your signed SOW.
        </p>
        <p className="text-sm text-brand-black/80">
          Our approach is to build, measure, learn, and improve — we&apos;re accountable for the quality and diligence of our work, not for outcomes that depend on factors beyond it.
        </p>
      </section>

      {/* 7. Deliverables, revisions & approval */}
      <section id="sec-7" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          7. Deliverables, revisions &amp; approval
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-sm text-brand-black/80">
          <li>Deliverables are considered approved if you don&apos;t request changes within <LegalPlaceholder text="5 business days" /> of delivery.</li>
          <li>Revisions beyond what&apos;s scoped in your SOW may be billed separately at our standard rate.</li>
          <li>We aim to meet agreed timelines but they may shift due to delayed feedback, access, or approvals on your end, or force majeure factors.</li>
        </ul>
      </section>

      {/* 8. Intellectual property */}
      <section id="sec-8" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          8. Intellectual property
        </h2>
        <p className="text-sm text-brand-black/80">
          <strong>What you own.</strong> Once we&apos;ve received full payment for a deliverable, ownership of that specific deliverable (e.g. a website, a set of ad creatives, written content) transfers to you, except for third-party licensed assets and our underlying tools, frameworks, and workflows.
        </p>
        <p className="text-sm text-brand-black/80">
          <strong>What we retain.</strong> We may showcase completed work in our portfolio, case studies, or marketing materials, unless you tell us in writing that you&apos;d like it kept confidential — we will honor that request.
        </p>
        <p className="text-sm text-brand-black/80">
          <strong>Client-provided materials.</strong> You retain ownership of any logos, content, data, or brand assets you provide us, and grant us a license to use them solely to deliver the agreed services.
        </p>
      </section>

      {/* 9. Term, cancellation & termination */}
      <section id="sec-9" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          9. Term, cancellation &amp; termination
        </h2>
        <p className="text-sm text-brand-black/80">
          <strong>Ongoing engagements (retainers):</strong> run month-to-month unless your SOW states a fixed term. Either party may cancel with <strong>30 days&apos; written notice</strong>. You remain responsible for fees for the notice period and any work already delivered or in progress.
        </p>
        <p className="text-sm text-brand-black/80">
          <strong>Immediate termination.</strong> We may pause or end an engagement immediately, without the 30-day notice period, if: payment is more than <LegalPlaceholder text="15 days overdue" />, you ask us to do something illegal or that violates a third-party platform&apos;s terms, or you are abusive or threatening toward our team.
        </p>
      </section>

      {/* 10. Confidentiality */}
      <section id="sec-10" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          10. Confidentiality
        </h2>
        <p className="text-sm text-brand-black/80">
          Both parties agree to keep confidential information (business data, strategy, financials, credentials, unreleased campaigns, etc.) shared during the engagement private, and to use it only for delivering or receiving the agreed services. This obligation continues after the engagement ends.
        </p>
      </section>

      {/* 11. Limitation of liability */}
      <section id="sec-11" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          11. Limitation of liability
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-sm text-brand-black/80">
          <li>AxonVortex&apos;s total liability for any claim arising from an engagement is limited to the fees you paid us for the specific service giving rise to the claim in the <LegalPlaceholder text="3 / 6 months" /> before the claim arose.</li>
          <li>We&apos;re not liable for indirect, incidental, or consequential damages (lost profits, lost data, business interruption, reputational harm) arising from our services.</li>
          <li>We&apos;re not liable for the actions, policies, outages, or account suspensions of third-party platforms (Meta, Google, Shopify, hosting providers, etc.).</li>
        </ul>
      </section>

      {/* 12. Force majeure */}
      <section id="sec-12" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          12. Force majeure
        </h2>
        <p className="text-sm text-brand-black/80">
          Neither party is liable for delay or failure to perform due to events outside their reasonable control — natural disasters, internet or platform outages, government action, war, or similar. The affected party will notify the other and both will work in good faith to resume the engagement.
        </p>
      </section>

      {/* 13. Independent contractor */}
      <section id="sec-13" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          13. Independent contractor relationship
        </h2>
        <p className="text-sm text-brand-black/80">
          AxonVortex is engaged as an independent contractor, not an employee, agent, joint venturer, or partner of the Client, and vice versa. Nothing here creates an employment, partnership, or exclusive relationship between the parties.
        </p>
      </section>

      {/* 14. Governing law & disputes */}
      <section id="sec-14" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          14. Governing law &amp; disputes
        </h2>
        <p className="text-sm text-brand-black/80">
          These Terms are governed by the laws of India, without regard to conflict-of-law principles. Both parties agree to first attempt to resolve any dispute through good-faith negotiation. If unresolved within <LegalPlaceholder text="30 days" />, the dispute will be referred to arbitration in <LegalPlaceholder text="Ahmedabad, Gujarat" />, under the Arbitration and Conciliation Act, 1996, conducted in English, with the arbitrator&apos;s decision being final and binding on both parties.
        </p>
      </section>

      {/* 15. Changes to these Terms */}
      <section id="sec-15" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          15. Changes to these Terms
        </h2>
        <p className="text-sm text-brand-black/80">
          We may update these Terms from time to time; the &ldquo;Last updated&rdquo; date above will reflect the latest version. For an active engagement, we&apos;ll flag material changes to you directly — changes won&apos;t retroactively apply to work already agreed under a signed SOW.
        </p>
      </section>

      {/* 16. General */}
      <section id="sec-16" className="flex flex-col gap-4 border-b-2 border-brand-black pb-8">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          16. General
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-sm text-brand-black/80">
          <li><strong>Entire agreement:</strong> These Terms, together with your signed proposal/SOW, are the entire agreement.</li>
          <li><strong>Severability:</strong> If any part of these Terms is found unenforceable, the rest remains in effect.</li>
          <li><strong>No waiver:</strong> Not enforcing a term on one occasion doesn&apos;t waive our right to enforce it later.</li>
          <li><strong>Assignment:</strong> You may not assign this agreement without our written consent.</li>
        </ul>
      </section>

      {/* 17. Contact */}
      <section id="sec-17" className="flex flex-col gap-4">
        <h2 className="text-2xl font-display font-black uppercase text-brand-black">
          17. Contact
        </h2>
        <div className="p-6 bg-brand-white border-2 border-brand-black shadow-hard-sm flex flex-col gap-3 font-mono text-xs">
          <span className="font-bold text-brand-black text-sm">
            <LegalPlaceholder text="AxonVortex Legal Entity Name" />
          </span>
          <span className="text-brand-black/70">
            <LegalPlaceholder text="Registered Address" />
          </span>
          <div className="pt-2 border-t border-brand-black/20 flex flex-wrap gap-4">
            <span>Email: <a href="mailto:info@axonvortex.com" className="text-brand-red font-bold underline">info@axonvortex.com</a></span>
            <span>Phone: <a href="tel:+919933112213" className="text-brand-black font-bold">+91 9933112213</a></span>
          </div>
        </div>
      </section>
    </LegalDocumentLayout>
  );
}
