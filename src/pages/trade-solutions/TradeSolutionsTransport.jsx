// Trade Solutions - Transport Page
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Truck, Ship, Package, CheckCircle, Eye,
  Calculator, DollarSign, Navigation, Headphones,
  MapPin, Clock, FileText
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AnimatedBackground from '../../components/ui/AnimatedBackground'
import './TradeSolutions.css'

const whatAazikoHandles = [
  'Pickup planning and shipment coordination',
  'Route selection support (road/rail/air/sea as applicable)',
  'Packaging and shipping readiness guidance',
  'Tracking updates and shipment visibility'
]

const tools = [
  {
    icon: Calculator,
    title: 'Load Calculator',
    description: 'Estimate vehicle/container needs based on cargo type, volume, and packing style',
    benefit: 'Helps avoid under/over booking and reduces last-minute cost surprises'
  },
  {
    icon: DollarSign,
    title: 'Freight Calculator',
    description: 'Door-to-door cost view (origin → port → destination → last mile)',
    benefit: 'Compare multiple shipping options and choose the best fit for time/cost'
  }
]

const TradeSolutionsTransport = () => {
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
            <Truck size={16} />
            <span>Trade Solutions → Transport</span>
          </div>
          <h1 className="ts-hero-title">
            Transport made simple—<span className="ts-gradient-text">pricing clarity + tracking</span>
          </h1>
          <p className="ts-hero-subtitle">
            Aaziko coordinates shipping so your order moves smoothly with guided documents, clear cost breakdowns, and live tracking.
          </p>
          <div className="ts-hero-cta">
            <Link to="/logistics/quote" className="ts-btn-primary">
              <Ship size={18} />
              Get Shipping Quote
            </Link>
            <button className="ts-btn-secondary">
              <Headphones size={18} />
              Talk to Logistics Expert
            </button>
          </div>
        </div>
      </section>

      {/* Section 1: What Aaziko handles */}
      <section className="ts-section">
        <div className="ts-container">
          <div className="ts-section-header">
            <span className="ts-section-badge">Services</span>
            <h2 className="ts-section-title">What Aaziko handles</h2>
          </div>
          <div className="ts-features-list">
            {whatAazikoHandles.map((item, index) => (
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

      {/* Section 2: Tools */}
      <section className="ts-section ts-section-alt">
        <div className="ts-container">
          <div className="ts-section-header">
            <span className="ts-section-badge">Tools</span>
            <h2 className="ts-section-title">Tools to help you plan</h2>
          </div>
          <div className="ts-tools-grid">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="ts-tool-card"
              >
                <div className="ts-tool-icon">
                  <tool.icon size={28} />
                </div>
                <h4>{tool.title}</h4>
                <p className="ts-tool-desc">{tool.description}</p>
                <p className="ts-tool-benefit">{tool.benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      <Footer />
    </div>
  )
}

export default TradeSolutionsTransport
