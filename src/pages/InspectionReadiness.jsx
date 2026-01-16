// Inspection Readiness Page - Aaziko Premium 3D Light Theme
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  ClipboardCheck, ArrowRight, CheckCircle, AlertTriangle,
  Package, Camera, FileText, Box, Tag, Scale,
  Factory, Shield, Eye, Zap, MessageSquare, Headphones,
  ListChecks, Award, XCircle, Clock, BadgeCheck
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './InspectionReadiness.css'

const whyInspectionMatters = [
  { icon: Award, text: 'Quality matches the agreed specification' },
  { icon: Scale, text: 'Quantity is correct' },
  { icon: Box, text: 'Packaging & labeling are as per order' },
  { icon: CheckCircle, text: 'Goods are dispatch-ready' }
]

const inspectionChecks = [
  { icon: Award, text: 'Product quality: material, finish, performance, tolerances (as applicable)' },
  { icon: Scale, text: 'Quantity & counting: cartons, pieces, weights, inner packing' },
  { icon: Box, text: 'Packing standard: export packing, damage protection, palletizing if required' },
  { icon: Tag, text: 'Labeling: carton marks, SKU, country requirements (if applicable)' },
  { icon: ListChecks, text: 'Order matching: PO/PI specs vs actual goods' },
  { icon: Camera, text: 'Photo/video evidence: proof for buyer approval' }
]

const readinessChecklist = [
  { text: 'Goods fully produced and final QC completed' },
  { text: 'Proper packing completed (carton + inner packing)' },
  { text: 'Carton markings/labels applied (if required)' },
  { text: 'Goods sorted batch-wise / SKU-wise' },
  { text: 'A clean area for inspection + easy access to cartons' },
  { text: 'Samples available (if buyer asked)' },
  { text: 'Your Commercial Invoice / Packing List draft ready (if available)' }
]

const evidenceDocuments = [
  { icon: FileText, text: 'Product specs / approved sample reference' },
  { icon: ListChecks, text: 'Packing list draft (cartons, net/gross weight, dimensions)' },
  { icon: Award, text: 'Any test report/certification (only if applicable)' },
  { icon: Camera, text: 'Production photos (optional but helpful)' }
]

const commonMistakes = [
  { icon: XCircle, text: 'Packing not completed on inspection day' },
  { icon: XCircle, text: 'Mixed SKUs in one carton without marking' },
  { icon: XCircle, text: 'Incorrect carton count vs packing list' },
  { icon: XCircle, text: 'Weak packing causing damage risk' },
  { icon: XCircle, text: 'Labels missing or incorrect' },
  { icon: XCircle, text: 'Product variation vs approved sample' }
]

const aazikoHandles = [
  { text: 'Inspection coordination (process + evidence structure)' },
  { text: 'Buyer requirement alignment (what needs to be checked)' },
  { text: 'Evidence collection format (photos/videos/report)' },
  { text: 'Next-step guidance if rework is needed' }
]

const sellerHandles = [
  { text: 'Product quality as agreed' },
  { text: 'Correct quantity and packing readiness' },
  { text: 'Making goods available for inspection on time' }
]

const InspectionReadiness = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.readiness-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.readiness-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.readiness-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.readiness-cta-group', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="readiness-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="readiness-hero">
        <div className="readiness-hero-content">
          <div className="readiness-hero-badge">
            <ClipboardCheck size={16} />
            <span>For Suppliers</span>
          </div>
          <h1 className="readiness-hero-title">
            Inspection <span className="readiness-gradient-text">Readiness</span>
          </h1>
          <p className="readiness-hero-subtitle">
            Be inspection-ready. Clear it in one visit.
          </p>
          <p className="readiness-hero-desc">
            When your goods are inspection-ready, orders move faster and disputes reduce. 
            Use this guide to prepare before inspection day.
          </p>

          {/* CTA Buttons */}
          <div className="readiness-cta-group">
            <button className="readiness-cta-primary">
              <ClipboardCheck size={18} />
              Run Readiness Check
              <ArrowRight size={16} />
            </button>
            <button className="readiness-cta-secondary">
              <MessageSquare size={18} />
              Talk to Support
            </button>
          </div>
        </div>
      </section>

      <div className="readiness-container">
        {/* Section 1: Why Inspection Readiness Matters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="readiness-section"
        >
          <div className="readiness-card readiness-card-highlight">
            <div className="readiness-section-header">
              <div className="readiness-section-icon">
                <Eye size={24} />
              </div>
              <div>
                <h2 className="readiness-section-title">Why Buyers Ask for Inspection</h2>
                <p className="readiness-section-desc">
                  In international bulk trade, inspection is the buyer's proof that:
                </p>
              </div>
            </div>
            <div className="readiness-checklist">
              {whyInspectionMatters.map((item, index) => (
                <div key={index} className="readiness-checklist-item">
                  <div className="readiness-checklist-icon">
                    <item.icon size={18} />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <div className="readiness-benefit-strip">
              <Zap size={18} />
              <span>When inspection is smooth, orders move faster and disputes reduce.</span>
            </div>
          </div>
        </motion.section>

        {/* Section 2: What Aaziko Checks */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="readiness-section"
        >
          <div className="readiness-card">
            <div className="readiness-section-header">
              <div className="readiness-section-icon readiness-icon-info">
                <ListChecks size={24} />
              </div>
              <div>
                <h2 className="readiness-section-title">What Will Be Verified During Inspection</h2>
                <p className="readiness-section-desc">
                  Inspection typically covers:
                </p>
              </div>
            </div>
            <div className="readiness-grid">
              {inspectionChecks.map((item, index) => (
                <div key={index} className="readiness-grid-item">
                  <div className="readiness-grid-icon">
                    <item.icon size={18} />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <div className="readiness-note">
              <AlertTriangle size={18} />
              <span>
                <strong>Note:</strong> Exact checks depend on product category and buyer requirements.
              </span>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Seller Readiness Checklist */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="readiness-section"
        >
          <div className="readiness-card readiness-card-checklist">
            <div className="readiness-section-header">
              <div className="readiness-section-icon readiness-icon-success">
                <CheckCircle size={24} />
              </div>
              <div>
                <h2 className="readiness-section-title">Seller Readiness Checklist (Before Inspection)</h2>
                <p className="readiness-section-desc">
                  Keep these ready before inspection day:
                </p>
              </div>
            </div>
            <div className="readiness-must-do-list">
              {readinessChecklist.map((item, index) => (
                <div key={index} className="readiness-must-do-item">
                  <CheckCircle size={18} className="readiness-check-icon" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 4: Documents & Evidence */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="readiness-section"
        >
          <div className="readiness-card">
            <div className="readiness-section-header">
              <div className="readiness-section-icon readiness-icon-warning">
                <FileText size={24} />
              </div>
              <div>
                <h2 className="readiness-section-title">Evidence Buyers Trust</h2>
                <p className="readiness-section-desc">
                  Keep these ready to avoid rework:
                </p>
              </div>
            </div>
            <div className="readiness-evidence-grid">
              {evidenceDocuments.map((item, index) => (
                <div key={index} className="readiness-evidence-item">
                  <div className="readiness-evidence-icon">
                    <item.icon size={20} />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <div className="readiness-benefit-strip">
              <Shield size={18} />
              <span>Aaziko uses inspection evidence to protect both sides and keep trade transparent.</span>
            </div>
          </div>
        </motion.section>

        {/* Section 5: Common Mistakes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="readiness-section"
        >
          <div className="readiness-card readiness-card-mistakes">
            <div className="readiness-section-header">
              <div className="readiness-section-icon readiness-icon-danger">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h2 className="readiness-section-title">Avoid These Inspection Delays</h2>
                <p className="readiness-section-desc">
                  Common mistakes that delay dispatch:
                </p>
              </div>
            </div>
            <div className="readiness-mistakes-grid">
              {commonMistakes.map((item, index) => (
                <div key={index} className="readiness-mistake-item">
                  <item.icon size={18} className="readiness-mistake-icon" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 6: Roles - Aaziko vs Seller */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="readiness-section"
        >
          <div className="readiness-card">
            <div className="readiness-section-header">
              <div className="readiness-section-icon readiness-icon-primary">
                <BadgeCheck size={24} />
              </div>
              <div>
                <h2 className="readiness-section-title">What Aaziko Handles vs What Seller Handles</h2>
              </div>
            </div>
            
            <div className="readiness-roles-grid">
              <div className="readiness-role-block">
                <h3 className="readiness-role-title">
                  <Shield size={20} />
                  Aaziko Handles
                </h3>
                <div className="readiness-role-list">
                  {aazikoHandles.map((item, index) => (
                    <div key={index} className="readiness-role-item">
                      <CheckCircle size={16} />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="readiness-role-block">
                <h3 className="readiness-role-title">
                  <Factory size={20} />
                  Seller Handles
                </h3>
                <div className="readiness-role-list">
                  {sellerHandles.map((item, index) => (
                    <div key={index} className="readiness-role-item">
                      <CheckCircle size={16} />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 7: Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="readiness-section readiness-bottom-cta"
        >
          <div className="readiness-cta-card">
            <h3>Ready for Inspection? Let's Clear It in One Visit.</h3>
            <p>Use the checklist, keep goods packed, and we'll guide the rest to keep your export journey smooth.</p>
            <div className="readiness-cta-group">
              <button className="readiness-cta-primary">
                <ClipboardCheck size={18} />
                Run Readiness Check
                <ArrowRight size={16} />
              </button>
              <button className="readiness-cta-secondary">
                <Headphones size={18} />
                Talk to Support
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  )
}

export default InspectionReadiness
