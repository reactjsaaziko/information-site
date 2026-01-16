import { motion, AnimatePresence } from 'framer-motion';
import SceneMedia from './SceneMedia';
import SceneOverlay from './SceneOverlays';

/**
 * OrderSceneCard - Individual scene card with image, label, and overlay animation
 */
export default function OrderSceneCard({ scene, isActive, direction, reducedMotion }) {
  // Animation variants for scene transitions
  const variants = {
    enter: (dir) => ({
      opacity: 0,
      scale: reducedMotion ? 1 : 0.95,
      z: reducedMotion ? 0 : -50,
      x: reducedMotion ? 0 : dir > 0 ? 30 : -30,
    }),
    center: {
      opacity: 1,
      scale: 1,
      z: 0,
      x: 0,
    },
    exit: (dir) => ({
      opacity: 0,
      scale: reducedMotion ? 1 : 1.02,
      z: reducedMotion ? 0 : 30,
      x: reducedMotion ? 0 : dir > 0 ? -30 : 30,
    }),
  };

  return (
    <motion.article
      className="order-scene-card"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        duration: reducedMotion ? 0.2 : 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
      role="tabpanel"
      aria-label={`${scene.label} - Step ${scene.id}`}
    >
      {/* Scene image container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          aspectRatio: '4/3',
        }}
      >
        <SceneMedia scene={scene} isActive={isActive} reducedMotion={reducedMotion} />

        {/* Overlay animations */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <SceneOverlay overlayType={scene.overlayType} reducedMotion={reducedMotion} />
        </div>
      </div>

      {/* Scene label */}
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        style={{
          marginTop: '24px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            padding: '10px 24px',
            background: `linear-gradient(135deg, ${scene.accent}20 0%, ${scene.accent}10 100%)`,
            borderRadius: '16px',
            border: `1px solid ${scene.accent}30`,
            color: scene.accent,
            fontSize: '18px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            boxShadow: `0 4px 16px ${scene.accent}15`,
          }}
        >
          {scene.label}
        </span>
      </motion.div>
    </motion.article>
  );
}
