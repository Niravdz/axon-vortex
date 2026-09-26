"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export interface MegaMenuShellProps {
  id: string;
  isOpen: boolean;
  variant?: "large" | "medium";
  ariaLabel: string;
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  positionMode?: "center" | "anchor";
  anchorLeft?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export function MegaMenuShell({
  id,
  isOpen,
  variant = "large",
  ariaLabel,
  header,
  children,
  footer,
  positionMode = "center",
  anchorLeft,
  onMouseEnter,
  onMouseLeave,
  className = "",
}: MegaMenuShellProps) {
  const prefersReducedMotion = useReducedMotion();
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isOpen) {
      setShouldRender(true);
      // Wait for DOM paint then animate in
      const frameId = requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => cancelAnimationFrame(frameId);
    } else {
      setIsVisible(false);
      // Wait for exit animation (160ms) before unmounting
      timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, prefersReducedMotion ? 10 : 180);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, prefersReducedMotion]);

  if (!shouldRender) return null;

  // Compute position styles:
  // Center mode (Solutions & Services): horizontally centered in viewport
  // Anchor mode (Company): positioned near trigger with safety clamp
  const styleObj: React.CSSProperties =
    positionMode === "anchor" && anchorLeft !== undefined
      ? {
          position: "fixed",
          top: "76px",
          left: `${anchorLeft}px`,
        }
      : {
          position: "fixed",
          top: "76px",
          left: "50%",
          transform: "translateX(-50%)",
        };

  return (
    <div
      style={styleObj}
      className="z-50 pointer-events-auto"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Invisible safe interaction bridge connecting header trigger to dropdown */}
      <div
        className="absolute -top-4 left-0 right-0 h-4 pointer-events-auto"
        aria-hidden="true"
      />

      {/* Main Systems Console Shell Container */}
      <div
        id={id}
        ref={shellRef}
        role="region"
        aria-label={ariaLabel}
        className={cn(
          "mega-menu-shell relative flex flex-col overflow-hidden text-[#EFECE4]",
          variant === "large" ? "mega-menu-shell--large" : "mega-menu-shell--medium",
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2.5 scale-[0.985] pointer-events-none",
          className
        )}
      >
        {/* Fine-grain procedural monochromatic texture overlay */}
        <div className="mega-menu-grain" aria-hidden="true" />

        {/* Top Header Strip if provided */}
        {header && (
          <div className="relative z-10 border-b border-white/[0.07] bg-[#121416]/90 px-6 py-3.5 sm:px-8 flex items-center justify-between">
            {header}
          </div>
        )}

        {/* Content Body Area */}
        <div className="relative z-10 flex-1">{children}</div>

        {/* Bottom Footer Area if provided */}
        {footer && (
          <div className="relative z-10 border-t border-white/[0.07] bg-[#121416]/95 px-6 py-3.5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
