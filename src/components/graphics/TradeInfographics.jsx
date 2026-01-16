import { motion } from 'framer-motion';

/**
 * Complete Visual Infographics for Trade Platform
 * These graphics tell the story visually - users understand without reading
 */

// ============================================
// 1. PAIN POINTS GRAPHICS - Show problems visually
// ============================================

// Trust Gap - Broken handshake with question marks
export function TrustGapGraphic({ isActive, color = '#EF4444' }) {
  return (
    <motion.svg viewBox="0 0 140 100" className="trade-infographic" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {/* Two hands trying to shake but broken */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* Left hand */}
        <motion.path
          d="M15 55 L35 55 L40 50 L45 55 L50 50 L55 55 L55 65 L15 65 Z"
          fill={color}
          opacity="0.3"
          initial={{ x: -20 }}
          animate={{ x: isActive ? 0 : -5 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M15 55 L35 55 L40 50 L45 55 L50 50 L55 55 L55 65 L15 65 Z"
          stroke={color}
          strokeWidth="2"
          fill="none"
          initial={{ x: -20 }}
          animate={{ x: isActive ? 0 : -5 }}
        />
        
        {/* Right hand */}
        <motion.path
          d="M85 55 L105 55 L100 50 L95 55 L90 50 L85 55 L85 65 L125 65 Z"
          fill={color}
          opacity="0.3"
          initial={{ x: 20 }}
          animate={{ x: isActive ? 0 : 5 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M85 55 L105 55 L100 50 L95 55 L90 50 L85 55 L85 65 L125 65 Z"
          stroke={color}
          strokeWidth="2"
          fill="none"
          initial={{ x: 20 }}
          animate={{ x: isActive ? 0 : 5 }}
        />
      </motion.g>
      
      {/* Gap/Break in middle with lightning */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isActive ? 1 : 0.5, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.path
          d="M65 45 L72 55 L68 55 L75 70 L62 58 L66 58 L60 45 Z"
          fill="#FCD34D"
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </motion.g>
      
      {/* Question marks floating */}
      {[
        { x: 25, y: 30 },
        { x: 70, y: 20 },
        { x: 110, y: 35 }
      ].map((pos, i) => (
        <motion.text
          key={i}
          x={pos.x}
          y={pos.y}
          fontSize="16"
          fill={color}
          fontWeight="bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isActive ? 0.8 : 0.3,
            y: isActive ? [0, -5, 0] : 0
          }}
          transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
        >
          ?
        </motion.text>
      ))}
      
      {/* Fake badge with X */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.4 }}
        transition={{ delay: 0.5 }}
      >
        <rect x="55" y="75" width="30" height="18" rx="3" fill={color} opacity="0.2" />
        <text x="62" y="87" fontSize="8" fill={color}>FAKE</text>
      </motion.g>
    </motion.svg>
  );
}

// No Single System - Scattered chaos
export function ScatteredSystemGraphic({ isActive, color = '#F59E0B' }) {
  const items = [
    { x: 10, y: 15, type: 'email', label: '📧' },
    { x: 80, y: 10, type: 'chat', label: '💬' },
    { x: 45, y: 50, type: 'phone', label: '📱' },
    { x: 100, y: 45, type: 'doc', label: '📄' },
    { x: 25, y: 70, type: 'broker', label: '👤' },
    { x: 75, y: 75, type: 'excel', label: '📊' },
  ];
  
  return (
    <motion.svg viewBox="0 0 140 100" className="trade-infographic" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {/* Scattered items floating chaotically */}
      {items.map((item, i) => (
        <motion.g key={i}>
          {/* Item box */}
          <motion.rect
            x={item.x}
            y={item.y}
            width="28"
            height="22"
            rx="4"
            fill="white"
            stroke={color}
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0, rotate: -10 + i * 5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: isActive ? [-5 + i * 3, 5 - i * 2, -5 + i * 3] : -5 + i * 3,
              y: isActive ? [item.y, item.y - 3, item.y] : item.y
            }}
            transition={{ 
              delay: i * 0.1,
              duration: 2,
              repeat: Infinity,
              repeatDelay: i * 0.3
            }}
          />
          <motion.text
            x={item.x + 14}
            y={item.y + 15}
            fontSize="12"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 + 0.2 }}
          >
            {item.label}
          </motion.text>
        </motion.g>
      ))}
      
      {/* Confused arrows going everywhere */}
      <motion.g opacity={isActive ? 0.6 : 0.3}>
        <motion.path d="M38 25 Q50 30 55 45" stroke={color} strokeWidth="1" fill="none" strokeDasharray="3 2" />
        <motion.path d="M108 25 Q95 35 85 50" stroke={color} strokeWidth="1" fill="none" strokeDasharray="3 2" />
        <motion.path d="M53 70 Q60 60 73 55" stroke={color} strokeWidth="1" fill="none" strokeDasharray="3 2" />
      </motion.g>
      
      {/* "NO RECORD" stamp */}
      <motion.g
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ opacity: isActive ? 0.8 : 0.3, rotate: -15 }}
        transition={{ delay: 0.6 }}
      >
        <rect x="45" y="35" width="50" height="20" rx="2" fill="none" stroke="#DC2626" strokeWidth="2" />
        <text x="50" y="48" fontSize="8" fill="#DC2626" fontWeight="bold">NO RECORD</text>
      </motion.g>
    </motion.svg>
  );
}

// Documentation Confusion - Papers flying with errors
export function DocConfusionGraphic({ isActive, color = '#8B5CF6' }) {
  return (
    <motion.svg viewBox="0 0 140 100" className="trade-infographic" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {/* Stack of messy documents */}
      {[
        { x: 20, y: 20, rotate: -12 },
        { x: 30, y: 15, rotate: 8 },
        { x: 40, y: 22, rotate: -5 },
        { x: 50, y: 12, rotate: 15 },
      ].map((doc, i) => (
        <motion.g key={i}>
          <motion.rect
            x={doc.x}
            y={doc.y}
            width="35"
            height="45"
            rx="2"
            fill="white"
            stroke={color}
            strokeWidth="1.5"
            initial={{ opacity: 0, y: -20, rotate: doc.rotate }}
            animate={{ 
              opacity: 1, 
              y: 0,
              rotate: isActive ? doc.rotate + (i % 2 === 0 ? 5 : -5) : doc.rotate
            }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            style={{ transformOrigin: `${doc.x + 17}px ${doc.y + 22}px` }}
          />
          {/* Document lines */}
          <motion.line x1={doc.x + 5} y1={doc.y + 12} x2={doc.x + 30} y2={doc.y + 12} stroke={color} strokeWidth="1" opacity="0.4" />
          <motion.line x1={doc.x + 5} y1={doc.y + 20} x2={doc.x + 25} y2={doc.y + 20} stroke={color} strokeWidth="1" opacity="0.4" />
          <motion.line x1={doc.x + 5} y1={doc.y + 28} x2={doc.x + 28} y2={doc.y + 28} stroke={color} strokeWidth="1" opacity="0.4" />
        </motion.g>
      ))}
      
      {/* Red X marks for errors */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isActive ? 1 : 0.5, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.path d="M95 25 L105 35 M105 25 L95 35" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
        <motion.path d="M100 55 L110 65 M110 55 L100 65" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
      
      {/* Customs barrier */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.4 }}
        transition={{ delay: 0.4 }}
      >
        <rect x="85" y="70" width="45" height="20" rx="3" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
        <text x="92" y="83" fontSize="7" fill="#DC2626" fontWeight="bold">CUSTOMS</text>
        <motion.path d="M115 75 L125 85" stroke="#DC2626" strokeWidth="2" />
      </motion.g>
      
      {/* Warning triangle */}
      <motion.path
        d="M115 15 L125 30 L105 30 Z"
        fill="#FCD34D"
        stroke="#F59E0B"
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.5 }}
      />
      <motion.text x="112" y="27" fontSize="10" fill="#92400E" fontWeight="bold">!</motion.text>
    </motion.svg>
  );
}

// Quality Risk - Magnifier finding defects
export function QualityRiskGraphic({ isActive, color = '#EC4899' }) {
  return (
    <motion.svg viewBox="0 0 140 100" className="trade-infographic" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {/* Product box */}
      <motion.g>
        <motion.rect
          x="70"
          y="30"
          width="50"
          height="40"
          rx="4"
          fill="white"
          stroke={color}
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        {/* Box tape */}
        <motion.line x1="95" y1="30" x2="95" y2="70" stroke={color} strokeWidth="1.5" opacity="0.5" />
        <motion.line x1="70" y1="50" x2="120" y2="50" stroke={color} strokeWidth="1.5" opacity="0.5" />
        
        {/* Crack/defect in product */}
        <motion.path
          d="M80 40 L100 60"
          stroke="#DC2626"
          strokeWidth="2"
          strokeDasharray="4 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0.5 }}
          transition={{ delay: 0.5 }}
        />
      </motion.g>
      
      {/* Magnifying glass */}
      <motion.g
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.circle
          cx="40"
          cy="45"
          r="22"
          fill="rgba(255,255,255,0.9)"
          stroke={color}
          strokeWidth="3"
        />
        <motion.line
          x1="56"
          y1="61"
          x2="72"
          y2="77"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Question mark inside magnifier */}
        <motion.text
          x="33"
          y="52"
          fontSize="22"
          fill={color}
          fontWeight="bold"
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ?
        </motion.text>
      </motion.g>
      
      {/* "NO PROOF" label */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isActive ? 1 : 0.4, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <rect x="75" y="75" width="40" height="16" rx="3" fill="#FEE2E2" />
        <text x="80" y="86" fontSize="7" fill="#DC2626" fontWeight="bold">NO PROOF</text>
      </motion.g>
      
      {/* Thumbs down */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
        transition={{ delay: 0.8 }}
      >
        <circle cx="125" cy="20" r="12" fill="#FEE2E2" />
        <text x="120" y="25" fontSize="14">👎</text>
      </motion.g>
    </motion.svg>
  );
}


// Cost Surprises - Money flying away with hidden fees
export function CostSurprisesGraphic({ isActive, color = '#10B981' }) {
  return (
    <motion.svg viewBox="0 0 140 100" className="trade-infographic" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {/* Original price tag */}
      <motion.g>
        <motion.path
          d="M15 40 L50 40 L60 50 L50 60 L15 60 Z"
          fill="white"
          stroke={color}
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <motion.circle cx="25" cy="50" r="4" fill={color} />
        <motion.text x="35" y="54" fontSize="12" fill={color} fontWeight="bold">$50</motion.text>
      </motion.g>
      
      {/* Hidden costs popping up */}
      {[
        { x: 70, y: 10, label: '+$15', delay: 0.3 },
        { x: 95, y: 25, label: '+$22', delay: 0.5 },
        { x: 80, y: 50, label: '+$8', delay: 0.7 },
        { x: 105, y: 60, label: '+$18', delay: 0.9 },
      ].map((cost, i) => (
        <motion.g key={i}>
          <motion.rect
            x={cost.x}
            y={cost.y}
            width="30"
            height="18"
            rx="4"
            fill="#FEE2E2"
            stroke="#DC2626"
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0, y: cost.y + 20 }}
            animate={{ 
              opacity: isActive ? 1 : 0.3, 
              scale: isActive ? 1 : 0.8,
              y: isActive ? cost.y : cost.y + 10
            }}
            transition={{ delay: cost.delay, type: "spring" }}
          />
          <motion.text
            x={cost.x + 5}
            y={cost.y + 13}
            fontSize="9"
            fill="#DC2626"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0.3 }}
            transition={{ delay: cost.delay + 0.1 }}
          >
            {cost.label}
          </motion.text>
        </motion.g>
      ))}
      
      {/* Explosion/surprise effect */}
      <motion.path
        d="M65 45 L70 38 L68 48 L78 42 L72 50 L80 55 L70 52 L68 62 L65 52 L55 58 L62 50 L52 48 L62 45 Z"
        fill="#FCD34D"
        opacity="0.6"
        initial={{ scale: 0 }}
        animate={{ scale: isActive ? 1 : 0 }}
        transition={{ delay: 0.2, type: "spring" }}
        style={{ transformOrigin: '65px 50px' }}
      />
      
      {/* Final shocked price */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.4 }}
        transition={{ delay: 1 }}
      >
        <rect x="15" y="75" width="55" height="20" rx="4" fill="#DC2626" opacity="0.1" stroke="#DC2626" strokeWidth="1.5" />
        <text x="22" y="88" fontSize="10" fill="#DC2626" fontWeight="bold">Final: $113!</text>
      </motion.g>
    </motion.svg>
  );
}

// Unclear Accountability - People pointing at each other
export function BlameGraphic({ isActive, color = '#3B82F6' }) {
  return (
    <motion.svg viewBox="0 0 140 100" className="trade-infographic" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {/* Three people figures */}
      {[
        { x: 25, dir: 'right', label: 'Seller' },
        { x: 70, dir: 'both', label: 'Broker' },
        { x: 115, dir: 'left', label: 'Buyer' },
      ].map((person, i) => (
        <motion.g key={i}>
          {/* Head */}
          <motion.circle
            cx={person.x}
            cy="30"
            r="10"
            fill={color}
            opacity="0.7"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2 }}
          />
          {/* Body */}
          <motion.line
            x1={person.x}
            y1="40"
            x2={person.x}
            y2="65"
            stroke={color}
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: i * 0.2 + 0.1 }}
          />
          {/* Legs */}
          <motion.path
            d={`M${person.x} 65 L${person.x - 10} 82 M${person.x} 65 L${person.x + 10} 82`}
            stroke={color}
            strokeWidth="2.5"
            fill="none"
          />
          {/* Pointing arms */}
          {(person.dir === 'right' || person.dir === 'both') && (
            <motion.line
              x1={person.x}
              y1="48"
              x2={person.x + 25}
              y2="42"
              stroke={color}
              strokeWidth="2.5"
              animate={isActive ? { x2: [person.x + 25, person.x + 30, person.x + 25] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
          {(person.dir === 'left' || person.dir === 'both') && (
            <motion.line
              x1={person.x}
              y1="48"
              x2={person.x - 25}
              y2="42"
              stroke={color}
              strokeWidth="2.5"
              animate={isActive ? { x2: [person.x - 25, person.x - 30, person.x - 25] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
          {/* Label */}
          <motion.text
            x={person.x}
            y="95"
            fontSize="8"
            fill={color}
            textAnchor="middle"
            opacity="0.7"
          >
            {person.label}
          </motion.text>
        </motion.g>
      ))}
      
      {/* Pointing arrows */}
      <motion.g opacity={isActive ? 0.8 : 0.4}>
        <motion.polygon
          points="48,42 55,45 48,48"
          fill={color}
          animate={isActive ? { x: [0, 5, 0] } : {}}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <motion.polygon
          points="92,42 85,45 92,48"
          fill={color}
          animate={isActive ? { x: [0, -5, 0] } : {}}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </motion.g>
      
      {/* "WHO'S FAULT?" text */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
        transition={{ delay: 0.5 }}
      >
        <rect x="45" y="5" width="50" height="16" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
        <text x="50" y="16" fontSize="8" fill="#92400E" fontWeight="bold">WHO'S FAULT?</text>
      </motion.g>
    </motion.svg>
  );
}

// ============================================
// 2. WIN-WIN GRAPHICS - Show solutions visually
// ============================================

// Buyer Journey Flow
export function BuyerJourneyGraphic({ isActive, color = '#2563EB' }) {
  const steps = [
    { icon: '🔍', label: 'Find' },
    { icon: '📋', label: 'Quote' },
    { icon: '✅', label: 'Inspect' },
    { icon: '📦', label: 'Receive' },
  ];
  
  return (
    <motion.svg viewBox="0 0 200 80" className="trade-infographic" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {steps.map((step, i) => (
        <motion.g key={i}>
          {/* Step circle */}
          <motion.circle
            cx={30 + i * 50}
            cy="35"
            r="18"
            fill={isActive ? color : '#E5E7EB'}
            opacity={isActive ? 0.2 : 0.5}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.15 }}
          />
          <motion.circle
            cx={30 + i * 50}
            cy="35"
            r="18"
            fill="none"
            stroke={isActive ? color : '#9CA3AF'}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          />
          {/* Icon */}
          <motion.text
            x={30 + i * 50}
            y="40"
            fontSize="16"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.15 + 0.2 }}
          >
            {step.icon}
          </motion.text>
          {/* Label */}
          <motion.text
            x={30 + i * 50}
            y="65"
            fontSize="9"
            fill={isActive ? color : '#6B7280'}
            textAnchor="middle"
            fontWeight="500"
          >
            {step.label}
          </motion.text>
          {/* Arrow to next */}
          {i < steps.length - 1 && (
            <motion.path
              d={`M${50 + i * 50} 35 L${60 + i * 50} 35`}
              stroke={isActive ? color : '#D1D5DB'}
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: i * 0.15 + 0.3 }}
            />
          )}
        </motion.g>
      ))}
      {/* Arrow marker definition */}
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill={isActive ? color : '#D1D5DB'} />
        </marker>
      </defs>
    </motion.svg>
  );
}

// Cost Reduction Visual
export function CostReductionGraphic({ isActive, color = '#10B981' }) {
  return (
    <motion.svg viewBox="0 0 180 100" className="trade-infographic" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {/* Before bar (tall, red) */}
      <motion.g>
        <motion.rect
          x="30"
          y="20"
          width="40"
          height="60"
          rx="4"
          fill="#FEE2E2"
          stroke="#DC2626"
          strokeWidth="2"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: 'bottom' }}
        />
        <text x="50" y="90" fontSize="9" fill="#DC2626" textAnchor="middle" fontWeight="bold">Before</text>
        <text x="50" y="45" fontSize="10" fill="#DC2626" textAnchor="middle">$$$</text>
        
        {/* Leak indicators */}
        {isActive && [25, 40, 55].map((y, i) => (
          <motion.circle
            key={i}
            cx="75"
            cy={y}
            r="3"
            fill="#DC2626"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: [0, 1, 0], x: [0, 20, 40] }}
            transition={{ delay: i * 0.3, duration: 1.5, repeat: Infinity }}
          />
        ))}
      </motion.g>
      
      {/* Arrow */}
      <motion.path
        d="M85 50 L105 50"
        stroke={color}
        strokeWidth="3"
        markerEnd="url(#greenArrow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5 }}
      />
      
      {/* After bar (shorter, green) */}
      <motion.g>
        <motion.rect
          x="115"
          y="40"
          width="40"
          height="40"
          rx="4"
          fill="#D1FAE5"
          stroke={color}
          strokeWidth="2"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{ transformOrigin: 'bottom' }}
        />
        <text x="135" y="90" fontSize="9" fill={color} textAnchor="middle" fontWeight="bold">After</text>
        <text x="135" y="60" fontSize="10" fill={color} textAnchor="middle">$$</text>
        
        {/* Checkmark */}
        <motion.path
          d="M125 55 L132 62 L148 46"
          stroke={color}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ delay: 1 }}
        />
      </motion.g>
      
      {/* Savings indicator */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <rect x="100" y="5" width="60" height="18" rx="9" fill={color} opacity="0.2" />
        <text x="130" y="17" fontSize="9" fill={color} textAnchor="middle" fontWeight="bold">↓ Less Waste</text>
      </motion.g>
      
      <defs>
        <marker id="greenArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill={color} />
        </marker>
      </defs>
    </motion.svg>
  );
}

// ============================================
// 3. MODULES GRAPHICS - Show platform features
// ============================================

// Trade Flow Diagram
export function TradeFlowGraphic({ isActive, color = '#2563EB' }) {
  const nodes = [
    { x: 20, y: 50, icon: '🏭', label: 'Seller' },
    { x: 90, y: 50, icon: '🌐', label: 'Aaziko' },
    { x: 160, y: 50, icon: '🏢', label: 'Buyer' },
  ];
  
  return (
    <motion.svg viewBox="0 0 180 100" className="trade-infographic" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {/* Connection lines */}
      <motion.path
        d="M40 50 L70 50"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={isActive ? "0" : "5 3"}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M110 50 L140 50"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={isActive ? "0" : "5 3"}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />
      
      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g key={i}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={i === 1 ? 22 : 18}
            fill={i === 1 ? color : 'white'}
            opacity={i === 1 ? 0.2 : 1}
            stroke={color}
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2, type: "spring" }}
          />
          <motion.text
            x={node.x}
            y={node.y + 5}
            fontSize={i === 1 ? "18" : "16"}
            textAnchor="middle"
          >
            {node.icon}
          </motion.text>
          <motion.text
            x={node.x}
            y={node.y + 35}
            fontSize="9"
            fill={color}
            textAnchor="middle"
            fontWeight="500"
          >
            {node.label}
          </motion.text>
        </motion.g>
      ))}
      
      {/* Data packets flowing */}
      {isActive && (
        <>
          <motion.circle
            r="4"
            fill={color}
            animate={{
              cx: [40, 70, 70, 110, 140],
              cy: [50, 50, 50, 50, 50],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            r="4"
            fill="#22D3EE"
            animate={{
              cx: [140, 110, 110, 70, 40],
              cy: [50, 50, 50, 50, 50],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
          />
        </>
      )}
      
      {/* Feature labels around Aaziko */}
      {isActive && ['📄', '🔍', '🚚', '💰'].map((icon, i) => {
        const angle = (i * 90 - 45) * Math.PI / 180;
        const x = 90 + Math.cos(angle) * 35;
        const y = 50 + Math.sin(angle) * 35;
        return (
          <motion.text
            key={i}
            x={x}
            y={y}
            fontSize="12"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            {icon}
          </motion.text>
        );
      })}
    </motion.svg>
  );
}

// Export all graphics
export default {
  TrustGapGraphic,
  ScatteredSystemGraphic,
  DocConfusionGraphic,
  QualityRiskGraphic,
  CostSurprisesGraphic,
  BlameGraphic,
  BuyerJourneyGraphic,
  CostReductionGraphic,
  TradeFlowGraphic
};