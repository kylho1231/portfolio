/**
 * JE. DIGITAL UNIVERSE — COUNCIL STAGE
 * Manages character switching, single character showcase,
 * full Council ensemble mode, and smooth camera framing.
 */

class CouncilStage {
  constructor(sceneManager) {
    this.sm = sceneManager;
    this.characters = {};
    this.activeMode = 'single'; // 'single' | 'council'
    this.activeCharacterKey = 'code'; // 'code' | 'claude' | 'grok' | 'gemini'
    this.isReducedMotion = false;

    this.initCharacters();
    this.sm.onUpdate(this.update.bind(this));
  }

  initCharacters() {
    this.characters.code = new CodeCharacter();
    this.characters.claude = new ClaudeCharacter();
    this.characters.grok = new GrokCharacter();
    this.characters.gemini = new GeminiCharacter();

    // Add all character groups to the shared ThreeSceneManager scene
    Object.keys(this.characters).forEach(key => {
      const char = this.characters[key];
      this.sm.scene.add(char.getGroup());
    });

    // Default to CODE focused
    this.showCharacter('code');
  }

  setPointer(x, y) {
    if (this.activeMode === 'single') {
      const active = this.characters[this.activeCharacterKey];
      if (active) active.setPointer(x, y);
    } else {
      // In council mode, pass pointer to all 4
      Object.keys(this.characters).forEach(k => {
        this.characters[k].setPointer(x, y);
      });
    }
  }

  setReducedMotion(enabled) {
    this.isReducedMotion = enabled;
    Object.keys(this.characters).forEach(k => {
      this.characters[k].setReducedMotion(enabled);
    });
  }

  showCharacter(charKey) {
    if (!this.characters[charKey]) return;
    this.activeMode = 'single';
    this.activeCharacterKey = charKey;

    Object.keys(this.characters).forEach(k => {
      const char = this.characters[k];
      const grp = char.getGroup();
      if (k === charKey) {
        grp.visible = true;
        char.targetPosition.set(0, 0, 0);
        char.setState('idle');
      } else {
        grp.visible = false;
        char.targetPosition.set(k === 'code' || k === 'claude' ? -6 : 6, 0, -2);
      }
    });

    // Camera target for single character
    if (this.sm.camera) {
      this.sm.camera.position.z = window.innerWidth < 600 ? 8.5 : 7.0;
      this.sm.camera.position.x = 0;
    }
  }

  showCouncilMode() {
    this.activeMode = 'council';
    this.activeCharacterKey = 'council';

    // Formation coordinates in 3D space
    const formations = {
      code: new THREE.Vector3(-2.6, -0.1, -0.6),
      claude: new THREE.Vector3(-0.9, 0.15, 0.1),
      grok: new THREE.Vector3(0.9, 0.15, 0.1),
      gemini: new THREE.Vector3(2.6, -0.1, -0.6)
    };

    // On narrow screens, arrange in a tighter 2x2 grid
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      formations.code.set(-1.1, 1.1, 0);
      formations.claude.set(1.1, 1.1, 0);
      formations.grok.set(-1.1, -1.1, 0);
      formations.gemini.set(1.1, -1.1, 0);
    }

    Object.keys(this.characters).forEach(k => {
      const char = this.characters[k];
      const grp = char.getGroup();
      grp.visible = true;
      char.targetPosition.copy(formations[k]);
      char.setState('idle');
    });

    // Camera pulls back to fit all 4
    if (this.sm.camera) {
      this.sm.camera.position.z = isMobile ? 10.5 : 8.8;
      this.sm.camera.position.x = 0;
    }
  }

  setCharacterState(charKey, state) {
    if (charKey === 'council') {
      Object.keys(this.characters).forEach(k => {
        this.characters[k].setState(state);
      });
      return;
    }
    const char = this.characters[charKey];
    if (char) char.setState(state);
  }

  triggerSpeaking(charKey, durationMs = 3000) {
    if (charKey === 'council') {
      // In council mode, have each speak in a short sequence
      const keys = ['code', 'claude', 'grok', 'gemini'];
      let delay = 0;
      keys.forEach(k => {
        setTimeout(() => {
          this.characters[k].setState('speaking');
          setTimeout(() => {
            this.characters[k].setState('idle');
          }, 800);
        }, delay);
        delay += 900;
      });
      return;
    }

    const char = this.characters[charKey];
    if (char) {
      char.setState('speaking');
      setTimeout(() => {
        if (char.state === 'speaking') {
          char.setState('idle');
        }
      }, durationMs);
    }
  }

  update(delta, time) {
    Object.keys(this.characters).forEach(k => {
      const char = this.characters[k];
      if (char.getGroup().visible) {
        char.update(delta, time);
      }
    });
  }
}

window.CouncilStage = CouncilStage;
