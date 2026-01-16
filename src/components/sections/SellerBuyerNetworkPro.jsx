import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import IllustratedCharacter from './sellerBuyerPro/IllustratedCharacter';
import Platform from './sellerBuyerPro/Platform';
import ProblemCard from './sellerBuyerPro/ProblemCard';
import NetworkSVG from './sellerBuyerPro/NetworkSVG';
import AazikoBridge from './sellerBuyerPro/AazikoBridge';

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

export default function SellerBuyerNetworkPro() {
  const sectionRef = useRef(null);
  const sellerRef = useRef(null);
  const buyerRef = useRef(null);
  const sellerCardRef = useRef(null);
  const buyerCardRef = useRef(null);
  const networkRef = useRef(null);
  const bridgeRef = useRef(null);
  const timelineRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  
  // Problems visible count - same for both sides (simultaneous)
  const [problemsVisible, setProblemsVisible] = useState(0);
  const [directLineProgress, setDirectLineProgress] = useState(0);
  const [routedLineProgress, setRoutedLineProgress] = useState(0);
  const [bridgeVisible, setBridgeVisible] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Animation sequence - runs ONCE only
  const runAnimation = useCallback(() => {
    // Skip if already animated
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    if (prefersReducedMotion) {
      // Instant reveal for reduced motion
      setProblemsVisible(5);
      setDirectLineProgress(1);
      setRoutedLineProgress(1);
      setBridgeVisible(true);
      setChipsVisible(true);
      return;
    }

    // Reset state
    setProblemsVisible(0);
    setDirectLineProgress(0);
    setRoutedLineProgress(0);
    setBridgeVisible(false);
    setChipsVisible(false);

    const tl = gsap.timeline();

    // Phase 1: Short delay
    tl.to({}, { duration: 0.2 });

    // Phase 2: Draw direct trade line - smoother
    tl.to({}, {
      duration: 1.8,
      ease: "power2.out",
      onUpdate: function() {
        setDirectLineProgress(this.progress());
      }
    });

    // Phase 3: Reveal problems SIMULTANEOUSLY on both sides - smoother timing
    for (let i = 1; i <= 5; i++) {
      tl.to({}, {
        duration: 0.25,
        onComplete: () => setProblemsVisible(i)
      });
    }

    // Phase 4: Draw routed line through Aaziko - smoother
    tl.to({}, {
      duration: 2,
      ease: "power2.out",
      onUpdate: function() {
        setRoutedLineProgress(this.progress());
      }
    });

    // Phase 5: Reveal Aaziko Bridge
    tl.to({}, {
      duration: 0.15,
      onComplete: () => setBridgeVisible(true)
    });

    // Phase 6: Reveal chips
    tl.to({}, {
      duration: 0.15,
      onComplete: () => setChipsVisible(true)
    });

    timelineRef.current = tl;
  }, [prefersReducedMotion]);

  // Intersection observer to trigger animation when in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Start animation when in view (only once)
  useEffect(() => {
    if (isInView && !hasAnimatedRef.current) {
      runAnimation();
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isInView, runAnimation]);

  return (
    <section ref={sectionRef} className="seller-buyer-pro">
      {/* Background with subtle stars */}
      <div className="seller-buyer-pro__bg">
        <div className="seller-buyer-pro__stars" />
      </div>

      {/* Header */}
      <header className="seller-buyer-pro__header">
        <h2 className="seller-buyer-pro__title">Trade, made trusted.</h2>
        <p className="seller-buyer-pro__subtitle">
          Aaziko connects sellers and buyers with transparency, protection, and speed.
        </p>
      </header>

      {/* Main content area */}
      <div className="seller-buyer-pro__content">
        {/* Network SVG overlay */}
        <NetworkSVG
          ref={networkRef}
          directLineProgress={directLineProgress}
          routedLineProgress={routedLineProgress}
          showDots={directLineProgress >= 1 || routedLineProgress >= 1}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Seller side: Card on LEFT, Character on RIGHT */}
        <div className="seller-buyer-pro__side seller-buyer-pro__side--seller">
          <ProblemCard
            ref={sellerCardRef}
            title="Seller Challenges"
            subtitle="What sellers struggle with"
            problems={SELLER_PROBLEMS}
            type="seller"
            visibleCount={problemsVisible}
          />
          <div className="seller-buyer-pro__character-wrapper">
            <IllustratedCharacter ref={sellerRef} type="seller" />
            <Platform type="seller" />
          </div>
        </div>

        {/* Buyer side: Character on LEFT, Card on RIGHT */}
        <div className="seller-buyer-pro__side seller-buyer-pro__side--buyer">
          <div className="seller-buyer-pro__character-wrapper">
            <IllustratedCharacter ref={buyerRef} type="buyer" />
            <Platform type="buyer" />
          </div>
          <ProblemCard
            ref={buyerCardRef}
            title="Buyer Challenges"
            subtitle="What buyers struggle with"
            problems={BUYER_PROBLEMS}
            type="buyer"
            visibleCount={problemsVisible}
          />
        </div>

        {/* Aaziko Bridge */}
        <AazikoBridge
          ref={bridgeRef}
          visible={bridgeVisible}
          chipsVisible={chipsVisible}
        />
      </div>
    </section>
  );
}
