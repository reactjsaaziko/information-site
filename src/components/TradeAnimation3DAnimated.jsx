import { useEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import * as THREE from 'three';
import './TradeAnimation3D.css';
import { SCROLL_CONFIG } from '../hooks/useScrollNormalizer';

/**
 * TradeAnimation3DAnimated - Trade animation section with controllable forward/reverse animations
 * 
 * Animation plays at a fixed, controlled duration regardless of scroll speed.
 * This ensures smooth, cinematic playback.
 * 
 * Exposes:
 * - playForward(): Promise<void> - Plays animation from 0% to 100%
 * - playReverse(): Promise<void> - Plays animation from 100% to 0%
 * - setProgress(0..1): Sets animation progress directly
 */

const TradeAnimation3DAnimated = forwardRef(function TradeAnimation3DAnimated(props, ref) {
  const cubeRef = useRef(null);
  const shadowRef = useRef(null);
  const causticsRef = useRef(null);
  const ringsContainerRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const personLeftRef = useRef(null);
  const personRightRef = useRef(null);
  const videoCardLeftRef = useRef(null);
  const videoCardRightRef = useRef(null);
  const arrowRef = useRef(null);
  const buyerAmountRef = useRef(null);
  const sellerAmountRef = useRef(null);
  const sellerHeadAmountRef = useRef(null);
  const buyerHeadAmountRef = useRef(null);
  const aazikoSolutionRef = useRef(null);
  const solutionCardLeftRef = useRef(null);
  const solutionCardRightRef = useRef(null);
  const sectionRef = useRef(null);
  const sceneContainerRef = useRef(null);
  const earthContainerRef = useRef(null);
  const earthSceneRef = useRef(null);

  const [buttonTextIndex, setButtonTextIndex] = useState(0);
  const [earthContainerReady, setEarthContainerReady] = useState(false);

  const buttonTexts = [
    '+ 0.2% inspection', '+ 0.1% insurance', '+ 2% local transport',
    '+ 1% port handling', '+ 0.2% CHFE', '+ 3% Freight',
    '+ 0.2% CHFE', '+ 2% local transport'
  ];

  const totalChargesPercent = 8.9;
  const basePrice = 100;
  const totalPrice = basePrice + (basePrice * totalChargesPercent / 100);
  const conversionCharge = 2;
  const sellerReceives = basePrice - conversionCharge;
  const usdToInr = 83;
  const sellerReceivesInr = sellerReceives * usdToInr;


  // Animation state refs
  const progressRef = useRef(0);
  const rafIdRef = useRef(null);
  const timeRef = useRef(0);

  // Current animation values
  const rotationRef = useRef({ x: -30, y: 45 });
  const ringRotationRef = useRef(0);
  const ringOpacityRef = useRef(0);
  const cubeScaleRef = useRef(1);
  const cubeOpacityRef = useRef(1);
  const animationProgressRef = useRef(0);
  const ring1PosRef = useRef({ x: 0, y: 0, rotateX: 90, rotateY: 0, rotateZ: 0, scale: 1 });
  const ring2PosRef = useRef({ x: 0, y: 0, rotateX: 90, rotateY: 60, rotateZ: 0, scale: 1 });
  const ring1OpacityRef = useRef(1);
  const ring2OpacityRef = useRef(1);
  const ring3OpacityRef = useRef(1);
  const personOpacityRef = useRef(0);
  const videoCardOpacityRef = useRef(0);
  const aazikoOpacityRef = useRef(0);
  const sceneScaleRef = useRef(1.5);

  const size = 200;

  // Get responsive values
  const getResponsiveValues = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
    if (width <= 768) return { personX: 500, cardX: 780, sceneScale: 1, personY: 80, isMobile: true };
    if (width <= 900) return { personX: 220, cardX: 380, sceneScale: 1.2, personY: 50, isMobile: false };
    if (width <= 1100) return { personX: 300, cardX: 480, sceneScale: 1.3, personY: 60, isMobile: false };
    if (width <= 1400) return { personX: 400, cardX: 620, sceneScale: 1.4, personY: 80, isMobile: false };
    return { personX: 500, cardX: 780, sceneScale: 1.5, personY: 80, isMobile: false };
  };

  const responsiveValuesRef = useRef(getResponsiveValues());

  // Path for ring animation
  const getPathPosition = (progress, isLeft) => {
    const direction = isLeft ? -1 : 1;
    const startX = 0, startY = 0;
    const endX = direction * 500, endY = 50;
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    return { x: startX + (endX - startX) * easeProgress, y: startY + (endY - startY) * easeProgress };
  };

  // Create ring segments
  const createRingSegments = (radius, ringHeight, ringDepth) => {
    const segments = 72;
    const segmentWidth = (2 * Math.PI * radius) / segments * 1.15;
    return [...Array(segments)].map((_, i) => {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const rotY = (angle * 180) / Math.PI;
      return (
        <div key={i} className="trade-anim-ring-segment" style={{
          width: segmentWidth, height: ringHeight,
          transform: `translate3d(${x - segmentWidth / 2}px, ${-ringHeight / 2}px, ${z}px) rotateY(${-rotY + 90}deg)`,
        }}>
          <div className="trade-anim-ring-face trade-anim-ring-face-front" style={{ transform: `translateZ(${ringDepth / 2}px)` }} />
          <div className="trade-anim-ring-face trade-anim-ring-face-back" style={{ transform: `translateZ(${-ringDepth / 2}px)` }} />
          <div className="trade-anim-ring-face trade-anim-ring-face-top" style={{ height: ringDepth }} />
          <div className="trade-anim-ring-face trade-anim-ring-face-bottom" style={{ height: ringDepth }} />
        </div>
      );
    });
  };


  // Update animation state based on scroll position (0-900)
  const updateAnimationState = useCallback((totalScroll) => {
    // Phase 1: Cube rotation (0 to 200)
    if (totalScroll <= 200) {
      const cubeProgress = totalScroll / 200;
      rotationRef.current.y = 45 + cubeProgress * 180;
      rotationRef.current.x = -30 + cubeProgress * 90;
      ringOpacityRef.current = 0;
      cubeScaleRef.current = 1;
      cubeOpacityRef.current = 1;
      animationProgressRef.current = 0;
      ring1OpacityRef.current = 1;
      ring2OpacityRef.current = 1;
      ring3OpacityRef.current = 1;
      personOpacityRef.current = 0;
      videoCardOpacityRef.current = 0;
      aazikoOpacityRef.current = 0;
      sceneScaleRef.current = 1.5;
      ringRotationRef.current = 0;
    }
    // Phase 2 & 3: Rings appear, spin, separate (200 to 600)
    else if (totalScroll <= 600) {
      rotationRef.current.y = 45 + 180;
      rotationRef.current.x = -30 + 90;
      const ringPhaseProgress = (totalScroll - 200) / 400;
      ringRotationRef.current = ringPhaseProgress * 360;
      ringOpacityRef.current = Math.min(1, ringPhaseProgress * 1.25);

      if (ringPhaseProgress <= 0.6) {
        const shrinkProgress = ringPhaseProgress / 0.6;
        cubeScaleRef.current = 1 - shrinkProgress * 0.9;
        cubeOpacityRef.current = 1;
        animationProgressRef.current = 0;
        ring1OpacityRef.current = 1;
        ring2OpacityRef.current = 1;
        ring3OpacityRef.current = 1;
        personOpacityRef.current = 0;
        videoCardOpacityRef.current = 0;
        sceneScaleRef.current = 1.5;
      } else {
        cubeScaleRef.current = 0.1;
        const fadeProgress = (ringPhaseProgress - 0.6) / 0.4;
        cubeOpacityRef.current = 1 - fadeProgress;
        animationProgressRef.current = fadeProgress;
        ring1OpacityRef.current = 1;
        ring2OpacityRef.current = 1;
        ring3OpacityRef.current = 1 - fadeProgress;
        personOpacityRef.current = fadeProgress > 0.3 ? (fadeProgress - 0.3) / 0.7 : 0;
        videoCardOpacityRef.current = 0;
        aazikoOpacityRef.current = 0;
        sceneScaleRef.current = 1.5;
      }
    }
    // Phase 4: Video cards appear (600 to 700)
    else if (totalScroll <= 700) {
      rotationRef.current.y = 45 + 180;
      rotationRef.current.x = -30 + 90;
      ringOpacityRef.current = 1;
      ringRotationRef.current = 360;
      cubeScaleRef.current = 0.1;
      cubeOpacityRef.current = 0;
      animationProgressRef.current = 1;
      ring1OpacityRef.current = 1;
      ring2OpacityRef.current = 1;
      ring3OpacityRef.current = 0;
      personOpacityRef.current = 1;
      sceneScaleRef.current = 1.5;
      aazikoOpacityRef.current = 0;
      const videoProgress = (totalScroll - 600) / 100;
      videoCardOpacityRef.current = Math.min(1, videoProgress);
    }
    // Phase 5: Camera zoom out (700 to 900)
    else {
      rotationRef.current.y = 45 + 180;
      rotationRef.current.x = -30 + 90;
      ringOpacityRef.current = 1;
      ringRotationRef.current = 360;
      cubeScaleRef.current = 0.1;
      cubeOpacityRef.current = 0;
      animationProgressRef.current = 1;
      ring1OpacityRef.current = 1;
      ring2OpacityRef.current = 1;
      ring3OpacityRef.current = 0;
      personOpacityRef.current = 1;
      videoCardOpacityRef.current = 1;
      aazikoOpacityRef.current = 1;
      const zoomProgress = (totalScroll - 700) / 200;
      sceneScaleRef.current = 1.5 - (Math.min(1, zoomProgress) * 0.5);
    }
  }, []);


  // Apply visual updates to DOM
  const applyVisuals = useCallback(() => {
    timeRef.current += 0.016;
    const rv = responsiveValuesRef.current;
    const progress = animationProgressRef.current;

    // Update ring positions
    if (progress <= 0.3) {
      ring1PosRef.current = { x: 0, y: 0, rotateX: 90, rotateY: 0, rotateZ: ringRotationRef.current, scale: 1 };
      ring2PosRef.current = { x: 0, y: 0, rotateX: 90, rotateY: 60, rotateZ: -ringRotationRef.current, scale: 1 };
    } else {
      const pathProgress = (progress - 0.3) / 0.7;
      const pos1 = getPathPosition(pathProgress, true);
      const pos2 = getPathPosition(pathProgress, false);
      const scale = 1 - (0.6 * pathProgress);
      const easePathProgress = 1 - Math.pow(1 - pathProgress, 2);
      const rotateX = 90 * (1 - easePathProgress);
      const spinZ = ringRotationRef.current * (1 - easePathProgress);
      ring1PosRef.current = { x: pos1.x, y: pos1.y, rotateX, rotateY: 0, rotateZ: spinZ, scale };
      ring2PosRef.current = { x: pos2.x, y: pos2.y, rotateX, rotateY: 60 * (1 - easePathProgress), rotateZ: -spinZ, scale };
    }

    // Shadow calculations
    const shadowOffsetX = Math.sin(rotationRef.current.y * Math.PI / 180) * 30;
    const shadowOffsetY = Math.cos(rotationRef.current.x * Math.PI / 180) * 10 + 120;
    const shadowScale = 0.6 + Math.sin(rotationRef.current.x * Math.PI / 180) * 0.1;

    // Apply transforms
    if (cubeRef.current) {
      cubeRef.current.style.transform = `translate(-50%, -50%) scale(${cubeScaleRef.current})`;
      cubeRef.current.style.opacity = cubeOpacityRef.current;
    }
    if (shadowRef.current) {
      shadowRef.current.style.transform = `translate(${shadowOffsetX}px, ${shadowOffsetY}px) rotateX(80deg) scale(${shadowScale}, ${shadowScale * 0.4})`;
      shadowRef.current.style.opacity = cubeOpacityRef.current * 0.4;
    }
    if (causticsRef.current) {
      const causticOffset = Math.sin(timeRef.current * 2) * 10;
      causticsRef.current.style.transform = `translate(${shadowOffsetX + causticOffset}px, ${shadowOffsetY + 20}px) rotateX(80deg) scale(${shadowScale * 1.2})`;
      causticsRef.current.style.opacity = cubeOpacityRef.current * (0.3 + Math.sin(timeRef.current * 3) * 0.1);
    }
    if (ringsContainerRef.current) ringsContainerRef.current.style.opacity = ringOpacityRef.current;
    if (ring1Ref.current) {
      const r1 = ring1PosRef.current;
      ring1Ref.current.style.transform = `translate(-50%, -50%) translateX(${r1.x}px) translateY(${r1.y}px) rotateX(${r1.rotateX}deg) rotateY(${r1.rotateY}deg) rotateZ(${r1.rotateZ}deg) scale(${r1.scale})`;
      ring1Ref.current.style.opacity = ring1OpacityRef.current;
    }
    if (ring2Ref.current) {
      const r2 = ring2PosRef.current;
      ring2Ref.current.style.transform = `translate(-50%, -50%) translateX(${r2.x}px) translateY(${r2.y}px) rotateX(${r2.rotateX}deg) rotateY(${r2.rotateY}deg) rotateZ(${r2.rotateZ}deg) scale(${r2.scale})`;
      ring2Ref.current.style.opacity = ring2OpacityRef.current;
    }
    if (ring3Ref.current) {
      ring3Ref.current.style.transform = `translate(-50%, -50%) rotateX(90deg) rotateY(-60deg) rotateZ(${ringRotationRef.current}deg)`;
      ring3Ref.current.style.opacity = ring3OpacityRef.current;
    }
    if (personLeftRef.current) personLeftRef.current.style.opacity = personOpacityRef.current;
    if (personRightRef.current) personRightRef.current.style.opacity = personOpacityRef.current;
    if (sceneContainerRef.current && !rv.isMobile) {
      sceneContainerRef.current.style.transform = `scale(${sceneScaleRef.current})`;
    }

    // Cards
    const cardX = rv.cardX;
    const problemScale = 0.95 + 0.05 * videoCardOpacityRef.current;
    const solutionScale = 0.95 + 0.05 * aazikoOpacityRef.current;
    if (videoCardLeftRef.current) {
      videoCardLeftRef.current.style.opacity = videoCardOpacityRef.current;
      videoCardLeftRef.current.style.transform = `translate(-50%, -50%) translateX(-${cardX}px) translateY(280px) scale(${problemScale})`;
    }
    if (videoCardRightRef.current) {
      videoCardRightRef.current.style.opacity = videoCardOpacityRef.current;
      videoCardRightRef.current.style.transform = `translate(-50%, -50%) translateX(${cardX}px) translateY(280px) scale(${problemScale})`;
    }
    if (solutionCardLeftRef.current) {
      solutionCardLeftRef.current.style.opacity = aazikoOpacityRef.current;
      solutionCardLeftRef.current.style.transform = `translate(-50%, -50%) translateX(-${cardX}px) translateY(-280px) scale(${solutionScale})`;
    }
    if (solutionCardRightRef.current) {
      solutionCardRightRef.current.style.opacity = aazikoOpacityRef.current;
      solutionCardRightRef.current.style.transform = `translate(-50%, -50%) translateX(${cardX}px) translateY(-280px) scale(${solutionScale})`;
    }
    if (arrowRef.current) arrowRef.current.style.opacity = videoCardOpacityRef.current;
    if (buyerAmountRef.current) buyerAmountRef.current.style.opacity = videoCardOpacityRef.current;
    if (sellerAmountRef.current) sellerAmountRef.current.style.opacity = videoCardOpacityRef.current;
    if (sellerHeadAmountRef.current) sellerHeadAmountRef.current.style.opacity = videoCardOpacityRef.current;
    if (buyerHeadAmountRef.current) buyerHeadAmountRef.current.style.opacity = aazikoOpacityRef.current;
    if (aazikoSolutionRef.current) aazikoSolutionRef.current.style.opacity = aazikoOpacityRef.current;
  }, []);


  // Expose animation controls
  useImperativeHandle(ref, () => ({
    playForward: () => {
      return new Promise((resolve) => {
        const startScroll = progressRef.current;
        const endScroll = 900;
        // Use configurable duration for consistent, cinematic playback
        // This section is longer, so we use a slightly longer duration
        const duration = SCROLL_CONFIG.SECTION_DURATION_MS * 1.2;
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const t = Math.min(elapsed / duration, 1);
          // Ease out cubic for smooth deceleration
          const eased = 1 - Math.pow(1 - t, 3);
          const currentScroll = startScroll + (endScroll - startScroll) * eased;
          
          progressRef.current = currentScroll;
          updateAnimationState(currentScroll);
          applyVisuals();

          if (t < 1) {
            rafIdRef.current = requestAnimationFrame(animate);
          } else {
            progressRef.current = endScroll;
            updateAnimationState(endScroll);
            applyVisuals();
            resolve();
          }
        };

        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(animate);
      });
    },

    playReverse: () => {
      return new Promise((resolve) => {
        const startScroll = progressRef.current;
        const endScroll = 0;
        // Use configurable duration for consistent, cinematic playback
        const duration = SCROLL_CONFIG.SECTION_REVERSE_DURATION_MS * 1.2;
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const t = Math.min(elapsed / duration, 1);
          // Ease out cubic for smooth deceleration
          const eased = 1 - Math.pow(1 - t, 3);
          const currentScroll = startScroll + (endScroll - startScroll) * eased;
          
          progressRef.current = currentScroll;
          updateAnimationState(currentScroll);
          applyVisuals();

          if (t < 1) {
            rafIdRef.current = requestAnimationFrame(animate);
          } else {
            progressRef.current = endScroll;
            updateAnimationState(endScroll);
            applyVisuals();
            resolve();
          }
        };

        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(animate);
      });
    },

    setProgress: (progress) => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      const scrollValue = progress * 900;
      progressRef.current = scrollValue;
      updateAnimationState(scrollValue);
      applyVisuals();
    },

    getProgress: () => progressRef.current / 900,
  }), [updateAnimationState, applyVisuals]);

  // Initialize
  useEffect(() => {
    updateAnimationState(0);
    applyVisuals();
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [updateAnimationState, applyVisuals]);

  // Button text rotation
  useEffect(() => {
    const textInterval = setInterval(() => {
      setButtonTextIndex((prevIndex) => (prevIndex + 1) % buttonTexts.length);
    }, 1250);
    return () => clearInterval(textInterval);
  }, []);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      responsiveValuesRef.current = getResponsiveValues();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Initialize Earth 3D scene
  useEffect(() => {
    if (!earthContainerReady || !earthContainerRef.current || earthSceneRef.current) return;

    const container = earthContainerRef.current;
    const EARTH_TEXTURE = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg';
    const EARTH_BUMP = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffffff, 2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);
    const fillLight = new THREE.DirectionalLight(0x4a90d9, 0.5);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 25 });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);

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

    const cloudsGeometry = new THREE.SphereGeometry(1.01, 64, 64);
    const cloudsMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.15, depthWrite: false });
    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    earthGroup.add(cloudsMesh);

    earthSceneRef.current = { scene, camera, renderer, earthGroup, earthMesh, cloudsMesh };

    let animationId;
    const animateEarth = () => {
      animationId = requestAnimationFrame(animateEarth);
      earthMesh.rotation.y += 0.001;
      cloudsMesh.rotation.y += 0.0002;
      renderer.render(scene, camera);
    };
    animateEarth();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      earthSceneRef.current = null;
    };
  }, [earthContainerReady]);


  return (
    <div ref={sectionRef} className="trade-animation-section active">
      {/* Background */}
      <div className="trade-anim-bg" style={{ backgroundImage: 'url(/background.png)' }}>
        <div className="trade-anim-bg-overlay" />
      </div>

      {/* Ambient Glow Effects */}
      <div className="trade-anim-ambient">
        <div className="trade-anim-glow trade-anim-glow-1" />
        <div className="trade-anim-glow trade-anim-glow-2" />
        <div className="trade-anim-glow trade-anim-glow-3" />
        <div className="trade-anim-glow trade-anim-glow-4" />
      </div>

      {/* Main Scene */}
      <div className="trade-anim-scene" style={{ perspective: '1200px' }}>
        <div ref={sceneContainerRef} className="trade-anim-scene-container">
          <div ref={shadowRef} className="trade-anim-shadow" style={{ width: size * 1.2, height: size * 1.2, marginLeft: -size * 0.6, marginTop: -size * 0.6 }} />
          <div ref={causticsRef} className="trade-anim-caustics" style={{ width: size * 1.5, height: size * 1.5, marginLeft: -size * 0.75, marginTop: -size * 0.75 }} />

          <div ref={ringsContainerRef} className="trade-anim-rings-container" style={{ opacity: 0 }}>
            <div ref={ring1Ref} className="trade-anim-ring">{createRingSegments(180, 30, 10)}</div>
            <div ref={ring2Ref} className="trade-anim-ring">{createRingSegments(200, 30, 10)}</div>
            <div ref={ring3Ref} className="trade-anim-ring">{createRingSegments(220, 30, 10)}</div>
          </div>

          <div ref={personLeftRef} className="trade-anim-person trade-anim-person-left" style={{ opacity: 0 }}>
            <img src="/female.png" alt="Buyer" className="trade-anim-person-img" />
            <div className="trade-anim-person-shadow" />
          </div>

          <div ref={personRightRef} className="trade-anim-person trade-anim-person-right" style={{ opacity: 0 }}>
            <img src="/male.png" alt="Seller" className="trade-anim-person-img" />
            <div className="trade-anim-person-shadow" />
          </div>

          <div ref={arrowRef} className="trade-anim-arrow" style={{ opacity: 0 }}>
            <svg width="100%" height="120" viewBox="0 0 1000 120" fill="none" preserveAspectRatio="xMidYMid meet">
              <path d="M 950 40 Q 500 110, 50 40" stroke="rgba(100, 200, 255, 0.6)" strokeWidth="3" fill="none" strokeDasharray="8 4" className="trade-anim-arrow-path" />
              <path d="M 50 40 L 65 35 L 65 45 Z" fill="rgba(100, 200, 255, 0.6)" className="trade-anim-arrow-head" />
            </svg>
            <div className="trade-anim-goods-container">
              <div className="trade-anim-price-tag">$100</div>
              <img src="/goods.png" alt="Goods" className="trade-anim-goods-img" />
              <div className="trade-anim-charges-tag">{buttonTexts[buttonTextIndex]}</div>
            </div>
          </div>

          <div ref={buyerAmountRef} className="trade-anim-amount trade-anim-amount-buyer" style={{ opacity: 0 }}>
            <div className="trade-anim-amount-inner trade-anim-amount-buyer-inner">
              <p className="trade-anim-amount-value" style={{ color: '#6ee7b7' }}>${totalPrice.toFixed(2)}</p>
            </div>
          </div>

          <div ref={sellerAmountRef} className="trade-anim-amount trade-anim-amount-seller" style={{ opacity: 0 }}>
            <div className="trade-anim-amount-inner trade-anim-amount-seller-inner">
              <p className="trade-anim-amount-label">$100 - $2 conversion charge</p>
              <p className="trade-anim-amount-value" style={{ color: '#6ee7b7' }}>${sellerReceives}</p>
              <p className="trade-anim-amount-inr">≈ ₹{sellerReceivesInr.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div ref={sellerHeadAmountRef} className="trade-anim-amount trade-anim-amount-seller-head" style={{ opacity: 0 }}>
            <div className="trade-anim-amount-inner trade-anim-amount-seller-head-inner">
              <p className="trade-anim-amount-label">Full Payment</p>
              <p className="trade-anim-amount-value" style={{ color: '#6ee7b7' }}>$100 = ₹{(basePrice * usdToInr).toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div ref={buyerHeadAmountRef} className="trade-anim-amount trade-anim-amount-buyer-head" style={{ opacity: 0 }}>
            <div className="trade-anim-amount-inner trade-anim-amount-buyer-head-inner">
              <p className="trade-anim-amount-label">$108.90 - $1.50 Aaziko discount</p>
              <p className="trade-anim-amount-value" style={{ color: '#6ee7b7' }}>$107.40</p>
            </div>
          </div>

          <div ref={aazikoSolutionRef} className="trade-anim-aaziko" style={{ opacity: 0 }}>
            <div className="trade-anim-aaziko-logo"><img src="/aaziko.png" alt="Aaziko" /></div>
            <svg className="trade-anim-aaziko-arrow-svg trade-anim-aaziko-arrow-right-svg" viewBox="0 0 300 80" preserveAspectRatio="none">
              <path d="M 300 70 Q 150 0, 0 40" stroke="rgba(100, 200, 150, 0.7)" strokeWidth="3" fill="none" strokeDasharray="8 4" />
              <path d="M 0 40 L 15 33 L 15 47 Z" fill="rgba(100, 200, 150, 0.7)" />
            </svg>
            <svg className="trade-anim-aaziko-arrow-svg trade-anim-aaziko-arrow-left-svg" viewBox="0 0 300 80" preserveAspectRatio="none">
              <path d="M 300 40 Q 150 0, 0 70" stroke="rgba(100, 200, 255, 0.7)" strokeWidth="3" fill="none" strokeDasharray="8 4" />
              <path d="M 0 70 L 15 63 L 15 77 Z" fill="rgba(100, 200, 255, 0.7)" />
            </svg>
          </div>

          <div
            ref={(el) => {
              cubeRef.current = el;
              earthContainerRef.current = el;
              if (el && !earthContainerReady) setEarthContainerReady(true);
            }}
            className="trade-anim-earth"
            style={{ width: size, height: size }}
          />
        </div>
      </div>

      <div className="trade-anim-bottom-gradient" />


      {/* Cards */}
      <div ref={solutionCardLeftRef} className="trade-anim-card trade-anim-solution-left" style={{ opacity: 0 }}>
        <div className="trade-anim-card-inner">
          <div className="trade-anim-card-header">
            <span className="trade-anim-card-title" style={{ color: '#67e8f9' }}>Aaziko Solutions for Buyers</span>
          </div>
          <div className="trade-anim-card-body">
            {['✓ Verified supplier profiles', '✓ Quality assurance guarantee', '✓ Document verification', '✓ Transparent pricing', '✓ Clear accountability'].map((solution, i) => (
              <div key={i} className="trade-anim-card-item trade-anim-solution-item-buyer">{solution}</div>
            ))}
          </div>
        </div>
      </div>

      <div ref={videoCardLeftRef} className="trade-anim-card trade-anim-card-left" style={{ opacity: 0 }}>
        <div className="trade-anim-card-inner">
          <div className="trade-anim-card-header">
            <span className="trade-anim-card-title" style={{ color: '#67e8f9' }}>Buyer Problems</span>
          </div>
          <div className="trade-anim-card-body">
            {['"Is this supplier real?"', '"Will quality match what I ordered?"', '"Will documents be correct?"', '"Will shipping costs change later?"', '"If something goes wrong — who is responsible?"'].map((fear, i) => (
              <div key={i} className="trade-anim-card-item">{fear}</div>
            ))}
          </div>
        </div>
      </div>

      <div ref={solutionCardRightRef} className="trade-anim-card trade-anim-solution-right" style={{ opacity: 0 }}>
        <div className="trade-anim-card-inner">
          <div className="trade-anim-card-header">
            <span className="trade-anim-card-title" style={{ color: '#6ee7b7' }}>Aaziko Solutions for Sellers</span>
          </div>
          <div className="trade-anim-card-body">
            {['✓ Guided documentation support', '✓ Optimized payment solutions', '✓ Direct buyer connections', '✓ Trust-building verification', '✓ Expert guidance at every step'].map((solution, i) => (
              <div key={i} className="trade-anim-card-item trade-anim-solution-item-seller">{solution}</div>
            ))}
          </div>
        </div>
      </div>

      <div ref={videoCardRightRef} className="trade-anim-card trade-anim-card-right" style={{ opacity: 0 }}>
        <div className="trade-anim-card-inner">
          <div className="trade-anim-card-header">
            <span className="trade-anim-card-title" style={{ color: '#6ee7b7' }}>Seller Problems</span>
          </div>
          <div className="trade-anim-card-body">
            {['"Export documentation is confusing."', '"Payments and currency conversion reduce my profit."', '"Too many middlemen and delays."', '"Buyers don\'t trust new suppliers."', '"One mistake can block future orders."'].map((fear, i) => (
              <div key={i} className="trade-anim-card-item">{fear}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default TradeAnimation3DAnimated;
