import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * SmoothBackgroundTransition - Creates a smooth color transition background
 * that changes from dark space to light as user scrolls
 * Also includes a small Earth that stays visible during transition
 */
export default function SmoothBackgroundTransition({ children, startColor = '#080c14', endColor = '#F7FAFF' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const earthContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bgColor, setBgColor] = useState(startColor);

  // Parse hex color to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Interpolate between two colors
  const interpolateColor = (color1, color2, factor) => {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const r = Math.round(c1.r + (c2.r - c1.r) * factor);
    const g = Math.round(c1.g + (c2.g - c1.g) * factor);
    const b = Math.round(c1.b + (c2.b - c1.b) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Handle scroll for background color transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const transitionStart = windowHeight * 1.5; // Start transition after hero
      const transitionEnd = windowHeight * 3; // End transition
      
      let progress = 0;
      if (scrollY > transitionStart) {
        progress = Math.min(1, (scrollY - transitionStart) / (transitionEnd - transitionStart));
      }
      
      setScrollProgress(progress);
      setBgColor(interpolateColor(startColor, endColor, progress));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [startColor, endColor]);

  // Initialize mini Earth Three.js scene
  useEffect(() => {
    if (!earthContainerRef.current || sceneRef.current) return;

    const container = earthContainerRef.current;
    const width = 120;
    const height = 120;

    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 2.5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create Earth
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffffff, 2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Earth mesh
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 25,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);

    // Load texture
    textureLoader.load(
      'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg',
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        earthMaterial.map = texture;
        earthMaterial.needsUpdate = true;
      }
    );

    sceneRef.current = { scene, camera, renderer, earthMesh };

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      earthMesh.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sceneRef.current = null;
    };
  }, []);

  // Calculate Earth position and opacity based on scroll
  const earthOpacity = Math.max(0, 1 - scrollProgress * 1.5);
  const earthScale = 1 - scrollProgress * 0.3;
  const earthY = scrollProgress * 100;

  return (
    <div 
      ref={containerRef}
      className="smooth-transition-wrapper"
      style={{
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      {/* Animated Background */}
      <div
        className="smooth-bg-layer"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: bgColor,
          transition: 'background 0.1s ease-out',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      {/* Gradient overlay for smooth transition */}
      <div
        className="smooth-gradient-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(180deg, 
            transparent 0%, 
            rgba(247, 250, 255, ${scrollProgress * 0.3}) 50%,
            rgba(247, 250, 255, ${scrollProgress * 0.6}) 100%
          )`,
          zIndex: -1,
          pointerEvents: 'none',
          opacity: scrollProgress,
        }}
      />

      {/* Mini Earth that stays during transition */}
      <div
        ref={earthContainerRef}
        className="transition-earth"
        style={{
          position: 'fixed',
          top: '50%',
          right: '5%',
          width: '120px',
          height: '120px',
          transform: `translateY(calc(-50% + ${earthY}px)) scale(${earthScale})`,
          opacity: earthOpacity,
          transition: 'opacity 0.3s ease-out',
          zIndex: 5,
          pointerEvents: 'none',
          filter: `drop-shadow(0 0 20px rgba(100, 150, 255, ${0.3 * earthOpacity}))`,
        }}
      />

      {/* Content */}
      {children}
    </div>
  );
}
