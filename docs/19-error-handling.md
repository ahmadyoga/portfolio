# Error Handling

The portfolio must gracefully handle:

- missing project images
- unavailable GitHub API
- unavailable external resources
- slow network
- reduced-motion mode
- mobile devices
- browser differences
- failed animations

The website must never become unusable because one animation or external API fails.

If an animation fails:

- content must still render
- interaction must remain possible
- layout must remain stable

If GitHub API fails:

- show a static fallback
- preserve GitHub link
- do not show a broken loading state indefinitely
