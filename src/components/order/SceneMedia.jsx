import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScenePlaceholder from './ScenePlaceholder';

/**
 * SceneMedia - Renders scene image with soft-3D frame
 * Falls back to placeholder if image not available
 */
export default function SceneMedia({ scene, isActive, reducedMotion }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = scene.imagePath;
  }, [scene.imagePath]);

  const frameStyles = {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: `
      inset 0 2px 4px rgba(255,255,255,0.1),
      inset 0 -2px 4px rgba(11,31,59,0.1),
      0 25px 50px -12px rgba(11,31,59,0.4),
      0 12px 24px -8px ${scene.accent}30,
      0 0 0 1px rgba(255,255,255,0.05)
    `,
    background: 'linear-gradient(145deg, var(--primary) 0%, var(--primary-dark) 100%)',
  };

  return (
    <div style={frameStyles}>
      <div style={{
        position: 'absolute',
        inset: '4px',
        borderRadius: '20px',
        border: `1px solid ${scene.accent}20`,
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      <div style={{
        position: 'absolute',
        inset: '8px',
        borderRadius: '18px',
        overflow: 'hidden',
        background: 'var(--primary-dark)',
      }}>
        {imageError || !imageLoaded ? (
          <ScenePlaceholder scene={scene} reducedMotion={reducedMotion} />
        ) : (
          <motion.img
            src={scene.imagePath}
            alt={`${scene.label} - Order process step`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: isActive && !reducedMotion ? 1 : 1.02 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
      <div style={{
        position: 'absolute',
        inset: '8px',
        borderRadius: '18px',
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(11,31,59,0.3) 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
    </div>
  );
}
