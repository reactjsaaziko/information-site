// Create Company Profile Page - Compact Version
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Building2, Globe, CheckCircle, ArrowRight,
  Package, MapPin, Award, Camera, ClipboardList,
  ShieldCheck, TrendingUp, Truck, BadgeCheck, Eye,
  Factory, Settings
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './CreateCompanyProfile.css'

const quickChecklist = [
  { icon: Building2, label: 'Company Info', desc: 'Name, address, GST' },
  { icon: MapPin, label: 'Location', desc: 'Factory/office city' },
  { icon: Package, label: 'Products', desc: 'Categories you sell' },
  { icon: Settings, label: 'Capacity', desc: 'Monthly/annual output' },
  { icon: Camera, label: 'Media', desc: 'Photos & catalog' },
  { icon: Award, label: 'Certifications', desc: 'If available' }
]

const buyerViewItems = [
  'Company overview & products',
  'Location & manufacturing type',
  'Quality readiness status',
  'Response capability'
]

const aazikoSupport = [
  { icon: Globe, text: 'Global buyer discovery' },
  { icon: ShieldCheck, text: 'Inspection & logistics' },
  { icon: Factory, text: 'You focus on production' },
  { icon: BadgeCheck, text: '100% payment guarantee' }
]

const CreateCompanyProfile = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.profile-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.profile-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.profile-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.profile-cta-group', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="profile-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="profile-hero profile-hero-compact">
        <div className="profile-hero-content">
          <div className="profile-hero-badge">
            <span className="profile-badge-dot" />
            <span>For Suppliers</span>
          </div>
          <h1 className="profile-hero-title">
            Create Company <span className="profile-gradient-text">Profile</span>
          </h1>
          <p className="profile-hero-subtitle">
            Build your global presence — Aaziko handles the export complexity
          </p>
          <div className="profile-cta-group">
            <button className="profile-cta-primary">
              <Building2 size={18} />
              Create Profile
              <ArrowRight size={16} />
            </button>
            <button className="profile-cta-secondary">Skip for now</button>
          </div>
        </div>
      </section>

      <div className="profile-container profile-container-compact">
        {/* Quick Checklist - What to Prepare */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="profile-section"
        >
          <div className="profile-card-compact">
            <div className="profile-compact-header">
              <ClipboardList size={20} />
              <h2>What to Prepare</h2>
            </div>
            <div className="profile-quick-grid">
              {quickChecklist.map((item, index) => (
                <div key={index} className="profile-quick-item">
                  <item.icon size={18} className="profile-quick-icon" />
                  <div>
                    <span className="profile-quick-label">{item.label}</span>
                    <span className="profile-quick-desc">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="profile-compact-note">
              No certifications yet? No problem — create your profile anyway.
            </p>
          </div>
        </motion.section>

        {/* Two Column: Buyer View + Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="profile-section"
        >
          <div className="profile-two-col">
            <div className="profile-card-compact profile-card-info">
              <div className="profile-compact-header">
                <Eye size={20} />
                <h2>What Buyers See</h2>
              </div>
              <ul className="profile-simple-list">
                {buyerViewItems.map((item, index) => (
                  <li key={index}>
                    <CheckCircle size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="profile-card-compact profile-card-tips">
              <div className="profile-compact-header">
                <TrendingUp size={20} />
                <h2>Profile Tips</h2>
              </div>
              <ul className="profile-simple-list">
                <li><CheckCircle size={14} /><span>Write what you actually make</span></li>
                <li><CheckCircle size={14} /><span>Keep it honest — no false claims</span></li>
                <li><CheckCircle size={14} /><span>Use simple English</span></li>
                <li><CheckCircle size={14} /><span>Highlight real strengths only</span></li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Aaziko Support Strip */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="profile-section"
        >
          <div className="profile-support-strip">
            <Truck size={20} />
            <span className="profile-support-title">Aaziko handles:</span>
            <div className="profile-support-items">
              {aazikoSupport.map((item, index) => (
                <div key={index} className="profile-support-item">
                  <item.icon size={16} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Bottom CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="profile-section"
        >
          <div className="profile-cta-card profile-cta-card-compact">
            <h3>Ready to go global?</h3>
            <div className="profile-cta-group">
              <button className="profile-cta-primary">
                <Building2 size={18} />
                Create Profile
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  )
}

export default CreateCompanyProfile
