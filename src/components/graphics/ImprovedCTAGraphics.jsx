import { motion } from 'framer-motion';

/**
 * IMPROVED CTA Section Graphics - Premium visual storytelling
 * Shows global trade connection and call to action visually
 */

// Global Trade Connection - World with animated trade routes
export function ImprovedGlobalTradeGraphic({ isActive = false }) {
  const routes = [
    { from: { x: 115, y: 55 }, to: { x: 70, y: 45 }, color: '#10B981', label: 'EU' },
    { from: { x: 115, y: 55 }, to: { x: 145, y: 50 }, color: '#8B5CF6', label: 'US' },
    { from: { x: 115, y: 55 }, to: { x: 135, y: 70 }, color: '#F59E0B', label: 'ASIA' },
    { from: { x: 115, y: 55 }, to: { x: 85, y: 75 }, color: '#3B82F6', label: 'AFRICA' },
  ];

  return (
    <motion.svg viewBox="0 0 200 140" className="improved-cta-graphic">
      <defs>
        <radialGradient id="globeGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.02" />
        </radialGradient>
        <filter id="globeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Globe background */}
      <motion.circle
        cx="100"
        cy="65"
        r="52"
        fill="url(#globeGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Globe outline */}
      <motion.circle
        cx="100"
        cy="65"
        r="48"
        fill="none"
        stroke="#2563EB"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Globe lines */}
      <motion.ellipse cx="100" cy="65" rx="48" ry="22" fill="none" stroke="#2563EB" strokeWidth="1" opacity="0.2" />
      <motion.ellipse cx="100" cy="65" rx="22" ry="48" fill="none" stroke="#2563EB" strokeWidth="1" opacity="0.2" />
      <motion.line x1="52" y1="65" x2="148" y2="65" stroke="#2563EB" strokeWidth="1" opacity="0.2" />
      <motion.line x1="100" y1="17" x2="100" y2="113" stroke="#2563EB" strokeWidth="1" opacity="0.2" />

      {/* India marker - center hub */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <motion.circle
          cx="115"
          cy="55"
          r="14"
          fill="#FF9933"
          opacity="0.2"
          animate={isActive ? { scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx="115" cy="55" r="10" fill="white" stroke="#FF9933" strokeWidth="2" />
        <text x="115" y="59" fontSize="10" textAnchor="middle">🇮🇳</text>
      </motion.g>

      {/* Trade routes */}
      {routes.map((route, i) => (
        <motion.g key={i}>
          {/* Route path */}
          <motion.path
            d={`M${route.from.x} ${route.from.y} Q${(route.from.x + route.to.x) / 2} ${Math.min(route.from.y, route.to.y) - 15} ${route.to.x} ${route.to.y}`}
            stroke={route.color}
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0.3 }}
            transition={{ delay: 0.8 + i * 0.2, duration: 1 }}
          />

          {/* Destination marker */}
          <motion.circle
            cx={route.to.x}
            cy={route.to.y}
            r="6"
            fill={route.color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 + i * 0.2 }}
          />

          {/* Moving packet */}
          {isActive && (
            <motion.circle
              r="4"
              fill={route.color}
              filter="url(#globeGlow)"
              animate={{
                cx: [route.from.x, route.to.x],
                cy: [route.from.y, route.to.y],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
            />
          )}
        </motion.g>
      ))}

      {/* "GLOBAL TRADE" label */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <rect x="55" y="120" width="90" height="18" rx="9" fill="#2563EB" opacity="0.1" />
        <text x="100" y="132" fontSize="9" fill="#2563EB" textAnchor="middle" fontWeight="bold">🌍 GLOBAL TRADE</text>
      </motion.g>
    </motion.svg>
  );
}

// Buyer Seller Handshake - Trust connection with visual flow
export function ImprovedHandshakeGraphic({ isActive = false }) {
  return (
    <motion.svg viewBox="0 0 200 140" className="improved-cta-graphic">
      <defs>
        <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <filter id="handshakeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Buyer side */}
      <motion.g>
        <motion.circle
          cx="45"
          cy="70"
          r="32"
          fill="#3B82F6"
          opacity="0.1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
        <motion.circle
          cx="45"
          cy="70"
          r="26"
          fill="white"
          stroke="#3B82F6"
          strokeWidth="3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        />
        <text x="45" y="62" fontSize="20" textAnchor="middle">🏢</text>
        <text x="45" y="80" fontSize="8" fill="#3B82F6" textAnchor="middle" fontWeight="bold">BUYER</text>
        
        {/* Buyer benefits */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <text x="45" y="115" fontSize="7" fill="#6B7280" textAnchor="middle">✓ Verified</text>
          <text x="45" y="125" fontSize="7" fill="#6B7280" textAnchor="middle">✓ Clear Process</text>
        </motion.g>
      </motion.g>

      {/* Connection flow */}
      <motion.g>
        {/* Left arm */}
        <motion.path
          d="M72 70 L85 70 Q100 65 100 70"
          stroke="#10B981"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
        {/* Right arm */}
        <motion.path
          d="M128 70 L115 70 Q100 75 100 70"
          stroke="#10B981"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />

        {/* Central connection glow */}
        <motion.circle
          cx="100"
          cy="70"
          r="20"
          fill="#10B981"
          opacity="0.15"
          animate={isActive ? { scale: [1, 1.4, 1], opacity: [0.15, 0.3, 0.15] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Handshake icon */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          <circle cx="100" cy="70" r="16" fill="white" stroke="#10B981" strokeWidth="2" filter="url(#handshakeGlow)" />
          <text x="100" y="76" fontSize="18" textAnchor="middle">🤝</text>
        </motion.g>
      </motion.g>

      {/* Seller side */}
      <motion.g>
        <motion.circle
          cx="155"
          cy="70"
          r="32"
          fill="#059669"
          opacity="0.1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        />
        <motion.circle
          cx="155"
          cy="70"
          r="26"
          fill="white"
          stroke="#059669"
          strokeWidth="3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        />
        <text x="155" y="62" fontSize="20" textAnchor="middle">🏭</text>
        <text x="155" y="80" fontSize="8" fill="#059669" textAnchor="middle" fontWeight="bold">SELLER</text>
        
        {/* Seller benefits */}
        <motion.g
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <text x="155" y="115" fontSize="7" fill="#6B7280" textAnchor="middle">✓ Global Reach</text>
          <text x="155" y="125" fontSize="7" fill="#6B7280" textAnchor="middle">✓ Easy Export</text>
        </motion.g>
      </motion.g>

      {/* Trust indicators */}
      {isActive && (
        <>
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <rect x="70" y="25" width="60" height="20" rx="10" fill="#10B981" opacity="0.15" />
            <text x="100" y="38" fontSize="9" fill="#10B981" textAnchor="middle" fontWeight="bold">✅ TRUST</text>
          </motion.g>
        </>
      )}
    </motion.svg>
  );
}

// Start Journey CTA Visual - Path to success
export function ImprovedStartJourneyGraphic({ isActive = false }) {
  const milestones = [
    { x: 70, y: 55, icon: '📋', label: 'Plan' },
    { x: 120, y: 75, icon: '🔍', label: 'Find' },
    { x: 170, y: 60, icon: '🚚', label: 'Ship' },
  ];

  return (
    <motion.svg viewBox="0 0 260 120" className="improved-cta-graphic">
      <defs>
        <linearGradient id="journeyPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <filter id="journeyGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Path/Road */}
      <motion.path
        d="M30 70 Q70 45 120 75 Q170 105 230 55"
        stroke="#E5E7EB"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <motion.path
        d="M30 70 Q70 45 120 75 Q170 105 230 55"
        stroke="url(#journeyPathGradient)"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0.3 }}
        transition={{ duration: 2.5 }}
      />

      {/* Start point */}
      <motion.g>
        <motion.circle
          cx="30"
          cy="70"
          r="18"
          fill="#3B82F6"
          opacity="0.15"
          animate={isActive ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx="30" cy="70" r="14" fill="white" stroke="#3B82F6" strokeWidth="2" filter="url(#journeyGlow)" />
        <text x="30" y="75" fontSize="14" textAnchor="middle">🚀</text>
        <text x="30" y="98" fontSize="8" fill="#3B82F6" textAnchor="middle" fontWeight="bold">START</text>
      </motion.g>

      {/* Milestones */}
      {milestones.map((m, i) => (
        <motion.g key={i}>
          <motion.circle
            cx={m.x}
            cy={m.y}
            r="14"
            fill="white"
            stroke="#8B5CF6"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.2 }}
          />
          <text x={m.x} y={m.y + 5} fontSize="12" textAnchor="middle">{m.icon}</text>
          <text x={m.x} y={m.y + 25} fontSize="7" fill="#6B7280" textAnchor="middle">{m.label}</text>
        </motion.g>
      ))}

      {/* End point - Success */}
      <motion.g>
        <motion.circle
          cx="230"
          cy="55"
          r="22"
          fill="#10B981"
          opacity="0.2"
          animate={isActive ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx="230" cy="55" r="16" fill="white" stroke="#10B981" strokeWidth="3" filter="url(#journeyGlow)" />
        <text x="230" y="60" fontSize="16" textAnchor="middle">🎯</text>
        <text x="230" y="85" fontSize="8" fill="#10B981" textAnchor="middle" fontWeight="bold">SUCCESS</text>
      </motion.g>

      {/* Moving indicator */}
      {isActive && (
        <motion.g>
          <motion.circle
            r="6"
            fill="#3B82F6"
            filter="url(#journeyGlow)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ offsetPath: "path('M30 70 Q70 45 120 75 Q170 105 230 55')" }}
          />
        </motion.g>
      )}
    </motion.svg>
  );
}

// Confidence Badge Visual - Trust and verification
export function ImprovedConfidenceBadgeGraphic({ isActive = false }) {
  return (
    <motion.svg viewBox="0 0 140 140" className="improved-cta-graphic">
      <defs>
        <linearGradient id="confidenceGradientImproved" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <filter id="confidenceGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring background */}
      <motion.circle
        cx="70"
        cy="70"
        r="58"
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="4"
      />

      {/* Progress ring */}
      <motion.circle
        cx="70"
        cy="70"
        r="58"
        fill="none"
        stroke="url(#confidenceGradientImproved)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="364"
        strokeDashoffset="91"
        initial={{ strokeDashoffset: 364 }}
        animate={{ strokeDashoffset: isActive ? 91 : 182 }}
        transition={{ duration: 2 }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
      />

      {/* Inner circle */}
      <motion.circle
        cx="70"
        cy="70"
        r="48"
        fill="white"
        stroke="#E5E7EB"
        strokeWidth="2"
        filter="url(#confidenceGlow)"
      />

      {/* Shield icon */}
      <motion.path
        d="M70 35 L92 45 L92 65 Q92 82 70 95 Q48 82 48 65 L48 45 Z"
        fill="#2563EB"
        opacity="0.1"
        stroke="#2563EB"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      />

      {/* Checkmark */}
      <motion.path
        d="M58 65 L66 73 L84 55"
        stroke="#10B981"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />

      {/* Percentage text */}
      <motion.text
        x="70"
        y="115"
        fontSize="12"
        fill="#374151"
        textAnchor="middle"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        CONFIDENCE
      </motion.text>

      {/* Sparkles */}
      {isActive && ['✨', '⭐', '✨'].map((s, i) => {
        const angle = (i * 120 - 60) * Math.PI / 180;
        const x = 70 + Math.cos(angle) * 65;
        const y = 70 + Math.sin(angle) * 65;
        return (
          <motion.text
            key={i}
            x={x}
            y={y}
            fontSize="14"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ delay: 1.2 + i * 0.3, duration: 2, repeat: Infinity }}
          >
            {s}
          </motion.text>
        );
      })}
    </motion.svg>
  );
}
