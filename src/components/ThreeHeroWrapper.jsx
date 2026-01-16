import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';
import HeroSectionAnimated from './HeroSectionAnimated';
import TradeAnimation3DAnimated from './TradeAnimation3DAnimated';
import { useScrollNormalizer, SCROLL_CONFIG } from '../hooks/useScrollNormalizer';

/**
 * ThreeHeroWrapper - Manages the scroll sequence for two fullscreen Three.js sections
 * with smooth transitions between sections.
 * 
 * SCROLL BEHAVIOR:
 * - Uses timeline-based playback (not tied to raw scroll delta)
 * - Scroll triggers a "step advance" (S1 forward, then S2 forward)
 * - Each step plays at a controlled duration (configurable)
 * - While timeline playing, scroll input is ignored (no skipping)
 * - Wheel delta is normalized across trackpad/mouse/touch
 * 
 * State Machine:
 * - S1_IDLE: Initial state, Section 1 visible
 * - S1_ANIMATING_FORWARD: Section 1 animation playing forward
 * - S1_TRANSITION_TO_S2: Smooth transition from S1 to S2
 * - S2_ANIMATING_FORWARD: Section 2 animation playing forward
 * - S2_TRANSITION_TO_STATIC: Transition to static content
 * - S2_COMPLETE: Static content unlocked
 * - STATIC_TRANSITION_TO_S2: Returning from static to S2
 * - S2_ANIMATING_REVERSE: Section 2 animation playing reverse
 * - S2_TRANSITION_TO_S1: Smooth transition from S2 to S1
 * - S1_ANIMATING_REVERSE: Section 1 animation playing reverse
 */

const SCROLL_STATES = {
  S1_IDLE: 'S1_IDLE',
  S1_ANIMATING_FORWARD: 'S1_ANIMATING_FORWARD',
  S1_TRANSITION_TO_S2: 'S1_TRANSITION_TO_S2',
  S2_ANIMATING_FORWARD: 'S2_ANIMATING_FORWARD',
  S2_TRANSITION_TO_STATIC: 'S2_TRANSITION_TO_STATIC',
  S2_COMPLETE: 'S2_COMPLETE',
  STATIC_TRANSITION_TO_S2: 'STATIC_TRANSITION_TO_S2',
  S2_ANIMATING_REVERSE: 'S2_ANIMATING_REVERSE',
  S2_TRANSITION_TO_S1: 'S2_TRANSITION_TO_S1',
  S1_ANIMATING_REVERSE: 'S1_ANIMATING_REVERSE',
};

// Transition configuration - controlled durations for cinematic feel
const TRANSITION_CONFIG = {
  duration: SCROLL_CONFIG.TRANSITION_DURATION_MS / 1000, // Convert to seconds for GSAP
  ease: 'power2.inOut',
  scale: { from: 0.98, to: 1 },
  blur: { from: 6, to: 0 },
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
  const transitionTimelineRef = useRef(null);
  
  const [state, setState] = useState(SCROLL_STATES.S1_IDLE);
  const [activeSection, setActiveSection] = useState(1);
  const [isLocked, setIsLocked] = useState(true);
  const [showSection2, setShowSection2] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const stateRef = useRef(state);
  const scrollQueueRef = useRef([]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useImperativeHandle(ref, () => ({
    getState: () => stateRef.current,
    isLocked: () => isLocked,
    isTransitioning: () => isTransitioning,
    isAnimating: () => isAnimating,
  }), [isLocked, isTransitioning, isAnimating]);

  useEffect(() => {
    if (reducedMotion) {
      setState(SCROLL_STATES.S2_COMPLETE);
      setActiveSection(2);
      setIsLocked(false);
      setShowSection2(true);
      if (onComplete) onComplete();
    }
  }, [reducedMotion, onComplete]);


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

  const playSection1Forward = useCallback(async () => {
    if (isAnimating) return; // Prevent double-triggering
    
    setIsAnimating(true);
    setState(SCROLL_STATES.S1_ANIMATING_FORWARD);
    
    try {
      if (section1Ref.current?.playForward) {
        await section1Ref.current.playForward();
      }
      
      setState(SCROLL_STATES.S1_TRANSITION_TO_S2);
      setShowSection2(true);
      
      await new Promise(r => requestAnimationFrame(r));
      await new Promise(r => setTimeout(r, 50));
      
      await runTransition(section1ContainerRef, section2ContainerRef, 'forward');
      
      setActiveSection(2);
      
      setState(SCROLL_STATES.S2_ANIMATING_FORWARD);
      if (section2Ref.current?.playForward) {
        await section2Ref.current.playForward();
      }
      
      setState(SCROLL_STATES.S2_TRANSITION_TO_STATIC);
      await new Promise(r => setTimeout(r, reducedMotion ? 0 : 400));
      
      setState(SCROLL_STATES.S2_COMPLETE);
      setIsLocked(false);
      setIsAnimating(false);
      if (onComplete) onComplete();
      
    } catch (err) {
      console.error('Animation sequence failed:', err);
      setState(SCROLL_STATES.S2_COMPLETE);
      setIsLocked(false);
      setIsAnimating(false);
      if (onComplete) onComplete();
    }
  }, [onComplete, runTransition, reducedMotion, isAnimating]);

  const handleReturnFromStatic = useCallback(async () => {
    if (isAnimating) return; // Prevent double-triggering
    
    setIsAnimating(true);
    setState(SCROLL_STATES.STATIC_TRANSITION_TO_S2);
    setIsLocked(true);
    
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    await new Promise(r => setTimeout(r, reducedMotion ? 0 : 150));
    
    setState(SCROLL_STATES.S2_ANIMATING_REVERSE);
    try {
      if (section2Ref.current?.playReverse) {
        await section2Ref.current.playReverse();
      }
      
      setState(SCROLL_STATES.S2_TRANSITION_TO_S1);
      await runTransition(section2ContainerRef, section1ContainerRef, 'reverse');
      
      setActiveSection(1);
      
      setState(SCROLL_STATES.S1_ANIMATING_REVERSE);
      if (section1Ref.current?.playReverse) {
        await section1Ref.current.playReverse();
      }
      
      setState(SCROLL_STATES.S1_IDLE);
      setShowSection2(false);
      setIsAnimating(false);
      
    } catch (err) {
      console.error('Reverse animation failed:', err);
      setState(SCROLL_STATES.S1_IDLE);
      setShowSection2(false);
      setIsAnimating(false);
    }
  }, [runTransition, reducedMotion, isAnimating]);

  const isBusy = useCallback(() => {
    const s = stateRef.current;
    return s.includes('TRANSITION') || s.includes('ANIMATING') || isTransitioning || isAnimating;
  }, [isTransitioning, isAnimating]);

  // Scroll intent handlers for the normalizer
  const handleScrollDown = useCallback(() => {
    if (isBusy()) {
      scrollQueueRef.current.push('down');
      return;
    }
    
    const currentState = stateRef.current;
    
    if (currentState === SCROLL_STATES.S1_IDLE) {
      playSection1Forward();
    }
  }, [isBusy, playSection1Forward]);

  const handleScrollUp = useCallback(() => {
    if (isBusy()) {
      scrollQueueRef.current.push('up');
      return;
    }
    
    const currentState = stateRef.current;
    
    if (currentState === SCROLL_STATES.S2_COMPLETE) {
      const scrollY = window.scrollY;
      if (scrollY <= 5) {
        handleReturnFromStatic();
      }
    }
  }, [isBusy, handleReturnFromStatic]);

  // Use the scroll normalizer hook
  const { handleWheel, handleTouchStart, handleTouchMove } = useScrollNormalizer({
    onScrollDown: handleScrollDown,
    onScrollUp: handleScrollUp,
    isLocked: isLocked && stateRef.current !== SCROLL_STATES.S2_COMPLETE,
    isAnimating: isAnimating || isTransitioning,
    enabled: !reducedMotion,
    reducedMotion,
  });

  // Process queued scroll intents when animation completes
  useEffect(() => {
    if (!isBusy() && scrollQueueRef.current.length > 0) {
      const nextIntent = scrollQueueRef.current.shift();
      if (nextIntent === 'down') {
        handleScrollDown();
      } else if (nextIntent === 'up') {
        handleScrollUp();
      }
    }
  }, [state, isTransitioning, isAnimating, isBusy, handleScrollDown, handleScrollUp]);

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
    const isVisible = isActive || state === SCROLL_STATES.S1_TRANSITION_TO_S2 || state === SCROLL_STATES.S2_TRANSITION_TO_S1;
    
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
    const isVisible = showSection2 && (isActive || state === SCROLL_STATES.S1_TRANSITION_TO_S2 || state === SCROLL_STATES.S2_TRANSITION_TO_S1);
    
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
      {isLocked && !isBusy() && state === SCROLL_STATES.S1_IDLE && (
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
            <span>Scroll to continue</span>
            <div style={{ marginTop: '8px', fontSize: '20px' }}>↓</div>
          </div>
        </div>
      )}

      {/* Animation in progress indicator (optional, for debugging) */}
      {isAnimating && (
        <div 
          className="animation-progress-indicator"
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            opacity: 0.6,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            width: '40px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div 
              style={{
                width: '100%',
                height: '100%',
                background: 'rgba(103, 232, 249, 0.8)',
                animation: 'progressPulse 1.5s ease-in-out infinite',
              }}
            />
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
        
        @keyframes progressPulse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
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
          
          .animation-progress-indicator {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
});

export default ThreeHeroWrapper;
