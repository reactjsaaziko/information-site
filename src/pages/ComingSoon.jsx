import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Rocket, Clock, Mail } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ComingSoon.css';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <>
      <Navbar darkMode={false} />
      <div className="coming-soon-page">
        <div className="coming-soon-bg">
          <div className="coming-soon-gradient-1" />
          <div className="coming-soon-gradient-2" />
          <div className="coming-soon-grid" />
        </div>

        <div className="coming-soon-container">
          <motion.div
            className="coming-soon-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="coming-soon-back">
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </Link>

            <div className="coming-soon-icon-wrapper">
              <motion.div
                className="coming-soon-icon"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Rocket size={48} />
              </motion.div>
            </div>

            <span className="coming-soon-badge">
              <Clock size={14} />
              Coming Soon
            </span>

            <h1 className="coming-soon-title">
              Service Provider Portal
              <span className="coming-soon-highlight"> Launching Soon</span>
            </h1>

            <p className="coming-soon-description">
              We're building something amazing for service providers. Join our network of logistics companies, 
              freight forwarders, custom house agents, inspection partners, and more. Be the first to know when we launch.
            </p>

            <div className="coming-soon-features">
              <div className="coming-soon-feature">
                <div className="feature-icon">🚚</div>
                <span>Logistics Partners</span>
              </div>
              <div className="coming-soon-feature">
                <div className="feature-icon">📦</div>
                <span>Freight Forwarders</span>
              </div>
              <div className="coming-soon-feature">
                <div className="feature-icon">📋</div>
                <span>Custom House Agents</span>
              </div>
              <div className="coming-soon-feature">
                <div className="feature-icon">🔍</div>
                <span>Inspection Partners</span>
              </div>
            </div>

            {!isSubscribed ? (
              <form className="coming-soon-form" onSubmit={handleSubscribe}>
                <div className="form-input-wrapper">
                  <Mail size={18} className="form-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email for updates"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="coming-soon-btn">
                  <Bell size={16} />
                  Notify Me
                </button>
              </form>
            ) : (
              <motion.div
                className="coming-soon-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="success-icon">✓</span>
                <span>Thanks! We'll notify you when we launch.</span>
              </motion.div>
            )}

            <p className="coming-soon-note">
              Want to learn more about partnering with Aaziko? 
              <Link to="/contact" className="coming-soon-link"> Contact us</Link>
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ComingSoon;
