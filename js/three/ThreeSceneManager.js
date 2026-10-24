/**
 * JE. DIGITAL UNIVERSE — THREE.JS SCENE MANAGER
 * Manages the single shared WebGLRenderer, performance budgets,
 * responsive camera framing, and background rendering optimization.
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
    this.updateCallbacks = [];
    this.resizeCallbacks = [];

    this._boundOnResize = this.onResize.bind(this);
    this._boundOnVisibilityChange = this.onVisibilityChange.bind(this);
    this._boundRender = this.render.bind(this);
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
    const height = this.container.clientHeight || 500;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const isMobile = width < 768;
    this.camera.position.set(0, isMobile ? 0.35 : 0, isMobile ? 8.5 : 7.5);

    // 3. Clock
    this.clock = new THREE.Clock();

    // 4. Renderer
    try {
      this.renderer = new THREE.WebGLRenderer({
        alpha: this.options.alpha,
        antialias: this.options.antialias,
        powerPreference: this.options.powerPreference
      });
      const pixelRatio = Math.min(window.devicePixelRatio || 1, this.options.maxPixelRatio);
      this.renderer.setPixelRatio(pixelRatio);
      this.renderer.setSize(width, height);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.1;

      // Append canvas to container
      this.container.innerHTML = '';
      this.container.appendChild(this.renderer.domElement);
    } catch (err) {
      console.error('[ThreeSceneManager] Failed to create WebGL context:', err);
      return false;
    }

    // 5. Lighting Setup
    this.setupLighting();

    // 6. Listeners & Performance Optimizations
    window.addEventListener('resize', this._boundOnResize);
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
    // Ambient soft fill light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    // Key directional light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 6);
    this.scene.add(keyLight);

    // Colored rim/back light
    const rimLight = new THREE.DirectionalLight(0x69e8f2, 1.0);
    rimLight.position.set(-6, -4, -4);
    this.scene.add(rimLight);

    // Warm secondary rim light
    const warmRim = new THREE.DirectionalLight(0xe6a47c, 0.6);
    warmRim.position.set(6, -2, -3);
    this.scene.add(warmRim);
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    const isMobile = width < 768;
    if (isMobile) {
      this.camera.position.z = 8.5;
      this.camera.position.y = 0.35;
    } else {
      this.camera.position.z = 7.5;
      this.camera.position.y = 0.0;
    }
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.resizeCallbacks.forEach(cb => cb(width, height));
  }

  onVisibilityChange() {
    this.isTabVisible = !document.hidden;
    this.checkRenderState();
  }

  checkRenderState() {
    const shouldRender = this.isIntersecting && this.isTabVisible;
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
    if (this.isRendering) return;
    this.isRendering = true;
    this.clock.start();
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
    if (!this.isRendering) return;

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Call subscribers
    for (let i = 0; i < this.updateCallbacks.length; i++) {
      this.updateCallbacks[i](delta, elapsedTime);
    }

    this.renderer.render(this.scene, this.camera);
    this.rafId = requestAnimationFrame(this._boundRender);
  }

  dispose() {
    this.stop();
    window.removeEventListener('resize', this._boundOnResize);
    document.removeEventListener('visibilitychange', this._boundOnVisibilityChange);
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}

window.ThreeSceneManager = ThreeSceneManager;
