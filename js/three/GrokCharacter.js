/**
 * JE. CHIBI AI UNIVERSE — GROK (CHARACTER 04 / BLACK & WHITE CHIBI ROBOT)
 * Role: Motion Lab Host & Creative Project Promoter
 * Visual Reference: Second cute chibi robot in reference artwork with cyber goggles & chunky sneakers.
 * Features:
 * - Rounded white face with glossy black upper helmet & dark expressive eyebrows
 * - Oversized dual rectangular-rounded cyber goggles with enormous glossy eyes
 * - Chunky knit scarf & black-and-white futuristic jacket
 * - Striped leg socks & chunky stylish high-top sneakers with laces
 * - Signature Pose: Confident crossed arms with a slightly mischievous smile
 */

class GrokCharacter extends CharacterBase {
  constructor() {
    super('GROK', 0x9a83ff);
    this.primaryBlack = 0x0f172a;
    this.pureWhite = 0xf8fafc;
    this.chromeSilver = 0x94a3b8;
    this.cosmicViolet = 0x9a83ff;

    this.goggles = null;
    this.sparkles = null;

    this.buildChibi();
  }

  buildChibi() {
    // 1. Materials Palette
    const blackHelmetMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      metalness: 0.8,
      roughness: 0.2
    });

    const whiteFaceMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.15,
      roughness: 0.45
    });

    const jacketMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.5,
      roughness: 0.4
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.2
    });

    const violetGlowMat = new THREE.MeshStandardMaterial({
      color: 0x9a83ff,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });

    const scarfMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.8
    });

    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const irisMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
    const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // 2. Head & Helmet Assembly (headGroup at y = 1.05)
    // Rounded White Face Base
    const headGeo = new THREE.SphereGeometry(0.70, 32, 32);
    headGeo.scale(1.0, 0.95, 0.98);
    this.headMesh = new THREE.Mesh(headGeo, whiteFaceMat);
    this.headGroup.add(this.headMesh);

    // Glossy Black Upper Helmet / Beanie Cap
    const capGeo = new THREE.SphereGeometry(0.71, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.2);
    const helmetCap = new THREE.Mesh(capGeo, blackHelmetMat);
    helmetCap.position.set(0, 0.05, 0);
    this.headGroup.add(helmetCap);

    // Top Pompom / Antenna Node
    const topNode = new THREE.Mesh(new THREE.SphereGeometry(0.10, 16, 16), chromeMat);
    topNode.position.set(0, 0.76, 0);
    this.headGroup.add(topNode);

    // Angular Black Ear Fins with Chrome Headphone Caps
    const earFinGeo = new THREE.BoxGeometry(0.08, 0.32, 0.20);
    const leftEar = new THREE.Mesh(earFinGeo, blackHelmetMat);
    leftEar.position.set(-0.70, 0, 0);
    leftEar.rotation.z = 0.15;
    const rightEar = new THREE.Mesh(earFinGeo, blackHelmetMat);
    rightEar.position.set(0.70, 0, 0);
    rightEar.rotation.z = -0.15;

    const leftChrome = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 20), chromeMat);
    leftChrome.rotateZ(Math.PI / 2);
    leftChrome.position.set(-0.72, 0, 0);
    const rightChrome = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 20), chromeMat);
    rightChrome.rotateZ(Math.PI / 2);
    rightChrome.position.set(0.72, 0, 0);

    this.headGroup.add(leftEar, rightEar, leftChrome, rightChrome);

    // Oversized Dual Cyber Goggles (like Character 2 in artwork)
    this.goggles = new THREE.Group();
    const goggleBridge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.05), blackHelmetMat);
    goggleBridge.position.set(0, 0.08, 0.70);
    this.goggles.add(goggleBridge);

    [-0.25, 0.25].forEach(xOff => {
      // Rounded rectangular cyber frames
      const frameGeo = new THREE.BoxGeometry(0.38, 0.34, 0.06);
      const frame = new THREE.Mesh(frameGeo, chromeMat);
      frame.position.set(xOff, 0.08, 0.68);

      const lensGeo = new THREE.BoxGeometry(0.32, 0.28, 0.07);
      const lens = new THREE.Mesh(lensGeo, new THREE.MeshStandardMaterial({
        color: 0x1e1b4b,
        roughness: 0.1,
        metalness: 0.8,
        transparent: true,
        opacity: 0.55
      }));
      lens.position.set(xOff, 0.08, 0.69);

      this.goggles.add(frame, lens);
    });
    this.headGroup.add(this.goggles);

    // Enormous Expressive Eyes
    const createEye = (isRight) => {
      const eyeGroup = new THREE.Group();
      const xOffset = isRight ? 0.25 : -0.25;

      const sclera = new THREE.Mesh(new THREE.CircleGeometry(0.16, 24), eyeWhiteMat);
      const iris = new THREE.Mesh(new THREE.CircleGeometry(0.12, 24), irisMat);
      iris.position.set(0, -0.01, 0.002);
      const pupil = new THREE.Mesh(new THREE.CircleGeometry(0.08, 24), pupilMat);
      pupil.position.set(0, -0.01, 0.004);

      const spec1 = new THREE.Mesh(new THREE.CircleGeometry(0.038, 16), catchlightMat);
      spec1.position.set(0.04, 0.04, 0.006);
      const spec2 = new THREE.Mesh(new THREE.CircleGeometry(0.018, 16), catchlightMat);
      spec2.position.set(-0.03, -0.04, 0.006);

      eyeGroup.add(sclera, iris, pupil, spec1, spec2);
      eyeGroup.position.set(xOffset, 0.08, 0.67);
      return { group: eyeGroup, pupil: pupil };
    };

    const eyeL = createEye(false);
    const eyeR = createEye(true);
    this.leftEye = eyeL.group;
    this.rightEye = eyeR.group;
    this.leftPupil = eyeL.pupil;
    this.rightPupil = eyeR.pupil;
    this.headGroup.add(this.leftEye, this.rightEye);

    // Distinctive Dark Confident Eyebrows
    const browGeo = new THREE.BoxGeometry(0.24, 0.04, 0.03);
    this.leftBrow = new THREE.Mesh(browGeo, blackHelmetMat);
    this.leftBrow.position.set(-0.25, 0.28, 0.70);
    this.leftBrow.rotation.z = -0.12;

    this.rightBrow = new THREE.Mesh(browGeo, blackHelmetMat);
    this.rightBrow.position.set(0.25, 0.28, 0.70);
    this.rightBrow.rotation.z = 0.12;
    this.headGroup.add(this.leftBrow, this.rightBrow);

    // Confident Mischievous Smirk
    const mouthGeo = new THREE.TorusGeometry(0.06, 0.016, 12, 20, Math.PI);
    this.mouth = new THREE.Mesh(mouthGeo, new THREE.MeshBasicMaterial({ color: 0x0f172a }));
    this.mouth.position.set(0.02, -0.20, 0.67);
    this.mouth.rotation.z = Math.PI - 0.2; // Confident angled smirk!
    this.headGroup.add(this.mouth);

    // 3. Torso, Scarf & Mech Puffer Jacket (bodyGroup at y = 0.45)
    // Chunky Knit Scarf
    const scarfGeo = new THREE.TorusGeometry(0.38, 0.10, 16, 32);
    const scarf = new THREE.Mesh(scarfGeo, scarfMat);
    scarf.position.set(0, 0.28, 0);
    scarf.rotation.x = Math.PI / 2.2;
    this.bodyGroup.add(scarf);

    // Futuristic Puffer Jacket
    const jacketGeo = new THREE.CylinderGeometry(0.38, 0.44, 0.52, 24);
    const jacket = new THREE.Mesh(jacketGeo, jacketMat);
    this.bodyGroup.add(jacket);

    // Cosmic Orbit Forehead / Chest Emblem
    const emblem = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.015, 12, 24), violetGlowMat);
    emblem.position.set(0, 0.08, 0.41);
    emblem.rotation.x = Math.PI / 3;
    this.bodyGroup.add(emblem);

    // 4. Arms & Crossed-Arm Signature Pose (leftArmGroup & rightArmGroup)
    const armGeo = new THREE.CylinderGeometry(0.085, 0.08, 0.32, 16);
    const handGeo = new THREE.SphereGeometry(0.08, 16, 16);

    const leftArm = new THREE.Mesh(armGeo, jacketMat);
    leftArm.position.set(0, -0.16, 0);
    const leftHand = new THREE.Mesh(handGeo, chromeMat);
    leftHand.position.set(0, -0.32, 0);
    this.leftArmGroup.add(leftArm, leftHand);

    const rightArm = new THREE.Mesh(armGeo, jacketMat);
    rightArm.position.set(0, -0.16, 0);
    const rightHand = new THREE.Mesh(handGeo, chromeMat);
    rightHand.position.set(0, -0.32, 0);
    this.rightArmGroup.add(rightArm, rightHand);

    // 5. Legs, Striped Socks & Chunky Sneakers with Laces
    const legGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.22, 16);
    const bootGeo = new THREE.BoxGeometry(0.24, 0.18, 0.38);
    const soleGeo = new THREE.BoxGeometry(0.26, 0.06, 0.40);
    const laceGeo = new THREE.BoxGeometry(0.18, 0.025, 0.02);

    const createLeg = (isRight) => {
      const legGroup = isRight ? this.rightLegGroup : this.leftLegGroup;
      // Striped leg mesh
      const leg = new THREE.Mesh(legGeo, new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.5 }));
      leg.position.set(0, -0.11, 0);

      // Chunky Sneaker
      const boot = new THREE.Mesh(bootGeo, jacketMat);
      boot.position.set(0, -0.22, 0.06);

      const sole = new THREE.Mesh(soleGeo, new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
      sole.position.set(0, -0.30, 0.06);

      const lace1 = new THREE.Mesh(laceGeo, chromeMat);
      lace1.position.set(0, -0.16, 0.22);
      const lace2 = new THREE.Mesh(laceGeo, chromeMat);
      lace2.position.set(0, -0.22, 0.22);

      legGroup.add(leg, boot, sole, lace1, lace2);
    };
    createLeg(false);
    createLeg(true);

    // 6. Cosmic Sparkles (effectsGroup)
    const sparkCount = 24;
    const sparkGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 2.2;
      positions[i + 1] = Math.random() * 2.4 - 0.5;
      positions[i + 2] = (Math.random() - 0.5) * 2.0;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0x9a83ff,
      size: 0.055,
      transparent: true,
      opacity: 0.8
    });
    this.sparkles = new THREE.Points(sparkGeo, sparkMat);
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

    // 2. Eyebrow Expressions
    if (this.leftBrow && this.rightBrow) {
      if (this.state === 'thinking') {
        this.leftBrow.position.y = 0.30;
        this.rightBrow.position.y = 0.24;
        this.leftBrow.rotation.z = -0.22;
        this.rightBrow.rotation.z = 0.05;
      } else {
        this.leftBrow.position.y = 0.28;
        this.rightBrow.position.y = 0.28;
        this.leftBrow.rotation.z = -0.12;
        this.rightBrow.rotation.z = 0.12;
      }
    }

    // 3. State-Specific Kinematics (Signature Crossed-Arms Pose)
    if (!this.reducedMotion) {
      if (this.state === 'speaking') {
        // Confident gesturing with right arm
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.58, 0.65, 0.2), 0.1);
        this.rightArmGroup.rotation.x = -0.6 + Math.sin(time * 6) * 0.2;
        this.rightArmGroup.rotation.z = 0.3;

        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.42, 0.58, 0.25), 0.1);
        this.leftArmGroup.rotation.x = -0.5;
        this.leftArmGroup.rotation.z = 0.5;
      } else if (this.state === 'excited') {
        // High energy leap & spin
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.65, 0.85, 0.1), 0.15);
        this.rightArmGroup.rotation.z = 1.3 + Math.sin(time * 12) * 0.25;

        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.65, 0.85, 0.1), 0.15);
        this.leftArmGroup.rotation.z = -1.3 - Math.sin(time * 12) * 0.25;
      } else {
        // Idle: Signature Confident Crossed Arms Pose!
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.42, 0.58, 0.28), 0.1);
        this.rightArmGroup.rotation.x = -0.65 + Math.sin(time * 1.8) * 0.04;
        this.rightArmGroup.rotation.y = -0.4;
        this.rightArmGroup.rotation.z = -0.55;

        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.42, 0.54, 0.32), 0.1);
        this.leftArmGroup.rotation.x = -0.65 + Math.cos(time * 1.8) * 0.04;
        this.leftArmGroup.rotation.y = 0.4;
        this.leftArmGroup.rotation.z = 0.55;
      }
    }

    // 4. Sparkles Rotation
    if (this.sparkles && !this.reducedMotion) {
      this.sparkles.rotation.y += delta * 0.25;
    }
  }
}

window.GrokCharacter = GrokCharacter;
