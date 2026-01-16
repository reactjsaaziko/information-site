// List Products Page - Compact Version with Unique Sections
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Package, CheckCircle, ArrowRight,
  Image, Ruler, Box, Factory, DollarSign,
  ShieldCheck, Upload, Eye, Send, MessageSquare,
  Search, Truck, ListChecks
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './ListProducts.css'

const productFields = [
  { icon: Package, label: 'Name & Category' },
  { icon: Image, label: 'Clear Photos' },
  { icon: Ruler, label: 'Specs & Size' },
  { icon: ListChecks, label: 'MOQ' },
  { icon: Factory, label: 'Capacity' },
  { icon: DollarSign, label: 'Base Price' },
  { icon: Box, label: 'Packaging' }
]

const flowSteps = [
  { 
    icon: Upload, 
    title: 'List Products',
    desc: 'Add details, photos & pricing'
  },
  { 
    icon: Eye, 
    title: 'Get Discovered',
    desc: 'Buyers find your products'
  },
  { 
    icon: MessageSquare, 
    title: 'Receive Inquiries',
    desc: 'Direct or via LSQ marketplace'
  },
  { 
    icon: ShieldCheck, 
    title: 'Aaziko Handles',
    desc: 'Inspection, logistics, customs'
  },
  { 
    icon: Truck, 
    title: 'Ship & Get Paid',
    desc: '100% payment on delivery'
  }
]

const quickTips = [
  { text: 'Use real photos, not copied', good: true },
  { text: 'Keep specs complete', good: true },
  { text: 'No fake certificates', good: false },
  { text: 'Honest lead times', good: true }
]

const ListProducts = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.listprod-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.listprod-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.listprod-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.listprod-cta-group', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="listprod-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section - Compact */}
      <section ref={heroRef} className="listprod-hero listprod-hero-compact">
        <div className="listprod-hero-content">
          <div className="listprod-hero-badge">
            <span className="listprod-badge-dot" />
            <span>For Suppliers</span>
          </div>
          <h1 className="listprod-hero-title">
            List <span className="listprod-gradient-text">Products</span>
          </h1>
          <p className="listprod-hero-subtitle">
            Turn your products into international bulk orders
          </p>
          <div className="listprod-cta-group">
            <button className="listprod-cta-primary">
              <Package size={18} />
              Add Product
              <ArrowRight size={16} />
            </button>
            <button className="listprod-cta-secondary">
              <Upload size={18} />
              Bulk Upload
            </button>
          </div>
        </div>
      </section>

      <div className="listprod-container listprod-container-compact">
        
        {/* Section 1: Product Info Card - Unique Icon Grid Layout */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="listprod-section"
        >
          <div className="listprod-info-card">
            <div className="listprod-info-header">
              <h2>What to Include</h2>
              <p>Key details buyers look for</p>
            </div>
            
            {/* Icon Grid */}
            <div className="listprod-icon-grid">
              {productFields.map((field, index) => (
                <div key={index} className="listprod-field-item">
                  <div className="listprod-field-icon">
                    <field.icon size={20} />
                  </div>
                  <span>{field.label}</span>
                </div>
              ))}
            </div>

            {/* Inline Tips Row */}
            <div className="listprod-tips-row">
              <span className="listprod-tips-label">Quick tips:</span>
              <div className="listprod-tips-list">
                {quickTips.map((tip, index) => (
                  <span key={index} className={`listprod-tip-tag ${tip.good ? 'good' : 'avoid'}`}>
                    {tip.good ? <CheckCircle size={14} /> : <span className="tip-x">×</span>}
                    {tip.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 2: How It Works - Horizontal Flow Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="listprod-section"
        >
          <div className="listprod-flow-card">
            <div className="listprod-flow-header">
              <Send size={24} />
              <h2>How Products Get Orders</h2>
            </div>
            
            {/* Horizontal Flow */}
            <div className="listprod-flow-timeline">
              {flowSteps.map((step, index) => (
                <div key={index} className="listprod-flow-step">
                  <div className="listprod-step-icon">
                    <step.icon size={24} />
                  </div>
                  <div className="listprod-step-content">
                    <span className="listprod-step-title">{step.title}</span>
                    <span className="listprod-step-desc">{step.desc}</span>
                  </div>
                  {index < flowSteps.length - 1 && (
                    <div className="listprod-step-arrow">
                      <ArrowRight size={18} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Order Channels */}
            <div className="listprod-channels">
              <div className="listprod-channel">
                <MessageSquare size={20} />
                <span>Direct Inquiry</span>
                <small>Buyers contact you from profile</small>
              </div>
              <div className="listprod-channel-divider">or</div>
              <div className="listprod-channel">
                <Search size={20} />
                <span>LSQ Marketplace</span>
                <small>Quote on buyer requirements</small>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Bottom CTA - Compact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="listprod-section"
        >
          <div className="listprod-cta-card listprod-cta-compact">
            <h3>Ready to go global?</h3>
            <div className="listprod-cta-group">
              <button className="listprod-cta-primary">
                <Package size={18} />
                Add Product
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  )
}

export default ListProducts