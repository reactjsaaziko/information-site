'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Rocket, Factory, Globe, ShieldCheck, TrendingUp, Users, MapPin, Activity, Calendar, ArrowUpRight } from 'lucide-react'

// Animated counter
const useCounter = (end, duration = 1500, enabled = true) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!enabled) return
    const endNum = parseInt(end.replace(/\D/g, '')) || 0
    const start = performance.now()
    
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(endNum * ease))
      if (progress < 1) requestAnimationFrame(tick)
    }
    
    requestAnimationFrame(tick)
  }, [end, duration, enabled])
  
  return count
}

const MilestonesScene = ({ isMobile, onBoundaryReached }) => {
  const containerRef = useRef(null)
  const [hasEntered, setHasEntered] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollAccumulator = useRef(0)
  const isScrolling = useRef(false)

  const milestones = [
    { year: '2021', title: 'Founded', desc: 'Aaziko launched with a vision to transform B2B trade globally.', icon: Rocket, color: 'var(--primary)', gradient: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' },
    { year: '2022', title: '100+ Manufacturers', desc: 'Successfully onboarded verified Indian manufacturers to our platform.', icon: Factory, color: 'var(--primary)', gradient: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' },
    { year: '2023', title: 'Global Expansion', desc: 'Extended our reach to 25+ countries across multiple continents.', icon: Globe, color: 'var(--primary)', gradient: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' },
    { year: '2024', title: 'Compliance Platform', desc: 'Launched comprehensive verification and compliance system.', icon: ShieldCheck, color: 'var(--primary)', gradient: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' },
    { year: '2025', title: '1M+ Transactions', desc: 'Facilitated over one million trusted trade transactions globally.', icon: TrendingUp, color: 'var(--primary)', gradient: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' }
  ]

  const stats = [
    { value: '100+', label: 'Verified Partners', icon: Users, color: 'var(--primary)' },
    { value: '25+', label: 'Countries Served', icon: MapPin, color: 'var(--info)' },
    { value: '1M+', label: 'Transactions', icon: Activity, color: 'var(--success)' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleWheel = useCallback((e) => {
    if (isMobile) return
    scrollAccumulator.current += e.deltaY
    if (isScrolling.current) return
    
    if (Math.abs(scrollAccumulator.current) >= 60) {
      isScrolling.current = true
      if (scrollAccumulator.current > 0 && activeIndex < milestones.length - 1) {
        setActiveIndex(prev => prev + 1)
      } else if (scrollAccumulator.current < 0) {
        if (activeIndex > 0) setActiveIndex(prev => prev - 1)
        else onBoundaryReached?.('prev')
      }
      scrollAccumulator.current = 0
      setTimeout(() => { isScrolling.current = false }, 300)
    }
  }, [activeIndex, milestones.length, isMobile, onBoundaryReached])

  useEffect(() => {
    const container = containerRef.current
    if (!container || isMobile) return
    container.addEventListener('wheel', handleWheel, { passive: true })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [handleWheel, isMobile])

  const ActiveIcon = milestones[activeIndex].icon

  return (
    <div ref={containerRef} style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '80px 20px' : '80px 48px'
    }}>
      <div style={{ maxWidth: '1100px', width: '100%' }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '48px',
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'var(--secondary-bg)',
            borderRadius: 'var(--radius-full)',
            marginBottom: '24px',
            border: '1px solid rgba(37, 99, 235, 0.2)'
          }}>
            <Calendar size={14} color="var(--secondary)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--secondary-dark)' }}>Our Journey</span>
          </div>

          <h2 style={{ 
            fontSize: isMobile ? '36px' : '52px', 
            fontWeight: 800, 
            color: 'var(--text)',
            letterSpacing: '-0.03em',
            marginBottom: '16px'
          }}>
            Key <span style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Milestones</span>
          </h2>

          <p style={{ 
            fontSize: '18px', 
            color: 'var(--text-secondary)',
            maxWidth: '450px',
            margin: '0 auto'
          }}>
            From a bold idea to a trusted global platform
          </p>
        </div>

        {/* Timeline */}
        <div style={{ 
          position: 'relative', 
          marginBottom: '48px',
          padding: '24px 32px',
          background: 'var(--white)',
          borderRadius: 'var(--radius-xl)',
          border: '2px solid var(--gray-200)',
          borderBottom: '5px solid var(--gray-300)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', paddingBottom: '20px' }}>
            {/* Track */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: 0,
              right: 0,
              height: '4px',
              background: 'var(--gray-200)',
              borderRadius: '2px'
            }} />
            
            {/* Progress */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: 0,
              height: '4px',
              background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)',
              width: `${(activeIndex / (milestones.length - 1)) * 100}%`,
              transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              borderRadius: '2px'
            }} />

            {milestones.map((m, i) => {
              const isActive = i === activeIndex
              const isPast = i <= activeIndex
              
              return (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    position: 'relative',
                    zIndex: 1,
                    opacity: hasEntered ? 1 : 0,
                    transform: hasEntered ? 'translateY(0)' : 'translateY(10px)',
                    transition: `all 0.4s ease ${i * 0.05}s`
                  }}
                >
                  {/* Node - fixed size container to prevent layout shift */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: isActive ? '28px' : '16px',
                      height: isActive ? '28px' : '16px',
                      borderRadius: '50%',
                      background: isPast ? m.gradient : 'var(--white)',
                      border: `3px solid ${isPast ? m.color : 'var(--gray-300)'}`,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isActive && (
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: 'white'
                        }} />
                      )}
                    </div>
                  </div>
                  
                  {/* Year - fixed size to prevent layout shift */}
                  <span style={{
                    fontSize: '13px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'white' : 'var(--text-muted)',
                    marginTop: '12px',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: isActive ? m.gradient : 'transparent',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: `2px solid ${isActive ? m.color : 'var(--gray-300)'}`,
                    minWidth: '60px',
                    textAlign: 'center',
                    boxShadow: isActive ? `0 4px 12px ${m.color}30` : 'none'
                  }}>{m.year}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active milestone card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Main card */}
          <div style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            padding: '32px',
            border: '2px solid var(--gray-200)',
            borderBottom: '5px solid var(--gray-300)',
            opacity: hasEntered ? 1 : 0,
            transition: 'all 0.4s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Top accent */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: milestones[activeIndex].gradient
            }} />

            {/* Glow */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: '300px',
              height: '300px',
              background: `radial-gradient(circle, ${milestones[activeIndex].color}10 0%, transparent 70%)`,
              pointerEvents: 'none'
            }} />
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
              <div 
                className="milestone-icon-container"
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: 'var(--radius-lg)',
                  background: milestones[activeIndex].gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  animation: 'milestoneIconWiggle 0.5s ease-in-out'
                }}
                key={activeIndex}
              >
                <ActiveIcon size={32} color="white" strokeWidth={1.5} />
              </div>
              
              {/* Keyframes for wiggle animation */}
              <style>{`
                @keyframes milestoneIconWiggle {
                  0%, 100% { transform: rotate(0deg); }
                  20% { transform: rotate(-12deg); }
                  40% { transform: rotate(10deg); }
                  60% { transform: rotate(-8deg); }
                  80% { transform: rotate(5deg); }
                }
                .stat-icon-wiggle {
                  transition: transform 0.3s ease;
                }
                .stat-card:hover .stat-icon-wiggle {
                  animation: milestoneIconWiggle 0.5s ease-in-out;
                }
              `}</style>
              
              <div style={{ flex: 1 }}>
                <span style={{
                  display: 'inline-block',
                  padding: '6px 14px',
                  background: milestones[activeIndex].gradient,
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '12px'
                }}>
                  {milestones[activeIndex].year}
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
                  {milestones[activeIndex].title}
                </h3>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {milestones[activeIndex].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{
            display: 'grid',
            gridTemplateRows: 'repeat(3, 1fr)',
            gap: '12px',
            opacity: hasEntered ? 1 : 0,
            transition: 'opacity 0.4s ease 0.2s'
          }}>
            {stats.map((s, i) => (
              <StatCard key={i} stat={s} hasEntered={hasEntered} index={i} />
            ))}
          </div>
        </div>

        {/* Scroll hint - centered with timeline, accounting for side nav */}
        {!isMobile && (
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            paddingRight: '24px', /* Account for side nav visual balance */
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

const StatCard = ({ stat, hasEntered, index }) => {
  const count = useCounter(stat.value, 1500, hasEntered)
  const suffix = stat.value.includes('M') ? 'M+' : '+'
  const display = stat.value.includes('M') ? (count >= 1000000 ? '1' : '0') : count
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="stat-card"
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        border: '2px solid var(--gray-200)',
        borderBottom: '4px solid var(--gray-300)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="stat-icon-wiggle"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-md)',
          background: `${stat.color}10`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          animation: isHovered ? 'milestoneIconWiggle 0.5s ease-in-out' : 'none'
        }}
      >
        <stat.icon size={22} color={stat.color} strokeWidth={1.5} />
      </div>
      
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '28px',
          fontWeight: 800,
          color: stat.color,
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1
        }}>
          {display}{suffix}
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
          {stat.label}
        </div>
      </div>

      <ArrowUpRight size={18} color="var(--gray-400)" />
    </div>
  )
}

export default MilestonesScene
