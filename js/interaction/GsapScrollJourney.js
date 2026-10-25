/**
 * JE. Digital Universe — scroll story director.
 * A single ScrollTrigger owns the pinned horizontal sequence.
 * All transitions can reverse cleanly, and static content works without GSAP.
 */
(function () {
  "use strict";

  function initScrollJourney() {
    const root = document.getElementById("scroll-journey");
    if (!root || !window.gsap || !window.ScrollTrigger) return;

    const gsap = window.gsap;
    const ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);

    const viewport = root.querySelector(".je-scroll-viewport");
    const track = root.querySelector(".je-scroll-track");
    const chapters = Array.from(root.querySelectorAll(".je-chapter"));
    const fills = Array.from(root.querySelectorAll(".je-journey-dot"));
    const counter = root.querySelector(".je-story-mark");
    const header = document.querySelector(".site-header");

    if (!viewport || !track || chapters.length < 2) return;

    const headerHeight = () => Math.max(0, Math.round(header?.getBoundingClientRect().height || 0));
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

    let lastIndex = -1;
    const getColors = () => document.documentElement.dataset.theme === "light"
      ? ["#7c3aed", "#0284c7", "#1e293b", "#c2410c"]
      : ["#d3a6ff", "#76d8ff", "#f0f2f8", "#ffb678"];

    const setProgress = (progress) => {
      const scaled = Math.min(chapters.length - 1, Math.max(0, progress * (chapters.length - 1)));
      const index = Math.min(chapters.length - 1, Math.floor(scaled + .5));
      const colors = getColors();
      if (index !== lastIndex) {
        lastIndex = index;
        root.style.setProperty("--je-chapter-color", colors[index] || (document.documentElement.dataset.theme === "light" ? "#466a0b" : "#caff6b"));
        if (counter) counter.textContent = String(index + 1).padStart(2, "0") + " / " + String(chapters.length).padStart(2, "0");
      }
      fills.forEach((dot, i) => {
        dot.style.setProperty("--je-fill", String(Math.max(0, Math.min(1, scaled - i + 1))));
      });
    };
    setProgress(0);

    window.addEventListener("themechange", () => {
      lastIndex = -1;
      const st = ST.getById("je-horizontal-story");
      if (st) setProgress(st.progress);
      else setProgress(0);
    });

    // Desktop only. Mobile, reduced motion and failed-CDN cases always show
    // all chapters naturally in the page flow.
    const media = gsap.matchMedia();
    media.add("(min-width: 901px) and (min-height: 460px) and (prefers-reduced-motion: no-preference)", () => {
      root.style.setProperty("--je-header-height", headerHeight() + "px");
      root.classList.add("je-gsap-active");
      const travel = () => Math.max(1, distance());

      // Pin the ACTUAL viewport, not its ancestor. This prevents early jumps,
      // intro clipping and the sticky header offset mismatch.
      const pan = gsap.to(track, {
        x: () => -travel(),
        ease: "none",
        overwrite: "auto",
        scrollTrigger: {
          id: "je-horizontal-story",
          trigger: viewport,
          pin: true,
          pinSpacing: true,
          start: () => "top top+=" + headerHeight(),
          end: () => "+=" + Math.round(travel() * .82),
          invalidateOnRefresh: true,
          scrub: .9,
          anticipatePin: 0,
          onUpdate(self) { setProgress(self.progress); },
          onRefresh(self) {
            root.style.setProperty("--je-header-height", headerHeight() + "px");
            setProgress(self.progress);
          }
        }
      });

      // Choreograph each chapter as it ENTERS the viewport. These use the
      // parent horizontal tween for correct measurements while scrubbing.
      chapters.slice(1).forEach((chapter) => {
        const copy = chapter.querySelector(".je-chapter-copy");
        const art = chapter.querySelector(".je-chapter-art");
        if (copy) {
          gsap.fromTo(copy, { x: 75, opacity: .36 }, {
            x: 0, opacity: 1, ease: "none",
            scrollTrigger: {
              trigger: chapter, containerAnimation: pan,
              start: "left 93%", end: "left 49%", scrub: true
            }
          });
        }
        if (art) {
          gsap.fromTo(art, { x: 85, rotateY: -16, scale: .88, opacity: .55 }, {
            x: 0, rotateY: 0, scale: 1, opacity: 1, ease: "none",
            scrollTrigger: {
              trigger: chapter, containerAnimation: pan,
              start: "left 98%", end: "left 48%", scrub: true
            }
          });
        }
      });

      // A subtle 3D illustration response throughout the scroll journey.
      gsap.fromTo(root.querySelectorAll(".je-robot-float"),
        { y: 17, rotateY: -11 }, {
          y: -14, rotateY: 13, ease: "none",
          scrollTrigger: {
            trigger: viewport, start: () => "top top+=" + headerHeight(),
            end: () => "+=" + Math.round(travel() * .82),
            scrub: 1.4, invalidateOnRefresh: true
          }
        });

      return () => {
        root.classList.remove("je-gsap-active");
        root.style.removeProperty("--je-header-height");
        lastIndex = -1;
        setProgress(0);
      };
    });

    // On smaller devices, reveal the chapter artwork without hijacking native scroll.
    media.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      chapters.forEach((chapter) => {
        const art = chapter.querySelector(".je-chapter-art");
        if (!art) return;
        gsap.fromTo(art, { opacity: .65, y: 35 }, {
          opacity: 1, y: 0, duration: .75, ease: "power2.out",
          scrollTrigger: {
            trigger: chapter, start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });
    });

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const labels = document.querySelectorAll(
        "#work .section-topline, #motion-lab .lab-badge, #playground .section-topline, #about .section-topline, #approach .section-topline, #contact .section-topline"
      );
      labels.forEach((label) => {
        gsap.fromTo(label, { opacity: .4, x: -16 }, {
          opacity: 1, x: 0, ease: "power2.out", duration: .6,
          scrollTrigger: {
            trigger: label, start: "top 88%",
            toggleActions: "play none none reverse"
          }
        });
      });
    });

    // Refresh dimensions once imagery and fonts settle, but do NOT refresh on
    // every anchor click (which previously caused visible jumpiness).
    const refresh = () => ST.refresh();
    if (document.readyState !== "complete") {
      window.addEventListener("load", refresh, { once: true });
    }
    document.fonts?.ready?.then(refresh).catch(() => {});
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", initScrollJourney, { once: true });
  else initScrollJourney();
})();