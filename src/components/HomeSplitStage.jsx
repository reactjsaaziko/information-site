import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlobeWrapper from './GlobeWrapper';
import StarBackground from './StarBackground';
import StoryPanel from './StoryPanel';

gsap.registerPlugin(ScrollTrigger);

export default function HomeSplitStage({ quality }) {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const hasInitRef = useRef(false);

  const [globeProgress, setGlobeProgress] = useState(0);
  const [globeScale, setGlobeScale] = useState(0.02);
  const [activeSection, setActiveSection] = useState(-1);
  const [showConnections, setShowConnections] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(0);

  useEffect(() => {
    if (hasInitRef.current) return;
    hasInitRef.current = true;

    const ctx = gsap.context(() => {
      // Continuous rotation on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          setScrollRotation(self.progress * Math.PI * 6);
        },
      });

      // Hero section: Globe zooms from dot to full size
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=2000',
        scrub: 2,
        pin: true,
        onUpdate: (self) => {
          // Smooth easing for zoom
          const eased = self.progress * self.progress * (3 - 2 * self.progress);
          
          // Scale from tiny dot (0.02) to full (1.0)
          const scale = 0.02 + eased * 0.98;
          setGlobeScale(scale);
          setGlobeProgress(eased);
          
          // Fade hero content as globe grows
          const contentOpacity = Math.max(0, 1 - eased * 2);
          gsap.set('.hero-content', { opacity: contentOpacity });
        },
      });

      // Section triggers
      const sections = gsap.utils.toArray('.panel-section');
      
      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            setActiveSection(i);
            setShowConnections(i >= 1);
          },
          onEnterBack: () => {
            setActiveSection(i);
            setShowConnections(i >= 1);
          },
        });
      });

    }, containerRef);

    return () => {
      ctx.revert();
      hasInitRef.current = false;
    };
  }, []);

  const getContentAlignment = (index) => {
    return index % 2 === 0 ? 'right' : 'left';
  };

  return (
    <div ref={containerRef} className="split-stage">
      {/* Star Background */}
      <StarBackground />

      {/* Fixed Globe Container - Centered */}
      <div className="globe-fixed-container">
        <div 
          className="globe-inner" 
          style={{ 
            transform: `scale(${globeScale})`,
            opacity: globeScale < 0.05 ? globeScale * 20 : 1,
          }}
        >
          <GlobeWrapper 
            progress={globeProgress} 
            showConnections={showConnections}
            quality={quality}
            scrollRotation={scrollRotation}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="hero-section">
        <div className="hero-content">
          <h1 className="hero-headline">Make Planet Your Market.</h1>
          <p className="hero-subtext">
            Buy and sell globally with ease, transparency, and trust.
          </p>
          <div className="hero-ctas">
            <button className="btn btn--primary">Start Selling</button>
            <button className="btn btn--secondary">Start Buying</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat__value">120+</span>
              <span className="hero-stat__label">Countries</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat__value">50K+</span>
              <span className="hero-stat__label">Users</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat__value">$2B+</span>
              <span className="hero-stat__label">Trade Volume</span>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Sections */}
      <div className="sections-container">
        <StoryPanel activeSection={activeSection} getContentAlignment={getContentAlignment} />
      </div>
    </div>
  );
}
