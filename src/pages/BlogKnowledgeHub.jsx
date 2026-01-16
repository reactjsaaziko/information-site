// Blog & Knowledge Hub Page - Visual First Design
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  BookOpen, ArrowRight, Download, FileText, Package, Truck,
  ShieldCheck, DollarSign, Globe, CheckCircle, Lightbulb,
  ClipboardList, AlertTriangle, MapPin, Play, Eye, Users,
  Zap, Target, Award, TrendingUp, FileCheck, Box, Scale
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './BlogKnowledgeHub.css'

const categories = [
  { id: 'export-basics', title: 'Export Basics', icon: Globe, color: '#2563eb', articles: 12 },
  { id: 'documents', title: 'Documents', icon: FileText, color: '#059669', articles: 8 },
  { id: 'packaging', title: 'Packaging', icon: Package, color: '#d97706', articles: 6 },
  { id: 'inspection', title: 'Inspection', icon: ShieldCheck, color: '#7c3aed', articles: 5 },
  { id: 'logistics', title: 'Logistics', icon: Truck, color: '#dc2626', articles: 9 },
  { id: 'pricing', title: 'Pricing', icon: DollarSign, color: '#0891b2', articles: 7 }
]

const featuredGuides = [
  {
    id: 1,
    title: 'Export Order Flow',
    subtitle: '7 Simple Steps',
    icon: ClipboardList,
    color: '#2563eb',
    time: '5 min'
  },
  {
    id: 2,
    title: 'Documentation Checklist',
    subtitle: 'Complete Guide',
    icon: FileCheck,
    color: '#059669',
    time: '8 min'
  },
  {
    id: 3,
    title: 'Packaging Standards',
    subtitle: 'Buyer Expectations',
    icon: Box,
    color: '#d97706',
    time: '6 min'
  },
  {
    id: 4,
    title: 'Inspection Ready',
    subtitle: 'Pre-Inspection Tips',
    icon: ShieldCheck,
    color: '#7c3aed',
    time: '7 min'
  },
  {
    id: 5,
    title: 'Incoterms Explained',
    subtitle: 'EXW to DDP',
    icon: Scale,
    color: '#0891b2',
    time: '10 min'
  },
  {
    id: 6,
    title: 'Avoid Export Delays',
    subtitle: 'Common Mistakes',
    icon: AlertTriangle,
    color: '#dc2626',
    time: '6 min'
  }
]

const quickStats = [
  { icon: FileText, value: '50+', label: 'Guides' },
  { icon: Users, value: '10K+', label: 'Readers' },
  { icon: Download, value: '25+', label: 'Templates' },
  { icon: Globe, value: '15+', label: 'Countries' }
]

const learningPaths = [
  {
    id: 1,
    title: 'New to Export',
    description: 'Start your export journey',
    icon: Lightbulb,
    color: '#2563eb',
    steps: ['Basics', 'Documents', 'First Order']
  },
  {
    id: 2,
    title: 'Scale Up',
    description: 'Grow your export business',
    icon: TrendingUp,
    color: '#059669',
    steps: ['Pricing', 'Logistics', 'Markets']
  },
  {
    id: 3,
    title: 'Quality Focus',
    description: 'Build buyer confidence',
    icon: Award,
    color: '#7c3aed',
    steps: ['Inspection', 'Packaging', 'Compliance']
  }
]

const templates = [
  { id: 1, title: 'Proforma Invoice', icon: FileText, downloads: '2.5K' },
  { id: 2, title: 'Packing List', icon: ClipboardList, downloads: '1.8K' },
  { id: 3, title: 'Product Spec Sheet', icon: FileCheck, downloads: '1.2K' },
  { id: 4, title: 'Quotation Format', icon: DollarSign, downloads: '3.1K' }
]

const BlogKnowledgeHub = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.bkh-hero-visual', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, delay: 0.1 })
      gsap.fromTo('.bkh-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.3 })
      gsap.fromTo('.bkh-hero-stats', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="bkh-page">
      <AnimatedBackground />
      <Navbar />

      {/* Hero - Visual First */}
      <section ref={heroRef} className="bkh-hero-v2">
        <div className="bkh-hero-visual">
          <div className="bkh-hero-icon-grid">
            <div className="bkh-float-icon" style={{ '--delay': '0s', '--color': '#2563eb' }}><Globe size={28} /></div>
            <div className="bkh-float-icon" style={{ '--delay': '0.5s', '--color': '#059669' }}><FileText size={28} /></div>
            <div className="bkh-float-icon" style={{ '--delay': '1s', '--color': '#d97706' }}><Package size={28} /></div>
            <div className="bkh-float-icon" style={{ '--delay': '1.5s', '--color': '#7c3aed' }}><ShieldCheck size={28} /></div>
            <div className="bkh-float-icon" style={{ '--delay': '2s', '--color': '#dc2626' }}><Truck size={28} /></div>
            <div className="bkh-float-icon" style={{ '--delay': '2.5s', '--color': '#0891b2' }}><DollarSign size={28} /></div>
          </div>
          <div className="bkh-hero-center-icon">
            <BookOpen size={48} />
          </div>
        </div>
        <h1 className="bkh-hero-title">Knowledge Hub</h1>
        <p className="bkh-hero-tagline">Learn Export • Step by Step</p>
        
        <div className="bkh-hero-stats">
          {quickStats.map((stat, i) => (
            <div key={i} className="bkh-stat-item">
              <stat.icon size={20} />
              <span className="bkh-stat-value">{stat.value}</span>
              <span className="bkh-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Categories - Icon Grid */}
      <section className="bkh-categories-v2">
        <div className="bkh-container">
          <div className="bkh-cat-grid">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bkh-cat-card"
                style={{ '--cat-color': cat.color }}
              >
                <div className="bkh-cat-icon">
                  <cat.icon size={28} />
                </div>
                <span className="bkh-cat-title">{cat.title}</span>
                <span className="bkh-cat-count">{cat.articles} guides</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths - Visual Cards */}
      <section className="bkh-paths-section">
        <div className="bkh-container">
          <div className="bkh-section-visual-header">
            <Target size={24} />
            <h2>Choose Your Path</h2>
          </div>
          <div className="bkh-paths-grid">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bkh-path-card"
                style={{ '--path-color': path.color }}
              >
                <div className="bkh-path-icon">
                  <path.icon size={30} />
                </div>
                <h3>{path.title}</h3>
                <p>{path.description}</p>
                <div className="bkh-path-steps">
                  {path.steps.map((step, i) => (
                    <span key={i} className="bkh-step-tag">
                      {i + 1}. {step}
                    </span>
                  ))}
                </div>
                <button className="bkh-path-btn">
                  <Play size={14} />
                  Start
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides - Visual Grid */}
      <section className="bkh-guides-v2">
        <div className="bkh-container">
          <div className="bkh-section-visual-header">
            <Zap size={24} />
            <h2>Popular Guides</h2>
          </div>
          <div className="bkh-guides-visual-grid">
            {featuredGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bkh-guide-visual-card"
                style={{ '--guide-color': guide.color }}
              >
                <div className="bkh-guide-visual-icon">
                  <guide.icon size={24} />
                </div>
                <div className="bkh-guide-visual-content">
                  <h3>{guide.title}</h3>
                  <span className="bkh-guide-subtitle">{guide.subtitle}</span>
                </div>
                <div className="bkh-guide-visual-meta">
                  <Eye size={14} />
                  <span>{guide.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bkh-guides-cta">
            <Link to="/guides" className="bkh-view-all-btn">
              View All Guides
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Templates - Download Section */}
      <section className="bkh-templates-v2">
        <div className="bkh-container">
          <div className="bkh-templates-visual">
            <div className="bkh-templates-left">
              <div className="bkh-templates-icon-big">
                <Download size={40} />
              </div>
              <h2>Ready Templates</h2>
              <p>Download & use instantly</p>
            </div>
            <div className="bkh-templates-right">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bkh-template-visual-item"
                >
                  <div className="bkh-template-visual-icon">
                    <template.icon size={20} />
                  </div>
                  <span className="bkh-template-name">{template.title}</span>
                  <span className="bkh-template-downloads">{template.downloads}</span>
                  <Download size={16} className="bkh-template-dl-icon" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

  

      <Footer />
    </div>
  )
}

export default BlogKnowledgeHub
