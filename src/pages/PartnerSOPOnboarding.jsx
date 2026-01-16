// Partner SOP & Onboarding Page
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Handshake, Truck, FileCheck, Eye, Banknote, Shield,
  CheckCircle, AlertTriangle, Users, Package, Globe,
  ClipboardList, Camera, FileText, Clock, ArrowRight,
  Building2, Scale, Target, Zap, ShieldCheck, BadgeCheck,
  MapPin, Ship, Plane, Receipt, Lock, RefreshCw
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './PartnerSOPOnboarding.css'

const whyMatters = [
  { icon: ClipboardList, title: 'Clear Scope', desc: 'Who does what—defined upfront' },
  { icon: Receipt, title: 'Clear Cost Breakup', desc: 'No confusion on pricing' },
  { icon: Camera, title: 'Clear Evidence', desc: 'Proof of every action' },
  { icon: Clock, title: 'Clear Updates', desc: 'Status + timelines shared' }
]

const partnerTypes = [
  { icon: Truck, title: 'Logistics Partners', desc: 'Pickup, domestic movement, port/airport handling, international shipping, and delivery support' },
  { icon: Ship, title: 'Freight Forwarders', desc: 'Route options, container/air bookings, timelines' },
  { icon: FileCheck, title: 'Customs (CHA) Partners', desc: 'Documentation filing and clearance coordination' },
  { icon: Eye, title: 'Inspection Partners', desc: 'Quantity, quality, and packaging checks with reports/video proof' },
  { icon: Banknote, title: 'Finance Partners', desc: 'Trade/order finance options where applicable (Partner-led)' },
  { icon: Shield, title: 'Insurance Partners', desc: 'Cargo coverage options where applicable (Partner-led)' }
]

const onboardingChecks = [
  { icon: Building2, text: 'Identity & business verification (legal entity + operational checks)' },
  { icon: Target, text: 'Service capability check (coverage, capacity, turnaround times)' },
  { icon: Receipt, text: 'Pricing transparency setup (rate format + inclusions/exclusions)' },
  { icon: Camera, text: 'Evidence standards acceptance (proof requirements for every step)' }
]

const sopSteps = [
  { step: 'A', title: 'Structured Inputs', desc: 'Aaziko collects shipment inputs (box size, box count, pickup, drop, cargo type, timeline).', icon: ClipboardList },
  { step: 'B', title: 'Quote with Clear Breakup', desc: 'Partners provide pricing in a clean breakup (freight + handling + other service charges). Aaziko shows options clearly.', icon: Receipt },
  { step: 'C', title: 'Execution + Updates', desc: 'Once confirmed, Aaziko coordinates partner actions and ensures progress updates at key stages.', icon: RefreshCw },
  { step: 'D', title: 'Evidence Pack', desc: 'Every major step produces proof (documents, photos/videos, reports, tracking refs) for transparency.', icon: Camera }
]

const proofTypes = [
  {
    category: 'Logistics',
    icon: Truck,
    items: ['Booking reference + tracking updates', 'Shipping documents (as applicable)', 'Pickup / dispatch / delivery confirmation']
  },
  {
    category: 'Customs (CHA)',
    icon: FileCheck,
    items: ['Document checklist confirmation', 'Clearance status and completion updates']
  },
  {
    category: 'Inspection',
    icon: Eye,
    items: ['Inspection report (quality/quantity/packaging)', 'Photo/video evidence', 'Lab test reports (if required)']
  },
  {
    category: 'Finance / Insurance',
    icon: Banknote,
    items: ['Offer/policy documents (as applicable)', 'Status updates for approvals/coverage']
  }
]

const buyerBenefits = [
  { icon: Zap, text: 'Faster decision-making (clear options + cost breakup)' },
  { icon: ShieldCheck, text: 'Lower risk (inspection evidence + documentation support)' },
  { icon: CheckCircle, text: 'Less operational headache (Aaziko coordinates execution)' },
  { icon: Clock, text: 'More predictability (standard process + updates)' }
]

const sellerBenefits = [
  { icon: Globe, text: 'Less export confusion (Aaziko coordinates logistics/customs/inspection)' },
  { icon: BadgeCheck, text: 'More trust with buyers (proof-based execution)' },
  { icon: CheckCircle, text: 'Less back-and-forth (standard documents + updates)' },
  { icon: Package, text: 'Focus on production (seller stays product-focused)' }
]

const disclaimers = [
  'Service availability depends on corridor, product category, and local regulations.',
  'Timelines and costs can change due to port congestion, airline/vessel availability, inspections, or regulatory updates.',
  'Finance and insurance are partner-led and depend on eligibility and underwriting/approval rules.'
]

const PartnerSOPOnboarding = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.partner-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.partner-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.partner-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.partner-hero-keyline', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="partner-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="partner-hero">
        <div className="partner-hero-content">
          <div className="partner-hero-badge">
            <Handshake size={16} />
            <span>For Buyers & Sellers</span>
          </div>
          <h1 className="partner-hero-title">
            Partner SOP & <span className="partner-gradient-text">Onboarding</span>
          </h1>
          <p className="partner-hero-subtitle">
            Aaziko works with verified logistics, customs (CHA), inspection, finance, and insurance partners through a clear SOP—so buyers and sellers get the easiest, transparent, and trustful trade experience.
          </p>
          <div className="partner-hero-keyline">
            <Zap size={18} />
            <span>You focus on product and purchase decisions—<strong>Aaziko coordinates the execution.</strong></span>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="partner-section partner-section-alt">
        <div className="partner-container">
          <div className="partner-section-header">
            <span className="partner-section-badge">Why This Matters</span>
            <h2 className="partner-section-title">For Buyers & Sellers</h2>
            <p className="partner-section-desc">
              Global trade fails when too many people are involved and no one owns the process. Aaziko fixes this by using a standard partner SOP.
            </p>
          </div>
          <div className="partner-why-grid">
            {whyMatters.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="partner-why-card"
              >
                <div className="partner-why-icon">
                  <item.icon size={24} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="partner-result-box">
            <CheckCircle size={20} />
            <span><strong>Result:</strong> fewer surprises, fewer delays, fewer disputes.</span>
          </div>
        </div>
      </section>

      {/* Trade Service Partners */}
      <section className="partner-section">
        <div className="partner-container">
          <div className="partner-section-header">
            <span className="partner-section-badge">Our Network</span>
            <h2 className="partner-section-title">Who Are Aaziko's Trade Service Partners?</h2>
            <p className="partner-section-desc">
              Aaziko coordinates services through verified partners. Partner availability can vary by corridor, product category, and country rules.
            </p>
          </div>
          <div className="partner-types-grid">
            {partnerTypes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="partner-type-card"
              >
                <div className="partner-type-icon">
                  <item.icon size={22} />
                </div>
                <div className="partner-type-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Process */}
      <section className="partner-section partner-section-alt">
        <div className="partner-container">
          <div className="partner-section-header">
            <span className="partner-section-badge">Trust-First</span>
            <h2 className="partner-section-title">How Aaziko Onboards Partners</h2>
            <p className="partner-section-desc">
              Aaziko partner onboarding is designed to reduce risk for both buyer and seller. Partners must pass:
            </p>
          </div>
          <div className="partner-onboard-list">
            {onboardingChecks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="partner-onboard-item"
              >
                <div className="partner-onboard-icon">
                  <item.icon size={20} />
                </div>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
          <p className="partner-onboard-note">This keeps service delivery consistent across shipments.</p>
        </div>
      </section>

      {/* SOP Flow */}
      <section className="partner-section">
        <div className="partner-container">
          <div className="partner-section-header">
            <span className="partner-section-badge">The SOP</span>
            <h2 className="partner-section-title">How Partner Work Is Done on Aaziko</h2>
            <p className="partner-section-desc">Aaziko runs partner operations through a standard flow:</p>
          </div>
          <div className="partner-sop-flow">
            {sopSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="partner-sop-step"
              >
                <div className="partner-sop-step-marker">
                  <span className="partner-sop-step-letter">{item.step}</span>
                  {index < sopSteps.length - 1 && <div className="partner-sop-connector" />}
                </div>
                <div className="partner-sop-step-content">
                  <div className="partner-sop-step-icon">
                    <item.icon size={20} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof / Transparency Layer */}
      <section className="partner-section partner-section-alt">
        <div className="partner-container">
          <div className="partner-section-header">
            <span className="partner-section-badge">Transparency Layer</span>
            <h2 className="partner-section-title">What Proof You Receive</h2>
            <p className="partner-section-desc">Aaziko ensures partners submit evidence based on the service type:</p>
          </div>
          <div className="partner-proof-grid">
            {proofTypes.map((proof, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="partner-proof-card"
              >
                <div className="partner-proof-header">
                  <proof.icon size={22} />
                  <h3>{proof.category}</h3>
                </div>
                <ul className="partner-proof-list">
                  {proof.items.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Buyers & Sellers */}
      <section className="partner-section">
        <div className="partner-container">
          <div className="partner-benefits-grid">
            {/* Buyer Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="partner-benefits-card partner-benefits-buyer"
            >
              <div className="partner-benefits-header">
                <Users size={24} />
                <h3>What This Means for Buyers</h3>
              </div>
              <div className="partner-benefits-list">
                {buyerBenefits.map((item, idx) => (
                  <div key={idx} className="partner-benefit-item">
                    <item.icon size={18} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="partner-benefits-summary">
                <strong>Buyer does:</strong> choose supplier + approve options.<br />
                <strong>Aaziko does:</strong> coordinate the rest.
              </div>
            </motion.div>

            {/* Seller Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="partner-benefits-card partner-benefits-seller"
            >
              <div className="partner-benefits-header">
                <Package size={24} />
                <h3>What This Means for Indian Sellers</h3>
              </div>
              <div className="partner-benefits-list">
                {sellerBenefits.map((item, idx) => (
                  <div key={idx} className="partner-benefit-item">
                    <item.icon size={18} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="partner-benefits-summary">
                <strong>Seller does:</strong> product readiness + packaging as agreed.<br />
                <strong>Aaziko does:</strong> operational coordination and partner execution.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Important Notes / Disclaimers */}
      <section className="partner-section partner-section-alt">
        <div className="partner-container">
          <div className="partner-disclaimers">
            <div className="partner-disclaimers-header">
              <AlertTriangle size={20} />
              <h3>Important Notes</h3>
            </div>
            <ul className="partner-disclaimers-list">
              {disclaimers.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final Summary */}
      <section className="partner-section partner-cta-section">
        <div className="partner-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="partner-final-cta"
          >
            <Lock size={32} />
            <h2>Aaziko Partner SOP</h2>
            <p>
              Exists to make trade <strong>easiest</strong>, <strong>transparent</strong>, and <strong>trustful</strong>—by ensuring every service step has clear scope, clear pricing, and clear proof.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PartnerSOPOnboarding
