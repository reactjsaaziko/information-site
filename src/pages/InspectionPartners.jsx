// Aaziko Inspection Partners Page - Visual-First Design
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Search, CheckCircle, Camera, FileText, Package, Scale,
  ClipboardCheck, Shield, Users, Eye, Clock,
  AlertTriangle, Award, Image, MapPin,
  Upload, Building2, Clipboard, Target,
  FileCheck, Box, Tag
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './InspectionPartners.css'

const InspectionPartners = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ip-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.ip-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.ip-hero-visual', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, delay: 0.3 })
      gsap.fromTo('.ip-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="ip-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section - Visual First */}
      <section ref={heroRef} className="ip-hero">
        <div className="ip-hero-content">
          <div className="ip-hero-badge">
            <Search size={16} />
            <span>Inspection Partner Program</span>
          </div>
          <h1 className="ip-hero-title">
            Verify Quality.<br />
            <span className="ip-gradient-text">Build Trust.</span>
          </h1>
          
          {/* Visual Hero Illustration */}
          <div className="ip-hero-visual">
            <div className="ip-inspect-container">
              <div className="ip-inspect-center">
                <Search size={60} strokeWidth={1.5} />
              </div>
              <div className="ip-orbit ip-orbit-1">
                <div className="ip-orbit-icon"><Eye size={20} /></div>
              </div>
              <div className="ip-orbit ip-orbit-2">
                <div className="ip-orbit-icon"><Shield size={20} /></div>
              </div>
              <div className="ip-orbit ip-orbit-3">
                <div className="ip-orbit-icon"><CheckCircle size={20} /></div>
              </div>
              <div className="ip-orbit ip-orbit-4">
                <div className="ip-orbit-icon"><Award size={20} /></div>
              </div>
            </div>
            <div className="ip-hero-stats">
              <div className="ip-stat-item">
                <Eye size={24} />
                <span>Transparent</span>
              </div>
              <div className="ip-stat-item">
                <Shield size={24} />
                <span>Buyer Confidence</span>
              </div>
              <div className="ip-stat-item">
                <CheckCircle size={24} />
                <span>Dispute Prevention</span>
              </div>
            </div>
          </div>

          <div className="ip-hero-cta">
            <Link to="/contact" className="ip-btn-primary">
              <Users size={18} />
              Apply as Partner
            </Link>
            <Link to="/partner-sop" className="ip-btn-secondary">
              <ClipboardCheck size={18} />
              View SOP
            </Link>
          </div>
        </div>
      </section>

      {/* What Inspection Covers - Icon Grid */}
      <section className="ip-section">
        <div className="ip-container">
          <div className="ip-section-header">
            <span className="ip-section-badge">Coverage</span>
            <h2>What Inspection Covers</h2>
          </div>
          
          <div className="ip-icon-grid">
            <motion.div 
              className="ip-icon-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="ip-icon-circle ip-icon-blue">
                <Scale size={32} />
              </div>
              <h4>Quantity Check</h4>
              <p>Count, weight, cartons & pallets</p>
            </motion.div>
            
            <motion.div 
              className="ip-icon-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="ip-icon-circle ip-icon-green">
                <CheckCircle size={32} />
              </div>
              <h4>Quality Check</h4>
              <p>Visual + basic checks as required</p>
            </motion.div>
            
            <motion.div 
              className="ip-icon-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="ip-icon-circle ip-icon-orange">
                <Tag size={32} />
              </div>
              <h4>Packing & Labels</h4>
              <p>Per buyer contract + destination rules</p>
            </motion.div>
            
            <motion.div 
              className="ip-icon-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="ip-icon-circle ip-icon-purple">
                <Camera size={32} />
              </div>
              <h4>Photo/Video Evidence</h4>
              <p>Inspection report for buyer review</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* When Inspections Are Used - Visual Benefits */}
      <section className="ip-section ip-section-dark">
        <div className="ip-container">
          <div className="ip-section-header ip-header-light">
            <span className="ip-section-badge ip-badge-light">Use Cases</span>
            <h2>When Inspections Are Used</h2>
          </div>
          
          <div className="ip-benefits-visual">
            <motion.div 
              className="ip-benefit-block"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="ip-benefit-icon">
                <Users size={40} />
              </div>
              <div className="ip-benefit-content">
                <h3>First-Time Orders</h3>
                <div className="ip-benefit-tags">
                  <span>New buyer-seller</span>
                  <span>Build trust</span>
                  <span>Verify quality</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="ip-benefit-block"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div className="ip-benefit-icon ip-icon-success">
                <Package size={40} />
              </div>
              <div className="ip-benefit-content">
                <h3>High-Value Shipments</h3>
                <div className="ip-benefit-tags">
                  <span>Bulk orders</span>
                  <span>Large investments</span>
                  <span>Risk protection</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="ip-benefit-block"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="ip-benefit-icon ip-icon-info">
                <ClipboardCheck size={40} />
              </div>
              <div className="ip-benefit-content">
                <h3>Category Compliance</h3>
                <div className="ip-benefit-tags">
                  <span>Product-specific</span>
                  <span>Extra checks</span>
                  <span>Standards</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who Can Join - Visual */}
      <section className="ip-section">
        <div className="ip-container">
          <div className="ip-section-header">
            <span className="ip-section-badge">Join Us</span>
            <h2>Who Can Join</h2>
          </div>
          
          <div className="ip-join-visual">
            <motion.div 
              className="ip-join-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Building2 size={28} />
              <span>Inspection Agencies</span>
            </motion.div>
            <motion.div 
              className="ip-join-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Users size={28} />
              <span>Field Inspectors</span>
            </motion.div>
            <motion.div 
              className="ip-join-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Clipboard size={28} />
              <span>Quality Teams</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works - Flow Visual */}
      <section className="ip-section ip-section-alt">
        <div className="ip-container">
          <div className="ip-section-header">
            <span className="ip-section-badge">Process</span>
            <h2>Your Workflow</h2>
          </div>
          
          <div className="ip-flow-visual">
            <motion.div 
              className="ip-flow-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="ip-flow-number">1</div>
              <div className="ip-flow-icon ip-flow-blue"><FileText size={32} /></div>
              <h4>Accept Request</h4>
              <p>Receive assignment</p>
            </motion.div>
            
            <div className="ip-flow-arrow">
              <svg viewBox="0 0 60 20"><path d="M0 10 L50 10 M40 5 L50 10 L40 15" /></svg>
            </div>
            
            <motion.div 
              className="ip-flow-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="ip-flow-number">2</div>
              <div className="ip-flow-icon ip-flow-cyan"><MapPin size={32} /></div>
              <h4>Visit Location</h4>
              <p>Factory or warehouse</p>
            </motion.div>
            
            <div className="ip-flow-arrow">
              <svg viewBox="0 0 60 20"><path d="M0 10 L50 10 M40 5 L50 10 L40 15" /></svg>
            </div>
            
            <motion.div 
              className="ip-flow-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="ip-flow-number">3</div>
              <div className="ip-flow-icon ip-flow-orange"><ClipboardCheck size={32} /></div>
              <h4>Follow SOP</h4>
              <p>Use checklist</p>
            </motion.div>
            
            <div className="ip-flow-arrow">
              <svg viewBox="0 0 60 20"><path d="M0 10 L50 10 M40 5 L50 10 L40 15" /></svg>
            </div>
            
            <motion.div 
              className="ip-flow-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="ip-flow-number">4</div>
              <div className="ip-flow-icon ip-flow-green"><Upload size={32} /></div>
              <h4>Upload Report</h4>
              <p>Submit evidence</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Buyers/Sellers Receive */}
      <section className="ip-section">
        <div className="ip-container">
          <div className="ip-section-header">
            <span className="ip-section-badge">Deliverables</span>
            <h2>What Buyers & Sellers Receive</h2>
          </div>
          
          <div className="ip-receive-visual">
            <motion.div 
              className="ip-receive-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="ip-receive-icon"><FileCheck size={36} /></div>
              <span>Inspection Report</span>
            </motion.div>
            <motion.div 
              className="ip-receive-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="ip-receive-icon"><Image size={36} /></div>
              <span>Time-Stamped Photos</span>
            </motion.div>
            <motion.div 
              className="ip-receive-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="ip-receive-icon"><Box size={36} /></div>
              <span>Packing Checklist</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Important Limits */}
      <section className="ip-section ip-section-alt">
        <div className="ip-container">
          <div className="ip-section-header">
            <span className="ip-section-badge ip-badge-warning">Important</span>
            <h2>Limits to Know</h2>
          </div>
          
          <div className="ip-limits-visual">
            <motion.div 
              className="ip-limit-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Clock size={24} />
              <span>Confirms condition at time of inspection only</span>
            </motion.div>
            <motion.div 
              className="ip-limit-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Target size={24} />
              <span>Results depend on product access + sampling scope</span>
            </motion.div>
            <motion.div 
              className="ip-limit-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <AlertTriangle size={24} />
              <span>Some lab tests/certificates are separate</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ip-cta-section">
        <div className="ip-container">
          <motion.div 
            className="ip-cta-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="ip-cta-visual">
              <div className="ip-cta-circle">
                <Users size={48} />
              </div>
            </div>
            <h3>Ready to Join?</h3>
            <p>Become part of Aaziko's trusted inspection network</p>
            <div className="ip-cta-buttons">
              <Link to="/contact" className="ip-btn-primary ip-btn-lg">
                <Users size={18} />
                Apply as Partner
              </Link>
              <Link to="/partner-sop" className="ip-btn-outline">
                <ClipboardCheck size={18} />
                View SOP
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default InspectionPartners
