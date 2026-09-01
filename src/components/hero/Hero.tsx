"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../motion/gsapConfig";
import styles from "./Hero.module.css";

const stackGroups = [
  { label: "Mobile", items: "Flutter · Dart · Kotlin" },
  { label: "Backend & Data", items: "REST API · Supabase · PostgreSQL" },
  { label: "Realtime", items: "WebSocket · Supabase Realtime" },
];

const runtimeRecord = [
  { value: "06", label: "production apps" },
  { value: "02", label: "personal projects" },
  { value: "~1.5s", label: "realtime sync drift" },
];

export default function Hero() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(main, {
        scale: 0.96,
        opacity: 0.85,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: { trigger: main, start: "top top", end: "bottom top", scrub: 0.3 },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.dot} />
          <span className={styles.brandName}>ahmad-yoga</span>/portfolio
          <span className={styles.branch}>@main</span>
        </div>
        <nav className={styles.nav}>
          <a href="#work" className={styles.navLink}>
            01_work
          </a>
          <a href="#roadmap" className={styles.navLink}>
            02_roadmap
          </a>
          <a href="#skills" className={styles.navLink}>
            03_skills
          </a>
          <a
            href="https://github.com/ahmadyoga"
            target="_blank"
            rel="noopener"
            className={styles.navLink}
          >
            github↗
          </a>
          <a href="#contact" className={styles.navContact}>
            contact()
          </a>
        </nav>
      </header>

      <main className={styles.main} ref={mainRef}>
        <section className={styles.leftSection}>
          <div className={styles.vline} aria-hidden="true" />
          <div className={styles.figLabel} aria-hidden="true">
            FIG.01
          </div>

          <div className={styles.badgeRow}>
            <span className={styles.badge}>Mobile Software Engineer</span>
            <span>Bandung, ID</span>
            <span className={styles.sep}>|</span>
            <span>3+ yrs</span>
          </div>

          <h1 className={styles.title}>
            <span className={styles.titleLine}>AHMAD</span>
            <span className={styles.titleLine}>YOGA</span>
          </h1>

          <div className={styles.stackLine}>
            <span className={styles.prompt}>&gt;</span> flutter · bloc · supabase · websocket
            <span className={styles.caret} aria-hidden="true" />
          </div>

          <div className={styles.tagline}>
            <p>
              Building reliable mobile products with Flutter — end-to-end features across
              presentation, business logic, and data layers.
            </p>
          </div>

          <div className={styles.record}>
            <div className={styles.recordHeader}>
              <span>Runtime record</span>
              <span>verified</span>
            </div>
            <div className={styles.recordGrid}>
              {runtimeRecord.map((item) => (
                <div className={styles.recordCell} key={item.label}>
                  <div className={styles.recordNum}>{item.value}</div>
                  <div className={styles.recordLabel}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.ctaRow}>
            <a href="#work" className={styles.ctaPrimary}>
              view_projects() →
            </a>
            <a
              href="https://github.com/ahmadyoga"
              target="_blank"
              rel="noopener"
              className={styles.ctaGithub}
            >
              github ↗
            </a>
            <a href="#contact" className={styles.ctaContact}>
              contact
            </a>
          </div>
        </section>

        <aside className={styles.aside}>
          <a href="#work" className={styles.teaser}>
            <div className={styles.asideHeader}>
              <span>featured_project</span>
              <span className={styles.liveDot}>● live</span>
            </div>
            <Image
              src="/evidence/dropatrack-room.png"
              alt="DropATrack room in use — synced video, queue, and live chat between three people"
              width={3024}
              height={1738}
              className={styles.teaserImage}
              sizes="(max-width: 860px) 100vw, 40vw"
              priority
            />
            <div className={styles.teaserCaption}>
              <strong>DropATrack</strong>
              <span>Real-time collaborative music room</span>
            </div>
          </a>

          <div className={styles.stackPanel}>
            <div className={styles.stackTitle}>Stack (preview)</div>
            <div className={styles.stackList}>
              {stackGroups.map((group) => (
                <div className={styles.stackRow} key={group.label}>
                  <span className={styles.stackTag}>{group.label}</span>
                  <span>{group.items}</span>
                </div>
              ))}
            </div>

            <div className={styles.asideFooter}>
              <a href="#skills" className={styles.scrollLink}>
                → full stack
              </a>
              <span>02 projects</span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
