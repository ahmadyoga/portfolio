"use client";

import { useScrollReveal } from "../motion/useScrollReveal";
import styles from "./Contact.module.css";

const links = [
  { label: "Email", value: "ahmadyoga684@gmail.com", href: "mailto:ahmadyoga684@gmail.com" },
  { label: "GitHub", value: "github.com/ahmadyoga", href: "https://github.com/ahmadyoga" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ahmadyogadev",
    href: "https://linkedin.com/in/ahmadyogadev",
  },
];

export default function Contact() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner} ref={ref}>
        <div className={styles.figLabel} aria-hidden="true">
          FIG.07
        </div>
        <h2 className={styles.eyebrow}>Contact</h2>

        <h3 className={styles.headline}>Got something worth building?</h3>
        <p className={styles.subline}>
          A blank canvas, or one that&apos;s already been drawn on — I can work with both.
        </p>

        <a href="mailto:ahmadyoga684@gmail.com" className={styles.ctaButton}>
          Let&apos;s talk <span className={styles.arrow}>→</span>
        </a>

        <div className={styles.linkList}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener" : undefined}
              className={styles.linkRow}
            >
              <span className={styles.linkLabel}>{link.label}</span>
              <span className={styles.linkValue}>{link.value}</span>
            </a>
          ))}
          <a href="/resume.pdf" download className={styles.linkRow}>
            <span className={styles.linkLabel}>Resume</span>
            <span className={styles.linkValue}>Download PDF ↓</span>
          </a>
        </div>
      </div>

      <div className={styles.footer}>
        <span>ahmad-yoga/portfolio</span>
        <span>© 2026 Ahmad Yoga Witdodo</span>
      </div>
    </section>
  );
}
