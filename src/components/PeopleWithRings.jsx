import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import femaleImage from '../assets/female.png';
import maleImage from '../assets/male.png';

// Create human sprite from image
const createHumanSprite = (texture, isFemale = false) => {
  const group = new THREE.Group();
  
  // Create sprite material with the image texture
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.9,
    depthTest: true,
    depthWrite: false,
  });
  
  const sprite = new THREE.Sprite(spriteMaterial);
  
  // Scale the sprite to match human proportions (width larger)
  const scaleX = 3.0; // width - increased
  const scaleY = 1.8; // height
  sprite.scale.set(scaleX, scaleY, 1);
  sprite.position.set(0, 0.9, 0);
  
  group.add(sprite);
  
  // Store base scales for animation
  sprite.userData.baseScaleX = scaleX;
  sprite.userData.baseScaleY = scaleY;
  
  // Slight rotation for female
  if (isFemale) {
    group.rotation.y = 0.1;
  } else {[{
	"resource": "/home/dhruval/aaziko/aaziko-information/threejs/src/components/PeopleWithRings.jsx",
	"owner": "typescript",
	"code": "2451",
	"severity": 8,
	"message": "Cannot redeclare block-scoped variable 'breathe'.",
	"source": "ts",
	"startLineNumber": 298,
	"startColumn": 13,
	"endLineNumber": 298,
	"endColumn": 20,
	"origin": "extHost1"
},{
	"resource": "/home/dhruval/aaziko/aaziko-information/threejs/src/components/PeopleWithRings.jsx",
	"owner": "typescript",
	"code": "2451",
	"severity": 8,
	"message": "Cannot redeclare block-scoped variable 'breathe'.",
	"source": "ts",
	"startLineNumber": 333,
	"startColumn": 13,
	"endLineNumber": 333,
	"endColumn": 20,
	"origin": "extHost1"
}]

    group.rotation.y = -0.05;
  }
  
  return { group, material: spriteMaterial, sprite };
};
[{
	"resource": "/home/dhruval/aaziko/aaziko-information/threejs/src/components/PeopleWithRings.jsx",
	"owner": "typescript",
	"code": "2451",
	"severity": 8,
	"message": "Cannot redeclare block-scoped variable 'breathe'.",
	"source": "ts",
	"startLineNumber": 298,
	"startColumn": 13,
	"endLineNumber": 298,
	"endColumn": 20,
	"origin": "extHost1"
},{
	"resource": "/home/dhruval/aaziko/aaziko-information/threejs/src/components/PeopleWithRings.jsx",
	"owner": "typescript",
	"code": "2451",
	"severity": 8,
	"message": "Cannot redeclare block-scoped variable 'breathe'.",
	"source": "ts",
	"startLineNumber": 333,
	"startColumn": 13,
	"endLineNumber": 333,
	"endColumn": 20,
	"origin": "extHost1"
}]

// Create chrome metallic ring - EXACT match to reference
const createMetallicRing = () => {
  const ringGroup = new THREE.Group();
  const ringRadius = 0.32;
  const ringThickness = 0.022;
  
  // Main chrome ring - thick silver band
  const mainGeo = new THREE.TorusGeometry(ringRadius, ringThickness, 32, 120);
  const mainMat = new THREE.MeshPhysicalMaterial({
    color: 0xc0d0e0,
    metalness: 0.95,
    roughness: 0.1,
    transparent: true,
    opacity: 0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    reflectivity: 1,
    envMapIntensity: 1.8,
    side: THREE.FrontSide, // Only render from front, hide from back
  });
  const main = new THREE.Mesh(mainGeo, mainMat);
  main.rotation.x = Math.PI / 2;
  ringGroup.add(main);

  // Inner dark edge - navy/dark blue inside
  const innerGeo = new THREE.TorusGeometry(ringRadius - 0.015, 0.014, 24, 120);
  const innerMat = new THREE.MeshPhysicalMaterial({
    color: 0x1a2a3a,
    metalness: 0.85,
    roughness: 0.3,
    transparent: true,
    opacity: 0,
    side: THREE.FrontSide, // Only render from front, hide from back
  });
  const inner = new THREE.Mesh(innerGeo, innerMat);
  inner.rotation.x = Math.PI / 2;
  inner.position.y = 0.008;
  ringGroup.add(inner);

  // Top highlight
  const topGeo = new THREE.TorusGeometry(ringRadius + 0.005, ringThickness * 0.35, 16, 120);
  const topMat = new THREE.MeshPhysicalMaterial({
    color: 0xf0f8ff,
    metalness: 0.7,
    roughness: 0.15,
    transparent: true,
    opacity: 0,
    side: THREE.FrontSide, // Only render from front, hide from back
  });
  const top = new THREE.Mesh(topGeo, topMat);
  top.rotation.x = Math.PI / 2;
  top.position.y = ringThickness * 0.7;
  ringGroup.add(top);

  // Badge icons on front - square with white symbol
  const createBadge = (angle) => {
    const badgeGroup = new THREE.Group();
    
    // Square metallic plate
    const baseGeo = new THREE.BoxGeometry(0.048, 0.048, 0.016);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0x3a4a5a,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0,
      side: THREE.FrontSide, // Only render from front, hide from back
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    badgeGroup.add(base);
    
    // White icon symbol
    const iconGeo = new THREE.PlaneGeometry(0.028, 0.028);
    const iconMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      side: THREE.FrontSide, // Only render from front, hide from back
    });
    const icon = new THREE.Mesh(iconGeo, iconMat);
    icon.position.z = 0.009;
    badgeGroup.add(icon);
    
    // Position on ring front
    const x = Math.cos(angle) * ringRadius;
    const z = Math.sin(angle) * ringRadius;
    badgeGroup.position.set(x, 0.025, z);
    badgeGroup.lookAt(0, 0.025, 0);
    badgeGroup.rotateY(Math.PI);
    
    return { group: badgeGroup, baseMat, iconMat };
  };

  // Two badges on front
  const badge1 = createBadge(Math.PI * 0.12);
  const badge2 = createBadge(Math.PI * 0.88);
  ringGroup.add(badge1.group);
  ringGroup.add(badge2.group);

  return {
    group: ringGroup,
    mainMat,
    innerMat,
    topMat,
    badges: [badge1, badge2],
  };
};


export default function PeopleWithRings({ opacity = 0, progress = 0, ringTransferProgress = 0 }) {
  const containerRef = useRef(null);
  const hasInitRef = useRef(false);
  const rafIdRef = useRef(null);
  const stateRef = useRef({ opacity: 0, progress: 0, ringTransferProgress: 0 });

  useEffect(() => {
    stateRef.current = { opacity, progress, ringTransferProgress };
  }, [opacity, progress, ringTransferProgress]);

  useEffect(() => {
    if (hasInitRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) return;

    hasInitRef.current = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4.5;
    camera.position.y = 0.9;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Environment for reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0xd8e8f4);
    const envMap = pmremGenerator.fromScene(envScene).texture;
    scene.environment = envMap;

    // Soft lighting
    const ambientLight = new THREE.AmbientLight(0xf0f8ff, 1.0);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xc8dce8, 0.5);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.7);
    keyLight.position.set(6, 15, 12);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f4fc, 0.35);
    fillLight.position.set(-10, 8, 10);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xd8ecf8, 0.4);
    rimLight.position.set(0, 6, -10);
    scene.add(rimLight);

    // Person groups
    const leftPersonGroup = new THREE.Group();
    const rightPersonGroup = new THREE.Group();
    
    // Position - female left, male right (matching reference spacing)
    leftPersonGroup.position.set(-1.1, -0.65, 0);
    rightPersonGroup.position.set(1.1, -0.65, 0);
    
    scene.add(leftPersonGroup);
    scene.add(rightPersonGroup);

    // Load textures for human images
    const textureLoader = new THREE.TextureLoader();
    
    // Load female and male textures
    const femaleTexture = textureLoader.load(femaleImage);
    const maleTexture = textureLoader.load(maleImage);
    
    // Set texture properties for better quality
    femaleTexture.colorSpace = THREE.SRGBColorSpace;
    maleTexture.colorSpace = THREE.SRGBColorSpace;

    // Create humans using sprites with images
    const femaleHuman = createHumanSprite(femaleTexture, true);
    leftPersonGroup.add(femaleHuman.group);
    
    const maleHuman = createHumanSprite(maleTexture, false);
    rightPersonGroup.add(maleHuman.group);

    // Create rings
    const leftRing = createMetallicRing();
    const rightRing = createMetallicRing();
    scene.add(leftRing.group);
    scene.add(rightRing.group);

    // Initial ring positions - positioned at waist level on the human body
    const waistY = 0.28; // Waist/hip level where rings are worn
    const ringScale = 0.7; // Scale to fit around waist
    leftRing.group.position.set(-1.1, waistY, 0);
    rightRing.group.position.set(1.1, waistY, 0);
    leftRing.group.scale.setScalar(ringScale);
    rightRing.group.scale.setScalar(ringScale);

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
    let time = 0;
    let leftRingPos = { x: -1.1, y: waistY, z: 0 };
    let rightRingPos = { x: 1.1, y: waistY, z: 0 };
    let currentScale = ringScale;

    const animate = () => {
      rafIdRef.current = requestAnimationFrame(animate);
      time += 0.016;

      const { progress, ringTransferProgress } = stateRef.current;
      
      // Person spread
      const spread = 1.1 + progress * 0.08;
      leftPersonGroup.position.x = -spread;
      rightPersonGroup.position.x = spread;

      // Rings stay at waist level, just follow the person's x position
      const lerpSpeed = 0.1;
      leftRingPos.x += (-spread - leftRingPos.x) * lerpSpeed;
      rightRingPos.x += (spread - rightRingPos.x) * lerpSpeed;

      leftRing.group.position.set(leftRingPos.x, leftRingPos.y, leftRingPos.z);
      rightRing.group.position.set(rightRingPos.x, rightRingPos.y, rightRingPos.z);
      leftRing.group.scale.setScalar(currentScale);
      rightRing.group.scale.setScalar(currentScale);

      // Subtle breathing movement for rings (follows body)
      const breathe = Math.sin(time * 0.7) * 0.003;
      leftRing.group.position.y = waistY + breathe;
      rightRing.group.position.y = waistY + breathe;

      // Opacity
      const baseOpacity = Math.min(progress * 3, 1);
      
      // Ring materials
      leftRing.mainMat.opacity = baseOpacity * 0.95;
      leftRing.innerMat.opacity = baseOpacity * 0.9;
      leftRing.topMat.opacity = baseOpacity * 0.55;
      leftRing.badges.forEach(b => {
        b.baseMat.opacity = baseOpacity * 0.92;
        b.iconMat.opacity = baseOpacity * 0.85;
      });
      
      rightRing.mainMat.opacity = baseOpacity * 0.95;
      rightRing.innerMat.opacity = baseOpacity * 0.9;
      rightRing.topMat.opacity = baseOpacity * 0.55;
      rightRing.badges.forEach(b => {
        b.baseMat.opacity = baseOpacity * 0.92;
        b.iconMat.opacity = baseOpacity * 0.85;
      });

      // Human opacity - using sprite material
      const humanOpacity = Math.min(progress * 2, 1);
      femaleHuman.material.opacity = humanOpacity;
      maleHuman.material.opacity = humanOpacity;

      // Human scale
      const humanScale = 0.96 + progress * 0.04;
      leftPersonGroup.scale.setScalar(humanScale);
      rightPersonGroup.scale.setScalar(humanScale);

      // Subtle breathing animation for sprites
      const humanBreathe = Math.sin(time * 0.7) * 0.01;
      femaleHuman.sprite.scale.y = femaleHuman.sprite.userData.baseScaleY * (1 + humanBreathe);
      maleHuman.sprite.scale.y = maleHuman.sprite.userData.baseScaleY * (1 + humanBreathe * 0.6);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('resize', resize);

      pmremGenerator.dispose();
      envMap.dispose();

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
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
      className="people-rings-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        opacity: opacity,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
        zIndex: 12,
      }}
    />
  );
}
