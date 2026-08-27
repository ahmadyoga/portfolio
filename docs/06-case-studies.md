# Project Case Studies

## Purpose

The case study is the most important content layer.

Do not only say:

> "I built X with Flutter."

Show how Ahmad thinks.

## Required Structure

Every major project should have:

### 1. Overview

What is the project?

### 2. Problem

What problem was being solved?

### 3. Role

What did Ahmad personally do?

### 4. Architecture

How does the system work?

### 5. Key Features

What was actually built?

### 6. Engineering Challenges

What made the project technically difficult?

### 7. Decisions / Trade-offs

Why were certain technical choices made?

### 8. Result

Only verified results.

### 9. Lessons

What was learned?

## Architecture Visualization

Do not present architecture only as plain text.

For example:

```text
             Flutter App
                  │
        ┌─────────┴─────────┐
        ↓                   ↓
     Game UI            Game Logic
        │                   │
        └─────────┬─────────┘
                  ↓
               Supabase
            ┌─────┼─────┐
            ↓     ↓     ↓
        Database Realtime Auth
                  │
                  ↓
              Next.js CMS
```

Animate the diagram when it enters the viewport.

Possible sequence:

1. nodes fade in
2. connections draw
3. data-flow indicators move
4. labels appear sequentially

The animation should help explain the architecture.

## Product Walkthrough

Where real screenshots exist, create an animated product walkthrough.

Instead of:

```text
[screenshot]
```

prefer:

```text
PHONE MOCKUP

screen 1
   ↓
screen 2
   ↓
screen 3
   ↓
screen 4
```

Possible behavior:

- device frame remains fixed
- UI transitions inside the device
- scroll controls progression
- screenshots move smoothly

Do not fabricate screenshots.
