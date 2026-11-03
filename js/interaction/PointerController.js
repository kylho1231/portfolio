/**
 * JE. DIGITAL UNIVERSE — POINTER CONTROLLER
 * Tracks smoothed normalized pointer coordinates (-1 to 1)
 * across mouse and touch inputs for 3D gaze and card parallax.
 * Automatically returns to center resting position smoothly when inactive.
 */

class PointerController {
  constructor(targetElement = window) {
    this.target = targetElement;
    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.listeners = [];
    this.inactivityTimer = null;
    this.rafId = null;

    this._onPointerMove = this.onPointerMove.bind(this);
    this._onTouchMove = this.onTouchMove.bind(this);
    this._onPointerLeave = this.onPointerLeave.bind(this);
    this._onTouchEnd = this.onTouchEnd.bind(this);
    this._smoothStep = this.smoothStep.bind(this);

    this.bindEvents();
    this.startSmoothingLoop();
  }

  bindEvents() {
    window.addEventListener('mousemove', this._onPointerMove, { passive: true });
    window.addEventListener('touchmove', this._onTouchMove, { passive: true });
    window.addEventListener('mouseleave', this._onPointerLeave, { passive: true });
    window.addEventListener('touchend', this._onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', this._onTouchEnd, { passive: true });
  }

  startSmoothingLoop() {
    const update = () => {
      // Lerp current coordinates towards target resting or active position
      const lerpSpeed = 0.08;
      this.x += (this.targetX - this.x) * lerpSpeed;
      this.y += (this.targetY - this.y) * lerpSpeed;

      // Only notify if there is measurable change
      if (Math.abs(this.targetX - this.x) > 0.0005 || Math.abs(this.targetY - this.y) > 0.0005) {
        this.notify();
      }

      this.rafId = requestAnimationFrame(update);
    };
    this.rafId = requestAnimationFrame(update);
  }

  onPointerMove(e) {
    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;
    this.targetX = (e.clientX / width) * 2 - 1;
    this.targetY = -(e.clientY / height) * 2 + 1;
    this.resetInactivityTimer();
  }

  onTouchMove(e) {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      this.targetX = (touch.clientX / width) * 2 - 1;
      this.targetY = -(touch.clientY / height) * 2 + 1;
      this.resetInactivityTimer(1800);
    }
  }

  onPointerLeave() {
    // Gracefully ease back to resting center position
    this.targetX = 0;
    this.targetY = 0;
  }

  onTouchEnd() {
    // On touch release, gently return to resting position after brief pause
    this.resetInactivityTimer(600);
  }

  resetInactivityTimer(delayMs = 2800) {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      this.targetX = 0;
      this.targetY = 0;
    }, delayMs);
  }

  smoothStep() {
    // Handled in startSmoothingLoop
  }

  subscribe(callback) {
    this.listeners.push(callback);
    callback(this.x, this.y);
  }

  notify() {
    for (let i = 0; i < this.listeners.length; i++) {
      this.listeners[i](this.x, this.y);
    }
  }

  dispose() {
    window.removeEventListener('mousemove', this._onPointerMove);
    window.removeEventListener('touchmove', this._onTouchMove);
    window.removeEventListener('mouseleave', this._onPointerLeave);
    window.removeEventListener('touchend', this._onTouchEnd);
    window.removeEventListener('touchcancel', this._onTouchEnd);
    clearTimeout(this.inactivityTimer);
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.listeners = [];
  }
}

window.PointerController = PointerController;
