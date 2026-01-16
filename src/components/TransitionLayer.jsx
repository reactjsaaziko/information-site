import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';

/**
 * TransitionLayer - Handles smooth visual transitions between sections
 * 
 * Transition styles:
 * - crossfade: Opacity fade with subtle scale (default)
 * - slide: Vertical slide transition
 * - blur: Blur dissolve effect
 */

const TRANSITION_STYLES = {
  crossfade: {
    duration: 0.6,
    outProps: { opacity: 0, scale: 0.98, filter: 'blur(4px)' },
    inProps: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    ease: 'power2.inOut',
  },
  slide: {
    duration: 0.7,
    outProps: { y: '-100%', opacity: 0 },
    inProps: { y: '0%', opacity: 1 },
    ease: 'power3.inOut',
  },
  blur: {
    duration: 0.5,
    outProps: { opacity: 0, filter: 'blur(12px)' },
    inProps: { opacity: 1, filter: 'blur(0px)' },
    ease: 'power2.out',
  },
};

const TransitionLayer = forwardRef(function TransitionLayer({
  children,
  style = 'crossfade',
  reducedMotion = false,
  className = '',
}, ref) {
  const containerRef = useRef(null);
  const activeTimelineRef = useRef(null);

  // Get transition config
  const getConfig = useCallback(() => {
    if (reducedMotion) {
      return {
        duration: 0.15,
        outProps: { opacity: 0 },
        inProps: { opacity: 1 },
        ease: 'none',
      };
    }
    return TRANSITION_STYLES[style] || TRANSITION_STYLES.crossfade;
  }, [style, reducedMotion]);

  // Transition out (hide)
  const transitionOut = useCallback(() => {
    return new Promise((resolve) => {
      if (activeTimelineRef.current) {
        activeTimelineRef.current.kill();
      }

      const config = getConfig();
      const el = containerRef.current;

      if (!el) {
        resolve();
        return;
      }

      activeTimelineRef.current = gsap.to(el, {
        ...config.outProps,
        duration: config.duration * 0.5,
        ease: config.ease,
        onComplete: resolve,
      });
    });
  }, [getConfig]);

  // Transition in (show)
  const transitionIn = useCallback(() => {
    return new Promise((resolve) => {
      if (activeTimelineRef.current) {
        activeTimelineRef.current.kill();
      }

      const config = getConfig();
      const el = containerRef.current;

      if (!el) {
        resolve();
        return;
      }

      // Set initial state
      gsap.set(el, config.outProps);

      activeTimelineRef.current = gsap.to(el, {
        ...config.inProps,
        duration: config.duration * 0.5,
        ease: config.ease,
        onComplete: resolve,
      });
    });
  }, [getConfig]);

  // Crossfade between two elements
  const crossfadeTo = useCallback((targetElement) => {
    return new Promise((resolve) => {
      if (activeTimelineRef.current) {
        activeTimelineRef.current.kill();
      }

      const config = getConfig();
      const currentEl = containerRef.current;

      if (!currentEl || !targetElement) {
        resolve();
        return;
      }

      const tl = gsap.timeline({ onComplete: resolve });
      activeTimelineRef.current = tl;

      // Fade out current
      tl.to(currentEl, {
        ...config.outProps,
        duration: config.duration * 0.5,
        ease: 'power2.in',
      }, 0);

      // Fade in target
      tl.fromTo(targetElement, 
        config.outProps,
        {
          ...config.inProps,
          duration: config.duration * 0.5,
          ease: 'power2.out',
        },
        config.duration * 0.3
      );
    });
  }, [getConfig]);

  // Set visibility immediately (no animation)
  const setVisible = useCallback((visible) => {
    const el = containerRef.current;
    if (!el) return;

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    gsap.set(el, visible ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0 });
  }, []);

  // Expose methods
  useImperativeHandle(ref, () => ({
    transitionOut,
    transitionIn,
    crossfadeTo,
    setVisible,
    getElement: () => containerRef.current,
  }), [transitionOut, transitionIn, crossfadeTo, setVisible]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (activeTimelineRef.current) {
        activeTimelineRef.current.kill();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`transition-layer ${className}`}
      style={{
        willChange: 'opacity, transform, filter',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
      }}
    >
      {children}
    </div>
  );
});

export default TransitionLayer;
