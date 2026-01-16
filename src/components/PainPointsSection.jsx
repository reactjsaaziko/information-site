import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  ConnectionGrid, 
  GlowOrbs, 
  ComparisonVisual,
  AnimatedInfographic,
  TrustGapGraphic,
  ScatteredSystemGraphic,
  DocConfusionGraphic,
  QualityRiskGraphic,
  CostSurprisesGraphic,
  BlameGraphic
} from './graphics';
import '../styles/painPoints.css';

const painPoints = [
  {
    title: 'Trust Gap',
    description: 'Unknown supplier credibility, fake claims, weak proof',
    color: '#EF4444',
    Graphic: TrustGapGraphic
  },
  {
    title: 'No Single System',
    description: 'Too many chats, emails, brokers — no clear record',
    color: '#F59E0B',
    Graphic: ScatteredSystemGraphic
  },
  {
    title: 'Documentation Confusion',
    description: 'Wrong documents → customs delays, penalties, rejections',
    color: '#8B5CF6',
    Graphic: DocConfusionGraphic
  },
  {
    title: 'Quality Risk',
    description: 'No inspection proof → disputes after shipment',
    color: '#EC4899',
    Graphic: QualityRiskGraphic
  },
  {
    title: 'Cost Surprises',
    description: 'Logistics and handling costs change late in the process',
    color: '#10B981',
    Graphic: CostSurprisesGraphic
  },
  {
    title: 'Unclear Accountability',
    description: 'When something fails, everyone blames someone else',
    color: '#3B82F6',
    Graphic: BlameGraphic
  }
];

// Stats for infographic
const tradeStats = [
  { value: 65, suffix: '%', label: 'Deals face trust issues', showProgress: true },
  { value: 40, suffix: '%', label: 'Document errors rate', showProgress: true },
  { value: 3, suffix: 'x', label: 'Hidden cost multiplier' },
  { value: 28, suffix: '%', label: 'Shipment delays', showProgress: true }
];

// Comparison data
const beforeProblems = [
  'Unverified suppliers',
  'Scattered communication',
  'Manual document errors',
  'No quality proof',
  'Hidden fees',
  'Blame games'
];

const afterSolutions = [
  'Verified profiles',
  'One dashboard',
  'Auto-generated docs',
  'Built-in inspection',
  'Transparent pricing',
  'Clear audit trail'
];

// Animation variants
const sectionEntranceVariants = {
  hidden: { 
    opacity: 0,
    y: 100,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      when: "beforeChildren"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.85, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const statsVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const bgEffectsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut"
    }
  }
};

export default function PainPointsSection() {
  const sectionRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Trigger animation as soon as section starts appearing (amount: 0.05 = 5% visible)
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  return (
    <motion.div 
      ref={sectionRef}
      className="pain-points-section"
      variants={sectionEntranceVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Animated background elements */}
      <motion.div 
        className="pain-points-bg-effects"
        variants={bgEffectsVariants}
      >
        <GlowOrbs 
          colors={['#2563EB', '#0B1F3B', '#7C3AED']}
          orbCount={3}
          minSize={300}
          maxSize={500}
          speed={0.2}
          opacity={0.08}
          blur={100}
        />
        <ConnectionGrid 
          color="#2563EB"
          nodeCount={25}
          nodeSize={2}
          connectionDistance={120}
          speed={0.2}
          opacity={0.15}
          pulseNodes={true}
        />
        <div className="grid-overlay" />
      </motion.div>

      <motion.div 
        className="pain-points-container"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="pain-points-header" variants={headerVariants}>
          <motion.span 
            className="pain-points-badge"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <span className="badge-dot" />
            Industry Challenges
          </motion.span>
          <h2 className="pain-points-title">
            What goes wrong in
            <span className="title-highlight"> today's global trade</span>
          </h2>
          <p className="pain-points-subtext">
            Trade breaks not because of products — but because of process gaps, 
            unclear responsibility, and hidden costs.
          </p>
        </motion.div>

        {/* Animated Statistics Infographic */}
        <motion.div
          variants={statsVariants}
          style={{ marginBottom: '40px' }}
        >
          <AnimatedInfographic 
            stats={tradeStats}
            layout="horizontal"
            showConnectors={true}
            animationDelay={0.5}
          />
        </motion.div>

        {/* Pain Points Grid with Visual Infographics */}
        <motion.div className="pain-points-grid" variants={containerVariants}>
          {painPoints.map((point, index) => {
            const GraphicComponent = point.Graphic;
            return (
              <motion.div
                key={index}
                className={`pain-point-card ${hoveredCard === index ? 'is-hovered' : ''}`}
                variants={cardVariants}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                style={{ perspective: '1000px' }}
              >
                <div className="card-glow" />
                <div className="card-border" />
                
                {/* Visual Infographic - tells the story without words */}
                <div className="pain-point-graphic" style={{ 
                  background: `linear-gradient(135deg, ${point.color}08 0%, ${point.color}03 100%)`,
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '16px',
                  border: `1px solid ${point.color}15`,
                  minHeight: '120px',
                  height: '120px',
                  overflow: 'visible'
                }}>
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GraphicComponent 
                      isActive={hoveredCard === index}
                      color={point.color}
                    />
                  </div>
                </div>
                
                <div className="pain-point-content">
                  <h3 className="pain-point-title" style={{ color: point.color }}>{point.title}</h3>
                  <p className="pain-point-description">{point.description}</p>
                </div>
                
                <motion.div 
                  className="card-shine"
                  initial={{ x: '-100%' }}
                  animate={hoveredCard === index ? { x: '200%' } : { x: '-100%' }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Visual Comparison Section */}
        <motion.div 
          className="comparison-section"
          variants={statsVariants}
        >
          <motion.h3 
            style={{
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: 700,
              color: '#0B1220',
              marginBottom: '24px'
            }}
            variants={headerVariants}
          >
            The Transformation
          </motion.h3>
          
          <ComparisonVisual
            beforeItems={beforeProblems}
            afterItems={afterSolutions}
            beforeLabel="Traditional Trade"
            afterLabel="With Aaziko"
            beforeColor="#EF4444"
            afterColor="#16A34A"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
