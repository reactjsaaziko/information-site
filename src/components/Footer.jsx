import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  ChevronDown,
  MapPin,
  ArrowRight
} from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const [openAccordion, setOpenAccordion] = useState(null)
  const navigate = useNavigate()

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/AazikoIndia', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/aazikoindia', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/Aaziko_India', label: 'X (Twitter)' },
    { icon: Linkedin, href: 'https://linkedin.com/company/aaziko-india', label: 'LinkedIn' }
  ]

  const buyersLinks = [
    { label: 'Find Verified Indian Suppliers', path: '/buyers' },
    { label: 'Post RFQ / Requirement', path: '/rfq' },
    { label: 'How Buying Works (Step-by-step)', path: '/buyers/journey' },
    { label: 'Inspection & Quality Checks', path: '/buyers/benefits' },
    { label: 'Customs & Documentation Help', path: '/customs-documentation' },
    { label: 'Shipment Tracking & Delivery Support', path: '/shipment-tracking' },
    { label: 'Dispute & Resolution Support', path: '/dispute-resolution' }
  ]

  const suppliersLinks = [
    { label: 'Supplier Overview', path: '/suppliers' },
    { label: 'Create Company Profile', path: '/suppliers/create-profile' },
    { label: 'List Products', path: '/suppliers/products' },
    { label: 'Get Verified (KYC + documents)', path: '/suppliers/verification' },
    { label: 'Quote & Order Milestones', path: '/suppliers/quote-milestones' },
    { label: 'Inspection Readiness', path: '/suppliers/inspection-readiness' },
    { label: 'Export Documentation Checklist', path: '/suppliers/export-docs' },
    { label: 'Supplier FAQs', path: '/suppliers/faqs' }
  ]

  const serviceProvidersLinks = [
    { label: 'Logistics Companies', path: '/partners/logistics' },
    { label: 'Freight Forwarders', path: '/partners/freight' },
    { label: 'CHA (Custom House Agents)', path: '/partners/cha' },
    { label: 'Inspection Partners', path: '/partners/inspection' },
    { label: 'Finance / NBFC Partners', path: '/partners/finance' },
    { label: 'Insurance Partners', path: '/partners/insurance' },
    { label: 'Partner SOP & Onboarding', path: '/partners/onboarding' },
    { label: 'Partner Support', path: '/partners/support' }
  ]

  const tradeSolutionsLinks = [
    { label: 'Marketplace', path: '/trade-solutions/marketplace' },
    { label: 'Transport', path: '/trade-solutions/transport' },
    { label: 'Customs', path: '/trade-solutions/customs' },
    { label: 'Inspection', path: '/trade-solutions/inspection' },
    { label: 'Order Finance (Partner-led)', path: '/trade-solutions/order-finance' },
    { label: 'API & Integrations', path: '/trade-solutions/api-integrations' }
  ]

  const learnLinks = [
    { label: 'Blog & Knowledge Hub', path: '/blog' },
    { label: 'Export/Import Guides', path: '/guides' },
    { label: 'Trade Agreements (Basics)', path: '/trade-agreements' },
    { label: 'Webinars & Events', path: '/events' },
    { label: 'Case Studies', path: '/case-studies' }
  ]

  const policyLinks = [
    { label: 'Terms of Use', path: '/policy' },
    { label: 'Privacy Policy', path: '/policy' },
    { label: 'Cookie Policy', path: '/policy' },
    { label: 'Verification Policy (KYC)', path: '/policy' },
    { label: 'Inspection Policy', path: '/policy' },
    { label: 'Refund / Dispute Policy', path: '/policy' }
  ]

  return (
    <footer className="aaziko-footer">
      {/* Pre-Footer CTA Strip */}
      <div className="footer-cta-strip">
        <div className="footer-container">
          <div className="cta-content">
            <h2 className="cta-headline">Ready to trade with confidence?</h2>
            <p className="cta-subtext">
              Aaziko helps you verify, quote, inspect, ship, and complete trade with clear milestones—so you always know what happens next.
            </p>
            
            <div className="cta-buttons">
              <a href="https://buyer.aaziko.com" target="_blank" rel="noopener noreferrer" className="cta-btn cta-btn-buyer">
                <span>I'm a Buyer</span>
                <ArrowRight size={16} />
                <span className="btn-action">Post Requirement</span>
              </a>
              <a href="https://vendor.aaziko.com" target="_blank" rel="noopener noreferrer" className="cta-btn cta-btn-supplier">
                <span>I'm a Supplier</span>
                <ArrowRight size={16} />
                <span className="btn-action">List Products</span>
              </a>
              <button onClick={() => navigate('/coming-soon')} className="cta-btn cta-btn-service">
                <span>I'm a Service Provider</span>
                <ArrowRight size={16} />
                <span className="btn-action">Join Network</span>
              </button>
            </div>
            
            <p className="micro-trust">
              Tools for Marketplace, Transport, Customs, and Inspection—built to reduce delays and documentation errors.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Desktop Layout */}
          <div className="footer-grid desktop-only">
            {/* Column A - Brand */}
            <div className="footer-column footer-brand">
              <div className="brand-header">
                <div className="brand-logo">
                  <img src="/aaziko-logo.png" alt="Aaziko - Global B2B Trade Platform" className="logo-image" />
                </div>
                <p className="brand-tagline">Make Planet Your Market.</p>
              </div>
              
              <p className="brand-description">
                Aaziko connects Indian manufacturers with global buyers to create a more transparent and trustworthy trade ecosystem—with clear steps from discovery to delivery.
              </p>
              
              <div className="office-address">
                <div className="address-label">
                  <MapPin size={14} />
                  <span>Office (India)</span>
                </div>
                <p className="address-text">
                  OFFICE NO.9, PARISAR APARTMENT, OPP. RAILWAY PARCEL OFFICE, SUMUL DAIRY ROAD, KATARGAM, SURAT, GUJARAT, 395004
                </p>
              </div>
              
              <div className="social-links">
                <span className="social-label">Follow Aaziko:</span>
                <div className="social-icons">
                  {socialLinks.map((social) => (
                    <a 
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column B - For Buyers */}
            <div className="footer-column">
              <h3 className="column-title">For Buyers</h3>
              <ul className="footer-links">
                {buyersLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
              <p className="helper-line">
                Built for importers, wholesalers, distributors, and project buyers who need predictable execution—not uncertainty.
              </p>
            </div>

            {/* Column C - For Suppliers */}
            <div className="footer-column">
              <h3 className="column-title">For Suppliers</h3>
              <ul className="footer-links">
                {suppliersLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
              <p className="helper-line">
                Designed for MSMEs and first-time exporters who want international bulk orders with structured support.
              </p>
            </div>

            {/* Column D - Service Providers */}
            <div className="footer-column">
              <h3 className="column-title">For Service Providers</h3>
              <ul className="footer-links">
                {serviceProvidersLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
              <p className="helper-line">
                Join Aaziko's network and offer services to verified trade participants—on a process-driven platform.
              </p>
            </div>

            {/* Column E - Trade Tools + Learn */}
            <div className="footer-column">
              <h3 className="column-title">Trade Solutions</h3>
              <ul className="footer-links">
                {tradeSolutionsLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
              
              <h3 className="column-title" style={{ marginTop: '24px' }}>Learn</h3>
              <ul className="footer-links">
                {learnLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Accordion Layout */}
          <div className="footer-accordion mobile-only">
            {/* Brand Section (always visible on mobile) */}
            <div className="accordion-brand">
              <div className="brand-header">
                <div className="brand-logo">
                  <img src="/aaziko-logo.png" alt="Aaziko - Global B2B Trade Platform" className="logo-image" />
                </div>
                <p className="brand-tagline">Make Planet Your Market.</p>
              </div>
              <p className="brand-description">
                Aaziko connects Indian manufacturers with global buyers to create a more transparent and trustworthy trade ecosystem.
              </p>
              <div className="social-links">
                <div className="social-icons">
                  {socialLinks.map((social) => (
                    <a 
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Accordion Sections */}
            {[
              { id: 'buyers', title: 'For Buyers', links: buyersLinks },
              { id: 'suppliers', title: 'For Suppliers', links: suppliersLinks },
              { id: 'service', title: 'For Service Providers', links: serviceProvidersLinks },
              { id: 'trade', title: 'Trade Solutions', links: tradeSolutionsLinks },
              { id: 'learn', title: 'Learn', links: learnLinks }
            ].map((section) => (
              <div key={section.id} className="accordion-section">
                <button 
                  className={`accordion-header ${openAccordion === section.id ? 'open' : ''}`}
                  onClick={() => toggleAccordion(section.id)}
                  aria-expanded={openAccordion === section.id}
                  aria-controls={`accordion-content-${section.id}`}
                >
                  <span>{section.title}</span>
                  <ChevronDown size={20} className="accordion-icon" aria-hidden="true" />
                </button>
                <div 
                  id={`accordion-content-${section.id}`}
                  className={`accordion-content ${openAccordion === section.id ? 'open' : ''}`}
                >
                  <ul className="footer-links">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link to={link.path}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="bottom-content">
            <div className="policy-links">
              <span className="policy-label">Policies:</span>
              {policyLinks.map((link, index) => (
                <span key={link.label}>
                  <Link to={link.path}>{link.label}</Link>
                  {index < policyLinks.length - 1 && <span className="divider">|</span>}
                </span>
              ))}
            </div>
            
            <p className="compliance-disclaimer">
              Aaziko provides workflow tools and coordination. Services like logistics, inspection, finance, and insurance may be delivered by verified third-party partners. Costs, duties, and timelines can be indicative and subject to country regulations and partner terms.
            </p>
            
            <p className="copyright">
              © 2025 Aaziko. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
