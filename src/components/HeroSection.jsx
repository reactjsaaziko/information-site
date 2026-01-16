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
  const returnLockRef = useRef(false); // Lock to prevent animation until hero is fully visible

  const [scrollProgress, setScrollProgress] = useState(0);
  const [dotSize, setDotSize] = useState(8);
  const [dotOpacity, setDotOpacity] = useState(1);
  const [earthOpacity, setEarthOpacity] = useState(0);
  const [globeScale, setGlobeScale] = useState(0.02);
  const [globeX, setGlobeX] = useState(40);
  const [scrollRotation, setScrollRotation] = useState(0);
  const [headlineOpacity, setHeadlineOpacity] = useState(0); // Start hidden, show when Earth is big
  const [leftTextOpacity, setLeftTextOpacity] = useState(0); // Left text appears before main headline
  const [leftTextY, setLeftTextY] = useState(20); // Y position for slide animation
  const [headlineY, setHeadlineY] = useState(20); // Y position for slide animation
  const [showNav, setShowNav] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);
  const [lightBeamsOpacity, setLightBeamsOpacity] = useState(1); // Show lights immediately on page load
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [bgOpacity, setBgOpacity] = useState(1); // Show background immediately on page load
  const [showRings, setShowRings] = useState(false);
  const [ringProgress, setRingProgress] = useState(0);
  const [fullProgress, setFullProgress] = useState(0);
  const [isReadyToAnimate, setIsReadyToAnimate] = useState(false); // Block animation until delay passes
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  const [isTablet, setIsTablet] = useState(typeof window !== 'undefined' ? window.innerWidth <= 900 && window.innerWidth > 768 : false);
  const [isReturningFromBelow, setIsReturningFromBelow] = useState(false); // Track if user is returning from sections below

  // Handle resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width <= 900 && width > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Block all animation control until delay passes
      if (!isReadyToAnimate) {
        return; // Don't allow any animation control yet
      }
      
      const delta = e.deltaY * 0.0006; // Reduced for smoother scrolling
      const currentProgress = targetProgressRef.current;
      const newProgress = currentProgress + delta;
      
      // Globe animation ends at progress 2.0 (after rings animation)
      const isAtEnd = currentProgress >= 2.0;
      
      // If at the end and scrolling down, allow normal page scroll
      if (isAtEnd && delta > 0) {
        return; // Don't prevent default, let page scroll normally
      }
      
      // Check if we're returning from sections below (scrolling up when hero was hidden)
      // When returning, first show hero at full state, then allow animation on next scroll
      if (isReturningFromBelow && returnLockRef.current) {
        // Hero is now visible, wait for one more scroll up to start animation
        if (delta < 0) {
          e.preventDefault();
          returnLockRef.current = false; // Unlock animation for next scroll
          return;
        }
      }
      
      // Only control animation if mouse is over the hero section
      if (!isMouseOverHeroRef.current) {
        return; // Let normal scroll happen
      }
      
      // Allow scrolling within the animation range (0 to 2.0)
      if (newProgress >= 0 && newProgress <= 2.0) {
        e.preventDefault();
        targetProgressRef.current = newProgress;
        // Reset return state once animation starts
        if (isReturningFromBelow && !returnLockRef.current) {
          setIsReturningFromBelow(false);
        }
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
      // Block all animation control until delay passes
      if (!isReadyToAnimate) {
        touchStartY = e.touches[0].clientY;
        return; // Don't allow any animation control yet
      }
      
      const touchY = e.touches[0].clientY;
      const delta = (touchStartY - touchY) * 0.002; // Reduced for smoother touch scrolling
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
      progressRef.current += diff * 0.12; // Increased for smoother response
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
          // Limit max scale on mobile to prevent clipping
          const maxScale = isMobile ? 0.35 : isTablet ? 0.45 : 0.6;
          setGlobeScale(0.1 + earthEased * (maxScale - 0.1));
        }

        setGlobeX(40 - eased * 25);
        setScrollRotation(progress * Math.PI * 3);

        // Show headline only when Earth is big (after zoom animation ~45% progress)
        // Start slightly earlier for smoother crossfade
        if (progress >= 0.45) {
          const headlineProgress = (progress - 0.45) / 0.45; // 0.45 to 0.9 maps to 0 to 1 (slower)
          // Use smoother easeOutQuart for gentle arrival
          const t = Math.min(1, headlineProgress);
          const easeOut = 1 - Math.pow(1 - t, 4);
          setHeadlineOpacity(easeOut);
          // Slide up from 40px to 0px (larger distance for smoother feel)
          setHeadlineY(40 * (1 - easeOut));
        } else {
          setHeadlineOpacity(0); // Keep hidden until Earth is big
          setHeadlineY(40);
        }

        // Show left text earlier (at ~15% progress) and fade out when main headline appears (at 45%)
        // Smooth crossfade with overlapping timing
        if (progress >= 0.15 && progress < 0.45) {
          const leftTextProgress = (progress - 0.15) / 0.2; // 0.15 to 0.35 maps to 0 to 1 (slower fade in)
          // Use smoother easeOutQuart for gentle arrival
          const t = Math.min(1, leftTextProgress);
          const easeOut = 1 - Math.pow(1 - t, 4);
          setLeftTextOpacity(easeOut);
          // Slide up from 40px to 0px (larger distance for smoother feel)
          setLeftTextY(40 * (1 - easeOut));
        } else if (progress >= 0.45) {
          // Fade out quickly as headline fades in
          const fadeOutProgress = (progress - 0.45) / 0.15; // 0.45 to 0.6 fade out
          // Use easeInQuad for smooth fade out
          const t = Math.min(1, fadeOutProgress);
          const fadeAmount = t * t;
          setLeftTextOpacity(Math.max(0, 1 - fadeAmount));
          // Slide up from 0px to -40px as it fades out
          setLeftTextY(-40 * fadeAmount);
        } else {
          setLeftTextOpacity(0); // Keep hidden initially
          setLeftTextY(40);
        }
        
        setShowNav(progress > 0.2);
        setNavOpacity(progress > 0.2 ? 1 : 0);

        if (onThemeChange) onThemeChange(false);

        // Show lights when progress is low (initial state or minor scroll)
        if (progress <= 0.3) {
          setLightBeamsOpacity(1);
        } else {
          const lightFade = Math.max(0, 1 - (progress - 0.3) / 0.5);
          setLightBeamsOpacity(lightFade);
        }
      } else {
        const phase2Progress = progress - 1;
        const shrinkProgress = Math.min(phase2Progress, 1);
        const shrinkEased = shrinkProgress * shrinkProgress * (3 - 2 * shrinkProgress);

        setDotOpacity(0);
        // Limit max scale on mobile to prevent clipping
        const maxScale = isMobile ? 0.35 : isTablet ? 0.45 : 0.6;
        const minScale = isMobile ? 0.15 : isTablet ? 0.2 : 0.2;
        setGlobeScale(maxScale - shrinkEased * (maxScale - minScale));
        setGlobeX(15 - shrinkEased * 15);
        setScrollRotation(Math.PI * 3 + phase2Progress * Math.PI * 1.5);

        const headlineFade = 1 - Math.min(phase2Progress * 2, 1);
        setHeadlineOpacity(headlineFade * headlineFade);
        setLeftTextOpacity(0); // Hide left text in phase 2
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

    // 1.5-second delay before auto-animation starts after page refresh (70% reduction from 5s)
    const autoScrollTimeout = setTimeout(() => {
      setIsReadyToAnimate(true); // Now allow user scroll control too
      startAutoScroll();
    }, 1500);

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
      const scrollY = window.scrollY;
      
      // Detect when user is scrolling back to the top (returning from sections below)
      // Only show hero and allow animation when page is scrolled to the very top
      if (scrollY <= 5) {
        // Page is at the top - hero should be fully visible
        if (progressRef.current >= 1.9 && !isReturningFromBelow) {
          setIsReturningFromBelow(true);
          returnLockRef.current = true;
          // Keep hero at end state initially - user needs to scroll up again to reverse animation
          targetProgressRef.current = 2.0;
          progressRef.current = 2.0;
        }
      } else if (scrollY > 50) {
        // Page is scrolled down - hero should be hidden if animation was complete
        if (progressRef.current >= 1.9) {
          setIsReturningFromBelow(false);
          returnLockRef.current = false;
        }
      }
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
  }, [onThemeChange, onGlobeComplete, isReadyToAnimate, isReturningFromBelow, fullProgress]);

  // Calculate if hero should be visible based on scroll position and progress
  const shouldHideHero = fullProgress >= 2.0 && !isReturningFromBelow;

  return (
    <div ref={containerRef} className="hero-container" style={{
      pointerEvents: shouldHideHero ? 'none' : 'auto',
      position: 'fixed',
      opacity: shouldHideHero ? 0 : 1,
      transition: 'opacity 0.3s ease-out',
      zIndex: shouldHideHero ? -1 : 10
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

      {/* First text - "Let's make this dot united" - appears first */}
      <div
        className="hero-section"
        style={{
          opacity: leftTextOpacity,
          transform: `translateY(${leftTextY}px)`,
          pointerEvents: 'none',
          transition: 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
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

      <div
        className="initial-dot-container"
        style={{
          position: 'fixed',
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

      {/* Second text - Stacked tagline - appears after first text fades */}
      <div
        className="hero-section"
        style={{
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          pointerEvents: headlineOpacity > 0.5 ? 'auto' : 'none',
          transition: 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
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
