import React from "react";
import { cn } from "@/lib/utils";

interface RaisedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: "blue" | "amber" | "none";
  interactive?: boolean;
  radius?: "8" | "12" | "16";
}

export function RaisedCard({
  children,
  className,
  glowOnHover = "blue",
  interactive = true,
  radius = "12",
  ...props
}: RaisedCardProps) {
  const radiusClasses = {
    "8": "rounded-[8px]",
    "12": "rounded-[12px]",
    "16": "rounded-[16px]",
  };

  const hoverGlow = {
    none: "hover:bg-[#21252a]",
    blue: "hover:border-[#3B82F6]/45 hover:bg-[#21252a]",
    amber: "hover:border-[#F4BA00]/45 hover:bg-[#21252a]",
  };

  return (
    <div
      className={cn(
        "relative bg-[#171a1e] border border-white/[0.08]",
        "shadow-box-md",
        radiusClasses[radius],
        interactive &&
          "box-interactive hover:shadow-box-hover active:shadow-box-pressed",
        interactive && hoverGlow[glowOnHover],
        className
      )}
      {...props}
    >
      {/* Soft specular highlight reflection along top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent"
      />
      {children}
    </div>
  );
}
