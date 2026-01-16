// Buyer Cost Savings Page - Modern Interactive Design
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Factory, Truck, Clock, ShieldCheck, CreditCard,
  TrendingDown, CheckCircle, ArrowRight, Sparkles,
  DollarSign, Percent, Calculator, ChevronRight,
  Layers, AlertTriangle, Target, Zap, Globe, Eye
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './BuyerCostSavings.css'

const savingsLevers = [
  {
    id: 1,
    icon: Factory,
    title: 'Factory-Direct Quotes',
    subtitle: 'Fewer Middle Layers',
    savings: '20-35%',
    savingsLabel: 'Price Reduction',
    problem: 'Multiple middlemen add 10-15% markup each.',
    solution: 'Connect directly with verified manufacturers.',
    benefits: [
      'Direct communication',
      'No agent fees',
      'Transparent pricing',
      'Bulk discounts'
    ],
    color: 'primary',
    traditional: '3-4 middlemen',
    aaziko: 'Direct access'
  },
  {
    id: 2,
    icon: Truck,
    title: 'Optimized Logistics',
    subtitle: 'Consolidated Shipping',
    savings: '15-25%',
    savingsLabel: 'Shipping Savings',
    problem: 'Standard rates & inefficient routing.',
    solution: 'Pre-negotiated rates & AI-optimized routing.',
    benefits: [
      'Pre-negotiated rates',
      'Cargo consolidation',
      'Optimal routes',
      'Multi-modal options'
    ],
    color: 'info',
    traditional: 'Standard rates',
    aaziko: 'Volume discounts'
  },
  {
    id: 3,
    icon: Clock,
    title: 'Reduced Customs Delays',
    subtitle: 'Customs Readiness',
    savings: '70%',
    savingsLabel: 'Faster Clearance',
    problem: 'Incomplete docs cause holds & fees.',
    solution: 'Pre-verified docs & compliance checks.',
    benefits: [
      'Pre-verified docs',
      'Accurate HS codes',
      'Compliance checks',
      'Customs coordination'
    ],
    color: 'success',
    traditional: '5-10 day delays',
    aaziko: '1-2 day clearance'
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: 'Fewer Rework & Disputes',
    subtitle: 'Pre-Shipment Inspection',
    savings: '90%',
    savingsLabel: 'Fewer Disputes',
    problem: 'Quality issues after delivery = costly returns.',
    solution: 'AQL inspections catch defects before shipping.',
    benefits: [
      'AQL inspection',
      'Defect detection',
      'Photo/video docs',
      'Third-party verification'
    ],
    color: 'warning',
    traditional: '15-20% rejection',
    aaziko: '<2% rejection'
  },
  {
    id: 5,
    icon: CreditCard,
    title: 'Predictable Payments',
    subtitle: 'Reduced Risk Premium',
    savings: '5-10%',
    savingsLabel: 'Better Terms',
    problem: 'High-risk = large upfront payments.',
    solution: 'Milestone payments with escrow protection.',
    benefits: [
      'Milestone structure',
      'Escrow protection',
      'Lower upfront',
      'Performance-linked'
    ],
    color: 'navy',
    traditional: '50-100% upfront',
    aaziko: '30% deposit, milestones'
  }
]

const totalSavingsBreakdown = [
  { label: 'Product Cost Reduction', value: '20-35%', icon: Factory },
  { label: 'Logistics Savings', value: '15-25%', icon: Truck },
  { label: 'Avoided Delay Costs', value: '5-10%', icon: Clock },
  { label: 'Reduced Quality Issues', value: '3-5%', icon: ShieldCheck },
  { label: 'Better Payment Terms', value: '5-10%', icon: CreditCard }
]

const trustStrip = [
  { icon: TrendingDown, text: 'Up to 30% Savings' },
  { icon: Eye, text: 'Pre-shipment Inspection' },
  { icon: Globe, text: 'Global Coverage' }
]

const BuyerCostSavings = () => {
  const heroRef = useRef(null)
  const [activeCard, setActiveCard] = useState(0)
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.savings-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.savings-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.savings-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.savings-calculator', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.5 })
      gsap.fromTo('.savings-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="savings-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section with Savings Calculator Preview */}
      <section ref={heroRef} className="savings-hero">
        <div className="savings-hero-content">
          <div className="savings-hero-badge">
            <Sparkles size={16} />
            <span>Cost Optimization</span>
          </div>
          <h1 className="savings-hero-title">
            Save Up to <span className="savings-gradient-text">30%</span> on Total Landed Cost
          </h1>
          <p className="savings-hero-subtitle">
            Five key levers that reduce procurement costs.
          </p>
          
          {/* Savings Calculator Preview */}
          <div className="savings-calculator">
            <div className="savings-calc-header">
              <Calculator size={20} />
              <span>Your Potential Savings</span>
            </div>
            <div className="savings-calc-breakdown">
              {totalSavingsBreakdown.map((item, index) => (
                <div key={index} className="savings-calc-item">
                  <item.icon size={18} />
                  <span className="savings-calc-label">{item.label}</span>
                  <span className="savings-calc-value">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="savings-calc-total">
              <span>Total Potential Savings</span>
              <span className="savings-calc-total-value">Up to 30%+</span>
            </div>
          </div>
          
          {/* Trust Strip */}
          <div className="savings-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="savings-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Savings Levers Section */}
      <section className="savings-levers-section">
        <div className="savings-container">
          <div className="savings-section-header">
            <span className="savings-section-badge">5 Savings Levers</span>
            <h2 className="savings-section-title">How Each Lever Saves You Money</h2>
            <p className="savings-section-desc">
              Click each lever to see problem, solution & savings.
            </p>
          </div>

          {/* Lever Navigation Tabs */}
          <div className="savings-lever-tabs">
            {savingsLevers.map((lever, index) => (
              <button
                key={lever.id}
                className={`savings-lever-tab ${activeCard === index ? 'active' : ''}`}
                onClick={() => setActiveCard(index)}
              >
                <lever.icon size={20} />
                <span className="savings-tab-title">{lever.title}</span>
                <span className="savings-tab-value">{lever.savings}</span>
              </button>
            ))}
          </div>

          {/* Active Lever Detail */}
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`savings-lever-detail savings-lever-detail-${savingsLevers[activeCard].color}`}
          >
            <div className="savings-detail-grid">
              {/* Left: Problem & Solution */}
              <div className="savings-detail-content">
                <div className="savings-detail-header">
                  <div className={`savings-detail-icon savings-icon-${savingsLevers[activeCard].color}`}>
                    {(() => { const Icon = savingsLevers[activeCard].icon; return <Icon size={32} /> })()}
                  </div>
                  <div>
                    <span className="savings-detail-subtitle">{savingsLevers[activeCard].subtitle}</span>
                    <h3 className="savings-detail-title">{savingsLevers[activeCard].title}</h3>
                  </div>
                  <div className="savings-detail-badge">
                    <span className="savings-badge-value">{savingsLevers[activeCard].savings}</span>
                    <span className="savings-badge-label">{savingsLevers[activeCard].savingsLabel}</span>
                  </div>
                </div>

                <div className="savings-problem-solution">
                  <div className="savings-problem">
                    <div className="savings-ps-header">
                      <AlertTriangle size={18} />
                      <span>The Problem</span>
                    </div>
                    <p>{savingsLevers[activeCard].problem}</p>
                  </div>
                  <div className="savings-solution">
                    <div className="savings-ps-header">
                      <Zap size={18} />
                      <span>Our Solution</span>
                    </div>
                    <p>{savingsLevers[activeCard].solution}</p>
                  </div>
                </div>

                {/* Comparison Bar */}
                <div className="savings-comparison-bar">
                  <div className="savings-compare-item traditional">
                    <span className="savings-compare-label">Traditional</span>
                    <span className="savings-compare-value">{savingsLevers[activeCard].traditional}</span>
                  </div>
                  <div className="savings-compare-arrow">
                    <ArrowRight size={20} />
                  </div>
                  <div className="savings-compare-item aaziko">
                    <span className="savings-compare-label">With Aaziko</span>
                    <span className="savings-compare-value">{savingsLevers[activeCard].aaziko}</span>
                  </div>
                </div>
              </div>

              {/* Right: Benefits List */}
              <div className="savings-detail-benefits">
                <h4>What You Get</h4>
                <ul>
                  {savingsLevers[activeCard].benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <CheckCircle size={18} />
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Savings Flow */}
      <section className="savings-flow-section">
        <div className="savings-container">
          <div className="savings-section-header">
            <span className="savings-section-badge">Savings Journey</span>
            <h2 className="savings-section-title">From Inquiry to Delivery</h2>
            <p className="savings-section-desc">
              See how savings accumulate at each stage.
            </p>
          </div>

          <div className="savings-flow">
            {savingsLevers.map((lever, index) => (
              <div 
                key={lever.id}
                className={`savings-flow-item ${hoveredCard === index ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`savings-flow-icon savings-icon-${lever.color}`}>
                  <lever.icon size={24} />
                </div>
                <div className="savings-flow-content">
                  <span className="savings-flow-step">Step {index + 1}</span>
                  <h4>{lever.title}</h4>
                  <div className="savings-flow-savings">
                    <TrendingDown size={14} />
                    <span>{lever.savings} savings</span>
                  </div>
                </div>
                {index < savingsLevers.length - 1 && (
                  <div className="savings-flow-connector">
                    <ChevronRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Cumulative Savings Bar */}
          <div className="savings-cumulative">
            <div className="savings-cumulative-bar">
              <div className="savings-cumulative-fill" style={{ width: '100%' }}>
                <span>Total Savings: Up to 30%+</span>
              </div>
            </div>
            <div className="savings-cumulative-markers">
              {savingsLevers.map((lever, index) => (
                <div 
                  key={lever.id} 
                  className="savings-marker"
                  style={{ left: `${((index + 1) / savingsLevers.length) * 100}%` }}
                >
                  <span>{lever.savings}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="savings-cta-section">
        <div className="savings-container">
          <div className="savings-cta-card">
            <div className="savings-cta-icon">
              <Target size={48} />
            </div>
            <div className="savings-cta-content">
              <h3>Ready to Start Saving?</h3>
              <p>Get a personalized cost analysis.</p>
            </div>
            <Link to="/rfq" className="savings-btn-primary savings-btn-lg">
              <Calculator size={18} />
              Get Cost Estimate
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default BuyerCostSavings
