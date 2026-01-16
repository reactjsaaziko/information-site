import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import './ExportDocumentation.css';

// SEO: FAQ Data
const faqs = [
  { q: 'What documents must the seller provide?', a: 'Sellers must provide: Commercial Invoice with complete product and value details, Packing List with carton-level breakdown, and any product-specific documents like test reports or certifications.' },
  { q: 'What is the difference between Proforma Invoice and Commercial Invoice?', a: 'Proforma Invoice is a preliminary document used to confirm order terms before production. Commercial Invoice is the final, official invoice used for customs clearance and payment.' },
  { q: 'Do I need a Certificate of Origin for every shipment?', a: 'Not always. COO is required when the destination country mandates it, when claiming preferential duty rates under trade agreements, or when the buyer specifically requests it.' },
  { q: 'What happens if my documents have errors?', a: 'Document errors cause customs delays and may require amendments (additional fees and time). Significant errors can result in detailed inspections, duty disputes, or shipment rejection.' },
  { q: 'How do I know which product-specific documents I need?', a: 'Requirements depend on product category and destination country. Common triggers: electronics need test reports, food needs health certificates, chemicals need MSDS.' }
];

// SEO: Related internal links
const relatedLinks = [
  { label: 'Customs Documentation', to: '/customs-documentation' },
  { label: 'Trade Agreements', to: '/trade-agreements' },
  { label: 'Export Import Guides', to: '/guides' },
  { label: 'How We Work', to: '/how-we-work' },
  { label: 'Verified Suppliers', to: '/verified-suppliers' }
];

// Related Guides for SEO
const relatedGuides = [
  { label: 'Export Documents from India', to: '/guides/export-documents-from-india' },
  { label: 'Export Process Step by Step', to: '/guides/export-process-step-by-step' },
  { label: 'Incoterms Explained', to: '/guides/incoterms-explained' },
  { label: 'How to Find HS Code', to: '/guides/how-to-find-hs-code' }
];

const ExportDocumentation = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  return (
    <div className="export-doc-page">
      <AnimatedBackground />
      <Navbar />
      
      {/* Top Strip */}
      <div className="export-doc-strip">
        <p>Know exactly what documents are needed for export—Aaziko helps you prepare them in the right format, at the right time.</p>
      </div>

      {/* Hero Section */}
      <section className="export-doc-hero">
        <div className="export-doc-hero-content">
          <h1>Export Documentation: Essential Documents for International Shipping</h1>
          <p className="export-doc-hero-subtitle">
            International buyers and customs need clean, accurate documents. Aaziko provides a clear checklist 
            so your shipment moves smoothly—easy, transparent, and trustful.
          </p>
          <div className="export-doc-hero-btns">
            <button className="export-doc-btn-primary">Start Checklist</button>
            <button className="export-doc-btn-secondary">Talk to Export Support</button>
          </div>
        </div>
      </section>



      {/* Section 2 - Core Documents */}
      <section className="export-doc-section export-doc-section-alt">
        <div className="export-doc-container">
          <h2 className="export-doc-section-title">Core Export Document Set (Required in Most Shipments)</h2>
          
          <div className="export-doc-cards-grid">
            <div className="export-doc-card">
              <div className="export-doc-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
              <h3>Proforma Invoice (PI)</h3>
              <p>Used to confirm quotation & order terms before final invoicing.</p>
            </div>

            <div className="export-doc-card">
              <div className="export-doc-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="18" rx="2"/>
                  <line x1="8" y1="7" x2="16" y2="7"/>
                  <line x1="8" y1="11" x2="16" y2="11"/>
                  <line x1="8" y1="15" x2="12" y2="15"/>
                </svg>
              </div>
              <h3>Commercial Invoice <span className="export-doc-badge export-doc-badge-green">Seller must provide</span></h3>
              <p>Final invoice for goods value, currency, product details, HS code (if available), and terms.</p>
            </div>

            <div className="export-doc-card">
              <div className="export-doc-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <h3>Packing List <span className="export-doc-badge export-doc-badge-green">Seller must provide</span></h3>
              <p>Carton count, net/gross weight, dimensions, packing type, SKU-wise breakup.</p>
            </div>

            <div className="export-doc-card">
              <div className="export-doc-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h3>Transport Document <span className="export-doc-badge export-doc-badge-blue">Handled via Aaziko logistics flow</span></h3>
              <p>Bill of Lading (Sea) or Airway Bill (Air)—proof of shipment.</p>
            </div>

            <div className="export-doc-card">
              <div className="export-doc-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3>Country of Origin Declaration / Certificate <span className="export-doc-badge export-doc-badge-yellow">if required</span></h3>
              <p>Needed for many import countries, especially when duty benefit applies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Product Specific Documents */}
      <section className="export-doc-section">
        <div className="export-doc-container">
          <h2 className="export-doc-section-title">Product-Specific Documents (If Required by Buyer or Destination)</h2>
          
          <ul className="export-doc-product-list">
            <li>Test Reports / Lab Reports (category-based)</li>
            <li>Product Certifications (example: CE, FDA-type compliance where applicable)</li>
            <li>MSDS/SDS (chemicals, liquids, certain industrial goods)</li>
            <li>Technical Datasheet / Specification Sheet</li>
            <li>Inspection Report (when inspection is part of the order)</li>
          </ul>
          
          <p className="export-doc-section-desc" style={{ marginTop: '32px', color: 'var(--primary)', fontWeight: 600 }}>
            Aaziko helps you identify what applies to your product + destination.
          </p>
        </div>
      </section>

  

      {/* Section 5 - Quick Checks */}
      <section className="export-doc-section">
        <div className="export-doc-container">
          <h2 className="export-doc-section-title">Before You Submit: 6 Quick Checks</h2>
          <p className="export-doc-section-desc">Make sure these match everywhere (PI → Invoice → Packing List):</p>
          
          <div className="export-doc-checks-grid">
            <div className="export-doc-check-item">
              <span>✓</span>
              <span>Company name & address</span>
            </div>
            <div className="export-doc-check-item">
              <span>✓</span>
              <span>Product name / model / SKU</span>
            </div>
            <div className="export-doc-check-item">
              <span>✓</span>
              <span>Quantity (pieces/cartons)</span>
            </div>
            <div className="export-doc-check-item">
              <span>✓</span>
              <span>Net weight / gross weight</span>
            </div>
            <div className="export-doc-check-item">
              <span>✓</span>
              <span>HS code (if used)</span>
            </div>
            <div className="export-doc-check-item">
              <span>✓</span>
              <span>Incoterm & currency</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEO: FAQ Section */}
      <section className="export-doc-section export-doc-section-alt">
        <div className="export-doc-container">
          <h2 className="export-doc-section-title">Frequently Asked Questions</h2>
          <div className="export-doc-faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`export-doc-faq-item ${expandedFaq === index ? 'open' : ''}`}>
                <button 
                  className="export-doc-faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={20} className="export-doc-faq-chevron" />
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="export-doc-faq-answer"
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
      <section className="export-doc-section">
        <div className="export-doc-container">
          <h2 className="export-doc-section-title">Related Resources</h2>
          <div className="export-doc-related-links">
            {relatedLinks.map((link, index) => (
              <Link key={index} to={link.to} className="export-doc-related-link">
                <ArrowRight size={16} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides Section */}
      <section className="export-doc-section export-doc-section-alt">
        <div className="export-doc-container">
          <h2 className="export-doc-section-title">Related Guides</h2>
          <div className="export-doc-related-links">
            {relatedGuides.map((guide, index) => (
              <Link key={index} to={guide.to} className="export-doc-related-link">
                <ArrowRight size={16} />
                {guide.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExportDocumentation;
