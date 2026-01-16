// Trade Solutions - Order Finance (Partner-led) Page - Visual Redesign
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  DollarSign, Shield, CheckCircle, AlertTriangle, TrendingUp,
  Headphones, Package, Building2, FileText, Factory, Clock,
  AlertCircle, ArrowRight, Banknote, HandCoins, Scale,
  FileCheck, Users, Zap, ChevronDown, Sparkles, BadgeCheck,
  CircleDollarSign, Wallet, PiggyBank, Receipt, CreditCard
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AnimatedBackground from '../../components/ui/AnimatedBackground'
import './TradeSolutionsOrderFinance.css'

const heroStats = [
  { value: '₹50L+', label: 'Finance Available', icon: Wallet },
  { value: '48hrs', label: 'Quick Processing', icon: Clock },
  { value: '100+', label: 'Partner Network', icon: Building2 }
]

const problemsData = [
  { icon: Clock, title: 'Delayed Production', color: 'red' },
  { icon: AlertTriangle, title: 'Quality Compromise', color: 'orange' },
  { icon: TrendingUp, title: 'Missed Opportunities', color: 'yellow' },
  { icon: Banknote, title: 'Expensive Credit', color: 'red' }
]

const solutionsData = [
  { icon: CheckCircle, title: 'Accept Larger Orders', color: 'green' },
  { icon: Zap, title: 'Faster Production', color: 'blue' },
  { icon: Shield, title: 'No Cash Stress', color: 'purple' }
]

const processSteps = [
  { step: 1, icon: FileText, title: 'Apply', desc: 'Basic details', color: 'blue' },
  { step: 2, icon: Scale, title: 'Review', desc: 'Eligibility check', color: 'purple' },
  { step: 3, icon: FileCheck, title: 'Documents', desc: 'Submit docs', color: 'orange' },
  { step: 4, icon: Banknote, title: 'Offer', desc: 'Get terms', color: 'green' },
  { step: 5, icon: HandCoins, title: 'Disbursement', desc: 'Funds released', color: 'teal' },
  { step: 6, icon: DollarSign, title: 'Repay', desc: 'As agreed', color: 'blue' }
]

const roleComparison = {
  aaziko: [
    { icon: Users, text: 'Eligibility flow' },
    { icon: FileText, text: 'Data packaging' },
    { icon: FileCheck, text: 'Document support' },
    { icon: Headphones, text: 'Status tracking' }
  ],
  partner: [
    { icon: Scale, text: 'Risk assessment' },
    { icon: CheckCircle, text: 'Loan decision' },
    { icon: DollarSign, text: 'Pricing & terms' },
    { icon: HandCoins, text: 'Disbursement' }
  ]
}

const docCategories = [
  { icon: Building2, title: 'Business', items: ['Registration', 'GST/PAN', 'Bank details'], color: 'blue' },
  { icon: Receipt, title: 'Order', items: ['Buyer confirmation', 'Product specs', 'Timeline'], color: 'green' },
  { icon: Factory, title: 'Operations', items: ['Factory details', 'Capacity info'], color: 'purple' }
]

const benefits = [
  { icon: Package, title: 'Bigger Orders', desc: 'No cash pressure', color: 'blue' },
  { icon: Zap, title: 'Fast Production', desc: 'Ready for buyers', color: 'green' },
  { icon: Shield, title: 'Build Trust', desc: 'Consistent delivery', color: 'purple' },
  { icon: TrendingUp, title: 'Scale Up', desc: 'Quality maintained', color: 'orange' }
]

const faqs = [
  { q: 'Who provides the finance?', a: 'Verified finance partners (banks/NBFCs) - not Aaziko directly.' },
  { q: 'What are the interest rates?', a: 'Rates are set by finance partners based on your profile and order.' },
  { q: 'How long does approval take?', a: 'Typically 2-5 business days after document submission.' },
  { q: 'Is approval guaranteed?', a: 'No, approval depends on partner policies and your eligibility.' }
]

const TradeSolutionsOrderFinance = () => {
  const heroRef = useRef(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tsof-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.tsof-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.tsof-hero-visual', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, delay: 0.3 })
      gsap.fromTo('.tsof-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.tsof-hero-stats', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="tsof-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section - Visual Focus */}
      <section ref={heroRef} className="tsof-hero">
        <div className="tsof-hero-bg">
          <div className="tsof-hero-gradient" />
          <div className="tsof-hero-circles">
            <div className="tsof-circle tsof-circle-1" />
            <div className="tsof-circle tsof-circle-2" />
            <div className="tsof-circle tsof-circle-3" />
          </div>
        </div>
        
        <div className="tsof-hero-content">
          <div className="tsof-hero-text">
            <motion.div className="tsof-hero-badge">
              <CircleDollarSign size={18} />
              <span>Order Finance</span>
            </motion.div>
            
            <h1 className="tsof-hero-title">
              Working Capital for
              <span className="tsof-gradient-text"> Bulk Orders</span>
            </h1>
            
            <p className="tsof-hero-subtitle">
              Get funds to fulfill large export orders through our partner network.
            </p>
            
            <div className="tsof-hero-cta">
              <Link to="/trade-solutions/order-finance/eligibility" className="tsof-btn-primary">
                <CheckCircle size={20} />
                Check Eligibility
                <Sparkles size={16} className="tsof-btn-sparkle" />
              </Link>
              <button className="tsof-btn-secondary">
                <Headphones size={20} />
                Talk to Us
              </button>
            </div>
          </div>
          
          {/* Visual Hero Element */}
          <div className="tsof-hero-visual">
            <div className="tsof-visual-card">
              <div className="tsof-visual-icon">
                <PiggyBank size={48} />
              </div>
              <div className="tsof-visual-amount">₹50L+</div>
              <div className="tsof-visual-label">Available Finance</div>
              <div className="tsof-visual-badge">
                <BadgeCheck size={14} />
                Partner Verified
              </div>
            </div>
            <div className="tsof-floating-icons">
              <motion.div 
                className="tsof-float-icon tsof-float-1"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Wallet size={24} />
              </motion.div>
              <motion.div 
                className="tsof-float-icon tsof-float-2"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <CreditCard size={24} />
              </motion.div>
              <motion.div 
                className="tsof-float-icon tsof-float-3"
                animate={{ y: [-3, 7, -3] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                <TrendingUp size={24} />
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Stats Strip */}
        <div className="tsof-hero-stats">
          {heroStats.map((stat, index) => (
            <motion.div 
              key={index}
              className="tsof-stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <div className="tsof-stat-icon">
                <stat.icon size={20} />
              </div>
              <div className="tsof-stat-content">
                <span className="tsof-stat-value">{stat.value}</span>
                <span className="tsof-stat-label">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Problem vs Solution - Visual Comparison */}
      <section className="tsof-section tsof-comparison-section">
        <div className="tsof-container">
          <div className="tsof-section-header">
            <span className="tsof-section-badge">
              <AlertTriangle size={14} />
              The Challenge
            </span>
            <h2 className="tsof-section-title">Without Finance vs With Finance</h2>
          </div>
          
          <div className="tsof-comparison-visual">
            {/* Without Finance */}
            <motion.div 
              className="tsof-comparison-side tsof-side-problem"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="tsof-side-header">
                <AlertCircle size={24} />
                <h3>Without Finance</h3>
              </div>
              <div className="tsof-side-icons">
                {problemsData.map((item, index) => (
                  <motion.div 
                    key={index}
                    className={`tsof-icon-card tsof-icon-${item.color}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <item.icon size={28} />
                    <span>{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Arrow */}
            <div className="tsof-comparison-arrow">
              <ArrowRight size={32} />
            </div>
            
            {/* With Finance */}
            <motion.div 
              className="tsof-comparison-side tsof-side-solution"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="tsof-side-header">
                <CheckCircle size={24} />
                <h3>With Finance</h3>
              </div>
              <div className="tsof-side-icons">
                {solutionsData.map((item, index) => (
                  <motion.div 
                    key={index}
                    className={`tsof-icon-card tsof-icon-${item.color}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <item.icon size={28} />
                    <span>{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process - Visual Timeline */}
      <section className="tsof-section tsof-section-alt tsof-process-section">
        <div className="tsof-container">
          <div className="tsof-section-header">
            <span className="tsof-section-badge">
              <ArrowRight size={14} />
              Simple Process
            </span>
            <h2 className="tsof-section-title">6 Steps to Get Funded</h2>
          </div>
          
          <div className="tsof-process-visual">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`tsof-process-item tsof-process-${step.color}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="tsof-process-number">{step.step}</div>
                <div className="tsof-process-icon">
                  <step.icon size={24} />
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
                {index < processSteps.length - 1 && (
                  <div className="tsof-process-connector" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Split - Visual */}
      <section className="tsof-section tsof-roles-section">
        <div className="tsof-container">
          <div className="tsof-section-header">
            <span className="tsof-section-badge">
              <Users size={14} />
              How It Works
            </span>
            <h2 className="tsof-section-title">Partner-Led Model</h2>
          </div>
          
          <div className="tsof-roles-visual">
            <motion.div 
              className="tsof-role-card tsof-role-aaziko"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="tsof-role-header">
                <div className="tsof-role-logo">A</div>
                <h3>Aaziko Coordinates</h3>
              </div>
              <div className="tsof-role-items">
                {roleComparison.aaziko.map((item, index) => (
                  <div key={index} className="tsof-role-item">
                    <item.icon size={20} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <div className="tsof-roles-connector">
              <div className="tsof-connector-line" />
              <div className="tsof-connector-icon">
                <ArrowRight size={20} />
              </div>
              <div className="tsof-connector-line" />
            </div>
            
            <motion.div 
              className="tsof-role-card tsof-role-partner"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="tsof-role-header">
                <div className="tsof-role-logo">
                  <Building2 size={24} />
                </div>
                <h3>Partner Decides</h3>
              </div>
              <div className="tsof-role-items">
                {roleComparison.partner.map((item, index) => (
                  <div key={index} className="tsof-role-item">
                    <item.icon size={20} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Documents - Visual Cards */}
      <section className="tsof-section tsof-section-alt tsof-docs-section">
        <div className="tsof-container">
          <div className="tsof-section-header">
            <span className="tsof-section-badge">
              <FileText size={14} />
              Quick Checklist
            </span>
            <h2 className="tsof-section-title">Documents Needed</h2>
          </div>
          
          <div className="tsof-docs-visual">
            {docCategories.map((cat, index) => (
              <motion.div
                key={index}
                className={`tsof-doc-card tsof-doc-${cat.color}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="tsof-doc-icon">
                  <cat.icon size={32} />
                </div>
                <h4>{cat.title}</h4>
                <ul>
                  {cat.items.map((item, i) => (
                    <li key={i}>
                      <CheckCircle size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Icon Grid */}
      <section className="tsof-section tsof-benefits-section">
        <div className="tsof-container">
          <div className="tsof-section-header">
            <span className="tsof-section-badge tsof-badge-success">
              <TrendingUp size={14} />
              Benefits
            </span>
            <h2 className="tsof-section-title">What You Gain</h2>
          </div>
          
          <div className="tsof-benefits-grid">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                className={`tsof-benefit-card tsof-benefit-${item.color}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="tsof-benefit-icon">
                  <item.icon size={32} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs - Compact */}
      <section className="tsof-section tsof-section-alt tsof-faq-section">
        <div className="tsof-container">
          <div className="tsof-section-header">
            <span className="tsof-section-badge">
              <Headphones size={14} />
              FAQs
            </span>
            <h2 className="tsof-section-title">Quick Answers</h2>
          </div>
          
          <div className="tsof-faq-grid">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={`tsof-faq-card ${expandedFaq === index ? 'expanded' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <div className="tsof-faq-question">
                  <span>{faq.q}</span>
                  <ChevronDown size={18} />
                </div>
                <div className="tsof-faq-answer">
                  <p>{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="tsof-section tsof-cta-section">
        <div className="tsof-container">
          <motion.div 
            className="tsof-cta-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="tsof-cta-visual">
              <CircleDollarSign size={64} />
            </div>
            <h3>Ready to Scale Your Orders?</h3>
            <p>Check eligibility in 2 minutes</p>
            <div className="tsof-cta-buttons">
              <Link to="/trade-solutions/order-finance/eligibility" className="tsof-btn-primary tsof-btn-light">
                <CheckCircle size={20} />
                Check Eligibility
              </Link>
              <button className="tsof-btn-secondary tsof-btn-outline">
                <Headphones size={20} />
                Talk to Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default TradeSolutionsOrderFinance
