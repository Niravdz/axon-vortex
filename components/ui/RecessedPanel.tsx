import React from "react";
import { cn } from "@/lib/utils";

interface RecessedPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  radius?: "4" | "8" | "12" | "16";
}

export function RecessedPanel({
  children,
  className,
  radius = "8",
  ...props
}: RecessedPanelProps) {
  const radiusClasses = {
    "4": "rounded-[4px]",
    "8": "rounded-[8px]",
    "12": "rounded-[12px]",
    "16": "rounded-[16px]",
  };

  return (
    <div
      className={cn(
        "relative bg-[#101215] border border-white/[0.04]",
        "shadow-box-inset",
        radiusClasses[radius],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
