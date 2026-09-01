# Master Data — Source of Truth

Extracted from `public/resume.pdf` (locked CV) plus the actual source repos at
`~/Documents/{GO,ikgo,dropatrack}` (Ahmad pointed to these directly — technical
detail below is verified against real code, not inferred).
Legend: 🟢 verified & publishable · 🟡 verified, needs wording · 🟠 needs confirmation from Ahmad · 🔴 do not use.

## 1. Person

| Field | Value | Status |
|---|---|---|
| Name | Ahmad Yoga Witdodo | 🟢 |
| Role | Mobile Software Engineer \| Flutter | 🟢 |
| Location | Bandung, Indonesia | 🟢 |
| Email | ahmadyoga684@gmail.com | 🟢 |
| GitHub | github.com/ahmadyoga | 🟢 |
| LinkedIn | linkedin.com/in/ahmadyogadev | 🟢 |
| Years of experience | 3+ years (CV states this explicitly — don't recompute independently) | 🟢 |

Positioning line (from CV summary, needs a one-sentence trim for hero):
> "Mobile-focused Software Engineer with 3+ years of experience building and maintaining production applications, primarily with Flutter."

## 2. Experience

### Ganesha Operation — Mobile Developer, 2025–Present
- Flutter, 5-person mobile team, **6 production Flutter applications** — confirmed by name (Ahmad, 2026-08-29): `flutter-go-expert` (pubspec `gokreasi_new`), `go_expert_ortu`, `go-tim` (pubspec `goteam`), `go-expert-tobk` (pubspec `flutter_go_expert_tobk`), `flutter-goex-tcr-new` (pubspec `go_expert_cr`), and `battle_rakernas` 🟢. `flutter_embed_demo`, `split_embed_demo`, `kiosk_launcher` are confirmed **not** part of the 6 (internal tooling/demos).
- CV also mentions "thousands of students nationwide and approximately 6,000 employees" — **decision: do not publish this number** (Ahmad, 2026-08-29 — doesn't want it shown). Do not put any user-count figure on the portfolio for Ganesha Operation. 🔴
- End-to-end features: presentation/business-logic/data layers, BLoC, Clean Architecture, REST APIs, DI 🟢
- Feature areas: real-time multiplayer gameplay, attendance, reporting, registration, learning workflows 🟢
- Production debugging: race conditions, API contract mismatches, session state, WebSocket reliability, platform/build compatibility 🟢
- **Rakernas app** (`battle_rakernas`): solo-built in an **11-day sprint**, WebSocket comms, session persistence, reconnect handling, operator controls, testing; "used during the internal event without reported issues" 🟢. **Not app-store distributed** — Ahmad personally operated/held the device during the event instead of shipping it as an installable release (Ahmad, 2026-08-29). This is a real, usable detail for the case study (hands-on ownership through the actual event, not just "shipped and walked away").

### Refactory — Junior Software Developer, 2023–2025
- Stack: Flutter, Kotlin, Laravel, Vue.js, Next.js, .NET 🟢
- Client projects: AladinMall (Kotlin mobile), SEV-2 (GraphQL, XMPP, app revamp), HRIS MyTok (Flutter + Laravel) 🟢

## 3. Personal Projects

### IKGO — Educational Korean Learning Game ("Monopoli IKGO")
Stack: Flutter, Supabase, Next.js, PostgreSQL 🟢
- Multiplayer board game: board movement, property mechanics, vocabulary quizzes, turn management, game state — synced via Supabase Realtime 🟢
- CMS for vocabulary/quiz/learning content/game config, integrating KRDict + AI-assisted content generation 🟢
- Prepped for Google Play closed testing: Google Sign-In, account deletion, privacy/ToS, Data Safety form, AAB build 🟢

### DropATrack — Real-time Collaborative Music Room
Repo: `~/Documents/dropatrack/dropatrack`. Stack: Next.js, TypeScript, Supabase Realtime, PWA 🟢
**Live:** https://dropatrack.vercel.app/ 🟢 — confirmed working public deployment, safe to link directly instead of just screenshots.
- Custom playback sync engine, host-less elected time-source model, clients stay within **~1.5s** despite clock drift/network latency 🟢 — verified in code: `DRIFT_THRESHOLD_SECONDS = 1.5` in `components/room/hooks/usePlaybackSync.ts`, the exact constant the CV number comes from
- Anonymous identity + role-based authorization — **wording corrected (Ahmad, 2026-08-31): write as implemented, not as CV phrased it.** Checked code: no `supabase.auth.signInAnonymously()` anywhere — "anonymous identity" is a client-generated random username + user_id (e.g. presence shows names like "Kampret Kesleo 46"). RLS is **enabled** on `rooms`/`queue_items`/`chat_messages` but every policy is `USING (true)` — no `auth.uid()` check anywhere in the codebase. Role/permission logic (`user_roles` JSONB, `default_role`) is enforced in the **application layer**, not the database layer. 🟡 accurate wording: "RLS enabled as a baseline; identity and role logic enforced client/app-side" — do not say "role-based RLS" or imply DB-level per-user enforcement.
- Owned end-to-end: schema, realtime architecture, live chat, synced multiplayer mini-games, responsive PWA UX 🟢
- **Sync mechanism detail** (from `.agents/skills/sync-engine/SKILL.md` + `usePlaybackSync.ts`, verified): one elected "source" client (the actual speaker whose YouTube player is authoritative) writes real playback position to the `rooms` table every 10s. All other clients compute an "expected position" locally from that anchor (`base + elapsed since receivedAt`, using `performance.now()` — monotonic, so immune to wall-clock skew). Non-source speakers self-correct via `seekTo()` when their real position drifts >1.5s from expected; pure listeners just interpolate the anchor for display, no real playback. This is the real mechanism behind "host-less elected time-source model." 🟢
- **Spotify integration** — confirmed real, `app/api/spotify/resolve/route.ts` 🟢 (was 🔴/unconfirmed before code check)
- **YouTube integration** — confirmed real, multiple routes: `app/api/youtube/{playlists,search,trending,curated,fresh,latest,keys/stats}` + `lib/youtube.ts`, `lib/keys/youtubeKeyRotation.ts` (API key rotation pool) 🟢
- **Cron jobs** — confirmed real, `app/api/cron/{cleanup,keepalive}/route.ts`, `app/api/rooms/cleanup/route.ts`, scheduled via `vercel.json` 🟢
- **Browser extension** — confirmed real, `extension/` dir: content scripts for Spotify (`spotify-content.js`) and YouTube Music (`ytmusic-content.js`) — this is a feature not mentioned on the CV at all, worth surfacing in the case study since it's a distinct piece of engineering (cross-origin content script + extension popup talking to the web app)

## 4. Education
SMK Negeri 1 Wonosobo — Software Engineering, 2019–2022 🟢

## 5. Technical Skills (as listed on CV — do not add to this list without a source)
- **Mobile**: Flutter, Dart, Kotlin
- **Architecture**: BLoC, Clean Architecture, Dependency Injection
- **Backend & Data**: REST API, Laravel, Supabase, PostgreSQL, SQL
- **Realtime**: WebSocket, Supabase Realtime
- **Web**: Next.js, Vue.js, TypeScript, JavaScript
- **Tools**: Git, Firebase, Gradle

Not on CV, so 🔴 unless confirmed: Swift, Xcode, Android Studio, iOS (as a shipped platform), Spotify API, YouTube API, cron jobs.

## 6. Metrics table (defensible numbers only)

| Metric | Value | Source | Status |
|---|---|---|---|
| Years of experience | 3+ | CV summary | 🟢 |
| Production apps (current role) | 6 | CV, Ganesha Operation bullet | 🟢 |
| Mobile team size | 5 people | CV | 🟢 |
| Org-wide reach (students/employees count) | — | CV summary | 🔴 **do not publish** — Ahmad's call (2026-08-29), don't show any user-count figure for Ganesha Operation |
| Rakernas build time | 11 days, solo | CV | 🟢 |
| DropATrack sync accuracy | ~1.5s drift tolerance | CV | 🟢 |
| "GOtim" as app name | Real app, repo `~/Documents/GO/go-tim`, pubspec name `goteam`, description "Aplikasi untuk karyawan dan pengajar di Ganesha Operation" (app for employees and teachers) | code (go-tim/pubspec.yaml) | 🟢 name/existence confirmed. User-count question is moot — no number is being published either way. |
| Rakernas app real name | `battle_rakernas` — pubspec description "Battle Rakernas event battle app" (quiz/battle format, not plain attendance) | code (`~/Documents/GO/battle_rakernas/pubspec.yaml`) | 🟢 |
| DropATrack Spotify/YouTube/cron | Real: Spotify resolve endpoint, 7 YouTube API routes + key-rotation pool, 2 cron endpoints, browser extension for both platforms | code (`~/Documents/dropatrack/dropatrack/app/api/**`) | 🟢 — upgraded from 🔴 after checking the actual repo |
| Daily active users of any single app | — | not in CV | 🔴 still unconfirmed — CV gives an org-wide headcount ("~6,000 employees"), not a per-app DAU metric |

## 6b. IKGO origin story (Ahmad, 2026-08-31)

The original request was a Monopoly-based GBL (game-based-learning) app for Korean. The first version just popped up a question whenever a player landed on a board square. From there, Ahmad explored and expanded it himself until it became a real GBL product with learning features beyond the quiz itself — vocabulary content, learning modules, progress tracking, and the CMS to manage all of it. This is the corrected Problem framing for the case study — not "just add a quiz per square," but "grow a Monopoly-GBL concept into a full learning product."

**Correction (Ahmad, 2026-08-31):** `MASTER_CONTEXT.md`'s claim that "Flame is only for `board_preview`" is stale. Checked: no `flame` dependency in `ikgo-mobile/pubspec.yaml`, no `package:flame` import anywhere in `lib/`, no board_preview/flame files. Flame has been removed entirely, not just scoped down. Do not mention Flame at all in the case study — the board is plain Flutter widgets, full stop, no "Flame reserved for preview" framing.

**Role wording (Ahmad, 2026-08-31):** Do not say "solo" for IKGO specifically — Ahmad was the main driving force and did the majority of the hands-on work across all three repos, but wasn't literally the only one touching it. (DropATrack keeps "solo" as-is — that one stays unchanged.) Use framing like "main driver" / "led the majority of the work," not "solo, end-to-end."

## 6c. GitHub public repo check (2026-08-31, via live API fetch)

`api.github.com/users/ahmadyoga/repos` (public, unauthenticated) returns, most-recently-pushed first: `shotgunkeyboard`, `stickerbox`, `dropatrack`, `pacemark`, `remote_mouse`, `ttytok`. **DropATrack is confirmed public.** None of the IKGO repos (`ikgo-mobile`, `ikgo-be`, `ikgo-cms`) appear — despite recent local activity (Aug 2026), so they're almost certainly private. Resolves the earlier open question about repo visibility.

## 7. Open questions for Ahmad — RESOLVED (2026-08-31)

**Decision (Ahmad, 2026-08-31):** No company/work apps get individual treatment on the portfolio at all — not GOtim, not the GO Expert variants, not `battle_rakernas`/Rakernas. Reason: showing internal company work is felt to be risky (confidentiality). That data stays in the CV/resume only (`public/resume.pdf`, already correct as-is).

This resolves and supersedes the old blocking questions about screenshots/repo-visibility/Rakernas — moot, since none of it will be shown in detail on the site.

**New structure decision:** Portfolio splits into two separate things:
- A **career/experience roadmap** section — timeline of roles (Ganesha Operation, Refactory), using only the verified CV bullets from §2. No individual app names, no screenshots, no user-count numbers. This is where all company-work context lives.
- A **Projects** section showing **only personal projects**: IKGO and DropATrack. Nothing else goes here.

## 8. Case studies — finalized (2 total, personal projects only)
1. **DropATrack** — richest verified technical story (realtime sync engine, Spotify/YouTube integration, browser extension, cron jobs), fully public (live URL), personal project — no confidentiality blockers. Lead with this one.
2. **IKGO (Monopoli IKGO)** — verified multiplayer/realtime/CMS story, personal project, no confidentiality issue. `propose.md` in the repo also shows real production-hardening work (removing hardcoded/dummy data pre-launch) — good "engineering maturity" evidence for a challenges/lessons angle.

Not case studies, CV-only (per §7 decision): GOtim, `flutter-go-expert`/`go_expert_ortu`/`go-expert-tobk`/`flutter-goex-tcr-new` (GO Expert variants), `battle_rakernas`/Rakernas. These surface only as timeline bullets in the career roadmap section (§9), never named individually with visuals.

## 9. Career Roadmap section — content (verified CV bullets only)

### Ganesha Operation — Mobile Developer, 2025–Present
- Flutter, 5-person mobile team, maintains 6 production applications
- End-to-end feature work: presentation/business-logic/data layers, BLoC, Clean Architecture, REST APIs, DI
- Feature areas: real-time multiplayer gameplay, attendance, reporting, registration, learning workflows
- Production debugging: race conditions, API contract mismatches, session state, WebSocket reliability, platform/build compatibility
- Independently built a real-time event app in an 11-day sprint (WebSocket, session persistence, reconnect handling, operator controls); used at an internal company event without reported issues — **no app name, no screenshots**

### Refactory — Junior Software Developer, 2023–2025
- Flutter, Kotlin, Laravel, Vue.js, Next.js, .NET across multiple client projects
- Selected work: AladinMall (Kotlin mobile), SEV-2 (GraphQL, XMPP, app revamp), HRIS MyTok (Flutter + Laravel)

No numbers (user counts, employee counts) attached to either role — per §7 decision.
