// RFQ (Request for Quotation) Landing Page - High Conversion Design
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  FileText, Package, MapPin, Send, CheckCircle, Info, Globe,
  Mail, Phone, Clock, Users, Shield, Zap,
  ArrowRight, MessageSquare, Eye, Truck, BadgeCheck, Star
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './RFQ.css'

const productCategories = [
  'Textiles & Apparel',
  'Electronics & Components',
  'Machinery & Equipment',
  'Chemicals & Pharmaceuticals',
  'Food & Beverages',
  'Automotive Parts',
  'Building Materials',
  'Furniture & Home Decor',
  'Packaging Materials',
  'Agricultural Products',
  'Handicrafts & Gifts',
  'Other'
]

const quantityUnits = ['Pieces', 'Kg', 'Tons', 'Meters', 'Liters', 'Sets', 'Cartons', 'Containers']

const responseTimeline = [
  {
    time: '0-2 Hours',
    icon: Zap,
    title: 'RFQ Processed',
    description: 'Logged & matched with suppliers.'
  },
  {
    time: '2-12 Hours',
    icon: Users,
    title: 'Supplier Matching',
    description: '3-5 verified suppliers notified.'
  },
  {
    time: '12-24 Hours',
    icon: MessageSquare,
    title: 'Quotes Arrive',
    description: 'Competitive quotes in your inbox.'
  },
  {
    time: '24-48 Hours',
    icon: CheckCircle,
    title: 'Compare & Connect',
    description: 'Review & connect with suppliers.'
  }
]

const trustIndicators = [
  { icon: BadgeCheck, value: '500+', label: 'Verified Suppliers' },
  { icon: Clock, value: '24hrs', label: 'Avg Response Time' },
  { icon: Star, value: '98%', label: 'Satisfaction Rate' },
  { icon: Shield, value: '100%', label: 'Secure & Free' }
]

const RFQ = () => {
  const heroRef = useRef(null)
  const [formStatus, setFormStatus] = useState(null)
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    description: '',
    quantity: '',
    unit: 'Pieces',
    deliveryLocation: ''
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.rfq-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.rfq-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.rfq-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.rfq-trust-bar', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('success')
    }, 1500)
  }

  return (
    <div className="rfq-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="rfq-hero">
        <div className="rfq-hero-content">
          <div className="rfq-hero-badge">
            <FileText size={16} />
            <span>Free RFQ Service</span>
          </div>
          <h1 className="rfq-hero-title">
            Get Quotes from <span className="rfq-gradient-text">Verified Suppliers</span> in 24 Hours
          </h1>
          <p className="rfq-hero-subtitle">
            Submit once — receive competitive quotes from India's top manufacturers. Free.
          </p>
          
          {/* Trust Indicators */}
          <div className="rfq-trust-bar">
            {trustIndicators.map((item, index) => (
              <div key={index} className="rfq-trust-item">
                <item.icon size={18} />
                <span className="rfq-trust-value">{item.value}</span>
                <span className="rfq-trust-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="rfq-container">
        {formStatus === 'success' ? (
          <SuccessMessage />
        ) : (
          <div className="rfq-layout">
            {/* Left: Form */}
            <div className="rfq-form-section">
              <form onSubmit={handleSubmit} className="rfq-form">
                {/* Product Details */}
                <div className="rfq-card">
                  <div className="rfq-card-header">
                    <Package size={20} />
                    <h2>What are you looking for?</h2>
                  </div>
                  
                  <div className="rfq-form-grid">
                    <div className="rfq-form-group rfq-col-2">
                      <label>Product Name *</label>
                      <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        placeholder="e.g., Cotton T-Shirts, Steel Pipes, LED Lights"
                        required
                      />
                    </div>

                    <div className="rfq-form-group">
                      <label>Category *</label>
                      <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {productCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="rfq-form-group">
                      <label>Quantity Required *</label>
                      <div className="rfq-input-group">
                        <input
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          placeholder="Enter quantity"
                          required
                        />
                        <select name="unit" value={formData.unit} onChange={handleChange} className="rfq-input-suffix">
                          {quantityUnits.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="rfq-form-group rfq-col-2">
                      <label>Product Description *</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe specifications, materials, colors, certifications needed..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="rfq-form-group rfq-col-2">
                      <label>Delivery Location *</label>
                      <input
                        type="text"
                        name="deliveryLocation"
                        value={formData.deliveryLocation}
                        onChange={handleChange}
                        placeholder="City, Country (e.g., New York, USA)"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="rfq-submit-btn"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? (
                    <>Submitting...</>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit RFQ — It's Free
                    </>
                  )}
                </button>

                <p className="rfq-form-note">
                  <Shield size={14} />
                  Your information is secure and will only be shared with verified suppliers.
                </p>
              </form>
            </div>

            {/* Right: What Happens Next */}
            <div className="rfq-info-section">
              <div className="rfq-timeline-card">
                <div className="rfq-timeline-header">
                  <Clock size={22} />
                  <h3>What Happens After You Submit?</h3>
                </div>
                <p className="rfq-timeline-intro">
                  We connect you with the right suppliers fast.
                </p>
                
                <div className="rfq-timeline">
                  {responseTimeline.map((step, index) => (
                    <div key={index} className="rfq-timeline-step">
                      <div className="rfq-timeline-marker">
                        <step.icon size={18} />
                      </div>
                      <div className="rfq-timeline-content">
                        <span className="rfq-timeline-time">{step.time}</span>
                        <h4>{step.title}</h4>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Guarantee */}
              <div className="rfq-guarantee-card">
                <div className="rfq-guarantee-icon">
                  <Zap size={24} />
                </div>
                <div className="rfq-guarantee-content">
                  <h4>Response Time Guarantee</h4>
                  <p>First quote within <strong>24 hours</strong> or we follow up for you.</p>
                </div>
              </div>

              {/* Why Submit */}
              <div className="rfq-benefits-card">
                <h4>Why Submit an RFQ?</h4>
                <ul className="rfq-benefits-list">
                  <li>
                    <CheckCircle size={16} />
                    <span>500+ verified manufacturers</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>Compare multiple quotes</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>No fees — completely free</span>
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    <span>Dedicated support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

// Success Message Component
const SuccessMessage = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="rfq-success-card"
  >
    <div className="rfq-success-icon">
      <CheckCircle size={48} />
    </div>
    <h2>RFQ Submitted Successfully!</h2>
    <p>Thank you for your request. Here's what happens next:</p>
    
    <div className="rfq-success-timeline">
      <div className="rfq-success-step">
        <div className="rfq-success-step-icon"><Zap size={18} /></div>
        <div>
          <strong>Within 2 hours</strong>
          <span>Your RFQ is processed and matched with suppliers</span>
        </div>
      </div>
      <div className="rfq-success-step">
        <div className="rfq-success-step-icon"><MessageSquare size={18} /></div>
        <div>
          <strong>Within 24 hours</strong>
          <span>Receive your first quotes via email</span>
        </div>
      </div>
      <div className="rfq-success-step">
        <div className="rfq-success-step-icon"><Users size={18} /></div>
        <div>
          <strong>Within 48 hours</strong>
          <span>Compare all quotes and connect with suppliers</span>
        </div>
      </div>
    </div>

    <div className="rfq-success-info">
      <div className="rfq-success-item">
        <Mail size={18} />
        <span>Check your email for confirmation</span>
      </div>
      <div className="rfq-success-item">
        <FileText size={18} />
        <span>RFQ Reference: #RFQ-{Date.now().toString().slice(-6)}</span>
      </div>
    </div>
    
    <a href="/buyers" className="rfq-btn-secondary">
      <ArrowRight size={18} />
      Explore Buyer Resources
    </a>
  </motion.div>
)

export default RFQ
