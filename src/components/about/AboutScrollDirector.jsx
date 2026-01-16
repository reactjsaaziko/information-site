'use client'

import { useEffect, useRef, useState, createContext, useContext } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Context for sharing scroll state
const ScrollContext = createContext({
  activeScene: 'hero',
  progress: 0,
  cultureSegment: 0,
  isMobile: false,
  prefersReducedMotion: false
})

export const useScrollContext = () => useContext(ScrollContext)

const AboutScrollDirector = ({ children }) => {
  const containerRef = useRef(null)
  const lenisRef = useRef(null)
  
  const [activeScene, setActiveScene] = useState('hero')
  const [progress, setProgress] = useState(0)
  const [cultureSegment, setCultureSegment] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check device and preferences
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionQuery.matches)
    const motionHandler = (e) => setPrefersReducedMotion(e.matches)
    motionQuery.addEventListener('change', motionHandler)

    return () => {
      window.removeEventListener('resize', checkMobile)
      motionQuery.removeEventListener('change', motionHandler)
    }
  }, [])

  // Initialize Lenis (single instance)
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return

    // Create Lenis instance
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2
    })

    // Connect Lenis to ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update)

    // GSAP ticker for Lenis
    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenisRef.current?.destroy()
      gsap.ticker.remove(lenisRef.current?.raf)
    }
  }, [prefersReducedMotion, isMobile])

  // Scene detection
  useEffect(() => {
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Hero scene
      ScrollTrigger.create({
        trigger: '[data-scene="hero"]',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveScene('hero'),
        onEnterBack: () => setActiveScene('hero')
      })

      // Culture scene
      ScrollTrigger.create({
        trigger: '[data-scene="culture"]',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveScene('culture'),
        onEnterBack: () => setActiveScene('culture'),
        onUpdate: (self) => setProgress(self.progress)
      })

      // Milestones scene
      ScrollTrigger.create({
        trigger: '[data-scene="milestones"]',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveScene('milestones'),
        onEnterBack: () => setActiveScene('milestones')
      })
    }, containerRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  // Handle culture segment changes from child
  const handleCultureSegmentChange = (segment) => {
    setCultureSegment(segment)
  }

  const contextValue = {
    activeScene,
    progress,
    cultureSegment,
    isMobile,
    prefersReducedMotion,
    onCultureSegmentChange: handleCultureSegmentChange
  }

  return (
    <ScrollContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh'
        }}
      >
        {children}
      </div>
    </ScrollContext.Provider>
  )
}

export default AboutScrollDirector
