// Aaziko Insurance Partners Page — Vendor Side
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Shield, FileText, CheckCircle, Globe, AlertTriangle, Zap,
  Package, ChevronDown, BadgeCheck, Send, ClipboardList,
  Search, ArrowRight, ShieldCheck, Truck, Camera, FileCheck,
  DollarSign, Scale, Box, Plane, Ship, MapPin, Calendar,
  Receipt, Image, FileWarning, TrendingUp, Heart, Headphones
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './InsurancePartners.css'

const trustStrip = [
  { icon: Shield, text: 'Trusted insurance partners' },
  { icon: FileText, text: 'Transparent pricing' },
  { icon: ShieldCheck, text: 'Documentation support' }
]

const whyInsuranceMatters = [
  {
    icon: Truck,
    title: 'Transit Damage',
    description: 'Handling, moisture, breakage during shipping',
    color: 'warning'
  },
  {
    icon: Package,
    title: 'Theft or Missing Cartons',
    description: 'Goods lost or stolen during transit',
    color: 'danger'
  },
  {
    icon: Globe,
    title: 'Port Delays',
    description: 'Unexpected incidents and delays at ports',
    color: 'info'
  },
  {
    icon: Scale,
    title: 'Disputes',
    description: 'When evidence is unclear or contested',
    color: 'primary'
  }
]

const insuranceBenefits = [
  {
    icon: DollarSign,
    title: 'Financial Protection',
    description: 'If something goes wrong during shipment',
    color: 'success'
  },
  {
    icon: BadgeCheck,
    title: 'Buyer Confidence',
    description: 'Buyers approve shipments more readily',
    color: 'primary'
  },
  {
    icon: FileCheck,
    title: 'Smoother Claims',
    description: 'When documents are properly in place',
    color: 'info'
  }
]

const aazikoHelps = [
  { icon: Send, text: 'Quote request flow (fast, simple inputs)' },
  { icon: Search, text: 'Matching to available partner options (as applicable)' },
  { icon: ClipboardList, text: 'Document checklist guidance' },
  { icon: Headphones, text: 'Policy support coordination (when required)' },
  { icon: FileText, text: 'Evidence organization for claims support' }
]

const partnerHandles = [
  { icon: FileCheck, text: 'Policy terms, premium, coverage decision' },
  { icon: Receipt, text: 'Issuance of policy certificate' },
  { icon: Scale, text: 'Claim evaluation and settlement' }
]

const coverageOptions = [
  {
    icon: Ship,
    title: 'Cargo Insurance',
    description: 'Protects goods during transit against covered risks like damage/loss. Most common option.',
    color: 'primary'
  },
  {
    icon: Shield,
    title: 'All-Risk Coverage',
    description: 'Broader protection—not everything, but more coverage than named-risk policies.',
    color: 'success'
  },
  {
    icon: FileWarning,
    title: 'Named-Risk Coverage',
    description: 'Only specific risks listed in policy are covered. More limited but often lower premium.',
    color: 'info'
  },
  {
    icon: Box,
    title: 'Shipment-Level Insurance',
    description: 'Insurance taken per shipment based on invoice value and route.',
    color: 'warning'
  }
]

const processSteps = [
  {
    step: 1,
    icon: ClipboardList,
    title: 'Enter Shipment Basics',
    description: 'Product, value, destination, packing type',
    color: 'primary'
  },
  {
    step: 2,
    icon: Search,
    title: 'Get Partner Quote Options',
    description: 'Coverage + premium options from partners',
    color: 'info'
  },
  {
    step: 3,
    icon: FileCheck,
    title: 'Confirm & Provide Docs',
    description: 'Confirm coverage and submit required documents',
    color: 'warning'
  },
  {
    step: 4,
    icon: ShieldCheck,
    title: 'Policy Issued',
    description: 'Certificate shared for your records',
    color: 'success'
  },
  {
    step: 5,
    icon: Scale,
    title: 'Claim Processing',
    description: 'If incident happens: submit evidence → partner evaluates',
    color: 'primary'
  }
]

const quoteInputs = [
  { icon: Package, text: 'Product category + HS code (if available)' },
  { icon: DollarSign, text: 'Shipment value (invoice value)' },
  { icon: MapPin, text: 'Origin and destination' },
  { icon: Plane, text: 'Mode (sea/air/road)' },
  { icon: Box, text: 'Packing type (cartons/pallets/crates)' },
  { icon: Calendar, text: 'Expected dispatch date' }
]

const policyDocs = [
  { icon: Receipt, text: 'Commercial invoice / proforma invoice' },
  { icon: ClipboardList, text: 'Packing list' },
  { icon: Ship, text: 'Shipping details (BL/AWB when available)' },
  { icon: Camera, text: 'Photos of packing (recommended for fragile goods)' }
]

const claimEvidence = [
  { icon: Image, text: 'Packing photos/videos (before dispatch)' },
  { icon: FileCheck, text: 'Inspection report (if inspection done)' },
  { icon: ClipboardList, text: 'Packing list + invoice' },
  { icon: Ship, text: 'BL/AWB shipping document' },
  { icon: Camera, text: 'Delivery condition proof (if buyer reports damage)' }
]

const vendorBenefits = [
  {
    icon: DollarSign,
    title: 'Protects Profit Margin',
    description: 'Financial safety net in unexpected events',
    color: 'success'
  },
  {
    icon: Heart,
    title: 'Builds Buyer Confidence',
    description: 'International orders approved more readily',
    color: 'primary'
  },
  {
    icon: Scale,
    title: 'Reduces Disputes',
    description: 'Clear evidence makes resolution easier',
    color: 'info'
  },
  {
    icon: TrendingUp,
    title: 'Scale Without Fear',
    description: 'Grow exports with peace of mind',
    color: 'warning'
  }
]

const limitations = [
  'Coverage depends on policy terms and insurer rules',
  'Not all damages are covered (some exclusions apply)',
  'Improper packing can lead to claim rejection',
  'Claim approval timelines depend on partner investigation',
  'Aaziko supports documentation and coordination, but does not guarantee claim settlement'
]

const faqs = [
  { q: 'Does Aaziko provide insurance directly?', a: 'No. Aaziko does not act as the insurer. We enable access to insurance partners and help coordinate the process so sellers don\'t get stuck in paperwork and confusion.' },
  { q: 'What types of coverage are available?', a: 'Common options include cargo insurance, all-risk coverage, named-risk coverage, and shipment-level insurance. Availability depends on partner and route.' },
  { q: 'How long does it take to get a quote?', a: 'Quote requests are typically processed within 1-2 business days depending on shipment complexity and partner availability.' },
  { q: 'What happens if I need to file a claim?', a: 'Submit evidence (photos, documents, shipping proof) through the platform. The insurance partner evaluates and processes the claim according to their policy terms.' }
]

const InsurancePartners = () => {
  const heroRef = useRef(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ip-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.ip-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.ip-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.ip-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.ip-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="ip-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="ip-hero">
        <div className="ip-hero-content">
          <div className="ip-hero-badge">
            <Shield size={16} />
            <span>Insurance Partners</span>
          </div>
          <h1 className="ip-hero-title">
            Protect every shipment — <span className="ip-gradient-text">Aaziko helps you access trusted trade insurance</span>
          </h1>
          <p className="ip-hero-subtitle">
            International trade has real risks (damage, loss, delays, claims). Aaziko connects you with insurance partners so your shipments can be protected with clear coverage, transparent pricing, and proper documentation support.
          </p>
          <div className="ip-hero-cta">
            <Link to="/insurance/quote" className="ip-btn-primary">
              <ShieldCheck size={18} />
              Get Insurance Quote
            </Link>
            <Link to="/contact" className="ip-btn-secondary">
              <Headphones size={18} />
              Talk to Support
            </Link>
          </div>
          
          {/* Trust Strip */}
          <div className="ip-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="ip-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Insurance Matters */}
      <section className="ip-section">
        <div className="ip-container">
          <div className="ip-section-header">
            <span className="ip-section-badge">Why It Matters</span>
            <h2 className="ip-section-title">Why Insurance Matters in Global Trade</h2>
            <p className="ip-section-desc">
              Even if production is perfect, a shipment can face unexpected challenges
            </p>
          </div>
          
          <div className="ip-risks-grid">
            {whyInsuranceMatters.map((item, index) => (
              <RiskCard key={index} {...item} index={index} />
            ))}
          </div>

          <div className="ip-benefits-section">
            <h3 className="ip-subsection-title">Insurance helps ensure:</h3>
            <div className="ip-benefits-grid">
              {insuranceBenefits.map((item, index) => (
                <BenefitCard key={index} {...item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Aaziko Does */}
      <section className="ip-section ip-section-alt">
        <div className="ip-container">
          <div className="ip-section-header">
            <span className="ip-section-badge">Partner-Led Insurance</span>
            <h2 className="ip-section-title">What Aaziko Does</h2>
            <p className="ip-section-desc">
              Aaziko does not act as the insurer. We enable access to insurance partners and help coordinate the process.
            </p>
          </div>
          
          <div className="ip-roles-grid">
            {/* Aaziko Helps With */}
            <div className="ip-role-card ip-role-aaziko">
              <div className="ip-role-header">
                <div className="ip-role-icon ip-icon-primary">
                  <Zap size={24} />
                </div>
                <h4>Aaziko helps with:</h4>
              </div>
              <div className="ip-role-list">
                {aazikoHelps.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="ip-role-item"
                  >
                    <item.icon size={18} />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Insurance Partners Handle */}
            <div className="ip-role-card ip-role-partner">
              <div className="ip-role-header">
                <div className="ip-role-icon ip-icon-success">
                  <Shield size={24} />
                </div>
                <h4>Insurance partners handle:</h4>
              </div>
              <div className="ip-role-list">
                {partnerHandles.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="ip-role-item"
                  >
                    <item.icon size={18} />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Options */}
      <section className="ip-section">
        <div className="ip-container">
          <div className="ip-section-header">
            <span className="ip-section-badge">Coverage Types</span>
            <h2 className="ip-section-title">Common Coverage Options</h2>
            <p className="ip-section-desc">
              Availability depends on partner and route
            </p>
          </div>
          
          <div className="ip-coverage-grid">
            {coverageOptions.map((item, index) => (
              <CoverageCard key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="ip-section ip-section-alt">
        <div className="ip-container">
          <div className="ip-section-header">
            <span className="ip-section-badge">Process</span>
            <h2 className="ip-section-title">How It Works</h2>
            <p className="ip-section-desc">
              Simple step-by-step process from quote to coverage
            </p>
          </div>
          
          <div className="ip-steps-grid">
            {processSteps.map((step, index) => (
              <ProcessStepCard key={index} {...step} index={index} totalSteps={processSteps.length} />
            ))}
          </div>
        </div>
      </section>

      {/* What You Need to Share */}
      <section className="ip-section">
        <div className="ip-container">
          <div className="ip-section-header">
            <span className="ip-section-badge">Requirements</span>
            <h2 className="ip-section-title">What You Need to Share</h2>
            <p className="ip-section-desc">
              Typical inputs for quote and policy issuance
            </p>
          </div>
          
          <div className="ip-docs-grid">
            {/* For Quote */}
            <div className="ip-docs-card">
              <div className="ip-docs-header">
                <Search size={24} />
                <h4>To Generate a Quote</h4>
              </div>
              <div className="ip-docs-list">
                {quoteInputs.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="ip-doc-item"
                  >
                    <item.icon size={16} />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* For Policy Issuance */}
            <div className="ip-docs-card">
              <div className="ip-docs-header">
                <FileCheck size={24} />
                <h4>For Policy Issuance</h4>
              </div>
              <div className="ip-docs-list">
                {policyDocs.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="ip-doc-item"
                  >
                    <item.icon size={16} />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Claim Evidence */}
      <section className="ip-section ip-section-alt">
        <div className="ip-container">
          <div className="ip-section-header">
            <span className="ip-section-badge">Claims</span>
            <h2 className="ip-section-title">What Evidence Helps in a Claim</h2>
            <p className="ip-section-desc">
              Good evidence keeps claims smooth and fair
            </p>
          </div>
          
          <div className="ip-evidence-card">
            <div className="ip-evidence-list">
              {claimEvidence.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="ip-evidence-item"
                >
                  <div className="ip-evidence-icon">
                    <item.icon size={20} />
                  </div>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Benefits */}
      <section className="ip-section">
        <div className="ip-container">
          <div className="ip-section-header">
            <span className="ip-section-badge">Benefits</span>
            <h2 className="ip-section-title">Why Sellers Use This</h2>
            <p className="ip-section-desc">
              Protect your business and grow with confidence
            </p>
          </div>
          
          <div className="ip-vendor-grid">
            {vendorBenefits.map((item, index) => (
              <VendorBenefitCard key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Limits / Exclusions */}
      <section className="ip-section ip-section-alt">
        <div className="ip-container">
          <div className="ip-section-header">
            <span className="ip-section-badge">Important</span>
            <h2 className="ip-section-title">Limits / Exclusions</h2>
            <p className="ip-section-desc">
              Important information for trust and transparency
            </p>
          </div>
          
          <div className="ip-limits-card">
            <div className="ip-limits-icon">
              <AlertTriangle size={28} />
            </div>
            <div className="ip-limits-list">
              {limitations.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="ip-limit-item"
                >
                  <CheckCircle size={16} />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="ip-section">
        <div className="ip-container">
          <div className="ip-section-header">
            <span className="ip-section-badge">FAQs</span>
            <h2 className="ip-section-title">Common Questions</h2>
          </div>
          
          <div className="ip-faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="ip-faq-item">
                <button
                  className={`ip-faq-question ${expandedFaq === index ? 'open' : ''}`}
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} />
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="ip-faq-answer"
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
      <section className="ip-cta-section">
        <div className="ip-container">
          <div className="ip-cta-card">
            <div className="ip-cta-content">
              <h3>Want shipment protection without confusion?</h3>
              <p>Get coverage selection help and document checklist support</p>
            </div>
            <div className="ip-cta-buttons">
              <Link to="/insurance/quote" className="ip-btn-primary ip-btn-lg">
                <ShieldCheck size={18} />
                Get Insurance Quote
              </Link>
              <Link to="/contact" className="ip-btn-outline ip-btn-lg">
                <Headphones size={18} />
                Talk to Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Risk Card Component
const RiskCard = ({ icon: Icon, title, description, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`ip-risk-card ip-risk-${color}`}
  >
    <div className={`ip-risk-icon ip-icon-${color}`}>
      <Icon size={24} />
    </div>
    <h4 className="ip-risk-title">{title}</h4>
    <p className="ip-risk-desc">{description}</p>
  </motion.div>
)

// Benefit Card Component
const BenefitCard = ({ icon: Icon, title, description, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`ip-benefit-card ip-benefit-${color}`}
  >
    <div className={`ip-benefit-icon ip-icon-${color}`}>
      <Icon size={24} />
    </div>
    <h4 className="ip-benefit-title">{title}</h4>
    <p className="ip-benefit-desc">{description}</p>
  </motion.div>
)

// Coverage Card Component
const CoverageCard = ({ icon: Icon, title, description, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`ip-coverage-card ip-coverage-${color}`}
  >
    <div className={`ip-coverage-icon ip-icon-${color}`}>
      <Icon size={28} />
    </div>
    <h4 className="ip-coverage-title">{title}</h4>
    <p className="ip-coverage-desc">{description}</p>
  </motion.div>
)

// Process Step Card Component
const ProcessStepCard = ({ step, icon: Icon, title, description, color, index, totalSteps }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`ip-step-card ip-step-${color}`}
  >
    <div className="ip-step-number">{step}</div>
    <div className={`ip-step-icon ip-icon-${color}`}>
      <Icon size={24} />
    </div>
    <h4 className="ip-step-title">{title}</h4>
    <p className="ip-step-desc">{description}</p>
    {index < totalSteps - 1 && <ArrowRight className="ip-step-arrow" size={20} />}
  </motion.div>
)

// Vendor Benefit Card Component
const VendorBenefitCard = ({ icon: Icon, title, description, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`ip-vendor-card ip-vendor-${color}`}
  >
    <div className={`ip-vendor-icon ip-icon-${color}`}>
      <Icon size={28} />
    </div>
    <h4 className="ip-vendor-title">{title}</h4>
    <p className="ip-vendor-desc">{description}</p>
  </motion.div>
)

export default InsurancePartners
