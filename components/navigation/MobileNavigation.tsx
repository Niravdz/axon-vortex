"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, ArrowUpRight } from "lucide-react";
import { navigationConfig } from "./navigationConfig";
import {
  AccordionSection,
  MobileSolutionsList,
  MobileServicesList,
  MobileCompanyList,
} from "./MobileAccordion";
import { Button } from "@/components/ui/Button";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export function MobileNavigation({
  isOpen,
  onClose,
  currentPath,
}: MobileNavigationProps) {
  const [openSection, setOpenSection] = useState<string | null>("services");

  // Toggle single active accordion section
  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  // Lock body scroll when open and clean up on unmount
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Close when path changes
  useEffect(() => {
    onClose();
  }, [currentPath, onClose]);

  return (
    <div
      id="mobile-navigation-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 bg-white flex flex-col justify-between transition-all duration-300 ease-out lg:hidden overflow-y-auto ${
        isOpen
          ? "opacity-100 pointer-events-auto translate-y-0 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
          : "opacity-0 pointer-events-none -translate-y-3 [clip-path:polygon(0_0,100%_0,100%_0,0_0)]"
      }`}
    >
      {/* Top Header Bar inside Drawer */}
      <div className="sticky top-0 z-10 bg-white border-b-2 border-brand-black px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-brand-red border border-brand-black" aria-hidden="true" />
          <span className="w-2.5 h-2.5 bg-brand-yellow border border-brand-black" aria-hidden="true" />
          <span className="w-2.5 h-2.5 bg-brand-blue border border-brand-black" aria-hidden="true" />
          <span className="font-heading font-black text-xs uppercase tracking-widest text-brand-black ml-2">
            NAVIGATION ARCHITECTURE
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="w-10 h-10 border-2 border-brand-black bg-brand-gray flex items-center justify-center text-brand-black hover:bg-brand-red hover:text-white transition-colors shadow-[2px_2px_0px_0px_#090909] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Accordion List */}
      <div className="flex-1 px-5 py-6 max-w-lg mx-auto w-full">
        {/* Section 1: Solutions */}
        <AccordionSection
          id="solutions"
          title={navigationConfig.solutions.label}
          isOpen={openSection === "solutions"}
          onToggle={() => toggleSection("solutions")}
        >
          <MobileSolutionsList
            items={navigationConfig.solutions.items}
            viewAll={navigationConfig.solutions.viewAll}
            currentPath={currentPath}
            onItemClick={onClose}
          />
        </AccordionSection>

        {/* Section 2: Services */}
        <AccordionSection
          id="services"
          title={navigationConfig.services.label}
          isOpen={openSection === "services"}
          onToggle={() => toggleSection("services")}
        >
          <MobileServicesList
            columns={navigationConfig.services.columns}
            viewAll={navigationConfig.services.viewAll}
            cta={navigationConfig.services.cta}
            currentPath={currentPath}
            onItemClick={onClose}
          />
        </AccordionSection>

        {/* Section 3: Company */}
        <AccordionSection
          id="company"
          title={navigationConfig.company.label}
          isOpen={openSection === "company"}
          onToggle={() => toggleSection("company")}
        >
          <MobileCompanyList
            items={navigationConfig.company.items}
            currentPath={currentPath}
            onItemClick={onClose}
          />
        </AccordionSection>

        {/* Contact direct link note */}
        <div className="mt-4 p-3 border border-brand-black/20 bg-brand-gray/30 flex items-center justify-between text-xs font-mono">
          <span className="text-brand-black/70">DIRECT LINE</span>
          <Link
            href="/contact"
            onClick={onClose}
            className="text-brand-red font-bold flex items-center gap-1 hover:underline"
          >
            <span>Consultation Desk</span>
            <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Drawer Bottom Action Bar */}
      <div className="sticky bottom-0 bg-white border-t-2 border-brand-black p-5 max-w-lg mx-auto w-full flex flex-col gap-3 shadow-[0_-4px_0_0_#090909]">
        <Button
          variant="primary"
          size="lg"
          withArrow
          asLink
          href={navigationConfig.primaryCta.href}
          onClick={onClose}
          className="w-full justify-center min-h-[48px] text-xs uppercase tracking-wider"
        >
          {navigationConfig.primaryCta.label}
        </Button>
      </div>
    </div>
  );
}
