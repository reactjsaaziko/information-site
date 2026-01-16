// Trade Agreements (Basics) Page - Visual Design + SEO
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  Scale, Percent, FileText, Globe, XCircle, CheckCircle,
  Tag, FileCheck, AlertTriangle, ArrowRight, ArrowDown,
  Shield, BookOpen, Package, HelpCircle, ChevronDown
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './TradeAgreements.css'

// SEO: FAQ Data for rich snippets
const faqs = [
  { q: 'What is a Free Trade Agreement (FTA)?', a: 'An FTA is a treaty between countries that reduces or eliminates customs duties on qualifying goods. When your product qualifies under an FTA, you pay lower or zero import duty compared to standard rates.' },
  { q: 'How do I know if my product qualifies for FTA benefits?', a: 'Check three things: Is there an FTA between origin and destination countries? Is your HS code covered? Does the product meet Rules of Origin requirements (wholly obtained, substantial transformation, or value addition)?' },
  { q: 'What is a Certificate of Origin (COO)?', a: 'A COO is an official document certifying where goods were manufactured. For FTA claims, you need a preferential COO issued by authorized agencies like chambers of commerce.' },
  { q: 'What happens if customs rejects my FTA claim?', a: 'You pay the standard (MFN) duty rate instead of the preferential rate. Penalties may apply for incorrect claims. You can appeal with supporting documentation.' },
  { q: 'Can I claim FTA benefits with imported components?', a: 'Yes, if the product meets Rules of Origin criteria—typically substantial transformation (HS code change) or minimum value addition (usually 35-40% local content).' }
]

// SEO: Related internal links
const relatedLinks = [
  { label: 'Customs Documentation', to: '/customs-documentation' },
  { label: 'Export Documentation', to: '/export-documentation' },
  { label: 'Export Import Guides', to: '/guides' },
  { label: 'Verified Suppliers', to: '/verified-suppliers' }
]

const TradeAgreements = () => {
  const heroRef = useRef(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ta-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.ta-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.ta-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="ta-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="ta-hero">
        <div className="ta-hero-content">
          <div className="ta-hero-badge">
            <Scale size={16} />
            <span>Trade Agreements Basics</span>
          </div>
          <h1 className="ta-hero-title">
            Trade Agreements: How FTAs Reduce <span className="ta-gradient-text">Import Duties</span>
          </h1>
          <p className="ta-hero-subtitle">
            Free Trade Agreements and Preferential Trade Agreements can significantly reduce your import costs. 
            Learn how to qualify for duty benefits with proper documentation and origin compliance.
          </p>
        </div>
      </section>



      {/* 3 Key Concepts - Visual Flow */}
      <section className="ta-section ta-section-alt">
        <div className="ta-container">
          <h2 className="ta-visual-title">3 Things That Matter</h2>
          
          <div className="ta-flow-vertical">
            <motion.div 
              className="ta-flow-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="ta-flow-number">1</div>
              <div className="ta-flow-icon">
                <Tag size={28} />
              </div>
              <div className="ta-flow-content">
                <h3>HS Code</h3>
                <p>Wrong code = wrong duty</p>
              </div>
            </motion.div>

            <div className="ta-flow-connector">
              <ArrowDown size={24} />
            </div>

            <motion.div 
              className="ta-flow-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div className="ta-flow-number">2</div>
              <div className="ta-flow-icon">
                <Globe size={28} />
              </div>
              <div className="ta-flow-content">
                <h3>Country of Origin</h3>
                <p>Must meet Rules of Origin (RoO)</p>
                <div className="ta-mini-tags">
                  <span>Wholly obtained</span>
                  <span>Substantial transformation</span>
                  <span>Value addition</span>
                </div>
              </div>
            </motion.div>

            <div className="ta-flow-connector">
              <ArrowDown size={24} />
            </div>

            <motion.div 
              className="ta-flow-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="ta-flow-number">3</div>
              <div className="ta-flow-icon">
                <FileCheck size={28} />
              </div>
              <div className="ta-flow-content">
                <h3>Proof Required</h3>
                <p>Certificate of Origin + supporting docs</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Buyer vs Seller - Side by Side */}
      <section className="ta-section">
        <div className="ta-container">
          <h2 className="ta-visual-title">Quick Checklist</h2>
          
          <div className="ta-split-grid">
            <motion.div 
              className="ta-split-card ta-split-buyer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="ta-split-header">
                <Package size={24} />
                <h3>Buyers Ask</h3>
              </div>
              <ul className="ta-check-list">
                <li><CheckCircle size={16} /> HS code correct?</li>
                <li><CheckCircle size={16} /> Origin declared?</li>
                <li><CheckCircle size={16} /> FTA eligible?</li>
                <li><CheckCircle size={16} /> COO type needed?</li>
                <li><CheckCircle size={16} /> Special permits?</li>
              </ul>
            </motion.div>

            <motion.div 
              className="ta-split-card ta-split-seller"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="ta-split-header">
                <FileText size={24} />
                <h3>Sellers Prepare</h3>
              </div>
              <ul className="ta-check-list">
                <li><CheckCircle size={16} /> Correct HS code</li>
                <li><CheckCircle size={16} /> Manufacturing location</li>
                <li><CheckCircle size={16} /> Origin proof</li>
                <li><CheckCircle size={16} /> COO document</li>
                <li><CheckCircle size={16} /> Invoice trail & BOM</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Common Mistakes - Visual Warning */}
      <section className="ta-section ta-section-alt">
        <div className="ta-container">
          <h2 className="ta-visual-title ta-title-warning">
            <AlertTriangle size={28} />
            Avoid These Mistakes
          </h2>
          
          <div className="ta-mistakes-visual">
            <motion.div 
              className="ta-mistake-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <XCircle size={18} />
              <span>FTA claim without correct COO</span>
            </motion.div>
            <motion.div 
              className="ta-mistake-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <XCircle size={18} />
              <span>COO doesn't match invoice</span>
            </motion.div>
            <motion.div 
              className="ta-mistake-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <XCircle size={18} />
              <span>Wrong HS code</span>
            </motion.div>
            <motion.div 
              className="ta-mistake-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <XCircle size={18} />
              <span>Assembly ≠ Origin</span>
            </motion.div>
            <motion.div 
              className="ta-mistake-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <XCircle size={18} />
              <span>Missing origin docs at clearance</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simple Example - Visual Flow */}
      <section className="ta-section">
        <div className="ta-container">
          <h2 className="ta-visual-title">How It Works</h2>
          
          <motion.div 
            className="ta-example-flow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="ta-example-step">
              <div className="ta-example-icon">
                <Package size={24} />
              </div>
              <span>Import from India</span>
            </div>
            <ArrowRight size={24} className="ta-example-arrow" />
            <div className="ta-example-step">
              <div className="ta-example-icon">
                <HelpCircle size={24} />
              </div>
              <span>Customs checks</span>
            </div>
            <ArrowRight size={24} className="ta-example-arrow" />
            <div className="ta-example-questions-box">
              <div className="ta-q-item">HS code eligible?</div>
              <div className="ta-q-item">Origin rules met?</div>
              <div className="ta-q-item">COO valid?</div>
            </div>
            <ArrowRight size={24} className="ta-example-arrow" />
            <div className="ta-example-outcomes">
              <div className="ta-outcome ta-outcome-success">
                <CheckCircle size={18} />
                <span>Lower duty</span>
              </div>
              <div className="ta-outcome ta-outcome-fail">
                <XCircle size={18} />
                <span>Normal duty + delay</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documents - Simple Icons */}
      <section className="ta-section ta-section-alt">
        <div className="ta-container">
          <h2 className="ta-visual-title">Key Documents</h2>
          
          <div className="ta-docs-visual">
            <motion.div 
              className="ta-doc-icon-item"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <FileText size={28} />
              <span>Commercial Invoice</span>
            </motion.div>
            <motion.div 
              className="ta-doc-icon-item"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <FileText size={28} />
              <span>Packing List</span>
            </motion.div>
            <motion.div 
              className="ta-doc-icon-item"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <FileText size={28} />
              <span>Bill of Lading</span>
            </motion.div>
            <motion.div 
              className="ta-doc-icon-item ta-doc-highlight"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <FileCheck size={28} />
              <span>Certificate of Origin</span>
            </motion.div>
            <motion.div 
              className="ta-doc-icon-item"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <FileText size={28} />
              <span>BOM (if required)</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEO: FAQ Section */}
      <section className="ta-section">
        <div className="ta-container">
          <h2 className="ta-visual-title">Frequently Asked Questions</h2>
          <div className="ta-faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`ta-faq-item ${expandedFaq === index ? 'open' : ''}`}>
                <button 
                  className="ta-faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={20} className="ta-faq-chevron" />
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ta-faq-answer"
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
      <section className="ta-section ta-section-alt">
        <div className="ta-container">
          <h2 className="ta-visual-title">Related Resources</h2>
          <div className="ta-related-links">
            {relatedLinks.map((link, index) => (
              <Link key={index} to={link.to} className="ta-related-link">
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

export default TradeAgreements
