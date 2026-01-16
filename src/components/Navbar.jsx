import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'

const Navbar = ({ darkMode = false }) => {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [buyersDropdown, setBuyersDropdown] = useState(false)
  const location = useLocation()
  
  const mainNavItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'How We Work', path: '/how-we-work' },
    { label: 'Order Process', path: '/order-process' },
    { label: 'Aaziko Logistics', path: '/logistics' },
    { label: 'Aaziko Inspection', path: '/inspection' },
    { label: 'Newsroom', path: '/newsroom' },
    { label: 'Contact', path: '/contact' }
  ]

  // All items for mobile menu
  const mobileNavItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'How We Work', path: '/how-we-work' },
    { label: 'Order Process', path: '/order-process' },
    { label: 'Aaziko Logistics', path: '/logistics' },
    { label: 'Aaziko Inspection', path: '/inspection' },
    { label: 'Newsroom', path: '/newsroom' },
    { label: 'Contact', path: '/contact' }
  ]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1100)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -20 },
      { y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const isActive = (item) => {
    // Exact match for most routes
    if (item.path === location.pathname) return true
    // Special cases for alternate paths
    if (item.path === '/buyers' && location.pathname === '/buyers/overview') return true
    if (item.path === '/policy' && location.pathname === '/legal/policy') return true
    return false
  }

  const isBuyersActive = () => {
    return location.pathname.startsWith('/buyers')
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 16px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        background: darkMode 
          ? 'transparent' 
          : (scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)'),
        backdropFilter: darkMode ? 'none' : 'blur(10px)',
        borderBottom: darkMode ? 'none' : '1px solid var(--border)',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        {/* Logo */}
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          textDecoration: 'none',
          flexShrink: 0
        }}>
          <img 
            src="/aaziko-logo.png" 
            alt="Aaziko" 
            style={{
              height: '32px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </Link>

        {/* Desktop Nav */}
        {!isMobile && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2px',
            background: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
            padding: '4px',
            borderRadius: 'var(--radius-full)',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '2px solid var(--gray-200)',
            backdropFilter: darkMode ? 'blur(10px)' : 'none'
          }}>
            {mainNavItems.map((item) => {
              const active = item.dropdown 
                ? isBuyersActive()
                : isActive(item)
              
              // Dropdown item
              if (item.dropdown) {
                const dropdownOpen = buyersDropdown
                const setDropdownOpen = setBuyersDropdown
                
                return (
                  <div 
                    key={item.label}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div
                      style={{
                        padding: '6px 10px',
                        fontSize: '13px',
                        color: active 
                          ? 'white' 
                          : (darkMode ? 'rgba(255, 255, 255, 0.8)' : 'var(--text-secondary)'),
                        fontWeight: 500,
                        borderRadius: 'var(--radius-full)',
                        background: active ? 'var(--primary)' : 'transparent',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {item.label}
                      <ChevronDown size={14} style={{ 
                        transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.2s ease'
                      }} />
                    </div>
                    
                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        paddingTop: '4px',
                        zIndex: 100
                      }}>
                        <div style={{
                          background: darkMode ? 'rgba(15, 23, 42, 0.95)' : '#ffffff',
                          border: darkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '2px solid var(--gray-200)',
                          borderRadius: 'var(--radius-lg)',
                          padding: '8px',
                          minWidth: '180px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                          backdropFilter: darkMode ? 'blur(10px)' : 'none'
                        }}>
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.label}
                              to={subItem.path}
                              style={{
                                display: 'block',
                                padding: '8px 12px',
                                fontSize: '13px',
                                color: isActive(subItem) 
                                  ? 'var(--primary)' 
                                  : (darkMode ? 'rgba(255, 255, 255, 0.8)' : 'var(--text-secondary)'),
                                textDecoration: 'none',
                                fontWeight: 500,
                                borderRadius: 'var(--radius)',
                                background: isActive(subItem) 
                                  ? (darkMode ? 'rgba(37, 99, 235, 0.2)' : 'var(--primary-bg)') 
                                  : 'transparent',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                if (!isActive(subItem)) {
                                  e.target.style.background = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'var(--gray-100)'
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive(subItem)) {
                                  e.target.style.background = 'transparent'
                                }
                              }}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }
              
              // Regular nav item
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  style={{
                    padding: '6px 10px',
                    fontSize: '13px',
                    color: active 
                      ? 'white' 
                      : (darkMode ? 'rgba(255, 255, 255, 0.8)' : 'var(--text-secondary)'),
                    textDecoration: 'none',
                    fontWeight: 500,
                    borderRadius: 'var(--radius-full)',
                    background: active ? 'var(--primary)' : 'transparent',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.target.style.background = darkMode ? 'rgba(255, 255, 255, 0.15)' : 'var(--gray-100)'
                      e.target.style.color = darkMode ? '#ffffff' : 'var(--text)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.target.style.background = 'transparent'
                      e.target.style.color = darkMode ? 'rgba(255, 255, 255, 0.8)' : 'var(--text-secondary)'
                    }
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}

        {/* CTA */}
        {!isMobile && (
          <Link 
            to="/rfq"
            style={{
              background: darkMode ? 'rgba(255, 255, 255, 0.15)' : 'var(--primary)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 'var(--radius)',
              fontSize: '13px',
              fontWeight: 500,
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
              borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '3px solid var(--primary-dark)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              textDecoration: 'none',
              flexShrink: 0,
              backdropFilter: darkMode ? 'blur(10px)' : 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)'
              if (darkMode) {
                e.target.style.background = 'rgba(255, 255, 255, 0.25)'
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              if (darkMode) {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)'
              }
            }}
          >
            Get Started
          </Link>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                width: '22px',
                height: '2px',
                background: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'var(--gray-700)',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                transform: menuOpen 
                  ? i === 0 ? 'rotate(45deg) translateY(7px)' 
                  : i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'scaleX(0)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1
              }} />
            ))}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'absolute',
          top: '64px',
          left: 0,
          right: 0,
          background: darkMode ? 'rgba(15, 23, 42, 0.95)' : '#ffffff',
          borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid var(--border)',
          padding: '12px 16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          maxHeight: 'calc(100vh - 64px)',
          overflowY: 'auto',
          backdropFilter: 'blur(10px)'
        }}>
          {mobileNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '12px 16px',
                fontSize: '15px',
                color: isActive(item) 
                  ? 'var(--primary)' 
                  : (darkMode ? 'rgba(255, 255, 255, 0.8)' : 'var(--text-secondary)'),
                textDecoration: 'none',
                fontWeight: 500,
                borderRadius: 'var(--radius)',
                background: isActive(item) 
                  ? (darkMode ? 'rgba(37, 99, 235, 0.2)' : 'var(--primary-bg)') 
                  : 'transparent'
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link 
            to="/rfq"
            onClick={() => setMenuOpen(false)}
            style={{
              background: darkMode ? 'rgba(255, 255, 255, 0.15)' : 'var(--primary)',
              color: 'white',
              padding: '12px 16px',
              borderRadius: 'var(--radius)',
              fontSize: '14px',
              fontWeight: 500,
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
              marginTop: '12px',
              textAlign: 'center',
              textDecoration: 'none'
            }}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
