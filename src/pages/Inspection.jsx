// Aaziko Inspection Page - Seller Focused
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Search, ClipboardCheck, Camera, FileText, CheckCircle,
  Shield, Eye, AlertTriangle, Zap, Users, MessageSquare,
  ChevronDown, BadgeCheck, Factory, Globe, Package,
  FileCheck, Headphones, Image, Video, FlaskConical,
  Building2, Truck, Scale, Award, ThumbsUp, ThumbsDown,
  AlertCircle, ListChecks, Clipboard, UserCheck, Smartphone,
  Target, Heart, XCircle, ArrowRight, Calendar, MapPin
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './Inspection.css'

const trustStrip = [
  { icon: ListChecks, text: 'Clear checklists' },
  { icon: Camera, text: 'Photo + video proof' },
  { icon: FileText, text: 'Shareable reports' },
  { icon: Shield, text: 'Buyer confidence' }
]

const buyerMindset = [
  { icon: CheckCircle, title: 'Quality', description: 'Specs, finish, material, performance' },
  { icon: Scale, title: 'Quantity', description: 'Counts, weight, assortment' },
  { icon: Package, title: 'Packaging', description: 'Labeling, carton marks, export readiness' }
]

const problemsWithoutInspection = [
  { icon: AlertTriangle, text: 'Quality disputes after dispatch' },
  { icon: XCircle, text: 'Wrong quantity or mixed items' },
  { icon: Package, text: 'Packaging mistakes leading to damage or customs issues' },
  { icon: ThumbsDown, text: 'Return/rejection risk and relationship damage' }
]

const whatGetsInspected = [
  { icon: CheckCircle, title: 'Quality', description: 'Product specs, visual checks, workmanship, measurements (as applicable)' },
  { icon: Scale, title: 'Quantity', description: 'Piece count, carton count, weights (as applicable)' },
  { icon: Package, title: 'Packaging', description: 'Packing method, labeling, carton markings, export readiness' },
  { icon: FlaskConical, title: 'Optional Tests', description: 'Lab tests / certifications (only if required by product or destination)' }
]

const processSteps = [
  {
    step: 1,
    icon: ListChecks,
    title: 'Inspection Readiness Checklist',
    description: 'Know exactly what to prepare before inspection',
    color: 'primary'
  },
  {
    step: 2,
    icon: Calendar,
    title: 'Inspection Scheduled',
    description: 'Based on order stage and timeline',
    color: 'warning'
  },
  {
    step: 3,
    icon: Camera,
    title: 'Evidence Collected',
    description: 'Photos/videos + checklist notes captured',
    color: 'success'
  },
  {
    step: 4,
    icon: FileCheck,
    title: 'Report Shared',
    description: 'Clear pass/fail + remarks provided',
    color: 'info'
  },
  {
    step: 5,
    icon: CheckCircle,
    title: 'Fix & Re-check',
    description: 'If needed: fix points + re-check before dispatch',
    color: 'purple'
  }
]

const sellerPrepares = [
  { icon: Package, text: 'Goods ready as per buyer-approved specs' },
  { icon: ListChecks, text: 'Packing and labeling done as per checklist' },
  { icon: Eye, text: 'Samples/reference available (if the order was sample-based)' },
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
  { icon: Package, text: 'Packing readiness evidence (carton marking, inner packing, palletization if used)' }
]

const transparencyPoints = [
  'Inspection checks what\'s visible/measurable at the time of inspection.',
  'Some product categories may require lab tests or certifications depending on destination rules.',
  'Final acceptance is based on buyer\'s agreed specs and contract terms.'
]

const faqs = [
  { q: 'What do I need to prepare for inspection?', a: 'Goods ready as per buyer-approved specs, packing and labeling done as per checklist, samples/reference available if applicable, and access to factory/packing area with one responsible person present.' },
  { q: 'What gets checked during inspection?', a: 'Quality (specs, visual checks, workmanship), quantity (piece count, carton count, weights), packaging (labeling, carton markings, export readiness), and optional lab tests if required.' },
  { q: 'How does inspection help me as a seller?', a: 'Inspection provides proof that converts hesitant buyers into confirmed buyers. It reduces disputes, builds trust, and helps orders move smoothly.' },
  { q: 'What happens if issues are found?', a: 'You\'ll receive clear feedback on fix points and can re-check before dispatch. This prevents disputes after shipment.' },
  { q: 'Do I need lab tests for every product?', a: 'No, lab tests are only required if mandated by the product type or destination regulations. Most inspections cover visual and measurable checks.' }
]

// Related Guides for SEO
const relatedGuides = [
  { label: 'Quality Inspection Checklist', to: '/guides/quality-inspection-checklist' },
  { label: 'Supplier Verification Checklist', to: '/guides/supplier-verification-checklist' }
]

const Inspection = () => {
  const heroRef = useRef(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.inspection-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.inspection-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.inspection-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.inspection-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.inspection-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="inspection-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="inspection-hero">
        <div className="inspection-hero-content">
          <div className="inspection-hero-badge">
            <Search size={16} />
            <span>Aaziko Inspection</span>
          </div>
          <h1 className="inspection-hero-title">
            Inspection — <span className="inspection-gradient-text">prove quality with confidence</span>, while you stay focused on production
          </h1>
          <p className="inspection-hero-subtitle">
            International buyers want one thing before shipping: proof. Aaziko's inspection flow helps you deliver that proof clearly — so buyers trust faster, disputes reduce, and orders move smoothly.
          </p>
          <div className="inspection-hero-cta">
            <Link to="/inspection-readiness" className="inspection-btn-primary">
              <ClipboardCheck size={18} />
              Get Inspection Ready
            </Link>
            <button className="inspection-btn-secondary">
              <Headphones size={18} />
              Book Inspection Support
            </button>
          </div>
          
          {/* Trust Strip */}
          <div className="inspection-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="inspection-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What This Page Is For */}
      <section className="inspection-section">
        <div className="inspection-container">
          <div className="inspection-section-header">
            <span className="inspection-section-badge">Purpose</span>
            <h2 className="inspection-section-title">What This Page Is For</h2>
            <p className="inspection-section-desc">
              This page helps Indian manufacturers/sellers understand the inspection process and how to prepare.
            </p>
          </div>
          
          <div className="inspection-purpose-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inspection-purpose-card"
            >
              <Target size={28} />
              <h4>Why Inspection Matters</h4>
              <p>In international bulk orders, inspection is the bridge between your production and buyer confidence.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inspection-purpose-card"
            >
              <ListChecks size={28} />
              <h4>What Gets Checked</h4>
              <p>Quality, quantity, and packaging — the three pillars that buyers verify before shipping.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inspection-purpose-card"
            >
              <Clipboard size={28} />
              <h4>What You Need to Prepare</h4>
              <p>Simple checklist to ensure you're ready when inspection day arrives.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inspection-purpose-card"
            >
              <Zap size={28} />
              <h4>What Aaziko Coordinates</h4>
              <p>We make inspection simple and trusted so you can focus on production.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Inspection Matters - Buyer Mindset */}
      <section className="inspection-section inspection-section-alt">
        <div className="inspection-container">
          <div className="inspection-section-header">
            <span className="inspection-section-badge">Buyer Mindset</span>
            <h2 className="inspection-section-title">Why Inspection Matters</h2>
            <p className="inspection-section-desc">
              Buyers hesitate when they can't verify. Inspection reduces the biggest fear in global trade: <strong>"Will the goods match what I paid for?"</strong>
            </p>
          </div>
          
          <div className="inspection-mindset-grid">
            {buyerMindset.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="inspection-mindset-card"
              >
                <div className="inspection-mindset-icon">
                  <item.icon size={32} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Without Inspection */}
      <section className="inspection-section">
        <div className="inspection-container">
          <div className="inspection-section-header">
            <span className="inspection-section-badge">The Risk</span>
            <h2 className="inspection-section-title">Problems Without Inspection</h2>
            <p className="inspection-section-desc">
              Without inspection, common issues happen that damage relationships and cost money.
            </p>
          </div>
          
          <div className="inspection-problems-grid">
            {problemsWithoutInspection.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="inspection-problem-item"
              >
                <div className="inspection-problem-icon-wrapper">
                  <item.icon size={24} />
                </div>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Aaziko Makes Inspection Easy */}
      <section className="inspection-section inspection-section-alt">
        <div className="inspection-container">
          <div className="inspection-section-header">
            <span className="inspection-section-badge">Our Approach</span>
            <h2 className="inspection-section-title">How Aaziko Makes Inspection Easy</h2>
            <p className="inspection-section-desc">
              Aaziko helps you follow a clear, evidence-based inspection process.
            </p>
          </div>
          
          {/* What Gets Inspected */}
          <div className="inspection-subsection">
            <h3 className="inspection-subsection-title">
              <Eye size={20} />
              What Gets Inspected
            </h3>
            <div className="inspection-checked-grid">
              {whatGetsInspected.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="inspection-checked-card"
                >
                  <div className="inspection-checked-icon">
                    <item.icon size={24} />
                  </div>
                  <div className="inspection-checked-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* How It Works - Step by Step */}
          <div className="inspection-subsection">
            <h3 className="inspection-subsection-title">
              <ArrowRight size={20} />
              How It Works (Step-by-Step)
            </h3>
            <div className="inspection-steps-grid">
              {processSteps.map((step, index) => (
                <ProcessStepCard key={index} {...step} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You Do vs What Aaziko Does */}
      <section className="inspection-section">
        <div className="inspection-container">
          <div className="inspection-section-header">
            <span className="inspection-section-badge">Responsibilities</span>
            <h2 className="inspection-section-title">What You Need To Do vs What Aaziko Does</h2>
          </div>
          
          <div className="inspection-responsibility-grid">
            {/* Seller Prepares */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inspection-responsibility-card inspection-seller-card"
            >
              <div className="inspection-responsibility-header">
                <Factory size={24} />
                <h3>You Prepare</h3>
              </div>
              <ul className="inspection-responsibility-list">
                {sellerPrepares.map((item, index) => (
                  <li key={index}>
                    <item.icon size={18} />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Aaziko Coordinates */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inspection-responsibility-card inspection-aaziko-card"
            >
              <div className="inspection-responsibility-header">
                <Shield size={24} />
                <h3>Aaziko Coordinates</h3>
              </div>
              <ul className="inspection-responsibility-list">
                {aazikoCoordinates.map((item, index) => (
                  <li key={index}>
                    <item.icon size={18} />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Receive - Proof Pack */}
      <section className="inspection-section inspection-section-alt">
        <div className="inspection-container">
          <div className="inspection-section-header">
            <span className="inspection-section-badge">Deliverable</span>
            <h2 className="inspection-section-title">What You Receive (Proof Pack)</h2>
            <p className="inspection-section-desc">
              After inspection, you can share a clean "proof pack" to the buyer. This proof pack is what converts "maybe" buyers into "confirmed" buyers.
            </p>
          </div>
          
          <div className="inspection-proof-pack">
            <div className="inspection-proof-pack-visual">
              <div className="inspection-proof-pack-icon">
                <FileCheck size={48} />
              </div>
              <h4>Proof Pack</h4>
              <p>Complete evidence package for buyer confidence</p>
            </div>
            
            <div className="inspection-proof-pack-contents">
              {proofPackContents.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="inspection-proof-item"
                >
                  <item.icon size={20} />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="inspection-section">
        <div className="inspection-container">
          <div className="inspection-section-header">
            <span className="inspection-section-badge">Transparency</span>
            <h2 className="inspection-section-title">Limits / Transparency</h2>
            <p className="inspection-section-desc">
              Critical for trust — here's what you should know.
            </p>
          </div>
          
          <div className="inspection-transparency-card">
            <AlertTriangle size={32} />
            <ul className="inspection-transparency-list">
              {transparencyPoints.map((point, index) => (
                <li key={index}>
                  <CheckCircle size={16} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="inspection-section inspection-section-alt">
        <div className="inspection-container">
          <div className="inspection-section-header">
            <span className="inspection-section-badge">FAQ</span>
            <h2 className="inspection-section-title">Frequently Asked Questions</h2>
          </div>
          
          <div className="inspection-faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="inspection-faq-item">
                <button
                  className={`inspection-faq-question ${expandedFaq === index ? 'open' : ''}`}
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} />
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="inspection-faq-answer"
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides Section */}
      <section className="inspection-section">
        <div className="inspection-container">
          <div className="inspection-section-header">
            <span className="inspection-section-badge">Guides</span>
            <h2 className="inspection-section-title">Related Guides</h2>
          </div>
          <div className="inspection-related-links">
            {relatedGuides.map((guide, index) => (
              <Link key={index} to={guide.to} className="inspection-related-link">
                <ArrowRight size={16} />
                {guide.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="inspection-cta-section">
        <div className="inspection-container">
          <div className="inspection-cta-card">
            <div className="inspection-cta-content">
              <h3>Want buyers to trust your shipment before it leaves your factory?</h3>
              <p>Get inspection ready with our checklist and prep steps, or book inspection support if your product is regulated or high-value.</p>
            </div>
            <div className="inspection-cta-buttons">
              <Link to="/inspection-readiness" className="inspection-btn-primary inspection-btn-lg">
                <ClipboardCheck size={18} />
                Get Inspection Ready
              </Link>
              <button className="inspection-btn-secondary">
                <Headphones size={18} />
                Book Inspection Support
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Process Step Card Component
const ProcessStepCard = ({ step, icon: Icon, title, description, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`inspection-step-card inspection-step-${color}`}
  >
    <div className="inspection-step-number">{step}</div>
    <div className={`inspection-step-icon inspection-icon-${color}`}>
      <Icon size={24} />
    </div>
    <h4 className="inspection-step-title">{title}</h4>
    <p className="inspection-step-desc">{description}</p>
  </motion.div>
)

export default Inspection
