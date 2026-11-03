/**
 * JE. DIGITAL UNIVERSE — GSAP SCROLL STORYTELLING COORDINATOR
 * Orchestrates fluid section reveals, layer depth transitions,
 * smooth project entrances, and contact mascot greeting without scroll hijacking.
 * 
 * Flow: Hero (#top) → About (#about) → Skills (#skills) → Projects (#work) → Contact (#contact)
 * Adheres strictly to prefers-reduced-motion and gracefully degrades if GSAP is unavailable.
 */

(function () {
  'use strict';

  function initScrollJourney() {
    if (!window.gsap || !window.ScrollTrigger) {
      console.info('[ScrollJourney] GSAP or ScrollTrigger not loaded; falling back to native CSS layout.');
      return;
    }

    const gsap = window.gsap;
    const ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);

    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      console.info('[ScrollJourney] prefers-reduced-motion active. Skipping scroll motion tweens.');
      return;
    }

    const header = document.querySelector('.site-header');
    const headerHeight = () => Math.round(header ? header.getBoundingClientRect().height : 72);

    // Ensure CSS scroll-margin-top is dynamically kept in sync
    const updateHeaderOffset = () => {
      document.documentElement.style.setProperty('--site-header-height', `${headerHeight()}px`);
    };
    updateHeaderOffset();
    window.addEventListener('resize', updateHeaderOffset, { passive: true });

    // 1. Restrained Section Reveals (Hero → About → Skills → Projects → Contact)
    const sections = [
      { id: '#about', title: '#about-title', copy: '.about-copy', aside: '.about-sidebar' },
      { id: '#skills', title: '#skills-title', cards: '.skill-domain-card', toolkit: '.toolkit-interactive' },
      { id: '#work', title: '#work-title', filter: '.work-filter-bar', tabs: '.project-tabs', panel: '.project-panel:not([hidden])' },
      { id: '#contact', title: '#contact-title', actions: '.contact-actions' }
    ];

    sections.forEach((secConfig) => {
      const sectionEl = document.querySelector(secConfig.id);
      if (!sectionEl) return;

      const titleEl = secConfig.title ? sectionEl.querySelector(secConfig.title) : null;
      if (titleEl) {
        gsap.fromTo(titleEl, 
          { opacity: 0.15, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: titleEl,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Staggered domain cards in Skills
      if (secConfig.cards) {
        const cards = sectionEl.querySelectorAll(secConfig.cards);
        if (cards.length > 0) {
          gsap.fromTo(cards,
            { opacity: 0.2, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: cards[0],
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      }

      // Subtle entrance for project showcase
      if (secConfig.tabs) {
        const tabsEl = sectionEl.querySelector(secConfig.tabs);
        if (tabsEl) {
          gsap.fromTo(tabsEl,
            { opacity: 0.3, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: tabsEl,
                start: 'top 88%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      }
    });

    // 2. Mascot Friendly Wave on Contact Section Entrance
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      let hasWaved = false;
      ST.create({
        trigger: contactSection,
        start: 'top 78%',
        onEnter: () => {
          if (!hasWaved) {
            hasWaved = true;
            if (window.councilStage && typeof window.councilStage.triggerWave === 'function') {
              window.councilStage.triggerWave(window.councilStage.activeCharacterKey, 2600);
            }
          }
        }
      });
    }

    // 3. Subtle Perspective Tilt on Project Previews (Hover devices only)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const projectFigures = document.querySelectorAll('.project-panel-preview, .project-panel figure, .project-panel [data-tilt]');
      projectFigures.forEach((fig) => {
        let bounds;
        const onEnter = () => { bounds = fig.getBoundingClientRect(); };
        const onMove = (e) => {
          if (!bounds) bounds = fig.getBoundingClientRect();
          const mouseX = e.clientX - bounds.left;
          const mouseY = e.clientY - bounds.top;
          const xPct = (mouseX / bounds.width - 0.5) * 2;
          const yPct = (mouseY / bounds.height - 0.5) * 2;
          gsap.to(fig, {
            rotationY: xPct * 4,
            rotationX: -yPct * 4,
            transformPerspective: 900,
            duration: 0.35,
            ease: 'power1.out'
          });
        };
        const onLeave = () => {
          gsap.to(fig, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        };

        fig.addEventListener('mouseenter', onEnter, { passive: true });
        fig.addEventListener('mousemove', onMove, { passive: true });
        fig.addEventListener('mouseleave', onLeave, { passive: true });
      });
    }

    // Refresh ScrollTrigger when theme changes or window resizes
    window.addEventListener('themechange', () => ST.refresh());
    window.addEventListener('resize', () => ST.refresh(), { passive: true });
  }

  // Execute after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollJourney);
  } else {
    initScrollJourney();
  }
})();
