import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { ConnectionGrid, GlowOrbs, ImprovedGlobalTradeGraphic, ImprovedHandshakeGraphic, ImprovedStartJourneyGraphic, ImprovedConfidenceBadgeGraphic } from './graphics';
import '../styles/finalCTA.css';

const Icons = {
  checkmark: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  arrowRight: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  india: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M3 12h18M3 18h18"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  )
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export default function FinalCTASection() {
  const sectionRef = useRef(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  return (
    <div
      ref={sectionRef}
      className="final-cta-section"
    >
      {/* Background Effects */}
      <div className="final-cta-bg-effects">
        <ConnectionGrid 
          color="#2563EB"
          nodeCount={20}
          nodeSize={2.5}
          connectionDistance={100}
          speed={0.15}
          opacity={0.2}
          pulseNodes={true}
        />
        <GlowOrbs 
          colors={['#2563EB', '#7C3AED']}
          orbCount={2}
          minSize={350}
          maxSize={550}
          speed={0.1}
          opacity={0.1}
          blur={100}
        />
        <div className="final-cta-grid-overlay" />
      </div>

      <motion.div
        className="final-cta-container"
        variants={containerVariants}
        initial="visible"
        animate="visible"
      >
        {/* CTA Card */}
        <motion.div className="final-cta-card" variants={itemVariants}>
          <div className="final-cta-card-glow" />
          <div className="final-cta-card-border" />
          
          {/* Decorative Icons */}
          <div className="final-cta-decorative-icons">
            <div className="final-cta-icon-float final-cta-icon-float--1">
              {Icons.globe}
            </div>
            <div className="final-cta-icon-float final-cta-icon-float--2">
              {Icons.india}
            </div>
          </div>

          {/* Content */}
          <motion.div className="final-cta-content" variants={itemVariants}>
            <span className="final-cta-badge">
              <span className="final-cta-badge-dot" />
              Get Started Today
            </span>
            
            <h2 className="final-cta-title">
              Ready to trade with confidence —
              <span className="final-cta-title-highlight"> without confusion?</span>
            </h2>
            
            <p className="final-cta-subtext">
              Whether you're buying from India or selling globally, Aaziko gives you a structured journey with clear steps, proof, and visibility.
            </p>

            {/* Visual Graphics Row */}
            <div className="final-cta-graphics-row" style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ flex: '1', minWidth: '200px', maxWidth: '280px', padding: '12px', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(124, 58, 237, 0.03) 100%)', borderRadius: '12px', border: '1px solid rgba(37, 99, 235, 0.1)' }}>
                <ImprovedGlobalTradeGraphic isActive={true} />
              </div>
              <div style={{ flex: '1', minWidth: '200px', maxWidth: '280px', padding: '12px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.03) 100%)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <ImprovedHandshakeGraphic isActive={true} />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="final-cta-buttons">
              <motion.button
                className={`final-cta-btn final-cta-btn--buyer ${hoveredBtn === 'buyer' ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredBtn('buyer')}
                onMouseLeave={() => setHoveredBtn(null)}
                onClick={() => window.open('https://buyer.aaziko.com', '_blank')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="final-cta-btn-icon">{Icons.checkmark}</span>
                Post Requirement
                <span className="final-cta-btn-tag">Buyer</span>
                <motion.span 
                  className="final-cta-btn-arrow"
                  animate={hoveredBtn === 'buyer' ? { x: 4 } : { x: 0 }}
                >
                  {Icons.arrowRight}
                </motion.span>
              </motion.button>

              <motion.button
                className={`final-cta-btn final-cta-btn--seller ${hoveredBtn === 'seller' ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredBtn('seller')}
                onMouseLeave={() => setHoveredBtn(null)}
                onClick={() => window.open('https://vendor.aaziko.com', '_blank')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="final-cta-btn-icon">{Icons.checkmark}</span>
                List Products
                <span className="final-cta-btn-tag">Seller</span>
                <motion.span 
                  className="final-cta-btn-arrow"
                  animate={hoveredBtn === 'seller' ? { x: 4 } : { x: 0 }}
                >
                  {Icons.arrowRight}
                </motion.span>
              </motion.button>
            </div>
          </motion.div>

          {/* Shine Effect */}
          <motion.div 
            className="final-cta-shine"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
