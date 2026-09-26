import React from "react";
import { cn } from "@/lib/utils";

interface MatteSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: "blue" | "amber" | "none";
  radius?: "16" | "20" | "24";
}

export function MatteSection({
  children,
  className,
  glow = "none",
  radius = "24",
  ...props
}: MatteSectionProps) {
  const radiusClasses = {
    "16": "rounded-[16px]",
    "20": "rounded-[20px]",
    "24": "rounded-[24px]",
  };

  const glowStyles = {
    none: "",
    blue: "shadow-[var(--shadow-box-lg),0_0_24px_rgba(59,130,246,0.15)]",
    amber: "shadow-[var(--shadow-box-lg),0_0_24px_rgba(244,186,0,0.15)]",
  };

  return (
    <div
      className={cn(
        "relative bg-[#141619] border border-white/[0.08]",
        "shadow-box-lg",
        radiusClasses[radius],
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {/* Soft top-edge specular highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent"
      />
      {children}
    </div>
  );
}
