import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

/**
 * ComparisonVisual - Before/after comparison graphic
 * Shows visual transformation from problem to solution
 * Uses CSS transitions instead of Framer Motion to prevent re-animation on scroll
 */
export default function ComparisonVisual({
  beforeItems = [],
  afterItems = [],
  beforeLabel = 'Before',
  afterLabel = 'After',
  beforeColor = '#EF4444',
  afterColor = '#16A34A',
  className = ''
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 600 : false);
  const [isTablet, setIsTablet] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 && window.innerWidth > 600 : false);

  // Once in view, mark as animated permanently
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 600);
      setIsTablet(width <= 768 && width > 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`comparison-visual ${className}`}
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'stretch',
        gap: isMobile ? '16px' : isTablet ? '16px' : '24px',
        padding: isMobile ? '16px 12px' : isTablet ? '20px 16px' : '24px',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto'
      }}
    >
      {/* Before Side */}
      <div
        style={{
          flex: 1,
          width: isMobile ? '100%' : 'auto',
          background: `linear-gradient(135deg, ${beforeColor}08 0%, ${beforeColor}03 100%)`,
          border: `1px solid ${beforeColor}20`,
          borderRadius: isMobile ? '12px' : '16px',
          padding: isMobile ? '14px' : isTablet ? '16px' : '20px',
          position: 'relative',
          overflow: 'hidden',
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated 
            ? 'translate(0, 0)' 
            : isMobile ? 'translate(0, -20px)' : 'translate(-30px, 0)',
          transition: 'opacity 0.6s ease, transform 0.6s ease'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '6px' : '8px',
          marginBottom: isMobile ? '12px' : '16px'
        }}>
          <div
            style={{
              width: isMobile ? '26px' : '32px',
              height: isMobile ? '26px' : '32px',
              borderRadius: '50%',
              background: `${beforeColor}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width={isMobile ? "12" : "16"} height={isMobile ? "12" : "16"} viewBox="0 0 24 24" fill="none" stroke={beforeColor} strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{
            fontSize: isMobile ? '11px' : isTablet ? '12px' : '14px',
            fontWeight: 700,
            color: beforeColor,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {beforeLabel}
          </span>
        </div>

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '6px' : '10px' }}>
          {beforeItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '8px' : '10px',
                padding: isMobile ? '8px 10px' : '10px 12px',
                background: 'white',
                borderRadius: isMobile ? '6px' : '8px',
                border: `1px solid ${beforeColor}15`,
                fontSize: isMobile ? '11px' : isTablet ? '12px' : '13px',
                color: '#475569',
                opacity: hasAnimated ? 1 : 0,
                transform: hasAnimated ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.4s ease ${index * 0.1 + 0.3}s, transform 0.4s ease ${index * 0.1 + 0.3}s`
              }}
            >
              <span style={{ color: beforeColor, fontSize: isMobile ? '10px' : '12px' }}>✕</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow/Transform indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transform: isMobile ? 'rotate(90deg)' : 'none',
          margin: isMobile ? '4px 0' : '0',
          opacity: hasAnimated ? 1 : 0,
          transition: 'opacity 0.4s ease 0.5s'
        }}
      >
        <div
          style={{
            width: isMobile ? '36px' : isTablet ? '40px' : '48px',
            height: isMobile ? '36px' : isTablet ? '40px' : '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(37, 99, 235, 0.3)'
          }}
        >
          <svg width={isMobile ? "18" : "24"} height={isMobile ? "18" : "24"} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* After Side */}
      <div
        style={{
          flex: 1,
          width: isMobile ? '100%' : 'auto',
          background: `linear-gradient(135deg, ${afterColor}08 0%, ${afterColor}03 100%)`,
          border: `1px solid ${afterColor}20`,
          borderRadius: isMobile ? '12px' : '16px',
          padding: isMobile ? '14px' : isTablet ? '16px' : '20px',
          position: 'relative',
          overflow: 'hidden',
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated 
            ? 'translate(0, 0)' 
            : isMobile ? 'translate(0, 20px)' : 'translate(30px, 0)',
          transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '6px' : '8px',
          marginBottom: isMobile ? '12px' : '16px'
        }}>
          <div
            style={{
              width: isMobile ? '26px' : '32px',
              height: isMobile ? '26px' : '32px',
              borderRadius: '50%',
              background: `${afterColor}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width={isMobile ? "12" : "16"} height={isMobile ? "12" : "16"} viewBox="0 0 24 24" fill="none" stroke={afterColor} strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{
            fontSize: isMobile ? '11px' : isTablet ? '12px' : '14px',
            fontWeight: 700,
            color: afterColor,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {afterLabel}
          </span>
        </div>

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '6px' : '10px' }}>
          {afterItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '8px' : '10px',
                padding: isMobile ? '8px 10px' : '10px 12px',
                background: 'white',
                borderRadius: isMobile ? '6px' : '8px',
                border: `1px solid ${afterColor}15`,
                fontSize: isMobile ? '11px' : isTablet ? '12px' : '13px',
                color: '#0B1220',
                opacity: hasAnimated ? 1 : 0,
                transform: hasAnimated ? 'translateX(0)' : 'translateX(20px)',
                transition: `opacity 0.4s ease ${index * 0.1 + 0.5}s, transform 0.4s ease ${index * 0.1 + 0.5}s`
              }}
            >
              <span style={{ color: afterColor, fontSize: isMobile ? '10px' : '12px' }}>✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
