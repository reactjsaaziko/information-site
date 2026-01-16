// TerminationGuide - Compact single-view informational page
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  AlertTriangle, FileText, CheckCircle, ArrowRight,
  Shield, Clock, HelpCircle, RefreshCw, XCircle,
  Eye, MessageCircle, Upload, ChevronRight, Mail,
  Phone, Headphones, FileCheck, Zap
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './TerminationGuide.css'

const TerminationGuide = () => {
  const navigate = useNavigate()

  const reasons = [
    { icon: FileText, label: 'Document mismatch', desc: 'GST or registration details don\'t match' },
    { icon: XCircle, label: 'Incomplete information', desc: 'Missing address, contact, or business info' },
    { icon: Shield, label: 'Policy violation', desc: 'Products not compliant with guidelines' }
  ]

  const steps = [
    { num: 1, icon: Eye, label: 'Review Issues', desc: 'Check your dashboard for specific problems' },
    { num: 2, icon: FileText, label: 'Fix Details', desc: 'Update company info and correct mismatches' },
    { num: 3, icon: Upload, label: 'Upload Docs', desc: 'Re-submit clear, valid documents' },
    { num: 4, icon: RefreshCw, label: 'Submit', desc: 'Request verification review' }
  ]

  const faqs = [
    { q: 'Is my data safe?', a: 'Yes, all your data and order history remain secure.' },
    { q: 'Can I still fulfill orders?', a: 'Yes, existing orders continue without interruption.' },
    { q: 'How long is the review?', a: 'Most reviews complete within 1-3 business days.' }
  ]

  return (
    <div className="tg-page">
      <AnimatedBackground />
      <Navbar />

      <div className="tg-compact">
        {/* Left Column */}
        <div className="tg-left">
          {/* Hero Card */}
          <motion.div 
            className="tg-hero-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="tg-hero-icon">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <HelpCircle size={36} />
              </motion.div>
            </div>
            <div className="tg-hero-text">
              <span className="tg-hero-badge-small">Termination Guide</span>
              <h1>Company Terminated?</h1>
              <p>Don't panic — termination is temporary. Fix issues & get back online.</p>
            </div>
          </motion.div>

          {/* What it means */}
          <motion.div 
            className="tg-info-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3>What termination means</h3>
            <p className="tg-info-desc">Profile temporarily paused for verification:</p>
            <div className="tg-info-grid">
              <div className="tg-info-item tg-info-warn">
                <Eye size={18} />
                <div>
                  <span className="tg-info-label">Profile hidden</span>
                  <span className="tg-info-sub">Not visible to buyers</span>
                </div>
              </div>
              <div className="tg-info-item tg-info-warn">
                <MessageCircle size={18} />
                <div>
                  <span className="tg-info-label">Inquiries paused</span>
                  <span className="tg-info-sub">No new messages</span>
                </div>
              </div>
              <div className="tg-info-item tg-info-ok">
                <Shield size={18} />
                <div>
                  <span className="tg-info-label">Data is safe</span>
                  <span className="tg-info-sub">Nothing is deleted</span>
                </div>
              </div>
              <div className="tg-info-item tg-info-ok">
                <CheckCircle size={18} />
                <div>
                  <span className="tg-info-label">Orders continue</span>
                  <span className="tg-info-sub">Fulfill existing orders</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Common Reasons */}
          <motion.div 
            className="tg-reasons-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Why this happens</h3>
            <p className="tg-reasons-desc">Common reasons for profile termination:</p>
            <div className="tg-reasons-list">
              {reasons.map((r, i) => (
                <div key={i} className="tg-reason">
                  <div className="tg-reason-icon">
                    <r.icon size={18} />
                  </div>
                  <div className="tg-reason-text">
                    <span className="tg-reason-label">{r.label}</span>
                    <span className="tg-reason-desc-text">{r.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="tg-right">
          {/* Steps */}
          <motion.div 
            className="tg-steps-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="tg-steps-header">
              <h3>How to fix it</h3>
              <span className="tg-steps-badge">4 simple steps</span>
            </div>
            <div className="tg-steps">
              {steps.map((step, i) => (
                <div key={i} className="tg-step">
                  <div className="tg-step-num">{step.num}</div>
                  <div className="tg-step-icon">
                    <step.icon size={20} />
                  </div>
                  <div className="tg-step-text">
                    <span className="tg-step-label">{step.label}</span>
                    <span className="tg-step-desc">{step.desc}</span>
                  </div>
                  <ChevronRight size={16} className="tg-step-arrow" />
                </div>
              ))}
            </div>
            <div className="tg-steps-tip">
              <Zap size={16} />
              <span><strong>Pro tip:</strong> Fix all issues at once to avoid multiple review cycles.</span>
            </div>
          </motion.div>

          {/* Timeline + FAQ Row */}
          <div className="tg-bottom-row">
            {/* Timeline */}
            <motion.div 
              className="tg-timeline-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Clock size={20} />
              <div className="tg-timeline-text">
                <span className="tg-timeline-title">Review Timeline</span>
                <span className="tg-timeline-value">1-3 business days</span>
                <span className="tg-timeline-note">Email updates at each stage</span>
              </div>
            </motion.div>

            {/* Quick FAQ */}
            <motion.div 
              className="tg-faq-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4>Quick answers</h4>
              <div className="tg-faq-list">
                {faqs.map((faq, i) => (
                  <div key={i} className="tg-faq-item">
                    <span className="tg-faq-q">{faq.q}</span>
                    <span className="tg-faq-a">{faq.a}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div 
            className="tg-cta-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="tg-cta-left">
              <div className="tg-cta-icon">
                <FileCheck size={24} />
              </div>
              <div className="tg-cta-content">
                <h3>Ready to fix your profile?</h3>
                <p>View your specific issues and start the resubmission process</p>
              </div>
            </div>
            <motion.button
              className="tg-cta-btn"
              onClick={() => navigate('/company/terminated')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Go to Terminated Status
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>

          {/* Support */}
          <motion.div 
            className="tg-support-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="tg-support-label">Need help?</span>
            <div className="tg-support-options">
              <a href="#" className="tg-support-link">
                <Headphones size={16} />
                <span>Live Chat</span>
              </a>
              <a href="#" className="tg-support-link">
                <Mail size={16} />
                <span>Email</span>
              </a>
              <a href="#" className="tg-support-link">
                <Phone size={16} />
                <span>Call</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default TerminationGuide
