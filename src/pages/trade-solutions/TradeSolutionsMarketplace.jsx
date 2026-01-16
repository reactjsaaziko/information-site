// Trade Solutions - Marketplace Page
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Store, Search, FileText, CheckCircle, Eye,
  Building, Package, Shield, ClipboardCheck,
  Truck, Globe, BadgeCheck, Headphones
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AnimatedBackground from '../../components/ui/AnimatedBackground'
import './TradeSolutions.css'

const whatYouCanDo = [
  'Search products by category, specs, MOQ, and target country',
  'View supplier profiles with clear capability, documents, and product details',
  'Request quotes or respond via LSQ requirements',
  'Move from inquiry → confirmation with clear steps and support'
]

const whyItFeelsSafer = [
  { icon: FileText, text: 'Clear product data + organized supplier information' },
  { icon: Eye, text: 'Optional inspection-backed evidence where needed' },
  { icon: Truck, text: 'Logistics + customs guidance handled through Aaziko flow' },
  { icon: Shield, text: 'Transparent process that reduces broker risk and unclear commitments' }
]

const TradeSolutionsMarketplace = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ts-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.ts-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.ts-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.ts-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="ts-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="ts-hero">
        <div className="ts-hero-content">
          <div className="ts-hero-badge">
            <Store size={16} />
            <span>Trade Solutions → Marketplace</span>
          </div>
          <h1 className="ts-hero-title">
            Marketplace that makes India sourcing{' '}
            <span className="ts-gradient-text">easy, transparent, and trustful</span>
          </h1>
          <p className="ts-hero-subtitle">
            Discover Indian manufacturers, compare options, and place orders with 100% Assurance backed by Aaziko's structured trade process.
          </p>
          <div className="ts-hero-cta">
            <Link to="/rfq" className="ts-btn-primary">
              <Search size={18} />
              Search Products
            </Link>
            <Link to="/rfq" className="ts-btn-secondary">
              <FileText size={18} />
              Post Your Requirement
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1: What you can do here */}
      <section className="ts-section">
        <div className="ts-container">
          <div className="ts-section-header">
            <span className="ts-section-badge">Features</span>
            <h2 className="ts-section-title">What you can do here</h2>
          </div>
          <div className="ts-features-list">
            {whatYouCanDo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="ts-feature-item"
              >
                <CheckCircle size={20} />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Why this marketplace feels safer */}
      <section className="ts-section ts-section-alt">
        <div className="ts-container">
          <div className="ts-section-header">
            <span className="ts-section-badge">Trust</span>
            <h2 className="ts-section-title">Why this marketplace feels safer</h2>
          </div>
          <div className="ts-cards-grid">
            {whyItFeelsSafer.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="ts-card"
              >
                <div className="ts-card-icon">
                  <item.icon size={24} />
                </div>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <Footer />
    </div>
  )
}

export default TradeSolutionsMarketplace
