// Buyers Overview Page - Aaziko Premium 3D Light Theme
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  ShieldCheck, BadgeCheck, Search, FileCheck, Truck, 
  ClipboardCheck, Handshake, Globe, CheckCircle,
  Eye, Scale, MessageSquare, CreditCard, Star, FileText, Factory
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './BuyersOverview.css'

const trustStrip = [
  { icon: BadgeCheck, text: 'Verified Suppliers' },
  { icon: Eye, text: 'Pre-shipment Inspection' },
  { icon: ShieldCheck, text: 'Secure Payments' }
]

const buyerBenefits = [
  {
    icon: Factory,
    title: 'Verified Manufacturers',
    description: 'Pre-vetted suppliers with quality certifications.',
    highlight: '500+ Verified'
  },
  {
    icon: Eye,
    title: 'Inspection-Backed Quality',
    description: 'Quality checks before every shipment.',
    highlight: '100% Inspected'
  },
  {
    icon: Scale,
    title: 'Transparent Pricing',
    description: 'Factory-direct pricing, no hidden fees.',
    highlight: 'Best Rates'
  },
  {
    icon: Truck,
    title: 'End-to-End Logistics',
    description: 'Shipping, customs & delivery handled.',
    highlight: 'Door Delivery'
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description: 'Escrow-protected transactions.',
    highlight: 'Escrow Protected'
  },
  {
    icon: MessageSquare,
    title: 'Dedicated Support',
    description: '24/7 buyer assistance.',
    highlight: '24/7 Support'
  }
]

const trustSystem = [
  {
    icon: BadgeCheck,
    title: 'Supplier Verification',
    description: 'Business registration & factory audit.',
    color: 'primary'
  },
  {
    icon: FileCheck,
    title: 'Quality Certifications',
    description: 'ISO, CE, FDA verified.',
    color: 'success'
  },
  {
    icon: Star,
    title: 'Performance Ratings',
    description: 'Real buyer reviews & metrics.',
    color: 'warning'
  },
  {
    icon: CreditCard,
    title: 'Payment Protection',
    description: 'Milestone-based escrow system.',
    color: 'info'
  }
]

const howItWorks = [
  {
    step: 1,
    icon: Search,
    title: 'Search & Discover',
    description: 'Browse by category or certification.'
  },
  {
    step: 2,
    icon: ClipboardCheck,
    title: 'Request Quotation',
    description: 'Get quotes from multiple suppliers.'
  },
  {
    step: 3,
    icon: Handshake,
    title: 'Negotiate & Order',
    description: 'Compare, negotiate & place order.'
  },
  {
    step: 4,
    icon: Eye,
    title: 'Quality Inspection',
    description: 'Pre-shipment quality checks.'
  },
  {
    step: 5,
    icon: Truck,
    title: 'Ship & Track',
    description: 'Real-time shipment tracking.'
  },
  {
    step: 6,
    icon: CheckCircle,
    title: 'Receive & Review',
    description: 'Receive goods & release payment.'
  }
]

const BuyersOverview = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.buyers-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.buyers-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.buyers-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.buyers-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.buyers-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="buyers-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="buyers-hero">
        <div className="buyers-hero-content">
          <div className="buyers-hero-badge">
            <Globe size={16} />
            <span>For Global Buyers</span>
          </div>
          <h1 className="buyers-hero-title">
            Source from Verified Indian <span className="buyers-gradient-text">Manufacturers</span>
          </h1>
          <p className="buyers-hero-subtitle">
            Inspection-backed quality & end-to-end execution.
          </p>
          <div className="buyers-hero-cta">
            <Link to="/rfq" className="buyers-btn-primary">
              <FileText size={18} />
              Send RFQ
            </Link>
            <button className="buyers-btn-secondary">
              <Search size={18} />
              Find Suppliers
            </button>
          </div>
          
          {/* Trust Strip */}
          <div className="buyers-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="buyers-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Benefits Section */}
      <section className="buyers-section">
        <div className="buyers-container">
          <div className="buyers-section-header">
            <span className="buyers-section-badge">Why Choose Aaziko</span>
            <h2 className="buyers-section-title">Benefits for Buyers</h2>
            <p className="buyers-section-desc">
              Source confidently from India.
            </p>
          </div>
          <div className="buyers-benefits-grid">
            {buyerBenefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust System Section */}
      <section className="buyers-section buyers-section-alt">
        <div className="buyers-container">
          <div className="buyers-section-header">
            <span className="buyers-section-badge">Built on Trust</span>
            <h2 className="buyers-section-title">Our Trust System</h2>
            <p className="buyers-section-desc">
              Verification & protection for safe transactions.
            </p>
          </div>
          <div className="buyers-trust-grid">
            {trustSystem.map((item, index) => (
              <TrustCard key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="buyers-section">
        <div className="buyers-container">
          <div className="buyers-section-header">
            <span className="buyers-section-badge">Simple Process</span>
            <h2 className="buyers-section-title">How It Works</h2>
            <p className="buyers-section-desc">
              6 steps from discovery to delivery.
            </p>
          </div>
          <div className="buyers-steps-container">
            {howItWorks.map((step, index) => (
              <StepCard key={index} {...step} isLast={index === howItWorks.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

// Benefit Card Component
const BenefitCard = ({ icon: Icon, title, description, highlight, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="buyers-benefit-card"
  >
    <div className="buyers-benefit-icon">
      <Icon size={24} />
    </div>
    <div className="buyers-benefit-highlight">{highlight}</div>
    <h3 className="buyers-benefit-title">{title}</h3>
    <p className="buyers-benefit-desc">{description}</p>
  </motion.div>
)

// Trust Card Component
const TrustCard = ({ icon: Icon, title, description, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`buyers-trust-card buyers-trust-${color}`}
  >
    <div className="buyers-trust-icon">
      <Icon size={28} />
    </div>
    <h3 className="buyers-trust-title">{title}</h3>
    <p className="buyers-trust-desc">{description}</p>
  </motion.div>
)

// Step Card Component
const StepCard = ({ step, icon: Icon, title, description, isLast }) => (
  <div className="buyers-step-card">
    <div className="buyers-step-number">{step}</div>
    <div className="buyers-step-icon">
      <Icon size={24} />
    </div>
    <h3 className="buyers-step-title">{title}</h3>
    <p className="buyers-step-desc">{description}</p>
    {!isLast && <div className="buyers-step-connector" />}
  </div>
)

export default BuyersOverview
