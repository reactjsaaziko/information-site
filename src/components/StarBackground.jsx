import { useEffect, useRef, useMemo } from 'react';

export default function StarBackground({ scrollProgress = 0, earthX = 40, fullProgress = 0 }) {
  const canvasRef = useRef(null);
  const hasInitRef = useRef(false);
  const scrollRef = useRef(0);
  const earthXRef = useRef(40);
  const fullProgressRef = useRef(0);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    earthXRef.current = earthX;
  }, [earthX]);

  useEffect(() => {
    fullProgressRef.current = fullProgress;
  }, [fullProgress]);

  // Generate stars once and memoize them - MORE stars for full sky effect
  const stars = useMemo(() => {
    const starCount = 600; // Increased star count
    const generatedStars = [];
    
    for (let i = 0; i < starCount; i++) {
      generatedStars.push({
        x: Math.random(), // 0-1 ratio of width
        y: Math.random(), // Full screen coverage
        size: Math.random() * 2.5 + 0.5,
        brightness: Math.random() * 0.6 + 0.4,
        twinkleSpeed: Math.random() * 2 + 1,
        twinkleOffset: Math.random() * Math.PI * 2,
        parallaxFactor: Math.random() * 1.2 + 0.6,
      });
    }
    return generatedStars;
  }, []);

  useEffect(() => {
    if (hasInitRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    hasInitRef.current = true;

    let width, height, dpr;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    window.addEventListener('resize', resize);

    let rafId;
    let time = 0;

    const render = () => {
      rafId = requestAnimationFrame(render);
      time += 0.016; // ~60fps

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Calculate how much Earth has moved (earthX goes from 40 to 15)
      const earthMovement = 40 - earthXRef.current;
      const isEarthMoving = earthMovement > 0.5; // Earth has started moving
      
      // Transition to black background when Earth moves
      const blackTransition = Math.min(earthMovement / 10, 1); // Full black after earthX reaches ~30
      
      // Phase 3: Transition to light blue background (progress > 2)
      const currentFullProgress = fullProgressRef.current;
      const phase3Progress = currentFullProgress > 2 ? Math.min((currentFullProgress - 2), 1) : 0;

      if (phase3Progress > 0) {
        // === TRANSITION TO LIGHT BLUE-GRAY BACKGROUND for people section ===
        // Target color from image: soft muted blue-gray #9fb8c8
        // Interpolate from black (0,0,0) to light blue-gray (159, 184, 200)
        const r = Math.round(phase3Progress * 159);
        const g = Math.round(phase3Progress * 184);
        const b = Math.round(phase3Progress * 200);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(0, 0, width, height);
        
        // NO stars in phase 3 - completely clean background
        // Stars fade out completely as phase3Progress increases
        
      } else if (blackTransition > 0) {
        // === FULL BLACK STARRY BACKGROUND when Earth is moving ===
        // Interpolate from gradient to pure black
        if (blackTransition < 1) {
          // Transitioning - show gradient fading to black
          const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
          const alpha = 1 - blackTransition;
          bgGradient.addColorStop(0, '#000000');
          bgGradient.addColorStop(0.15, `rgba(0, 2, 4, ${alpha})`);
          bgGradient.addColorStop(0.3, `rgba(1, 8, 16, ${alpha})`);
          bgGradient.addColorStop(0.45, `rgba(5, 21, 37, ${alpha})`);
          bgGradient.addColorStop(0.6, `rgba(12, 42, 69, ${alpha})`);
          bgGradient.addColorStop(0.75, `rgba(26, 69, 104, ${alpha})`);
          bgGradient.addColorStop(0.85, `rgba(58, 106, 138, ${alpha})`);
          bgGradient.addColorStop(0.92, `rgba(106, 149, 181, ${alpha})`);
          bgGradient.addColorStop(1, `rgba(168, 200, 224, ${alpha})`);
          ctx.fillStyle = bgGradient;
          ctx.fillRect(0, 0, width, height);
          
          // Overlay black for smooth transition
          ctx.fillStyle = `rgba(0, 0, 0, ${blackTransition})`;
          ctx.fillRect(0, 0, width, height);
        } else {
          // Full black background
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, width, height);
        }
      } else {
        // === ORIGINAL GRADIENT BACKGROUND - Before Earth moves ===
        const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
        bgGradient.addColorStop(0, '#000000');
        bgGradient.addColorStop(0.15, '#000204');
        bgGradient.addColorStop(0.3, '#010810');
        bgGradient.addColorStop(0.45, '#051525');
        bgGradient.addColorStop(0.6, '#0c2a45');
        bgGradient.addColorStop(0.75, '#1a4568');
        bgGradient.addColorStop(0.85, '#3a6a8a');
        bgGradient.addColorStop(0.92, '#6a95b5');
        bgGradient.addColorStop(1, '#a8c8e0');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, width, height);
      }

      // === STARS - Show when Earth is moving, fade out before phase 3 ===
      // Stars should fade out as we approach phase 3
      const phase3Approach = currentFullProgress > 1.5 ? Math.min((currentFullProgress - 1.5) / 0.5, 1) : 0;
      const starOpacity = isEarthMoving && phase3Progress === 0 ? Math.min(blackTransition * 1.5, 1) * (1 - phase3Approach) : 0;
      
      // Calculate star offset - opposite to Earth movement
      const MAX_STAR_OFFSET = 800;
      const starBaseOffset = Math.min(earthMovement * 35, MAX_STAR_OFFSET);
      
      if (starOpacity > 0) {
        stars.forEach((star) => {
          // Twinkle effect
          const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
          const finalOpacity = star.brightness * twinkle * starOpacity;
          
          // Apply parallax - stars move opposite to Earth
          const parallaxOffset = starBaseOffset * star.parallaxFactor;
          let x = (star.x * width) + parallaxOffset;
          
          // Wrap stars around screen for seamless effect
          if (x > width + 50) x = x - width - 100;
          if (x < -50) x = x + width + 100;
          
          const y = star.y * height;
          
          // Draw star with glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 3);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${finalOpacity})`);
          gradient.addColorStop(0.3, `rgba(200, 220, 255, ${finalOpacity * 0.6})`);
          gradient.addColorStop(1, 'rgba(200, 220, 255, 0)');
          
          ctx.beginPath();
          ctx.arc(x, y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Core of star
          ctx.beginPath();
          ctx.arc(x, y, star.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
          ctx.fill();
        });
      }

      // === SUBTLE VIGNETTE - only when not in phase 3 ===
      if (phase3Progress < 1) {
        const vignetteOpacity = 1 - phase3Progress;
        const vignette = ctx.createRadialGradient(
          width / 2,
          height / 2,
          height * 0.3,
          width / 2,
          height / 2,
          height
        );
        vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
        vignette.addColorStop(0.7, `rgba(0, 5, 15, ${0.1 * vignetteOpacity})`);
        vignette.addColorStop(1, `rgba(0, 5, 15, ${0.3 * vignetteOpacity})`);
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);
      }
    };

    render();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      hasInitRef.current = false;
    };
  }, [stars]);

  return <canvas ref={canvasRef} className="star-background" />;
}
