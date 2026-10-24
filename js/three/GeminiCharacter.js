/**
 * JE. DIGITAL UNIVERSE — GEMINI (CHARACTER 04)
 * Identity: The Multimodal Polymath
 * Color: Prism Blue (#699CFF) + Cyan (#38BDF8)
 * Features: Dual-core crystalline prisms, orbiting gravitational center,
 * intersecting quantum wave rings, luminous projection beam.
 */

class GeminiCharacter extends CharacterBase {
  constructor() {
    super('GEMINI', 0x699cff);
    this.accentCyan = 0x38bdf8;
    this.coreA = null;
    this.coreB = null;
    this.quantumRings = [];
    this.lightBeam = null;

    this.buildCharacter();
  }

  buildCharacter() {
    const prismBlueMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      emissive: 0x699cff,
      emissiveIntensity: 0.6,
      roughness: 0.15,
      metalness: 0.6
    });

    const prismCyanMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.6,
      roughness: 0.15,
      metalness: 0.6
    });

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x699cff,
      emissive: 0x699cff,
      emissiveIntensity: 0.7,
      roughness: 0.2
    });

    // 1. Dual-Core Crystalline Prisms
    const prismGeo = new THREE.OctahedronGeometry(0.75, 0);

    this.coreA = new THREE.Mesh(prismGeo, prismBlueMat);
    this.coreA.position.set(-0.85, 0.4, 0);
    this.bodyGroup.add(this.coreA);

    this.coreB = new THREE.Mesh(prismGeo, prismCyanMat);
    this.coreB.position.set(0.85, -0.4, 0);
    this.bodyGroup.add(this.coreB);

    // 2. Intersecting Quantum Wave Rings
    const ring1Geo = new THREE.TorusGeometry(1.6, 0.02, 16, 64);
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 4;
    this.accessoriesGroup.add(ring1);
    this.quantumRings.push(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.75, 0.018, 16, 64);
    const ring2 = new THREE.Mesh(ring2Geo, ringMat);
    ring2.rotation.y = Math.PI / 3;
    this.accessoriesGroup.add(ring2);
    this.quantumRings.push(ring2);

    // 3. Luminous Downward Projection Beam (Soft holographic cone)
    const coneGeo = new THREE.ConeGeometry(0.8, 1.8, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x699cff,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });
    this.lightBeam = new THREE.Mesh(coneGeo, coneMat);
    this.lightBeam.position.set(0, -1.2, 0);
    this.effectsGroup.add(this.lightBeam);
  }

  updateProcedural(delta, time) {
    // 1. Dual-Core Figure-Eight Orbital Choreography
    const orbitSpeed = this.state === 'excited' ? 4.0 : (this.state === 'thinking' ? 2.5 : 1.2);

    if (!this.reducedMotion && this.coreA && this.coreB) {
      const radius = this.state === 'thinking' ? 0.5 : 0.85;

      // Core A
      const angleA = time * orbitSpeed;
      this.coreA.position.x = Math.cos(angleA) * radius;
      this.coreA.position.y = Math.sin(angleA * 2) * 0.35 + 0.2;
      this.coreA.position.z = Math.sin(angleA) * 0.4;
      this.coreA.rotation.x += delta * 1.5;
      this.coreA.rotation.y += delta * 2.0;

      // Core B (Opposite phase)
      const angleB = angleA + Math.PI;
      this.coreB.position.x = Math.cos(angleB) * radius;
      this.coreB.position.y = Math.sin(angleB * 2) * 0.35 - 0.2;
      this.coreB.position.z = Math.sin(angleB) * 0.4;
      this.coreB.rotation.x += delta * 1.8;
      this.coreB.rotation.y -= delta * 1.6;
    }

    // 2. Quantum Rings Rotation
    if (!this.reducedMotion) {
      this.quantumRings.forEach((ring, idx) => {
        ring.rotation.z += delta * (0.4 + idx * 0.2);
        ring.rotation.x += delta * 0.3;
      });
    }

    // 3. Projection Beam Pulse during Speaking
    if (this.lightBeam) {
      if (this.state === 'speaking') {
        this.lightBeam.material.opacity = 0.15 + this.speechIntensity * 0.25;
        this.lightBeam.scale.x = 1.0 + Math.sin(time * 8) * 0.1;
        this.lightBeam.scale.z = 1.0 + Math.sin(time * 8) * 0.1;
      } else {
        this.lightBeam.material.opacity = 0.12;
      }
    }
  }
}

window.GeminiCharacter = GeminiCharacter;
