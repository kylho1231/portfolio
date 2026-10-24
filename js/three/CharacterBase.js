/**
 * JE. DIGITAL UNIVERSE — CHARACTER BASE CLASS
 * Abstract base class providing common transformation hierarchies,
 * procedural state machines, smooth gaze tracking, and reduced-motion handling.
 */

class CharacterBase {
  constructor(name, primaryColorHex) {
    this.name = name;
    this.primaryColorHex = primaryColorHex;
    this.group = new THREE.Group();
    this.group.name = `Character_${name}`;

    // Sub-groups for organized kinematics
    this.bodyGroup = new THREE.Group();
    this.headGroup = new THREE.Group();
    this.accessoriesGroup = new THREE.Group();
    this.effectsGroup = new THREE.Group();

    this.group.add(this.bodyGroup);
    this.group.add(this.headGroup);
    this.group.add(this.accessoriesGroup);
    this.group.add(this.effectsGroup);

    // State machine: 'idle' | 'listening' | 'thinking' | 'speaking' | 'excited' | 'gesture'
    this.state = 'idle';
    this.targetState = 'idle';
    this.stateTimer = 0;

    // Kinematics & Gaze tracking
    this.pointerNormalized = { x: 0, y: 0 };
    this.smoothedPointer = { x: 0, y: 0 };
    this.basePosition = new THREE.Vector3(0, 0, 0);
    this.targetPosition = new THREE.Vector3(0, 0, 0);

    // Reduced motion flag
    this.reducedMotion = false;

    // Speech pulse variable (0.0 to 1.0)
    this.speechIntensity = 0;
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

    // Smooth pointer lerp
    const lerpFactor = this.reducedMotion ? 0.02 : 0.08;
    this.smoothedPointer.x += (this.pointerNormalized.x - this.smoothedPointer.x) * lerpFactor;
    this.smoothedPointer.y += (this.pointerNormalized.y - this.smoothedPointer.y) * lerpFactor;

    // Smooth position lerp
    this.group.position.lerp(this.targetPosition, 0.05);

    // Floating breathing motion
    if (!this.reducedMotion) {
      const breathSpeed = this.state === 'thinking' ? 3.0 : 1.5;
      const breathAmp = this.state === 'excited' ? 0.22 : 0.12;
      const hoverOffset = Math.sin(time * breathSpeed) * breathAmp;
      this.bodyGroup.position.y = hoverOffset;
      this.headGroup.position.y = hoverOffset * 1.1;
    } else {
      this.bodyGroup.position.y = 0;
      this.headGroup.position.y = 0;
    }

    // Default gaze tracking on head
    const maxLookYaw = 0.45;
    const maxLookPitch = 0.35;
    this.headGroup.rotation.y = this.smoothedPointer.x * maxLookYaw;
    this.headGroup.rotation.x = -this.smoothedPointer.y * maxLookPitch;

    // Speech decay
    if (this.state === 'speaking') {
      this.speechIntensity = 0.5 + Math.sin(time * 12) * 0.5;
    } else {
      this.speechIntensity *= 0.9;
    }

    // Subclass custom procedural animation
    this.updateProcedural(delta, time);
  }

  updateProcedural(delta, time) {
    // Implemented by subclasses
  }
}

window.CharacterBase = CharacterBase;
