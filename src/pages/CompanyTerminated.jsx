// Aaziko Company Terminated Page
import { Link } from 'react-router-dom'
import { AlertTriangle, Home, FileText, Headphones } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import './CompanyTerminated.css'

const CompanyTerminated = () => {
  return (
    <div className="terminated-page">
      <AnimatedBackground />
      <Navbar />

      <section className="terminated-hero">
        <div className="terminated-content">
          <div className="terminated-icon">
            <AlertTriangle size={48} />
          </div>
          <h1 className="terminated-title">Company Account Terminated</h1>
          <p className="terminated-subtitle">
            This company's account has been terminated due to policy violations or other reasons.
          </p>
          
          <div className="terminated-info-card">
            <h3>What does this mean?</h3>
            <ul>
              <li>The company can no longer conduct business on Aaziko</li>
              <li>All active orders have been suspended</li>
              <li>The company profile is no longer accessible</li>
            </ul>
          </div>

          <div className="terminated-actions">
            <Link to="/" className="terminated-btn-primary">
              <Home size={18} />
              Go to Homepage
            </Link>
            <Link to="/company/termination-guide" className="terminated-btn-secondary">
              <FileText size={18} />
              View Termination Guide
            </Link>
            <Link to="/contact" className="terminated-btn-secondary">
              <Headphones size={18} />
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CompanyTerminated
