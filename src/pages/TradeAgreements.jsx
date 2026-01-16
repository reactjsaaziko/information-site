// Trade Agreements (Basics) Page - Visual Design
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Scale, Percent, FileText, Globe, XCircle, CheckCircle,
  Tag, FileCheck, AlertTriangle, ArrowRight, ArrowDown,
  Shield, BookOpen, Package, HelpCircle
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './TradeAgreements.css'

const TradeAgreements = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ta-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.ta-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.ta-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="ta-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="ta-hero">
        <div className="ta-hero-content">
          <div className="ta-hero-badge">
            <Scale size={16} />
            <span>Trade Agreements Basics</span>
          </div>
          <h1 className="ta-hero-title">
            Lower Duty. <span className="ta-gradient-text">Smarter Trade.</span>
          </h1>
          <p className="ta-hero-subtitle">
            How FTAs & PTAs can reduce your import costs
          </p>
        </div>
      </section>



      {/* 3 Key Concepts - Visual Flow */}
      <section className="ta-section ta-section-alt">
        <div className="ta-container">
          <h2 className="ta-visual-title">3 Things That Matter</h2>
          
          <div className="ta-flow-vertical">
            <motion.div 
              className="ta-flow-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="ta-flow-number">1</div>
              <div className="ta-flow-icon">
                <Tag size={28} />
              </div>
              <div className="ta-flow-content">
                <h3>HS Code</h3>
                <p>Wrong code = wrong duty</p>
              </div>
            </motion.div>

            <div className="ta-flow-connector">
              <ArrowDown size={24} />
            </div>

            <motion.div 
              className="ta-flow-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div className="ta-flow-number">2</div>
              <div className="ta-flow-icon">
                <Globe size={28} />
              </div>
              <div className="ta-flow-content">
                <h3>Country of Origin</h3>
                <p>Must meet Rules of Origin (RoO)</p>
                <div className="ta-mini-tags">
                  <span>Wholly obtained</span>
                  <span>Substantial transformation</span>
                  <span>Value addition</span>
                </div>
              </div>
            </motion.div>

            <div className="ta-flow-connector">
              <ArrowDown size={24} />
            </div>

            <motion.div 
              className="ta-flow-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="ta-flow-number">3</div>
              <div className="ta-flow-icon">
                <FileCheck size={28} />
              </div>
              <div className="ta-flow-content">
                <h3>Proof Required</h3>
                <p>Certificate of Origin + supporting docs</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Buyer vs Seller - Side by Side */}
      <section className="ta-section">
        <div className="ta-container">
          <h2 className="ta-visual-title">Quick Checklist</h2>
          
          <div className="ta-split-grid">
            <motion.div 
              className="ta-split-card ta-split-buyer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="ta-split-header">
                <Package size={24} />
                <h3>Buyers Ask</h3>
              </div>
              <ul className="ta-check-list">
                <li><CheckCircle size={16} /> HS code correct?</li>
                <li><CheckCircle size={16} /> Origin declared?</li>
                <li><CheckCircle size={16} /> FTA eligible?</li>
                <li><CheckCircle size={16} /> COO type needed?</li>
                <li><CheckCircle size={16} /> Special permits?</li>
              </ul>
            </motion.div>

            <motion.div 
              className="ta-split-card ta-split-seller"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="ta-split-header">
                <FileText size={24} />
                <h3>Sellers Prepare</h3>
              </div>
              <ul className="ta-check-list">
                <li><CheckCircle size={16} /> Correct HS code</li>
                <li><CheckCircle size={16} /> Manufacturing location</li>
                <li><CheckCircle size={16} /> Origin proof</li>
                <li><CheckCircle size={16} /> COO document</li>
                <li><CheckCircle size={16} /> Invoice trail & BOM</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Common Mistakes - Visual Warning */}
      <section className="ta-section ta-section-alt">
        <div className="ta-container">
          <h2 className="ta-visual-title ta-title-warning">
            <AlertTriangle size={28} />
            Avoid These Mistakes
          </h2>
          
          <div className="ta-mistakes-visual">
            <motion.div 
              className="ta-mistake-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <XCircle size={18} />
              <span>FTA claim without correct COO</span>
            </motion.div>
            <motion.div 
              className="ta-mistake-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <XCircle size={18} />
              <span>COO doesn't match invoice</span>
            </motion.div>
            <motion.div 
              className="ta-mistake-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <XCircle size={18} />
              <span>Wrong HS code</span>
            </motion.div>
            <motion.div 
              className="ta-mistake-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <XCircle size={18} />
              <span>Assembly ≠ Origin</span>
            </motion.div>
            <motion.div 
              className="ta-mistake-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <XCircle size={18} />
              <span>Missing origin docs at clearance</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simple Example - Visual Flow */}
      <section className="ta-section">
        <div className="ta-container">
          <h2 className="ta-visual-title">How It Works</h2>
          
          <motion.div 
            className="ta-example-flow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="ta-example-step">
              <div className="ta-example-icon">
                <Package size={24} />
              </div>
              <span>Import from India</span>
            </div>
            <ArrowRight size={24} className="ta-example-arrow" />
            <div className="ta-example-step">
              <div className="ta-example-icon">
                <HelpCircle size={24} />
              </div>
              <span>Customs checks</span>
            </div>
            <ArrowRight size={24} className="ta-example-arrow" />
            <div className="ta-example-questions-box">
              <div className="ta-q-item">HS code eligible?</div>
              <div className="ta-q-item">Origin rules met?</div>
              <div className="ta-q-item">COO valid?</div>
            </div>
            <ArrowRight size={24} className="ta-example-arrow" />
            <div className="ta-example-outcomes">
              <div className="ta-outcome ta-outcome-success">
                <CheckCircle size={18} />
                <span>Lower duty</span>
              </div>
              <div className="ta-outcome ta-outcome-fail">
                <XCircle size={18} />
                <span>Normal duty + delay</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documents - Simple Icons */}
      <section className="ta-section ta-section-alt">
        <div className="ta-container">
          <h2 className="ta-visual-title">Key Documents</h2>
          
          <div className="ta-docs-visual">
            <motion.div 
              className="ta-doc-icon-item"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <FileText size={28} />
              <span>Commercial Invoice</span>
            </motion.div>
            <motion.div 
              className="ta-doc-icon-item"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <FileText size={28} />
              <span>Packing List</span>
            </motion.div>
            <motion.div 
              className="ta-doc-icon-item"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <FileText size={28} />
              <span>Bill of Lading</span>
            </motion.div>
            <motion.div 
              className="ta-doc-icon-item ta-doc-highlight"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <FileCheck size={28} />
              <span>Certificate of Origin</span>
            </motion.div>
            <motion.div 
              className="ta-doc-icon-item"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <FileText size={28} />
              <span>BOM (if required)</span>
            </motion.div>
          </div>
        </div>
      </section>

     

      <Footer />
    </div>
  )
}

export default TradeAgreements
