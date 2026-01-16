import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Visual Infographic for Pain Points - Shows trade problems as an illustrated scene
 */

// Broken chain link illustration
const BrokenChainGraphic = ({ isActive, color }) => (
  <motion.svg viewBox="0 0 120 80" className="pain-graphic-svg">
    {/* Left chain link */}
    <motion.path
      d="M10 40 Q10 20 30 20 L40 20 Q50 20 50 30 L50 50 Q50 60 40 60 L30 60 Q10 60 10 40"
      stroke={color}
      strokeWidth="4"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8 }}
    />
    {/* Right chain link - broken/separated */}
    <motion.path
      d="M70 40 Q70 20 90 20 L100 20 Q110 20 110 30 L110 50 Q110 60 100 60 L90 60 Q70 60 70 40"
      stroke={color}
      strokeWidth="4"
      fill="none"
      initial={{ pathLength: 0, x: 0 }}
      animate={{ pathLength: 1, x: isActive ? 10 : 0 }}
      transition={{ duration: 0.8 }}
    />
    {/* Break spark */}
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.path d="M55 35 L60 40 L55 45" stroke="#EF4444" strokeWidth="2" fill="none" />
      <motion.path d="M65 35 L60 40 L65 45" stroke="#EF4444" strokeWidth="2" fill="none" />
      <motion.circle cx="60" cy="40" r="3" fill="#EF4444" 
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.g>
    {/* Question marks */}
    <motion.text x="25" y="45" fontSize="16" fill={color} opacity="0.6"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 0.8 : 0.4 }}
    >?</motion.text>
    <motion.text x="90" y="45" fontSize="16" fill={color} opacity="0.6"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 0.8 : 0.4 }}
    >?</motion.text>
  </motion.svg>
);

// Scattered communication illustration
const ScatteredCommsGraphic = ({ isActive, color }) => (
  <motion.svg viewBox="0 0 120 80" className="pain-graphic-svg">
    {/* Multiple chat bubbles scattered */}
    {[
      { x: 15, y: 15, size: 25 },
      { x: 70, y: 10, size: 20 },
      { x: 45, y: 45, size: 22 },
      { x: 85, y: 50, size: 18 },
      { x: 20, y: 55, size: 16 },
    ].map((bubble, i) => (
      <motion.g key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: isActive ? [0, -3, 0] : 0
        }}
        transition={{ 
          delay: i * 0.1, 
          duration: 0.4,
          y: { duration: 2, repeat: Infinity, delay: i * 0.2 }
        }}
      >
        <rect x={bubble.x} y={bubble.y} width={bubble.size} height={bubble.size * 0.7} 
          rx="4" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
        {/* Message lines */}
        <line x1={bubble.x + 4} y1={bubble.y + bubble.size * 0.25} 
          x2={bubble.x + bubble.size - 4} y2={bubble.y + bubble.size * 0.25}
          stroke={color} strokeWidth="2" opacity="0.5" />
        <line x1={bubble.x + 4} y1={bubble.y + bubble.size * 0.45} 
          x2={bubble.x + bubble.size * 0.6} y2={bubble.y + bubble.size * 0.45}
          stroke={color} strokeWidth="2" opacity="0.5" />
      </motion.g>
    ))}
    {/* Confused arrows */}
    <motion.path d="M40 30 Q50 25 55 35" stroke={color} strokeWidth="1.5" fill="none" strokeDasharray="3 2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.5 }}
    />
    <motion.path d="M65 45 Q75 40 80 50" stroke={color} strokeWidth="1.5" fill="none" strokeDasharray="3 2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.5 }}
    />
  </motion.svg>
);

// Document chaos illustration
const DocumentChaosGraphic = ({ isActive, color }) => (
  <motion.svg viewBox="0 0 120 80" className="pain-graphic-svg">
    {/* Stacked messy documents */}
    {[
      { x: 25, y: 10, rotate: -15 },
      { x: 35, y: 8, rotate: 10 },
      { x: 45, y: 12, rotate: -5 },
      { x: 55, y: 6, rotate: 8 },
    ].map((doc, i) => (
      <motion.g key={i}
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          rotate: isActive ? doc.rotate * 1.5 : doc.rotate
        }}
        transition={{ delay: i * 0.15, duration: 0.5 }}
        style={{ transformOrigin: `${doc.x + 15}px ${doc.y + 25}px` }}
      >
        <rect x={doc.x} y={doc.y} width="30" height="40" rx="2" 
          fill="white" stroke={color} strokeWidth="1.5" />
        <line x1={doc.x + 5} y1={doc.y + 10} x2={doc.x + 25} y2={doc.y + 10} 
          stroke={color} strokeWidth="1.5" opacity="0.4" />
        <line x1={doc.x + 5} y1={doc.y + 18} x2={doc.x + 20} y2={doc.y + 18} 
          stroke={color} strokeWidth="1.5" opacity="0.4" />
        <line x1={doc.x + 5} y1={doc.y + 26} x2={doc.x + 22} y2={doc.y + 26} 
          stroke={color} strokeWidth="1.5" opacity="0.4" />
      </motion.g>
    ))}
    {/* Red X marks */}
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
      transition={{ delay: 0.6 }}
    >
      <motion.path d="M90 25 L100 35 M100 25 L90 35" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      <motion.path d="M85 50 L95 60 M95 50 L85 60" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
    </motion.g>
    {/* Warning triangle */}
    <motion.path d="M100 15 L110 30 L90 30 Z" fill="none" stroke="#F59E0B" strokeWidth="2"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.3 }}
    />
    <motion.text x="97" y="27" fontSize="12" fill="#F59E0B" fontWeight="bold">!</motion.text>
  </motion.svg>
);

// Quality inspection fail illustration  
const QualityFailGraphic = ({ isActive, color }) => (
  <motion.svg viewBox="0 0 120 80" className="pain-graphic-svg">
    {/* Magnifying glass */}
    <motion.circle cx="45" cy="35" r="20" fill="none" stroke={color} strokeWidth="3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6 }}
    />
    <motion.line x1="60" y1="50" x2="75" y2="65" stroke={color} strokeWidth="4" strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    />
    {/* Product box with crack */}
    <motion.rect x="80" y="20" width="30" height="30" rx="3" fill="none" stroke={color} strokeWidth="2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    />
    <motion.path d="M85 25 L100 45" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0 }}
      transition={{ delay: 0.8 }}
    />
    {/* Question mark in magnifier */}
    <motion.text x="40" y="40" fontSize="18" fill={color} fontWeight="bold"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.5 }}
    >?</motion.text>
    {/* Thumbs down */}
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
      transition={{ delay: 0.6 }}
    >
      <motion.path d="M90 55 L90 70 L100 70 L105 60 L100 55 Z" fill="#EF4444" opacity="0.8" />
    </motion.g>
  </motion.svg>
);

// Hidden costs illustration
const HiddenCostsGraphic = ({ isActive, color }) => (
  <motion.svg viewBox="0 0 120 80" className="pain-graphic-svg">
    {/* Price tag */}
    <motion.path d="M20 30 L50 30 L60 40 L50 50 L20 50 Z" fill="none" stroke={color} strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
    />
    <motion.circle cx="30" cy="40" r="4" fill={color}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.4 }}
    />
    <motion.text x="38" y="44" fontSize="12" fill={color} fontWeight="bold">$</motion.text>
    
    {/* Hidden extra costs popping up */}
    {[
      { x: 70, y: 15, label: '+$' },
      { x: 85, y: 35, label: '+$$' },
      { x: 75, y: 55, label: '+$' },
      { x: 95, y: 20, label: '+$$$' },
    ].map((cost, i) => (
      <motion.g key={i}
        initial={{ opacity: 0, scale: 0, y: 10 }}
        animate={{ 
          opacity: isActive ? 1 : 0, 
          scale: isActive ? 1 : 0,
          y: isActive ? 0 : 10
        }}
        transition={{ delay: 0.5 + i * 0.15 }}
      >
        <rect x={cost.x - 2} y={cost.y - 2} width="25" height="16" rx="3" 
          fill="#EF4444" opacity="0.15" />
        <text x={cost.x} y={cost.y + 10} fontSize="10" fill="#EF4444" fontWeight="bold">
          {cost.label}
        </text>
      </motion.g>
    ))}
    {/* Surprise explosion */}
    <motion.path d="M65 40 L70 35 L68 42 L75 40 L70 45 L73 50 L65 47 L60 52 L62 45 L55 47 L60 42 L57 35 Z"
      fill="#F59E0B" opacity="0.3"
      initial={{ scale: 0 }}
      animate={{ scale: isActive ? 1 : 0 }}
      transition={{ delay: 0.3 }}
      style={{ transformOrigin: '65px 42px' }}
    />
  </motion.svg>
);

// Blame game illustration
const BlameGameGraphic = ({ isActive, color }) => (
  <motion.svg viewBox="0 0 120 80" className="pain-graphic-svg">
    {/* Three people figures */}
    {[
      { x: 20, pointing: 'right' },
      { x: 55, pointing: 'both' },
      { x: 90, pointing: 'left' },
    ].map((person, i) => (
      <motion.g key={i}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.2 }}
      >
        {/* Head */}
        <circle cx={person.x} cy="25" r="8" fill={color} opacity="0.7" />
        {/* Body */}
        <line x1={person.x} y1="33" x2={person.x} y2="55" stroke={color} strokeWidth="3" />
        {/* Legs */}
        <line x1={person.x} y1="55" x2={person.x - 8} y2="70" stroke={color} strokeWidth="2" />
        <line x1={person.x} y1="55" x2={person.x + 8} y2="70" stroke={color} strokeWidth="2" />
        {/* Pointing arms */}
        {(person.pointing === 'right' || person.pointing === 'both') && (
          <motion.line x1={person.x} y1="40" x2={person.x + 20} y2="35" 
            stroke={color} strokeWidth="2"
            animate={{ x2: isActive ? person.x + 25 : person.x + 20 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          />
        )}
        {(person.pointing === 'left' || person.pointing === 'both') && (
          <motion.line x1={person.x} y1="40" x2={person.x - 20} y2="35" 
            stroke={color} strokeWidth="2"
            animate={{ x2: isActive ? person.x - 25 : person.x - 20 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          />
        )}
      </motion.g>
    ))}
    {/* Pointing arrows */}
    <motion.path d="M42 35 L48 38 L42 41" fill={color} opacity={isActive ? 0.8 : 0.3}
      animate={{ x: isActive ? [0, 3, 0] : 0 }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
    <motion.path d="M78 35 L72 38 L78 41" fill={color} opacity={isActive ? 0.8 : 0.3}
      animate={{ x: isActive ? [0, -3, 0] : 0 }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
  </motion.svg>
);

// Main component mapping
const graphicComponents = {
  'Trust Gap': BrokenChainGraphic,
  'No Single System': ScatteredCommsGraphic,
  'Documentation Confusion': DocumentChaosGraphic,
  'Quality Risk': QualityFailGraphic,
  'Cost Surprises': HiddenCostsGraphic,
  'Unclear Accountability': BlameGameGraphic,
};

export default function PainPointsGraphic({ title, color, isActive = false }) {
  const GraphicComponent = graphicComponents[title];
  
  if (!GraphicComponent) return null;
  
  return (
    <div className="pain-points-graphic-wrapper">
      <GraphicComponent isActive={isActive} color={color} />
    </div>
  );
}

export {
  BrokenChainGraphic,
  ScatteredCommsGraphic,
  DocumentChaosGraphic,
  QualityFailGraphic,
  HiddenCostsGraphic,
  BlameGameGraphic
};