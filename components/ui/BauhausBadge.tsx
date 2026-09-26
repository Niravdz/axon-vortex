import React from "react";

interface BauhausBadgeProps {
  children: React.ReactNode;
  variant?: "red" | "yellow" | "blue" | "slate" | "white" | "outline";
  shape?: "pill" | "circle" | "square";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BauhausBadge({
  children,
  variant = "blue",
  shape = "pill",
  size = "md",
  className = "",
}: BauhausBadgeProps) {
  const variantStyles = {
    red: "bg-[#171a1e] text-[#3B82F6] border border-[#3B82F6]/35 shadow-[0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]",
    yellow: "bg-[#171a1e] text-[#F4BA00] border border-[#F4BA00]/35 shadow-[0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]",
    blue: "bg-[#171a1e] text-[#60A5FA] border border-[#3B82F6]/35 shadow-[0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]",
    slate: "bg-[#1b1e22] text-[#EFECE4] border border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]",
    white: "bg-[#21252a] text-[#EFECE4] border border-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
    outline: "bg-white/[0.04] text-[#EFECE4] border border-white/[0.08] backdrop-blur-sm",
  }[variant] || "bg-[#171a1e] text-[#3B82F6] border border-[#3B82F6]/35";

  const shapeStyles = {
    pill: "rounded-full",
    circle: "rounded-full aspect-square flex items-center justify-center p-0",
    square: "rounded-[4px]",
  }[shape];

  const sizeStyles = {
    sm: "text-[10px] px-2.5 py-0.5 tracking-wider uppercase font-medium",
    md: "text-xs px-3 py-1 tracking-wider uppercase font-medium",
    lg: "text-sm px-4 py-1.5 tracking-wider uppercase font-medium",
  }[size];

  return (
    <span
      className={`inline-flex items-center justify-center select-none backdrop-blur-md ${variantStyles} ${shapeStyles} ${sizeStyles} ${className}`}
    >
      {children}
    </span>
  );
}
