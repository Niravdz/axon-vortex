import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "dot" | "code" | "amber-dot";
  glow?: boolean;
}

export function Badge({
  children,
  className,
  variant = "dot",
  glow = false,
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-[6px] text-[11px] font-mono tracking-wider uppercase border border-white/[0.08] bg-[#171a1e] text-[#EFECE4] font-medium shadow-[0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]",
        glow && "shadow-[0_0_14px_rgba(59,130,246,0.3)]",
        className
      )}
    >
      {variant === "dot" && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3B82F6] opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3B82F6]" />
        </span>
      )}
      {variant === "amber-dot" && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F4BA00] opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F4BA00]" />
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}
