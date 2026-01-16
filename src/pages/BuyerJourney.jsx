// Buyer Journey Page - Story Format Step-by-Step
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Send, ShieldCheck, Users, FileText, Scale, FileCheck,
  Eye, Truck, CheckCircle, ArrowRight, ArrowDown, Package,
  MessageSquare, Clock, Globe, Award, Sparkles, BadgeCheck
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './BuyerJourney.css'

gsap.registerPlugin(ScrollTrigger)

const trustStrip = [
  { icon: BadgeCheck, text: 'Verified Suppliers' },
  { icon: Eye, text: 'Pre-shipment Inspection' },
  { icon: ShieldCheck, text: 'Secure Payments' }
]

const journeySteps = [
  {
    id: 1,
    icon: Send,
    title: 'Buyer Sends Inquiry',
    subtitle: 'Your Journey Begins',
    description: 'Submit product requirements & specifications.',
    details: [
      'Product specifications',
      'Quantity & timeline',
      'Quality standards',
      'Budget range'
    ],
    color: 'primary',
    duration: '5 min'
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: 'Aaziko Validates',
    subtitle: 'Quality Assurance',
    description: 'We review & match with verified suppliers.',
    details: [
      'Requirement verification',
      'Supplier matching',
      'Feasibility check',
      'Compliance review'
    ],
    color: 'info',
    duration: '24-48 hrs'
  },
  {
    id: 3,
    icon: Users,
    title: 'Suppliers Quote',
    subtitle: 'Competitive Offers',
    description: 'Receive quotes with pricing & lead times.',
    details: [
      'Multiple quotes',
      'Price breakdown',
      'Timeline estimates',
      'Sample availability'
    ],
    color: 'success',
    duration: '3-5 days'
  },
  {
    id: 4,
    icon: Scale,
    title: 'Buyer Compares',
    subtitle: 'Informed Decision',
    description: 'Compare quotes side-by-side.',
    details: [
      'Quote comparison',
      'Supplier ratings',
      'Performance data',
      'Direct communication'
    ],
    color: 'warning',
    duration: 'At your pace'
  },
  {
    id: 5,
    icon: FileCheck,
    title: 'Contract Signed',
    subtitle: 'Secure Agreement',
    description: 'Finalize terms & make secure payments.',
    details: [
      'Clear terms',
      'Milestone payments',
      'Escrow protection',
      'Legal compliance'
    ],
    color: 'primary',
    duration: '1-2 days'
  },
  {
    id: 6,
    icon: Eye,
    title: 'Quality Inspection',
    subtitle: 'Verified Quality',
    description: 'Pre-shipment quality checks at factory.',
    details: [
      'Pre-shipment inspection',
      'Quality checklist',
      'Photo/video docs',
      'Inspection report'
    ],
    color: 'info',
    duration: '2-3 days'
  },
  {
    id: 7,
    icon: Truck,
    title: 'Shipping & Logistics',
    subtitle: 'Global Delivery',
    description: 'Factory to door with real-time tracking.',
    details: [
      'Door-to-door delivery',
      'Customs handled',
      'Real-time tracking',
      'Insurance available'
    ],
    color: 'success',
    duration: 'Varies by destination'
  },
  {
    id: 8,
    icon: CheckCircle,
    title: 'Delivery Confirmed',
    subtitle: 'Mission Complete',
    description: 'Receive goods & release final payment.',
    details: [
      'Delivery confirmation',
      'Payment release',
      'Supplier rating',
      'Reorder option'
    ],
    color: 'warning',
    duration: 'Upon receipt'
  }
]

const BuyerJourney = () => {
  const heroRef = useRef(null)
  const timelineRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.journey-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.journey-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.journey-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
      gsap.fromTo('.journey-trust-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const viewportCenter = window.innerHeight / 2
          let closestIndex = 0
          let closestDistance = Infinity

          const cards = document.querySelectorAll('.journey-card')
          cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect()
            const elementCenter = rect.top + rect.height / 2
            const distance = Math.abs(elementCenter - viewportCenter)
            
            if (distance < closestDistance) {
              closestDistance = distance
              closestIndex = index
            }
          })

          setActiveStep(closestIndex)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="journey-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="journey-hero">
        <div className="journey-hero-content">
          <div className="journey-hero-badge">
            <Sparkles size={16} />
            <span>Your Sourcing Story</span>
          </div>
          <h1 className="journey-hero-title">
            The Buyer <span className="journey-gradient-text">Journey</span>
          </h1>
          <p className="journey-hero-subtitle">
            Inquiry to delivery — seamless & transparent.
          </p>
          
          {/* Trust Strip */}
          <div className="journey-trust-strip">
            {trustStrip.map((item, index) => (
              <div key={index} className="journey-trust-item">
                <item.icon size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          
          <div className="journey-hero-scroll">
            <ArrowDown size={24} className="journey-scroll-icon" />
            <span>Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* Journey Progress Bar */}
      <div className="journey-progress-bar">
        <div className="journey-progress-track">
          {journeySteps.map((step, index) => (
            <div
              key={step.id}
              className={`journey-progress-dot ${index <= activeStep ? 'active' : ''} ${index === activeStep ? 'current' : ''}`}
              onClick={() => {
                document.querySelector(`.journey-step-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <span className="journey-progress-number">{step.id}</span>
            </div>
          ))}
          <div 
            className="journey-progress-fill" 
            style={{ width: `${(activeStep / (journeySteps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Timeline Section */}
      <section ref={timelineRef} className="journey-timeline">
        <div className="journey-timeline-line" />
        
        {journeySteps.map((step, index) => (
          <JourneyStep 
            key={step.id} 
            step={step} 
            index={index}
            isActive={index === activeStep}
            isCompleted={index < activeStep}
          />
        ))}
      </section>

      {/* CTA Section */}
      <section className="journey-cta-section">
        <div className="journey-container">
          <div className="journey-cta-card">
            <div className="journey-cta-content">
              <h3>Ready to Start Your Journey?</h3>
              <p>Send your first inquiry and start sourcing from India.</p>
            </div>
            <Link to="/rfq" className="journey-btn-primary journey-btn-lg">
              <Send size={18} />
              Send RFQ Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


// Journey Step Component
const JourneyStep = ({ step, index, isActive, isCompleted }) => {
  const Icon = step.icon
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`journey-step journey-step-${index} ${isEven ? 'journey-step-left' : 'journey-step-right'} ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
    >
      {/* Timeline Node */}
      <div className={`journey-node journey-node-${step.color}`}>
        <div className="journey-node-inner">
          <Icon size={24} />
        </div>
        <div className="journey-node-ring" />
        {isCompleted && (
          <div className="journey-node-check">
            <CheckCircle size={16} />
          </div>
        )}
      </div>

      {/* Step Card */}
      <div className={`journey-card journey-card-${step.color}`} data-index={index}>
        <div className="journey-card-header">
          <span className="journey-step-number">Step {step.id}</span>
          <span className="journey-step-duration">
            <Clock size={14} />
            {step.duration}
          </span>
        </div>
        
        <h3 className="journey-card-title">{step.title}</h3>
        <p className="journey-card-subtitle">{step.subtitle}</p>
        <p className="journey-card-desc">{step.description}</p>
        
        <ul className="journey-card-details">
          {step.details.map((detail, i) => (
            <li key={i}>
              <CheckCircle size={14} />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Connector Arrow */}
      {index < journeySteps.length - 1 && (
        <div className="journey-connector">
          <ArrowDown size={20} />
        </div>
      )}
    </motion.div>
  )
}

export default BuyerJourney
