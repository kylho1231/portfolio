/**
 * JE. DIGITAL UNIVERSE — INTENT ROUTER
 * Deterministic classifier routing natural language inquiries and quick chips
 * to character responses, direct actions, and portfolio anchors.
 */

class IntentRouter {
  constructor(kb) {
    this.kb = kb || window.JhonKnowledgeBase;
  }

  route(queryText, activeChar = 'gemini') {
    // 0. Tour & Navigation Guidance (Prompt Section 4 & 8)
    if (q.includes('tour') || q.includes('guide me') || q.includes('start tour') || q.includes('walkthrough')) {
      return {
        intent: 'guided_tour',
        character: 'gemini',
        text: "I'd love to give you a tour of Jhon's portfolio! Here are the main highlights:\n\n• **01 / Selected Work**: 7 verified production projects with interactive web simulators\n• **02 / Technical Skills & Stack**: Web, Android, Cloud, and Database architecture\n• **03 / About & Credentials**: BSIT senior at St. Anthony's College and civic impact\n• **04 / Contact & Collaboration**: Project inquiry planner & direct reachout",
        actionAnchor: '#work',
        actionLabel: 'Begin Tour (Selected Work)',
        chips: ['Explore Projects', 'View Technical Skills', 'About Jhon', 'Contact']
      };
    }

    if (q.includes('meet') || q.includes('mascot') || q.includes('chibi') || q.includes('who are you') || q.includes('characters')) {
      return {
        intent: 'meet_mascots',
        character: 'gemini',
        text: "Meet our 3D Chibi Robot team!\n\n• **GEMINI (Rainbow)**: Tour guide & project presenter\n• **CODEX (Blue)**: Systems architect & programming expert\n• **CLAUDE (Orange)**: Storyteller & About Me guide\n• **GROK (Black & White)**: Motion Lab host & creative promoter\n\nClick any companion in the dock or pills above to chat with them!",
        chips: ['Chat with CODEX', 'Chat with CLAUDE', 'Chat with GROK', 'Start Tour']
      };
    }

    const q = (queryText || '').toLowerCase().trim();

    // 1. Specific Project Matches
    if (q.includes('aquaflow') || q.includes('water refilling')) {
      const proj = this.kb.projects.find(p => p.id === 'aquaflow');
      return {
        intent: 'project_aquaflow',
        character: 'code',
        text: `**${proj.title}** is ${proj.description}\n\nBuilt with **${proj.stack.join(', ')}**. You can test its interactive ordering simulator right in the playground below or check its live Vercel deployment!`,
        actionUrl: proj.liveDemo,
        actionLabel: 'Open AquaFlow',
        chips: ['View Architecture', 'See Other Projects', 'Contact Jhon']
      };
    }

    if (q.includes('toda') || q.includes('tricycle') || q.includes('fare')) {
      const proj = this.kb.projects.find(p => p.id === 'toda');
      return {
        intent: 'project_toda',
        character: 'code',
        text: `**${proj.title}** is a commuter guidance system for San Jose, Antique. It computes municipal fares, maps terminal locations, and saves routes offline.\n\nBuilt with **${proj.stack.join(', ')}**. Check out the interactive route simulator in the Selected Work section!`,
        actionAnchor: '#work',
        actionLabel: 'View TODA in Work',
        chips: ['Try AntiqueRide', 'All Projects', 'Tech Stack']
      };
    }

    if (q.includes('scholarship') || q.includes('grant') || q.includes('provincial')) {
      const proj = this.kb.projects.find(p => p.id === 'scholarship');
      return {
        intent: 'project_scholarship',
        character: 'claude',
        text: `The **${proj.title}** simplifies student financial aid for Antique province scholars. It features automated application scoring, status tracking, and document verification.\n\nStack: **${proj.stack.join(', ')}**.`,
        actionAnchor: '#work',
        actionLabel: 'View Scholarship System',
        chips: ['AquaFlow Project', 'TODA Guide', 'Hire Jhon']
      };
    }

    if (q.includes('yamaha') || q.includes('or/cr') || q.includes('motorelease')) {
      const proj = this.kb.projects.find(p => p.id === 'motorelease');
      return {
        intent: 'project_motorelease',
        character: 'code',
        text: `The **${proj.title}** manages dealership vehicle documents. It streamlines registration queues with LTO and notifies customers via SMS upon release readiness.\n\nStack: **${proj.stack.join(', ')}**.`,
        actionAnchor: '#work',
        actionLabel: 'Explore MotorRelease',
        chips: ['Basura EcoCollect', 'Antique Supply', 'Who is Jhon?']
      };
    }

    if (q.includes('basura') || q.includes('ecocollect') || q.includes('waste') || q.includes('passkey')) {
      const proj = this.kb.projects.find(p => p.id === 'ecocollect');
      return {
        intent: 'project_ecocollect',
        character: 'grok',
        text: `**${proj.title}** tackles municipal waste management with modern tech! It features WebAuthn biometric passkey authentication, scheduled collection routes, and diversion analytics.\n\nStack: **${proj.stack.join(', ')}**.`,
        actionAnchor: '#work',
        actionLabel: 'Test EcoCollect Simulator',
        chips: ['View Skills & Stack', 'Antique Supply B2B', 'Tech Stack']
      };
    }

    if (q.includes('antique supply') || q.includes('marketplace') || q.includes('b2b')) {
      const proj = this.kb.projects.find(p => p.id === 'antiquesupply');
      return {
        intent: 'project_antiquesupply',
        character: 'gemini',
        text: `**${proj.title}** is a regional B2B commerce platform linking local agricultural producers and suppliers with Antique restaurants and retail establishments for transparent bulk ordering.\n\nStack: **${proj.stack.join(', ')}**.`,
        actionUrl: proj.liveDemo,
        actionLabel: 'Open Antique Supply',
        chips: ['AntiqueRide Guide', 'AquaFlow', 'Contact Jhon']
      };
    }

    if (q.includes('antiqueride') || q.includes('transit') || q.includes('commuter')) {
      const proj = this.kb.projects.find(p => p.id === 'antiqueride');
      return {
        intent: 'project_antiqueride',
        character: 'gemini',
        text: `**${proj.title}** provides interactive route pathfinding, fare verification, municipal terminal rosters, and transport schedules for Antique province commuters.\n\nStack: **${proj.stack.join(', ')}**.`,
        actionUrl: proj.liveDemo,
        actionLabel: 'Launch AntiqueRide',
        chips: ['TODA App', 'All Projects', 'Hire Jhon']
      };
    }

    // 2. Who is Jhon / About / Bio
    if (q.includes('who is') || q.includes('about') || q.includes('bio') || q.includes('background') || q.includes('tell me about')) {
      return {
        intent: 'about_jhon',
        character: 'claude',
        text: `**${this.kb.developer.name}** (${this.kb.developer.monogram}) is a **${this.kb.developer.role}** based in ${this.kb.developer.location}.\n\nStudying Information Technology at **${this.kb.developer.institution}**, Jhon creates thoughtful digital experiences for everyday community and business needs. "${this.kb.developer.headline}"`,
        actionAnchor: '#about',
        actionLabel: 'Read Full Story',
        chips: ['Core Skills', 'Selected Projects', 'Start a Collaboration']
      };
    }

    // Education & School Background
    if (q.includes('school') || q.includes('college') || q.includes('education') || q.includes('degree') || q.includes('study') || q.includes('ans') || q.includes('humss')) {
      return {
        intent: 'education_background',
        character: 'claude',
        text: `Jhon's educational journey in Antique, Philippines:

• **BS Information Technology** (2022 — Present) · **St. Anthony's College**
• **Senior High School (HUMSS)** (2020 — 2022) · **Antique National School**`,
        actionAnchor: '#about',
        actionLabel: 'View Education in About',
        chips: ['Who is Jhon?', 'Core Skills', 'Selected Projects']
      };
    }

    // 3. Technical Skills / Tech Stack
    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('framework') || q.includes('react') || q.includes('kotlin') || q.includes('database')) {
      return {
        intent: 'skills_overview',
        character: 'code',
        text: `Jhon's technical foundation spans:\n\n• **Frontend & Web:** ${this.kb.skills.frontend.slice(0, 5).join(', ')}\n• **Mobile Development:** ${this.kb.skills.mobile.join(', ')}\n• **Backend & Cloud:** ${this.kb.skills.backend.join(', ')}\n• **Architecture:** ${this.kb.skills.architecture.join(', ')}`,
        actionAnchor: '#work',
        actionLabel: 'See Applied Code',
        chips: ['Explore Projects', 'View Skills & Stack', 'Contact Jhon']
      };
    }

    // 4. Projects Overview
    if (q.includes('project') || q.includes('work') || q.includes('showcase') || q.includes('portfolio') || q.includes('built')) {
      return {
        intent: 'projects_overview',
        character: 'gemini',
        text: `Jhon has built 7 production-grade and civic solutions:\n\n1. **AquaFlow** (Water refilling operations)\n2. **TODA Guide** (Commuter & fare calculator)\n3. **Antique Provincial Scholarship** (Municipal aid)\n4. **Yamaha MotorRelease** (LTO document portal)\n5. **Basura EcoCollect** (Waste tracking with passkeys)\n6. **Antique Supply B2B** (Regional marketplace)\n7. **AntiqueRide** (Provincial transit companion)`,
        actionAnchor: '#work',
        actionLabel: 'Jump to Selected Work',
        chips: ['AquaFlow Demo', 'AntiqueRide App', 'Interactive Simulators']
      };
    }

    // 5. Technical Skills & Architecture
    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('framework') || q.includes('tools') || q.includes('know')) {
      return {
        intent: 'skills_overview',
        character: 'grok',
        text: `Here are Jhon's core technical competencies:\n\n1. **Web & Full-Stack**: Next.js 16/15/14, React 19/18, TypeScript, Tailwind CSS v4, PWA\n2. **Native Android**: Kotlin, Jetpack Compose, Material Design 3, Room SQLite\n3. **Backend & Cloud**: Laravel 11, Supabase (PostgreSQL), Firebase Firestore, MySQL\n4. **Specialized Integrations**: Leaflet GIS, WebAuthn Passkeys, Semaphore SMS, RA 10173 Privacy`,
        actionAnchor: '#skills',
        actionLabel: 'View Skills & Stack',
        chips: ['Web Engineering', 'Android Architecture', 'Cloud & Data', 'Specialized Tech']
      };
    }

    // 6. Contact / Hiring / Collaboration
    if (q.includes('hire') || q.includes('contact') || q.includes('collaborate') || q.includes('email') || q.includes('pricing') || q.includes('work together') || q.includes('quote') || q.includes('freelance')) {
      return {
        intent: 'contact_hire',
        character: 'grok',
        text: `Jhon is **${this.kb.developer.availability}**!\n\nWhether you need a full-stack web platform (Next.js/React), native Android app (Kotlin), or a bespoke spatial UI, click below to launch the **Guided Project Planner** or email directly at **${this.kb.developer.email}**.`,
        openPlanner: true,
        actionAnchor: '#contact',
        actionLabel: 'Launch Project Planner',
        chips: ['Open Inquiry Planner', 'Send Direct Email', 'View Projects']
      };
    }

    // 7. Council Explanation & Ethics
    if (q.includes('council') || q.includes('ai') || q.includes('character') || q.includes('guide') || q.includes('who are the')) {
      return {
        intent: 'council_info',
        character: 'claude',
        text: `We are the **AI Council** — four original procedural 3D companions designed by Jhon:\n\n• **CODE**: Systems architect & full-stack guide\n• **CLAUDE**: Storyteller & human-centered narrator\n• **GROK**: Spatial experimenter & action catalyst\n• **GEMINI**: Multimodal synthesis & civic tools\n\n*${this.kb.disclosure}*`,
        chips: ['Meet CODE', 'Meet GROK', 'Meet GEMINI', 'All Together']
      };
    }

    // 8. Friendly Greeting
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('sup') || q.includes('greetings')) {
      const activeInfo = this.kb.characters[activeChar] || this.kb.characters.code;
      return {
        intent: 'greeting',
        character: activeChar,
        text: `${activeInfo.intro}\n\nWhat would you like to explore today?`,
        chips: ['Who is Jhon?', 'Explore Projects', 'View Skills & Stack', 'Start a Project']
      };
    }

    // Default Fallback
    const fallbackChar = activeChar === 'council' ? 'code' : activeChar;
    return {
      intent: 'fallback',
      character: fallbackChar,
      text: `I'd love to help you explore Jhon's work! You can ask about his **10 verified projects**, **skills in React/Kotlin/Firebase**, **roots in Antique**, or use the quick links below:`,
      chips: ['AquaFlow Project', 'Who is Jhon?', 'View Skills & Stack', 'Contact & Hire']
    };
  }
}

window.IntentRouter = IntentRouter;
