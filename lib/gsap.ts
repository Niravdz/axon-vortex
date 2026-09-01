import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function getGSAP() {
  if (typeof window !== "undefined" && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    
    // Configure defaults
    gsap.defaults({
      ease: "power3.out",
      duration: 1,
    });
    
    // Smooth refresh config
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
    });

    isRegistered = true;
  }
  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };
