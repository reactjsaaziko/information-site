// AazikoHelpsBlock - Reusable "How Aaziko makes this easier" section
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import './AazikoHelpsBlock.css'

/**
 * AazikoHelpsBlock - Branded callout for guide pages
 * 
 * Props:
 * - heading (string): Section heading (defaults to "How Aaziko makes this easier")
 * - bullets (string[]): List of benefit points
 * - links: array of { label: string, to: string }
 */
const AazikoHelpsBlock = ({
  heading = 'How Aaziko makes this easier',
  bullets = [],
  links = []
}) => {
  return (
    <section className="aaziko-helps-section">
      <div className="aaziko-helps-container">
        <div className="aaziko-helps-card">
          <div className="aaziko-helps-header">
            <Sparkles size={24} className="aaziko-helps-icon" />
            <h2 className="aaziko-helps-title">{heading}</h2>
          </div>
          
          {bullets.length > 0 && (
            <ul className="aaziko-helps-bullets">
              {bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          )}
          
          {links.length > 0 && (
            <nav className="aaziko-helps-links" aria-label="Related Aaziko features">
              {links.map((link, index) => (
                <Link key={index} to={link.to} className="aaziko-helps-link">
                  {link.label}
                  <ArrowRight size={16} />
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </section>
  )
}

export default AazikoHelpsBlock
