import { useEffect, useRef, useMemo } from 'react';

/**
 * GeometricShapes - Floating geometric shapes (hexagons, circles, squares)
 * Creates a modern tech aesthetic
 */
export default function GeometricShapes({
  color = '#2563EB',
  shapeCount = 15,
  speed = 0.3,
  opacity = 0.2,
  minSize = 20,
  maxSize = 60,
  rotationSpeed = 0.5,
  className = ''
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const shapesRef = useRef([]);

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

    const shapeTypes = ['hexagon', 'circle', 'square', 'triangle', 'diamond'];

    const initShapes = () => {
      shapesRef.current = [];
      for (let i = 0; i < shapeCount; i++) {
        const size = Math.random() * (maxSize - minSize) + minSize;
        shapesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationDir: Math.random() > 0.5 ? 1 : -1,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          opacity: Math.random() * 0.5 + 0.3,
          pulseOffset: Math.random() * Math.PI * 2
        });
      }
    };

    const drawHexagon = (x, y, size, rotation) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + rotation;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const drawTriangle = (x, y, size, rotation) => {
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const angle = (Math.PI * 2 / 3) * i + rotation - Math.PI / 2;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const drawDiamond = (x, y, size, rotation) => {
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (Math.PI / 2) * i + rotation;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const drawSquare = (x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.rect(-size / 2, -size / 2, size, size);
      ctx.restore();
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initShapes();
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      shapesRef.current.forEach((shape) => {
        // Update position
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.rotation += rotationSpeed * 0.01 * shape.rotationDir;

        // Bounce
        if (shape.x < -shape.size || shape.x > width + shape.size) shape.vx *= -1;
        if (shape.y < -shape.size || shape.y > height + shape.size) shape.vy *= -1;

        // Pulse
        const pulse = Math.sin(time * 1.5 + shape.pulseOffset) * 0.2 + 0.8;
        const currentOpacity = shape.opacity * pulse * opacity;

        ctx.strokeStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${currentOpacity})`;
        ctx.lineWidth = 1.5;

        switch (shape.type) {
          case 'hexagon':
            drawHexagon(shape.x, shape.y, shape.size, shape.rotation);
            break;
          case 'circle':
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
            break;
          case 'square':
            drawSquare(shape.x, shape.y, shape.size, shape.rotation);
            break;
          case 'triangle':
            drawTriangle(shape.x, shape.y, shape.size, shape.rotation);
            break;
          case 'diamond':
            drawDiamond(shape.x, shape.y, shape.size, shape.rotation);
            break;
        }

        ctx.stroke();
      });
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [shapeCount, speed, opacity, minSize, maxSize, rotationSpeed, rgbColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`geometric-shapes ${className}`}
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
