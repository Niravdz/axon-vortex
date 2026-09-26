"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { navigationConfig } from "./navigationConfig";
import { SolutionsSubmenu } from "./SolutionsSubmenu";
import { ServicesSubmenu } from "./ServicesSubmenu";
import { CompanySubmenu } from "./CompanySubmenu";

type MenuKey = "solutions" | "services" | "company" | null;

export function DesktopNavigation() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [companyLeft, setCompanyLeft] = useState<number | undefined>(undefined);
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
    }, 120);
  }, [clearCloseTimeout]);

  // Measure and clamp Company dropdown position when opened
  const updateCompanyPosition = useCallback(() => {
    if (companyRef.current) {
      const rect = companyRef.current.getBoundingClientRect();
      const menuWidth = Math.min(720, window.innerWidth - 32);
      let desiredLeft = rect.left + rect.width / 2 - menuWidth / 2;
      // Clamp between 24px from left and 24px from right
      desiredLeft = Math.max(24, Math.min(desiredLeft, window.innerWidth - menuWidth - 24));
      setCompanyLeft(desiredLeft);
    }
  }, []);

  const handleTriggerMouseEnter = (menu: "solutions" | "services" | "company") => {
    clearCloseTimeout();
    if (menu === "company") {
      updateCompanyPosition();
    }
    setActiveMenu(menu);
  };

  const handleTriggerClick = (menu: "solutions" | "services" | "company") => {
    clearCloseTimeout();
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      if (menu === "company") {
        updateCompanyPosition();
      }
      setActiveMenu(menu);
    }
  };

  // Close on route change
  useEffect(() => {
    setActiveMenu(null);
    clearCloseTimeout();
  }, [pathname, clearCloseTimeout]);

  // Recalculate position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (activeMenu === "company") {
        updateCompanyPosition();
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [activeMenu, updateCompanyPosition]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        // Also check if click was on a mega menu shell element
        const target = event.target as HTMLElement;
        if (!target.closest(".mega-menu-shell")) {
          setActiveMenu(null);
          clearCloseTimeout();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearCloseTimeout();
    };
  }, [clearCloseTimeout]);

  // Close on Escape and return focus to trigger
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

  const isContactActive = pathname === "/contact";

  const isSolutionsActive =
    !isContactActive &&
    (pathname === "/solutions" ||
      pathname === "/digital-marketing" ||
      pathname === "/ai-automation" ||
      pathname === "/websites-ecommerce" ||
      pathname === "/lead-generation" ||
      pathname === "/technology-digital-transformation" ||
      pathname === "/authority-conversion");

  const isServicesActive =
    !isContactActive &&
    (pathname === "/services" || pathname.startsWith("/services/"));

  const isCompanyActive =
    !isContactActive &&
    (pathname === "/about" ||
      pathname === "/approach" ||
      pathname === "/growth-audit" ||
      pathname === "/insights" ||
      pathname.startsWith("/insights/"));

  return (
    <>
      {/* Subtle backdrop overlay behind mega menu */}
      {activeMenu !== null && (
        <div
          role="presentation"
          aria-hidden="true"
          onClick={() => {
            setActiveMenu(null);
            clearCloseTimeout();
          }}
          className="fixed inset-0 top-20 z-40 mega-menu-backdrop cursor-pointer"
        />
      )}

      <nav
        ref={navContainerRef}
        role="navigation"
        aria-label="Desktop Main Navigation"
        className="hidden lg:flex items-center gap-1 xl:gap-2 h-full"
      >
        {/* 1. SOLUTIONS TRIGGER & SUBMENU */}
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
            aria-current={isSolutionsActive ? "page" : undefined}
            onClick={() => handleTriggerClick("solutions")}
            className="nav-item"
          >
            <span className="nav-label">{navigationConfig.solutions.label}</span>
            <span className="nav-chevron" aria-hidden="true">
              <ChevronDown className="w-full h-full block" />
            </span>
          </button>

          <SolutionsSubmenu
            id="nav-dropdown-solutions"
            isOpen={activeMenu === "solutions"}
            tagline={navigationConfig.solutions.tagline}
            description={navigationConfig.solutions.description}
            items={navigationConfig.solutions.items}
            viewAll={navigationConfig.solutions.viewAll}
            currentPath={pathname}
            onLinkClick={() => {
              setActiveMenu(null);
              clearCloseTimeout();
            }}
            onMouseEnter={clearCloseTimeout}
            onMouseLeave={scheduleClose}
          />
        </div>

        {/* 2. SERVICES TRIGGER & SUBMENU */}
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
            aria-current={isServicesActive ? "page" : undefined}
            onClick={() => handleTriggerClick("services")}
            className="nav-item"
          >
            <span className="nav-label">{navigationConfig.services.label}</span>
            <span className="nav-chevron" aria-hidden="true">
              <ChevronDown className="w-full h-full block" />
            </span>
          </button>

          <ServicesSubmenu
            id="nav-dropdown-services"
            isOpen={activeMenu === "services"}
            tagline={navigationConfig.services.tagline}
            description={navigationConfig.services.description}
            columns={navigationConfig.services.columns}
            viewAll={navigationConfig.services.viewAll}
            cta={navigationConfig.services.cta}
            currentPath={pathname}
            onLinkClick={() => {
              setActiveMenu(null);
              clearCloseTimeout();
            }}
            onMouseEnter={clearCloseTimeout}
            onMouseLeave={scheduleClose}
          />
        </div>

        {/* 3. COMPANY TRIGGER & SUBMENU */}
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
            aria-current={isCompanyActive ? "page" : undefined}
            onClick={() => handleTriggerClick("company")}
            className="nav-item"
          >
            <span className="nav-label">{navigationConfig.company.label}</span>
            <span className="nav-chevron" aria-hidden="true">
              <ChevronDown className="w-full h-full block" />
            </span>
          </button>

          <CompanySubmenu
            id="nav-dropdown-company"
            isOpen={activeMenu === "company"}
            tagline={navigationConfig.company.tagline}
            description={navigationConfig.company.description}
            items={navigationConfig.company.items}
            currentPath={pathname}
            anchorLeft={companyLeft}
            onLinkClick={() => {
              setActiveMenu(null);
              clearCloseTimeout();
            }}
            onMouseEnter={clearCloseTimeout}
            onMouseLeave={scheduleClose}
          />
        </div>

        {/* 4. CONTACT US DIRECT LINK */}
        <div className="relative h-full flex items-center">
          <Link
            href="/contact"
            data-nav-item
            aria-current={isContactActive ? "page" : undefined}
            className="nav-item"
          >
            <span className="nav-label">{navigationConfig.contactUs.label}</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
