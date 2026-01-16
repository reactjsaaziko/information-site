import { useState, useCallback, useEffect, useRef } from 'react'

/**
 * Premium scroll-based section pager hook
 * Handles wheel, keyboard, touch with proper throttling
 * Returns animation phase for sequenced zoom → fade → enter transitions
 */

// Animation phases
export const PHASE = {
  IDLE: 'idle',
  ZOOM_OUT: 'zoom_out',      // Current section zooms in (scale up)
  FADE_OUT: 'fade_out',      // Current section fades + blurs
  ENTER: 'enter',            // Next section scales up + fades in
}

export const useScrollSectionPager = ({
  count,
  sectionIds = [],
  updateHash = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [targetIndex, setTargetIndex] = useState(0)
  const [phase, setPhase] = useState(PHASE.IDLE)
  const [direction, setDirection] = useState(0) // 1 = down, -1 = up

  // Refs for scroll handling
  const isLocked = useRef(false)
  const accumulatedDelta = useRef(0)
  const deltaResetTimer = useRef(null)
  const touchStartY = useRef(0)

  // Config
  const DELTA_THRESHOLD = 250 // Accumulated delta needed to trigger (2-3 scrolls)
  const ZOOM_IN_DURATION = 400  // Time for zoom in before switching

  // Check reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  // Check if mobile
  const isMobile = useRef(
    typeof window !== 'undefined'
      ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      : false
  )

  /**
   * Run the full transition sequence
   */
  const runTransition = useCallback((newIndex, dir) => {
    if (isLocked.current) return
    if (newIndex < 0 || newIndex >= count) return
    if (newIndex === activeIndex) return

    isLocked.current = true
    setDirection(dir)
    setTargetIndex(newIndex)

    if (prefersReducedMotion.current) {
      // Simple instant transition for reduced motion
      setActiveIndex(newIndex)
      isLocked.current = false
      return
    }

    // Phase 1: Zoom IN current section
    setPhase(PHASE.ZOOM_OUT)

    setTimeout(() => {
      // After zoom in completes, switch directly to new section
      setActiveIndex(newIndex)
      setPhase(PHASE.IDLE)
      isLocked.current = false
      accumulatedDelta.current = 0
    }, ZOOM_IN_DURATION)

  }, [activeIndex, count])

  /**
   * Navigate to next section
   */
  const goNext = useCallback(() => {
    if (activeIndex < count - 1) {
      runTransition(activeIndex + 1, 1)
    }
  }, [activeIndex, count, runTransition])

  /**
   * Navigate to previous section
   */
  const goPrev = useCallback(() => {
    if (activeIndex > 0) {
      runTransition(activeIndex - 1, -1)
    }
  }, [activeIndex, runTransition])

  /**
   * Navigate to specific section
   */
  const goTo = useCallback((index) => {
    if (index !== activeIndex && index >= 0 && index < count) {
      runTransition(index, index > activeIndex ? 1 : -1)
    }
  }, [activeIndex, count, runTransition])

  /**
   * Wheel event handler with delta accumulation
   */
  useEffect(() => {
    if (isMobile.current) return // Skip on mobile

    const handleWheel = (e) => {
      e.preventDefault()

      if (isLocked.current) return

      // Accumulate delta for trackpad smoothness
      accumulatedDelta.current += e.deltaY

      // Clear accumulated delta after pause
      clearTimeout(deltaResetTimer.current)
      deltaResetTimer.current = setTimeout(() => {
        accumulatedDelta.current = 0
      }, 200)

      // Check threshold
      if (Math.abs(accumulatedDelta.current) >= DELTA_THRESHOLD) {
        if (accumulatedDelta.current > 0) {
          goNext()
        } else {
          goPrev()
        }
        accumulatedDelta.current = 0
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      clearTimeout(deltaResetTimer.current)
    }
  }, [goNext, goPrev])

  /**
   * Keyboard navigation
   */
  useEffect(() => {
    if (isMobile.current) return

    const handleKeyDown = (e) => {
      if (isLocked.current) return

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault()
          goNext()
          break
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          goPrev()
          break
        case ' ':
          e.preventDefault()
          e.shiftKey ? goPrev() : goNext()
          break
        case 'Home':
          e.preventDefault()
          goTo(0)
          break
        case 'End':
          e.preventDefault()
          goTo(count - 1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev, goTo, count])

  /**
   * Touch handling for mobile swipe
   */
  useEffect(() => {
    if (!isMobile.current) return

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isLocked.current) return

      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      const threshold = 60

      if (Math.abs(deltaY) > threshold) {
        deltaY > 0 ? goNext() : goPrev()
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [goNext, goPrev])

  /**
   * URL hash sync (optional)
   */
  useEffect(() => {
    if (updateHash && sectionIds[activeIndex]) {
      window.history.replaceState(null, '', `#${sectionIds[activeIndex]}`)
    }
  }, [activeIndex, sectionIds, updateHash])

  return {
    activeIndex,
    targetIndex,
    phase,
    direction,
    isAnimating: phase !== PHASE.IDLE,
    goNext,
    goPrev,
    goTo,
    count,
    prefersReducedMotion: prefersReducedMotion.current,
    isMobile: isMobile.current,
  }
}

export default useScrollSectionPager
