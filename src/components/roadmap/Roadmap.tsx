"use client";

import { useScrollReveal } from "../motion/useScrollReveal";
import styles from "./Roadmap.module.css";

type Role = {
  company: string;
  role: string;
  period: string;
  stack: string;
  points: string[];
};

const roles: Role[] = [
  {
    company: "Ganesha Operation",
    role: "Mobile Developer",
    period: "2025 — Present",
    stack: "Flutter",
    points: [
      "Develop and maintain 6 production Flutter applications within a 5-person mobile team.",
      "Implement end-to-end features across presentation, business logic, and data layers using BLoC, Clean Architecture, REST APIs, and dependency injection.",
      "Build and maintain real-time multiplayer gameplay, attendance, reporting, registration, and learning workflows.",
      "Diagnose and resolve production issues — race conditions, API contract mismatches, session state, WebSocket reliability, and platform/build compatibility.",
      "Independently designed and built a real-time event application in an 11-day sprint — WebSocket communication, session persistence, reconnect handling, operator controls — used at an internal company event without reported issues.",
    ],
  },
  {
    company: "Refactory",
    role: "Junior Software Developer",
    period: "2023 — 2025",
    stack: "Flutter · Kotlin · Laravel · Vue.js · Next.js · .NET",
    points: [
      "Developed mobile, frontend, backend, and full-stack solutions across multiple client projects, adapting to different existing codebases and technology stacks.",
      "Built mobile features and REST API integrations with Flutter and Kotlin, while contributing to backend services using Laravel, .NET, and CodeIgniter.",
      "Selected projects: AladinMall (Kotlin mobile development), SEV-2 (GraphQL, XMPP, mobile app revamp), and HRIS MyTok (Flutter + Laravel).",
    ],
  },
];

function RoleEntry({ entry }: { entry: Role }) {
  return (
    <div className={styles.entry}>
      <div className={styles.entryMeta}>
        <div className={styles.period}>{entry.period}</div>
        <div className={styles.company}>{entry.company}</div>
        <div className={styles.role}>{entry.role}</div>
        <div className={styles.stack}>{entry.stack}</div>
      </div>
      <ul className={styles.points}>
        {entry.points.map((point) => (
          <li key={point.slice(0, 24)}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Roadmap() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: `.${styles.entry}` });

  return (
    <section id="roadmap" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.figLabel} aria-hidden="true">
          FIG.04
        </div>
        <h2 className={styles.heading}>Career Roadmap</h2>
        <div className={styles.timeline} ref={ref}>
          {roles.map((entry) => (
            <RoleEntry entry={entry} key={entry.company} />
          ))}
        </div>
      </div>
    </section>
  );
}
