// Aaziko Logistics Page - Clean Visual Design
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Truck, Ship, Plane, Package, FileText, Clock,
  Shield, Eye, CheckCircle, Globe, MapPin,
  Zap, Users, Headphones, ArrowRight, ArrowDown,
  Building2, Factory, BadgeCheck, Container,
  Calculator, Navigation, Sparkles
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './Logistics.css'

const trustStrip = [
  { icon: Eye, text: 'Real-time Tracking' },
  { icon: FileText, text: 'Document Support' },
  { icon: Shield, text: 'Insured Shipments' }
]

const transportModes = [
  { 
    icon: Ship, 
    title: 'Sea Freight', 
    time: '25-40 days',
    best: 'Bulk cargo',
    color: 'primary'
  },
  { 
    icon: Plane, 
    title: 'Air Freight', 
    time: '3-7 days',
    best: 'Urgent orders',
    color: 'info'
  },
  { 
    icon: Truck, 
    title: 'Road Transport', 
    time: 'Varies',
    best: 'Regional',
    color: 'success'
  },
  { 
    icon: Container, 
    title: 'Multimodal', 
    time: 'Custom',
    best: 'Complex routes',
    color: 'warning'
  }
]

const journeySteps = [
  { step: 1, icon: Calculator, title: 'Get Quote', desc: 'Enter cargo details', color: 'primary' },
  { step: 2, icon: FileText, title: 'Book & Docs', desc: 'Confirm & upload', color: 'info' },
  { step: 3, icon: Building2, title: 'Customs', desc: 'Clearance handled', color: 'success' },
  { step: 4, icon: Navigation, title: 'Track', desc: 'Real-time updates', color: 'warning' },
  { step: 5, icon: CheckCircle, title: 'Delivered', desc: 'Confirmed receipt', color: 'purple' }
]

const benefits = [
  { icon: Zap, title: 'Fast Quotes', desc: 'Compare rates in 48 hours' },
  { icon: Eye, title: 'Full Visibility', desc: 'Track every milestone' },
  { icon: FileText, title: 'Auto Documents', desc: 'Compliance-ready paperwork' },
  { icon: Shield, title: 'Cargo Insurance', desc: 'Protected shipments' }
]

const audiences = [
  {
    icon: Factory,
    title: 'First-time Exporters',
    points: ['Step-by-step guidance', 'Document templates', 'Customs support'],
    color: 'primary'
  },
  {
    icon: Globe,
    title: 'Global Buyers',
    points: ['End-to-end visibility', 'Integrated tracking', 'Delivery assurance'],
    color: 'info'
  },
  {
    icon: Package,
    title: 'Regular Shippers',
    points: ['Volume discounts', 'Priority booking', 'Dedicated support'],
    color: 'success'
  }
]

const Logistics = () => {
  const heroRef = useRef(null)
  const [activeMode, setActiveMode] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.log-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.log-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.log-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.3 })
      gsap.fromTo('.log-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.4 })
      gsap.fromTo('.log-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="log-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="log-hero">
        <div className="log-hero-content">
          <div className="log-hero-badge">
            <Ship size={14} />
            <span>Aaziko Logistics</span>
          </div>
          <h1 className="log-hero-title">
            Ship from India <span className="log-gradient">Worldwide</span>
          </h1>
          <p className="log-hero-subtitle">
            Compare rates, track shipments, handle customs — all in one place.
          </p>

          <div className="log-hero-cta">
            <Link to="/logistics/quote" className="log-btn-primary">
              <Ship size={18} />
              Get Shipping Quote
              <ArrowRight size={16} />
            </Link>
            <button className="log-btn-secondary">
              <Headphones size={18} />
              Talk to Expert
            </button>
          </div>

          <div className="log-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="log-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="log-container">
        {/* Transport Modes - Interactive */}
        <section className="log-section">
          <div className="log-section-header">
            <span className="log-badge">Shipping Options</span>
            <h2>Choose Your Mode</h2>
          </div>

          <div className="log-modes-wrapper">
            <div className="log-modes-tabs">
              {transportModes.map((mode, index) => (
                <button
                  key={index}
                  className={`log-mode-tab ${activeMode === index ? 'active' : ''} log-mode-${mode.color}`}
                  onClick={() => setActiveMode(index)}
                >
                  <mode.icon size={20} />
                  <span>{mode.title}</span>
                </button>
              ))}
            </div>

            <motion.div
              key={activeMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`log-mode-detail log-mode-detail-${transportModes[activeMode].color}`}
            >
              <div className="log-mode-icon-large">
                {(() => {
                  const Icon = transportModes[activeMode].icon
                  return <Icon size={48} strokeWidth={1.5} />
                })()}
              </div>
              <div className="log-mode-info">
                <h3>{transportModes[activeMode].title}</h3>
                <div className="log-mode-stats">
                  <div className="log-mode-stat">
                    <Clock size={16} />
                    <span>{transportModes[activeMode].time}</span>
                  </div>
                  <div className="log-mode-stat">
                    <Package size={16} />
                    <span>Best for: {transportModes[activeMode].best}</span>
                  </div>
                </div>
              </div>
              <Link to="/logistics/quote" className="log-btn-outline">
                Get Quote <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Journey Steps - Visual Flow */}
        <section className="log-section log-section-alt">
          <div className="log-section-header">
            <span className="log-badge">How It Works</span>
            <h2>Your Shipping Journey</h2>
          </div>

          <div className="log-journey">
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="log-journey-step"
              >
                <div className={`log-journey-icon log-journey-${step.color}`}>
                  <step.icon size={24} />
                  <span className="log-journey-num">{step.step}</span>
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
                {index < journeySteps.length - 1 && (
                  <div className="log-journey-connector">
                    <ArrowRight size={16} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="log-section">
          <div className="log-section-header">
            <span className="log-badge">Why Aaziko</span>
            <h2>What You Get</h2>
          </div>

          <div className="log-benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="log-benefit-card"
              >
                <div className="log-benefit-icon">
                  <benefit.icon size={28} />
                </div>
                <h4>{benefit.title}</h4>
                <p>{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Audience Cards */}
        <section className="log-section log-section-alt">
          <div className="log-section-header">
            <span className="log-badge">Who We Serve</span>
            <h2>Built For You</h2>
          </div>

          <div className="log-audience-grid">
            {audiences.map((aud, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`log-audience-card log-audience-${aud.color}`}
              >
                <div className="log-audience-icon">
                  <aud.icon size={32} />
                </div>
                <h4>{aud.title}</h4>
                <ul>
                  {aud.points.map((point, i) => (
                    <li key={i}>
                      <CheckCircle size={14} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Partner CTA */}
        <section className="log-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="log-partner-card"
          >
            <div className="log-partner-icon">
              <Users size={28} />
            </div>
            <div className="log-partner-content">
              <h3>Are you a Freight Forwarder or CHA?</h3>
              <p>Join our network to receive verified shipment requests.</p>
            </div>
            <Link to="/partners/logistics" className="log-btn-outline">
              <BadgeCheck size={18} />
              Join as Partner
            </Link>
          </motion.div>
        </section>
      </div>

  

      <Footer />
    </div>
  )
}

export default Logistics
