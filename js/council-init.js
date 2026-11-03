/**
 * JE. DIGITAL UNIVERSE — AI COUNCIL BOOTSTRAP INITIALIZER
 * Coordinates 3D procedural characters, spatial UI, concierge dialogue,
 * motion physics, and accessibility modes.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scene Manager (if Three.js and 3D canvas stage are present)
  const stageContainer = document.getElementById('council-hero-stage');
  const canvasContainer = document.getElementById('council-canvas-container');
  let sceneManager = null;
  let councilStage = null;

  function enableLiteMode() {
    if (stageContainer) stageContainer.classList.add('lite-mode');
    if (sceneManager) sceneManager.stop();
  }

  if (typeof THREE !== 'undefined' && canvasContainer && typeof ThreeSceneManager !== 'undefined') {
    sceneManager = new ThreeSceneManager(canvasContainer, {
      maxPixelRatio: window.innerWidth < 768 ? 1.5 : 2.0
    });

    const isWebGLReady = sceneManager.init();
    if (isWebGLReady && typeof CouncilStage !== 'undefined') {
      councilStage = new CouncilStage(sceneManager);
      window.councilStage = councilStage;
    } else {
      enableLiteMode();
    }
  } else {
    enableLiteMode();
  }

  // 2. Pointer Controller
  if (councilStage && typeof PointerController !== 'undefined') {
    const pointerController = new PointerController();
    pointerController.subscribe((x, y) => {
      councilStage.setPointer(x, y);
    });
  }

  // 3. Voice Manager (Opt-in Web Speech API)
  const voiceManager = new VoiceManager();
  const voiceBtn = document.getElementById('concierge-voice-btn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      const isVoiceOn = voiceManager.toggle();
      voiceBtn.classList.toggle('active', isVoiceOn);
      voiceBtn.setAttribute('aria-pressed', isVoiceOn ? 'true' : 'false');
      voiceBtn.title = isVoiceOn ? 'Mute AI Voice' : 'Enable AI Voice (Opt-in)';
      if (isVoiceOn && window.dialogueEngine) {
        voiceManager.speak("Audio output activated. I am ready to guide you.", dialogueEngine.activeCharacter);
      }
    });
  }

  // 4. Guided Inquiry Builder
  const inquiryModal = document.getElementById('inquiry-planner-modal');
  const inquiryBuilder = new InquiryBuilder({
    modalEl: inquiryModal,
    email: window.JhonKnowledgeBase?.developer?.email || "jhonkylhoestrabo@gmail.com"
  });
  window.inquiryBuilder = inquiryBuilder;

  // Open Planner Trigger in Drawer Header
  const openPlannerBtn = document.getElementById('open-planner-btn');
  if (openPlannerBtn) {
    openPlannerBtn.addEventListener('click', () => {
      inquiryBuilder.open();
    });
  }

  // 5. Dialogue Engine
  const dialogueEngine = new DialogueEngine({
    router: new IntentRouter(),
    stage: councilStage,
    voiceManager: voiceManager,
    stageBubbleEl: document.getElementById('council-speech-bubble'),
    stageSpeakerEl: document.getElementById('speech-speaker-label'),
    stageTextEl: document.getElementById('speech-text-content'),
    stageActionsEl: document.getElementById('speech-actions-container'),
    drawerMessagesEl: document.getElementById('concierge-messages'),
    drawerChipsEl: document.getElementById('concierge-quick-chips')
  });
  window.dialogueEngine = dialogueEngine;

  // 6. Character Selector Pills on Stage Header
  const charPills = document.querySelectorAll('#character-pills .char-pill');
  charPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const charKey = pill.getAttribute('data-char');
      updateActiveCharacterUI(charKey);
    });
  });

  // Drawer Character Switcher Bar
  const drawerCharBtns = document.querySelectorAll('.concierge-char-btn');
  drawerCharBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const charKey = btn.getAttribute('data-char');
      updateActiveCharacterUI(charKey);
    });
  });

  function updateActiveCharacterUI(charKey) {
    if (charKey === 'code') charKey = 'codex';
    // Update pills matching both codex and code
    charPills.forEach(p => {
      const pKey = p.getAttribute('data-char');
      const matches = pKey === charKey || (charKey === 'codex' && pKey === 'code');
      p.classList.toggle('active', matches);
      p.setAttribute('aria-selected', matches ? 'true' : 'false');
    });
    drawerCharBtns.forEach(b => {
      const bKey = b.getAttribute('data-char');
      const matches = bKey === charKey || (charKey === 'codex' && bKey === 'code');
      b.classList.toggle('active', matches);
      b.setAttribute('aria-selected', matches ? 'true' : 'false');
    });

    dialogueEngine.setActiveCharacter(charKey);

    // Initial greeting for character with primary client prompts
    const charMeta = window.JhonKnowledgeBase.characters[charKey] || window.JhonKnowledgeBase.characters.gemini;
    const chips = ['Show me your projects.', 'What can you build?', 'Tell me about your skills.', 'How can I contact you?'];

    dialogueEngine.speak({
      character: charKey,
      text: charMeta.intro,
      chips: chips
    });
  }
  window.updateActiveCharacterUI = updateActiveCharacterUI;

  // Speech Bubble Minimize/Expand Dismissal Toggle
  const speechBubble = document.getElementById('council-speech-bubble');
  const speechToggleBtn = document.getElementById('speech-toggle-btn');
  if (speechBubble && speechToggleBtn) {
    speechToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      speechBubble.classList.toggle('collapsed');
      const isCollapsed = speechBubble.classList.contains('collapsed');
      speechToggleBtn.textContent = isCollapsed ? '+' : '−';
      speechToggleBtn.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
      speechToggleBtn.setAttribute('title', isCollapsed ? 'Expand dialogue panel' : 'Dismiss / minimize dialogue panel');
    });
  }

  // 7. Stage Mode Button (3D Spatial vs Lite Mode)
  const stageModeBtn = document.getElementById('stage-mode-btn');
  if (stageModeBtn) {
    stageModeBtn.addEventListener('click', () => {
      if (stageContainer && stageContainer.classList.contains('lite-mode')) {
        stageContainer.classList.remove('lite-mode');
        stageModeBtn.textContent = '3D Mode';
        if (sceneManager) sceneManager.start();
      } else {
        enableLiteMode();
        stageModeBtn.textContent = 'Lite Mode';
      }
    });
  }

  // 8. Floating Council Dock & Concierge Drawer
  const dockToggleBtn = document.getElementById('dock-toggle-btn');
  const drawer = document.getElementById('concierge-drawer');
  const backdrop = document.getElementById('concierge-backdrop');
  const drawerCloseBtn = document.getElementById('concierge-close-btn');

  function openDrawer() {
    if (drawer) {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
    }
    if (backdrop) {
      backdrop.classList.add('open');
      backdrop.setAttribute('aria-hidden', 'false');
    }
    const chatInput = document.getElementById('concierge-input');
    if (chatInput) setTimeout(() => chatInput.focus(), 300);
  }

  function closeDrawer() {
    if (drawer) {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
    }
    if (backdrop) {
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
    }
  }

  if (dockToggleBtn) dockToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (inquiryModal && inquiryModal.classList.contains('open')) {
        inquiryBuilder.close();
      } else if (drawer && drawer.classList.contains('open')) {
        closeDrawer();
      }
    }
  });

  // 9. Concierge Chat Form
  const chatForm = document.getElementById('concierge-form');
  const chatInput = document.getElementById('concierge-input');
  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;
      chatInput.value = '';
      dialogueEngine.handleQuery(val);
    });
  }

  // 10. Motion Lab Controller
  const motionLab = new MotionLabController();
  window.motionLab = motionLab;

  // 11. Scroll Director
  const scrollDirector = new ScrollDirector(dialogueEngine);
  window.scrollDirector = scrollDirector;

  // 12. Handle prefers-reduced-motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function handleMotionPref(mq) {
    if (councilStage) councilStage.setReducedMotion(mq.matches);
  }
  mediaQuery.addEventListener('change', handleMotionPref);
  handleMotionPref(mediaQuery);

  // 13. Initial Welcome Greeting with GEMINI (Hero Mascot)
  setTimeout(() => {
    const geminiMeta = window.JhonKnowledgeBase.characters.gemini;
    dialogueEngine.setActiveCharacter('gemini');
    dialogueEngine.speak({
      character: 'gemini',
      text: geminiMeta.intro,
      chips: ['Show me your projects.', 'What can you build?', 'Tell me about your skills.', 'How can I contact you?']
    });
  }, 400);
});
