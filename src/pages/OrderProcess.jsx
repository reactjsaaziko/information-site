// OrderProcess Page - Clean visual storyboard experience

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Shield, Globe, Headphones, Package } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import OrderStoryboard from '../components/order/OrderStoryboard'
import AnimatedBackground from '../components/ui/AnimatedBackground'

const OrderProcess = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const features = [
    { icon: Clock, title: 'Fast Processing', desc: '24-48 hours' },
    { icon: Shield, title: 'Buyer Protection', desc: '100% secure' },
    { icon: Globe, title: 'Global Shipping', desc: '25+ countries' },
    { icon: Headphones, title: '24/7 Support', desc: 'Always here' }
  ]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative' }}>
      {/* Animated Background */}
      <AnimatedBackground />
      
      <Navbar />
      
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        paddingTop: isMobile ? '90px' : '100px',
        paddingBottom: isMobile ? '20px' : '30px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}>
        <h1 style={{
          fontSize: isMobile ? '32px' : '48px',
          fontWeight: 800,
          color: 'var(--text)',
          letterSpacing: '-0.03em',
          marginBottom: '10px',
          lineHeight: 1.1,
        }}>
          Your Order{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--info) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Journey
          </span>
        </h1>

        <p style={{
          fontSize: isMobile ? '15px' : '17px',
          color: 'var(--text-secondary)',
          maxWidth: '450px',
          margin: '0 auto',
          lineHeight: 1.5,
        }}>
          Follow our simple 11-step process from inquiry to delivery
        </p>
      </section>

      {/* Storyboard - Main Content */}
      <OrderStoryboard />

      {/* Features Section */}
      <section style={{
        padding: isMobile ? '50px 20px' : '80px 48px',
        background: 'var(--section-alt)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '36px' }}
          >
            <h2 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: 800,
              color: 'var(--text)',
              marginBottom: '8px',
            }}>
              Why Trade With Us
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
              Every step designed for your success
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: '16px'
          }}>
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: isMobile ? '50px 20px' : '80px 48px',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            borderBottom: '4px solid var(--primary-dark)'
          }}>
            <Package size={28} color="white" />
          </div>

          <h2 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 800,
            color: 'var(--text)',
            marginBottom: '12px',
          }}>
            Ready to Begin?
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            marginBottom: '28px',
            lineHeight: 1.6
          }}>
            Start your sourcing journey today with our verified manufacturers.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--primary)',
                color: 'white',
                padding: '14px 28px',
                borderRadius: 'var(--radius-md)',
                fontSize: '15px',
                fontWeight: 600,
                border: 'none',
                borderBottom: '4px solid var(--primary-dark)',
                cursor: 'pointer'
              }}
            >
              Start Your Order
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--surface)',
                color: 'var(--text)',
                padding: '14px 28px',
                borderRadius: 'var(--radius-md)',
                fontSize: '15px',
                fontWeight: 600,
                border: '2px solid var(--border)',
                borderBottom: '4px solid var(--gray-300)',
                cursor: 'pointer'
              }}
            >
              Talk to Sales
            </motion.button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}

// Feature card with wiggle animation
const FeatureCard = ({ feature, index, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [wiggleKey, setWiggleKey] = useState(0)
  const Icon = feature.icon

  const handleMouseEnter = () => {
    setIsHovered(true)
    setWiggleKey(prev => prev + 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        padding: isMobile ? '20px 16px' : '28px',
        border: '2px solid var(--border)',
        borderBottom: '4px solid var(--gray-300)',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(11, 31, 59, 0.08)',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform 0.2s ease'
      }}
    >
      <div 
        key={wiggleKey}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--sky)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
          animation: isHovered ? 'iconWiggle 0.5s ease-in-out' : 'none'
        }}
      >
        <Icon size={24} color="var(--primary)" strokeWidth={1.5} />
      </div>
      <h4 style={{
        fontSize: '15px',
        fontWeight: 700,
        color: 'var(--text)',
        marginBottom: '4px'
      }}>
        {feature.title}
      </h4>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
        {feature.desc}
      </p>
      
      <style>{`
        @keyframes iconWiggle {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-12deg); }
          40% { transform: rotate(12deg); }
          60% { transform: rotate(-12deg); }
          80% { transform: rotate(12deg); }
        }
      `}</style>
    </motion.div>
  )
}

export default OrderProcess
