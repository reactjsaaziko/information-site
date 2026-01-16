// Aaziko Partner Support Page - Trust Coordination Layer
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Shield, FileText, CheckCircle, Users, Globe, ChevronDown,
  Handshake, Building2, ClipboardList, Phone, AlertCircle,
  Scale, Eye, Clock, Layers, Target, Workflow, Database,
  FileCheck, MessageSquare, ArrowRight, Truck, Search,
  BadgeCheck, Lock, RefreshCw, Zap, BarChart3, HeartHandshake,
  BookOpen, Settings, HelpCircle, Mail, MapPin
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './PartnerSupport.css'

// Trust Strip Items
const trustStrip = [
  { icon: Shield, text: 'Structured Processes' },
  { icon: FileCheck, text: 'Evidence-Based' },
  { icon: Scale, text: 'Fair Resolution' },
  { icon: Globe, text: 'Scale-Ready' }
]

// Core Pillars
const corePillars = [
  {
    icon: Workflow,
    title: 'Structured Collaboration',
    subtitle: 'Not Ad-hoc Support',
    description: 'Every support interaction follows a defined workflow with reference IDs, evidence submission, and SOP-driven resolution. Nothing is informal. Nothing is lost.',
    color: 'primary'
  },
  {
    icon: FileCheck,
    title: 'Proof-First Operations',
    subtitle: 'Evidence Over Assumptions',
    description: 'Our ecosystem runs on documents, reports, tracking links, time-stamped photos/videos, and signed checklists. If it\'s not documented, it doesn\'t exist.',
    color: 'success'
  },
  {
    icon: Target,
    title: 'Clear Responsibility',
    subtitle: 'Defined Boundaries',
    description: 'Partners are service specialists. Aaziko is the orchestrator. Support exists to clarify responsibility, resolve execution gaps, and prevent escalation.',
    color: 'info'
  },
  {
    icon: Layers,
    title: 'Scale-Ready Enablement',
    subtitle: 'Built for Growth',
    description: 'Standard onboarding flows, repeatable SOPs, consistent documentation formats, and predictable escalation paths help partners deliver consistently as volumes grow.',
    color: 'warning'
  }
]

// What We Support
const supportCategories = [
  {
    icon: Users,
    title: 'Onboarding & Activation',
    items: ['Partner registration guidance', 'Document verification support', 'System access setup', 'Initial training coordination']
  },
  {
    icon: ClipboardList,
    title: 'Service Listing & Pricing',
    items: ['Pricing structure clarity', 'Service coverage definition', 'Rate card management', 'Capability documentation']
  },
  {
    icon: Handshake,
    title: 'Order Execution Coordination',
    items: ['Order assignment clarity', 'Timeline alignment', 'Milestone tracking', 'Handoff coordination']
  },
  {
    icon: FileText,
    title: 'Evidence & Documentation',
    items: ['Document format standards', 'Proof submission guidelines', 'Audit trail maintenance', 'Compliance documentation']
  },
  {
    icon: Scale,
    title: 'Dispute & Exception Handling',
    items: ['Issue classification', 'Evidence-based resolution', 'Escalation pathways', 'Fair outcome processes']
  }
]

// How Support Works Steps
const supportProcess = [
  {
    step: 1,
    icon: MessageSquare,
    title: 'Request Classification',
    description: 'Every request is categorized and assigned a unique reference ID for tracking',
    color: 'primary'
  },
  {
    step: 2,
    icon: Database,
    title: 'Reference-Based Tracking',
    description: 'All interactions are logged against order IDs, partner IDs, and timestamps',
    color: 'info'
  },
  {
    step: 3,
    icon: FileCheck,
    title: 'Evidence Submission',
    description: 'Structured evidence collection with clear documentation requirements',
    color: 'warning'
  },
  {
    step: 4,
    icon: CheckCircle,
    title: 'Documented Resolution',
    description: 'Every resolution is recorded with outcome, rationale, and next steps',
    color: 'success'
  }
]

// What Partner Support IS and IS NOT
const supportIs = [
  { icon: Workflow, text: 'A structured coordination system' },
  { icon: Shield, text: 'An execution assurance layer' },
  { icon: Scale, text: 'A dispute-prevention mechanism' },
  { icon: Eye, text: 'A clarity engine for trade services' }
]

const supportIsNot = [
  { icon: Phone, text: 'A call center' },
  { icon: AlertCircle, text: 'A complaint desk' },
  { icon: Users, text: 'A manual coordination team' },
  { icon: BadgeCheck, text: 'A promise of guaranteed outcomes' }
]

// Why This Matters
const whyMatters = [
  {
    icon: Scale,
    title: 'Reduces Disputes',
    description: 'Clear processes and evidence requirements prevent misunderstandings before they escalate'
  },
  {
    icon: HeartHandshake,
    title: 'Improves Buyer Confidence',
    description: 'Buyers trust partners who operate within a structured, accountable system'
  },
  {
    icon: Clock,
    title: 'Protects Seller Timelines',
    description: 'Predictable partner execution keeps orders on track and deliveries on time'
  },
  {
    icon: RefreshCw,
    title: 'Increases Partner Reliability',
    description: 'Consistent processes lead to repeat business and long-term partnerships'
  }
]

// FAQs
const faqs = [
  { 
    q: 'Who is Partner Support for?', 
    a: 'Partner Support is exclusively for Aaziko ecosystem partners: logistics companies, freight forwarders, CHAs/customs brokers, inspection agencies, finance partners, and insurance partners. It is not a buyer or seller helpdesk.' 
  },
  { 
    q: 'How do I raise a support request?', 
    a: 'All support requests must be submitted through the Partner Portal with the relevant order/reference ID and supporting documentation. This ensures proper tracking and faster resolution.' 
  },
  { 
    q: 'What documentation is required for dispute resolution?', 
    a: 'Evidence requirements vary by issue type but typically include: order documents, communication logs, time-stamped photos/videos, signed checklists, and any relevant third-party reports.' 
  },
  { 
    q: 'How long does resolution typically take?', 
    a: 'Resolution timelines depend on issue complexity and evidence availability. Simple clarifications may resolve within 24-48 hours, while complex disputes requiring investigation may take 5-10 business days.' 
  },
  { 
    q: 'What happens if I disagree with a resolution?', 
    a: 'All resolutions include documented rationale. If you disagree, you can request an escalation review by submitting additional evidence or clarification within 7 days of the initial resolution.' 
  }
]

const PartnerSupport = () => {
  const heroRef = useRef(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ps-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.ps-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.ps-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.ps-hero-message', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.ps-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="partner-support-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="ps-hero">
        <div className="ps-hero-content">
          <div className="ps-hero-badge">
            <Shield size={16} />
            <span>Partner Support</span>
          </div>
          <h1 className="ps-hero-title">
            Structured coordination for <span className="ps-gradient-text">reliable trade execution</span>
          </h1>
          <p className="ps-hero-subtitle">
            Partner Support is not a help desk. It is a trust coordination layer between Aaziko 
            and its ecosystem partners — built on clarity, proof, and process.
          </p>
          <div className="ps-hero-message">
            <div className="ps-message-card">
              <Zap size={20} />
              <p>Aaziko enables partners to deliver global trade services reliably at scale — with clarity, proof, and accountability.</p>
            </div>
          </div>
          
          {/* Trust Strip */}
          <div className="ps-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="ps-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="ps-section">
        <div className="ps-container">
          <div className="ps-section-header">
            <span className="ps-section-badge">Foundation</span>
            <h2 className="ps-section-title">How Partner Support Works</h2>
            <p className="ps-section-desc">
              Four conceptual pillars that define how Aaziko coordinates with partners.
            </p>
          </div>
          
          <div className="ps-pillars-grid">
            {corePillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`ps-pillar-card ps-pillar-${pillar.color}`}
              >
                <div className={`ps-pillar-icon ps-icon-${pillar.color}`}>
                  <pillar.icon size={28} />
                </div>
                <h4 className="ps-pillar-title">{pillar.title}</h4>
                <span className="ps-pillar-subtitle">{pillar.subtitle}</span>
                <p className="ps-pillar-desc">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Support Section */}
      <section className="ps-section ps-section-alt">
        <div className="ps-container">
          <div className="ps-section-header">
            <span className="ps-section-badge">Services</span>
            <h2 className="ps-section-title">What We Support Partners With</h2>
            <p className="ps-section-desc">
              Structured support across the entire partner lifecycle.
            </p>
          </div>
          
          <div className="ps-support-grid">
            {supportCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="ps-support-card"
              >
                <div className="ps-support-header">
                  <div className="ps-support-icon">
                    <category.icon size={24} />
                  </div>
                  <h4>{category.title}</h4>
                </div>
                <ul className="ps-support-list">
                  {category.items.map((item, i) => (
                    <li key={i}>
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

      {/* How Support Works Section */}
      <section className="ps-section">
        <div className="ps-container">
          <div className="ps-section-header">
            <span className="ps-section-badge">Process</span>
            <h2 className="ps-section-title">How Support Works</h2>
            <p className="ps-section-desc">
              Every interaction follows a structured, traceable process.
            </p>
          </div>
          
          {/* Process Timeline - All 4 in single row */}
          <div className="ps-process-grid">
            {supportProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`ps-process-step ps-step-${step.color}`}
              >
                <div className="ps-step-number">{step.step}</div>
                <div className={`ps-step-icon ps-icon-${step.color}`}>
                  <step.icon size={24} />
                </div>
                <h4 className="ps-step-title">{step.title}</h4>
                <p className="ps-step-desc">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Support IS and IS NOT Section */}
      <section className="ps-section ps-section-alt">
        <div className="ps-container">
          <div className="ps-section-header">
            <span className="ps-section-badge">Clarity</span>
            <h2 className="ps-section-title">What Partner Support Is (and Is Not)</h2>
            <p className="ps-section-desc">
              Setting clear expectations for how we work together.
            </p>
          </div>
          
          <div className="ps-clarity-grid">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="ps-clarity-card ps-clarity-is"
            >
              <div className="ps-clarity-header">
                <CheckCircle size={24} />
                <h4>Partner Support IS</h4>
              </div>
              <ul className="ps-clarity-list">
                {supportIs.map((item, index) => (
                  <li key={index}>
                    <item.icon size={18} />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="ps-clarity-card ps-clarity-not"
            >
              <div className="ps-clarity-header">
                <AlertCircle size={24} />
                <h4>Partner Support IS NOT</h4>
              </div>
              <ul className="ps-clarity-list">
                {supportIsNot.map((item, index) => (
                  <li key={index}>
                    <item.icon size={18} />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="ps-section">
        <div className="ps-container">
          <div className="ps-section-header">
            <span className="ps-section-badge">Impact</span>
            <h2 className="ps-section-title">Why This Matters</h2>
            <p className="ps-section-desc">
              Structured partner support creates value for everyone in the ecosystem.
            </p>
          </div>
          
          <div className="ps-matters-grid">
            {whyMatters.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="ps-matters-card"
              >
                <div className="ps-matters-icon">
                  <item.icon size={28} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Pillars Reinforcement */}
      <section className="ps-section ps-section-alt">
        <div className="ps-container">
          <div className="ps-brand-pillars">
            <h3>Partner Support Reinforces Aaziko's Core Pillars</h3>
            <div className="ps-brand-grid">
              <div className="ps-brand-item">
                <Zap size={24} />
                <h4>Easiest</h4>
                <p>Clear flows, no confusion</p>
              </div>
              <div className="ps-brand-item">
                <Eye size={24} />
                <h4>Transparent</h4>
                <p>Evidence, traceability</p>
              </div>
              <div className="ps-brand-item">
                <Shield size={24} />
                <h4>Trustful</h4>
                <p>Documented processes, fairness</p>
              </div>
            </div>
            <p className="ps-brand-note">Partner Support is where these pillars are proven, not claimed.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="ps-section">
        <div className="ps-container">
          <div className="ps-section-header">
            <span className="ps-section-badge">FAQ</span>
            <h2 className="ps-section-title">Frequently Asked Questions</h2>
          </div>
          
          <div className="ps-faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="ps-faq-item">
                <button
                  className={`ps-faq-question ${expandedFaq === index ? 'open' : ''}`}
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} />
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="ps-faq-answer"
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ps-cta-section">
        <div className="ps-container">
          <div className="ps-cta-card">
            <div className="ps-cta-content">
              <h3>Ready to partner with Aaziko?</h3>
              <p>Join our ecosystem and deliver global trade services with clarity, proof, and process.</p>
            </div>
            <div className="ps-cta-buttons">
              <Link to="/contact" className="ps-btn-primary ps-btn-lg">
                <Mail size={18} />
                Contact Partner Team
              </Link>
              <Link to="/partners/onboarding" className="ps-btn-secondary">
                <ArrowRight size={18} />
                Start Onboarding
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PartnerSupport
