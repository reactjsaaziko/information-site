import { motion } from 'framer-motion';

/**
 * Visual Graphics for Core Modules Section
 * Each module gets a visual that explains what it does without reading
 */

// Marketplace - Store with products
export function MarketplaceGraphic({ isActive = false, color = '#2563EB' }) {
  return (
    <motion.svg viewBox="0 0 80 80" className="module-graphic">
      {/* Store building */}
      <motion.path
        d="M10 35 L40 15 L70 35 L70 70 L10 70 Z"
        fill="white"
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6 }}
      />
      {/* Roof */}
      <motion.path
        d="M5 35 L40 12 L75 35"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Door */}
      <motion.rect x="32" y="50" width="16" height="20" rx="2" fill={color} opacity="0.3" />
      {/* Windows */}
      <motion.rect x="15" y="42" width="12" height="12" rx="1" fill={color} opacity="0.2" />
      <motion.rect x="53" y="42" width="12" height="12" rx="1" fill={color} opacity="0.2" />
      {/* Products floating */}
      {isActive && ['📦', '🎁', '📱'].map((p, i) => (
        <motion.text
          key={i}
          x={20 + i * 20}
          fontSize="12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: [30, 20, 30], opacity: 1 }}
          transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
        >
          {p}
        </motion.text>
      ))}
      {/* India flag indicator */}
      <motion.g>
        <rect x="58" y="18" width="12" height="8" fill="#FF9933" />
        <rect x="58" y="22" width="12" height="4" fill="white" />
        <rect x="58" y="22" width="12" height="4" fill="#138808" y="26" />
      </motion.g>
    </motion.svg>
  );
}

// LSQ Module - Request/Quote flow
export function LSQGraphic({ isActive = false, color = '#7C3AED' }) {
  return (
    <motion.svg viewBox="0 0 80 80" className="module-graphic">
      {/* Buyer request */}
      <motion.g>
        <motion.rect
          x="5"
          y="15"
          width="30"
          height="25"
          rx="4"
          fill="white"
          stroke={color}
          strokeWidth="2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        <text x="20" y="32" fontSize="14" textAnchor="middle">📝</text>
        <text x="20" y="50" fontSize="7" fill={color} textAnchor="middle">Request</text>
      </motion.g>
      
      {/* Arrow */}
      <motion.path
        d="M38 27 L42 27"
        stroke={color}
        strokeWidth="2"
        markerEnd="url(#lsqArrow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3 }}
      />
      
      {/* Seller quotes */}
      {[0, 1, 2].map((i) => (
        <motion.g key={i}>
          <motion.rect
            x="45"
            y={10 + i * 20}
            width="28"
            height="16"
            rx="3"
            fill={color}
            opacity={0.1 + i * 0.1}
            stroke={color}
            strokeWidth="1.5"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.15 }}
          />
          <motion.text
            x="59"
            y={21 + i * 20}
            fontSize="8"
            fill={color}
            textAnchor="middle"
            fontWeight="bold"
          >
            ${50 - i * 5}
          </motion.text>
        </motion.g>
      ))}
      
      {/* Best quote highlight */}
      {isActive && (
        <motion.circle
          cx="73"
          cy="18"
          r="6"
          fill="#10B981"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.8 }}
        />
      )}
      
      <defs>
        <marker id="lsqArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill={color} />
        </marker>
      </defs>
    </motion.svg>
  );
}

// Message Center - Chat workspace
export function MessageCenterGraphic({ isActive = false, color = '#0891B2' }) {
  return (
    <motion.svg viewBox="0 0 80 80" className="module-graphic">
      {/* Main chat window */}
      <motion.rect
        x="10"
        y="10"
        width="60"
        height="55"
        rx="6"
        fill="white"
        stroke={color}
        strokeWidth="2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      />
      
      {/* Chat messages */}
      <motion.rect x="15" y="18" width="30" height="10" rx="5" fill={color} opacity="0.2"
        initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: 0.2 }} />
      <motion.rect x="35" y="32" width="30" height="10" rx="5" fill={color} opacity="0.3"
        initial={{ x: 20 }} animate={{ x: 0 }} transition={{ delay: 0.4 }} />
      <motion.rect x="15" y="46" width="25" height="10" rx="5" fill={color} opacity="0.2"
        initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: 0.6 }} />
      
      {/* File attachment */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <rect x="50" y="68" width="20" height="10" rx="2" fill={color} opacity="0.4" />
        <text x="60" y="76" fontSize="8" fill="white" textAnchor="middle">📎</text>
      </motion.g>
      
      {/* Notification dot */}
      {isActive && (
        <motion.circle
          cx="68"
          cy="12"
          r="5"
          fill="#EF4444"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.svg>
  );
}

// Logistics - Shipping truck with route
export function LogisticsGraphic({ isActive = false, color = '#059669' }) {
  return (
    <motion.svg viewBox="0 0 80 80" className="module-graphic">
      {/* Route line */}
      <motion.path
        d="M10 55 Q25 35 40 55 Q55 75 70 55"
        stroke="#E5E7EB"
        strokeWidth="3"
        fill="none"
        strokeDasharray="4 2"
      />
      <motion.path
        d="M10 55 Q25 35 40 55 Q55 75 70 55"
        stroke={color}
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0.5 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Truck */}
      <motion.g
        initial={{ x: -30 }}
        animate={{ x: isActive ? 30 : 0 }}
        transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
      >
        <rect x="15" y="45" width="25" height="15" rx="2" fill={color} />
        <rect x="40" y="50" width="12" height="10" rx="1" fill={color} opacity="0.7" />
        <circle cx="22" cy="62" r="4" fill="#374151" />
        <circle cx="38" cy="62" r="4" fill="#374151" />
      </motion.g>
      
      {/* Location pins */}
      <motion.g>
        <circle cx="10" cy="55" r="6" fill={color} opacity="0.3" />
        <text x="10" y="58" fontSize="8" textAnchor="middle">📍</text>
      </motion.g>
      <motion.g>
        <circle cx="70" cy="55" r="6" fill={color} opacity="0.3" />
        <text x="70" y="58" fontSize="8" textAnchor="middle">🏁</text>
      </motion.g>
      
      {/* Tracking indicator */}
      <motion.rect x="25" y="15" width="30" height="18" rx="4" fill="white" stroke={color} strokeWidth="1.5" />
      <text x="40" y="27" fontSize="8" fill={color} textAnchor="middle" fontWeight="bold">TRACK</text>
    </motion.svg>
  );
}

// Customs - Document checklist
export function CustomsGraphic({ isActive = false, color = '#D97706' }) {
  return (
    <motion.svg viewBox="0 0 80 80" className="module-graphic">
      {/* Document */}
      <motion.rect
        x="15"
        y="10"
        width="50"
        height="60"
        rx="4"
        fill="white"
        stroke={color}
        strokeWidth="2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      />
      
      {/* Checklist items */}
      {[0, 1, 2, 3].map((i) => (
        <motion.g key={i}>
          {/* Checkbox */}
          <motion.rect
            x="22"
            y={20 + i * 12}
            width="10"
            height="10"
            rx="2"
            fill={i < 3 ? color : 'white'}
            stroke={color}
            strokeWidth="1.5"
            opacity={i < 3 ? 0.3 : 1}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.15 }}
          />
          {/* Checkmark */}
          {i < 3 && (
            <motion.path
              d={`M24 ${25 + i * 12} L26 ${27 + i * 12} L30 ${23 + i * 12}`}
              stroke={color}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isActive ? 1 : 0.8 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            />
          )}
          {/* Line */}
          <motion.rect
            x="36"
            y={22 + i * 12}
            width="24"
            height="6"
            rx="2"
            fill={color}
            opacity="0.2"
          />
        </motion.g>
      ))}
      
      {/* Stamp */}
      {isActive && (
        <motion.g
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <circle cx="52" cy="55" r="12" fill="none" stroke="#10B981" strokeWidth="2" />
          <text x="52" y="58" fontSize="8" fill="#10B981" textAnchor="middle" fontWeight="bold">OK</text>
        </motion.g>
      )}
    </motion.svg>
  );
}

// Inspection - Magnifier with checkmark
export function InspectionGraphic({ isActive = false, color = '#DC2626' }) {
  return (
    <motion.svg viewBox="0 0 80 80" className="module-graphic">
      {/* Product box */}
      <motion.rect
        x="35"
        y="25"
        width="35"
        height="30"
        rx="4"
        fill="white"
        stroke={color}
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.line x1="52" y1="25" x2="52" y2="55" stroke={color} strokeWidth="1" opacity="0.3" />
      <motion.line x1="35" y1="40" x2="70" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      
      {/* Magnifying glass */}
      <motion.g
        initial={{ x: -20, y: -20 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.circle
          cx="30"
          cy="40"
          r="18"
          fill="rgba(255,255,255,0.9)"
          stroke={color}
          strokeWidth="3"
        />
        <motion.line
          x1="43"
          y1="53"
          x2="55"
          y2="65"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </motion.g>
      
      {/* Checkmark inside magnifier */}
      <motion.path
        d="M22 40 L28 46 L40 34"
        stroke="#10B981"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={{ delay: 0.6 }}
      />
      
      {/* Evidence photos */}
      {isActive && (
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <rect x="55" y="58" width="18" height="14" rx="2" fill={color} opacity="0.3" />
          <text x="64" y="68" fontSize="10" textAnchor="middle">📷</text>
        </motion.g>
      )}
    </motion.svg>
  );
}

// Financing - Money/Bank
export function FinancingGraphic({ isActive = false, color = '#4F46E5' }) {
  return (
    <motion.svg viewBox="0 0 80 80" className="module-graphic">
      {/* Bank building */}
      <motion.path
        d="M15 35 L40 20 L65 35 L65 65 L15 65 Z"
        fill="white"
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
      />
      {/* Columns */}
      {[25, 40, 55].map((x, i) => (
        <motion.rect
          key={i}
          x={x - 3}
          y="38"
          width="6"
          height="22"
          fill={color}
          opacity="0.3"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          style={{ transformOrigin: 'bottom' }}
        />
      ))}
      {/* Roof triangle */}
      <motion.path d="M12 35 L40 18 L68 35" stroke={color} strokeWidth="3" fill="none" />
      
      {/* Dollar sign */}
      <motion.text
        x="40"
        y="32"
        fontSize="12"
        fill={color}
        textAnchor="middle"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        $
      </motion.text>
      
      {/* Money flow */}
      {isActive && (
        <motion.g>
          <motion.text
            x="25"
            fontSize="10"
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 50, opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💵
          </motion.text>
          <motion.text
            x="50"
            fontSize="10"
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 50, opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            💵
          </motion.text>
        </motion.g>
      )}
    </motion.svg>
  );
}

// Insurance - Shield protection
export function InsuranceGraphic({ isActive = false, color = '#0D9488' }) {
  return (
    <motion.svg viewBox="0 0 80 80" className="module-graphic">
      {/* Shield */}
      <motion.path
        d="M40 10 L65 20 L65 45 Q65 65 40 75 Q15 65 15 45 L15 20 Z"
        fill="white"
        stroke={color}
        strokeWidth="2.5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" }}
      />
      
      {/* Inner shield glow */}
      <motion.path
        d="M40 18 L58 26 L58 43 Q58 58 40 66 Q22 58 22 43 L22 26 Z"
        fill={color}
        opacity="0.15"
      />
      
      {/* Checkmark */}
      <motion.path
        d="M28 42 L36 50 L52 34"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      />
      
      {/* Protection rays */}
      {isActive && [0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = angle * Math.PI / 180;
        const x1 = 40 + Math.cos(rad) * 35;
        const y1 = 42 + Math.sin(rad) * 35;
        const x2 = 40 + Math.cos(rad) * 42;
        const y2 = 42 + Math.sin(rad) * 42;
        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="2"
            opacity="0.4"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ delay: i * 0.1, duration: 1.5, repeat: Infinity }}
          />
        );
      })}
    </motion.svg>
  );
}

// Trade Journey Flow - Complete visual
export function TradeJourneyGraphic({ isActive = false }) {
  const steps = [
    { icon: '🔍', label: 'Discover', color: '#3B82F6' },
    { icon: '🤝', label: 'Connect', color: '#8B5CF6' },
    { icon: '📋', label: 'Order', color: '#10B981' },
    { icon: '📍', label: 'Track', color: '#F59E0B' },
    { icon: '✅', label: 'Receive', color: '#059669' },
  ];

  return (
    <motion.svg viewBox="0 0 400 100" className="journey-graphic">
      {/* Connection line */}
      <motion.path
        d="M50 50 L350 50"
        stroke="#E5E7EB"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <motion.path
        d="M50 50 L350 50"
        stroke="url(#journeyGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0.3 }}
        transition={{ duration: 2 }}
      />

      {/* Steps */}
      {steps.map((step, i) => {
        const x = 50 + i * 75;
        return (
          <motion.g key={i}>
            {/* Glow */}
            <motion.circle
              cx={x}
              cy="50"
              r="28"
              fill={step.color}
              opacity="0.1"
              animate={isActive ? { scale: [1, 1.2, 1] } : {}}
              transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
            />
            {/* Circle */}
            <motion.circle
              cx={x}
              cy="50"
              r="22"
              fill="white"
              stroke={step.color}
              strokeWidth="3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
            />
            {/* Icon */}
            <text x={x} y="56" fontSize="18" textAnchor="middle">{step.icon}</text>
            {/* Label */}
            <text x={x} y="88" fontSize="10" fill="#374151" textAnchor="middle" fontWeight="600">
              {step.label}
            </text>
          </motion.g>
        );
      })}

      <defs>
        <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="25%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="75%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

export default {
  MarketplaceGraphic,
  LSQGraphic,
  MessageCenterGraphic,
  LogisticsGraphic,
  CustomsGraphic,
  InspectionGraphic,
  FinancingGraphic,
  InsuranceGraphic,
  TradeJourneyGraphic
};