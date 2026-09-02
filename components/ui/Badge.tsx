import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "dot" | "code";
  glow?: boolean;
}

export function Badge({
  children,
  className,
  variant = "dot",
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-mono tracking-widest uppercase border border-border bg-white/80 backdrop-blur-sm text-editorial-primary font-semibold shadow-xs",
        className
      )}
    >
      {variant === "dot" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-turquoise" />
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}
