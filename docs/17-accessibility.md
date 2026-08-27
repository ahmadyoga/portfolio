# Accessibility

The portfolio must be accessible without sacrificing visual quality.

## Requirements

- semantic HTML
- keyboard navigation
- visible focus states
- accessible buttons
- accessible links
- sufficient contrast
- meaningful alt text
- correct heading hierarchy

## Reduced Motion

Support:

```css
@media (prefers-reduced-motion: reduce)
```

When enabled:

- disable complex scroll animations
- disable parallax
- reduce transitions
- preserve content order
- preserve usability

## Mobile

All important interactions must work without:

- hover
- custom cursor
- precise pointer movement

Touch users must receive equivalent functionality.
