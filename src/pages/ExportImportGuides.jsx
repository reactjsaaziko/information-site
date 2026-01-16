// Export & Import Guides Page - Redesigned for better readability
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
            Export & Import <span className="eig-gradient-text">Made Simple</span>
          </h1>
          <p className="eig-hero-subtitle">
            Practical guidance on documents, shipping, customs & inspection for global trade.
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



      <Footer />
    </div>
  )
}

export default ExportImportGuides
