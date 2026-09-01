"use client";

import { useState } from "react";
import Image from "next/image";
import Overlay from "../motion/Overlay";
import { useScrollReveal } from "../motion/useScrollReveal";
import styles from "./Projects.module.css";

type CaseStudySection = { label: string; body: string };
type Screenshot = { src: string; alt: string; width: number; height: number };

type Project = {
  id: string;
  name: string;
  tagline: string;
  status: string;
  link: string | null;
  stack: string[];
  sections: CaseStudySection[];
  screenshots: Screenshot[];
};

export const projects: Project[] = [
  {
    id: "dropatrack",
    name: "DropATrack",
    tagline: "A real-time collaborative music room.",
    status: "Live",
    link: "https://dropatrack.vercel.app/",
    stack: ["Next.js", "TypeScript", "Supabase Realtime", "PWA"],
    screenshots: [
      {
        src: "/evidence/dropatrack-live-rooms.png",
        alt: "DropATrack landing page showing two live rooms currently playing",
        width: 3024,
        height: 1738,
      },
      {
        src: "/evidence/dropatrack-room.png",
        alt: "DropATrack room in use — synced video, queue, and live chat between three people",
        width: 3024,
        height: 1738,
      },
    ],
    sections: [
      {
        label: "Overview",
        body: "Paste a YouTube link, it drops into a shared queue, and everyone in the room hears/sees it play in sync, with live chat alongside. Solo-built, live at dropatrack.vercel.app.",
      },
      {
        label: "Problem",
        body: "At the office, background music was common, but the playlist was whatever the person controlling it happened to play — a request just meant asking that person directly. DropATrack started as a way to make that shared: anyone in the room can add to a real queue instead of relying on one person's playlist and word-of-mouth requests. Staying in sync while listening together came along with that — once the queue is shared, everyone hearing the same thing at the same time stops being optional.",
      },
      {
        label: "Role",
        body: "Solo, end-to-end: schema, realtime sync engine, live chat, synced in-room mini-games (Minesweeper, Sudoku), PWA shell, Spotify/YouTube integration, browser extension, and cron-based data lifecycle.",
      },
      {
        label: "Architecture",
        body: "Next.js (App Router) + TypeScript, Supabase for Postgres + Realtime + Storage, Vercel Cron for lifecycle jobs. One Supabase Realtime channel per room carries three kinds of traffic: broadcast (ephemeral play/pause/seek/volume events), presence (who's online, keyed by user_id), and DB change listeners (persistent room/queue state).",
      },
      {
        label: "Key Features",
        body: "Shared queue and synced playback with no login; live chat with images and song-reference cards; Spotify-link resolution to a playable match; YouTube search/trending/curated discovery backed by a rotating API-key pool; a Chrome extension with content scripts for Spotify and YouTube Music; installable PWA; synced Minesweeper/Sudoku mini-games in-room.",
      },
      {
        label: "Engineering Challenges",
        body: "One connected client is elected \"source\" — the one actually playing audio — and every 10 seconds writes its true position to the database. Every other client computes an expected position locally as anchor + elapsed time, measured with performance.now() rather than wall-clock time, so a wrong system clock can't throw it off. A speaker that isn't the source seeks back in line if it drifts past 1.5 seconds. A second problem: early on, joining a room mid-song meant starting from 0 while everyone else was already partway through — fixed by tracking a current-playback-timestamp.",
      },
      {
        label: "Decisions & Trade-offs",
        body: "Anchor-plus-drift-correction instead of true clock synchronization — simpler to reason about, and 1.5s tolerance is imperceptible for shared listening. No accounts, to keep the \"paste a link, join instantly\" experience — the real cost: Postgres RLS is enabled on every table but every policy is USING (true), so identity and role checks live in the application layer, not the database. A reasonable trade for a disposable, auto-expiring room product, but a real limitation, not a security feature.",
      },
      {
        label: "Result",
        body: "Still in regular use at the office for playing music. Also used with a long-distance partner to listen to the same music together — a use case that didn't exist when it was built. It's spread past that too: after sharing it on Threads, some people outside started using it at their own offices as well.",
      },
      {
        label: "Lessons",
        body: "Sync has to be designed in from the start — the initial version had no shared position tracking. And with a database that isn't meant to hold data forever, figuring out how long different kinds of data should live: inactive rooms expire after a set time, and uploaded images get cleaned up on their own daily schedule.",
      },
    ],
  },
  {
    id: "ikgo",
    name: "IKGO",
    tagline: "A Monopoly-style board game for learning Korean.",
    status: "In closed testing",
    link: null,
    stack: ["Flutter", "Supabase", "Next.js", "PostgreSQL"],
    screenshots: [
      {
        src: "/evidence/ikgo-home.png",
        alt: "IKGO mobile app home screen with Indonesian UI, learning progress, and multiplayer entry points",
        width: 1684,
        height: 1012,
      },
    ],
    sections: [
      {
        label: "Overview",
        body: "A Monopoly-style board game for learning Korean vocabulary — Flutter mobile client with Indonesian UI, real-time multiplayer, plus a Next.js CMS for authoring content.",
      },
      {
        label: "Problem",
        body: "The original request was a Monopoly-based GBL (game-based-learning) app for Korean. The first version just popped up a question whenever a player landed on a board square. From there, the concept was explored and expanded into a real GBL product with learning features beyond the quiz — vocabulary content, learning modules, progress tracking, and a CMS to manage it all.",
      },
      {
        label: "Role",
        body: "The main driving force behind all three repos — mobile, backend, and CMS — leading the exploration, architecture decisions, and the majority of the hands-on implementation, from a simple feature request into the full game.",
      },
      {
        label: "Architecture",
        body: "Flutter client with 8 separate BLoCs, one per concern (game_init, first_roll, game, dice, quiz, property, card, jail) — no mega-bloc. Repositories are interfaces resolved through a service locator; every realtime event maps to a typed model. Backend: Supabase Postgres + Auth, with ~26 separate Edge Functions — one per player action — rather than one monolithic API. CMS: a full Next.js internal platform covering vocabulary, quiz questions, cards, curriculum, and compliance requests.",
      },
      {
        label: "Key Features",
        body: "Full Monopoly ruleset fused with a GBL quiz-as-economy layer — every square landing triggers a Korean-vocabulary question, and answering correctly grants real gameplay effects (rent discount, tax waiver, purchase discount), watched read-only by other players in spectator mode. Beyond that: bot opponents that play through the exact same backend actions as real players; server-enforced turn timeouts that force-skip an AFK player; an item/power-up system; and animation/warmup handshake signals. The CMS covers the whole curriculum pipeline — topics/episodes with audio upload, vocabulary with KRDict + AI-drafted entries, quiz questions, and cards with AI-assisted translation.",
      },
      {
        label: "Engineering Challenges",
        body: "The quiz couldn't be a bolt-on — its outcome changes the game's economy, so one Edge Function resolves the question, applies the resulting balance/discount effect, and resolves the square in a single round-trip. Chance/Community cards are shuffled once server-side per game and stored as an ordered list with a cursor, so every player draws from the same deterministic sequence. Bot opponents added a real bug: bot_tick wrote simulated answers to player_answers on every game, but the real human answer-submission path never did the same write — real players' word-learned counts silently reset to 0 after their first match. A pre-launch audit caught it, fixed by mirroring the bot's insert into the real path.",
      },
      {
        label: "Decisions & Trade-offs",
        body: "Eight BLoCs instead of one large state machine — each concern stays testable in isolation, at the cost of an explicit single-owner file to coordinate them. Backend actions as ~26 separate, single-purpose Edge Functions instead of one API service — each action deploys and fails independently, at the cost of more surface area to keep consistent. MVP reconnect is \"rejoin + re-fetch,\" not full mid-game state resume — a scope cut decided up front.",
      },
      {
        label: "Result",
        body: "Not yet released. Built and prepared for Google Play closed testing; no testers yet.",
      },
      {
        label: "Lessons",
        body: "The pre-launch audit surfaced a distinction worth keeping: a value that looks wired — it persists, it displays something — isn't the same as one that's actually wired, with something real producing it and something real consuming it.",
      },
    ],
  },
];

function CaseStudy({ project }: { project: Project }) {
  const hero = project.screenshots[0];
  const secondary = project.screenshots[1];

  return (
    <article>
      {hero && (
        <Image
          src={hero.src}
          alt={hero.alt}
          width={hero.width}
          height={hero.height}
          className={styles.caseHero}
          sizes="760px"
          priority
        />
      )}

      <div className={styles.caseHeader}>
        <div className={styles.caseTitleRow}>
          <h3 className={styles.caseName}>{project.name}</h3>
          <span className={styles.status}>{project.status}</span>
        </div>
        <p className={styles.caseTagline}>{project.tagline}</p>
        <div className={styles.stackRow}>
          {project.stack.map((tech) => (
            <span className={styles.stackTag} key={tech}>
              {tech}
            </span>
          ))}
        </div>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener" className={styles.liveLink}>
            View live ↗
          </a>
        )}
      </div>

      <div className={styles.caseBody}>
        {project.sections.map((section) => (
          <section className={styles.caseSection} key={section.label}>
            <h4 className={styles.caseSectionLabel}>{section.label}</h4>
            <p className={styles.caseSectionBody}>{section.body}</p>
            {section.label === "Key Features" && secondary && (
              <Image
                src={secondary.src}
                alt={secondary.alt}
                width={secondary.width}
                height={secondary.height}
                className={styles.caseInlineImage}
                sizes="680px"
              />
            )}
          </section>
        ))}
      </div>
    </article>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (id: string) => void;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardName}>{project.name}</h3>
          <p className={styles.cardTagline}>{project.tagline}</p>
        </div>
        <span className={styles.status}>{project.status}</span>
      </div>

      <div className={styles.stackRow}>
        {project.stack.map((tech) => (
          <span className={styles.stackTag} key={tech}>
            {tech}
          </span>
        ))}
      </div>

      <div className={styles.cardActions}>
        <button type="button" className={styles.toggle} onClick={() => onOpen(project.id)}>
          read_case_study() <span className={styles.arrow}>→</span>
        </button>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener" className={styles.liveLink}>
            live ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const ref = useScrollReveal<HTMLDivElement>({ stagger: `.${styles.card}` });
  const openProject = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="work" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.figLabel} aria-hidden="true">
          FIG.03
        </div>
        <h2 className={styles.heading}>Selected Work</h2>
        <div className={styles.cardList} ref={ref}>
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} onOpen={setOpenId} />
          ))}
        </div>
      </div>

      {openProject && (
        <Overlay onClose={() => setOpenId(null)}>
          <CaseStudy project={openProject} />
        </Overlay>
      )}
    </section>
  );
}
