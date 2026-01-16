import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';
import HeroSectionAnimated from './HeroSectionAnimated';
import TradeAnimation3DAnimated from './TradeAnimation3DAnimated';
import { normalizeWheelDelta, lerp, clamp, SCROLL_CONFIG } from '../hooks/useScrollNormalizer';

/**
 * ThreeHeroWrapper - Manages scroll-driven animation for two fullscreen Three.js sections
 * 
 * SCROLL BEHAVIOR (SCRUB MODE):
 * - Animation progress is directly tied to scroll input
 * - When user scrolls, animation progresses
 * - When user stops scrolling, animation stops
 * - Smooth interpolation for fluid feel
 * - Works with trackpad, mouse wheel, and touch
 * 
 * Progress ranges:
 * - 0.0 to 0.5: Section 1 animation (Hero with Globe)
 * - 0.5: Transition point between sections
 * - 0.5 to 1.0: Section 2 animation (Trade Animation)
 * - 1.0: Complete, unlock static content
 */

// Scrub configuration
const SCRUB_CONFIG = {
  // How much scroll delta maps to progress change (lower = slower animation)
  SCROLL_SENSITIVITY: SCROLL_CONFIG.SCRUB_SENSITIVITY || 0.0004,
  // Smoothing factor for lerp (lower = smoother but more lag)
  SMOOTHING: SCROLL_CONFIG.SMOOTHING_FACTOR || 0.12,
  // Minimum progress change to trigger update
  MIN_DELTA: 0.0001,
  // Progress threshold to trigger section transition
  SECTION_TRANSITION_POINT: 0.5,
  // Progress threshold to complete and unlock static content
  COMPLETION_THRESHOLD: 0.98,
};

const ThreeHeroWrapper = forwardRef(function ThreeHeroWrapper({ 
  quality, 
  onThemeChange, 
  onComplete,
  reducedMotion = false,
}, ref) {
  const wrapperRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section1ContainerRef = useRef(null);
  const section2ContainerRef = useRef(null);
  
  // Progress state (0 to 1)
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef(null);
  
  const [activeSection, setActiveSection] = useState(1);
  const [isLocked, setIsLocked] = useState(true);
  const [showSection2, setShowSection2] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  // Touch tracking
  const touchStartRef = useRef({ y: 0, time: 0 });
  const lastTouchYRef = useRef(0);

  useImperativeHandle(ref, () => ({
    getProgress: () => currentProgressRef.current,
    isLocked: () => isLocked,
    isComplete: () => isComplete,
  }), [isLocked, isComplete]);

  // Handle reduced motion preference
  useEffect(() => {
    if (reducedMotion) {
      setActiveSection(2);
      setIsLocked(false);
      setShowSection2(true);
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  }, [reducedMotion, onComplete]);

  // Update section visuals based on progress
  const updateSectionProgress = useCallback((progress) => {
    const clampedProgress = clamp(progress, 0, 1);
    
    // Section 1: 0 to 0.5 progress
    if (clampedProgress <= SCRUB_CONFIG.SECTION_TRANSITION_POINT) {
      const section1Progress = clampedProgress / SCRUB_CONFIG.SECTION_TRANSITION_POINT;
      if (section1Ref.current?.setProgress) {
        section1Ref.current.setProgress(section1Progress);
      }
      
      // Handle section transition
      if (activeSection !== 1) {
        setActiveSection(1);
      }
      
      // Fade out section 1 near transition point
      if (section1ContainerRef.current) {
        const fadeStart = 0.4;
        if (clampedProgress > fadeStart) {
          const fadeProgress = (clampedProgress - fadeStart) / (SCRUB_CONFIG.SECTION_TRANSITION_POINT - fadeStart);
          section1ContainerRef.current.style.opacity = 1 - fadeProgress * 0.3;
        } else {
          section1ContainerRef.current.style.opacity = 1;
        }
      }
    }
    
    // Section 2: 0.5 to 1.0 progress
    if (clampedProgress >= SCRUB_CONFIG.SECTION_TRANSITION_POINT * 0.9) {
      // Show section 2 slightly before transition point
      if (!showSection2 && clampedProgress >= SCRUB_CONFIG.SECTION_TRANSITION_POINT * 0.95) {
        setShowSection2(true);
      }
      
      if (clampedProgress >= SCRUB_CONFIG.SECTION_TRANSITION_POINT) {
        const section2Progress = (clampedProgress - SCRUB_CONFIG.SECTION_TRANSITION_POINT) / (1 - SCRUB_CONFIG.SECTION_TRANSITION_POINT);
        if (section2Ref.current?.setProgress) {
          section2Ref.current.setProgress(section2Progress);
        }
        
        // Handle section transition
        if (activeSection !== 2 && clampedProgress > SCRUB_CONFIG.SECTION_TRANSITION_POINT + 0.02) {
          setActiveSection(2);
        }
        
        // Fade in section 2
        if (section2ContainerRef.current) {
          const fadeInProgress = Math.min(1, (clampedProgress - SCRUB_CONFIG.SECTION_TRANSITION_POINT) / 0.1);
          section2ContainerRef.current.style.opacity = fadeInProgress;
        }
      }
    }
    
    // Check for completion - start fade out animation before unlocking
    if (clampedProgress >= SCRUB_CONFIG.COMPLETION_THRESHOLD && !isComplete && !isFadingOut) {
      // Start fade out animation
      setIsFadingOut(true);
      
      // Delay the actual completion to allow fade animation
      setTimeout(() => {
        setIsComplete(true);
        setIsLocked(false);
        if (onComplete) onComplete();
      }, 600); // 600ms fade out duration
    } else if (clampedProgress < SCRUB_CONFIG.COMPLETION_THRESHOLD - 0.05 && (isComplete || isFadingOut)) {
      // Reset if user scrolls back up significantly
      setIsComplete(false);
      setIsFadingOut(false);
      setIsLocked(true);
    }
    
    setDisplayProgress(clampedProgress);
  }, [activeSection, showSection2, isComplete, isFadingOut, onComplete]);

  // Animation loop for smooth interpolation
  useEffect(() => {
    if (reducedMotion) return;
    
    const animate = () => {
      const current = currentProgressRef.current;
      const target = targetProgressRef.current;
      
      // Lerp towards target
      const newProgress = lerp(current, target, SCRUB_CONFIG.SMOOTHING);
      
      // Only update if there's meaningful change
      if (Math.abs(newProgress - current) > SCRUB_CONFIG.MIN_DELTA) {
        currentProgressRef.current = newProgress;
        updateSectionProgress(newProgress);
      }
      
      rafIdRef.current = requestAnimationFrame(animate);
    };
    
    rafIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [reducedMotion, updateSectionProgress]);

  // Handle wheel scroll
  const handleWheel = useCallback((e) => {
    if (reducedMotion) return;
    
    // If complete and scrolling down, allow normal page scroll
    if (isComplete && e.deltaY > 0) {
      return;
    }
    
    // If at top of page and scrolling up while complete, re-lock
    if (isComplete && e.deltaY < 0 && window.scrollY <= 5) {
      e.preventDefault();
      // Allow scrolling back up through the animation
      const normalizedDelta = normalizeWheelDelta(e.deltaY, e.deltaMode);
      const progressDelta = normalizedDelta * SCRUB_CONFIG.SCROLL_SENSITIVITY;
      targetProgressRef.current = clamp(targetProgressRef.current + progressDelta, 0, 1);
      return;
    }
    
    // If locked, handle scroll-driven animation
    if (isLocked) {
      e.preventDefault();
      
      const normalizedDelta = normalizeWheelDelta(e.deltaY, e.deltaMode);
      const progressDelta = normalizedDelta * SCRUB_CONFIG.SCROLL_SENSITIVITY;
      
      targetProgressRef.current = clamp(targetProgressRef.current + progressDelta, 0, 1);
    }
  }, [reducedMotion, isComplete, isLocked]);

  // Handle touch start
  const handleTouchStart = useCallback((e) => {
    if (reducedMotion) return;
    
    touchStartRef.current = {
      y: e.touches[0].clientY,
      time: Date.now(),
    };
    lastTouchYRef.current = e.touches[0].clientY;
  }, [reducedMotion]);

  // Handle touch move
  const handleTouchMove = useCallback((e) => {
    if (reducedMotion) return;
    
    const touchY = e.touches[0].clientY;
    const deltaY = lastTouchYRef.current - touchY; // Inverted for natural scroll feel
    lastTouchYRef.current = touchY;
    
    // If complete and scrolling down, allow normal page scroll
    if (isComplete && deltaY > 0) {
      return;
    }
    
    // If at top of page and scrolling up while complete
    if (isComplete && deltaY < 0 && window.scrollY <= 5) {
      e.preventDefault();
      const progressDelta = deltaY * SCRUB_CONFIG.SCROLL_SENSITIVITY * 2; // Touch needs more sensitivity
      targetProgressRef.current = clamp(targetProgressRef.current + progressDelta, 0, 1);
      return;
    }
    
    // If locked, handle scroll-driven animation
    if (isLocked) {
      e.preventDefault();
      
      const progressDelta = deltaY * SCRUB_CONFIG.SCROLL_SENSITIVITY * 2;
      targetProgressRef.current = clamp(targetProgressRef.current + progressDelta, 0, 1);
    }
  }, [reducedMotion, isComplete, isLocked]);

  // Attach event listeners
  useEffect(() => {
    if (reducedMotion) return;

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, reducedMotion]);

  const getSection1Style = () => {
    const isActive = activeSection === 1;
    const isVisible = isActive || displayProgress < SCRUB_CONFIG.SECTION_TRANSITION_POINT + 0.1;
    
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      visibility: isVisible ? 'visible' : 'hidden',
      pointerEvents: isActive ? 'auto' : 'none',
      zIndex: isActive ? 2 : 1,
      willChange: 'opacity, transform',
      backfaceVisibility: 'hidden',
      transform: 'translateZ(0)',
    };
  };

  const getSection2Style = () => {
    const isActive = activeSection === 2;
    const isVisible = showSection2;
    
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      opacity: 0,
      visibility: isVisible ? 'visible' : 'hidden',
      pointerEvents: isActive ? 'auto' : 'none',
      zIndex: isActive ? 2 : 1,
      willChange: 'opacity, transform',
      backfaceVisibility: 'hidden',
      transform: 'translateZ(0)',
    };
  };

  return (
    <div 
      ref={wrapperRef}
      className={`three-hero-wrapper ${isFadingOut ? 'fading-out' : ''}`}
      style={{
        position: isLocked ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: isLocked ? '100vh' : 'auto',
        zIndex: isLocked ? 100 : 1,
        overflow: 'hidden',
        // IMPORTANT: Solid dark background to prevent static content from showing through
        backgroundColor: '#080c14',
        // Fade out animation when completing
        opacity: isFadingOut ? 0 : 1,
        transition: isFadingOut ? 'opacity 0.6s ease-out' : 'none',
      }}
    >
      {/* Dark background overlay - ensures no content shows through during transitions */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#080c14',
          zIndex: 0,
        }}
      />

      {/* Section 1: Hero with Globe */}
      <div 
        ref={section1ContainerRef}
        className="three-section three-section-1"
        style={getSection1Style()}
      >
        <HeroSectionAnimated
          ref={section1Ref}
          quality={quality}
          onThemeChange={onThemeChange}
        />
      </div>

      {/* Section 2: Trade Animation */}
      {showSection2 && (
        <div 
          ref={section2ContainerRef}
          className="three-section three-section-2"
          style={getSection2Style()}
        >
          <TradeAnimation3DAnimated
            ref={section2Ref}
          />
        </div>
      )}

      {/* Scroll indicator */}
      {isLocked && displayProgress < 0.1 && (
        <div 
          className="scroll-indicator-wrapper"
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            opacity: 0.8 - displayProgress * 8,
            animation: 'bounce 2s infinite',
          }}
        >
          <div style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '14px',
            textAlign: 'center',
          }}>
            <span>Scroll to explore</span>
            <div style={{ marginTop: '8px', fontSize: '20px' }}>↓</div>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      {isLocked && (
        <div 
          className="progress-indicator"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            opacity: 0.5,
          }}
        >
          <div style={{
            width: '100px',
            height: '3px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div 
              style={{
                width: `${displayProgress * 100}%`,
                height: '100%',
                background: 'rgba(103, 232, 249, 0.8)',
                borderRadius: '2px',
                transition: 'width 0.1s ease-out',
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
        
        .three-section {
          transition: visibility 0s;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .three-section {
            transition: opacity 0.15s ease !important;
          }
          
          .scroll-indicator-wrapper {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
});

export default ThreeHeroWrapper;
