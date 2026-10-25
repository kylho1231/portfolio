/**
 * JE. CHIBI AI UNIVERSE — CODEX (CHARACTER 02 / BLUE CHIBI ROBOT)
 * Role: Programming Expert & Systems Architecture Guide
 * Visual Reference: Leftmost sky-blue robot in reference artwork.
 * Features:
 * - Oversized rounded baby-blue metallic dome helmet with periscope antenna
 * - Circular headphone bolt ears
 * - Large expressive glossy blue eyes with anime catchlights
 * - Digital glowing mouth slot with speech pulse
 * - Plump rounded torso with cyber grid texture and illuminated chest reactor
 * - Chunky robotic sneakers with circular wheel treads
 * - Signature Prop: Technical clipboard with paper checklist document
 */

class CodexCharacter extends CharacterBase {
  constructor() {
    super('CODEX', 0x38bdf8);
    this.primaryBlue = 0x0284c7;
    this.lightCyan = 0x69e8f2;
    this.accentPink = 0xf472b6;

    this.clipboard = null;
    this.chestReactor = null;
    this.antennaLens = null;

    this.buildChibi();
  }

  buildChibi() {
    // 1. Materials Palette
    const helmetMat = new THREE.MeshStandardMaterial({
      color: 0x7dd3fc,
      metalness: 0.55,
      roughness: 0.25
    });

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.45,
      roughness: 0.35
    });

    const navyAccentMat = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      metalness: 0.6,
      roughness: 0.3
    });

    const jointMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.8,
      roughness: 0.25
    });

    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const irisMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x090d16 });
    const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const mouthSlotMat = new THREE.MeshBasicMaterial({ color: 0x082f49 });
    this.mouthGlowMat = new THREE.MeshStandardMaterial({
      color: 0x69e8f2,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.9,
      roughness: 0.2
    });

    const reactorMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.85,
      roughness: 0.2
    });

    const pinkTrimMat = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.3,
      metalness: 0.2
    });

    // 2. Head & Helmet Assembly (headGroup at y = 1.05)
    // Large rounded dome helmet
    const headGeo = new THREE.SphereGeometry(0.72, 32, 32);
    headGeo.scale(1.0, 0.95, 0.98);
    this.headMesh = new THREE.Mesh(headGeo, helmetMat);
    this.headGroup.add(this.headMesh);

    // Top Periscope Antenna
    const stalkGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.2, 16);
    const stalk = new THREE.Mesh(stalkGeo, jointMat);
    stalk.position.set(0, 0.76, 0);
    this.headGroup.add(stalk);

    const pinkRing = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.02, 12, 24), pinkTrimMat);
    pinkRing.position.set(0, 0.82, 0);
    pinkRing.rotation.x = Math.PI / 2;
    this.headGroup.add(pinkRing);

    this.antennaLens = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 16), this.mouthGlowMat);
    this.antennaLens.position.set(0, 0.88, 0);
    this.headGroup.add(this.antennaLens);

    // Circular Headphone Ears (Left & Right)
    const earGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.14, 24);
    earGeo.rotateZ(Math.PI / 2);
    const earCapGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.18, 24);
    earCapGeo.rotateZ(Math.PI / 2);

    const leftEar = new THREE.Mesh(earGeo, navyAccentMat);
    leftEar.position.set(-0.72, 0, 0);
    const leftEarCap = new THREE.Mesh(earCapGeo, helmetMat);
    leftEarCap.position.set(-0.76, 0, 0);
    this.headGroup.add(leftEar, leftEarCap);

    const rightEar = new THREE.Mesh(earGeo, navyAccentMat);
    rightEar.position.set(0.72, 0, 0);
    const rightEarCap = new THREE.Mesh(earCapGeo, helmetMat);
    rightEarCap.position.set(0.76, 0, 0);
    this.headGroup.add(rightEar, rightEarCap);

    // 3. Expressive Chibi Eyes
    const createEye = (isRight) => {
      const eyeGroup = new THREE.Group();
      const xOffset = isRight ? 0.24 : -0.24;

      // Sclera
      const sclera = new THREE.Mesh(new THREE.CircleGeometry(0.17, 24), eyeWhiteMat);
      sclera.position.set(0, 0, 0);
      eyeGroup.add(sclera);

      // Iris
      const iris = new THREE.Mesh(new THREE.CircleGeometry(0.13, 24), irisMat);
      iris.position.set(0, -0.01, 0.002);
      eyeGroup.add(iris);

      // Pupil
      const pupil = new THREE.Mesh(new THREE.CircleGeometry(0.085, 24), pupilMat);
      pupil.position.set(0, -0.01, 0.004);
      eyeGroup.add(pupil);

      // Catchlight 1 (Big top-right)
      const spec1 = new THREE.Mesh(new THREE.CircleGeometry(0.038, 16), catchlightMat);
      spec1.position.set(0.04, 0.04, 0.006);
      eyeGroup.add(spec1);

      // Catchlight 2 (Small bottom-left)
      const spec2 = new THREE.Mesh(new THREE.CircleGeometry(0.018, 16), catchlightMat);
      spec2.position.set(-0.03, -0.04, 0.006);
      eyeGroup.add(spec2);

      eyeGroup.position.set(xOffset, 0.06, 0.69);
      return { group: eyeGroup, pupil: pupil, iris: iris };
    };

    const eyeL = createEye(false);
    const eyeR = createEye(true);
    this.leftEye = eyeL.group;
    this.rightEye = eyeR.group;
    this.leftPupil = eyeL.pupil;
    this.rightPupil = eyeR.pupil;
    this.headGroup.add(this.leftEye, this.rightEye);

    // Cheeks Blush Dots
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xf472b6, transparent: true, opacity: 0.45 });
    const blushL = new THREE.Mesh(new THREE.CircleGeometry(0.07, 16), blushMat);
    blushL.position.set(-0.35, -0.12, 0.67);
    const blushR = new THREE.Mesh(new THREE.CircleGeometry(0.07, 16), blushMat);
    blushR.position.set(0.35, -0.12, 0.67);
    this.headGroup.add(blushL, blushR);

    // Digital Mouth Slot
    const mouthHousing = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 0.04), mouthSlotMat);
    mouthHousing.position.set(0, -0.22, 0.68);
    this.mouth = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.03, 0.05), this.mouthGlowMat);
    this.mouth.position.set(0, -0.22, 0.69);
    this.headGroup.add(mouthHousing, this.mouth);

    // 4. Torso & Body Assembly (bodyGroup at y = 0.45)
    // Plump Rounded Torso
    const torsoGeo = new THREE.CylinderGeometry(0.38, 0.44, 0.55, 24);
    this.torsoMesh = new THREE.Mesh(torsoGeo, bodyMat);
    this.bodyGroup.add(this.torsoMesh);

    // Neck Collar Ring
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.04, 16, 32), navyAccentMat);
    collar.position.set(0, 0.28, 0);
    collar.rotation.x = Math.PI / 2;
    this.bodyGroup.add(collar);

    // Chest Reactor
    this.chestReactor = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.05, 20), reactorMat);
    this.chestReactor.position.set(0, 0.08, 0.38);
    this.chestReactor.rotation.x = Math.PI / 2;
    this.bodyGroup.add(this.chestReactor);

    // Torso Tech Grid Lines
    const gridLine1 = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.015, 0.01), navyAccentMat);
    gridLine1.position.set(0, -0.06, 0.41);
    const gridLine2 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.015, 0.01), navyAccentMat);
    gridLine2.position.set(0, -0.16, 0.43);
    this.bodyGroup.add(gridLine1, gridLine2);

    // 5. Short Rounded Arms (leftArmGroup & rightArmGroup)
    // Left Arm (Holding Clipboard)
    const armGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.32, 16);
    const shoulderGeo = new THREE.SphereGeometry(0.11, 16, 16);
    const handGeo = new THREE.SphereGeometry(0.09, 16, 16);

    const leftShoulder = new THREE.Mesh(shoulderGeo, navyAccentMat);
    const leftArm = new THREE.Mesh(armGeo, helmetMat);
    leftArm.position.set(0, -0.18, 0);
    const leftHand = new THREE.Mesh(handGeo, jointMat);
    leftHand.position.set(0, -0.34, 0);
    this.leftArmGroup.add(leftShoulder, leftArm, leftHand);

    // Technical Clipboard in Left Hand (Held proudly like reference!)
    this.clipboard = new THREE.Group();
    const boardMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
    const paperMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    const lineMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });

    const board = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.38, 0.02), boardMat);
    const paper = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.32, 0.025), paperMat);
    paper.position.z = 0.005;
    this.clipboard.add(board, paper);

    // Document checklist lines
    [-0.08, -0.02, 0.04, 0.1].forEach(yPos => {
      const line = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.015, 0.03), lineMat);
      line.position.set(0, yPos, 0.01);
      this.clipboard.add(line);
    });

    this.clipboard.position.set(0, -0.32, 0.14);
    this.clipboard.rotation.x = -0.3;
    this.leftArmGroup.add(this.clipboard);

    // Right Arm (Free / Gesturing / Thinking)
    const rightShoulder = new THREE.Mesh(shoulderGeo, navyAccentMat);
    const rightArm = new THREE.Mesh(armGeo, helmetMat);
    rightArm.position.set(0, -0.18, 0);
    const rightHand = new THREE.Mesh(handGeo, jointMat);
    rightHand.position.set(0, -0.34, 0);
    this.rightArmGroup.add(rightShoulder, rightArm, rightHand);

    // 6. Stubby Legs & Chunky Robotic Sneakers
    const legGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.22, 16);
    const bootGeo = new THREE.BoxGeometry(0.24, 0.16, 0.38);
    const soleGeo = new THREE.BoxGeometry(0.26, 0.06, 0.40);
    const wheelGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.28, 16);
    wheelGeo.rotateZ(Math.PI / 2);

    const createLeg = (isRight) => {
      const legGroup = isRight ? this.rightLegGroup : this.leftLegGroup;
      const legMesh = new THREE.Mesh(legGeo, jointMat);
      legMesh.position.set(0, -0.11, 0);

      const boot = new THREE.Mesh(bootGeo, helmetMat);
      boot.position.set(0, -0.22, 0.06);

      const sole = new THREE.Mesh(soleGeo, navyAccentMat);
      sole.position.set(0, -0.30, 0.06);

      const wheel = new THREE.Mesh(wheelGeo, jointMat);
      wheel.position.set(0, -0.22, 0.06);

      legGroup.add(legMesh, boot, sole, wheel);
    };
    createLeg(false);
    createLeg(true);

    // 7. Ambient Data Sparkles (effectsGroup)
    const sparkleCount = 20;
    const sparkleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 2.2;
      positions[i + 1] = Math.random() * 2.2 - 0.5;
      positions[i + 2] = (Math.random() - 0.5) * 2.0;
    }
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const sparkleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.75
    });
    this.sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    this.effectsGroup.add(this.sparkles);
  }

  updateProcedural(delta, time) {
    // 1. Eye Blinking & Pupil Tracking
    if (this.isBlinking) {
      this.leftEye.scale.y = 0.1;
      this.rightEye.scale.y = 0.1;
    } else {
      this.leftEye.scale.y = 1.0;
      this.rightEye.scale.y = 1.0;

      // Fine pupil cursor tracking
      const px = this.smoothedPointer.x * 0.04;
      const py = this.smoothedPointer.y * 0.03;
      if (this.leftPupil && this.rightPupil) {
        this.leftPupil.position.x = px;
        this.leftPupil.position.y = -0.01 + py;
        this.rightPupil.position.x = px;
        this.rightPupil.position.y = -0.01 + py;
      }
    }

    // 2. State-Specific Arm & Limb Choreography
    if (!this.reducedMotion) {
      if (this.state === 'thinking') {
        // Signature Pose: Codex raises right hand toward chin to ponder!
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.38, 0.72, 0.45), 0.1);
        this.rightArmGroup.rotation.x = -1.2;
        this.rightArmGroup.rotation.z = -0.5;

        // Left arm steadies clipboard
        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.48, 0.60, 0.2), 0.1);
        this.leftArmGroup.rotation.x = -0.2;
      } else if (this.state === 'speaking') {
        // Speech cadence: Head bobs, right hand gestures, mouth pulses
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.58, 0.62, 0.2), 0.1);
        this.rightArmGroup.rotation.x = -0.4 + Math.sin(time * 6) * 0.25;
        this.rightArmGroup.rotation.z = 0.2;

        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.52, 0.62, 0.15), 0.1);
        this.leftArmGroup.rotation.x = -0.3 + Math.cos(time * 5) * 0.15;

        if (this.mouthGlowMat) {
          this.mouthGlowMat.emissiveIntensity = 0.8 + this.speechIntensity * 0.8;
          this.mouth.scale.x = 1.0 + this.speechIntensity * 0.4;
        }
      } else if (this.state === 'excited') {
        // Cheerful jumping & waving
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.62, 0.85, 0.1), 0.15);
        this.rightArmGroup.rotation.z = 1.2 + Math.sin(time * 12) * 0.3;
        this.rightArmGroup.rotation.x = -0.2;

        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.62, 0.85, 0.1), 0.15);
        this.leftArmGroup.rotation.z = -1.2 - Math.sin(time * 12) * 0.3;
        this.leftArmGroup.rotation.x = -0.2;
      } else {
        // Idle: Gentle breathing sway
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.55, 0.65, 0), 0.1);
        this.rightArmGroup.rotation.x = Math.sin(time * 1.8) * 0.08;
        this.rightArmGroup.rotation.z = 0.08;

        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.55, 0.65, 0), 0.1);
        this.leftArmGroup.rotation.x = -0.2 + Math.cos(time * 1.8) * 0.06;
        this.leftArmGroup.rotation.z = -0.08;

        if (this.mouthGlowMat) {
          this.mouthGlowMat.emissiveIntensity = 0.8;
          this.mouth.scale.x = 1.0;
        }
      }
    }

    // 3. Chest Reactor Pulse
    if (this.chestReactor) {
      const pulseSpeed = this.state === 'thinking' ? 4.5 : 2.0;
      const s = 1.0 + Math.sin(time * pulseSpeed) * 0.08;
      this.chestReactor.scale.set(s, s, s);
    }

    // 4. Sparkle Particles Drift
    if (this.sparkles && !this.reducedMotion) {
      this.sparkles.rotation.y += delta * 0.2;
    }
  }
}

// Backwards compatibility aliases
window.CodexCharacter = CodexCharacter;
window.CodeCharacter = CodexCharacter;
