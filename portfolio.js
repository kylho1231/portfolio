"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
const themeButton = $(".theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let chosenTheme;
try { chosenTheme = localStorage.getItem("portfolio-theme"); } catch { /* Storage is optional in private or file browsing. */ }

function setTheme(theme, persist = false) {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeButton.setAttribute("aria-pressed", String(dark));
  themeButton.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
  $("meta[name='theme-color']").content = dark ? "#16231e" : "#f5f4ef";
  if (persist) {
    chosenTheme = theme;
    try { localStorage.setItem("portfolio-theme", theme); } catch { /* The selected theme still works without persistence. */ }
  }
}
setTheme(["light", "dark"].includes(chosenTheme) ? chosenTheme : systemTheme.matches ? "dark" : "light");
themeButton.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true));
systemTheme.addEventListener("change", event => { if (!chosenTheme) setTheme(event.matches ? "dark" : "light"); });

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

const projectTabs = $$("[data-project]");
function selectProject(id, focus = false) {
  projectTabs.forEach(tab => {
    const active = tab.dataset.project === id;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    $(`#${tab.getAttribute("aria-controls")}`).hidden = !active;
    if (active && focus) tab.focus();
  });
  $("#project-position").textContent = `${String(projectTabs.findIndex(tab => tab.dataset.project === id) + 1).padStart(2, "0")} / 03`;
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

// These concepts use local sample data; they never query real project records.
let verifiedSample = true;
$("[data-verify]").addEventListener("click", () => {
  verifiedSample = !verifiedSample;
  const result = $("#verification-result");
  result.classList.toggle("pending", !verifiedSample);
  $(".verify-icon", result).textContent = verifiedSample ? "✓" : "!";
  $("strong", result).textContent = verifiedSample ? "Franchise verified" : "Review required";
  $("small", result).textContent = `Sample record · ${verifiedSample ? "SJ-2026-001" : "SJ-2026-002"}`;
});
const releaseMessages = ["Your sample documents are being processed.", "Your sample OR/CR documents are ready. Plate processing continues.", "Your sample documents and plate are ready for collection."];
$("#release-stage").addEventListener("change", event => {
  const stage = Number(event.target.value);
  $("#release-result").textContent = releaseMessages[stage];
  $$(".tracker-steps li").forEach((step, index) => {
    const current = stage === 2 ? 2 : 1;
    step.classList.toggle("is-complete", index < current);
    step.classList.toggle("is-current", index === current);
    if (index === current) step.setAttribute("aria-current", "step"); else step.removeAttribute("aria-current");
  });
});
$(".document-checklist").addEventListener("change", () => {
  const count = $$(".document-checklist input:checked").length;
  $("#checklist-progress").value = count;
  $("#checklist-status").textContent = count === 3 ? "All sample documents prepared!" : `${count} of 3 documents prepared`;
});

const projects = {
  toda: {
    title: "TODA Membership & Franchise Verification", category: "01 / ANDROID · TRANSPORTATION",
    intro: "Bringing membership and franchise checks into one clearer workflow.",
    need: "Transportation regulatory work involves member registration and franchise checks. A centralized view can help the Municipal Transportation Franchising Desk in San Jose de Buenavista, Antique organize this information.",
    approach: "The proposed Android workflow connects member registration, QR-assisted verification, franchise checks, and an administrative overview. The preview explores how a clear verification result could feel.",
    tools: ["Java", "Android Studio", "MySQL", "Firebase"]
  },
  motorcycle: {
    title: "Motorcycle Plate & OR/CR Monitoring", category: "02 / WEB · CUSTOMER SERVICE",
    intro: "Helping customers follow the next step in their document release journey.",
    need: "Customers need a clear way to check the release status of motorcycle plates and registration documents. This project is designed around Yamaha customers in San Jose, Antique.",
    approach: "The workflow uses a chassis number to look up status, with support for release updates and SMS notifications. The interactive concept lets you explore sample stages without entering personal information.",
    tools: ["PHP", "JavaScript", "MySQL", "Bootstrap"]
  },
  scholarship: {
    title: "ISPSO Scholarship Monitoring System", category: "03 / WEB · EDUCATION",
    intro: "Making applicant information and application progress easier to follow.",
    need: "Scholarship administration brings together applicant records, supporting documents, and application status. Keeping these connected can make the process easier to organize and review.",
    approach: "The system brings applicant records and status monitoring into one place, with tools for document review and scholarship reporting. The checklist is an illustrative interaction, not an actual application submission.",
    tools: ["Python", "Django", "PostgreSQL", "HTML & CSS"]
  }
};
const projectDialog = $(".project-dialog");
function openProject(id) {
  const project = projects[id];
  if (!project) return;
  $("#project-dialog-title").textContent = project.title;
  $("#project-dialog-category").textContent = project.category;
  $("#project-dialog-intro").textContent = project.intro;
  $("#project-dialog-need").textContent = project.need;
  $("#project-dialog-approach").textContent = project.approach;
  $("#project-dialog-tags").replaceChildren(...project.tools.map(tool => {
    const item = document.createElement("li"); item.textContent = tool; return item;
  }));
  projectDialog.showModal();
  projectDialog.scrollTop = 0;
}
$$("[data-open-project]").forEach(button => button.addEventListener("click", () => openProject(button.dataset.openProject)));
$$(".dialog-close").forEach(button => button.addEventListener("click", () => projectDialog.close()));
// Check bounds so clicking the dialog's own padding never dismisses it.
$$("dialog").forEach(dialog => dialog.addEventListener("click", event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
}));

$$("[data-skill-filter]").forEach(button => button.addEventListener("click", () => {
  const filter = button.dataset.skillFilter;
  $$("[data-skill-filter]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
  $$("[data-skill]").forEach(item => { item.hidden = filter !== "all" && item.dataset.skill !== filter; });
  const count = $$("[data-skill]:not([hidden])").length;
  $("#skill-status").textContent = `Showing ${count} ${filter === "all" ? "tools" : `${filter} tools`}.`;
  scheduleScrollUpdate();
}));

let toastTimer;
function notify(message) {
  const toast = $(".toast");
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
  try { await navigator.clipboard.writeText(url.href); notify("Portfolio link copied. Thanks for sharing!"); }
  catch { notify("Copy the portfolio address from your browser to share it."); }
}
$(".copy-link").addEventListener("click", copyPortfolio);

const commandDialog = $(".command-dialog");
const commandSearch = $("#command-search");
const commandButtons = $$("[data-command]");
function openCommands() {
  if (projectDialog.open) return;
  commandSearch.value = "";
  commandButtons.forEach(button => { button.hidden = false; });
  $(".command-empty").hidden = true;
  commandDialog.showModal();
  commandSearch.focus();
}
$$(".command-trigger").forEach(button => button.addEventListener("click", openCommands));
$(".command-close").addEventListener("click", () => commandDialog.close());
document.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (commandDialog.open) commandDialog.close(); else openCommands();
  }
});
commandSearch.addEventListener("input", () => {
  const query = commandSearch.value.toLowerCase().trim();
  commandButtons.forEach(button => { button.hidden = !button.textContent.toLowerCase().includes(query); });
  $(".command-empty").hidden = commandButtons.some(button => !button.hidden);
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
  if (action === "copy") { copyPortfolio(); return; }
  const section = projects[action] ? "work" : action;
  if (projects[action]) selectProject(action);
  window.location.hash = section;
  const target = projects[action] ? $(`#tab-${action}`) : $(`#${section}`);
  if (!projects[action]) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}));
if (!/Mac|iPhone|iPad/.test(navigator.platform)) $$("kbd").forEach(key => { key.textContent = "Ctrl K"; });

function updateClock() {
  const now = new Date();
  $("#local-clock").textContent = `${new Intl.DateTimeFormat("en-PH", { timeZone: "Asia/Manila", hour: "numeric", minute: "2-digit", hour12: true }).format(now)} · Philippines`;
  $("#local-clock").dateTime = now.toISOString();
  $$("[data-year]").forEach(item => { item.textContent = new Intl.DateTimeFormat("en", { timeZone: "Asia/Manila", year: "numeric" }).format(now); });
}
updateClock();
setInterval(updateClock, 60000);

const sections = $$("main > section[id]");
let scrollScheduled = false;
function updateScroll() {
  scrollScheduled = false;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  $(".scroll-progress span").style.transform = `scaleX(${progress})`;
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
new ResizeObserver(scheduleScrollUpdate).observe(document.body);
updateScroll();

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

const portrait = $("[data-tilt]");
portrait.addEventListener("pointermove", event => {
  if (motion.matches || event.pointerType !== "mouse") return;
  const rect = portrait.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - .5;
  const y = (event.clientY - rect.top) / rect.height - .5;
  portrait.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) rotate(1deg)`;
});
portrait.addEventListener("pointerleave", () => { portrait.style.transform = ""; });
motion.addEventListener("change", () => { portrait.style.transform = ""; });
