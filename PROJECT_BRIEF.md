# ThorVG Homepage Renewal Brief

## Goal

- Rebuild the `https://www.thorvg.org/` homepage from scratch.
- Keep existing content as much as possible while renewing the information architecture and UI.
- Implement the site responsively with both dark and light mode support.
- Separate styling into CSS files.

## Confirmed Navigation

Main navigation:

- `Home`
- `About`
- `Showcase`
- `Docs`
- `Blog`
- `Tools`
- `Deep Wiki`

Secondary link:

- `Release`

Sub-navigation:

- `Docs`
  - `Tutorial`
  - `APIs`
- `Tools`
  - `Playground`
  - `Viewer`

## URL Structure

- `/`
- `/about`
- `/showcase`
- `/docs`
- `/docs/tutorial`
- `/docs/apis`
- `/blog`
- `/tools`
- `/tools/playground`
- `/tools/viewer`
- `Deep Wiki`: external link
- `Release`: external link

## Page Roles

- `Home`: keep the current homepage concept, but make it serve as the main hub.
- `About`: keep the current About content mostly as-is.
- `Showcase`: keep the current Showcase page and content.
- `Docs`: hub page for `Tutorial` and `APIs`.
- `Docs > Tutorial`: keep the existing tutorial content.
- `Docs > APIs`: keep the existing API content.
- `Blog`: keep the existing blog structure and purpose.
- `Tools`: hub page for `Playground` and `Viewer`.
- `Tools > Playground`: keep the existing playground purpose/content.
- `Tools > Viewer`: keep the existing viewer purpose/content.
- `Deep Wiki`: external link.
- `Release`: GitHub Releases external link.

## About Page Section Order

1. `About ThorVG`
2. `Supported Platforms`
3. `Structural Design`
4. `Render Backends`
5. `Threading`
6. `Smart Rendering`
7. `SVG`
8. `Lottie`
9. `ThorVG Viewer`
10. `In Practice`
11. `Contributors`
12. `Sponsors`

## Implementation Principles

1. Support both dark mode and light mode.
2. Ensure responsive layouts that do not break on mobile.
3. Keep styles separated into CSS files.
4. Preserve existing content wherever possible.
5. Focus changes on information architecture and UI rather than rewriting content.

## Notes

- Detailed page-by-page content will be provided later.
- At this stage, prioritize structure and layout planning first.
