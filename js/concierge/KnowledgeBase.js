/**
 * JE. DIGITAL UNIVERSE — KNOWLEDGE BASE
 * Verified source of truth for Jhon Kylho Estrabo's portfolio,
 * background, education, demonstrated skills, and 7 projects.
 */

const JhonKnowledgeBase = {
  developer: {
    name: "Jhon Kylho Estrabo",
    monogram: "je.",
    role: "Fullstack Web and Mobile Developer / IT Student",
    institution: "St. Anthony's College",
    seniorHighSchool: "Antique National School",
    education: [
      { degree: "BS Information Technology", school: "St. Anthony's College", period: "2022 — Present", status: "Currently studying" },
      { degree: "Senior High School · HUMSS", school: "Antique National School", period: "2020 — 2022", status: "Graduated" }
    ],
    location: "San Jose de Buenavista, Antique, Philippines",
    timezone: "Asia/Manila (UTC+8)",
    headline: "Ideas into interfaces. Code into possibility.",
    creativeStatement: "Made to move. Built to feel.",
    bio: "I build thoughtful digital experiences for everyday needs. A little curiosity, a lot of intention, and people at the heart of it all.",
    availability: "Open to software projects & collaborations.",
    github: "https://github.com/kylho1231",
    portfolioUrl: "https://kylho1231.github.io/portfolio/",
    email: "jhonkylhoestrabo@gmail.com"
  },

  skills: {
    frontend: ["React", "Next.js", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "HTML5 / Accessible Semantics", "Interactive WebGL / Three.js"],
    mobile: ["Kotlin", "Android Studio", "Progressive Web Apps (PWA)"],
    backend: ["Node.js", "Express", "Firebase / Firestore", "Supabase / PostgreSQL", "REST APIs", "Authentication / WebAuthn"],
    architecture: ["System Design", "Relational & Document Databases", "Responsive UI", "Motion Design", "State Management"]
  },

  projects: [
    {
      id: "aquaflow",
      title: "AquaFlow",
      tagline: "Water Refilling Station Management System",
      stack: ["Next.js", "Supabase", "Tailwind CSS", "TypeScript"],
      description: "An operational management system for water refilling businesses featuring customer subscription tracking, inventory monitoring, route logistics, and order delivery workflows.",
      simulatorId: "aquaflow-sim",
      liveDemo: "https://aquaflow-preview.vercel.app/"
    },
    {
      id: "toda",
      title: "TODA Tricycle Guide",
      tagline: "Tricycle Route & Fare Guidance System",
      stack: ["React", "Leaflet", "OpenStreetMap", "LocalStorage"],
      description: "A community-focused navigation tool for commuters and tricycle drivers in San Jose, Antique, providing transparent fare calculation, terminal mapping, and offline-ready route lookup.",
      simulatorId: "toda-sim",
      liveDemo: "https://kylho1231.github.io/portfolio/#work"
    },
    {
      id: "scholarship",
      title: "Antique Provincial Scholarship Portal",
      tagline: "Municipal Student Financial Assistance Platform",
      stack: ["Next.js", "Supabase", "Tailwind CSS"],
      description: "A streamlined grant application and document evaluation system serving students across Antique province with real-time status tracking and eligibility auditing.",
      simulatorId: "scholarship-sim",
      liveDemo: "https://kylho1231.github.io/portfolio/#work"
    },
    {
      id: "motorelease",
      title: "Yamaha OR/CR Releasing System",
      tagline: "Dealership Vehicle Documentation Management",
      stack: ["Next.js", "Firebase Firestore", "Tailwind CSS"],
      description: "Automated document queue and customer SMS notification portal tracking motorcycle registration certificates (OR/CR) from LTO submission to customer handover.",
      simulatorId: "motorelease-sim",
      liveDemo: "https://kylho1231.github.io/portfolio/#work"
    },
    {
      id: "ecocollect",
      title: "Basura EcoCollect",
      tagline: "Smart Waste Collection & Passkey System",
      stack: ["React", "WebAuthn / Passkeys", "Tailwind CSS"],
      description: "A civic environmental platform connecting households and collection trucks with biometric passkey authentication, scheduled pickups, and waste diversion analytics.",
      simulatorId: "ecocollect-sim",
      liveDemo: "https://kylho1231.github.io/portfolio/#work"
    },
    {
      id: "antiquesupply",
      title: "Antique Supply B2B Marketplace",
      tagline: "Wholesale Procurement Platform",
      stack: ["Next.js", "Supabase", "Tailwind CSS"],
      description: "A regional commerce platform linking local agricultural producers and suppliers with Antique restaurants and retail establishments for transparent bulk ordering.",
      simulatorId: "antiquesupply-sim",
      liveDemo: "https://antique-supply-marketplace.vercel.app/"
    },
    {
      id: "antiqueride",
      title: "AntiqueRide",
      tagline: "Antique Commuter & Transit Guide",
      stack: ["Vanilla JavaScript", "Leaflet", "Canvas Simulation", "LocalStorage"],
      description: "A comprehensive transit companion for Antique province commuters featuring live route pathfinding, fare verification, municipal terminal rosters, and transport schedules.",
      simulatorId: "antiqueride-sim",
      liveDemo: "https://antiqueride.vercel.app/"
    }
  ],

  characters: {
    gemini: {
      name: "GEMINI",
      title: "Main Tour Guide & Project Presenter",
      accent: "#699CFF",
      role: "Welcomes visitors, conducts guided portfolio tours, and presents interactive project showcases.",
      intro: "Welcome to Jhon's Portfolio! I'm Gemini. Need a tour?"
    },
    codex: {
      name: "CODEX",
      title: "Programming Expert & Technical Guide",
      accent: "#38BDF8",
      role: "Explains code architectures, full-stack systems, Kotlin mobile development, and software architecture.",
      intro: "Hello, developer! I'm Codex. Curious about how Jhon builds his applications? I can explain his code, technology choices, and software architecture!"
    },
    code: {
      name: "CODEX",
      title: "Programming Expert & Technical Guide",
      accent: "#38BDF8",
      role: "Explains code architectures, full-stack systems, Kotlin mobile development, and software architecture.",
      intro: "Hello, developer! I'm Codex. Curious about how Jhon builds his applications? I can explain his code, technology choices, and software architecture!"
    },
    claude: {
      name: "CLAUDE",
      title: "About Me Guide & Storyteller",
      accent: "#F97316",
      role: "Shares Jhon's creative journey, education at St. Anthony's College and Antique National School, and roots in Antique.",
      intro: "Hi there! I'm Claude. Welcome to Jhon's little digital universe! Would you like to know more about the person behind these amazing projects?"
    },
    grok: {
      name: "GROK",
      title: "Motion Lab Host & Creative Promoter",
      accent: "#9A83FF",
      role: "Demonstrates tactile physics experiments, 3D interactive cards, and creative project highlights.",
      intro: "Hey! I'm Grok. You want something impressive? Check out what Jhon has been building. Trust me, there's some fun stuff here."
    },
    council: {
      name: "CHIBI COUNCIL",
      title: "Unified 3D Chibi Mascot Ensemble",
      accent: "#38BDF8",
      role: "All four adorable chibi robot companions gathered on the central stage.",
      intro: "Welcome to the Chibi AI Universe! GEMINI, CODEX, CLAUDE, and GROK are here together to guide you through Jhon Kylho Estrabo's creative universe."
    }
  },

  disclosure: "The AI Council characters are original, interactive 3D companions designed and built by Jhon Kylho Estrabo as portfolio guides. They are not affiliated with or endorsed by Anthropic, Google, or xAI."
};

window.JhonKnowledgeBase = JhonKnowledgeBase;
