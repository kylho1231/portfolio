/**
 * JE. DIGITAL UNIVERSE — CODE (CHARACTER 01)
 * Identity: The Systems Architect
 * Color: Emerald green (#10B981) + Ice Cyan (#69E8F2)
 * Features: Multifaceted polyhedron core, LED visor, tracking luminous eyes,
 * floating articulated hands, concentric engineering orbit rings, code data stream particles.
 */

class CodeCharacter extends CharacterBase {
  constructor() {
    super('CODE', 0x69e8f2);
    this.accentGreen = 0x10b981;
    this.rings = [];
    this.particles = null;
    this.hands = [];
    this.visor = null;
    this.eyes = [];

    this.buildCharacter();
  }

  buildCharacter() {
    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false
    });

    const glowCyanMat = new THREE.MeshStandardMaterial({
      color: 0x69e8f2,
      emissive: 0x69e8f2,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.5
    });

    const greenEmissiveMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0.7,
      roughness: 0.3
    });

    // 1. Multifaceted Polyhedron Core Body
    const coreGeo = new THREE.IcosahedronGeometry(1.05, 1);
    this.coreMesh = new THREE.Mesh(coreGeo, cyanMat);
    this.bodyGroup.add(this.coreMesh);

    // Decorative inner wireframe lattice
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x69e8f2,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const wireMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.08, 1), wireMat);
    this.bodyGroup.add(wireMesh);

    // 2. Head with Animated LED Visor & Eyes
    const headBaseGeo = new THREE.BoxGeometry(0.8, 0.55, 0.6);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2
    });
    this.headMesh = new THREE.Mesh(headBaseGeo, headMat);
    this.headMesh.position.y = 0.95;
    this.headGroup.add(this.headMesh);

    // LED Visor
    const visorGeo = new THREE.BoxGeometry(0.72, 0.18, 0.1);
    this.visorMat = new THREE.MeshStandardMaterial({
      color: 0x69e8f2,
      emissive: 0x69e8f2,
      emissiveIntensity: 0.9,
      roughness: 0.1
    });
    this.visor = new THREE.Mesh(visorGeo, this.visorMat);
    this.visor.position.set(0, 0.95, 0.31);
    this.headGroup.add(this.visor);

    // Two Luminous Eyes on visor
    const eyeGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    [-0.18, 0.18].forEach(xOffset => {
      const eye = new THREE.Mesh(eyeGeo, eyeMat);
      eye.position.set(xOffset, 0.95, 0.37);
      this.headGroup.add(eye);
      this.eyes.push(eye);
    });

    // 3. Concentric Engineering Orbit Rings
    const ring1Geo = new THREE.TorusGeometry(1.65, 0.025, 16, 64);
    const ring1 = new THREE.Mesh(ring1Geo, glowCyanMat);
    ring1.rotation.x = Math.PI / 3;
    this.accessoriesGroup.add(ring1);
    this.rings.push({ mesh: ring1, rotSpeedX: 0.4, rotSpeedY: 0.7 });

    const ring2Geo = new THREE.TorusGeometry(1.95, 0.02, 16, 64);
    const ring2 = new THREE.Mesh(ring2Geo, greenEmissiveMat);
    ring2.rotation.y = Math.PI / 4;
    this.accessoriesGroup.add(ring2);
    this.rings.push({ mesh: ring2, rotSpeedX: -0.5, rotSpeedY: 0.3 });

    // 4. Floating Articulated Hands
    const handGeo = new THREE.BoxGeometry(0.24, 0.14, 0.36);
    const leftHand = new THREE.Mesh(handGeo, cyanMat);
    leftHand.position.set(-1.4, 0, 0);
    const rightHand = new THREE.Mesh(handGeo, cyanMat);
    rightHand.position.set(1.4, 0, 0);
    this.accessoriesGroup.add(leftHand);
    this.accessoriesGroup.add(rightHand);
    this.hands.push(leftHand, rightHand);

    // 5. Orbiting Code Data Particles
    const particleCount = 48;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.4 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      positions[i] = radius * Math.cos(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi);
      positions[i + 2] = radius * Math.cos(phi) * Math.sin(theta);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x69e8f2,
      size: 0.05,
      transparent: true,
      opacity: 0.75
    });
    this.particles = new THREE.Points(particleGeo, particleMat);
    this.effectsGroup.add(this.particles);
  }

  updateProcedural(delta, time) {
    // 1. Engineering Rings Rotation
    const ringSpeedMult = this.state === 'thinking' ? 2.5 : (this.state === 'listening' ? 0.4 : 1.0);
    this.rings.forEach(r => {
      if (!this.reducedMotion) {
        r.mesh.rotation.x += r.rotSpeedX * delta * ringSpeedMult;
        r.mesh.rotation.y += r.rotSpeedY * delta * ringSpeedMult;
      }
    });

    // 2. Data Particles Orbit
    if (this.particles && !this.reducedMotion) {
      const particleRotSpeed = this.state === 'thinking' ? 1.5 : 0.3;
      this.particles.rotation.y += particleRotSpeed * delta;
      this.particles.rotation.x = Math.sin(time * 0.5) * 0.15;
    }

    // 3. Floating Hands Animation
    if (this.hands.length === 2) {
      if (this.state === 'listening') {
        this.hands[0].position.x = -1.1 + Math.sin(time * 2) * 0.05;
        this.hands[1].position.x = 1.1 - Math.sin(time * 2) * 0.05;
      } else if (this.state === 'speaking') {
        this.hands[0].position.y = Math.sin(time * 6) * 0.15;
        this.hands[1].position.y = -Math.sin(time * 6) * 0.15;
      } else if (this.state === 'excited') {
        this.hands[0].position.x = -1.6 + Math.sin(time * 8) * 0.1;
        this.hands[1].position.x = 1.6 - Math.sin(time * 8) * 0.1;
      } else {
        // Idle
        this.hands[0].position.x = -1.35;
        this.hands[0].position.y = Math.sin(time * 1.5) * 0.08;
        this.hands[1].position.x = 1.35;
        this.hands[1].position.y = Math.cos(time * 1.5) * 0.08;
      }
    }

    // 4. Visor Pulse during speech / thinking
    if (this.visorMat) {
      if (this.state === 'speaking') {
        this.visorMat.emissiveIntensity = 0.8 + this.speechIntensity * 0.8;
      } else if (this.state === 'thinking') {
        this.visorMat.emissiveIntensity = 0.6 + Math.sin(time * 8) * 0.4;
      } else {
        this.visorMat.emissiveIntensity = 0.7;
      }
    }

    // 5. Gaze tracking on eyes
    this.eyes.forEach(eye => {
      eye.position.x = (eye === this.eyes[0] ? -0.18 : 0.18) + this.smoothedPointer.x * 0.03;
      eye.position.y = 0.95 + this.smoothedPointer.y * 0.02;
    });

    // 6. Slow body core rotation
    if (!this.reducedMotion && this.coreMesh) {
      this.coreMesh.rotation.y = time * 0.2;
    }
  }
}

window.CodeCharacter = CodeCharacter;
