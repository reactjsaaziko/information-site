import { useEffect, useRef, useMemo } from 'react';

/**
 * GlowOrbs - Large animated glowing orbs
 * Creates ambient lighting effect for backgrounds
 */
export default function GlowOrbs({
  colors = ['#2563EB', '#7C3AED', '#0891B2'],
  orbCount = 3,
  minSize = 200,
  maxSize = 400,
  speed = 0.3,
  opacity = 0.15,
  blur = 80,
  className = ''
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const orbsRef = useRef([]);

  const rgbColors = useMemo(() => {
    return colors.map(color => {
      const hex = color.replace('#', '');
      return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
      };
    });
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, dpr;

    const initOrbs = () => {
      orbsRef.current = [];
      for (let i = 0; i < orbCount; i++) {
        const size = Math.random() * (maxSize - minSize) + minSize;
        orbsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          color: rgbColors[i % rgbColors.length],
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.5 + 0.5
        });
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initOrbs();
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      orbsRef.current.forEach((orb) => {
        // Update position with smooth movement
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Soft bounce
        if (orb.x < -orb.size / 2 || orb.x > width + orb.size / 2) orb.vx *= -1;
        if (orb.y < -orb.size / 2 || orb.y > height + orb.size / 2) orb.vy *= -1;

        // Pulse effect
        const pulse = Math.sin(time * orb.pulseSpeed + orb.pulseOffset) * 0.2 + 0.8;
        const currentSize = orb.size * pulse;
        const currentOpacity = opacity * pulse;

        // Draw orb with gradient
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, currentSize
        );
        gradient.addColorStop(0, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${currentOpacity})`);
        gradient.addColorStop(0.4, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0)`);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [orbCount, minSize, maxSize, speed, opacity, rgbColors]);

  return (
    <canvas
      ref={canvasRef}
      className={`glow-orbs ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        filter: `blur(${blur}px)`
      }}
    />
  );
}
