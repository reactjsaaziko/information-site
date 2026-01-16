import { useState, useRef, useEffect } from 'react'
import AboutScrollZoomPager from '../components/AboutScrollZoomPager'
import AboutStage from '../components/about/AboutStage'
import CultureValuesScene from '../components/about/CultureValuesScene'
import MilestonesScene from '../components/about/MilestonesScene'
import AboutHero from '../components/AboutHero'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function AboutPage() {
  const [cultureSegment, setCultureSegment] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const pagerRef = useRef(null)

  const sectionModes = ['hero', 'culture', 'milestones', 'footer']

  // Handle boundary reached from child sections
  const handleBoundaryReached = (direction) => {
    if (pagerRef.current) {
      if (direction === 'next') {
        pagerRef.current.goNext()
      } else if (direction === 'prev') {
        pagerRef.current.goPrev()
      }
    }
  }

  const sections = [
    <HeroSection key="hero" />,
    <CultureSection 
      key="culture" 
      onSegmentChange={setCultureSegment}
      onBoundaryReached={handleBoundaryReached}
    />,
    <MilestonesSection 
      key="milestones" 
      onBoundaryReached={handleBoundaryReached}
    />,
    <FooterSection key="footer" />
  ]

  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <Navbar darkMode={false} />
      
      {/* Fixed background stage */}
      <AboutStage 
        mode={sectionModes[activeSection]} 
        cultureSegment={cultureSegment}
      />
      
      {/* Zoom scroll pager */}
      <AboutScrollZoomPager 
        ref={pagerRef}
        sections={sections}
        onSectionChange={setActiveSection}
      />
    </div>
  )
}

const HeroSection = () => (
  <div style={{ 
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <AboutHero />
  </div>
)

const CultureSection = ({ onSegmentChange, onBoundaryReached }) => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{ 
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'visible'
    }}>
      <CultureValuesScene 
        onSegmentChange={onSegmentChange}
        onBoundaryReached={onBoundaryReached}
        isMobile={isMobile}
      />
    </div>
  )
}

const MilestonesSection = ({ onBoundaryReached }) => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{ 
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <MilestonesScene 
        isMobile={isMobile}
        onBoundaryReached={onBoundaryReached}
      />
    </div>
  )
}

const FooterSection = () => (
  <div style={{ 
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
    background: 'var(--bg)'
  }}>
    <Footer />
  </div>
)

export default AboutPage
