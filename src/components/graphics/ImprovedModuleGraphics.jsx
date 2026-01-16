import { motion } from 'framer-motion';

/**
 * IMPROVED Core Modules Graphics - Premium visual storytelling
 * Each module gets a detailed visual that explains what it does
 */

// Marketplace - Store with products and India connection
export function ImprovedMarketplaceGraphic({ isActive = false, color = '#2563EB' }) {
  return (
    <motion.svg viewBox="0 0 120 100" className="improved-module-graphic">
      <defs>
        <filter id="marketShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={color} floodOpacity="0.2"/>
        </filter>
      </defs>

      {/* Store building */}
      <motion.g filter="url(#marketShadow)">
        <motion.path
          d="M20 45 L60 25 L100 45 L100 85 L20 85 Z"
          fill="white"
          stroke={color}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />
        {/* Roof */}
        <motion.path
          d="M15 45 L60 22 L105 45"
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {/* Door */}
        <motion.rect x="50" y="60" width="20" height="25" rx="3" fill={color} opacity="0.2" />
        {/* Windows */}
        <motion.rect x="25" y="52" width="18" height="18" rx="2" fill={color} opacity="0.15" />
        <motion.rect x="77" y="52" width="18" height="18" rx="2" fill={color} opacity="0.15" />
      </motion.g>

      {/* Products floating */}
      {isActive && ['📦', '🎁', '📱'].map((p, i) => (
        <motion.text
          key={i}
          x={30 + i * 25}
          fontSize="14"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: [40, 28, 40], opacity: 1 }}
          transition={{ delay: i * 0.2, duration: 2.5, repeat: Infinity }}
        >
          {p}
        </motion.text>
      ))}

      {/* India flag badge */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <circle cx="95" cy="30" r="12" fill="white" stroke={color} strokeWidth="1.5" />
        <text x="95" y="35" fontSize="12" textAnchor="middle">🇮🇳</text>
      </motion.g>

      {/* "FIND SUPPLIERS" label */}
      <motion.text
        x="60"
        y="95"
        fontSize="8"
        fill={color}
        textAnchor="middle"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        FIND SUPPLIERS
      </motion.text>
    </motion.svg>
  );
}

// LSQ Module - Request/Quote flow with visual comparison
export function ImprovedLSQGraphic({ isActive = false, color = '#7C3AED' }) {
  return (
    <motion.svg viewBox="0 0 120 100" className="improved-module-graphic">
      <defs>
        <filter id="lsqShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={color} floodOpacity="0.2"/>
        </filter>
      </defs>

      {/* Buyer request card */}
      <motion.g filter="url(#lsqShadow)">
        <motion.rect
          x="10"
          y="20"
          width="40"
          height="35"
          rx="6"
          fill="white"
          stroke={color}
          strokeWidth="2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        <text x="30" y="42" fontSize="18" textAnchor="middle">📝</text>
        <text x="30" y="65" fontSize="7" fill={color} textAnchor="middle" fontWeight="600">REQUEST</text>
      </motion.g>

      {/* Arrow */}
      <motion.path
        d="M55 38 L65 38"
        stroke={color}
        strokeWidth="2"
        markerEnd="url(#lsqArrowImproved)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3 }}
      />

      {/* Seller quotes - stacked cards */}
      {[0, 1, 2].map((i) => (
        <motion.g key={i} filter="url(#lsqShadow)">
          <motion.rect
            x="70"
            y={15 + i * 22}
            width="40"
            height="18"
            rx="4"
            fill="white"
            stroke={color}
            strokeWidth="1.5"
            opacity={1 - i * 0.15}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 - i * 0.15 }}
            transition={{ delay: 0.4 + i * 0.12 }}
          />
          <motion.text
            x="90"
            y={27 + i * 22}
            fontSize="9"
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
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.8 }}
        >
          <circle cx="108" cy="24" r="8" fill="#10B981" />
          <text x="108" y="28" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">✓</text>
        </motion.g>
      )}

      {/* "COMPARE QUOTES" label */}
      <motion.text
        x="60"
        y="92"
        fontSize="8"
        fill={color}
        textAnchor="middle"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        COMPARE QUOTES
      </motion.text>

      <defs>
        <marker id="lsqArrowImproved" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill={color} />
        </marker>
      </defs>
    </motion.svg>
  );
}

// Message Center - Unified chat workspace
export function ImprovedMessageCenterGraphic({ isActive = false, color = '#0891B2' }) {
  return (
    <motion.svg viewBox="0 0 120 100" className="improved-module-graphic">
      <defs>
        <filter id="msgShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={color} floodOpacity="0.2"/>
        </filter>
      </defs>

      {/* Main chat window */}
      <motion.rect
        x="15"
        y="15"
        width="90"
        height="65"
        rx="8"
        fill="white"
        stroke={color}
        strokeWidth="2"
        filter="url(#msgShadow)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      />

      {/* Header bar */}
      <motion.rect x="15" y="15" width="90" height="15" rx="8" fill={color} opacity="0.1" />
      <text x="60" y="26" fontSize="8" fill={color} textAnchor="middle" fontWeight="bold">ORDER #1234</text>

      {/* Chat messages */}
      <motion.rect x="22" y="35" width="40" height="12" rx="6" fill={color} opacity="0.15"
        initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 0.15 }} transition={{ delay: 0.2 }} />
      <motion.rect x="58" y="50" width="40" height="12" rx="6" fill={color} opacity="0.25"
        initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 0.25 }} transition={{ delay: 0.4 }} />
      <motion.rect x="22" y="65" width="35" height="10" rx="5" fill={color} opacity="0.15"
        initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 0.15 }} transition={{ delay: 0.6 }} />

      {/* File attachment indicator */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <rect x="75" y="82" width="28" height="14" rx="4" fill={color} opacity="0.3" />
        <text x="89" y="92" fontSize="10" textAnchor="middle">📎</text>
      </motion.g>

      {/* Notification dot */}
      {isActive && (
        <motion.circle
          cx="102"
          cy="18"
          r="6"
          fill="#EF4444"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}

      {/* "ONE WORKSPACE" label */}
      <motion.text
        x="60"
        y="95"
        fontSize="8"
        fill={color}
        textAnchor="middle"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        ONE WORKSPACE
      </motion.text>
    </motion.svg>
  );
}

// Logistics - Shipping with route tracking
export function ImprovedLogisticsGraphic({ isActive = false, color = '#059669' }) {
  return (
    <motion.svg viewBox="0 0 120 100" className="improved-module-graphic">
      <defs>
        <filter id="logShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={color} floodOpacity="0.2"/>
        </filter>
      </defs>

      {/* Route line */}
      <motion.path
        d="M15 60 Q40 35 60 60 Q80 85 105 55"
        stroke="#E5E7EB"
        strokeWidth="4"
        fill="none"
        strokeDasharray="6 3"
      />
      <motion.path
        d="M15 60 Q40 35 60 60 Q80 85 105 55"
        stroke={color}
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0.5 }}
        transition={{ duration: 2 }}
      />

      {/* Truck */}
      <motion.g
        filter="url(#logShadow)"
        initial={{ x: -40 }}
        animate={{ x: isActive ? 50 : 0 }}
        transition={{ duration: 3, repeat: isActive ? Infinity : 0 }}
      >
        <rect x="20" y="50" width="30" height="18" rx="3" fill={color} />
        <rect x="50" y="55" width="15" height="13" rx="2" fill={color} opacity="0.8" />
        <circle cx="28" cy="70" r="5" fill="#374151" />
        <circle cx="45" cy="70" r="5" fill="#374151" />
      </motion.g>

      {/* Start location */}
      <motion.g>
        <circle cx="15" cy="60" r="8" fill={color} opacity="0.2" />
        <text x="15" y="64" fontSize="10" textAnchor="middle">📍</text>
        <text x="15" y="80" fontSize="6" fill="#6B7280" textAnchor="middle">Origin</text>
      </motion.g>

      {/* End location */}
      <motion.g>
        <circle cx="105" cy="55" r="8" fill={color} opacity="0.2" />
        <text x="105" y="59" fontSize="10" textAnchor="middle">🏁</text>
        <text x="105" y="75" fontSize="6" fill="#6B7280" textAnchor="middle">Dest</text>
      </motion.g>

      {/* Tracking badge */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <rect x="35" y="15" width="50" height="20" rx="6" fill="white" stroke={color} strokeWidth="1.5" />
        <text x="60" y="28" fontSize="8" fill={color} textAnchor="middle" fontWeight="bold">📡 TRACK</text>
      </motion.g>

      {/* "SHIP & TRACK" label */}
      <motion.text
        x="60"
        y="95"
        fontSize="8"
        fill={color}
        textAnchor="middle"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        SHIP & TRACK
      </motion.text>
    </motion.svg>
  );
}

// Customs - Document checklist with approval
export function ImprovedCustomsGraphic({ isActive = false, color = '#D97706' }) {
  return (
    <motion.svg viewBox="0 0 120 100" className="improved-module-graphic">
      <defs>
        <filter id="custShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={color} floodOpacity="0.2"/>
        </filter>
      </defs>

      {/* Document */}
      <motion.rect
        x="25"
        y="10"
        width="70"
        height="75"
        rx="6"
        fill="white"
        stroke={color}
        strokeWidth="2"
        filter="url(#custShadow)"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      />

      {/* Document header */}
      <motion.rect x="25" y="10" width="70" height="18" rx="6" fill={color} opacity="0.1" />
      <text x="60" y="22" fontSize="8" fill={color} textAnchor="middle" fontWeight="bold">CUSTOMS</text>

      {/* Checklist items */}
      {[0, 1, 2, 3].map((i) => (
        <motion.g key={i}>
          {/* Checkbox */}
          <motion.rect
            x="32"
            y={32 + i * 13}
            width="12"
            height="12"
            rx="3"
            fill={i < 3 ? color : 'white'}
            stroke={color}
            strokeWidth="1.5"
            opacity={i < 3 ? 0.25 : 1}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.12 }}
          />
          {/* Checkmark */}
          {i < 3 && (
            <motion.path
              d={`M34 ${38 + i * 13} L37 ${41 + i * 13} L42 ${36 + i * 13}`}
              stroke={color}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isActive ? 1 : 0.8 }}
              transition={{ delay: 0.3 + i * 0.12 }}
            />
          )}
          {/* Line */}
          <motion.rect
            x="48"
            y={34 + i * 13}
            width="40"
            height="8"
            rx="2"
            fill={color}
            opacity="0.15"
          />
        </motion.g>
      ))}

      {/* Approval stamp */}
      {isActive && (
        <motion.g
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <circle cx="80" cy="70" r="14" fill="none" stroke="#10B981" strokeWidth="2.5" />
          <text x="80" y="74" fontSize="10" fill="#10B981" textAnchor="middle" fontWeight="bold">OK</text>
        </motion.g>
      )}

      {/* "GUIDED DOCS" label */}
      <motion.text
        x="60"
        y="95"
        fontSize="8"
        fill={color}
        textAnchor="middle"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        GUIDED DOCS
      </motion.text>
    </motion.svg>
  );
}


// Inspection - Quality verification with evidence
export function ImprovedInspectionGraphic({ isActive = false, color = '#DC2626' }) {
  return (
    <motion.svg viewBox="0 0 120 100" className="improved-module-graphic">
      <defs>
        <filter id="inspShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={color} floodOpacity="0.2"/>
        </filter>
      </defs>

      {/* Product box */}
      <motion.rect
        x="55"
        y="25"
        width="50"
        height="40"
        rx="6"
        fill="white"
        stroke={color}
        strokeWidth="2"
        filter="url(#inspShadow)"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      />
      <motion.line x1="80" y1="25" x2="80" y2="65" stroke={color} strokeWidth="1" opacity="0.2" />
      <motion.line x1="55" y1="45" x2="105" y2="45" stroke={color} strokeWidth="1" opacity="0.2" />

      {/* Magnifying glass */}
      <motion.g
        filter="url(#inspShadow)"
        initial={{ x: -30, y: -20 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.circle
          cx="40"
          cy="45"
          r="22"
          fill="rgba(255,255,255,0.95)"
          stroke={color}
          strokeWidth="3"
        />
        <motion.line
          x1="56"
          y1="61"
          x2="70"
          y2="75"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Checkmark inside magnifier */}
      <motion.path
        d="M30 45 L37 52 L52 37"
        stroke="#10B981"
        strokeWidth="4"
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
          <rect x="80" y="70" width="25" height="18" rx="3" fill={color} opacity="0.2" />
          <text x="92" y="82" fontSize="12" textAnchor="middle">📷</text>
        </motion.g>
      )}

      {/* "VERIFY QUALITY" label */}
      <motion.text
        x="60"
        y="95"
        fontSize="8"
        fill={color}
        textAnchor="middle"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        VERIFY QUALITY
      </motion.text>
    </motion.svg>
  );
}

// Financing - Trade finance access
export function ImprovedFinancingGraphic({ isActive = false, color = '#4F46E5' }) {
  return (
    <motion.svg viewBox="0 0 120 100" className="improved-module-graphic">
      <defs>
        <filter id="finShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={color} floodOpacity="0.2"/>
        </filter>
      </defs>

      {/* Bank building */}
      <motion.g filter="url(#finShadow)">
        <motion.path
          d="M25 40 L60 22 L95 40 L95 75 L25 75 Z"
          fill="white"
          stroke={color}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
        {/* Roof */}
        <motion.path d="M20 40 L60 18 L100 40" stroke={color} strokeWidth="3" fill="none" />
        
        {/* Columns */}
        {[35, 60, 85].map((x, i) => (
          <motion.rect
            key={i}
            x={x - 5}
            y="45"
            width="10"
            height="25"
            fill={color}
            opacity="0.2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            style={{ transformOrigin: 'bottom' }}
          />
        ))}
      </motion.g>

      {/* Dollar sign */}
      <motion.text
        x="60"
        y="38"
        fontSize="14"
        fill={color}
        textAnchor="middle"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        $
      </motion.text>

      {/* Money flow animation */}
      {isActive && (
        <motion.g>
          <motion.text
            x="35"
            fontSize="12"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 55, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💵
          </motion.text>
          <motion.text
            x="75"
            fontSize="12"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 55, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          >
            💵
          </motion.text>
        </motion.g>
      )}

      {/* Partner badge */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <rect x="70" y="8" width="45" height="16" rx="8" fill={color} opacity="0.15" />
        <text x="92" y="19" fontSize="7" fill={color} textAnchor="middle" fontWeight="bold">PARTNER-LED</text>
      </motion.g>

      {/* "TRADE FINANCE" label */}
      <motion.text
        x="60"
        y="92"
        fontSize="8"
        fill={color}
        textAnchor="middle"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        TRADE FINANCE
      </motion.text>
    </motion.svg>
  );
}

// Insurance - Protection shield
export function ImprovedInsuranceGraphic({ isActive = false, color = '#0D9488' }) {
  return (
    <motion.svg viewBox="0 0 120 100" className="improved-module-graphic">
      <defs>
        <filter id="insShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={color} floodOpacity="0.2"/>
        </filter>
      </defs>

      {/* Shield */}
      <motion.path
        d="M60 12 L95 25 L95 55 Q95 78 60 90 Q25 78 25 55 L25 25 Z"
        fill="white"
        stroke={color}
        strokeWidth="3"
        filter="url(#insShadow)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" }}
      />

      {/* Inner shield glow */}
      <motion.path
        d="M60 22 L85 32 L85 52 Q85 70 60 80 Q35 70 35 52 L35 32 Z"
        fill={color}
        opacity="0.1"
      />

      {/* Checkmark */}
      <motion.path
        d="M45 50 L55 60 L78 37"
        stroke={color}
        strokeWidth="5"
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
        const x1 = 60 + Math.cos(rad) * 42;
        const y1 = 52 + Math.sin(rad) * 42;
        const x2 = 60 + Math.cos(rad) * 50;
        const y2 = 52 + Math.sin(rad) * 50;
        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="2"
            opacity="0.3"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ delay: i * 0.1, duration: 1.5, repeat: Infinity }}
          />
        );
      })}

      {/* Partner badge */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <rect x="70" y="5" width="45" height="16" rx="8" fill={color} opacity="0.15" />
        <text x="92" y="16" fontSize="7" fill={color} textAnchor="middle" fontWeight="bold">PARTNER-LED</text>
      </motion.g>

      {/* "RISK COVERAGE" label */}
      <motion.text
        x="60"
        y="98"
        fontSize="8"
        fill={color}
        textAnchor="middle"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        RISK COVERAGE
      </motion.text>
    </motion.svg>
  );
}

// Trade Journey Flow - Complete visual journey
export function ImprovedTradeJourneyGraphic({ isActive = false }) {
  const steps = [
    { icon: '🔍', label: 'Discover', color: '#3B82F6' },
    { icon: '🤝', label: 'Connect', color: '#8B5CF6' },
    { icon: '📋', label: 'Order', color: '#10B981' },
    { icon: '📍', label: 'Track', color: '#F59E0B' },
    { icon: '✅', label: 'Receive', color: '#059669' },
  ];

  return (
    <motion.svg viewBox="0 0 500 120" className="improved-journey-graphic">
      <defs>
        <linearGradient id="journeyGradientImproved" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="25%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="75%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <filter id="journeyGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background connection line */}
      <motion.path
        d="M60 60 L440 60"
        stroke="#E5E7EB"
        strokeWidth="6"
        strokeLinecap="round"
      />
      
      {/* Animated progress line */}
      <motion.path
        d="M60 60 L440 60"
        stroke="url(#journeyGradientImproved)"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0.3 }}
        transition={{ duration: 2.5 }}
      />

      {/* Steps */}
      {steps.map((step, i) => {
        const x = 60 + i * 95;
        return (
          <motion.g key={i}>
            {/* Outer glow */}
            <motion.circle
              cx={x}
              cy="60"
              r="32"
              fill={step.color}
              opacity="0.1"
              animate={isActive ? { scale: [1, 1.15, 1] } : {}}
              transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
            />
            
            {/* Main circle */}
            <motion.circle
              cx={x}
              cy="60"
              r="26"
              fill="white"
              stroke={step.color}
              strokeWidth="3"
              filter="url(#journeyGlow)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
            />
            
            {/* Icon */}
            <text x={x} y="66" fontSize="20" textAnchor="middle">{step.icon}</text>
            
            {/* Label */}
            <text x={x} y="105" fontSize="11" fill="#374151" textAnchor="middle" fontWeight="600">
              {step.label}
            </text>
            
            {/* Step number */}
            <motion.circle
              cx={x + 20}
              cy="40"
              r="10"
              fill={step.color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 + 0.2 }}
            />
            <text x={x + 20} y="44" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">
              {i + 1}
            </text>
          </motion.g>
        );
      })}

      {/* Moving indicator */}
      {isActive && (
        <motion.circle
          r="8"
          fill="#3B82F6"
          filter="url(#journeyGlow)"
          initial={{ cx: 60, cy: 60 }}
          animate={{ cx: [60, 440], cy: [60, 60] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.svg>
  );
}
