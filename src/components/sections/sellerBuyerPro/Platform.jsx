export default function Platform({ type = 'seller' }) {
  const color = type === 'seller' ? '#60a5fa' : '#22d3ee';
  
  return (
    <div className="platform">
      <svg viewBox="0 0 200 60" className="platform-svg">
        <defs>
          {/* Platform gradient */}
          <radialGradient id={`platform-grad-${type}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="60%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
          
          {/* Glow ring */}
          <radialGradient id={`platform-ring-${type}`} cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
          
          {/* Shadow */}
          <filter id={`platform-shadow-${type}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
        </defs>
        
        {/* Shadow ellipse */}
        <ellipse 
          cx="100" 
          cy="45" 
          rx="80" 
          ry="12" 
          fill="rgba(0,0,0,0.4)"
          filter={`url(#platform-shadow-${type})`}
        />
        
        {/* Main platform disc */}
        <ellipse 
          cx="100" 
          cy="30" 
          rx="90" 
          ry="20" 
          fill={`url(#platform-grad-${type})`}
        />
        
        {/* Glow ring */}
        <ellipse 
          cx="100" 
          cy="30" 
          rx="85" 
          ry="18" 
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        
        {/* Inner highlight */}
        <ellipse 
          cx="100" 
          cy="28" 
          rx="60" 
          ry="10" 
          fill={color}
          fillOpacity="0.1"
        />
      </svg>
    </div>
  );
}
