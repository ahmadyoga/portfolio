# Technical Requirements

## Preferred Stack

Use a modern production-ready frontend stack.

Preferred:

- Next.js
- TypeScript
- Tailwind CSS

If the repository already has a strong existing stack, inspect it first and reuse sensible infrastructure.

## General Requirements

- fully responsive
- mobile-first
- accessible
- semantic HTML
- SEO-friendly
- fast loading
- strong Lighthouse performance
- proper metadata
- Open Graph metadata
- favicon
- keyboard accessible navigation
- reduced-motion support

## Component Architecture

Suggested structure:

```text
/components
  /layout
    Navbar
    Footer
    PageTransition

  /hero
    Hero
    HeroVisual

  /projects
    ProjectShowcase
    ProjectCard
    ProjectHero
    ProjectArchitecture
    ProjectWalkthrough

  /sections
    EngineeringApproach
    Skills
    Github
    About
    Contact

  /motion
    Reveal
    Stagger
    Parallax
    ScrollProgress
```

Adapt this structure to the actual application.

## Data-Driven Content

Keep content separate from UI where practical.

Suggested:

```text
/data
  projects.ts
  skills.ts
  experience.ts
```

Projects should be easy to update without rewriting UI components.

## Project Model

A project can follow a structure similar to:

```typescript
type Project = {
  slug: string
  name: string
  description: string
  role?: string
  status?: string
  technologies: string[]
  image?: string
  screenshots?: string[]
  github?: string
  demo?: string

  caseStudy?: {
    overview?: string
    problem?: string
    role?: string
    architecture?: string
    features?: string[]
    challenges?: string[]
    decisions?: string[]
    result?: string
    lessons?: string[]
  }
}
```

Adapt it to the actual content.
