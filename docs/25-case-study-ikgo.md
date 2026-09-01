# Case Study — IKGO (Monopoli IKGO)

Personal project (originated from a feature request, then expanded through Ahmad's own exploration). Not yet released — in Play Store closed-testing prep. Repos: `~/Documents/ikgo/{ikgo-mobile,ikgo-be,ikgo-cms}`.
All technical claims below verified against the actual repos — see `23-master-data.md` §3/§6/§6b for the verification trail, including two corrections made along the way (a stale Flame-engine claim in the repo's own docs, and the "solo" framing).

## 1. Overview
IKGO is a Monopoly-style board game for learning Korean vocabulary — Flutter mobile client with Indonesian UI, real-time multiplayer, plus a Next.js CMS for authoring content.

## 2. Problem
The original request was a Monopoly-based GBL (game-based-learning) app for Korean. The first version just popped up a question whenever a player landed on a board square. From there, Ahmad explored and expanded it himself until it became a real GBL product with learning features beyond the quiz — vocabulary content, learning modules, progress tracking, and a CMS to manage it all.

## 3. Role
The main driving force behind all three repos — mobile, backend, and CMS — leading the exploration, architecture decisions, and the majority of the hands-on implementation, from a simple feature request into the full game.

## 4. Architecture
Flutter client with 8 separate BLoCs, one per concern (`game_init, first_roll, game, dice, quiz, property, card, jail`) — no mega-bloc. Repositories are interfaces resolved through a service locator; every realtime event maps to a typed model. Backend: Supabase Postgres + Auth, with **~26 separate Edge Functions** — one per player action (room lifecycle: create/join/start/leave; turn actions: roll dice, submit answer, buy/mortgage/build houses; jail; item use; bot simulation; timeout enforcement) — rather than one monolithic API. CMS: a full Next.js internal platform, not just a vocabulary editor — vocabulary (KRDict lookup + AI-drafted entries), quiz questions, Chance/Community cards (with AI-assisted translation), a structured curriculum of topics/episodes with an audio-upload pipeline, economy tuning, user management, stats, and Play Store account-deletion compliance requests. The board renders as plain Flutter widgets.

## 5. Key Features
Full Monopoly ruleset fused with a GBL quiz-as-economy layer — every square landing triggers a Korean-vocabulary question, and answering correctly grants real gameplay effects (rent discount, tax waiver, purchase discount), watched read-only by other players in spectator mode. Beyond that: bot opponents that play through the exact same backend actions as real players; server-enforced turn timeouts that force-skip an AFK player instead of stalling the game; an item/power-up system; and animation/warmup handshake signals that keep every client's board visually in sync, not just data-in-sync. On the content side, the CMS covers the whole curriculum pipeline — topics/episodes with audio upload, vocabulary with KRDict + AI-drafted entries, quiz questions, and cards with AI-assisted translation.

## 6. Engineering Challenges
Growing past "add a question per square" meant the quiz couldn't be a bolt-on — its outcome changes the game's economy, so one Edge Function resolves the question, applies the resulting balance/discount effect, and resolves the square in a single round-trip. Keeping the board fair across clients meant Chance/Community cards are shuffled once server-side per game and stored as an ordered list with a cursor, so every player draws from the same deterministic sequence. Bot opponents added a real synchronization problem: since they need to play through the identical action pipeline as humans, a bug surfaced where `bot_tick` wrote simulated answers to `player_answers` on every game, but the real human answer-submission path never did the same write — so real players' word-learned counts silently reset to 0 after their first match. A pre-launch audit caught it, fixed by mirroring the bot's insert into the real path. The same audit removed several screens quietly showing hardcoded data, guided by a rule from that audit: a display value only counts as real once something genuine produces it *and* something genuine consumes it.

## 7. Decisions / Trade-offs
Eight BLoCs instead of one large state machine — each concern stays testable in isolation, at the cost of an explicit single-owner file (`game_page.dart`) to coordinate them without merge conflicts. Backend actions as ~26 separate, single-purpose Edge Functions instead of one API service — each action deploys and fails independently, at the cost of more surface area to keep consistent (which is exactly where the bot/human write-path bug came from). MVP reconnect is "rejoin + re-fetch," not full mid-game state resume — a scope cut decided up front.

## 8. Result
Not yet released. Built and prepared for Google Play closed testing; no testers yet.

## 9. Lessons
The pre-launch audit surfaced a distinction worth keeping: a value that *looks* wired — it persists, it displays something — isn't the same as one that's *actually* wired, with something real producing it and something real consuming it. The bot/human write-path bug above only showed up because of a systematic check for exactly that gap.
