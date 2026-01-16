// Supplier FAQs Page
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  HelpCircle, ChevronDown, Building2, Package, Globe, DollarSign,
  Truck, FileText, ShieldCheck, Clock, AlertTriangle, CheckCircle,
  ArrowRight, Sparkles, Users, BadgeCheck, CreditCard, ClipboardList,
  Scale, MessageSquare, TrendingUp, Camera, Zap, Star
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './SupplierFAQs.css'

const faqData = [
  {
    id: 1,
    question: 'What is Aaziko for suppliers?',
    answer: 'Aaziko helps Indian suppliers sell internationally with a structured, trust-driven process. You focus on product + production, and Aaziko manages the export flow—buyer handling, logistics, inspection (if required), and export guidance.',
    icon: Globe,
    category: 'getting-started'
  },
  {
    id: 2,
    question: 'Do I need export experience to sell through Aaziko?',
    answer: 'No. You can start even as a first-time exporter. Aaziko supports the export process and documentation guidance so you can sell globally without confusion.',
    icon: Sparkles,
    category: 'getting-started'
  },
  {
    id: 3,
    question: 'What do I need to do as a supplier?',
    answer: 'You mainly need to: Create your company profile, Upload product details, Share accurate pricing/lead time, Manufacture as per confirmed order, and Provide Commercial Invoice + Packing List when required.',
    icon: ClipboardList,
    category: 'getting-started',
    list: [
      'Create your company profile',
      'Upload product details',
      'Share accurate pricing/lead time',
      'Manufacture as per confirmed order',
      'Provide Commercial Invoice + Packing List when required'
    ]
  },
  {
    id: 4,
    question: 'How do I get international orders on Aaziko?',
    answer: 'You can receive orders in two ways: Direct inquiries on your supplier profile/product pages, and LSQ Module (buyer posts requirement → suppliers quote → buyer selects → order converts).',
    icon: Users,
    category: 'orders',
    list: [
      'Direct inquiries on your supplier profile/product pages',
      'LSQ Module (buyer posts requirement → suppliers quote → buyer selects → order converts)'
    ]
  },
  {
    id: 5,
    question: 'Does Aaziko charge commission from suppliers?',
    answer: "Aaziko's goal is to keep selling simple and cost-efficient. Any charges (if applicable) are shown clearly before you proceed. No hidden deductions.",
    icon: DollarSign,
    category: 'payments'
  },
  {
    id: 6,
    question: 'When do I get paid?',
    answer: "You receive 100% payment against goods as per Aaziko's order terms—so you don't have to manage international buyer payment collection, bank negotiation, or cross-border payment risk on your own.",
    icon: CreditCard,
    category: 'payments'
  },
  {
    id: 7,
    question: 'What payment methods does Aaziko use to pay suppliers?',
    answer: 'Aaziko pays suppliers through supported bank channels as per the order structure and compliance requirements. The key benefit: you receive full payment against goods without currency conversion loss and unnecessary export-side banking friction.',
    icon: CreditCard,
    category: 'payments'
  },
  {
    id: 8,
    question: 'Do I need to manage shipping, customs, CHA, or freight forwarders?',
    answer: 'No. The supplier is not responsible for arranging logistics, customs clearing, CHA, insurance, or freight coordination. Aaziko coordinates these through its system and partners (where applicable). Your responsibility is the product.',
    icon: Truck,
    category: 'logistics'
  },
  {
    id: 9,
    question: 'Who is responsible for product quality and packaging?',
    answer: 'The supplier is responsible for delivering correct quality as agreed, correct quantity, and proper packaging & labeling as per shared instructions. Aaziko ensures the process stays transparent and may coordinate inspection when required.',
    icon: Package,
    category: 'quality',
    list: [
      'Correct quality as agreed',
      'Correct quantity',
      'Proper packaging & labeling as per shared instructions'
    ]
  },
  {
    id: 10,
    question: 'Is inspection mandatory?',
    answer: 'Inspection is not mandatory for every order. It depends on buyer requirement, product category risk, and destination rules. If required, Aaziko coordinates the inspection flow and shares proof.',
    icon: ShieldCheck,
    category: 'quality'
  },
  {
    id: 11,
    question: 'What documents do I need to provide?',
    answer: "Most commonly you'll provide Commercial Invoice and Packing List. Sometimes (product-dependent): Test reports / certifications you already have. Aaziko guides what's needed based on the destination.",
    icon: FileText,
    category: 'documentation',
    list: [
      'Commercial Invoice',
      'Packing List',
      'Test reports / certifications (if product-dependent)'
    ]
  },
  {
    id: 12,
    question: 'How does Aaziko build trust with global buyers for my products?',
    answer: 'Aaziko builds trust through supplier verification, clear product data and documentation, inspection-backed evidence (when required), and transparent order process and support. This increases buyer confidence to place bulk orders.',
    icon: BadgeCheck,
    category: 'trust',
    list: [
      'Supplier verification',
      'Clear product data and documentation',
      'Inspection-backed evidence (when required)',
      'Transparent order process and support'
    ]
  },
  {
    id: 13,
    question: 'Can I sell multiple product categories?',
    answer: 'Yes, if your business supports it. List products clearly by category with accurate specs, MOQ, and lead time.',
    icon: Package,
    category: 'products'
  },
  {
    id: 14,
    question: "What if I can't fulfill an order on time?",
    answer: 'Inform Aaziko early with a revised timeline. Delays impact buyer trust, so early communication is critical. Aaziko helps manage buyer expectations through structured updates.',
    icon: Clock,
    category: 'orders'
  },
  {
    id: 15,
    question: 'What if there is a dispute?',
    answer: 'Aaziko follows an evidence-based resolution approach. Documentation, inspection reports (if any), and shipment proofs help resolve disputes transparently.',
    icon: Scale,
    category: 'support'
  },
  {
    id: 16,
    question: 'How do I increase my chances of getting more orders?',
    answer: 'Focus on these key areas to maximize your order potential on Aaziko.',
    icon: TrendingUp,
    category: 'tips',
    list: [
      'Complete your company profile (photos, capacity, location)',
      'Upload high-quality product images',
      'Add clear specs, MOQ, lead time, and packing details',
      'Respond fast to inquiries and LSQ quotes',
      'Maintain consistent quality and timelines'
    ]
  }
]

const categories = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'getting-started', label: 'Getting Started', icon: Sparkles },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'payments', label: 'Payments', icon: DollarSign },
  { id: 'logistics', label: 'Logistics', icon: Truck },
  { id: 'quality', label: 'Quality', icon: ShieldCheck },
  { id: 'documentation', label: 'Documentation', icon: FileText }
]

const SupplierFAQs = () => {
  const heroRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sfaq-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
      gsap.fromTo('.sfaq-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      gsap.fromTo('.sfaq-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const filteredFaqs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory)

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <div className="sfaq-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="sfaq-hero">
        <div className="sfaq-hero-content">
          <div className="sfaq-hero-badge">
            <HelpCircle size={16} />
            <span>Supplier FAQs</span>
          </div>
          <h1 className="sfaq-hero-title">
            Quick Answers for <span className="sfaq-gradient-text">Indian Suppliers</span>
          </h1>
          <p className="sfaq-hero-subtitle">
            Quick answers for Indian manufacturers & sellers using Aaziko to sell internationally—easy, transparent, and trustful.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sfaq-filter-section">
        <div className="sfaq-container">
          <div className="sfaq-filter-wrapper">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`sfaq-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <cat.icon size={16} />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="sfaq-section">
        <div className="sfaq-container">
          <div className="sfaq-section-header">
            <span className="sfaq-section-badge">Most Asked Questions</span>
            <h2 className="sfaq-section-title">Everything You Need to Know</h2>
          </div>

          <div className="sfaq-list">
            <AnimatePresence>
              {filteredFaqs.map((faq, index) => (
                <FAQItem 
                  key={faq.id} 
                  faq={faq} 
                  index={index}
                  isOpen={openFaq === faq.id}
                  onToggle={() => toggleFaq(faq.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  )
}

// FAQ Item Component
const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  const Icon = faq.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05 }}
      className={`sfaq-item ${isOpen ? 'open' : ''}`}
    >
      <button className="sfaq-item-header" onClick={onToggle}>
        <div className="sfaq-item-icon">
          <Icon size={20} />
        </div>
        <div className="sfaq-item-question">
          <span className="sfaq-item-number">{String(faq.id).padStart(2, '0')}</span>
          <h3>{faq.question}</h3>
        </div>
        <div className={`sfaq-item-toggle ${isOpen ? 'open' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sfaq-item-content"
          >
            <div className="sfaq-item-answer">
              <p>{faq.answer}</p>
              {faq.list && (
                <ul className="sfaq-item-list">
                  {faq.list.map((item, i) => (
                    <li key={i}>
                      <CheckCircle size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default SupplierFAQs
