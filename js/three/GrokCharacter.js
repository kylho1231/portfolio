/**
 * JE. DIGITAL UNIVERSE — GROK (CHARACTER 03)
 * Identity: The Edgy Experimenter / Rebel Engineer
 * Color: Obsidian + Cosmic Violet (#9A83FF) + Neon Pink (#EC4899)
 * Features: Angular mecha chassis, segmented floating shoulder plates,
 * sharp violet visor, dynamic stance, sparking energy particles.
 */

class GrokCharacter extends CharacterBase {
  constructor() {
    super('GROK', 0x9a83ff);
    this.accentPink = 0xec4899;
    this.shoulders = [];
    this.sparks = null;
    this.visor = null;
    this.chassis = null;

    this.buildCharacter();
  }

  buildCharacter() {
    const obsidianMat = new THREE.MeshStandardMaterial({
      color: 0x0f1117,
      metalness: 0.95,
      roughness: 0.15
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.9,
      roughness: 0.2
    });

    const violetGlowMat = new THREE.MeshStandardMaterial({
      color: 0x9a83ff,
      emissive: 0x9a83ff,
      emissiveIntensity: 0.9,
      roughness: 0.1
    });

    const pinkGlowMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xec4899,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });

    // 1. Angular Mecha Chassis Body
    const chassisGeo = new THREE.BoxGeometry(1.1, 1.2, 0.9);
    this.chassis = new THREE.Mesh(chassisGeo, obsidianMat);
    this.chassis.rotation.x = 0.15; // Forward athletic tilt
    this.bodyGroup.add(this.chassis);

    // Decorative armor stripes
    const stripeGeo = new THREE.BoxGeometry(0.08, 1.0, 0.92);
    const stripe1 = new THREE.Mesh(stripeGeo, pinkGlowMat);
    stripe1.position.x = -0.35;
    stripe1.rotation.x = 0.15;
    this.bodyGroup.add(stripe1);

    const stripe2 = new THREE.Mesh(stripeGeo, pinkGlowMat);
    stripe2.position.x = 0.35;
    stripe2.rotation.x = 0.15;
    this.bodyGroup.add(stripe2);

    // 2. Head with Sharp Angular Visor
    const headGeo = new THREE.BoxGeometry(0.85, 0.5, 0.7);
    this.headMesh = new THREE.Mesh(headGeo, chromeMat);
    this.headMesh.position.set(0, 0.95, 0.1);
    this.headGroup.add(this.headMesh);

    // Sharp Violet Visor
    const visorGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.18, 5);
    visorGeo.rotateX(Math.PI / 2);
    this.visorMat = violetGlowMat;
    this.visor = new THREE.Mesh(visorGeo, this.visorMat);
    this.visor.position.set(0, 0.95, 0.45);
    this.visor.scale.set(1.0, 0.4, 0.4);
    this.headGroup.add(this.visor);

    // 3. Segmented Floating Shoulder Plates
    const shoulderGeo = new THREE.BoxGeometry(0.45, 0.7, 0.5);
    const leftShoulder = new THREE.Mesh(shoulderGeo, obsidianMat);
    leftShoulder.position.set(-1.0, 0.6, 0);
    leftShoulder.rotation.z = 0.2;

    const rightShoulder = new THREE.Mesh(shoulderGeo, obsidianMat);
    rightShoulder.position.set(1.0, 0.6, 0);
    rightShoulder.rotation.z = -0.2;

    this.accessoriesGroup.add(leftShoulder);
    this.accessoriesGroup.add(rightShoulder);
    this.shoulders.push(leftShoulder, rightShoulder);

    // 4. Sparking Neon Energy Particles
    const sparkCount = 36;
    const sparkGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 2.2;
      positions[i + 1] = (Math.random() - 0.5) * 2.0;
      positions[i + 2] = (Math.random() - 0.5) * 1.8;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0x9a83ff,
      size: 0.06,
      transparent: true,
      opacity: 0.85
    });
    this.sparks = new THREE.Points(sparkGeo, sparkMat);
    this.effectsGroup.add(this.sparks);
  }

  updateProcedural(delta, time) {
    // 1. Shoulders Articulation
    if (this.shoulders.length === 2 && !this.reducedMotion) {
      if (this.state === 'speaking') {
        this.shoulders[0].position.y = 0.6 + Math.sin(time * 10) * 0.08;
        this.shoulders[1].position.y = 0.6 - Math.sin(time * 10) * 0.08;
      } else if (this.state === 'excited') {
        this.shoulders[0].position.y = 0.75 + Math.sin(time * 14) * 0.12;
        this.shoulders[1].position.y = 0.75 + Math.sin(time * 14) * 0.12;
      } else {
        this.shoulders[0].position.y = 0.6 + Math.sin(time * 2) * 0.04;
        this.shoulders[1].position.y = 0.6 + Math.sin(time * 2 + 0.5) * 0.04;
      }
    }

    // 2. Visor Pulse / Jitter on thinking
    if (this.visor) {
      if (this.state === 'thinking') {
        // High-frequency jitter
        this.visor.position.x = (Math.random() - 0.5) * 0.04;
        this.visorMat.emissiveIntensity = 0.6 + Math.random() * 0.6;
      } else if (this.state === 'speaking') {
        this.visor.position.x = 0;
        this.visorMat.emissiveIntensity = 0.8 + this.speechIntensity * 0.7;
      } else {
        this.visor.position.x = 0;
        this.visorMat.emissiveIntensity = 0.8;
      }
    }

    // 3. Electric Spark Particles
    if (this.sparks && !this.reducedMotion) {
      this.sparks.rotation.y += delta * 1.2;
      this.sparks.rotation.z += delta * 0.6;
    }
  }
}

window.GrokCharacter = GrokCharacter;
