// Trade Solutions - API & Integrations Page
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Code, Zap, CheckCircle, Package,
  FileText, Bell, Users, Headphones,
  Building, Eye, Globe
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AnimatedBackground from '../../components/ui/AnimatedBackground'
import './TradeSolutions.css'

const whatYouCanIntegrate = [
  'Product/catalog updates',
  'Order status + shipment tracking events',
  'Document references (where applicable)',
  'Notifications and operational reporting'
]

const whoItsFor = [
  { icon: Globe, title: 'High-volume buyers', desc: 'Managing repeated sourcing' },
  { icon: Building, title: 'Sellers with ERP/catalog systems', desc: 'Sync products and orders' },
  { icon: Users, title: 'Partners', desc: 'Who need structured order events and tracking visibility' }
]

const TradeSolutionsAPI = () => {
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
            <Code size={16} />
            <span>Trade Solutions → API & Integrations</span>
          </div>
          <h1 className="ts-hero-title">
            Integrate trade workflows{' '}
            <span className="ts-gradient-text">into your systems</span>
          </h1>
          <p className="ts-hero-subtitle">
            Use Aaziko integrations to streamline product sync, order updates, and operational visibility—while keeping the trade process transparent and trackable.
          </p>
          <div className="ts-hero-cta">
            <Link to="/api/docs" className="ts-btn-primary">
              <Eye size={18} />
              View API Overview
            </Link>
            <button className="ts-btn-secondary">
              <Headphones size={18} />
              Contact Integration Team
            </button>
          </div>
        </div>
      </section>

      {/* Section 1: What you can integrate */}
      <section className="ts-section">
        <div className="ts-container">
          <div className="ts-section-header">
            <span className="ts-section-badge">Capabilities</span>
            <h2 className="ts-section-title">What you can integrate</h2>
          </div>
          <div className="ts-features-list">
            {whatYouCanIntegrate.map((item, index) => (
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

      {/* Section 2: Who it's for */}
      <section className="ts-section ts-section-alt">
        <div className="ts-container">
          <div className="ts-section-header">
            <span className="ts-section-badge">Audience</span>
            <h2 className="ts-section-title">Who it's for</h2>
          </div>
          <div className="ts-audience-grid">
            {whoItsFor.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="ts-audience-card"
              >
                <div className="ts-audience-icon">
                  <item.icon size={28} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="ts-cta-section">
        <div className="ts-container">
          <div className="ts-cta-card">
            <div className="ts-cta-content">
              <h3>Need integrations?</h3>
              <p>Request API access and discuss your use case.</p>
            </div>
            <div className="ts-cta-buttons">
              <Link to="/api/docs" className="ts-btn-primary ts-btn-lg">
                <Eye size={18} />
                View API Overview
              </Link>
              <button className="ts-btn-secondary">
                <Headphones size={18} />
                Contact Integration Team
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default TradeSolutionsAPI
