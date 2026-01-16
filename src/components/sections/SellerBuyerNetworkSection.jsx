import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useWebGL2 } from './sellerBuyer/useWebGL2';
import WebGLScene from './sellerBuyer/WebGLScene';
import FallbackScene from './sellerBuyer/FallbackScene';
import ProblemCard from './sellerBuyer/ProblemCard';
import AazikoHub from './sellerBuyer/AazikoHub';

gsap.registerPlugin(ScrollTrigger);

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

export default function SellerBuyerNetworkSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const sellerCardRef = useRef(null);
  const buyerCardRef = useRef(null);
  const hubRef = useRef(null);

  const hasWebGL2 = useWebGL2();
  
  const [directLineProgress, setDirectLineProgress] = useState(0);
  const [routedLineProgress, setRoutedLineProgress] = useState(0);
  const [showPackets, setShowPackets] = useState(false);
  const [showChips, setShowChips] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([titleRef.current, sellerCardRef.current, buyerCardRef.current, hubRef.current], {
        opacity: 0,
        y: 30,
      });

      // Main timeline triggered on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'center center',
          toggleActions: 'play none none reverse',
        },
      });

      if (prefersReducedMotion) {
        // Simple fade for reduced motion
        tl.to([titleRef.current, sellerCardRef.current, buyerCardRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
        })
        .to(hubRef.current, { opacity: 1, y: 0, duration: 0.3 })
        .add(() => {
          setDirectLineProgress(1);
          setRoutedLineProgress(1);
          setShowPackets(true);
          setShowChips(true);
        });
      } else {
        // Full animation sequence
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        })
        .to([sellerCardRef.current, buyerCardRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
        }, '-=0.4')
        // Draw direct line
        .to({}, {
          duration: 1,
          onUpdate: function() {
            setDirectLineProgress(this.progress());
          },
        }, '-=0.2')
        // Show packets on direct line
        .add(() => setShowPackets(true))
        // Reveal Aaziko hub
        .to(hubRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.5)',
        }, '+=0.3')
        // Draw routed line
        .to({}, {
          duration: 1.2,
          onUpdate: function() {
            setRoutedLineProgress(this.progress());
          },
        }, '-=0.3')
        // Show chips
        .add(() => setShowChips(true), '-=0.5');
      }
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Loading state while detecting WebGL2
  if (hasWebGL2 === null) {
    return (
      <section className="seller-buyer-section seller-buyer-section--loading">
        <div className="seller-buyer-section__loader" />
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="seller-buyer-section">
      {/* Background */}
      <div className="seller-buyer-section__bg" />
      
      {/* Title */}
      <div ref={titleRef} className="seller-buyer-section__header">
        <h2 className="seller-buyer-section__title">Trade, made trusted.</h2>
        <p className="seller-buyer-section__subtitle">
          Aaziko connects sellers and buyers with transparency, protection, and speed.
        </p>
      </div>

      {/* Scene container */}
      <div className="seller-buyer-section__scene">
        {hasWebGL2 ? (
          <WebGLScene 
            directLineProgress={directLineProgress}
            routedLineProgress={routedLineProgress}
            showPackets={showPackets}
          />
        ) : (
          <FallbackScene 
            directLineProgress={directLineProgress}
            routedLineProgress={routedLineProgress}
            showPackets={showPackets}
          />
        )}
      </div>

      {/* Problem cards */}
      <ProblemCard 
        ref={sellerCardRef}
        title="Seller Challenges"
        problems={SELLER_PROBLEMS}
        side="left"
      />
      
      <ProblemCard 
        ref={buyerCardRef}
        title="Buyer Challenges"
        problems={BUYER_PROBLEMS}
        side="right"
      />

      {/* Aaziko Hub */}
      <AazikoHub ref={hubRef} showChips={showChips} />
    </section>
  );
}
