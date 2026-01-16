// Aaziko Customs & Compliance Page + SEO
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  FileText, Shield, CheckCircle,
  AlertTriangle, ChevronDown,
  ClipboardCheck, Headphones,
  Package, Building2, BookOpen,
  FileSpreadsheet, Award, Tag,
  Box, FileCheck, AlertCircle, Layers,
  ListChecks, ArrowRight
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './CustomsDocumentation.css'

// SEO: FAQ Data
const seoFaqs = [
  { q: 'What documents do I need for customs clearance?', a: 'At minimum: Commercial Invoice, Packing List, and Bill of Lading (or Airway Bill). Depending on your product and destination, you may also need Certificate of Origin, test reports, product certifications, and special permits.' },
  { q: 'What happens if my documents have errors?', a: 'Document errors cause customs holds and delays. Minor errors may require amendments (additional fees and time). Major errors can result in detailed inspections, duty disputes, or shipment rejection.' },
  { q: 'How do I know the labeling requirements for my destination?', a: 'Labeling requirements vary by country and product category. Check with your customs broker, destination country trade ministry, or use Aaziko guidance for corridor-specific requirements.' },
  { q: 'Does Aaziko handle customs clearance directly?', a: 'Aaziko provides compliance guidance, checklists, and coordination support. Final customs decisions are made by customs authorities. We help you be clearance-ready.' },
  { q: 'How often do customs rules change?', a: 'Customs rules can change based on trade policies, safety regulations, and international agreements. Requirements vary by product and destination. Verify current requirements before each shipment.' }
]

// SEO: Related internal links
const seoRelatedLinks = [
  { label: 'Export Documentation', to: '/export-documentation' },
  { label: 'Trade Agreements', to: '/trade-agreements' },
  { label: 'Export Import Guides', to: '/guides' },
  { label: 'Shipment Tracking', to: '/shipment-tracking' },
  { label: 'How We Work', to: '/how-we-work' }
]

// Related Guides for SEO
const relatedGuides = [
  { label: 'Customs Clearance Basics', to: '/guides/customs-clearance-basics' },
  { label: 'Export Packaging & Labeling', to: '/guides/export-packaging-labeling' },
  { label: 'Import Documents Checklist', to: '/guides/import-documents-checklist' },
  { label: 'How to Find HS Code', to: '/guides/how-to-find-hs-code' },
  { label: 'Import Process Step by Step', to: '/guides/import-process-step-by-step' }
]

const trustStrip = [
  { icon: Shield, text: 'Compliance Guidance' },
  { icon: FileText, text: 'Export Checklists' },
  { icon: CheckCircle, text: 'Clearance Ready' }
]

const commonProblems = [
  { 
    icon: FileText, 
    title: 'Wrong or Incomplete Documents', 
    description: 'Shipment held at customs due to missing or incorrect paperwork.',
    color: 'orange'
  },
  { 
    icon: Tag, 
    title: 'Labeling/Packing Mismatch', 
    description: 'Labels or packaging not matching destination rules leads to rework or rejection.',
    color: 'red'
  },
  { 
    icon: AlertTriangle, 
    title: 'HS-Code Confusion', 
    description: 'Incorrect classification causes duty disputes and penalties.',
    color: 'purple'
  },
  { 
    icon: BookOpen, 
    title: '300–400 Page Legal Rules', 
    description: 'Complex regulations too hard to understand without expert help.',
    color: 'amber'
  },
  { 
    icon: AlertCircle, 
    title: 'Unclear Broker Guidance', 
    description: 'Agents give vague instructions causing last-minute stress.',
    color: 'rose'
  }
]

const checklistSections = [
  {
    icon: Package,
    title: 'Product Compliance',
    subtitle: 'What to take care in the product',
    color: 'primary',
    items: [
      'Product description clarity (material, grade, composition)',
      'Restricted/prohibited items checks (if applicable)',
      'Any special handling requirements (if applicable)'
    ]
  },
  {
    icon: Tag,
    title: 'Labeling & Packaging Rules',
    subtitle: 'As per export/import corridor',
    color: 'info',
    items: [
      'Mandatory label fields (country-specific)',
      'Carton marking guidance (batch, qty, origin, handling marks)',
      'Packaging restrictions (materials, warnings, seals)',
      'Palletization and packing standards (if required)'
    ]
  },
  {
    icon: FileSpreadsheet,
    title: 'Documents, Tests & Certificates',
    subtitle: 'Clear requirement list',
    color: 'success',
    items: [
      'Commercial Invoice + Packing List format support',
      'Certificates (if applicable): COO, MSDS, COA, etc.',
      'Lab tests/reports (if required for your product category)'
    ]
  }
]

const sellerProvides = [
  { icon: FileCheck, text: 'Correct product details (specs, material, packaging type)' },
  { icon: FileSpreadsheet, text: 'Accurate invoice information (company name, address, GST/IEC if applicable)' },
  { icon: Box, text: 'Ready goods with correct packing as per checklist' },
  { icon: Award, text: 'Any existing certificates you already have (if any)' }
]

const aazikoHandles = [
  { icon: ClipboardCheck, text: 'Customs-ready checklist and corridor-specific guidance' },
  { icon: FileText, text: 'Document structure support (formats + missing-item checks)' },
  { icon: Tag, text: 'Label/packing compliance review checklist' },
  { icon: Building2, text: 'Coordination with CHA/service partners where required' },
  { icon: Layers, text: 'Step-by-step export flow so your shipment moves without confusion' }
]

const whatYouReceive = [
  { icon: ListChecks, title: 'Customs-Ready Checklist', description: 'Simple, practical checklist tailored to your product', color: 'blue' },
  { icon: CheckCircle, title: 'Clear Bullet-Point Guidance', description: 'Specific guidance for your product + destination', color: 'green' },
  { icon: FileText, title: 'Document Summary', description: 'Requirement summary without long legal text', color: 'teal' },
  { icon: Shield, title: 'Reduced Risk', description: 'Lower chance of holds, penalties, rejection, or rework', color: 'purple' }
]

const faqs = [
  { q: 'What documents do I need to provide as a seller?', a: 'You need to provide correct product details, accurate invoice information, goods packed as per checklist, and any existing certificates you have. Aaziko guides you on the rest.' },
  { q: 'Does Aaziko handle customs clearance directly?', a: 'Aaziko provides compliance guidance, checklists, and coordination support. Final customs decisions remain with customs authorities. We help you be clearance-ready.' },
  { q: 'What if my product has special requirements?', a: 'Our export support team can help with regulated or complex products. Use the "Talk to Export Support" option for personalized guidance.' },
  { q: 'How often do customs rules change?', a: 'Customs rules vary by product and destination and can change over time. Aaziko keeps guidance updated, but we recommend checking before each shipment.' }
]

const CustomsDocumentation = () => {
  const heroRef = useRef(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.customs-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.customs-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.customs-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.customs-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.customs-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="customs-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="customs-hero">
        <div className="customs-hero-content">
          <div className="customs-hero-badge">
            <Building2 size={16} />
            <span>Customs</span>
          </div>
          <h1 className="customs-hero-title">
            Customs Documentation: <span className="customs-gradient-text">Complete Guide to Import Compliance</span>
          </h1>
          <p className="customs-hero-subtitle">
            Export documentation and customs rules can slow down or even block shipments if one detail is missed. With Aaziko, you don't need to become a customs expert. You manufacture and pack as agreed—Aaziko guides and coordinates the customs + compliance steps for smooth export.
          </p>
          <div className="customs-hero-cta">
            <Link to="/suppliers/export-documentation" className="customs-btn-primary">
              <FileText size={18} />
              Get Export Checklist
            </Link>
            <button className="customs-btn-secondary">
              <Headphones size={18} />
              Talk to Export Support
            </button>
          </div>
          
          {/* Trust Strip */}
          <div className="customs-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="customs-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Common Problems Section */}
      <section className="customs-section customs-section-alt">
        <div className="customs-container">
          <div className="customs-section-header">
            <span className="customs-section-badge">Common Challenges</span>
            <h2 className="customs-section-title">Common Problems Sellers Face Without Aaziko</h2>
            <p className="customs-section-subtitle">Traditional exporting often fails because of these issues:</p>
          </div>
          
          <div className="customs-problems-grid">
            {commonProblems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="customs-problem-card customs-card-wiggle"
              >
                <div className={`customs-problem-icon customs-icon-${item.color}`}>
                  <item.icon size={24} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Aaziko Simplifies Section */}
      <section className="customs-section">
        <div className="customs-container">
          <div className="customs-section-header">
            <span className="customs-section-badge">Simplified Process</span>
            <h2 className="customs-section-title">How Aaziko Simplifies Customs for You</h2>
            <p className="customs-section-subtitle">Aaziko converts complex rules into a clear 3-part checklist so you know exactly what to do.</p>
          </div>
          
          <div className="customs-checklist-grid">
            {checklistSections.map((section, index) => (
              <ChecklistCard key={index} {...section} index={index} />
            ))}
          </div>
        </div>
      </section>

     

      {/* What You Receive Section */}
      <section className="customs-section">
        <div className="customs-container">
          <div className="customs-section-header">
            <span className="customs-section-badge">Your Benefits</span>
            <h2 className="customs-section-title">What You Receive (So You Feel Confident)</h2>
          </div>
          
          <div className="customs-receive-grid">
            {whatYouReceive.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="customs-receive-card customs-card-wiggle"
              >
                <div className={`customs-receive-icon customs-icon-${item.color}`}>
                  <item.icon size={28} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO: FAQ Section */}
      <section className="customs-section customs-section-alt">
        <div className="customs-container">
          <div className="customs-section-header">
            <span className="customs-section-badge">FAQ</span>
            <h2 className="customs-section-title">Frequently Asked Questions</h2>
          </div>
          <div className="customs-faq-list">
            {seoFaqs.map((faq, index) => (
              <div key={index} className={`customs-faq-item ${expandedFaq === index ? 'open' : ''}`}>
                <button 
                  className="customs-faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={20} className="customs-faq-chevron" />
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="customs-faq-answer"
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO: Related Pages */}
      <section className="customs-section">
        <div className="customs-container">
          <div className="customs-section-header">
            <h2 className="customs-section-title">Related Resources</h2>
          </div>
          <div className="customs-related-links">
            {seoRelatedLinks.map((link, index) => (
              <Link key={index} to={link.to} className="customs-related-link">
                <ArrowRight size={16} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides Section */}
      <section className="customs-section customs-section-alt">
        <div className="customs-container">
          <div className="customs-section-header">
            <h2 className="customs-section-title">Related Guides</h2>
          </div>
          <div className="customs-related-links">
            {relatedGuides.map((guide, index) => (
              <Link key={index} to={guide.to} className="customs-related-link">
                <ArrowRight size={16} />
                {guide.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Checklist Card Component
const ChecklistCard = ({ icon: Icon, title, subtitle, color, items, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`customs-checklist-card customs-checklist-${color} customs-card-wiggle`}
  >
    <div className="customs-checklist-header">
      <div className={`customs-checklist-icon customs-checklist-icon-${color}`}>
        <Icon size={24} />
      </div>
    </div>
    <h4 className="customs-checklist-title">{title}</h4>
    <p className="customs-checklist-subtitle">{subtitle}</p>
    <ul className="customs-checklist-items">
      {items.map((item, i) => (
        <li key={i}>
          <CheckCircle size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
)

export default CustomsDocumentation
