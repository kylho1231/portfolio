"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-links");
const mobileViewport = window.matchMedia("(max-width: 640px)");

function onMediaQueryChange(mediaQuery, callback) {
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", callback);
  } else {
    mediaQuery.addListener(callback);
  }
}

function setMenuOpen(isOpen, { returnFocus = false } = {}) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navigation.hidden = mobileViewport.matches && !isOpen;

  if (returnFocus) menuButton.focus();
}

setMenuOpen(false);

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", event => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false, { returnFocus: true });
  }
});

onMediaQueryChange(mobileViewport, () => setMenuOpen(false));

const aiCarousel = document.querySelector("[data-ai-carousel]");
const aiRotor = aiCarousel.querySelector("[data-ai-rotor]");
const aiAssistants = [...aiRotor.querySelectorAll(".ai-orbit__item")];
const aiCarouselStatus = document.querySelector("[data-ai-status]");
const previousAssistantButton = document.querySelector("[data-ai-previous]");
const nextAssistantButton = document.querySelector("[data-ai-next]");
let selectedAssistantIndex = 0;

function selectAssistant(index) {
  selectedAssistantIndex = (index + aiAssistants.length) % aiAssistants.length;
  aiRotor.style.setProperty("--ai-carousel-angle", `${selectedAssistantIndex * -90}deg`);
  aiRotor.style.setProperty("--ai-counter-angle", `${selectedAssistantIndex * 90}deg`);

  aiAssistants.forEach((assistant, assistantIndex) => {
    assistant.dataset.aiActive = String(assistantIndex === selectedAssistantIndex);
  });

  aiCarouselStatus.textContent = `Featured: ${aiAssistants[selectedAssistantIndex].dataset.assistantName}`;
}

previousAssistantButton.addEventListener("click", () => selectAssistant(selectedAssistantIndex - 1));
nextAssistantButton.addEventListener("click", () => selectAssistant(selectedAssistantIndex + 1));
aiCarousel.closest(".hero-portrait").addEventListener("keydown", event => {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

  event.preventDefault();
  selectAssistant(selectedAssistantIndex + (event.key === "ArrowRight" ? 1 : -1));
});
selectAssistant(selectedAssistantIndex);

document.querySelector("#current-year").textContent = new Date().getFullYear();

const readingPages = [...document.querySelectorAll("[data-reading-page]")];
const readingScene = document.querySelector(".reading-scene");
const readingChapter = document.querySelector("[data-reading-chapter]");
const readingNext = document.querySelector("[data-reading-next]");
const readingProgress = document.querySelector("[data-reading-progress]");
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealItems = [...document.querySelectorAll("[data-reveal]")];
let revealObserver;
let activeReadingPage;

function setReadingPage(page) {
  if (!page || page === activeReadingPage || !readingScene || !readingChapter || !readingNext) return;

  const index = readingPages.indexOf(page);
  const nextPage = readingPages[index + 1] || readingPages[0];
  const isLastPage = index === readingPages.length - 1;

  activeReadingPage = page;
  readingScene.dataset.readingScene = page.dataset.readingScene;
  readingChapter.textContent = page.dataset.readingChapter;
  readingNext.href = `#${nextPage.id}`;
  readingNext.setAttribute(
    "aria-label",
    isLastPage
      ? "Return to the first chapter"
      : `Continue reading: ${nextPage.dataset.readingChapter.replace(/^\d+\s*\/\s*/, "")}`
  );
  readingNext.firstElementChild.textContent = isLastPage ? "Read from start" : "Next chapter";
}

function pageAtReadingLine() {
  const readingLine = window.innerHeight * 0.46;
  const closest = readingPages.reduce((nearest, page) => {
    const rect = page.getBoundingClientRect();
    const distance = Math.max(rect.top - readingLine, 0, readingLine - rect.bottom);
    return !nearest || distance < nearest.distance ? { page, distance } : nearest;
  }, null);
  return closest ? closest.page : null;
}

function updateReadingProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight)) : 0;
  const activePage = pageAtReadingLine();

  setReadingPage(activePage);
  if (readingProgress) readingProgress.value = Math.round(progress * 1000) / 10;
  if (readingScene) readingScene.style.setProperty("--scene-shift", `${(progress * -14).toFixed(1)}px`);
}

if (readingPages.length && readingScene && readingChapter && readingNext) {
  setReadingPage(pageAtReadingLine());
}

function enableScrollReveals() {
  if (revealObserver) revealObserver.disconnect();
  document.documentElement.removeAttribute("data-scroll-motion");

  if (motionPreference.matches || !("IntersectionObserver" in window)) return;

  revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.revealState = "visible";
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      item.dataset.revealState = "visible";
    } else {
      item.dataset.revealState = "hidden";
      revealObserver.observe(item);
    }
  });

  document.documentElement.dataset.scrollMotion = "enabled";
}

enableScrollReveals();
onMediaQueryChange(motionPreference, enableScrollReveals);
document.addEventListener("focusin", event => {
  const hiddenReveal = event.target.closest('[data-reveal-state="hidden"]');
  if (!hiddenReveal) return;

  hiddenReveal.dataset.revealState = "visible";
  if (revealObserver) revealObserver.unobserve(hiddenReveal);
});

window.addEventListener("scroll", updateReadingProgress, { passive: true });
window.addEventListener("resize", updateReadingProgress);
window.addEventListener("load", updateReadingProgress, { once: true });
updateReadingProgress();
