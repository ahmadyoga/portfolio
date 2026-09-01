"use client";

import { useState } from "react";
import Overlay from "../motion/Overlay";
import { useScrollReveal } from "../motion/useScrollReveal";
import styles from "./About.module.css";

const shortPositioning =
  "I'm a Mobile Software Engineer focused on Flutter and the systems underneath it. I care about production reliability as much as new features — and I build my own things end-to-end when I want to go deeper.";

const fullVersion = [
  "Hi, I'm Ahmad. I've spent the last 3+ years building and maintaining production mobile applications, primarily with Flutter — using BLoC, Clean Architecture, REST APIs, and dependency injection to keep business logic testable and independent from whatever's rendering it.",
  "A good part of my day-to-day is also production work itself: chasing race conditions, WebSocket reliability issues, API contract mismatches. That's usually where I learn the most about how a system actually behaves under real use, not just in a demo.",
  "Outside client and employer work, I build things I want to exist. IKGO is a real-time multiplayer learning game with its own CMS; DropATrack is a collaborative music room built around a synchronization engine I designed myself. Both pushed me further into the stack than my day job does — Next.js, Supabase, PostgreSQL, even a browser extension for DropATrack.",
  "I started across Kotlin, Laravel, Vue.js, and .NET before Flutter became my main tool, which is part of why picking up a new part of the stack doesn't worry me. I'm still primarily focused on going deeper into mobile, but I've started getting curious about pushing further into the other parts of the stack I haven't fully explored yet.",
];

export default function About() {
  const [open, setOpen] = useState(false);
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner} ref={ref}>
        <div className={styles.figLabel} aria-hidden="true">
          FIG.02
        </div>
        <h2 className={styles.heading}>About</h2>
        <p className={styles.positioning}>{shortPositioning}</p>

        <button type="button" className={styles.toggle} onClick={() => setOpen(true)}>
          read_full_version() <span className={styles.arrow}>→</span>
        </button>
      </div>

      {open && (
        <Overlay onClose={() => setOpen(false)}>
          <div className={styles.fullVersion}>
            <h3 className={styles.fullVersionHeading}>About Ahmad</h3>
            {fullVersion.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </Overlay>
      )}
    </section>
  );
}
