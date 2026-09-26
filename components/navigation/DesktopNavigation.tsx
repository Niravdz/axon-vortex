"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { navigationConfig } from "./navigationConfig";
import { DropdownMenu } from "./DropdownMenu";
import { MegaMenu } from "./MegaMenu";

type MenuKey = "solutions" | "services" | "company" | null;

export function DesktopNavigation() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const pathname = usePathname();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLButtonElement>(null);
  const companyRef = useRef<HTMLButtonElement>(null);

  const triggerRefs = useMemo(
    () => ({
      solutions: solutionsRef,
      services: servicesRef,
      company: companyRef,
    }),
    []
  );
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  }, [clearCloseTimeout]);

  const handleTriggerMouseEnter = (menu: "solutions" | "services" | "company") => {
    clearCloseTimeout();
    setActiveMenu(menu);
  };

  const handleTriggerClick = (menu: "solutions" | "services" | "company") => {
    clearCloseTimeout();
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  useEffect(() => {
    setActiveMenu(null);
    clearCloseTimeout();
  }, [pathname, clearCloseTimeout]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(null);
        clearCloseTimeout();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearCloseTimeout();
    };
  }, [clearCloseTimeout]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeMenu) {
        const currentMenu = activeMenu;
        setActiveMenu(null);
        clearCloseTimeout();
        triggerRefs[currentMenu]?.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMenu, clearCloseTimeout, triggerRefs]);

  const isSolutionsActive =
    pathname === "/solutions" ||
    pathname === "/digital-marketing" ||
    pathname === "/ai-automation" ||
    pathname === "/websites-ecommerce" ||
    pathname === "/lead-generation" ||
    pathname === "/technology-digital-transformation";

  const isServicesActive =
    pathname === "/services" || pathname.startsWith("/services/");

  const isCompanyActive =
    pathname === "/about" ||
    pathname === "/approach" ||
    pathname === "/growth-audit" ||
    pathname === "/insights" ||
    pathname.startsWith("/insights/");

  const isContactActive = pathname === "/contact";

  return (
    <nav
      ref={navContainerRef}
      role="navigation"
      aria-label="Desktop Main Navigation"
      className="hidden lg:flex items-center gap-1 xl:gap-2 h-full"
    >
      {/* 1. SOLUTIONS TRIGGER & DROPDOWN */}
      <div
        className="relative h-full flex items-center"
        onMouseEnter={() => handleTriggerMouseEnter("solutions")}
        onMouseLeave={scheduleClose}
      >
        <button
          ref={triggerRefs.solutions}
          id="nav-trigger-solutions"
          data-nav-item
          type="button"
          aria-haspopup="true"
          aria-expanded={activeMenu === "solutions"}
          aria-controls="nav-dropdown-solutions"
          onClick={() => handleTriggerClick("solutions")}
          className={`group flex items-center gap-1.5 px-3.5 py-2 text-xs font-heading font-medium tracking-wide transition-all select-none rounded-[6px] hover:bg-white/[0.06] ${
            activeMenu === "solutions" || isSolutionsActive
              ? "text-[#3B82F6]"
              : "text-[#EFECE4]/80 hover:text-[#EFECE4]"
          }`}
        >
          <span>{navigationConfig.solutions.label}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              activeMenu === "solutions" ? "rotate-180 text-[#3B82F6]" : "opacity-60"
            }`}
            aria-hidden="true"
          />
          {isSolutionsActive && (
            <span
              className="absolute bottom-3 left-3.5 right-3.5 h-[2px] bg-[#3B82F6] rounded-full shadow-[0_0_8px_#3B82F6]"
              aria-hidden="true"
            />
          )}
        </button>

        <DropdownMenu
          id="nav-dropdown-solutions"
          type="solutions"
          isOpen={activeMenu === "solutions"}
          title={navigationConfig.solutions.label}
          tagline={navigationConfig.solutions.tagline}
          description={navigationConfig.solutions.description}
          items={navigationConfig.solutions.items}
          viewAll={navigationConfig.solutions.viewAll}
          currentPath={pathname}
          onLinkClick={() => setActiveMenu(null)}
          onMouseEnter={clearCloseTimeout}
          onMouseLeave={scheduleClose}
        />
      </div>

      {/* 2. SERVICES TRIGGER & MEGA-MENU */}
      <div
        className="relative h-full flex items-center"
        onMouseEnter={() => handleTriggerMouseEnter("services")}
        onMouseLeave={scheduleClose}
      >
        <button
          ref={triggerRefs.services}
          id="nav-trigger-services"
          data-nav-item
          type="button"
          aria-haspopup="true"
          aria-expanded={activeMenu === "services"}
          aria-controls="nav-dropdown-services"
          onClick={() => handleTriggerClick("services")}
          className={`group flex items-center gap-1.5 px-3.5 py-2 text-xs font-heading font-medium tracking-wide transition-all select-none rounded-[6px] hover:bg-white/[0.06] ${
            activeMenu === "services" || isServicesActive
              ? "text-[#3B82F6]"
              : "text-[#EFECE4]/80 hover:text-[#EFECE4]"
          }`}
        >
          <span>{navigationConfig.services.label}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              activeMenu === "services" ? "rotate-180 text-[#3B82F6]" : "opacity-60"
            }`}
            aria-hidden="true"
          />
          {isServicesActive && (
            <span
              className="absolute bottom-3 left-3.5 right-3.5 h-[2px] bg-[#3B82F6] rounded-full shadow-[0_0_8px_#3B82F6]"
              aria-hidden="true"
            />
          )}
        </button>

        <MegaMenu
          id="nav-dropdown-services"
          isOpen={activeMenu === "services"}
          tagline={navigationConfig.services.tagline}
          description={navigationConfig.services.description}
          columns={navigationConfig.services.columns}
          viewAll={navigationConfig.services.viewAll}
          cta={navigationConfig.services.cta}
          currentPath={pathname}
          onLinkClick={() => setActiveMenu(null)}
          onMouseEnter={clearCloseTimeout}
          onMouseLeave={scheduleClose}
        />
      </div>

      {/* 3. COMPANY TRIGGER & DROPDOWN */}
      <div
        className="relative h-full flex items-center"
        onMouseEnter={() => handleTriggerMouseEnter("company")}
        onMouseLeave={scheduleClose}
      >
        <button
          ref={triggerRefs.company}
          id="nav-trigger-company"
          data-nav-item
          type="button"
          aria-haspopup="true"
          aria-expanded={activeMenu === "company"}
          aria-controls="nav-dropdown-company"
          onClick={() => handleTriggerClick("company")}
          className={`group flex items-center gap-1.5 px-3.5 py-2 text-xs font-heading font-medium tracking-wide transition-all select-none rounded-[6px] hover:bg-white/[0.06] ${
            activeMenu === "company" || isCompanyActive
              ? "text-[#3B82F6]"
              : "text-[#EFECE4]/80 hover:text-[#EFECE4]"
          }`}
        >
          <span>{navigationConfig.company.label}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              activeMenu === "company" ? "rotate-180 text-[#3B82F6]" : "opacity-60"
            }`}
            aria-hidden="true"
          />
          {isCompanyActive && (
            <span
              className="absolute bottom-3 left-3.5 right-3.5 h-[2px] bg-[#3B82F6] rounded-full shadow-[0_0_8px_#3B82F6]"
              aria-hidden="true"
            />
          )}
        </button>

        <DropdownMenu
          id="nav-dropdown-company"
          type="company"
          isOpen={activeMenu === "company"}
          title={navigationConfig.company.label}
          tagline={navigationConfig.company.tagline}
          description={navigationConfig.company.description}
          items={navigationConfig.company.items}
          currentPath={pathname}
          onLinkClick={() => setActiveMenu(null)}
          onMouseEnter={clearCloseTimeout}
          onMouseLeave={scheduleClose}
        />
      </div>

      {/* 4. CONTACT US DIRECT LINK */}
      <div className="relative h-full flex items-center">
        <Link
          href="/contact"
          data-nav-item
          className={`px-3.5 py-2 text-xs font-heading font-medium tracking-wide transition-all select-none rounded-[6px] hover:bg-white/[0.06] ${
            isContactActive
              ? "text-[#3B82F6]"
              : "text-[#EFECE4]/80 hover:text-[#EFECE4]"
          }`}
        >
          <span>Contact Us</span>
          {isContactActive && (
            <span
              className="absolute bottom-3 left-3.5 right-3.5 h-[2px] bg-[#3B82F6] rounded-full shadow-[0_0_8px_#3B82F6]"
              aria-hidden="true"
            />
          )}
        </Link>
      </div>
    </nav>
  );
}
