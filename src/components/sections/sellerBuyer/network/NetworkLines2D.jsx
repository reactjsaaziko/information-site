import { useEffect, useRef } from 'react';

export default function NetworkLines2D({ 
  directLineProgress = 0, 
  routedLineProgress = 0,
  showPackets = false 
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Animation
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      timeRef.current += 0.016;

      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      // Anchor points
      const sellerX = width * 0.22;
      const sellerY = height * 0.38;
      const buyerX = width * 0.78;
      const buyerY = height * 0.38;
      const hubX = width * 0.5;
      const hubY = height * 0.78;

      // Direct line (Seller → Buyer)
      if (directLineProgress > 0) {
        drawCurvedLine(ctx, sellerX, sellerY, buyerX, buyerY, directLineProgress, {
          color: 'rgba(96, 165, 250, 0.6)',
          glowColor: 'rgba(96, 165, 250, 0.3)',
          width: 2,
        });

        // Packets on direct line
        if (showPackets && directLineProgress >= 1) {
          drawPacket(ctx, sellerX, sellerY, buyerX, buyerY, timeRef.current * 0.3, {
            color: 'rgba(147, 197, 253, 0.8)',
            size: 4,
          });
        }
      }

      // Routed line (Seller → Aaziko → Buyer)
      if (routedLineProgress > 0) {
        // Seller → Aaziko
        const firstHalf = Math.min(routedLineProgress * 2, 1);
        drawCurvedLine(ctx, sellerX, sellerY, hubX, hubY, firstHalf, {
          color: 'rgba(34, 211, 238, 0.8)',
          glowColor: 'rgba(34, 211, 238, 0.4)',
          width: 3,
        });

        // Aaziko → Buyer
        if (routedLineProgress > 0.5) {
          const secondHalf = (routedLineProgress - 0.5) * 2;
          drawCurvedLine(ctx, hubX, hubY, buyerX, buyerY, secondHalf, {
            color: 'rgba(34, 211, 238, 0.8)',
            glowColor: 'rgba(34, 211, 238, 0.4)',
            width: 3,
          });
        }

        // Packets on routed line
        if (showPackets && routedLineProgress >= 1) {
          const t = (timeRef.current * 0.25) % 1;
          if (t < 0.5) {
            drawPacketOnRoute(ctx, sellerX, sellerY, hubX, hubY, t * 2, {
              color: 'rgba(34, 211, 238, 1)',
              size: 6,
            });
          } else {
            drawPacketOnRoute(ctx, hubX, hubY, buyerX, buyerY, (t - 0.5) * 2, {
              color: 'rgba(34, 211, 238, 1)',
              size: 6,
            });
          }
        }
      }

      // Draw nodes
      drawNode(ctx, sellerX, sellerY, 8, 'rgba(96, 165, 250, 0.9)');
      drawNode(ctx, buyerX, buyerY, 8, 'rgba(96, 165, 250, 0.9)');
      if (routedLineProgress > 0) {
        drawNode(ctx, hubX, hubY, 12, 'rgba(34, 211, 238, 1)', true);
      }
    };

    animate();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [directLineProgress, routedLineProgress, showPackets]);

  return <canvas ref={canvasRef} className="network-lines-2d" />;
}

function drawCurvedLine(ctx, x1, y1, x2, y2, progress, options) {
  const { color, glowColor, width } = options;
  
  const midX = (x1 + x2) / 2;
  const midY = Math.min(y1, y2) - 50;

  ctx.save();
  
  // Glow
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 15;
  
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  
  // Draw partial curve based on progress
  const steps = Math.floor(50 * progress);
  for (let i = 1; i <= steps; i++) {
    const t = i / 50;
    const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * midX + t * t * x2;
    const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * midY + t * t * y2;
    ctx.lineTo(px, py);
  }
  
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.stroke();
  
  ctx.restore();
}

function drawPacket(ctx, x1, y1, x2, y2, time, options) {
  const { color, size } = options;
  const t = time % 1;
  
  const midX = (x1 + x2) / 2;
  const midY = Math.min(y1, y2) - 50;
  
  const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * midX + t * t * x2;
  const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * midY + t * t * y2;
  
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(px, py, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawPacketOnRoute(ctx, x1, y1, x2, y2, t, options) {
  const { color, size } = options;
  
  const midX = (x1 + x2) / 2;
  const midY = y1 < y2 ? y1 + (y2 - y1) * 0.3 : y2 + (y1 - y2) * 0.3;
  
  const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * midX + t * t * x2;
  const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * midY + t * t * y2;
  
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 15;
  ctx.beginPath();
  ctx.arc(px, py, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawNode(ctx, x, y, size, color, pulse = false) {
  ctx.save();
  
  if (pulse) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
  }
  
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  
  // Inner highlight
  ctx.beginPath();
  ctx.arc(x - size * 0.2, y - size * 0.2, size * 0.3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fill();
  
  ctx.restore();
}
