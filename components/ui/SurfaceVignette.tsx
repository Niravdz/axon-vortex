import React from "react";
import { cn } from "@/lib/utils";

interface SurfaceVignetteProps {
  className?: string;
}

export function SurfaceVignette({ className }: SurfaceVignetteProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 surface-vignette",
        className
      )}
    />
  );
}
