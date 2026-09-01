# Case Study — DropATrack

Personal project. Live at https://dropatrack.vercel.app/. Repo: `~/Documents/dropatrack/dropatrack`.
All technical claims below verified against the actual repo (not just the CV bullet) — see `23-master-data.md` §3/§6 for the verification trail, including the one correction made to the original CV wording (RLS/role claim).

## 1. Overview
DropATrack is a real-time collaborative music room — paste a YouTube link, it drops into a shared queue, and everyone in the room hears/sees it play in sync, with live chat alongside. Solo-built, live at dropatrack.vercel.app.

## 2. Problem
At the office, background music was common, but the playlist was whatever the person controlling it happened to play — a request just meant asking that person directly. DropATrack started as a way to make that shared: anyone in the room can add to a real queue instead of relying on one person's playlist and word-of-mouth requests. Staying in sync while listening together came along with that — once the queue is shared, everyone hearing the same thing at the same time stops being optional.

## 3. Role
Solo, end-to-end: schema, realtime sync engine, live chat, synced in-room mini-games (Minesweeper, Sudoku), PWA shell, Spotify/YouTube integration, browser extension, and cron-based data lifecycle. No team, personal project.

## 4. Architecture
Next.js (App Router) + TypeScript, Supabase for Postgres + Realtime + Storage, Vercel Cron for lifecycle jobs. One Supabase Realtime channel per room (`room:{slug}`) carries three kinds of traffic: **broadcast** (ephemeral events — play/pause/seek/volume, fire-and-forget), **presence** (who's online, keyed by `user_id` so multi-tab doesn't duplicate a user), and **DB change listeners** (persistent state — the `rooms` row and `queue_items` re-sync on any change).

## 5. Key Features
Shared queue and synced playback with no login; live chat with images and song-reference cards; Spotify-link resolution to a playable match; YouTube search/trending/curated discovery backed by a rotating API-key pool to survive quota limits; a Chrome extension with content scripts for Spotify and YouTube Music so tracks can be queued straight from those sites; installable PWA; synced Minesweeper/Sudoku mini-games in-room.

## 6. Engineering Challenges
The core problem: keep playback in sync across clients with no media server and no shared clock. The mechanism (verified in `usePlaybackSync.ts`): one connected client is elected **source** — the one actually playing audio through the YouTube IFrame API — and every 10 seconds it writes its true position to the `rooms` table. Every other client computes an *expected* position locally as `anchor position + elapsed time since the anchor arrived`, measured with `performance.now()` rather than wall-clock time, so a wrong system clock can't throw it off. A speaker that isn't the source checks its real position against that expected value every 500ms and seeks back in line if it drifts past **1.5 seconds** — the exact number on the CV, traced to `DRIFT_THRESHOLD_SECONDS = 1.5` in the code. Plain listeners never touch a real player; they just interpolate the anchor to draw a progress bar.

A second, less visible problem: this wasn't sync-aware from day one. Early on, joining a room mid-song meant starting that song from 0 while everyone else was already partway through — fixed by tracking a current-playback-timestamp so a join or refresh resumes at the actual shared position instead of restarting the track.

## 7. Decisions / Trade-offs
Anchor-plus-drift-correction instead of true clock synchronization (NTP-style) — simpler to reason about, and 1.5s tolerance is imperceptible for shared listening. No Supabase Auth / no accounts, to keep the "paste a link, join instantly" experience — the real cost: Postgres RLS is enabled on every table but every policy is `USING (true)`, so identity and role checks (who's a speaker, who's admin) live in the application layer, not the database. Reasonable for a disposable, auto-expiring room product, but a real limitation worth being upfront about, not a security feature. Data lifecycle was also a deliberate design point once it became clear Supabase storage isn't meant to hold everything forever: inactive rooms expire after 30 minutes, and uploaded chat images get swept separately on their own daily schedule.

## 8. Result
Still in regular use at the office for playing music. Ahmad also uses it with his partner, currently long-distance, to listen to the same music together — a use case that didn't exist when he built it, since they weren't together yet at the time. It's spread past that too: after sharing it on Threads, some people outside started using it at their own offices as well.

## 9. Lessons
Two things stood out. First, sync itself has to be designed in from the start — the initial version had no shared position tracking, so joining mid-song meant starting from 0 while everyone else was already partway through; adding a current-playback-timestamp fixed that. Second, data lifecycle — with a database that isn't meant to hold data forever, figuring out how long different kinds of data should actually live: inactive rooms expire after a set time, and uploaded images get cleaned up on their own daily schedule, rather than assuming storage is free to leave full indefinitely.
