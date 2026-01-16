import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper, TrendingUp, Globe, ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Newsroom.css'

const Newsroom = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="newsroom-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="newsroom-hero">
        <div className="newsroom-hero-content">
          {/* Badge */}
          <div className="newsroom-hero-badge">
            <span className="newsroom-badge-dot"></span>
            <span>Coming Soon</span>
          </div>
          
          {/* Title */}
          <h1 className="newsroom-hero-title">
            <span className="newsroom-gradient-text">Newsroom</span>
          </h1>
          
          {/* Subtitle */}
          <p className="newsroom-hero-subtitle">
            Stay updated with the latest news, announcements, and insights from Aaziko. 
            We're building something exciting for you.
          </p>

          {/* Feature Cards */}
          <div className="newsroom-features-grid">
            <div className="newsroom-feature-card">
              <div className="newsroom-feature-icon">
                <Newspaper size={24} />
              </div>
              <h3>Press Releases</h3>
              <p>Official announcements and company updates</p>
            </div>
            
            <div className="newsroom-feature-card">
              <div className="newsroom-feature-icon">
                <TrendingUp size={24} />
              </div>
              <h3>Industry Insights</h3>
              <p>Trade trends and market analysis</p>
            </div>
            
            <div className="newsroom-feature-card">
              <div className="newsroom-feature-icon">
                <Globe size={24} />
              </div>
              <h3>Global Updates</h3>
              <p>International trade news and regulations</p>
            </div>
          </div>

          {/* Notify Section */}
          <div className="newsroom-notify-section">
            <h2>Get Notified When We Launch</h2>
            <p>Be the first to know when our Newsroom goes live.</p>
            
            <form className="newsroom-notify-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="newsroom-notify-input"
              />
              <button type="submit" className="newsroom-notify-btn">
                <span>Notify Me</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* Back to Home */}
          <div className="newsroom-back-home">
            <Link to="/" className="newsroom-back-link">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Newsroom
