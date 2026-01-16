import { useEffect, useRef, useMemo } from 'react';

/**
 * WaveLines - Animated flowing wave lines
 * Creates elegant wave patterns for section backgrounds
 */
export default function WaveLines({
  color = '#2563EB',
  waveCount = 3,
  amplitude = 30,
  frequency = 0.02,
  speed = 0.5,
  opacity = 0.15,
  strokeWidth = 2,
  className = ''
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const rgbColor = useMemo(() => {
    const hex = color.replace('#', '');
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, dpr;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.016 * speed;

      ctx.clearRect(0, 0, width, height);

      for (let w = 0; w < waveCount; w++) {
        const waveOffset = (w / waveCount) * height * 0.6 + height * 0.2;
        const waveAmplitude = amplitude * (1 - w * 0.2);
        const waveOpacity = opacity * (1 - w * 0.25);
        const phaseOffset = w * Math.PI * 0.5;

        ctx.beginPath();
        ctx.moveTo(0, waveOffset);

        for (let x = 0; x <= width; x += 5) {
          const y = waveOffset + 
            Math.sin(x * frequency + time + phaseOffset) * waveAmplitude +
            Math.sin(x * frequency * 0.5 + time * 0.7 + phaseOffset) * waveAmplitude * 0.5;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${waveOpacity})`;
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [waveCount, amplitude, frequency, speed, opacity, strokeWidth, rgbColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`wave-lines ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
