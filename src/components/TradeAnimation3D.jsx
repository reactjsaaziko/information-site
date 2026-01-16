import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './TradeAnimation3D.css'

function TradeAnimation3D({ onAnimationComplete }) {
  const cubeRef = useRef(null)
  const shadowRef = useRef(null)
  const causticsRef = useRef(null)
  const ringsContainerRef = useRef(null)
  const ring1Ref = useRef(null)
  const ring2Ref = useRef(null)
  const ring3Ref = useRef(null)
  const personLeftRef = useRef(null)
  const personRightRef = useRef(null)
  const videoCardLeftRef = useRef(null)
  const videoCardRightRef = useRef(null)
  const arrowRef = useRef(null)
  const buyerAmountRef = useRef(null)
  const sellerAmountRef = useRef(null)
  const sellerHeadAmountRef = useRef(null)
  const buyerHeadAmountRef = useRef(null)
  const aazikoSolutionRef = useRef(null)
  const solutionCardLeftRef = useRef(null)
  const solutionCardRightRef = useRef(null)
  const sectionRef = useRef(null)
  const sceneContainerRef = useRef(null)

  const [buttonTextIndex, setButtonTextIndex] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [earthContainerReady, setEarthContainerReady] = useState(false)
  const [isReadyToAnimate, setIsReadyToAnimate] = useState(false)

  const buttonTexts = [
    '+ 0.2% inspection',
    '+ 0.1% insurance',
    '+ 2% local transport',
    '+ 1% port handling',
    '+ 0.2% CHFE',
    '+ 3% Freight',
    '+ 0.2% CHFE',
    '+ 2% local transport'
  ]

  const totalChargesPercent = 8.9
  const basePrice = 100
  const totalPrice = basePrice + (basePrice * totalChargesPercent / 100)
  const conversionCharge = 2
  const sellerReceives = basePrice - conversionCharge
  const usdToInr = 83
  const sellerReceivesInr = sellerReceives * usdToInr

  // Get responsive values based on screen width
  // On mobile (768px and below), CSS handles scaling via transform on .trade-anim-scene-container
  // So we keep sceneScale at 1 and let CSS do the work
  const getResponsiveValues = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1920
    if (width <= 768) {
      // Mobile - CSS handles all scaling, keep original positions
      return { personX: 500, cardX: 780, sceneScale: 1, personY: 80, isMobile: true }
    } else if (width <= 900) {
      return { personX: 220, cardX: 380, sceneScale: 1.2, personY: 50, isMobile: false }
    } else if (width <= 1100) {
      return { personX: 300, cardX: 480, sceneScale: 1.3, personY: 60, isMobile: false }
    } else if (width <= 1400) {
      return { personX: 400, cardX: 620, sceneScale: 1.4, personY: 80, isMobile: false }
    }
    return { personX: 500, cardX: 780, sceneScale: 1.5, personY: 80, isMobile: false }
  }

  const responsiveValuesRef = useRef(getResponsiveValues())

  // Animation refs - matching original exactly
  const rotationRef = useRef({ x: -30, y: 45 })
  const ringRotationRef = useRef(0)
  const ringOpacityRef = useRef(0)
  const targetRotation = useRef({ x: -30, y: 45 })
  const targetRingRotation = useRef(0)
  const targetRingOpacity = useRef(0)
  const targetCubeScale = useRef(1)
  const targetCubeOpacity = useRef(1)
  const cubeScaleRef = useRef(1)
  const cubeOpacityRef = useRef(1)
  const timeRef = useRef(0)

  const animationProgressRef = useRef(0)
  const targetAnimationProgress = useRef(0)
  const scrollPositionRef = useRef(0)
  const isAnimationReversedRef = useRef(true) // Track if animation has fully reversed
  const lastScrollYRef = useRef(0) // Track last scroll position for direction detection
  const isScrollingUpRef = useRef(false) // Track if user is scrolling up

  const ring1PosRef = useRef({ x: 0, y: 0, rotateX: 90, rotateY: 0, rotateZ: 0, scale: 1 })
  const ring2PosRef = useRef({ x: 0, y: 0, rotateX: 90, rotateY: 60, rotateZ: 0, scale: 1 })
  const ring1OpacityRef = useRef(1)
  const ring2OpacityRef = useRef(1)
  const ring3OpacityRef = useRef(1)
  const targetRing1Opacity = useRef(1)
  const targetRing2Opacity = useRef(1)
  const targetRing3Opacity = useRef(1)

  const personOpacityRef = useRef(0)
  const targetPersonOpacity = useRef(0)
  const videoCardOpacityRef = useRef(0)
  const targetVideoCardOpacity = useRef(0)
  const aazikoOpacityRef = useRef(0)
  const targetAazikoOpacity = useRef(0)

  const sceneScaleRef = useRef(1.5)
  const targetSceneScale = useRef(1.5)

  // Bezier curve helper
  const quadraticBezier = (t, p0, p1, p2) => {
    const oneMinusT = 1 - t
    return oneMinusT * oneMinusT * p0 + 2 * oneMinusT * t * p1 + t * t * p2
  }

  // Path for ring animation - smooth horizontal transition without vertical bounce
  const getPathPosition = (progress, isLeft) => {
    const direction = isLeft ? -1 : 1
    const startX = 0, startY = 0
    // Smooth horizontal movement with minimal vertical change
    const endX = direction * 500, endY = 50
    // Use easeOutCubic for smoother deceleration
    const easeProgress = 1 - Math.pow(1 - progress, 3)
    return {
      x: startX + (endX - startX) * easeProgress,
      y: startY + (endY - startY) * easeProgress
    }
  }

  const createRingSegments = (radius, ringHeight, ringDepth) => {
    const segments = 72
    const segmentWidth = (2 * Math.PI * radius) / segments * 1.15

    return [...Array(segments)].map((_, i) => {
      const angle = (i / segments) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const rotY = (angle * 180) / Math.PI

      return (
        <div key={i} className="trade-anim-ring-segment" style={{
          width: segmentWidth, height: ringHeight,
          transform: `translate3d(${x - segmentWidth / 2}px, ${-ringHeight / 2}px, ${z}px) rotateY(${-rotY + 90}deg)`,
        }}>
          <div className="trade-anim-ring-face trade-anim-ring-face-front" style={{ transform: `translateZ(${ringDepth / 2}px)` }} />
          <div className="trade-anim-ring-face trade-anim-ring-face-back" style={{ transform: `translateZ(${-ringDepth / 2}px)` }} />
          <div className="trade-anim-ring-face trade-anim-ring-face-top" style={{ height: ringDepth }} />
          <div className="trade-anim-ring-face trade-anim-ring-face-bottom" style={{ height: ringDepth }} />
        </div>
      )
    })
  }

  const updateAnimationState = (totalScroll) => {
    // Phase 1: Cube rotation (0 to 200)
    if (totalScroll <= 200) {
      const cubeProgress = totalScroll / 200
      targetRotation.current.y = 45 + cubeProgress * 180
      targetRotation.current.x = -30 + cubeProgress * 90
      targetRingOpacity.current = 0
      targetCubeScale.current = 1
      targetCubeOpacity.current = 1
      targetAnimationProgress.current = 0
      targetRing1Opacity.current = 1
      targetRing2Opacity.current = 1
      targetRing3Opacity.current = 1
      targetPersonOpacity.current = 0
      targetVideoCardOpacity.current = 0
      targetAazikoOpacity.current = 0
      targetSceneScale.current = 1.5
      targetRingRotation.current = 0
    }
    // Phase 2 & 3: Rings appear, spin, separate (200 to 600)
    else if (totalScroll <= 600) {
      targetRotation.current.y = 45 + 180
      targetRotation.current.x = -30 + 90

      const ringPhaseProgress = (totalScroll - 200) / 400
      const newOpacity = Math.min(1, ringPhaseProgress * 1.25)

      targetRingRotation.current = ringPhaseProgress * 360
      targetRingOpacity.current = newOpacity

      if (ringPhaseProgress <= 0.6) {
        const shrinkProgress = ringPhaseProgress / 0.6
        targetCubeScale.current = 1 - shrinkProgress * 0.9
        targetCubeOpacity.current = 1
        targetAnimationProgress.current = 0
        targetRing1Opacity.current = 1
        targetRing2Opacity.current = 1
        targetRing3Opacity.current = 1
        targetPersonOpacity.current = 0
        targetVideoCardOpacity.current = 0
        targetSceneScale.current = 1.5
      } else {
        targetCubeScale.current = 0.1
        const fadeProgress = (ringPhaseProgress - 0.6) / 0.4
        targetCubeOpacity.current = 1 - fadeProgress
        targetAnimationProgress.current = fadeProgress
        targetRing1Opacity.current = 1
        targetRing2Opacity.current = 1
        targetRing3Opacity.current = 1 - fadeProgress
        targetPersonOpacity.current = fadeProgress > 0.3 ? (fadeProgress - 0.3) / 0.7 : 0
        targetVideoCardOpacity.current = 0
        targetAazikoOpacity.current = 0
        targetSceneScale.current = 1.5
      }
    }
    // Phase 4: Video cards appear (600 to 700)
    else if (totalScroll <= 700) {
      targetRotation.current.y = 45 + 180
      targetRotation.current.x = -30 + 90
      targetRingOpacity.current = 1
      targetRingRotation.current = 360
      targetCubeScale.current = 0.1
      targetCubeOpacity.current = 0
      targetAnimationProgress.current = 1
      targetRing1Opacity.current = 1
      targetRing2Opacity.current = 1
      targetRing3Opacity.current = 0
      targetPersonOpacity.current = 1
      targetSceneScale.current = 1.5
      targetAazikoOpacity.current = 0

      const videoProgress = (totalScroll - 600) / 100
      targetVideoCardOpacity.current = Math.min(1, videoProgress)
    }
    // Phase 5: Camera zoom out (700 to 900)
    else {
      targetRotation.current.y = 45 + 180
      targetRotation.current.x = -30 + 90
      targetRingOpacity.current = 1
      targetRingRotation.current = 360
      targetCubeScale.current = 0.1
      targetCubeOpacity.current = 0
      targetAnimationProgress.current = 1
      targetRing1Opacity.current = 1
      targetRing2Opacity.current = 1
      targetRing3Opacity.current = 0
      targetPersonOpacity.current = 1
      // Keep all cards visible at full opacity
      targetVideoCardOpacity.current = 1
      targetAazikoOpacity.current = 1

      const zoomProgress = (totalScroll - 700) / 200
      targetSceneScale.current = 1.5 - (Math.min(1, zoomProgress) * 0.5)
    }
  }

  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.016

      // Determine if we're scrolling backwards (reversing animation)
      const isReversing = scrollPositionRef.current < 100

      // Use faster interpolation for quicker response, especially when reversing
      // Higher values = faster animation response
      const baseFactor = isReversing ? 0.25 : 0.18
      const slowFactor = isReversing ? 0.22 : 0.15
      const slowestFactor = isReversing ? 0.18 : 0.12

      // Smooth interpolation - faster when reversing
      rotationRef.current.x += (targetRotation.current.x - rotationRef.current.x) * baseFactor
      rotationRef.current.y += (targetRotation.current.y - rotationRef.current.y) * baseFactor
      ringRotationRef.current += (targetRingRotation.current - ringRotationRef.current) * baseFactor
      ringOpacityRef.current += (targetRingOpacity.current - ringOpacityRef.current) * baseFactor
      cubeScaleRef.current += (targetCubeScale.current - cubeScaleRef.current) * baseFactor
      cubeOpacityRef.current += (targetCubeOpacity.current - cubeOpacityRef.current) * baseFactor
      ring1OpacityRef.current += (targetRing1Opacity.current - ring1OpacityRef.current) * baseFactor
      ring2OpacityRef.current += (targetRing2Opacity.current - ring2OpacityRef.current) * baseFactor
      ring3OpacityRef.current += (targetRing3Opacity.current - ring3OpacityRef.current) * baseFactor
      personOpacityRef.current += (targetPersonOpacity.current - personOpacityRef.current) * slowFactor
      videoCardOpacityRef.current += (targetVideoCardOpacity.current - videoCardOpacityRef.current) * slowFactor
      aazikoOpacityRef.current += (targetAazikoOpacity.current - aazikoOpacityRef.current) * slowFactor
      sceneScaleRef.current += (targetSceneScale.current - sceneScaleRef.current) * slowestFactor
      animationProgressRef.current += (targetAnimationProgress.current - animationProgressRef.current) * slowFactor

      // Check if animation has fully reversed (all values near initial state)
      // Use more lenient thresholds to ensure smooth transition
      // Also check if scroll position is at the start
      const isFullyReversed = 
        scrollPositionRef.current <= 10 &&
        ringOpacityRef.current < 0.15 &&
        cubeOpacityRef.current > 0.85 &&
        cubeScaleRef.current > 0.85
      
      isAnimationReversedRef.current = isFullyReversed

      // Apply scene scale - only on desktop, CSS handles mobile scaling
      const rv = responsiveValuesRef.current
      if (sceneContainerRef.current && !rv.isMobile) {
        sceneContainerRef.current.style.transform = `scale(${sceneScaleRef.current})`
      }

      const progress = animationProgressRef.current

      // Update ring positions based on animation progress
      if (progress <= 0.3) {
        ring1PosRef.current = { x: 0, y: 0, rotateX: 90, rotateY: 0, rotateZ: ringRotationRef.current, scale: 1 }
        ring2PosRef.current = { x: 0, y: 0, rotateX: 90, rotateY: 60, rotateZ: -ringRotationRef.current, scale: 1 }
      } else {
        const pathProgress = (progress - 0.3) / 0.7
        const pos1 = getPathPosition(pathProgress, true)
        const pos2 = getPathPosition(pathProgress, false)
        const scale = 1 - (0.6 * pathProgress)
        // Smoother rotation transition using easeOutQuad
        const easePathProgress = 1 - Math.pow(1 - pathProgress, 2)
        const rotateX = 90 * (1 - easePathProgress)
        const spinZ = ringRotationRef.current * (1 - easePathProgress)
        const spinZ2 = -ringRotationRef.current * (1 - easePathProgress)

        ring1PosRef.current = { x: pos1.x, y: pos1.y, rotateX, rotateY: 0, rotateZ: spinZ, scale }
        ring2PosRef.current = { x: pos2.x, y: pos2.y, rotateX, rotateY: 60 * (1 - easePathProgress), rotateZ: spinZ2, scale }
      }

      // Shadow calculations
      const shadowOffsetX = Math.sin(rotationRef.current.y * Math.PI / 180) * 30
      const shadowOffsetY = Math.cos(rotationRef.current.x * Math.PI / 180) * 10 + 120
      const shadowScale = 0.6 + Math.sin(rotationRef.current.x * Math.PI / 180) * 0.1

      // Apply transforms - Earth uses simple scale and opacity, rotation is handled by Three.js
      if (cubeRef.current) {
        cubeRef.current.style.transform = `translate(-50%, -50%) scale(${cubeScaleRef.current})`
        cubeRef.current.style.opacity = cubeOpacityRef.current
      }

      if (shadowRef.current) {
        shadowRef.current.style.transform = `translate(${shadowOffsetX}px, ${shadowOffsetY}px) rotateX(80deg) scale(${shadowScale}, ${shadowScale * 0.4})`
        shadowRef.current.style.opacity = cubeOpacityRef.current * 0.4
      }

      if (causticsRef.current) {
        const causticOffset = Math.sin(timeRef.current * 2) * 10
        causticsRef.current.style.transform = `translate(${shadowOffsetX + causticOffset}px, ${shadowOffsetY + 20}px) rotateX(80deg) scale(${shadowScale * 1.2})`
        causticsRef.current.style.opacity = cubeOpacityRef.current * (0.3 + Math.sin(timeRef.current * 3) * 0.1)
      }

      if (ringsContainerRef.current) ringsContainerRef.current.style.opacity = ringOpacityRef.current

      if (ring1Ref.current) {
        const r1 = ring1PosRef.current
        ring1Ref.current.style.transform = `translate(-50%, -50%) translateX(${r1.x}px) translateY(${r1.y}px) rotateX(${r1.rotateX}deg) rotateY(${r1.rotateY}deg) rotateZ(${r1.rotateZ}deg) scale(${r1.scale})`
        ring1Ref.current.style.opacity = ring1OpacityRef.current
      }

      if (ring2Ref.current) {
        const r2 = ring2PosRef.current
        ring2Ref.current.style.transform = `translate(-50%, -50%) translateX(${r2.x}px) translateY(${r2.y}px) rotateX(${r2.rotateX}deg) rotateY(${r2.rotateY}deg) rotateZ(${r2.rotateZ}deg) scale(${r2.scale})`
        ring2Ref.current.style.opacity = ring2OpacityRef.current
      }

      if (ring3Ref.current) {
        ring3Ref.current.style.transform = `translate(-50%, -50%) rotateX(90deg) rotateY(-60deg) rotateZ(${ringRotationRef.current}deg)`
        ring3Ref.current.style.opacity = ring3OpacityRef.current
      }

      if (personLeftRef.current) personLeftRef.current.style.opacity = personOpacityRef.current
      if (personRightRef.current) personRightRef.current.style.opacity = personOpacityRef.current

      // All 4 cards - animate without blur
      const problemCardOpacity = videoCardOpacityRef.current
      const solutionCardOpacity = aazikoOpacityRef.current

      // Scale animation - subtle scale from 0.95 to 1
      const problemScale = 0.95 + 0.05 * problemCardOpacity
      const solutionScale = 0.95 + 0.05 * solutionCardOpacity

      // Get responsive card positions
      const rvCards = responsiveValuesRef.current
      const cardX = rvCards.cardX
      
      // Apply card transforms - on mobile CSS handles positioning via scene container scale
      // On desktop, JS handles positioning
      if (videoCardLeftRef.current) {
        videoCardLeftRef.current.style.opacity = problemCardOpacity
        videoCardLeftRef.current.style.transform = `translate(-50%, -50%) translateX(-${cardX || 780}px) translateY(280px) scale(${problemScale})`
        videoCardLeftRef.current.style.filter = 'none'
      }
      if (videoCardRightRef.current) {
        videoCardRightRef.current.style.opacity = problemCardOpacity
        videoCardRightRef.current.style.transform = `translate(-50%, -50%) translateX(${cardX || 780}px) translateY(280px) scale(${problemScale})`
        videoCardRightRef.current.style.filter = 'none'
      }
      if (solutionCardLeftRef.current) {
        solutionCardLeftRef.current.style.opacity = solutionCardOpacity
        solutionCardLeftRef.current.style.transform = `translate(-50%, -50%) translateX(-${cardX || 780}px) translateY(-280px) scale(${solutionScale})`
        solutionCardLeftRef.current.style.filter = 'none'
      }
      if (solutionCardRightRef.current) {
        solutionCardRightRef.current.style.opacity = solutionCardOpacity
        solutionCardRightRef.current.style.transform = `translate(-50%, -50%) translateX(${cardX || 780}px) translateY(-280px) scale(${solutionScale})`
        solutionCardRightRef.current.style.filter = 'none'
      }

      if (arrowRef.current) arrowRef.current.style.opacity = videoCardOpacityRef.current
      if (buyerAmountRef.current) buyerAmountRef.current.style.opacity = videoCardOpacityRef.current
      if (sellerAmountRef.current) sellerAmountRef.current.style.opacity = videoCardOpacityRef.current
      if (sellerHeadAmountRef.current) sellerHeadAmountRef.current.style.opacity = videoCardOpacityRef.current
      if (buyerHeadAmountRef.current) buyerHeadAmountRef.current.style.opacity = aazikoOpacityRef.current
      if (aazikoSolutionRef.current) aazikoSolutionRef.current.style.opacity = aazikoOpacityRef.current

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    // Wheel handler - controls animation based on scroll
    const handleWheel = (e) => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // Check if section top is at or near viewport top (section is in view for animation)
      // More lenient detection for smoother activation
      const sectionAtTop = rect.top <= 100 && rect.top >= -100
      const sectionInView = rect.top < viewportHeight * 0.7 && rect.bottom > viewportHeight * 0.3
      
      // Check if section FULLY covers the viewport (for scroll up activation)
      // More lenient check to handle fast scrolling - section top should be near top of viewport
      // and section should be tall enough to cover most of the viewport
      const sectionFullyCovered = rect.top <= 50 && rect.bottom >= viewportHeight - 50
      
      // Additional check: section is visible and takes up significant viewport space
      const sectionMostlyVisible = rect.top <= viewportHeight * 0.1 && rect.bottom >= viewportHeight * 0.9

      const delta = e.deltaY
      const maxScroll = 900

      // Activate when section reaches top of viewport (only after delay) - for scrolling DOWN
      if (!isActive && sectionAtTop && delta > 0 && isReadyToAnimate) {
        // Reset scroll position when re-activating to ensure animation plays from start
        scrollPositionRef.current = 0
        updateAnimationState(0)
        setAnimationComplete(false)
        setIsActive(true)
        e.preventDefault()
        return
      }

      // For scrolling UP: Only activate animation when section FULLY covers viewport
      // Use either strict or lenient check to handle fast scrolling
      if (!isActive && delta < 0) {
        // If section doesn't cover viewport enough, allow normal scroll
        if (!sectionFullyCovered && !sectionMostlyVisible) {
          return // Let page scroll normally
        }
        
        // Section covers viewport - now activate animation
        if (isReadyToAnimate) {
          // When scrolling up into this section, start from the end (animation complete state)
          scrollPositionRef.current = maxScroll
          updateAnimationState(maxScroll)
          setAnimationComplete(false) // Allow animation to reverse
          setIsActive(true)
          e.preventDefault()
          return
        }
      }

      // If not active, allow normal scroll
      if (!isActive) return

      // If animation complete and scrolling down, notify parent and allow scroll
      if (animationComplete && delta > 0) {
        if (onAnimationComplete) {
          onAnimationComplete()
        }
        return
      }

      // If scrolling up at start of animation, check if animation has fully reversed
      // Only allow scroll up to hero section if ring animation is complete (reversed)
      if (scrollPositionRef.current <= 0 && delta < 0) {
        // Check if animation has fully reversed to initial state
        if (isAnimationReversedRef.current) {
          setIsActive(false)
          // Don't scroll to top - let the page scroll naturally to reveal hero section
          // The hero section will handle its own animation when it becomes visible
          return // Allow normal scroll to hero
        }
        // Animation not fully reversed yet, prevent scroll and continue reversing
        e.preventDefault()
        return
      }

      // If animation complete and scrolling up, restart animation from current position
      if (animationComplete && delta < 0 && sectionInView) {
        setAnimationComplete(false)
        e.preventDefault()
        scrollPositionRef.current = Math.max(0, scrollPositionRef.current + delta * 0.4)
        updateAnimationState(scrollPositionRef.current)
        return
      }

      // During animation, prevent default scroll and control animation
      if (isActive && !animationComplete) {
        e.preventDefault()
        // Use faster scroll multiplier for more responsive feel during fast scrolling
        const scrollMultiplier = Math.abs(delta) > 50 ? 0.6 : 0.4
        scrollPositionRef.current = Math.max(0, Math.min(maxScroll, scrollPositionRef.current + delta * scrollMultiplier))
        updateAnimationState(scrollPositionRef.current)

        // Check if animation is complete
        if (scrollPositionRef.current >= maxScroll) {
          setAnimationComplete(true)
          if (onAnimationComplete) {
            onAnimationComplete()
          }
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    // Also listen to scroll events to detect when section comes into view during fast scrolling
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const currentScrollY = window.scrollY
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Detect scroll direction
      isScrollingUpRef.current = currentScrollY < lastScrollYRef.current
      lastScrollYRef.current = currentScrollY
      
      // Check if section fully covers viewport
      const sectionFullyCovered = rect.top <= 50 && rect.bottom >= viewportHeight - 50
      const sectionMostlyVisible = rect.top <= viewportHeight * 0.1 && rect.bottom >= viewportHeight * 0.9
      
      // If scrolling up and section covers viewport and we're not active, activate immediately
      // This catches fast scrolling scenarios where wheel events might be missed
      if (isScrollingUpRef.current && (sectionFullyCovered || sectionMostlyVisible) && isReadyToAnimate && !isActive) {
        const maxScroll = 900
        scrollPositionRef.current = maxScroll
        updateAnimationState(maxScroll)
        setAnimationComplete(false)
        setIsActive(true)
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Touch support for mobile
    let touchStartY = 0
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const touchY = e.touches[0].clientY
      const delta = (touchStartY - touchY) * 2 // Convert to scroll-like delta

      const sectionAtTop = rect.top <= 100 && rect.top >= -100
      const sectionInView = rect.top < viewportHeight * 0.7 && rect.bottom > viewportHeight * 0.3
      
      // Check if section FULLY covers the viewport (for scroll up activation)
      // More lenient check to handle fast scrolling
      const sectionFullyCovered = rect.top <= 50 && rect.bottom >= viewportHeight - 50
      const sectionMostlyVisible = rect.top <= viewportHeight * 0.1 && rect.bottom >= viewportHeight * 0.9

      const maxScroll = 900

      // Activate when section reaches top of viewport - for scrolling DOWN
      if (!isActive && sectionAtTop && delta > 0 && isReadyToAnimate) {
        scrollPositionRef.current = 0
        updateAnimationState(0)
        setAnimationComplete(false)
        setIsActive(true)
        e.preventDefault()
        touchStartY = touchY
        return
      }

      // For scrolling UP: Only activate animation when section covers viewport
      if (!isActive && delta < 0) {
        // If section doesn't cover viewport enough, allow normal scroll
        if (!sectionFullyCovered && !sectionMostlyVisible) {
          touchStartY = touchY
          return // Let page scroll normally
        }
        
        // Section covers viewport - now activate animation
        if (isReadyToAnimate) {
          scrollPositionRef.current = maxScroll
          updateAnimationState(maxScroll)
          setAnimationComplete(false)
          setIsActive(true)
          e.preventDefault()
          touchStartY = touchY
          return
        }
      }

      if (!isActive) {
        touchStartY = touchY
        return
      }

      if (animationComplete && delta > 0) {
        if (onAnimationComplete) {
          onAnimationComplete()
        }
        touchStartY = touchY
        return
      }

      if (scrollPositionRef.current <= 0 && delta < 0) {
        if (isAnimationReversedRef.current) {
          setIsActive(false)
          // Don't scroll to top - let the page scroll naturally to reveal hero section
          touchStartY = touchY
          return // Allow normal scroll to hero
        }
        // Animation not fully reversed yet, prevent scroll
        e.preventDefault()
        touchStartY = touchY
        return
      }

      if (animationComplete && delta < 0 && sectionInView) {
        setAnimationComplete(false)
        e.preventDefault()
        scrollPositionRef.current = Math.max(0, scrollPositionRef.current + delta * 0.4)
        updateAnimationState(scrollPositionRef.current)
        touchStartY = touchY
        return
      }

      if (isActive && !animationComplete) {
        e.preventDefault()
        // Use faster scroll multiplier for more responsive feel
        const scrollMultiplier = Math.abs(delta) > 30 ? 0.6 : 0.4
        scrollPositionRef.current = Math.max(0, Math.min(maxScroll, scrollPositionRef.current + delta * scrollMultiplier))
        updateAnimationState(scrollPositionRef.current)

        if (scrollPositionRef.current >= maxScroll) {
          setAnimationComplete(true)
          if (onAnimationComplete) {
            onAnimationComplete()
          }
        }
      }
      touchStartY = touchY
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [animationComplete, isActive, onAnimationComplete, isReadyToAnimate])

  // Button text rotation
  useEffect(() => {
    const textInterval = setInterval(() => {
      setButtonTextIndex((prevIndex) => (prevIndex + 1) % buttonTexts.length)
    }, 1250)
    return () => clearInterval(textInterval)
  }, [])

  // Shorter delay - animation can start sooner for smoother transition
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsReadyToAnimate(true)
    }, 500)
    return () => clearTimeout(delayTimer)
  }, [])

  // Update responsive values on resize
  useEffect(() => {
    const handleResize = () => {
      responsiveValuesRef.current = getResponsiveValues()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const size = 200
  const earthContainerRef = useRef(null)
  const earthSceneRef = useRef(null)

  // Initialize Earth 3D scene when container is ready - EXACTLY same as Earth3D component
  useEffect(() => {
    if (!earthContainerReady || !earthContainerRef.current || earthSceneRef.current) return

    const container = earthContainerRef.current
    const width = size
    const height = size

    // Texture URLs - same as Earth3D
    const EARTH_TEXTURE = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg'
    const EARTH_BUMP = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png'

    // Create scene - same as Earth3D
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
    camera.position.z = 2.8

    // Create renderer - same as Earth3D
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    // Create Earth group - same as Earth3D
    const earthGroup = new THREE.Group()
    scene.add(earthGroup)

    // Texture loader
    const textureLoader = new THREE.TextureLoader()
    textureLoader.crossOrigin = 'anonymous'

    // Lights - EXACTLY same as Earth3D
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xffffff, 2)
    sunLight.position.set(5, 3, 5)
    scene.add(sunLight)

    const fillLight = new THREE.DirectionalLight(0x4a90d9, 0.5)
    fillLight.position.set(-5, 0, -5)
    scene.add(fillLight)

    // Earth - EXACTLY same as Earth3D (using MeshPhongMaterial)
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64)
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 25,
    })
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial)
    earthGroup.add(earthMesh)

    // Load Earth texture - same as Earth3D
    textureLoader.load(EARTH_TEXTURE, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      earthMaterial.map = texture
      earthMaterial.needsUpdate = true
    })

    // Load bump map - same as Earth3D
    textureLoader.load(EARTH_BUMP, (texture) => {
      earthMaterial.bumpMap = texture
      earthMaterial.bumpScale = 0.05
      earthMaterial.needsUpdate = true
    })

    // Clouds - EXACTLY same as Earth3D
    const cloudsGeometry = new THREE.SphereGeometry(1.01, 64, 64)
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
    })
    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial)
    earthGroup.add(cloudsMesh)

    // Store refs for animation
    earthSceneRef.current = {
      scene,
      camera,
      renderer,
      earthGroup,
      earthMesh,
      cloudsMesh
    }

    // Animation loop - same rotation speed as Earth3D
    let animationId
    const animateEarth = () => {
      animationId = requestAnimationFrame(animateEarth)
      earthMesh.rotation.y += 0.001  // Same as Earth3D autoRotation
      cloudsMesh.rotation.y += 0.0002  // Same as Earth3D clouds rotation
      renderer.render(scene, camera)
    }
    animateEarth()

    return () => {
      cancelAnimationFrame(animationId)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      earthSceneRef.current = null
    }
  }, [earthContainerReady])


  return (
    <div ref={sectionRef} className={`trade-animation-section ${isActive ? 'active' : ''} ${animationComplete ? 'complete' : ''}`}>
      {/* Background */}
      <div className="trade-anim-bg" style={{ backgroundImage: 'url(/background.png)' }}>
        <div className="trade-anim-bg-overlay" />
      </div>

      {/* Ambient Glow Effects */}
      <div className="trade-anim-ambient">
        <div className="trade-anim-glow trade-anim-glow-1" />
        <div className="trade-anim-glow trade-anim-glow-2" />
        <div className="trade-anim-glow trade-anim-glow-3" />
        <div className="trade-anim-glow trade-anim-glow-4" />
      </div>

      {/* Main Scene */}
      <div className="trade-anim-scene" style={{ perspective: '1200px' }}>
        <div ref={sceneContainerRef} className="trade-anim-scene-container">
          {/* Shadow */}
          <div ref={shadowRef} className="trade-anim-shadow" style={{ width: size * 1.2, height: size * 1.2, marginLeft: -size * 0.6, marginTop: -size * 0.6 }} />

          {/* Caustics */}
          <div ref={causticsRef} className="trade-anim-caustics" style={{ width: size * 1.5, height: size * 1.5, marginLeft: -size * 0.75, marginTop: -size * 0.75 }} />

          {/* Rings Container */}
          <div ref={ringsContainerRef} className="trade-anim-rings-container" style={{ opacity: 0 }}>
            <div ref={ring1Ref} className="trade-anim-ring">{createRingSegments(180, 30, 10)}</div>
            <div ref={ring2Ref} className="trade-anim-ring">{createRingSegments(200, 30, 10)}</div>
            <div ref={ring3Ref} className="trade-anim-ring">{createRingSegments(220, 30, 10)}</div>
          </div>

          {/* Person Left - Buyer */}
          <div ref={personLeftRef} className="trade-anim-person trade-anim-person-left" style={{ opacity: 0 }}>
            <img src="/female.png" alt="Buyer" className="trade-anim-person-img" />
            <div className="trade-anim-person-shadow" />
          </div>

          {/* Person Right - Seller */}
          <div ref={personRightRef} className="trade-anim-person trade-anim-person-right" style={{ opacity: 0 }}>
            <img src="/male.png" alt="Seller" className="trade-anim-person-img" />
            <div className="trade-anim-person-shadow" />
          </div>

          {/* Arrow with moving goods */}
          <div ref={arrowRef} className="trade-anim-arrow" style={{ opacity: 0 }}>
            <svg width="100%" height="120" viewBox="0 0 1000 120" fill="none" preserveAspectRatio="xMidYMid meet">
              <path d="M 950 40 Q 500 110, 50 40" stroke="rgba(100, 200, 255, 0.6)" strokeWidth="3" fill="none" strokeDasharray="8 4" className="trade-anim-arrow-path" />
              <path d="M 50 40 L 65 35 L 65 45 Z" fill="rgba(100, 200, 255, 0.6)" className="trade-anim-arrow-head" />
            </svg>
            <div className="trade-anim-goods-container">
              <div className="trade-anim-price-tag">$100</div>
              <img src="/goods.png" alt="Goods" className="trade-anim-goods-img" />
              <div className="trade-anim-charges-tag">{buttonTexts[buttonTextIndex]}</div>
            </div>
          </div>

          {/* Buyer Amount */}
          <div ref={buyerAmountRef} className="trade-anim-amount trade-anim-amount-buyer" style={{ opacity: 0 }}>
            <div className="trade-anim-amount-inner trade-anim-amount-buyer-inner">
              <p className="trade-anim-amount-value" style={{ color: '#6ee7b7' }}>${totalPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* Seller Amount */}
          <div ref={sellerAmountRef} className="trade-anim-amount trade-anim-amount-seller" style={{ opacity: 0 }}>
            <div className="trade-anim-amount-inner trade-anim-amount-seller-inner">
              <p className="trade-anim-amount-label">$100 - $2 conversion charge</p>
              <p className="trade-anim-amount-value" style={{ color: '#6ee7b7' }}>${sellerReceives}</p>
              <p className="trade-anim-amount-inr">≈ ₹{sellerReceivesInr.toLocaleString('en-IN')}</p>
            </div>
          </div>

          {/* Seller Head Amount */}
          <div ref={sellerHeadAmountRef} className="trade-anim-amount trade-anim-amount-seller-head" style={{ opacity: 0 }}>
            <div className="trade-anim-amount-inner trade-anim-amount-seller-head-inner">
              <p className="trade-anim-amount-label">Full Payment</p>
              <p className="trade-anim-amount-value" style={{ color: '#6ee7b7' }}>$100 = ₹{(basePrice * usdToInr).toLocaleString('en-IN')}</p>
            </div>
          </div>

          {/* Buyer Head Amount - Aaziko discount */}
          <div ref={buyerHeadAmountRef} className="trade-anim-amount trade-anim-amount-buyer-head" style={{ opacity: 0 }}>
            <div className="trade-anim-amount-inner trade-anim-amount-buyer-head-inner">
              <p className="trade-anim-amount-label">$108.90 - $1.50 Aaziko discount</p>
              <p className="trade-anim-amount-value" style={{ color: '#6ee7b7' }}>$107.40</p>
            </div>
          </div>

          {/* Aaziko Solution - Top arrows: Seller → Aaziko → Buyer */}
          <div ref={aazikoSolutionRef} className="trade-anim-aaziko" style={{ opacity: 0 }}>
            {/* Aaziko Logo in Center */}
            <div className="trade-anim-aaziko-logo">
              <img src="/aaziko.png" alt="Aaziko" />
            </div>

            {/* Arrow from Seller (right) to Aaziko (center) - curved arrow pointing LEFT toward Aaziko */}
            <svg className="trade-anim-aaziko-arrow-svg trade-anim-aaziko-arrow-right-svg" viewBox="0 0 300 80" preserveAspectRatio="none">
              <path d="M 300 70 Q 150 0, 0 40" stroke="rgba(100, 200, 150, 0.7)" strokeWidth="3" fill="none" strokeDasharray="8 4" className="trade-anim-arrow-path" />
              <path d="M 0 40 L 15 33 L 15 47 Z" fill="rgba(100, 200, 150, 0.7)" className="trade-anim-arrow-head" />
            </svg>

            {/* Arrow from Aaziko (center) to Buyer (left) - curved arrow pointing LEFT toward Buyer */}
            <svg className="trade-anim-aaziko-arrow-svg trade-anim-aaziko-arrow-left-svg" viewBox="0 0 300 80" preserveAspectRatio="none">
              <path d="M 300 40 Q 150 0, 0 70" stroke="rgba(100, 200, 255, 0.7)" strokeWidth="3" fill="none" strokeDasharray="8 4" className="trade-anim-arrow-path" />
              <path d="M 0 70 L 15 63 L 15 77 Z" fill="rgba(100, 200, 255, 0.7)" className="trade-anim-arrow-head" />
            </svg>
          </div>

          {/* 3D Earth */}
          <div
            ref={(el) => {
              cubeRef.current = el
              earthContainerRef.current = el
              if (el && !earthContainerReady) {
                setEarthContainerReady(true)
              }
            }}
            className="trade-anim-earth"
            style={{ width: size, height: size }}
          />
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="trade-anim-bottom-gradient" />

      {/* Scroll Hint */}
      <p className="trade-anim-scroll-hint">Scroll to rotate</p>

      {/* Cards - Fixed position outside scene container */}
      {/* Solution Card LEFT - Buyer Solutions (at top left) - appears in Phase 5 */}
      <div ref={solutionCardLeftRef} className="trade-anim-card trade-anim-solution-left" style={{ opacity: 0 }}>
        <div className="trade-anim-card-inner">
          <div className="trade-anim-card-header">
            <span className="trade-anim-card-title" style={{ color: '#67e8f9' }}>Aaziko Solutions for Buyers</span>
          </div>
          <div className="trade-anim-card-body">
            {['✓ Verified supplier profiles', '✓ Quality assurance guarantee', '✓ Document verification', '✓ Transparent pricing', '✓ Clear accountability'].map((solution, i) => (
              <div key={i} className="trade-anim-card-item trade-anim-solution-item-buyer">{solution}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Problem Card LEFT - Buyer Problems (at bottom left) - appears in Phase 4 */}
      <div ref={videoCardLeftRef} className="trade-anim-card trade-anim-card-left" style={{ opacity: 0 }}>
        <div className="trade-anim-card-inner">
          <div className="trade-anim-card-header">
            <span className="trade-anim-card-title" style={{ color: '#67e8f9' }}>Buyer Problems</span>
          </div>
          <div className="trade-anim-card-body">
            {['"Is this supplier real?"', '"Will quality match what I ordered?"', '"Will documents be correct?"', '"Will shipping costs change later?"', '"If something goes wrong — who is responsible?"'].map((fear, i) => (
              <div key={i} className="trade-anim-card-item">{fear}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Solution Card RIGHT - Seller Solutions (at top right) - appears in Phase 5 */}
      <div ref={solutionCardRightRef} className="trade-anim-card trade-anim-solution-right" style={{ opacity: 0 }}>
        <div className="trade-anim-card-inner">
          <div className="trade-anim-card-header">
            <span className="trade-anim-card-title" style={{ color: '#6ee7b7' }}>Aaziko Solutions for Sellers</span>
          </div>
          <div className="trade-anim-card-body">
            {['✓ Guided documentation support', '✓ Optimized payment solutions', '✓ Direct buyer connections', '✓ Trust-building verification', '✓ Expert guidance at every step'].map((solution, i) => (
              <div key={i} className="trade-anim-card-item trade-anim-solution-item-seller">{solution}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Problem Card RIGHT - Seller Problems (at bottom right) - appears in Phase 4 */}
      <div ref={videoCardRightRef} className="trade-anim-card trade-anim-card-right" style={{ opacity: 0 }}>
        <div className="trade-anim-card-inner">
          <div className="trade-anim-card-header">
            <span className="trade-anim-card-title" style={{ color: '#6ee7b7' }}>Seller Problems</span>
          </div>
          <div className="trade-anim-card-body">
            {['"Export documentation is confusing."', '"Payments and currency conversion reduce my profit."', '"Too many middlemen and delays."', '"Buyers don\'t trust new suppliers."', '"One mistake can block future orders."'].map((fear, i) => (
              <div key={i} className="trade-anim-card-item">{fear}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradeAnimation3D
