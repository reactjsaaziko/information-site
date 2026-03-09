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
  // REDUCED to 0.00005 = Very slow scroll animation for better control
  SCROLL_SENSITIVITY: SCROLL_CONFIG.SCRUB_SENSITIVITY || 0.00005,
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
  const [section2AnimationComplete, setSection2AnimationComplete] = useState(false);
  const [waitingForUnlockScroll, setWaitingForUnlockScroll] = useState(false);
  
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
    
    // Section 1: 0 to 0.5 progress - MUST complete fully before Section 2 shows
    if (clampedProgress <= SCRUB_CONFIG.SECTION_TRANSITION_POINT) {
      const section1Progress = clampedProgress / SCRUB_CONFIG.SECTION_TRANSITION_POINT;
      if (section1Ref.current?.setProgress) {
        section1Ref.current.setProgress(section1Progress);
      }
      
      // Handle section transition - switching back to Section 1
      if (activeSection !== 1) {
        setActiveSection(1);
      }
      
      // FIXED: Restore Section 1 opacity, scale, and visibility when scrolling back
      if (section1ContainerRef.current) {
        section1ContainerRef.current.style.opacity = 1;
        section1ContainerRef.current.style.transform = 'scale(1)';
        section1ContainerRef.current.style.visibility = 'visible';
      }
      
      // FIXED: Fade out Section 2 when scrolling back below transition point
      if (section2ContainerRef.current) {
        section2ContainerRef.current.style.opacity = 0;
      }
      
      // Hide Section 2 when scrolling back to Section 1
      // Use a small delay to allow fade out animation
      if (showSection2 && clampedProgress < SCRUB_CONFIG.SECTION_TRANSITION_POINT - 0.02) {
        setTimeout(() => setShowSection2(false), 100);
      }
    }
    
    // Section 2: 0.5 to 1.0 progress - ONLY shows after Section 1 is 100% complete
    if (clampedProgress > SCRUB_CONFIG.SECTION_TRANSITION_POINT) {
      // Show section 2 ONLY after Section 1 is fully complete
      if (!showSection2) {
        setShowSection2(true);
      }
      
      const section2Progress = (clampedProgress - SCRUB_CONFIG.SECTION_TRANSITION_POINT) / (1 - SCRUB_CONFIG.SECTION_TRANSITION_POINT);
      if (section2Ref.current?.setProgress) {
        section2Ref.current.setProgress(section2Progress);
      }
      
      // Handle section transition
      if (activeSection !== 2) {
        setActiveSection(2);
      }
      
      // Smooth transition: Fade in section 2 and scale down section 1
      // Extended transition duration from 0.08 to 0.15 for smoother effect
      const transitionDuration = 0.15;
      const transitionProgress = Math.min(1, (clampedProgress - SCRUB_CONFIG.SECTION_TRANSITION_POINT) / transitionDuration);
      
      // Fade in section 2 smoothly
      if (section2ContainerRef.current) {
        section2ContainerRef.current.style.opacity = transitionProgress;
      }
      
      // Keep Section 1 visible during transition so Earth stays visible
      // The Earth will shrink via HeroSectionAnimated's internal animation
      if (section1ContainerRef.current) {
        // Keep Section 1 fully visible - Earth shrinks internally
        section1ContainerRef.current.style.opacity = 1;
        section1ContainerRef.current.style.transform = 'scale(1)';
        section1ContainerRef.current.style.visibility = 'visible';
      }
    }
    
    // Check if Section 2 animation has completed (reached 100% of Section 2)
    if (clampedProgress >= 0.999 && !section2AnimationComplete) {
      // Section 2 animation is complete - stop scrolling and wait for user to scroll again
      setSection2AnimationComplete(true);
      setWaitingForUnlockScroll(true);
    } else if (clampedProgress < 0.95 && section2AnimationComplete) {
      // Reset if user scrolls back up significantly
      setSection2AnimationComplete(false);
      setWaitingForUnlockScroll(false);
      setIsComplete(false);
      setIsLocked(true);
    }
    
    setDisplayProgress(clampedProgress);
  }, [activeSection, showSection2, isComplete, section2AnimationComplete, onComplete]);

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
    
    // If waiting for unlock scroll (animation complete but not yet unlocked)
    if (waitingForUnlockScroll && e.deltaY > 0) {
      e.preventDefault();
      // User scrolled down after animation complete - now unlock
      setWaitingForUnlockScroll(false);
      setIsComplete(true);
      setIsLocked(false);
      if (onComplete) onComplete();
      return;
    }
    
    // If complete and scrolling down, allow normal page scroll
    if (isComplete && e.deltaY > 0) {
      return;
    }
    
    // If at top of page and scrolling up while complete, re-lock and show 3D at full completion
    if (isComplete && e.deltaY < 0 && window.scrollY <= 10) {
      e.preventDefault();
      
      // Re-lock the 3D section
      setIsLocked(true);
      setIsComplete(false);
      setSection2AnimationComplete(false);
      setWaitingForUnlockScroll(false);
      
      // FIXED: Reset to 99.5% (just before completion) so Section 2 shows at 99% progress
      // This shows the full animation completed, then user can scroll back through it
      targetProgressRef.current = 0.995;
      currentProgressRef.current = 0.995;
      
      // Allow scrolling back up through the animation
      const normalizedDelta = normalizeWheelDelta(e.deltaY, e.deltaMode);
      const progressDelta = normalizedDelta * SCRUB_CONFIG.SCROLL_SENSITIVITY;
      targetProgressRef.current = clamp(targetProgressRef.current + progressDelta, 0, 1);
      return;
    }
    
    // If locked, handle scroll-driven animation with section-specific speed
    if (isLocked) {
      e.preventDefault();
      
      const normalizedDelta = normalizeWheelDelta(e.deltaY, e.deltaMode);
      const currentProgress = targetProgressRef.current;
      
      // If animation is complete, prevent further scrolling until unlock
      if (section2AnimationComplete && currentProgress >= 0.999) {
        return; // Block scroll - animation complete, waiting for unlock scroll
      }
      
      // Section 2 (0.5 to 1.0) - Apply 50% slower speed (multiply by 0.5)
      let sensitivity = SCRUB_CONFIG.SCROLL_SENSITIVITY;
      if (currentProgress >= SCRUB_CONFIG.SECTION_TRANSITION_POINT) {
        sensitivity = SCRUB_CONFIG.SCROLL_SENSITIVITY * 0.5; // 50% slower for Section 2
      }
      
      const progressDelta = normalizedDelta * sensitivity;
      targetProgressRef.current = clamp(targetProgressRef.current + progressDelta, 0, 1);
    }
  }, [reducedMotion, isComplete, isLocked, waitingForUnlockScroll, section2AnimationComplete, onComplete]);

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
    
    // If waiting for unlock scroll (animation complete but not yet unlocked)
    if (waitingForUnlockScroll && deltaY > 0) {
      e.preventDefault();
      // User scrolled down after animation complete - now unlock
      setWaitingForUnlockScroll(false);
      setIsComplete(true);
      setIsLocked(false);
      if (onComplete) onComplete();
      return;
    }
    
    // If complete and scrolling down, allow normal page scroll
    if (isComplete && deltaY > 0) {
      return;
    }
    
    // If at top of page and scrolling up while complete, re-lock and show 3D at full completion
    if (isComplete && deltaY < 0 && window.scrollY <= 10) {
      e.preventDefault();
      
      // Re-lock the 3D section
      setIsLocked(true);
      setIsComplete(false);
      setSection2AnimationComplete(false);
      setWaitingForUnlockScroll(false);
      
      // FIXED: Reset to 99.5% (just before completion) so Section 2 shows at 99% progress
      // This shows the full animation completed, then user can scroll back through it
      targetProgressRef.current = 0.995;
      currentProgressRef.current = 0.995;
      
      // REDUCED: Touch sensitivity from *2 to *1.25 for slower animation
      const progressDelta = deltaY * SCRUB_CONFIG.SCROLL_SENSITIVITY * 1.25;
      targetProgressRef.current = clamp(targetProgressRef.current + progressDelta, 0, 1);
      return;
    }
    
    // If locked, handle scroll-driven animation with section-specific speed
    if (isLocked) {
      e.preventDefault();
      
      const currentProgress = targetProgressRef.current;
      
      // If animation is complete, prevent further scrolling until unlock
      if (section2AnimationComplete && currentProgress >= 0.999) {
        return; // Block scroll - animation complete, waiting for unlock scroll
      }
      
      // Section 2 (0.5 to 1.0) - Apply 50% slower speed (multiply by 0.5)
      let sensitivity = SCRUB_CONFIG.SCROLL_SENSITIVITY * 1.25; // Base touch sensitivity
      if (currentProgress >= SCRUB_CONFIG.SECTION_TRANSITION_POINT) {
        sensitivity = SCRUB_CONFIG.SCROLL_SENSITIVITY * 1.25 * 0.5; // 50% slower for Section 2
      }
      
      const progressDelta = deltaY * sensitivity;
      targetProgressRef.current = clamp(targetProgressRef.current + progressDelta, 0, 1);
    }
  }, [reducedMotion, isComplete, isLocked, waitingForUnlockScroll, section2AnimationComplete, onComplete]);

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
    // FIXED: Keep Section 1 visible during reverse scroll (when progress < 0.6)
    const isVisible = isActive || displayProgress < SCRUB_CONFIG.SECTION_TRANSITION_POINT + 0.15;
    
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
      transformOrigin: 'center center',
      // FIXED: Add smooth opacity and transform transition for reverse scroll
      transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
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
      transformOrigin: 'center center',
      // FIXED: Add smooth opacity and transform transition for reverse scroll
      transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
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
        // IMPORTANT: Solid dark background to prevent static content from showing through
        backgroundColor: '#080c14',
        // Smooth transition when unlocking
        opacity: isLocked ? 1 : 0,
        transition: isLocked ? 'none' : 'opacity 0.5s ease-out',
        // Show wrapper when locked
        visibility: isLocked ? 'visible' : 'hidden',
        pointerEvents: isLocked ? 'auto' : 'none',
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

      {/* Unlock indicator - shows when animation is complete and waiting for scroll */}
      {waitingForUnlockScroll && (
        <div 
          className="unlock-indicator-wrapper"
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            animation: 'pulse 2s infinite',
          }}
        >
          <div style={{
            color: 'rgba(103, 232, 249, 0.9)',
            fontSize: '16px',
            textAlign: 'center',
            fontWeight: '500',
            textShadow: '0 0 20px rgba(103, 232, 249, 0.5)',
          }}>
            <span>Scroll to continue</span>
            <div style={{ marginTop: '8px', fontSize: '24px' }}>↓</div>
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
        
        @keyframes pulse {
          0%, 100% { 
            transform: translateX(-50%) scale(1);
            opacity: 1;
          }
          50% { 
            transform: translateX(-50%) scale(1.1);
            opacity: 0.8;
          }
        }
        
        .three-section {
          transition: visibility 0s;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .three-section {
            transition: opacity 0.15s ease !important;
          }
          
          .scroll-indicator-wrapper,
          .unlock-indicator-wrapper {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
});

export default ThreeHeroWrapper;
