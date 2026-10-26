/**
 * JE. DIGITAL UNIVERSE — SCROLL DIRECTOR
 * Coordinates contextual AI Council hosting as the visitor navigates
 * between portfolio sections without interrupting user reading flow.
 */

class ScrollDirector {
  constructor(dialogueEngine) {
    this.engine = dialogueEngine;
    this.currentSection = null;
    this.sectionPrompts = {
      'top': {
        char: 'gemini',
        text: "Welcome to Jhon's Portfolio! I'm Gemini. Need a tour?",
        chips: ['Start Tour', 'Meet the Characters', 'Explore Projects']
      },
      'work': {
        char: 'codex',
        text: "You're exploring Jhon's Selected Work: 7 production and civic software applications across transport, B2B procurement, campus portals, and water services.",
        chips: ['AquaFlow System', 'TODA Guide', 'AntiqueRide App', 'Tech Stack']
      },
      'skills': {
        char: 'grok',
        text: "Here are Jhon's Core Technical Skills: Next.js 16, React 19, Kotlin Compose, Laravel 11, Supabase, and real-time cloud databases. Click any tool to see where it was used!",
        chips: ['Web Engineering', 'Android Architecture', 'Backend & Cloud', 'Civic Tech & Security']
      },
      'about': {
        char: 'claude',
        text: "Hi, I'm Claude! Jhon is a senior BSIT student at St. Anthony's College, building high-impact software that serves everyday communities in Antique Province.",
        chips: ['Academic Background', 'Why His Profile Matters', 'Collaborate']
      },
      'contact': {
        char: 'council',
        text: "Ready to work together or hire Jhon? Launch our Guided Inquiry Planner or send Jhon a direct email.",
        chips: ['Launch Inquiry Planner', 'Copy Email', 'GitHub Profile']
      }
    };

    this.initObserver();
  }

  initObserver() {
    if (!('IntersectionObserver' in window)) return;

    const sections = ['top', 'work', 'skills', 'about', 'contact'];
    const elements = sections.map(id => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          const sectionId = entry.target.id;
          if (sectionId !== this.currentSection) {
            this.currentSection = sectionId;
            this.handleSectionEnter(sectionId);
          }
        }
      });
    }, {
      threshold: 0.3
    });

    elements.forEach(el => observer.observe(el));
  }

  handleSectionEnter(sectionId) {
    const config = this.sectionPrompts[sectionId];
    if (!config || !this.engine) return;

    // Do not disrupt if user is currently interacting in chat drawer
    const drawer = document.getElementById('concierge-drawer');
    if (drawer && drawer.classList.contains('open')) return;

    this.engine.setActiveCharacter(config.char);
    this.engine.speak({
      character: config.char,
      text: config.text,
      chips: config.chips
    }, { addToDrawer: false });
  }
}

window.ScrollDirector = ScrollDirector;
