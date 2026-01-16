import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

/**
 * React Bits-inspired text animation components
 */

// SplitText - Animated character/word reveal
export const SplitText = ({ 
  text, 
  type = 'chars', // 'chars' | 'words'
  delay = 0,
  staggerDelay = 0.03,
  className = '',
  style = {}
}) => {
  const items = type === 'chars' ? text.split('') : text.split(' ')
  
  return (
    <span className={className} style={{ display: 'inline-flex', flexWrap: 'wrap', ...style }}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + (i * staggerDelay),
            ease: [0.25, 0.1, 0.25, 1]
          }}
          style={{ 
            display: 'inline-block',
            whiteSpace: type === 'words' ? 'pre' : 'normal'
          }}
        >
          {item}{type === 'words' && i < items.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  )
}

// RotatingText - Cycle through multiple phrases
export const RotatingText = ({
  texts = [],
  duration = 3000,
  className = '',
  style = {}
}) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (texts.length <= 1) return
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % texts.length)
    }, duration)
    return () => clearInterval(interval)
  }, [texts.length, duration])

  return (
    <span 
      className={className} 
      style={{ 
        display: 'inline-block', 
        position: 'relative',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        ...style 
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'inline-block' }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ShinyText - Shimmer/shine effect
export const ShinyText = ({
  children,
  className = '',
  style = {},
  shimmerColor = 'rgba(255, 255, 255, 0.8)',
  duration = 2.5
}) => {
  return (
    <motion.span
      className={className}
      style={{
        display: 'inline-block',
        position: 'relative',
        background: `linear-gradient(
          120deg,
          currentColor 0%,
          currentColor 40%,
          ${shimmerColor} 50%,
          currentColor 60%,
          currentColor 100%
        )`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        ...style
      }}
      animate={{
        backgroundPosition: ['200% center', '-200% center']
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
        repeatDelay: 1
      }}
    >
      {children}
    </motion.span>
  )
}

// GradientText - Animated gradient text
export const GradientText = ({
  children,
  colors = ['var(--primary)', 'var(--info)', 'var(--primary)'],
  className = '',
  style = {},
  animate = true,
  duration = 3
}) => {
  const gradientStyle = {
    background: `linear-gradient(135deg, ${colors.join(', ')})`,
    backgroundSize: animate ? '200% 200%' : '100% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    ...style
  }

  if (!animate) {
    return <span className={className} style={gradientStyle}>{children}</span>
  }

  return (
    <motion.span
      className={className}
      style={gradientStyle}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      {children}
    </motion.span>
  )
}

// BlurText - Text that reveals from blur
export const BlurText = ({
  text,
  delay = 0,
  className = '',
  style = {}
}) => {
  return (
    <motion.span
      className={className}
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ display: 'inline-block', ...style }}
    >
      {text}
    </motion.span>
  )
}

// CountUp - Animated number counter
export const CountUp = ({
  end,
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = '',
  className = '',
  style = {}
}) => {
  const [count, setCount] = useState(0)
  const numericEnd = parseInt(end.toString().replace(/\D/g, '')) || 0

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = performance.now()
      
      const animate = (currentTime) => {
        const elapsed = (currentTime - startTime) / 1000
        const progress = Math.min(elapsed / duration, 1)
        
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(numericEnd * eased))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [numericEnd, duration, delay])

  return (
    <span className={className} style={style}>
      {prefix}{count}{suffix}
    </span>
  )
}

// TextReveal - Line by line reveal
export const TextReveal = ({
  children,
  delay = 0,
  className = '',
  style = {}
}) => {
  return (
    <div style={{ overflow: 'hidden', ...style }} className={className}>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// TypingText - Typewriter effect
export const TypingText = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  style = {},
  showCursor = true
}) => {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTyping(true)
      let i = 0
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
          setIsTyping(false)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return (
    <span className={className} style={style}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ marginLeft: '2px' }}
        >
          |
        </motion.span>
      )}
    </span>
  )
}
