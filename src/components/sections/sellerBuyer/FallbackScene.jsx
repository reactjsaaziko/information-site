import { useRef, useEffect } from 'react';
import NetworkLines2D from './network/NetworkLines2D';

export default function FallbackScene({ 
  directLineProgress, 
  routedLineProgress, 
  showPackets 
}) {
  return (
    <div className="fallback-scene">
      {/* Background gradient */}
      <div className="fallback-scene__bg" />
      
      {/* Network lines canvas */}
      <NetworkLines2D 
        directLineProgress={directLineProgress}
        routedLineProgress={routedLineProgress}
        showPackets={showPackets}
      />
      
      {/* Seller silhouette */}
      <div className="fallback-scene__character fallback-scene__character--seller">
        <svg viewBox="0 0 120 200" className="character-silhouette">
          <defs>
            <linearGradient id="sellerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(148, 163, 184, 0.9)" />
              <stop offset="50%" stopColor="rgba(100, 116, 139, 0.85)" />
              <stop offset="100%" stopColor="rgba(71, 85, 105, 0.8)" />
            </linearGradient>
            <linearGradient id="sellerHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
            <filter id="sellerGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Head */}
          <ellipse cx="60" cy="28" rx="22" ry="26" fill="url(#sellerGrad)" filter="url(#sellerGlow)" />
          {/* Body */}
          <path 
            d="M30 70 Q30 55 60 52 Q90 55 90 70 L95 140 Q95 155 60 160 Q25 155 25 140 Z" 
            fill="url(#sellerGrad)" 
            filter="url(#sellerGlow)"
          />
          {/* Arms */}
          <path d="M25 75 Q5 90 15 130 Q20 135 28 125 Q35 100 30 80" fill="url(#sellerGrad)" />
          <path d="M95 75 Q115 90 105 130 Q100 135 92 125 Q85 100 90 80" fill="url(#sellerGrad)" />
          {/* Legs */}
          <path d="M40 155 L35 200 L50 200 L52 160" fill="url(#sellerGrad)" />
          <path d="M80 155 L85 200 L70 200 L68 160" fill="url(#sellerGrad)" />
          {/* Highlight edge */}
          <path 
            d="M38 28 Q60 0 82 28" 
            stroke="url(#sellerHighlight)" 
            strokeWidth="2" 
            fill="none"
          />
          {/* Briefcase */}
          <rect x="95" y="115" width="20" height="15" rx="2" fill="rgba(71, 85, 105, 0.9)" />
          <rect x="102" y="112" width="6" height="4" rx="1" fill="rgba(100, 116, 139, 0.9)" />
        </svg>
        <div className="character-label">Seller</div>
      </div>
      
      {/* Buyer silhouette */}
      <div className="fallback-scene__character fallback-scene__character--buyer">
        <svg viewBox="0 0 120 200" className="character-silhouette">
          <defs>
            <linearGradient id="buyerGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(148, 163, 184, 0.9)" />
              <stop offset="50%" stopColor="rgba(100, 116, 139, 0.85)" />
              <stop offset="100%" stopColor="rgba(71, 85, 105, 0.8)" />
            </linearGradient>
            <linearGradient id="buyerHighlight" x1="100%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
          </defs>
          {/* Head */}
          <ellipse cx="60" cy="28" rx="22" ry="26" fill="url(#buyerGrad)" filter="url(#sellerGlow)" />
          {/* Body */}
          <path 
            d="M30 70 Q30 55 60 52 Q90 55 90 70 L95 140 Q95 155 60 160 Q25 155 25 140 Z" 
            fill="url(#buyerGrad)" 
            filter="url(#sellerGlow)"
          />
          {/* Arms */}
          <path d="M25 75 Q5 90 15 130 Q20 135 28 125 Q35 100 30 80" fill="url(#buyerGrad)" />
          <path d="M95 75 Q115 85 100 120 Q95 125 90 115 Q88 95 90 80" fill="url(#buyerGrad)" />
          {/* Legs */}
          <path d="M40 155 L35 200 L50 200 L52 160" fill="url(#buyerGrad)" />
          <path d="M80 155 L85 200 L70 200 L68 160" fill="url(#buyerGrad)" />
          {/* Highlight edge */}
          <path 
            d="M82 28 Q60 0 38 28" 
            stroke="url(#buyerHighlight)" 
            strokeWidth="2" 
            fill="none"
          />
          {/* Tablet/clipboard */}
          <rect x="88" y="100" width="18" height="25" rx="2" fill="rgba(71, 85, 105, 0.9)" />
          <rect x="91" y="103" width="12" height="16" rx="1" fill="rgba(96, 165, 250, 0.3)" />
        </svg>
        <div className="character-label">Buyer</div>
      </div>
    </div>
  );
}
