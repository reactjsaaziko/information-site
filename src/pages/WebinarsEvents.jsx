// Webinars & Events Page - Visual Design
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  Video, ArrowRight, Calendar, Clock, Globe, Package, FileText, 
  Truck, ShieldCheck, PlayCircle, Bell, Mic, Monitor, Building2,
  Layers, Box, Scale, ClipboardList, Users, Target, UserCheck, Download
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './WebinarsEvents.css'

const buyerTopics = [
  { icon: Globe, label: 'Buy from India', color: '#2563EB' },
  { icon: Scale, label: 'Compare Quotes', color: '#0B1F3B' },
  { icon: ShieldCheck, label: 'Quality Assurance', color: '#16A34A' },
  { icon: FileText, label: 'Documentation', color: '#2563EB' },
  { icon: Truck, label: 'Shipping Planning', color: '#0EA5E9' }
]

const sellerTopics = [
  { icon: Package, label: 'List Products', color: '#2563EB' },
  { icon: ClipboardList, label: 'Handle Inquiries', color: '#0B1F3B' },
  { icon: ShieldCheck, label: 'Inspection Ready', color: '#16A34A' },
  { icon: FileText, label: 'Export Docs', color: '#2563EB' },
  { icon: Box, label: 'Packaging', color: '#0EA5E9' }
]

const sessionFormats = [
  { id: 'webinars', title: 'Live Webinars', time: '60-90 min', icon: Video, color: '#2563EB', bg: '#EAF2FF' },
  { id: 'workshops', title: 'Workshops', time: '90-120 min', icon: Layers, color: '#0B1F3B', bg: '#EEF5FF' },
  { id: 'trade-meets', title: 'Trade Meets', time: '30-60 min', icon: Users, color: '#2563EB', bg: '#EAF2FF' },
  { id: 'demos', title: 'Platform Demos', time: '30-45 min', icon: Monitor, color: '#0EA5E9', bg: '#EAF2FF' }
]

const audiences = [
  { icon: Globe, label: 'First-time Buyers', desc: 'Sourcing from India' },
  { icon: Building2, label: 'Indian Manufacturers', desc: 'Export-ready MSMEs' },
  { icon: Users, label: 'Existing Traders', desc: 'Smoother process' },
  { icon: Target, label: 'Business Teams', desc: 'Procurement & QC' }
]

const benefits = [
  { icon: PlayCircle, label: 'Session Recording' },
  { icon: ClipboardList, label: 'Buyer Checklist' },
  { icon: UserCheck, label: 'Seller Checklist' },
  { icon: ShieldCheck, label: 'Inspection Guide' },
  { icon: FileText, label: 'Export Docs Guide' },
  { icon: Target, label: 'Next Steps' }
]

const WebinarsEvents = () => {
  const heroRef = useRef(null)
  const [formData, setFormData] = useState({ role: '', email: '' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.we-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.we-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.we-hero-visual', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, delay: 0.3 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Registration:', formData)
  }

  return (
    <div className="we-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero - Visual Focus */}
      <section ref={heroRef} className="we-hero">
        <div className="we-hero-content">
          <div className="we-hero-badge">
            <Video size={16} />
            <span>Webinars & Events</span>
          </div>
          <h1 className="we-hero-title">
            Learn Global Trade<br />
            <span className="we-gradient-text">The Simple Way</span>
          </h1>
          
          <div className="we-hero-visual">
            <div className="we-visual-center">
              <div className="we-visual-icon-main">
                <PlayCircle size={48} />
              </div>
              <span>Live Sessions</span>
            </div>
            <div className="we-visual-orbit">
              <div className="we-orbit-item"><Globe size={20} /></div>
              <div className="we-orbit-item"><Package size={20} /></div>
              <div className="we-orbit-item"><Truck size={20} /></div>
              <div className="we-orbit-item"><FileText size={20} /></div>
              <div className="we-orbit-item"><ShieldCheck size={20} /></div>
              <div className="we-orbit-item"><Scale size={20} /></div>
            </div>
          </div>

          <div className="we-hero-cta">
            <a href="#register" className="we-btn-primary">
              <Calendar size={18} />
              Join Next Session
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Topics - Icon Grid */}
      <section className="we-topics-section">
        <div className="we-container">
          <div className="we-topics-grid">
            {/* Buyers */}
            <div className="we-topic-block">
              <div className="we-topic-header buyer">
                <Globe size={24} />
                <h3>For Buyers</h3>
              </div>
              <div className="we-topic-icons">
                {buyerTopics.map((topic, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="we-topic-item"
                  >
                    <div className="we-topic-icon" style={{ background: `${topic.color}15`, color: topic.color }}>
                      <topic.icon size={24} />
                    </div>
                    <span>{topic.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sellers */}
            <div className="we-topic-block">
              <div className="we-topic-header seller">
                <Building2 size={24} />
                <h3>For Sellers</h3>
              </div>
              <div className="we-topic-icons">
                {sellerTopics.map((topic, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="we-topic-item"
                  >
                    <div className="we-topic-icon" style={{ background: `${topic.color}15`, color: topic.color }}>
                      <topic.icon size={24} />
                    </div>
                    <span>{topic.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Session Formats - Visual Cards */}
      <section className="we-formats-section">
        <div className="we-container">
          <h2 className="we-section-title">Session Formats</h2>
          <div className="we-formats-visual">
            {sessionFormats.map((format, i) => (
              <motion.div
                key={format.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="we-format-visual-card"
                style={{ '--accent': format.color, '--accent-bg': format.bg }}
              >
                <div className="we-format-icon-wrap">
                  <format.icon size={32} />
                </div>
                <h4>{format.title}</h4>
                <div className="we-format-time">
                  <Clock size={14} />
                  {format.time}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Attend - Visual */}
      <section className="we-audience-section">
        <div className="we-container">
          <h2 className="we-section-title">Who Should Attend</h2>
          <div className="we-audience-visual">
            {audiences.map((aud, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="we-audience-item"
              >
                <div className="we-audience-icon">
                  <aud.icon size={28} />
                </div>
                <div className="we-audience-text">
                  <strong>{aud.label}</strong>
                  <span>{aud.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get - Icon Strip */}
      <section className="we-benefits-section">
        <div className="we-container">
          <div className="we-benefits-strip">
            <div className="we-benefits-label">
              <Download size={20} />
              <span>What You Get</span>
            </div>
            <div className="we-benefits-icons">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="we-benefit-chip"
                >
                  <b.icon size={16} />
                  <span>{b.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Register - Simple Form */}
      <section id="register" className="we-register-section">
        <div className="we-container">
          <div className="we-register-visual">
            <div className="we-register-left">
              <div className="we-register-illustration">
                <div className="we-illus-circle">
                  <Calendar size={40} />
                </div>
                <div className="we-illus-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
              <h2>Join Next Session</h2>
              <p>Reserve your spot in 30 seconds</p>
            </div>
            <form className="we-register-form" onSubmit={handleSubmit}>
              <div className="we-form-group">
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                >
                  <option value="">I am a...</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
              <div className="we-form-group">
                <input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="we-btn-primary we-btn-full">
                <Calendar size={18} />
                Reserve Seat
                <ArrowRight size={18} />
              </button>
              <div className="we-register-alt">
                <button type="button" className="we-btn-ghost">
                  <Mic size={16} />
                  Request Topic
                </button>
                <button type="button" className="we-btn-ghost">
                  <Bell size={16} />
                  Get Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

    

      <Footer />
    </div>
  )
}

export default WebinarsEvents
