/**
 * JE. DIGITAL UNIVERSE — CODE (CHARACTER 01)
 * Identity: The Systems Architect
 * Color: Emerald green (#10B981) + Ice Cyan (#69E8F2) + Brushed Graphite (#111827)
 * Archetype: Technical guardian / futuristic engineering companion
 *
 * Core Features:
 * - Multifaceted metallic polyhedron chassis with beveled cyber-armor shell
 * - Luminous internal pulsating cyan power reactor core visible through chassis panel gaps
 * - Seamlessly integrated cybernetic visor with dark obsidian glass and glowing scanline HUD
 * - Expressive dual digital optic lenses with emerald pupils that smoothly track cursor gaze
 * - Articulated cybernetic brow plates (idle, listening curiosity, analytical thinking, excitement)
 * - Layered carapace armor cowls (top crest with cooling vents, flank plates with cyan energy channels)
 * - Mechanical expansion effect: Outer armor panels smoothly separate during excited/speaking states
 * - Articulated floating mechanical hands (repulsor cuff, palm chassis, articulated fingers, holographic projector)
 * - Three concentric engineering gyro rings with graphite gimbal brackets, tick nodes, and counter-rotation
 * - Orbiting code data packets and algorithmic brackets
 */

class CodeCharacter extends CharacterBase {
  constructor() {
    super('CODE', 0x69e8f2);
    this.accentGreen = 0x10b981;

    // Custom optics gaze tracking instead of group-level neck swing
    this.disableDefaultGaze = true;

    // Structural references
    this.rings = [];
    this.particles = null;
    this.hands = [];
    this.leftHand = null;
    this.rightHand = null;
    this.leftEye = null;
    this.rightEye = null;
    this.leftPupil = null;
    this.rightPupil = null;
    this.leftBrow = null;
    this.rightBrow = null;
    this.scanline = null;
    this.hologram = null;
    this.hologramMat = null;

    // Expandable armor panels
    this.topCrest = null;
    this.leftFlank = null;
    this.rightFlank = null;
    this.reactor = null;
    this.currentExpansion = 0;

    this.buildCharacter();
  }

  buildCharacter() {
    // 1. High-Performance PBR Materials
    const graphiteMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.38,
      metalness: 0.82
    });

    const armorPlateMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.45,
      metalness: 0.75
    });

    const darkVisorHousingMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.25,
      metalness: 0.9
    });

    const visorGlassMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      roughness: 0.08,
      metalness: 0.95
    });

    const cyanGlowMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.75,
      roughness: 0.2
    });
    this.cyanGlowMat = cyanGlowMat;

    const emeraldGlowMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.75,
      roughness: 0.2
    });
    this.emeraldGlowMat = emeraldGlowMat;

    const coreReactorMat = new THREE.MeshStandardMaterial({
      color: 0x69e8f2,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.95,
      roughness: 0.15
    });

    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0x69e8f2,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });

    // 2. Chassis Core & Internal Reactor (in bodyGroup)
    // Pulsating Inner Reactor Core
    this.reactor = new THREE.Mesh(new THREE.OctahedronGeometry(0.52, 0), coreReactorMat);
    this.bodyGroup.add(this.reactor);

    // Inner Cyber-Wireframe Lattice
    const wireMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.92, 1), innerWireMat);
    this.bodyGroup.add(wireMesh);

    // Main Faceted Polyhedral Chassis Body
    const coreGeo = new THREE.IcosahedronGeometry(1.02, 1);
    this.coreMesh = new THREE.Mesh(coreGeo, graphiteMat);
    this.bodyGroup.add(this.coreMesh);

    // 3. Layered Outer Armor Cowls (Expandable Carapace)
    // Top Crest Armor Cowl (Crown)
    this.topCrest = new THREE.Group();
    this.topCrest.position.set(0, 1.02, 0);
    const crestPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.54, 0.14, 6), armorPlateMat);
    this.topCrest.add(crestPlate);
    // 3 Emerald Cooling Vent Slats
    [-0.14, 0, 0.14].forEach(zPos => {
      const vent = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.03, 0.05), emeraldGlowMat);
      vent.position.set(0, 0.08, zPos);
      this.topCrest.add(vent);
    });
    this.bodyGroup.add(this.topCrest);

    // Left Flank Armor Carapace
    this.leftFlank = new THREE.Group();
    this.leftFlank.position.set(-0.98, 0.0, 0.0);
    const leftPlate = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.78, 0.9), armorPlateMat);
    const leftEnergySeam = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.68, 0.92), cyanGlowMat);
    this.leftFlank.add(leftPlate, leftEnergySeam);
    this.bodyGroup.add(this.leftFlank);

    // Right Flank Armor Carapace
    this.rightFlank = new THREE.Group();
    this.rightFlank.position.set(0.98, 0.0, 0.0);
    const rightPlate = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.78, 0.9), armorPlateMat);
    const rightEnergySeam = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.68, 0.92), cyanGlowMat);
    this.rightFlank.add(rightPlate, rightEnergySeam);
    this.bodyGroup.add(this.rightFlank);

    // Bottom Thruster Gimbal Ring
    const thrusterGeo = new THREE.TorusGeometry(0.32, 0.04, 12, 24);
    const thruster = new THREE.Mesh(thrusterGeo, emeraldGlowMat);
    thruster.position.set(0, -0.98, 0);
    thruster.rotation.x = Math.PI / 2;
    this.bodyGroup.add(thruster);

    // 4. Integrated Face Visor & Digital Cyber-Optics
    this.visorGroup = new THREE.Group();
    // Positioned seamlessly on the front-upper quadrant of the core
    this.visorGroup.position.set(0, 0.22, 0.86);
    this.visorGroup.rotation.x = -0.12; // Angled back along contour

    // Visor Outer Beveled Housing
    const visorHousingGeo = new THREE.BoxGeometry(0.88, 0.34, 0.16);
    const visorHousing = new THREE.Mesh(visorHousingGeo, darkVisorHousingMat);
    this.visorGroup.add(visorHousing);

    // Cyan Trim Edge
    const trimGeo = new THREE.BoxGeometry(0.9, 0.36, 0.02);
    const trim = new THREE.Mesh(trimGeo, cyanGlowMat);
    trim.position.z = 0.02;
    this.visorGroup.add(trim);

    // Deep Obsidian Glass Screen
    const screenGeo = new THREE.BoxGeometry(0.82, 0.28, 0.04);
    const screen = new THREE.Mesh(screenGeo, visorGlassMat);
    screen.position.z = 0.08;
    this.visorGroup.add(screen);

    // Glowing Horizontal HUD Scanline
    const scanlineGeo = new THREE.BoxGeometry(0.76, 0.016, 0.01);
    this.scanline = new THREE.Mesh(scanlineGeo, cyanGlowMat);
    this.scanline.position.set(0, 0, 0.10);
    this.visorGroup.add(this.scanline);

    // Dual Expressive Digital Optic Lenses (Left & Right Eyes)
    const irisGeo = new THREE.TorusGeometry(0.065, 0.014, 12, 24);
    const pupilGeo = new THREE.SphereGeometry(0.038, 16, 16);
    const specGeo = new THREE.SphereGeometry(0.012, 8, 8);
    const specMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Left Eye
    this.leftEye = new THREE.Group();
    this.leftEye.position.set(-0.20, 0.0, 0.10);
    const leftIris = new THREE.Mesh(irisGeo, cyanGlowMat);
    this.leftPupil = new THREE.Mesh(pupilGeo, emeraldGlowMat);
    const leftSpec = new THREE.Mesh(specGeo, specMat);
    leftSpec.position.set(0.015, 0.015, 0.03);
    this.leftEye.add(leftIris, this.leftPupil, leftSpec);
    this.visorGroup.add(this.leftEye);

    // Right Eye
    this.rightEye = new THREE.Group();
    this.rightEye.position.set(0.20, 0.0, 0.10);
    const rightIris = new THREE.Mesh(irisGeo, cyanGlowMat);
    this.rightPupil = new THREE.Mesh(pupilGeo, emeraldGlowMat);
    const rightSpec = new THREE.Mesh(specGeo, specMat);
    rightSpec.position.set(0.015, 0.015, 0.03);
    this.rightEye.add(rightIris, this.rightPupil, rightSpec);
    this.visorGroup.add(this.rightEye);

    // Articulated Cybernetic Brow Plates
    const browGeo = new THREE.BoxGeometry(0.32, 0.04, 0.04);
    this.leftBrow = new THREE.Mesh(browGeo, graphiteMat);
    this.leftBrow.position.set(-0.20, 0.16, 0.10);
    this.rightBrow = new THREE.Mesh(browGeo, graphiteMat);
    this.rightBrow.position.set(0.20, 0.16, 0.10);
    this.visorGroup.add(this.leftBrow, this.rightBrow);

    // Attach Visor directly to bodyGroup so it remains anchored to the chassis
    this.bodyGroup.add(this.visorGroup);

    // 5. Floating Articulated Cybernetic Hands (accessoriesGroup)
    this.leftHand = this.createMechanicalHand(-1);
    this.leftHand.position.set(-1.45, -0.22, 0.15);
    this.rightHand = this.createMechanicalHand(1);
    this.rightHand.position.set(1.45, -0.22, 0.15);

    this.accessoriesGroup.add(this.leftHand, this.rightHand);
    this.hands.push(this.leftHand, this.rightHand);

    // Holographic Code Blueprint Module above Right Hand
    this.hologramMat = new THREE.MeshBasicMaterial({
      color: 0x69e8f2,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    this.hologram = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.3), this.hologramMat);
    this.hologram.position.set(0, 0.22, 0.08);
    this.hologram.rotation.x = -Math.PI / 4;
    this.rightHand.add(this.hologram);

    // 6. Concentric Engineering Gyro Rings (accessoriesGroup)
    // Ring 1 (Inner Cyan Gimbal with 4 clamp nodes)
    const ring1Geo = new THREE.TorusGeometry(1.58, 0.024, 16, 64);
    const ring1 = new THREE.Mesh(ring1Geo, cyanGlowMat);
    // 4 clamp brackets
    for (let b = 0; b < 4; b++) {
      const angle = (b / 4) * Math.PI * 2;
      const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.12), armorPlateMat);
      bracket.position.set(Math.cos(angle) * 1.58, Math.sin(angle) * 1.58, 0);
      ring1.add(bracket);
    }
    ring1.rotation.x = Math.PI / 3;
    this.accessoriesGroup.add(ring1);
    this.rings.push({ mesh: ring1, rotSpeedX: 0.35, rotSpeedY: 0.55 });

    // Ring 2 (Outer Emerald Gimbal)
    const ring2Geo = new THREE.TorusGeometry(1.92, 0.018, 16, 64);
    const ring2 = new THREE.Mesh(ring2Geo, emeraldGlowMat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    this.accessoriesGroup.add(ring2);
    this.rings.push({ mesh: ring2, rotSpeedX: -0.45, rotSpeedY: 0.25 });

    // Ring 3 (Data Horizon Orbit Ring)
    const ring3Geo = new THREE.TorusGeometry(2.22, 0.012, 16, 64);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = -Math.PI / 5;
    this.accessoriesGroup.add(ring3);
    this.rings.push({ mesh: ring3, rotSpeedX: 0.15, rotSpeedY: -0.3 });

    // 7. Orbiting Code Data Packets (effectsGroup)
    const particleCount = 48;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.45 + Math.random() * 0.95;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;
      positions[i] = radius * Math.cos(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi);
      positions[i + 2] = radius * Math.cos(phi) * Math.sin(theta);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x69e8f2,
      size: 0.055,
      transparent: true,
      opacity: 0.85
    });
    this.particles = new THREE.Points(particleGeo, particleMat);
    this.effectsGroup.add(this.particles);
  }

  createMechanicalHand(side) {
    // side: -1 for left, 1 for right
    const handGroup = new THREE.Group();
    const graphiteMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.38,
      metalness: 0.82
    });
    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.7,
      roughness: 0.2
    });

    // Floating Wrist Repulsor Ring
    const wristGeo = new THREE.TorusGeometry(0.12, 0.02, 12, 24);
    const wrist = new THREE.Mesh(wristGeo, cyanMat);
    wrist.rotation.x = Math.PI / 2;
    handGroup.add(wrist);

    // Palm Chassis Plate
    const palmGeo = new THREE.BoxGeometry(0.24, 0.10, 0.26);
    const palm = new THREE.Mesh(palmGeo, graphiteMat);
    palm.position.set(0, 0, 0.14);
    handGroup.add(palm);

    // Finger 1 (Index)
    const f1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.16), graphiteMat);
    f1.position.set(-0.06 * side, 0, 0.32);
    handGroup.add(f1);

    // Finger 2 (Middle)
    const f2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.18), graphiteMat);
    f2.position.set(0.03 * side, 0, 0.33);
    handGroup.add(f2);

    // Opposable Thumb Plate
    const thumb = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.12), cyanMat);
    thumb.position.set(0.14 * side, 0.02, 0.20);
    thumb.rotation.y = 0.5 * side;
    handGroup.add(thumb);

    return handGroup;
  }

  updateProcedural(delta, time) {
    // 1. Engineering Gyro Rings Dynamic Precession
    const ringSpeedMult = this.state === 'thinking' ? 2.6 : (this.state === 'listening' ? 0.35 : 1.0);
    this.rings.forEach(r => {
      if (!this.reducedMotion) {
        r.mesh.rotation.x += r.rotSpeedX * delta * ringSpeedMult;
        r.mesh.rotation.y += r.rotSpeedY * delta * ringSpeedMult;
      }
    });

    // 2. Data Particles Swirl
    if (this.particles && !this.reducedMotion) {
      const particleRotSpeed = this.state === 'thinking' ? 1.8 : 0.4;
      this.particles.rotation.y += particleRotSpeed * delta;
      this.particles.rotation.x = Math.sin(time * 0.4) * 0.12;
    }

    // 3. Reactor Core Pulse
    if (this.reactor) {
      const pulseSpeed = this.state === 'thinking' ? 6.0 : (this.state === 'speaking' ? 4.5 : 2.0);
      const reactorScale = 0.52 + Math.sin(time * pulseSpeed) * 0.05;
      this.reactor.scale.set(reactorScale, reactorScale, reactorScale);
      this.reactor.rotation.y += delta * 0.8;
      this.reactor.rotation.x += delta * 0.4;
    }

    // 4. Mechanical Shell Expansion Effect (excited / speaking states)
    let targetExpansion = 0;
    if (this.state === 'excited') targetExpansion = 0.22;
    else if (this.state === 'speaking') targetExpansion = 0.08;

    this.currentExpansion += (targetExpansion - this.currentExpansion) * 0.1;
    if (this.leftFlank && this.rightFlank && this.topCrest) {
      this.leftFlank.position.x = -0.98 - this.currentExpansion;
      this.rightFlank.position.x = 0.98 + this.currentExpansion;
      this.topCrest.position.y = 1.02 + this.currentExpansion * 0.7;
    }

    // 5. Gaze Tracking & Expressive Optics
    // Subtle body yaw & pitch toward cursor
    this.bodyGroup.rotation.y = this.smoothedPointer.x * 0.18;
    this.bodyGroup.rotation.x = -this.smoothedPointer.y * 0.12;

    // Optical Pupil Gaze Tracking within Visor Window
    const gazeX = Math.max(-0.08, Math.min(0.08, this.smoothedPointer.x * 0.08));
    const gazeY = Math.max(-0.04, Math.min(0.04, this.smoothedPointer.y * 0.05));

    if (this.leftEye && this.rightEye) {
      if (this.state === 'thinking') {
        // Horizontal algorithmic scanning motion
        const scanOffset = Math.sin(time * 7) * 0.06;
        this.leftEye.position.x = -0.20 + scanOffset;
        this.rightEye.position.x = 0.20 + scanOffset;
        this.leftEye.position.y = 0.0;
        this.rightEye.position.y = 0.0;
      } else {
        this.leftEye.position.x = -0.20 + gazeX;
        this.rightEye.position.x = 0.20 + gazeX;
        this.leftEye.position.y = gazeY;
        this.rightEye.position.y = gazeY;
      }
    }

    // Pupil Dilation / Brow Articulation by State
    if (this.leftPupil && this.rightPupil && this.leftBrow && this.rightBrow) {
      if (this.state === 'listening') {
        // Pupils dilate, brows arch inquisitively
        this.leftPupil.scale.set(1.25, 1.25, 1.25);
        this.rightPupil.scale.set(1.25, 1.25, 1.25);
        this.leftBrow.rotation.z = -0.12;
        this.rightBrow.rotation.z = 0.12;
        this.leftBrow.position.y = 0.18;
        this.rightBrow.position.y = 0.18;
      } else if (this.state === 'thinking') {
        // Focused squint, brows angle downward analytically
        this.leftPupil.scale.set(0.9, 0.9, 0.9);
        this.rightPupil.scale.set(0.9, 0.9, 0.9);
        this.leftBrow.rotation.z = 0.20;
        this.rightBrow.rotation.z = -0.20;
        this.leftBrow.position.y = 0.14;
        this.rightBrow.position.y = 0.14;
      } else if (this.state === 'excited') {
        // High alert cheerful pulse
        this.leftPupil.scale.set(1.3, 1.3, 1.3);
        this.rightPupil.scale.set(1.3, 1.3, 1.3);
        this.leftBrow.rotation.z = 0;
        this.rightBrow.rotation.z = 0;
        this.leftBrow.position.y = 0.20;
        this.rightBrow.position.y = 0.20;
      } else {
        // Neutral Idle
        this.leftPupil.scale.set(1.0, 1.0, 1.0);
        this.rightPupil.scale.set(1.0, 1.0, 1.0);
        this.leftBrow.rotation.z = 0;
        this.rightBrow.rotation.z = 0;
        this.leftBrow.position.y = 0.16;
        this.rightBrow.position.y = 0.16;
      }
    }

    // Visor HUD Scanline Glow & Speech Pulse
    if (this.cyanGlowMat) {
      if (this.state === 'speaking') {
        this.cyanGlowMat.emissiveIntensity = 0.75 + this.speechIntensity * 0.45;
      } else if (this.state === 'thinking') {
        this.cyanGlowMat.emissiveIntensity = 0.65 + Math.sin(time * 6) * 0.25;
      } else {
        this.cyanGlowMat.emissiveIntensity = 0.75;
      }
    }

    // 6. Floating Mechanical Hands Kinematics
    if (this.leftHand && this.rightHand) {
      if (this.state === 'listening') {
        // Hands move inward attentively near chest
        this.leftHand.position.lerp(new THREE.Vector3(-1.18, -0.12, 0.45), 0.1);
        this.rightHand.position.lerp(new THREE.Vector3(1.18, -0.12, 0.45), 0.1);
        this.leftHand.rotation.y = 0.35;
        this.rightHand.rotation.y = -0.35;
      } else if (this.state === 'thinking') {
        // Right hand elevates near visor in classic thinking gesture
        this.leftHand.position.lerp(new THREE.Vector3(-1.35, -0.28, 0.2), 0.1);
        this.rightHand.position.lerp(new THREE.Vector3(0.85, 0.18, 0.68), 0.1);
        this.rightHand.rotation.z = 0.45;
        this.rightHand.rotation.y = -0.4;
      } else if (this.state === 'speaking') {
        // Natural conversational wave cadence
        this.leftHand.position.x = -1.4;
        this.leftHand.position.y = -0.20 + Math.sin(time * 6) * 0.12;
        this.rightHand.position.x = 1.4;
        this.rightHand.position.y = -0.20 - Math.sin(time * 6) * 0.12;
        this.leftHand.rotation.z = Math.sin(time * 3) * 0.15;
        this.rightHand.rotation.z = -Math.sin(time * 3) * 0.15;
      } else if (this.state === 'excited') {
        // Hands elevate and open with energetic micro-bounce
        this.leftHand.position.lerp(new THREE.Vector3(-1.6, 0.22, 0.3), 0.15);
        this.rightHand.position.lerp(new THREE.Vector3(1.6, 0.22, 0.3), 0.15);
        this.leftHand.rotation.z = -0.35;
        this.rightHand.rotation.z = 0.35;
      } else {
        // Idle Hovering
        this.leftHand.position.x = -1.45;
        this.leftHand.position.y = -0.22 + Math.sin(time * 1.6) * 0.06;
        this.leftHand.position.z = 0.15;
        this.leftHand.rotation.set(0, 0, 0);

        this.rightHand.position.x = 1.45;
        this.rightHand.position.y = -0.22 + Math.cos(time * 1.6) * 0.06;
        this.rightHand.position.z = 0.15;
        this.rightHand.rotation.set(0, 0, 0);
      }
    }

    // 7. Holographic Blueprint Visibility
    if (this.hologram && this.hologramMat) {
      const holoTargetOpacity = (this.state === 'speaking' || this.state === 'excited') ? 0.75 : 0.25;
      this.hologramMat.opacity += (holoTargetOpacity - this.hologramMat.opacity) * 0.1;
      this.hologram.rotation.z += delta * 0.6;
    }
  }
}

window.CodeCharacter = CodeCharacter;
