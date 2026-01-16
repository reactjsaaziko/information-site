'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

/**
 * Enhanced background with React Bits-inspired animated elements
 */

// Floating particles component
const FloatingParticles = ({ count = 20, mode }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5
  }))

  const colors = {
    hero: ['rgba(37, 99, 235, 0.4)', 'rgba(14, 165, 233, 0.3)'],
    culture: ['rgba(37, 99, 235, 0.5)', 'rgba(37, 99, 235, 0.3)'],
    milestones: ['rgba(14, 165, 233, 0.4)', 'rgba(37, 99, 235, 0.3)']
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            x: `${p.x}vw`, 
            y: `${p.y}vh`,
            opacity: 0 
          }}
          animate={{ 
            y: [`${p.y}vh`, `${p.y - 30}vh`, `${p.y}vh`],
            x: [`${p.x}vw`, `${p.x + (Math.random() - 0.5) * 10}vw`, `${p.x}vw`],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: colors[mode]?.[p.id % 2] || colors.hero[0]
          }}
        />
      ))}
    </div>
  )
}

// Animated lines/rays
const AnimatedRays = ({ mode }) => {
  const rayColor = mode === 'milestones' ? 'rgba(14, 165, 233, 0.08)' : 'rgba(37, 99, 235, 0.08)'
  
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, rotate: 30 + i * 15 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 15 + i * 3,
            delay: i * 2,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '150%',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${rayColor}, transparent)`,
            transformOrigin: 'center'
          }}
        />
      ))}
    </div>
  )
}

// Geometric shapes
const GeometricShapes = ({ mode }) => {
  const primaryColor = mode === 'milestones' ? 'var(--secondary)' : 'var(--primary)'
  
  return (
    <>
      {/* Rotating square */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '80px',
          height: '80px',
          border: `1px solid ${primaryColor}20`,
          borderRadius: '8px'
        }}
      />
      
      {/* Pulsing circle */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '8%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: `2px solid ${primaryColor}15`
        }}
      />
      
      {/* Triangle */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '60%',
          right: '20%',
          width: 0,
          height: 0,
          borderLeft: '30px solid transparent',
          borderRight: '30px solid transparent',
          borderBottom: `50px solid ${primaryColor}10`
        }}
      />

      {/* Plus sign */}
      <motion.div
        animate={{ rotate: [0, 90, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '35%',
          left: '12%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '4px',
          background: `${primaryColor}20`,
          borderRadius: '2px'
        }} />
        <div style={{
          position: 'absolute',
          width: '4px',
          height: '100%',
          background: `${primaryColor}20`,
          borderRadius: '2px'
        }} />
      </motion.div>

      {/* Hexagon outline */}
      <motion.svg
        animate={{ rotate: [0, 60, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '60px',
          height: '60px',
          opacity: 0.3
        }}
        viewBox="0 0 100 100"
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
        />
      </motion.svg>
    </>
  )
}

// Grid pattern with animation
const AnimatedGrid = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `
        linear-gradient(rgba(37, 99, 235, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(37, 99, 235, 0.04) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px'
    }}
  />
)

// Floating dots cluster
const DotCluster = ({ x, y, mode }) => {
  const color = mode === 'milestones' ? 'var(--secondary)' : 'var(--primary)'
  
  return (
    <div style={{ position: 'absolute', left: x, top: y }}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -8, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 2 + i * 0.5,
            delay: i * 0.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            left: (i % 3) * 12,
            top: Math.floor(i / 3) * 12,
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: color,
            opacity: 0.4
          }}
        />
      ))}
    </div>
  )
}

const AboutStage = ({ mode = 'hero' }) => {
  const gradientRef = useRef(null)

  const configs = {
    hero: {
      primary: 'rgba(37, 99, 235, 0.08)',
      secondary: 'rgba(14, 165, 233, 0.05)',
      position: '50% 30%'
    },
    culture: {
      primary: 'rgba(37, 99, 235, 0.1)',
      secondary: 'rgba(14, 165, 233, 0.06)',
      position: '30% 40%'
    },
    milestones: {
      primary: 'rgba(14, 165, 233, 0.08)',
      secondary: 'rgba(37, 99, 235, 0.05)',
      position: '70% 35%'
    }
  }

  const config = configs[mode] || configs.hero

  useEffect(() => {
    if (gradientRef.current) {
      gsap.to(gradientRef.current, {
        background: `radial-gradient(ellipse 120% 100% at ${config.position}, ${config.primary} 0%, transparent 50%)`,
        duration: 1.2,
        ease: 'power2.out'
      })
    }
  }, [mode, config])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      background: 'var(--bg)',
      overflow: 'hidden'
    }}>
      {/* Base gradient */}
      <div ref={gradientRef} style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse 120% 100% at ${config.position}, ${config.primary} 0%, transparent 50%)`
      }} />

      {/* Animated grid */}
      <AnimatedGrid />

      {/* Floating particles */}
      <FloatingParticles count={15} mode={mode} />

      {/* Animated rays */}
      <AnimatedRays mode={mode} />

      {/* Geometric shapes */}
      <GeometricShapes mode={mode} />

      {/* Dot clusters */}
      <DotCluster x="5%" y="20%" mode={mode} />
      <DotCluster x="90%" y="45%" mode={mode} />
      <DotCluster x="15%" y="75%" mode={mode} />

      {/* Corner gradients */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '500px',
        height: '500px',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.04) 0%, transparent 60%)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '600px',
        height: '600px',
        background: 'linear-gradient(315deg, rgba(14, 165, 233, 0.04) 0%, transparent 60%)'
      }} />

      {/* Noise texture overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />
    </div>
  )
}

export default AboutStage
