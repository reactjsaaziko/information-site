import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EARTH_TEXTURE = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg';
const EARTH_BUMP = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png';
const CLOUDS_TEXTURE = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-clouds.png';

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

export default function EarthWithRings({ 
  progress = 0, 
  scrollRotation = 0,
  showRings = false,
  ringProgress = 0,
}) {
  const containerRef = useRef(null);
  const hasInitRef = useRef(false);
  const rafIdRef = useRef(null);
  const stateRef = useRef({ progress: 0, scrollRotation: 0, showRings: false, ringProgress: 0 });

  useEffect(() => {
    stateRef.current = { progress, scrollRotation, showRings, ringProgress };
  }, [progress, scrollRotation, showRings, ringProgress]);

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

    // Clouds
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

    // Create orbital rings group
    const ringsGroup = new THREE.Group();
    globeGroup.add(ringsGroup);
    ringsGroup.visible = false;

    // Ring creation function with glow layers
    const createRing = (radius, thickness, color, tiltX, tiltZ) => {
      const ringGroup = new THREE.Group();
      
      // Main ring
      const ringGeometry = new THREE.TorusGeometry(radius, thickness, 16, 128);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ringGroup.add(ring);
      
      // Glow ring (larger, more transparent)
      const glowGeometry = new THREE.TorusGeometry(radius, thickness * 3, 16, 128);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      ringGroup.add(glow);
      
      // Outer glow (even larger, very transparent)
      const outerGlowGeometry = new THREE.TorusGeometry(radius, thickness * 6, 16, 128);
      const outerGlowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
      ringGroup.add(outerGlow);
      
      ringGroup.rotation.x = tiltX;
      ringGroup.rotation.z = tiltZ;
      
      return {
        group: ringGroup,
        ring,
        ringMaterial,
        glow,
        glowMaterial,
        outerGlow,
        outerGlowMaterial,
      };
    };

    // Create two rings with different tilts - closer to Earth surface
    const ring1Data = createRing(BASE_RADIUS * 1.12, 0.04, 0x60a5fa, Math.PI / 2.3, Math.PI / 7);
    const ring2Data = createRing(BASE_RADIUS * 1.08, 0.035, 0x22d3ee, Math.PI / 2.1, -Math.PI / 6);
    
    ringsGroup.add(ring1Data.group);
    ringsGroup.add(ring2Data.group);

    // Create particles that orbit on the rings
    const createOrbitalParticles = (radius, count, color, tiltX, tiltZ) => {
      const particles = [];
      const particleGeometry = new THREE.SphereGeometry(0.08, 8, 8);
      
      for (let i = 0; i < count; i++) {
        const particleMaterial = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0,
        });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        particle.userData = {
          angle: (i / count) * Math.PI * 2 + Math.random() * 0.5,
          radius: radius,
          speed: 0.3 + Math.random() * 0.4,
          tiltX: tiltX,
          tiltZ: tiltZ,
          pulseOffset: Math.random() * Math.PI * 2,
        };
        
        particles.push(particle);
        ringsGroup.add(particle);
      }
      
      return particles;
    };

    const ring1Particles = createOrbitalParticles(BASE_RADIUS * 1.12, 10, 0x60a5fa, Math.PI / 2.3, Math.PI / 7);
    const ring2Particles = createOrbitalParticles(BASE_RADIUS * 1.08, 8, 0x22d3ee, Math.PI / 2.1, -Math.PI / 6);

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
    let ring1RotationY = 0;
    let ring1RotationX = 0;
    let ring2RotationY = 0;
    let ring2RotationX = 0;

    const animate = () => {
      rafIdRef.current = requestAnimationFrame(animate);
      time += 0.016;
      
      const { progress, scrollRotation, showRings, ringProgress } = stateRef.current;
      
      // Calculate scroll delta for ring rotation speed
      const scrollDelta = Math.abs(scrollRotation - prevScrollRotation);
      prevScrollRotation = scrollRotation;
      
      // Scale
      const targetScale = Math.min(progress * 1.5, 0.75);
      currentScale += (targetScale - currentScale) * 0.06;
      globeGroup.scale.setScalar(currentScale);
      
      // Rotation
      autoRotation += 0.001;
      mouseState.rotationX += (mouseState.targetRotationX - mouseState.rotationX) * 0.1;
      mouseState.rotationY += (mouseState.targetRotationY - mouseState.rotationY) * 0.1;
      
      globeGroup.rotation.y = autoRotation + scrollRotation + mouseState.rotationY;
      globeGroup.rotation.x = 0.15 + mouseState.rotationX;
      
      clouds.rotation.y += 0.0002;

      // Rings animation
      ringsGroup.visible = showRings;
      
      if (showRings && ringProgress > 0) {
        // Smooth easing for ring appearance
        const easedProgress = ringProgress * ringProgress * (3 - 2 * ringProgress);
        
        // Ring 1 opacity
        const ring1Opacity = Math.min(easedProgress * 1.2, 0.85);
        const ring1GlowOpacity = Math.min(easedProgress * 0.8, 0.25);
        const ring1OuterGlowOpacity = Math.min(easedProgress * 0.5, 0.1);
        
        ring1Data.ringMaterial.opacity = ring1Opacity;
        ring1Data.glowMaterial.opacity = ring1GlowOpacity;
        ring1Data.outerGlowMaterial.opacity = ring1OuterGlowOpacity;
        
        // Ring 2 opacity (slightly delayed)
        const ring2Progress = Math.max(0, (ringProgress - 0.1) / 0.9);
        const ring2Eased = ring2Progress * ring2Progress * (3 - 2 * ring2Progress);
        const ring2Opacity = Math.min(ring2Eased * 1.2, 0.85);
        const ring2GlowOpacity = Math.min(ring2Eased * 0.8, 0.25);
        const ring2OuterGlowOpacity = Math.min(ring2Eased * 0.5, 0.1);
        
        ring2Data.ringMaterial.opacity = ring2Opacity;
        ring2Data.glowMaterial.opacity = ring2GlowOpacity;
        ring2Data.outerGlowMaterial.opacity = ring2OuterGlowOpacity;

        // Auto-rotate rings continuously 360 degrees
        // Base auto-rotation speed (always rotating)
        const baseRotationSpeed1 = 0.012;
        const baseRotationSpeed2 = 0.015;
        
        // Additional speed boost when scrolling
        const scrollSpeedMultiplier = 1 + scrollDelta * 30;
        
        ring1RotationY += baseRotationSpeed1 * scrollSpeedMultiplier;
        ring1RotationX += 0.003 * scrollSpeedMultiplier;
        ring2RotationY -= baseRotationSpeed2 * scrollSpeedMultiplier;
        ring2RotationX -= 0.002 * scrollSpeedMultiplier;
        
        ring1Data.group.rotation.y = ring1RotationY;
        ring1Data.group.rotation.x = Math.PI / 2.3 + ring1RotationX;
        ring2Data.group.rotation.y = ring2RotationY;
        ring2Data.group.rotation.x = Math.PI / 2.1 + ring2RotationX;

        // Particle speed - continuous rotation with scroll boost
        const particleSpeedMultiplier = 1 + scrollDelta * 20;

        // Animate particles on ring 1 - speed based on scroll
        ring1Particles.forEach((particle) => {
          particle.userData.angle += particle.userData.speed * 0.02 * particleSpeedMultiplier;
          const angle = particle.userData.angle;
          const radius = particle.userData.radius;
          const tiltX = particle.userData.tiltX;
          const tiltZ = particle.userData.tiltZ;
          
          // Calculate position on tilted ring
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * Math.cos(tiltX);
          const z = Math.sin(angle) * radius * Math.sin(tiltX);
          
          // Apply Z tilt rotation
          const rotatedX = x * Math.cos(tiltZ) - y * Math.sin(tiltZ);
          const rotatedY = x * Math.sin(tiltZ) + y * Math.cos(tiltZ);
          
          particle.position.set(rotatedX, rotatedY, z);
          
          // Pulsing opacity
          const pulse = 0.5 + 0.5 * Math.sin(time * 2 + particle.userData.pulseOffset);
          particle.material.opacity = ring1Opacity * 0.7 * pulse;
          
          // Scale based on pulse
          const scale = 0.8 + 0.4 * pulse;
          particle.scale.setScalar(scale);
        });

        // Animate particles on ring 2 - speed based on scroll
        ring2Particles.forEach((particle) => {
          particle.userData.angle -= particle.userData.speed * 0.025 * particleSpeedMultiplier;
          const angle = particle.userData.angle;
          const radius = particle.userData.radius;
          const tiltX = particle.userData.tiltX;
          const tiltZ = particle.userData.tiltZ;
          
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * Math.cos(tiltX);
          const z = Math.sin(angle) * radius * Math.sin(tiltX);
          
          const rotatedX = x * Math.cos(tiltZ) - y * Math.sin(tiltZ);
          const rotatedY = x * Math.sin(tiltZ) + y * Math.cos(tiltZ);
          
          particle.position.set(rotatedX, rotatedY, z);
          
          const pulse = 0.5 + 0.5 * Math.sin(time * 2.5 + particle.userData.pulseOffset);
          particle.material.opacity = ring2Opacity * 0.7 * pulse;
          
          const scale = 0.8 + 0.4 * pulse;
          particle.scale.setScalar(scale);
        });
      } else {
        // Reset opacities when rings are hidden
        ring1Data.ringMaterial.opacity = 0;
        ring1Data.glowMaterial.opacity = 0;
        ring1Data.outerGlowMaterial.opacity = 0;
        ring2Data.ringMaterial.opacity = 0;
        ring2Data.glowMaterial.opacity = 0;
        ring2Data.outerGlowMaterial.opacity = 0;
        
        ring1Particles.forEach(p => p.material.opacity = 0);
        ring2Particles.forEach(p => p.material.opacity = 0);
      }
      
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
