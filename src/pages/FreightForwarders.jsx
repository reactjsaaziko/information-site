// Aaziko Freight Forwarders Page - Visual-First Design
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Ship, Plane, Truck, Globe, FileText, CheckCircle,
  Clock, DollarSign, MapPin, Package, Shield, Users,
  Route, Anchor, Container, BarChart3, Phone, Award, Zap,
  ArrowRight, Box, Navigation, Compass
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './FreightForwarders.css'

const FreightForwarders = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ff-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.ff-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.ff-hero-visual', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, delay: 0.3 })
      gsap.fromTo('.ff-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="ff-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section - Visual First */}
      <section ref={heroRef} className="ff-hero">
        <div className="ff-hero-content">
          <div className="ff-hero-badge">
            <Ship size={16} />
            <span>Freight Forwarders Partner Program</span>
          </div>
          <h1 className="ff-hero-title">
            Global Shipments.<br />
            <span className="ff-gradient-text">Zero Chaos.</span>
          </h1>
          
          {/* Visual Hero Illustration */}
          <div className="ff-hero-visual">
            <div className="ff-globe-container">
              <div className="ff-globe">
                <Globe size={80} strokeWidth={1} />
              </div>
              <div className="ff-orbit ff-orbit-1">
                <div className="ff-orbit-icon"><Ship size={20} /></div>
              </div>
              <div className="ff-orbit ff-orbit-2">
                <div className="ff-orbit-icon"><Plane size={20} /></div>
              </div>
              <div className="ff-orbit ff-orbit-3">
                <div className="ff-orbit-icon"><Truck size={20} /></div>
              </div>
            </div>
            <div className="ff-hero-stats">
              <div className="ff-stat-item">
                <FileText size={24} />
                <span>Clean Data</span>
              </div>
              <div className="ff-stat-item">
                <Shield size={24} />
                <span>Low Risk</span>
              </div>
              <div className="ff-stat-item">
                <CheckCircle size={24} />
                <span>Structured</span>
              </div>
            </div>
          </div>

          <div className="ff-hero-cta">
            <Link to="/contact" className="ff-btn-primary">
              <Ship size={18} />
              Join as Partner
            </Link>
            <button className="ff-btn-secondary">
              <Route size={18} />
              Add Your Routes
            </button>
          </div>
        </div>
      </section>

      {/* What You Do - Icon Grid */}
      <section className="ff-section">
        <div className="ff-container">
          <div className="ff-section-header">
            <span className="ff-section-badge">Your Role</span>
            <h2>What You Handle</h2>
          </div>
          
          <div className="ff-icon-grid">
            <motion.div 
              className="ff-icon-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="ff-icon-circle ff-icon-blue">
                <Ship size={32} />
              </div>
              <h4>Sea / Air / Multimodal</h4>
              <p>International freight coordination</p>
            </motion.div>
            
            <motion.div 
              className="ff-icon-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="ff-icon-circle ff-icon-green">
                <Route size={32} />
              </div>
              <h4>Port to Port</h4>
              <p>Export & import movement</p>
            </motion.div>
            
            <motion.div 
              className="ff-icon-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="ff-icon-circle ff-icon-purple">
                <Users size={32} />
              </div>
              <h4>Partner Network</h4>
              <p>Carriers, terminals & local agents</p>
            </motion.div>
            
            <motion.div 
              className="ff-icon-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="ff-icon-circle ff-icon-orange">
                <CheckCircle size={32} />
              </div>
              <h4>Milestone Alignment</h4>
              <p>Inspection, customs & delivery</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Aaziko - Visual Benefits */}
      <section className="ff-section ff-section-dark">
        <div className="ff-container">
          <div className="ff-section-header ff-header-light">
            <span className="ff-section-badge ff-badge-light">Why Aaziko</span>
            <h2>Work Smarter, Not Harder</h2>
          </div>
          
          <div className="ff-benefits-visual">
            <motion.div 
              className="ff-benefit-block"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="ff-benefit-icon">
                <FileText size={40} />
              </div>
              <div className="ff-benefit-content">
                <h3>Clean Shipment Data</h3>
                <div className="ff-benefit-tags">
                  <span>Weights</span>
                  <span>Volume</span>
                  <span>Incoterms</span>
                  <span>Ports</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="ff-benefit-block"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div className="ff-benefit-icon ff-icon-success">
                <Zap size={40} />
              </div>
              <div className="ff-benefit-content">
                <h3>Fewer Surprises</h3>
                <div className="ff-benefit-tags">
                  <span>No doc errors</span>
                  <span>Clear timelines</span>
                  <span>Pre-validated</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="ff-benefit-block"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="ff-benefit-icon ff-icon-info">
                <Shield size={40} />
              </div>
              <div className="ff-benefit-content">
                <h3>Lower Risk Orders</h3>
                <div className="ff-benefit-tags">
                  <span>Inspection linked</span>
                  <span>Compliance flow</span>
                  <span>Verified buyers</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

     

      {/* What You Provide - Compact Visual */}
      <section className="ff-section ff-section-alt">
        <div className="ff-container">
          <div className="ff-section-header">
            <span className="ff-section-badge">Expectations</span>
            <h2>What We Need From You</h2>
          </div>
          
          <div className="ff-provide-visual">
            <motion.div 
              className="ff-provide-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <DollarSign size={28} />
              <span>Transparent Pricing</span>
            </motion.div>
            <motion.div 
              className="ff-provide-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Clock size={28} />
              <span>Clear Timelines</span>
            </motion.div>
            <motion.div 
              className="ff-provide-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <MapPin size={28} />
              <span>Tracking Updates</span>
            </motion.div>
            <motion.div 
              className="ff-provide-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Phone size={28} />
              <span>Single Contact</span>
            </motion.div>
          </div>
          
          {/* Freight Modes Visual */}
          <div className="ff-modes-visual">
            <h4>Supported Freight Modes</h4>
            <div className="ff-modes-grid">
              <div className="ff-mode-item">
                <div className="ff-mode-icon"><Ship size={36} /></div>
                <span>Sea</span>
              </div>
              <div className="ff-mode-item">
                <div className="ff-mode-icon"><Plane size={36} /></div>
                <span>Air</span>
              </div>
              <div className="ff-mode-item">
                <div className="ff-mode-icon"><Truck size={36} /></div>
                <span>Road</span>
              </div>
              <div className="ff-mode-item">
                <div className="ff-mode-icon"><Container size={36} /></div>
                <span>Multimodal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      <Footer />
    </div>
  )
}

export default FreightForwarders
