import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  WaveLines,
  FloatingParticles,
  ImprovedBuyerJourneyGraphic,
  ImprovedSellerJourneyGraphic,
  ImprovedCostComparisonGraphic,
} from './graphics';
import '../styles/winWinSection.css';

// SVG Icon Components
const Icons = {
  clipboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  ),
  checkCircle: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  search: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  package: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  refresh: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  ),
  fileText: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  folder: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  ship: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
      <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/>
      <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/>
      <path d="M12 10v4"/>
    </svg>
  ),
  building: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/>
      <path d="M12 10h.01"/><path d="M12 14h.01"/>
      <path d="M16 10h.01"/><path d="M16 14h.01"/>
      <path d="M8 10h.01"/><path d="M8 14h.01"/>
    </svg>
  ),
  upload: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  messageSquare: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  factory: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
      <path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>
    </svg>
  ),
  target: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  barChart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
  ),
  edit: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  plane: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
    </svg>
  ),
  dollarSign: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  fileMinus: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  ),
  link: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  clock: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  alertTriangle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  shoppingCart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  store: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
      <path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/>
    </svg>
  ),
  coins: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/>
      <path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>
    </svg>
  ),
  user: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  diamond: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/>
    </svg>
  ),
  trendingDown: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
    </svg>
  ),
  alertCircle: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )
};

// E1 - Buyer Steps
const buyerSteps = [
  { action: 'Select product / post requirement', icon: Icons.clipboard },
  { action: 'Approve quote + contract terms', icon: Icons.checkCircle },
  { action: 'Review inspection evidence', icon: Icons.search },
  { action: 'Confirm delivery', icon: Icons.package }
];

const buyerCoordinates = [
  { action: 'Structured order flow', icon: Icons.refresh },
  { action: 'Guided documents checklist', icon: Icons.fileText },
  { action: 'Inspection workflow + evidence storage', icon: Icons.folder },
  { action: 'Shipment visibility + support path', icon: Icons.ship }
];

const buyerBenefits = [
  'Organizes trade into visible milestones',
  'Helps reduce avoidable mistakes (documents, coordination)',
  'Supports inspection-backed clarity',
  'Helps coordinate shipping options with clearer breakdowns'
];

// E2 - Seller Steps
const sellerSteps = [
  { action: 'Create company profile', icon: Icons.building },
  { action: 'Upload products properly', icon: Icons.upload },
  { action: 'Quote on inquiries / LSQ', icon: Icons.messageSquare },
  { action: 'Manufacture + share updates', icon: Icons.factory }
];

const sellerCoordinates = [
  { action: 'Buyer discovery flow (inquiry + LSQ)', icon: Icons.target },
  { action: 'Order milestone structure', icon: Icons.barChart },
  { action: 'Guided documentation support', icon: Icons.edit },
  { action: 'Inspection + shipment coordination support', icon: Icons.plane }
];

const sellerBenefits = [
  'Gives sellers a system to present clear capability + product info',
  'Supports a structured trade journey (less back-and-forth)',
  'Helps sellers win buyer trust through process + proof'
];

// E3 - Cost Leaks
const costLeaks = [
  { label: 'Currency spread', icon: Icons.dollarSign },
  { label: 'Documentation rework', icon: Icons.fileMinus },
  { label: 'Middle steps', icon: Icons.link },
  { label: 'Delay fees', icon: Icons.clock }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export default function SectionE_WinWin() {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('cost');

  return (
    <div ref={sectionRef} className="winwin-section">
      {/* Background Effects */}
      <div className="winwin-bg-effects">
        <WaveLines
          color="#2563EB"
          waveCount={4}
          amplitude={25}
          frequency={0.015}
          speed={0.4}
          opacity={0.12}
          strokeWidth={1.5}
        />
        <FloatingParticles
          color="#0B1F3B"
          particleCount={30}
          speed={0.3}
          opacity={0.4}
          maxSize={3}
          minSize={1}
          connectDistance={80}
          showConnections={false}
        />
        <div className="winwin-grid-overlay" />
      </div>

      <motion.div
        className="winwin-container"
        variants={containerVariants}
        initial="visible"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="winwin-header" variants={itemVariants}>
          <span className="winwin-badge">
            <span className="winwin-badge-dot" />
            Win-Win Model
          </span>
          <h2 className="winwin-title">
            How Aaziko creates a
            <span className="winwin-title-highlight"> Win-Win trade experience</span>
          </h2>
          <p className="winwin-subtext">
            Aaziko reduces waste and confusion in trade execution — so buyers get more clarity, and sellers get more confidence.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div className="winwin-tabs" variants={itemVariants}>
          <button
            className={`winwin-tab ${activeTab === 'cost' ? 'winwin-tab--active' : ''}`}
            onClick={() => setActiveTab('cost')}
          >
            <span className="winwin-tab-icon">{Icons.coins}</span>
            Cost Optimization
          </button>
          <button
            className={`winwin-tab ${activeTab === 'buyer' ? 'winwin-tab--active' : ''}`}
            onClick={() => setActiveTab('buyer')}
          >
            <span className="winwin-tab-icon">{Icons.shoppingCart}</span>
            Win for Buyers
          </button>
          <button
            className={`winwin-tab ${activeTab === 'seller' ? 'winwin-tab--active' : ''}`}
            onClick={() => setActiveTab('seller')}
          >
            <span className="winwin-tab-icon">{Icons.store}</span>
            Win for Sellers
          </button>
        </motion.div>

        {/* Content Panels */}
        <div className="winwin-content">
          {/* E1 - Buyer Panel */}
          {activeTab === 'buyer' && (
            <motion.div
              className="winwin-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Visual Journey Graphic */}
              <div className="winwin-graphic-container" style={{ marginBottom: '24px', padding: '16px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.03) 100%)', borderRadius: '16px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                <ImprovedBuyerJourneyGraphic isActive={activeTab === 'buyer'} />
              </div>

              <div className="winwin-problem-box">
                <div className="winwin-problem-icon">{Icons.alertTriangle}</div>
                <div className="winwin-problem-content">
                  <h4 className="winwin-problem-title">Buyer Problem</h4>
                  <p className="winwin-problem-text">Extra costs + late surprises + risk</p>
                </div>
              </div>

              <div className="winwin-solution-intro">
                <h4>How Aaziko helps:</h4>
                <ul className="winwin-benefits-list">
                  {buyerBenefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
                <p className="winwin-note">Final pricing depends on route, volume, regulations.</p>
              </div>

              <div className="winwin-columns">
                <div className="winwin-column">
                  <h4 className="winwin-column-title winwin-column-title--user">
                    <span className="winwin-column-icon">{Icons.user}</span>
                    Buyer does
                  </h4>
                  <ul className="winwin-steps-list">
                    {buyerSteps.map((step, idx) => (
                      <motion.li
                        key={idx}
                        className="winwin-step-item"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.08, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <span className="winwin-step-icon">{step.icon}</span>
                        {step.action}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="winwin-column">
                  <h4 className="winwin-column-title winwin-column-title--aaziko">
                    <span className="winwin-column-icon">{Icons.diamond}</span>
                    Aaziko coordinates
                  </h4>
                  <ul className="winwin-steps-list winwin-steps-list--aaziko">
                    {buyerCoordinates.map((step, idx) => (
                      <motion.li
                        key={idx}
                        className="winwin-step-item winwin-step-item--aaziko"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.08, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <span className="winwin-step-icon">{step.icon}</span>
                        {step.action}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <motion.button
                className="winwin-cta winwin-cta--buyer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://buyer.aaziko.com', '_blank')}
              >
                Post Requirement
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>
          )}

          {/* E2 - Seller Panel */}
          {activeTab === 'seller' && (
            <motion.div
              className="winwin-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Visual Journey Graphic */}
              <div className="winwin-graphic-container" style={{ marginBottom: '24px', padding: '16px', background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.05) 0%, rgba(124, 58, 237, 0.03) 100%)', borderRadius: '16px', border: '1px solid rgba(5, 150, 105, 0.1)' }}>
                <ImprovedSellerJourneyGraphic isActive={activeTab === 'seller'} />
              </div>

              <div className="winwin-problem-box winwin-problem-box--seller">
                <div className="winwin-problem-icon">{Icons.alertTriangle}</div>
                <div className="winwin-problem-content">
                  <h4 className="winwin-problem-title">Seller Problem</h4>
                  <p className="winwin-problem-text">Export effort + trust barrier + payment friction</p>
                </div>
              </div>

              <div className="winwin-solution-intro">
                <h4>How Aaziko helps:</h4>
                <ul className="winwin-benefits-list">
                  {sellerBenefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="winwin-columns">
                <div className="winwin-column">
                  <h4 className="winwin-column-title winwin-column-title--user">
                    <span className="winwin-column-icon">{Icons.user}</span>
                    Seller does
                  </h4>
                  <ul className="winwin-steps-list">
                    {sellerSteps.map((step, idx) => (
                      <motion.li
                        key={idx}
                        className="winwin-step-item"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.08, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <span className="winwin-step-icon">{step.icon}</span>
                        {step.action}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="winwin-column">
                  <h4 className="winwin-column-title winwin-column-title--aaziko">
                    <span className="winwin-column-icon">{Icons.diamond}</span>
                    Aaziko coordinates
                  </h4>
                  <ul className="winwin-steps-list winwin-steps-list--aaziko">
                    {sellerCoordinates.map((step, idx) => (
                      <motion.li
                        key={idx}
                        className="winwin-step-item winwin-step-item--aaziko"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.08, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <span className="winwin-step-icon">{step.icon}</span>
                        {step.action}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <motion.button
                className="winwin-cta winwin-cta--seller"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://vendor.aaziko.com', '_blank')}
              >
                List Products
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>
          )}

          {/* E3 - Cost Optimization Panel */}
          {activeTab === 'cost' && (
            <motion.div
              className="winwin-panel winwin-panel--cost"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h3 className="winwin-cost-title">
                Why costs reduce when the process is organized
              </h3>
              <p className="winwin-cost-explanation">
                In traditional trade, costs rise due to rework, document mistakes, delays, and too many handoffs.
                Aaziko aims to reduce these "leak points" through a structured system and better coordination.
              </p>

              {/* Visual Cost Comparison Graphic */}
              <div className="winwin-graphic-container" style={{ marginBottom: '24px', padding: '16px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, rgba(37, 99, 235, 0.02) 100%)', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <ImprovedCostComparisonGraphic isActive={activeTab === 'cost'} />
              </div>

              {/* Cost Diagram */}
              <div className="winwin-cost-diagram">
                <div className="winwin-cost-flow">
                  <div className="winwin-cost-block winwin-cost-block--exw">
                    <span className="winwin-cost-label">EXW Price</span>
                    <span className="winwin-cost-desc">Factory cost</span>
                  </div>
                  <div className="winwin-cost-arrow">+</div>
                  <div className="winwin-cost-block winwin-cost-block--execution">
                    <span className="winwin-cost-label">Execution Costs</span>
                    <span className="winwin-cost-desc">Logistics, docs, handling</span>
                  </div>
                  <div className="winwin-cost-arrow">=</div>
                  <div className="winwin-cost-block winwin-cost-block--final">
                    <span className="winwin-cost-label">Final Cost</span>
                    <span className="winwin-cost-desc">Delivered price</span>
                  </div>
                </div>

                {/* Cost Leaks */}
                <div className="winwin-leaks-section">
                  <h4 className="winwin-leaks-title">
                    <span className="winwin-leaks-icon">{Icons.alertCircle}</span>
                    "Cost Leaks" in Traditional Trade
                  </h4>
                  <div className="winwin-leaks-grid">
                    {costLeaks.map((leak, idx) => (
                      <motion.div
                        key={idx}
                        className="winwin-leak-item"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.08, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <span className="winwin-leak-icon">{leak.icon}</span>
                        <span className="winwin-leak-label">{leak.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Reduction Arrow */}
                <div className="winwin-reduction">
                  <div className="winwin-reduction-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="winwin-reduction-text">Reduced by structure + visibility</span>
                </div>

                {/* Result */}
                <div className="winwin-result-box">
                  <div className="winwin-result-icon">{Icons.trendingDown}</div>
                  <div className="winwin-result-content">
                    <span className="winwin-result-title">Hidden surprises ↓</span>
                    <span className="winwin-result-note">Not guaranteed savings, but fewer unexpected costs</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
