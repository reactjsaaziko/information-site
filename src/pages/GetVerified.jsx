// Get Verified (KYC + Documents) Page - Compact Engaging Design
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  ShieldCheck, ArrowRight, FileText, Upload, CheckCircle,
  Building2, MapPin, Phone, CreditCard, Factory,
  Camera, Award, AlertCircle, Clock, BadgeCheck,
  MessageSquare, HelpCircle, Sparkles, Package,
  FileCheck, Banknote, ChevronRight, Globe, Eye, X
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './GetVerified.css'

const checklistTabs = [
  {
    id: 'kyc',
    label: 'Business KYC',
    icon: Building2,
    items: [
      { icon: Building2, text: 'Company / Owner name' },
      { icon: Package, text: 'Business type (Manufacturer / Trader)' },
      { icon: MapPin, text: 'Address (registered + factory)' },
      { icon: Phone, text: 'Contact details (email + phone)' }
    ]
  },
  {
    id: 'legal',
    label: 'Legal Docs',
    icon: FileText,
    items: [
      { icon: FileCheck, text: 'GST Certificate' },
      { icon: FileCheck, text: 'PAN (Company/Owner)' },
      { icon: FileCheck, text: 'Udyam / MSME (optional)' },
      { icon: FileCheck, text: 'Incorporation / Partnership deed' }
    ]
  },
  {
    id: 'bank',
    label: 'Bank Details',
    icon: Banknote,
    items: [
      { icon: CreditCard, text: 'Cancelled cheque or bank proof' },
      { icon: FileCheck, text: 'Account name must match business' }
    ]
  },
  {
    id: 'factory',
    label: 'Factory Proof',
    icon: Factory,
    items: [
      { icon: Camera, text: 'Factory photos (outside + inside)' },
      { icon: Camera, text: 'Machinery / production line' },
      { icon: Camera, text: 'Team / packaging area' },
      { icon: Camera, text: 'Quality process (optional)' }
    ]
  },
  {
    id: 'quality',
    label: 'Quality Docs',
    icon: Award,
    items: [
      { icon: Award, text: 'Product test reports' },
      { icon: Award, text: 'Certifications (ISO, CE, FDA)' },
      { icon: Award, text: 'MSDS (chemicals/cosmetics)' },
      { icon: Award, text: 'Material grade certificates' }
    ],
    optional: true
  }
]

const processSteps = [
  { icon: Upload, text: 'Submit docs' },
  { icon: Eye, text: 'Aaziko reviews' },
  { icon: AlertCircle, text: 'Fix if needed' },
  { icon: BadgeCheck, text: 'Get verified' }
]

const GetVerified = () => {
  const [activeTab, setActiveTab] = useState('kyc')
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.verify-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.verify-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.verify-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.3 })
      gsap.fromTo('.verify-cta-group', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.4 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const activeTabData = checklistTabs.find(t => t.id === activeTab)

  return (
    <div className="verify-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section - Compact */}
      <section ref={heroRef} className="verify-hero">
        <div className="verify-hero-content">
          <div className="verify-hero-badge">
            <ShieldCheck size={14} />
            <span>Supplier Verification</span>
          </div>
          <h1 className="verify-hero-title">
            Get <span className="verify-gradient-text">Verified</span>
          </h1>
          <p className="verify-hero-subtitle">
            Build trust. Unlock serious global buyers.
          </p>

          {/* CTA Buttons */}
          <div className="verify-cta-group">
            <button className="verify-cta-primary">
              <ShieldCheck size={18} />
              Start Verification
              <ArrowRight size={16} />
            </button>
            <button className="verify-cta-secondary">
              <Upload size={16} />
              Upload Documents
            </button>
          </div>
        </div>
      </section>

      <div className="verify-container">
        {/* Why + Process - Side by Side */}
        <div className="verify-intro-grid">
          {/* Why Verification */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="verify-why-card"
          >
            <h3><Sparkles size={18} /> Why verify?</h3>
            <ul>
              <li><CheckCircle size={14} /> Buyers prefer verified suppliers</li>
              <li><CheckCircle size={14} /> Faster order processing</li>
              <li><CheckCircle size={14} /> Better visibility on Aaziko</li>
            </ul>
          </motion.div>

          {/* Process Steps - Horizontal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="verify-process-card"
          >
            <h3><Clock size={18} /> How it works</h3>
            <div className="verify-process-steps">
              {processSteps.map((step, index) => (
                <div key={index} className="verify-step">
                  <div className="verify-step-icon">
                    <step.icon size={16} />
                  </div>
                  <span>{step.text}</span>
                  {index < processSteps.length - 1 && <ChevronRight size={14} className="verify-step-arrow" />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabbed Checklist */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="verify-checklist-section"
        >
          <div className="verify-checklist-header">
            <h2>What you'll verify</h2>
            <p>Click each tab to see required documents</p>
          </div>

          {/* Tab Navigation */}
          <div className="verify-tabs">
            {checklistTabs.map((tab) => (
              <button
                key={tab.id}
                className={`verify-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
                {tab.optional && <span className="verify-tab-optional">Optional</span>}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="verify-tab-content"
            >
              <div className="verify-tab-items">
                {activeTabData?.items.map((item, index) => (
                  <div key={index} className="verify-tab-item">
                    <item.icon size={16} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              {activeTabData?.optional && (
                <div className="verify-tab-note">
                  <AlertCircle size={14} />
                  <span>Optional but increases buyer trust</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.section>

        {/* Transparency - Compact Two Column */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="verify-transparency"
        >
          <div className="verify-trans-col verify-trans-do">
            <h4><CheckCircle size={16} /> We verify</h4>
            <ul>
              <li>Document name/address match</li>
              <li>Business legitimacy</li>
              <li>Bank details correctness</li>
              <li>Product category fit</li>
            </ul>
          </div>
          <div className="verify-trans-col verify-trans-dont">
            <h4><X size={16} /> We don't</h4>
            <ul>
              <li>Promise approvals without docs</li>
              <li>Add certifications you don't have</li>
              <li>Misrepresent your business</li>
            </ul>
          </div>
        </motion.section>

        {/* Tips - Horizontal Scroll */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="verify-tips-section"
        >
          <h3><Sparkles size={16} /> Tips for faster verification</h3>
          <div className="verify-tips-scroll">
            <div className="verify-tip">GST/PAN name matches profile</div>
            <div className="verify-tip">Clear scans, no blur</div>
            <div className="verify-tip">Upload factory photos</div>
            <div className="verify-tip">Keep mobile active</div>
          </div>
        </motion.section>

   

        {/* Info Note */}
        <div className="verify-info-note">
          <AlertCircle size={14} />
          <span>No certifications yet? You can still get verified. Aaziko guides you when orders come.</span>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default GetVerified
