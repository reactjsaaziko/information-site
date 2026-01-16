import { motion } from 'framer-motion';

/**
 * Placeholder component shown when scene image is not yet available
 */
export default function ScenePlaceholder({ scene, reducedMotion }) {
  return (
    <div
      className="scene-placeholder"
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${scene.accent}15 0%, ${scene.accent}30 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '24px',
        border: `2px dashed ${scene.accent}50`,
      }}
    >
      <motion.div
        animate={reducedMotion ? {} : { scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `${scene.accent}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke={scene.accent}
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </motion.div>
      <span
        style={{
          color: scene.accent,
          fontSize: '14px',
          fontWeight: 500,
          opacity: 0.7,
        }}
      >
        {scene.label} Image
      </span>
      <span
        style={{
          color: scene.accent,
          fontSize: '11px',
          opacity: 0.5,
          marginTop: '4px',
        }}
      >
        {scene.imagePath}
      </span>
    </div>
  );
}
