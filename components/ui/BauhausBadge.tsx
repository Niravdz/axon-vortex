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
  variant = "red",
  shape = "square",
  size = "md",
  className = "",
}: BauhausBadgeProps) {
  const variantStyles = {
    red: "bg-[#F23B32] text-white border-2 border-[#090909]",
    yellow: "bg-[#FFD447] text-[#090909] border-2 border-[#090909]",
    blue: "bg-[#2F5FA7] text-white border-2 border-[#090909]",
    slate: "bg-[#0F2747] text-white border-2 border-[#090909]",
    white: "bg-[#FFFFFF] text-[#090909] border-2 border-[#090909]",
    outline: "bg-transparent text-[#090909] border-2 border-[#090909]",
  }[variant];

  const shapeStyles = {
    pill: "rounded-full",
    circle: "rounded-full aspect-square flex items-center justify-center p-0",
    square: "rounded-none",
  }[shape];

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 tracking-[0.06em] uppercase",
    md: "text-xs px-3 py-1 tracking-[0.06em] uppercase",
    lg: "text-sm px-4 py-1.5 tracking-[0.06em] uppercase",
  }[size];

  return (
    <span
      className={`inline-flex items-center justify-center font-heading font-bold select-none ${variantStyles} ${shapeStyles} ${sizeStyles} ${className}`}
    >
      {children}
    </span>
  );
}
