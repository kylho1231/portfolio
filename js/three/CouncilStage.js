/**
 * JE. CHIBI AI UNIVERSE — COUNCIL STAGE
 * Manages 3D studio environment, floating circular metallic platform,
 * character switching, ensemble Council formation, and camera choreography.
 */

class CouncilStage {
  constructor(sceneManager) {
    this.sm = sceneManager;
    this.characters = {};
    this.activeMode = 'single'; // 'single' | 'council'
    this.activeCharacterKey = 'gemini'; // Default to GEMINI per Master Prompt
    this.isReducedMotion = false;

    this.platform = null;
    this.platformRim = null;
    this.charLight = null;

    this.initStageEnvironment();
    this.initCharacters();
    this.initThemeWatcher();
    this.sm.onUpdate(this.update.bind(this));
  }

  initStageEnvironment() {
    // 1. Floating Circular Metallic Studio Platform (Grounded cleanly under boots)
    const platformGroup = new THREE.Group();
    platformGroup.position.set(0, -0.52, 0);

    // Platform Base Disc (Beveled Obsidian & Brushed Steel Finish)
    const platGeo = new THREE.CylinderGeometry(3.2, 3.4, 0.20, 64);
    const platMat = new THREE.MeshStandardMaterial({
      color: 0x0b1120,
      metalness: 0.88,
      roughness: 0.22
    });
    this.platform = new THREE.Mesh(platGeo, platMat);
    platformGroup.add(this.platform);

    // Glowing Neon Rim Ring (Pulsing Character Accent Glow)
    const rimGeo = new THREE.TorusGeometry(3.22, 0.04, 16, 64);
    this.rimMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.1,
      roughness: 0.15
    });
    this.platformRim = new THREE.Mesh(rimGeo, this.rimMat);
    this.platformRim.position.set(0, 0.10, 0);
    this.platformRim.rotation.x = Math.PI / 2;
    platformGroup.add(this.platformRim);

    // Inner Concentric Holographic Grid Rings
    const innerRingGeo = new THREE.TorusGeometry(2.1, 0.016, 12, 48);
    this.innerRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 });
    const innerRing = new THREE.Mesh(innerRingGeo, this.innerRingMat);
    innerRing.position.set(0, 0.102, 0);
    innerRing.rotation.x = Math.PI / 2;
    platformGroup.add(innerRing);

    // Outer Beveled Trim Ring
    const outerTrimGeo = new THREE.TorusGeometry(3.38, 0.015, 12, 48);
    const outerTrimMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.2 });
    const outerTrim = new THREE.Mesh(outerTrimGeo, outerTrimMat);
    outerTrim.position.set(0, -0.05, 0);
    outerTrim.rotation.x = Math.PI / 2;
    platformGroup.add(outerTrim);

    // Soft Ground Contact Shadow (Directly grounding the character)
    const shadowGeo = new THREE.CircleGeometry(3.5, 32);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.55 });
    this.shadow = new THREE.Mesh(shadowGeo, shadowMat);
    this.shadow.position.set(0, -0.11, 0);
    this.shadow.rotation.x = -Math.PI / 2;
    platformGroup.add(this.shadow);

    this.sm.scene.add(platformGroup);

    // 2. Character-Specific Soft Dynamic Spotlight
    this.charLight = new THREE.PointLight(0x38bdf8, 1.4, 10);
    this.charLight.position.set(0, 3.4, 2.2);
    this.sm.scene.add(this.charLight);
  }

  initCharacters() {
    // Instantiate all 4 Chibi Characters
    this.characters.gemini = new GeminiCharacter();
    this.characters.claude = new ClaudeCharacter();
    this.characters.codex = new CodeCharacter();
    this.characters.code = this.characters.codex; // 100% Backward Compatibility
    this.characters.grok = new GrokCharacter();

    // Add unique character groups to scene
    const uniqueKeys = ['gemini', 'claude', 'codex', 'grok'];
    uniqueKeys.forEach(key => {
      const char = this.characters[key];
      this.sm.scene.add(char.getGroup());
    });

    // Default to GEMINI (Hero Mascot)
    this.showCharacter('gemini');
  }

  setPointer(x, y) {
    if (this.activeMode === 'single') {
      const active = this.characters[this.activeCharacterKey];
      if (active) active.setPointer(x, y);
    } else {
      ['gemini', 'claude', 'codex', 'grok'].forEach(k => {
        this.characters[k].setPointer(x, y);
      });
    }
  }

  setReducedMotion(enabled) {
    this.isReducedMotion = enabled;
    ['gemini', 'claude', 'codex', 'grok'].forEach(k => {
      this.characters[k].setReducedMotion(enabled);
    });
  }

  showCharacter(charKey) {
    // Normalize code -> codex or keep both
    if (charKey === 'code') charKey = 'codex';
    if (!this.characters[charKey]) return;

    this.activeMode = 'single';
    this.activeCharacterKey = charKey;

    const isMobile = window.innerWidth < 768;
    const targetY = isMobile ? 0.35 : 0.0;

    // Platform spotlight & rim color mapping
    const themeColors = {
      gemini: { rim: 0x818cf8, light: 0xc084fc },
      claude: { rim: 0xf97316, light: 0xf59e0b },
      codex: { rim: 0x38bdf8, light: 0x0284c7 },
      grok: { rim: 0x9a83ff, light: 0xf8fafc }
    };

    const colorConfig = themeColors[charKey] || themeColors.gemini;
    if (this.rimMat) {
      this.rimMat.color.setHex(colorConfig.rim);
      this.rimMat.emissive.setHex(colorConfig.rim);
    }
    if (this.charLight) {
      this.charLight.color.setHex(colorConfig.light);
      this.charLight.position.set(0, 3.5, 2.5);
    }

    ['gemini', 'claude', 'codex', 'grok'].forEach(k => {
      const char = this.characters[k];
      const grp = char.getGroup();
      if (k === charKey) {
        grp.visible = true;
        char.targetPosition.set(0, targetY, 0);
        char.setState('idle');
      } else {
        grp.visible = false;
        char.targetPosition.set(k === 'codex' || k === 'claude' ? -6 : 6, targetY, -2);
      }
    });

    // Camera target for single character (framed above dialogue HUD)
    if (this.sm.camera) {
      this.sm.camera.position.set(0, isMobile ? 0.52 : 0.42, isMobile ? 8.2 : 6.8);
      this.sm.camera.lookAt(0, 0.32, 0);
    }
  }

  showCouncilMode() {
    this.activeMode = 'council';
    this.activeCharacterKey = 'council';

    if (this.rimMat) {
      this.rimMat.color.setHex(0x69e8f2);
      this.rimMat.emissive.setHex(0x38bdf8);
    }
    if (this.charLight) {
      this.charLight.color.setHex(0xffffff);
      this.charLight.position.set(0, 4.0, 3.5);
    }

    // Formation matching the 4 characters side-by-side in reference artwork!
    // Left-to-right: CODEX | GROK | GEMINI | CLAUDE
    const formations = {
      codex: new THREE.Vector3(-2.4, -0.05, -0.1),
      grok: new THREE.Vector3(-0.8, 0.05, 0.1),
      gemini: new THREE.Vector3(0.8, 0.05, 0.1),
      claude: new THREE.Vector3(2.4, -0.05, -0.1)
    };

    // On narrow screens, arrange in a tight 2x2 grid
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      formations.codex.set(-1.0, 1.4, 0);
      formations.claude.set(1.0, 1.4, 0);
      formations.grok.set(-1.0, 0.1, 0);
      formations.gemini.set(1.0, 0.1, 0);
    }

    ['codex', 'grok', 'gemini', 'claude'].forEach(k => {
      const char = this.characters[k];
      const grp = char.getGroup();
      grp.visible = true;
      char.targetPosition.copy(formations[k]);
      char.setState('idle');
    });

    // Camera pulls back to frame all 4 chibi friends comfortably
    if (this.sm.camera) {
      this.sm.camera.position.set(0, isMobile ? 0.65 : 0.42, isMobile ? 9.8 : 8.2);
      this.sm.camera.lookAt(0, 0.28, 0);
    }
  }

  setCharacterState(charKey, state) {
    if (charKey === 'code') charKey = 'codex';
    if (charKey === 'council') {
      ['codex', 'grok', 'gemini', 'claude'].forEach(k => {
        this.characters[k].setState(state);
      });
      return;
    }
    const char = this.characters[charKey];
    if (char) char.setState(state);
  }

  triggerSpeaking(charKey, durationMs = 3000) {
    if (charKey === 'code') charKey = 'codex';
    if (charKey === 'council') {
      // In council mode, each takes turns speaking
      const keys = ['gemini', 'codex', 'claude', 'grok'];
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

  initThemeWatcher() {
    this.updateTheme();
    if (typeof MutationObserver !== 'undefined' && document.documentElement) {
      const observer = new MutationObserver(() => this.updateTheme());
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    }
  }

  updateTheme(forcedTheme) {
    const isLight = (forcedTheme || document.documentElement.dataset.theme) === 'light';
    if (this.sm.renderer) {
      // The pale stage reflects considerably more light than the dark theme.
      // Lower exposure so white character materials retain their form and color.
      this.sm.renderer.toneMappingExposure = isLight ? 0.78 : 1.0;
    }
    if (this.platform && this.platform.material) {
      this.platform.material.color.setHex(isLight ? 0x536273 : 0x0a0f1d);
      this.platform.material.metalness = isLight ? 0.55 : 0.85;
      this.platform.material.roughness = isLight ? 0.5 : 0.35;
    }
    if (this.shadow && this.shadow.material) {
      this.shadow.material.opacity = isLight ? 0.24 : 0.4;
    }
    if (this.rimMat) {
      this.rimMat.emissiveIntensity = isLight ? 0.55 : 0.8;
    }
    if (this.charLight) {
      this.charLight.intensity = isLight ? 0.9 : 1.2;
    }
  }

  update(delta, time) {
    ['gemini', 'claude', 'codex', 'grok'].forEach(k => {
      const char = this.characters[k];
      if (char && char.getGroup().visible) {
        char.update(delta, time);
      }
    });
  }
}

window.CouncilStage = CouncilStage;
