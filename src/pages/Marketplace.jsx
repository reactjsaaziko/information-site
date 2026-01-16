// Aaziko Marketplace Page - Buy from India with clarity, confidence, and control
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Globe, Search, ShieldCheck, BadgeCheck,
  CheckCircle, Package, FileText, Truck,
  ArrowRight, Store, Users, FileCheck,
  ClipboardList, Eye, Target, Scale
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './Marketplace.css'

const trustStrip = [
  { icon: ShieldCheck, text: 'Verified Suppliers' },
  { icon: FileText, text: 'Structured Trade Process' },
  { icon: CheckCircle, text: '100% Assurance' }
]

// What you can do on the Marketplace
const marketplaceFeatures = [
  { icon: Search, text: 'Search products by category, specifications, MOQ, and target market' },
  { icon: Eye, text: 'Discover Indian manufacturers with clear product data and capability details' },
  { icon: FileText, text: 'Post your requirement and receive relevant quotations' },
  { icon: Scale, text: 'Compare options without broker pressure or hidden terms' }
]

// Why Aaziko Marketplace is different
const differentiators = [
  { icon: Target, title: 'Clarity first', desc: 'Structured product information and quotation flow' },
  { icon: ShieldCheck, title: 'Trust built-in', desc: 'Verification and inspection-backed options where required' },
  { icon: FileCheck, title: 'No trade confusion', desc: 'Logistics, customs, and documentation guided by Aaziko' },
  { icon: BadgeCheck, title: 'One accountable platform', desc: 'Buying from India = buying through Aaziko' }
]

// How buying works (simple flow)
const buyingSteps = [
  { step: 1, icon: Search, title: 'Search or Post', desc: 'Search products or post your requirement' },
  { step: 2, icon: ClipboardList, title: 'Receive Quotations', desc: 'Receive quotations from suitable Indian manufacturers' },
  { step: 3, icon: CheckCircle, title: 'Confirm Order', desc: 'Confirm order with Aaziko-led trade process' },
  { step: 4, icon: Truck, title: 'Aaziko Coordinates', desc: 'Aaziko coordinates inspection, logistics, and customs' },
  { step: 5, icon: Package, title: 'Goods Delivered', desc: 'Goods delivered with 100% Assurance on order terms' }
]

// Built for global buyers
const buyerTypes = [
  { icon: Users, text: 'First-time importers and experienced sourcing teams' },
  { icon: Package, text: 'Bulk, repeat, and custom orders' },
  { icon: ShieldCheck, text: 'Buyers who want ease, transparency, and trust, not trade risk' }
]

const Marketplace = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.mp-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.mp-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.mp-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.mp-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.mp-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="mp-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="mp-hero">
        <div className="mp-hero-content">
          <div className="mp-hero-badge">
            <Store size={16} />
            <span>Marketplace</span>
          </div>
          <h1 className="mp-hero-title">
            Buy from India with{' '}
            <span className="mp-gradient-text">clarity, confidence, and control</span>
          </h1>
          <p className="mp-hero-subtitle">
            Aaziko's Marketplace connects global buyers with verified Indian manufacturers through a structured, 
            transparent trade process—so buying from India feels simple and predictable.
          </p>
          <div className="mp-hero-cta">
            <Link to="/rfq" className="mp-btn-primary">
              <Search size={18} />
              Search Products
            </Link>
            <Link to="/rfq" className="mp-btn-secondary">
              <FileText size={18} />
              Post Your Requirement
            </Link>
          </div>
          
          {/* Trust Strip */}
          <div className="mp-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="mp-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you can do on the Marketplace */}
      <section className="mp-section mp-section-alt">
        <div className="mp-container">
          <div className="mp-section-header">
            <span className="mp-section-badge">Features</span>
            <h2 className="mp-section-title">What you can do on the Marketplace</h2>
            <p className="mp-section-subtitle">Discover, compare, and source products with complete transparency</p>
          </div>
          <div className="mp-features-grid">
            {marketplaceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mp-feature-card"
              >
                <div className="mp-feature-icon">
                  <feature.icon size={28} />
                </div>
                <p>{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Aaziko Marketplace is different */}
      <section className="mp-section">
        <div className="mp-container">
          <div className="mp-section-header">
            <span className="mp-section-badge">Why Different</span>
            <h2 className="mp-section-title">Why Aaziko Marketplace is different</h2>
            <p className="mp-section-subtitle">A marketplace built for trust, not just transactions</p>
          </div>
          <div className="mp-diff-grid">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mp-diff-card"
              >
                <div className="mp-diff-icon">
                  <item.icon size={28} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How buying works */}
      <section className="mp-section mp-section-alt">
        <div className="mp-container">
          <div className="mp-section-header">
            <span className="mp-section-badge">Simple Flow</span>
            <h2 className="mp-section-title">How buying works</h2>
            <p className="mp-section-subtitle">From search to delivery in 5 simple steps</p>
          </div>
          <div className="mp-buying-steps">
            {buyingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mp-buying-step"
              >
                <div className="mp-step-number">{step.step}</div>
                <div className="mp-step-icon">
                  <step.icon size={28} />
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for global buyers */}
      <section className="mp-section">
        <div className="mp-container">
          <div className="mp-section-header">
            <span className="mp-section-badge">For You</span>
            <h2 className="mp-section-title">Built for global buyers</h2>
            <p className="mp-section-subtitle">Whether you're new to importing or a seasoned pro</p>
          </div>
          <div className="mp-buyers-grid">
            {buyerTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mp-buyer-card"
              >
                <div className="mp-buyer-icon">
                  <type.icon size={28} />
                </div>
                <p>{type.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      <Footer />
    </div>
  )
}

export default Marketplace
