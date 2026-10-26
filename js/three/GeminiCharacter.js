/**
 * JE. CHIBI AI UNIVERSE — GEMINI (CHARACTER 03 / RAINBOW PASTEL CHIBI ROBOT)
 * Role: Main Website Tour Guide & Project Presenter (Default Hero Mascot)
 * Visual Reference: Third pastel cyan & pink retro mech in reference artwork.
 * Features:
 * - Rounded baby-blue helmet with pink headband trim & stepped top antenna
 * - Rectangular pink speaker headphone ears
 * - Oversized glossy purple/magenta eyes with anime star reflections
 * - Raised winged pastel collar & retro chassis with dials and hanging badge
 * - Chunky ribbed pink boots with yellow laces
 * - Signature Props: Retro compass gauge ring & tech folder dossier
 * - Floating iridescent rainbow halo overhead
 */

class GeminiCharacter extends CharacterBase {
  constructor() {
    super('GEMINI', 0x699cff);
    this.pastelCyan = 0x7dd3fc;
    this.pastelPink = 0xf472b6;
    this.pastelPurple = 0xc084fc;
    this.softYellow = 0xfde047;

    this.halo = null;
    this.gaugeRing = null;
    this.folder = null;
    this.sparkles = null;

    this.buildChibi();
  }

  buildChibi() {
    // 1. Materials Palette
    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x7dd3fc,
      metalness: 0.35,
      roughness: 0.3
    });

    const pinkMat = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      metalness: 0.25,
      roughness: 0.35
    });

    const lavenderMat = new THREE.MeshStandardMaterial({
      color: 0xd8b4fe,
      metalness: 0.3,
      roughness: 0.4
    });

    const yellowMat = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      roughness: 0.3
    });

    const jointMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.7,
      roughness: 0.25
    });

    const faceWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.08,
      roughness: 0.32
    });

    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const irisMat = new THREE.MeshBasicMaterial({ color: 0xc084fc });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x4c1d95 });
    const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const rainbowGlowMat = new THREE.MeshStandardMaterial({
      color: 0x699cff,
      emissive: 0x818cf8,
      emissiveIntensity: 0.75,
      roughness: 0.2
    });

    // 2. Head & Helmet Assembly (headGroup at y = 1.05)
    const headGeo = new THREE.SphereGeometry(0.68, 32, 32);
    headGeo.scale(1.0, 0.94, 0.98);
    this.headMesh = new THREE.Mesh(headGeo, cyanMat);
    this.headGroup.add(this.headMesh);

    // Inner Porcelain White Faceplate
    const faceGeo = new THREE.SphereGeometry(0.66, 32, 24, 0, Math.PI * 2, 0, Math.PI / 1.7);
    faceGeo.scale(0.96, 0.94, 0.98);
    const faceMask = new THREE.Mesh(faceGeo, faceWhiteMat);
    faceMask.position.set(0, -0.04, 0.05);
    this.headGroup.add(faceMask);

    // Pink Headband Trim
    const headbandGeo = new THREE.TorusGeometry(0.68, 0.035, 12, 32, Math.PI);
    const headband = new THREE.Mesh(headbandGeo, pinkMat);
    headband.position.set(0, 0.16, 0);
    headband.rotation.x = Math.PI / 2.3;
    this.headGroup.add(headband);

    // Stepped Cylindrical Top Antenna
    const antBase = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.16, 16), jointMat);
    antBase.position.set(0, 0.72, 0);
    const antRing = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.02, 12, 24), yellowMat);
    antRing.position.set(0, 0.78, 0);
    antRing.rotation.x = Math.PI / 2;
    const antTop = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.06, 16), pinkMat);
    antTop.position.set(0, 0.84, 0);
    this.headGroup.add(antBase, antRing, antTop);

    // Rectangular Pink Speaker Headphone Ears (Left & Right)
    const speakerGeo = new THREE.BoxGeometry(0.14, 0.28, 0.24);
    const speakerGridGeo = new THREE.BoxGeometry(0.15, 0.22, 0.18);

    const leftSpeaker = new THREE.Mesh(speakerGeo, pinkMat);
    leftSpeaker.position.set(-0.70, 0, 0);
    const leftGrid = new THREE.Mesh(speakerGridGeo, yellowMat);
    leftGrid.position.set(-0.71, 0, 0);
    this.headGroup.add(leftSpeaker, leftGrid);

    const rightSpeaker = new THREE.Mesh(speakerGeo, pinkMat);
    rightSpeaker.position.set(0.70, 0, 0);
    const rightGrid = new THREE.Mesh(speakerGridGeo, yellowMat);
    rightGrid.position.set(0.71, 0, 0);
    this.headGroup.add(rightSpeaker, rightGrid);

    // Expressive Eyes with Anime Star Catchlights
    const createEye = (isRight) => {
      const eyeGroup = new THREE.Group();
      const xOffset = isRight ? 0.24 : -0.24;

      const sclera = new THREE.Mesh(new THREE.CircleGeometry(0.16, 24), eyeWhiteMat);
      const iris = new THREE.Mesh(new THREE.CircleGeometry(0.12, 24), irisMat);
      iris.position.set(0, -0.01, 0.002);
      const pupil = new THREE.Mesh(new THREE.CircleGeometry(0.08, 24), pupilMat);
      pupil.position.set(0, -0.01, 0.004);

      // Star-shaped or dual catchlight
      const spec1 = new THREE.Mesh(new THREE.CircleGeometry(0.038, 16), catchlightMat);
      spec1.position.set(0.04, 0.04, 0.006);
      const spec2 = new THREE.Mesh(new THREE.CircleGeometry(0.018, 16), catchlightMat);
      spec2.position.set(-0.03, -0.04, 0.006);

      eyeGroup.add(sclera, iris, pupil, spec1, spec2);
      eyeGroup.position.set(xOffset, 0.05, 0.65);
      return { group: eyeGroup, pupil: pupil };
    };

    const eyeL = createEye(false);
    const eyeR = createEye(true);
    this.leftEye = eyeL.group;
    this.rightEye = eyeR.group;
    this.leftPupil = eyeL.pupil;
    this.rightPupil = eyeR.pupil;
    this.headGroup.add(this.leftEye, this.rightEye);

    // Pink Blush Dots
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xf472b6, transparent: true, opacity: 0.5 });
    const blushL = new THREE.Mesh(new THREE.CircleGeometry(0.065, 16), blushMat);
    blushL.position.set(-0.34, -0.11, 0.64);
    const blushR = new THREE.Mesh(new THREE.CircleGeometry(0.065, 16), blushMat);
    blushR.position.set(0.34, -0.11, 0.64);
    this.headGroup.add(blushL, blushR);

    // Gentle Curved Smiling Mouth
    const mouthGeo = new THREE.TorusGeometry(0.065, 0.016, 12, 20, Math.PI);
    this.mouth = new THREE.Mesh(mouthGeo, new THREE.MeshBasicMaterial({ color: 0x1e3a8a }));
    this.mouth.position.set(0, -0.21, 0.65);
    this.mouth.rotation.z = Math.PI;
    this.headGroup.add(this.mouth);

    // Floating Holographic Rainbow Halo overhead
    const haloGeo = new THREE.TorusGeometry(0.85, 0.02, 16, 48);
    this.halo = new THREE.Mesh(haloGeo, rainbowGlowMat);
    this.halo.position.set(0, 1.05, 0);
    this.halo.rotation.x = Math.PI / 2.4;
    this.headGroup.add(this.halo);

    // 3. Torso, Winged Collar & Retro Chassis (bodyGroup at y = 0.45)
    // Winged Pink Collar
    const collar = new THREE.Mesh(new THREE.ConeGeometry(0.46, 0.20, 4), pinkMat);
    collar.position.set(0, 0.28, 0);
    collar.rotation.y = Math.PI / 4;
    this.bodyGroup.add(collar);

    // Retro Chassis Body
    const bodyGeo = new THREE.CylinderGeometry(0.38, 0.42, 0.52, 24);
    const bodyMesh = new THREE.Mesh(bodyGeo, lavenderMat);
    this.bodyGroup.add(bodyMesh);

    // Horizontal Vent Lines & Dials
    const vent1 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.02, 0.02), yellowMat);
    vent1.position.set(0.06, 0.08, 0.40);
    const vent2 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.02, 0.02), yellowMat);
    vent2.position.set(0.06, 0.02, 0.41);
    const vent3 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.02, 0.02), yellowMat);
    vent3.position.set(0.06, -0.04, 0.42);

    // Hanging Blue Star Badge
    const badge = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.03, 16), jointMat);
    badge.position.set(-0.16, 0.08, 0.40);
    badge.rotation.x = Math.PI / 2;
    this.bodyGroup.add(vent1, vent2, vent3, badge);

    // 4. Arms & Signature Props (leftArmGroup & rightArmGroup)
    const armGeo = new THREE.CylinderGeometry(0.065, 0.06, 0.32, 16);
    const shoulderGeo = new THREE.SphereGeometry(0.10, 16, 16);
    const handGeo = new THREE.SphereGeometry(0.08, 16, 16);

    // Right Arm (Holding Circular Compass / Gauge Ring!)
    const rightShoulder = new THREE.Mesh(shoulderGeo, pinkMat);
    const rightArm = new THREE.Mesh(armGeo, cyanMat);
    rightArm.position.set(0, -0.16, 0);
    const rightHand = new THREE.Mesh(handGeo, yellowMat);
    rightHand.position.set(0, -0.32, 0);
    this.rightArmGroup.add(rightShoulder, rightArm, rightHand);

    // Retro Compass / Gauge Ring
    this.gaugeRing = new THREE.Group();
    const ringOuter = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.03, 12, 32), yellowMat);
    const dialFace = new THREE.Mesh(new THREE.CircleGeometry(0.12, 20), eyeWhiteMat);
    const needle = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.10, 0.01), pinkMat);
    needle.position.set(0, 0.03, 0.01);
    this.gaugeRing.add(ringOuter, dialFace, needle);
    this.gaugeRing.position.set(0, -0.32, 0.12);
    this.rightArmGroup.add(this.gaugeRing);

    // Left Arm (Holding Tech Folder Dossier)
    const leftShoulder = new THREE.Mesh(shoulderGeo, pinkMat);
    const leftArm = new THREE.Mesh(armGeo, cyanMat);
    leftArm.position.set(0, -0.16, 0);
    const leftHand = new THREE.Mesh(handGeo, yellowMat);
    leftHand.position.set(0, -0.32, 0);
    this.leftArmGroup.add(leftShoulder, leftArm, leftHand);

    // Tech Folder Dossier
    this.folder = new THREE.Group();
    const folderCover = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.28, 0.04), yellowMat);
    const folderPages = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.26, 0.03), eyeWhiteMat);
    folderPages.position.z = 0.01;
    this.folder.add(folderCover, folderPages);
    this.folder.position.set(0, -0.30, 0.14);
    this.folder.rotation.y = -0.3;
    this.leftArmGroup.add(this.folder);

    // 5. Short Legs & Ribbed Pink Boots with Yellow Laces
    const legGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.20, 16);
    const bootGeo = new THREE.BoxGeometry(0.24, 0.18, 0.36);
    const laceGeo = new THREE.BoxGeometry(0.20, 0.03, 0.03);

    const createLeg = (isRight) => {
      const legGroup = isRight ? this.rightLegGroup : this.leftLegGroup;
      const leg = new THREE.Mesh(legGeo, cyanMat);
      leg.position.set(0, -0.10, 0);

      const boot = new THREE.Mesh(bootGeo, pinkMat);
      boot.position.set(0, -0.22, 0.05);

      // Yellow Laces
      const lace1 = new THREE.Mesh(laceGeo, yellowMat);
      lace1.position.set(0, -0.16, 0.21);
      const lace2 = new THREE.Mesh(laceGeo, yellowMat);
      lace2.position.set(0, -0.22, 0.21);
      legGroup.add(leg, boot, lace1, lace2);
    };
    createLeg(false);
    createLeg(true);

    // 6. Celestial Sparkle Swirl (effectsGroup)
    const sparkleCount = 28;
    const sparkleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 2.4;
      positions[i + 1] = Math.random() * 2.5 - 0.5;
      positions[i + 2] = (Math.random() - 0.5) * 2.2;
    }
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const sparkleMat = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: 0.06,
      transparent: true,
      opacity: 0.85
    });
    this.sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    this.effectsGroup.add(this.sparkles);
  }

  updateProcedural(delta, time) {
    // 1. Blinking & Pupil Tracking
    if (this.isBlinking) {
      this.leftEye.scale.y = 0.1;
      this.rightEye.scale.y = 0.1;
    } else {
      this.leftEye.scale.y = 1.0;
      this.rightEye.scale.y = 1.0;

      const px = this.smoothedPointer.x * 0.04;
      const py = this.smoothedPointer.y * 0.03;
      if (this.leftPupil && this.rightPupil) {
        this.leftPupil.position.x = px;
        this.leftPupil.position.y = -0.01 + py;
        this.rightPupil.position.x = px;
        this.rightPupil.position.y = -0.01 + py;
      }
    }

    // 2. Halo Rotation Overhead
    if (this.halo && !this.reducedMotion) {
      this.halo.rotation.z += delta * 0.8;
      this.halo.position.y = 1.05 + Math.sin(time * 2.0) * 0.04;
    }

    // 3. State-Specific Kinematics
    if (!this.reducedMotion) {
      if (this.state === 'speaking') {
        // Welcoming gesturing with both hands!
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.55, 0.70, 0.25), 0.1);
        this.rightArmGroup.rotation.x = -0.5 + Math.sin(time * 6) * 0.2;
        this.rightArmGroup.rotation.z = 0.3;

        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.55, 0.70, 0.25), 0.1);
        this.leftArmGroup.rotation.x = -0.5 - Math.sin(time * 6) * 0.2;
        this.leftArmGroup.rotation.z = -0.3;
      } else if (this.state === 'excited') {
        // Joyful two-handed welcoming leap!
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.62, 0.90, 0.15), 0.15);
        this.rightArmGroup.rotation.z = 1.3 + Math.sin(time * 12) * 0.25;

        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.62, 0.90, 0.15), 0.15);
        this.leftArmGroup.rotation.z = -1.3 - Math.sin(time * 12) * 0.25;
      } else {
        // Idle: Signature welcoming stance — reaching both hands slightly forward
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.52, 0.65, 0.18), 0.1);
        this.rightArmGroup.rotation.x = -0.35 + Math.sin(time * 2) * 0.08;
        this.rightArmGroup.rotation.z = 0.2;

        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.52, 0.65, 0.18), 0.1);
        this.leftArmGroup.rotation.x = -0.35 + Math.cos(time * 2) * 0.08;
        this.leftArmGroup.rotation.z = -0.2;
      }
    }

    // 4. Sparkles Swirl
    if (this.sparkles && !this.reducedMotion) {
      this.sparkles.rotation.y += delta * 0.3;
    }
  }
}

window.GeminiCharacter = GeminiCharacter;
