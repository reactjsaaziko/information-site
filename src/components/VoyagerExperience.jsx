import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

// ============================================
// VOYAGER BLUE DOT EXPERIENCE
// A cinematic scroll-driven journey from the
// pale blue dot to Aaziko's global trade network
// ============================================

// Scene configuration
const SCENES = {
  BLUE_DOT: { start: 0, end: 0.20 },
  ZOOM_EARTH: { start: 0.20, end: 0.40 },
  TRADE_HUBS: { start: 0.40, end: 0.60 },
  TRADE_NETWORK: { start: 0.60, end: 0.85 },
  AAZIKO_REVEAL: { start: 0.85, end: 1.0 },
};

// Create glow texture for hub markers
function createGlowTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, 'rgba(0, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(0, 212, 255, 0.6)');
  gradient.addColorStop(0.6, 'rgba(0, 212, 255, 0.2)');
  gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Trade hub locations (lat, lon)
const TRADE_HUBS_DATA = [
  { name: 'Mumbai', lat: 19.076, lon: 72.877, region: 'India', volume: 0.9 },
  { name: 'Shanghai', lat: 31.230, lon: 121.474, region: 'China', volume: 1.0 },
  { name: 'Rotterdam', lat: 51.905, lon: 4.465, region: 'Europe', volume: 0.85 },
  { name: 'Los Angeles', lat: 33.942, lon: -118.408, region: 'USA', volume: 0.8 },
  { name: 'Dubai', lat: 25.276, lon: 55.296, region: 'Middle East', volume: 0.75 },
  { name: 'Lagos', lat: 6.524, lon: 3.379, region: 'Africa', volume: 0.5 },
  { name: 'Singapore', lat: 1.352, lon: 103.820, region: 'Southeast Asia', volume: 0.9 },
  { name: 'Tokyo', lat: 35.676, lon: 139.650, region: 'Japan', volume: 0.85 },
  { name: 'São Paulo', lat: -23.550, lon: -46.633, region: 'Brazil', volume: 0.6 },
  { name: 'Sydney', lat: -33.868, lon: 151.209, region: 'Australia', volume: 0.55 },
];

// Trade routes (connections between hubs)
const TRADE_ROUTES = [
  { from: 'Shanghai', to: 'Los Angeles', type: 'export', volume: 1.0 },
  { from: 'Shanghai', to: 'Rotterdam', type: 'export', volume: 0.9 },
  { from: 'Mumbai', to: 'Dubai', type: 'export', volume: 0.8 },
  { from: 'Mumbai', to: 'Rotterdam', type: 'export', volume: 0.7 },
  { from: 'Singapore', to: 'Tokyo', type: 'neutral', volume: 0.75 },
  { from: 'Singapore', to: 'Sydney', type: 'export', volume: 0.6 },
  { from: 'Rotterdam', to: 'Los Angeles', type: 'neutral', volume: 0.65 },
  { from: 'Dubai', to: 'Lagos', type: 'export', volume: 0.5 },
  { from: 'Shanghai', to: 'Singapore', type: 'neutral', volume: 0.85 },
  { from: 'Tokyo', to: 'Los Angeles', type: 'import', volume: 0.7 },
  { from: 'São Paulo', to: 'Rotterdam', type: 'export', volume: 0.55 },
  { from: 'Mumbai', to: 'Singapore', type: 'export', volume: 0.65 },
];

// Earth textures
const EARTH_TEXTURE = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg';
const EARTH_NIGHT = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg';
const EARTH_BUMP = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png';
const CLOUDS_TEXTURE = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-clouds.png';

// Convert lat/lon to 3D position
function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Easing functions
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

export default function VoyagerExperience() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const earthRef = useRef(null);
  const cloudsRef = useRef(null);
  const hubsRef = useRef([]);
  const routesRef = useRef([]);
  const gridRef = useRef(null);
  const rafIdRef = useRef(null);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const hasInitRef = useRef(false);

  // UI State
  const [currentScene, setCurrentScene] = useState(1);
  const [sceneText, setSceneText] = useState({ title: '', subtitle: '' });
  const [showLogo, setShowLogo] = useState(false);
  const [textOpacity, setTextOpacity] = useState(0);

  // Get scene text based on progress
  const getSceneContent = useCallback((progress) => {
    if (progress < SCENES.BLUE_DOT.end) {
      return { scene: 1, title: 'This is Earth.', subtitle: '' };
    } else if (progress < SCENES.ZOOM_EARTH.end) {
      return { scene: 2, title: 'Every life. Every factory. Every trade.', subtitle: '' };
    } else if (progress < SCENES.TRADE_HUBS.end) {
      return { scene: 3, title: 'Billions of products move across this planet.', subtitle: '' };
    } else if (progress < SCENES.TRADE_NETWORK.end) {
      return { scene: 4, title: 'But global trade is complex.', subtitle: '' };
    } else {
      return { 
        scene: 5, 
        title: 'Aaziko makes global trade easy, transparent, and trustful.', 
        subtitle: 'One planet. One market.' 
      };
    }
  }, []);

  useEffect(() => {
    if (hasInitRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    hasInitRef.current = true;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera - starts very far away
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.z = 500; // Very far - blue dot view
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Texture loader
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';

    // ========== STARS ==========
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 15000;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const radius = 800 + Math.random() * 2000;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);
      starSizes[i] = Math.random() * 2 + 0.5;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // ========== EARTH ==========
    const earthRadius = 10;
    const earthGeometry = new THREE.SphereGeometry(earthRadius, 128, 128);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 15,
      transparent: false,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;

    // Load Earth textures
    textureLoader.load(EARTH_TEXTURE, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      earthMaterial.map = texture;
      earthMaterial.needsUpdate = true;
    });

    textureLoader.load(EARTH_BUMP, (texture) => {
      earthMaterial.bumpMap = texture;
      earthMaterial.bumpScale = 0.03;
      earthMaterial.needsUpdate = true;
    });

    // Night lights layer (emissive)
    const nightGeometry = new THREE.SphereGeometry(earthRadius * 1.001, 128, 128);
    const nightMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nightLights = new THREE.Mesh(nightGeometry, nightMaterial);
    earth.add(nightLights);

    textureLoader.load(EARTH_NIGHT, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      nightMaterial.map = texture;
      nightMaterial.needsUpdate = true;
    });

    // Clouds
    const cloudsGeometry = new THREE.SphereGeometry(earthRadius * 1.015, 64, 64);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    earth.add(clouds);
    cloudsRef.current = clouds;

    textureLoader.load(CLOUDS_TEXTURE, (texture) => {
      cloudsMaterial.map = texture;
      cloudsMaterial.alphaMap = texture;
      cloudsMaterial.needsUpdate = true;
    });

    // Atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(earthRadius * 1.08, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float opacity;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, intensity * opacity);
        }
      `,
      uniforms: {
        opacity: { value: 0 },
      },
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    earth.add(atmosphere);

    // ========== TRADE HUBS ==========
    const hubsGroup = new THREE.Group();
    earth.add(hubsGroup);

    // Create shared glow texture for all hubs
    const glowTexture = createGlowTexture();

    TRADE_HUBS_DATA.forEach((hub) => {
      const pos = latLonToVector3(hub.lat, hub.lon, earthRadius * 1.01);
      
      // Hub point
      const hubGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const hubMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0,
      });
      const hubMesh = new THREE.Mesh(hubGeometry, hubMaterial);
      hubMesh.position.copy(pos);
      hubsGroup.add(hubMesh);

      // Glow sprite
      const glowMaterial = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0x00ffff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const glow = new THREE.Sprite(glowMaterial);
      glow.position.copy(pos);
      glow.scale.setScalar(0.5 * hub.volume);
      hubsGroup.add(glow);

      // Pulse ring
      const ringGeometry = new THREE.RingGeometry(0.1, 0.15, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));
      hubsGroup.add(ring);

      hubsRef.current.push({ mesh: hubMesh, ring, glow, data: hub });
    });

    // ========== TRADE ROUTES ==========
    const routesGroup = new THREE.Group();
    earth.add(routesGroup);

    TRADE_ROUTES.forEach((route) => {
      const fromHub = TRADE_HUBS_DATA.find(h => h.name === route.from);
      const toHub = TRADE_HUBS_DATA.find(h => h.name === route.to);
      if (!fromHub || !toHub) return;

      const fromPos = latLonToVector3(fromHub.lat, fromHub.lon, earthRadius * 1.02);
      const toPos = latLonToVector3(toHub.lat, toHub.lon, earthRadius * 1.02);

      // Create curved arc
      const midPoint = new THREE.Vector3().addVectors(fromPos, toPos).multiplyScalar(0.5);
      const distance = fromPos.distanceTo(toPos);
      midPoint.normalize().multiplyScalar(earthRadius + distance * 0.15);

      const curve = new THREE.QuadraticBezierCurve3(fromPos, midPoint, toPos);
      const points = curve.getPoints(64);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      // Color based on route type
      let color;
      switch (route.type) {
        case 'export': color = 0x00d4ff; break; // Cyan
        case 'import': color = 0xffaa00; break; // Amber
        default: color = 0xffffff; // White
      }

      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
        linewidth: 2,
      });

      const line = new THREE.Line(geometry, material);
      routesGroup.add(line);

      // Create flow particles for this route
      const particleCount = Math.floor(8 * route.volume);
      const flowParticles = [];
      
      for (let i = 0; i < particleCount; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.03, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0,
        });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        routesGroup.add(particle);
        
        flowParticles.push({
          mesh: particle,
          t: i / particleCount, // Spread particles along curve
          speed: 0.003 + Math.random() * 0.002,
        });
      }

      routesRef.current.push({ line, curve, data: route, flowParticles });
    });

    // ========== INTELLIGENCE GRID ==========
    const gridGeometry = new THREE.IcosahedronGeometry(earthRadius * 1.05, 3);
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    earth.add(grid);
    gridRef.current = grid;

    // ========== LIGHTING ==========
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Sun light (directional)
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(100, 50, 100);
    scene.add(sunLight);

    // Rim light
    const rimLight = new THREE.DirectionalLight(0x4a90d9, 0.8);
    rimLight.position.set(-50, 0, -50);
    scene.add(rimLight);

    // ========== RESIZE ==========
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // ========== SCROLL HANDLING ==========
    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY * 0.0004;
      targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current + delta));
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const delta = (touchStartY - e.touches[0].clientY) * 0.001;
      targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current + delta));
      touchStartY = e.touches[0].clientY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    // ========== ANIMATION LOOP ==========
    let time = 0;

    const animate = () => {
      rafIdRef.current = requestAnimationFrame(animate);
      time += 0.016;

      // Smooth scroll interpolation
      progressRef.current += (targetProgressRef.current - progressRef.current) * 0.05;
      const progress = progressRef.current;

      // Update scene content
      const content = getSceneContent(progress);
      setCurrentScene(content.scene);
      setSceneText({ title: content.title, subtitle: content.subtitle });

      // ========== SCENE 1: BLUE DOT (0-20%) ==========
      if (progress <= SCENES.BLUE_DOT.end) {
        const t = progress / SCENES.BLUE_DOT.end;
        
        // Camera stays far, very slight movement
        camera.position.z = 500 - t * 50;
        
        // Earth is tiny, barely visible
        earth.scale.setScalar(0.02 + t * 0.01);
        
        // Slow rotation
        earth.rotation.y = time * 0.02;
        
        // No atmosphere, clouds, hubs, routes
        atmosphereMaterial.uniforms.opacity.value = 0;
        cloudsMaterial.opacity = 0;
        nightMaterial.opacity = 0;
        
        // Text fade in
        setTextOpacity(t > 0.3 ? easeOutQuart((t - 0.3) / 0.7) : 0);
        setShowLogo(false);
      }
      
      // ========== SCENE 2: ZOOM TO EARTH (20-40%) ==========
      else if (progress <= SCENES.ZOOM_EARTH.end) {
        const t = (progress - SCENES.BLUE_DOT.end) / (SCENES.ZOOM_EARTH.end - SCENES.BLUE_DOT.end);
        const eased = easeInOutCubic(t);
        
        // Dramatic zoom
        camera.position.z = 450 - eased * 420; // 450 -> 30
        
        // Earth grows
        earth.scale.setScalar(0.03 + eased * 0.97);
        
        // Rotation continues
        earth.rotation.y = time * 0.02 + t * 0.5;
        
        // Atmosphere fades in
        atmosphereMaterial.uniforms.opacity.value = eased * 0.6;
        
        // Clouds appear
        cloudsMaterial.opacity = eased * 0.35;
        clouds.rotation.y = time * 0.005;
        
        // Night lights start appearing
        nightMaterial.opacity = eased * 0.3;
        
        setTextOpacity(t < 0.2 ? 1 - t * 5 : (t > 0.5 ? easeOutQuart((t - 0.5) / 0.5) : 0));
        setShowLogo(false);
      }
      
      // ========== SCENE 3: TRADE HUBS (40-60%) ==========
      else if (progress <= SCENES.TRADE_HUBS.end) {
        const t = (progress - SCENES.ZOOM_EARTH.end) / (SCENES.TRADE_HUBS.end - SCENES.ZOOM_EARTH.end);
        const eased = easeOutQuart(t);
        
        // Camera settles
        camera.position.z = 30 - eased * 5;
        
        // Earth at full scale
        earth.scale.setScalar(1);
        earth.rotation.y = time * 0.015;
        
        // Full atmosphere
        atmosphereMaterial.uniforms.opacity.value = 0.6;
        cloudsMaterial.opacity = 0.35;
        nightMaterial.opacity = 0.5;
        
        // Hubs fade in with pulse
        hubsRef.current.forEach((hub, i) => {
          const delay = i * 0.1;
          const hubT = Math.max(0, Math.min(1, (t - delay) * 2));
          hub.mesh.material.opacity = hubT * 0.9;
          hub.ring.material.opacity = hubT * 0.5 * (0.5 + 0.5 * Math.sin(time * 2 + i));
          hub.ring.scale.setScalar(1 + 0.3 * Math.sin(time * 2 + i));
          // Glow sprite
          if (hub.glow) {
            hub.glow.material.opacity = hubT * 0.6 * (0.6 + 0.4 * Math.sin(time * 1.5 + i));
          }
        });
        
        // Routes still hidden
        routesRef.current.forEach(route => {
          route.line.material.opacity = 0;
          // Hide flow particles
          if (route.flowParticles) {
            route.flowParticles.forEach(p => {
              p.mesh.material.opacity = 0;
            });
          }
        });
        
        setTextOpacity(t < 0.15 ? 1 - t * 6 : (t > 0.4 ? easeOutQuart((t - 0.4) / 0.6) : 0));
        setShowLogo(false);
      }
      
      // ========== SCENE 4: TRADE NETWORK (60-85%) ==========
      else if (progress <= SCENES.TRADE_NETWORK.end) {
        const t = (progress - SCENES.TRADE_HUBS.end) / (SCENES.TRADE_NETWORK.end - SCENES.TRADE_HUBS.end);
        const eased = easeOutQuart(t);
        
        camera.position.z = 25 - eased * 3;
        earth.rotation.y = time * 0.01;
        
        // Hubs stay visible
        hubsRef.current.forEach((hub, i) => {
          hub.mesh.material.opacity = 0.9;
          hub.ring.material.opacity = 0.4 * (0.5 + 0.5 * Math.sin(time * 1.5 + i));
          if (hub.glow) {
            hub.glow.material.opacity = 0.5 * (0.6 + 0.4 * Math.sin(time * 1.5 + i));
          }
        });
        
        // Routes animate in with flow particles
        routesRef.current.forEach((route, i) => {
          const delay = i * 0.08;
          const routeT = Math.max(0, Math.min(1, (t - delay) * 1.5));
          const routeOpacity = routeT * 0.6 * route.data.volume;
          route.line.material.opacity = routeOpacity;
          
          // Animate flow particles
          if (route.flowParticles && routeT > 0.3) {
            route.flowParticles.forEach(p => {
              // Move particle along curve
              p.t += p.speed;
              if (p.t > 1) p.t = 0;
              
              const pos = route.curve.getPoint(p.t);
              p.mesh.position.copy(pos);
              
              // Fade based on position (brighter in middle of path)
              const fadeFactor = Math.sin(p.t * Math.PI);
              p.mesh.material.opacity = routeOpacity * fadeFactor * 0.9;
            });
          }
        });
        
        setTextOpacity(t < 0.15 ? 1 - t * 6 : (t > 0.5 ? easeOutQuart((t - 0.5) / 0.5) : 0));
        setShowLogo(false);
      }
      
      // ========== SCENE 5: AAZIKO REVEAL (85-100%) ==========
      else {
        const t = (progress - SCENES.TRADE_NETWORK.end) / (1 - SCENES.TRADE_NETWORK.end);
        const eased = easeOutQuart(t);
        
        camera.position.z = 22 + eased * 3;
        earth.rotation.y = time * 0.008;
        
        // Intelligence grid fades in
        gridMaterial.opacity = eased * 0.15;
        gridRef.current.rotation.y = time * 0.02;
        gridRef.current.rotation.x = time * 0.01;
        
        // Routes become cleaner, more organized with flowing particles
        routesRef.current.forEach((route, i) => {
          const routeOpacity = 0.7 * route.data.volume;
          route.line.material.opacity = routeOpacity;
          
          // Continue animating flow particles
          if (route.flowParticles) {
            route.flowParticles.forEach(p => {
              p.t += p.speed * 0.8; // Slightly slower in final scene
              if (p.t > 1) p.t = 0;
              
              const pos = route.curve.getPoint(p.t);
              p.mesh.position.copy(pos);
              
              const fadeFactor = Math.sin(p.t * Math.PI);
              p.mesh.material.opacity = routeOpacity * fadeFactor * 0.8;
            });
          }
        });
        
        // Hubs pulse more uniformly
        hubsRef.current.forEach((hub, i) => {
          hub.mesh.material.opacity = 0.95;
          hub.ring.material.opacity = 0.6 * (0.7 + 0.3 * Math.sin(time * 1.2));
          if (hub.glow) {
            hub.glow.material.opacity = 0.7 * (0.8 + 0.2 * Math.sin(time * 1.2));
          }
        });
        
        setTextOpacity(eased);
        setShowLogo(t > 0.3);
      }

      // Stars parallax
      stars.rotation.y = time * 0.001 + progress * 0.1;
      stars.rotation.x = progress * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose());
          } else {
            if (obj.material.map) obj.material.map.dispose();
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
  }, [getSceneContent]);

  return (
    <div ref={containerRef} className="voyager-experience">
      {/* Scene Text Overlay */}
      <div 
        className="voyager-text"
        style={{ opacity: textOpacity }}
      >
        <p className="voyager-text__title">{sceneText.title}</p>
        {sceneText.subtitle && (
          <p className="voyager-text__subtitle">{sceneText.subtitle}</p>
        )}
      </div>

      {/* Aaziko Logo Reveal */}
      {showLogo && (
        <div className="voyager-logo" style={{ opacity: textOpacity }}>
          <div className="voyager-logo__mark">Aaziko</div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="voyager-progress">
        <div 
          className="voyager-progress__bar"
          style={{ height: `${progressRef.current * 100}%` }}
        />
      </div>

      {/* Scene Indicator */}
      <div className="voyager-scenes">
        {[1, 2, 3, 4, 5].map((num) => (
          <div 
            key={num}
            className={`voyager-scenes__dot ${currentScene >= num ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      {progressRef.current < 0.05 && (
        <div className="voyager-scroll-hint">
          <span>Scroll to explore</span>
          <div className="voyager-scroll-hint__arrow" />
        </div>
      )}
    </div>
  );
}
