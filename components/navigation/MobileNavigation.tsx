"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
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
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const prevPathRef = React.useRef(currentPath);
  useEffect(() => {
    if (prevPathRef.current !== currentPath) {
      prevPathRef.current = currentPath;
      onClose();
    }
  }, [currentPath, onClose]);

  return (
    <div
      id="mobile-navigation-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[100] bg-[#141619] flex flex-col justify-between transition-all duration-300 ease-out lg:hidden overflow-y-auto ${
        isOpen
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none -translate-y-3"
      }`}
    >
      {/* Top Header Bar inside Drawer */}
      <div className="sticky top-0 z-10 bg-[#141619] border-b border-white/[0.08] px-5 py-4 flex items-center justify-between shadow-box-md">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/axon-vortex-monogram.png"
            alt="AxonVortex"
            width={32}
            height={28}
            className="h-7 w-auto object-contain"
          />
          <span className="font-heading font-semibold text-xs tracking-wider uppercase text-[#EFECE4]">
            AxonVortex System
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="w-11 h-11 rounded-[8px] bg-[#141619] border border-white/[0.08] flex items-center justify-center text-[#EFECE4] shadow-box-sm hover:shadow-box-hover box-interactive hover:bg-[#181c20] transition-colors"
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

        {/* Section 4: Contact Us Direct Link */}
        <div className="mt-2">
          <Link
            href="/contact"
            onClick={onClose}
            className={`w-full min-h-[50px] px-4 py-3 rounded-[10px] border flex items-center justify-between text-sm font-medium tracking-wide box-interactive shadow-box-sm hover:shadow-box-hover ${
              currentPath === "/contact"
                ? "bg-[#1b1e22] border-[#3B82F6] text-[#3B82F6] shadow-box-selected"
                : "bg-[#141619] border-white/[0.08] text-[#EFECE4] hover:bg-[#181c20] hover:border-[#3B82F6]/40"
            }`}
          >
            <span>{navigationConfig.contactUs.label}</span>
            <span className="text-xs text-[#3B82F6] font-mono">→</span>
          </Link>
        </div>
      </div>

      {/* Bottom CTA Action Strip inside Drawer */}
      <div className="sticky bottom-0 bg-[#141619]/95 backdrop-blur-xl border-t border-white/[0.08] p-5 max-w-lg mx-auto w-full">
        <Button
          variant="amber"
          size="md"
          withArrow
          asLink
          href="/growth-audit"
          className="w-full justify-center shadow-[0_4px_16px_rgba(244,186,0,0.35)]"
        >
          Book Growth Audit
        </Button>
      </div>
    </div>
  );
}
