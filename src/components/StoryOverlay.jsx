import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// ============================================
// EDIT ALL COPY HERE
// ============================================
const SCENES = {
  1: {
    type: 'hero-center',
    headline: 'Global Trade Made Simple',
    subtext: 'Aaziko connects buyers and sellers worldwide—with trust, transparency, and zero confusion.',
    ctas: [
      { label: 'Start Selling', primary: true },
      { label: 'Start Buying', primary: false },
    ],
  },
  2: { type: 'transition' },
  3: {
    type: 'content-right',
    label: 'WHY AAZIKO',
    headline: 'Trade Without Borders or Barriers',
    subtext: "Whether you're a small manufacturer or a growing business, Aaziko removes the complexity from international trade.",
    features: [
      { icon: '🔍', title: 'Find Partners Fast', desc: 'Discover verified buyers and suppliers in minutes, not months.' },
      { icon: '📋', title: 'Simple Workflows', desc: 'From inquiry to delivery—guided steps at every stage.' },
      { icon: '💬', title: 'Easy Communication', desc: 'Send offers, catalogs, and negotiate directly on platform.' },
    ],
  },
  4: {
    type: 'content-right',
    label: 'HOW IT WORKS',
    headline: 'From Product to Payment in 4 Steps',
    steps: [
      { num: '01', title: 'List Your Product', desc: 'Create your catalog with photos, specs, and pricing.' },
      { num: '02', title: 'Get Matched', desc: 'Our system connects you with relevant buyers globally.' },
      { num: '03', title: 'Negotiate & Confirm', desc: 'Chat, negotiate terms, and confirm orders securely.' },
      { num: '04', title: 'Ship & Get Paid', desc: 'Protected payments released when delivery is confirmed.' },
    ],
  },
  5: {
    type: 'story-right',
    label: 'REAL STORIES',
    title: 'Meet Meera',
    location: 'Jaipur, India',
    quote: '"I make beautiful handcrafted products, but I never knew how to find buyers abroad. I was afraid of not getting paid. Aaziko changed everything."',
    stats: [
      { value: '12', label: 'Countries reached' },
      { value: '340%', label: 'Revenue growth' },
      { value: '0', label: 'Payment issues' },
    ],
  },
  6: {
    type: 'content-right',
    label: 'TRUST & SECURITY',
    headline: "You Don't Ship Blindly",
    subtext: 'Every transaction on Aaziko is protected. We verify parties, secure payments, and provide clarity at every step.',
    trust: [
      { icon: '✓', title: 'Verified Parties', desc: 'All buyers and sellers go through verification.' },
      { icon: '🛡️', title: 'Payment Protection', desc: 'Funds held securely until delivery confirmed.' },
      { icon: '📊', title: 'Full Transparency', desc: 'Track every step of your order journey.' },
    ],
  },
  7: {
    type: 'cta-right',
    headline: 'Make the Planet Your Market',
    subtext: 'Join thousands of businesses trading globally with confidence.',
    cta: 'Get Started Free',
    secondaryCta: 'Watch Demo',
  },
};

export default function StoryOverlay({ scene, sceneProgress }) {
  const containerRef = useRef(null);
  const prevSceneRef = useRef(scene);

  useEffect(() => {
    if (prevSceneRef.current !== scene && containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, x: 30 }, 
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
      prevSceneRef.current = scene;
    }
  }, [scene]);

  const data = SCENES[scene];
  if (!data || data.type === 'transition') return null;

  const isRightAligned = data.type.includes('right');

  return (
    <div className={`story-overlay ${isRightAligned ? 'story-overlay--right' : ''}`} ref={containerRef}>
      
      {data.type === 'hero-center' && (
        <div className="story-hero-center">
          <h1 className="story-headline--hero">{data.headline}</h1>
          <p className="story-subtext--hero">{data.subtext}</p>
          <div className="story-ctas">
            {data.ctas.map((cta, i) => (
              <button key={i} className={`story-cta ${cta.primary ? 'story-cta--primary' : 'story-cta--secondary'}`}>
                {cta.label}
              </button>
            ))}
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><span className="hero-stat__value">50K+</span><span className="hero-stat__label">Active Users</span></div>
            <div className="hero-stat"><span className="hero-stat__value">120+</span><span className="hero-stat__label">Countries</span></div>
            <div className="hero-stat"><span className="hero-stat__value">$2B+</span><span className="hero-stat__label">Trade Volume</span></div>
          </div>
        </div>
      )}

      {data.type === 'content-right' && data.features && (
        <div className="content-panel">
          <span className="content-label">{data.label}</span>
          <h2 className="content-headline">{data.headline}</h2>
          <p className="content-subtext">{data.subtext}</p>
          <div className="feature-grid">
            {data.features.map((f, i) => (
              <div key={i} className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.type === 'content-right' && data.steps && (
        <div className="content-panel">
          <span className="content-label">{data.label}</span>
          <h2 className="content-headline">{data.headline}</h2>
          <div className="steps-list">
            {data.steps.map((s, i) => (
              <div key={i} className="step-item">
                <span className="step-num">{s.num}</span>
                <div className="step-content">
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.type === 'content-right' && data.trust && (
        <div className="content-panel">
          <span className="content-label">{data.label}</span>
          <h2 className="content-headline">{data.headline}</h2>
          <p className="content-subtext">{data.subtext}</p>
          <div className="trust-grid">
            {data.trust.map((t, i) => (
              <div key={i} className="trust-card">
                <span className="trust-icon">{t.icon}</span>
                <h3 className="trust-title">{t.title}</h3>
                <p className="trust-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.type === 'story-right' && (
        <div className="content-panel story-panel">
          <span className="content-label">{data.label}</span>
          <div className="story-header">
            <h2 className="story-name">{data.title}</h2>
            <span className="story-location">{data.location}</span>
          </div>
          <blockquote className="story-quote">{data.quote}</blockquote>
          <div className="story-stats">
            {data.stats.map((s, i) => (
              <div key={i} className="story-stat">
                <span className="story-stat__value">{s.value}</span>
                <span className="story-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.type === 'cta-right' && (
        <div className="content-panel cta-panel">
          <h2 className="cta-headline">{data.headline}</h2>
          <p className="cta-subtext">{data.subtext}</p>
          <div className="cta-buttons">
            <button className="story-cta story-cta--primary story-cta--large">{data.cta}</button>
            <button className="story-cta story-cta--secondary">{data.secondaryCta}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export { SCENES };
