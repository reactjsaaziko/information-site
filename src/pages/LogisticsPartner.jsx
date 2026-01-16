// Aaziko Logistics Partner Page - Visual & Graphical Design
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Truck, Ship, Plane, Package, MapPin, FileText,
  DollarSign, Clock, Users, Globe,
  Zap, BarChart3, Shield, Route, Calculator, Phone
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './LogisticsPartner.css'

const LogisticsPartner = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.lp-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.lp-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.lp-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.lp-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="lp-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section with Visual Elements */}
      <section ref={heroRef} className="lp-hero">
        <div className="lp-hero-visual">
          <div className="lp-hero-globe">
            <Globe size={120} strokeWidth={0.8} />
            <div className="lp-orbit lp-orbit-1"><Truck size={24} /></div>
            <div className="lp-orbit lp-orbit-2"><Ship size={24} /></div>
            <div className="lp-orbit lp-orbit-3"><Plane size={24} /></div>
          </div>
        </div>
        <div className="lp-hero-content">
          <div className="lp-hero-badge">
            <Truck size={16} />
            <span>Logistics Partner Program</span>
          </div>
          <h1 className="lp-hero-title">
            Connect with <span className="lp-gradient-text">Global Trade Orders</span>
          </h1>
          <p className="lp-hero-subtitle">
            Get verified export-import leads with clear requirements. Door-to-door shipping made simple.
          </p>
          <div className="lp-hero-cta">
            <Link to="/register-logistics" className="lp-btn-primary">
              <Users size={18} />
              Join as Partner
            </Link>
            <Link to="/list-routes" className="lp-btn-secondary">
              <Route size={18} />
              List Routes
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Stats Strip */}
      <section className="lp-stats-strip">
        <motion.div 
          className="lp-stat-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="lp-stat-icon lp-stat-blue"><Zap size={28} /></div>
          <div className="lp-stat-info">
            <span className="lp-stat-value">Faster</span>
            <span className="lp-stat-label">Quoting</span>
          </div>
        </motion.div>
        <motion.div 
          className="lp-stat-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="lp-stat-icon lp-stat-green"><BarChart3 size={28} /></div>
          <div className="lp-stat-info">
            <span className="lp-stat-value">Better</span>
            <span className="lp-stat-label">Conversions</span>
          </div>
        </motion.div>
        <motion.div 
          className="lp-stat-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="lp-stat-icon lp-stat-purple"><Shield size={28} /></div>
          <div className="lp-stat-info">
            <span className="lp-stat-value">Fewer</span>
            <span className="lp-stat-label">Disputes</span>
          </div>
        </motion.div>
        <motion.div 
          className="lp-stat-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="lp-stat-icon lp-stat-orange"><Globe size={28} /></div>
          <div className="lp-stat-info">
            <span className="lp-stat-value">Global</span>
            <span className="lp-stat-label">Trade Leads</span>
          </div>
        </motion.div>
      </section>

      {/* Services Visual Grid */}
      <section className="lp-services">
        <div className="lp-container">
          <div className="lp-section-header">
            <span className="lp-badge">Your Services</span>
            <h2>What You Can Offer</h2>
          </div>
          
          <div className="lp-services-visual">
            <motion.div 
              className="lp-service-hub"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="lp-hub-center">
                <Package size={40} />
                <span>Your Services</span>
              </div>
              
              <div className="lp-service-node lp-node-1">
                <div className="lp-node-icon"><Truck size={24} /></div>
                <span>Pickup & Delivery</span>
              </div>
              
              <div className="lp-service-node lp-node-2">
                <div className="lp-node-icon"><Ship size={24} /></div>
                <span>Sea Freight</span>
              </div>
              
              <div className="lp-service-node lp-node-3">
                <div className="lp-node-icon"><Plane size={24} /></div>
                <span>Air Freight</span>
              </div>
              
              <div className="lp-service-node lp-node-4">
                <div className="lp-node-icon"><MapPin size={24} /></div>
                <span>Port Handling</span>
              </div>
              
              <svg className="lp-connections" viewBox="0 0 400 400">
                <line x1="200" y1="200" x2="200" y2="50" className="lp-conn-line" />
                <line x1="200" y1="200" x2="350" y2="200" className="lp-conn-line" />
                <line x1="200" y1="200" x2="200" y2="350" className="lp-conn-line" />
                <line x1="200" y1="200" x2="50" y2="200" className="lp-conn-line" />
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works - Visual Flow */}
      <section className="lp-flow-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <span className="lp-badge">Process</span>
            <h2>How It Works</h2>
          </div>
          
          <div className="lp-flow-visual">
            <motion.div 
              className="lp-flow-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="lp-flow-number">1</div>
              <div className="lp-flow-icon lp-flow-blue"><Users size={32} /></div>
              <h4>Register</h4>
              <p>Create partner account</p>
            </motion.div>
            
            <div className="lp-flow-arrow">
              <svg viewBox="0 0 60 20"><path d="M0 10 L50 10 M40 5 L50 10 L40 15" /></svg>
            </div>
            
            <motion.div 
              className="lp-flow-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="lp-flow-number">2</div>
              <div className="lp-flow-icon lp-flow-orange"><Route size={32} /></div>
              <h4>List Lanes</h4>
              <p>Add routes & pricing</p>
            </motion.div>
            
            <div className="lp-flow-arrow">
              <svg viewBox="0 0 60 20"><path d="M0 10 L50 10 M40 5 L50 10 L40 15" /></svg>
            </div>
            
            <motion.div 
              className="lp-flow-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="lp-flow-number">3</div>
              <div className="lp-flow-icon lp-flow-cyan"><BarChart3 size={32} /></div>
              <h4>Get Shown</h4>
              <p>Appear in order flow</p>
            </motion.div>
            
            <div className="lp-flow-arrow">
              <svg viewBox="0 0 60 20"><path d="M0 10 L50 10 M40 5 L50 10 L40 15" /></svg>
            </div>
            
            <motion.div 
              className="lp-flow-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="lp-flow-number">4</div>
              <div className="lp-flow-icon lp-flow-green"><DollarSign size={32} /></div>
              <h4>Get Orders</h4>
              <p>Connect with buyers</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Buyers See - Visual Display */}
      <section className="lp-display-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <span className="lp-badge">Visibility</span>
            <h2>What Buyers See</h2>
          </div>
          
          <motion.div 
            className="lp-display-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="lp-display-header">
              <div className="lp-display-dots">
                <span></span><span></span><span></span>
              </div>
              <span>Order Logistics Options</span>
            </div>
            <div className="lp-display-content">
              <div className="lp-display-row">
                <div className="lp-display-icon"><DollarSign size={20} /></div>
                <div className="lp-display-info">
                  <span className="lp-display-label">Total Cost</span>
                  <span className="lp-display-value">Door-to-door estimate</span>
                </div>
                <div className="lp-display-visual">
                  <div className="lp-bar lp-bar-1"></div>
                </div>
              </div>
              <div className="lp-display-row">
                <div className="lp-display-icon"><Clock size={20} /></div>
                <div className="lp-display-info">
                  <span className="lp-display-label">Transit Time</span>
                  <span className="lp-display-value">Mode options available</span>
                </div>
                <div className="lp-display-visual">
                  <div className="lp-bar lp-bar-2"></div>
                </div>
              </div>
              <div className="lp-display-row">
                <div className="lp-display-icon"><FileText size={20} /></div>
                <div className="lp-display-info">
                  <span className="lp-display-label">Cost Breakdown</span>
                  <span className="lp-display-value">Freight, local, terminal</span>
                </div>
                <div className="lp-display-visual">
                  <div className="lp-bar lp-bar-3"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Requirements - Icon Grid */}
      <section className="lp-requirements">
        <div className="lp-container">
          <div className="lp-section-header">
            <span className="lp-badge">Requirements</span>
            <h2>What You Provide</h2>
          </div>
          
          <div className="lp-req-grid">
            <motion.div 
              className="lp-req-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="lp-req-icon"><Calculator size={28} /></div>
              <span>Accurate Pricing</span>
            </motion.div>
            <motion.div 
              className="lp-req-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="lp-req-icon"><MapPin size={28} /></div>
              <span>Service Coverage</span>
            </motion.div>
            <motion.div 
              className="lp-req-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="lp-req-icon"><FileText size={28} /></div>
              <span>Document Checklist</span>
            </motion.div>
            <motion.div 
              className="lp-req-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="lp-req-icon"><Phone size={28} /></div>
              <span>Escalation Contact</span>
            </motion.div>
          </div>
        </div>
      </section>

      

      <Footer />
    </div>
  )
}

export default LogisticsPartner
