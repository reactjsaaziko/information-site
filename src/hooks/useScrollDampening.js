import { useEffect, useRef } from 'react';

/**
 * Custom hook to dampen scroll speed during transitions
 * Creates a smooth, slowed-down scroll effect in a specific zone
 */
export function useScrollDampening({ 
  isActive = false, 
  dampeningFactor = 0.3, // 0.3 = 70% slower
  transitionHeight = 800 // Height of the dampening zone in pixels
}) {
  const lastScrollY = useRef(0);
  const accumulatedScroll = useRef(0);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    if (!isActive) {
      // Reset when not active
      lastScrollY.current = window.scrollY;
      accumulatedScroll.current = 0;
      return;
    }

    const handleWheel = (e) => {
      // Only dampen if we're in the transition zone
      const currentScroll = window.scrollY;
      
      // Check if we're in the dampening zone (first 800px of scroll)
      if (currentScroll < transitionHeight) {
        e.preventDefault();
        
        // Accumulate the scroll delta with dampening
        const delta = e.deltaY * dampeningFactor;
        accumulatedScroll.current += delta;
        
        // Apply the dampened scroll
        const newScrollY = Math.max(0, currentScroll + delta);
        window.scrollTo({
          top: newScrollY,
          behavior: 'auto' // Instant for smooth control
        });
        
        // Clear existing timeout
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        
        // Set scrolling flag
        isScrolling.current = true;
        
        // Reset scrolling flag after user stops
        scrollTimeout.current = setTimeout(() => {
          isScrolling.current = false;
          accumulatedScroll.current = 0;
        }, 150);
      }
    };

    const handleTouchStart = (e) => {
      lastScrollY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const currentScroll = window.scrollY;
      
      if (currentScroll < transitionHeight) {
        const touchY = e.touches[0].clientY;
        const delta = (lastScrollY.current - touchY) * dampeningFactor;
        
        e.preventDefault();
        
        const newScrollY = Math.max(0, currentScroll + delta);
        window.scrollTo({
          top: newScrollY,
          behavior: 'auto'
        });
        
        lastScrollY.current = touchY;
      }
    };

    // Add event listeners with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isActive, dampeningFactor, transitionHeight]);

  return {
    isScrolling: isScrolling.current,
    accumulatedScroll: accumulatedScroll.current
  };
}
