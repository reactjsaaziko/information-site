// Find Verified Indian Suppliers - Inspection & Quality Checks Page
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Shield, CheckCircle, BadgeCheck, Globe, Search, FileText,
  Camera, ClipboardCheck, AlertTriangle, Package, Factory,
  Truck, FlaskConical, Award, ThumbsUp, ChevronDown, Send,
  Eye, Image, Video, Scale, ListChecks, Headphones
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'

const whyInspectionMatters = [
  { icon: CheckCircle, title: 'Quality Assurance', description: 'Ensures products meet your exact requirements. Only the best products make it to your doorstep.' },
  { icon: Shield, title: 'Risk Reduction', description: 'Prevent costly mistakes and reduce chances of receiving non-compliant or damaged products.' },
  { icon: Eye, title: 'Trust & Transparency', description: 'Verifiable reports that both parties can refer to, reducing misunderstandings or disputes.' }
]

const processSteps = [
  { step: 1, icon: ListChecks, title: 'Choose Inspection Type', description: 'Select from pre-shipment inspection, factory audit, or lab testing based on your requirements.', color: 'primary' },
  { step: 2, icon: ClipboardCheck, title: 'Schedule Inspection', description: 'Once order is confirmed, we arrange inspection with a verified third-party agency.', color: 'info' },
  { step: 3, icon: Search, title: 'Inspection & Testing', description: 'Team checks product quality, quantity, labeling, packaging, and conducts lab tests if needed.', color: 'warning' },
  { step: 4, icon: FileText, title: 'Inspection Report', description: 'Receive detailed report with photos, videos, and lab test results verifying product standards.', color: 'success' },
  { step: 5, icon: ThumbsUp, title: 'Approve or Reject', description: 'Based on report, approve or request adjustments. We work with supplier to address any issues.', color: 'purple' }
]

const benefits = [
  { icon: BadgeCheck, title: 'Verified Quality', description: 'Thorough inspections from trusted third-party agencies' },
  { icon: Shield, title: 'Peace of Mind', description: 'Products match what was promised, reducing disputes' },
  { icon: Globe, title: 'Global Compliance', description: 'Follows international quality standards and regulations' },
  { icon: Award, title: 'Enhanced Trust', description: 'Transparency builds long-term business relationships' }
]

const examples = [
  { icon: Package, product: 'Wooden Furniture', inspectionType: 'Pre-shipment inspection, labeling, packaging, durability test', process: 'Third-party agency verifies furniture is manufactured to specs, conducts durability and packaging tests. Report with images and results shared with buyer.', color: 'primary' },
  { icon: Factory, product: 'Electronics (Mobile Phones)', inspectionType: 'Factory audit and quality inspection', process: 'Factory audited for manufacturing standards, labor conditions, environmental compliance. Product undergoes defect checks, software functionality, and packaging integrity tests.', color: 'info' }
]

const whatYouGet = [
  { icon: FileText, text: 'Detailed Inspection Report with test results, photos, and videos' },
  { icon: Award, text: 'Certification (CE, RoHS, etc.) where applicable' },
  { icon: CheckCircle, text: 'Quality Assurance confirming products meet specifications' }
]

const whyChooseAaziko = [
  { icon: BadgeCheck, title: 'Trusted Partners', description: 'Globally recognized third-party inspection agencies' },
  { icon: Eye, title: 'Transparent Process', description: 'All inspections documented with clear reports' },
  { icon: Truck, title: 'End-to-End Solution', description: 'From sourcing to delivery, highest standards maintained' }
]

const nextSteps = [
  { step: 1, title: 'Post Your RFQ', description: 'Start by posting your requirement' },
  { step: 2, title: 'Choose Inspection Type', description: 'Select inspection that suits your product' },
  { step: 3, title: 'Review Reports', description: 'Receive and approve inspection reports' },
  { step: 4, title: 'Proceed to Shipment', description: 'We handle shipping and customs clearance' }
]

const faqs = [
  { q: 'What types of inspection are available?', a: 'Pre-shipment inspection, factory audit, during production check, container loading check, and lab testing support.' },
  { q: 'How much does inspection cost?', a: 'Cost varies based on product type, inspection type, and location. We offer competitive rates with transparent pricing and no hidden fees.' },
  { q: 'Who performs the inspections?', a: 'We work with globally recognized third-party inspection agencies to ensure the highest quality standards.' },
  { q: 'What happens if inspection fails?', a: 'You can reject the product or request adjustments. We work with the supplier to address any issues before proceeding.' }
]

const trustStrip = [
  { icon: BadgeCheck, text: 'Verified Suppliers' },
  { icon: Eye, text: 'Pre-shipment Inspection' },
  { icon: Shield, text: 'Quality Assured' }
]

const colorClasses = {
  primary: { border: 'border-b-[var(--primary)]', hoverBorder: 'hover:border-[var(--primary)]', bg: 'bg-[var(--sky)]', text: 'text-[var(--primary)]', numBg: 'bg-[var(--primary)]' },
  warning: { border: 'border-b-[var(--warning)]', hoverBorder: 'hover:border-[var(--warning)]', bg: 'bg-[rgba(245,158,11,0.1)]', text: 'text-[var(--warning)]', numBg: 'bg-[var(--warning)]' },
  success: { border: 'border-b-[var(--success)]', hoverBorder: 'hover:border-[var(--success)]', bg: 'bg-[rgba(22,163,74,0.1)]', text: 'text-[var(--success)]', numBg: 'bg-[var(--success)]' },
  info: { border: 'border-b-[var(--info)]', hoverBorder: 'hover:border-[var(--info)]', bg: 'bg-[rgba(14,165,233,0.1)]', text: 'text-[var(--info)]', numBg: 'bg-[var(--info)]' },
  purple: { border: 'border-b-[#8b5cf6]', hoverBorder: 'hover:border-[#8b5cf6]', bg: 'bg-[rgba(139,92,246,0.1)]', text: 'text-[#8b5cf6]', numBg: 'bg-[#8b5cf6]' }
}

const FindVerifiedIndianSuppliers = () => {
  const heroRef = useRef(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  // Set light theme background when page mounts
  useEffect(() => {
    document.body.style.background = 'var(--bg)'
    document.body.style.color = 'var(--text)'
    return () => {
      document.body.style.background = ''
      document.body.style.color = ''
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.fvis-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.fvis-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.fvis-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.fvis-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.fvis-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="pt-[140px] pb-20 px-6 text-center relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[900px] before:h-[700px] before:bg-[radial-gradient(circle,rgba(22,163,74,0.1)_0%,transparent_60%)] before:rounded-full before:pointer-events-none">
        <div className="max-w-[900px] mx-auto relative z-[1]">
          <div className="fvis-hero-badge inline-flex items-center gap-2 py-2.5 px-[18px] bg-[rgba(22,163,74,0.1)] border border-[rgba(22,163,74,0.3)] rounded-full text-sm font-semibold text-[var(--success)] mb-6">
            <Shield size={16} />
            <span>Verified Indian Suppliers</span>
          </div>
          <h1 className="fvis-hero-title text-[44px] md:text-[44px] font-extrabold leading-[1.15] text-[var(--text)] mb-5">
            Ensure Quality and Compliance with <span className="bg-gradient-to-br from-[var(--primary)] to-[var(--success)] bg-clip-text text-transparent">Aaziko's Inspection & Quality Checks</span>
          </h1>
          <p className="fvis-hero-subtitle text-lg text-[var(--text-secondary)] leading-[1.7] mb-8 max-w-[750px] mx-auto">
            Guaranteed product quality, verified suppliers, and smooth international trade—Aaziko's inspection and quality checks ensure peace of mind.
          </p>
          <div className="fvis-hero-cta flex justify-center gap-4 flex-wrap mb-8">
            <Link to="/rfq" className="inline-flex items-center gap-2 py-3.5 px-7 text-[15px] font-semibold text-white bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] border-none border-b-4 border-b-[var(--primary-dark)] rounded-[var(--radius-md)] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,99,235,0.3)]">
              <Send size={18} />
              Post Your RFQ
            </Link>
            <Link to="/inspection" className="inline-flex items-center gap-2 py-3.5 px-7 text-[15px] font-semibold text-[var(--text)] bg-[var(--surface)] border-2 border-[var(--border)] border-b-4 border-b-[var(--gray-300)] rounded-[var(--radius-md)] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)]">
              <Eye size={18} />
              Learn More
            </Link>
          </div>
          
          {/* Trust Strip */}
          <div className="fvis-trust-strip inline-flex justify-center gap-3 flex-nowrap mx-auto">
            {trustStrip.map((item, index) => (
              <div key={index} className="inline-flex items-center gap-2 py-3 px-5 bg-white border-2 border-[var(--border)] rounded-full text-[13px] text-[var(--text-secondary)] font-medium whitespace-nowrap">
                <item.icon size={16} className="text-[var(--primary)] flex-shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Aaziko Inspection */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block py-1.5 px-3.5 bg-[var(--primary-bg)] rounded-full text-xs font-bold text-[var(--primary)] uppercase tracking-[0.5px] mb-4">Overview</span>
            <h2 className="text-[32px] font-extrabold text-[var(--text)] mb-4">What is Aaziko Inspection & Quality Checks?</h2>
            <p className="text-base text-[var(--text-secondary)] max-w-[700px] mx-auto leading-[1.7]">
              Comprehensive inspection ensuring all products meet the highest standards before shipment. Our process protects both buyers and sellers with clear evidence of product quality, compliance with international trade regulations, and prevention of disputes or returns.
            </p>
          </div>
        </div>
      </section>

      {/* Why Inspection Matters */}
      <section className="py-20 bg-[var(--gray-50)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block py-1.5 px-3.5 bg-[var(--primary-bg)] rounded-full text-xs font-bold text-[var(--primary)] uppercase tracking-[0.5px] mb-4">Importance</span>
            <h2 className="text-[32px] font-extrabold text-[var(--text)] mb-4">Why is Inspection Important for Global Trade?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyInspectionMatters.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white border-2 border-[var(--border)] border-b-4 border-b-[var(--primary)] rounded-[var(--radius-lg)] p-7 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[var(--primary)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-[var(--primary-bg)] rounded-[var(--radius-lg)] text-[var(--primary)]">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-[var(--text)] mb-2.5">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block py-1.5 px-3.5 bg-[var(--primary-bg)] rounded-full text-xs font-bold text-[var(--primary)] uppercase tracking-[0.5px] mb-4">Process</span>
            <h2 className="text-[32px] font-extrabold text-[var(--text)] mb-4">How Aaziko's Inspection Process Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5">
            {processSteps.map((step, index) => {
              const colors = colorClasses[step.color] || colorClasses.primary
              return (
                <motion.div
                  key={index}
                  className={`bg-white border-2 border-[var(--border)] border-b-4 ${colors.border} rounded-[var(--radius-lg)] py-7 px-5 text-center relative min-h-[220px] transition-all duration-200 hover:-translate-y-1 ${colors.hoverBorder}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 flex items-center justify-center rounded-full text-[13px] font-bold text-white ${colors.numBg}`}>{step.step}</div>
                  <div className={`w-14 h-14 mx-auto mt-2 mb-4 flex items-center justify-center rounded-[var(--radius-lg)] ${colors.bg} ${colors.text}`}>
                    <step.icon size={24} />
                  </div>
                  <h4 className="text-[15px] font-bold text-[var(--text)] mb-2.5">{step.title}</h4>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-normal m-0">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[var(--gray-50)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block py-1.5 px-3.5 bg-[var(--primary-bg)] rounded-full text-xs font-bold text-[var(--primary)] uppercase tracking-[0.5px] mb-4">Benefits</span>
            <h2 className="text-[32px] font-extrabold text-[var(--text)] mb-4">Benefits of Aaziko's Inspection & Quality Checks</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-3.5 p-5 bg-white border-2 border-[var(--border)] rounded-[var(--radius-lg)] transition-all duration-200 hover:border-[var(--primary)] hover:-translate-y-0.5"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-11 h-11 min-w-[44px] flex items-center justify-center bg-[var(--primary-bg)] rounded-[var(--radius)] text-[var(--primary)]">
                  <item.icon size={20} />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[var(--text)] mb-1">{item.title}</h4>
                  <p className="text-[13px] text-[var(--text-secondary)] m-0 leading-snug">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Examples */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block py-1.5 px-3.5 bg-[var(--primary-bg)] rounded-full text-xs font-bold text-[var(--primary)] uppercase tracking-[0.5px] mb-4">Examples</span>
            <h2 className="text-[32px] font-extrabold text-[var(--text)] mb-4">How Inspection Works in Practice</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {examples.map((example, index) => {
              const colors = colorClasses[example.color] || colorClasses.primary
              return (
                <motion.div
                  key={index}
                  className={`bg-white border-2 border-[var(--border)] border-b-4 ${colors.border} rounded-[var(--radius-lg)] p-7 transition-all duration-200 hover:-translate-y-1 ${colors.hoverBorder}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className={`w-14 h-14 flex items-center justify-center rounded-[var(--radius-lg)] mb-4 ${colors.bg} ${colors.text}`}>
                    <example.icon size={28} />
                  </div>
                  <h4 className="text-lg font-bold text-[var(--text)] mb-3">{example.product}</h4>
                  <div className="text-[13px] text-[var(--text-secondary)] mb-3 py-2.5 px-3.5 bg-[var(--gray-50)] rounded-[var(--radius)]">
                    <strong className="text-[var(--text)]">Inspection Type:</strong> {example.inspectionType}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0">{example.process}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-[var(--gray-50)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block py-1.5 px-3.5 bg-[var(--primary-bg)] rounded-full text-xs font-bold text-[var(--primary)] uppercase tracking-[0.5px] mb-4">Deliverables</span>
            <h2 className="text-[32px] font-extrabold text-[var(--text)] mb-4">What You Get After Inspection</h2>
          </div>
          <div className="flex flex-col gap-4 max-w-[700px] mx-auto">
            {whatYouGet.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 py-5 px-6 bg-white border-2 border-[var(--border)] rounded-[var(--radius-lg)] transition-all duration-200 hover:border-[var(--success)] hover:translate-x-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon size={22} className="text-[var(--success)] flex-shrink-0" />
                <span className="text-[15px] text-[var(--text)] font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Aaziko */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block py-1.5 px-3.5 bg-[var(--primary-bg)] rounded-full text-xs font-bold text-[var(--primary)] uppercase tracking-[0.5px] mb-4">Why Us</span>
            <h2 className="text-[32px] font-extrabold text-[var(--text)] mb-4">Why Choose Aaziko for Inspection & Quality Checks?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChooseAaziko.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white border-2 border-[var(--border)] rounded-[var(--radius-lg)] p-7 text-center transition-all duration-200 hover:border-[var(--primary)] hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-[var(--primary-bg)] rounded-[var(--radius-lg)] text-[var(--primary)]">
                  <item.icon size={24} />
                </div>
                <h4 className="text-base font-bold text-[var(--text)] mb-2">{item.title}</h4>
                <p className="text-sm text-[var(--text-secondary)] m-0 leading-normal">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Costs */}
      <section className="py-20 bg-[var(--gray-50)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-start gap-6 py-8 px-10 bg-white border-2 border-[var(--border)] border-l-4 border-l-[var(--primary)] rounded-[var(--radius-lg)] flex-col md:flex-row text-center md:text-left">
            <Scale size={32} className="text-[var(--primary)] flex-shrink-0 mx-auto md:mx-0" />
            <div>
              <h3 className="text-lg font-bold text-[var(--text)] mb-2">What Are the Costs of Inspection?</h3>
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed m-0">Cost varies based on product type, inspection type, and location. Aaziko offers competitive rates with transparent pricing and no hidden fees. Cost is always agreed upon upfront.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block py-1.5 px-3.5 bg-[var(--primary-bg)] rounded-full text-xs font-bold text-[var(--primary)] uppercase tracking-[0.5px] mb-4">Get Started</span>
            <h2 className="text-[32px] font-extrabold text-[var(--text)] mb-4">Next Steps for Buyers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {nextSteps.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-4 p-6 bg-white border-2 border-[var(--border)] rounded-[var(--radius-lg)] transition-all duration-200 hover:border-[var(--primary)] hover:-translate-y-0.5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-9 h-9 min-w-[36px] flex items-center justify-center bg-[var(--primary)] text-white text-base font-bold rounded-full">{item.step}</div>
                <div>
                  <h4 className="text-[15px] font-bold text-[var(--text)] mb-1">{item.title}</h4>
                  <p className="text-[13px] text-[var(--text-secondary)] m-0">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[var(--gray-50)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block py-1.5 px-3.5 bg-[var(--primary-bg)] rounded-full text-xs font-bold text-[var(--primary)] uppercase tracking-[0.5px] mb-4">FAQ</span>
            <h2 className="text-[32px] font-extrabold text-[var(--text)] mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-[800px] mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-2 border-[var(--border)] rounded-[var(--radius-md)] mb-3 overflow-hidden bg-white">
                <button
                  className={`w-full flex justify-between items-center py-[18px] px-5 bg-white border-none cursor-pointer text-[15px] font-semibold text-[var(--text)] text-left transition-all duration-200 hover:bg-[var(--gray-50)]`}
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className={`text-[var(--text-muted)] flex-shrink-0 transition-transform duration-200 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-5 pb-[18px]"
                  >
                    <p className="text-sm text-[var(--text-secondary)] leading-[1.7] m-0">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-[60px] pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between gap-8 py-12 px-14 bg-gradient-to-br from-[var(--primary)] to-[var(--success)] rounded-[var(--radius-xl)] text-white flex-col lg:flex-row text-center lg:text-left">
            <div>
              <h3 className="text-[26px] font-extrabold mb-2">Ready to Find Verified Indian Suppliers?</h3>
              <p className="text-base opacity-90 m-0">Post your RFQ and get connected with quality-assured suppliers today.</p>
            </div>
            <div className="flex gap-4 flex-shrink-0 flex-col lg:flex-row w-full lg:w-auto">
              <Link to="/rfq" className="inline-flex items-center justify-center gap-2 py-4 px-8 text-base font-semibold bg-white text-[var(--primary)] border-none border-b-4 border-b-[var(--gray-300)] rounded-[var(--radius-md)] no-underline transition-all duration-200 hover:-translate-y-0.5 w-full lg:w-auto">
                <Send size={18} />
                Post Your RFQ Now
              </Link>
              <button className="inline-flex items-center justify-center gap-2 py-4 px-8 text-base font-semibold bg-transparent text-white border-2 border-white/40 rounded-[var(--radius-md)] cursor-pointer transition-all duration-200 hover:bg-white/10 hover:border-white/60 w-full lg:w-auto">
                <Headphones size={18} />
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FindVerifiedIndianSuppliers
