// Aaziko Dispute & Resolution Support Page - Premium 3D Light Theme
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Shield, Scale, FileText, CheckCircle, AlertTriangle,
  MessageSquare, Camera, Video, Package, Truck, ClipboardCheck,
  ChevronDown, Eye, FileCheck, Image, AlertCircle, ListChecks,
  ThumbsUp, ThumbsDown, Handshake, Globe, Factory, BadgeCheck,
  Upload, Search, Gavel, RefreshCw, DollarSign, Ban
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './DisputeResolution.css'

const trustStrip = [
  { icon: Scale, text: 'Evidence-based review' },
  { icon: FileCheck, text: 'Structured process' },
  { icon: Shield, text: 'Fair for both parties' },
  { icon: Eye, text: 'Transparent outcomes' }
]

const whenApplies = [
  { icon: AlertTriangle, text: 'Quality not matching agreed specs' },
  { icon: Package, text: 'Quantity / packing mismatch' },
  { icon: AlertCircle, text: 'Damage, missing items, or wrong labeling (as per agreed contract)' },
  { icon: Truck, text: 'Delivery / shipment-related issues (based on documents + inspection + logistics proof)' }
]

const processSteps = [
  {
    step: 1,
    icon: MessageSquare,
    title: 'Raise a Dispute',
    description: 'From the order page, choose reason + add short note',
    color: 'primary'
  },
  {
    step: 2,
    icon: Upload,
    title: 'Share Evidence',
    description: 'Inspection report/video, photos, invoice, packing list, shipping docs',
    color: 'warning'
  },
  {
    step: 3,
    icon: Search,
    title: 'Aaziko Reviews',
    description: 'Compares with order contract + proof pack',
    color: 'info'
  },
  {
    step: 4,
    icon: Gavel,
    title: 'Resolution Outcome',
    description: 'Agreed corrective action based on evidence',
    color: 'success'
  }
]

const evidenceMatters = [
  { icon: FileCheck, text: 'Inspection report / inspection video' },
  { icon: ListChecks, text: 'Packing list + commercial invoice' },
  { icon: Camera, text: 'Photos/videos at packing stage' },
  { icon: Truck, text: 'Shipping documents (BL/AWB), tracking, delivery proof (if applicable)' }
]

const whatYouGet = [
  { icon: ClipboardCheck, text: 'A structured, non-chaotic dispute process' },
  { icon: Scale, text: 'Evidence-based review (not "who shouts louder")' }
]

const resolutionOptions = [
  { icon: RefreshCw, text: 'Replacement / rework plan (if feasible)', color: 'primary' },
  { icon: DollarSign, text: 'Price adjustment (if mutually agreed)', color: 'success' },
  { icon: Shield, text: 'Claim support with the service partner (if damage happened in transit)', color: 'info' }
]

const importantLimits = [
  { icon: Ban, text: 'Aaziko can\'t approve disputes without evidence' },
  { icon: FileText, text: 'Aaziko can\'t change the agreed order terms after confirmation' },
  { icon: Globe, text: 'Customs holds, port delays, or government actions are outside platform control (we guide, but rules vary)' },
  { icon: Handshake, text: 'Final outcomes depend on the order contract + proofs + partner policies (inspection/logistics/insurance if used)' }
]

const faqs = [
  { q: 'How do I raise a dispute?', a: 'Go to your order page, click "Raise Dispute", select the reason, and add a short note explaining the issue.' },
  { q: 'What evidence do I need to submit?', a: 'Inspection reports, photos/videos, packing lists, commercial invoices, and shipping documents are the most important evidence types.' },
  { q: 'How long does the resolution process take?', a: 'Resolution time depends on the complexity of the dispute and the evidence provided. Most disputes are resolved within 5-10 business days.' },
  { q: 'Can I dispute after receiving the goods?', a: 'Yes, but you must raise the dispute within the agreed timeframe and provide evidence of the issue.' },
  { q: 'What if I don\'t have inspection evidence?', a: 'Without evidence, it becomes difficult to verify claims. We strongly recommend using Aaziko\'s inspection service for all orders.' }
]

const DisputeResolution = () => {
  const heroRef = useRef(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dispute-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.dispute-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.dispute-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.dispute-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.dispute-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="dispute-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="dispute-hero">
        <div className="dispute-hero-content">
          <div className="dispute-hero-badge">
            <Scale size={16} />
            <span>Dispute & Resolution Support</span>
          </div>
          <h1 className="dispute-hero-title">
            Clear, fair resolution — <span className="dispute-gradient-text">built on evidence</span>
          </h1>
          <p className="dispute-hero-subtitle">
            Aaziko helps resolve issues with a structured process that keeps global trade 
            easiest, transparent, and trustful for both buyer and seller.
          </p>
          <div className="dispute-hero-cta">
            <Link to="/orders" className="dispute-btn-primary">
              <MessageSquare size={18} />
              Raise a Dispute
            </Link>
            <button className="dispute-btn-secondary">
              <Eye size={18} />
              How It Works
            </button>
          </div>
          
          {/* Trust Strip */}
          <div className="dispute-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="dispute-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When This Support Applies Section */}
      <section className="dispute-section">
        <div className="dispute-container">
          <div className="dispute-section-header">
            <span className="dispute-section-badge">When It Applies</span>
            <h2 className="dispute-section-title">When This Support Applies</h2>
            <p className="dispute-section-desc">
              Dispute resolution is available for specific order-related issues.
            </p>
          </div>
          
          <div className="dispute-applies-grid">
            {whenApplies.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="dispute-applies-card"
              >
                <div className="dispute-applies-icon">
                  <item.icon size={24} />
                </div>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Aaziko Resolves It Section */}
      <section className="dispute-section dispute-section-alt">
        <div className="dispute-container">
          <div className="dispute-section-header">
            <span className="dispute-section-badge">Process</span>
            <h2 className="dispute-section-title">How Aaziko Resolves It</h2>
            <p className="dispute-section-desc">
              4 simple steps from dispute to resolution.
            </p>
          </div>
          
          {/* Timeline Strip */}
          <div className="dispute-timeline-strip">
            <div className="dispute-timeline-item">Raise</div>
            <div className="dispute-timeline-arrow">→</div>
            <div className="dispute-timeline-item">Evidence</div>
            <div className="dispute-timeline-arrow">→</div>
            <div className="dispute-timeline-item">Review</div>
            <div className="dispute-timeline-arrow">→</div>
            <div className="dispute-timeline-item">Resolution</div>
          </div>
          
          <div className="dispute-steps-grid">
            {processSteps.map((step, index) => (
              <ProcessStepCard key={index} {...step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* What Evidence Matters Most Section */}
      <section className="dispute-section">
        <div className="dispute-container">
          <div className="dispute-section-header">
            <span className="dispute-section-badge">Evidence</span>
            <h2 className="dispute-section-title">What Evidence Matters Most</h2>
            <p className="dispute-section-desc">
              Strong evidence leads to faster, fairer resolutions.
            </p>
          </div>
          
          <div className="dispute-evidence-grid">
            {evidenceMatters.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="dispute-evidence-card"
              >
                <div className="dispute-evidence-icon">
                  <item.icon size={28} />
                </div>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Evidence Gallery Preview */}
          <div className="dispute-evidence-gallery">
            <h4>Accepted Evidence Types</h4>
            <div className="dispute-evidence-tiles">
              <div className="dispute-evidence-tile">
                <Image size={24} />
                <span>Photos</span>
              </div>
              <div className="dispute-evidence-tile">
                <Video size={24} />
                <span>Videos</span>
              </div>
              <div className="dispute-evidence-tile">
                <FileText size={24} />
                <span>Documents</span>
              </div>
              <div className="dispute-evidence-tile">
                <FileCheck size={24} />
                <span>Reports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get + Limits Section */}
      <section className="dispute-section dispute-section-alt">
        <div className="dispute-container">
          <div className="dispute-section-header">
            <span className="dispute-section-badge">Benefits & Limits</span>
            <h2 className="dispute-section-title">What You Get + Limits</h2>
            <p className="dispute-section-desc">
              Transparency builds trust — here's what to expect.
            </p>
          </div>
          
          <div className="dispute-dual-grid">
            {/* What You Get */}
            <div className="dispute-get-block">
              <h3><ThumbsUp size={20} /> What You Get</h3>
              <div className="dispute-get-list">
                {whatYouGet.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="dispute-get-item"
                  >
                    <item.icon size={20} />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Resolution Options */}
              <h4>Clear resolution options:</h4>
              <div className="dispute-resolution-options">
                {resolutionOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`dispute-resolution-card dispute-resolution-${option.color}`}
                  >
                    <div className={`dispute-resolution-icon dispute-icon-${option.color}`}>
                      <option.icon size={20} />
                    </div>
                    <span>{option.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Important Limits */}
            <div className="dispute-limits-block">
              <h3><AlertTriangle size={20} /> Important Limits (to keep trust real)</h3>
              <div className="dispute-limits-list">
                {importantLimits.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="dispute-limit-item"
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

      {/* FAQ Section */}
      <section className="dispute-section">
        <div className="dispute-container">
          <div className="dispute-section-header">
            <span className="dispute-section-badge">FAQ</span>
            <h2 className="dispute-section-title">Frequently Asked Questions</h2>
          </div>
          
          <div className="dispute-faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="dispute-faq-item">
                <button
                  className={`dispute-faq-question ${expandedFaq === index ? 'open' : ''}`}
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} />
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="dispute-faq-answer"
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="dispute-cta-section">
        <div className="dispute-container">
          <div className="dispute-cta-card">
            <div className="dispute-cta-content">
              <h3>Need to resolve an issue?</h3>
              <p>Start the dispute process with evidence and get a fair resolution.</p>
            </div>
            <div className="dispute-cta-buttons">
              <Link to="/orders" className="dispute-btn-primary dispute-btn-lg">
                <MessageSquare size={18} />
                Raise a Dispute
              </Link>
              <button className="dispute-btn-secondary">
                <Eye size={18} />
                View Process Guide
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
    className={`dispute-step-card dispute-step-${color}`}
  >
    <div className="dispute-step-number">{step}</div>
    <div className={`dispute-step-icon dispute-icon-${color}`}>
      <Icon size={24} />
    </div>
    <h4 className="dispute-step-title">{title}</h4>
    <p className="dispute-step-desc">{description}</p>
  </motion.div>
)

export default DisputeResolution
