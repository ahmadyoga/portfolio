# Interaction & Motion System

## Core Principle

Motion is a core design system, not decoration.

Use animation to communicate:

- hierarchy
- continuity
- state changes
- relationships
- depth
- interaction
- progression

Do not animate every element.

## Recommended Tools

### GSAP + ScrollTrigger

Use for:

- page-load choreography
- scroll-driven storytelling
- pinned sections
- parallax
- scrubbed timelines
- horizontal scrolling
- complex timelines
- SVG animation
- large section transitions
- project transitions

### Motion / Framer Motion

Use for:

- hover states
- button interactions
- small UI transitions
- menu transitions
- modal transitions
- layout animations
- spring interactions
- state-based animation

Do not duplicate responsibility unnecessarily.

## Motion Principles

Animations should generally feel:

- smooth
- intentional
- slightly physical
- premium
- restrained

Avoid:

- excessive bouncing
- huge rotations
- random floating
- constant movement
- distracting cursor effects
- excessive blur
- excessive parallax

## Scroll Experiences

Use multiple interaction patterns where appropriate:

### Scroll reveal

Content enters progressively.

### Parallax

Background and foreground elements move at different speeds.

### Pinned storytelling

Use one or two pinned sections for important narratives.

### Horizontal project showcase

Consider a horizontal project sequence controlled by vertical scrolling.

### Progress indicator

Show subtle page or section progress.

### Text transformation

Use typography movement to transition between major sections.

Do not use every technique everywhere.

## Micro-interactions

Buttons:

- hover
- press
- optional subtle magnetic attraction

Links:

- animated underline
- directional arrow movement

Project cards:

- image movement
- metadata transition

Navigation:

- active section indicator
- smooth menu animation

## Custom Cursor

A custom cursor is optional.

If used:

- keep it subtle
- disable on touch devices
- do not interfere with clicking
- do not make it the main attraction

## Reduced Motion

Support:

```css
@media (prefers-reduced-motion: reduce)
```

When enabled:

- disable complex scroll animations
- disable parallax
- disable unnecessary transitions
- preserve content order
- preserve usability

Motion should enhance understanding, never become required for it.
