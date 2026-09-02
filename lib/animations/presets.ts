import type gsapCore from "gsap";

/**
 * Shared GSAP animation presets for the AxonVortex scroll experience.
 * All presets use transform + opacity only for GPU compositing.
 * Each returns a timeline or tween that can be composed into larger sequences.
 */

// Brand easing curves
export const EASE = {
  reveal: "power3.out",
  smooth: "power2.inOut",
  snappy: "power4.out",
  spring: "back.out(1.4)",
  editorial: "expo.out",
} as const;

// Common durations
export const DURATION = {
  fast: 0.5,
  normal: 0.8,
  slow: 1.2,
  dramatic: 1.6,
} as const;

/**
 * Fade in + translate up. The workhorse reveal animation.
 */
export function fadeInUp(
  gsap: typeof gsapCore,
  targets: gsap.TweenTarget,
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
  }
) {
  const { y = 60, duration = DURATION.normal, delay = 0, stagger = 0, ease = EASE.reveal } = options || {};
  return gsap.fromTo(
    targets,
    { y, opacity: 0, willChange: "transform, opacity" },
    { y: 0, opacity: 1, duration, delay, stagger, ease, clearProps: "willChange" }
  );
}

/**
 * Stagger-reveal a grid of cards with slight upward motion.
 */
export function staggerCards(
  gsap: typeof gsapCore,
  targets: gsap.TweenTarget,
  options?: {
    y?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
  }
) {
  const { y = 50, stagger = 0.08, duration = DURATION.normal, ease = EASE.reveal } = options || {};
  return gsap.fromTo(
    targets,
    { y, opacity: 0, scale: 0.97, willChange: "transform, opacity" },
    { y: 0, opacity: 1, scale: 1, duration, stagger, ease, clearProps: "willChange" }
  );
}

/**
 * Parallax depth effect on scroll (scrubbed).
 */
export function parallaxSection(
  gsap: typeof gsapCore,
  target: gsap.TweenTarget,
  options?: {
    yPercent?: number;
    scale?: number;
    opacity?: number;
  }
) {
  const { yPercent = -15, scale = 1, opacity = 1 } = options || {};
  return gsap.to(target, {
    yPercent,
    scale,
    opacity,
    ease: "none",
  });
}

/**
 * Split text headline reveal — word by word or char by char.
 * Wraps each unit in a span for individual animation.
 */
export function splitTextReveal(
  gsap: typeof gsapCore,
  container: HTMLElement,
  options?: {
    by?: "word" | "char";
    duration?: number;
    stagger?: number;
    y?: number;
  }
) {
  const { by = "word", duration = DURATION.normal, stagger = 0.04, y = 40 } = options || {};
  const text = container.textContent || "";
  const units = by === "word" ? text.split(/\s+/) : text.split("");

  container.innerHTML = units
    .map((unit) => {
      const display = by === "word" ? unit + "&nbsp;" : unit;
      return `<span style="display:inline-block;overflow:hidden"><span class="split-unit" style="display:inline-block;transform:translateY(${y}px);opacity:0">${display}</span></span>`;
    })
    .join("");

  const targets = container.querySelectorAll(".split-unit");

  return gsap.to(targets, {
    y: 0,
    opacity: 1,
    duration,
    stagger,
    ease: EASE.editorial,
    clearProps: "willChange",
  });
}

/**
 * Horizontal slide-in from left or right.
 */
export function slideIn(
  gsap: typeof gsapCore,
  targets: gsap.TweenTarget,
  options?: {
    from?: "left" | "right";
    x?: number;
    duration?: number;
    stagger?: number;
  }
) {
  const { from = "left", x = 80, duration = DURATION.normal, stagger = 0 } = options || {};
  const xStart = from === "left" ? -x : x;

  return gsap.fromTo(
    targets,
    { x: xStart, opacity: 0, willChange: "transform, opacity" },
    { x: 0, opacity: 1, duration, stagger, ease: EASE.reveal, clearProps: "willChange" }
  );
}

/**
 * Scale up from center with optional blur transition.
 */
export function scaleReveal(
  gsap: typeof gsapCore,
  targets: gsap.TweenTarget,
  options?: {
    scale?: number;
    duration?: number;
    delay?: number;
  }
) {
  const { scale = 0.85, duration = DURATION.slow, delay = 0 } = options || {};

  return gsap.fromTo(
    targets,
    { scale, opacity: 0, willChange: "transform, opacity" },
    { scale: 1, opacity: 1, duration, delay, ease: EASE.smooth, clearProps: "willChange" }
  );
}

/**
 * Counter animation for statistics/numbers.
 */
export function counterAnimation(
  gsap: typeof gsapCore,
  target: HTMLElement,
  options?: {
    end?: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
  }
) {
  const { end = 100, duration = 2, prefix = "", suffix = "" } = options || {};
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: end,
    duration,
    ease: EASE.smooth,
    onUpdate: () => {
      target.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
    },
  });
}

/**
 * Create a ScrollTrigger-driven section entrance.
 * Standard pattern used across all page sections.
 */
export function sectionEntrance(
  gsap: typeof gsapCore,
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger,
  trigger: HTMLElement,
  targets: {
    masthead?: HTMLElement | null;
    heading?: HTMLElement | null;
    body?: HTMLElement | null;
    cards?: NodeListOf<Element> | HTMLElement[] | null;
    cta?: HTMLElement | null;
  },
  options?: {
    start?: string;
    staggerDelay?: number;
  }
) {
  const { start = "top 85%", staggerDelay = 0.15 } = options || {};

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end: "bottom 20%",
      toggleActions: "play none none none",
    },
  });

  let position = 0;

  if (targets.masthead) {
    tl.add(fadeInUp(gsap, targets.masthead, { y: 30, duration: 0.6 }), position);
    position += staggerDelay;
  }

  if (targets.heading) {
    tl.add(fadeInUp(gsap, targets.heading, { y: 40, duration: 0.7 }), position);
    position += staggerDelay;
  }

  if (targets.body) {
    tl.add(fadeInUp(gsap, targets.body, { y: 30, duration: 0.6 }), position);
    position += staggerDelay;
  }

  if (targets.cards && (targets.cards as NodeListOf<Element>).length > 0) {
    tl.add(staggerCards(gsap, targets.cards as gsap.TweenTarget, { stagger: 0.06 }), position);
    position += staggerDelay;
  }

  if (targets.cta) {
    tl.add(fadeInUp(gsap, targets.cta, { y: 20, duration: 0.5 }), position);
  }

  return tl;
}
