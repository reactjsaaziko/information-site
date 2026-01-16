// Suppliers Overview Page - Redesigned Visual Compact Layout
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  Factory, Globe, Package, ShieldCheck, Truck, FileCheck,
  CreditCard, Users, CheckCircle, ClipboardList, Eye,
  BadgeCheck, Banknote, HeartHandshake, Zap, Target,
  ArrowRight, Building2, Scale, MessageSquare, Clock,
  ChevronDown, Sparkles
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './SuppliersOverview.css'

const trustStrip = [
  { icon: ShieldCheck, text: '100% Payment Security', verified: true },
  { icon: BadgeCheck, text: 'Zero Export Burden', verified: true },
  { icon: Globe, text: 'Global Market Access', verified: false }
]

const whoIsFor = [
  { icon: Factory, title: 'Indian Manufacturers', description: 'MSMEs & large manufacturing units looking to expand globally.' },
  { icon: Package, title: 'Traders & Exporters', description: 'Bulk suppliers wanting international orders without export hassle.' },
  { icon: Building2, title: 'Sellers Seeking Orders', description: 'Businesses wanting global reach without handling export operations.' },
  { icon: ShieldCheck, title: 'Payment Security Seekers', description: 'Those wanting full payment security and zero compliance burden.' }
]

const keyBenefits = [
  { icon: Users, label: 'Buyer Sourcing', desc: 'We find & verify buyers' },
  { icon: Truck, label: 'Logistics', desc: 'Door-to-door shipping' },
  { icon: FileCheck, label: 'Documentation', desc: 'Customs & compliance' },
  { icon: Eye, label: 'Inspection', desc: 'Quality assurance' },
  { icon: CreditCard, label: 'Payments', desc: '100% secure payments' },
  { icon: Globe, label: 'Trade Guidance', desc: 'International support' }
]

const yourFocus = [
  { icon: Factory, text: 'Manufacturing' },
  { icon: CheckCircle, text: 'Quality' },
  { icon: Package, text: 'Packaging' },
  { icon: Clock, text: 'Timelines' }
]

const orderChannels = [
  { title: 'Direct Buyer Orders', icon: Target, color: 'primary', desc: 'Global buyers discover your profile and place orders' },
  { title: 'LSQ Module', icon: ClipboardList, color: 'info', desc: 'Quote on live buyer requirements' }
]

const whyTrust = [
  { icon: Scale, text: 'Clear Roles' },
  { icon: FileCheck, text: 'Transparent' },
  { icon: Eye, text: 'Inspection-backed' },
  { icon: ShieldCheck, text: 'Zero Burden' },
  { icon: HeartHandshake, text: 'Long-term' }
]

const SuppliersOverview = () => {
  const heroRef = useRef(null)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.suppliers-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.suppliers-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.suppliers-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.suppliers-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="suppliers-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section - Compact */}
      <section ref={heroRef} className="suppliers-hero suppliers-hero-compact">
        <div className="suppliers-hero-content">
          <div className="suppliers-hero-badge">
            <Factory size={16} />
            <span>For Indian Suppliers</span>
          </div>
          <h1 className="suppliers-hero-title">
            Win International Orders — <span className="suppliers-gradient-text">Without Export Risk</span>
          </h1>
          <p className="suppliers-hero-subtitle">
            Focus on your product. We handle buyers, inspections, logistics, customs & payments.
          </p>
          <div className="suppliers-hero-cta">
            <a href="https://vendor.aaziko.com" target="_blank" rel="noopener noreferrer" className="suppliers-btn-primary">
              <Package size={18} /> List Products
            </a>
            <Link to="/suppliers/get-verified" className="suppliers-btn-secondary">
              <BadgeCheck size={18} /> Get Verified
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Value Proposition - Icon Strip */}
      <section className="suppliers-value-strip">
        <div className="suppliers-container">
          <div className="suppliers-value-grid">
            {keyBenefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="suppliers-value-item"
              >
                <div className="suppliers-value-icon">
                  <item.icon size={22} />
                </div>
                <div className="suppliers-value-text">
                  <span className="suppliers-value-label">{item.label}</span>
                  <span className="suppliers-value-desc">{item.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Visual Flow */}
      <section className="suppliers-section suppliers-flow-section">
        <div className="suppliers-container">
          <div className="suppliers-section-header">
            <span className="suppliers-section-badge">How It Works</span>
            <h2 className="suppliers-section-title">Your Role vs Our Role</h2>
          </div>
          
          <div className="suppliers-flow-visual">
            {/* Your Focus */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="suppliers-flow-card suppliers-flow-you"
            >
              <div className="suppliers-flow-header">
                <Sparkles size={20} />
                <h3>You Focus On</h3>
              </div>
              <div className="suppliers-flow-items">
                {yourFocus.map((item, idx) => (
                  <div key={idx} className="suppliers-flow-item">
                    <item.icon size={18} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Arrow */}
            <div className="suppliers-flow-arrow">
              <ArrowRight size={32} />
            </div>

            {/* Aaziko Handles */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="suppliers-flow-card suppliers-flow-aaziko"
            >
              <div className="suppliers-flow-header">
                <Zap size={20} />
                <h3>Aaziko Handles</h3>
              </div>
              <div className="suppliers-flow-items suppliers-flow-items-grid">
                {keyBenefits.slice(0, 6).map((item, idx) => (
                  <div key={idx} className="suppliers-flow-item">
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who Is This For - Compact Cards */}
      <section className="suppliers-section suppliers-section-alt">
        <div className="suppliers-container">
          <div className="suppliers-section-header">
            <span className="suppliers-section-badge">Who This Is For</span>
            <h2 className="suppliers-section-title">Built For Indian Businesses</h2>
          </div>
          <div className="suppliers-who-grid suppliers-who-grid-compact">
            {whoIsFor.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="suppliers-who-card suppliers-who-card-compact"
              >
                <div className="suppliers-who-icon">
                  <item.icon size={24} />
                </div>
                <div className="suppliers-who-content">
                  <h3 className="suppliers-who-title">{item.title}</h3>
                  <p className="suppliers-who-desc">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    


 

      <Footer />
    </div>
  )
}

export default SuppliersOverview
