  // How We Work Page - Aaziko Trade Journey
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Globe, FileText, ShieldCheck, BadgeCheck,
  MessageSquare, CheckCircle,
  ClipboardCheck, AlertTriangle,
  ArrowRight, Users, Building,
  Camera,
  HeadphonesIcon, ChevronDown, ChevronUp,
  Search, FileCheck, CreditCard, FileSignature,
  Factory, ClipboardList, Wallet, Truck, Package, PackageCheck
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './HowWeWork.css'


// Buyer journey comparison data
const buyerWithout = [
  'Find supplier through random sources',
  'Unclear credibility',
  'Heavy back-and-forth on WhatsApp/email',
  'Documents unclear until late',
  'Quality risk feels personal',
  'If something fails: no clear responsibility'
]

const buyerWith = [
  'Discover suppliers with structured profiles',
  'Clear milestones + one order workspace',
  'Guided docs checklist for smoother clearance',
  'Inspection evidence attached to the order',
  'Shipment visibility + support path',
  'Clear escalation if things go wrong'
]

// Seller journey comparison data
const sellerWithout = [
  "Buyers don't trust new suppliers",
  'Export steps feel risky',
  'Payment friction + currency conversion losses',
  'Too many agents and handoffs',
  'More time spent on process than production'
]

const sellerWith = [
  'Trust improves via profile + process clarity',
  'Orders move through clear milestones',
  'Buyer requirements are clearer (less rework)',
  'Evidence-based inspection reduces disputes',
  'Seller focuses mainly on product + updates'
]

// Buyer responsibilities
const buyerDoes = [
  'Select product / post requirement',
  'Approve quote + contract terms',
  'Review inspection evidence',
  'Confirm delivery'
]

const aazikoForBuyer = [
  'Organizes order milestones & documentation',
  'Maintains one workspace for updates/files',
  'Enables inspection workflow & evidence storage',
  'Helps keep logistics + customs checklist visible',
  'Provides support and dispute path when needed'
]

// Seller responsibilities
const sellerDoes = [
  'Create company profile',
  'Upload products correctly (specs + photos)',
  'Quote (Direct inquiry or LSQ)',
  'Manufacture + share progress updates'
]

const aazikoForSeller = [
  'Buyer discovery path (inquiry + LSQ visibility)',
  'Order structure + contract checklist',
  'Inspection scheduling + evidence trail',
  'Documentation checklist guidance',
  'Support to keep execution smooth'
]

// Trust layer items
const trustItems = [
  {
    icon: BadgeCheck,
    title: 'Verified company profiles',
    description: 'Document-backed verification'
  },
  {
    icon: Camera,
    title: 'Inspection evidence',
    description: 'Attached to each order'
  },
  {
    icon: ClipboardCheck,
    title: 'Documentation checklist',
    description: 'Stays visible throughout'
  },
  {
    icon: FileText,
    title: 'Single system of record',
    description: 'Less confusion, more accountability'
  },
  {
    icon: HeadphonesIcon,
    title: 'Support & dispute path',
    description: 'Using order history + evidence'
  }
]

// Trust chips for hero
const trustChips = [
  'Verified profiles',
  'Milestone tracking',
  'Inspection evidence',
  'Guided documents',
  'Shipment visibility',
  'Support & dispute path'
]

// Order Process Steps Data - 11 Steps with Different Colors & Roles
const orderProcessSteps = [
  {
    id: 1,
    title: 'Inquiry',
    description: 'Submit your product requirements and specifications to start the sourcing process.',
    image: '/order-storyboard/inquiry.png',
    color: '#2563EB',
    role: 'buyer' // buyer, vendor, aaziko
  },
  {
    id: 2,
    title: 'Quotation',
    description: 'Receive detailed pricing, MOQ, lead times, and payment terms from verified suppliers.',
    image: '/order-storyboard/quotation.png',
    color: '#2563EB',
    role: 'vendor'
  },
  {
    id: 3,
    title: 'Order Confirm',
    description: 'Review and confirm all order details before proceeding to payment.',
    image: '/order-storyboard/order-confirm.png',
    color: '#0EA5E9',
    role: 'buyer'
  },
  {
    id: 4,
    title: 'Advance Payment',
    description: 'Secure advance payment to initiate production with multiple payment options.',
    image: '/order-storyboard/payment.png',
    color: '#16A34A',
    role: 'buyer'
  },
  {
    id: 5,
    title: 'Order Contract',
    description: 'Sign the official contract outlining all terms, specs, and delivery commitments.',
    image: '/order-storyboard/order-contract.png',
    color: '#2563EB',
    role: 'aaziko'
  },
  {
    id: 6,
    title: 'Manufacturing',
    description: 'Products enter production with daily photos & videos for complete transparency.',
    image: '/order-storyboard/manufacturing.png',
    color: '#F59E0B',
    role: 'vendor'
  },
  {
    id: 7,
    title: 'Inspection',
    description: 'Rigorous quality inspection with detailed reports before shipping approval.',
    image: '/order-storyboard/inspection.png',
    color: '#0EA5E9',
    role: 'aaziko'
  },
  {
    id: 8,
    title: 'Full Payment',
    description: 'Complete the remaining balance after inspection approval.',
    image: '/order-storyboard/full-payment.png',
    color: '#16A34A',
    role: 'buyer'
  },
  {
    id: 9,
    title: 'Logistics',
    description: 'Professional logistics handling with real-time tracking from factory to destination.',
    image: '/order-storyboard/logistic.png',
    color: '#EF4444',
    role: 'aaziko'
  },
  {
    id: 10,
    title: 'Customs',
    description: 'Customs clearance and documentation handled for hassle-free import.',
    image: '/order-storyboard/custom.png',
    color: '#F59E0B',
    role: 'aaziko'
  },
  {
    id: 11,
    title: 'Order Received',
    description: 'Receive your order and verify contents with full support available.',
    image: '/order-storyboard/order-receive.png',
    color: '#16A34A',
    role: 'buyer'
  }
]


const HowWeWork = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hww-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.hww-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.hww-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.hww-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.hww-trust-chips', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="hww-page">
      <AnimatedBackground />
      <Navbar />

      {/* SECTION B - Hero */}
      <section ref={heroRef} className="hww-hero">
        <div className="hww-hero-content">
          <div className="hww-hero-badge">
            <Globe size={16} />
            <span>For Global Buyers + Indian Sellers</span>
          </div>
          <h1 className="hww-hero-title">
            A clear order journey — where every step is{' '}
            <span className="hww-gradient-text">visible, documented, and accountable</span>
          </h1>
          <p className="hww-hero-subtitle">
            Aaziko organizes global trade into structured milestones so buyers can purchase with confidence 
            and sellers can sell globally without process confusion.
          </p>
          <div className="hww-hero-cta">
            <a href="https://buyer.aaziko.com" target="_blank" rel="noopener noreferrer" className="hww-btn-primary">
              <Users size={18} />
              I'm a Buyer — Post Requirement
            </a>
            <a href="https://vendor.aaziko.com" target="_blank" rel="noopener noreferrer" className="hww-btn-secondary">
              <Building size={18} />
              I'm a Seller — List Products
            </a>
          </div>
          <div className="hww-trust-chips">
            {trustChips.map((chip, index) => (
              <span key={index} className="hww-chip">
                <CheckCircle size={14} />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION C - Order Process Infographic (11 Steps) */}
      <OrderProcessInfographic />


      {/* SECTION D - Buyer & Seller Journey Comparison */}
      <section className="hww-section hww-section-alt">
        <div className="hww-container">
          <div className="hww-section-header">
            <span className="hww-section-badge">The Difference</span>
            <h2 className="hww-section-title">What changes when trade runs through Aaziko</h2>
          </div>

          {/* D1 - Buyer Journey */}
          <div className="hww-comparison-block">
            <h3 className="hww-comparison-title">
              <Users size={24} />
              Buyer Journey
            </h3>
            <div className="hww-comparison-grid">
              <ComparisonCard 
                title="Without Aaziko" 
                items={buyerWithout} 
                type="without" 
              />
              <ComparisonCard 
                title="With Aaziko" 
                items={buyerWith} 
                type="with" 
              />
            </div>
            <div className="hww-comparison-cta">
              <a href="https://buyer.aaziko.com" target="_blank" rel="noopener noreferrer" className="hww-btn-primary">
                <ArrowRight size={18} />
                Post Requirement
              </a>
            </div>
          </div>

          {/* D2 - Seller Journey */}
          <div className="hww-comparison-block">
            <h3 className="hww-comparison-title">
              <Building size={24} />
              Seller Journey
            </h3>
            <div className="hww-comparison-grid">
              <ComparisonCard 
                title="Without Aaziko" 
                items={sellerWithout} 
                type="without" 
              />
              <ComparisonCard 
                title="With Aaziko" 
                items={sellerWith} 
                type="with" 
              />
            </div>
            <div className="hww-comparison-cta">
              <a href="https://vendor.aaziko.com" target="_blank" rel="noopener noreferrer" className="hww-btn-primary">
                <ArrowRight size={18} />
                List Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E - Buyer Responsibilities */}
      <section className="hww-section">
        <div className="hww-container">
          <div className="hww-section-header">
            <span className="hww-section-badge">Clear Roles</span>
            <h2 className="hww-section-title">Buying from India becomes simple when roles are clear</h2>
          </div>
          <div className="hww-roles-grid">
            <RoleCard 
              title="Buyer does" 
              subtitle="4 simple steps"
              items={buyerDoes} 
              icon={Users}
              color="primary"
            />
            <RoleCard 
              title="Aaziko coordinates" 
              subtitle="End-to-end support"
              items={aazikoForBuyer} 
              icon={ShieldCheck}
              color="success"
            />
          </div>
        </div>
      </section>

      {/* SECTION F - Seller Responsibilities */}
      <section className="hww-section hww-section-alt">
        <div className="hww-container">
          <div className="hww-section-header">
            <span className="hww-section-badge">Focus on Product</span>
            <h2 className="hww-section-title">Selling globally works best when you focus on the product</h2>
          </div>
          <div className="hww-roles-grid">
            <RoleCard 
              title="Seller does" 
              subtitle="Core activities"
              items={sellerDoes} 
              icon={Building}
              color="primary"
            />
            <RoleCard 
              title="Aaziko coordinates" 
              subtitle="Process management"
              items={aazikoForSeller} 
              icon={ShieldCheck}
              color="success"
            />
          </div>
        </div>
      </section>


      {/* SECTION G - Win-Win Model */}
      <section className="hww-section">
        <div className="hww-container">
          <div className="hww-section-header">
            <span className="hww-section-badge">Honest Explanation</span>
            <h2 className="hww-section-title">Why this can save cost without adding burden</h2>
          </div>
          <div className="hww-winwin-grid">
            <div className="hww-winwin-card seller">
              <div className="hww-winwin-icon">
                <Building size={28} />
              </div>
              <h3>For Sellers</h3>
              <p>
                In traditional export payments: currency spread + bank fees + paperwork costs reduce take-home value.
              </p>
              <p className="hww-winwin-highlight">
                Aaziko's structured execution aims to reduce avoidable friction and rework.
              </p>
              <span className="hww-winwin-note">
                * Exact banking conversion rates depend on banks and terms.
              </span>
            </div>
            <div className="hww-winwin-card buyer">
              <div className="hww-winwin-icon">
                <Users size={28} />
              </div>
              <h3>For Buyers</h3>
              <p>
                "Execution costs" (logistics/inspection/handling) usually rise due to delays, rework, and scattered coordination.
              </p>
              <p className="hww-winwin-highlight">
                Aaziko tries to reduce these leak points through a single process and better coordination.
              </p>
              <span className="hww-winwin-note">
                * Final costs are route/volume/regulation dependent.
              </span>
            </div>
          </div>
          
          {/* Cost Flow Diagram */}
          <div className="hww-cost-diagram">
            <div className="hww-cost-flow">
              <div className="hww-cost-box">
                <span className="hww-cost-label">EXW Price</span>
              </div>
              <div className="hww-cost-arrow">+</div>
              <div className="hww-cost-box">
                <span className="hww-cost-label">Execution Costs</span>
              </div>
              <div className="hww-cost-arrow">→</div>
              <div className="hww-cost-result">
                <div className="hww-cost-down">
                  <ChevronDown size={20} />
                  <span>Leak points ↓</span>
                </div>
                <div className="hww-cost-up">
                  <ChevronUp size={20} />
                  <span>Clarity ↑</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H - Trust Layer */}
      <section className="hww-section hww-section-alt">
        <div className="hww-container">
          <div className="hww-section-header">
            <span className="hww-section-badge">Built-in Trust</span>
            <h2 className="hww-section-title">How trust is built inside the process</h2>
          </div>
          <div className="hww-trust-grid">
            {trustItems.map((item, index) => (
              <TrustItem key={index} {...item} index={index} />
            ))}
          </div>
          <div className="hww-trust-cta">
            <Link to="/policy" className="hww-btn-secondary">
              <ShieldCheck size={18} />
              See Trust & Compliance
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION I - Final CTA */}
      <section className="hww-final-cta">
        <div className="hww-container">
          <div className="hww-cta-card">
            <h2>Ready to trade with confidence?</h2>
            <p>Start your journey with Aaziko today</p>
            <div className="hww-cta-buttons">
              <a href="https://buyer.aaziko.com" target="_blank" rel="noopener noreferrer" className="hww-btn-cta-primary">
                <Users size={18} />
                Buyer: Post Requirement
              </a>
              <a href="https://vendor.aaziko.com" target="_blank" rel="noopener noreferrer" className="hww-btn-cta-primary">
                <Building size={18} />
                Seller: List Products
              </a>
              <Link to="/contact" className="hww-btn-cta-secondary">
                <MessageSquare size={18} />
                Talk to Aaziko Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Comparison Card Component
const ComparisonCard = ({ title, items, type }) => (
  <div className={`hww-comparison-card ${type}`}>
    <h4 className="hww-comparison-card-title">
      {type === 'without' ? <AlertTriangle size={20} /> : <CheckCircle size={20} />}
      {title}
    </h4>
    <ul className="hww-comparison-list">
      {items.map((item, index) => (
        <li key={index}>
          {type === 'without' ? '✗' : '✓'} {item}
        </li>
      ))}
    </ul>
  </div>
)

// Role Card Component
const RoleCard = ({ title, subtitle, items, icon: Icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`hww-role-card ${color}`}
  >
    <div className="hww-role-header">
      <div className="hww-role-icon">
        <Icon size={28} />
      </div>
      <div>
        <h3 className="hww-role-title">{title}</h3>
        <span className="hww-role-subtitle">{subtitle}</span>
      </div>
    </div>
    <ul className="hww-role-list">
      {items.map((item, index) => (
        <li key={index}>
          <CheckCircle size={16} />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
)

// Trust Item Component
const TrustItem = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="hww-trust-item"
  >
    <div className="hww-trust-item-icon">
      <Icon size={24} />
    </div>
    <div className="hww-trust-item-content">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </motion.div>
)

// Order Process Infographic Component - Row Layout (4-3-4)
const OrderProcessInfographic = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Filter steps based on active filter
  const filteredSteps = activeFilter === 'all' 
    ? orderProcessSteps 
    : orderProcessSteps.filter(step => step.role === activeFilter)

  const filterButtons = [
    { id: 'all', label: 'All Steps', color: '#2563EB' },
    { id: 'buyer', label: 'Buyer', color: '#2563EB' },
    { id: 'vendor', label: 'Vendor', color: '#F59E0B' },
    { id: 'aaziko', label: 'Aaziko', color: '#16A34A' }
  ]

  return (
    <section className="hww-section hww-order-process-section">
      <div className="hww-container">
        <div className="hww-section-header">
          <span className="hww-section-badge">Order Journey</span>
          <h2 className="hww-section-title">11 Steps to Successful Trade</h2>
          <p className="hww-section-desc">
            Follow our structured process from inquiry to delivery
          </p>
          
          {/* Filter Buttons */}
          <div className="hww-filter-buttons">
            {filterButtons.map((btn) => (
              <button
                key={btn.id}
                className={`hww-filter-btn ${activeFilter === btn.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(btn.id)}
                style={{
                  '--btn-color': btn.color,
                  background: activeFilter === btn.id ? btn.color : 'white',
                  color: activeFilter === btn.id ? 'white' : btn.color,
                  borderColor: btn.color
                }}
              >
                {btn.id === 'buyer' && <Users size={16} />}
                {btn.id === 'vendor' && <Building size={16} />}
                {btn.id === 'aaziko' && <ShieldCheck size={16} />}
                {btn.id === 'all' && <CheckCircle size={16} />}
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Show filtered cards in a simple grid when filter is active */}
        {activeFilter !== 'all' ? (
          <div className="hww-filtered-cards">
            {filteredSteps.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} activeFilter={activeFilter} />
            ))}
          </div>
        ) : (
          <div className="hww-process-rows">
            {/* Row 1: Steps 1-4 */}
            <div className="hww-process-row">
              <div className="hww-row-label">
                <span className="hww-row-badge" style={{ background: '#2563EB' }}>Phase 1</span>
                <span className="hww-row-title">Order Initiation</span>
              </div>
              <div className="hww-row-cards four-cards">
                {orderProcessSteps.slice(0, 4).map((step, index) => (
                  <StepCard key={step.id} step={step} index={index} activeFilter={activeFilter} />
                ))}
              </div>
              <div className="hww-row-connector">
                <ChevronDown size={24} />
              </div>
            </div>

            {/* Row 2: Steps 5-7 */}
            <div className="hww-process-row">
              <div className="hww-row-label">
                <span className="hww-row-badge" style={{ background: '#F59E0B' }}>Phase 2</span>
                <span className="hww-row-title">Production & Quality</span>
              </div>
              <div className="hww-row-cards three-cards">
                {orderProcessSteps.slice(4, 7).map((step, index) => (
                  <StepCard key={step.id} step={step} index={index + 4} activeFilter={activeFilter} />
                ))}
              </div>
              <div className="hww-row-connector">
                <ChevronDown size={24} />
              </div>
            </div>

            {/* Row 3: Steps 8-11 */}
            <div className="hww-process-row last-row">
              <div className="hww-row-label">
                <span className="hww-row-badge" style={{ background: '#16A34A' }}>Phase 3</span>
                <span className="hww-row-title">Payment & Delivery</span>
              </div>
              <div className="hww-row-cards four-cards">
                {orderProcessSteps.slice(7, 11).map((step, index) => (
                  <StepCard key={step.id} step={step} index={index + 7} activeFilter={activeFilter} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="hww-order-cta">
          <Link to="/order-process" className="hww-btn-primary">
            <ArrowRight size={18} />
            View Detailed Process
          </Link>
        </div>
      </div>
    </section>
  )
}

// Step Card Component
const StepCard = ({ step, index, activeFilter }) => {
  const stepNumber = String(step.id).padStart(2, '0')
  const [imgError, setImgError] = useState(false)
  
  // Role badge info - Buyer uses website blue color
  const roleInfo = {
    buyer: { label: 'Buyer', color: '#2563EB', icon: Users },
    vendor: { label: 'Vendor', color: '#F59E0B', icon: Building },
    aaziko: { label: 'Aaziko', color: '#16A34A', icon: ShieldCheck }
  }
  
  const RoleIcon = roleInfo[step.role]?.icon || Users

  // Get role color for the card
  const roleColor = roleInfo[step.role]?.color

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="hww-step-card"
      style={{ borderTopColor: roleColor }}
    >
      {/* Step Number Badge - Left side */}
      <div className="hww-card-number" style={{ background: roleColor }}>
        {stepNumber}
      </div>

      {/* Role Badge - Centered at top */}
      <div className="hww-card-role-wrapper">
        <div 
          className="hww-card-role-badge"
          style={{ 
            background: roleColor
          }}
        >
          <RoleIcon size={14} />
          {roleInfo[step.role]?.label}
        </div>
      </div>

      {/* Image */}
      <div className="hww-card-image" style={{ background: `${roleColor}08` }}>
        {!imgError ? (
          <img 
            src={step.image} 
            alt={step.title}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="hww-card-image-placeholder" style={{ color: roleColor }}>
            <Package size={48} strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="hww-card-content">
        <h4 className="hww-card-title" style={{ color: roleColor }}>{step.title}</h4>
        <p className="hww-card-desc">{step.description}</p>
      </div>

      {/* Arrow to next */}
      {step.id < 11 && (
        <div className="hww-card-arrow" style={{ color: roleColor }}>
          <ArrowRight size={18} />
        </div>
      )}
    </motion.div>
  )
}

// Helper function to adjust color brightness
function adjustColorBrightness(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, Math.min(255, (num >> 16) + amount))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount))
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount))
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`
}

export default HowWeWork
