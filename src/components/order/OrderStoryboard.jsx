import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { orderScenes, totalScenes } from './orderScenes';
import SceneOverlay from './SceneOverlays';
import './OrderStoryboard.css';

export default function OrderStoryboard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % totalScenes);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + totalScenes) % totalScenes);

  const activeScene = orderScenes[activeIndex];

  return (
    <section style={{
      padding: isMobile ? '20px 12px 40px' : '30px 24px 60px',
      position: 'relative',
      zIndex: 1,
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: 800,
            color: 'var(--text)',
            marginBottom: '8px',
          }}>
            How It Works
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
            12 simple steps from inquiry to delivery
          </p>
        </div>

        {/* Timeline - Single Row with Equal Boxes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${totalScenes}, 1fr)`,
          gap: isMobile ? '4px' : '8px',
          marginBottom: '32px',
          overflowX: isMobile ? 'auto' : 'visible',
          paddingBottom: isMobile ? '8px' : '0',
        }}>
          {orderScenes.map((scene, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;
            
            return (
              <motion.button
                key={scene.id}
                onClick={() => setActiveIndex(index)}
                whileHover={reducedMotion ? {} : { y: -3 }}
                whileTap={reducedMotion ? {} : { scale: 0.97 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '6px',
                  padding: isMobile ? '10px 4px' : '14px 8px',
                  minHeight: isMobile ? '80px' : '90px',
                  minWidth: isMobile ? '70px' : 'auto',
                  background: isActive 
                    ? 'var(--surface)'
                    : '#ffffff',
                  border: isActive 
                    ? `2px solid ${scene.accent}` 
                    : '2px solid var(--border)',
                  borderBottom: isActive 
                    ? `4px solid ${scene.accent}` 
                    : '4px solid var(--gray-300)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  boxShadow: isActive ? `0 4px 12px ${scene.accent}20` : 'none',
                }}
              >
                {/* Step Number */}
                <div style={{
                  width: isMobile ? '24px' : '28px',
                  height: isMobile ? '24px' : '28px',
                  borderRadius: '50%',
                  background: isActive ? scene.accent : isPast ? `${scene.accent}70` : 'var(--gray-200)',
                  color: isActive || isPast ? 'white' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '11px' : '12px',
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {index + 1}
                </div>
                
                {/* Label */}
                <span style={{
                  fontSize: isMobile ? '9px' : '10px',
                  fontWeight: 600,
                  color: isActive ? scene.accent : 'var(--text-secondary)',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  width: '100%',
                  padding: '0 2px',
                  wordBreak: 'break-word',
                }}>
                  {scene.label}
                </span>

                {/* Active indicator arrow */}
                {isActive && (
                  <motion.div
                    layoutId="activeArrow"
                    style={{
                      position: 'absolute',
                      bottom: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderTop: `6px solid ${scene.accent}`,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Connecting Line */}
        <div style={{
          maxWidth: '1400px',
          margin: '-24px auto 24px',
          padding: '0 40px',
          display: isMobile ? 'none' : 'block',
        }}>
          <div style={{
            height: '4px',
            background: 'var(--gray-200)',
            borderRadius: '2px',
            position: 'relative',
          }}>
            <motion.div
              animate={{ width: `${((activeIndex + 1) / totalScenes) * 100}%` }}
              transition={{ duration: 0.3 }}
              style={{
                height: '100%',
                background: `linear-gradient(90deg, ${orderScenes[0].accent}, ${activeScene.accent})`,
                borderRadius: '2px',
              }}
            />
          </div>
        </div>

        {/* Active Scene Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene.id}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '2px solid var(--border)',
              borderBottom: '5px solid var(--gray-300)',
              overflow: 'hidden',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            }}>
              {/* Image Side */}
              <div style={{
                position: 'relative',
                aspectRatio: isMobile ? '16/10' : '4/3',
                background: `linear-gradient(135deg, ${activeScene.accent}10 0%, ${activeScene.accent}20 100%)`,
                overflow: 'hidden',
              }}>
                <SceneImage scene={activeScene} reducedMotion={reducedMotion} />
                
                {/* Centered Overlay Animation */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  pointerEvents: 'none',
                }}>
                  <SceneOverlay overlayType={activeScene.overlayType} reducedMotion={reducedMotion} />
                </div>
              </div>

              {/* Content Side */}
              <div style={{
                padding: isMobile ? '20px 16px' : '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <span style={{
                  display: 'inline-block',
                  padding: '5px 10px',
                  background: `${activeScene.accent}15`,
                  borderRadius: '16px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: activeScene.accent,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '12px',
                  width: 'fit-content',
                }}>
                  Step {activeIndex + 1} of {totalScenes}
                </span>

                <h3 style={{
                  fontSize: isMobile ? '24px' : '30px',
                  fontWeight: 800,
                  color: 'var(--text)',
                  marginBottom: '10px',
                }}>
                  {activeScene.label}
                </h3>

                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '20px',
                }}>
                  {getSceneDescription(activeScene.id)}
                </p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <motion.button
                    onClick={goPrev}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 16px',
                      background: '#ffffff',
                      border: '2px solid var(--border)',
                      borderBottom: '3px solid var(--gray-300)',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text)',
                      cursor: 'pointer',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Previous
                  </motion.button>

                  <motion.button
                    onClick={goNext}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 16px',
                      background: activeScene.accent,
                      border: 'none',
                      borderBottom: `3px solid ${adjustColor(activeScene.accent, -30)}`,
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    {activeIndex === totalScenes - 1 ? 'Start Over' : 'Next Step'}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function SceneImage({ scene, reducedMotion }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      {!loaded && !error && (
        <motion.div
          animate={reducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '36px',
            height: '36px',
            border: `3px solid ${scene.accent}30`,
            borderTopColor: scene.accent,
            borderRadius: '50%',
          }}
        />
      )}
      <motion.img
        src={scene.imagePath}
        alt={scene.label}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: error ? 'none' : 'block',
          position: 'absolute',
          inset: 0,
        }}
      />
      {error && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: scene.accent,
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
          <span style={{ fontSize: '11px', opacity: 0.7 }}>{scene.imagePath}</span>
        </div>
      )}
    </>
  );
}

function getSceneDescription(id) {
  const descriptions = {
    'inquiry': 'Submit your product requirements and specifications. Our team reviews your needs and prepares a detailed response.',
    'quotation': 'Receive a comprehensive quote with pricing, MOQ, lead times, and payment terms tailored to your order.',
    'sampling': 'Request product samples to verify quality, materials, and specifications before placing your bulk order.',
    'order-confirm': 'Review and confirm your order details. Make any final adjustments before proceeding to payment.',
    'payment': 'Secure advance payment to initiate production. Multiple payment methods available for your convenience.',
    'order-contract': 'Sign the official order contract outlining all terms, specifications, and delivery commitments.',
    'manufacturing': 'Your products enter production. We provide regular updates and quality checkpoints throughout.',
    'inspection': 'Rigorous quality inspection ensures every item meets your specifications before shipping.',
    'full-payment': 'Complete the remaining balance after inspection approval. Your order is ready for shipment.',
    'logistic': 'Professional logistics handling with real-time tracking from factory to your destination.',
    'custom': 'Customs clearance and documentation handled smoothly for hassle-free import.',
    'order-receive': 'Receive your order and verify contents. Our support team is available for any questions.',
  };
  return descriptions[id] || 'Step in the order process.';
}

function adjustColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}
