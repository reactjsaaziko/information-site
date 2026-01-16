// Aaziko Finance / NBFC Partners Page
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Landmark, Shield, FileText, Clock, CheckCircle, Globe,
  AlertTriangle, Zap, Users, Factory, Package, ChevronDown,
  BadgeCheck, Wallet, FileCheck, Banknote, Building2,
  Briefcase, TrendingUp, Receipt, Handshake, Send,
  ClipboardList, UserCheck, Search, ArrowRight
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './FinancePartners.css'

const trustStrip = [
  { icon: Shield, text: 'Verified partners' },
  { icon: FileText, text: 'Transparent process' },
  { icon: Landmark, text: 'Trade-aligned financing' }
]

const financeSupport = [
  {
    icon: Briefcase,
    title: 'Order / Working Capital Finance',
    description: 'To produce and dispatch bulk orders',
    color: 'primary'
  },
  {
    icon: Receipt,
    title: 'Invoice / Receivable Finance',
    description: 'To manage payment cycles',
    color: 'info'
  },
  {
    icon: TrendingUp,
    title: 'Trade Finance Options',
    description: 'As per corridor + eligibility',
    color: 'success'
  }
]

const whoItHelps = [
  {
    icon: Factory,
    title: 'Indian Manufacturers (MSMEs)',
    description: 'Fulfilling larger international orders',
    color: 'primary'
  },
  {
    icon: Globe,
    title: 'Global Buyers',
    description: 'Needing structured purchase support',
    color: 'info'
  },
  {
    icon: Package,
    title: 'Existing Exporters/Importers',
    description: 'Who want smoother cashflow',
    color: 'success'
  }
]

const processSteps = [
  {
    step: 1,
    icon: Send,
    title: 'Submit Request',
    description: 'Amount, product, buyer country, timeline',
    color: 'primary'
  },
  {
    step: 2,
    icon: Search,
    title: 'Partner Matching',
    description: 'Aaziko matches you with best-fit partner based on eligibility',
    color: 'info'
  },
  {
    step: 3,
    icon: UserCheck,
    title: 'KYC & Risk Check',
    description: 'Partner does verification and shares terms & timeline',
    color: 'warning'
  },
  {
    step: 4,
    icon: CheckCircle,
    title: 'Approval & Finance',
    description: 'If approved, finance arranged as per partner policy',
    color: 'success'
  }
]

const requirements = [
  { icon: Building2, text: 'Company KYC (GST/PAN + basic profile)' },
  { icon: FileText, text: 'Order / quotation details (value, quantity, timeline)' },
  { icon: ClipboardList, text: 'Any supporting documents required by partner (varies by case)' }
]

const faqs = [
  { q: 'Who decides the finance approval?', a: 'Finance approval, rates, and timelines are decided by the partner and depend on eligibility and regulations.' },
  { q: 'How long does approval take?', a: 'Typically 3-7 business days depending on documentation completeness and partner review process.' },
  { q: 'What types of businesses can apply?', a: 'Indian MSMEs, exporters, importers, and global buyers with verified trade requirements.' }
]

const FinancePartners = () => {
  const heroRef = useRef(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.fp-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.fp-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.fp-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.fp-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.fp-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="fp-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="fp-hero">
        <div className="fp-hero-content">
          <div className="fp-hero-badge">
            <Landmark size={16} />
            <span>Finance / NBFC Partners</span>
          </div>
          <h1 className="fp-hero-title">
            Enable more global orders — <span className="fp-gradient-text">without cashflow stress</span>
          </h1>
          <p className="fp-hero-subtitle">
            Aaziko connects exporters/importers with verified finance/NBFC partners to support trade transactions—so buyers can buy with confidence and Indian sellers can fulfill bulk orders smoothly.
          </p>
          <div className="fp-hero-cta">
            <Link to="/finance/apply" className="fp-btn-primary">
              <Wallet size={18} />
              Request Finance Support
            </Link>
            <Link to="/partners/finance/join" className="fp-btn-secondary">
              <Handshake size={18} />
              Become a Finance Partner
            </Link>
          </div>
          
          {/* Trust Strip */}
          <div className="fp-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="fp-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Finance Partners Can Support */}
      <section className="fp-section">
        <div className="fp-container">
          <div className="fp-section-header">
            <span className="fp-section-badge">Support Options</span>
            <h2 className="fp-section-title">What Finance Partners Can Support</h2>
            <p className="fp-section-desc">
              Multiple financing options to match your trade needs
            </p>
          </div>
          
          <div className="fp-support-grid">
            {financeSupport.map((item, index) => (
              <SupportCard key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Who It Helps Most */}
      <section className="fp-section fp-section-alt">
        <div className="fp-container">
          <div className="fp-section-header">
            <span className="fp-section-badge">Who Benefits</span>
            <h2 className="fp-section-title">Who It Helps Most</h2>
            <p className="fp-section-desc">
              Designed for businesses that need structured trade finance
            </p>
          </div>
          
          <div className="fp-helps-grid">
            {whoItHelps.map((item, index) => (
              <HelpsCard key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="fp-section">
        <div className="fp-container">
          <div className="fp-section-header">
            <span className="fp-section-badge">Process</span>
            <h2 className="fp-section-title">How Aaziko Makes It Easiest</h2>
            <p className="fp-section-desc">
              Simple 4-step process from request to financing
            </p>
          </div>
          
          <div className="fp-steps-grid">
            {processSteps.map((step, index) => (
              <ProcessStepCard key={index} {...step} index={index} />
            ))}
          </div>
          
          <div className="fp-transparency-note">
            <Zap size={18} />
            <span>Aaziko keeps the flow transparent with updates at every stage</span>
          </div>
        </div>
      </section>

      {/* What You Should Keep Ready */}
      <section className="fp-section fp-section-alt">
        <div className="fp-container">
          <div className="fp-section-header">
            <span className="fp-section-badge">Requirements</span>
            <h2 className="fp-section-title">What You Should Keep Ready</h2>
            <p className="fp-section-desc">
              Minimum documents to get started
            </p>
          </div>
          
          <div className="fp-requirements-card">
            <div className="fp-requirements-list">
              {requirements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="fp-requirement-item"
                >
                  <div className="fp-requirement-icon">
                    <item.icon size={20} />
                  </div>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Important Note */}
          <div className="fp-important-note">
            <AlertTriangle size={18} />
            <div>
              <strong>Important Note:</strong> Finance approval, rates, and timelines are decided by the partner and depend on eligibility and regulations.
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="fp-section">
        <div className="fp-container">
          <div className="fp-section-header">
            <span className="fp-section-badge">FAQs</span>
            <h2 className="fp-section-title">Common Questions</h2>
          </div>
          
          <div className="fp-faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="fp-faq-item">
                <button
                  className={`fp-faq-question ${expandedFaq === index ? 'open' : ''}`}
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} />
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="fp-faq-answer"
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
      <section className="fp-cta-section">
        <div className="fp-container">
          <div className="fp-cta-grid">
            {/* Request Finance CTA */}
            <div className="fp-cta-card fp-cta-primary">
              <div className="fp-cta-icon">
                <Wallet size={32} />
              </div>
              <h3>Need Trade Finance?</h3>
              <p>Submit your finance request and get matched with verified partners</p>
              <Link to="/finance/apply" className="fp-btn-primary fp-btn-lg">
                <Send size={18} />
                Request Finance Support
              </Link>
            </div>
            
            {/* Become Partner CTA */}
            <div className="fp-cta-card fp-cta-secondary">
              <div className="fp-cta-icon fp-cta-icon-alt">
                <Landmark size={32} />
              </div>
              <h3>Are You a Finance / NBFC Partner?</h3>
              <p>Join Aaziko's network and connect with verified trade participants</p>
              <Link to="/partners/finance/join" className="fp-btn-outline fp-btn-lg">
                <BadgeCheck size={18} />
                Become a Finance / NBFC Partner
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Support Card Component
const SupportCard = ({ icon: Icon, title, description, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`fp-support-card fp-support-${color}`}
  >
    <div className={`fp-support-icon fp-icon-${color}`}>
      <Icon size={28} />
    </div>
    <h4 className="fp-support-title">{title}</h4>
    <p className="fp-support-desc">{description}</p>
  </motion.div>
)

// Helps Card Component
const HelpsCard = ({ icon: Icon, title, description, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`fp-helps-card fp-helps-${color}`}
  >
    <div className={`fp-helps-icon fp-icon-${color}`}>
      <Icon size={28} />
    </div>
    <h4 className="fp-helps-title">{title}</h4>
    <p className="fp-helps-desc">{description}</p>
  </motion.div>
)

// Process Step Card Component
const ProcessStepCard = ({ step, icon: Icon, title, description, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`fp-step-card fp-step-${color}`}
  >
    <div className="fp-step-number">{step}</div>
    <div className={`fp-step-icon fp-icon-${color}`}>
      <Icon size={24} />
    </div>
    <h4 className="fp-step-title">{title}</h4>
    <p className="fp-step-desc">{description}</p>
    {index < 3 && <ArrowRight className="fp-step-arrow" size={20} />}
  </motion.div>
)

export default FinancePartners
