// Premium platform/podium - network node style with hover glow
export default function Platform2D({ type = 'seller', isGlowing = false }) {
  const color = type === 'seller' ? '#5b9bd5' : '#4db8b8';
  
  return (
    <svg viewBox="0 0 240 80" className={`platform-2d ${isGlowing ? 'platform-2d--glowing' : ''}`}>
      <defs>
        {/* Platform surface gradient */}
        <radialGradient id={`platform-surface-${type}`} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity={isGlowing ? "0.3" : "0.18"} />
          <stop offset="60%" stopColor={color} stopOpacity={isGlowing ? "0.12" : "0.06"} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        
        {/* Ground shadow */}
        <radialGradient id={`platform-shadow-${type}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#000" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        
        {/* Hover glow */}
        <filter id={`platform-hover-glow-${type}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Ground shadow */}
      <ellipse cx="120" cy="58" rx="85" ry="14" fill={`url(#platform-shadow-${type})`} />
      
      {/* Platform disc */}
      <ellipse 
        cx="120" 
        cy="40" 
        rx="80" 
        ry="18" 
        fill={`url(#platform-surface-${type})`}
      />
      
      {/* Thin ring outline */}
      <ellipse 
        cx="120" 
        cy="40" 
        rx="75" 
        ry="16" 
        fill="none"
        stroke={color}
        strokeWidth={isGlowing ? "1.5" : "1"}
        strokeOpacity={isGlowing ? "0.6" : "0.35"}
        filter={isGlowing ? `url(#platform-hover-glow-${type})` : undefined}
        style={{ transition: 'stroke-opacity 0.3s ease, stroke-width 0.3s ease' }}
      />
      
      {/* Inner glow */}
      <ellipse 
        cx="120" 
        cy="38" 
        rx="40" 
        ry="9" 
        fill={color}
        fillOpacity={isGlowing ? "0.12" : "0.06"}
        style={{ transition: 'fill-opacity 0.3s ease' }}
      />
    </svg>
  );
}
