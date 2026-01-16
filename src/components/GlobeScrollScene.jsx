import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const MIN_SCALE = 0.02;
const MAX_SCALE = 1.0;
const ROTATION_SPEED = 0.003;
const SCALE_SMOOTHING = 0.08;

// WebGL context options
const CONTEXT_OPTIONS = {
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance',
  failIfMajorPerformanceCaveat: false,
  preserveDrawingBuffer: false,
};

/**
 * Attempts to create a WebGL context with fallback from WebGL2 to WebGL1
 */
function createWebGLContext(canvas) {
  let context = null;
  let contextType = null;

  // Try WebGL2 first
  try {
    context = canvas.getContext('webgl2', CONTEXT_OPTIONS);
    if (context) {
      contextType = 'webgl2';
    }
  } catch (e) {
    console.warn('WebGL2 context creation failed:', e);
  }

  // Fallback to WebGL1
  if (!context) {
    try {
      context = canvas.getContext('webgl', CONTEXT_OPTIONS) ||
                canvas.getContext('experimental-webgl', CONTEXT_OPTIONS);
      if (context) {
        contextType = 'webgl';
      }
    } catch (e) {
      console.warn('WebGL1 context creation failed:', e);
    }
  }

  return { context, contextType };
}

/**
 * WebGL Fallback UI Component
 */
function WebGLFallback() {
  return (
    <div className="webgl-fallback">
      <div className="webgl-fallback__background" />
      <div className="webgl-fallback__content">
        <div className="webgl-fallback__icon">🌐</div>
        <h2 className="webgl-fallback__title">WebGL Unavailable</h2>
        <p className="webgl-fallback__message">
          Enable hardware acceleration or update GPU drivers to view the 3D globe.
        </p>
        <ul className="webgl-fallback__tips">
          <li>Check browser settings for hardware acceleration</li>
          <li>Update your graphics drivers</li>
          <li>Try a different browser (Chrome, Firefox, Edge)</li>
        </ul>
      </div>
    </div>
  );
}

export default function GlobeScrollScene() {
  const canvasRef = useRef(null);
  const hasInitializedRef = useRef(false);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const globeRef = useRef(null);
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);
  const targetScaleRef = useRef(MIN_SCALE);
  const currentScaleRef = useRef(MIN_SCALE);
  const scrollTriggerRef = useRef(null);
  const resizeHandlerRef = useRef(null);
  const gsapTickerCallbackRef = useRef(null);

  const [webglError, setWebglError] = useState(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    // Prevent duplicate initialization in StrictMode / hot reload
    if (hasInitializedRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Step 1: Try to create WebGL context safely (WebGL2 first, then WebGL1 fallback)
    const { context, contextType } = createWebGLContext(canvas);

    if (!context) {
      setIsWebGLSupported(false);
      setWebglError('Failed to create WebGL context. Hardware acceleration may be disabled.');
      return;
    }

    console.log(`WebGL context created: ${contextType}`);

    // Step 2: Create renderer with try/catch
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x0a0a0f, 1);
      rendererRef.current = renderer;
    } catch (error) {
      console.error('THREE.WebGLRenderer creation failed:', error);
      setIsWebGLSupported(false);
      setWebglError('Failed to initialize 3D renderer: ' + error.message);
      return;
    }

    // Mark as initialized AFTER successful renderer creation
    hasInitializedRef.current = true;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 4;
    cameraRef.current = camera;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0x4a90d9, 0.5);
    backLight.position.set(-5, -3, -5);
    scene.add(backLight);

    // Globe geometry and material
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.3,
      roughness: 0.7,
      emissive: 0x1e40af,
      emissiveIntensity: 0.1,
    });

    const globe = new THREE.Mesh(geometry, material);
    globe.scale.setScalar(MIN_SCALE);
    scene.add(globe);
    globeRef.current = globe;

    // Wireframe overlay
    const wireframeGeometry = new THREE.SphereGeometry(1.002, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    globe.add(wireframe);

    // Lenis smooth scroll setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Store the ticker callback for cleanup
    gsapTickerCallbackRef.current = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTickerCallbackRef.current);
    gsap.ticker.lagSmoothing(0);

    // ScrollTrigger for scale animation
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: scrollContainer,
        start: 'top top',
        end: '+=1800',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          targetScaleRef.current = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * progress;
        },
      });
    }

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    resizeHandlerRef.current = handleResize;
    window.addEventListener('resize', handleResize);

    // Animation loop - only ONE RAF loop
    let time = 0;
    const animate = () => {
      rafIdRef.current = requestAnimationFrame(animate);
      time += 0.016;

      if (globeRef.current) {
        // Smooth scale interpolation
        currentScaleRef.current += (targetScaleRef.current - currentScaleRef.current) * SCALE_SMOOTHING;
        globeRef.current.scale.setScalar(currentScaleRef.current);

        // Continuous rotation (always active)
        globeRef.current.rotation.y += ROTATION_SPEED;

        // Keep globe centered (no floating motion)
        globeRef.current.position.y = 0;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Cleanup function - VERY thorough
    return () => {
      // Step 1: Cancel animation frame FIRST
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      // Step 2: Remove resize listener
      if (resizeHandlerRef.current) {
        window.removeEventListener('resize', resizeHandlerRef.current);
        resizeHandlerRef.current = null;
      }

      // Step 3: Kill ScrollTrigger instances
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      // Step 4: Remove GSAP ticker callback
      if (gsapTickerCallbackRef.current) {
        gsap.ticker.remove(gsapTickerCallbackRef.current);
        gsapTickerCallbackRef.current = null;
      }

      // Step 5: Destroy Lenis
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      // Step 6: Dispose Three.js geometries and materials
      if (globeRef.current) {
        // Dispose wireframe children
        globeRef.current.children.forEach((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
        // Dispose globe itself
        if (globeRef.current.geometry) globeRef.current.geometry.dispose();
        if (globeRef.current.material) globeRef.current.material.dispose();
        globeRef.current = null;
      }

      // Step 7: Clear scene
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
        sceneRef.current.clear();
        sceneRef.current = null;
      }

      // Step 8: Dispose renderer thoroughly
      if (rendererRef.current) {
        rendererRef.current.renderLists.dispose();
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        
        // Clear canvas dimensions to release memory
        if (rendererRef.current.domElement) {
          rendererRef.current.domElement.width = 0;
          rendererRef.current.domElement.height = 0;
        }
        
        rendererRef.current = null;
      }

      // Step 9: Clear camera ref
      cameraRef.current = null;

      // Step 10: Reset initialization flag for potential remount
      hasInitializedRef.current = false;

      // Reset scale refs
      targetScaleRef.current = MIN_SCALE;
      currentScaleRef.current = MIN_SCALE;
    };
  }, []);

  // Show fallback UI if WebGL is not supported
  if (!isWebGLSupported || webglError) {
    return <WebGLFallback />;
  }

  return <canvas ref={canvasRef} className="globe-canvas" />;
}
