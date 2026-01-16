import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BASE_RADIUS = 3.5;

// Mouse interaction state
const mouseState = {
  isDragging: false,
  previousX: 0,
  previousY: 0,
  rotationX: 0,
  rotationY: 0,
  targetRotationX: 0,
  targetRotationY: 0,
};

// Earth texture URLs (free NASA textures)
const EARTH_TEXTURE = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg';
const EARTH_BUMP = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png';
const EARTH_SPECULAR = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-water.png';
const CLOUDS_TEXTURE = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-clouds.png';

// Aaziko logo
const AAZIKO_LOGO = 'https://www.aaziko.com/assets/images/logo/aaziko-logo.svg';

// Surat origin point
const SURAT = { lat: 21.17, lon: 72.83, name: 'Surat' };

// Export destinations - only 6 different countries
const EXPORT_DESTINATIONS = [
  { lat: 40, lon: -74, name: 'New York' },      // USA
  { lat: 51, lon: 0, name: 'London' },          // UK
  { lat: 35, lon: 139, name: 'Tokyo' },         // Japan
  { lat: -33, lon: 151, name: 'Sydney' },       // Australia
  { lat: 25, lon: 55, name: 'Dubai' },          // UAE
  { lat: -23, lon: -46, name: 'São Paulo' },    // Brazil
];

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function Globe3D({ 
  progress = 0, 
  scrollRotation = 0,
}) {
  const containerRef = useRef(null);
  const hasInitRef = useRef(false);
  const rafIdRef = useRef(null);
  const stateRef = useRef({ progress: 0, showConnections: false, scrollRotation: 0 });

  useEffect(() => {
    stateRef.current = { progress, scrollRotation };
  }, [progress, scrollRotation]);

  useEffect(() => {
    if (hasInitRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) return;

    hasInitRef.current = true;

    // Scene
    const scene = new THREE.Scene();

    // Camera - positioned for giant globe
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Globe group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Texture loader
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

    // Earth sphere
    const earthGeometry = new THREE.SphereGeometry(BASE_RADIUS, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 25,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earth);

    // Load textures
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

    textureLoader.load(EARTH_SPECULAR, (texture) => {
      earthMaterial.specularMap = texture;
      earthMaterial.specular = new THREE.Color(0x333333);
      earthMaterial.needsUpdate = true;
    });

    // Clouds layer
    const cloudsGeometry = new THREE.SphereGeometry(BASE_RADIUS * 1.01, 64, 64);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    globeGroup.add(clouds);

    textureLoader.load(CLOUDS_TEXTURE, (texture) => {
      cloudsMaterial.map = texture;
      cloudsMaterial.alphaMap = texture;
      cloudsMaterial.needsUpdate = true;
    });

    // Atmosphere glow (inner) - REMOVED for cleaner look
    // const atmosphereGeometry = new THREE.SphereGeometry(BASE_RADIUS * 1.02, 64, 64);
    // const atmosphereMaterial = new THREE.ShaderMaterial({...});
    // const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    // globeGroup.add(atmosphere);

    // Outer glow - REMOVED for cleaner look
    // const outerGlowGeometry = new THREE.SphereGeometry(BASE_RADIUS * 1.2, 64, 64);
    // const outerGlowMaterial = new THREE.ShaderMaterial({...});
    // const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
    // globeGroup.add(outerGlow);

    // Connection markers - Surat with Aaziko logo and export arrows
    const connectionGroup = new THREE.Group();
    globeGroup.add(connectionGroup);
    connectionGroup.visible = false;

    const suratPos = latLonToVector3(SURAT.lat, SURAT.lon, BASE_RADIUS * 1.01);
    
    // Aaziko logo sprite at Surat (no ring animation)
    const logoTexture = textureLoader.load(AAZIKO_LOGO);
    const logoMaterial = new THREE.SpriteMaterial({ 
      map: logoTexture,
      transparent: true,
      depthTest: false,
    });
    const logoSprite = new THREE.Sprite(logoMaterial);
    logoSprite.position.copy(suratPos.clone().normalize().multiplyScalar(BASE_RADIUS * 1.08));
    logoSprite.scale.set(0.25, 0.25, 1);
    connectionGroup.add(logoSprite);

    // Export lines from Surat to destinations (no markers at destinations)
    const arcs = [];
    
    EXPORT_DESTINATIONS.forEach((dest) => {
      const destPos = latLonToVector3(dest.lat, dest.lon, BASE_RADIUS * 1.01);
      
      // Arc curve from Surat to destination
      const midPoint = new THREE.Vector3().addVectors(suratPos, destPos).multiplyScalar(0.5);
      const distance = suratPos.distanceTo(destPos);
      midPoint.normalize().multiplyScalar(BASE_RADIUS + distance * 0.25);
      
      const curve = new THREE.QuadraticBezierCurve3(suratPos, midPoint, destPos);
      const points = curve.getPoints(50);
      const arcGeometry = new THREE.BufferGeometry().setFromPoints(points);
      
      const arcMaterial = new THREE.LineBasicMaterial({
        color: 0x00a8e8,
        transparent: true,
        opacity: 0.6,
        linewidth: 2, 
      });
      
      const arc = new THREE.Line(arcGeometry, arcMaterial);
      connectionGroup.add(arc);
      arcs.push({ arc, curve });
    });

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

    // Animation
    let autoRotation = 0;
    let currentScale = 0.02;
    let time = 0;

    // Mouse interaction handlers
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
      
      // Limit vertical rotation
      mouseState.targetRotationX = Math.max(-0.5, Math.min(0.5, mouseState.targetRotationX));
      
      mouseState.previousX = e.clientX;
      mouseState.previousY = e.clientY;
    };

    const onMouseUp = () => {
      mouseState.isDragging = false;
      container.style.cursor = 'grab';
    };

    const onMouseLeave = () => {
      mouseState.isDragging = false;
      container.style.cursor = 'grab';
    };

    // Touch handlers for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        mouseState.isDragging = true;
        mouseState.previousX = e.touches[0].clientX;
        mouseState.previousY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (!mouseState.isDragging || e.touches.length !== 1) return;
      
      const deltaX = e.touches[0].clientX - mouseState.previousX;
      const deltaY = e.touches[0].clientY - mouseState.previousY;
      
      mouseState.targetRotationY += deltaX * 0.005;
      mouseState.targetRotationX += deltaY * 0.003;
      
      mouseState.targetRotationX = Math.max(-0.5, Math.min(0.5, mouseState.targetRotationX));
      
      mouseState.previousX = e.touches[0].clientX;
      mouseState.previousY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      mouseState.isDragging = false;
    };

    // Add event listeners
    container.style.cursor = 'grab';
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);

    const animate = () => {
      rafIdRef.current = requestAnimationFrame(animate);
      time += 0.016;
      
      const { progress, scrollRotation } = stateRef.current;
      
      // Scale - capped at 0.75 for the desired globe size
      const targetScale = Math.min(progress * 1.5, 0.75);
      currentScale += (targetScale - currentScale) * 0.06;
      globeGroup.scale.setScalar(currentScale);
      
      // Rotation - combine auto rotation, scroll rotation, and mouse interaction
      autoRotation += 0.001;
      
      // Smooth mouse rotation
      mouseState.rotationX += (mouseState.targetRotationX - mouseState.rotationX) * 0.1;
      mouseState.rotationY += (mouseState.targetRotationY - mouseState.rotationY) * 0.1;
      
      globeGroup.rotation.y = autoRotation + scrollRotation + mouseState.rotationY;
      globeGroup.rotation.x = 0.15 + mouseState.rotationX;
      
      // Clouds rotate slightly faster
      clouds.rotation.y += 0.0002;
      
      // Always show connections (network links)
      connectionGroup.visible = true;
      
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      
      // Reset mouse state
      mouseState.isDragging = false;
      mouseState.rotationX = 0;
      mouseState.rotationY = 0;
      mouseState.targetRotationX = 0;
      mouseState.targetRotationY = 0;
      
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => {
              if (m.map) m.map.dispose();
              m.dispose();
            });
          } else {
            if (obj.material.map) obj.material.map.dispose();
            if (obj.material.bumpMap) obj.material.bumpMap.dispose();
            if (obj.material.specularMap) obj.material.specularMap.dispose();
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

  return <div ref={containerRef} className="globe-3d-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }} />;
}
