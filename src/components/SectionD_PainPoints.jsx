import { motion, useInView } from 'framer-motion';
import { useRef, useState, memo, useMemo, useEffect } from 'react';
import { ComparisonVisual } from './graphics';
import '../styles/painPoints.css';

// Simplified static SVG icons for pain points
const PainPointIcons = {
  trustGap: (color) => (
    <svg viewBox="0 0 140 100" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <path d="M15 55 L35 55 L40 50 L45 55 L50 50 L55 55 L55 65 L15 65 Z" fill={color} opacity="0.3" />
      <path d="M15 55 L35 55 L40 50 L45 55 L50 50 L55 55 L55 65 L15 65 Z" stroke={color} strokeWidth="2" fill="none" />
      <path d="M85 55 L105 55 L100 50 L95 55 L90 50 L85 55 L85 65 L125 65 Z" fill={color} opacity="0.3" />
      <path d="M85 55 L105 55 L100 50 L95 55 L90 50 L85 55 L85 65 L125 65 Z" stroke={color} strokeWidth="2" fill="none" />
      <path d="M65 45 L72 55 L68 55 L75 70 L62 58 L66 58 L60 45 Z" fill="#FCD34D" />
      <text x="25" y="30" fontSize="16" fill={color} fontWeight="bold" opacity="0.6">?</text>
      <text x="70" y="20" fontSize="16" fill={color} fontWeight="bold" opacity="0.6">?</text>
      <text x="110" y="35" fontSize="16" fill={color} fontWeight="bold" opacity="0.6">?</text>
      <rect x="55" y="75" width="30" height="18" rx="3" fill={color} opacity="0.2" />
      <text x="62" y="87" fontSize="8" fill={color}>FAKE</text>
    </svg>
  ),
  noSystem: (color) => (
    <svg viewBox="0 0 140 100" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {[
        { x: 10, y: 15, label: '📧' },
        { x: 80, y: 10, label: '💬' },
        { x: 45, y: 50, label: '📱' },
        { x: 100, y: 45, label: '📄' },
        { x: 25, y: 70, label: '👤' },
        { x: 75, y: 75, label: '📊' },
      ].map((item, i) => (
        <g key={i}>
          <rect x={item.x} y={item.y} width="28" height="22" rx="4" fill="white" stroke={color} strokeWidth="1.5" />
          <text x={item.x + 14} y={item.y + 15} fontSize="12" textAnchor="middle">{item.label}</text>
        </g>
      ))}
      <g opacity="0.4">
        <path d="M38 25 Q50 30 55 45" stroke={color} strokeWidth="1" fill="none" strokeDasharray="3 2" />
        <path d="M108 25 Q95 35 85 50" stroke={color} strokeWidth="1" fill="none" strokeDasharray="3 2" />
        <path d="M53 70 Q60 60 73 55" stroke={color} strokeWidth="1" fill="none" strokeDasharray="3 2" />
      </g>
      <g transform="rotate(-15, 70, 45)">
        <rect x="45" y="35" width="50" height="20" rx="2" fill="none" stroke="#DC2626" strokeWidth="2" />
        <text x="50" y="48" fontSize="8" fill="#DC2626" fontWeight="bold">NO RECORD</text>
      </g>
    </svg>
  ),
  docConfusion: (color) => (
    <svg viewBox="0 0 140 100" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {[
        { x: 20, y: 20, rotate: -12 },
        { x: 30, y: 15, rotate: 8 },
        { x: 40, y: 22, rotate: -5 },
        { x: 50, y: 12, rotate: 15 },
      ].map((doc, i) => (
        <g key={i} transform={`rotate(${doc.rotate}, ${doc.x + 17}, ${doc.y + 22})`}>
          <rect x={doc.x} y={doc.y} width="35" height="45" rx="2" fill="white" stroke={color} strokeWidth="1.5" />
          <line x1={doc.x + 5} y1={doc.y + 12} x2={doc.x + 30} y2={doc.y + 12} stroke={color} strokeWidth="1" opacity="0.4" />
          <line x1={doc.x + 5} y1={doc.y + 20} x2={doc.x + 25} y2={doc.y + 20} stroke={color} strokeWidth="1" opacity="0.4" />
          <line x1={doc.x + 5} y1={doc.y + 28} x2={doc.x + 28} y2={doc.y + 28} stroke={color} strokeWidth="1" opacity="0.4" />
        </g>
      ))}
      <path d="M95 25 L105 35 M105 25 L95 35" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
      <path d="M100 55 L110 65 M110 55 L100 65" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
      <rect x="85" y="70" width="45" height="20" rx="3" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
      <text x="92" y="83" fontSize="7" fill="#DC2626" fontWeight="bold">CUSTOMS!</text>
      <path d="M115 15 L125 30 L105 30 Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="112" y="27" fontSize="10" fill="#92400E" fontWeight="bold">!</text>
    </svg>
  ),
  qualityRisk: (color) => (
    <svg viewBox="0 0 140 100" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <rect x="70" y="30" width="50" height="40" rx="4" fill="white" stroke={color} strokeWidth="2" />
      <line x1="95" y1="30" x2="95" y2="70" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="70" y1="50" x2="120" y2="50" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M80 40 L100 60" stroke="#DC2626" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="40" cy="45" r="22" fill="rgba(255,255,255,0.9)" stroke={color} strokeWidth="3" />
      <line x1="56" y1="61" x2="72" y2="77" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <text x="33" y="52" fontSize="22" fill={color} fontWeight="bold">?</text>
      <rect x="75" y="75" width="40" height="16" rx="3" fill="#FEE2E2" />
      <text x="80" y="86" fontSize="7" fill="#DC2626" fontWeight="bold">NO PROOF</text>
      <circle cx="125" cy="20" r="12" fill="#FEE2E2" />
      <text x="120" y="25" fontSize="14">👎</text>
    </svg>
  ),
  costSurprises: (color) => (
    <svg viewBox="0 0 140 100" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <path d="M15 40 L50 40 L60 50 L50 60 L15 60 Z" fill="white" stroke={color} strokeWidth="2" />
      <circle cx="25" cy="50" r="4" fill={color} />
      <text x="35" y="54" fontSize="12" fill={color} fontWeight="bold">$50</text>
      {[
        { x: 70, y: 10, label: '+$15' },
        { x: 95, y: 25, label: '+$22' },
        { x: 80, y: 50, label: '+$8' },
        { x: 105, y: 60, label: '+$18' },
      ].map((cost, i) => (
        <g key={i}>
          <rect x={cost.x} y={cost.y} width="30" height="18" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
          <text x={cost.x + 5} y={cost.y + 13} fontSize="9" fill="#DC2626" fontWeight="bold">{cost.label}</text>
        </g>
      ))}
      <rect x="15" y="75" width="55" height="20" rx="4" fill="#DC2626" opacity="0.1" stroke="#DC2626" strokeWidth="1.5" />
      <text x="22" y="88" fontSize="10" fill="#DC2626" fontWeight="bold">Final: $113!</text>
    </svg>
  ),
  unclearAccountability: (color) => (
    <svg viewBox="0 0 140 100" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {[
        { x: 25, dir: 'right', label: 'Seller' },
        { x: 70, dir: 'both', label: 'Broker' },
        { x: 115, dir: 'left', label: 'Buyer' },
      ].map((person, i) => (
        <g key={i}>
          <circle cx={person.x} cy="30" r="10" fill={color} opacity="0.7" />
          <line x1={person.x} y1="40" x2={person.x} y2="65" stroke={color} strokeWidth="3" />
          <path d={`M${person.x} 65 L${person.x - 10} 82 M${person.x} 65 L${person.x + 10} 82`} stroke={color} strokeWidth="2.5" fill="none" />
          {(person.dir === 'right' || person.dir === 'both') && (
            <line x1={person.x} y1="48" x2={person.x + 25} y2="42" stroke={color} strokeWidth="2.5" />
          )}
          {(person.dir === 'left' || person.dir === 'both') && (
            <line x1={person.x} y1="48" x2={person.x - 25} y2="42" stroke={color} strokeWidth="2.5" />
          )}
          <text x={person.x} y="95" fontSize="8" fill={color} textAnchor="middle" opacity="0.7">{person.label}</text>
        </g>
      ))}
      <polygon points="48,42 55,45 48,48" fill={color} opacity="0.6" />
      <polygon points="92,42 85,45 92,48" fill={color} opacity="0.6" />
      <rect x="45" y="5" width="50" height="16" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
      <text x="50" y="16" fontSize="8" fill="#92400E" fontWeight="bold">WHO'S FAULT?</text>
    </svg>
  )
};

const painPoints = [
  {
    title: 'Trust Gap',
    description: 'Unknown supplier credibility, fake claims, weak proof',
    color: '#EF4444',
    iconKey: 'trustGap'
  },
  {
    title: 'No Single System',
    description: 'Too many chats, emails, brokers — no clear record',
    color: '#F59E0B',
    iconKey: 'noSystem'
  },
  {
    title: 'Documentation Confusion',
    description: 'Wrong documents → customs delays, penalties, rejections',
    color: '#8B5CF6',
    iconKey: 'docConfusion'
  },
  {
    title: 'Quality Risk',
    description: 'No inspection proof → disputes after shipment',
    color: '#EC4899',
    iconKey: 'qualityRisk'
  },
  {
    title: 'Cost Surprises',
    description: 'Logistics and handling costs change late in the process',
    color: '#10B981',
    iconKey: 'costSurprises'
  },
  {
    title: 'Unclear Accountability',
    description: 'When something fails, everyone blames someone else',
    color: '#3B82F6',
    iconKey: 'unclearAccountability'
  }
];

const traditionalProblems = [
  'Unknown supplier credibility',
  'Scattered communication channels',
  'Manual document errors',
  'No quality verification',
  'Hidden fees & surprises',
  'Blame games when issues arise'
];

const aazikoSolutions = [
  '100% assurance on goods quality, quantity and packaging',
  'Smoothest logistics',
  'All shipments must pass inspection',
  'Custom 3.0 (Custom Guide)',
  'Trade agreement guide',
  'Transparent and easy communication between seller and buyer'
];

// Memoized card component to prevent unnecessary re-renders
const PainPointCard = memo(function PainPointCard({ point, index, isHovered, onHover, onLeave, hasAnimated }) {
  const IconComponent = PainPointIcons[point.iconKey];
  
  return (
    <div
      className={`pain-point-card ${isHovered ? 'is-hovered' : ''}`}
      style={{
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated ? 'scale(1)' : 'scale(0.95)',
        filter: hasAnimated ? 'blur(0px)' : 'blur(4px)',
        transition: `opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.06}s, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.06}s, filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.06}s`
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="card-glow" />
      <div className="card-border" />

      <div 
        className="pain-point-graphic"
        style={{
          background: `linear-gradient(135deg, ${point.color}08 0%, ${point.color}03 100%)`,
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          border: `1px solid ${point.color}15`,
          minHeight: '120px',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible'
        }}
      >
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {IconComponent(point.color)}
        </div>
      </div>

      <h3 className="pain-point-title" style={{ color: point.color }}>
        {point.title}
      </h3>
      <p className="pain-point-description">{point.description}</p>
    </div>
  );
});

export default function SectionD_PainPoints() {
  const sectionRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  // Once in view, mark as animated permanently
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Memoize the cards to prevent re-creation
  const cards = useMemo(() => painPoints.map((point, index) => (
    <PainPointCard
      key={index}
      point={point}
      index={index}
      isHovered={hoveredCard === index}
      hasAnimated={hasAnimated}
      onHover={() => setHoveredCard(index)}
      onLeave={() => setHoveredCard(null)}
    />
  )), [hoveredCard, hasAnimated]);

  return (
    <div ref={sectionRef} className="pain-points-section">
      {/* Simplified Background - CSS only */}
      <div className="pain-points-bg-effects">
        <div className="gradient-orb gradient-orb--1" />
        <div className="gradient-orb gradient-orb--2" />
        <div className="grid-overlay" />
      </div>

      <div 
        className="pain-points-container"
        style={{
          opacity: hasAnimated ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}
      >
        {/* Header */}
        <div 
          className="pain-points-header"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'scale(1)' : 'scale(0.97)',
            filter: hasAnimated ? 'blur(0px)' : 'blur(4px)',
            transition: 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          <span className="pain-points-badge">
            <span className="badge-dot" />
            Industry Challenges
          </span>
          <h2 className="pain-points-title">
            What goes wrong in
            <span className="title-highlight"> today's global trade</span>
          </h2>
          <p className="pain-points-subtext">
            Trade breaks not because of products — but because of process gaps, 
            unclear responsibility, and hidden costs.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="pain-points-grid">
          {cards}
        </div>

        {/* Comparison Section */}
        <div 
          className="comparison-section"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'scale(1)' : 'scale(0.97)',
            filter: hasAnimated ? 'blur(0px)' : 'blur(4px)',
            transition: 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.25s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.25s, filter 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.25s'
          }}
        >
          <h3 style={{
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 700,
            color: '#0B1220',
            marginBottom: '24px'
          }}>
            The Transformation
          </h3>

          <ComparisonVisual
            beforeItems={traditionalProblems}
            afterItems={aazikoSolutions}
            beforeLabel="Traditional Problems"
            afterLabel="How Aaziko Fixes It"
            beforeColor="#EF4444"
            afterColor="#16A34A"
          />
        </div>
      </div>
    </div>
  );
}
