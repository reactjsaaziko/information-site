import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';

/**
 * SectionTransition - Wraps sections with smooth scroll-triggered animations
 * 
 * Props:
 * - children: Section content
 * - direction: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'blur'
 * - delay: Animation delay in seconds
 * - duration: Animation duration in seconds
 * - threshold: How much of section needs to be visible (0-1)
 * - once: Only animate once (default: true)
 * - className: Additional CSS classes
 * - style: Additional inline styles
 * - parallax: Enable parallax effect
 * - parallaxIntensity: Parallax movement intensity (default: 50)
 */
export default function SectionTransition({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  once = true,
  className = '',
  style = {},
  parallax = false,
  parallaxIntensity = 50,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold,
    margin: "-50px 0px"
  });

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(
    scrollYProgress, 
    [0, 1], 
    [parallaxIntensity, -parallaxIntensity]
  );

  // Animation variants based on direction
  const variants = useMemo(() => {
    const baseTransition = {
      duration,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94], // Smooth easeOutQuad
    };

    const directions = {
      up: {
        hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: baseTransition }
      },
      down: {
        hidden: { opacity: 0, y: -60, filter: 'blur(8px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: baseTransition }
      },
      left: {
        hidden: { opacity: 0, x: 80, filter: 'blur(8px)' },
        visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: baseTransition }
      },
      right: {
        hidden: { opacity: 0, x: -80, filter: 'blur(8px)' },
        visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: baseTransition }
      },
      fade: {
        hidden: { opacity: 0, filter: 'blur(6px)' },
        visible: { opacity: 1, filter: 'blur(0px)', transition: baseTransition }
      },
      scale: {
        hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
        visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: baseTransition }
      },
      blur: {
        hidden: { opacity: 0, filter: 'blur(20px)' },
        visible: { opacity: 1, filter: 'blur(0px)', transition: { ...baseTransition, duration: duration * 1.2 } }
      },
      slideScale: {
        hidden: { opacity: 0, y: 40, scale: 0.96, filter: 'blur(6px)' },
        visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: baseTransition }
      }
    };

    return directions[direction] || directions.up;
  }, [direction, duration, delay]);

  return (
    <motion.div
      ref={ref}
      className={`section-transition ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      style={{
        ...style,
        ...(parallax ? { y: parallaxY } : {}),
        willChange: 'transform, opacity, filter',
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer - Container for staggered child animations
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0.2,
  className = '',
  style = {},
  threshold = 0.1,
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem - Child item for StaggerContainer
 */
export function StaggerItem({
  children,
  direction = 'up',
  className = '',
  style = {},
}) {
  const itemVariants = {
    up: {
      hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
      visible: { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    left: {
      hidden: { opacity: 0, x: 40, filter: 'blur(4px)' },
      visible: { 
        opacity: 1, 
        x: 0, 
        filter: 'blur(0px)',
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.4 }
      }
    }
  };

  return (
    <motion.div
      className={className}
      style={style}
      variants={itemVariants[direction] || itemVariants.up}
    >
      {children}
    </motion.div>
  );
}
