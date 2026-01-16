import { forwardRef, useEffect, useRef } from 'react';

const NetworkSVG = forwardRef(({ 
  directLineProgress = 0,
  routedLineProgress = 0,
  showDots = true,
  prefersReducedMotion = false
}, ref) => {
  const directDotRef = useRef(null);
  const routedDotRef = useRef(null);
  const animationCompleteRef = useRef({ direct: false, routed: false });
  
  // Animate dots along paths - ONE TIME only
  useEffect(() => {
    if (prefersReducedMotion || !showDots) return;
    
    let animationId;
    let directT = 0;
    let routedT = 0;
    
    const animate = () => {
      let needsUpdate = false;
      
      // Direct line dot - animate once
      if (directDotRef.current && directLineProgress >= 1 && !animationCompleteRef.current.direct) {
        directT += 0.008;
        if (directT >= 1) {
          directT = 1;
          animationCompleteRef.current.direct = true;
        } else {
          needsUpdate = true;
        }
        
        const path = document.getElementById('direct-path');
        if (path) {
          const length = path.getTotalLength();
          const point = path.getPointAtLength(directT * length);
          directDotRef.current.setAttribute('cx', point.x);
          directDotRef.current.setAttribute('cy', point.y);
        }
      }
      
      // Routed line dot - animate once
      if (routedDotRef.current && routedLineProgress >= 1 && !animationCompleteRef.current.routed) {
        routedT += 0.006;
        if (routedT >= 1) {
          routedT = 1;
          animationCompleteRef.current.routed = true;
        } else {
          needsUpdate = true;
        }
        
        const path = document.getElementById('routed-path-full');
        if (path) {
          const length = path.getTotalLength();
          const point = path.getPointAtLength(routedT * length);
          routedDotRef.current.setAttribute('cx', point.x);
          routedDotRef.current.setAttribute('cy', point.y);
        }
      }
      
      if (needsUpdate) {
        animationId = requestAnimationFrame(animate);
      }
    };
    
    if (directLineProgress >= 1 || routedLineProgress >= 1) {
      animate();
    }
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [directLineProgress, routedLineProgress, showDots, prefersReducedMotion]);

  return (
    <svg 
      ref={ref}
      className="network-svg-pro" 
      viewBox="0 0 1000 500" 
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="line-gradient-direct" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        
        <linearGradient id="line-gradient-routed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        
        {/* Glow filter */}
        <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <filter id="dot-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Direct trade line - CIRCULAR ARC from seller head to buyer head */}
      {/* Using SVG arc: A rx ry x-axis-rotation large-arc-flag sweep-flag x y */}
      <path
        id="direct-path"
        className="network-line-pro"
        d="M150 100 A 350 200 0 0 1 850 100"
        fill="none"
        stroke="url(#line-gradient-direct)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#line-glow)"
        style={{
          strokeDasharray: 1100,
          strokeDashoffset: 1100 * (1 - directLineProgress),
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.1s linear'
        }}
      />
      
      {/* Direct trade label */}
      {directLineProgress > 0.5 && (
        <text 
          x="500" 
          y="15" 
          textAnchor="middle" 
          className="network-label-pro network-label-pro--direct"
          style={{ opacity: Math.min(1, (directLineProgress - 0.5) * 2) }}
        >
          DIRECT TRADE
        </text>
      )}
      
      {/* Routed line - CIRCULAR ARC: seller → hub → buyer (one smooth arc going down) */}
      <path
        id="routed-path-full"
        className="network-line-pro"
        d="M150 130 A 350 280 0 0 0 850 130"
        fill="none"
        stroke="url(#line-gradient-routed)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#line-glow)"
        style={{
          strokeDasharray: 1200,
          strokeDashoffset: 1200 * (1 - routedLineProgress),
          transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.1s linear'
        }}
      />
      
      {/* Trusted route label */}
      {routedLineProgress > 0.7 && (
        <text 
          x="500" 
          y="470" 
          textAnchor="middle" 
          className="network-label-pro network-label-pro--routed"
          style={{ opacity: Math.min(1, (routedLineProgress - 0.7) * 3) }}
        >
          TRUSTED ROUTE VIA AAZIKO
        </text>
      )}
      
      {/* Connection nodes at heads - seller side */}
      <circle cx="150" cy="100" r="6" fill="#60a5fa" filter="url(#dot-glow)" style={{ opacity: directLineProgress > 0 ? 1 : 0 }} />
      <circle cx="150" cy="130" r="6" fill="#60a5fa" filter="url(#dot-glow)" style={{ opacity: routedLineProgress > 0 ? 1 : 0 }} />
      
      {/* Connection nodes at heads - buyer side */}
      <circle cx="850" cy="100" r="6" fill="#22d3ee" filter="url(#dot-glow)" style={{ opacity: directLineProgress > 0.8 ? 1 : 0 }} />
      <circle cx="850" cy="130" r="6" fill="#22d3ee" filter="url(#dot-glow)" style={{ opacity: routedLineProgress > 0.8 ? 1 : 0 }} />
      
      {/* Hub node at bottom center of arc */}
      {routedLineProgress > 0.4 && (
        <g style={{ opacity: Math.min(1, (routedLineProgress - 0.4) * 2) }}>
          <circle cx="500" cy="410" r="14" fill="#22d3ee" filter="url(#dot-glow)" />
          <circle cx="500" cy="410" r="7" fill="#fff" />
        </g>
      )}
      
      {/* Moving dots */}
      {showDots && !prefersReducedMotion && (
        <>
          {directLineProgress >= 1 && (
            <circle 
              ref={directDotRef}
              r="5" 
              fill="#fff" 
              filter="url(#dot-glow)"
              cx="150"
              cy="100"
            />
          )}
          {routedLineProgress >= 1 && (
            <circle 
              ref={routedDotRef}
              r="6" 
              fill="#22d3ee" 
              filter="url(#dot-glow)"
              cx="150"
              cy="130"
            />
          )}
        </>
      )}
    </svg>
  );
});

NetworkSVG.displayName = 'NetworkSVG';

export default NetworkSVG;
