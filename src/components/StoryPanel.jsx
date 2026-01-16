import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// ============================================
// EDIT ALL COPY HERE
// ============================================

const SECTIONS = [
  {
    id: 'pillars',
    label: 'WHY AAZIKO',
    title: 'Trade with Confidence',
    pillars: [
      { icon: '⚡', name: 'Easy', desc: 'Simple workflows from inquiry to delivery' },
      { icon: '👁️', name: 'Transparent', desc: 'Clear steps, clear status, clear terms' },
      { icon: '🛡️', name: 'Trust', desc: 'Verified parties and protected order journey' },
    ],
  },
  {
    id: 'steps',
    label: 'HOW IT WORKS',
    title: 'From Product to Payment',
    steps: [
      { num: '01', title: 'Create', desc: 'List your product or requirement' },
      { num: '02', title: 'Match', desc: 'Connect with the right parties globally' },
      { num: '03', title: 'Verify', desc: 'Confirm terms with verified partners' },
      { num: '04', title: 'Protect', desc: 'Secure order journey with payment protection' },
      { num: '05', title: 'Deliver', desc: 'Complete delivery with ongoing support' },
    ],
  },
  {
    id: 'proof',
    label: 'TRUST & PROOF',
    title: 'Built to Reduce Risk',
    stats: [
      { value: '120+', label: 'Countries Reached' },
      { value: '15K+', label: 'Verified Partners' },
      { value: '50K+', label: 'Orders Supported' },
    ],
    tagline: 'Built to reduce risk and remove friction from global trade.',
  },
  {
    id: 'cta',
    title: 'Buy with clarity. Sell with confidence.',
    subtitle: 'Join thousands of businesses trading globally with Aaziko.',
    cta: 'Explore How It Works',
    secondaryCta: 'Contact Sales',
  },
];

export default function StoryPanel({ activeSection, getContentAlignment }) {
  const sectionRefs = useRef([]);
  const prevActiveRef = useRef(-1);

  useEffect(() => {
    if (activeSection !== prevActiveRef.current && activeSection >= 0) {
      // Animate out previous section
      if (prevActiveRef.current >= 0 && sectionRefs.current[prevActiveRef.current]) {
        gsap.to(sectionRefs.current[prevActiveRef.current], {
          opacity: 0.2,
          y: -20,
          duration: 0.4,
          ease: 'power2.inOut',
        });
      }

      // Animate in current section
      if (sectionRefs.current[activeSection]) {
        gsap.fromTo(
          sectionRefs.current[activeSection],
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 }
        );

        // Stagger animate children
        const children = sectionRefs.current[activeSection].querySelectorAll('.animate-item');
        gsap.fromTo(
          children,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.2 }
        );
      }

      prevActiveRef.current = activeSection;
    }
  }, [activeSection]);

  return (
    <div className="story-panel">
      {SECTIONS.map((section, index) => {
        const alignment = getContentAlignment(index);
        const isActive = activeSection === index;
        
        return (
          <section
            key={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`panel-section panel-section--${alignment} ${isActive ? 'panel-section--active' : ''}`}
            data-section={section.id}
          >
            <div className="panel-content-wrapper">
              {section.label && <span className="panel-label animate-item">{section.label}</span>}

              {section.id === 'pillars' && (
                <>
                  <h2 className="panel-title animate-item">{section.title}</h2>
                  <div className="pillars-grid">
                    {section.pillars.map((p, i) => (
                      <div key={i} className="pillar-card animate-item">
                        <span className="pillar-icon">{p.icon}</span>
                        <div>
                          <h3 className="pillar-name">{p.name}</h3>
                          <p className="pillar-desc">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {section.id === 'steps' && (
                <>
                  <h2 className="panel-title animate-item">{section.title}</h2>
                  <div className="steps-list">
                    {section.steps.map((s, i) => (
                      <div key={i} className="step-row animate-item">
                        <span className="step-num">{s.num}</span>
                        <div className="step-info">
                          <h3 className="step-title">{s.title}</h3>
                          <p className="step-desc">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {section.id === 'proof' && (
                <>
                  <h2 className="panel-title animate-item">{section.title}</h2>
                  <div className="stats-row">
                    {section.stats.map((s, i) => (
                      <div key={i} className="stat-item animate-item">
                        <span className="stat-value">{s.value}</span>
                        <span className="stat-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="panel-tagline animate-item">{section.tagline}</p>
                </>
              )}

              {section.id === 'cta' && (
                <div className="cta-section">
                  <h2 className="cta-title animate-item">{section.title}</h2>
                  <p className="cta-subtitle animate-item">{section.subtitle}</p>
                  <div className="cta-buttons animate-item">
                    <button className="btn btn--primary btn--large">{section.cta}</button>
                    <button className="btn btn--ghost">{section.secondaryCta}</button>
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export { SECTIONS };
