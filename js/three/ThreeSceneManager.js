/**
 * JE. DIGITAL UNIVERSE — THREE.JS SCENE MANAGER
 * Manages the single shared WebGLRenderer, performance budgets,
 * responsive camera framing, context loss handling, and background rendering optimization.
 */

class ThreeSceneManager {
  constructor(containerEl, options = {}) {
    this.container = containerEl;
    this.options = Object.assign({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      maxPixelRatio: 2.0,
      reducedMotion: false
    }, options);

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.rafId = null;
    this.clock = null;
    this.isRendering = false;
    this.isIntersecting = true;
    this.isTabVisible = true;
    this.isContextLost = false;
    this.updateCallbacks = [];
    this.resizeCallbacks = [];

    this._boundOnResize = this.onResize.bind(this);
    this._boundOnVisibilityChange = this.onVisibilityChange.bind(this);
    this._boundRender = this.render.bind(this);
    this._boundContextLost = this.onContextLost.bind(this);
    this._boundContextRestored = this.onContextRestored.bind(this);
  }

  static isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  init() {
    if (!ThreeSceneManager.isWebGLAvailable()) {
      console.warn('[ThreeSceneManager] WebGL not supported. Triggering Lite Mode.');
      return false;
    }

    if (!window.THREE) {
      console.error('[ThreeSceneManager] Three.js library not loaded.');
      return false;
    }

    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 480;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera (Framed with optical clearance for mascot & pedestal)
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const isMobile = width < 768;
    this.camera.position.set(0, isMobile ? 0.45 : 0.42, isMobile ? 8.0 : 6.8);
    this.camera.lookAt(0, 0.32, 0);

    // 3. Clock
    this.clock = new THREE.Clock();

    // 4. Renderer with capped pixel ratio
    try {
      this.renderer = new THREE.WebGLRenderer({
        alpha: this.options.alpha,
        antialias: this.options.antialias,
        powerPreference: this.options.powerPreference
      });
      const maxPR = isMobile ? 1.5 : (this.options.maxPixelRatio || 2.0);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, maxPR);
      this.renderer.setPixelRatio(pixelRatio);
      this.renderer.setSize(width, height);
      if (THREE.sRGBEncoding) this.renderer.outputEncoding = THREE.sRGBEncoding;
      if (THREE.ACESFilmicToneMapping) this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.02;

      // Handle WebGL context events gracefully
      const canvas = this.renderer.domElement;
      canvas.addEventListener('webglcontextlost', this._boundContextLost, false);
      canvas.addEventListener('webglcontextrestored', this._boundContextRestored, false);

      // Append canvas to container
      this.container.innerHTML = '';
      this.container.appendChild(canvas);
    } catch (err) {
      console.error('[ThreeSceneManager] Failed to create WebGL context:', err);
      return false;
    }

    // 5. Lighting Setup
    this.setupLighting();

    // 6. Listeners & Performance Optimizations
    window.addEventListener('resize', this._boundOnResize, { passive: true });
    document.addEventListener('visibilitychange', this._boundOnVisibilityChange);

    // IntersectionObserver to pause rendering when scrolled out of view
    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isIntersecting = entry.isIntersecting;
          this.checkRenderState();
        });
      }, { threshold: 0.05 });
      this.intersectionObserver.observe(this.container);
    }

    this.start();
    return true;
  }

  setupLighting() {
    // Ambient soft studio fill light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    // Key directional light - studio collectible illumination
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.15);
    keyLight.position.set(4, 7, 5);
    this.scene.add(keyLight);

    // Fill directional light from opposite angle
    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.55);
    fillLight.position.set(-4, 3, 4);
    this.scene.add(fillLight);

    // Colored rim/back light (Ice Cyan / Blue Accent)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.95);
    rimLight.position.set(-5, 4, -5);
    this.scene.add(rimLight);

    // Warm secondary rim light (Warm Amber / Gold)
    const warmRim = new THREE.DirectionalLight(0xfcd34d, 0.45);
    warmRim.position.set(5, 2, -4);
    this.scene.add(warmRim);
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    const isMobile = width < 768;
    if (isMobile) {
      this.camera.position.set(0, 0.45, 8.0);
    } else {
      this.camera.position.set(0, 0.42, 6.8);
    }
    this.camera.lookAt(0, 0.32, 0);
    this.camera.updateProjectionMatrix();

    const maxPR = isMobile ? 1.5 : (this.options.maxPixelRatio || 2.0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPR));
    this.renderer.setSize(width, height);
    this.resizeCallbacks.forEach(cb => cb(width, height));
  }

  onVisibilityChange() {
    this.isTabVisible = !document.hidden;
    this.checkRenderState();
  }

  onContextLost(event) {
    event.preventDefault();
    console.warn('[ThreeSceneManager] WebGL context lost. Pausing renderer.');
    this.isContextLost = true;
    this.stop();
    const stageContainer = document.getElementById('council-hero-stage');
    if (stageContainer) stageContainer.classList.add('lite-mode');
  }

  onContextRestored() {
    console.info('[ThreeSceneManager] WebGL context restored. Reinitializing scene.');
    this.isContextLost = false;
    const stageContainer = document.getElementById('council-hero-stage');
    if (stageContainer) stageContainer.classList.remove('lite-mode');
    this.init();
  }

  checkRenderState() {
    const shouldRender = this.isIntersecting && this.isTabVisible && !this.isContextLost;
    if (shouldRender && !this.isRendering) {
      this.start();
    } else if (!shouldRender && this.isRendering) {
      this.stop();
    }
  }

  onUpdate(callback) {
    this.updateCallbacks.push(callback);
  }

  start() {
    if (this.isRendering || this.isContextLost) return;
    this.isRendering = true;
    if (this.clock) this.clock.start();
    this.rafId = requestAnimationFrame(this._boundRender);
  }

  stop() {
    this.isRendering = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  render() {
    if (!this.isRendering || this.isContextLost) return;

    const delta = this.clock ? this.clock.getDelta() : 0.016;
    const elapsedTime = this.clock ? this.clock.getElapsedTime() : 0;

    // Call subscribers
    for (let i = 0; i < this.updateCallbacks.length; i++) {
      this.updateCallbacks[i](delta, elapsedTime);
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
    this.rafId = requestAnimationFrame(this._boundRender);
  }

  dispose() {
    this.stop();
    window.removeEventListener('resize', this._boundOnResize);
    document.removeEventListener('visibilitychange', this._boundOnVisibilityChange);
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.renderer && this.renderer.domElement) {
      const canvas = this.renderer.domElement;
      canvas.removeEventListener('webglcontextlost', this._boundContextLost);
      canvas.removeEventListener('webglcontextrestored', this._boundContextRestored);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      this.renderer.dispose();
    }
  }
}

window.ThreeSceneManager = ThreeSceneManager;
