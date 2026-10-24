/**
 * JE. DIGITAL UNIVERSE — AI COUNCIL BOOTSTRAP INITIALIZER
 * Coordinates 3D procedural characters, spatial UI, concierge dialogue,
 * motion lab physics, and accessibility modes.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.warn('[CouncilInit] THREE is undefined. Fallback to lite mode.');
    enableLiteMode();
    return;
  }

  // 1. Scene Manager
  const stageContainer = document.getElementById('council-hero-stage');
  const canvasContainer = document.getElementById('council-canvas-container');
  if (!canvasContainer) return;

  const sceneManager = new ThreeSceneManager(canvasContainer, {
    maxPixelRatio: window.innerWidth < 768 ? 1.5 : 2.0
  });

  const isWebGLReady = sceneManager.init();
  let councilStage = null;

  if (isWebGLReady) {
    councilStage = new CouncilStage(sceneManager);
  } else {
    enableLiteMode();
  }

  // 2. Pointer Controller
  const pointerController = new PointerController();
  if (councilStage) {
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
      if (isVoiceOn) {
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
    // Update pills
    charPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-char') === charKey));
    drawerCharBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-char') === charKey));

    dialogueEngine.setActiveCharacter(charKey);

    // Initial greeting for character
    const charMeta = window.JhonKnowledgeBase.characters[charKey] || window.JhonKnowledgeBase.characters.code;
    dialogueEngine.speak({
      character: charKey,
      text: charMeta.intro,
      chips: ['Who is Jhon?', 'Explore Projects', 'Digital Motion Lab', 'Contact Jhon']
    });
  }

  // Speech Bubble Minimize/Expand Toggle
  const speechBubble = document.getElementById('council-speech-bubble');
  const speechToggleBtn = document.getElementById('speech-toggle-btn');
  if (speechBubble && speechToggleBtn) {
    speechToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      speechBubble.classList.toggle('collapsed');
      const isCollapsed = speechBubble.classList.contains('collapsed');
      speechToggleBtn.textContent = isCollapsed ? '+' : '−';
      speechToggleBtn.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
    });
  }

  // 7. Stage Mode Button (3D Spatial vs Lite Mode)
  const stageModeBtn = document.getElementById('stage-mode-btn');
  if (stageModeBtn) {
    stageModeBtn.addEventListener('click', () => {
      if (stageContainer.classList.contains('lite-mode')) {
        stageContainer.classList.remove('lite-mode');
        stageModeBtn.textContent = '3D Mode';
        if (sceneManager) sceneManager.start();
      } else {
        enableLiteMode();
        stageModeBtn.textContent = 'Lite Mode';
      }
    });
  }

  function enableLiteMode() {
    if (stageContainer) stageContainer.classList.add('lite-mode');
    if (sceneManager) sceneManager.stop();
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
    // Focus chat input
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

  // Keyboard escape closes drawer
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

  // 13. Initial Welcome Greeting
  setTimeout(() => {
    const codeIntro = window.JhonKnowledgeBase.characters.code.intro;
    dialogueEngine.speak({
      character: 'code',
      text: codeIntro,
      chips: ['Who is Jhon?', 'Explore Projects', 'Digital Motion Lab', 'Contact Jhon']
    });
  }, 400);
});
