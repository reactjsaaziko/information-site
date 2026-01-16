// SEO-optimized Page Layout Component
// Provides consistent structure for SEO-friendly pages with semantic HTML
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from './Navbar'
import Footer from './Footer'
import AnimatedBackground from './ui/AnimatedBackground'
import './SeoPageLayout.css'

/**
 * SeoPageLayout - Reusable SEO-friendly page structure
 * 
 * Props:
 * - title (string): H1 page title
 * - intro (string | ReactNode): Introduction paragraph (5-8 lines)
 * - sections: array of { heading: string, content: ReactNode }
 * - faqs: array of { q: string, a: string }
 * - relatedLinks: array of { label: string, to: string }
 * - badge (string): Optional badge text above title
 * - badgeIcon (ReactNode): Optional icon for badge
 * - className (string): Optional additional class for page wrapper
 */
const SeoPageLayout = ({
  title,
  intro,
  sections = [],
  faqs = [],
  relatedLinks = [],
  badge,
  badgeIcon,
  className = '',
  children,
  metaTitle,
  metaDescription
}) => {
  const [expandedFaq, setExpandedFaq] = useState(null)

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  // Generate FAQ Schema for rich snippets
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  } : null

  return (
    <div className={`seo-page ${className}`}>
      {/* FAQ Schema for Google Rich Snippets */}
      {faqSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        </Helmet>
      )}
      
      <AnimatedBackground />
      <Navbar />

      <main className="seo-main">
        {/* Hero Section with H1 */}
        <header className="seo-hero">
          <div className="seo-hero-content">
            {badge && (
              <div className="seo-hero-badge">
                {badgeIcon}
                <span>{badge}</span>
              </div>
            )}
            <h1 className="seo-hero-title">{title}</h1>
            {intro && (
              <div className="seo-hero-intro">
                {typeof intro === 'string' ? <p>{intro}</p> : intro}
              </div>
            )}
          </div>
        </header>

        {/* Main Content Sections */}
        {sections.map((section, index) => (
          <section
            key={index}
            className={`seo-section ${index % 2 === 1 ? 'seo-section-alt' : ''}`}
          >
            <div className="seo-container">
              <h2 className="seo-section-title">{section.heading}</h2>
              <div className="seo-section-content">
                {section.content}
              </div>
            </div>
          </section>
        ))}

        {/* Additional custom content */}
        {children}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="seo-section seo-faq-section">
            <div className="seo-container">
              <h2 className="seo-section-title">Frequently Asked Questions</h2>
              <div className="seo-faq-list">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`seo-faq-item ${expandedFaq === index ? 'open' : ''}`}
                  >
                    <button
                      className="seo-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={expandedFaq === index}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={20} className="seo-faq-chevron" />
                    </button>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="seo-faq-answer"
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Pages Section */}
        {relatedLinks.length > 0 && (
          <section className="seo-section seo-related-section">
            <div className="seo-container">
              <h2 className="seo-section-title">Related Pages</h2>
              <nav className="seo-related-links" aria-label="Related pages">
                <ul>
                  {relatedLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.to} className="seo-related-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default SeoPageLayout
