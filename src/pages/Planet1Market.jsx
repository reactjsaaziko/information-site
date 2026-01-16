// Planet 1 Market Page - Premium 3D Light Theme
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Globe, Shield, FileText, Clock, CheckCircle, AlertTriangle,
  Zap, Users, MessageSquare, Factory, Package, ChevronDown,
  BadgeCheck, Eye, Leaf, TrendingUp,
  Camera, ClipboardCheck, Repeat, MapPin, Star
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './Planet1Market.css'

const trustStrip = [
  { icon: BadgeCheck, text: 'Verified suppliers' },
  { icon: Eye, text: 'Inspection support' },
  { icon: Shield, text: 'Structured milestones' }
]

const problems = [
  { icon: AlertTriangle, problem: 'Supplier claims hard to verify', solution: 'Trust-first sourcing' },
  { icon: FileText, problem: 'Unclear docs & compliance', solution: 'Quality confidence via inspection' },
  { icon: Clock, problem: 'Cheapest wins, quality loses', solution: 'Step-by-step process clarity' },
  { icon: Factory, problem: 'MSMEs find trade complex', solution: 'Responsible trade mindset' }
]

const processSteps = [
  {
    step: 1,
    icon: ClipboardCheck,
    title: 'Join & Profile',
    description: 'Company details & compliance docs',
    helper: 'First-time exporters welcome',
    color: 'primary'
  },
  {
    step: 2,
    icon: Package,
    title: 'List Products',
    description: 'Specs, MOQ, lead time, HS code',
    helper: '',
    color: 'warning'
  },
  {
    step: 3,
    icon: BadgeCheck,
    title: 'Build Trust',
    description: 'Photos, videos, quality process',
    helper: '',
    color: 'success'
  },
  {
    step: 4,
    icon: FileText,
    title: 'Trade Execution',
    description: 'Inquiry → Quote → Milestones',
    helper: '',
    color: 'info'
  },
  {
    step: 5,
    icon: Repeat,
    title: 'Grow Long-term',
    description: 'Repeat orders from trust',
    helper: '',
    color: 'purple'
  }
]

const trustReasons = [
  { icon: Shield, title: 'System, Not Chat', description: 'Clear steps & roles' },
  { icon: Eye, title: 'Inspection Support', description: 'Reduce quality risk' },
  { icon: Globe, title: 'Borderless Trade', description: 'Easier & trustworthy' }
]

const buyerExpects = [
  { icon: FileText, text: 'Clear supplier profiles' },
  { icon: Camera, text: 'Evidence-friendly process' },
  { icon: CheckCircle, text: 'Readiness clarity' }
]

const supplierGets = [
  { icon: ClipboardCheck, text: 'Guided system' },
  { icon: Star, text: 'Credibility layer' },
  { icon: TrendingUp, text: 'Win orders faster' }
]

const useCases = [
  {
    icon: MapPin,
    title: 'Rural Manufacturer',
    goal: 'Export home decor in bulk',
    features: ['Professional presentation', 'Inspection readiness', 'Repeat orders'],
    color: 'primary'
  },
  {
    icon: Leaf,
    title: 'Eco Buyer',
    goal: 'Source sustainable materials',
    features: ['Transparency-ready suppliers', 'Proof of processes', 'Fewer disputes'],
    color: 'success'
  },
  {
    icon: Factory,
    title: 'First-time MSME',
    goal: 'Ship to new country',
    features: ['Structured journey', 'Doc guidance', 'No getting stuck'],
    color: 'info'
  }
]

const faqs = [
  { q: 'Who can join?', a: 'Indian MSMEs, artisans, rural & cottage units.' },
  { q: 'Is there a fee?', a: 'Profile creation is free. Trade fees apply per order.' },
  { q: 'How to get started?', a: 'Create profile → List products → Start receiving inquiries.' }
]

const Planet1Market = () => {
  const heroRef = useRef(null)
  const [activeTab, setActiveTab] = useState('suppliers')
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.planet-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.planet-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.planet-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.planet-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.planet-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="planet-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="planet-hero">
        <div className="planet-hero-content">
          <div className="planet-hero-badge">
            <Globe size={16} />
            <span>Planet 1 Market</span>
          </div>
          <h1 className="planet-hero-title">
            Trade that grows your business — <span className="planet-gradient-text">without harming trust or quality</span>
          </h1>
          <p className="planet-hero-subtitle">
            Responsible global trade for Indian MSMEs — verified supply, inspection-backed confidence, clear execution.
          </p>
          <div className="planet-hero-cta">
            <Link to="/planet1-market/join" className="planet-btn-primary">
              <Factory size={18} />
              Join as Supplier
            </Link>
            <Link to="/planet1-market/source" className="planet-btn-secondary">
              <Globe size={18} />
              Source from Planet 1
            </Link>
          </div>
          
          {/* Trust Strip */}
          <div className="planet-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="planet-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Tabs */}
      <section className="planet-tabs-section">
        <div className="planet-container">
          <div className="planet-tabs">
            <button 
              className={`planet-tab ${activeTab === 'suppliers' ? 'active' : ''}`}
              onClick={() => setActiveTab('suppliers')}
            >
              <Factory size={18} />
              For Suppliers
            </button>
            <button 
              className={`planet-tab ${activeTab === 'buyers' ? 'active' : ''}`}
              onClick={() => setActiveTab('buyers')}
            >
              <Globe size={18} />
              For Buyers
            </button>
            <button 
              className={`planet-tab ${activeTab === 'partners' ? 'active' : ''}`}
              onClick={() => setActiveTab('partners')}
            >
              <Users size={18} />
              For Partners
            </button>
          </div>
        </div>
      </section>

      {/* Problem → Solution Section */}
      <section className="planet-section">
        <div className="planet-container">
          <div className="planet-section-header">
            <span className="planet-section-badge">Challenge</span>
            <h2 className="planet-section-title">Problems vs Solutions</h2>
            <p className="planet-section-desc">
              Traditional trade is broken. We fix it.
            </p>
          </div>
          
          <div className="planet-problem-grid">
            <div className="planet-problem-col">
              <h3 className="planet-col-title planet-col-problem">
                <AlertTriangle size={20} />
                Traditional Trade Problems
              </h3>
              {problems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="planet-problem-card"
                >
                  <div className="planet-problem-icon">
                    <item.icon size={20} />
                  </div>
                  <p>{item.problem}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="planet-solution-col">
              <h3 className="planet-col-title planet-col-solution">
                <Zap size={20} />
                How Planet 1 Fixes It
              </h3>
              {problems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="planet-solution-card"
                >
                  <CheckCircle size={20} />
                  <p>{item.solution}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <p className="planet-disclaimer">
            <AlertTriangle size={14} />
            Sustainability requirements vary by product. Guidance is indicative.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="planet-section planet-section-alt">
        <div className="planet-container">
          <div className="planet-section-header">
            <span className="planet-section-badge">Process</span>
            <h2 className="planet-section-title">How Planet 1 Works</h2>
            <p className="planet-section-desc">
              5 steps from profile to repeat orders.
            </p>
          </div>
          
          <div className="planet-steps-grid">
            {processSteps.map((step, index) => (
              <ProcessStepCard key={index} {...step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="planet-section">
        <div className="planet-container">
          <div className="planet-section-header">
            <span className="planet-section-badge">Why Planet 1</span>
            <h2 className="planet-section-title">Why It's Safer</h2>
            <p className="planet-section-desc">
              Better than random portals or brokers.
            </p>
          </div>
          
          <div className="planet-trust-grid">
            {trustReasons.map((item, index) => (
              <TrustCard key={index} {...item} index={index} />
            ))}
          </div>
          
          {/* What Buyers & Suppliers Get */}
          <div className="planet-proof-grid">
            <div className="planet-proof-strip">
              <h4>What Buyers Expect</h4>
              <div className="planet-proof-items">
                {buyerExpects.map((item, index) => (
                  <div key={index} className="planet-proof-item">
                    <item.icon size={18} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="planet-proof-strip">
              <h4>What Suppliers Get</h4>
              <div className="planet-proof-items">
                {supplierGets.map((item, index) => (
                  <div key={index} className="planet-proof-item">
                    <item.icon size={18} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="planet-section planet-section-alt">
        <div className="planet-container">
          <div className="planet-section-header">
            <span className="planet-section-badge">Use Cases</span>
            <h2 className="planet-section-title">Real-World Success</h2>
            <p className="planet-section-desc">
              How different users benefit.
            </p>
          </div>
          
          <div className="planet-usecase-grid">
            {useCases.map((useCase, index) => (
              <UseCaseCard key={index} {...useCase} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="planet-section">
        <div className="planet-container">
          <div className="planet-section-header">
            <span className="planet-section-badge">FAQs</span>
            <h2 className="planet-section-title">Common Questions</h2>
          </div>
          
          <div className="planet-faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="planet-faq-item">
                <button
                  className={`planet-faq-question ${expandedFaq === index ? 'open' : ''}`}
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} />
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="planet-faq-answer"
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA Section */}
      <section className="planet-section planet-section-alt">
        <div className="planet-container">
          <div className="planet-partner-card">
            <div className="planet-partner-icon">
              <Users size={32} />
            </div>
            <div className="planet-partner-content">
              <h3>Inspection / Logistics / Compliance Partner?</h3>
              <p>Collaborate with Planet 1 Market to support better trade.</p>
            </div>
            <Link to="/partners/planet1" className="planet-btn-outline">
              <BadgeCheck size={18} />
              Apply to Collaborate
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="planet-cta-section">
        <div className="planet-container">
          <div className="planet-cta-card">
            <div className="planet-cta-content">
              <h3>Ready to make the planet your market?</h3>
              <p>Start with profile, product listing & export readiness.</p>
            </div>
            <div className="planet-cta-buttons">
              <Link to="/planet1-market/join" className="planet-btn-primary planet-btn-lg">
                <Factory size={18} />
                Join Planet 1 Market
              </Link>
              <Link to="/rfq" className="planet-btn-secondary">
                <MessageSquare size={18} />
                Share Requirement
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


// Process Step Card Component
const ProcessStepCard = ({ step, icon: Icon, title, description, helper, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`planet-step-card planet-step-${color}`}
  >
    <div className="planet-step-number">{step}</div>
    <div className={`planet-step-icon planet-icon-${color}`}>
      <Icon size={24} />
    </div>
    <h4 className="planet-step-title">{title}</h4>
    <p className="planet-step-desc">{description}</p>
    {helper && <p className="planet-step-helper">{helper}</p>}
  </motion.div>
)

// Trust Card Component
const TrustCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="planet-trust-card"
  >
    <div className="planet-trust-icon">
      <Icon size={28} />
    </div>
    <h4 className="planet-trust-title">{title}</h4>
    <p className="planet-trust-desc">{description}</p>
  </motion.div>
)

// Use Case Card Component
const UseCaseCard = ({ icon: Icon, title, goal, features, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`planet-usecase-card planet-usecase-${color}`}
  >
    <div className={`planet-usecase-icon planet-icon-${color}`}>
      <Icon size={28} />
    </div>
    <h4 className="planet-usecase-title">{title}</h4>
    <p className="planet-usecase-goal">
      <strong>Goal:</strong> {goal}
    </p>
    <ul className="planet-usecase-features">
      {features.map((feature, i) => (
        <li key={i}>
          <CheckCircle size={14} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </motion.div>
)

export default Planet1Market
