import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  GeometricShapes, 
  GlowOrbs, 
  TradeNetwork,
  FlowDiagram,
  ImprovedMarketplaceGraphic,
  ImprovedLSQGraphic,
  ImprovedMessageCenterGraphic,
  ImprovedLogisticsGraphic,
  ImprovedCustomsGraphic,
  ImprovedInspectionGraphic,
  ImprovedFinancingGraphic,
  ImprovedInsuranceGraphic
} from './graphics';
import '../styles/coreModules.css';

// SVG Icon Components - Premium minimal style
const Icons = {
  marketplace: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  lsq: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  messageCenter: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      <line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="12" y2="14"/>
    </svg>
  ),
  logistics: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"/>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  customs: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4"/>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  ),
  inspection: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <path d="M8 11h6"/><path d="M11 8v6"/>
    </svg>
  ),
  financing: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  insurance: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  arrowRight: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
};

// 8 Core Modules as per Section F
const modules = [
  {
    id: 'marketplace',
    name: 'Aaziko Marketplace',
    description: 'Find Indian suppliers and products with structured profiles.',
    icon: Icons.marketplace,
    color: '#2563EB',
    Graphic: ImprovedMarketplaceGraphic
  },
  {
    id: 'lsq',
    name: 'LSQ Module',
    description: 'Buyers post needs → sellers quote → shortlist faster.',
    icon: Icons.lsq,
    color: '#7C3AED',
    subtitle: 'Lead / Requirement Quotes',
    Graphic: ImprovedLSQGraphic
  },
  {
    id: 'message-center',
    name: 'Message Center',
    description: 'One order workspace: chats, files, updates, approvals.',
    icon: Icons.messageCenter,
    color: '#0891B2',
    Graphic: ImprovedMessageCenterGraphic
  },
  {
    id: 'logistics',
    name: 'Logistics Module',
    description: 'Shipment options + tracking visibility in one flow.',
    icon: Icons.logistics,
    color: '#059669',
    Graphic: ImprovedLogisticsGraphic
  },
  {
    id: 'customs',
    name: 'Custom Rules Simplifier',
    description: 'Guided documents and compliance checklist per route/product.',
    icon: Icons.customs,
    color: '#D97706',
    Graphic: ImprovedCustomsGraphic
  },
  {
    id: 'inspection',
    name: 'Inspection Module',
    description: 'Inspection planning + evidence stored with the order.',
    icon: Icons.inspection,
    color: '#DC2626',
    Graphic: ImprovedInspectionGraphic
  },
  {
    id: 'financing',
    name: 'Financing Module',
    description: 'Access trade finance options based on eligibility.',
    icon: Icons.financing,
    tag: 'Partner-led',
    color: '#4F46E5',
    Graphic: ImprovedFinancingGraphic
  },
  {
    id: 'insurance',
    name: 'Insurance Module',
    description: 'Coverage options to reduce trade risk.',
    icon: Icons.insurance,
    tag: 'Partner-led',
    color: '#0D9488',
    Graphic: ImprovedInsuranceGraphic
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export default function SectionF_CoreModules() {
  const sectionRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div ref={sectionRef} className="core-modules-section">
      {/* Background Effects */}
      <div className="core-modules-bg-effects">
        <TradeNetwork
          primaryColor="#2563EB"
          secondaryColor="#22D3EE"
          routeCount={6}
          nodeCount={10}
          speed={0.8}
          opacity={0.25}
        />
        <GeometricShapes
          color="#2563EB"
          shapeCount={8}
          speed={0.2}
          opacity={0.1}
          minSize={30}
          maxSize={60}
          rotationSpeed={0.3}
        />
        <GlowOrbs
          colors={['#2563EB', '#7C3AED', '#0891B2']}
          orbCount={3}
          minSize={250}
          maxSize={400}
          speed={0.15}
          opacity={0.05}
          blur={120}
        />
        <div className="core-modules-grid-overlay" />
      </div>

      <motion.div
        className="core-modules-container"
        variants={containerVariants}
        initial="visible"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="core-modules-header" variants={itemVariants}>
          <span className="core-modules-badge">
            <span className="core-modules-badge-dot" />
            Platform Modules
          </span>
          <h2 className="core-modules-title">
            The core modules Aaziko built to make
            <span className="core-modules-title-highlight"> trade predictable</span>
          </h2>
          <p className="core-modules-subtext">
            Everything you need to manage international trade — from discovery to delivery — in one connected system.
          </p>
        </motion.div>

        {/* Trade Process Flow Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ 
            marginBottom: '40px',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(124, 58, 237, 0.02) 100%)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(37, 99, 235, 0.1)'
          }}
        >
          <h3 style={{
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 600,
            color: '#64748B',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Your Trade Journey
          </h3>
          <FlowDiagram
            steps={[
              { title: 'Discover', description: 'Find suppliers' },
              { title: 'Connect', description: 'Get quotes' },
              { title: 'Order', description: 'Place order' },
              { title: 'Track', description: 'Monitor progress' },
              { title: 'Receive', description: 'Get delivery' }
            ]}
            direction="horizontal"
            showArrows={true}
            accentColor="#2563EB"
          />
        </motion.div>

        {/* Modules Grid - 8 Cards */}
        <motion.div className="core-modules-grid" variants={containerVariants}>
          {modules.map((module, index) => {
            const GraphicComponent = module.Graphic;
            return (
              <motion.div
                key={module.id}
                className={`core-module-card ${hoveredCard === index ? 'is-hovered' : ''}`}
                variants={itemVariants}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="core-module-card-glow" style={{ '--module-color': module.color }} />
                <div className="core-module-card-border" />

                {/* Visual Graphic */}
                <div 
                  className="core-module-graphic"
                  style={{
                    background: `linear-gradient(135deg, ${module.color}08 0%, ${module.color}03 100%)`,
                    borderRadius: '12px',
                    padding: '8px',
                    marginBottom: '12px',
                    border: `1px solid ${module.color}15`,
                    minHeight: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <GraphicComponent 
                    isActive={hoveredCard === index}
                    color={module.color}
                  />
                </div>

                <div className="core-module-content">
                  <div className="core-module-name-row">
                    <h3 className="core-module-name">{module.name}</h3>
                    {module.tag && (
                      <span className="core-module-tag">{module.tag}</span>
                    )}
                  </div>
                  <p className="core-module-description">{module.description}</p>
                </div>

                <motion.div
                  className="core-module-arrow"
                  animate={hoveredCard === index ? { x: 4, opacity: 1 } : { x: 0, opacity: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {Icons.arrowRight}
                </motion.div>

                <motion.div
                  className="core-module-shine"
                  initial={{ x: '-100%' }}
                  animate={hoveredCard === index ? { x: '200%' } : { x: '-100%' }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Row */}
        <motion.div className="core-modules-cta-row" variants={itemVariants}>
          <motion.button
            className="core-modules-cta core-modules-cta--primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const tradeSection = document.querySelector('.trade-animation-section');
              if (tradeSection) {
                tradeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            Explore How Aaziko Works
            {Icons.arrowRight}
          </motion.button>
          <motion.button
            className="core-modules-cta core-modules-cta--buyer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('https://buyer.aaziko.com', '_blank')}
          >
            Start as Buyer
          </motion.button>
          <motion.button
            className="core-modules-cta core-modules-cta--seller"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('https://vendor.aaziko.com', '_blank')}
          >
            Start as Seller
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
