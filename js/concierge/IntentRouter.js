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
    const q = (queryText || '').toLowerCase().trim();

    // 0. Primary Client Concierge Prompts (User Request Section 3)
    if (q.includes('show me your projects') || q.includes('show projects') || q.includes('explore projects') || q.includes('view projects')) {
      return {
        intent: 'projects_overview',
        character: 'gemini',
        text: `Jhon has engineered **10 verified production and civic applications** across Web and Mobile:\n\n• **AquaFlow**: Water refill PWA with biometric passkeys\n• **San Jose TODA**: Municipal fare calculator (Kotlin Android)\n• **SAC ISPSO**: Campus scholarship portal (Next.js 14)\n• **MotoRelease**: Dealership OR/CR release system (Laravel 11)\n• **EcoCollect SJ**: Solid waste scheduling & MENRO portal\n• **AntiqueSupply**: B2B regional commerce hub (Supabase)\n• **AntiqueRide**: Public tricycle transit guide & GIS\n• **SAC QueueFlow**: Smart campus queue & lobby monitor\n• **Pak na Pak**: Food ordering platform & 12 glazes\n• **WE GOT YOU**: Emergency roadside & repair discovery`,
        actionAnchor: '#work',
        actionLabel: 'Explore All 10 Projects ↗',
        chips: ['SAC QueueFlow', 'WE GOT YOU', 'What can you build?', 'How can I contact you?']
      };
    }

    if (q.includes('what can you build') || q.includes('what do you build') || q.includes('what can jhon build') || q.includes('capabilities') || q.includes('services')) {
      return {
        intent: 'capabilities',
        character: 'codex',
        text: `Here is what Jhon builds from concept to production:\n\n1. **Fullstack Web Apps & PWAs**: Responsive, offline-capable systems using Next.js 16/15, React 19, TypeScript, and Tailwind CSS v4.\n2. **Native Android Applications**: High-performance mobile apps built with Kotlin, Jetpack Compose, Material Design 3, and Room DB.\n3. **Cloud, Databases & APIs**: Realtime architectures using Supabase (PostgreSQL & PostGIS), Firebase Firestore, and Laravel 11 with Row-Level Security.\n4. **Civic & Enterprise Tech**: Real-time queuing, route GIS, SMS gateways, WebAuthn passkeys, and RA 10173 data privacy compliance.\n5. **Aerial & Visual Media**: Professional UAV drone piloting, aerial cinematography, photography, and video post-production.`,
        actionAnchor: '#skills',
        actionLabel: 'View Technical Stack ↗',
        chips: ['Show me your projects.', 'Tell me about your skills.', 'How can I contact you?']
      };
    }

    if (q.includes('tell me about your skills') || q.includes('tell me about skills') || q.includes('what are your skills') || q.includes('tech stack') || q.includes('technologies')) {
      return {
        intent: 'skills_overview',
        character: 'grok',
        text: `Jhon's technical foundation is organized into **5 core domains**:\n\n• **01 / Web Architecture**: Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4, PWA\n• **02 / Native Mobile**: Kotlin, Android Studio (API 34+), Jetpack Compose, Room SQLite\n• **03 / Backend & Cloud**: Laravel 11 LTS, Supabase (PostgreSQL), PostGIS, Firebase Firestore, Node.js\n• **04 / Civic Tech & Security**: Leaflet GIS, WebAuthn Passkeys, Semaphore SMS, QR verification\n• **05 / Aerial & Visual Media**: UAV Drone Piloting, Aerial Cinematography, Videography, Color Grading`,
        actionAnchor: '#skills',
        actionLabel: 'Inspect Interactive Toolkit ↗',
        chips: ['Show me your projects.', 'What can you build?', 'How can I contact you?']
      };
    }

    if (q.includes('how can i contact you') || q.includes('how to contact') || q.includes('contact jhon') || q.includes('hire') || q.includes('collaborate') || q.includes('email jhon')) {
      return {
        intent: 'contact_hire',
        character: 'claude',
        text: `Jhon is **open to software projects, internships, and community-focused collaborations**!\n\n• **Email**: ${this.kb.developer.email}\n• **GitHub**: github.com/kylho1231\n• **LinkedIn**: linkedin.com/in/jhon-kylho-estrabo-108a95268\n• **Location**: San Jose de Buenavista, Antique, Philippines (UTC+8)\n\nYou can also launch our Guided Project Inquiry Planner below to draft a structured project proposal!`,
        actionAnchor: '#contact',
        actionLabel: 'Go to Contact Section ↗',
        openPlanner: false,
        chips: ['Open Inquiry Planner', 'Show me your projects.', 'What can you build?']
      };
    }

    // Tour & Navigation Guidance
    if (q.includes('tour') || q.includes('guide me') || q.includes('start tour') || q.includes('walkthrough')) {
      return {
        intent: 'guided_tour',
        character: 'gemini',
        text: "I'd love to give you a tour of Jhon's portfolio! Here are the main highlights:\n\n• **About & Credentials**: Senior BSIT student at St. Anthony's College and visual storyteller\n• **Technical Capabilities**: 5 structured domains spanning Web, Android, Cloud, Civic, and Media\n• **Selected Work**: 10 production projects with interactive in-browser simulators\n• **Get in Touch**: Project collaboration and direct contact actions",
        actionAnchor: '#about',
        actionLabel: 'Begin Tour (About Jhon)',
        chips: ['Show me your projects.', 'Tell me about your skills.', 'How can I contact you?']
      };
    }

    if (q.includes('meet') || q.includes('mascot') || q.includes('chibi') || q.includes('who are you') || q.includes('characters')) {
      return {
        intent: 'meet_mascots',
        character: 'gemini',
        text: "Meet our 3D Chibi Mascot team!\n\n• **GEMINI (Rainbow)**: Visual ideas, creative exploration & project guide\n• **CODEX (Blue)**: Systems architect & programming expert\n• **CLAUDE (Orange)**: Planning, structure, UX & community context\n• **GROK (Black & White)**: Project exploration & playful problem solving\n\nClick any companion in the selector pills above or tap them directly on the stage to interact!",
        chips: ['Chat with CODEX', 'Chat with CLAUDE', 'Chat with GROK', 'Show me your projects.']
      };
    }

    // Specific Project Matches
    if (q.includes('queueflow') || q.includes('sac queue') || q.includes('queuing')) {
      return {
        intent: 'project_queueflow',
        character: 'codex',
        text: `**SAC QueueFlow** is a smart campus queuing and notification system for St. Anthony's College in Antique. It features class-conflict +45 min deferment holds, digital QR passes, and TV lobby monitor broadcasts.\n\nBuilt with **Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4, and Supabase Realtime**.`,
        actionAnchor: '#work',
        actionLabel: 'View SAC QueueFlow in Work',
        chips: ['Pak na Pak', 'WE GOT YOU', 'Show me your projects.']
      };
    }

    if (q.includes('pak na pak') || q.includes('paknapak') || q.includes('food') || q.includes('restaurant') || q.includes('glaze')) {
      return {
        intent: 'project_paknapak',
        character: 'gemini',
        text: `**Pak na Pak** is a restaurant web platform in San Jose, Antique featuring interactive 12 signature glaze tastings (e.g. Classic Buffalo, Garlic Parmesan, Salted Egg), ₱99 Sulit Zone student meals, and 1-click Facebook Messenger ordering.\n\nBuilt with **Next.js 16 (Turbopack), React 19, Tailwind CSS v4, and Messenger API Bridge**.`,
        actionAnchor: '#work',
        actionLabel: 'View Pak na Pak in Work',
        chips: ['WE GOT YOU', 'SAC QueueFlow', 'Show me your projects.']
      };
    }

    if (q.includes('we got you') || q.includes('wegotyou') || q.includes('roadside') || q.includes('repair') || q.includes('emergency')) {
      return {
        intent: 'project_wegotyou',
        character: 'codex',
        text: `**WE GOT YOU** is a local repair discovery, emergency roadside rescue, and towing dispatch platform across San Jose de Buenavista and Panay Island. Features sub-1.5s geolocation, live technician dispatch radar, and 1-tap direct 911/PNP emergency dialing.\n\nBuilt with **Next.js 15.5, React 19, MapLibre GL, and PostGIS / Supabase**.`,
        actionAnchor: '#work',
        actionLabel: 'View WE GOT YOU in Work',
        chips: ['SAC QueueFlow', 'AntiqueRide', 'Show me your projects.']
      };
    }

    if (q.includes('aquaflow') || q.includes('water refilling') || q.includes('water')) {
      const proj = this.kb.projects.find(p => p.id === 'aquaflow');
      return {
        intent: 'project_aquaflow',
        character: 'codex',
        text: `**AquaFlow** is an operational PWA for water refill stations. Features multi-tenant station isolation, Firebase Firestore transactions, biometric WebAuthn passkeys, and in-browser refill simulator.\n\nBuilt with **React 18, TypeScript, Tailwind CSS, Firebase Firestore, Express, and Vercel**.`,
        actionAnchor: '#work',
        actionLabel: 'View AquaFlow in Work',
        chips: ['San Jose TODA', 'Show me your projects.', 'What can you build?']
      };
    }

    if (q.includes('toda') || q.includes('tricycle') || q.includes('fare')) {
      return {
        intent: 'project_toda',
        character: 'codex',
        text: `**San Jose TODA** is a native Android application computing regulated municipal fares, mapping terminals, and providing offline rate matrices under Municipal Ordinances 2022-18 and 2024-01.\n\nBuilt with **Kotlin, Android Studio (API 37), Material Design 3, and ViewBinding**.`,
        actionAnchor: '#work',
        actionLabel: 'View TODA in Work',
        chips: ['AntiqueRide', 'Show me your projects.', 'What can you build?']
      };
    }

    if (q.includes('scholarship') || q.includes('ispso') || q.includes('scholarlink')) {
      return {
        intent: 'project_scholarship',
        character: 'claude',
        text: `**SAC ISPSO ScholarLink** centralizes scholarship grant management for St. Anthony's College, featuring DepEd LRN validation, dynamic digital QR stipend claiming passes for SAC Gym verification, and live alerts for UniFAST TES grants.\n\nBuilt with **Next.js 14, React 18, TypeScript, and Tailwind CSS**.`,
        actionAnchor: '#work',
        actionLabel: 'View ScholarLink in Work',
        chips: ['SAC QueueFlow', 'Show me your projects.', 'What can you build?']
      };
    }

    if (q.includes('motorelease') || q.includes('yamaha') || q.includes('or/cr')) {
      return {
        intent: 'project_motorelease',
        character: 'codex',
        text: `**MotoRelease** is a full-stack dealership logistics and self-service platform for Yamaha San Jose de Buenavista, tracking OR/CR release lifecycles and LTO license plates with automated Semaphore SMS alerts and RA 10173 privacy gates.\n\nBuilt with **Laravel 11 LTS, PHP 8.2+, Tailwind CSS, Alpine.js, MySQL, and Semaphore SMS**.`,
        actionAnchor: '#work',
        actionLabel: 'View MotoRelease in Work',
        chips: ['EcoCollect SJ', 'Show me your projects.', 'What can you build?']
      };
    }

    if (q.includes('ecocollect') || q.includes('basura') || q.includes('waste')) {
      return {
        intent: 'project_ecocollect',
        character: 'grok',
        text: `**EcoCollect SJ** is a civic solid waste collection and governance platform for San Jose de Buenavista with localized Kinaray-a waste segregation guides, driver route coordination, and photo-verified illegal dumping ticketing.\n\nBuilt with **Kotlin Compose, Next.js 15, TypeScript, and Cloud Firestore**.`,
        actionAnchor: '#work',
        actionLabel: 'View EcoCollect in Work',
        chips: ['AntiqueSupply', 'Show me your projects.', 'What can you build?']
      };
    }

    if (q.includes('antiquesupply') || q.includes('b2b') || q.includes('marketplace')) {
      return {
        intent: 'project_antiquesupply',
        character: 'gemini',
        text: `**AntiqueSupply** is a B2B regional marketplace linking Antique agricultural cooperatives with commercial buyers in Boracay and Panay Island, featuring Row-Level Security, atomic inventory locks, and RFQ pipelines.\n\nBuilt with **Next.js 15, React 19, Kotlin Compose, Supabase (PostgreSQL), and Room DB**.`,
        actionAnchor: '#work',
        actionLabel: 'View AntiqueSupply in Work',
        chips: ['AntiqueRide', 'Show me your projects.', 'What can you build?']
      };
    }

    if (q.includes('antiqueride') || q.includes('transit') || q.includes('booking')) {
      return {
        intent: 'project_antiqueride',
        character: 'gemini',
        text: `**AntiqueRide** is a smart tricycle transit and dispatch PWA featuring Leaflet / OpenStreetMap terminal pathfinding, fare verification, 4-digit security PINs, and automated tests.\n\nBuilt with **Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4, and PostGIS / Supabase**.`,
        actionAnchor: '#work',
        actionLabel: 'View AntiqueRide in Work',
        chips: ['WE GOT YOU', 'Show me your projects.', 'What can you build?']
      };
    }

    // Drone & Media
    if (q.includes('drone') || q.includes('pilot') || q.includes('photo') || q.includes('video') || q.includes('camera') || q.includes('edit') || q.includes('media') || q.includes('aerial') || q.includes('cinematography')) {
      return {
        intent: 'creative_media',
        character: 'claude',
        text: `Beyond software engineering, **${this.kb.developer.name}** is an active **drone pilot, photographer, videographer, and video editor**!\n\n• **Drone Piloting (UAV)**: Aerial cinematography and landscape perspectives across Antique\n• **Photography**: Commercial brand imagery, community documentary, and portraits\n• **Videography**: High-definition video filming and live event coverage\n• **Video Editing**: Cinematic pacing, color grading, sound design, and narrative post-production`,
        actionAnchor: '#skills',
        actionLabel: 'View Media Capabilities ↗',
        chips: ['Show me your projects.', 'What can you build?', 'Tell me about your skills.']
      };
    }

    // Who is Jhon / About / Bio
    if (q.includes('who is') || q.includes('about') || q.includes('bio') || q.includes('background') || q.includes('tell me about jhon')) {
      return {
        intent: 'about_jhon',
        character: 'claude',
        text: `**${this.kb.developer.name}** (${this.kb.developer.monogram}) is a **Fullstack Web and Mobile Developer** based in San Jose de Buenavista, Antique, Philippines.\n\nAs a senior IT student at **St. Anthony's College**, Jhon designs and ships practical digital systems and media that serve real community needs. "${this.kb.developer.headline}"`,
        actionAnchor: '#about',
        actionLabel: 'Read About Profile ↗',
        chips: ['Show me your projects.', 'What can you build?', 'How can I contact you?']
      };
    }

    // Friendly Greeting
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('sup') || q.includes('greetings')) {
      const activeInfo = this.kb.characters[activeChar] || this.kb.characters.gemini;
      return {
        intent: 'greeting',
        character: activeChar,
        text: `${activeInfo.intro}\n\nHow can I help you navigate Jhon's portfolio today?`,
        chips: ['Show me your projects.', 'What can you build?', 'Tell me about your skills.', 'How can I contact you?']
      };
    }

    // Default Fallback
    const fallbackChar = activeChar === 'council' ? 'gemini' : activeChar;
    return {
      intent: 'fallback',
      character: fallbackChar,
      text: `I'd love to help you explore Jhon's portfolio! You can ask about his **10 verified production projects**, **skills across Next.js/Kotlin/Supabase**, **drone & media work**, or pick an option below:`,
      chips: ['Show me your projects.', 'What can you build?', 'Tell me about your skills.', 'How can I contact you?']
    };
  }
}

window.IntentRouter = IntentRouter;
