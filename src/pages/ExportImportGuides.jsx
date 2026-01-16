// Export & Import Guides Page - Redesigned for better readability + SEO
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  BookOpen, FileText, Package, Ship, Shield, CheckCircle,
  AlertTriangle, Truck, ClipboardCheck,
  Tag, Box, FileCheck, DollarSign, HelpCircle,
  ArrowRight, Search, Scale, Clock, MapPin, ChevronDown, Zap
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './ExportImportGuides.css'

// SEO: FAQ Data
const faqs = [
  { q: 'What is an HS code and why is it important?', a: 'An HS (Harmonized System) code is a standardized numerical code used worldwide to classify traded products. It determines applicable customs duties, required permits, and documentation. Using the wrong HS code can result in incorrect duty payments, customs delays, or penalties.' },
  { q: 'What is the difference between FOB and CIF?', a: 'FOB (Free On Board) means the seller delivers goods to the vessel at the origin port—the buyer handles freight and insurance from there. CIF (Cost, Insurance, Freight) means the seller pays for freight and insurance to the destination port.' },
  { q: 'How long does international shipping take?', a: 'Sea freight typically takes 4-8 weeks depending on the route. Air freight takes 1-2 weeks. Add time for production, inspection, and customs clearance. Total lead time is usually 6-12 weeks for sea freight.' },
  { q: 'Do I need a Certificate of Origin for every shipment?', a: 'Not always, but many countries require it for customs clearance or to claim preferential duty rates under trade agreements. Check your destination country requirements.' },
  { q: 'When should I use pre-shipment inspection?', a: 'Use inspection for first orders with new suppliers, high-value shipments, custom or OEM products, and bulk orders. Inspection provides evidence of quality and quantity before shipping.' }
]

// SEO: Related internal links
const relatedLinks = [
  { label: 'Customs Documentation', to: '/customs-documentation' },
  { label: 'Export Documentation', to: '/export-documentation' },
  { label: 'Trade Agreements', to: '/trade-agreements' },
  { label: 'Shipment Tracking', to: '/shipment-tracking' },
  { label: 'How We Work', to: '/how-we-work' }
]

// Guide pages data for "More Guides" section
const guidePages = [
  { 
    title: 'Export Documents from India', 
    description: 'Complete checklist of documents required for exporting from India',
    to: '/guides/export-documents-from-india',
    icon: FileText
  },
  { 
    title: 'Import Documents Checklist', 
    description: 'Essential documents every importer needs for customs clearance',
    to: '/guides/import-documents-checklist',
    icon: ClipboardCheck
  },
  { 
    title: 'Incoterms Explained', 
    description: 'FOB, CIF, DDP and more - understand who pays for what',
    to: '/guides/incoterms-explained',
    icon: Scale
  },
  { 
    title: 'How to Find HS Code', 
    description: 'Step-by-step guide to product classification for customs',
    to: '/guides/how-to-find-hs-code',
    icon: Tag
  },
  { 
    title: 'Export Process Step by Step', 
    description: 'Complete export journey from order to delivery',
    to: '/guides/export-process-step-by-step',
    icon: Ship
  },
  { 
    title: 'Import Process Step by Step', 
    description: 'Full import workflow from sourcing to warehouse',
    to: '/guides/import-process-step-by-step',
    icon: Truck
  },
  { 
    title: 'RFQ Template', 
    description: 'How to write effective Request for Quotation',
    to: '/guides/rfq-template',
    icon: FileCheck
  },
  { 
    title: 'MOQ, Lead Time & Sampling', 
    description: 'Understanding minimum orders, timelines, and samples',
    to: '/guides/moq-lead-time-sampling',
    icon: Clock
  },
  // Cluster B - Logistics & Shipping
  { 
    title: 'Sea vs Air Freight', 
    description: 'How to choose the right shipping mode for your cargo',
    to: '/guides/sea-vs-air-freight',
    icon: Ship
  },
  { 
    title: 'Export Packaging & Labeling', 
    description: 'Packaging standards and labeling requirements for export',
    to: '/guides/export-packaging-labeling',
    icon: Box
  },
  { 
    title: 'Shipment Tracking Milestones', 
    description: 'Understanding cargo journey checkpoints and delays',
    to: '/guides/shipment-tracking-milestones',
    icon: Truck
  },
  { 
    title: 'Customs Clearance Basics', 
    description: 'Essential guide to clearing goods through customs',
    to: '/guides/customs-clearance-basics',
    icon: Shield
  },
  // Cluster C - Finance, Quality & Suppliers
  { 
    title: 'International Payment Terms', 
    description: 'T/T, L/C, D/P explained - choose the right payment method',
    to: '/guides/international-payment-terms',
    icon: DollarSign
  },
  { 
    title: 'Quality Inspection Checklist', 
    description: 'Pre-shipment inspection guide for buyers',
    to: '/guides/quality-inspection-checklist',
    icon: ClipboardCheck
  },
  { 
    title: 'Supplier Verification Checklist', 
    description: 'How to vet and verify suppliers before ordering',
    to: '/guides/supplier-verification-checklist',
    icon: CheckCircle
  }
]

const quickStartCards = [
  { icon: Tag, title: 'HS Code', description: 'Product classification for duties & docs', color: '#2563eb' },
  { icon: Scale, title: 'Incoterms', description: 'Who handles cost/risk (FOB, CIF, DDP)', color: '#0891b2' },
  { icon: Clock, title: 'Lead Time', description: 'Production → Shipping → Customs', color: '#059669' }
]

const journeySteps = [
  { title: 'Specs & Quote', icon: Package, desc: 'Define product, get pricing with Incoterm' },
  { title: 'Compliance', icon: Shield, desc: 'Check permits, labels, certificates' },
  { title: 'Packing', icon: Box, desc: 'Export-grade packaging & labeling' },
  { title: 'Inspection', icon: Search, desc: 'Quality check before shipping' },
  { title: 'Ship', icon: Ship, desc: 'Sea/Air/Rail with tracking' },
  { title: 'Customs', icon: MapPin, desc: 'Clear & deliver' }
]

const documentTabs = [
  { 
    id: 'commercial', 
    label: 'Commercial', 
    icon: FileText, 
    color: '#2563eb',
    items: ['Proforma Invoice / Contract', 'Commercial Invoice', 'Packing List'] 
  },
  { 
    id: 'shipping', 
    label: 'Shipping', 
    icon: Ship, 
    color: '#0891b2',
    items: ['Bill of Lading (Sea) / Airway Bill (Air)', 'Shipping Bill / Export declaration'] 
  },
  { 
    id: 'compliance', 
    label: 'Compliance', 
    icon: Shield, 
    color: '#059669',
    items: ['Certificate of Origin (COO)', 'Insurance certificate', 'Test/Lab reports', 'Product certs (CE, FDA, RoHS)', 'Fumigation certificate'] 
  }
]

const accordionData = [
  {
    id: 'packaging',
    title: 'Packaging & Labeling',
    icon: Box,
    content: {
      packaging: ['Carton size, net/gross weight, markings', 'Pallet type, strapping, stretch wrap', 'Moisture protection where needed', 'Handling marks (fragile/keep dry)'],
      labeling: ['Country language labels', 'MRP or importer details', 'Safety warnings & symbols']
    }
  },
  {
    id: 'inspection',
    title: 'When to Inspect',
    icon: ClipboardCheck,
    content: {
      when: ['First order with new supplier', 'High-value or tight-spec products', 'Custom branding orders', 'Bulk shipments'],
      what: ['Quantity & packing count', 'Quality vs sample/spec', 'Label correctness', 'Photo/video evidence']
    }
  },
  {
    id: 'customs',
    title: 'Avoid Customs Delays',
    icon: AlertTriangle,
    content: {
      issues: ['Wrong HS code or description', 'Missing COO/test report/permit', 'Non-compliant labeling', 'Invoice value mismatch', 'Undeclared restricted goods']
    }
  }
]

const costBreakdown = [
  { label: 'Product', icon: Package },
  { label: 'Packing', icon: Box },
  { label: 'Freight', icon: Ship },
  { label: 'Insurance', icon: Shield },
  { label: 'Port charges', icon: Truck },
  { label: 'Duties & taxes', icon: FileCheck },
  { label: 'Last-mile', icon: MapPin }
]

const glossaryTerms = [
  { term: 'EXW', def: 'Ex Works – Supplier hands over at factory' },
  { term: 'FOB', def: 'Free On Board – Delivered to vessel at origin' },
  { term: 'CIF', def: 'Cost + Insurance + Freight to destination' },
  { term: 'DDP', def: 'Delivered Duty Paid – All inclusive' },
  { term: 'COO', def: 'Certificate of Origin' },
  { term: 'BL/AWB', def: 'Bill of Lading / Airway Bill' }
]

const ExportImportGuides = () => {
  const heroRef = useRef(null)
  const [activeDocTab, setActiveDocTab] = useState('commercial')
  const [openAccordion, setOpenAccordion] = useState(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.eig-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.eig-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.eig-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  return (
    <div className="eig-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero - Compact */}
      <section ref={heroRef} className="eig-hero eig-hero-compact">
        <div className="eig-hero-content">
          <div className="eig-hero-badge">
            <BookOpen size={16} />
            <span>Trade Guides</span>
          </div>
          <h1 className="eig-hero-title">
            Export & Import Guides: <span className="eig-gradient-text">Practical Steps for International Trade</span>
          </h1>
          <p className="eig-hero-subtitle">
            Comprehensive guidance on documents, shipping, customs, and inspection. 
            Learn HS codes, Incoterms, and compliance requirements for successful global trade.
          </p>
        </div>
      </section>

    

      {/* Trade Journey - Horizontal Timeline */}
      <section className="eig-section eig-section-alt">
        <div className="eig-container">
          <div className="eig-section-header">
            <h2 className="eig-section-title">The Trade Journey</h2>
            <p className="eig-section-subtitle">From quote to delivery in 6 steps</p>
          </div>

          <div className="eig-journey-timeline">
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="eig-journey-step"
              >
                <div className="eig-journey-icon">
                  <step.icon size={22} />
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
                {index < journeySteps.length - 1 && <div className="eig-journey-connector" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents - Tabbed Interface */}
      <section className="eig-section">
        <div className="eig-container">
          <div className="eig-section-header">
            <h2 className="eig-section-title">Essential Documents</h2>
            <p className="eig-section-subtitle">Keep these ready for every shipment</p>
          </div>

          <div className="eig-docs-tabs">
            <div className="eig-tabs-nav">
              {documentTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`eig-tab-btn ${activeDocTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveDocTab(tab.id)}
                  style={{ '--tab-color': tab.color }}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {documentTabs.map((tab) => (
                activeDocTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="eig-tab-content"
                  >
                    <ul className="eig-doc-list">
                      {tab.items.map((item, i) => (
                        <li key={i}>
                          <CheckCircle size={16} style={{ color: tab.color }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          <div className="eig-pro-tip eig-pro-tip-centered">
            <HelpCircle size={18} />
            <span>Match details across all documents: product name, quantity, weights, HS code, consignee.</span>
          </div>
        </div>
      </section>

      {/* Accordion Section - Packaging, Inspection, Customs */}
      <section className="eig-section eig-section-alt">
        <div className="eig-container">
          <div className="eig-section-header">
            <h2 className="eig-section-title">Key Checkpoints</h2>
            <p className="eig-section-subtitle">Click to expand each topic</p>
          </div>

          <div className="eig-accordion-list">
            {accordionData.map((item) => (
              <div key={item.id} className={`eig-accordion-item ${openAccordion === item.id ? 'open' : ''}`}>
                <button className="eig-accordion-header" onClick={() => toggleAccordion(item.id)}>
                  <div className="eig-accordion-title">
                    <item.icon size={20} />
                    <span>{item.title}</span>
                  </div>
                  <ChevronDown size={20} className="eig-accordion-chevron" />
                </button>
                
                <AnimatePresence>
                  {openAccordion === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="eig-accordion-body"
                    >
                      <div className="eig-accordion-content">
                        {item.id === 'packaging' && (
                          <div className="eig-two-lists">
                            <div>
                              <h5>Packaging</h5>
                              <ul>
                                {item.content.packaging.map((p, i) => (
                                  <li key={i}><CheckCircle size={14} /><span>{p}</span></li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5>Labeling</h5>
                              <ul>
                                {item.content.labeling.map((l, i) => (
                                  <li key={i}><CheckCircle size={14} /><span>{l}</span></li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                        {item.id === 'inspection' && (
                          <div className="eig-two-lists">
                            <div>
                              <h5>When to inspect</h5>
                              <ul>
                                {item.content.when.map((w, i) => (
                                  <li key={i}><CheckCircle size={14} /><span>{w}</span></li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5>What to check</h5>
                              <ul>
                                {item.content.what.map((c, i) => (
                                  <li key={i}><CheckCircle size={14} /><span>{c}</span></li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                        {item.id === 'customs' && (
                          <div className="eig-customs-issues">
                            {item.content.issues.map((issue, i) => (
                              <div key={i} className="eig-issue-tag">
                                <AlertTriangle size={14} />
                                <span>{issue}</span>
                              </div>
                            ))}
                            <div className="eig-success-tip">
                              <CheckCircle size={16} />
                              <span>Do compliance check before production & before booking shipment.</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost & Glossary - Side by Side */}
      <section className="eig-section">
        <div className="eig-container">
          <div className="eig-split-section">
            {/* Cost Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="eig-split-card"
            >
              <div className="eig-split-header">
                <DollarSign size={22} />
                <h3>Cost Breakdown</h3>
              </div>
              <div className="eig-cost-flow">
                {costBreakdown.map((item, i) => (
                  <div key={i} className="eig-cost-chip">
                    <item.icon size={16} />
                    <span>{item.label}</span>
                    {i < costBreakdown.length - 1 && <span className="eig-cost-plus">+</span>}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Glossary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="eig-split-card"
            >
              <div className="eig-split-header">
                <BookOpen size={22} />
                <h3>Quick Glossary</h3>
              </div>
              <div className="eig-glossary-compact">
                {glossaryTerms.map((item, i) => (
                  <div key={i} className="eig-glossary-row">
                    <span className="eig-term">{item.term}</span>
                    <span className="eig-def">{item.def}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More Guides Section */}
      <section className="eig-section">
        <div className="eig-container">
          <div className="eig-section-header">
            <h2 className="eig-section-title">More Guides</h2>
            <p className="eig-section-subtitle">In-depth guides for specific trade topics</p>
          </div>
          <div className="eig-guides-grid">
            {guidePages.map((guide, index) => (
              <Link key={index} to={guide.to} className="eig-guide-card">
                <div className="eig-guide-icon">
                  <guide.icon size={24} />
                </div>
                <div className="eig-guide-content">
                  <h3>{guide.title}</h3>
                  <p>{guide.description}</p>
                </div>
                <ArrowRight size={18} className="eig-guide-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO: FAQ Section */}
      <section className="eig-section eig-section-alt">
        <div className="eig-container">
          <div className="eig-section-header">
            <h2 className="eig-section-title">Frequently Asked Questions</h2>
            <p className="eig-section-subtitle">Common questions about export-import procedures</p>
          </div>
          <div className="eig-faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`eig-faq-item ${expandedFaq === index ? 'open' : ''}`}>
                <button 
                  className="eig-faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={20} className="eig-faq-chevron" />
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="eig-faq-answer"
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
      <section className="eig-section">
        <div className="eig-container">
          <div className="eig-section-header">
            <h2 className="eig-section-title">Related Resources</h2>
          </div>
          <div className="eig-related-links">
            {relatedLinks.map((link, index) => (
              <Link key={index} to={link.to} className="eig-related-link">
                <ArrowRight size={16} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ExportImportGuides
