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
        char: 'code',
        text: "Welcome to JE. Digital Universe. I'm CODE. Ask me anything about Jhon's full-stack architecture, Kotlin mobile apps, or civic projects.",
        chips: ['Explore Projects', 'Who is Jhon?', 'Digital Motion Lab', 'Contact Jhon']
      },
      'work': {
        char: 'code',
        text: "You're exploring Jhon's Selected Work. 7 verified systems across water utilities, municipal transport, waste collection, and B2B commerce.",
        chips: ['AquaFlow System', 'TODA Guide', 'AntiqueRide App', 'Tech Stack']
      },
      'motion-lab': {
        char: 'grok',
        text: "Welcome to the Digital Motion Lab! Try interacting with the spatial 3D card, magnetic button, and kinetic typography below.",
        chips: ['Spatial Card', 'Magnetic Button', 'Kinetic Typography']
      },
      'playground': {
        char: 'gemini',
        text: "The Interactive Playground lets you test working simulators right here in your browser. Which one would you like to run?",
        chips: ['AquaFlow Simulator', 'TODA Route Finder', 'AntiqueRide Pathfinding']
      },
      'about': {
        char: 'claude',
        text: "Rooted in San Jose, Antique, Jhon builds software grounded in real community needs. 'Ideas into interfaces. Code into possibility.'",
        chips: ['Read Philosophy', 'Education & Background', 'Collaborate']
      },
      'approach': {
        char: 'claude',
        text: "Jhon's process: Understand the human reality first, architect clean data models second, then build resilient, accessible interfaces.",
        chips: ['View Case Studies', 'Contact Jhon']
      },
      'contact': {
        char: 'council',
        text: "Ready to turn your vision into working software? Launch our Guided Inquiry Planner or send Jhon a direct email.",
        chips: ['Launch Inquiry Planner', 'Copy Email', 'GitHub Profile']
      }
    };

    this.initObserver();
  }

  initObserver() {
    if (!('IntersectionObserver' in window)) return;

    const sections = ['top', 'work', 'motion-lab', 'playground', 'about', 'approach', 'contact'];
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
