/**
 * JE. DIGITAL UNIVERSE — GSAP Scroll Journey
 * Scrubbed, pinned desktop narrative inspired by gsap.com/scroll.
 * Degrades to accessible stacked chapters if the CDN cannot load.
 * Does not take over touch, native scrolling, or the AI Council animation state.
 */
(function () {
  "use strict";

  function init() {
    const journey = document.getElementById("scroll-journey");
    if (!journey) return;
    if (!window.gsap || !window.ScrollTrigger) {
      console.info("[JE Scroll] GSAP unavailable; accessible static chapters enabled.");
      return;
    }
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const viewport = journey.querySelector(".je-scroll-viewport");
    const track = journey.querySelector(".je-scroll-track");
    const chapters = Array.from(journey.querySelectorAll(".je-chapter"));
    const dots = Array.from(journey.querySelectorAll(".je-journey-dot"));
    const counter = journey.querySelector(".je-story-mark");
    const colorMap = ["#d3a6ff", "#76d8ff", "#f0f2f8", "#ffb678"];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 900px)");
    if (!viewport || !track || !chapters.length) return;

    let lastChapter = -1;
    function updateProgress(progress) {
      const position = Math.min(chapters.length - 1, Math.max(0, Math.floor(progress * (chapters.length - 1) + 0.5)));
      if (position !== lastChapter) {
        lastChapter = position;
        journey.style.setProperty("--je-chapter-color", colorMap[position]);
        if (counter) counter.textContent = String(position + 1).padStart(2, "0") + " / " + String(chapters.length).padStart(2, "0");
      }
      dots.forEach((dot, index) => {
        const fill = Math.max(0, Math.min(1, progress * (chapters.length - 1) - index + 1));
        dot.style.setProperty("--je-fill", String(fill));
        dot.classList.toggle("is-active", fill > .995);
      });
    }
    updateProgress(0);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", function () {
      journey.classList.add("je-gsap-active");
      const distance = () => Math.max(1, track.scrollWidth - viewport.clientWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        duration: 1,
        ease: "none",
        overwrite: "auto",
        scrollTrigger: {
          trigger: journey,
          start: "top top+=82",
          end: () => "+=" + distance(),
          scrub: 0.8,
          pin: viewport,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => updateProgress(self.progress)
        }
      });

      // Independent scrub: staged mascots float and twist while the page moves.
      const floatTween = gsap.to(journey.querySelectorAll(".je-robot-float"), {
        y: -22,
        rotationY: 18,
        rotationZ: 3,
        stagger: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: journey,
          start: "top top+=82",
          end: () => "+=" + distance(),
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
      const glowTween = gsap.to(journey.querySelectorAll(".je-art-glow"), {
        scale: 1.17,
        opacity: .72,
        ease: "none",
        scrollTrigger: {
          trigger: journey,
          start: "top top+=82",
          end: () => "+=" + distance(),
          scrub: 1.3,
          invalidateOnRefresh: true
        }
      });
      ScrollTrigger.refresh();
      return () => {
        // matchMedia reverts its own GSAP instances first.
        journey.classList.remove("je-gsap-active");
        gsap.set(track, { clearProps: "transform" });
        gsap.set(journey.querySelectorAll(".je-robot-float,.je-art-glow"), { clearProps: "transform,opacity" });
        lastChapter = -1;
        updateProgress(0);
      };
    });

    mm.add("(prefers-reduced-motion: no-preference)", function () {
      // Gentle reveal of section labels without altering existing data-reveal cards.
      const labels = Array.from(document.querySelectorAll(
        "#work .section-topline, #motion-lab .lab-badge, #playground .section-topline, #about .section-topline, #approach .section-topline, #contact .section-topline"
      ));
      labels.forEach(label => {
        gsap.fromTo(label, { opacity: .15, x: -28 }, {
          opacity: 1, x: 0, duration: .75, ease: "power2.out",
          scrollTrigger: { trigger: label, start: "top 87%", toggleActions: "play none none reverse" }
        });
      });
      const hero = document.querySelector(".hero-studio");
      if (hero) {
        gsap.to(hero, {
          y: -48, rotate: -1.5, ease: "none",
          scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: .7 }
        });
      }
    });
    window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    // Native anchor scrolling stays intact; provide a skip link before the long sequence.
    document.querySelectorAll('a[href="#work"],a[href="#scroll-journey"]').forEach(link => {
      link.addEventListener("click", () => {
        // Refresh after jumping past a pinned sequence (for Safari / mobile rotation).
        window.requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();