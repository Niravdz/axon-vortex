"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface FocusInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const FocusInput = forwardRef<HTMLInputElement, FocusInputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-label font-medium uppercase tracking-wider text-[#EFECE4]/90 flex items-center justify-between"
          >
            <span>{label}</span>
            {props.required && <span className="text-[#F4BA00] text-[11px]">*</span>}
          </label>
        )}

        <div className="relative w-full">
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full bg-[#101215] text-[#EFECE4] placeholder-[#9AA3B2]/50 text-sm px-4 py-3 rounded-xl border transition-all duration-200 outline-none",
              "border-white/[0.04] shadow-box-inset",
              "focus:border-[#3B82F6] focus:bg-[#0c0e10] focus:ring-2 focus:ring-[#3B82F6]/30 focus:shadow-box-inset",
              error
                ? "border-[#F87171] focus:border-[#F87171] focus:ring-rose-500/30"
                : "",
              className
            )}
            {...props}
          />
        </div>

        {error && (
          <div className="flex items-center gap-1.5 text-xs text-[#F87171] mt-0.5" role="alert">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {hint && !error && (
          <span className="text-[11px] text-[#9AA3B2]/70">{hint}</span>
        )}
      </div>
    );
  }
);

FocusInput.displayName = "FocusInput";
