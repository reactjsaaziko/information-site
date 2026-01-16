import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EARTH_TEXTURE = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg';
const EARTH_BUMP = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png';
// Cloud texture removed due to CORS issues - using procedural clouds instead
const CLOUDS_TEXTURE = null;

const mouseState = {
  isDragging: false,
  previousX: 0,
  previousY: 0,
  rotationX: 0,
  rotationY: 0,
  targetRotationX: 0,
  targetRotationY: 0,
};

export default function Earth3D({ 
  progress = 0, 
  scrollRotation = 0,
  showRings = false,
  ringProgress = 0,
  ringTransferProgress = 0, // 0 = rings on earth, 1 = rings transferred to hands
}) {
  const containerRef = useRef(null);
  const hasInitRef = useRef(false);
  const rafIdRef = useRef(null);
  const stateRef = useRef({ progress: 0, scrollRotation: 0, showRings: false, ringProgress: 0, ringTransferProgress: 0 });

  useEffect(() => {
    stateRef.current = { progress, scrollRotation, showRings, ringProgress, ringTransferProgress };
  }, [progress, scrollRotation, showRings, ringProgress, ringTransferProgress]);

  useEffect(() => {
    if (hasInitRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) return;

    hasInitRef.current = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x4a90d9, 0.5);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    // Earth
    const BASE_RADIUS = 3.5;
    const earthGeometry = new THREE.SphereGeometry(BASE_RADIUS, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 25,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earth);

    textureLoader.load(EARTH_TEXTURE, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      earthMaterial.map = texture;
      earthMaterial.needsUpdate = true;
    });

    textureLoader.load(EARTH_BUMP, (texture) => {
      earthMaterial.bumpMap = texture;
      earthMaterial.bumpScale = 0.05;
      earthMaterial.needsUpdate = true;
    });

    // Clouds - using simple semi-transparent sphere without texture
    const cloudsGeometry = new THREE.SphereGeometry(BASE_RADIUS * 1.01, 64, 64);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
    });
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    globeGroup.add(clouds);

    // Rings removed - clean Earth without orbital rings

    // Resize
    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse handlers
    const onMouseDown = (e) => {
      mouseState.isDragging = true;
      mouseState.previousX = e.clientX;
      mouseState.previousY = e.clientY;
      container.style.cursor = 'grabbing';
    };

    const onMouseMove = (e) => {
      if (!mouseState.isDragging) return;
      const deltaX = e.clientX - mouseState.previousX;
      const deltaY = e.clientY - mouseState.previousY;
      mouseState.targetRotationY += deltaX * 0.005;
      mouseState.targetRotationX += deltaY * 0.003;
      mouseState.targetRotationX = Math.max(-0.5, Math.min(0.5, mouseState.targetRotationX));
      mouseState.previousX = e.clientX;
      mouseState.previousY = e.clientY;
    };

    const onMouseUp = () => {
      mouseState.isDragging = false;
      container.style.cursor = 'grab';
    };

    container.style.cursor = 'grab';
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation
    let autoRotation = 0;
    let currentScale = 0.02;
    let time = 0;
    let prevScrollRotation = 0;

    const animate = () => {
      rafIdRef.current = requestAnimationFrame(animate);
      time += 0.016;
      
      const { progress, scrollRotation } = stateRef.current;
      
      // Track scroll for rotation
      prevScrollRotation = scrollRotation;
      
      // Scale - limit max scale based on screen size to prevent clipping
      const screenWidth = window.innerWidth;
      let maxScale = 0.75;
      if (screenWidth <= 480) {
        maxScale = 0.35;
      } else if (screenWidth <= 600) {
        maxScale = 0.4;
      } else if (screenWidth <= 768) {
        maxScale = 0.45;
      } else if (screenWidth <= 900) {
        maxScale = 0.55;
      } else if (screenWidth <= 1100) {
        maxScale = 0.65;
      }
      
      const targetScale = Math.min(progress * 1.5, maxScale);
      currentScale += (targetScale - currentScale) * 0.06;
      globeGroup.scale.setScalar(currentScale);
      
      // Rotation
      autoRotation += 0.001;
      mouseState.rotationX += (mouseState.targetRotationX - mouseState.rotationX) * 0.1;
      mouseState.rotationY += (mouseState.targetRotationY - mouseState.rotationY) * 0.1;
      
      globeGroup.rotation.y = autoRotation + scrollRotation + mouseState.rotationY;
      globeGroup.rotation.x = 0.15 + mouseState.rotationX;
      
      clouds.rotation.y += 0.0002;

      // Rings removed - no ring animation needed
      
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      
      mouseState.isDragging = false;
      mouseState.rotationX = 0;
      mouseState.rotationY = 0;
      mouseState.targetRotationX = 0;
      mouseState.targetRotationY = 0;
      
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      
      renderer.dispose();
      renderer.forceContextLoss();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      hasInitRef.current = false;
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="globe-3d-container" 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh' 
      }} 
    />
  );
}
