import { useEffect, useMemo, forwardRef, useImperativeHandle, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollSectionPager, PHASE } from '../hooks/useScrollSectionPager'

const SECTION_IDS = ['hero', 'culture', 'milestones', 'footer']
const SECTION_LABELS = ['Home', 'Culture', 'Journey', 'Contact']
const EASE = [0.16, 1, 0.3, 1]

const AboutScrollZoomPager = forwardRef(({ sections, onSectionChange }, ref) => {
  const {
    activeIndex,
    phase,
    isAnimating,
    goTo,
    goNext,
    goPrev,
    count,
    prefersReducedMotion,
    isMobile,
  } = useScrollSectionPager({
    count: sections.length,
    sectionIds: SECTION_IDS,
  })

  useImperativeHandle(ref, () => ({ goNext, goPrev, goTo }), [goNext, goPrev, goTo])

  useEffect(() => {
    onSectionChange?.(activeIndex)
  }, [activeIndex, onSectionChange])

  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
      document.documentElement.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.documentElement.style.overflow = ''
    }
  }, [isMobile])

  const currentStyle = useMemo(() => {
    if (prefersReducedMotion) return { scale: 1, opacity: 1 }
    if (phase === PHASE.ZOOM_OUT || phase === PHASE.FADE_OUT) {
      return { scale: 1.06, opacity: 1, transition: { duration: 0.35, ease: EASE } }
    }
    return { scale: 1, opacity: 1, transition: { duration: 0.01 } }
  }, [phase, prefersReducedMotion])

  const variants = {
    initial: { scale: 1, opacity: 1 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.01 } },
    exit: { scale: 1.06, opacity: 1, transition: { duration: 0.35, ease: EASE } }
  }

  if (isMobile) {
    return (
      <div style={{ height: '100vh', overflowY: 'auto', scrollSnapType: 'y mandatory' }}>
        {sections.map((section, i) => (
          <div key={i} style={{ height: '100vh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
            {section}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          variants={variants}
          initial={phase === PHASE.ENTER ? 'initial' : false}
          animate={phase === PHASE.ENTER ? 'animate' : currentStyle}
          exit="exit"
          style={{ position: 'absolute', inset: 0, transformOrigin: 'center center' }}
        >
          {sections[activeIndex]}
        </motion.div>
      </AnimatePresence>

      {/* Side navigation */}
      <SideNav 
        count={count} 
        activeIndex={activeIndex} 
        goTo={goTo} 
        isAnimating={isAnimating} 
        labels={SECTION_LABELS} 
      />

      {/* Bottom progress */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'var(--gray-100)',
        zIndex: 100
      }}>
        <motion.div
          animate={{ width: `${((activeIndex + 1) / count) * 100}%` }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{ height: '100%', background: 'var(--primary)' }}
        />
      </div>

      {/* Scroll hint */}
      {activeIndex === 0 && !isAnimating && <ScrollHint />}
    </div>
  )
})

const SideNav = ({ count, activeIndex, goTo, isAnimating, labels }) => {
  const [hovered, setHovered] = useState(null)
  
  return (
    <nav style={{
      position: 'fixed',
      right: '24px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          {/* Tooltip */}
          <div style={{
            position: 'absolute',
            right: '100%',
            marginRight: '12px',
            padding: '6px 10px',
            background: 'var(--primary)',
            color: 'white',
            borderRadius: 'var(--radius)',
            fontSize: '12px',
            fontWeight: 500,
            opacity: hovered === i ? 1 : 0,
            transform: hovered === i ? 'translateX(0)' : 'translateX(4px)',
            transition: 'all 0.2s ease',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}>
            {labels[i]}
          </div>
          
          {/* Dot */}
          <button
            onClick={() => !isAnimating && goTo(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              width: activeIndex === i ? '12px' : '8px',
              height: activeIndex === i ? '12px' : '8px',
              borderRadius: '50%',
              border: 'none',
              padding: 0,
              cursor: isAnimating ? 'default' : 'pointer',
              background: activeIndex === i ? 'var(--primary)' : 'var(--gray-300)',
              transition: 'all 0.2s ease',
              opacity: isAnimating ? 0.5 : 1
            }}
          />
        </div>
      ))}
    </nav>
  )
}

const ScrollHint = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.5, duration: 0.4 }}
    style={{
      position: 'fixed',
      bottom: '32px',
      left: '0',
      right: '48px',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none'
    }}
  >
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '6px',
      background: 'var(--white)',
      padding: '12px 20px',
      borderRadius: 'var(--radius-lg)',
      border: '2px solid var(--gray-200)',
      borderBottom: '4px solid var(--gray-300)',
      pointerEvents: 'auto'
    }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        style={{
          width: '20px',
          height: '28px',
          borderRadius: '10px',
          border: '2px solid var(--gray-300)',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '6px'
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{
            width: '3px',
            height: '5px',
            borderRadius: '2px',
            background: 'var(--primary)'
          }}
        />
      </motion.div>
      <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
        Scroll to explore
      </span>
    </div>
    </div>
  </motion.div>
)

export default AboutScrollZoomPager
