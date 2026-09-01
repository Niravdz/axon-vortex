"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getGSAP } from "@/lib/gsap";

interface AnimationContextType {
  isReady: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
  isReady: false,
});

export const useAnimation = () => useContext(AnimationContext);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getGSAP();
    // Signal that GSAP is initialized and DOM is mounted
    setIsReady(true);
  }, []);

  return (
    <AnimationContext.Provider value={{ isReady }}>
      {children}
    </AnimationContext.Provider>
  );
}
