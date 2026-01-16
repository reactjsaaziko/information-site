import { motion } from 'framer-motion';

/**
 * Visual Graphics for Final CTA Section
 * Shows global trade connection and call to action visually
 */

// Global Trade Connection - World with trade routes
export function GlobalTradeGraphic({ isActive = false }) {
  return (
    <motion.svg viewBox="0 0 200 120" className="cta-graphic">
      {/* Globe */}
      <motion.circle
        cx="100"
        cy="60"
        r="45"
        fill="none"
        stroke="#2563EB"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Globe lines */}
      <motion.ellipse cx="100" cy="60" rx="45" ry="20" fill="none" stroke="#2563EB" strokeWidth="1" opacity="0.3" />
      <motion.ellipse cx="100" cy="60" rx="20" ry="45" fill="none" stroke="#2563EB" strokeWidth="1" opacity="0.3" />
      <motion.line x1="55" y1="60" x2="145" y2="60" stroke="#2563EB" strokeWidth="1" opacity="0.3" />
      
      {/* India marker */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <circle cx="115" cy="55" r="8" fill="#FF9933" opacity="0.3" />
        <circle cx="115" cy="55" r="4" fill="#FF9933" />
        <text x="115" y="72" fontSize="8" fill="#FF9933" textAnchor="middle" fontWeight="bold">🇮🇳</text>
      </motion.g>
      
      {/* Trade routes */}
      {isActive && (
        <>
          {/* Route to Europe */}
          <motion.path
            d="M115 55 Q90 30 70 45"
            stroke="#10B981"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
          {/* Route to Americas */}
          <motion.path
            d="M115 55 Q130 40 145 50"
            stroke="#8B5CF6"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
          {/* Route to Asia */}
          <motion.path
            d="M115 55 Q125 70 135 65"
            stroke="#F59E0B"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          />
          
          {/* Moving packets */}
          <motion.circle
            r="3"
            fill="#10B981"
            animate={{
              cx: [115, 90, 70],
              cy: [55, 35, 45],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            r="3"
            fill="#8B5CF6"
            animate={{
              cx: [115, 130, 145],
              cy: [55, 42, 50],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
          />
        </>
      )}
      
      {/* Destination markers */}
      <motion.circle cx="70" cy="45" r="3" fill="#10B981" 
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} />
      <motion.circle cx="145" cy="50" r="3" fill="#8B5CF6"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.7 }} />
      <motion.circle cx="135" cy="65" r="3" fill="#F59E0B"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.9 }} />
    </motion.svg>
  );
}

// Buyer Seller Handshake - Trust connection
export function HandshakeGraphic({ isActive = false }) {
  return (
    <motion.svg viewBox="0 0 160 100" className="cta-graphic">
      {/* Buyer side */}
      <motion.g>
        <motion.circle
          cx="35"
          cy="50"
          r="25"
          fill="#3B82F6"
          opacity="0.15"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
        <motion.circle
          cx="35"
          cy="50"
          r="20"
          fill="white"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        <text x="35" y="45" fontSize="16" textAnchor="middle">🏢</text>
        <text x="35" y="58" fontSize="7" fill="#3B82F6" textAnchor="middle" fontWeight="bold">BUYER</text>
      </motion.g>
      
      {/* Handshake in middle */}
      <motion.g>
        {/* Hands meeting */}
        <motion.path
          d="M55 50 L70 50 Q80 45 80 50 Q80 55 70 50"
          stroke="#10B981"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3 }}
        />
        <motion.path
          d="M105 50 L90 50 Q80 55 80 50 Q80 45 90 50"
          stroke="#10B981"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5 }}
        />
        
        {/* Connection glow */}
        <motion.circle
          cx="80"
          cy="50"
          r="15"
          fill="#10B981"
          opacity="0.2"
          animate={isActive ? { scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        {/* Handshake icon */}
        <motion.text
          x="80"
          y="55"
          fontSize="20"
          textAnchor="middle"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          🤝
        </motion.text>
      </motion.g>
      
      {/* Seller side */}
      <motion.g>
        <motion.circle
          cx="125"
          cy="50"
          r="25"
          fill="#059669"
          opacity="0.15"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        />
        <motion.circle
          cx="125"
          cy="50"
          r="20"
          fill="white"
          stroke="#059669"
          strokeWidth="2"
        />
        <text x="125" y="45" fontSize="16" textAnchor="middle">🏭</text>
        <text x="125" y="58" fontSize="7" fill="#059669" textAnchor="middle" fontWeight="bold">SELLER</text>
      </motion.g>
      
      {/* Trust indicators */}
      {isActive && (
        <>
          <motion.text
            x="80"
            y="25"
            fontSize="10"
            textAnchor="middle"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 25 }}
            transition={{ delay: 1 }}
          >
            ✅ Trust
          </motion.text>
          <motion.text
            x="80"
            y="85"
            fontSize="10"
            textAnchor="middle"
            initial={{ opacity: 0, y: 75 }}
            animate={{ opacity: 1, y: 85 }}
            transition={{ delay: 1.2 }}
          >
            📋 Clarity
          </motion.text>
        </>
      )}
    </motion.svg>
  );
}

// Start Journey CTA Visual
export function StartJourneyGraphic({ isActive = false }) {
  return (
    <motion.svg viewBox="0 0 200 100" className="cta-graphic">
      {/* Path/Road */}
      <motion.path
        d="M20 70 Q60 50 100 70 Q140 90 180 50"
        stroke="#E5E7EB"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <motion.path
        d="M20 70 Q60 50 100 70 Q140 90 180 50"
        stroke="url(#journeyCtaGradient)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0.3 }}
        transition={{ duration: 2 }}
      />
      
      {/* Start point */}
      <motion.g>
        <circle cx="20" cy="70" r="12" fill="#3B82F6" opacity="0.2" />
        <circle cx="20" cy="70" r="8" fill="white" stroke="#3B82F6" strokeWidth="2" />
        <text x="20" y="74" fontSize="10" textAnchor="middle">🚀</text>
        <text x="20" y="90" fontSize="8" fill="#3B82F6" textAnchor="middle" fontWeight="bold">START</text>
      </motion.g>
      
      {/* Milestones */}
      {[
        { x: 60, y: 55, icon: '📋' },
        { x: 100, y: 70, icon: '🔍' },
        { x: 140, y: 80, icon: '🚚' },
      ].map((m, i) => (
        <motion.g key={i}>
          <motion.circle
            cx={m.x}
            cy={m.y}
            r="10"
            fill="white"
            stroke="#10B981"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.2 }}
          />
          <text x={m.x} y={m.y + 4} fontSize="10" textAnchor="middle">{m.icon}</text>
        </motion.g>
      ))}
      
      {/* End point - Success */}
      <motion.g>
        <motion.circle
          cx="180"
          cy="50"
          r="15"
          fill="#10B981"
          opacity="0.3"
          animate={isActive ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <circle cx="180" cy="50" r="10" fill="white" stroke="#10B981" strokeWidth="2" />
        <text x="180" y="54" fontSize="12" textAnchor="middle">🎯</text>
        <text x="180" y="72" fontSize="8" fill="#10B981" textAnchor="middle" fontWeight="bold">SUCCESS</text>
      </motion.g>
      
      {/* Moving indicator */}
      {isActive && (
        <motion.circle
          r="5"
          fill="#3B82F6"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: "path('M20 70 Q60 50 100 70 Q140 90 180 50')" }}
        />
      )}
      
      <defs>
        <linearGradient id="journeyCtaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

// Confidence Badge Visual
export function ConfidenceBadgeGraphic({ isActive = false }) {
  return (
    <motion.svg viewBox="0 0 120 120" className="cta-graphic">
      {/* Outer ring */}
      <motion.circle
        cx="60"
        cy="60"
        r="50"
        fill="none"
        stroke="#2563EB"
        strokeWidth="3"
        opacity="0.2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Progress ring */}
      <motion.circle
        cx="60"
        cy="60"
        r="50"
        fill="none"
        stroke="url(#confidenceGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="314"
        strokeDashoffset="78"
        initial={{ strokeDashoffset: 314 }}
        animate={{ strokeDashoffset: isActive ? 78 : 157 }}
        transition={{ duration: 1.5 }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
      />
      
      {/* Inner circle */}
      <motion.circle
        cx="60"
        cy="60"
        r="38"
        fill="white"
        stroke="#E5E7EB"
        strokeWidth="2"
      />
      
      {/* Shield icon */}
      <motion.path
        d="M60 30 L78 38 L78 55 Q78 70 60 80 Q42 70 42 55 L42 38 Z"
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
        d="M50 55 L57 62 L72 47"
        stroke="#10B981"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
      
      {/* Text */}
      <text x="60" y="95" fontSize="10" fill="#374151" textAnchor="middle" fontWeight="bold">
        CONFIDENCE
      </text>
      
      {/* Sparkles */}
      {isActive && ['✨', '⭐', '✨'].map((s, i) => {
        const angle = (i * 120 - 60) * Math.PI / 180;
        const x = 60 + Math.cos(angle) * 55;
        const y = 60 + Math.sin(angle) * 55;
        return (
          <motion.text
            key={i}
            x={x}
            y={y}
            fontSize="12"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ delay: 1 + i * 0.3, duration: 1.5, repeat: Infinity }}
          >
            {s}
          </motion.text>
        );
      })}
      
      <defs>
        <linearGradient id="confidenceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

export default {
  GlobalTradeGraphic,
  HandshakeGraphic,
  StartJourneyGraphic,
  ConfidenceBadgeGraphic
};