# Content Source — All Sections (UI-agnostic)

Verbatim content currently live in the site, extracted from components as of
2026-09-01. Use this as the single source of truth when redesigning the UI —
content stays, layout/visuals change.

---

## Nav / Brand

- Brand: `ahmad-yoga/portfolio` `@main`
- Nav links: `01_work` (#work) · `02_roadmap` (#roadmap) · `03_skills` (#skills) · `github↗` (external) · `contact()` (#contact)

## Hero

- Badge row: **Mobile Software Engineer** · Bandung, ID · 3+ yrs
- Title: **AHMAD YOGA**
- Stack line: `flutter · bloc · supabase · websocket`
- Tagline: "Building reliable mobile products with Flutter — end-to-end features across presentation, business logic, and data layers."
- Runtime record (3 stats): `06` production apps · `02` personal projects · `~1.5s` realtime sync drift
- CTAs: `view_projects() →` · `github ↗` · `contact`
- Featured project teaser: DropATrack — "Real-time collaborative music room" (live, links to #work)
- Stack preview panel:
  - Mobile: Flutter · Dart · Kotlin
  - Backend & Data: REST API · Supabase · PostgreSQL
  - Realtime: WebSocket · Supabase Realtime
  - Footer: `→ full stack` link, "02 projects"

## About

**Short positioning (always visible):**
> I'm a Mobile Software Engineer focused on Flutter and the systems underneath it. I care about production reliability as much as new features — and I build my own things end-to-end when I want to go deeper.

**Toggle label:** `read_full_version() →`

**Full version (expandable/modal, heading "About Ahmad"):**
> Hi, I'm Ahmad. I've spent the last 3+ years building and maintaining production mobile applications, primarily with Flutter — using BLoC, Clean Architecture, REST APIs, and dependency injection to keep business logic testable and independent from whatever's rendering it.
>
> A good part of my day-to-day is also production work itself: chasing race conditions, WebSocket reliability issues, API contract mismatches. That's usually where I learn the most about how a system actually behaves under real use, not just in a demo.
>
> Outside client and employer work, I build things I want to exist. IKGO is a real-time multiplayer learning game with its own CMS; DropATrack is a collaborative music room built around a synchronization engine I designed myself. Both pushed me further into the stack than my day job does — Next.js, Supabase, PostgreSQL, even a browser extension for DropATrack.
>
> I started across Kotlin, Laravel, Vue.js, and .NET before Flutter became my main tool, which is part of why picking up a new part of the stack doesn't worry me. I'm still primarily focused on going deeper into mobile, but I've started getting curious about pushing further into the other parts of the stack I haven't fully explored yet.

## Selected Work (Projects)

Each project renders as a card (name, tagline, status, stack tags, "read_case_study()" toggle, optional live link) that opens a full case study.

### DropATrack
- Tagline: "A real-time collaborative music room."
- Status: **Live** — https://dropatrack.vercel.app/
- Stack: Next.js, TypeScript, Supabase Realtime, PWA
- **Overview:** Paste a YouTube link, it drops into a shared queue, and everyone in the room hears/sees it play in sync, with live chat alongside. Solo-built, live at dropatrack.vercel.app.
- **Problem:** At the office, background music was common, but the playlist was whatever the person controlling it happened to play — a request just meant asking that person directly. DropATrack started as a way to make that shared: anyone in the room can add to a real queue instead of relying on one person's playlist and word-of-mouth requests. Staying in sync while listening together came along with that — once the queue is shared, everyone hearing the same thing at the same time stops being optional.
- **Role:** Solo, end-to-end: schema, realtime sync engine, live chat, synced in-room mini-games (Minesweeper, Sudoku), PWA shell, Spotify/YouTube integration, browser extension, and cron-based data lifecycle.
- **Architecture:** Next.js (App Router) + TypeScript, Supabase for Postgres + Realtime + Storage, Vercel Cron for lifecycle jobs. One Supabase Realtime channel per room carries three kinds of traffic: broadcast (ephemeral play/pause/seek/volume events), presence (who's online, keyed by user_id), and DB change listeners (persistent room/queue state).
- **Key Features:** Shared queue and synced playback with no login; live chat with images and song-reference cards; Spotify-link resolution to a playable match; YouTube search/trending/curated discovery backed by a rotating API-key pool; a Chrome extension with content scripts for Spotify and YouTube Music; installable PWA; synced Minesweeper/Sudoku mini-games in-room.
- **Engineering Challenges:** One connected client is elected "source" — the one actually playing audio — and every 10 seconds writes its true position to the database. Every other client computes an expected position locally as anchor + elapsed time, measured with performance.now() rather than wall-clock time, so a wrong system clock can't throw it off. A speaker that isn't the source seeks back in line if it drifts past 1.5 seconds. A second problem: early on, joining a room mid-song meant starting from 0 while everyone else was already partway through — fixed by tracking a current-playback-timestamp.
- **Decisions & Trade-offs:** Anchor-plus-drift-correction instead of true clock synchronization — simpler to reason about, and 1.5s tolerance is imperceptible for shared listening. No accounts, to keep the "paste a link, join instantly" experience — the real cost: Postgres RLS is enabled on every table but every policy is USING (true), so identity and role checks live in the application layer, not the database. A reasonable trade for a disposable, auto-expiring room product, but a real limitation, not a security feature.
- **Result:** Still in regular use at the office for playing music. Also used with a long-distance partner to listen to the same music together — a use case that didn't exist when it was built. It's spread past that too: after sharing it on Threads, some people outside started using it at their own offices as well.
- **Lessons:** Sync has to be designed in from the start — the initial version had no shared position tracking. And with a database that isn't meant to hold data forever, figuring out how long different kinds of data should live: inactive rooms expire after a set time, and uploaded images get cleaned up on their own daily schedule.
- Screenshots: `/evidence/dropatrack-live-rooms.png` (hero), `/evidence/dropatrack-room.png` (inline, shown under Key Features)

### IKGO
- Tagline: "A Monopoly-style board game for learning Korean."
- Status: **In closed testing** (no live link)
- Stack: Flutter, Supabase, Next.js, PostgreSQL
- **Overview:** A Monopoly-style board game for learning Korean vocabulary — Flutter mobile client with Indonesian UI, real-time multiplayer, plus a Next.js CMS for authoring content.
- **Problem:** The original request was a Monopoly-based GBL (game-based-learning) app for Korean. The first version just popped up a question whenever a player landed on a board square. From there, the concept was explored and expanded into a real GBL product with learning features beyond the quiz — vocabulary content, learning modules, progress tracking, and a CMS to manage it all.
- **Role:** The main driving force behind all three repos — mobile, backend, and CMS — leading the exploration, architecture decisions, and the majority of the hands-on implementation, from a simple feature request into the full game.
- **Architecture:** Flutter client with 8 separate BLoCs, one per concern (game_init, first_roll, game, dice, quiz, property, card, jail) — no mega-bloc. Repositories are interfaces resolved through a service locator; every realtime event maps to a typed model. Backend: Supabase Postgres + Auth, with ~26 separate Edge Functions — one per player action — rather than one monolithic API. CMS: a full Next.js internal platform covering vocabulary, quiz questions, cards, curriculum, and compliance requests.
- **Key Features:** Full Monopoly ruleset fused with a GBL quiz-as-economy layer — every square landing triggers a Korean-vocabulary question, and answering correctly grants real gameplay effects (rent discount, tax waiver, purchase discount), watched read-only by other players in spectator mode. Beyond that: bot opponents that play through the exact same backend actions as real players; server-enforced turn timeouts that force-skip an AFK player; an item/power-up system; and animation/warmup handshake signals. The CMS covers the whole curriculum pipeline — topics/episodes with audio upload, vocabulary with KRDict + AI-drafted entries, quiz questions, and cards with AI-assisted translation.
- **Engineering Challenges:** The quiz couldn't be a bolt-on — its outcome changes the game's economy, so one Edge Function resolves the question, applies the resulting balance/discount effect, and resolves the square in a single round-trip. Chance/Community cards are shuffled once server-side per game and stored as an ordered list with a cursor, so every player draws from the same deterministic sequence. Bot opponents added a real bug: bot_tick wrote simulated answers to player_answers on every game, but the real human answer-submission path never did the same write — real players' word-learned counts silently reset to 0 after their first match. A pre-launch audit caught it, fixed by mirroring the bot's insert into the real path.
- **Decisions & Trade-offs:** Eight BLoCs instead of one large state machine — each concern stays testable in isolation, at the cost of an explicit single-owner file to coordinate them. Backend actions as ~26 separate, single-purpose Edge Functions instead of one API service — each action deploys and fails independently, at the cost of more surface area to keep consistent. MVP reconnect is "rejoin + re-fetch," not full mid-game state resume — a scope cut decided up front.
- **Result:** Not yet released. Built and prepared for Google Play closed testing; no testers yet.
- **Lessons:** The pre-launch audit surfaced a distinction worth keeping: a value that looks wired — it persists, it displays something — isn't the same as one that's actually wired, with something real producing it and something real consuming it.
- Screenshot: `/evidence/ikgo-home.png` (hero only)

## Career Roadmap

### Ganesha Operation — Mobile Developer, 2025 — Present
Stack: Flutter
- Develop and maintain 6 production Flutter applications within a 5-person mobile team.
- Implement end-to-end features across presentation, business logic, and data layers using BLoC, Clean Architecture, REST APIs, and dependency injection.
- Build and maintain real-time multiplayer gameplay, attendance, reporting, registration, and learning workflows.
- Diagnose and resolve production issues — race conditions, API contract mismatches, session state, WebSocket reliability, and platform/build compatibility.
- Independently designed and built a real-time event application in an 11-day sprint — WebSocket communication, session persistence, reconnect handling, operator controls — used at an internal company event without reported issues.

### Refactory — Junior Software Developer, 2023 — 2025
Stack: Flutter · Kotlin · Laravel · Vue.js · Next.js · .NET
- Developed mobile, frontend, backend, and full-stack solutions across multiple client projects, adapting to different existing codebases and technology stacks.
- Built mobile features and REST API integrations with Flutter and Kotlin, while contributing to backend services using Laravel, .NET, and CodeIgniter.
- Selected projects: AladinMall (Kotlin mobile development), SEV-2 (GraphQL, XMPP, mobile app revamp), and HRIS MyTok (Flutter + Laravel).

## Stack

Six categories, each rendered as chips; a chip shows "→ project name(s)" when that tech is used in a case study project (DropATrack/IKGO), derived automatically from each project's `stack` array.

- **Mobile:** Flutter, Dart, Kotlin
- **Architecture:** BLoC, Clean Architecture, Dependency Injection
- **Backend & Data:** REST API, Laravel, Supabase, PostgreSQL, SQL
- **Realtime:** WebSocket, Supabase Realtime
- **Web:** Next.js, Vue.js, TypeScript, JavaScript
- **Tools:** Git, Firebase, Gradle

## GitHub

- Heading: "GitHub" with link `github.com/ahmadyoga ↗`
- Live-fetches up to 6 most-recently-pushed, non-fork public repos from the GitHub API (name, description, language, pushed date — no hardcoded copy).
- Fallback text (if API fails): "Repositories are best viewed directly on github.com/ahmadyoga ↗"

## Contact

- Eyebrow: "Contact"
- Headline: "Got something worth building?"
- Subline: "A blank canvas, or one that's already been drawn on — I can work with both."
- CTA button: "Let's talk →" (mailto:ahmadyoga684@gmail.com)
- Link list: Email (ahmadyoga684@gmail.com) · GitHub (github.com/ahmadyoga) · LinkedIn (linkedin.com/in/ahmadyogadev) · Resume ("Download PDF ↓", `/resume.pdf`)
- Footer: "ahmad-yoga/portfolio" · "© 2026 Ahmad Yoga Witdodo"

---

## Notes for a UI redesign

- No phone number anywhere — never provide one.
- No user-count/DAU figures anywhere (Ganesha Operation) — deliberate, per prior decision.
- No individual company-app names (GOtim, GO Expert variants, Rakernas/`battle_rakernas`) — those stay CV-only, never named in the roadmap copy above.
- Only DropATrack and IKGO get case-study treatment; nothing else does.
- Section anchors used in nav: `#work`, `#roadmap`, `#skills`, `#contact`, `#about` (About has no nav entry currently but has its own `id="about"`).
