/**
 * JE. DIGITAL UNIVERSE — CLAUDE (CHARACTER 02)
 * Identity: The Human-Centered Storyteller
 * Color: Terracotta + Warm Amber (#E6A47C) + Gold (#F59E0B)
 * Features: Kinetic origami lotus petals, warm metallic core, rotating halo,
 * expressive eyes, soft internal bioluminescence.
 */

class ClaudeCharacter extends CharacterBase {
  constructor() {
    super('CLAUDE', 0xe6a47c);
    this.accentGold = 0xf59e0b;
    this.petals = [];
    this.halo = null;
    this.eyes = [];
    this.coreMesh = null;

    this.buildCharacter();
  }

  buildCharacter() {
    // Warm PBR materials
    const amberMat = new THREE.MeshStandardMaterial({
      color: 0x854d0e,
      roughness: 0.35,
      metalness: 0.65
    });

    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xe6a47c,
      roughness: 0.25,
      metalness: 0.3,
      side: THREE.DoubleSide
    });

    const goldGlowMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.7,
      roughness: 0.2
    });

    // 1. Central Rounded Core
    const coreGeo = new THREE.SphereGeometry(0.85, 32, 32);
    this.coreMesh = new THREE.Mesh(coreGeo, amberMat);
    this.bodyGroup.add(this.coreMesh);

    // 2. Kinetic Origami Petals (Arranged radially in 2 tiers)
    const petalGeo = new THREE.ConeGeometry(0.35, 1.1, 4);
    petalGeo.rotateX(Math.PI / 2);

    const petalCount = 8;
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const petalHolder = new THREE.Group();
      petalHolder.rotation.z = angle;

      const petal = new THREE.Mesh(petalGeo, petalMat);
      petal.position.y = 0.95;
      petal.scale.set(0.9, 0.4, 1.2);
      petalHolder.add(petal);

      this.bodyGroup.add(petalHolder);
      this.petals.push({
        holder: petalHolder,
        baseAngle: angle,
        petalMesh: petal,
        foldPhase: i * 0.4
      });
    }

    // 3. Expressive Glowing Eyes
    const eyeGeo = new THREE.SphereGeometry(0.08, 16, 16);
    [-0.22, 0.22].forEach(xOffset => {
      const eye = new THREE.Mesh(eyeGeo, goldGlowMat);
      eye.position.set(xOffset, 0.15, 0.8);
      this.headGroup.add(eye);
      this.eyes.push(eye);
    });

    // 4. Gently Rotating Halo overhead
    const haloGeo = new THREE.TorusGeometry(1.2, 0.028, 16, 48);
    this.halo = new THREE.Mesh(haloGeo, goldGlowMat);
    this.halo.position.set(0, 1.45, 0);
    this.halo.rotation.x = Math.PI / 2.5;
    this.accessoriesGroup.add(this.halo);

    // 5. Floating Story Fragment (Memory Card)
    const cardGeo = new THREE.BoxGeometry(0.4, 0.55, 0.02);
    const cardMat = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      emissive: 0xd97706,
      emissiveIntensity: 0.2,
      roughness: 0.3
    });
    this.storyCard = new THREE.Mesh(cardGeo, cardMat);
    this.storyCard.position.set(1.4, 0.2, 0.3);
    this.storyCard.rotation.y = -0.4;
    this.accessoriesGroup.add(this.storyCard);
  }

  updateProcedural(delta, time) {
    // 1. Origami Petal Wave Motion
    const petalSpeed = this.state === 'speaking' ? 4.0 : (this.state === 'listening' ? 0.8 : 1.2);
    this.petals.forEach(p => {
      if (!this.reducedMotion) {
        let foldOffset = Math.sin(time * petalSpeed + p.foldPhase) * 0.15;
        if (this.state === 'listening') {
          // Petals fold inward attentively
          foldOffset = -0.25;
        } else if (this.state === 'excited') {
          // Petals blossom wide open
          foldOffset = 0.35 + Math.sin(time * 6) * 0.1;
        } else if (this.state === 'speaking') {
          // Rhythmic petal breathing
          foldOffset = Math.sin(time * 6 + p.foldPhase) * (0.2 + this.speechIntensity * 0.2);
        }
        p.petalMesh.position.y = 0.95 + foldOffset;
        p.petalMesh.rotation.x = foldOffset * 0.8;
      }
    });

    // 2. Halo Rotation
    if (this.halo && !this.reducedMotion) {
      const haloSpeed = this.state === 'thinking' ? 2.5 : 0.6;
      this.halo.rotation.z += haloSpeed * delta;
      this.halo.position.y = 1.45 + Math.sin(time * 2) * 0.05;
    }

    // 3. Floating Story Card Hover
    if (this.storyCard && !this.reducedMotion) {
      this.storyCard.position.y = 0.2 + Math.sin(time * 1.8) * 0.1;
      this.storyCard.rotation.z = Math.sin(time * 1.2) * 0.1;
    }

    // 4. Eye Gaze Tracking
    this.eyes.forEach(eye => {
      eye.position.x = (eye === this.eyes[0] ? -0.22 : 0.22) + this.smoothedPointer.x * 0.04;
      eye.position.y = 0.15 + this.smoothedPointer.y * 0.03;
    });
  }
}

window.ClaudeCharacter = ClaudeCharacter;
