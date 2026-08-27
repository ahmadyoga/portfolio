# Performance

Performance is a first-class requirement.

## Rules

- lazy-load heavy assets
- optimize images
- avoid unnecessary JavaScript
- avoid huge WebGL scenes
- use GPU-friendly transforms
- avoid unnecessary layout animation
- animate transform/opacity where possible
- use `will-change` carefully
- avoid huge blur filters
- avoid excessive DOM complexity

## Mobile Performance

The site must remain usable on a mid-range mobile device.

Do not assume a high-end MacBook or desktop GPU.

## Animation Performance

Animation should not cause:

- visible frame drops
- scroll jank
- long input latency
- excessive CPU/GPU usage

Prefer short, composited animations.

## External APIs

If GitHub or another external service is used:

- fail gracefully
- avoid blocking page rendering
- provide sensible fallback content
- do not make the whole website dependent on the service
