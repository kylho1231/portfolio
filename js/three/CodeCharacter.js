/**
 * JE. CHIBI AI UNIVERSE — CODEX (CHARACTER 02 / BLUE CHIBI ROBOT)
 * Role: Programming Expert & Systems Architecture Guide
 * Visual Style: High-end Collectible 3D Toy Figurine / Kawaii Cyber-Chibi
 * 
 * Features:
 * - Dual-layer helmet & faceplate: Sky-blue metallic outer helmet shell
 *   framing a soft porcelain-white face mask
 * - Aerodynamic dual cyber antenna fins with glowing cyan LED accents
 * - Stepped periscope top antenna with pulsing cyan energy node
 * - Circular navy & chrome mechanical headphone ears with glowing cyan LED rings
 * - Expressive 3D anime chibi eyes with deep sapphire gradient, double catchlights,
 *   and smooth eyelid blink kinematics
 * - Friendly glowing cyan smile arc (replaces blocky slot) with speech pulse
 * - Soft peach blush on porcelain cheeks
 * - Plump rounded chibi torso with ceramic armor and illuminated Arc Reactor core
 * - Left hand holding a futuristic floating holographic datapad
 * - Right hand posed in an articulated friendly wave / chin-tap thinking gesture
 * - Chunky rounded collectible robot boots with glowing cyan sole treads
 */

class CodexCharacter extends CharacterBase {
  constructor() {
    super('CODEX', 0x38bdf8);
    this.primaryBlue = 0x0284c7;
    this.lightCyan = 0x69e8f2;
    this.accentPink = 0xf472b6;

    this.tablet = null;
    this.tabletScanLine = null;
    this.chestReactor = null;
    this.reactorLight = null;
    this.antennaLens = null;
    this.smileMesh = null;

    this.buildChibi();
  }

  buildChibi() {
    // 1. Premium Materials Palette (PBR Figurine Quality)
    const helmetMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.55,
      roughness: 0.22
    });

    const faceWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.08,
      roughness: 0.32
    });

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      metalness: 0.45,
      roughness: 0.28
    });

    const navyAccentMat = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      metalness: 0.65,
      roughness: 0.25
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.92,
      roughness: 0.15
    });

    const jointMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.75,
      roughness: 0.3
    });

    this.cyanGlowMat = new THREE.MeshStandardMaterial({
      color: 0x69e8f2,
      emissive: 0x0284c7,
      emissiveIntensity: 1.1,
      roughness: 0.15
    });

    const reactorMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.2,
      roughness: 0.1
    });

    const pinkTrimMat = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.35,
      metalness: 0.2
    });

    // 2. Head & Helmet Assembly (headGroup at y = 1.05)
    // Outer Armored Helmet Dome (Sky Blue)
    const helmetGeo = new THREE.SphereGeometry(0.74, 36, 32);
    helmetGeo.scale(1.0, 0.96, 1.0);
    this.headMesh = new THREE.Mesh(helmetGeo, helmetMat);
    this.headGroup.add(this.headMesh);

    // Inner Porcelain White Faceplate (Contrasting Vinyl Mask)
    const faceGeo = new THREE.SphereGeometry(0.71, 32, 24, 0, Math.PI * 2, 0, Math.PI / 1.7);
    faceGeo.scale(0.96, 0.94, 0.98);
    const faceMask = new THREE.Mesh(faceGeo, faceWhiteMat);
    faceMask.position.set(0, -0.04, 0.06);
    this.headGroup.add(faceMask);

    // Visor Brow Trim (Chrome & Navy Accent Line)
    const visorRimGeo = new THREE.TorusGeometry(0.72, 0.022, 12, 36, Math.PI * 0.9);
    const visorRim = new THREE.Mesh(visorRimGeo, navyAccentMat);
    visorRim.position.set(0, 0.22, 0.15);
    visorRim.rotation.x = Math.PI / 2.3;
    visorRim.rotation.z = Math.PI * 0.05;
    this.headGroup.add(visorRim);

    // Forehead Cyber Code Glyph (Hexagonal Core with < / > Tech Symbol)
    const glyphBase = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.02, 6), navyAccentMat);
    glyphBase.position.set(0, 0.32, 0.69);
    glyphBase.rotation.x = Math.PI / 2.5;
    const glyphCore = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.03, 6), this.cyanGlowMat);
    glyphCore.position.set(0, 0.32, 0.70);
    glyphCore.rotation.x = Math.PI / 2.5;
    this.headGroup.add(glyphBase, glyphCore);

    // Aerodynamic Cyber Antenna Fins (Left & Right)
    const finGeo = new THREE.BoxGeometry(0.04, 0.28, 0.12);
    const finStripeGeo = new THREE.BoxGeometry(0.045, 0.20, 0.02);

    const leftFin = new THREE.Mesh(finGeo, helmetMat);
    leftFin.position.set(-0.52, 0.62, -0.05);
    leftFin.rotation.z = -0.35;
    leftFin.rotation.y = 0.2;
    const leftFinStripe = new THREE.Mesh(finStripeGeo, this.cyanGlowMat);
    leftFinStripe.position.set(-0.52, 0.62, -0.02);
    leftFinStripe.rotation.z = -0.35;

    const rightFin = new THREE.Mesh(finGeo, helmetMat);
    rightFin.position.set(0.52, 0.62, -0.05);
    rightFin.rotation.z = 0.35;
    rightFin.rotation.y = -0.2;
    const rightFinStripe = new THREE.Mesh(finStripeGeo, this.cyanGlowMat);
    rightFinStripe.position.set(0.52, 0.62, -0.02);
    rightFinStripe.rotation.z = 0.35;

    this.headGroup.add(leftFin, leftFinStripe, rightFin, rightFinStripe);

    // Top Center Periscope Antenna
    const stalkGeo = new THREE.CylinderGeometry(0.035, 0.045, 0.22, 16);
    const stalk = new THREE.Mesh(stalkGeo, chromeMat);
    stalk.position.set(0, 0.78, 0);
    this.headGroup.add(stalk);

    const pinkRing = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.018, 12, 24), pinkTrimMat);
    pinkRing.position.set(0, 0.84, 0);
    pinkRing.rotation.x = Math.PI / 2;
    this.headGroup.add(pinkRing);

    this.antennaLens = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 16), this.cyanGlowMat);
    this.antennaLens.position.set(0, 0.90, 0);
    this.headGroup.add(this.antennaLens);

    // Circular Mechanical Headphone Ears (Navy Outer + Chrome Bolt + Cyan Ring)
    const earCupGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.12, 28);
    earCupGeo.rotateZ(Math.PI / 2);
    const earRingGeo = new THREE.TorusGeometry(0.18, 0.018, 12, 28);
    earRingGeo.rotateY(Math.PI / 2);
    const earBoltGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.16, 24);
    earBoltGeo.rotateZ(Math.PI / 2);

    const leftEar = new THREE.Mesh(earCupGeo, navyAccentMat);
    leftEar.position.set(-0.73, 0.02, 0);
    const leftRing = new THREE.Mesh(earRingGeo, this.cyanGlowMat);
    leftRing.position.set(-0.75, 0.02, 0);
    const leftBolt = new THREE.Mesh(earBoltGeo, chromeMat);
    leftBolt.position.set(-0.76, 0.02, 0);
    this.headGroup.add(leftEar, leftRing, leftBolt);

    const rightEar = new THREE.Mesh(earCupGeo, navyAccentMat);
    rightEar.position.set(0.73, 0.02, 0);
    const rightRing = new THREE.Mesh(earRingGeo, this.cyanGlowMat);
    rightRing.position.set(0.75, 0.02, 0);
    const rightBolt = new THREE.Mesh(earBoltGeo, chromeMat);
    rightBolt.position.set(0.76, 0.02, 0);
    this.headGroup.add(rightEar, rightRing, rightBolt);

    // 3. Expressive 3D Anime Chibi Eyes (Curved Glossy Lenses)
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const irisMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const irisCyanMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x070b14 });
    const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const lashMat = new THREE.MeshBasicMaterial({ color: 0x0369a1 });

    const createEye = (isRight) => {
      const eyeGroup = new THREE.Group();
      const xOffset = isRight ? 0.24 : -0.24;

      // Curved Eyelid Frame (Upper Lash Arc)
      const lashGeo = new THREE.TorusGeometry(0.17, 0.022, 12, 24, Math.PI * 0.7);
      const lash = new THREE.Mesh(lashGeo, lashMat);
      lash.position.set(0, 0.06, 0.015);
      lash.rotation.z = isRight ? -Math.PI * 0.15 : Math.PI * 0.45;
      eyeGroup.add(lash);

      // Sclera Disc
      const sclera = new THREE.Mesh(new THREE.CircleGeometry(0.16, 28), eyeWhiteMat);
      sclera.position.set(0, 0, 0);
      eyeGroup.add(sclera);

      // Outer Iris (Deep Sapphire)
      const iris = new THREE.Mesh(new THREE.CircleGeometry(0.125, 24), irisMat);
      iris.position.set(0, -0.01, 0.003);
      eyeGroup.add(iris);

      // Inner Iris (Vibrant Cyan Ring)
      const irisInner = new THREE.Mesh(new THREE.CircleGeometry(0.09, 24), irisCyanMat);
      irisInner.position.set(0, -0.015, 0.005);
      eyeGroup.add(irisInner);

      // Deep Pupil
      const pupil = new THREE.Mesh(new THREE.CircleGeometry(0.065, 24), pupilMat);
      pupil.position.set(0, -0.01, 0.007);
      eyeGroup.add(pupil);

      // Primary Anime Catchlight (Top-Right Big Starburst Oval)
      const spec1 = new THREE.Mesh(new THREE.CircleGeometry(0.038, 16), catchlightMat);
      spec1.position.set(0.038, 0.038, 0.009);
      spec1.scale.set(1.1, 0.9, 1);
      eyeGroup.add(spec1);

      // Secondary Catchlight (Bottom-Left Soft Circle)
      const spec2 = new THREE.Mesh(new THREE.CircleGeometry(0.018, 14), catchlightMat);
      spec2.position.set(-0.032, -0.042, 0.009);
      eyeGroup.add(spec2);

      // Tiny Diamond Sparkle
      const spec3 = new THREE.Mesh(new THREE.CircleGeometry(0.010, 8), catchlightMat);
      spec3.position.set(0.048, -0.018, 0.009);
      eyeGroup.add(spec3);

      eyeGroup.position.set(xOffset, 0.06, 0.70);
      return { group: eyeGroup, pupil: pupil, iris: iris };
    };

    const eyeL = createEye(false);
    const eyeR = createEye(true);
    this.leftEye = eyeL.group;
    this.rightEye = eyeR.group;
    this.leftPupil = eyeL.pupil;
    this.rightPupil = eyeR.pupil;
    this.headGroup.add(this.leftEye, this.rightEye);

    // Cheeks Blush Pads (Soft Oval Gradient Appearance)
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xf472b6, transparent: true, opacity: 0.45 });
    const blushL = new THREE.Mesh(new THREE.CircleGeometry(0.075, 18), blushMat);
    blushL.position.set(-0.35, -0.12, 0.68);
    blushL.scale.set(1.3, 0.8, 1);
    const blushR = new THREE.Mesh(new THREE.CircleGeometry(0.075, 18), blushMat);
    blushR.position.set(0.35, -0.12, 0.68);
    blushR.scale.set(1.3, 0.8, 1);
    this.headGroup.add(blushL, blushR);

    // Cute Expressive Cyan Smile Arc (Replaces blocky buck-tooth rectangle)
    const smileGroup = new THREE.Group();
    const smileBacking = new THREE.Mesh(
      new THREE.TorusGeometry(0.11, 0.022, 12, 24, Math.PI * 0.75),
      navyAccentMat
    );
    smileBacking.position.set(0, -0.18, 0.69);
    smileBacking.rotation.z = Math.PI * 1.125;

    this.smileMesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.10, 0.016, 12, 24, Math.PI * 0.75),
      this.cyanGlowMat
    );
    this.smileMesh.position.set(0, -0.18, 0.70);
    this.smileMesh.rotation.z = Math.PI * 1.125;

    smileGroup.add(smileBacking, this.smileMesh);
    this.mouth = smileGroup;
    this.headGroup.add(smileGroup);

    // 4. Torso & Armor Assembly (bodyGroup at y = 0.45)
    // Plump Rounded Torso (Sky-Blue Capsule with Porcelain Chest Inset)
    const torsoGeo = new THREE.CylinderGeometry(0.36, 0.42, 0.52, 28);
    this.torsoMesh = new THREE.Mesh(torsoGeo, bodyMat);
    this.bodyGroup.add(this.torsoMesh);

    // White Chest Armor Plate
    const armorPlateGeo = new THREE.CylinderGeometry(0.34, 0.38, 0.36, 20, 1, false, 0, Math.PI);
    const armorPlate = new THREE.Mesh(armorPlateGeo, faceWhiteMat);
    armorPlate.position.set(0, 0.03, 0.05);
    armorPlate.rotation.y = -Math.PI / 2;
    this.bodyGroup.add(armorPlate);

    // Neck Collar Ring (Chrome & Navy)
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.035, 16, 32), chromeMat);
    collar.position.set(0, 0.27, 0);
    collar.rotation.x = Math.PI / 2;
    this.bodyGroup.add(collar);

    // Illuminated Arc Reactor (Chrome Bezel + Cyan Core + PointLight)
    const reactorHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 24), chromeMat);
    reactorHousing.position.set(0, 0.08, 0.39);
    reactorHousing.rotation.x = Math.PI / 2;

    this.chestReactor = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.05, 24), reactorMat);
    this.chestReactor.position.set(0, 0.08, 0.40);
    this.chestReactor.rotation.x = Math.PI / 2;
    this.bodyGroup.add(reactorHousing, this.chestReactor);

    // Tiny Utility Belt with Chrome Cyber Pods
    const belt = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.022, 12, 32), navyAccentMat);
    belt.position.set(0, -0.22, 0);
    belt.rotation.x = Math.PI / 2;
    this.bodyGroup.add(belt);

    [-0.2, 0, 0.2].forEach(x => {
      const pod = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.06, 12), chromeMat);
      pod.position.set(x, -0.22, 0.42);
      this.bodyGroup.add(pod);
    });

    // 5. Articulated Rounded Arms
    const armGeo = new THREE.CylinderGeometry(0.075, 0.07, 0.28, 18);
    const shoulderGeo = new THREE.SphereGeometry(0.115, 18, 18);
    const handGeo = new THREE.SphereGeometry(0.085, 18, 18);

    // Right Arm (Friendly Waving & Gesturing Arm)
    const rightShoulder = new THREE.Mesh(shoulderGeo, navyAccentMat);
    const rightArm = new THREE.Mesh(armGeo, helmetMat);
    rightArm.position.set(0, -0.16, 0);
    const rightWrist = new THREE.Mesh(new THREE.SphereGeometry(0.065, 14, 14), chromeMat);
    rightWrist.position.set(0, -0.30, 0);
    const rightHand = new THREE.Mesh(handGeo, faceWhiteMat);
    rightHand.position.set(0, -0.36, 0);
    this.rightArmGroup.add(rightShoulder, rightArm, rightWrist, rightHand);

    // Left Arm (Holding Translucent Holographic Datapad)
    const leftShoulder = new THREE.Mesh(shoulderGeo, navyAccentMat);
    const leftArm = new THREE.Mesh(armGeo, helmetMat);
    leftArm.position.set(0, -0.16, 0);
    const leftWrist = new THREE.Mesh(new THREE.SphereGeometry(0.065, 14, 14), chromeMat);
    leftWrist.position.set(0, -0.30, 0);
    const leftHand = new THREE.Mesh(handGeo, faceWhiteMat);
    leftHand.position.set(0, -0.36, 0);
    this.leftArmGroup.add(leftShoulder, leftArm, leftWrist, leftHand);

    // Futuristic Holographic Glass Datapad
    this.tablet = new THREE.Group();
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.75
    });
    const tabletBorder = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.40, 0.02), chromeMat);
    const tabletScreen = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.37, 0.025), glassMat);
    tabletScreen.position.z = 0.005;
    this.tablet.add(tabletBorder, tabletScreen);

    // Glowing Code Lines on Datapad
    [-0.10, -0.04, 0.02, 0.08, 0.14].forEach((yPos, i) => {
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(0.14 + (i % 2) * 0.06, 0.014, 0.03),
        this.cyanGlowMat
      );
      line.position.set(-0.02, yPos, 0.012);
      this.tablet.add(line);
    });

    this.tablet.position.set(0.04, -0.32, 0.16);
    this.tablet.rotation.set(-0.25, 0.2, 0.1);
    this.leftArmGroup.add(this.tablet);

    // 6. Chunky Collectible Robotic Sneakers
    const legGeo = new THREE.CylinderGeometry(0.075, 0.085, 0.20, 16);
    const bootGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.14, 20);
    bootGeo.scale(0.9, 1.0, 1.3);
    const soleGeo = new THREE.CylinderGeometry(0.13, 0.15, 0.04, 20);
    soleGeo.scale(0.9, 1.0, 1.3);

    const createLeg = (isRight) => {
      const legGroup = isRight ? this.rightLegGroup : this.leftLegGroup;
      const legMesh = new THREE.Mesh(legGeo, jointMat);
      legMesh.position.set(0, -0.10, 0);

      const boot = new THREE.Mesh(bootGeo, helmetMat);
      boot.position.set(0, -0.22, 0.04);

      const toeCap = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 14), faceWhiteMat);
      toeCap.position.set(0, -0.22, 0.14);
      toeCap.scale.set(1.0, 0.7, 1.1);

      const sole = new THREE.Mesh(soleGeo, navyAccentMat);
      sole.position.set(0, -0.30, 0.04);

      const treadGlow = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.014, 12, 24), this.cyanGlowMat);
      treadGlow.position.set(0, -0.29, 0.04);
      treadGlow.rotation.x = Math.PI / 2;

      legGroup.add(legMesh, boot, toeCap, sole, treadGlow);
    };
    createLeg(false);
    createLeg(true);

    // 7. Ambient Data Sparkles
    const sparkleCount = 24;
    const sparkleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 2.4;
      positions[i + 1] = Math.random() * 2.2 - 0.4;
      positions[i + 2] = (Math.random() - 0.5) * 2.2;
    }
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const sparkleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.8
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
      const px = this.smoothedPointer.x * 0.035;
      const py = this.smoothedPointer.y * 0.025;
      if (this.leftPupil && this.rightPupil) {
        this.leftPupil.position.x = px;
        this.leftPupil.position.y = -0.01 + py;
        this.rightPupil.position.x = px;
        this.rightPupil.position.y = -0.01 + py;
      }
    }

    // 2. Animated Smile Arc Pulsing with Speech
    if (this.smileMesh && this.cyanGlowMat) {
      if (this.state === 'speaking') {
        const pulse = 0.9 + this.speechIntensity * 0.6;
        this.cyanGlowMat.emissiveIntensity = pulse;
        this.smileMesh.scale.x = 1.0 + this.speechIntensity * 0.25;
        this.smileMesh.scale.y = 1.0 + this.speechIntensity * 0.3;
      } else {
        this.cyanGlowMat.emissiveIntensity = 1.0;
        this.smileMesh.scale.set(1, 1, 1);
      }
    }

    // 3. State-Specific Arm & Limb Choreography
    if (!this.reducedMotion) {
      if (this.state === 'thinking') {
        // Signature Pose: Codex raises right hand toward chin to ponder
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.38, 0.72, 0.42), 0.1);
        this.rightArmGroup.rotation.x = -1.2;
        this.rightArmGroup.rotation.z = -0.45;

        // Left arm cradles datapad
        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.48, 0.60, 0.18), 0.1);
        this.leftArmGroup.rotation.x = -0.25;
      } else if (this.state === 'speaking') {
        // Speech cadence: Head bobs, right hand gestures, datapad tilts
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.58, 0.62, 0.22), 0.1);
        this.rightArmGroup.rotation.x = -0.35 + Math.sin(time * 6) * 0.22;
        this.rightArmGroup.rotation.z = 0.25;

        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.52, 0.62, 0.15), 0.1);
        this.leftArmGroup.rotation.x = -0.28 + Math.cos(time * 5) * 0.12;
      } else if (this.state === 'excited') {
        // Cheerful double wave
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.62, 0.85, 0.1), 0.15);
        this.rightArmGroup.rotation.z = 1.2 + Math.sin(time * 12) * 0.3;
        this.rightArmGroup.rotation.x = -0.2;

        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.62, 0.85, 0.1), 0.15);
        this.leftArmGroup.rotation.z = -1.2 - Math.sin(time * 12) * 0.3;
        this.leftArmGroup.rotation.x = -0.2;
      } else {
        // Idle: Friendly gentle breathing sway + subtle friendly right hand wave
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.55, 0.65, 0), 0.1);
        this.rightArmGroup.rotation.x = Math.sin(time * 1.8) * 0.08;
        this.rightArmGroup.rotation.z = 0.15 + Math.sin(time * 2.5) * 0.06;

        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.55, 0.65, 0), 0.1);
        this.leftArmGroup.rotation.x = -0.2 + Math.cos(time * 1.8) * 0.05;
        this.leftArmGroup.rotation.z = -0.1;
      }
    }

    // 4. Chest Reactor & Antenna Pulse
    if (this.chestReactor) {
      const pulseSpeed = this.state === 'thinking' ? 4.5 : 2.2;
      const s = 1.0 + Math.sin(time * pulseSpeed) * 0.07;
      this.chestReactor.scale.set(s, s, s);
    }

    if (this.antennaLens) {
      const s = 1.0 + Math.sin(time * 3.0) * 0.08;
      this.antennaLens.scale.set(s, s, s);
    }

    // 5. Sparkle Particles Drift
    if (this.sparkles && !this.reducedMotion) {
      this.sparkles.rotation.y += delta * 0.2;
    }
  }
}

// Backwards compatibility aliases
window.CodexCharacter = CodexCharacter;
window.CodeCharacter = CodexCharacter;
