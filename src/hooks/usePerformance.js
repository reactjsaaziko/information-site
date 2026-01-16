import { useState, useEffect, useRef, useCallback } from 'react';

// ============================================
// QUALITY PROFILES - Edit thresholds here
// ============================================
export const QUALITY_PROFILES = {
  HIGH: {
    name: 'HIGH',
    maxDpr: 1.5,
    minDots: 1200,
    maxDots: 1600,
    sortEveryNFrames: 2,
    glowMode: 'full',      // full radial gradient
    fpsCap: 60,
    rotationSpeed: 0.003,
  },
  MEDIUM: {
    name: 'MEDIUM',
    maxDpr: 1.25,
    minDots: 700,
    maxDots: 1000,
    sortEveryNFrames: 3,
    glowMode: 'simple',    // cached glow, no shadowBlur
    fpsCap: 60,
    rotationSpeed: 0.003,
  },
  LOW: {
    name: 'LOW',
    maxDpr: 1.0,
    minDots: 300,
    maxDots: 600,
    sortEveryNFrames: 6,
    glowMode: 'minimal',   // very simple or none
    fpsCap: 30,
    rotationSpeed: 0.002,
  },
  FALLBACK: {
    name: 'FALLBACK',
    maxDpr: 1.0,
    minDots: 200,
    maxDots: 300,
    sortEveryNFrames: 10,
    glowMode: 'none',
    fpsCap: 15,
    rotationSpeed: 0.0005, // nearly static
  },
};

// FPS thresholds for auto-detection
const FPS_THRESHOLD_HIGH = 55;
const FPS_THRESHOLD_MEDIUM = 40;
const FPS_SAMPLE_DURATION = 1500; // ms
const MONITOR_INTERVAL = 4000;    // ms
const DOWNGRADE_THRESHOLD = 25;
const UPGRADE_THRESHOLD = 55;

export function usePerformance() {
  const [quality, setQuality] = useState(QUALITY_PROFILES.MEDIUM);
  const [isDetecting, setIsDetecting] = useState(true);
  const [manualOverride, setManualOverride] = useState(null);
  
  const fpsHistoryRef = useRef([]);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const monitorIntervalRef = useRef(null);
  const consecutiveLowRef = useRef(0);
  const consecutiveHighRef = useRef(0);
  const hasInitRef = useRef(false);

  // Measure FPS during detection phase
  const measureFps = useCallback(() => {
    const now = performance.now();
    const delta = now - lastTimeRef.current;
    
    if (delta >= 100) { // Sample every 100ms
      const fps = (frameCountRef.current / delta) * 1000;
      fpsHistoryRef.current.push(fps);
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }
  }, []);

  // Increment frame count (call from RAF)
  const recordFrame = useCallback(() => {
    frameCountRef.current++;
  }, []);

  // Select quality based on average FPS
  const selectQuality = useCallback((avgFps) => {
    if (avgFps >= FPS_THRESHOLD_HIGH) {
      return QUALITY_PROFILES.HIGH;
    } else if (avgFps >= FPS_THRESHOLD_MEDIUM) {
      return QUALITY_PROFILES.MEDIUM;
    } else {
      return QUALITY_PROFILES.LOW;
    }
  }, []);

  // Initial FPS detection
  useEffect(() => {
    if (hasInitRef.current) return;
    hasInitRef.current = true;

    let rafId;
    const startTime = performance.now();

    const detect = () => {
      const elapsed = performance.now() - startTime;
      frameCountRef.current++;
      measureFps();

      if (elapsed < FPS_SAMPLE_DURATION) {
        rafId = requestAnimationFrame(detect);
      } else {
        // Calculate average FPS
        const history = fpsHistoryRef.current;
        if (history.length > 0) {
          const avgFps = history.reduce((a, b) => a + b, 0) / history.length;
          const selectedQuality = selectQuality(avgFps);
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`[Performance] Detected avg FPS: ${avgFps.toFixed(1)}, selecting: ${selectedQuality.name}`);
          }
          
          setQuality(selectedQuality);
        }
        setIsDetecting(false);
        fpsHistoryRef.current = [];
        frameCountRef.current = 0;
      }
    };

    rafId = requestAnimationFrame(detect);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [measureFps, selectQuality]);

  // Ongoing FPS monitoring (after detection)
  useEffect(() => {
    if (isDetecting || manualOverride) return;

    let currentFps = 0;
    let frameCount = 0;
    let lastCheck = performance.now();

    const checkPerformance = () => {
      const now = performance.now();
      const delta = now - lastCheck;
      
      if (delta > 0) {
        currentFps = (frameCount / delta) * 1000;
      }
      
      // Downgrade logic
      if (currentFps < DOWNGRADE_THRESHOLD && currentFps > 0) {
        consecutiveLowRef.current++;
        consecutiveHighRef.current = 0;
        
        if (consecutiveLowRef.current >= 2) {
          setQuality(prev => {
            if (prev.name === 'HIGH') return QUALITY_PROFILES.MEDIUM;
            if (prev.name === 'MEDIUM') return QUALITY_PROFILES.LOW;
            if (prev.name === 'LOW') return QUALITY_PROFILES.FALLBACK;
            return prev;
          });
          consecutiveLowRef.current = 0;
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`[Performance] Downgrading due to low FPS: ${currentFps.toFixed(1)}`);
          }
        }
      }
      // Upgrade logic (conservative)
      else if (currentFps >= UPGRADE_THRESHOLD) {
        consecutiveHighRef.current++;
        consecutiveLowRef.current = 0;
        
        if (consecutiveHighRef.current >= 4) {
          setQuality(prev => {
            if (prev.name === 'FALLBACK') return QUALITY_PROFILES.LOW;
            if (prev.name === 'LOW') return QUALITY_PROFILES.MEDIUM;
            // Don't auto-upgrade to HIGH to avoid toggling
            return prev;
          });
          consecutiveHighRef.current = 0;
        }
      } else {
        consecutiveLowRef.current = 0;
        consecutiveHighRef.current = 0;
      }
      
      frameCount = 0;
      lastCheck = now;
    };

    // Frame counter for monitoring
    const countFrame = () => {
      frameCount++;
    };

    // Expose frame counter
    window.__perfRecordFrame = countFrame;

    monitorIntervalRef.current = setInterval(checkPerformance, MONITOR_INTERVAL);

    return () => {
      if (monitorIntervalRef.current) {
        clearInterval(monitorIntervalRef.current);
      }
      delete window.__perfRecordFrame;
    };
  }, [isDetecting, manualOverride]);

  // Manual quality override (dev only)
  const setManualQuality = useCallback((qualityName) => {
    if (qualityName === 'AUTO') {
      setManualOverride(null);
      // Re-run detection would be complex, just use MEDIUM as safe default
      setQuality(QUALITY_PROFILES.MEDIUM);
    } else if (QUALITY_PROFILES[qualityName]) {
      setManualOverride(qualityName);
      setQuality(QUALITY_PROFILES[qualityName]);
    }
  }, []);

  return {
    quality: manualOverride ? QUALITY_PROFILES[manualOverride] : quality,
    isDetecting,
    recordFrame,
    setManualQuality,
    manualOverride,
  };
}
