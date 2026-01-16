// Buyer Benefits Page - Total Cost Savings Focus
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Calculator, TrendingDown, ShieldCheck, FileCheck, Clock,
  Truck, AlertTriangle, CheckCircle, DollarSign, Package,
  Globe, BarChart3, Percent, ArrowRight, Sparkles, Target,
  Scale, FileText, BadgeCheck, Zap, Eye
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './BuyerBenefits.css'

const costSavings = [
  {
    icon: Calculator,
    title: 'Total Landed Cost Clarity',
    description: 'Know exact costs upfront — no hidden charges.',
    savings: 'Up to 15% savings',
    details: [
      'Complete cost breakdown',
      'Duty & tax included',
      'Shipping transparency',
      'No hidden fees'
    ],
    color: 'primary'
  },
  {
    icon: ShieldCheck,
    title: 'Reduced Disputes',
    description: 'Pre-shipment inspections minimize issues.',
    savings: '90% fewer disputes',
    details: [
      'Quality inspection',
      'Clear contracts',
      'Escrow protection',
      'Dispute resolution'
    ],
    color: 'success'
  },
  {
    icon: Clock,
    title: 'Fewer Customs Delays',
    description: 'Proper docs ensure smooth clearance.',
    savings: '70% faster clearance',
    details: [
      'Pre-verified docs',
      'HS code accuracy',
      'Compliance checks',
      'Customs coordination'
    ],
    color: 'info'
  }
]

const additionalBenefits = [
  {
    icon: TrendingDown,
    title: 'Lower Procurement',
    description: 'Direct factory pricing.',
    stat: '20-40%',
    statLabel: 'Cost Reduction'
  },
  {
    icon: Package,
    title: 'Less Rejections',
    description: 'Quality checks before shipping.',
    stat: '95%',
    statLabel: 'Acceptance Rate'
  },
  {
    icon: Truck,
    title: 'Optimized Logistics',
    description: 'Consolidated shipping.',
    stat: '25%',
    statLabel: 'Shipping Savings'
  },
  {
    icon: AlertTriangle,
    title: 'Risk Mitigation',
    description: 'Verified suppliers & secure payments.',
    stat: '99%',
    statLabel: 'Safe Transactions'
  }
]

const comparisonData = [
  { aspect: 'Price Transparency', traditional: 'Hidden fees common', aaziko: 'Full cost breakdown' },
  { aspect: 'Quality Assurance', traditional: 'Post-delivery issues', aaziko: 'Pre-shipment inspection' },
  { aspect: 'Customs Clearance', traditional: 'Frequent delays', aaziko: 'Smooth processing' },
  { aspect: 'Payment Security', traditional: 'High risk', aaziko: 'Escrow protected' },
  { aspect: 'Dispute Resolution', traditional: 'Lengthy process', aaziko: 'Quick resolution' },
  { aspect: 'Documentation', traditional: 'Often incomplete', aaziko: 'Fully compliant' }
]

const trustStrip = [
  { icon: ShieldCheck, text: 'Verified Suppliers' },
  { icon: Eye, text: 'Pre-shipment Inspection' },
  { icon: Globe, text: 'Global Coverage' }
]

const BuyerBenefits = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.benefits-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.benefits-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.benefits-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.benefits-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="benefits-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="benefits-hero">
        <div className="benefits-hero-content">
          <div className="benefits-hero-badge">
            <Sparkles size={16} />
            <span>Smart Sourcing</span>
          </div>
          <h1 className="benefits-hero-title">
            Save on <span className="benefits-gradient-text">Total Cost</span>, Not Just Price
          </h1>
          <p className="benefits-hero-subtitle">
            Reduce hidden costs, avoid disputes, eliminate delays.
          </p>
          <div className="benefits-hero-stats">
            <div className="benefits-hero-stat">
              <span className="benefits-stat-value">30%</span>
              <span className="benefits-stat-label">Avg. Total Savings</span>
            </div>
            <div className="benefits-hero-stat">
              <span className="benefits-stat-value">90%</span>
              <span className="benefits-stat-label">Fewer Disputes</span>
            </div>
            <div className="benefits-hero-stat">
              <span className="benefits-stat-value">70%</span>
              <span className="benefits-stat-label">Faster Customs</span>
            </div>
          </div>
          
          {/* Trust Strip */}
          <div className="benefits-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="benefits-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Cost Savings Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-section-header">
            <span className="benefits-section-badge">Core Benefits</span>
            <h2 className="benefits-section-title">How You Save Total Cost</h2>
            <p className="benefits-section-desc">
              Eliminate hidden costs that eat into margins.
            </p>
          </div>
          
          <div className="benefits-main-grid">
            {costSavings.map((benefit, index) => (
              <CostSavingCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="benefits-section benefits-section-alt">
        <div className="benefits-container">
          <div className="benefits-section-header">
            <span className="benefits-section-badge">By The Numbers</span>
            <h2 className="benefits-section-title">Additional Savings</h2>
          </div>
          
          <div className="benefits-stats-grid">
            {additionalBenefits.map((benefit, index) => (
              <StatCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-section-header">
            <span className="benefits-section-badge">Comparison</span>
            <h2 className="benefits-section-title">Traditional vs Aaziko</h2>
            <p className="benefits-section-desc">
              See the Aaziko difference.
            </p>
          </div>
          
          <div className="benefits-comparison-table">
            <div className="comparison-header">
              <div className="comparison-aspect">Aspect</div>
              <div className="comparison-traditional">Traditional Sourcing</div>
              <div className="comparison-aaziko">With Aaziko</div>
            </div>
            {comparisonData.map((row, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="comparison-row"
              >
                <div className="comparison-aspect">{row.aspect}</div>
                <div className="comparison-traditional">
                  <AlertTriangle size={14} />
                  {row.traditional}
                </div>
                <div className="comparison-aaziko">
                  <CheckCircle size={14} />
                  {row.aaziko}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="benefits-cta-section">
        <div className="benefits-container">
          <div className="benefits-cta-card">
            <div className="benefits-cta-content">
              <h3>Start Saving Today</h3>
              <p>Get a cost analysis for your requirements.</p>
            </div>
            <Link to="/rfq" className="benefits-btn-primary benefits-btn-lg">
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


// Cost Saving Card Component
const CostSavingCard = ({ icon: Icon, title, description, savings, details, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`benefits-cost-card benefits-cost-${color}`}
  >
    <div className="benefits-cost-header">
      <div className={`benefits-cost-icon benefits-icon-${color}`}>
        <Icon size={28} />
      </div>
      <div className="benefits-cost-savings">{savings}</div>
    </div>
    <h3 className="benefits-cost-title">{title}</h3>
    <p className="benefits-cost-desc">{description}</p>
    <ul className="benefits-cost-details">
      {details.map((detail, i) => (
        <li key={i}>
          <CheckCircle size={16} />
          <span>{detail}</span>
        </li>
      ))}
    </ul>
  </motion.div>
)

// Stat Card Component
const StatCard = ({ icon: Icon, title, description, stat, statLabel, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="benefits-stat-card"
  >
    <div className="benefits-stat-icon">
      <Icon size={24} />
    </div>
    <div className="benefits-stat-number">{stat}</div>
    <div className="benefits-stat-label">{statLabel}</div>
    <h4 className="benefits-stat-title">{title}</h4>
    <p className="benefits-stat-desc">{description}</p>
  </motion.div>
)

export default BuyerBenefits
