# Jhon Kylho Estrabo — Personal Portfolio

A personal portfolio highlighting full-stack engineering, Progressive Web Apps (PWA), Android solutions, and community systems.

**Live Portfolio:** Published automatically to GitHub Pages via GitHub Actions.  
**GitHub Profile:** [https://github.com/kylho1231](https://github.com/kylho1231)

---

## Featured Projects

1. **AquaFlow — Water Refill & Station Operations PWA**
   - **Production App (Vercel):** [https://aqua-flow-ochre.vercel.app](https://aqua-flow-ochre.vercel.app)
   - **GitHub Repository:** [https://github.com/kylho1231/AquaFlow](https://github.com/kylho1231/AquaFlow)
   - **Tech Stack:** React 18, TypeScript, Tailwind CSS, Vite, Firebase Firestore, Express / Node.js, WebAuthn Passkeys, PWA, Vercel
   - **Summary:** Mobile-first Progressive Web App built for water refill stations and customers. Features multi-tenant station isolation, Firebase Firestore transactions, biometric WebAuthn passkey authentication, inventory monitoring, and live order dispatch.
   - **Interactive Preview:** In-browser refill ordering simulator with real container selection, live price calculations, and simulated dispatch status transitions.

2. **San Jose TODA — Municipal Fare Calculator & Matrix**
   - **Live Web Portal & Calculator:** [https://kylho1231.github.io/TODA/](https://kylho1231.github.io/TODA/)
   - **GitHub Repository:** [https://github.com/kylho1231/TODA](https://github.com/kylho1231/TODA)
   - **APK Download:** [https://github.com/kylho1231/TODA/releases/latest](https://github.com/kylho1231/TODA/releases/latest)
   - **Platform:** Native Kotlin Android Application (API 37) + PWA Web App
   - **Tech Stack:** Kotlin, Android Studio (API 37), Material Design 3, ViewBinding, Municipal Ordinances 2022-18 & 2024-01
   - **Summary:** Official San Jose de Buenavista TODA Fare Matrix and Fare Calculator app with real-time distance calculations, statutory 20% discounts for students, seniors, and PWDs, pakyaw/solo ride rates, offline matrices, and direct reporting hotlines to San Jose Traffic Management Office (TMO) and PNP.
   - **Interactive Preview:** In-browser Android fare calculator simulation with live route selection, passenger discount chips, pakyaw toggle, regulated fare display, and emergency incident reporting simulation.

3. **SAC ISPSO ScholarLink — Scholarship Portal & Stipend Manager**
   - **Production Portal (Vercel):** [https://sac-ispso.vercel.app](https://sac-ispso.vercel.app) (Admin Console: [https://sac-ispso.vercel.app/admin](https://sac-ispso.vercel.app/admin))
   - **GitHub Repository:** [https://github.com/kylho1231/ISPSO](https://github.com/kylho1231/ISPSO)
   - **Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Lucide React, PWA, Vercel
   - **Summary:** Centralized scholarship management and student portal for St. Anthony’s College (SAC) in Antique. Replaces uncoordinated Facebook announcements with automated 12-digit DepEd LRN anti-fraud validation, digital QR stipend claiming passes for SAC Gym verification, live schedule alerts for UniFAST TES (₱20,000/sem) and TDP-TES (₱7,500/sem), and an AI guidance advisor (Schola).
   - **Interactive Preview:** Live interactive scholarship grant switcher with dynamic grant subsidy amounts, institutional SAC crest, and digital QR stipend claim pass.

4. **MotoRelease — Yamaha OR/CR & License Plate Tracking System**
   - **Production Customer Tracker (Vercel):** [https://motorelease.vercel.app/track](https://motorelease.vercel.app/track) (Staff Console: [https://motorelease.vercel.app/login](https://motorelease.vercel.app/login))
   - **GitHub Repository:** [https://github.com/kylho1231/motorelease](https://github.com/kylho1231/motorelease)
   - **Tech Stack:** Laravel 11 LTS, PHP 8.2+, Tailwind CSS, Alpine.js, MySQL, Semaphore SMS API, Pure PHP QR Engine, RA 10173 Compliance, Vercel
   - **Summary:** Full-stack dealership document and license plate logistics management platform built for motorcycle dealerships (pilot implementation for Yamaha San Jose de Buenavista, Antique). Digitizes the independent lifecycles of Official Receipts (OR), Certificates of Registration (CR), and metal license plates with automated Philippine SMS alerts (Semaphore), QR verification claim passes, masked RA 10173 data privacy gates, and dual physical verification turnover locks. Includes 29 passing automated unit/feature tests.
   - **Interactive Preview:** In-browser reference lookup simulation (`TRK-YAM-2026-0001`, `0002`, `0003`) displaying real-time dual-custody document statuses, masked owner identity data, and dealership pickup passes.

5. **EcoCollect SJ — Municipal Solid Waste Collection & MENRO Portal**
   - **GitHub Repository:** [https://github.com/kylho1231/ecocollect-sj](https://github.com/kylho1231/ecocollect-sj)
   - **Platform:** Native Kotlin Android App (Jetpack Compose) + Web Admin Portal (Next.js 15 App Router)
   - **Tech Stack:** Kotlin, Jetpack Compose, Next.js 15, TypeScript, Tailwind CSS, Cloud Firestore, Material Design 3, RA 9003 Compliance, Clean Architecture
   - **Summary:** Civic solid waste collection, scheduling, tracking, and governance platform for San Jose de Buenavista, Antique (Pilot Barangay: Funda-Dalipe). Enforces an honest data philosophy where unconfirmed timetables remain transparently marked *Awaiting Official Confirmation*, provides full RA 9003 waste segregation education in local Kinaray-a (*Madunot*, *Mabaligya*, *Di-madunot*, *Delikado*), and photo-verified illegal dumping incident ticketing.
   - **Interactive Preview:** In-browser civic schedule simulator with pilot barangay switching (Funda-Dalipe vs Atabay), MENRO verification badge, interactive Kinaray-a waste segregation guide, and citizen incident reporter tracking code.

6. **AntiqueSupply — B2B Regional Marketplace & Supplier Hub**
   - **Production Marketplace (Vercel):** [https://antiquesupply.vercel.app](https://antiquesupply.vercel.app) (Supplier Directory: [https://antiquesupply.vercel.app/suppliers](https://antiquesupply.vercel.app/suppliers))
   - **GitHub Repository:** [https://github.com/kylho1231/antiquesupply](https://github.com/kylho1231/antiquesupply)
   - **Tech Stack:** Next.js 15, React 19, Kotlin (Compose), Supabase / PostgreSQL, TypeScript, Tailwind CSS, Room Database, Vercel
   - **Summary:** Full-stack B2B procurement marketplace, supplier operations hub, and native Android companion application connecting smallholder agricultural cooperatives and artisanal manufacturers across Antique Province (Laua-an Muscovado, Bugasong Patadyong weavers, Tibiao VCO, Pandan Bariw crafts) with commercial buyers and island resorts across Panay Island and Boracay. Features atomic row-level inventory locking in Supabase/PostgreSQL, multi-item Request for Quotation (RFQ) pipelines, and an immutable 6-stage order lifecycle state machine.
   - **Interactive Preview:** In-browser B2B procurement simulator featuring authentic Antique cooperative products, commercial buyer entity selection (Boracay Palms Resort, Panay Bistro), dynamic wholesale price and freight calculations, and interactive order lifecycle state machine dispatch.

7. **AntiqueRide — Smart Transportation and Tricycle Booking Platform**
   - **Production PWA (Vercel):** [https://antiqueride.vercel.app](https://antiqueride.vercel.app) (Commuter Portal: [https://antiqueride.vercel.app/commuter](https://antiqueride.vercel.app/commuter))
   - **GitHub Repository:** [https://github.com/kylho1231/antiqueride](https://github.com/kylho1231/antiqueride)
   - **Tech Stack:** Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4, Leaflet GIS, OpenStreetMap, PostGIS / Supabase, PWA (WebAPK), Vercel
   - **Summary:** Full-stack Progressive Web Application modernizing public tricycle transport, dispatch operations, and commuter safety in San Jose de Buenavista, Antique. Features dedicated role-isolated portals for commuters, TODA drivers, and municipal administrators, real-time OpenStreetMap (Leaflet GIS) terminal routing, Sangguniang Bayan fare matrix enforcement (MO No. 2023-014), mandatory 20% statutory discounts, and 4-digit security pickup PIN matching with passing 35/35 automated acceptance tests.
   - **Interactive Preview:** In-browser smart dispatch and PIN matching simulator with pilot terminal routes across San Jose de Buenavista, statutory passenger discount selector, frozen fare snapshot calculation, and 4-step dispatch state progression (`Dispatch` → `Matched` → `Arrived` → `Started`).

---

## Interactive Features

- **Interactive AquaFlow Simulator:** Select container types (5-Gal Slim vs 5-Gal Round), change quantities with dynamic PHP pricing, and simulate the real-time order lifecycle (Placed → Station Preparation → Dispatched → Delivered).
- **San Jose TODA Municipal Fare Calculator:** Interactive Android simulation calculating exact regulated fares across San Jose de Buenavista routes (Funda-Dalipe, San Angel, Badiang, Madrangca, Maybato) with 20% discounts for students, seniors, and PWDs, pakyaw / solo ride rates, and simulated incident reporting to TMO.
- **SAC ISPSO ScholarLink Grant Switcher & Digital Pass:** Switch between UniFAST TES (₱20,000/sem), TDP-TES (₱7,500/sem), and CAS Working Scholar grants with dynamic grant amounts and digital QR stipend claiming pass for the SAC Gymnasium.
- **MotoRelease Reference Lookup Simulator:** Live interactive dealership tracking preview switching between sample Yamaha vehicle dossiers (`TRK-YAM-2026-0001`, `0002`, `0003`) with dual OR/CR & metal license plate readiness states, masked data privacy compliance, and dealership claiming QR pass.
- **EcoCollect SJ Civic Waste Operations Simulator:** Interactive barangay collection schedule switcher (Funda-Dalipe vs Atabay) with official MENRO confirmation status, 4-tier Kinaray-a waste segregation guide (*Madunot*, *Mabaligya*, *Di-madunot*, *Delikado*), and citizen incident tracker code.
- **AntiqueSupply B2B Procurement & Pipeline Simulator:** Live procurement simulation for commercial buyers on Panay and Boracay Island, featuring wholesale quantity controls, real cooperative catalog selections, and 5-stage order fulfillment pipeline dispatch (`Submitted` → `Confirmed` → `Preparing` → `Dispatched` → `Delivered`).
- **AntiqueRide Smart Dispatch & 4-Digit PIN Simulator:** Real-time tricycle dispatch simulation across San Jose de Buenavista routes with Sangguniang Bayan fare matrix enforcement, statutory 20% discounts, 4-digit pickup PIN generation, and 4-step driver radar tracking.
- **Tactile Sound Effects (Web Audio API):** Clean, synthesized audio feedback on user interactions (tab switching, ordering water, toggling themes, and clicking tools). Easily toggleable via the header button (`🔊 / 🔇`) and saved locally.
- **Interactive Skills Map:** Click any skill chip in the toolkit (Next.js 16, Leaflet GIS, PostgreSQL / PostGIS, Kotlin, Laravel 11, React 19, TypeScript, PHP 8.2, Firebase, Tailwind CSS, etc.) to reveal how Jhon applied it in real-world projects, with a 1-click jump button to the relevant project.
- **Code Playground with One-Click Copy:** Explore architectural mindsets across *Build*, *Design*, *Engineer (PWA)*, and *Learn* with a copy button that copies the snippet directly to your clipboard.
- **Category Filter Pills:** Switch between *All (7)*, *PWA & Cloud (5)*, *Android (3)*, and *Civic & Mobility (5)* to quickly focus on specific engineering domains.
- **Quick Command Palette (`Ctrl+K` or `⌘ K`):** Instant keyboard navigation to projects, themes, sound settings, GitHub profile, and color accents.
- **Interactive Contact Experience:** Pre-select inquiry topics (*Project Collaboration*, *Job / Internship*, *Saying Hello*) to generate pre-filled email links, copy the email address, or connect on LinkedIn and GitHub.
- **Themes & Palettes:** Dark editorial mode by default, light mode toggle, and three selectable accents (Lime, Coral, Sky).
- **Smooth Motion & Accessibility:** Respects `prefers-reduced-motion: reduce` for all animations and sound effects.

---

## How to Add a New Project in the Future

Whenever you finish a new project, follow these 3 simple steps:

### 1. Add your project details in `portfolio.js`
Under the `projects` object, add a new entry:
```js
myproject: {
  title: "My Project Name",
  category: "05 / CATEGORY",
  intro: "Short summary sentence.",
  need: "The problem this project solves.",
  approach: "The technical solution and architecture.",
  tools: ["React", "Node.js", "..."],
  live: "https://your-vercel-or-live-site.app", // optional
  repo: "https://github.com/kylho1231/your-repo" // optional
}
```

### 2. Add the tab and panel in `index.html`
- In `<div class="project-tabs">`, add a `<button class="project-tab" id="tab-myproject" data-project="myproject">`.
- In `<section class="work">`, add an `<article class="project-panel" id="panel-myproject" hidden>`.

### 3. Add to the Quick Navigation in `index.html`
In `<dialog class="command-dialog">`, add:
```html
<button type="button" data-command="myproject"><span>↳</span> My Project Name <span>↗</span></button>
```

---

## Run Locally

Open `index.html` in a web browser. No build steps or `node_modules` required.

To preview over HTTP:
```sh
python -m http.server 5173
```
Then visit `http://localhost:5173`.

---

## Deployment

Pushes to the `main` branch trigger `.github/workflows/deploy-pages.yml` to automatically publish the site to GitHub Pages.
