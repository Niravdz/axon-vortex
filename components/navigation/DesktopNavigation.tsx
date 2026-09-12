"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { navigationConfig } from "./navigationConfig";
import { DropdownMenu } from "./DropdownMenu";
import { MegaMenu } from "./MegaMenu";

interface DesktopNavigationProps {
  isDarkPage?: boolean;
}

type MenuKey = "solutions" | "services" | "company" | null;

export function DesktopNavigation({ isDarkPage = false }: DesktopNavigationProps) {
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const pathname = usePathname();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const triggerRefs = {
    solutions: useRef<HTMLButtonElement>(null),
    services: useRef<HTMLButtonElement>(null),
    company: useRef<HTMLButtonElement>(null),
  };
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear pending close timeout
  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  // Set delayed close timeout (safe hover corridor)
  const scheduleClose = useCallback(() => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  }, [clearCloseTimeout]);

  // Immediate menu opening or switching
  const handleTriggerMouseEnter = (menu: "solutions" | "services" | "company") => {
    clearCloseTimeout();
    setActiveMenu(menu);
  };

  const handleTriggerClick = (menu: "solutions" | "services" | "company") => {
    clearCloseTimeout();
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  // Close when pathname changes
  useEffect(() => {
    setActiveMenu(null);
    clearCloseTimeout();
  }, [pathname, clearCloseTimeout]);

  // Click outside listener
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

  // Keyboard accessibility: Escape to close and refocus trigger
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
  }, [activeMenu, clearCloseTimeout]);

  // Active section detection
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
    pathname.startsWith("/insights/") ||
    pathname === "/contact";

  // Visual styling variables based on hero tone
  const textColor = isDarkPage ? "text-white" : "text-[#090909]";
  const textMutedColor = isDarkPage
    ? "text-white/75 hover:text-white"
    : "text-[#090909]/75 hover:text-[#090909]";
  const activeColor = isDarkPage ? "text-[#FFD447]" : "text-[#F23B32]";
  const activeIndicatorColor = isDarkPage ? "bg-[#FFD447]" : "bg-[#F23B32]";
  const triggerBorderHover = isDarkPage
    ? "hover:bg-white/10"
    : "hover:bg-brand-black/5";

  return (
    <nav
      ref={navContainerRef}
      role="navigation"
      aria-label="Desktop Main Navigation"
      className="hidden lg:flex items-center gap-1 xl:gap-2 h-full"
    >
      {/* 1. SOLUTIONS TRIGGER & DROPDOWN */}
      <div
        className="relative"
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
          className={`group flex items-center gap-1.5 px-3.5 py-2 text-xs font-heading font-bold uppercase tracking-wider transition-colors select-none ${triggerBorderHover} ${
            activeMenu === "solutions" || isSolutionsActive
              ? activeColor
              : textMutedColor
          }`}
        >
          <span className="font-mono text-[10px] font-black opacity-60 group-hover:opacity-100 transition-opacity">
            01
          </span>
          <span>{navigationConfig.solutions.label}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              activeMenu === "solutions" ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
          {isSolutionsActive && (
            <span
              className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] ${activeIndicatorColor}`}
              aria-hidden="true"
            />
          )}
        </button>

        <DropdownMenu
          id="nav-dropdown-solutions"
          type="solutions"
          isOpen={activeMenu === "solutions"}
          title={navigationConfig.solutions.label}
          number={navigationConfig.solutions.number}
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
        className="relative"
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
          aria-controls="nav-megamenu-services"
          onClick={() => handleTriggerClick("services")}
          className={`group flex items-center gap-1.5 px-3.5 py-2 text-xs font-heading font-bold uppercase tracking-wider transition-colors select-none ${triggerBorderHover} ${
            activeMenu === "services" || isServicesActive
              ? activeColor
              : textMutedColor
          }`}
        >
          <span className="font-mono text-[10px] font-black opacity-60 group-hover:opacity-100 transition-opacity">
            02
          </span>
          <span>{navigationConfig.services.label}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              activeMenu === "services" ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
          {isServicesActive && (
            <span
              className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] ${activeIndicatorColor}`}
              aria-hidden="true"
            />
          )}
        </button>

        <MegaMenu
          id="nav-megamenu-services"
          isOpen={activeMenu === "services"}
          number={navigationConfig.services.number}
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
        className="relative"
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
          className={`group flex items-center gap-1.5 px-3.5 py-2 text-xs font-heading font-bold uppercase tracking-wider transition-colors select-none ${triggerBorderHover} ${
            activeMenu === "company" || isCompanyActive
              ? activeColor
              : textMutedColor
          }`}
        >
          <span className="font-mono text-[10px] font-black opacity-60 group-hover:opacity-100 transition-opacity">
            03
          </span>
          <span>{navigationConfig.company.label}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              activeMenu === "company" ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
          {isCompanyActive && (
            <span
              className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] ${activeIndicatorColor}`}
              aria-hidden="true"
            />
          )}
        </button>

        <DropdownMenu
          id="nav-dropdown-company"
          type="company"
          isOpen={activeMenu === "company"}
          title={navigationConfig.company.label}
          number={navigationConfig.company.number}
          tagline={navigationConfig.company.tagline}
          description={navigationConfig.company.description}
          items={navigationConfig.company.items}
          currentPath={pathname}
          onLinkClick={() => setActiveMenu(null)}
          onMouseEnter={clearCloseTimeout}
          onMouseLeave={scheduleClose}
        />
      </div>
    </nav>
  );
}
