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
              "border-white/[0.04] shadow-[inset_0_2px_5px_rgba(0,0,0,0.78),inset_0_1px_1px_rgba(0,0,0,0.92),0_1px_0_rgba(255,255,255,0.04)]",
              "focus:border-[#3B82F6]/50 focus:bg-[#0c0e10] focus:shadow-[inset_0_2px_6px_rgba(0,0,0,0.9),0_0_16px_rgba(59,130,246,0.25)]",
              error
                ? "border-[#F87171] focus:border-[#F87171] focus:shadow-[0_0_16px_rgba(248,113,113,0.35)]"
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
