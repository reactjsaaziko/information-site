import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * AnimatedInfographic - Animated statistics and data visualization
 * Shows animated numbers, progress bars, and visual data
 */
export default function AnimatedInfographic({
  stats = [],
  layout = 'horizontal', // 'horizontal' | 'vertical' | 'grid'
  showConnectors = true,
  animationDelay = 0,
  className = ''
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 600 : false);
  const [isTablet, setIsTablet] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 && window.innerWidth > 600 : false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 600);
      setIsTablet(width <= 768 && width > 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On mobile, use 2x2 grid layout
  const effectiveLayout = isMobile ? 'grid' : layout;

  return (
    <div 
      ref={containerRef}
      className={`animated-infographic animated-infographic--${effectiveLayout} ${className}`}
      style={{
        display: 'flex',
        flexDirection: effectiveLayout === 'vertical' ? 'column' : 'row',
        flexWrap: isMobile || effectiveLayout === 'grid' ? 'wrap' : 'nowrap',
        gap: isMobile ? '12px' : isTablet ? '16px' : '24px',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: isMobile ? '12px 8px' : isTablet ? '16px' : '20px'
      }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="infographic-stat"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ 
            delay: animationDelay + index * 0.15,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: isMobile ? '14px 12px' : isTablet ? '16px 20px' : '20px 30px',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(124, 58, 237, 0.05) 100%)',
            borderRadius: isMobile ? '12px' : '16px',
            border: '1px solid rgba(37, 99, 235, 0.15)',
            position: 'relative',
            minWidth: isMobile ? 'calc(50% - 6px)' : isTablet ? '120px' : '140px',
            maxWidth: isMobile ? 'calc(50% - 6px)' : 'none',
            flex: isMobile ? '1 1 calc(50% - 6px)' : '0 0 auto'
          }}
        >
          {/* Animated number */}
          <AnimatedNumber 
            value={stat.value} 
            suffix={stat.suffix || ''} 
            prefix={stat.prefix || ''}
            isInView={isInView}
            delay={animationDelay + index * 0.15}
            isMobile={isMobile}
            isTablet={isTablet}
          />
          
          {/* Label */}
          <span style={{
            fontSize: isMobile ? '11px' : isTablet ? '12px' : '13px',
            color: '#64748B',
            marginTop: isMobile ? '6px' : '8px',
            textAlign: 'center',
            fontWeight: 500,
            lineHeight: 1.3
          }}>
            {stat.label}
          </span>

          {/* Progress bar if percentage */}
          {stat.showProgress && (
            <motion.div
              style={{
                width: '100%',
                height: isMobile ? '3px' : '4px',
                background: 'rgba(37, 99, 235, 0.1)',
                borderRadius: '2px',
                marginTop: isMobile ? '8px' : '12px',
                overflow: 'hidden'
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${stat.value}%` } : {}}
                transition={{ delay: animationDelay + index * 0.15 + 0.3, duration: 1, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #2563EB, #7C3AED)',
                  borderRadius: '2px'
                }}
              />
            </motion.div>
          )}

          {/* Connector line to next stat - hide on mobile */}
          {showConnectors && index < stats.length - 1 && layout === 'horizontal' && !isMobile && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: animationDelay + index * 0.15 + 0.4, duration: 0.5 }}
              style={{
                position: 'absolute',
                right: isTablet ? '-16px' : '-24px',
                top: '50%',
                width: isTablet ? '16px' : '24px',
                height: '2px',
                background: 'linear-gradient(90deg, #2563EB, transparent)',
                transformOrigin: 'left'
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Animated number counter
function AnimatedNumber({ value, suffix, prefix, isInView, delay, isMobile, isTablet }) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseFloat(value) || 0;

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const startTime = Date.now();
    const delayMs = delay * 1000;

    const timeout = setTimeout(() => {
      const animate = () => {
        const elapsed = Date.now() - startTime - delayMs;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        setDisplayValue(Math.round(numericValue * eased));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [isInView, numericValue, delay]);

  return (
    <span style={{
      fontSize: isMobile ? '24px' : isTablet ? '28px' : '32px',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
