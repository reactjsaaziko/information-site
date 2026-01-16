import { useEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { gsap } from 'gsap';
import Earth3D from './Earth3D';
import StarBackground from './StarBackground';
import LightBeams from './LightBeams';
import { SCROLL_CONFIG } from '../hooks/useScrollNormalizer';

/**
 * HeroSectionAnimated - Hero section with controllable forward/reverse animations
 * 
 * Animation plays at a fixed, controlled duration regardless of scroll speed.
 * This ensures smooth, cinematic playback.
 * 
 * Exposes:
 * - playForward(): Promise<void> - Plays animation from 0% to 100%
 * - playReverse(): Promise<void> - Plays animation from 100% to 0%
 * - setProgress(0..1): Sets animation progress directly
 */

const HeroSectionAnimated = forwardRef(function HeroSectionAnimated({ 
  quality, 
  onThemeChange,
}, ref) {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const progressRef = useRef(0);
  const rafIdRef = useRef(null);
  
  // Animation state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dotSize, setDotSize] = useState(8);
  const [dotOpacity, setDotOpacity] = useState(1);
  const [earthOpacity, setEarthOpacity] = useState(0);
  const [globeScale, setGlobeScale] = useState(0.02);
  const [globeX, setGlobeX] = useState(40);
  const [scrollRotation, setScrollRotation] = useState(0);
  const [headlineOpacity, setHeadlineOpacity] = useState(0);
  const [leftTextOpacity, setLeftTextOpacity] = useState(0);
  const [leftTextY, setLeftTextY] = useState(20);
  const [headlineY, setHeadlineY] = useState(20);
  const [lightBeamsOpacity, setLightBeamsOpacity] = useState(1);
  const [bgOpacity, setBgOpacity] = useState(1);
  const [showRings, setShowRings] = useState(false);
  const [ringProgress, setRingProgress] = useState(0);
  const [fullProgress, setFullProgress] = useState(0);
  
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  const [isTablet, setIsTablet] = useState(typeof window !== 'undefined' ? window.innerWidth <= 900 && window.innerWidth > 768 : false);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width <= 900 && width > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update visual state based on progress (0 to 2)
  const updateVisuals = useCallback((progress) => {
    progressRef.current = progress;
    setFullProgress(progress);
    setScrollProgress(Math.min(progress, 1));

    if (progress <= 1) {
      const t = progress;
      const eased = t * t * (3 - 2 * t);

      // Dot to Earth transition
      if (progress < 0.05) {
        const dotProgress = progress / 0.05;
        setDotSize(8 + dotProgress * 20);
        setDotOpacity(1);
        setEarthOpacity(0);
      } else if (progress < 0.15) {
        const transitionProgress = (progress - 0.05) / 0.1;
        setDotSize(28 + transitionProgress * 20);
        setDotOpacity(1 - transitionProgress);
        setEarthOpacity(transitionProgress);
        setGlobeScale(0.02 + transitionProgress * 0.08);
      } else {
        const earthProgress = (progress - 0.15) / 0.85;
        const earthEased = earthProgress * earthProgress * (3 - 2 * earthProgress);
        setDotOpacity(0);
        setEarthOpacity(1);
        const maxScale = isMobile ? 0.35 : isTablet ? 0.45 : 0.6;
        setGlobeScale(0.1 + earthEased * (maxScale - 0.1));
      }

      setGlobeX(40 - eased * 25);
      setScrollRotation(progress * Math.PI * 3);

      // Headline visibility
      if (progress >= 0.45) {
        const headlineProgress = (progress - 0.45) / 0.45;
        const tH = Math.min(1, headlineProgress);
        const easeOut = 1 - Math.pow(1 - tH, 4);
        setHeadlineOpacity(easeOut);
        setHeadlineY(40 * (1 - easeOut));
      } else {
        setHeadlineOpacity(0);
        setHeadlineY(40);
      }

      // Left text visibility
      if (progress >= 0.15 && progress < 0.45) {
        const leftTextProgress = (progress - 0.15) / 0.2;
        const tL = Math.min(1, leftTextProgress);
        const easeOut = 1 - Math.pow(1 - tL, 4);
        setLeftTextOpacity(easeOut);
        setLeftTextY(40 * (1 - easeOut));
      } else if (progress >= 0.45) {
        const fadeOutProgress = (progress - 0.45) / 0.15;
        const tF = Math.min(1, fadeOutProgress);
        const fadeAmount = tF * tF;
        setLeftTextOpacity(Math.max(0, 1 - fadeAmount));
        setLeftTextY(-40 * fadeAmount);
      } else {
        setLeftTextOpacity(0);
        setLeftTextY(40);
      }

      if (onThemeChange) onThemeChange(false);

      // Light beams
      if (progress <= 0.3) {
        setLightBeamsOpacity(1);
      } else {
        const lightFade = Math.max(0, 1 - (progress - 0.3) / 0.5);
        setLightBeamsOpacity(lightFade);
      }
      
      setShowRings(false);
      setRingProgress(0);
    } else {
      // Phase 2: progress 1 to 2
      const phase2Progress = progress - 1;
      const shrinkProgress = Math.min(phase2Progress, 1);
      const shrinkEased = shrinkProgress * shrinkProgress * (3 - 2 * shrinkProgress);

      setDotOpacity(0);
      const maxScale = isMobile ? 0.35 : isTablet ? 0.45 : 0.6;
      const minScale = isMobile ? 0.15 : isTablet ? 0.2 : 0.2;
      setGlobeScale(maxScale - shrinkEased * (maxScale - minScale));
      setGlobeX(15 - shrinkEased * 15);
      setScrollRotation(Math.PI * 3 + phase2Progress * Math.PI * 1.5);

      const headlineFade = 1 - Math.min(phase2Progress * 2, 1);
      setHeadlineOpacity(headlineFade * headlineFade);
      setLeftTextOpacity(0);
      setEarthOpacity(1);

      // Rings
      if (phase2Progress >= 0.3) {
        setShowRings(true);
        const ringsAnimProgress = Math.min((phase2Progress - 0.3) / 0.7, 1);
        setRingProgress(ringsAnimProgress);
      } else {
        setShowRings(false);
        setRingProgress(0);
      }

      setLightBeamsOpacity(0);
    }
  }, [isMobile, isTablet, onThemeChange]);

  // Expose animation controls
  useImperativeHandle(ref, () => ({
    playForward: () => {
      return new Promise((resolve) => {
        const startProgress = progressRef.current;
        const endProgress = 2.0;
        const duration = SCROLL_CONFIG.SECTION_DURATION_MS;
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const t = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const currentProgress = startProgress + (endProgress - startProgress) * eased;
          
          updateVisuals(currentProgress);

          if (t < 1) {
            rafIdRef.current = requestAnimationFrame(animate);
          } else {
            updateVisuals(endProgress);
            resolve();
          }
        };

        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(animate);
      });
    },

    playReverse: () => {
      return new Promise((resolve) => {
        const startProgress = progressRef.current;
        const endProgress = 0;
        const duration = SCROLL_CONFIG.SECTION_REVERSE_DURATION_MS;
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const t = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const currentProgress = startProgress + (endProgress - startProgress) * eased;
          
          updateVisuals(currentProgress);

          if (t < 1) {
            rafIdRef.current = requestAnimationFrame(animate);
          } else {
            updateVisuals(endProgress);
            resolve();
          }
        };

        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(animate);
      });
    },

    setProgress: (progress) => {
      // Cancel any ongoing animation
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      // Scale 0-1 to 0-2 for internal progress
      const scaledProgress = progress * 2;
      updateVisuals(scaledProgress);
    },

    getProgress: () => progressRef.current / 2,
  }), [updateVisuals]);

  // Initialize with starting state
  useEffect(() => {
    updateVisuals(0);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [updateVisuals]);

  return (
    <div ref={containerRef} className="hero-container" style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
    }}>
      {/* Dark background */}
      <div 
        className="hero-bg-image" 
        style={{ 
          opacity: bgOpacity, 
          transition: 'opacity 0.5s ease' 
        }} 
      />
      
      <StarBackground scrollProgress={scrollProgress} earthX={globeX} fullProgress={fullProgress} />
      
      {lightBeamsOpacity > 0 && <LightBeams opacity={lightBeamsOpacity} />}

      {/* First text - "Let's make this dot united" */}
      <div
        className="hero-section"
        style={{
          opacity: leftTextOpacity,
          transform: `translateY(${leftTextY}px)`,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          zIndex: 11,
        }}
      >
        <div className="hero-content">
          <h1 className="hero-headline">
            Let's make this
            <br />
            <span style={{ color: '#67e8f9' }}>Dot united</span>
          </h1>
        </div>
      </div>

      {/* Initial dot */}
      <div
        className="initial-dot-container"
        style={{
          position: 'absolute',
          top: '50%',
          left: isMobile ? 'auto' : '50%',
          right: isMobile ? '12%' : 'auto',
          transform: isMobile 
            ? 'translateY(-50%)' 
            : isTablet 
              ? `translate(calc(-50% + ${globeX * 0.5}vw), -50%)`
              : `translate(calc(-50% + ${globeX}vw), -50%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: dotOpacity,
          pointerEvents: 'none',
          zIndex: 5,
        }}
      >
        <div
          className="initial-dot"
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(180,210,255,0.8) 40%, rgba(100,150,220,0.4) 70%, transparent 100%)',
            boxShadow: `0 0 ${dotSize * 2}px rgba(150,180,255,0.6), 0 0 ${dotSize * 4}px rgba(100,150,220,0.3)`,
          }}
        />  
        <span
          className="initial-dot-label"
          style={{
            marginTop: '12px',
            color: 'rgba(180, 210, 255, 0.9)',
            fontSize: '12px',
            fontWeight: '400',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(100, 150, 220, 0.5)',
            whiteSpace: 'nowrap',
          }}
        >
          blue dot our home
        </span>
      </div>

      {/* Globe */}
      <div
        className="globe-wrapper"
        style={{
          transform: isMobile 
            ? `translateX(${globeX * 0.8}%)` 
            : isTablet 
              ? `translateX(${globeX * 0.5}%)`
              : `translateX(${globeX}%)`,
          opacity: earthOpacity,
          pointerEvents: earthOpacity > 0.5 ? 'auto' : 'none',
          visibility: earthOpacity > 0 ? 'visible' : 'hidden',
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
        }}
      >
        <Earth3D 
          progress={globeScale} 
          scrollRotation={scrollRotation} 
          showRings={showRings}
          ringProgress={ringProgress}
        />
      </div>

      {/* Second text - Stacked tagline */}
      <div
        className="hero-section"
        style={{
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          pointerEvents: headlineOpacity > 0.5 ? 'auto' : 'none',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          zIndex: 10,
        }}
      >
        <div className="hero-content">
          <h1 className="hero-headline hero-headline--stacked">
            <span className="hero-headline__line hero-headline__line--small">by</span>
            <span className="hero-headline__line">making one planet</span>
            <span className="hero-headline__line hero-headline__line--highlight">one market</span>
          </h1>
          <p className="hero-subtext">To Grow Together</p>
          <div className="hero-ctas">
            <button className="btn btn--primary" onClick={() => window.open('https://vendor.aaziko.com', '_blank')}>Start Selling</button>
            <button className="btn btn--secondary" onClick={() => window.open('https://buyer.aaziko.com', '_blank')}>Start Buying</button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HeroSectionAnimated;
