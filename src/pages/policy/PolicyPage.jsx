// PolicyPage - Hero + Interactive Grid Layout
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  CheckCircle, 
  X, 
  ArrowRight,
  ShieldCheck,
  Package,
  ClipboardList,
  CreditCard,
  Search,
  Truck,
  Scale,
  Lock
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import AnimatedBackground from '../../components/ui/AnimatedBackground'
import { policyData } from './policyData'
import './PolicyPage.css'

// Map icon names to Lucide components
const iconMap = {
  ShieldCheck,
  Package,
  ClipboardList,
  CreditCard,
  Search,
  Truck,
  Scale,
  Lock
}

const PolicyPage = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null)
  const [modalOrigin, setModalOrigin] = useState({ x: 0, y: 0 })
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const gridRef = useRef(null)

  const policies = policyData.policies

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  }

  const handleCardClick = (e, policy) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const viewportCenterX = window.innerWidth / 2
    const viewportCenterY = window.innerHeight / 2
    
    setModalOrigin({
      x: centerX - viewportCenterX,
      y: centerY - viewportCenterY
    })
    setSelectedPolicy(policy)
  }

  const handleClose = () => {
    setSelectedPolicy(null)
  }

  const renderIcon = (iconName, size = 24, color = "white") => {
    const IconComponent = iconMap[iconName]
    return IconComponent ? <IconComponent size={size} color={color} strokeWidth={1.5} /> : null
  }

  return (
    <div className="pol-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="pol-hero">
        <motion.div 
          className="pol-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="pol-shield"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          >
            <Shield size={36} />
            <div className="pol-shield-glow" />
          </motion.div>
          
          <h1 className="pol-title">Aaziko Policies</h1>
          <p className="pol-subtitle">
            Simple guidelines for safe, fair, and transparent trading
          </p>
          

        </motion.div>
      </section>

      {/* Policy Grid */}
      <section className="pol-grid-section">
        <motion.div 
          className="pol-grid"
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {policies.map((policy, index) => (
            <motion.div
              key={policy.title}
              className={`pol-card ${hoveredIndex === index ? 'hovered' : ''}`}
              style={{ '--accent': policy.color }}
              variants={cardVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={(e) => handleCardClick(e, policy)}
            >
              <div className="pol-card-accent" />
              
              <div className="pol-card-header">
                <span className="pol-card-icon" style={{ background: policy.color }}>
                  {renderIcon(policy.icon, 26)}
                </span>
                <span className="pol-card-number">0{index + 1}</span>
              </div>
              
              <h3 className="pol-card-title">{policy.title}</h3>
              <span className="pol-card-tag">{policy.tagline}</span>
              
              <p className="pol-card-desc">{policy.description}</p>
              
              <div className="pol-card-preview">
                {policy.keyPoints.slice(0, 2).map((point, i) => (
                  <div key={i} className="pol-preview-point">
                    <CheckCircle size={12} />
                    <span>{point}</span>
                  </div>
                ))}
                {policy.keyPoints.length > 2 && (
                  <span className="pol-more-points">+{policy.keyPoints.length - 2} more</span>
                )}
              </div>
              
              <div className="pol-card-action">
                <span>View Details</span>
                <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Policy Detail Modal */}
      <AnimatePresence>
        {selectedPolicy && (
          <>
            <motion.div 
              className="pol-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
            />
            <motion.div 
              className="pol-modal"
              style={{ '--accent': selectedPolicy.color }}
              initial={{ 
                opacity: 0, 
                scale: 0.8,
                x: `calc(-50% + ${modalOrigin.x}px)`,
                y: `calc(-50% + ${modalOrigin.y}px)`
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: '-50%',
                y: '-50%'
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8,
                x: `calc(-50% + ${modalOrigin.x}px)`,
                y: `calc(-50% + ${modalOrigin.y}px)`
              }}
              transition={{ 
                duration: 0.25,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <button 
                className="pol-modal-close"
                onClick={handleClose}
              >
                <X size={20} />
              </button>
              
              <div className="pol-modal-header">
                <span className="pol-modal-icon" style={{ background: selectedPolicy.color }}>
                  {renderIcon(selectedPolicy.icon, 30)}
                </span>
                <div>
                  <h2>{selectedPolicy.title}</h2>
                  <span className="pol-modal-tag">{selectedPolicy.tagline}</span>
                </div>
              </div>
              
              <p className="pol-modal-desc">{selectedPolicy.description}</p>
              
              <div className="pol-modal-points">
                <h4>Key Points</h4>
                <ul>
                  {selectedPolicy.keyPoints.map((point, i) => (
                    <li key={i}>
                      <CheckCircle size={16} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PolicyPage
