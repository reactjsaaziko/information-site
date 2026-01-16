'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Target, Telescope, Gem, ArrowRight, Sparkles } from 'lucide-react'

const CultureValuesScene = ({ onSegmentChange, isMobile, onBoundaryReached }) => {
  const containerRef = useRef(null)
  const [activeSegment, setActiveSegment] = useState(0)
  const [hasEntered, setHasEntered] = useState(false)
  const scrollAccumulator = useRef(0)
  const isScrolling = useRef(false)

  const values = [
    { 
      icon: Target, 
      title: 'Our Mission', 
      description: 'To make Next Gen Global Trade system to enter one million Indian manufacturers into the international market.',
      gradient: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
      color: 'var(--primary)',
      highlightBg: 'rgba(37, 99, 235, 0.15)',
      highlights: ['Global Reach', 'Verified Partners', 'Seamless Trade']
    },
    { 
      icon: Telescope, 
      title: 'Our Vision', 
      description: "To make Global Trade Easiest, Transparent & Trustful for everyone.",
      gradient: 'linear-gradient(135deg, var(--info) 0%, #0284c7 100%)',
      color: 'var(--info)',
      highlightBg: 'rgba(14, 165, 233, 0.15)',
      highlights: ['Market Leader', 'Trust First', 'Innovation Driven']
    },
    { 
      icon: Gem, 
      title: 'Our Values', 
      description: 'Transparency, trust, innovation, and excellence guide every decision we make.',
      gradient: 'linear-gradient(135deg, var(--success) 0%, #15803d 100%)',
      color: 'var(--success)',
      highlightBg: 'rgba(22, 163, 74, 0.15)',
      highlights: ['Transparency', 'Excellence', 'Integrity']
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    onSegmentChange?.(activeSegment)
  }, [activeSegment, onSegmentChange])

  const handleWheel = useCallback((e) => {
    if (isMobile) return
    scrollAccumulator.current += e.deltaY
    if (isScrolling.current) return
    
    if (Math.abs(scrollAccumulator.current) >= 80) {
      isScrolling.current = true
      if (scrollAccumulator.current > 0) {
        if (activeSegment < values.length - 1) setActiveSegment(prev => prev + 1)
        else onBoundaryReached?.('next')
      } else {
        if (activeSegment > 0) setActiveSegment(prev => prev - 1)
        else onBoundaryReached?.('prev')
      }
      scrollAccumulator.current = 0
      setTimeout(() => { isScrolling.current = false }, 400)
    }
  }, [activeSegment, values.length, isMobile, onBoundaryReached])

  useEffect(() => {
    const container = containerRef.current
    if (!container || isMobile) return
    container.addEventListener('wheel', handleWheel, { passive: true })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [handleWheel, isMobile])

  return (
    <div ref={containerRef} style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '80px 20px' : '80px 48px'
    }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '56px',
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'var(--primary-bg)',
            borderRadius: 'var(--radius-full)',
            marginBottom: '24px',
            border: '1px solid rgba(37, 99, 235, 0.2)'
          }}>
            <Sparkles size={14} color="var(--primary)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-dark)' }}>Who We Are</span>
          </div>

          <h2 style={{ 
            fontSize: isMobile ? '36px' : '52px', 
            fontWeight: 800, 
            color: 'var(--text)', 
            marginBottom: '16px',
            letterSpacing: '-0.03em',
            lineHeight: 1.1
          }}>
            Culture & <span style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Values</span>
          </h2>

          <p style={{ 
            fontSize: '18px', 
            color: 'var(--text-secondary)', 
            maxWidth: '500px', 
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            The principles that guide every decision we make and shape our journey forward
          </p>
        </div>

        {/* Progress indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '48px',
          opacity: hasEntered ? 1 : 0,
          transition: 'opacity 0.4s ease 0.2s'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: values[activeSegment].color }}>
            {String(activeSegment + 1).padStart(2, '0')}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {values.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSegment(i)}
                style={{
                  width: activeSegment === i ? '40px' : '12px',
                  height: '6px',
                  borderRadius: '3px',
                  border: 'none',
                  borderBottom: activeSegment === i ? `2px solid ${values[i].color}` : '2px solid var(--gray-300)',
                  background: activeSegment === i ? values[i].gradient : 'var(--gray-200)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}>
            {String(values.length).padStart(2, '0')}
          </span>
        </div>

        {/* Cards with 3D perspective */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '24px',
          perspective: '1200px'
        }}>
          {values.map((value, i) => {
            const Icon = value.icon
            const isActive = i === activeSegment
            
            // Different 3D rotations based on card position
            // Left card (i=0): tilts right, Center card (i=1): tilts forward, Right card (i=2): tilts left
            const getActiveTransform = () => {
              if (i === 0) return 'translateY(-12px) translateZ(40px) rotateY(6deg) rotateX(2deg)' // Left - tilts right
              if (i === 1) return 'translateY(-12px) translateZ(50px) rotateY(0deg) rotateX(4deg)' // Center - tilts forward
              return 'translateY(-12px) translateZ(40px) rotateY(-6deg) rotateX(2deg)' // Right - tilts left
            }
            
            return (
              <div
                key={i}
                onClick={() => setActiveSegment(i)}
                style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '32px 28px',
                  border: `2px solid ${isActive ? value.color : 'var(--gray-200)'}`,
                  borderBottom: `4px solid ${isActive ? value.color : 'var(--gray-300)'}`,
                  cursor: 'pointer',
                  opacity: hasEntered ? (isActive ? 1 : 0.7) : 0,
                  transform: hasEntered 
                    ? isActive 
                      ? getActiveTransform()
                      : 'translateY(0) translateZ(0) rotateY(0deg) rotateX(0deg)'
                    : 'translateY(30px) rotateX(10deg)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: hasEntered ? '0s' : `${i * 0.1}s`,
                  position: 'relative',
                  overflow: 'hidden',
                  transformStyle: 'preserve-3d',
                  transformOrigin: i === 0 ? 'right center' : i === 2 ? 'left center' : 'center center'
                }}
              >
                {/* Top gradient line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: isActive ? '4px' : '0px',
                  background: value.gradient,
                  transition: 'height 0.3s ease'
                }} />

                {/* Glow effect */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '200%',
                  height: '100px',
                  background: `radial-gradient(ellipse at center, ${value.color}10 0%, transparent 70%)`,
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.4s ease'
                }} />
                
                {/* Icon */}
                <div 
                  key={isActive ? `active-${i}-${activeSegment}` : `inactive-${i}`}
                  className="scene-card-icon"
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-lg)',
                    background: isActive ? value.gradient : 'var(--gray-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    transition: 'background 0.4s ease, border 0.4s ease',
                    border: isActive ? `2px solid ${value.color}` : '2px solid var(--gray-200)',
                    borderBottom: isActive ? `4px solid ${value.color}` : '4px solid var(--gray-300)',
                    position: 'relative',
                    zIndex: 1,
                    animation: isActive ? 'iconWiggle 0.5s ease-in-out' : 'none'
                  }}>
                  <Icon size={28} color={isActive ? 'white' : 'var(--gray-500)'} strokeWidth={1.5} />
                </div>
                
                {/* Keyframes for wiggle animation */}
                <style>{`
                  @keyframes iconWiggle {
                    0%, 100% { transform: rotate(0deg); }
                    20% { transform: rotate(-12deg); }
                    40% { transform: rotate(10deg); }
                    60% { transform: rotate(-8deg); }
                    80% { transform: rotate(5deg); }
                  }
                `}</style>
                
                <h3 style={{ 
                  fontSize: '22px', 
                  fontWeight: 700, 
                  color: 'var(--text)', 
                  marginBottom: '12px',
                  position: 'relative',
                  zIndex: 1
                }}>{value.title}</h3>
                
                <p style={{ 
                  fontSize: '15px', 
                  color: 'var(--text-secondary)', 
                  lineHeight: 1.7,
                  marginBottom: '20px',
                  position: 'relative',
                  zIndex: 1
                }}>{value.description}</p>

                {/* Highlights */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {value.highlights.map((h, j) => (
                    <span key={j} style={{
                      padding: '6px 12px',
                      background: isActive ? value.highlightBg : 'var(--gray-100)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: isActive ? value.color : 'var(--text-muted)',
                      transition: 'all 0.3s ease'
                    }}>
                      {h}
                    </span>
                  ))}
                </div>

                {/* Arrow indicator */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: '24px',
                    right: '24px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: value.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'scale(1)' : 'scale(0.8)',
                    transition: 'all 0.3s ease'
                  }}>
                    <ArrowRight size={16} color="white" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Scroll hint */}
        {!isMobile && (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '48px',
            opacity: hasEntered ? 1 : 0,
            transition: 'opacity 0.4s ease 0.3s'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 20px',
              background: 'var(--white)',
              borderRadius: 'var(--radius-full)',
              border: '2px solid var(--gray-200)',
              borderBottom: '4px solid var(--gray-300)'
            }}>
              <span style={{ 
                fontSize: '13px', 
                color: 'var(--text-secondary)', 
                fontWeight: 500 
              }}>
                ↕ Scroll to navigate
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CultureValuesScene
