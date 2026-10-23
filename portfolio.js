"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ----------------------------------------------------
   Audio Synthesizer for tactile UI sound effects
   (Native Web Audio API — zero external dependencies)
---------------------------------------------------- */
let audioCtx = null;
let soundEnabled = false;
try {
  soundEnabled = localStorage.getItem("portfolio-sound") === "true";
} catch { /* Storage optional */ }

const soundButton = $(".sound-toggle");
if (soundButton) {
  soundButton.setAttribute("aria-pressed", String(soundEnabled));
  soundButton.title = soundEnabled ? "Mute UI sound effects" : "Enable UI sound effects";
  soundButton.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    soundButton.setAttribute("aria-pressed", String(soundEnabled));
    soundButton.title = soundEnabled ? "Mute UI sound effects" : "Enable UI sound effects";
    try { localStorage.setItem("portfolio-sound", String(soundEnabled)); } catch {}
    if (soundEnabled) {
      playSound("success");
      notify("Sound effects enabled! 🔊");
    } else {
      notify("Sound effects muted 🔇");
    }
  });
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.04);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === "water") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.07);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "switch") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.06);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(659.25, now + 0.07);
      osc.frequency.setValueAtTime(880, now + 0.14);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.start(now);
      osc.stop(now + 0.28);
    }
  } catch { /* Silent fail if audio is blocked */ }
}

/* ----------------------------------------------------
   Themes & Accent Palettes
---------------------------------------------------- */
const themeButton = $(".theme-toggle");
let chosenTheme;
try { chosenTheme = localStorage.getItem("portfolio-theme"); } catch {}

function setTheme(theme, persist = false) {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeButton.setAttribute("aria-pressed", String(dark));
  themeButton.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
  themeButton.title = `Switch to ${dark ? "light" : "dark"} mode`;
  const metaTheme = $("meta[name='theme-color']");
  if (metaTheme) metaTheme.content = dark ? "#111915" : "#f2f1e9";
  if (persist) {
    chosenTheme = theme;
    playSound("switch");
    try { localStorage.setItem("portfolio-theme", theme); } catch {}
  }
}
setTheme(["light", "dark"].includes(chosenTheme) ? chosenTheme : "dark");
themeButton.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true));

const accentButtons = $$("[data-accent]").filter(element => element.matches("button"));
const accents = ["lime", "coral", "sky"];
function setAccent(accent, persist = false) {
  if (!accents.includes(accent)) return;
  document.documentElement.dataset.accent = accent;
  accentButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.accent === accent)));
  if (persist) {
    playSound("click");
    try { localStorage.setItem("portfolio-accent", accent); } catch {}
  }
}
let savedAccent;
try { savedAccent = localStorage.getItem("portfolio-accent"); } catch {}
setAccent(accents.includes(savedAccent) ? savedAccent : "lime");
accentButtons.forEach(button => button.addEventListener("click", () => setAccent(button.dataset.accent, true)));

function randomAccent() {
  const current = document.documentElement.dataset.accent;
  const others = accents.filter(a => a !== current);
  const next = others[Math.floor(Math.random() * others.length)];
  setAccent(next, true);
  notify(`Color palette switched to ${next.toUpperCase()}! 🎨`);
}

/* ----------------------------------------------------
   Interactive Playground
---------------------------------------------------- */
const labModes = {
  build: {
    title: "A useful idea, made tangible.",
    description: "I enjoy connecting practical problems with software: clearer records, simpler checks, and a next step people can easily understand.",
    code: '// My building mindset\nconst project = {\n  startWith: "an everyday community need",\n  build: ["Progressive Web Apps", "Android", "Cloud"],\n  aimFor: "tangible, reliable utility"\n};'
  },
  design: {
    title: "Every detail has a job to do.",
    description: "I care about interfaces that explain themselves. Clear typography, immediate feedback, and thoughtful accessibility help people feel in total control.",
    code: '// My interface checklist\nconst experience = {\n  navigation: "effortless to navigate",\n  feedback: "clear, reassuring and timely",\n  details: "thoughtful, never clutter"\n};'
  },
  pwa: {
    title: "AquaFlow Architecture & Cloud Flow.",
    description: "Engineered as an offline-capable PWA with React 18 and Vite. Connected to Firebase Firestore with multi-tenant transactions and WebAuthn passkeys.",
    code: '// AquaFlow production stack\nconst architecture = {\n  frontend: "React 18 + Vite + Tailwind",\n  auth: "Biometric Passkeys (WebAuthn)",\n  database: "Multi-tenant Firestore Transactions",\n  deployment: "Vercel Edge Cloud"\n};'
  },
  learn: {
    title: "Stay curious. Keep building.",
    description: "As an IT senior at St. Anthony’s College, I learn through shipping code, questioning assumptions, and refining what works.",
    code: '// Continuous growth cycle\nconst learning = {\n  explore: "one emerging concept",\n  practice: "ship a working implementation",\n  reflect: "how does this serve the user?"\n};'
  }
};
const labButtons = $$("[data-lab-mode]");
function selectLabMode(mode) {
  const content = labModes[mode];
  const title = $("#lab-title");
  const description = $("#lab-description");
  const code = $("#lab-code");
  if (!content || !title || !description || !code) return;
  labButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.labMode === mode)));
  title.textContent = content.title;
  description.textContent = content.description;
  code.textContent = content.code;
  playSound("switch");
  scheduleScrollUpdate();
}
labButtons.forEach(button => button.addEventListener("click", () => selectLabMode(button.dataset.labMode)));

const labCopyBtn = $("#lab-copy-btn");
if (labCopyBtn) {
  labCopyBtn.addEventListener("click", async () => {
    const code = $("#lab-code");
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code.textContent);
      playSound("success");
      notify("Code snippet copied to clipboard! 📋");
    } catch {
      notify("Select the code to copy.");
    }
  });
}

/* ----------------------------------------------------
   Mobile Navigation Menu
---------------------------------------------------- */
const menuButton = $(".menu-toggle");
const navigation = $("#primary-links");
function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  navigation.classList.toggle("is-open", open);
}
menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
navigation.addEventListener("click", event => { if (event.target.closest("a")) setMenu(false); });
document.addEventListener("click", event => { if (!event.target.closest(".site-header")) setMenu(false); });
window.matchMedia("(max-width: 600px)").addEventListener("change", () => setMenu(false));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") { setMenu(false); menuButton.focus(); }
});

/* ----------------------------------------------------
   Project Tabs, Filters & Pagination
---------------------------------------------------- */
const projectTabs = $$("[data-project]");
function selectProject(id, focus = false) {
  if (!projectTabs.some(tab => tab.dataset.project === id)) return;
  projectTabs.forEach(tab => {
    const active = tab.dataset.project === id;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    const panel = $(`#${tab.getAttribute("aria-controls")}`);
    if (panel) panel.hidden = !active;
    if (active && focus) tab.focus();
  });
  const currentIndex = projectTabs.findIndex(tab => tab.dataset.project === id);
  const posElem = $("#project-position");
  if (posElem) {
    posElem.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(projectTabs.length).padStart(2, "0")}`;
    posElem.setAttribute("aria-label", `Project ${currentIndex + 1} of ${projectTabs.length}: ${$("strong", projectTabs[currentIndex]).textContent}`);
  }
  playSound("click");
  scheduleScrollUpdate();
}

projectTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectProject(tab.dataset.project));
  tab.addEventListener("keydown", event => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? projectTabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + projectTabs.length) % projectTabs.length;
    selectProject(projectTabs[next].dataset.project, true);
  });
});

$$("[data-project-step]").forEach(button => button.addEventListener("click", () => {
  const current = projectTabs.findIndex(tab => tab.getAttribute("aria-selected") === "true");
  const next = (current + Number(button.dataset.projectStep) + projectTabs.length) % projectTabs.length;
  selectProject(projectTabs[next].dataset.project);
}));

/* Work Category Filter Pills */
const workFilterBtns = $$(".work-filter-btn");
workFilterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    workFilterBtns.forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
    playSound("switch");

    if (filter === "all") {
      projectTabs.forEach(t => { t.hidden = false; });
    } else {
      projectTabs.forEach(t => {
        const matches = t.dataset.category === filter;
        t.hidden = !matches;
      });
      // If current tab is hidden, switch to the first visible one
      const currentTab = projectTabs.find(t => t.getAttribute("aria-selected") === "true");
      if (currentTab && currentTab.hidden) {
        const firstVisible = projectTabs.find(t => !t.hidden);
        if (firstVisible) selectProject(firstVisible.dataset.project);
      }
    }
  });
});

/* ----------------------------------------------------
   Interactive AquaFlow Simulator
---------------------------------------------------- */
let afContainerPrice = 35;
let afContainerType = "slim";
let afQuantity = 2;
let afSimulatorTimer = null;

const afProductBtns = $$(".af-product-btn");
afProductBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    afProductBtns.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-checked", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-checked", "true");
    afContainerType = btn.dataset.afType;
    afContainerPrice = Number(btn.dataset.price);
    playSound("water");
    updateAfTotal();
  });
});

const afMinusBtn = $("#af-minus");
const afPlusBtn = $("#af-plus");
const afQtyElem = $("#af-qty");
const afTotalElem = $("#af-total");

function updateAfTotal() {
  if (afQtyElem) afQtyElem.textContent = String(afQuantity);
  if (afTotalElem) afTotalElem.textContent = `₱${(afQuantity * afContainerPrice).toFixed(2)}`;
}

if (afMinusBtn && afPlusBtn) {
  afMinusBtn.addEventListener("click", () => {
    if (afQuantity > 1) {
      afQuantity -= 1;
      playSound("click");
      updateAfTotal();
    }
  });
  afPlusBtn.addEventListener("click", () => {
    if (afQuantity < 20) {
      afQuantity += 1;
      playSound("click");
      updateAfTotal();
    }
  });
}

const afOrderTrigger = $("#af-order-trigger");
const afStatusTitle = $("#af-status-title");
const afStatusDesc = $("#af-status-desc");
const afResetDemo = $("#af-reset-demo");
const afSteps = [$("#af-step-1"), $("#af-step-2"), $("#af-step-3"), $("#af-step-4")];

if (afOrderTrigger) {
  afOrderTrigger.addEventListener("click", () => {
    playSound("water");
    afOrderTrigger.disabled = true;
    afOrderTrigger.innerHTML = '<span>Processing Order...</span> <span aria-hidden="true">⏳</span>';
    clearTimeout(afSimulatorTimer);

    // Step 1: Placed
    afSteps.forEach(s => s && s.classList.remove("done", "current"));
    if (afSteps[0]) afSteps[0].classList.add("done");
    if (afStatusTitle) afStatusTitle.textContent = "Order Placed & Confirmed!";
    if (afStatusDesc) afStatusDesc.textContent = `Allocated ${afQuantity}x ${afContainerType === "slim" ? "Slim 5-Gal" : "Round 5-Gal"} (₱${(afQuantity * afContainerPrice).toFixed(2)})`;

    // Step 2: Station preparing (after 700ms)
    afSimulatorTimer = setTimeout(() => {
      playSound("click");
      if (afSteps[1]) afSteps[1].classList.add("done");
      if (afStatusTitle) afStatusTitle.textContent = "Water Refilling in Progress";
      if (afStatusDesc) afStatusDesc.textContent = "Multi-stage filtration & bottle sanitization completed.";

      // Step 3: Rider Dispatched (after 1500ms)
      afSimulatorTimer = setTimeout(() => {
        playSound("click");
        if (afSteps[2]) afSteps[2].classList.add("done");
        if (afStatusTitle) afStatusTitle.textContent = "Rider Dispatched to Address";
        if (afStatusDesc) afStatusDesc.textContent = "Driver is on transit in San Jose de Buenavista queue.";

        // Step 4: Delivered (after 2300ms)
        afSimulatorTimer = setTimeout(() => {
          playSound("success");
          if (afSteps[3]) {
            afSteps[3].classList.add("done", "current");
          }
          if (afStatusTitle) afStatusTitle.textContent = "Delivered to Customer! 🎉";
          if (afStatusDesc) afStatusDesc.textContent = "Order completed in simulated queue. Try the live Vercel app!";
          afOrderTrigger.innerHTML = '<span>Order Completed!</span> <span aria-hidden="true">✓</span>';
          if (afResetDemo) afResetDemo.hidden = false;
        }, 800);
      }, 800);
    }, 700);
  });
}

if (afResetDemo) {
  afResetDemo.addEventListener("click", () => {
    clearTimeout(afSimulatorTimer);
    afSteps.forEach(s => s && s.classList.remove("done", "current"));
    if (afStatusTitle) afStatusTitle.textContent = "Ready to order";
    if (afStatusDesc) afStatusDesc.textContent = "Cash on delivery · Standard refill queue";
    if (afOrderTrigger) {
      afOrderTrigger.disabled = false;
      afOrderTrigger.innerHTML = '<span>Place Refill Order</span> <span aria-hidden="true">💧</span>';
    }
    afResetDemo.hidden = true;
    playSound("click");
  });
}

/* ----------------------------------------------------
   Existing Demos: TODA, Motorcycle, Scholarship
---------------------------------------------------- */
let verifiedSample = true;
const verifyBtn = $("[data-verify]");
if (verifyBtn) {
  verifyBtn.addEventListener("click", () => {
    verifiedSample = !verifiedSample;
    const result = $("#verification-result");
    if (result) {
      result.classList.toggle("pending", !verifiedSample);
      $(".verify-icon", result).textContent = verifiedSample ? "✓" : "!";
      $("strong", result).textContent = verifiedSample ? "Franchise verified" : "Review required";
      $("small", result).textContent = `Sample record · ${verifiedSample ? "SJ-2026-001" : "SJ-2026-002"}`;
    }
    playSound("click");
  });
}

const releaseMessages = [
  "Your sample documents are being processed.",
  "Your sample OR/CR documents are ready. Plate processing continues.",
  "Your sample documents and plate are ready for collection."
];
const releaseSelect = $("#release-stage");
if (releaseSelect) {
  releaseSelect.addEventListener("change", event => {
    const stage = Number(event.target.value);
    const releaseRes = $("#release-result");
    if (releaseRes) releaseRes.textContent = releaseMessages[stage];
    $$(".tracker-steps li").forEach((step, index) => {
      const current = stage === 2 ? 2 : 1;
      step.classList.toggle("is-complete", index < current);
      step.classList.toggle("is-current", index === current);
      if (index === current) step.setAttribute("aria-current", "step"); else step.removeAttribute("aria-current");
    });
    playSound("click");
  });
}

const checklistContainer = $(".document-checklist");
if (checklistContainer) {
  checklistContainer.addEventListener("change", () => {
    const count = $$(".document-checklist input:checked").length;
    const total = $$(".document-checklist input").length;
    const progress = $("#checklist-progress");
    const status = $("#checklist-status");
    if (progress) progress.value = count;
    if (status) status.textContent = count === total ? "All sample documents prepared!" : `${count} of ${total} documents prepared`;
    playSound(count === total ? "success" : "click");
  });
}

/* ----------------------------------------------------
   Projects Detailed Dialog Data
---------------------------------------------------- */
const projects = {
  aquaflow: {
    title: "AquaFlow — Water Refill & Station Operations PWA",
    category: "01 / PWA · COMMERCE & LOGISTICS",
    intro: "A mobile-first Progressive Web App modernizing water refill station operations, customer reordering, and route dispatch.",
    need: "Water refill stations throughout local communities traditionally rely on manual SMS messages and physical logbooks. This leads to missed delivery windows, bottle deposit discrepancies, and stock bottlenecks without visibility for customers.",
    approach: "Engineered an offline-capable PWA with React 18, TypeScript, and Vite. Designed an Express + Firebase Firestore backend with strict tenant isolation, biometric passkey authentication (WebAuthn), real-time inventory ledgering, and automatic delivery status synchronization. Deployed in production on Vercel with Firestore Cloud database.",
    tools: ["React 18", "TypeScript", "Firebase Firestore", "Node.js & Express", "Tailwind CSS", "WebAuthn / Passkeys", "Zustand", "PWA", "Vercel"],
    live: "https://aqua-flow-ochre.vercel.app",
    repo: "https://github.com/kylho1231/AquaFlow"
  },
  toda: {
    title: "TODA Membership & Franchise Verification",
    category: "02 / ANDROID · TRANSPORTATION",
    intro: "Centralizing membership records and franchise compliance checks into one clear mobile workflow.",
    need: "Transportation regulatory work involves member registration and franchise checks. A centralized view helps the Municipal Transportation Franchising Desk in San Jose de Buenavista, Antique organize this information.",
    approach: "The Android application connects driver member registration, QR-assisted verification, franchise checks, and an administrative desk overview.",
    tools: ["Java", "Android Studio", "MySQL", "Firebase"],
    repo: "https://github.com/kylho1231"
  },
  motorcycle: {
    title: "Motorcycle Plate & OR/CR Monitoring",
    category: "03 / WEB · CUSTOMER SERVICE",
    intro: "Helping customers follow the next step in their motorcycle plate and registration release journey.",
    need: "Customers need a transparent way to check the release status of motorcycle plates and registration documents without repeated in-person visits.",
    approach: "The web workflow uses chassis number lookups with release milestone updates and SMS notification triggers.",
    tools: ["PHP", "JavaScript", "MySQL", "Bootstrap"],
    repo: "https://github.com/kylho1231/project1"
  },
  scholarship: {
    title: "ISPSO Scholarship Monitoring System",
    category: "04 / WEB · EDUCATION",
    intro: "Making applicant information and scholarship application progress transparent and easier to manage.",
    need: "Scholarship administration brings together applicant records, supporting documents, and application review status.",
    approach: "The system organizes applicant records, document verification, and scholarship reporting in one secure dashboard.",
    tools: ["Python", "Django", "PostgreSQL", "HTML & CSS"],
    repo: "https://github.com/kylho1231"
  }
};

const projectDialog = $(".project-dialog");
function openProject(id) {
  const project = projects[id];
  if (!project || !projectDialog) return;
  $("#project-dialog-title").textContent = project.title;
  $("#project-dialog-category").textContent = project.category;
  $("#project-dialog-intro").textContent = project.intro;
  $("#project-dialog-need").textContent = project.need;
  $("#project-dialog-approach").textContent = project.approach;
  $("#project-dialog-tags").replaceChildren(...project.tools.map(tool => {
    const item = document.createElement("li"); item.textContent = tool; return item;
  }));

  const liveLink = $("#project-dialog-live");
  if (liveLink) {
    if (project.live) {
      liveLink.href = project.live;
      liveLink.hidden = false;
    } else {
      liveLink.hidden = true;
    }
  }

  const repoLink = $("#project-dialog-repo");
  if (repoLink) {
    if (project.repo) {
      repoLink.href = project.repo;
      repoLink.hidden = false;
    } else {
      repoLink.hidden = true;
    }
  }

  playSound("click");
  projectDialog.showModal();
  projectDialog.scrollTop = 0;
}

$$("[data-open-project]").forEach(button => button.addEventListener("click", () => openProject(button.dataset.openProject)));
$$(".dialog-close").forEach(button => button.addEventListener("click", () => {
  playSound("click");
  projectDialog.close();
}));

$$("dialog").forEach(dialog => dialog.addEventListener("click", event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
    playSound("click");
    dialog.close();
  }
}));

/* ----------------------------------------------------
   Interactive Skills Explorer & Tool Map
---------------------------------------------------- */
const skillStories = {
  react: {
    desc: "Used in AquaFlow to architect a responsive, state-driven water refill ordering PWA with Vite, component hooks, and optimistic UI updates.",
    project: "aquaflow"
  },
  typescript: {
    desc: "Provides strict type contracts across AquaFlow's API requests, order state management, and Firestore data documents.",
    project: "aquaflow"
  },
  javascript: {
    desc: "Foundation for DOM interactions, asynchronous fetch flows, and animation coordination across web applications.",
    project: "aquaflow"
  },
  tailwind: {
    desc: "Employed in AquaFlow for a clean, mobile-first utility-first design system with responsive layouts and fluid touch states.",
    project: "aquaflow"
  },
  htmlcss: {
    desc: "Core semantic markup, CSS custom properties, responsive flexbox/grid layouts, and WCAG accessibility standards.",
    project: "scholarship"
  },
  java: {
    desc: "Used in TODA Verify for Android native development, QR scanning integration, and mobile municipal verification.",
    project: "toda"
  },
  python: {
    desc: "Applied in ISPSO Scholarship Monitoring with Django for data processing, application validation, and reporting.",
    project: "scholarship"
  },
  django: {
    desc: "Powers the backend architecture, ORM models, and administrative review screens for scholarship document pipelines.",
    project: "scholarship"
  },
  php: {
    desc: "Used in the Motorcycle Plate & OR/CR Monitoring system for server-side chassis number lookups and status management.",
    project: "motorcycle"
  },
  firebase: {
    desc: "Powers AquaFlow's multi-tenant Firestore cloud transactions & security rules, as well as TODA Verify's data sync.",
    project: "aquaflow"
  },
  mysql: {
    desc: "Configured relational schema design and indexing for TODA franchise records and motorcycle customer tracking.",
    project: "toda"
  },
  postgresql: {
    desc: "Relational database used for normalized applicant profiles and document review states in the ISPSO scholarship system.",
    project: "scholarship"
  },
  passkeys: {
    desc: "Integrated WebAuthn biometric passkey authentication in AquaFlow for seamless, passwordless customer sign-ins.",
    project: "aquaflow"
  },
  vercel: {
    desc: "Production cloud deployment platform for AquaFlow (aqua-flow-ochre.vercel.app) with automatic edge preview branches.",
    project: "aquaflow"
  },
  android: {
    desc: "Native Android Studio IDE environment utilized for compiling, testing, and debugging the TODA Verify mobile APK.",
    project: "toda"
  },
  git: {
    desc: "Version control workflows, commit history, branch strategies, and CI/CD deployment pipelines on GitHub.",
    project: "aquaflow"
  },
  figma: {
    desc: "UI/UX wireframing, component tokens, user journey flows, and design system prototyping before writing code.",
    project: "aquaflow"
  }
};

const skillItems = $$("#skills-list li");
const skillInsight = $("#skill-insight");
const skillInsightText = $("#skill-insight-text");
const skillInsightLink = $("#skill-insight-link");

skillItems.forEach(item => {
  item.addEventListener("click", () => {
    const tech = item.dataset.tech;
    const story = skillStories[tech];
    skillItems.forEach(i => i.classList.remove("is-selected"));
    item.classList.add("is-selected");
    playSound("click");

    if (story && skillInsightText) {
      if (skillInsight) skillInsight.classList.add("has-focus");
      skillInsightText.innerHTML = `<strong>${item.textContent}:</strong> ${story.desc}`;
      if (skillInsightLink && story.project) {
        skillInsightLink.hidden = false;
        skillInsightLink.textContent = `Jump to ${projects[story.project].title.split("—")[0]} →`;
        skillInsightLink.onclick = () => {
          selectProject(story.project);
          const workSection = $("#work");
          if (workSection) workSection.scrollIntoView({ behavior: "smooth" });
        };
      }
    }
  });
});

$$("[data-skill-filter]").forEach(button => button.addEventListener("click", () => {
  const filter = button.dataset.skillFilter;
  $$("[data-skill-filter]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
  $$("[data-skill]").forEach(item => { item.hidden = filter !== "all" && item.dataset.skill !== filter; });
  const count = $$("[data-skill]:not([hidden])").length;
  $("#skill-status").textContent = `Showing ${count} ${filter === "all" ? "tools" : `${filter} tools`}.`;
  playSound("switch");
  scheduleScrollUpdate();
}));

/* ----------------------------------------------------
   Interactive Contact Topics & Email Helper
---------------------------------------------------- */
const contactEmailBtn = $("#contact-email-btn");
const topicPills = $$(".topic-pill");
const topicConfigs = {
  collab: {
    subject: "Project Collaboration Inquiry — Jhon Estrabo",
    body: "Hi Jhon,%0D%0A%0D%0AI came across your portfolio and would like to discuss a project collaboration on..."
  },
  hiring: {
    subject: "Job / Internship Opportunity — Jhon Estrabo",
    body: "Hi Jhon,%0D%0A%0D%0AWe are interested in discussing an engineering role / internship opportunity with you..."
  },
  hello: {
    subject: "Hello from your portfolio — Jhon Estrabo",
    body: "Hi Jhon,%0D%0A%0D%0AJust wanted to reach out and say hello! I was checking out your work on AquaFlow and..."
  }
};

topicPills.forEach(pill => {
  pill.addEventListener("click", () => {
    topicPills.forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    playSound("click");
    const topic = pill.dataset.topic;
    const config = topicConfigs[topic];
    if (config && contactEmailBtn) {
      contactEmailBtn.href = `mailto:jhonkylhoestraboofficial@gmail.com?subject=${config.subject}&body=${config.body}`;
    }
  });
});

const copyEmailBtn = $("#copy-email-btn");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("jhonkylhoestraboofficial@gmail.com");
      playSound("success");
      notify("Email address copied: jhonkylhoestraboofficial@gmail.com ✉️");
    } catch {
      notify("Email: jhonkylhoestraboofficial@gmail.com");
    }
  });
}

/* ----------------------------------------------------
   Shareable Portfolio Link Copier
---------------------------------------------------- */
let toastTimer;
function notify(message) {
  const toast = $(".toast");
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3500);
}

async function copyPortfolio() {
  const url = new URL(window.location.href);
  url.hash = "";
  if (!/^https?:$/.test(url.protocol) || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(url.hostname)) {
    notify("Open the published portfolio to copy its shareable link.");
    return;
  }
  try {
    await navigator.clipboard.writeText(url.href);
    playSound("success");
    notify("Portfolio link copied to clipboard. Thanks for sharing!");
  } catch {
    notify("Copy the portfolio address from your browser to share it.");
  }
}
$$(".copy-link").forEach(btn => btn.addEventListener("click", copyPortfolio));

/* ----------------------------------------------------
   Command Palette (Ctrl+K / Cmd+K)
---------------------------------------------------- */
const commandDialog = $(".command-dialog");
const commandSearch = $("#command-search");
const commandButtons = $$("[data-command]");

function openCommands() {
  if (projectDialog.open || commandDialog.open) return;
  commandSearch.value = "";
  commandButtons.forEach(button => { button.hidden = false; });
  $(".command-empty").hidden = true;
  updateCommandStatus();
  playSound("switch");
  commandDialog.showModal();
  commandSearch.focus();
}

$$(".command-trigger").forEach(button => button.addEventListener("click", openCommands));
$(".command-close").addEventListener("click", () => {
  playSound("click");
  commandDialog.close();
});

document.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (commandDialog.open) commandDialog.close(); else openCommands();
  }
});

function updateCommandStatus() {
  const status = $("#command-status");
  if (!status) return;
  const count = commandButtons.filter(button => !button.hidden).length;
  status.textContent = count ? `${count} ${count === 1 ? "action" : "actions"} available. Use the arrow keys to browse.` : "No matching actions. Try another search.";
}

commandSearch.addEventListener("input", () => {
  const query = commandSearch.value.toLowerCase().trim();
  commandButtons.forEach(button => { button.hidden = !button.textContent.toLowerCase().includes(query); });
  $(".command-empty").hidden = commandButtons.some(button => !button.hidden);
  updateCommandStatus();
});

commandDialog.addEventListener("keydown", event => {
  const visible = commandButtons.filter(button => !button.hidden);
  if (!visible.length) return;
  if (event.key === "Enter" && document.activeElement === commandSearch) { event.preventDefault(); visible[0].click(); return; }
  if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
  event.preventDefault();
  const current = visible.indexOf(document.activeElement);
  const next = current === -1 ? (event.key === "ArrowDown" ? 0 : visible.length - 1) : (current + (event.key === "ArrowDown" ? 1 : -1) + visible.length) % visible.length;
  visible[next].focus();
});

commandButtons.forEach(button => button.addEventListener("click", () => {
  const action = button.dataset.command;
  commandDialog.close();
  if (action === "theme") { themeButton.click(); return; }
  if (action === "sound") { if (soundButton) soundButton.click(); return; }
  if (action === "random-accent") { randomAccent(); return; }
  if (action === "copy") { copyPortfolio(); return; }
  if (action === "github") { window.open("https://github.com/kylho1231", "_blank"); return; }
  
  const section = projects[action] ? "work" : action;
  if (projects[action]) selectProject(action);
  window.location.hash = section;
  const target = projects[action] ? $(`#tab-${action}`) : $(`#${section}`);
  if (!target) return;
  if (!projects[action]) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}));

if (!/Mac|iPhone|iPad/.test(navigator.platform)) $$("kbd").forEach(key => { key.textContent = "Ctrl K"; });

/* ----------------------------------------------------
   Real-Time Clock & Year (Manila, Philippines UTC+8)
---------------------------------------------------- */
function updateClock() {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-PH", { timeZone: "Asia/Manila", hour: "numeric", minute: "2-digit", hour12: true }).format(now);
  $$("#local-clock, [data-local-time]").forEach(clock => {
    clock.textContent = clock.id === "local-clock" ? `${time} · Philippines` : time;
    if (clock.matches("time")) clock.dateTime = now.toISOString();
  });
  $$("[data-year]").forEach(item => { item.textContent = new Intl.DateTimeFormat("en", { timeZone: "Asia/Manila", year: "numeric" }).format(now); });
}
updateClock();
setInterval(updateClock, 60000);

/* ----------------------------------------------------
   Scroll Progress & Active Navigation State
---------------------------------------------------- */
const sections = $$("main > section[id]");
let scrollScheduled = false;
function updateScroll() {
  scrollScheduled = false;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  const scrollBar = $(".scroll-progress span");
  if (scrollBar) scrollBar.style.transform = `scaleX(${progress})`;
  const current = sections.filter(section => section.getBoundingClientRect().top <= window.innerHeight * .35).at(-1);
  $$(".nav-links a").forEach(link => {
    if (current && link.hash === `#${current.id}`) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
  });
}
function scheduleScrollUpdate() {
  if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateScroll); }
}
window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
window.addEventListener("resize", scheduleScrollUpdate);
window.addEventListener("load", scheduleScrollUpdate);
if ("ResizeObserver" in window) new ResizeObserver(scheduleScrollUpdate).observe(document.body);
updateScroll();
selectLabMode("build");

/* ----------------------------------------------------
   Intersection Observer Reveals
---------------------------------------------------- */
let revealObserver;
function setupReveals() {
  revealObserver?.disconnect();
  document.documentElement.classList.remove("js-motion");
  if (motion.matches || !("IntersectionObserver" in window)) return;
  revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); }
  }), { threshold: .08 });
  $$("[data-reveal]").forEach(item => revealObserver.observe(item));
  document.documentElement.classList.add("js-motion");
}
setupReveals();
motion.addEventListener("change", setupReveals);
document.addEventListener("focusin", event => event.target.closest("[data-reveal]")?.classList.add("is-visible"));

/* ----------------------------------------------------
   Interactive Portrait Tilt
---------------------------------------------------- */
const portrait = $("[data-tilt]");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
if (portrait) {
  portrait.addEventListener("pointermove", event => {
    if (motion.matches || !finePointer.matches || event.pointerType !== "mouse") return;
    const rect = portrait.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    portrait.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) rotate(1deg)`;
  });
  portrait.addEventListener("pointerleave", () => { portrait.style.transform = ""; });
  motion.addEventListener("change", () => { portrait.style.transform = ""; });
}

document.documentElement.classList.add("js-ready");
