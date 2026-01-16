// Quote & Order Milestones Page - Visual/Graphical Version
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  FileText, CheckCircle, ArrowRight, Package, ArrowDown,
  ShieldCheck, Truck, Eye, CreditCard, ClipboardCheck,
  Sparkles, Clock, Box, FileCheck, AlertTriangle,
  Globe, Download, Scale, Target, Zap, XCircle,
  FileImage, Camera, Receipt, Award, Anchor, Plane,
  MapPin, Building, DollarSign, PackageCheck, BadgeCheck,
  CircleCheck, FileWarning, Timer, Route, Stamp, Bell
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './QuoteOrderMilestones.css'

const whyMilestonesItems = [
  { icon: DollarSign, text: 'Quotation confusion & hidden charges' },
  { icon: Timer, text: 'Unclear timelines & missed dispatch' },
  { icon: PackageCheck, text: 'Quality & packing disputes' },
  { icon: FileWarning, text: 'Documentation mistakes causing delays' }
]

const milestoneDefinition = [
  { icon: CheckCircle, label: 'Decision Confirmed', example: 'Quote approved' },
  { icon: FileImage, label: 'Proof Collected', example: 'Inspection report uploaded' },
  { icon: Zap, label: 'Next Step Unlocked', example: 'Shipment booked' }
]

const quoteIncludesA = [
  { icon: Box, text: 'Product name/specs, quantity, packaging unit' },
  { icon: DollarSign, text: 'Pricing basis (EXW / FOB / CIF etc.)' },
  { icon: Clock, text: 'Lead time / readiness timeline' }
]

const quoteIncludesB = [
  { icon: Truck, text: 'Domestic pickup / inland transport' },
  { icon: Anchor, text: 'Freight (air/sea/rail/road)' },
  { icon: MapPin, text: 'Port/terminal handling charges' },
  { icon: FileText, text: 'Documentation/CHA/customs costs' },
  { icon: ShieldCheck, text: 'Insurance (if applicable)' },
  { icon: Building, text: 'Destination delivery/warehousing' }
]

const orderMilestones = [
  { id: 1, title: 'Requirement Confirmed', desc: 'Scope finalized: product specs, quantity, destination, timeline', icon: Target, color: 'primary' },
  { id: 2, title: 'Quotation Generated', desc: 'Clear cost breakup + route options shared', icon: FileText, color: 'primary' },
  { id: 3, title: 'Quotation Approved', desc: 'Final quote accepted and recorded', icon: CheckCircle, color: 'success' }, /* Verified/Approved state */
  { id: 4, title: 'Order Confirmed', desc: 'Order locked with agreed terms, documents checklist opened', icon: ClipboardCheck, color: 'primary' },
  { id: 5, title: 'Production / Readiness', desc: 'Progress confirmation + packing and labeling readiness', icon: Clock, color: 'info' },
  { id: 6, title: 'Inspection Readiness', desc: 'Pre-dispatch quality/quantity/packing checks as required', icon: Eye, color: 'warning' },
  { id: 7, title: 'Inspection Completed', desc: 'Inspection report/video/photo evidence stored', icon: Camera, color: 'success' }, /* Verified/Passed state */
  { id: 8, title: 'Shipment Booked', desc: 'Mode selected, pickup scheduled, route confirmed', icon: Route, color: 'primary' },
  { id: 9, title: 'Documentation Prepared', desc: 'Invoice, packing list, certificates, lab tests', icon: FileCheck, color: 'primary' },
  { id: 10, title: 'Customs Clearance', desc: 'Compliance checks per export/import requirements', icon: Stamp, color: 'warning' },
  { id: 11, title: 'Dispatch & Tracking', desc: 'BL/AWB generated, tracking checkpoints enabled', icon: Truck, color: 'info' },
  { id: 12, title: 'Delivery Confirmed', desc: 'Final delivery status confirmed, order closed with evidence', icon: PackageCheck, color: 'success' } /* Verified/Completed state */
]

const proofPackItems = [
  { icon: Receipt, text: 'Proforma Invoice / confirmed quote' },
  { icon: Camera, text: 'Production/readiness photos' },
  { icon: Eye, text: 'Inspection report + images/video' },
  { icon: FileText, text: 'Packing list + commercial invoice' },
  { icon: Award, text: 'Certificates/lab reports' },
  { icon: Anchor, text: 'Shipping documents (BL/AWB)' },
  { icon: Bell, text: 'Tracking + delivery confirmation' }
]

const commonMistakes = [
  { icon: XCircle, text: 'Approving quotes without total cost breakup' },
  { icon: XCircle, text: 'Skipping labeling/packing checks until late' },
  { icon: XCircle, text: 'Missing certificates or lab tests' },
  { icon: XCircle, text: 'Booking shipment before documents ready' },
  { icon: XCircle, text: 'Dispatching without inspection where needed' }
]

const quickTakeaways = [
  { icon: DollarSign, text: 'Good quotes show total cost, not just freight' },
  { icon: Target, text: 'Milestones reduce disputes and delays' },
  { icon: ShieldCheck, text: 'Proof pack = trust + faster resolution' }
]

const QuoteOrderMilestones = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.qom-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.qom-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.qom-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.qom-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="qom-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="qom-hero">
        <div className="qom-hero-content">
          <div className="qom-hero-badge">
            <Sparkles size={16} />
            <span>Milestone-Based Trade</span>
          </div>
          <h1 className="qom-hero-title">
            Quote & Order <span className="qom-gradient-text">Milestones</span>
          </h1>
          <p className="qom-hero-subtitle">
            Make global trade easiest, transparent, and trustful by turning every order into clear steps—with clear costing, clear responsibilities, and clear proof.
          </p>
          <div className="qom-hero-cta">
            <a href="#milestone-flow" className="qom-btn-primary">
              <Eye size={18} />
              View Milestone Flow
            </a>
            <Link to="/contact" className="qom-btn-secondary">
              <Download size={18} />
              Download Checklist
            </Link>
          </div>
        </div>
      </section>

   




      {/* Section 4 - Order Milestones Flow */}
      <section id="milestone-flow" className="qom-section qom-section-alt">
        <div className="qom-container">
          <div className="qom-section-header">
    
            <h2 className="qom-section-title">Order Milestones</h2>
            <p className="qom-section-tagline">Standard Flow</p>
          </div>
          <div className="qom-flow-timeline">
            {orderMilestones.map((milestone, index) => {
              const Icon = milestone.icon
              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`qom-flow-item qom-flow-${milestone.color}`}
                >
                  <div className="qom-flow-icon">
                    <Icon size={24} />
                  </div>
                  <div className="qom-flow-content">
                    <h4>{milestone.title}</h4>
                    <p>{milestone.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 5 - Proof Pack */}
      <section className="qom-section">
        <div className="qom-container">
          <div className="qom-section-header">
            <span className="qom-section-badge">Section 5</span>
            <h2 className="qom-section-title">Proof Pack</h2>
            <p className="qom-section-tagline">Evidence That Keeps Trade Trustful</p>
          </div>
          <div className="qom-proof-grid">
            {proofPackItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="qom-proof-item"
                >
                  <div className="qom-proof-icon">
                    <Icon size={24} />
                  </div>
                  <span>{item.text}</span>
                </motion.div>
              )
            })}
          </div>
          <div className="qom-proof-note">
            <FileText size={18} />
            <span>Note: Evidence requirements vary by product and destination rules.</span>
          </div>
        </div>
      </section>





      <Footer />
    </div>
  )
}

export default QuoteOrderMilestones
