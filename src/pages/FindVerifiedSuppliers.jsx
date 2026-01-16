// Find Verified Suppliers Page - Essential Content Only
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Send, CheckCircle, Shield, BadgeCheck, MessageSquare, 
  DollarSign, Truck, FileText, Globe, Star
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './FindVerifiedSuppliers.css'

const whyChooseUs = [
  { icon: BadgeCheck, title: 'Verified Suppliers', description: 'All suppliers are thoroughly vetted and verified for quality assurance.' },
  { icon: MessageSquare, title: 'Direct Communication', description: 'Connect directly with suppliers for faster negotiations.' },
  { icon: Shield, title: '100% Order Assurance', description: 'Your orders are protected with our secure payment system.' },
  { icon: Truck, title: 'End-to-End Logistics', description: 'Customs, shipping, inspection—all handled seamlessly.' }
]

const easySteps = [
  { step: 1, icon: FileText, title: 'Post Your RFQ', description: 'Submit your requirements and specifications.' },
  { step: 2, icon: MessageSquare, title: 'Receive Quotes', description: 'Verified suppliers respond with competitive quotes.' },
  { step: 3, icon: CheckCircle, title: 'Choose & Order', description: 'Select the best supplier and place your order.' }
]

const trustIndicators = [
  { icon: BadgeCheck, value: '500+', label: 'Verified Suppliers' },
  { icon: Globe, value: '50+', label: 'Countries Served' },
  { icon: Shield, value: '100%', label: 'Order Assurance' }
]

const FindVerifiedSuppliers = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.fvs-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.fvs-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.fvs-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="fvs-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="fvs-hero">
        <div className="fvs-hero-content">
          <div className="fvs-hero-badge">
            <BadgeCheck size={16} />
            <span>Verified Suppliers</span>
          </div>
          <h1 className="fvs-hero-title">
            Find the Right Supplier, <span className="fvs-gradient-text">Guaranteed</span>
          </h1>
          <p className="fvs-hero-subtitle">
            Connect with verified suppliers worldwide. Quality assured, secure payments, and end-to-end logistics support.
          </p>
          
          <div className="fvs-trust-bar">
            {trustIndicators.map((item, index) => (
              <div key={index} className="fvs-trust-item">
                <item.icon size={18} />
                <span className="fvs-trust-value">{item.value}</span>
                <span className="fvs-trust-label">{item.label}</span>
              </div>
            ))}
          </div>

          <Link to="/rfq" className="fvs-cta-btn">
            <Send size={18} />
            Post Your RFQ Now
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="fvs-section fvs-why-section">
        <div className="fvs-container">
          <h2 className="fvs-section-title">Why Choose Aaziko?</h2>
          <div className="fvs-benefits-grid">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                className="fvs-benefit-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="fvs-benefit-icon">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Easy Steps */}
      <section className="fvs-section">
        <div className="fvs-container">
          <h2 className="fvs-section-title">Get Started in 3 Easy Steps</h2>
          <div className="fvs-steps-grid">
            {easySteps.map((item, index) => (
              <motion.div
                key={index}
                className="fvs-step-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="fvs-step-number">{item.step}</div>
                <item.icon size={32} className="fvs-step-icon" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="fvs-cta-box">
            <h3>Ready to Find Your Perfect Supplier?</h3>
            <Link to="/rfq" className="fvs-cta-btn">
              <Send size={18} />
              Post Your RFQ Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FindVerifiedSuppliers
