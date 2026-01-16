import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';
import HeroSectionAnimated from './HeroSectionAnimated';
import TradeAnimation3DAnimated from './TradeAnimation3DAnimated';
import { normalizeWheelDelta, SCROLL_CONFIG } from '../hooks/useScrollNormalizer';

/**
 * ThreeHeroWrapper - Manages the scroll sequence for two fullscreen Three.js sections
 * with smooth transitions between sections.
 * 
 * SCROLL BEHAVIOR (SCRUB MODE):
 * - Animation progress is directly tied to scroll position
 * - Scroll delta controls animation progress (scrub)
 * - Smooth interpolation for fluid animation
 * - Section 1 plays from 0-100%, then transitions to Section 2
 * - Section 2 plays from 0-100%, then unlocks static content
 */

const SCROLL_STATES = {
  S1_SCRUBBING: 'S1_SCRUBBING',
  S1_TRANSITION_TO_S2: 'S1_TRANSITION_TO_S2',
  S2_SCRUBBING: 'S2_SCRUBBING',
  S2_COMPLETE: 'S2_COMPLETE',
  STATIC_TRANSITION_TO_S2: 'STATIC_TRANSITION_TO_S2',
};

// Transition configuration
const TRANSITION_CONFIG = {
  duration: SCROLL_CONFIG.TRANSITION_DURATION_MS / 1000,
  ease: 'power2.inOut',
  scale: { from: 0.98, to: 1 },
  blur: { from: 6, to: 0 },
};

// Scroll scrub configuration
const SCRUB_CONFIG = {
  // How much scroll delta maps to progress (lower = more scroll needed)
  SCROLL_SENSITIVITY: 0.0008,
  // Smoothing factor for lerp (0-1, lower = smoother)
  SMOOTHING_FACTOR: 0.12,
  // Threshold to trigger section transition
  SECTION_COMPLETE_THRESHOLD: 0.98,
};

const ThreeHeroWrapper = forwardRef(function ThreeHeroWrapper({ 
  quality, 
  onThemeChange, 
  onComplete,
  onReturn,
  reducedMotion = false,
}, ref) {
  const wrapperRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section1ContainerRef = useRef(null);
  const section2ContainerRef = useRef(null);
  const transitionTimelineRef = useRef(null);
  
  const [state, setState] = useState(SCROLL_STATES.S1_SCRUBBING);
  const [activeSection, setActiveSection] = useState(1);
  const [isLocked, setIsLocked] = useState(true);
  const [showSection2, setShowSection2] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Scrub progress refs
  const section1ProgressRef = useRef(0);
  const section2ProgressRef = useRef(0);
  const targetSection1ProgressRef = useRef(0);
  const targetSection2ProgressRef = useRef(0);
  const rafIdRef = useRef(null);
  
  const stateRef = useRef(state);
  const touchStartRef = useRef({ y: 0, time: 0 });

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useImperativeHandle(ref, () => ({
    getState: () => stateRef.current,
    isLocked: () => isLocked,
    isTransitioning: () => isTransitioning,
  }), [isLocked, isTransitioning]);

  useEffect(() => {
    if (reducedMotion) {
      setState(SCROLL_STATES.S2_COMPLETE);
      setActiveSection(2);
      setIsLocked(false);
      setShowSection2(true);
      if (onComplete) onComplete();
    }
  }, [reducedMotion, onComplete]);

  // Smooth animation loop for scrubbing
  useEffect(() => {
    const animate = () => {
      rafIdRef.current = requestAnimationFrame(animate);
      
      const currentState = stateRef.current;
      
      // Lerp section 1 progress
      const s1Diff = targetSection1ProgressRef.current - section1ProgressRef.current;
      if (Math.abs(s1Diff) > 0.001) {
        section1ProgressRef.current += s1Diff * SCRUB_CONFIG.SMOOTHING_FACTOR;
        if (section1Ref.current?.setProgress) {
          section1Ref.current.setProgress(section1ProgressRef.current);
        }
      }
      
      // Lerp section 2 progress
      const s2Diff = targetSection2ProgressRef.current - section2ProgressRef.current;
      if (Math.abs(s2Diff) > 0.001) {
        section2ProgressRef.current += s2Diff * SCRUB_CONFIG.SMOOTHING_FACTOR;
        if (section2Ref.current?.setProgress) {
          section2Ref.current.setProgress(section2ProgressRef.current);
        }
      }
      
      // Check for section transitions
      if (currentState === SCROLL_STATES.S1_SCRUBBING && 
          section1ProgressRef.current >= SCRUB_CONFIG.SECTION_COMPLETE_THRESHOLD &&
          targetSection1ProgressRef.current >= 1) {
        transitionToSection2();
      }
      
      if (currentState === SCROLL_STATES.S2_SCRUBBING &&
          section2ProgressRef.current >= SCRUB_CONFIG.SECTION_COMPLETE_THRESHOLD &&
          targetSection2ProgressRef.current >= 1) {
        completeAnimation();
      }
    };
    
    rafIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const runTransition = useCallback(async (fromRef, toRef, direction = 'forward') => {
    if (reducedMotion) {
      return Promise.resolve();
    }

    setIsTransitioning(true);

    return new Promise((resolve) => {
      if (transitionTimelineRef.current) {
        transitionTimelineRef.current.kill();
      }

      const duration = TRANSITION_CONFIG.duration;
      const tl = gsap.timeline({
        onComplete: () => {
          setIsTransitioning(false);
          resolve();
        },
      });
      transitionTimelineRef.current = tl;

      const fromEl = fromRef?.current;
      const toEl = toRef?.current;

      if (fromEl) {
        tl.to(fromEl, {
          opacity: 0,
          scale: TRANSITION_CONFIG.scale.from,
          filter: `blur(${TRANSITION_CONFIG.blur.from}px)`,
          duration: duration * 0.5,
          ease: 'power2.in',
        }, 0);
      }

      if (toEl) {
        gsap.set(toEl, {
          opacity: 0,
          scale: TRANSITION_CONFIG.scale.from,
          filter: `blur(${TRANSITION_CONFIG.blur.from}px)`,
          visibility: 'visible',
        });

        tl.to(toEl, {
          opacity: 1,
          scale: TRANSITION_CONFIG.scale.to,
          filter: `blur(${TRANSITION_CONFIG.blur.to}px)`,
          duration: duration * 0.5,
          ease: 'power2.out',
        }, duration * 0.35);
      }
    });
  }, [reducedMotion]);

  const transitionToSection2 = useCallback(async () => {
    if (stateRef.current === SCROLL_STATES.S1_TRANSITION_TO_S2) return;
    
    setState(SCROLL_STATES.S1_TRANSITION_TO_S2);
    setShowSection2(true);
    
    await new Promise(r => requestAnimationFrame(r));
    await new Promise(r => setTimeout(r, 50));
    
    await runTransition(section1ContainerRef, section2ContainerRef, 'forward');
    
    setActiveSection(2);
    targetSection2ProgressRef.current = 0;
    section2ProgressRef.current = 0;
    setState(SCROLL_STATES.S2_SCRUBBING);
  }, [runTransition]);

  const transitionToSection1 = useCallback(async () => {
    if (stateRef.current === SCROLL_STATES.S1_TRANSITION_TO_S2) return;
    
    setState(SCROLL_STATES.S1_TRANSITION_TO_S2);
    
    await runTransition(section2ContainerRef, section1ContainerRef, 'reverse');
    
    setActiveSection(1);
    setShowSection2(false);
    targetSection1ProgressRef.current = 1;
    section1ProgressRef.current = 1;
    setState(SCROLL_STATES.S1_SCRUBBING);
  }, [runTransition]);

  const completeAnimation = useCallback(() => {
    setState(SCROLL_STATES.S2_COMPLETE);
    setIsLocked(false);
    if (onComplete) onComplete();
  }, [onComplete]);

  const handleReturnFromStatic = useCallback(async () => {
    if (isTransitioning) return;
    
    // Notify parent that we're returning to animation
    if (onReturn) onReturn();
    
    // First, scroll to top immediately
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    setState(SCROLL_STATES.STATIC_TRANSITION_TO_S2);
    setIsLocked(true);
    
    await new Promise(r => setTimeout(r, reducedMotion ? 0 : 50));
    
    // Reset section 2 to end state and allow scrubbing back
    targetSection2ProgressRef.current = 1;
    section2ProgressRef.current = 1;
    
    // Make sure section 2 is visible and at end state
    if (section2Ref.current?.setProgress) {
      section2Ref.current.setProgress(1);
    }
    
    await new Promise(r => requestAnimationFrame(r));
    
    setState(SCROLL_STATES.S2_SCRUBBING);
  }, [reducedMotion, isTransitioning, onReturn]);

  // Handle scroll/wheel events for scrubbing
  const handleWheel = useCallback((e) => {
    if (reducedMotion) return;
    
    const currentState = stateRef.current;
    
    // If transitioning, ignore scroll
    if (currentState === SCROLL_STATES.S1_TRANSITION_TO_S2 || 
        currentState === SCROLL_STATES.STATIC_TRANSITION_TO_S2 ||
        isTransitioning) {
      e.preventDefault();
      return;
    }
    
    // If complete and scrolling down, allow normal scroll
    if (currentState === SCROLL_STATES.S2_COMPLETE && e.deltaY > 0) {
      return;
    }
    
    // If complete and scrolling up at top, return to animation
    if (currentState === SCROLL_STATES.S2_COMPLETE && e.deltaY < 0 && window.scrollY <= 150) {
      e.preventDefault();
      handleReturnFromStatic();
      return;
    }
    
    // Scrubbing in section 1
    if (currentState === SCROLL_STATES.S1_SCRUBBING) {
      e.preventDefault();
      
      const normalizedDelta = normalizeWheelDelta(e.deltaY, e.deltaMode);
      const progressDelta = normalizedDelta * SCRUB_CONFIG.SCROLL_SENSITIVITY;
      
      targetSection1ProgressRef.current = Math.max(0, Math.min(1, 
        targetSection1ProgressRef.current + progressDelta
      ));
      return;
    }
    
    // Scrubbing in section 2
    if (currentState === SCROLL_STATES.S2_SCRUBBING) {
      e.preventDefault();
      
      const normalizedDelta = normalizeWheelDelta(e.deltaY, e.deltaMode);
      const progressDelta = normalizedDelta * SCRUB_CONFIG.SCROLL_SENSITIVITY;
      
      const newProgress = targetSection2ProgressRef.current + progressDelta;
      
      // If scrolling back past 0, transition to section 1
      if (newProgress < 0) {
        transitionToSection1();
        return;
      }
      
      targetSection2ProgressRef.current = Math.max(0, Math.min(1, newProgress));
      return;
    }
  }, [reducedMotion, isTransitioning, handleReturnFromStatic, transitionToSection1]);

  // Touch handlers
  const handleTouchStart = useCallback((e) => {
    if (reducedMotion) return;
    touchStartRef.current = {
      y: e.touches[0].clientY,
      time: Date.now(),
    };
  }, [reducedMotion]);

  const handleTouchMove = useCallback((e) => {
    if (reducedMotion) return;
    
    const currentState = stateRef.current;
    
    if (currentState === SCROLL_STATES.S1_TRANSITION_TO_S2 || 
        currentState === SCROLL_STATES.STATIC_TRANSITION_TO_S2 ||
        isTransitioning) {
      e.preventDefault();
      return;
    }
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartRef.current.y - touchY;
    
    // If complete and swiping down, allow normal scroll
    if (currentState === SCROLL_STATES.S2_COMPLETE && deltaY > 0) {
      touchStartRef.current.y = touchY;
      return;
    }
    
    // If complete and swiping up at top, return to animation
    if (currentState === SCROLL_STATES.S2_COMPLETE && deltaY < -30 && window.scrollY <= 150) {
      e.preventDefault();
      handleReturnFromStatic();
      touchStartRef.current.y = touchY;
      return;
    }
    
    // Scrubbing in section 1
    if (currentState === SCROLL_STATES.S1_SCRUBBING) {
      e.preventDefault();
      
      const progressDelta = deltaY * SCRUB_CONFIG.SCROLL_SENSITIVITY * 0.5;
      targetSection1ProgressRef.current = Math.max(0, Math.min(1, 
        targetSection1ProgressRef.current + progressDelta
      ));
      touchStartRef.current.y = touchY;
      return;
    }
    
    // Scrubbing in section 2
    if (currentState === SCROLL_STATES.S2_SCRUBBING) {
      e.preventDefault();
      
      const progressDelta = deltaY * SCRUB_CONFIG.SCROLL_SENSITIVITY * 0.5;
      const newProgress = targetSection2ProgressRef.current + progressDelta;
      
      if (newProgress < 0) {
        transitionToSection1();
        touchStartRef.current.y = touchY;
        return;
      }
      
      targetSection2ProgressRef.current = Math.max(0, Math.min(1, newProgress));
      touchStartRef.current.y = touchY;
      return;
    }
  }, [reducedMotion, isTransitioning, handleReturnFromStatic, transitionToSection1]);

  // Attach scroll event listeners
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

  useEffect(() => {
    return () => {
      if (transitionTimelineRef.current) {
        transitionTimelineRef.current.kill();
      }
    };
  }, []);

  const getSection1Style = () => {
    const isActive = activeSection === 1;
    const isVisible = isActive || state === SCROLL_STATES.S1_TRANSITION_TO_S2;
    
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      opacity: isActive ? 1 : 0,
      visibility: isVisible ? 'visible' : 'hidden',
      pointerEvents: isActive ? 'auto' : 'none',
      zIndex: isActive ? 2 : 1,
      willChange: 'opacity, transform, filter',
      backfaceVisibility: 'hidden',
      transform: 'translateZ(0)',
    };
  };

  const getSection2Style = () => {
    const isActive = activeSection === 2;
    const isVisible = showSection2 && (isActive || state === SCROLL_STATES.S1_TRANSITION_TO_S2);
    
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      opacity: isActive ? 1 : 0,
      visibility: isVisible ? 'visible' : 'hidden',
      pointerEvents: isActive ? 'auto' : 'none',
      zIndex: isActive ? 2 : 1,
      willChange: 'opacity, transform, filter',
      backfaceVisibility: 'hidden',
      transform: 'translateZ(0)',
    };
  };

  const isBusy = useCallback(() => {
    const s = stateRef.current;
    return s.includes('TRANSITION') || isTransitioning;
  }, [isTransitioning]);


  return (
    <div 
      ref={wrapperRef}
      className="three-hero-wrapper"
      style={{
        position: isLocked ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: isLocked ? '100vh' : 'auto',
        zIndex: isLocked ? 100 : 1,
        overflow: 'hidden',
      }}
    >
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
      {isLocked && !isBusy() && state === SCROLL_STATES.S1_SCRUBBING && (
        <div 
          className="scroll-indicator-wrapper"
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            opacity: 0.8,
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

      {/* Transition overlay for extra smoothness */}
      {isTransitioning && (
        <div 
          className="transition-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 5,
          }}
        />
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
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .three-section {
            transition: opacity 0.15s ease !important;
            filter: none !important;
            transform: none !important;
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
