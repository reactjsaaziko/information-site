import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Shield, Eye, Handshake, ArrowRight, Play, CheckCircle, Globe, Zap, Award } from 'lucide-react'
import { RotatingText, TextReveal } from './ui/TextAnimations'

const AboutHero = () => {
  const heroRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-badge', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.1 }
      )
      gsap.fromTo('.hero-subtitle', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.5 }
      )
      gsap.fromTo('.hero-features > div', 
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.6 }
      )
      gsap.fromTo('.hero-buttons', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.7 }
      )
      gsap.fromTo('.hero-cards > div', 
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.8 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const features = [
    { icon: CheckCircle, text: 'Verified Manufacturers' },
    { icon: Globe, text: 'Global Network' },
    { icon: Zap, text: 'Fast Processing' },
    { icon: Award, text: 'Quality Assured' }
  ]

  const cards = [
    { icon: Shield, label: 'Secure', desc: 'End-to-end protection', color: 'var(--primary)', darkColor: 'var(--primary-dark)' },
    { icon: Eye, label: 'Transparent', desc: 'Full visibility', color: 'var(--info)', darkColor: '#0284c7' },
    { icon: Handshake, label: 'Trusted', desc: 'Verified partners', color: 'var(--success)', darkColor: '#15803d' }
  ]

  return (
    <section ref={heroRef} style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '100px 20px 60px' : '100px 48px 80px',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
      margin: '0 auto'
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 60%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '20%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      {/* Main content - centered */}
      <div style={{
        maxWidth: '900px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Badge */}
        <div className="hero-badge" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'var(--primary-bg)',
          borderRadius: 'var(--radius-full)',
          marginBottom: '24px',
          border: '1px solid rgba(37, 99, 235, 0.2)'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--primary)',
            animation: 'pulse-dot 2s infinite'
          }} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-dark)' }}>
            About Aaziko
          </span>
        </div>

        {/* Title with animations */}
        <h1 className="hero-title" style={{
          fontSize: isMobile ? '42px' : '68px',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: '24px'
        }}>
          <TextReveal delay={0.2}>
            <span style={{ display: 'block', color: 'var(--text)' }}>Making global trade</span>
          </TextReveal>
          <TextReveal delay={0.35}>
            <span style={{ display: 'block', color: 'var(--text)' }}>
              feel{' '}
              <RotatingText 
                texts={['trustworthy.', 'seamless.', 'transparent.', 'reliable.']}
                duration={2500}
                style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              />
            </span>
          </TextReveal>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle" style={{
          fontSize: isMobile ? '16px' : '19px',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: '600px',
          margin: '0 auto 32px',
        }}>
          We connect global buyers with verified Indian manufacturers. 
          From discovery to delivery, trade with complete confidence and transparency.
        </p>

        {/* Quick features */}
        <div className="hero-features" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: isMobile ? '12px' : '24px',
          marginBottom: '36px'
        }}>
          {features.map((f, i) => (
            <FeaturePill key={i} feature={f} />
          ))}
        </div>

        {/* Buttons */}
        <div className="hero-buttons" style={{
          display: 'flex',
          gap: '14px',
          justifyContent: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          marginBottom: '48px'
        }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'var(--primary)',
            color: 'white',
            padding: '16px 32px',
            borderRadius: 'var(--radius-md)',
            fontSize: '15px',
            fontWeight: 600,
            border: 'none',
            borderBottom: '4px solid var(--primary-dark)',
            cursor: 'pointer',
            transition: 'transform 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
          }}
          onMouseDown={(e) => {
            e.target.style.transform = 'translateY(2px)'
          }}
          onMouseUp={(e) => {
            e.target.style.transform = 'translateY(-2px)'
          }}
          >
            Explore Platform
            <ArrowRight size={18} />
          </button>
          
          <button style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'var(--white)',
            color: 'var(--text)',
            padding: '16px 32px',
            borderRadius: 'var(--radius-md)',
            fontSize: '15px',
            fontWeight: 600,
            border: '2px solid var(--gray-200)',
            borderBottom: '4px solid var(--gray-300)',
            cursor: 'pointer',
            transition: 'transform 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
          }}
          onMouseDown={(e) => {
            e.target.style.transform = 'translateY(2px)'
          }}
          onMouseUp={(e) => {
            e.target.style.transform = 'translateY(-2px)'
          }}
          >
            <Play size={16} fill="currentColor" />
            Watch Demo
          </button>
        </div>

        {/* Feature cards */}
        <div className="hero-cards" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          {cards.map((card, i) => (
            <HeroFeatureCard key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}

const FeaturePill = ({ feature }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = feature.icon
  
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        background: 'var(--white)',
        borderRadius: 'var(--radius-full)',
        border: '2px solid var(--gray-200)',
        borderBottom: '4px solid var(--gray-300)',
        cursor: 'default',
        transform: isHovered ? 'scale(1.05) translateY(-2px)' : 'scale(1) translateY(0)',
        transition: 'transform 0.2s ease'
      }}
    >
      <Icon size={16} color="var(--primary)" />
      <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
        {feature.text}
      </span>
    </div>
  )
}

const HeroFeatureCard = ({ card }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [wiggleKey, setWiggleKey] = useState(0)
  
  const handleMouseEnter = () => {
    setIsHovered(true)
    setWiggleKey(prev => prev + 1)
  }
  
  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false) }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '16px 20px',
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        border: '2px solid var(--gray-200)',
        borderBottom: '4px solid var(--gray-300)',
        cursor: 'pointer',
        transform: isPressed 
          ? 'translateY(2px)' 
          : isHovered 
            ? 'translateY(-3px)' 
            : 'translateY(0)',
        transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      <div 
        key={wiggleKey}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-md)',
          background: card.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `2px solid ${card.color}`,
          borderBottom: `4px solid ${card.darkColor}`,
          animation: isHovered ? 'iconWiggle 0.5s ease-in-out' : 'none'
        }}
      >
        <card.icon size={22} color="white" strokeWidth={2} />
      </div>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>
          {card.label}
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {card.desc}
        </div>
      </div>
      
      <style>{`
        @keyframes iconWiggle {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          20% { transform: translateX(-4px) rotate(-5deg); }
          40% { transform: translateX(4px) rotate(5deg); }
          60% { transform: translateX(-3px) rotate(-3deg); }
          80% { transform: translateX(3px) rotate(3deg); }
        }
      `}</style>
    </div>
  )
}

export default AboutHero
