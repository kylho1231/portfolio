"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-links");
const mobileViewport = window.matchMedia("(max-width: 640px)");

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

mobileViewport.addEventListener("change", () => setMenuOpen(false));

document.querySelector("#current-year").textContent = new Date().getFullYear();
