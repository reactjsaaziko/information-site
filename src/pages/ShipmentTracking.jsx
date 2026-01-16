// Aaziko Shipment Tracking & Delivery Support Page
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  MapPin, Package, Bell, Eye, Shield, Clock,
  CheckCircle, Globe, Zap, AlertTriangle, Users,
  MessageSquare, Headphones, Truck,
  Navigation, FileCheck, Search, Settings, Phone,
  Mail, ArrowRight, RefreshCw, Lock, Target, ChevronDown
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './ShipmentTracking.css'

const trustStrip = [
  { icon: Eye, text: 'Real-time visibility' },
  { icon: Bell, text: 'Instant notifications' },
  { icon: Headphones, text: 'Delivery support' }
]

const whyTrackingMatters = [
  {
    icon: Eye,
    title: 'Transparency',
    description: "You'll never have to wonder where your goods are—Aaziko provides real-time updates for every shipment."
  },
  {
    icon: Shield,
    title: 'Reduced Risk',
    description: 'Knowing the exact location of your goods helps reduce the risk of lost shipments, delays, or damage.'
  },
  {
    icon: Lock,
    title: 'Peace of Mind',
    description: "With Aaziko's comprehensive tracking, you can rest easy knowing that every step of the delivery process is being handled efficiently."
  }
]

const howItWorks = [
  {
    step: 1,
    icon: Navigation,
    title: 'Real-Time Tracking',
    description: 'Aaziko integrates with leading logistics providers to offer up-to-date, accurate shipment tracking. Track every movement of your shipment, from dispatch to final delivery.',
    color: 'primary'
  },
  {
    step: 2,
    icon: Bell,
    title: 'Delivery Status Notifications',
    description: "Receive automated notifications on critical milestones—when the shipment leaves the warehouse, when it reaches customs, when it's in transit, and when it's out for delivery.",
    color: 'info'
  },
  {
    step: 3,
    icon: Eye,
    title: 'End-to-End Visibility',
    description: "Our platform gives you access to every detail of your shipment. From the moment it leaves the seller's warehouse, to the final delivery point, Aaziko provides continuous status updates.",
    color: 'success'
  },
  {
    step: 4,
    icon: Settings,
    title: 'Custom Alerts',
    description: "Set up personalized notifications to keep track of your shipment's progress, receive alerts for any delays, and get immediate updates when your goods are cleared through customs or delivered.",
    color: 'warning'
  },
  {
    step: 5,
    icon: Headphones,
    title: 'Customer Support for Delivery Issues',
    description: "Aaziko offers expert customer support to help resolve any delivery issues that may arise. Whether it's a delay, a missing shipment, or a problem with customs, our team is here to assist.",
    color: 'purple'
  }
]

const benefits = [
  { icon: Eye, title: 'Transparency', description: "Always know the location of your goods with Aaziko's real-time tracking system." },
  { icon: Zap, title: 'Efficiency', description: "Reduce delays and confusion—Aaziko ensures that you're updated on every critical step of the shipment journey." },
  { icon: Target, title: 'Better Control', description: 'Stay in control of your shipment by receiving all the necessary information at your fingertips.' },
  { icon: RefreshCw, title: 'Faster Resolution', description: "In case of issues, Aaziko's customer support team is on hand to provide quick solutions and updates." }
]

const howToUseSteps = [
  { step: 1, title: 'Place Your Order', description: "Once the order is placed, you'll receive a tracking ID." },
  { step: 2, title: 'Track Your Shipment', description: 'Enter your tracking ID in the Aaziko platform to monitor your goods in real-time.' },
  { step: 3, title: 'Stay Updated', description: 'Set up notifications to get alerts on shipment progress.' },
  { step: 4, title: 'Contact Support', description: "If there are any issues with the shipment, reach out to Aaziko's support team for quick resolution." }
]

// SEO: FAQ Data
const seoFaqs = [
  { q: 'How do I track my shipment on Aaziko?', a: 'Enter your tracking ID in the search box on the Shipment Tracking page. You can also access tracking from your order dashboard by clicking on the specific order.' },
  { q: 'What shipping methods does Aaziko support?', a: 'Aaziko supports sea freight, air freight, and express courier services. The available options depend on your shipment size, destination, and urgency.' },
  { q: 'How often is tracking information updated?', a: 'Tracking updates depend on the logistics provider. Sea freight typically updates at major port milestones, while air freight and express services provide more frequent updates.' },
  { q: 'What should I do if my shipment is delayed?', a: 'Contact Aaziko support with your tracking ID. Our team will investigate with the logistics partner and provide you with updated delivery estimates.' },
  { q: 'Can I change the delivery address after shipment?', a: 'Address changes depend on the shipment stage and logistics provider. Contact support immediately if you need to modify delivery details.' },
  { q: 'What happens if my shipment is stuck in customs?', a: 'Aaziko provides customs documentation support. If your shipment is held, our team will help identify the issue and guide you through the clearance process.' }
]

// SEO: Related internal links
const seoRelatedLinks = [
  { label: 'How We Work', to: '/how-we-work' },
  { label: 'Customs Documentation', to: '/customs-documentation' },
  { label: 'Export Documentation', to: '/export-documentation' },
  { label: 'Dispute Resolution', to: '/dispute-resolution' },
  { label: 'Contact Us', to: '/contact' }
]

// Related Guides for SEO
const relatedGuides = [
  { label: 'Shipment Tracking Milestones Guide', to: '/guides/shipment-tracking-milestones' },
  { label: 'Sea vs Air Freight Guide', to: '/guides/sea-vs-air-freight' }
]

const ShipmentTracking = () => {
  const heroRef = useRef(null)
  const [trackingId, setTrackingId] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tracking-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.tracking-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.tracking-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.tracking-hero-search', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
      gsap.fromTo('.tracking-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const handleTrack = (e) => {
    e.preventDefault()
    // Tracking functionality placeholder
    console.log('Tracking:', trackingId)
  }

  return (
    <div className="tracking-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="tracking-hero">
        <div className="tracking-hero-content">
          <div className="tracking-hero-badge">
            <MapPin size={16} />
            <span>Shipment Tracking & Delivery Support</span>
          </div>
          <h1 className="tracking-hero-title">
            Shipment Tracking & Delivery Support for <span className="tracking-gradient-text">International Trade</span>
          </h1>
          <p className="tracking-hero-subtitle">
            From your order to the final destination—Aaziko ensures transparency and timely updates every step of the way.
          </p>
          
          {/* Tracking Search Box */}
          <form className="tracking-hero-search" onSubmit={handleTrack}>
            <div className="tracking-search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Enter your tracking ID..."
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
              <button type="submit" className="tracking-btn-primary">
                Track Now
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
          
          {/* Trust Strip */}
          <div className="tracking-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="tracking-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Section */}
      <section className="tracking-section">
        <div className="tracking-container">
          <div className="tracking-section-header">
            <span className="tracking-section-badge">Overview</span>
            <h2 className="tracking-section-title">What is Aaziko's Shipment Tracking & Delivery Support?</h2>
          </div>
          <div className="tracking-intro-card">
            <div className="tracking-intro-icon">
              <Package size={32} />
            </div>
            <p className="tracking-intro-text">
              Aaziko's Shipment Tracking & Delivery Support ensures that you stay informed throughout the entire shipping process. Whether you're a buyer or a seller, our platform provides clear visibility into the status of your shipment, with real-time updates, ensuring you always know where your goods are.
            </p>
          </div>
        </div>
      </section>

      {/* Why Tracking Matters */}
      <section className="tracking-section tracking-section-alt">
        <div className="tracking-container">
          <div className="tracking-section-header">
            <span className="tracking-section-badge">Why It Matters</span>
            <h2 className="tracking-section-title">Why is Shipment Tracking Important?</h2>
          </div>
          
          <div className="tracking-why-grid">
            {whyTrackingMatters.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="tracking-why-card"
              >
                <div className="tracking-why-icon">
                  <item.icon size={28} />
                </div>
                <h4 className="tracking-why-title">{item.title}</h4>
                <p className="tracking-why-desc">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="tracking-section">
        <div className="tracking-container">
          <div className="tracking-section-header">
            <span className="tracking-section-badge">Process</span>
            <h2 className="tracking-section-title">How Aaziko's Shipment Tracking & Delivery Support Works</h2>
          </div>
          
          <div className="tracking-steps-grid">
            {howItWorks.map((step, index) => (
              <ProcessStepCard key={index} {...step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="tracking-section tracking-section-alt">
        <div className="tracking-container">
          <div className="tracking-section-header">
            <span className="tracking-section-badge">Benefits</span>
            <h2 className="tracking-section-title">Benefits of Aaziko's Shipment Tracking & Delivery Support</h2>
          </div>
          
          <div className="tracking-benefits-grid">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="tracking-benefit-card"
              >
                <div className="tracking-benefit-icon">
                  <item.icon size={24} />
                </div>
                <div className="tracking-benefit-content">
                  <h4 className="tracking-benefit-title">{item.title}</h4>
                  <p className="tracking-benefit-desc">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="tracking-section">
        <div className="tracking-container">
          <div className="tracking-section-header">
            <span className="tracking-section-badge">Guide</span>
            <h2 className="tracking-section-title">How to Use Aaziko's Shipment Tracking</h2>
          </div>
          
          <div className="tracking-howto-grid">
            {howToUseSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="tracking-howto-card"
              >
                <div className="tracking-howto-number">{item.step}</div>
                <div className="tracking-howto-content">
                  <h4 className="tracking-howto-title">{item.title}</h4>
                  <p className="tracking-howto-desc">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO: FAQ Section */}
      <section className="tracking-section tracking-section-alt">
        <div className="tracking-container">
          <div className="tracking-section-header">
            <span className="tracking-section-badge">FAQ</span>
            <h2 className="tracking-section-title">Frequently Asked Questions</h2>
          </div>
          
          <div className="tracking-faq-container">
            {seoFaqs.map((faq, index) => (
              <div key={index} className={`tracking-faq-item ${expandedFaq === index ? 'open' : ''}`}>
                <button
                  className={`tracking-faq-question ${expandedFaq === index ? 'open' : ''}`}
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className="tracking-faq-chevron" />
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="tracking-faq-answer"
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
      <section className="tracking-section">
        <div className="tracking-container">
          <div className="tracking-section-header">
            <h2 className="tracking-section-title">Related Resources</h2>
          </div>
          <div className="tracking-related-links">
            {seoRelatedLinks.map((link, index) => (
              <Link key={index} to={link.to} className="tracking-related-link">
                <ArrowRight size={16} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides Section */}
      <section className="tracking-section tracking-section-alt">
        <div className="tracking-container">
          <div className="tracking-section-header">
            <h2 className="tracking-section-title">Related Guides</h2>
          </div>
          <div className="tracking-related-links">
            {relatedGuides.map((guide, index) => (
              <Link key={index} to={guide.to} className="tracking-related-link">
                <ArrowRight size={16} />
                {guide.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA Section */}
      <section className="tracking-section">
        <div className="tracking-container">
          <div className="tracking-support-card">
            <div className="tracking-support-icon">
              <Headphones size={32} />
            </div>
            <div className="tracking-support-content">
              <h3>Need Help with Your Shipment?</h3>
              <p>Our dedicated support team is available to assist you with any delivery issues or tracking questions.</p>
            </div>
            <div className="tracking-support-actions">
              <Link to="/contact" className="tracking-btn-primary">
                <Phone size={18} />
                Contact Support
              </Link>
              <a href="mailto:support@aaziko.com" className="tracking-btn-secondary">
                <Mail size={18} />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="tracking-cta-section">
        <div className="tracking-container">
          <div className="tracking-cta-card">
            <div className="tracking-cta-content">
              <h3>Ready to Track Your Shipment?</h3>
              <p>Get real-time updates and full visibility on your goods with Aaziko.</p>
            </div>
            <div className="tracking-cta-buttons">
              <Link to="/logistics" className="tracking-btn-primary tracking-btn-lg">
                <Truck size={18} />
                Get Shipping Quote
              </Link>
              <Link to="/contact" className="tracking-btn-secondary">
                <Headphones size={18} />
                Talk to Expert
              </Link>
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
    className={`tracking-step-card tracking-step-${color}`}
  >
    <div className="tracking-step-number">{step}</div>
    <div className={`tracking-step-icon tracking-icon-${color}`}>
      <Icon size={24} />
    </div>
    <h4 className="tracking-step-title">{title}</h4>
    <p className="tracking-step-desc">{description}</p>
  </motion.div>
)

export default ShipmentTracking
