# Animation Architecture

## Goal

Create an animation system that remains maintainable as the portfolio grows.

Do not scatter animation logic randomly across components.

## Suggested Components

```text
/components
  /motion
    Reveal
    Stagger
    Parallax
    ScrollProgress
    PageTransition
    SplitText
```

Adapt to the actual framework and implementation.

## Suggested Responsibilities

### Reveal

Viewport-based entrance animation.

### Stagger

Sequential child entrance.

### Parallax

Controlled scroll-based movement.

### ScrollProgress

Page or section progress.

### PageTransition

Route-level transition.

### SplitText

Typography reveal where appropriate.

## GSAP Lifecycle

Be careful with:

- cleanup
- route changes
- duplicate ScrollTrigger instances
- event listeners
- stale references
- memory leaks

Animation instances must be properly disposed/reverted.

## Motion Tokens

Create reusable motion constants/tokens where practical:

```text
--motion-fast
--motion-normal
--motion-slow
--ease-out
--ease-spring
```

Avoid arbitrary durations throughout the codebase.

## Animation Rules

Prefer GPU-friendly properties:

- transform
- opacity

Avoid unnecessary animation of layout properties.

Do not use `will-change` everywhere.

Use it only when justified.

## Responsive Animation

Desktop can use:

- hover
- parallax
- horizontal scroll
- cursor interaction
- pinned sections

Mobile should prefer:

- scroll reveals
- touch interactions
- simplified transitions
- reduced parallax
- shorter sequences

Do not force desktop interaction models onto mobile.
