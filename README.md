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

4. **The Next Mile — Motorcycle Plate & OR/CR Monitoring**
   - **Platform:** Web Application
   - **GitHub Repository:** [https://github.com/kylho1231/project1](https://github.com/kylho1231/project1)
   - **Tech Stack:** PHP, JavaScript, MySQL, Bootstrap
   - **Summary:** Customer service portal for checking document release milestones and receiving automated SMS status updates.

---

## Interactive Features

- **Interactive AquaFlow Simulator:** Select container types (5-Gal Slim vs 5-Gal Round), change quantities with dynamic PHP pricing, and simulate the real-time order lifecycle (Placed → Station Preparation → Dispatched → Delivered).
- **San Jose TODA Municipal Fare Calculator:** Interactive Android simulation calculating exact regulated fares across San Jose de Buenavista routes (Funda-Dalipe, San Angel, Badiang, Madrangca, Maybato) with 20% discounts for students, seniors, and PWDs, pakyaw / solo ride rates, and simulated incident reporting to TMO.
- **SAC ISPSO ScholarLink Grant Switcher & Digital Pass:** Switch between UniFAST TES (₱20,000/sem), TDP-TES (₱7,500/sem), and CAS Working Scholar grants with dynamic grant amounts and digital QR stipend claiming pass for the SAC Gymnasium.
- **Tactile Sound Effects (Web Audio API):** Clean, synthesized audio feedback on user interactions (tab switching, ordering water, toggling themes, and clicking tools). Easily toggleable via the header button (`🔊 / 🔇`) and saved locally.
- **Interactive Skills Map:** Click any skill chip in the toolkit (Next.js 14, React 18, Kotlin, TypeScript, Firebase, Tailwind CSS, etc.) to reveal how Jhon applied it in real-world projects, with a 1-click jump button to the relevant project.
- **Code Playground with One-Click Copy:** Explore architectural mindsets across *Build*, *Design*, *Engineer (PWA)*, and *Learn* with a copy button that copies the snippet directly to your clipboard.
- **Category Filter Pills:** Switch between *All (4)*, *PWA & Cloud (2)*, *Android (1)*, and *Customer Service (1)* to quickly focus on specific engineering domains.
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
