import { motion } from 'framer-motion';
import { orderScenes } from './orderScenes';

/**
 * OrderProgressRail - Visual progress indicator for storyboard scenes
 * Shows dots/steps with active state and connecting line
 */
export default function OrderProgressRail({ currentIndex, onSceneClick, reducedMotion }) {
  return (
    <nav
      className="order-progress-rail"
      role="tablist"
      aria-label="Order process steps"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
        padding: '24px 12px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '32px',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {orderScenes.map((scene, index) => {
        const isActive = index === currentIndex;
        const isPast = index < currentIndex;
        const isLast = index === orderScenes.length - 1;

        return (
          <div key={scene.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Step dot */}
            <motion.button
              role="tab"
              aria-selected={isActive}
              aria-label={`Step ${index + 1}: ${scene.label}`}
              onClick={() => onSceneClick(index)}
              whileHover={reducedMotion ? {} : { scale: 1.2 }}
              whileTap={reducedMotion ? {} : { scale: 0.95 }}
              style={{
                width: isActive ? '16px' : '12px',
                height: isActive ? '16px' : '12px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                background: isActive
                  ? scene.accent
                  : isPast
                  ? `${scene.accent}80`
                  : 'rgba(255,255,255,0.15)',
                boxShadow: isActive
                  ? `0 0 16px ${scene.accent}60, 0 0 4px ${scene.accent}`
                  : 'none',
                transition: 'all 0.3s ease',
                position: 'relative',
              }}
            >
              {/* Active ring */}
              {isActive && (
                <motion.div
                  layoutId="activeRing"
                  style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: '50%',
                    border: `2px solid ${scene.accent}40`,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>

            {/* Connector line */}
            {!isLast && (
              <div
                style={{
                  width: '2px',
                  height: '32px',
                  background: isPast
                    ? `linear-gradient(to bottom, ${scene.accent}80, ${orderScenes[index + 1].accent}80)`
                    : 'rgba(255,255,255,0.1)',
                  transition: 'background 0.3s ease',
                }}
              />
            )}
          </div>
        );
      })}

      {/* Current step label */}
      <motion.div
        key={currentIndex}
        initial={reducedMotion ? {} : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          marginTop: '16px',
          padding: '8px 12px',
          background: `${orderScenes[currentIndex].accent}15`,
          borderRadius: '12px',
          border: `1px solid ${orderScenes[currentIndex].accent}30`,
          maxWidth: '100px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: orderScenes[currentIndex].accent,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            lineHeight: 1.3,
            display: 'block',
            wordWrap: 'break-word',
          }}
        >
          {orderScenes[currentIndex].label}
        </span>
      </motion.div>
    </nav>
  );
}
