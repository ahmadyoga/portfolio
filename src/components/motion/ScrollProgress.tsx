"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsapConfig";
import styles from "./ScrollProgress.module.css";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set(bar, { scaleX: 0 });
      ScrollTrigger.create({
        start: 0,
        end: () => document.documentElement.scrollHeight - window.innerHeight,
        scrub: 0.2,
        onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.bar} ref={barRef} />
    </div>
  );
}
