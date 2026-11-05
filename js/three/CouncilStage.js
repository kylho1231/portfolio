/**
 * JE. CHIBI AI UNIVERSE — COUNCIL STAGE
 * Manages 3D studio environment, floating circular metallic platform,
 * 3D je. monogram emblem, character switching, ensemble Council formation,
 * direct click raycasting, and camera choreography.
 */

class CouncilStage {
  constructor(sceneManager) {
    this.sm = sceneManager;
    this.characters = {};
    this.activeMode = 'single'; // 'single' | 'council'
    this.activeCharacterKey = 'gemini'; // Default to GEMINI per Master Prompt
    this.isReducedMotion = false;
    this.pointerX = 0;
    this.pointerY = 0;

    this.platform = null;
    this.platformRim = null;
    this.charLight = null;
    this.monogramGroup = null;

    this.initStageEnvironment();
    this.initCharacters();
    this.initClickInteraction();
    this.initThemeWatcher();
    this.sm.onUpdate(this.update.bind(this));
  }

  initStageEnvironment() {
    // 1. Floating Circular Metallic Studio Platform (Grounded cleanly under boots)
    const platformGroup = new THREE.Group();
    platformGroup.position.set(0, -0.22, 0);

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

    // 2. 3D "je." Monogram Emblem on front pedestal rim
    this.initMonogramEmblem(platformGroup);

    this.sm.scene.add(platformGroup);

    // 3. Character-Specific Soft Dynamic Spotlight
    this.charLight = new THREE.PointLight(0x38bdf8, 1.4, 10);
    this.charLight.position.set(0, 3.4, 2.2);
    this.sm.scene.add(this.charLight);
  }

  initMonogramEmblem(platformGroup) {
    this.monogramGroup = new THREE.Group();

    // High-resolution offscreen canvas texture for crisp vector-like brandmark
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Circular gradient background
    const grad = ctx.createRadialGradient(256, 256, 30, 256, 256, 250);
    grad.addColorStop(0, '#1e293b');
    grad.addColorStop(0.7, '#0f172a');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(256, 256, 248, 0, Math.PI * 2);
    ctx.fill();

    // Cyan technical grid circle
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(256, 256, 228, 0, Math.PI * 2);
    ctx.stroke();

    // Secondary dashed orbit
    ctx.setLineDash([8, 12]);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(256, 256, 212, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Typography "je"
    ctx.font = '700 200px "Space Grotesk", system-ui, sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('je', 205, 248);

    // Glowing cyan accent dot "."
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#0284c7';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(325, 308, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Small sub-brand label
    ctx.font = '600 28px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'rgba(203, 213, 225, 0.85)';
    ctx.letterSpacing = '3px';
    ctx.fillText('JHON ESTRABO', 256, 410);

    const texture = new THREE.CanvasTexture(canvas);
    if (this.sm.renderer && this.sm.renderer.capabilities) {
      texture.anisotropy = this.sm.renderer.capabilities.getMaxAnisotropy();
    }

    // Beveled cylindrical badge
    const badgeGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 48);
    const badgeMat = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.65,
      roughness: 0.22
    });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.rotation.x = Math.PI / 2.35;
    this.monogramGroup.add(badgeMesh);

    // Beveled metallic bezel rim ring
    const bezelGeo = new THREE.TorusGeometry(0.56, 0.024, 16, 48);
    this.bezelMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.75,
      metalness: 0.85,
      roughness: 0.2
    });
    const bezelMesh = new THREE.Mesh(bezelGeo, this.bezelMat);
    bezelMesh.position.copy(badgeMesh.position);
    bezelMesh.rotation.copy(badgeMesh.rotation);
    this.monogramGroup.add(bezelMesh);

    // Position at front lip of platform
    this.monogramGroup.position.set(0, 0.18, 2.72);
    platformGroup.add(this.monogramGroup);
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

  initClickInteraction() {
    if (!this.sm.container) return;
    const canvas = this.sm.container;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : null);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : null);
      if (clientX === null || clientY === null) return;

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, this.sm.camera);

      // Check hits against active character(s)
      const targetKeys = this.activeMode === 'council' ? ['gemini', 'claude', 'codex', 'grok'] : [this.activeCharacterKey];
      let hitCharKey = null;

      for (let i = 0; i < targetKeys.length; i++) {
        const key = targetKeys[i];
        const char = this.characters[key];
        if (char && char.getGroup().visible) {
          const intersects = raycaster.intersectObjects(char.getGroup().children, true);
          if (intersects.length > 0) {
            hitCharKey = key;
            break;
          }
        }
      }

      if (hitCharKey) {
        // Trigger celebratory mascot wave and dialogue
        this.triggerWave(hitCharKey, 2000);
        if (window.dialogueEngine) {
          const meta = window.JhonKnowledgeBase.characters[hitCharKey] || window.JhonKnowledgeBase.characters.gemini;
          window.dialogueEngine.setActiveCharacter(hitCharKey);
          window.dialogueEngine.speak({
            character: hitCharKey,
            text: meta.intro,
            chips: ['Show me your projects', 'What can you build?', 'Tell me about your skills', 'How can I contact you?']
          });
        }
      }
    };

    canvas.addEventListener('click', onPointerDown);
  }

  setPointer(x, y) {
    this.pointerX = x;
    this.pointerY = y;
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
    if (this.bezelMat) {
      this.bezelMat.color.setHex(colorConfig.rim);
      this.bezelMat.emissive.setHex(colorConfig.rim);
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

    if (this.sm.camera) {
      this.sm.camera.position.set(0, isMobile ? 0.52 : 0.42, isMobile ? 8.0 : 6.8);
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
    if (this.bezelMat) {
      this.bezelMat.color.setHex(0x38bdf8);
      this.bezelMat.emissive.setHex(0x0284c7);
    }
    if (this.charLight) {
      this.charLight.color.setHex(0xffffff);
      this.charLight.position.set(0, 4.0, 3.5);
    }

    // Formation: Left-to-right CODEX | GROK | GEMINI | CLAUDE
    const formations = {
      codex: new THREE.Vector3(-2.4, -0.05, -0.1),
      grok: new THREE.Vector3(-0.8, 0.05, 0.1),
      gemini: new THREE.Vector3(0.8, 0.05, 0.1),
      claude: new THREE.Vector3(2.4, -0.05, -0.1)
    };

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

  triggerWave(charKey = this.activeCharacterKey, durationMs = 2400) {
    if (charKey === 'code') charKey = 'codex';
    if (charKey === 'council') {
      ['gemini', 'codex', 'claude', 'grok'].forEach(k => {
        this.characters[k].setState('excited');
      });
      setTimeout(() => {
        ['gemini', 'codex', 'claude', 'grok'].forEach(k => {
          if (this.characters[k].state === 'excited') this.characters[k].setState('idle');
        });
      }, durationMs);
      return;
    }

    const char = this.characters[charKey];
    if (char) {
      char.setState('excited');
      setTimeout(() => {
        if (char.state === 'excited') char.setState('idle');
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
      this.sm.renderer.toneMappingExposure = isLight ? 0.82 : 1.02;
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
      this.rimMat.emissiveIntensity = isLight ? 0.55 : 0.85;
    }
    if (this.charLight) {
      this.charLight.intensity = isLight ? 0.95 : 1.25;
    }
  }

  update(delta, time) {
    // Gentle floating bobbing for the 3D je. monogram emblem
    if (this.monogramGroup && !this.isReducedMotion) {
      this.monogramGroup.position.y = 0.18 + Math.sin(time * 2.0) * 0.012;
      this.monogramGroup.rotation.y = this.pointerX * 0.14;
    }

    // Camera micro-parallax tracking pointer with smooth return
    if (this.sm.camera && !this.isReducedMotion) {
      const isMobile = window.innerWidth < 768;
      const targetCamX = this.pointerX * (isMobile ? 0.25 : 0.45);
      const targetCamY = (isMobile ? 0.50 : 0.42) + this.pointerY * 0.25;
      this.sm.camera.position.x += (targetCamX - this.sm.camera.position.x) * 0.05;
      this.sm.camera.position.y += (targetCamY - this.sm.camera.position.y) * 0.05;
      this.sm.camera.lookAt(0, 0.32, 0);
    }

    ['gemini', 'claude', 'codex', 'grok'].forEach(k => {
      const char = this.characters[k];
      if (char && char.getGroup().visible) {
        char.update(delta, time);
      }
    });
  }
}

window.CouncilStage = CouncilStage;
