import { motion } from 'framer-motion';

/**
 * IMPROVED WinWin Section Graphics - Premium visual storytelling
 * Shows buyer/seller journeys and cost optimization with detailed animations
 */

// Buyer Journey - Visual flow showing the complete buying process
export function ImprovedBuyerJourneyGraphic({ isActive = false }) {
  const steps = [
    { icon: '🔍', label: 'Find Product', color: '#3B82F6', desc: 'Search' },
    { icon: '📋', label: 'Get Quote', color: '#8B5CF6', desc: 'Compare' },
    { icon: '🔬', label: 'Inspect', color: '#10B981', desc: 'Verify' },
    { icon: '📦', label: 'Receive', color: '#F59E0B', desc: 'Deliver' },
  ];

  return (
    <motion.svg viewBox="0 0 400 160" className="improved-winwin-graphic">
      <defs>
        <linearGradient id="buyerPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="33%" stopColor="#8B5CF6" />
          <stop offset="66%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <filter id="buyerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background path */}
      <motion.path
        d="M50 80 C100 40, 150 120, 200 80 C250 40, 300 120, 350 80"
        stroke="#E5E7EB"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Animated progress path */}
      <motion.path
        d="M50 80 C100 40, 150 120, 200 80 C250 40, 300 120, 350 80"
        stroke="url(#buyerPathGradient)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0.3 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      {/* Step nodes */}
      {steps.map((step, i) => {
        const x = 50 + i * 100;
        const y = i % 2 === 0 ? 80 : (i === 1 ? 50 : 110);
        return (
          <motion.g key={i}>
            {/* Outer glow ring */}
            <motion.circle
              cx={x}
              cy={y}
              r="35"
              fill={step.color}
              opacity="0.1"
              initial={{ scale: 0 }}
              animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
              transition={{ delay: i * 0.3, duration: 2, repeat: Infinity }}
            />
            
            {/* Middle ring */}
            <motion.circle
              cx={x}
              cy={y}
              r="28"
              fill="none"
              stroke={step.color}
              strokeWidth="2"
              opacity="0.3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15 }}
            />
            
            {/* Main circle */}
            <motion.circle
              cx={x}
              cy={y}
              r="24"
              fill="white"
              stroke={step.color}
              strokeWidth="3"
              filter="url(#buyerGlow)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
            />
            
            {/* Icon */}
            <motion.text
              x={x}
              y={y + 6}
              fontSize="20"
              textAnchor="middle"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 + 0.2 }}
            >
              {step.icon}
            </motion.text>
            
            {/* Step number badge */}
            <motion.circle
              cx={x + 20}
              cy={y - 18}
              r="10"
              fill={step.color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15 + 0.3 }}
            />
            <motion.text
              x={x + 20}
              y={y - 14}
              fontSize="10"
              fill="white"
              textAnchor="middle"
              fontWeight="bold"
            >
              {i + 1}
            </motion.text>
            
            {/* Label */}
            <motion.text
              x={x}
              y={y + 50}
              fontSize="11"
              fill="#374151"
              textAnchor="middle"
              fontWeight="600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.15 + 0.4 }}
            >
              {step.label}
            </motion.text>
          </motion.g>
        );
      })}

      {/* Moving packet animation */}
      {isActive && (
        <motion.g>
          <motion.circle
            r="8"
            fill="#3B82F6"
            filter="url(#buyerGlow)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ offsetPath: "path('M50 80 C100 40, 150 120, 200 80 C250 40, 300 120, 350 80')" }}
          />
          <motion.text
            fontSize="10"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ offsetPath: "path('M50 80 C100 40, 150 120, 200 80 C250 40, 300 120, 350 80')" }}
          >
            📦
          </motion.text>
        </motion.g>
      )}

      {/* "BUYER JOURNEY" label */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <rect x="150" y="5" width="100" height="22" rx="11" fill="#3B82F6" opacity="0.1" />
        <text x="200" y="19" fontSize="10" fill="#3B82F6" textAnchor="middle" fontWeight="bold">BUYER JOURNEY</text>
      </motion.g>
    </motion.svg>
  );
}

// Seller Journey - Visual flow showing the selling process
export function ImprovedSellerJourneyGraphic({ isActive = false }) {
  const steps = [
    { icon: '🏢', label: 'Create Profile', color: '#059669' },
    { icon: '📤', label: 'List Products', color: '#7C3AED' },
    { icon: '💬', label: 'Quote Buyers', color: '#0891B2' },
    { icon: '🏭', label: 'Manufacture', color: '#DC2626' },
  ];

  return (
    <motion.svg viewBox="0 0 400 160" className="improved-winwin-graphic">
      <defs>
        <linearGradient id="sellerPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="33%" stopColor="#7C3AED" />
          <stop offset="66%" stopColor="#0891B2" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
      </defs>

      {/* Connection line */}
      <motion.line
        x1="50" y1="80" x2="350" y2="80"
        stroke="#E5E7EB"
        strokeWidth="4"
        strokeDasharray="8 4"
      />
      
      {/* Animated line */}
      <motion.line
        x1="50" y1="80" x2="350" y2="80"
        stroke="url(#sellerPathGradient)"
        strokeWidth="4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0.3 }}
        transition={{ duration: 2 }}
      />

      {/* Step nodes */}
      {steps.map((step, i) => {
        const x = 50 + i * 100;
        return (
          <motion.g key={i}>
            {/* Outer pulse ring */}
            <motion.circle
              cx={x}
              cy="80"
              r="32"
              fill="none"
              stroke={step.color}
              strokeWidth="2"
              opacity="0.2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isActive ? { scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] } : { scale: 1, opacity: 0.2 }}
              transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
            />
            
            {/* Background circle */}
            <motion.circle
              cx={x}
              cy="80"
              r="26"
              fill={step.color}
              opacity="0.1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            />
            
            {/* Main circle */}
            <motion.circle
              cx={x}
              cy="80"
              r="24"
              fill="white"
              stroke={step.color}
              strokeWidth="3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
            />
            
            {/* Icon */}
            <motion.text
              x={x}
              y="86"
              fontSize="20"
              textAnchor="middle"
            >
              {step.icon}
            </motion.text>
            
            {/* Step number */}
            <motion.circle
              cx={x + 18}
              cy="58"
              r="12"
              fill={step.color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 + 0.2 }}
            />
            <motion.text
              x={x + 18}
              y="62"
              fontSize="11"
              fill="white"
              textAnchor="middle"
              fontWeight="bold"
            >
              {i + 1}
            </motion.text>
            
            {/* Label */}
            <motion.text
              x={x}
              y="125"
              fontSize="11"
              fill="#374151"
              textAnchor="middle"
              fontWeight="600"
            >
              {step.label}
            </motion.text>
            
            {/* Connector arrow */}
            {i < steps.length - 1 && (
              <motion.path
                d={`M${x + 30} 80 L${x + 65} 80`}
                stroke={step.color}
                strokeWidth="2"
                fill="none"
                markerEnd="url(#sellerArrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isActive ? 1 : 0.5 }}
                transition={{ delay: i * 0.2 + 0.3 }}
              />
            )}
          </motion.g>
        );
      })}

      {/* "SELLER JOURNEY" label */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <rect x="145" y="5" width="110" height="22" rx="11" fill="#059669" opacity="0.1" />
        <text x="200" y="19" fontSize="10" fill="#059669" textAnchor="middle" fontWeight="bold">SELLER JOURNEY</text>
      </motion.g>

      <defs>
        <marker id="sellerArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="#6B7280" />
        </marker>
      </defs>
    </motion.svg>
  );
}

// Cost Leaks Visual - Shows money draining through problems
export function ImprovedCostLeaksGraphic({ isActive = false }) {
  const leaks = [
    { icon: '💱', label: 'Currency Spread', x: 60, color: '#EF4444' },
    { icon: '📄', label: 'Doc Rework', x: 140, color: '#F59E0B' },
    { icon: '👥', label: 'Middlemen', x: 220, color: '#8B5CF6' },
    { icon: '⏰', label: 'Delay Fees', x: 300, color: '#DC2626' },
  ];

  return (
    <motion.svg viewBox="0 0 360 180" className="improved-winwin-graphic">
      <defs>
        <filter id="leakShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#DC2626" floodOpacity="0.2"/>
        </filter>
      </defs>

      {/* Money container (bucket) */}
      <motion.g filter="url(#leakShadow)">
        <motion.path
          d="M80 40 L80 110 Q80 130 100 130 L260 130 Q280 130 280 110 L280 40"
          stroke="#DC2626"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Money inside */}
        <motion.rect
          x="85"
          y="55"
          width="190"
          height="70"
          rx="6"
          fill="#FEE2E2"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isActive ? [1, 0.7, 1] : 1 }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transformOrigin: 'bottom' }}
        />
        
        {/* Dollar signs in bucket */}
        {['$', '$', '$'].map((s, i) => (
          <motion.text
            key={i}
            x={120 + i * 40}
            y="100"
            fontSize="24"
            fill="#DC2626"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? [1, 0.3, 1] : 0.6 }}
            transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
          >
            {s}
          </motion.text>
        ))}
      </motion.g>

      {/* Leak holes and dripping money */}
      {leaks.map((leak, i) => (
        <motion.g key={i}>
          {/* Hole in bucket */}
          <motion.ellipse
            cx={leak.x}
            cy="130"
            rx="12"
            ry="6"
            fill={leak.color}
            opacity="0.4"
          />
          
          {/* Dripping animation */}
          {isActive && (
            <motion.g>
              <motion.text
                x={leak.x}
                fontSize="14"
                initial={{ y: 135, opacity: 1 }}
                animate={{ y: 175, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              >
                💸
              </motion.text>
            </motion.g>
          )}
          
          {/* Label above */}
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <rect x={leak.x - 35} y="5" width="70" height="30" rx="6" fill="white" stroke={leak.color} strokeWidth="1.5" />
            <text x={leak.x} y="18" fontSize="14" textAnchor="middle">{leak.icon}</text>
            <text x={leak.x} y="30" fontSize="7" fill={leak.color} textAnchor="middle" fontWeight="600">{leak.label}</text>
          </motion.g>
          
          {/* Connecting line */}
          <motion.line
            x1={leak.x}
            y1="35"
            x2={leak.x}
            y2="125"
            stroke={leak.color}
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.4"
          />
        </motion.g>
      ))}

      {/* Warning label */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
      >
        <rect x="115" y="150" width="130" height="24" rx="12" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
        <text x="180" y="166" fontSize="10" fill="#DC2626" textAnchor="middle" fontWeight="bold">💰 Money Leaking Out!</text>
      </motion.g>
    </motion.svg>
  );
}


// Cost Comparison - Before vs After with Aaziko (Improved)
export function ImprovedCostComparisonGraphic({ isActive = false }) {
  return (
    <motion.svg viewBox="0 0 400 180" className="improved-winwin-graphic">
      <defs>
        <linearGradient id="beforeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEE2E2" />
          <stop offset="100%" stopColor="#FECACA" />
        </linearGradient>
        <linearGradient id="afterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D1FAE5" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>
        <filter id="compShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.15"/>
        </filter>
      </defs>

      {/* Before section */}
      <motion.g filter="url(#compShadow)">
        {/* Bar container */}
        <motion.rect
          x="50"
          y="30"
          width="100"
          height="110"
          rx="10"
          fill="url(#beforeGradient)"
          stroke="#DC2626"
          strokeWidth="2"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: 'bottom' }}
        />
        
        {/* Hidden costs stacked */}
        <motion.g>
          <motion.rect x="58" y="38" width="84" height="20" rx="4" fill="#DC2626" opacity="0.2"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }} />
          <text x="100" y="52" fontSize="8" fill="#DC2626" textAnchor="middle">Currency Loss</text>
          
          <motion.rect x="58" y="62" width="84" height="20" rx="4" fill="#DC2626" opacity="0.3"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4 }} />
          <text x="100" y="76" fontSize="8" fill="#DC2626" textAnchor="middle">Doc Errors</text>
          
          <motion.rect x="58" y="86" width="84" height="20" rx="4" fill="#DC2626" opacity="0.4"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5 }} />
          <text x="100" y="100" fontSize="8" fill="#DC2626" textAnchor="middle">Middlemen</text>
          
          <motion.rect x="58" y="110" width="84" height="24" rx="4" fill="#DC2626" opacity="0.6"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6 }} />
          <text x="100" y="126" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">Base Cost</text>
        </motion.g>
        
        <text x="100" y="160" fontSize="12" fill="#DC2626" textAnchor="middle" fontWeight="bold">BEFORE</text>
        <text x="100" y="22" fontSize="14" fill="#DC2626" textAnchor="middle" fontWeight="bold">$$$</text>
      </motion.g>

      {/* Transformation arrow */}
      <motion.g>
        <motion.path
          d="M165 90 L195 90"
          stroke="#10B981"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        />
        <motion.polygon
          points="195,82 210,90 195,98"
          fill="#10B981"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        />
        
        {/* Aaziko badge */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, type: "spring" }}
        >
          <circle cx="187" cy="70" r="18" fill="white" stroke="#10B981" strokeWidth="2" />
          <text x="187" y="75" fontSize="14" textAnchor="middle">✨</text>
        </motion.g>
      </motion.g>

      {/* After section */}
      <motion.g filter="url(#compShadow)">
        {/* Bar container - shorter */}
        <motion.rect
          x="230"
          y="60"
          width="100"
          height="80"
          rx="10"
          fill="url(#afterGradient)"
          stroke="#10B981"
          strokeWidth="2"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ transformOrigin: 'bottom' }}
        />
        
        {/* Clean structure */}
        <motion.rect x="238" y="68" width="84" height="64" rx="4" fill="#10B981" opacity="0.2"
          initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ delay: 1.4 }} />
        
        {/* Checkmark */}
        <motion.path
          d="M260 100 L275 115 L310 80"
          stroke="#10B981"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        />
        
        <text x="280" y="160" fontSize="12" fill="#10B981" textAnchor="middle" fontWeight="bold">AFTER</text>
        <text x="280" y="52" fontSize="14" fill="#10B981" textAnchor="middle" fontWeight="bold">$$</text>
      </motion.g>

      {/* Savings badge */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isActive ? 1 : 0.6, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <rect x="340" y="75" width="55" height="50" rx="10" fill="#10B981" />
        <text x="367" y="95" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">Less</text>
        <text x="367" y="108" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">Waste</text>
        <text x="367" y="120" fontSize="14" textAnchor="middle">📉</text>
      </motion.g>
    </motion.svg>
  );
}

// Aaziko Platform Hub - Shows Aaziko connecting buyer and seller (Improved)
export function ImprovedPlatformHubGraphic({ isActive = false }) {
  const features = [
    { icon: '📄', label: 'Docs', angle: -60 },
    { icon: '🔍', label: 'Inspect', angle: -20 },
    { icon: '🚚', label: 'Ship', angle: 20 },
    { icon: '💰', label: 'Pay', angle: 60 },
  ];

  return (
    <motion.svg viewBox="0 0 400 160" className="improved-winwin-graphic">
      <defs>
        <linearGradient id="hubGradientImproved" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <filter id="hubGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Seller side */}
      <motion.g>
        <motion.circle
          cx="60"
          cy="80"
          r="40"
          fill="#059669"
          opacity="0.1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
        <motion.circle
          cx="60"
          cy="80"
          r="32"
          fill="white"
          stroke="#059669"
          strokeWidth="3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        />
        <text x="60" y="72" fontSize="24" textAnchor="middle">🏭</text>
        <text x="60" y="92" fontSize="9" fill="#059669" textAnchor="middle" fontWeight="bold">SELLER</text>
        
        {/* Seller benefits */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <text x="60" y="135" fontSize="8" fill="#6B7280" textAnchor="middle">Global Reach</text>
          <text x="60" y="145" fontSize="8" fill="#6B7280" textAnchor="middle">Easy Export</text>
        </motion.g>
      </motion.g>

      {/* Connection to Aaziko */}
      <motion.g>
        <motion.path
          d="M100 80 L140 80"
          stroke="#059669"
          strokeWidth="3"
          strokeDasharray={isActive ? "0" : "6 3"}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
        
        {/* Data flow dots */}
        {isActive && (
          <motion.circle
            r="5"
            fill="#059669"
            animate={{ cx: [100, 140], cy: [80, 80] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.g>

      {/* Aaziko Hub - Center */}
      <motion.g>
        {/* Outer glow */}
        <motion.circle
          cx="200"
          cy="80"
          r="55"
          fill="url(#hubGradientImproved)"
          opacity="0.1"
          animate={isActive ? { scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Middle ring */}
        <motion.circle
          cx="200"
          cy="80"
          r="48"
          fill="none"
          stroke="url(#hubGradientImproved)"
          strokeWidth="2"
          opacity="0.3"
        />
        
        {/* Main hub circle */}
        <motion.circle
          cx="200"
          cy="80"
          r="42"
          fill="white"
          stroke="url(#hubGradientImproved)"
          strokeWidth="4"
          filter="url(#hubGlow)"
        />
        
        <text x="200" y="72" fontSize="22" textAnchor="middle">🌐</text>
        <text x="200" y="92" fontSize="11" fill="#2563EB" textAnchor="middle" fontWeight="bold">AAZIKO</text>
        
        {/* Orbiting features */}
        {features.map((feature, i) => {
          const rad = (feature.angle * Math.PI) / 180;
          const x = 200 + Math.cos(rad) * 65;
          const y = 80 + Math.sin(rad) * 45;
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <circle cx={x} cy={y} r="16" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
              <text x={x} y={y + 4} fontSize="12" textAnchor="middle">{feature.icon}</text>
            </motion.g>
          );
        })}
      </motion.g>

      {/* Connection to Buyer */}
      <motion.g>
        <motion.path
          d="M260 80 L300 80"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeDasharray={isActive ? "0" : "6 3"}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        
        {/* Data flow dots */}
        {isActive && (
          <motion.circle
            r="5"
            fill="#3B82F6"
            animate={{ cx: [260, 300], cy: [80, 80] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.5 }}
          />
        )}
      </motion.g>

      {/* Buyer side */}
      <motion.g>
        <motion.circle
          cx="340"
          cy="80"
          r="40"
          fill="#3B82F6"
          opacity="0.1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        />
        <motion.circle
          cx="340"
          cy="80"
          r="32"
          fill="white"
          stroke="#3B82F6"
          strokeWidth="3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        />
        <text x="340" y="72" fontSize="24" textAnchor="middle">🏢</text>
        <text x="340" y="92" fontSize="9" fill="#3B82F6" textAnchor="middle" fontWeight="bold">BUYER</text>
        
        {/* Buyer benefits */}
        <motion.g
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <text x="340" y="135" fontSize="8" fill="#6B7280" textAnchor="middle">Verified Sellers</text>
          <text x="340" y="145" fontSize="8" fill="#6B7280" textAnchor="middle">Clear Process</text>
        </motion.g>
      </motion.g>

      {/* Trust badge */}
      {isActive && (
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <rect x="165" y="5" width="70" height="22" rx="11" fill="#10B981" opacity="0.15" />
          <text x="200" y="19" fontSize="9" fill="#10B981" textAnchor="middle" fontWeight="bold">✓ Connected</text>
        </motion.g>
      )}
    </motion.svg>
  );
}
