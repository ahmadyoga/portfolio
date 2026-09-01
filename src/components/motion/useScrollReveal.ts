"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./gsapConfig";

type Options = {
  /** CSS selector for children to stagger. If omitted, animates the container itself. */
  stagger?: string;
  y?: number;
  duration?: number;
  start?: string;
};

/**
 * Fades/slides an element (or its `stagger`-matched children) in once, the first
 * time it crosses into the viewport while scrolling. No-ops entirely under
 * prefers-reduced-motion — elements stay at their default CSS-visible state,
 * since the hidden starting state is applied by this hook (via gsap.fromTo),
 * never by CSS.
 */
export function useScrollReveal<T extends HTMLElement>(options: Options = {}) {
  const ref = useRef<T>(null);
  const { stagger, y = 24, duration = 0.7, start = "top 85%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? el.querySelectorAll(stagger) : el;
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          ease: "power2.out",
          stagger: stagger ? 0.12 : 0,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, y, duration, start]);

  return ref;
}
