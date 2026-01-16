// Trade Solutions - Customs Page
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  FileText, AlertTriangle, Shield,
  Package, Tag, ClipboardCheck, Headphones,
  FileCheck, AlertCircle, Clock
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AnimatedBackground from '../../components/ui/AnimatedBackground'
import './TradeSolutions.css'

const problemsWeSolve = [
  { icon: Clock, text: 'Shipment delays and document rework', color: 'orange' },
  { icon: AlertCircle, text: 'Rejections, penalties, or extra costs', color: 'red' },
  { icon: Package, text: 'Wrong labeling/packing compliance mistakes', color: 'purple' }
]

const guidanceOutputs = [
  { icon: Shield, title: 'Product precautions', desc: 'What must be ensured for the product/category', color: 'blue' },
  { icon: Tag, title: 'Labeling + packing rules', desc: 'Destination-aligned requirements', color: 'green' },
  { icon: FileCheck, title: 'Documents + tests + certificates', desc: 'What is needed for smoother clearance', color: 'teal' }
]

const TradeSolutionsCustoms = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ts-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.ts-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.ts-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.ts-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="ts-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="ts-hero">
        <div className="ts-hero-content">
          <div className="ts-hero-badge">
            <FileText size={16} />
            <span>Trade Solutions → Customs</span>
          </div>
          <h1 className="ts-hero-title">
            Customs simplified—<span className="ts-gradient-text">clear checklist, fewer surprises</span>
          </h1>
          <p className="ts-hero-subtitle">
            Aaziko turns complex customs rules into short, actionable guidance so clearance becomes smoother and more predictable.
          </p>
          <div className="ts-hero-cta">
            <Link to="/customs" className="ts-btn-primary">
              <ClipboardCheck size={18} />
              Check Customs Guidance
            </Link>
            <button className="ts-btn-secondary">
              <Headphones size={18} />
              Talk to Trade Support
            </button>
          </div>
        </div>
      </section>

      {/* Section 1: The problem we solve */}
      <section className="ts-section">
        <div className="ts-container">
          <div className="ts-section-header">
            <span className="ts-section-badge">Challenge</span>
            <h2 className="ts-section-title">The problem we solve</h2>
            <p className="ts-section-desc">
              Customs rules are long, legal, and hard to interpret—leading to:
            </p>
          </div>
          <div className="ts-problems-grid">
            {problemsWeSolve.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="ts-problem-card ts-card-wiggle"
              >
                <div className={`ts-problem-icon ts-icon-${item.color}`}>
                  <item.icon size={24} />
                </div>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: How Aaziko Customs Rules Simplifier helps */}
      <section className="ts-section ts-section-alt">
        <div className="ts-container">
          <div className="ts-section-header">
            <span className="ts-section-badge">Solution</span>
            <h2 className="ts-section-title">How Aaziko Customs Rules Simplifier helps</h2>
            <p className="ts-section-desc">3 clear outputs (bullet-point guidance):</p>
          </div>
          <div className="ts-guidance-grid">
            {guidanceOutputs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="ts-guidance-card ts-card-wiggle"
              >
                <div className={`ts-guidance-icon ts-icon-${item.color}`}>
                  <item.icon size={28} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="ts-note">
            <AlertTriangle size={16} />
            <span>Guidance is data-backed and simplified for easy reading. Final clearance depends on destination authorities and shipment specifics.</span>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="ts-cta-section">
        <div className="ts-container">
          <div className="ts-cta-card">
            <div className="ts-cta-content">
              <h3>Want fewer customs issues?</h3>
              <p>Use the customs checklist and follow a guided document flow.</p>
            </div>
            <div className="ts-cta-buttons">
              <Link to="/customs" className="ts-btn-primary ts-btn-lg">
                <ClipboardCheck size={18} />
                Check Customs Guidance
              </Link>
              <button className="ts-btn-secondary">
                <Headphones size={18} />
                Talk to Trade Support
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default TradeSolutionsCustoms
