// Verified Indian Suppliers Page - Aaziko Premium 3D Light Theme + SEO
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  ShieldCheck, BadgeCheck, Search, FileCheck, 
  Globe, Award,
  MessageSquare, CreditCard, Users,
  Lock, DollarSign, Zap, HeartHandshake, Building2,
  FlaskConical, Activity, RefreshCw, Quote, Phone,
  ChevronDown, ArrowRight
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './VerifiedSuppliers.css'

// SEO: FAQ Data
const seoFaqs = [
  { q: 'What does "verified" mean on Aaziko?', a: 'Verified means the supplier has passed Aaziko background checks including company registration, business licenses, product quality evaluation, and financial health assessment. Verified suppliers are monitored continuously.' },
  { q: 'Does verification guarantee order quality?', a: 'Verification confirms supplier legitimacy and capability, but does not guarantee specific order outcomes. For individual orders, use clear contracts, sample approval, and pre-shipment inspection.' },
  { q: 'How do I know if a supplier is verified?', a: 'Verified suppliers display a verification badge on their Aaziko profile. You can also filter search results to show only verified suppliers.' },
  { q: 'Can a supplier lose verified status?', a: 'Yes. Verified status is monitored continuously. Suppliers can lose verification for non-compliance, poor order performance, or unresolved disputes.' },
  { q: 'Should I still inspect orders from verified suppliers?', a: 'Yes, especially for first orders, high-value shipments, or custom products. Inspection provides order-specific quality evidence regardless of supplier verification status.' }
]

// SEO: Related internal links
const seoRelatedLinks = [
  { label: 'Submit RFQ', to: '/rfq' },
  { label: 'How We Work', to: '/how-we-work' },
  { label: 'Dispute Resolution', to: '/dispute-resolution' },
  { label: 'Export Import Guides', to: '/guides' },
  { label: 'Contact Us', to: '/contact' }
]

const trustStrip = [
  { icon: BadgeCheck, text: 'Verified Suppliers' },
  { icon: Lock, text: 'Secure Transactions' },
  { icon: Award, text: 'Quality Assured' }
]

const whyVerifiedSuppliers = [
  {
    icon: BadgeCheck,
    title: 'Verified & Trusted',
    description: 'All suppliers undergo stringent verification including company credentials, product quality standards, and legal compliance.',
    color: 'primary'
  },
  {
    icon: Lock,
    title: 'Transparent & Secure Transactions',
    description: 'Clear communication, secure payments, and dispute resolution at every stage from supplier selection to delivery.',
    color: 'success'
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Suppliers meet both Indian and international standards, ensuring highest quality products for your business.',
    color: 'warning'
  }
]

const howItWorksSteps = [
  {
    step: 1,
    title: 'Search Suppliers',
    icon: Search,
    description: 'Find verified suppliers by product or category'
  },
  {
    step: 2,
    title: 'View Profiles',
    icon: FileCheck,
    description: 'Check ratings, reviews & certifications'
  },
  {
    step: 3,
    title: 'Send Inquiry',
    icon: MessageSquare,
    description: 'Ask questions & request quotes directly'
  },
  {
    step: 4,
    title: 'Place Order',
    icon: CreditCard,
    description: 'Order securely with payment protection'
  }
]

const sellerBenefits = [
  {
    icon: Users,
    title: 'Trusted Supplier Network',
    description: 'Connect with reliable vendors across India, simplifying sourcing and procurement.'
  },
  {
    icon: Zap,
    title: 'Simplified Sourcing',
    description: 'Skip vendor negotiations, dodgy intermediaries, and long paperwork.'
  },
  {
    icon: DollarSign,
    title: 'Cost Transparency',
    description: 'Clear quotes with no hidden costs. Compare suppliers for best prices.'
  },
  {
    icon: ShieldCheck,
    title: 'Assured Quality',
    description: 'Products comply with your country\'s import regulations.'
  },
  {
    icon: Globe,
    title: 'Global Access',
    description: 'Access Indian suppliers ready to serve international markets.'
  }
]

const verificationProcess = [
  {
    icon: Building2,
    title: 'Background Checks',
    description: 'Company credentials, legal compliance, and past order history verification.',
    color: 'primary'
  },
  {
    icon: FlaskConical,
    title: 'Product Testing',
    description: 'Product samples tested for quality to meet international standards.',
    color: 'success'
  },
  {
    icon: Activity,
    title: 'Financial Health',
    description: 'Evaluation of financial health and business practices for reliability.',
    color: 'warning'
  },
  {
    icon: RefreshCw,
    title: 'Ongoing Monitoring',
    description: 'Continuous re-verification to uphold quality and compliance standards.',
    color: 'info'
  }
]

const testimonials = [
  {
    quote: "Aaziko helped us source top-quality electronics from India, and the suppliers met our strict quality standards. The process was seamless, and we are now looking to place larger orders!",
    author: "John D.",
    role: "US-based Buyer"
  },
  {
    quote: "Working with Aaziko's verified suppliers has been a game-changer. We've streamlined our sourcing, reduced risks, and always get the best prices. Highly recommend Aaziko!",
    author: "Sarah P.",
    role: "UK-based Sourcing Agent"
  }
]

const VerifiedSuppliers = () => {
  const heroRef = useRef(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.vs-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.vs-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.vs-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.vs-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.vs-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="vs-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="vs-hero">
        <div className="vs-hero-content">
          <div className="vs-hero-badge">
            <ShieldCheck size={16} />
            <span>Verified Suppliers</span>
          </div>
          <h1 className="vs-hero-title">
            Verified Suppliers: How Aaziko Validates <span className="vs-gradient-text">Supplier Quality</span>
          </h1>
          <p className="vs-hero-subtitle">
            Reliable, Transparent, and Trustworthy — Find quality suppliers who meet your exact requirements with Aaziko's verification and compliance standards.
          </p>
          <div className="vs-hero-cta">
            <Link to="/rfq" className="vs-btn-primary">
              <Search size={18} />
              Search Suppliers Now
            </Link>
            <Link to="/contact" className="vs-btn-secondary">
              <Phone size={18} />
              Talk to an Expert
            </Link>
          </div>
          
          {/* Trust Strip */}
          <div className="vs-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="vs-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Verified Suppliers Section */}
      <section className="vs-section">
        <div className="vs-container">
          <div className="vs-section-header">
            <span className="vs-section-badge">Why Aaziko</span>
            <h2 className="vs-section-title">Why Choose Verified Suppliers on Aaziko?</h2>
            <p className="vs-section-desc">
              Connect with trusted Indian suppliers who undergo thorough verification and compliance checks.
            </p>
          </div>
          <div className="vs-why-grid">
            {whyVerifiedSuppliers.map((item, index) => (
              <WhyCard key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="vs-section vs-section-alt">
        <div className="vs-container">
          <div className="vs-section-header">
            <span className="vs-section-badge">Simple Process</span>
            <h2 className="vs-section-title">How It Works</h2>
            <p className="vs-section-desc">
              4 easy steps to find your perfect supplier
            </p>
          </div>
          <div className="vs-steps-simple">
            {howItWorksSteps.map((step, index) => (
              <StepCard key={index} {...step} isLast={index === howItWorksSteps.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits for Sellers Section */}
      <section className="vs-section">
        <div className="vs-container">
          <div className="vs-section-header">
            <span className="vs-section-badge">Seller Benefits</span>
            <h2 className="vs-section-title">How Aaziko Helps You Source Better</h2>
          </div>
          <div className="vs-benefits-grid">
            {sellerBenefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Verification Process Section */}
      <section className="vs-section vs-section-alt">
        <div className="vs-container">
          <div className="vs-section-header">
            <span className="vs-section-badge">Trust Process</span>
            <h2 className="vs-section-title">How Aaziko Verifies Suppliers</h2>
            <p className="vs-section-desc">
              Trust You Can Rely On — Our rigorous verification ensures supplier authenticity.
            </p>
          </div>
          <div className="vs-verification-grid">
            {verificationProcess.map((item, index) => (
              <VerificationCard key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="vs-section">
        <div className="vs-container">
          <div className="vs-section-header">
            <span className="vs-section-badge">Success Stories</span>
            <h2 className="vs-section-title">What Our Customers Are Saying</h2>
            <p className="vs-section-desc">
              Vendors Worldwide Trust Aaziko Verified Suppliers for Their Sourcing Needs
            </p>
          </div>
          <div className="vs-testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="vs-section vs-cta-section">
        <div className="vs-container">
          <div className="vs-cta-card">
            <div className="vs-cta-content">
              <h3>Ready to Find Your Verified Indian Supplier?</h3>
              <p>Start sourcing from trusted manufacturers today.</p>
            </div>
            <div className="vs-cta-buttons">
              <Link to="/rfq" className="vs-btn-primary vs-btn-lg">
                <Search size={20} />
                Search Suppliers Now
              </Link>
              <Link to="/contact" className="vs-btn-outline">
                <HeartHandshake size={20} />
                Need Help? Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO: FAQ Section */}
      <section className="vs-section">
        <div className="vs-container">
          <div className="vs-section-header">
            <span className="vs-section-badge">FAQ</span>
            <h2 className="vs-section-title">Frequently Asked Questions</h2>
          </div>
          <div className="vs-faq-list">
            {seoFaqs.map((faq, index) => (
              <div key={index} className={`vs-faq-item ${expandedFaq === index ? 'open' : ''}`}>
                <button 
                  className="vs-faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={20} className="vs-faq-chevron" />
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="vs-faq-answer"
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
      <section className="vs-section vs-section-alt">
        <div className="vs-container">
          <div className="vs-section-header">
            <h2 className="vs-section-title">Related Resources</h2>
          </div>
          <div className="vs-related-links">
            {seoRelatedLinks.map((link, index) => (
              <Link key={index} to={link.to} className="vs-related-link">
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

// Why Card Component
const WhyCard = ({ icon: Icon, title, description, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`vs-why-card vs-why-${color}`}
  >
    <div className="vs-why-icon">
      <Icon size={32} />
    </div>
    <h3 className="vs-why-title">{title}</h3>
    <p className="vs-why-desc">{description}</p>
  </motion.div>
)

// Step Card Component - Simple visual design
const StepCard = ({ step, title, icon: Icon, description, isLast }) => (
  <div className="vs-step-card-simple">
    <div className="vs-step-number">{step}</div>
    <div className="vs-step-icon">
      <Icon size={28} />
    </div>
    <h3 className="vs-step-title">{title}</h3>
    <p className="vs-step-desc">{description}</p>
    {!isLast && <div className="vs-step-arrow">→</div>}
  </div>
)

// Benefit Card Component
const BenefitCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08 }}
    className="vs-benefit-card"
  >
    <div className="vs-benefit-icon">
      <Icon size={24} />
    </div>
    <h3 className="vs-benefit-title">{title}</h3>
    <p className="vs-benefit-desc">{description}</p>
  </motion.div>
)

// Verification Card Component
const VerificationCard = ({ icon: Icon, title, description, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`vs-verification-card vs-verification-${color}`}
  >
    <div className="vs-verification-icon">
      <Icon size={28} />
    </div>
    <h3 className="vs-verification-title">{title}</h3>
    <p className="vs-verification-desc">{description}</p>
  </motion.div>
)

// Testimonial Card Component
const TestimonialCard = ({ quote, author, role, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15 }}
    className="vs-testimonial-card"
  >
    <div className="vs-testimonial-quote-icon">
      <Quote size={24} />
    </div>
    <p className="vs-testimonial-quote">"{quote}"</p>
    <div className="vs-testimonial-author">
      <div className="vs-testimonial-avatar">
        {author.charAt(0)}
      </div>
      <div>
        <div className="vs-testimonial-name">{author}</div>
        <div className="vs-testimonial-role">{role}</div>
      </div>
    </div>
  </motion.div>
)

export default VerifiedSuppliers
