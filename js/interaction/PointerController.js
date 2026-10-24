/**
 * JE. DIGITAL UNIVERSE — POINTER CONTROLLER
 * Tracks smoothed normalized pointer coordinates (-1 to 1)
 * across mouse and touch inputs for 3D gaze and card parallax.
 */

class PointerController {
  constructor(targetElement = window) {
    this.target = targetElement;
    this.x = 0;
    this.y = 0;
    this.listeners = [];

    this._onPointerMove = this.onPointerMove.bind(this);
    this._onTouchMove = this.onTouchMove.bind(this);

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('mousemove', this._onPointerMove, { passive: true });
    window.addEventListener('touchmove', this._onTouchMove, { passive: true });
  }

  onPointerMove(e) {
    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;
    this.x = (e.clientX / width) * 2 - 1;
    this.y = -(e.clientY / height) * 2 + 1;
    this.notify();
  }

  onTouchMove(e) {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      this.x = (touch.clientX / width) * 2 - 1;
      this.y = -(touch.clientY / height) * 2 + 1;
      this.notify();
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  notify() {
    for (let i = 0; i < this.listeners.length; i++) {
      this.listeners[i](this.x, this.y);
    }
  }

  dispose() {
    window.removeEventListener('mousemove', this._onPointerMove);
    window.removeEventListener('touchmove', this._onTouchMove);
    this.listeners = [];
  }
}

window.PointerController = PointerController;
