import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import IllustratedSeller from './sellerBuyerPro2D/IllustratedSeller';
import IllustratedBuyer from './sellerBuyerPro2D/IllustratedBuyer';
import Platform2D from './sellerBuyerPro2D/Platform2D';
import ProblemCard2D from './sellerBuyerPro2D/ProblemCard2D';
import NetworkLines2D from './sellerBuyerPro2D/NetworkLines2D';
import AazikoBridge2D from './sellerBuyerPro2D/AazikoBridge2D';

const SELLER_PROBLEMS = [
  'Reaching global buyers',
  'Managing multiple inquiries',
  'Payment collection risks',
  'Export compliance',
  'Logistics coordination',
];

const BUYER_PROBLEMS = [
  'Finding trusted suppliers',
  'Quality verification issues',
  'Complex documentation',
  'Payment security concerns',
  'Shipping delays & tracking',
];

export default function SellerBuyerNetworkPro2D() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  
  // Animation states
  const [headerVisible, setHeaderVisible] = useState(false);
  const [avatarsVisible, setAvatarsVisible] = useState(false);
  const [directLineProgress, setDirectLineProgress] = useState(0);
  const [routedLineProgress, setRoutedLineProgress] = useState(0);
  const [sellerProblemsVisible, setSellerProblemsVisible] = useState(0);
  const [buyerProblemsVisible, setBuyerProblemsVisible] = useState(0);
  const [bridgeVisible, setBridgeVisible] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [showRoutedPath, setShowRoutedPath] = useState(false);
  
  // Hero moment - dim direct, brighten routed
  const [isHeroMoment, setIsHeroMoment] = useState(false);
  
  // Story microtext states
  const [storyText, setStoryText] = useState('');
  const [showStoryText, setShowStoryText] = useState(false);
  
  // Hover states
  const [sellerHovered, setSellerHovered] = useState(false);
  const [buyerHovered, setBuyerHovered] = useState(false);
  
  // Pulse states
  const [sellerNodePulse, setSellerNodePulse] = useState(false);
  const [buyerNodePulse, setBuyerNodePulse] = useState(false);
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const runAnimation = useCallback(() => {
    // Prevent multiple animation starts
    if (hasAnimatedRef.current || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    hasAnimatedRef.current = true;

    if (prefersReducedMotion) {
      setHeaderVisible(true);
      setAvatarsVisible(true);
      setDirectLineProgress(1);
      setRoutedLineProgress(1);
      setSellerProblemsVisible(5);
      setBuyerProblemsVisible(5);
      setBridgeVisible(true);
      setChipsVisible(true);
      setShowRoutedPath(true);
      setIsHeroMoment(true);
      setStoryText('Aaziko removes the friction.');
      setShowStoryText(true);
      isAnimatingRef.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });

    // ========== STEP 1: Direct Trade ==========
    tl.addLabel('step1');
    
    // Fade in header
    tl.to({}, {
      duration: 0.5,
      onComplete: () => setHeaderVisible(true)
    });

    // Fade in avatars
    tl.to({}, {
      duration: 0.4,
      onComplete: () => setAvatarsVisible(true)
    });

    // Draw direct trade arc
    tl.to({}, {
      duration: 1.5,
      ease: "power2.out",
      onUpdate: function() {
        setDirectLineProgress(this.progress());
      }
    });

    tl.to({}, { duration: 0.3 });

    // ========== STEP 2: Pain appears ==========
    tl.addLabel('step2');
    
    // Show story microtext: "Trade friction builds here…"
    tl.to({}, {
      duration: 0.3,
      onComplete: () => {
        setStoryText('Trade friction builds here…');
        setShowStoryText(true);
      }
    });

    // Seller challenges one-by-one
    for (let i = 1; i <= 5; i++) {
      tl.to({}, {
        duration: 0.4,
        onStart: () => {
          setSellerNodePulse(true);
          setTimeout(() => setSellerNodePulse(false), 350);
        },
        onComplete: () => setSellerProblemsVisible(i)
      });
    }

    tl.to({}, { duration: 0.15 });

    // Buyer challenges one-by-one
    for (let i = 1; i <= 5; i++) {
      tl.to({}, {
        duration: 0.4,
        onStart: () => {
          setBuyerNodePulse(true);
          setTimeout(() => setBuyerNodePulse(false), 350);
        },
        onComplete: () => setBuyerProblemsVisible(i)
      });
    }

    tl.to({}, { duration: 0.4 });

    // ========== STEP 3: Aaziko solves it (HERO MOMENT) ==========
    tl.addLabel('step3');

    // Morph story text to solution
    tl.to({}, {
      duration: 0.4,
      onStart: () => setShowStoryText(false),
      onComplete: () => {
        setStoryText('Aaziko removes the friction.');
        setShowStoryText(true);
      }
    });

    // Reveal Aaziko Bridge + activate hero moment (dim direct, brighten routed)
    tl.to({}, {
      duration: 0.3,
      onComplete: () => {
        setBridgeVisible(true);
        setShowRoutedPath(true);
        setIsHeroMoment(true);
      }
    });

    // Draw routed path (now the hero line)
    tl.to({}, {
      duration: 2,
      ease: "power2.out",
      onUpdate: function() {
        setRoutedLineProgress(this.progress());
      }
    });

    // Stagger chips
    tl.to({}, {
      duration: 0.15,
      onComplete: () => setChipsVisible(true)
    });

    timelineRef.current = tl;
  }, [prefersReducedMotion]);

  // Intersection observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Start animation
  useEffect(() => {
    if (isInView && !hasAnimatedRef.current && !isAnimatingRef.current) {
      // Small delay to ensure component is stable before animating
      const timer = setTimeout(() => {
        runAnimation();
      }, 100);
      return () => clearTimeout(timer);
    }
    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, [isInView, runAnimation]);

  return (
    <section ref={sectionRef} className="network-2d">
      {/* Background */}
      <div className="network-2d__bg">
        <div className="network-2d__stars" />
        <div className="network-2d__vignette" />
        <div className="network-2d__grain" />
      </div>

      {/* Header */}
      <header className={`network-2d__header ${headerVisible ? 'network-2d__header--visible' : ''}`}>
        <h2 className="network-2d__title">Trade, made trusted.</h2>
        <p className="network-2d__subtitle">
          Aaziko connects sellers and buyers with transparency, protection, and speed.
        </p>
      </header>

      {/* Story microtext (center) */}
      <div className={`network-2d__story-text ${showStoryText ? 'network-2d__story-text--visible' : ''}`}>
        {storyText}
      </div>

      {/* Main content */}
      <div className="network-2d__content">
        {/* Network lines */}
        <NetworkLines2D
          directLineProgress={directLineProgress}
          routedLineProgress={routedLineProgress}
          showRoutedPath={showRoutedPath}
          isHeroMoment={isHeroMoment}
          sellerHovered={sellerHovered}
          buyerHovered={buyerHovered}
          sellerNodePulse={sellerNodePulse}
          buyerNodePulse={buyerNodePulse}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Seller side */}
        <div 
          className={`network-2d__side network-2d__side--seller ${avatarsVisible ? 'network-2d__side--visible' : ''}`}
          onMouseEnter={() => setSellerHovered(true)}
          onMouseLeave={() => setSellerHovered(false)}
        >
          <ProblemCard2D
            title="Seller Challenges"
            subtitle="What sellers struggle with"
            problems={SELLER_PROBLEMS}
            type="seller"
            visibleCount={sellerProblemsVisible}
            isHovered={sellerHovered}
          />
          <div className={`network-2d__avatar-wrapper ${sellerHovered ? 'network-2d__avatar-wrapper--glowing' : ''}`}>
            <IllustratedSeller />
            <Platform2D type="seller" isGlowing={sellerHovered} />
            <span className="network-2d__label">Seller</span>
          </div>
        </div>

        {/* Buyer side */}
        <div 
          className={`network-2d__side network-2d__side--buyer ${avatarsVisible ? 'network-2d__side--visible' : ''}`}
          onMouseEnter={() => setBuyerHovered(true)}
          onMouseLeave={() => setBuyerHovered(false)}
        >
          <div className={`network-2d__avatar-wrapper ${buyerHovered ? 'network-2d__avatar-wrapper--glowing' : ''}`}>
            <IllustratedBuyer />
            <Platform2D type="buyer" isGlowing={buyerHovered} />
            <span className="network-2d__label network-2d__label--cyan">Buyer</span>
          </div>
          <ProblemCard2D
            title="Buyer Challenges"
            subtitle="What buyers struggle with"
            problems={BUYER_PROBLEMS}
            type="buyer"
            visibleCount={buyerProblemsVisible}
            isHovered={buyerHovered}
          />
        </div>

        {/* Aaziko Bridge */}
        <AazikoBridge2D
          visible={bridgeVisible}
          chipsVisible={chipsVisible}
        />
      </div>
    </section>
  );
}
