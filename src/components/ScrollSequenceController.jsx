import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';

/**
 * ScrollSequenceController - State machine for managing scroll-sequenced sections
 * 
 * States:
 * - S1_ACTIVE_FORWARD: Section 1 is active, playing forward animation
 * - S1_TRANSITION_TO_S2: Transitioning from S1 to S2
 * - S2_ACTIVE_FORWARD: Section 2 is active, playing forward animation
 * - S2_TRANSITION_TO_STATIC: Transitioning from S2 to static content
 * - STATIC_ACTIVE: Static content is active, normal scroll
 * - STATIC_TRANSITION_TO_S2: Transitioning from static back to S2
 * - S2_ACTIVE_REVERSE: Section 2 is active, playing reverse animation
 * - S2_TRANSITION_TO_S1: Transitioning from S2 to S1
 * - S1_ACTIVE_REVERSE: Section 1 is active, playing reverse animation
 */

export const SCROLL_STATES = {
  S1_IDLE: 'S1_IDLE',
  S1_ACTIVE_FORWARD: 'S1_ACTIVE_FORWARD',
  S1_TRANSITION_TO_S2: 'S1_TRANSITION_TO_S2',
  S2_ACTIVE_FORWARD: 'S2_ACTIVE_FORWARD',
  S2_TRANSITION_TO_STATIC: 'S2_TRANSITION_TO_STATIC',
  STATIC_ACTIVE: 'STATIC_ACTIVE',
  STATIC_TRANSITION_TO_S2: 'STATIC_TRANSITION_TO_S2',
  S2_ACTIVE_REVERSE: 'S2_ACTIVE_REVERSE',
  S2_TRANSITION_TO_S1: 'S2_TRANSITION_TO_S1',
  S1_ACTIVE_REVERSE: 'S1_ACTIVE_REVERSE',
};

// Transition configuration
const TRANSITION_CONFIG = {
  duration: 0.6, // seconds
  ease: 'power2.inOut',
  scale: { from: 0.98, to: 1 },
  blur: { from: 4, to: 0 },
};

const ScrollSequenceController = forwardRef(function ScrollSequenceController({
  section1Ref,
  section2Ref,
  onStateChange,
  onComplete,
  reducedMotion = false,
}, ref) {
  const [state, setState] = useState(SCROLL_STATES.S1_IDLE);
  const stateRef = useRef(state);
  const isTransitioningRef = useRef(false);
  const scrollAccumulatorRef = useRef(0);
  const lastWheelTimeRef = useRef(0);
  const scrollQueueRef = useRef([]);

  // Sync state ref
  useEffect(() => {
    stateRef.current = state;
    if (onStateChange) onStateChange(state);
  }, [state, onStateChange]);

  // Check if in a transition state
  const isTransitionState = useCallback((s) => {
    return s.includes('TRANSITION');
  }, []);

  // Check if scroll should be locked
  const isScrollLocked = useCallback(() => {
    const s = stateRef.current;
    return s !== SCROLL_STATES.STATIC_ACTIVE;
  }, []);

  // Run visual transition between sections
  const runTransition = useCallback(async (fromSection, toSection, direction) => {
    if (reducedMotion) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const duration = TRANSITION_CONFIG.duration;
      
      // Create timeline for smooth crossfade with scale
      const tl = gsap.timeline({
        onComplete: resolve,
      });

      // Fade out current section with slight scale down
      if (fromSection) {
        tl.to(fromSection, {
          opacity: 0,
          scale: TRANSITION_CONFIG.scale.from,
          filter: `blur(${TRANSITION_CONFIG.blur.from}px)`,
          duration: duration * 0.5,
          ease: 'power2.in',
        }, 0);
      }

      // Fade in next section with scale up
      if (toSection) {
        tl.fromTo(toSection, 
          {
            opacity: 0,
            scale: TRANSITION_CONFIG.scale.from,
            filter: `blur(${TRANSITION_CONFIG.blur.from}px)`,
          },
          {
            opacity: 1,
            scale: TRANSITION_CONFIG.scale.to,
            filter: `blur(${TRANSITION_CONFIG.blur.to}px)`,
            duration: duration * 0.5,
            ease: 'power2.out',
          }, 
          duration * 0.3
        );
      }
    });
  }, [reducedMotion]);

  // State transition handlers
  const transitionToS2 = useCallback(async () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setState(SCROLL_STATES.S1_TRANSITION_TO_S2);

    await runTransition(
      section1Ref.current?.containerRef?.current,
      section2Ref.current?.containerRef?.current,
      'forward'
    );

    setState(SCROLL_STATES.S2_ACTIVE_FORWARD);
    isTransitioningRef.current = false;

    // Auto-play S2 forward
    if (section2Ref.current?.playForward) {
      await section2Ref.current.playForward();
      transitionToStatic();
    }
  }, [runTransition, section1Ref, section2Ref]);

  const transitionToStatic = useCallback(async () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setState(SCROLL_STATES.S2_TRANSITION_TO_STATIC);

    // Short delay for visual smoothness
    await new Promise(r => setTimeout(r, reducedMotion ? 0 : 300));

    setState(SCROLL_STATES.STATIC_ACTIVE);
    isTransitioningRef.current = false;
    
    if (onComplete) onComplete();
  }, [onComplete, reducedMotion]);

  const transitionBackToS2 = useCallback(async () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setState(SCROLL_STATES.STATIC_TRANSITION_TO_S2);

    // Snap to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    await new Promise(r => setTimeout(r, reducedMotion ? 0 : 100));

    setState(SCROLL_STATES.S2_ACTIVE_REVERSE);
    isTransitioningRef.current = false;

    // Auto-play S2 reverse
    if (section2Ref.current?.playReverse) {
      await section2Ref.current.playReverse();
      transitionToS1();
    }
  }, [section2Ref, reducedMotion]);

  const transitionToS1 = useCallback(async () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setState(SCROLL_STATES.S2_TRANSITION_TO_S1);

    await runTransition(
      section2Ref.current?.containerRef?.current,
      section1Ref.current?.containerRef?.current,
      'reverse'
    );

    setState(SCROLL_STATES.S1_ACTIVE_REVERSE);
    isTransitioningRef.current = false;

    // Auto-play S1 reverse
    if (section1Ref.current?.playReverse) {
      await section1Ref.current.playReverse();
      setState(SCROLL_STATES.S1_IDLE);
    }
  }, [runTransition, section1Ref, section2Ref]);

  // Handle scroll intent
  const handleScrollIntent = useCallback((direction) => {
    if (isTransitioningRef.current) {
      // Queue the scroll intent
      scrollQueueRef.current.push(direction);
      return;
    }

    const currentState = stateRef.current;

    if (direction === 'down') {
      switch (currentState) {
        case SCROLL_STATES.S1_IDLE:
          setState(SCROLL_STATES.S1_ACTIVE_FORWARD);
          if (section1Ref.current?.playForward) {
            section1Ref.current.playForward().then(() => {
              transitionToS2();
            });
          }
          break;
        case SCROLL_STATES.STATIC_ACTIVE:
          // Normal scroll, do nothing
          break;
        default:
          break;
      }
    } else if (direction === 'up') {
      switch (currentState) {
        case SCROLL_STATES.S1_ACTIVE_FORWARD:
        case SCROLL_STATES.S1_IDLE:
          // At top, do nothing or play reverse if partially played
          break;
        case SCROLL_STATES.STATIC_ACTIVE:
          // Check if at top of page
          if (window.scrollY <= 5) {
            transitionBackToS2();
          }
          break;
        default:
          break;
      }
    }
  }, [section1Ref, transitionToS2, transitionBackToS2]);

  // Expose methods
  useImperativeHandle(ref, () => ({
    getState: () => stateRef.current,
    isScrollLocked: isScrollLocked,
    handleScrollIntent,
    isTransitioning: () => isTransitioningRef.current,
  }), [isScrollLocked, handleScrollIntent]);

  // Wheel event handler
  useEffect(() => {
    const handleWheel = (e) => {
      if (reducedMotion) return;

      const currentState = stateRef.current;
      const now = Date.now();

      // Throttle wheel events
      if (now - lastWheelTimeRef.current < 50) {
        if (isScrollLocked()) {
          e.preventDefault();
        }
        return;
      }
      lastWheelTimeRef.current = now;

      // If transitioning, prevent scroll
      if (isTransitioningRef.current || isTransitionState(currentState)) {
        e.preventDefault();
        return;
      }

      // If locked (in animation sequence), prevent default scroll
      if (isScrollLocked()) {
        e.preventDefault();

        // Accumulate scroll delta
        scrollAccumulatorRef.current += e.deltaY;

        // Threshold for triggering action
        const threshold = 80;

        if (Math.abs(scrollAccumulatorRef.current) > threshold) {
          const direction = scrollAccumulatorRef.current > 0 ? 'down' : 'up';
          scrollAccumulatorRef.current = 0;
          handleScrollIntent(direction);
        }
        return;
      }

      // Handle scroll up from static content back to Section 2
      if (currentState === SCROLL_STATES.STATIC_ACTIVE && e.deltaY < 0) {
        const scrollY = window.scrollY;
        if (scrollY <= 5) {
          e.preventDefault();
          handleScrollIntent('up');
        }
      }
    };

    // Touch handling
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e) => {
      if (reducedMotion) return;

      const currentState = stateRef.current;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const elapsed = Date.now() - touchStartTime;

      if (Math.abs(deltaY) < 30 || elapsed < 100) return;

      if (isTransitioningRef.current || isTransitionState(currentState)) {
        e.preventDefault();
        return;
      }

      if (isScrollLocked()) {
        e.preventDefault();
        const direction = deltaY > 0 ? 'down' : 'up';
        touchStartY = touchY;
        touchStartTime = Date.now();
        handleScrollIntent(direction);
        return;
      }

      if (currentState === SCROLL_STATES.STATIC_ACTIVE && deltaY < -50) {
        const scrollY = window.scrollY;
        if (scrollY <= 5) {
          e.preventDefault();
          handleScrollIntent('up');
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isScrollLocked, isTransitionState, handleScrollIntent, reducedMotion]);

  // Handle reduced motion
  useEffect(() => {
    if (reducedMotion) {
      setState(SCROLL_STATES.STATIC_ACTIVE);
      if (onComplete) onComplete();
    }
  }, [reducedMotion, onComplete]);

  return null; // This is a logic-only component
});

export default ScrollSequenceController;
