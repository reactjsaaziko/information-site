// Trade Solutions - Inspection Page (Seller Focused)
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Search, ClipboardCheck, Camera, FileText, CheckCircle,
  Shield, Eye, AlertTriangle, ChevronDown, Package,
  FileCheck, Headphones, Image, Scale, ListChecks, Clipboard,
  UserCheck, XCircle, ArrowRight, Calendar, MapPin,
  Factory, FlaskConical, Sparkles, BadgeCheck, TrendingUp
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AnimatedBackground from '../../components/ui/AnimatedBackground'
import './TradeSolutionsInspection.css'

const trustStrip = [
  { icon: ListChecks, text: 'Clear checklists' },
  { icon: Camera, text: 'Photo + video proof' },
  { icon: FileText, text: 'Shareable reports' },
  { icon: Shield, text: 'Buyer confidence' }
]

const problemsWithoutInspection = [
  { icon: AlertTriangle, title: 'Quality Disputes', text: 'Quality disputes after dispatch lead to costly returns' },
  { icon: XCircle, title: 'Quantity Issues', text: 'Wrong quantity or mixed items cause order rejections' },
  { icon: Package, title: 'Packaging Errors', text: 'Packaging mistakes leading to damage or customs issues' },
  { icon: AlertTriangle, title: 'Relationship Damage', text: 'Return/rejection risk damages buyer relationships' }
]

const whatGetsInspected = [
  { icon: CheckCircle, title: 'Quality', description: 'Product specs, visual checks, workmanship, measurements' },
  { icon: Scale, title: 'Quantity', description: 'Piece count, carton count, weights verification' },
  { icon: Package, title: 'Packaging', description: 'Packing method, labeling, carton markings, export readiness' },
  { icon: FlaskConical, title: 'Optional Tests', description: 'Lab tests / certifications (if required by product or destination)' }
]

const processSteps = [
  { step: 1, icon: ListChecks, title: 'Readiness Checklist', description: 'Know exactly what to prepare' },
  { step: 2, icon: Calendar, title: 'Scheduled', description: 'Based on order timeline' },
  { step: 3, icon: Camera, title: 'Evidence Collected', description: 'Photos/videos captured' },
  { step: 4, icon: FileCheck, title: 'Report Shared', description: 'Clear pass/fail remarks' },
  { step: 5, icon: CheckCircle, title: 'Fix & Re-check', description: 'Re-check before dispatch' }
]

const sellerPrepares = [
  { icon: Package, text: 'Goods ready as per buyer-approved specs' },
  { icon: ListChecks, text: 'Packing and labeling done as per checklist' },
  { icon: Eye, text: 'Samples/reference available (if sample-based)' },
  { icon: MapPin, text: 'Access to factory/packing area for inspection' },
  { icon: UserCheck, text: 'One responsible person present for coordination' }
]

const aazikoCoordinates = [
  { icon: Clipboard, text: 'Inspection checklist and guidance (simple & order-based)' },
  { icon: Calendar, text: 'Inspection scheduling support (as per order need)' },
  { icon: FileText, text: 'Report structure (clear, buyer-friendly)' },
  { icon: Camera, text: 'Evidence packaging (photos/videos/docs) for transparency' },
  { icon: Headphones, text: 'Escalation support if buyer asks questions post-inspection' }
]

const proofPackContents = [
  { icon: FileText, text: 'Inspection report summary (clear highlights)' },
  { icon: Image, text: 'Photos/videos of goods and packaging' },
  { icon: Scale, text: 'Quantity confirmation (as applicable)' },
  { icon: Package, text: 'Packing readiness evidence (carton marking, inner packing)' }
]

const transparencyPoints = [
  { icon: Eye, text: 'Inspection checks what\'s visible/measurable at the time of inspection.' },
  { icon: FlaskConical, text: 'Some product categories may require lab tests depending on destination rules.' },
  { icon: FileCheck, text: 'Final acceptance is based on buyer\'s agreed specs and contract terms.' }
]

const faqs = [
  { q: 'What do I need to prepare for inspection?', a: 'Goods ready as per buyer-approved specs, packing and labeling done as per checklist, samples/reference available if applicable, and access to factory/packing area with one responsible person present.' },
  { q: 'What gets checked during inspection?', a: 'Quality (specs, visual checks, workmanship), quantity (piece count, carton count, weights), packaging (labeling, carton markings, export readiness), and optional lab tests if required.' },
  { q: 'How does inspection help me as a seller?', a: 'Inspection provides proof that converts hesitant buyers into confirmed buyers. It reduces disputes, builds trust, and helps orders move smoothly.' },
  { q: 'What happens if issues are found?', a: 'You\'ll receive clear feedback on fix points and can re-check before dispatch. This prevents disputes after shipment.' },
  { q: 'Do I need lab tests for every product?', a: 'No, lab tests are only required if mandated by the product type or destination regulations. Most inspections cover visual and measurable checks.' }
]

const benefits = [
  { icon: BadgeCheck, title: 'Build Trust Faster', description: 'Proof-backed quality builds buyer confidence instantly' },
  { icon: Shield, title: 'Reduce Disputes', description: 'Clear documentation prevents post-shipment conflicts' },
  { icon: TrendingUp, title: 'Win More Orders', description: 'Professional inspection reports help close deals' }
]

const TradeSolutionsInspection = () => {
  const heroRef = useRef(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tsi-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.tsi-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.tsi-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.tsi-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.tsi-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="tsi-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="tsi-hero">
        <div className="tsi-hero-bg">
          <div className="tsi-hero-gradient" />
          <div className="tsi-hero-pattern" />
        </div>
        <div className="tsi-hero-content">
          <motion.div 
            className="tsi-hero-badge"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Search size={16} />
            <span>Trade Solutions</span>
            <ArrowRight size={14} />
            <span>Inspection</span>
          </motion.div>
          
          <h1 className="tsi-hero-title">
            Prove Quality with <span className="tsi-gradient-text">Confidence</span>
            <br />
            <span className="tsi-hero-title-sub">While You Stay Focused on Production</span>
          </h1>
          
          <p className="tsi-hero-subtitle">
            International buyers want one thing before shipping: <strong>proof</strong>. 
            Aaziko's inspection flow helps you deliver that proof clearly — so buyers trust faster, 
            disputes reduce, and orders move smoothly.
          </p>
          
          <div className="tsi-hero-cta">
            <Link to="/inspection-readiness" className="tsi-btn-primary">
              <ClipboardCheck size={20} />
              Get Inspection Ready
              <Sparkles size={16} className="tsi-btn-sparkle" />
            </Link>
            <button className="tsi-btn-secondary">
              <Headphones size={20} />
              Book Inspection Support
            </button>
          </div>
          
          {/* Trust Strip */}
          <div className="tsi-trust-strip">
            {trustStrip.map((item, index) => (
              <motion.div 
                key={index} 
                className="tsi-trust-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="tsi-trust-icon">
                  <item.icon size={18} />
                </div>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Without Inspection */}
      <section className="tsi-section tsi-problems-section">
        <div className="tsi-container">
          <div className="tsi-section-header">
            <span className="tsi-section-badge tsi-badge-warning">
              <AlertTriangle size={14} />
              Why It Matters
            </span>
            <h2 className="tsi-section-title">What Happens Without Proper Inspection?</h2>
            <p className="tsi-section-desc">
              Skipping inspection can lead to costly problems that damage your business and buyer relationships.
            </p>
          </div>
          
          <div className="tsi-problems-grid">
            {problemsWithoutInspection.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="tsi-problem-card"
              >
                <div className="tsi-problem-icon">
                  <item.icon size={24} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="tsi-section tsi-benefits-section">
        <div className="tsi-container">
          <div className="tsi-section-header">
            <span className="tsi-section-badge tsi-badge-success">
              <CheckCircle size={14} />
              Benefits
            </span>
            <h2 className="tsi-section-title">Why Inspection Helps You Win</h2>
          </div>
          
          <div className="tsi-benefits-grid">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="tsi-benefit-card"
              >
                <div className="tsi-benefit-icon">
                  <item.icon size={28} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Gets Inspected */}
      <section className="tsi-section tsi-section-alt">
        <div className="tsi-container">
          <div className="tsi-section-header">
            <span className="tsi-section-badge">
              <Eye size={14} />
              Our Approach
            </span>
            <h2 className="tsi-section-title">What Gets Inspected</h2>
            <p className="tsi-section-desc">
              Comprehensive checks to ensure your products meet buyer expectations.
            </p>
          </div>
          
          <div className="tsi-inspected-grid">
            {whatGetsInspected.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="tsi-inspected-card"
              >
                <div className="tsi-inspected-icon">
                  <item.icon size={28} />
                </div>
                <div className="tsi-inspected-content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="tsi-section tsi-process-section">
        <div className="tsi-container">
          <div className="tsi-section-header">
            <span className="tsi-section-badge">
              <ArrowRight size={14} />
              Step by Step
            </span>
            <h2 className="tsi-section-title">How It Works</h2>
            <p className="tsi-section-desc">
              A simple, clear process from preparation to final report.
            </p>
          </div>
          
          <div className="tsi-process-timeline">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="tsi-process-step"
              >
                <div className="tsi-process-number">{step.step}</div>
                <div className="tsi-process-connector" />
                <div className="tsi-process-card">
                  <div className="tsi-process-icon">
                    <step.icon size={24} />
                  </div>
                  <div className="tsi-process-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="tsi-section tsi-section-alt">
        <div className="tsi-container">
          <div className="tsi-section-header">
            <span className="tsi-section-badge">
              <UserCheck size={14} />
              Responsibilities
            </span>
            <h2 className="tsi-section-title">What You Do vs What Aaziko Does</h2>
          </div>
          
          <div className="tsi-responsibility-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="tsi-responsibility-card tsi-seller-card"
            >
              <div className="tsi-responsibility-header">
                <div className="tsi-responsibility-icon">
                  <Factory size={28} />
                </div>
                <div>
                  <h3>You Prepare</h3>
                  <span>Your responsibilities</span>
                </div>
              </div>
              <ul className="tsi-responsibility-list">
                {sellerPrepares.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="tsi-list-icon">
                      <item.icon size={18} />
                    </div>
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="tsi-responsibility-card tsi-aaziko-card"
            >
              <div className="tsi-responsibility-header">
                <div className="tsi-responsibility-icon">
                  <Shield size={28} />
                </div>
                <div>
                  <h3>Aaziko Coordinates</h3>
                  <span>We handle this for you</span>
                </div>
              </div>
              <ul className="tsi-responsibility-list">
                {aazikoCoordinates.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="tsi-list-icon">
                      <item.icon size={18} />
                    </div>
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proof Pack */}
      <section className="tsi-section tsi-proofpack-section">
        <div className="tsi-container">
          <div className="tsi-section-header">
            <span className="tsi-section-badge tsi-badge-success">
              <FileCheck size={14} />
              Deliverable
            </span>
            <h2 className="tsi-section-title">What You Receive (Proof Pack)</h2>
            <p className="tsi-section-desc">
              After inspection, share a clean "proof pack" to the buyer. 
              This is what converts "maybe" buyers into "confirmed" buyers.
            </p>
          </div>
          
          <div className="tsi-proofpack-container">
            <motion.div 
              className="tsi-proofpack-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="tsi-proofpack-glow" />
              <div className="tsi-proofpack-icon">
                <FileCheck size={56} />
              </div>
              <h4>Proof Pack</h4>
              <p>Complete evidence package for buyer confidence</p>
              <div className="tsi-proofpack-badge">
                <BadgeCheck size={16} />
                Verified & Ready to Share
              </div>
            </motion.div>
            
            <div className="tsi-proofpack-contents">
              {proofPackContents.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="tsi-proof-item"
                >
                  <div className="tsi-proof-icon">
                    <item.icon size={22} />
                  </div>
                  <span>{item.text}</span>
                  <CheckCircle size={18} className="tsi-proof-check" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Note */}
      <section className="tsi-section tsi-section-alt">
        <div className="tsi-container">
          <motion.div 
            className="tsi-transparency-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="tsi-transparency-header">
              <AlertTriangle size={24} />
              <h3>Important to Know</h3>
            </div>
            <ul className="tsi-transparency-list">
              {transparencyPoints.map((point, index) => (
                <li key={index}>
                  <point.icon size={18} />
                  <span>{point.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="tsi-section tsi-faq-section">
        <div className="tsi-container">
          <div className="tsi-section-header">
            <span className="tsi-section-badge">
              <Headphones size={14} />
              FAQs
            </span>
            <h2 className="tsi-section-title">Frequently Asked Questions</h2>
          </div>
          
          <div className="tsi-faq-container">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`tsi-faq-item ${expandedFaq === index ? 'expanded' : ''}`}
              >
                <button 
                  className="tsi-faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={20} className="tsi-faq-chevron" />
                </button>
                <div className="tsi-faq-answer">
                  <p>{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="tsi-section tsi-cta-section">
        <div className="tsi-container">
          <motion.div 
            className="tsi-cta-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="tsi-cta-content">
              <h3>Ready to Build Buyer Confidence?</h3>
              <p>Get started with inspection support and win more orders with proof-backed quality.</p>
            </div>
            <div className="tsi-cta-buttons">
              <Link to="/inspection-readiness" className="tsi-btn-primary tsi-btn-light">
                <ClipboardCheck size={20} />
                Get Inspection Ready
              </Link>
              <button className="tsi-btn-secondary tsi-btn-outline">
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

export default TradeSolutionsInspection
