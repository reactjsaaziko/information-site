// Aaziko Custom House Agents (CHA) Page - Visual-First Design
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  FileText, Shield, Globe, CheckCircle, Clock,
  MapPin, Scale, Zap, Ship, FileSearch, Calculator,
  Anchor, ClipboardCheck, BadgeCheck, Headphones,
  FileCheck, BarChart3, Users
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './CustomHouseAgents.css'

const CustomHouseAgents = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cha-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.cha-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.cha-hero-visual', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, delay: 0.3 })
      gsap.fromTo('.cha-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="cha-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section - Visual First */}
      <section ref={heroRef} className="cha-hero">
        <div className="cha-hero-content">
          <div className="cha-hero-badge">
            <Scale size={16} />
            <span>Custom House Agents Partner Program</span>
          </div>
          <h1 className="cha-hero-title">
            Customs Clearance.<br />
            <span className="cha-gradient-text">Zero Confusion.</span>
          </h1>
          
          {/* Visual Hero Illustration */}
          <div className="cha-hero-visual">
            <div className="cha-globe-container">
              <div className="cha-globe">
                <Globe size={80} strokeWidth={1} />
              </div>
              <div className="cha-orbit cha-orbit-1">
                <div className="cha-orbit-icon"><FileText size={20} /></div>
              </div>
              <div className="cha-orbit cha-orbit-2">
                <div className="cha-orbit-icon"><Scale size={20} /></div>
              </div>
              <div className="cha-orbit cha-orbit-3">
                <div className="cha-orbit-icon"><Ship size={20} /></div>
              </div>
            </div>
            <div className="cha-hero-stats">
              <div className="cha-stat-item">
                <Shield size={24} />
                <span>Clarity</span>
              </div>
              <div className="cha-stat-item">
                <Zap size={24} />
                <span>Speed</span>
              </div>
              <div className="cha-stat-item">
                <CheckCircle size={24} />
                <span>Compliance</span>
              </div>
            </div>
          </div>

          <div className="cha-hero-cta">
            <Link to="/contact" className="cha-btn-primary">
              <Scale size={18} />
              Register as CHA Partner
            </Link>
            <button className="cha-btn-secondary">
              <MapPin size={18} />
              Add Ports & Coverage
            </button>
          </div>
        </div>
      </section>

      {/* What You Handle - Icon Grid */}
      <section className="cha-section">
        <div className="cha-container">
          <div className="cha-section-header">
            <span className="cha-section-badge">Your Role</span>
            <h2>What You Handle</h2>
          </div>
          
          <div className="cha-icon-grid">
            <motion.div 
              className="cha-icon-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="cha-icon-circle cha-icon-blue">
                <Ship size={32} />
              </div>
              <h4>Export & Import Clearance</h4>
              <p>India + destination country</p>
            </motion.div>
            
            <motion.div 
              className="cha-icon-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="cha-icon-circle cha-icon-green">
                <FileSearch size={32} />
              </div>
              <h4>HS Code Validation</h4>
              <p>Informational support</p>
            </motion.div>
            
            <motion.div 
              className="cha-icon-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="cha-icon-circle cha-icon-purple">
                <Calculator size={32} />
              </div>
              <h4>Duty & Tax Computation</h4>
              <p>As per declared data</p>
            </motion.div>
            
            <motion.div 
              className="cha-icon-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="cha-icon-circle cha-icon-orange">
                <Anchor size={32} />
              </div>
              <h4>Port Coordination</h4>
              <p>Terminals & authorities</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Aaziko - Visual Benefits */}
      <section className="cha-section cha-section-dark">
        <div className="cha-container">
          <div className="cha-section-header cha-header-light">
            <span className="cha-section-badge cha-badge-light">Why Aaziko</span>
            <h2>Work Smarter, Not Harder</h2>
          </div>
          
          <div className="cha-benefits-visual">
            <motion.div 
              className="cha-benefit-block"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="cha-benefit-icon">
                <FileText size={40} />
              </div>
              <div className="cha-benefit-content">
                <h3>Pre-Structured Orders</h3>
                <div className="cha-benefit-tags">
                  <span>Verified details</span>
                  <span>Product info</span>
                  <span>Ready docs</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="cha-benefit-block"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div className="cha-benefit-icon cha-icon-success">
                <ClipboardCheck size={40} />
              </div>
              <div className="cha-benefit-content">
                <h3>Clear Document Checklists</h3>
                <div className="cha-benefit-tags">
                  <span>No back-and-forth</span>
                  <span>Structured flow</span>
                  <span>Pre-validated</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="cha-benefit-block"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="cha-benefit-icon cha-icon-info">
                <Shield size={40} />
              </div>
              <div className="cha-benefit-content">
                <h3>Lower Rejection Risk</h3>
                <div className="cha-benefit-tags">
                  <span>Guided compliance</span>
                  <span>Fewer errors</span>
                  <span>Verified buyers</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="cha-benefit-block"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
            >
              <div className="cha-benefit-icon cha-icon-warning">
                <BarChart3 size={40} />
              </div>
              <div className="cha-benefit-content">
                <h3>Consistent Trade Volume</h3>
                <div className="cha-benefit-tags">
                  <span>Serious orders</span>
                  <span>Not random inquiries</span>
                  <span>Quality leads</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works - Visual Flow */}
      <section className="cha-section cha-section-alt">
        <div className="cha-container">
          <div className="cha-section-header">
            <span className="cha-section-badge">Process</span>
            <h2>How It Works</h2>
          </div>
          
          <div className="cha-flow-visual">
            <div className="cha-flow-line"></div>
            
            <motion.div 
              className="cha-flow-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="cha-flow-number">1</div>
              <div className="cha-flow-icon">
                <CheckCircle size={28} />
              </div>
              <span>Register as Licensed CHA</span>
            </motion.div>
            
            <motion.div 
              className="cha-flow-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div className="cha-flow-number">2</div>
              <div className="cha-flow-icon cha-flow-icon-info">
                <MapPin size={28} />
              </div>
              <span>Define Services & Ports</span>
            </motion.div>
            
            <motion.div 
              className="cha-flow-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="cha-flow-number">3</div>
              <div className="cha-flow-icon cha-flow-icon-success">
                <FileText size={28} />
              </div>
              <span>Receive Matched Orders</span>
            </motion.div>
          </div>
          
          {/* What You Receive */}
          <motion.div 
            className="cha-receive-box"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4>Each Order Includes:</h4>
            <div className="cha-receive-items">
              <div className="cha-receive-item">
                <CheckCircle size={20} />
                <span>Product & Shipment Data</span>
              </div>
              <div className="cha-receive-item">
                <CheckCircle size={20} />
                <span>Document Checklist</span>
              </div>
              <div className="cha-receive-item">
                <CheckCircle size={20} />
                <span>Timeline Expectations</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You Provide */}
      <section className="cha-section">
        <div className="cha-container">
          <div className="cha-section-header">
            <span className="cha-section-badge">Requirements</span>
            <h2>What You Provide</h2>
          </div>
          
          <div className="cha-provide-visual">
            <motion.div 
              className="cha-provide-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <BadgeCheck size={28} />
              <span>Valid CHA License</span>
            </motion.div>
            <motion.div 
              className="cha-provide-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <FileCheck size={28} />
              <span>Clear Service Scope</span>
            </motion.div>
            <motion.div 
              className="cha-provide-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <ClipboardCheck size={28} />
              <span>Accurate Filing</span>
            </motion.div>
            <motion.div 
              className="cha-provide-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Headphones size={28} />
              <span>Escalation Support</span>
            </motion.div>
          </div>
          
          {/* Stats Visual */}
          <div className="cha-stats-visual">
            <h4>Work with Verified Trade Partners</h4>
            <div className="cha-stats-grid">
              <div className="cha-stat-box">
                <div className="cha-stat-icon"><BadgeCheck size={32} /></div>
                <span className="cha-stat-value">100%</span>
                <span className="cha-stat-label">Verified Partners</span>
              </div>
              <div className="cha-stat-box">
                <div className="cha-stat-icon"><Clock size={32} /></div>
                <span className="cha-stat-value">50%</span>
                <span className="cha-stat-label">Faster Clearance</span>
              </div>
              <div className="cha-stat-box">
                <div className="cha-stat-icon"><Shield size={32} /></div>
                <span className="cha-stat-value">90%</span>
                <span className="cha-stat-label">Fewer Errors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      <Footer />
    </div>
  )
}

export default CustomHouseAgents
