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
    blue: "hover:border-[#3B82F6]/45 hover:bg-[#21252a] hover:shadow-[0_12px_28px_-4px_rgba(0,0,0,0.78),0_0_18px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.18)]",
    amber: "hover:border-[#F4BA00]/45 hover:bg-[#21252a] hover:shadow-[0_12px_28px_-4px_rgba(0,0,0,0.78),0_0_18px_rgba(244,186,0,0.2),inset_0_1px_0_rgba(255,255,255,0.18)]",
  };

  return (
    <div
      className={cn(
        "relative bg-[#171a1e] border border-white/[0.08]",
        "shadow-[0_4px_14px_-2px_rgba(0,0,0,0.72),0_2px_6px_-1px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)]",
        radiusClasses[radius],
        interactive &&
          "transition-all duration-200 ease-out hover:-translate-y-1 active:translate-y-0",
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
