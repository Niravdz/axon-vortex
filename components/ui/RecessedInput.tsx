"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface RecessedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const RecessedInput = forwardRef<HTMLInputElement, RecessedInputProps>(
  ({ className, label, error, hint, id, disabled, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-label font-medium uppercase tracking-wider text-[#9AA3B2]"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-full px-4 py-2.5 rounded-[8px] bg-[#101215] text-[#EFECE4] text-sm font-body",
              "border border-white/[0.06]",
              "shadow-[inset_0_2px_5px_rgba(0,0,0,0.82),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.035)]",
              "placeholder:text-[#9AA3B2]/50 placeholder:font-normal",
              "transition-all duration-200",
              "focus:outline-none focus:border-[#3B82F6]/60 focus:ring-2 focus:ring-[#3B82F6]/30 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.85),0_0_16px_rgba(59,130,246,0.22)]",
              "disabled:cursor-not-allowed disabled:opacity-45 disabled:bg-[#141619]",
              error && "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/30",
              className
            )}
            {...props}
          />
        </div>

        {error && (
          <p className="text-xs text-rose-400 font-body mt-0.5">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-[#9AA3B2]/70 font-body mt-0.5">{hint}</p>
        )}
      </div>
    );
  }
);

RecessedInput.displayName = "RecessedInput";
