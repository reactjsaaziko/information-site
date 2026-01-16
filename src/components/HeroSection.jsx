import { useEffect, useRef, useState } from 'react';
import Earth3D from './Earth3D';
import StarBackground from './StarBackground';
import LightBeams from './LightBeams';

export default function HeroSection({ quality, onThemeChange, onGlobeComplete }) {
  const containerRef = useRef(null);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const rafIdRef = useRef(null);
  const autoScrollRef = useRef(null);
  const isAutoScrollingRef = useRef(true);
  const globeCompleteCalledRef = useRef(false);
  const isMouseOverHeroRef = useRef(false); // Track if mouse is over hero section

  const [scrollProgress, setScrollProgress] = useState(0);
  const [dotSize, setDotSize] = useState(8);
  const [dotOpacity, setDotOpacity] = useState(1);
  const [earthOpacity, setEarthOpacity] = useState(0);
  const [globeScale, setGlobeScale] = useState(0.02);
  const [globeX, setGlobeX] = useState(40);
  const [scrollRotation, setScrollRotation] = useState(0);
  const [headlineOpacity, setHeadlineOpacity] = useState(0); // Start hidden, show when Earth is big
  const [showNav, setShowNav] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);
  const [lightBeamsOpacity, setLightBeamsOpacity] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [bgOpacity, setBgOpacity] = useState(0);
  const [showRings, setShowRings] = useState(false);
  const [ringProgress, setRingProgress] = useState(0);
  const [fullProgress, setFullProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      const delta = e.deltaY * 0.0008;
      const currentProgress = targetProgressRef.current;
      const newProgress = currentProgress + delta;
      
      // Globe animation ends at progress 2.0 (after rings animation)
      const isAtEnd = currentProgress >= 2.0;
      
      // If at the end and scrolling down, allow normal page scroll
      if (isAtEnd && delta > 0) {
        return; // Don't prevent default, let page scroll normally
      }
      
      // Only control animation if mouse is over the hero section
      if (!isMouseOverHeroRef.current) {
        return; // Let normal scroll happen
      }
      
      // Allow scrolling within the animation range (0 to 2.0)
      if (newProgress >= 0 && newProgress <= 2.0) {
        e.preventDefault();
        targetProgressRef.current = newProgress;
      }
      // If scrolling up from progress 2.0, allow going back
      else if (delta < 0 && currentProgress > 0) {
        e.preventDefault();
        targetProgressRef.current = Math.max(0, newProgress);
      }
    };
    
    // Mouse enter/leave handlers for hero section
    const handleMouseEnter = () => {
      isMouseOverHeroRef.current = true;
    };
    
    const handleMouseLeave = () => {
      isMouseOverHeroRef.current = false;
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const delta = (touchStartY - touchY) * 0.003;
      const currentProgress = targetProgressRef.current;
      const newProgress = currentProgress + delta;
      
      // Globe animation ends at progress 2.0
      const isAtEnd = currentProgress >= 2.0;
      
      // If at the end and scrolling down, allow normal page scroll
      if (isAtEnd && delta > 0) {
        touchStartY = touchY;
        return;
      }
      
      // For touch, check if touch is within hero section bounds
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const touchX = e.touches[0].clientX;
        const isTouchOverHero = touchX >= rect.left && touchX <= rect.right && 
                                 touchY >= rect.top && touchY <= rect.bottom;
        if (!isTouchOverHero) {
          touchStartY = touchY;
          return; // Let normal scroll happen
        }
      }
      
      // Allow scrolling within the animation range (0 to 2.0)
      if (newProgress >= 0 && newProgress <= 2.0) {
        e.preventDefault();
        targetProgressRef.current = newProgress;
      }
      // If scrolling up from progress 2.0, allow going back
      else if (delta < 0 && currentProgress > 0) {
        e.preventDefault();
        targetProgressRef.current = Math.max(0, newProgress);
      }
      
      touchStartY = touchY;
    };

    const animate = () => {
      rafIdRef.current = requestAnimationFrame(animate);

      const diff = targetProgressRef.current - progressRef.current;
      progressRef.current += diff * 0.15;
      const progress = progressRef.current;

      setScrollProgress(Math.min(progress, 1));
      setFullProgress(progress);

      if (progress <= 1) {
        const t = progress;
        const eased = t * t * (3 - 2 * t);

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
          setGlobeScale(0.1 + earthEased * 0.5);
        }

        setGlobeX(40 - eased * 25);
        setScrollRotation(progress * Math.PI * 3);

        // Show headline only when Earth is big (after zoom animation ~60% progress)
        if (progress >= 0.6) {
          const headlineProgress = (progress - 0.6) / 0.4; // 0.6 to 1.0 maps to 0 to 1
          setHeadlineOpacity(Math.min(1, headlineProgress * 1.5)); // Fade in
        } else {
          setHeadlineOpacity(0); // Keep hidden until Earth is big
        }
        
        setShowNav(progress > 0.2);
        setNavOpacity(progress > 0.2 ? 1 : 0);

        if (onThemeChange) onThemeChange(false);

        if (!isAutoScrollingRef.current) {
          if (progress <= 0.3) {
            setLightBeamsOpacity(1);
          } else {
            const lightFade = Math.max(0, 1 - (progress - 0.3) / 0.5);
            setLightBeamsOpacity(lightFade);
          }
        } else {
          setLightBeamsOpacity(0);
        }
      } else {
        const phase2Progress = progress - 1;
        const shrinkProgress = Math.min(phase2Progress, 1);
        const shrinkEased = shrinkProgress * shrinkProgress * (3 - 2 * shrinkProgress);

        setDotOpacity(0);
        setGlobeScale(0.6 - shrinkEased * 0.4);
        setGlobeX(15 - shrinkEased * 15);
        setScrollRotation(Math.PI * 3 + phase2Progress * Math.PI * 1.5);

        const headlineFade = 1 - Math.min(phase2Progress * 2, 1);
        setHeadlineOpacity(headlineFade * headlineFade);
        setEarthOpacity(1);
        setNavOpacity(1);
        
        // Phase 2: Show rings when scrolling continues
        if (phase2Progress >= 0.3) {
          setShowRings(true);
          const ringsAnimProgress = Math.min((phase2Progress - 0.3) / 0.7, 1);
          setRingProgress(ringsAnimProgress);
        } else {
          setShowRings(false);
          setRingProgress(0);
        }
        
        // Trigger globe complete callback when animation reaches the end
        if (progress >= 1.9 && !globeCompleteCalledRef.current) {
          globeCompleteCalledRef.current = true;
          if (onGlobeComplete) {
            onGlobeComplete();
          }
        }
        
        // Reset the flag if user scrolls back
        if (progress < 1.8) {
          globeCompleteCalledRef.current = false;
        }
        
        setLightBeamsOpacity(0);
      }
    };

    animate();

    const startAutoScroll = () => {
      const autoScrollSpeed = 0.006;
      const targetStop = 1.0;

      autoScrollRef.current = setInterval(() => {
        if (isAutoScrollingRef.current && targetProgressRef.current < targetStop) {
          targetProgressRef.current += autoScrollSpeed;
        } else {
          clearInterval(autoScrollRef.current);
          isAutoScrollingRef.current = false;
          setIsAutoScrolling(false);
          setLightBeamsOpacity(1);
          setBgOpacity(1);
        }
      }, 16);
    };

    const autoScrollTimeout = setTimeout(startAutoScroll, 500);

    const stopAutoScroll = () => {
      if (isAutoScrollingRef.current) {
        isAutoScrollingRef.current = false;
        setIsAutoScrolling(false);
        if (autoScrollRef.current) {
          clearInterval(autoScrollRef.current);
        }
        setLightBeamsOpacity(1);
        setBgOpacity(1);
      }
    };

    // Handle scroll position for transitioning back from static sections
    const handleScroll = () => {
      // No special handling needed - mouse position controls animation
    };

    // Use window for scroll events so they work even when other sections are visible
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('wheel', stopAutoScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchstart', stopAutoScroll, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Add mouse enter/leave listeners to the container
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
      clearTimeout(autoScrollTimeout);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('wheel', stopAutoScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchstart', stopAutoScroll);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [onThemeChange, onGlobeComplete]);

  return (
    <div ref={containerRef} className="hero-container" style={{
      pointerEvents: 'auto',
      position: 'fixed'
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

      <div
        className="initial-dot"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${globeX}vw), -50%)`,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(180,210,255,0.8) 40%, rgba(100,150,220,0.4) 70%, transparent 100%)',
          boxShadow: `0 0 ${dotSize * 2}px rgba(150,180,255,0.6), 0 0 ${dotSize * 4}px rgba(100,150,220,0.3)`,
          opacity: dotOpacity,
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      <div
        className="globe-wrapper"
        style={{
          transform: `translateX(${globeX}%)`,
          opacity: earthOpacity,
          pointerEvents: earthOpacity > 0.5 ? 'auto' : 'none',
          visibility: earthOpacity > 0 ? 'visible' : 'hidden',
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
        }}
      >
        <Earth3D 
          progress={globeScale} 
          scrollRotation={scrollRotation} 
          showRings={showRings}
          ringProgress={ringProgress}
        />
      </div>

      <div
        className="hero-section"
        style={{
          opacity: headlineOpacity,
          pointerEvents: headlineOpacity > 0.5 ? 'auto' : 'none',
        }}
      >
        <div className="hero-content">
          <h1 className="hero-headline">Make Planet One Market.</h1>
          <p className="hero-subtext">Buy and sell globally with ease, transparency, and trust.</p>
          <div className="hero-ctas">
            <button className="btn btn--primary">Start Selling</button>
            <button className="btn btn--secondary">Start Buying</button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {headlineOpacity > 0.8 && (
        <div className="scroll-indicator" style={{ opacity: headlineOpacity }}>
          <div className="scroll-indicator__text">Scroll to explore</div>
          <div className="scroll-indicator__arrow">↓</div>
        </div>
      )}

      {quality && (
        <style>{`.nav { opacity: ${navOpacity}; transition: opacity 0.3s ease; pointer-events: ${showNav ? 'auto' : 'none'}; }`}</style>
      )}
    </div>
  );
}
