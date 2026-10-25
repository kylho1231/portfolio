/**
 * JE. CHIBI AI UNIVERSE — CLAUDE (CHARACTER 01 / WARM ORANGE CHIBI ROBOT)
 * Role: About Me Guide & Storyteller
 * Visual Reference: Rightmost warm orange/mustard aviator robot in reference artwork.
 * Features:
 * - Oversized smooth warm orange helmet head with white racing stripes
 * - Cyber aviator goggles with tinted lenses & warm amber eyes
 * - Cozy patterned winter scarf around the neck
 * - Mustard yellow puffy aviator jacket with blue collar and pockets
 * - Chunky rounded brown boots with beige soles
 * - Signature Prop: Cute takeaway cup with bent straw
 */

class ClaudeCharacter extends CharacterBase {
  constructor() {
    super('CLAUDE', 0xf97316);
    this.primaryOrange = 0xf97316;
    this.amberGold = 0xf59e0b;
    this.mustardJacket = 0xeab308;

    this.drinkCup = null;
    this.goggles = null;

    this.buildChibi();
  }

  buildChibi() {
    // 1. Materials Palette
    const helmetMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      metalness: 0.45,
      roughness: 0.3
    });

    const jacketMat = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      metalness: 0.2,
      roughness: 0.5
    });

    const navyAccentMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      metalness: 0.3,
      roughness: 0.4
    });

    const scarfMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.8
    });

    const pantsMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.6
    });

    const bootMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.45,
      metalness: 0.2
    });

    const soleMat = new THREE.MeshStandardMaterial({
      color: 0xd6d3d1,
      roughness: 0.5
    });

    const goggleFrameMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.7,
      roughness: 0.2
    });

    const goggleLensMat = new THREE.MeshStandardMaterial({
      color: 0x581c87,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
      metalness: 0.8
    });

    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const irisMat = new THREE.MeshBasicMaterial({ color: 0xd97706 });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // 2. Head & Helmet Assembly (headGroup at y = 1.05)
    const headGeo = new THREE.SphereGeometry(0.70, 32, 32);
    headGeo.scale(1.0, 0.94, 0.98);
    this.headMesh = new THREE.Mesh(headGeo, helmetMat);
    this.headGroup.add(this.headMesh);

    // White Racing Stripe across side
    const stripeGeo = new THREE.TorusGeometry(0.70, 0.02, 12, 32, Math.PI);
    const stripe = new THREE.Mesh(stripeGeo, new THREE.MeshBasicMaterial({ color: 0xf8fafc }));
    stripe.position.set(0, 0, 0);
    stripe.rotation.x = Math.PI / 2;
    stripe.rotation.y = 0.2;
    this.headGroup.add(stripe);

    // Circular Ear Headset
    const earGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 24);
    earGeo.rotateZ(Math.PI / 2);
    const earRingGeo = new THREE.TorusGeometry(0.18, 0.025, 12, 24);
    earRingGeo.rotateY(Math.PI / 2);

    const leftEar = new THREE.Mesh(earGeo, navyAccentMat);
    leftEar.position.set(-0.70, 0, 0);
    const leftEarRing = new THREE.Mesh(earRingGeo, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    leftEarRing.position.set(-0.74, 0, 0);
    this.headGroup.add(leftEar, leftEarRing);

    const rightEar = new THREE.Mesh(earGeo, navyAccentMat);
    rightEar.position.set(0.70, 0, 0);
    const rightEarRing = new THREE.Mesh(earRingGeo, new THREE.MeshBasicMaterial({ color: 0xf472b6 }));
    rightEarRing.position.set(0.74, 0, 0);
    this.headGroup.add(rightEar, rightEarRing);

    // Cyber Aviator Goggles
    this.goggles = new THREE.Group();
    const goggleBridge = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 0.04), goggleFrameMat);
    goggleBridge.position.set(0, 0.08, 0.68);
    this.goggles.add(goggleBridge);

    [-0.24, 0.24].forEach(xOff => {
      const frame = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 0.08, 20), goggleFrameMat);
      frame.rotateX(Math.PI / 2);
      frame.position.set(xOff, 0.08, 0.67);

      const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.09, 20), goggleLensMat);
      lens.rotateX(Math.PI / 2);
      lens.position.set(xOff, 0.08, 0.68);

      this.goggles.add(frame, lens);
    });
    this.headGroup.add(this.goggles);

    // Expressive Eyes behind goggles
    const createEye = (isRight) => {
      const eyeGroup = new THREE.Group();
      const xOffset = isRight ? 0.24 : -0.24;

      const sclera = new THREE.Mesh(new THREE.CircleGeometry(0.16, 24), eyeWhiteMat);
      const iris = new THREE.Mesh(new THREE.CircleGeometry(0.12, 24), irisMat);
      iris.position.set(0, -0.01, 0.002);
      const pupil = new THREE.Mesh(new THREE.CircleGeometry(0.08, 24), pupilMat);
      pupil.position.set(0, -0.01, 0.004);

      const spec1 = new THREE.Mesh(new THREE.CircleGeometry(0.036, 16), catchlightMat);
      spec1.position.set(0.04, 0.04, 0.006);
      const spec2 = new THREE.Mesh(new THREE.CircleGeometry(0.016, 16), catchlightMat);
      spec2.position.set(-0.03, -0.04, 0.006);

      eyeGroup.add(sclera, iris, pupil, spec1, spec2);
      eyeGroup.position.set(xOffset, 0.08, 0.66);
      return { group: eyeGroup, pupil: pupil };
    };

    const eyeL = createEye(false);
    const eyeR = createEye(true);
    this.leftEye = eyeL.group;
    this.rightEye = eyeR.group;
    this.leftPupil = eyeL.pupil;
    this.rightPupil = eyeR.pupil;
    this.headGroup.add(this.leftEye, this.rightEye);

    // Cheeks Peach Blush
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xfb923c, transparent: true, opacity: 0.5 });
    const blushL = new THREE.Mesh(new THREE.CircleGeometry(0.065, 16), blushMat);
    blushL.position.set(-0.34, -0.10, 0.66);
    const blushR = new THREE.Mesh(new THREE.CircleGeometry(0.065, 16), blushMat);
    blushR.position.set(0.34, -0.10, 0.66);
    this.headGroup.add(blushL, blushR);

    // Cheerful Smiling Mouth
    const mouthGeo = new THREE.TorusGeometry(0.07, 0.018, 12, 20, Math.PI);
    this.mouth = new THREE.Mesh(mouthGeo, new THREE.MeshBasicMaterial({ color: 0x7c2d12 }));
    this.mouth.position.set(0, -0.20, 0.67);
    this.mouth.rotation.z = Math.PI;
    this.headGroup.add(this.mouth);

    // 3. Torso, Scarf & Puffy Aviator Jacket (bodyGroup at y = 0.45)
    // Cozy Knitted Scarf
    const scarfGeo = new THREE.TorusGeometry(0.38, 0.10, 16, 32);
    const scarf = new THREE.Mesh(scarfGeo, scarfMat);
    scarf.position.set(0, 0.28, 0);
    scarf.rotation.x = Math.PI / 2.2;
    this.bodyGroup.add(scarf);

    // Scarf tail hanging down
    const scarfTail = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.28, 0.06), scarfMat);
    scarfTail.position.set(-0.16, 0.12, 0.38);
    scarfTail.rotation.z = 0.15;
    this.bodyGroup.add(scarfTail);

    // Puffy Aviator Jacket
    const jacketGeo = new THREE.CylinderGeometry(0.40, 0.45, 0.52, 24);
    const jacket = new THREE.Mesh(jacketGeo, jacketMat);
    this.bodyGroup.add(jacket);

    // Blue Jacket Trim & Pockets
    const pocketL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.02), navyAccentMat);
    pocketL.position.set(-0.20, -0.06, 0.42);
    const pocketR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.02), navyAccentMat);
    pocketR.position.set(0.20, -0.06, 0.42);
    this.bodyGroup.add(pocketL, pocketR);

    // 4. Arms & Signature Takeaway Drink Cup (leftArmGroup & rightArmGroup)
    const armGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.30, 16);
    const handGeo = new THREE.SphereGeometry(0.085, 16, 16);

    // Left Arm (Holding Drink Cup!)
    const leftArm = new THREE.Mesh(armGeo, jacketMat);
    leftArm.position.set(0, -0.16, 0);
    const leftHand = new THREE.Mesh(handGeo, helmetMat);
    leftHand.position.set(0, -0.32, 0);
    this.leftArmGroup.add(leftArm, leftHand);

    // Takeaway Coffee/Boba Cup
    this.drinkCup = new THREE.Group();
    const cupMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
    const lidMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 });
    const strawMat = new THREE.MeshBasicMaterial({ color: 0xf472b6 });

    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.06, 0.22, 16), cupMat);
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.04, 16), lidMat);
    lid.position.y = 0.12;

    const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.18, 8), strawMat);
    straw.position.set(0.03, 0.20, 0);
    straw.rotation.z = -0.25;

    this.drinkCup.add(cup, lid, straw);
    this.drinkCup.position.set(0, -0.30, 0.16);
    this.leftArmGroup.add(this.drinkCup);

    // Right Arm (Friendly Waving Arm)
    const rightArm = new THREE.Mesh(armGeo, jacketMat);
    rightArm.position.set(0, -0.16, 0);
    const rightHand = new THREE.Mesh(handGeo, helmetMat);
    rightHand.position.set(0, -0.32, 0);
    this.rightArmGroup.add(rightArm, rightHand);

    // 5. Legs & Rounded Brown Boots
    const legGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.22, 16);
    const bootGeo = new THREE.BoxGeometry(0.24, 0.16, 0.36);
    const soleGeo = new THREE.BoxGeometry(0.26, 0.05, 0.38);

    const createLeg = (isRight) => {
      const legGroup = isRight ? this.rightLegGroup : this.leftLegGroup;
      const leg = new THREE.Mesh(legGeo, pantsMat);
      leg.position.set(0, -0.11, 0);

      const boot = new THREE.Mesh(bootGeo, bootMat);
      boot.position.set(0, -0.22, 0.05);

      const sole = new THREE.Mesh(soleGeo, soleMat);
      sole.position.set(0, -0.30, 0.05);

      legGroup.add(leg, boot, sole);
    };
    createLeg(false);
    createLeg(true);
  }

  updateProcedural(delta, time) {
    // 1. Blinking & Pupil Tracking
    if (this.isBlinking) {
      this.leftEye.scale.y = 0.1;
      this.rightEye.scale.y = 0.1;
    } else {
      this.leftEye.scale.y = 1.0;
      this.rightEye.scale.y = 1.0;

      const px = this.smoothedPointer.x * 0.035;
      const py = this.smoothedPointer.y * 0.025;
      if (this.leftPupil && this.rightPupil) {
        this.leftPupil.position.x = px;
        this.leftPupil.position.y = -0.01 + py;
        this.rightPupil.position.x = px;
        this.rightPupil.position.y = -0.01 + py;
      }
    }

    // 2. State-Specific Kinematics
    if (!this.reducedMotion) {
      if (this.state === 'speaking') {
        // Conversational head nod & waving right arm
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.60, 0.80, 0.1), 0.1);
        this.rightArmGroup.rotation.z = 1.2 + Math.sin(time * 8) * 0.2;
        this.rightArmGroup.rotation.x = -0.2;

        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.52, 0.65, 0.1), 0.1);
        this.leftArmGroup.rotation.x = -0.2;
      } else if (this.state === 'excited') {
        // Celebratory bounce
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.65, 0.85, 0), 0.15);
        this.rightArmGroup.rotation.z = 1.4 + Math.sin(time * 12) * 0.2;

        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.65, 0.85, 0), 0.15);
        this.leftArmGroup.rotation.z = -1.4 - Math.sin(time * 12) * 0.2;
      } else {
        // Idle: Signature cute wave with right hand!
        this.rightArmGroup.position.lerp(new THREE.Vector3(0.58, 0.72, 0.05), 0.1);
        this.rightArmGroup.rotation.z = 0.8 + Math.sin(time * 2.5) * 0.15;
        this.rightArmGroup.rotation.x = -0.15;

        // Left arm holds cup steadily with gentle bob
        this.leftArmGroup.position.lerp(new THREE.Vector3(-0.54, 0.65, 0.05), 0.1);
        this.leftArmGroup.rotation.x = -0.2 + Math.sin(time * 1.5) * 0.05;
        this.leftArmGroup.rotation.z = -0.05;
      }
    }
  }
}

window.ClaudeCharacter = ClaudeCharacter;
