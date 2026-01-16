import { forwardRef, useEffect, useRef } from 'react';

const NetworkLines2D = forwardRef(({ 
  directLineProgress = 0,
  routedLineProgress = 0,
  showRoutedPath = false,
  isHeroMoment = false,
  sellerHovered = false,
  buyerHovered = false,
  sellerNodePulse = false,
  buyerNodePulse = false,
  prefersReducedMotion = false
}, ref) => {
  const directDotRef = useRef(null);
  const routedDotRef = useRef(null);
  const animationRef = useRef(null);
  
  // Calm, continuous data packet animation
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    let directT = 0;
    let routedT = 0;
    
    const animate = () => {
      // Direct path packet - travels every ~3.5s
      if (directDotRef.current && directLineProgress >= 1) {
        directT += 0.0048;
        if (directT > 1) directT = 0;
        
        const path = document.getElementById('direct-line-path');
        if (path) {
          try {
            const length = path.getTotalLength();
            const point = path.getPointAtLength(directT * length);
            directDotRef.current.setAttribute('cx', point.x);
            directDotRef.current.setAttribute('cy', point.y);
            const edgeFade = Math.min(directT * 10, (1 - directT) * 10, 1);
            directDotRef.current.style.opacity = edgeFade * 0.7;
          } catch (e) {}
        }
      }
      
      // Routed path packet - travels every ~2.8s (only after Aaziko appears)
      if (routedDotRef.current && routedLineProgress >= 1 && showRoutedPath) {
        routedT += 0.006;
        if (routedT > 1) routedT = 0;
        
        const path = document.getElementById('routed-line-path');
        if (path) {
          try {
            const length = path.getTotalLength();
            const point = path.getPointAtLength(routedT * length);
            routedDotRef.current.setAttribute('cx', point.x);
            routedDotRef.current.setAttribute('cy', point.y);
            const edgeFade = Math.min(routedT * 10, (1 - routedT) * 10, 1);
            routedDotRef.current.style.opacity = edgeFade * 0.85;
          } catch (e) {}
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (directLineProgress >= 1 || routedLineProgress >= 1) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [directLineProgress, routedLineProgress, showRoutedPath, prefersReducedMotion]);

  // Calculate hover highlight opacities
  // When hero moment is active, dim direct line and brighten routed
  const sellerPathOpacity = sellerHovered ? 0.9 : 0.6;
  const buyerPathOpacity = buyerHovered ? 0.9 : 0.6;
  
  // Hero moment: dim direct trade line to 35-45% opacity
  const directLineOpacity = isHeroMoment ? 0.4 : 1;
  // Hero moment: brighten routed path
  const routedLineOpacity = isHeroMoment ? 1 : 0.7;

  return (
    <svg 
      ref={ref}
      className="network-lines-2d" 
      viewBox="0 0 1000 600" 
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Direct line gradient - single blue accent */}
        <linearGradient id="direct-gradient-left" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity={sellerPathOpacity} />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.45" />
        </linearGradient>
        
        {/* Direct line gradient - buyer half */}
        <linearGradient id="direct-gradient-right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity={buyerPathOpacity} />
        </linearGradient>
        
        {/* Full direct gradient - single blue */}
        <linearGradient id="direct-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity={sellerHovered ? 0.7 : 0.55} />
          <stop offset="50%" stopColor="#2563EB" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity={buyerHovered ? 0.7 : 0.55} />
        </linearGradient>
        
        {/* Routed line gradient - indigo for solution */}
        <linearGradient id="routed-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6D28D9" stopOpacity={sellerHovered ? 0.8 : 0.6} />
          <stop offset="50%" stopColor="#6D28D9" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#6D28D9" stopOpacity={buyerHovered ? 0.8 : 0.6} />
        </linearGradient>
        
        {/* Subtle glow filter - lighter for light mode */}
        <filter id="line-glow-subtle" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Dot glow */}
        <filter id="dot-glow-subtle" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Pulse glow for nodes */}
        <filter id="node-pulse-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Node gradient - blue */}
        <radialGradient id="node-gradient" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="1" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      
      {/* DIRECT TRADE LINE - Top arc */}
      <path
        id="direct-line-path"
        d="M140 145 A 360 140 0 0 1 860 145"
        fill="none"
        stroke="url(#direct-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#line-glow-subtle)"
        className={`network-path ${sellerHovered || buyerHovered ? 'network-path--highlighted' : ''} ${isHeroMoment ? 'network-path--dimmed' : ''}`}
        style={{
          strokeDasharray: 1150,
          strokeDashoffset: 1150 * (1 - directLineProgress),
          opacity: directLineOpacity,
          transition: 'stroke-opacity 0.3s ease, opacity 0.5s ease'
        }}
      />
      
      {/* Direct line label */}
      <text 
        x="500" 
        y="55" 
        textAnchor="middle" 
        className="network-label-2d"
        style={{ opacity: directLineProgress > 0.6 ? Math.min(1, (directLineProgress - 0.6) * 2.5) : 0 }}
      >
        DIRECT TRADE
      </text>
      
      {/* ROUTED LINE - Bottom arc (hidden until Step 3, becomes hero line) */}
      <path
        id="routed-line-path"
        d="M140 175 A 360 240 0 0 0 860 175"
        fill="none"
        stroke="url(#routed-gradient)"
        strokeWidth={isHeroMoment ? "2" : "1.75"}
        strokeLinecap="round"
        filter="url(#line-glow-subtle)"
        className={`network-path network-path--routed ${sellerHovered || buyerHovered ? 'network-path--highlighted' : ''} ${isHeroMoment ? 'network-path--hero' : ''}`}
        style={{
          strokeDasharray: 1300,
          strokeDashoffset: showRoutedPath ? 1300 * (1 - routedLineProgress) : 1300,
          opacity: showRoutedPath ? routedLineOpacity : 0.08,
          transition: 'opacity 0.5s ease, stroke-opacity 0.3s ease, stroke-width 0.4s ease'
        }}
      />
      
      {/* Seller node - with pulse animation */}
      <g className={`network-node ${sellerNodePulse ? 'network-node--pulsing' : ''}`}>
        <circle 
          cx="140" cy="145" r="5" 
          fill="url(#node-gradient)"
          filter={sellerNodePulse ? "url(#node-pulse-glow)" : "url(#dot-glow-subtle)"}
          style={{ 
            opacity: directLineProgress > 0.05 ? (sellerHovered ? 1 : 0.8) : 0,
            transition: 'opacity 0.3s ease'
          }} 
        />
        <circle 
          cx="140" cy="175" r="5" 
          fill="url(#node-gradient)"
          style={{ 
            opacity: showRoutedPath && routedLineProgress > 0.05 ? (sellerHovered ? 1 : 0.8) : 0,
            transition: 'opacity 0.3s ease'
          }} 
        />
      </g>
      
      {/* Buyer node - with pulse animation */}
      <g className={`network-node ${buyerNodePulse ? 'network-node--pulsing' : ''}`}>
        <circle 
          cx="860" cy="145" r="5" 
          fill="url(#node-gradient)"
          filter={buyerNodePulse ? "url(#node-pulse-glow)" : "url(#dot-glow-subtle)"}
          style={{ 
            opacity: directLineProgress > 0.95 ? (buyerHovered ? 1 : 0.8) : 0,
            transition: 'opacity 0.3s ease'
          }} 
        />
        <circle 
          cx="860" cy="175" r="5" 
          fill="url(#node-gradient)"
          style={{ 
            opacity: showRoutedPath && routedLineProgress > 0.95 ? (buyerHovered ? 1 : 0.8) : 0,
            transition: 'opacity 0.3s ease'
          }} 
        />
      </g>
      
      {/* Hub node at bottom center - larger for Aaziko */}
      <g 
        className="network-hub"
        style={{ 
          opacity: showRoutedPath && routedLineProgress > 0.45 
            ? Math.min(0.95, (routedLineProgress - 0.45) * 2.5) 
            : 0,
          transition: 'opacity 0.4s ease'
        }}
      >
        <circle cx="500" cy="415" r="14" fill="#6D28D9" fillOpacity="0.15" />
        <circle cx="500" cy="415" r="8" fill="#6D28D9" fillOpacity="0.9" />
      </g>
      
      {/* Moving data packets - always render, control with opacity */}
      <circle 
        ref={directDotRef}
        r="3.5" 
        fill="#2563EB"
        filter="url(#dot-glow-subtle)"
        cx="140"
        cy="145"
        style={{ 
          opacity: 0,
          visibility: directLineProgress >= 1 && !prefersReducedMotion ? 'visible' : 'hidden'
        }}
      />
      <circle 
        ref={routedDotRef}
        r="4" 
        fill="#6D28D9"
        filter="url(#dot-glow-subtle)"
        cx="140"
        cy="175"
        style={{ 
          opacity: 0,
          visibility: routedLineProgress >= 1 && showRoutedPath && !prefersReducedMotion ? 'visible' : 'hidden'
        }}
      />
    </svg>
  );
});

NetworkLines2D.displayName = 'NetworkLines2D';

export default NetworkLines2D;
