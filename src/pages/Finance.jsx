// Aaziko Finance Page - Premium 3D Light Theme
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  DollarSign, CreditCard, Shield, FileText, Clock,
  CheckCircle, Globe, AlertTriangle, Zap,
  Users, MessageSquare, Calculator, Factory,
  Package, ChevronDown, BadgeCheck, Wallet,
  Landmark, FileCheck, Banknote, Receipt,
  Scale, Percent, Lock, Eye, Headphones, ArrowRight
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './Finance.css'

const trustStrip = [
  { icon: Shield, text: 'Secure transactions' },
  { icon: FileText, text: 'Doc support' },
  { icon: Lock, text: 'Partner-led financing' }
]

const problems = [
  { icon: Clock, problem: 'Long payment cycles', solution: 'Milestone-aligned financing' },
  { icon: DollarSign, problem: 'High upfront costs', solution: 'Partner-led credit options' },
  { icon: AlertTriangle, problem: 'Complex documentation', solution: 'Guided doc support' },
  { icon: Eye, problem: 'No payment visibility', solution: 'Real-time tracking' },
  { icon: FileText, problem: 'Multiple financing parties', solution: '' }
]

const processSteps = [
  { step: 1, icon: FileCheck, title: 'Submit', description: 'Order value, terms, documents', helper: '', color: 'primary' },
  { step: 2, icon: Scale, title: 'Compare', description: 'Options from partner NBFCs', helper: '', color: 'warning' },
  { step: 3, icon: FileText, title: 'Documents', description: 'Guided checklist', helper: '', color: 'success' },
  { step: 4, icon: CheckCircle, title: 'Approval', description: 'Partner review', helper: '', color: 'info' },
  { step: 5, icon: Banknote, title: 'Disbursement', description: 'Milestone-based release', helper: '', color: 'purple' },
  { step: 6, icon: Receipt, title: 'Repayment', description: 'Trade-cycle aligned', helper: '', color: 'teal' }
]

const trustReasons = [
  { icon: Landmark, title: 'Partner Network', description: 'Verified NBFCs & banks' },
  { icon: Shield, title: 'Secure Process', description: 'Compliance checks' },
  { icon: Zap, title: 'Trade-Aligned', description: 'Order milestone linked' }
]

const proofPoints = [
  { icon: Percent, text: 'Competitive rates' },
  { icon: Eye, text: 'Real-time tracking' },
  { icon: FileCheck, text: 'Guided docs' }
]

const useCases = [
  {
    icon: Factory,
    title: 'Supplier',
    goal: 'Bridge cash flow',
    features: ['Working capital', 'Milestone disbursement', 'Export financing'],
    color: 'primary'
  },
  {
    icon: Globe,
    title: 'Buyer',
    goal: 'Flexible terms',
    features: ['LC support', 'Trade credit', 'Payment protection'],
    color: 'info'
  },
  {
    icon: Package,
    title: 'Bulk Orders',
    goal: 'Order-linked finance',
    features: ['Production finance', 'Inspection-linked', 'Shipment finance'],
    color: 'success'
  }
]

const quoteRequirements = [
  'Order value & currency',
  'Payment terms',
  'Trade documents',
  'Business registration',
  'Financials (if needed)'
]

const faqs = [
  { q: 'Who provides financing?', a: 'Verified NBFC & banking partners.' },
  { q: 'What are the rates?', a: 'Indicative, based on partner terms.' },
  { q: 'How long for approval?', a: '3-7 business days.' }
]

// Related Guides for SEO
const relatedGuides = [
  { label: 'International Payment Terms Guide', to: '/guides/international-payment-terms' },
  { label: 'Incoterms Explained', to: '/guides/incoterms-explained' }
]

const Finance = () => {
  const heroRef = useRef(null)
  const [activeTab, setActiveTab] = useState('buyers')
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.finance-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.finance-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.finance-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.finance-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.finance-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="finance-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="finance-hero">
        <div className="finance-hero-content">
          <div className="finance-hero-badge">
            <Wallet size={16} />
            <span>Aaziko Finance</span>
          </div>
          <h1 className="finance-hero-title">
            Trade finance — <span className="finance-gradient-text">partner-led, milestone-aligned</span>
          </h1>
          <p className="finance-hero-subtitle">
            Working capital & payment solutions from verified partners.
          </p>
          <div className="finance-hero-cta">
            <Link to="/finance/apply" className="finance-btn-primary">
              <CreditCard size={18} />
              Apply for Finance
            </Link>
            <button className="finance-btn-secondary">
              <Headphones size={18} />
              Talk to Finance Expert
            </button>
          </div>
          
          {/* Trust Strip */}
          <div className="finance-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="finance-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Tabs */}
      <section className="finance-tabs-section">
        <div className="finance-container">
          <div className="finance-tabs">
            <button 
              className={`finance-tab ${activeTab === 'buyers' ? 'active' : ''}`}
              onClick={() => setActiveTab('buyers')}
            >
              <Globe size={18} />
              For Buyers
            </button>
            <button 
              className={`finance-tab ${activeTab === 'suppliers' ? 'active' : ''}`}
              onClick={() => setActiveTab('suppliers')}
            >
              <Factory size={18} />
              For Suppliers
            </button>
            <button 
              className={`finance-tab ${activeTab === 'partners' ? 'active' : ''}`}
              onClick={() => setActiveTab('partners')}
            >
              <Users size={18} />
              For Finance Partners
            </button>
          </div>
        </div>
      </section>

      {/* Problem → Solution Section */}
      <section className="finance-section">
        <div className="finance-container">
          <div className="finance-section-header">
            <span className="finance-section-badge">Challenge</span>
            <h2 className="finance-section-title">Problems vs Solutions</h2>
            <p className="finance-section-desc">
              Traditional finance is complex. We simplify it.
            </p>
          </div>
          
          <div className="finance-problem-grid">
            <div className="finance-problem-col">
              <h3 className="finance-col-title finance-col-problem">
                <AlertTriangle size={20} />
                Traditional Finance Problems
              </h3>
              {problems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="finance-problem-card"
                >
                  <div className="finance-problem-icon">
                    <item.icon size={20} />
                  </div>
                  <p>{item.problem}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="finance-solution-col">
              <h3 className="finance-col-title finance-col-solution">
                <Zap size={20} />
                How Aaziko Helps
              </h3>
              {problems.filter(p => p.solution).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="finance-solution-card"
                >
                  <CheckCircle size={20} />
                  <p>{item.solution}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="finance-section finance-section-alt">
        <div className="finance-container">
          <div className="finance-section-header">
            <span className="finance-section-badge">Process</span>
            <h2 className="finance-section-title">How It Works</h2>
            <p className="finance-section-desc">
              6 steps from application to disbursement.
            </p>
          </div>
          
          <div className="finance-steps-grid">
            {processSteps.map((step, index) => (
              <ProcessStepCard key={index} {...step} index={index} />
            ))}
          </div>
          
          <p className="finance-disclaimer">
            <AlertTriangle size={14} />
            Subject to partner approval & regulations.
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="finance-section">
        <div className="finance-container">
          <div className="finance-section-header">
            <span className="finance-section-badge">Why Aaziko</span>
            <h2 className="finance-section-title">Why It's Reliable</h2>
            <p className="finance-section-desc">
              Structured approach to trade finance.
            </p>
          </div>
          
          <div className="finance-trust-grid">
            {trustReasons.map((item, index) => (
              <TrustCard key={index} {...item} index={index} />
            ))}
          </div>
          
          <div className="finance-proof-strip">
            <h4>What You Get</h4>
            <div className="finance-proof-items">
              {proofPoints.map((item, index) => (
                <div key={index} className="finance-proof-item">
                  <item.icon size={18} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="finance-section finance-section-alt">
        <div className="finance-container">
          <div className="finance-section-header">
            <span className="finance-section-badge">Use Cases</span>
            <h2 className="finance-section-title">Who Benefits</h2>
            <p className="finance-section-desc">
              Real-world scenarios for users.
            </p>
          </div>
          
          <div className="finance-usecase-grid">
            {useCases.map((useCase, index) => (
              <UseCaseCard key={index} {...useCase} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Quote Requirements + FAQ Section */}
      <section className="finance-section">
        <div className="finance-container">
          <div className="finance-info-grid">
            {/* Quote Requirements */}
            <div className="finance-info-card">
              <div className="finance-info-header">
                <Calculator size={24} />
                <h3>Requirements</h3>
              </div>
              <ul className="finance-checklist">
                {quoteRequirements.map((item, index) => (
                  <li key={index}>
                    <CheckCircle size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* FAQs */}
            <div className="finance-info-card">
              <div className="finance-info-header">
                <MessageSquare size={24} />
                <h3>FAQs</h3>
              </div>
              <div className="finance-faq-list">
                {faqs.map((faq, index) => (
                  <div key={index} className="finance-faq-item">
                    <button
                      className={`finance-faq-question ${expandedFaq === index ? 'open' : ''}`}
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={18} />
                    </button>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="finance-faq-answer"
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner CTA Section */}
      <section className="finance-section finance-section-alt">
        <div className="finance-container">
          <div className="finance-partner-card">
            <div className="finance-partner-icon">
              <Landmark size={32} />
            </div>
            <div className="finance-partner-content">
              <h3>NBFC / Bank / Financial Institution?</h3>
              <p>Partner with Aaziko for verified trade leads.</p>
            </div>
            <Link to="/partners/finance" className="finance-btn-outline">
              <BadgeCheck size={18} />
              Join as Partner
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides Section */}
      <section className="finance-section">
        <div className="finance-container">
          <div className="finance-section-header">
            <span className="finance-section-badge">Guides</span>
            <h2 className="finance-section-title">Related Guides</h2>
          </div>
          <div className="finance-related-links">
            {relatedGuides.map((guide, index) => (
              <Link key={index} to={guide.to} className="finance-related-link">
                <ArrowRight size={16} />
                {guide.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="finance-cta-section">
        <div className="finance-container">
          <div className="finance-cta-card">
            <div className="finance-cta-content">
              <h3>Unlock trade finance</h3>
              <p>Milestone-aligned financing options.</p>
            </div>
            <div className="finance-cta-buttons">
              <Link to="/finance/apply" className="finance-btn-primary finance-btn-lg">
                <CreditCard size={18} />
                Apply for Finance
              </Link>
              <button className="finance-btn-secondary finance-btn-lg">
                <Headphones size={18} />
                Talk to Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Process Step Card Component
const ProcessStepCard = ({ step, icon: Icon, title, description, helper, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`finance-step-card finance-step-${color}`}
    >
      <div className="finance-step-number">{step}</div>
      <div className={`finance-step-icon finance-icon-${color}`}>
        <Icon size={24} />
      </div>
      <h4 className="finance-step-title">{title}</h4>
      <p className="finance-step-desc">{description}</p>
      {helper && <p className="finance-step-helper">{helper}</p>}
    </motion.div>
  )
}

// Trust Card Component
const TrustCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="finance-trust-card"
  >
    <div className="finance-trust-icon">
      <Icon size={28} />
    </div>
    <h4 className="finance-trust-title">{title}</h4>
    <p className="finance-trust-desc">{description}</p>
  </motion.div>
)

// Use Case Card Component
const UseCaseCard = ({ icon: Icon, title, goal, features, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`finance-usecase-card finance-usecase-${color}`}
    >
      <div className={`finance-usecase-icon finance-icon-${color}`}>
        <Icon size={28} />
      </div>
      <h4 className="finance-usecase-title">{title}</h4>
      <p className="finance-usecase-goal">
        <strong>Goal:</strong> {goal}
      </p>
      <ul className="finance-usecase-features">
        {features.map((feature, i) => (
          <li key={i}>
            <CheckCircle size={14} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default Finance
