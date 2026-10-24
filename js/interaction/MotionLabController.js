/**
 * JE. DIGITAL UNIVERSE — DIGITAL MOTION LAB CONTROLLER
 * Drives the 3 tactile interaction physics experiments:
 * 1. Spatial 3D Depth Card
 * 2. Tactile Magnetic Button
 * 3. Kinetic Spatial Typography
 */

class MotionLabController {
  constructor() {
    this.isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.initExperiment1();
    this.initExperiment2();
    this.initExperiment3();
  }

  /* ------------------------------------------------------------------------
     Experiment 01: Spatial 3D Depth Card
     ------------------------------------------------------------------------ */
  initExperiment1() {
    const card = document.getElementById('exp1-tilt-card');
    const viewport = document.getElementById('exp1-viewport');
    if (!card || !viewport) return;

    const onMove = (e) => {
      if (this.isReducedMotion) return;
      const rect = card.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (clientX === undefined) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Range -1 to 1
      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      const rotX = -normY * 18;
      const rotY = normX * 22;

      card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.05, 1.05, 1.05)`;
      card.style.setProperty('--sheen-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--sheen-y', `${(y / rect.height) * 100}%`);
    };

    const onLeave = () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    viewport.addEventListener('mousemove', onMove);
    viewport.addEventListener('mouseleave', onLeave);
    viewport.addEventListener('touchmove', onMove, { passive: true });
    viewport.addEventListener('touchend', onLeave);

    const resetBtn = document.getElementById('exp1-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', onLeave);
    }
  }

  /* ------------------------------------------------------------------------
     Experiment 02: Tactile Magnetic Button
     ------------------------------------------------------------------------ */
  initExperiment2() {
    const btn = document.getElementById('exp2-magnetic-btn');
    const viewport = document.getElementById('exp2-viewport');
    const feedback = document.getElementById('exp2-feedback');
    if (!btn || !viewport) return;

    const magneticRadius = 90;

    const onMove = (e) => {
      if (this.isReducedMotion) return;
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (clientX === undefined) return;

      const dist = Math.hypot(clientX - btnCenterX, clientY - btnCenterY);

      if (dist < magneticRadius) {
        const pull = 0.35;
        const deltaX = (clientX - btnCenterX) * pull;
        const deltaY = (clientY - btnCenterY) * pull;
        btn.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.06)`;
        if (feedback) feedback.textContent = `Magnetic Flux: ${Math.round(dist)}px`;
      } else {
        btn.style.transform = 'translate(0px, 0px) scale(1)';
        if (feedback) feedback.textContent = 'Approach button to attract';
      }
    };

    const onLeave = () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
      if (feedback) feedback.textContent = 'Approach button to attract';
    };

    viewport.addEventListener('mousemove', onMove);
    viewport.addEventListener('mouseleave', onLeave);

    // Click Ripple & State
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const circle = document.createElement('span');
      circle.className = 'magnetic-ripple';
      const size = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${e.clientX - rect.left - size / 2}px`;
      circle.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(circle);

      setTimeout(() => circle.remove(), 600);

      if (feedback) {
        feedback.textContent = '⚡ Signal Transmitted to Council';
        setTimeout(() => {
          if (feedback.textContent === '⚡ Signal Transmitted to Council') {
            feedback.textContent = 'Approach button to attract';
          }
        }, 2200);
      }

      // If DialogueEngine exists, prompt a character reaction
      if (window.dialogueEngine) {
        window.dialogueEngine.speak({
          character: 'grok',
          text: "Sensors received your kinetic signal! Tactile feedback is how software comes alive."
        }, { addToDrawer: false });
      }
    });

    const resetBtn = document.getElementById('exp2-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', onLeave);
    }
  }

  /* ------------------------------------------------------------------------
     Experiment 03: Kinetic Spatial Typography
     ------------------------------------------------------------------------ */
  initExperiment3() {
    const textStage = document.getElementById('exp3-text-stage');
    if (!textStage) return;

    const sourceText = textStage.getAttribute('data-text') || "POSSIBILITY";
    textStage.innerHTML = '';

    const chars = [];
    for (let i = 0; i < sourceText.length; i++) {
      const charSpan = document.createElement('span');
      charSpan.className = 'kinetic-char';
      charSpan.textContent = sourceText[i];
      textStage.appendChild(charSpan);
      chars.push(charSpan);
    }

    textStage.addEventListener('mousemove', (e) => {
      if (this.isReducedMotion) return;
      const rect = textStage.getBoundingClientRect();
      const mouseX = e.clientX;

      chars.forEach(char => {
        const charRect = char.getBoundingClientRect();
        const charCenter = charRect.left + charRect.width / 2;
        const dist = Math.abs(mouseX - charCenter);

        if (dist < 100) {
          const power = 1 - (dist / 100);
          const offsetY = -power * 28;
          const rotateZ = (mouseX < charCenter ? 1 : -1) * power * 18;
          const scale = 1 + power * 0.35;
          char.style.transform = `translateY(${offsetY}px) rotateZ(${rotateZ}deg) scale(${scale})`;
          char.classList.add('active');
        } else {
          char.style.transform = 'translateY(0px) rotateZ(0deg) scale(1)';
          char.classList.remove('active');
        }
      });
    });

    const resetTypography = () => {
      chars.forEach(char => {
        char.style.transform = 'translateY(0px) rotateZ(0deg) scale(1)';
        char.classList.remove('active');
      });
    };

    textStage.addEventListener('mouseleave', resetTypography);

    const resetBtn = document.getElementById('exp3-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetTypography);
    }
  }
}

window.MotionLabController = MotionLabController;
