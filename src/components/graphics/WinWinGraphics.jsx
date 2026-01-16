import { motion } from 'framer-motion';

/**
 * Visual Graphics for WinWin Section
 * Shows buyer/seller journeys and cost optimization visually
 */

// Buyer Journey - Visual flow showing the buying process
export function BuyerJourneyGraphic({ isActive = false }) {
  const steps = [
    { icon: '🔍', label: 'Find', color: '#3B82F6' },
    { icon: '📋', label: 'Quote', color: '#8B5CF6' },
    { icon: '✅', label: 'Inspect', color: '#10B981' },
    { icon: '📦', label: 'Receive', color: '#F59E0B' },
  ];

  return (
    <motion.svg viewBox="0 0 320 120" className="winwin-graphic">
      {/* Background path */}
      <motion.path
        d="M40 60 Q100 30 160 60 Q220 90 280 60"
        stroke="#E5E7EB"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Animated progress path */}
      <motion.path
        d="M40 60 Q100 30 160 60 Q220 90 280 60"
        stroke="url(#buyerGradient)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0.3 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Step nodes */}
      {steps.map((step, i) => {
        const x = 40 + i * 80;
        const y = i % 2 === 0 ? 60 : (i === 1 ? 35 : 85);
        return (
          <motion.g key={i}>
            {/* Glow effect */}
            <motion.circle
              cx={x}
              cy={y}
              r="28"
              fill={step.color}
              opacity="0.15"
              initial={{ scale: 0 }}
              animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
              transition={{ delay: i * 0.3, duration: 2, repeat: Infinity }}
            />
            {/* Main circle */}
            <motion.circle
              cx={x}
              cy={y}
              r="22"
              fill="white"
              stroke={step.color}
              strokeWidth="3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15, type: "spring" }}
            />
            {/* Icon */}
            <motion.text
              x={x}
              y={y + 6}
              fontSize="18"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.15 + 0.2 }}
            >
              {step.icon}
            </motion.text>
            {/* Label */}
            <motion.text
              x={x}
              y={y + 42}
              fontSize="11"
              fill="#374151"
              textAnchor="middle"
              fontWeight="600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.15 + 0.3 }}
            >
              {step.label}
            </motion.text>
          </motion.g>
        );
      })}

      {/* Moving packet */}
      {isActive && (
        <motion.circle
          r="6"
          fill="#3B82F6"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: "path('M40 60 Q100 30 160 60 Q220 90 280 60')" }}
        />
      )}

      <defs>
        <linearGradient id="buyerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

// Seller Journey - Visual flow showing the selling process
export function SellerJourneyGraphic({ isActive = false }) {
  const steps = [
    { icon: '🏢', label: 'Profile', color: '#059669' },
    { icon: '📤', label: 'Products', color: '#7C3AED' },
    { icon: '💬', label: 'Quote', color: '#0891B2' },
    { icon: '🏭', label: 'Make', color: '#DC2626' },
  ];

  return (
    <motion.svg viewBox="0 0 320 120" className="winwin-graphic">
      {/* Background path */}
      <motion.path
        d="M40 60 L100 60 L160 60 L220 60 L280 60"
        stroke="#E5E7EB"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="8 4"
      />

      {/* Step nodes */}
      {steps.map((step, i) => {
        const x = 40 + i * 80;
        return (
          <motion.g key={i}>
            {/* Connection line to next */}
            {i < steps.length - 1 && (
              <motion.line
                x1={x + 25}
                y1="60"
                x2={x + 55}
                y2="60"
                stroke={step.color}
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isActive ? 1 : 0.5 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              />
            )}
            {/* Outer ring */}
            <motion.circle
              cx={x}
              cy="60"
              r="26"
              fill="none"
              stroke={step.color}
              strokeWidth="2"
              opacity="0.3"
              initial={{ scale: 0 }}
              animate={{ scale: isActive ? [1, 1.15, 1] : 1 }}
              transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }}
            />
            {/* Main circle */}
            <motion.circle
              cx={x}
              cy="60"
              r="22"
              fill={step.color}
              opacity="0.15"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            />
            <motion.circle
              cx={x}
              cy="60"
              r="22"
              fill="white"
              stroke={step.color}
              strokeWidth="2.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
            />
            {/* Icon */}
            <motion.text
              x={x}
              y="66"
              fontSize="18"
              textAnchor="middle"
            >
              {step.icon}
            </motion.text>
            {/* Label */}
            <motion.text
              x={x}
              y="100"
              fontSize="11"
              fill="#374151"
              textAnchor="middle"
              fontWeight="600"
            >
              {step.label}
            </motion.text>
            {/* Step number */}
            <motion.circle
              cx={x + 18}
              cy="42"
              r="10"
              fill={step.color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 + 0.2 }}
            />
            <motion.text
              x={x + 18}
              y="46"
              fontSize="10"
              fill="white"
              textAnchor="middle"
              fontWeight="bold"
            >
              {i + 1}
            </motion.text>
          </motion.g>
        );
      })}
    </motion.svg>
  );
}

// Cost Leaks Visual - Shows money draining through problems
export function CostLeaksGraphic({ isActive = false }) {
  const leaks = [
    { icon: '💱', label: 'Currency', x: 50 },
    { icon: '📄', label: 'Docs', x: 110 },
    { icon: '👥', label: 'Middlemen', x: 170 },
    { icon: '⏰', label: 'Delays', x: 230 },
  ];

  return (
    <motion.svg viewBox="0 0 280 140" className="winwin-graphic">
      {/* Money container (bucket with holes) */}
      <motion.path
        d="M60 30 L60 90 Q60 110 80 110 L200 110 Q220 110 220 90 L220 30"
        stroke="#DC2626"
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Money inside */}
      <motion.rect
        x="65"
        y="50"
        width="150"
        height="55"
        rx="4"
        fill="#FEE2E2"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.5 }}
        style={{ transformOrigin: 'bottom' }}
      />
      
      {/* Dollar signs in bucket */}
      {['$', '$', '$'].map((s, i) => (
        <motion.text
          key={i}
          x={100 + i * 30}
          y="85"
          fontSize="20"
          fill="#DC2626"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? [1, 0.3, 1] : 0.6 }}
          transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }}
        >
          {s}
        </motion.text>
      ))}

      {/* Leak holes and dripping money */}
      {leaks.map((leak, i) => (
        <motion.g key={i}>
          {/* Hole */}
          <motion.circle
            cx={leak.x}
            cy="110"
            r="8"
            fill="#DC2626"
            opacity="0.3"
          />
          {/* Dripping animation */}
          {isActive && (
            <motion.text
              x={leak.x}
              fontSize="12"
              initial={{ y: 115, opacity: 1 }}
              animate={{ y: 140, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            >
              💸
            </motion.text>
          )}
          {/* Label */}
          <motion.text
            x={leak.x}
            y="15"
            fontSize="16"
            textAnchor="middle"
          >
            {leak.icon}
          </motion.text>
          <motion.text
            x={leak.x}
            y="28"
            fontSize="8"
            fill="#6B7280"
            textAnchor="middle"
          >
            {leak.label}
          </motion.text>
        </motion.g>
      ))}

      {/* Warning label */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <rect x="85" y="120" width="110" height="18" rx="9" fill="#FEE2E2" />
        <text x="140" y="132" fontSize="9" fill="#DC2626" textAnchor="middle" fontWeight="bold">
          Money Leaking Out!
        </text>
      </motion.g>
    </motion.svg>
  );
}

// Cost Comparison - Before vs After with Aaziko
export function CostComparisonGraphic({ isActive = false }) {
  return (
    <motion.svg viewBox="0 0 300 140" className="winwin-graphic">
      {/* Before section */}
      <motion.g>
        {/* Bar */}
        <motion.rect
          x="40"
          y="30"
          width="60"
          height="80"
          rx="6"
          fill="#FEE2E2"
          stroke="#DC2626"
          strokeWidth="2"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: 'bottom' }}
        />
        {/* Hidden costs stacked */}
        <motion.rect x="45" y="35" width="50" height="15" rx="2" fill="#DC2626" opacity="0.3" />
        <motion.rect x="45" y="52" width="50" height="15" rx="2" fill="#DC2626" opacity="0.4" />
        <motion.rect x="45" y="69" width="50" height="15" rx="2" fill="#DC2626" opacity="0.5" />
        <motion.rect x="45" y="86" width="50" height="20" rx="2" fill="#DC2626" opacity="0.7" />
        
        <text x="70" y="125" fontSize="11" fill="#DC2626" textAnchor="middle" fontWeight="bold">Before</text>
        <text x="70" y="20" fontSize="10" fill="#DC2626" textAnchor="middle">$$$$$</text>
      </motion.g>

      {/* Arrow */}
      <motion.g>
        <motion.path
          d="M115 70 L145 70"
          stroke="#10B981"
          strokeWidth="3"
          markerEnd="url(#greenArrowWin)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        />
        <motion.text
          x="130"
          y="60"
          fontSize="16"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0.5 }}
          transition={{ delay: 0.8 }}
        >
          ✨
        </motion.text>
      </motion.g>

      {/* After section */}
      <motion.g>
        {/* Bar - shorter */}
        <motion.rect
          x="160"
          y="55"
          width="60"
          height="55"
          rx="6"
          fill="#D1FAE5"
          stroke="#10B981"
          strokeWidth="2"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{ transformOrigin: 'bottom' }}
        />
        {/* Clean structure */}
        <motion.rect x="165" y="60" width="50" height="45" rx="2" fill="#10B981" opacity="0.3" />
        
        <text x="190" y="125" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="bold">After</text>
        <text x="190" y="50" fontSize="10" fill="#10B981" textAnchor="middle">$$$</text>
        
        {/* Checkmark */}
        <motion.path
          d="M175 80 L185 90 L205 70"
          stroke="#10B981"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ delay: 1.2 }}
        />
      </motion.g>

      {/* Savings badge */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <rect x="230" y="60" width="60" height="30" rx="15" fill="#10B981" />
        <text x="260" y="72" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">Less</text>
        <text x="260" y="83" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">Waste</text>
      </motion.g>

      <defs>
        <marker id="greenArrowWin" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="#10B981" />
        </marker>
      </defs>
    </motion.svg>
  );
}

// Aaziko Platform Hub - Shows Aaziko connecting buyer and seller
export function PlatformHubGraphic({ isActive = false }) {
  return (
    <motion.svg viewBox="0 0 280 120" className="winwin-graphic">
      {/* Seller side */}
      <motion.g>
        <motion.circle
          cx="50"
          cy="60"
          r="30"
          fill="#059669"
          opacity="0.15"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
        <motion.circle
          cx="50"
          cy="60"
          r="25"
          fill="white"
          stroke="#059669"
          strokeWidth="2"
        />
        <text x="50" y="55" fontSize="20" textAnchor="middle">🏭</text>
        <text x="50" y="72" fontSize="8" fill="#059669" textAnchor="middle" fontWeight="bold">SELLER</text>
      </motion.g>

      {/* Connection to Aaziko */}
      <motion.path
        d="M80 60 L105 60"
        stroke="#059669"
        strokeWidth="2"
        strokeDasharray={isActive ? "0" : "4 2"}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3 }}
      />

      {/* Aaziko Hub */}
      <motion.g>
        <motion.circle
          cx="140"
          cy="60"
          r="38"
          fill="url(#hubGradient)"
          opacity="0.2"
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="140"
          cy="60"
          r="32"
          fill="white"
          stroke="url(#hubGradient)"
          strokeWidth="3"
        />
        <text x="140" y="55" fontSize="18" textAnchor="middle">🌐</text>
        <text x="140" y="72" fontSize="9" fill="#2563EB" textAnchor="middle" fontWeight="bold">AAZIKO</text>
        
        {/* Orbiting features */}
        {isActive && ['📄', '🔍', '🚚', '💰'].map((icon, i) => {
          const angle = (i * 90 + (Date.now() / 50)) * Math.PI / 180;
          return (
            <motion.text
              key={i}
              fontSize="12"
              animate={{
                x: 140 + Math.cos(angle + i * 1.57) * 45,
                y: 60 + Math.sin(angle + i * 1.57) * 45,
              }}
              transition={{ duration: 0.1 }}
            >
              {icon}
            </motion.text>
          );
        })}
      </motion.g>

      {/* Connection to Buyer */}
      <motion.path
        d="M175 60 L200 60"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeDasharray={isActive ? "0" : "4 2"}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5 }}
      />

      {/* Buyer side */}
      <motion.g>
        <motion.circle
          cx="230"
          cy="60"
          r="30"
          fill="#3B82F6"
          opacity="0.15"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        />
        <motion.circle
          cx="230"
          cy="60"
          r="25"
          fill="white"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        <text x="230" y="55" fontSize="20" textAnchor="middle">🏢</text>
        <text x="230" y="72" fontSize="8" fill="#3B82F6" textAnchor="middle" fontWeight="bold">BUYER</text>
      </motion.g>

      {/* Data flow animation */}
      {isActive && (
        <>
          <motion.circle
            r="4"
            fill="#059669"
            animate={{ cx: [80, 105, 140], cy: [60, 60, 60] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
          />
          <motion.circle
            r="4"
            fill="#3B82F6"
            animate={{ cx: [200, 175, 140], cy: [60, 60, 60] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, delay: 0.75 }}
          />
        </>
      )}

      <defs>
        <linearGradient id="hubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

export default {
  BuyerJourneyGraphic,
  SellerJourneyGraphic,
  CostLeaksGraphic,
  CostComparisonGraphic,
  PlatformHubGraphic
};