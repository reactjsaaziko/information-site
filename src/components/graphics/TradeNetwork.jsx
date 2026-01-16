import { useEffect, useRef, useMemo } from 'react';

/**
 * TradeNetwork - Animated trade route visualization
 * Creates flowing lines representing global trade connections
 */
export default function TradeNetwork({
  primaryColor = '#2563EB',
  secondaryColor = '#22D3EE',
  routeCount = 8,
  nodeCount = 12,
  speed = 1,
  opacity = 0.4,
  className = ''
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const routesRef = useRef([]);
  const nodesRef = useRef([]);

  const colors = useMemo(() => {
    const parseHex = (hex) => {
      const h = hex.replace('#', '');
      return {
        r: parseInt(h.substring(0, 2), 16),
        g: parseInt(h.substring(2, 4), 16),
        b: parseInt(h.substring(4, 6), 16)
      };
    };
    return {
      primary: parseHex(primaryColor),
      secondary: parseHex(secondaryColor)
    };
  }, [primaryColor, secondaryColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, dpr;

    const initNetwork = () => {
      // Ensure width and height are valid
      if (!width || !height || width <= 0 || height <= 0) return;

      // Create nodes (trade hubs)
      nodesRef.current = [];
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * width * 0.8 + width * 0.1,
          y: Math.random() * height * 0.8 + height * 0.1,
          size: Math.random() * 4 + 3,
          pulseOffset: Math.random() * Math.PI * 2,
          isHub: Math.random() > 0.7
        });
      }

      // Create routes between nodes
      routesRef.current = [];
      for (let i = 0; i < routeCount; i++) {
        const startNode = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
        const endNode = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
        
        if (startNode === endNode) continue;

        // Create curved path
        const midX = (startNode.x + endNode.x) / 2;
        const midY = (startNode.y + endNode.y) / 2;
        const dist = Math.sqrt(
          Math.pow(endNode.x - startNode.x, 2) + 
          Math.pow(endNode.y - startNode.y, 2)
        );
        
        // Skip if distance is too small or invalid
        if (!isFinite(dist) || dist < 1) continue;
        
        // Curve control point
        const perpX = -(endNode.y - startNode.y) / dist;
        const perpY = (endNode.x - startNode.x) / dist;
        const curveAmount = (Math.random() - 0.5) * dist * 0.5;

        routesRef.current.push({
          start: startNode,
          end: endNode,
          controlX: midX + perpX * curveAmount,
          controlY: midY + perpY * curveAmount,
          particles: [],
          particleCount: Math.floor(Math.random() * 3) + 2,
          color: Math.random() > 0.5 ? colors.primary : colors.secondary,
          speed: (Math.random() * 0.5 + 0.5) * speed
        });

        // Initialize particles for this route
        const route = routesRef.current[routesRef.current.length - 1];
        for (let p = 0; p < route.particleCount; p++) {
          route.particles.push({
            t: Math.random(),
            speed: route.speed * (Math.random() * 0.3 + 0.85)
          });
        }
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initNetwork();
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    // Quadratic bezier point calculation
    const getQuadraticPoint = (t, p0x, p0y, p1x, p1y, p2x, p2y) => {
      const mt = 1 - t;
      return {
        x: mt * mt * p0x + 2 * mt * t * p1x + t * t * p2x,
        y: mt * mt * p0y + 2 * mt * t * p1y + t * t * p2y
      };
    };

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      // Draw routes
      routesRef.current.forEach((route) => {
        const { start, end, controlX, controlY, color } = route;

        // Draw route line
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.quadraticCurveTo(controlX, controlY, end.x, end.y);
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Animate particles along route
        route.particles.forEach((particle) => {
          particle.t += particle.speed * 0.005;
          if (particle.t > 1) particle.t = 0;

          const pos = getQuadraticPoint(
            particle.t,
            start.x, start.y,
            controlX, controlY,
            end.x, end.y
          );

          // Skip if position is invalid
          if (!isFinite(pos.x) || !isFinite(pos.y)) return;

          // Particle glow
          const gradient = ctx.createRadialGradient(
            pos.x, pos.y, 0,
            pos.x, pos.y, 8
          );
          gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.8})`);
          gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Particle core
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
          ctx.fill();
        });
      });

      // Draw nodes
      nodesRef.current.forEach((node) => {
        // Skip if node position is invalid
        if (!isFinite(node.x) || !isFinite(node.y)) return;

        const pulse = Math.sin(time * 2 + node.pulseOffset) * 0.3 + 0.7;
        const size = node.size * pulse;
        const nodeOpacity = opacity * (node.isHub ? 1 : 0.6);

        // Skip if size is invalid
        if (!isFinite(size) || size <= 0) return;

        // Node glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, size * 4
        );
        gradient.addColorStop(0, `rgba(${colors.primary.r}, ${colors.primary.g}, ${colors.primary.b}, ${nodeOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${colors.primary.r}, ${colors.primary.g}, ${colors.primary.b}, 0)`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.primary.r}, ${colors.primary.g}, ${colors.primary.b}, ${nodeOpacity})`;
        ctx.fill();

        // Hub ring
        if (node.isHub) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, size * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colors.secondary.r}, ${colors.secondary.g}, ${colors.secondary.b}, ${nodeOpacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [routeCount, nodeCount, speed, opacity, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`trade-network ${className}`}
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
