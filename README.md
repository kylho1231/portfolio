# Jhon Kylho Estrabo — Portfolio

A personal portfolio highlighting selected academic and community projects, background, and areas of interest.

## Experience

- Dark forest studio hero, oversized editorial typography, framed portrait, and a responsive layout.
- Three project tabs with keyboard navigation, previous/next controls, live position updates, and project detail dialogs.
- Local interactive concepts: franchise verification, release tracking, and a scholarship document checklist. All concept data is illustrative.
- Toolkit filters, expandable process steps, active section navigation, and reading progress.
- Light and dark themes that respect the system preference and remember a manual selection when storage is available.
- Searchable quick navigation with **Ctrl+K** on Windows or **Command+K** on macOS.
- Philippines local time, LinkedIn contact, and portfolio link copying on a published site.

Motion respects the visitor's reduced-motion setting. No project backend, account, or build dependency is required.

## Run locally

Open `index.html` in a browser. The portfolio is a static site and does not require a build step.

To preview over HTTP, run `python -m http.server 5173` from this directory, then visit `http://localhost:5173`.

## Deployment

GitHub Actions publishes the site to GitHub Pages when changes are pushed to `main`. The workflow is in `.github/workflows/deploy-pages.yml`.
