// Contact Page - Aaziko Premium 3D Light Theme
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Mail, Phone, MapPin, Clock, Send, MessageCircle,
  Globe, Building2, Users, CheckCircle, ArrowRight,
  Linkedin, Twitter, Facebook, Instagram, BadgeCheck, ShieldCheck
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './Contact.css'

const contactInfo = {
  email: 'contact@aaziko.com',
  phone: '+91 98765 43210',
  address: 'Aaziko Trade Center, Sector 62, Noida, Uttar Pradesh 201301, India',
  hours: 'Mon - Sat: 9:00 AM - 6:30 PM IST'
}

const offices = [
  { city: 'Noida (HQ)', country: 'India', address: 'Sector 62, Noida, UP 201301' },
  { city: 'Mumbai', country: 'India', address: 'Andheri East, Mumbai 400069' },
  { city: 'Dubai', country: 'UAE', address: 'Business Bay, Dubai' }
]

const departments = [
  { name: 'General Inquiries', email: 'info@aaziko.com', icon: MessageCircle },
  { name: 'Sales & Partnerships', email: 'sales@aaziko.com', icon: Users },
  { name: 'Supplier Support', email: 'suppliers@aaziko.com', icon: Building2 },
  { name: 'Buyer Support', email: 'buyers@aaziko.com', icon: Globe }
]

const trustStrip = [
  { icon: Globe, text: '147 Countries Covered' },
  { icon: BadgeCheck, text: 'Verified Suppliers' },
  { icon: ShieldCheck, text: 'Secure Platform' }
]



const Contact = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', subject: '', message: '', type: 'general'
  })
  const [formStatus, setFormStatus] = useState(null)
  const heroRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.contact-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.contact-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.contact-info-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.5 })
      gsap.fromTo('.contact-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.7 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success')
      setFormData({ name: '', email: '', company: '', phone: '', subject: '', message: '', type: 'general' })
    }, 1500)
  }

  return (
    <div className="contact-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="contact-hero">
        <div className="contact-hero-content">
          <div className="contact-hero-badge">
            <span className="contact-badge-dot" />
            <span>Get in Touch</span>
          </div>
          <h1 className="contact-hero-title">
            Let's Build Something <span className="contact-gradient-text">Great Together</span>
          </h1>
          <p className="contact-hero-subtitle">
            Questions? Want to partner? We're here to help.
          </p>

          {/* Quick Contact Cards */}
          <div className="contact-quick-cards">
            <QuickContactCard icon={Mail} label="Email Us" value={contactInfo.email} href={`mailto:${contactInfo.email}`} />
            <QuickContactCard icon={Phone} label="Call Us" value={contactInfo.phone} href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} />
            <QuickContactCard icon={Clock} label="Working Hours" value={contactInfo.hours} />
          </div>
          
          {/* Trust Strip */}
          <div className="contact-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="contact-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="contact-container">
        <div className="contact-layout">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="contact-form-section"
          >
            <div className="contact-card contact-form-card">
              <h2 className="contact-section-title">
                <Send size={20} color="var(--primary)" />
                Send us a Message
              </h2>
              <p className="contact-form-desc">
                Fill out the form — we'll respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="contact-form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                    />
                  </div>
                  <div className="contact-form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="contact-form-group">
                  <label>Inquiry Type</label>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales & Partnerships</option>
                    <option value="supplier">Supplier Support</option>
                    <option value="buyer">Buyer Support</option>
                    <option value="demo">Request a Demo</option>
                  </select>
                </div>

                <div className="contact-form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div className="contact-form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="contact-submit-btn"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? (
                    <>Sending...</>
                  ) : formStatus === 'success' ? (
                    <><CheckCircle size={18} /> Message Sent!</>
                  ) : (
                    <><Send size={18} /> Send Message</>
                  )}
                </button>

                {formStatus === 'success' && (
                  <div className="contact-success-msg">
                    <CheckCircle size={18} />
                    <span>Thank you! We'll get back to you within 24 hours.</span>
                  </div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right: Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="contact-sidebar"
          >
            {/* Departments */}
            <div className="contact-card">
              <h3 className="contact-card-title">Contact by Department</h3>
              <div className="contact-departments">
                {departments.map((dept, i) => (
                  <a key={i} href={`mailto:${dept.email}`} className="contact-dept-item">
                    <div className="contact-dept-icon">
                      <dept.icon size={18} />
                    </div>
                    <div>
                      <span className="contact-dept-name">{dept.name}</span>
                      <span className="contact-dept-email">{dept.email}</span>
                    </div>
                    <ArrowRight size={16} className="contact-dept-arrow" />
                  </a>
                ))}
              </div>
            </div>

            {/* Office Locations */}
            <div className="contact-card">
              <h3 className="contact-card-title">
                <MapPin size={18} color="var(--primary)" />
                Our Offices
              </h3>
              <div className="contact-offices">
                {offices.map((office, i) => (
                  <div key={i} className="contact-office-item">
                    <div className="contact-office-city">{office.city}</div>
                    <div className="contact-office-country">{office.country}</div>
                    <div className="contact-office-address">{office.address}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="contact-card">
              <h3 className="contact-card-title">Connect With Us</h3>
              <div className="contact-socials">
                <a href="#" className="contact-social-btn" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="contact-social-btn" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="#" className="contact-social-btn" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" className="contact-social-btn" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

// Quick Contact Card Component
const QuickContactCard = ({ icon: Icon, label, value, href }) => {
  const content = (
    <div className="contact-info-card">
      <div className="contact-info-icon contact-icon-wiggle">
        <Icon size={22} />
      </div>
      <div className="contact-info-text">
        <span className="contact-info-label">{label}</span>
        <span className="contact-info-value">{value}</span>
      </div>
    </div>
  )

  return href ? <a href={href} style={{ textDecoration: 'none' }}>{content}</a> : content
}

export default Contact
