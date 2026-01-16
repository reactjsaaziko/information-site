// Case Studies Page - Visual & Graphical Design
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  BookOpen, ArrowRight, Download, FileText, Package, Truck,
  ShieldCheck, DollarSign, CheckCircle, Clock,
  AlertTriangle, Camera, TrendingUp, Globe, Zap
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './CaseStudies.css'

const caseStudies = [
  {
    id: 1,
    title: 'Cost Clarity',
    before: 'Hidden charges',
    after: 'Full cost visibility',
    icon: DollarSign,
    color: '#2563EB',
    bgColor: '#EAF2FF',
    stat: '23%',
    statLabel: 'Cost Saved'
  },
  {
    id: 2,
    title: 'Documentation',
    before: 'Customs delays',
    after: 'Smooth clearance',
    icon: FileText,
    color: '#0EA5E9',
    bgColor: '#f0f9ff',
    stat: '0',
    statLabel: 'Delays'
  },
  {
    id: 3,
    title: 'Quality Assurance',
    before: 'Post-delivery disputes',
    after: 'Pre-dispatch proof',
    icon: ShieldCheck,
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    stat: '100%',
    statLabel: 'Verified'
  },
  {
    id: 4,
    title: 'Timeline Control',
    before: 'Missed deadlines',
    after: 'On-time delivery',
    icon: Clock,
    color: '#F59E0B',
    bgColor: '#fffbeb',
    stat: '98%',
    statLabel: 'On Time'
  }
]

const processFlow = [
  { icon: Globe, label: 'Order', color: '#2563EB' },
  { icon: FileText, label: 'Docs', color: '#0EA5E9' },
  { icon: Camera, label: 'Inspect', color: '#7c3aed' },
  { icon: Package, label: 'Pack', color: '#F59E0B' },
  { icon: Truck, label: 'Ship', color: '#2563EB' },
  { icon: CheckCircle, label: 'Deliver', color: '#16A34A' }
]

const impactStats = [
  { value: '40%', label: 'Fewer Disputes', icon: ShieldCheck, color: '#2563EB' },
  { value: '3x', label: 'Faster Clearance', icon: Zap, color: '#7c3aed' },
  { value: '25%', label: 'Cost Reduction', icon: TrendingUp, color: '#0EA5E9' },
  { value: '99%', label: 'On-Time Rate', icon: Clock, color: '#F59E0B' }
]

const CaseStudies = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cs-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.cs-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.cs-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.cs-hero-ctas', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="cs-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="cs-hero">
        <div className="cs-hero-content">
          <div className="cs-hero-badge">
            <BookOpen size={16} />
            <span>Case Studies</span>
          </div>
          <h1 className="cs-hero-title">
            <span className="cs-gradient-text">Real Results.</span>
            <br />
            <span className="cs-gradient-text">Real Trade.</span>
          </h1>
          <p className="cs-hero-subtitle">
            See how proper process transforms international trade outcomes.
          </p>
          <div className="cs-hero-ctas">
            <a href="#transformations" className="cs-btn-primary">
              <Zap size={18} />
              See Transformations
              <ArrowRight size={18} />
            </a>
            <button className="cs-btn-secondary">
              <Download size={18} />
              Get PDF
            </button>
          </div>
        </div>
      </section>

      {/* Impact Stats - Big Visual Numbers */}
      <section className="cs-impact-section">
        <div className="cs-container">
          <div className="cs-impact-grid">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="cs-impact-card"
              >
                <div className="cs-impact-icon">
                  <stat.icon size={28} />
                </div>
                <div className="cs-impact-value">{stat.value}</div>
                <div className="cs-impact-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Process Flow */}
      <section className="cs-flow-section">
        <div className="cs-container">
          <div className="cs-section-header">
            <span className="cs-section-badge">Process</span>
            <h2 className="cs-section-title">The Winning Flow</h2>
          </div>
          <div className="cs-flow-visual">
            {processFlow.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="cs-flow-step"
              >
                <div className="cs-flow-icon" style={{ background: step.color }}>
                  <step.icon size={24} color="#fff" />
                </div>
                <span className="cs-flow-label">{step.label}</span>
                {index < processFlow.length - 1 && (
                  <div className="cs-flow-connector">
                    <ArrowRight size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Transformation Cards */}
      <section id="transformations" className="cs-transform-section">
        <div className="cs-container">
          <div className="cs-section-header">
            <span className="cs-section-badge">Transformations</span>
            <h2 className="cs-section-title">Before → After</h2>
          </div>
          <div className="cs-transform-grid">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="cs-transform-card"
                style={{ '--accent': study.color, '--accent-bg': study.bgColor }}
              >
                <div className="cs-transform-header">
                  <div className="cs-transform-icon">
                    <study.icon size={32} />
                  </div>
                  <h3>{study.title}</h3>
                </div>
                <div className="cs-transform-visual">
                  <div className="cs-transform-before">
                    <AlertTriangle size={18} />
                    <span>{study.before}</span>
                  </div>
                  <div className="cs-transform-arrow">
                    <ArrowRight size={24} />
                  </div>
                  <div className="cs-transform-after">
                    <CheckCircle size={18} />
                    <span>{study.after}</span>
                  </div>
                </div>
                <div className="cs-transform-stat">
                  <span className="cs-stat-value">{study.stat}</span>
                  <span className="cs-stat-label">{study.statLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Checklist */}
      <section className="cs-checklist-section">
        <div className="cs-container">
          <div className="cs-section-header">
            <span className="cs-section-badge">Checklist</span>
            <h2 className="cs-section-title">Success Formula</h2>
          </div>
          <div className="cs-checklist-visual">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="cs-checklist-item"
            >
              <div className="cs-check-icon" style={{ background: '#2563EB' }}>
                <FileText size={24} color="#fff" />
              </div>
              <div className="cs-check-content">
                <h4>Documentation</h4>
                <p>PI, Invoice, Packing List</p>
              </div>
              <CheckCircle size={24} className="cs-check-mark" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="cs-checklist-item"
            >
              <div className="cs-check-icon" style={{ background: '#7c3aed' }}>
                <Camera size={24} color="#fff" />
              </div>
              <div className="cs-check-content">
                <h4>Inspection</h4>
                <p>Quality verified before ship</p>
              </div>
              <CheckCircle size={24} className="cs-check-mark" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="cs-checklist-item"
            >
              <div className="cs-check-icon" style={{ background: '#F59E0B' }}>
                <Package size={24} color="#fff" />
              </div>
              <div className="cs-check-content">
                <h4>Packaging</h4>
                <p>Labeled & confirmed</p>
              </div>
              <CheckCircle size={24} className="cs-check-mark" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="cs-checklist-item"
            >
              <div className="cs-check-icon" style={{ background: '#0EA5E9' }}>
                <Truck size={24} color="#fff" />
              </div>
              <div className="cs-check-content">
                <h4>Shipping</h4>
                <p>BL/AWB + Tracking</p>
              </div>
              <CheckCircle size={24} className="cs-check-mark" />
            </motion.div>
          </div>
        </div>
      </section>

   

      <Footer />
    </div>
  )
}

export default CaseStudies
