import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

// Scene boundaries
const SCENE_BOUNDARIES = [
  { id: 1, start: 0.00, end: 0.15 },  // Hero - globe centered
  { id: 2, start: 0.15, end: 0.30 },  // Transition - globe moves left
  { id: 3, start: 0.30, end: 0.45 },  // Features section
  { id: 4, start: 0.45, end: 0.58 },  // How it works
  { id: 5, start: 0.58, end: 0.72 },  // Meet Meera story
  { id: 6, start: 0.72, end: 0.85 },  // Trust & Protection
  { id: 7, start: 0.85, end: 1.00 },  // Final CTA
];

export function useScrollScenes() {
  const [sceneData, setSceneData] = useState({
    scene: 1,
    progress: 0,
    sceneProgress: 0,
  });
  
  const lenisRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const gsapTickerRef = useRef(null);
  const hasInitRef = useRef(false);

  const getSceneFromProgress = useCallback((progress) => {
    for (const boundary of SCENE_BOUNDARIES) {
      if (progress >= boundary.start && progress < boundary.end) {
        const sceneProgress = (progress - boundary.start) / (boundary.end - boundary.start);
        return { scene: boundary.id, sceneProgress: Math.min(sceneProgress, 1) };
      }
    }
    return { scene: 7, sceneProgress: 1 };
  }, []);

  useEffect(() => {
    if (hasInitRef.current) return;
    hasInitRef.current = true;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsapTickerRef.current = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(gsapTickerRef.current);
    gsap.ticker.lagSmoothing(0);

    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: scrollContainer,
        start: 'top top',
        end: '+=4000',
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = Math.min(self.progress, 1);
          const { scene, sceneProgress } = getSceneFromProgress(progress);
          setSceneData({ scene, progress, sceneProgress });
        },
      });
    }

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      if (gsapTickerRef.current) {
        gsap.ticker.remove(gsapTickerRef.current);
        gsapTickerRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      hasInitRef.current = false;
    };
  }, [getSceneFromProgress]);

  return sceneData;
}

export { SCENE_BOUNDARIES };
