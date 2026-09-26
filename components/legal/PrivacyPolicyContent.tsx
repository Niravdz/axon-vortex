"use client";

import React from "react";
import { LegalDocumentLayout, LegalPlaceholder } from "./LegalDocumentLayout";

const SECTIONS = [
  { id: "sec-1", title: "1. Who this policy covers" },
  { id: "sec-2", title: "2. What data we collect" },
  { id: "sec-3", title: "3. Why we use your data (legal basis)" },
  { id: "sec-4", title: "4. Cookies and tracking" },
  { id: "sec-5", title: "5. Who we share data with" },
  { id: "sec-6", title: "6. International data transfers" },
  { id: "sec-7", title: "7. How long we keep data" },
  { id: "sec-8", title: "8. How we protect your data" },
  { id: "sec-9", title: "9. Your rights" },
  { id: "sec-10", title: "10. Grievance Officer" },
  { id: "sec-11", title: "11. Children's privacy" },
  { id: "sec-12", title: "12. Changes to this policy" },
  { id: "sec-13", title: "13. Contact us" },
];

export default function PrivacyPolicyContent() {
  return (
    <LegalDocumentLayout
      title="Privacy Policy"
      badge="DPDP / GDPR / CCPA"
      lastUpdated="September 2026"
      sections={SECTIONS}
      unresolvedCount={14}
    >
      {/* 1. Who this policy covers */}
      <section id="sec-1" className="flex flex-col gap-4 border-b border-white/10 pb-8">
        <h2 className="text-2xl font-heading font-semibold text-[#EFECE4]">
          1. Who this policy covers
        </h2>
        <p className="text-sm sm:text-base text-[#9AA3B2] leading-relaxed">
          This Privacy Policy explains how <LegalPlaceholder text="AxonVortex Legal Entity Name" /> (&ldquo;AxonVortex,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;), a company registered in India (CIN: <LegalPlaceholder text="Your CIN" />, registered office: <LegalPlaceholder text="Your registered address" />), collects, uses, shares and protects personal data when:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-[#9AA3B2] leading-relaxed">
          <li>You visit <strong className="text-[#EFECE4]">axonvortex.com</strong> (or its current domain) or any linked page;</li>
          <li>You submit a contact form, request a Growth Audit, or otherwise enquire about our services;</li>
          <li>You subscribe to updates or content from us;</li>
          <li>You become a client, and we handle data on your behalf or on behalf of your business.</li>
        </ul>
        <p className="text-sm text-[#9AA3B2] leading-relaxed">
          This policy applies regardless of where you&apos;re located. Because AxonVortex works with clients and visitors outside India, we&apos;ve written this to meet <strong className="text-[#EFECE4]">India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, the <strong className="text-[#EFECE4]">EU/UK General Data Protection Regulation (GDPR)</strong>, and, where relevant, the <strong className="text-[#EFECE4]">California Consumer Privacy Act (CCPA/CPRA)</strong> — the three most likely regimes to apply to our visitors and clients. Where these laws differ, we generally apply whichever gives you stronger protection.
        </p>
      </section>

      {/* 2. What data we collect */}
      <section id="sec-2" className="flex flex-col gap-6 border-b border-white/10 pb-8">
        <h2 className="text-2xl font-heading font-semibold text-[#EFECE4]">
          2. What data we collect
        </h2>

        <div>
          <h3 className="font-heading font-semibold text-lg text-[#EFECE4] mb-3">
            Information you give us directly
          </h3>
          <div className="rounded-2xl border border-white/[0.08] overflow-x-auto bg-[#1b1e22] shadow-box-md">
            <table className="w-full text-left text-xs sm:text-sm font-body">
              <thead className="bg-[#101215] border-b border-white/[0.08] font-mono text-xs text-[#EFECE4] uppercase">
                <tr>
                  <th className="p-4 border-r border-white/10 w-1/3">Where</th>
                  <th className="p-4">What we collect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#9AA3B2]">
                <tr>
                  <td className="p-4 font-semibold border-r border-white/10 text-[#EFECE4] bg-[#101215]/50">Contact / Growth Audit form</td>
                  <td className="p-4">Name, business name, email address, phone number, website URL, and anything you tell us in the message field</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold border-r border-white/10 text-[#EFECE4] bg-[#101215]/50">Email or direct enquiry</td>
                  <td className="p-4">Whatever you choose to share with us</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold border-r border-white/10 text-[#EFECE4] bg-[#101215]/50">Becoming a client</td>
                  <td className="p-4">Business information, billing details, access credentials to ad accounts/social accounts/website (where you grant them), and any content, data, or materials you provide for us to work with</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-lg text-[#EFECE4] mb-3">
            Information collected automatically
          </h3>
          <div className="rounded-2xl border border-white/[0.08] overflow-x-auto bg-[#1b1e22] shadow-box-md">
            <table className="w-full text-left text-xs sm:text-sm font-body">
              <thead className="bg-[#101215] border-b border-white/[0.08] font-mono text-xs text-[#EFECE4] uppercase">
                <tr>
                  <th className="p-4 border-r border-white/10 w-1/4">Source</th>
                  <th className="p-4 border-r border-white/10 w-1/3">What it collects</th>
                  <th className="p-4">Why we use it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#9AA3B2]">
                <tr>
                  <td className="p-4 font-semibold border-r border-white/10 text-[#EFECE4] bg-[#101215]/50">Google Analytics</td>
                  <td className="p-4 border-r border-white/10">IP address (truncated where possible), device/browser type, pages visited, time on site, referring site, approximate location (city/country level)</td>
                  <td className="p-4">Understand how visitors use the site and improve it</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold border-r border-white/10 text-[#EFECE4] bg-[#101215]/50">Meta Pixel / Google Ads remarketing tags</td>
                  <td className="p-4 border-r border-white/10">Device identifiers, browsing behaviour on our site, cookie-based identifiers</td>
                  <td className="p-4">Measure ad performance and show relevant ads to past visitors on Meta and Google&apos;s networks</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold border-r border-white/10 text-[#EFECE4] bg-[#101215]/50">Cookies</td>
                  <td className="p-4 border-r border-white/10">As described in Section 4 below</td>
                  <td className="p-4">Site functionality, analytics, and advertising</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-lg text-[#EFECE4] mb-2">
            Information from our email marketing tool
          </h3>
          <p className="text-sm text-[#9AA3B2] leading-relaxed">
            If you subscribe to updates (via <LegalPlaceholder text="Mailchimp/your email tool" /> or a similar provider), we collect your email address and, depending on the tool&apos;s settings, engagement data such as opens and clicks, so we can send relevant content and stop emailing you if you unsubscribe.
          </p>
          <p className="text-sm text-[#9AA3B2] mt-2 leading-relaxed">
            We do <strong className="text-[#EFECE4]">not</strong> knowingly collect sensitive personal data (health, financial account numbers, government IDs, etc.) through the website. If you send us sensitive information unprompted, we&apos;ll handle it with the same security measures described in Section 8, but we ask that you avoid sharing anything you don&apos;t need to.
          </p>
        </div>
      </section>

      {/* 3. Why we use your data */}
      <section id="sec-3" className="flex flex-col gap-4 border-b border-white/10 pb-8">
        <h2 className="text-2xl font-heading font-semibold text-[#EFECE4]">
          3. Why we use your data (legal basis)
        </h2>
        <p className="text-sm text-[#9AA3B2]">
          Depending on where you&apos;re located, we rely on one or more of the following:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-[#9AA3B2]">
          <li><strong className="text-[#EFECE4]">Consent</strong> — for cookies, tracking pixels, and email marketing, where required. You can withdraw consent at any time (see Sections 4 and 9).</li>
          <li><strong className="text-[#EFECE4]">Contract necessity</strong> — to respond to your enquiry, deliver a service you&apos;ve requested, or fulfil a client agreement.</li>
          <li><strong className="text-[#EFECE4]">Legitimate interest</strong> — to understand and improve how our site performs, and to communicate with prospective clients who&apos;ve enquired, balanced against your right to privacy.</li>
          <li><strong className="text-[#EFECE4]">Legal obligation</strong> — where we&apos;re required to retain or disclose data (e.g. billing/tax records).</li>
        </ul>
        <p className="text-sm text-[#9AA3B2]">
          Under the <strong className="text-[#EFECE4]">DPDP Act</strong>, we act as a <strong className="text-[#EFECE4]">Data Fiduciary</strong> for the personal data we collect, and process it only for the purpose for which you provided it, based on your consent or another ground recognised under the Act.
        </p>
      </section>

      {/* 4. Cookies and tracking */}
      <section id="sec-4" className="flex flex-col gap-4 border-b border-white/10 pb-8">
        <h2 className="text-2xl font-heading font-semibold text-[#EFECE4]">
          4. Cookies and tracking
        </h2>
        <p className="text-sm text-[#9AA3B2]">
          Our site uses cookies and similar technologies in three categories:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-[#9AA3B2]">
          <li><strong className="text-[#EFECE4]">Strictly necessary</strong> — required for the site to function (e.g. remembering your cookie preference). These don&apos;t require consent.</li>
          <li><strong className="text-[#EFECE4]">Analytics</strong> — Google Analytics, to understand site usage. Requires your consent in the EU/UK and under DPDP where the data can identify you.</li>
          <li><strong className="text-[#EFECE4]">Advertising</strong> — Meta Pixel and Google Ads remarketing, to measure and target ads. Requires your consent in the EU/UK and under DPDP.</li>
        </ul>
        <div className="p-4 rounded-xl bg-[#101215] border border-white/[0.04] text-xs font-body text-[#9AA3B2] shadow-box-inset">
          <strong className="text-[#EFECE4]">Interactive Cookie Controls:</strong> You can manage or revoke your consent preferences at any time by opening our{" "}
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-cookie-settings"));
              }
            }}
            className="text-[#3B82F6] font-semibold underline hover:text-[#93C5FD] ml-1 cursor-pointer"
          >
            Cookie Preferences Manager
          </button>.
        </div>
      </section>

      {/* 5. Who we share data with */}
      <section id="sec-5" className="flex flex-col gap-4 border-b border-white/10 pb-8">
        <h2 className="text-2xl font-heading font-semibold text-[#EFECE4]">
          5. Who we share data with
        </h2>
        <p className="text-sm text-[#9AA3B2]">
          We don&apos;t sell your personal data. We share it only with:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-[#9AA3B2]">
          <li>
            <strong className="text-[#EFECE4]">Service providers who process it on our behalf</strong>, currently: Google (Analytics, Ads), Meta (Pixel/Ads), <LegalPlaceholder text="Mailchimp/your email tool" />, <LegalPlaceholder text="Vercel or your hosting provider" />, and <LegalPlaceholder text="any CRM/portal tool you use once your portal is live" />. Each is bound by its own data processing terms with us.
          </li>
          <li><strong className="text-[#EFECE4]">Professional advisors</strong> (accountants, lawyers) where necessary to run our business.</li>
          <li><strong className="text-[#EFECE4]">Law enforcement or regulators</strong>, only where legally required.</li>
          <li><strong className="text-[#EFECE4]">A successor business</strong>, if AxonVortex is ever sold or restructured — you&apos;d be notified.</li>
        </ul>
        <p className="text-sm text-[#9AA3B2]">
          We do not share client business data (ad accounts, analytics, content) with anyone outside the specific tools needed to deliver the agreed service, without your permission.
        </p>
      </section>

      {/* 6. International data transfers */}
      <section id="sec-6" className="flex flex-col gap-4 border-b border-white/10 pb-8">
        <h2 className="text-2xl font-heading font-semibold text-[#EFECE4]">
          6. International data transfers
        </h2>
        <p className="text-sm text-[#9AA3B2]">
          AxonVortex is based in India. If you&apos;re contacting us or working with us from outside India, your data will be transferred to and processed in India, and possibly in other countries where our service providers operate (e.g. the US, where Google and Meta process data).
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-[#9AA3B2]">
          <li><strong className="text-[#EFECE4]">Under the DPDP Act</strong>, India permits cross-border transfer of personal data to any country except those the Indian government specifically restricts by notification. As of this writing, no such restricted list has been issued.</li>
          <li><strong className="text-[#EFECE4]">Under GDPR</strong>, transferring personal data from the EU/UK to India requires an approved safeguard — we rely on Standard Contractual Clauses (SCCs) with our processors, and apply the same data-handling standards to EU/UK personal data regardless of where it&apos;s processed.</li>
          <li><strong className="text-[#EFECE4]">Under CCPA</strong>, California residents&apos; data is protected regardless of where it&apos;s processed, per the rights in Section 9.</li>
        </ul>
      </section>

      {/* 7. How long we keep data */}
      <section id="sec-7" className="flex flex-col gap-4 border-b border-white/10 pb-8">
        <h2 className="text-2xl font-heading font-semibold text-[#EFECE4]">
          7. How long we keep data
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-sm text-[#9AA3B2]">
          <li><strong className="text-[#EFECE4]">Enquiries that don&apos;t become clients:</strong> up to 24 months from your last contact, then deleted, unless you ask us to delete it sooner.</li>
          <li><strong className="text-[#EFECE4]">Client data:</strong> for the duration of our engagement, plus <LegalPlaceholder text="X years — check your local requirement; India generally requires financial records for 8 years" /> to meet tax, accounting and legal obligations.</li>
          <li><strong className="text-[#EFECE4]">Analytics data:</strong> per Google Analytics&apos; default retention settings, or as configured to the shortest practical period.</li>
          <li><strong className="text-[#EFECE4]">Marketing list data:</strong> until you unsubscribe or ask us to delete it.</li>
        </ul>
      </section>

      {/* 8. How we protect your data */}
      <section id="sec-8" className="flex flex-col gap-4 border-b border-white/10 pb-8">
        <h2 className="text-2xl font-heading font-semibold text-[#EFECE4]">
          8. How we protect your data
        </h2>
        <p className="text-sm text-[#9AA3B2] leading-relaxed">
          We take reasonable technical and organisational measures to protect personal data, including restricting access to data on a need-to-know basis, using reputable, security-vetted third-party providers (Google, Meta, Mailchimp, Vercel, etc.), and using encrypted connections (HTTPS) for the site and forms. As a small, single-operator business, we don&apos;t claim enterprise-grade certifications (e.g. ISO 27001, SOC 2) — if a prospective client requires those for their own compliance, please raise it during scoping so we can be upfront about what we can and can&apos;t meet.
        </p>
        <p className="text-sm text-[#9AA3B2] leading-relaxed">
          If a data breach occurs that&apos;s likely to affect you, we&apos;ll notify affected individuals and, where legally required, the Data Protection Board of India and/or relevant supervisory authorities, without undue delay.
        </p>
      </section>

      {/* 9. Your rights */}
      <section id="sec-9" className="flex flex-col gap-4 border-b border-white/10 pb-8">
        <h2 className="text-2xl font-heading font-semibold text-[#EFECE4]">
          9. Your rights
        </h2>
        <div className="flex flex-col gap-4 text-sm text-[#9AA3B2]">
          <div>
            <strong className="text-[#EFECE4]">If you&apos;re in India (under the DPDP Act), you have the right to:</strong>
            <ul className="list-disc pl-6 space-y-1 mt-1">
              <li>Obtain a summary of the personal data we hold about you and how it&apos;s processed</li>
              <li>Request correction, completion, or updating of your personal data</li>
              <li>Request erasure of your personal data (unless we need to keep it for a legal purpose)</li>
              <li>Withdraw consent at any time, as easily as you gave it</li>
              <li>Nominate another individual to exercise these rights on your behalf in the event of death or incapacity</li>
              <li>Register a grievance with us, and escalate to the Data Protection Board of India if unresolved</li>
            </ul>
          </div>

          <div>
            <strong className="text-[#EFECE4]">If you&apos;re in the EU/UK (under GDPR), you additionally have the right to:</strong>
            <ul className="list-disc pl-6 space-y-1 mt-1">
              <li>Access a copy of your data</li>
              <li>Restrict or object to certain processing</li>
              <li>Receive your data in a portable format</li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>
          </div>

          <div>
            <strong className="text-[#EFECE4]">If you&apos;re a California resident (under CCPA/CPRA), you have the right to:</strong>
            <ul className="list-disc pl-6 space-y-1 mt-1">
              <li>Know what personal data we&apos;ve collected and why</li>
              <li>Delete your personal data</li>
              <li>Opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal data for cross-context behavioural advertising</li>
              <li>Not be discriminated against for exercising these rights</li>
            </ul>
          </div>

          <p className="pt-2">
            To exercise any of these rights, email <LegalPlaceholder text="grievance/privacy email — e.g. privacy@axonvortex.com" /> or <a href="mailto:info@axonvortex.com" className="text-[#3B82F6] font-medium underline hover:text-[#93C5FD]">info@axonvortex.com</a>. We will respond within 30 days.
          </p>
        </div>
      </section>

      {/* 10. Grievance Officer */}
      <section id="sec-10" className="flex flex-col gap-4 border-b border-white/10 pb-8">
        <h2 className="text-2xl font-heading font-semibold text-[#EFECE4]">
          10. Grievance Officer
        </h2>
        <p className="text-sm text-[#9AA3B2]">
          In accordance with the DPDP Act 2023, our Grievance Officer details are:
        </p>
        <div className="p-6 rounded-2xl bg-[#1b1e22] border border-white/[0.08] shadow-box-md flex flex-col gap-2 font-mono text-xs text-[#EFECE4]">
          <div>
            <span className="text-[#9AA3B2] block">NAME:</span>
            <LegalPlaceholder text="Grievance Officer Name" />
          </div>
          <div>
            <span className="text-[#9AA3B2] block">EMAIL:</span>
            <LegalPlaceholder text="grievance email" /> / <span className="font-semibold">info@axonvortex.com</span>
          </div>
          <div>
            <span className="text-[#9AA3B2] block">REGISTERED ADDRESS:</span>
            <LegalPlaceholder text="registered address" />
          </div>
        </div>
        <p className="text-xs text-[#9AA3B2]">
          If you have a concern about how your data has been handled, contact the Grievance Officer first. If it isn&apos;t resolved to your satisfaction, you may escalate the matter to the <strong className="text-[#EFECE4]">Data Protection Board of India</strong>.
        </p>
      </section>

      {/* 11. Children's privacy */}
      <section id="sec-11" className="flex flex-col gap-4 border-b border-white/10 pb-8">
        <h2 className="text-2xl font-heading font-semibold text-[#EFECE4]">
          11. Children&apos;s privacy
        </h2>
        <p className="text-sm text-[#9AA3B2]">
          AxonVortex&apos;s services and website are directed at businesses and business decision-makers, not individuals under 18. We don&apos;t knowingly collect personal data from anyone under 18. If you believe a minor has provided us data, contact us and we&apos;ll delete it.
        </p>
      </section>

      {/* 12. Changes to this policy */}
      <section id="sec-12" className="flex flex-col gap-4 border-b border-white/10 pb-8">
        <h2 className="text-2xl font-heading font-semibold text-[#EFECE4]">
          12. Changes to this policy
        </h2>
        <p className="text-sm text-[#9AA3B2]">
          We may update this policy as our tools, services, or the law change. We&apos;ll update the &ldquo;Last updated&rdquo; date above, and for material changes, we&apos;ll make a reasonable effort to flag it on the site.
        </p>
      </section>

      {/* 13. Contact us */}
      <section id="sec-13" className="flex flex-col gap-4">
        <h2 className="text-2xl font-heading font-semibold text-[#EFECE4]">
          13. Contact us
        </h2>
        <div className="p-6 rounded-2xl bg-[#1b1e22] border border-white/[0.08] shadow-box-md flex flex-col gap-3 font-mono text-xs">
          <span className="font-semibold text-[#EFECE4] text-sm">
            <LegalPlaceholder text="AxonVortex Legal Entity Name" />
          </span>
          <span className="text-[#9AA3B2]">
            <LegalPlaceholder text="Registered Address" />
          </span>
          <div className="pt-2 border-t border-white/10 flex flex-wrap gap-4 text-[#9AA3B2]">
            <span>Email: <a href="mailto:info@axonvortex.com" className="text-[#3B82F6] font-medium underline hover:text-[#93C5FD]">info@axonvortex.com</a></span>
          </div>
        </div>
      </section>
    </LegalDocumentLayout>
  );
}
