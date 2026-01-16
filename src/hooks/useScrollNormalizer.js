/**
 * useScrollNormalizer - Normalizes scroll input across devices
 * 
 * Handles:
 * - Trackpad (high delta, many events)
 * - Mouse wheel (discrete, lower delta)
 * - Touch swipe (mobile)
 * 
 * Provides consistent, smooth scroll intent detection
 */

import { useRef, useCallback, useEffect } from 'react';

// Configuration constants
export const SCROLL_CONFIG = {
  // Maximum delta per event (clamps trackpad spikes)
  MAX_WHEEL_DELTA: 150,
  
  // Threshold to trigger a scroll action (for auto-play mode)
  TRIGGER_THRESHOLD: 120,
  
  // Minimum time between scroll triggers (ms)
  DEBOUNCE_TIME: 50,
  
  // Time to reset accumulated delta (ms)
  DELTA_RESET_TIME: 150,
  
  // Smoothing factor for lerp (0-1, lower = smoother but more lag)
  SMOOTHING_FACTOR: 0.12,
  
  // Maximum progress change per frame (for scrub mode)
  MAX_PROGRESS_STEP_PER_FRAME: 0.02,
  
  // Animation durations (ms) - for auto-play mode
  SECTION_DURATION_MS: 4000,
  SECTION_REVERSE_DURATION_MS: 3200,
  TRANSITION_DURATION_MS: 1200,
  
  // Touch swipe threshold (px)
  TOUCH_THRESHOLD: 60,
  
  // Velocity threshold for touch (px/ms)
  TOUCH_VELOCITY_THRESHOLD: 0.3,
  
  // Scrub mode settings
  SCRUB_SENSITIVITY: 0.0004, // How much scroll delta maps to progress (lower = slower)
};

/**
 * Normalizes wheel delta across different input devices
 * Trackpads generate much larger deltas than mouse wheels
 */
export function normalizeWheelDelta(deltaY, deltaMode = 0) {
  let normalizedDelta = deltaY;
  
  // Handle different delta modes
  // 0 = pixels, 1 = lines, 2 = pages
  if (deltaMode === 1) {
    normalizedDelta *= 40; // Convert lines to pixels
  } else if (deltaMode === 2) {
    normalizedDelta *= 800; // Convert pages to pixels
  }
  
  // Detect trackpad vs mouse wheel
  // Trackpads typically generate smaller, more frequent deltas
  // Mouse wheels generate larger, discrete deltas
  const absValue = Math.abs(normalizedDelta);
  
  // If delta is very large (>100), it's likely a trackpad with momentum
  // Scale it down to prevent jumps
  if (absValue > 100) {
    normalizedDelta = Math.sign(normalizedDelta) * (100 + Math.log(absValue - 99) * 10);
  }
  
  // Clamp to max value
  return Math.max(-SCROLL_CONFIG.MAX_WHEEL_DELTA, 
         Math.min(SCROLL_CONFIG.MAX_WHEEL_DELTA, normalizedDelta));
}

/**
 * Linear interpolation helper
 */
export function lerp(current, target, factor) {
  return current + (target - current) * factor;
}

/**
 * Clamp value between min and max
 */
export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Hook for normalized scroll handling
 */
export function useScrollNormalizer({
  onScrollDown,
  onScrollUp,
  isLocked = false,
  isAnimating = false,
  enabled = true,
  reducedMotion = false,
}) {
  const accumulatedDeltaRef = useRef(0);
  const lastTriggerTimeRef = useRef(0);
  const deltaResetTimerRef = useRef(null);
  const touchStartRef = useRef({ y: 0, time: 0 });
  const isProcessingRef = useRef(false);
  
  // Reset accumulated delta after pause
  const resetDelta = useCallback(() => {
    accumulatedDeltaRef.current = 0;
  }, []);
  
  // Schedule delta reset
  const scheduleDeltaReset = useCallback(() => {
    if (deltaResetTimerRef.current) {
      clearTimeout(deltaResetTimerRef.current);
    }
    deltaResetTimerRef.current = setTimeout(resetDelta, SCROLL_CONFIG.DELTA_RESET_TIME);
  }, [resetDelta]);
  
  // Process scroll intent
  const processScrollIntent = useCallback((direction) => {
    if (isProcessingRef.current || isAnimating) return;
    
    const now = Date.now();
    if (now - lastTriggerTimeRef.current < SCROLL_CONFIG.DEBOUNCE_TIME) return;
    
    isProcessingRef.current = true;
    lastTriggerTimeRef.current = now;
    accumulatedDeltaRef.current = 0;
    
    if (direction === 'down' && onScrollDown) {
      onScrollDown();
    } else if (direction === 'up' && onScrollUp) {
      onScrollUp();
    }
    
    // Reset processing flag after a short delay
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 100);
  }, [isAnimating, onScrollDown, onScrollUp]);
  
  // Wheel event handler
  const handleWheel = useCallback((e) => {
    if (!enabled || reducedMotion) return;
    
    // If animating, always prevent default and ignore
    if (isAnimating) {
      e.preventDefault();
      return;
    }
    
    // If locked (in animation sequence), handle scroll intent
    if (isLocked) {
      e.preventDefault();
      
      // Normalize the delta
      const normalizedDelta = normalizeWheelDelta(e.deltaY, e.deltaMode);
      
      // Accumulate delta
      accumulatedDeltaRef.current += normalizedDelta;
      
      // Schedule reset
      scheduleDeltaReset();
      
      // Check if threshold reached
      if (Math.abs(accumulatedDeltaRef.current) >= SCROLL_CONFIG.TRIGGER_THRESHOLD) {
        const direction = accumulatedDeltaRef.current > 0 ? 'down' : 'up';
        processScrollIntent(direction);
      }
      return;
    }
    
    // Not locked - check for boundary scroll (returning from static content)
    if (e.deltaY < 0 && window.scrollY <= 5) {
      e.preventDefault();
      
      const normalizedDelta = normalizeWheelDelta(e.deltaY, e.deltaMode);
      accumulatedDeltaRef.current += normalizedDelta;
      scheduleDeltaReset();
      
      if (Math.abs(accumulatedDeltaRef.current) >= SCROLL_CONFIG.TRIGGER_THRESHOLD) {
        processScrollIntent('up');
      }
    }
  }, [enabled, reducedMotion, isAnimating, isLocked, scheduleDeltaReset, processScrollIntent]);
  
  // Touch handlers
  const handleTouchStart = useCallback((e) => {
    if (!enabled || reducedMotion) return;
    
    touchStartRef.current = {
      y: e.touches[0].clientY,
      time: Date.now(),
    };
  }, [enabled, reducedMotion]);
  
  const handleTouchMove = useCallback((e) => {
    if (!enabled || reducedMotion) return;
    
    if (isAnimating) {
      e.preventDefault();
      return;
    }
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartRef.current.y - touchY;
    const elapsed = Date.now() - touchStartRef.current.time;
    
    // Require minimum movement and time
    if (Math.abs(deltaY) < SCROLL_CONFIG.TOUCH_THRESHOLD || elapsed < 100) return;
    
    // Calculate velocity
    const velocity = Math.abs(deltaY) / elapsed;
    
    if (isLocked) {
      e.preventDefault();
      
      // Only trigger if velocity is reasonable (not too fast)
      if (velocity < 2) {
        const direction = deltaY > 0 ? 'down' : 'up';
        processScrollIntent(direction);
        
        // Reset touch start to prevent multiple triggers
        touchStartRef.current = {
          y: touchY,
          time: Date.now(),
        };
      }
      return;
    }
    
    // Check for boundary scroll
    if (deltaY < -SCROLL_CONFIG.TOUCH_THRESHOLD && window.scrollY <= 5) {
      e.preventDefault();
      processScrollIntent('up');
      touchStartRef.current = {
        y: touchY,
        time: Date.now(),
      };
    }
  }, [enabled, reducedMotion, isAnimating, isLocked, processScrollIntent]);
  
  // Cleanup
  useEffect(() => {
    return () => {
      if (deltaResetTimerRef.current) {
        clearTimeout(deltaResetTimerRef.current);
      }
    };
  }, []);
  
  return {
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    resetDelta,
  };
}

/**
 * Hook for smooth progress interpolation (scrub mode)
 * Use this if you need scrub-based animation instead of timeline-based
 */
export function useSmoothProgress({
  initialProgress = 0,
  smoothingFactor = SCROLL_CONFIG.SMOOTHING_FACTOR,
  maxStepPerFrame = SCROLL_CONFIG.MAX_PROGRESS_STEP_PER_FRAME,
}) {
  const currentProgressRef = useRef(initialProgress);
  const targetProgressRef = useRef(initialProgress);
  const rafIdRef = useRef(null);
  const onUpdateRef = useRef(null);
  
  // Set target progress
  const setTargetProgress = useCallback((target) => {
    targetProgressRef.current = clamp(target, 0, 1);
  }, []);
  
  // Add delta to target progress
  const addProgressDelta = useCallback((delta) => {
    const clampedDelta = clamp(delta, -maxStepPerFrame, maxStepPerFrame);
    targetProgressRef.current = clamp(targetProgressRef.current + clampedDelta, 0, 1);
  }, [maxStepPerFrame]);
  
  // Animation loop
  const startLoop = useCallback((onUpdate) => {
    onUpdateRef.current = onUpdate;
    
    const animate = () => {
      const current = currentProgressRef.current;
      const target = targetProgressRef.current;
      
      // Lerp towards target
      const newProgress = lerp(current, target, smoothingFactor);
      
      // Only update if there's meaningful change
      if (Math.abs(newProgress - current) > 0.0001) {
        currentProgressRef.current = newProgress;
        if (onUpdateRef.current) {
          onUpdateRef.current(newProgress);
        }
      }
      
      rafIdRef.current = requestAnimationFrame(animate);
    };
    
    rafIdRef.current = requestAnimationFrame(animate);
  }, [smoothingFactor]);
  
  // Stop animation loop
  const stopLoop = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);
  
  // Get current progress
  const getCurrentProgress = useCallback(() => currentProgressRef.current, []);
  
  // Cleanup
  useEffect(() => {
    return () => {
      stopLoop();
    };
  }, [stopLoop]);
  
  return {
    setTargetProgress,
    addProgressDelta,
    startLoop,
    stopLoop,
    getCurrentProgress,
  };
}

export default useScrollNormalizer;
