import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * FlowDiagram - Animated flow/process diagram
 * Shows step-by-step process with animated connections
 */
export default function FlowDiagram({
  steps = [],
  direction = 'horizontal', // 'horizontal' | 'vertical'
  showArrows = true,
  accentColor = '#2563EB',
  className = ''
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const isHorizontal = direction === 'horizontal';

  return (
    <div 
      ref={containerRef}
      className={`flow-diagram ${className}`}
      style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isHorizontal ? '8px' : '16px',
        padding: '24px',
        width: '100%'
      }}
    >
      {steps.map((step, index) => (
        <div 
          key={index}
          style={{
            display: 'flex',
            flexDirection: isHorizontal ? 'row' : 'column',
            alignItems: 'center',
            gap: isHorizontal ? '8px' : '12px'
          }}
        >
          {/* Step Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ 
              delay: index * 0.2,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            {/* Circle with number/icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}08 100%)`,
                border: `2px solid ${accentColor}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              {/* Pulse ring animation */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
                style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  border: `2px solid ${accentColor}`,
                  pointerEvents: 'none'
                }}
              />
              
              {step.icon ? (
                <span style={{ color: accentColor, fontSize: '24px' }}>
                  {step.icon}
                </span>
              ) : (
                <span style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: accentColor
                }}>
                  {index + 1}
                </span>
              )}
            </motion.div>

            {/* Step label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.2, duration: 0.4 }}
              style={{
                textAlign: 'center',
                maxWidth: '120px'
              }}
            >
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#0B1220',
                display: 'block',
                marginBottom: '4px'
              }}>
                {step.title}
              </span>
              {step.description && (
                <span style={{
                  fontSize: '11px',
                  color: '#64748B',
                  lineHeight: 1.4
                }}>
                  {step.description}
                </span>
              )}
            </motion.div>
          </motion.div>

          {/* Arrow connector */}
          {showArrows && index < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.3, duration: 0.3 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: isHorizontal ? 'none' : 'rotate(90deg)'
              }}
            >
              {/* Animated arrow */}
              <svg 
                width="32" 
                height="24" 
                viewBox="0 0 32 24" 
                fill="none"
                style={{ overflow: 'visible' }}
              >
                {/* Arrow line with animation */}
                <motion.path
                  d="M0 12 L24 12"
                  stroke={accentColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ delay: index * 0.2 + 0.4, duration: 0.4 }}
                />
                {/* Arrow head */}
                <motion.path
                  d="M20 6 L28 12 L20 18"
                  stroke={accentColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.2 + 0.6, duration: 0.2 }}
                />
                {/* Moving dot */}
                <motion.circle
                  r="3"
                  fill={accentColor}
                  initial={{ cx: 0, cy: 12 }}
                  animate={isInView ? { 
                    cx: [0, 24, 0],
                    opacity: [0, 1, 0]
                  } : {}}
                  transition={{
                    delay: index * 0.2 + 0.8,
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
              </svg>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
