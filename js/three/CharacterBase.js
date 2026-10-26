/**
 * JE. CHIBI AI UNIVERSE — CHARACTER BASE CLASS
 * Hierarchical kinematic skeleton, state machine, procedural rigging,
 * smooth eye tracking with micro-saccades, and reduced-motion adaptation.
 */

class CharacterBase {
  constructor(name, primaryColorHex) {
    this.name = name;
    this.primaryColorHex = primaryColorHex;

    // Root Group
    this.group = new THREE.Group();
    this.group.name = `Chibi_${name}`;

    // Hierarchical Kinematic Groups
    this.baseGroup = new THREE.Group();
    this.group.add(this.baseGroup);

    this.bodyGroup = new THREE.Group();
    this.headGroup = new THREE.Group();
    this.leftArmGroup = new THREE.Group();
    this.rightArmGroup = new THREE.Group();
    this.leftLegGroup = new THREE.Group();
    this.rightLegGroup = new THREE.Group();
    this.accessoriesGroup = new THREE.Group();
    this.effectsGroup = new THREE.Group();

    this.baseGroup.add(this.bodyGroup);
    this.baseGroup.add(this.headGroup);
    this.baseGroup.add(this.leftArmGroup);
    this.baseGroup.add(this.rightArmGroup);
    this.baseGroup.add(this.leftLegGroup);
    this.baseGroup.add(this.rightLegGroup);
    this.baseGroup.add(this.accessoriesGroup);
    this.baseGroup.add(this.effectsGroup);

    // Initial Pivot Positions for Chibi Proportions
    // Total Height: ~2.8 units. Head: y = 1.05. Torso: y = 0.5. Pelvis: y = 0.15. Feet: y = -0.5
    this.headGroup.position.set(0, 1.05, 0);
    this.bodyGroup.position.set(0, 0.45, 0);
    this.leftArmGroup.position.set(-0.55, 0.65, 0);
    this.rightArmGroup.position.set(0.55, 0.65, 0);
    this.leftLegGroup.position.set(-0.24, -0.10, 0);
    this.rightLegGroup.position.set(0.24, -0.10, 0);

    // State Machine
    this.state = 'idle';
    this.stateTimer = 0;

    // Kinematics & Pointer
    this.pointerNormalized = { x: 0, y: 0 };
    this.smoothedPointer = { x: 0, y: 0 };
    this.basePosition = new THREE.Vector3(0, 0, 0);
    this.targetPosition = new THREE.Vector3(0, 0, 0);

    // Reduced Motion Flag
    this.reducedMotion = false;

    // Speech Cadence Pulse (0.0 to 1.0)
    this.speechIntensity = 0;

    // Blink Timer
    this.blinkTimer = 0;
    this.nextBlinkTime = 2.5 + Math.random() * 2.0;
    this.isBlinking = false;

    // Eye References (Assigned by subclasses)
    this.leftEye = null;
    this.rightEye = null;
    this.leftPupil = null;
    this.rightPupil = null;
    this.mouth = null;
  }

  getGroup() {
    return this.group;
  }

  setState(newState) {
    if (this.state === newState) return;
    this.state = newState;
    this.stateTimer = 0;
    this.onStateChange(newState);
  }

  onStateChange(newState) {
    // Override in subclass if needed
  }

  setPointer(x, y) {
    this.pointerNormalized.x = x;
    this.pointerNormalized.y = y;
  }

  setReducedMotion(enabled) {
    this.reducedMotion = enabled;
  }

  update(delta, time) {
    this.stateTimer += delta;

    // 1. Smooth Pointer Lerp
    const lerpFactor = this.reducedMotion ? 0.02 : 0.08;
    this.smoothedPointer.x += (this.pointerNormalized.x - this.smoothedPointer.x) * lerpFactor;
    this.smoothedPointer.y += (this.pointerNormalized.y - this.smoothedPointer.y) * lerpFactor;

    // 2. Smooth Base Position Lerp
    this.basePosition.lerp(this.targetPosition, 0.06);

    // 3. Floating / Breathing Chibi Bounce
    if (!this.reducedMotion) {
      let bounceSpeed = 2.2;
      let bounceAmp = 0.06;

      if (this.state === 'excited') {
        bounceSpeed = 6.0;
        bounceAmp = 0.16;
      } else if (this.state === 'thinking') {
        bounceSpeed = 1.4;
        bounceAmp = 0.03;
      } else if (this.state === 'speaking') {
        bounceSpeed = 3.2;
        bounceAmp = 0.08;
      }

      const hoverOffset = Math.sin(time * bounceSpeed) * bounceAmp;
      this.group.position.x = this.basePosition.x;
      this.group.position.z = this.basePosition.z;
      this.group.position.y = this.basePosition.y + hoverOffset;

      // Subtle Squash & Stretch on Base
      const stretch = 1.0 + Math.sin(time * bounceSpeed) * 0.025;
      const squash = 1.0 - Math.sin(time * bounceSpeed) * 0.015;
      this.baseGroup.scale.set(squash, stretch, squash);
    } else {
      this.group.position.copy(this.basePosition);
      this.baseGroup.scale.set(1, 1, 1);
    }

    // 4. Natural Blinking Cycle
    this.blinkTimer += delta;
    if (this.blinkTimer >= this.nextBlinkTime) {
      this.isBlinking = true;
      if (this.blinkTimer >= this.nextBlinkTime + 0.14) {
        this.isBlinking = false;
        this.blinkTimer = 0;
        this.nextBlinkTime = 2.0 + Math.random() * 3.5;
      }
    }

    // 5. Head Tracking & Cute Tilts
    if (!this.reducedMotion) {
      const maxYaw = 0.28;
      const maxPitch = 0.18;
      const targetHeadYaw = this.smoothedPointer.x * maxYaw;
      const targetHeadPitch = -this.smoothedPointer.y * maxPitch;

      let tiltRoll = 0;
      if (this.state === 'listening') tiltRoll = 0.12;
      else if (this.state === 'thinking') tiltRoll = -0.14;

      this.headGroup.rotation.y += (targetHeadYaw - this.headGroup.rotation.y) * 0.1;
      this.headGroup.rotation.x += (targetHeadPitch - this.headGroup.rotation.x) * 0.1;
      this.headGroup.rotation.z += (tiltRoll - this.headGroup.rotation.z) * 0.08;
    }

    // 6. Speech Intensity Decay
    if (this.state === 'speaking') {
      this.speechIntensity = 0.5 + Math.sin(time * 10) * 0.5;
      // Head nodding with speech
      if (!this.reducedMotion) {
        this.headGroup.position.y = 1.05 + Math.sin(time * 8) * 0.03;
      }
    } else {
      this.speechIntensity *= 0.88;
      this.headGroup.position.y = 1.05;
    }

    // 7. Subclass Custom Procedural Rigging
    this.updateProcedural(delta, time);
  }

  updateProcedural(delta, time) {
    // Implemented by subclasses
  }
}

window.CharacterBase = CharacterBase;
