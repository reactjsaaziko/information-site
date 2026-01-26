import { useEffect, useState } from 'react';

/**
 * Visual component to show scroll speed in real-time
 * Useful for debugging and demonstrating the dampening effect
 * 
 * Usage: Add <ScrollSpeedVisualizer /> to App.jsx during development
 */
export default function ScrollSpeedVisualizer({ show = false }) {
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [isDampened, setIsDampened] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!show) return;

    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let rafId = null;

    const updateSpeed = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      const deltaTime = currentTime - lastTime;
      
      // Calculate speed in pixels per second
      const speed = deltaTime > 0 ? (deltaY / deltaTime) * 1000 : 0;
      
      setScrollSpeed(Math.round(speed));
      setScrollY(Math.round(currentScrollY));
      setIsDampened(currentScrollY < 1000);
      
      lastScrollY = currentScrollY;
      lastTime = currentTime;
      
      rafId = requestAnimationFrame(updateSpeed);
    };

    rafId = requestAnimationFrame(updateSpeed);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        left: '20px',
        zIndex: 10000,
        background: 'rgba(0, 0, 0, 0.85)',
        color: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        fontFamily: 'monospace',
        fontSize: '13px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        minWidth: '220px',
      }}
    >
      <div style={{ marginBottom: '12px', fontWeight: 'bold', fontSize: '14px' }}>
        📊 Scroll Monitor
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#94a3b8' }}>Speed:</span>
          <span style={{ 
            color: isDampened ? '#fbbf24' : '#10b981',
            fontWeight: 'bold' 
          }}>
            {scrollSpeed} px/s
          </span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#94a3b8' }}>Position:</span>
          <span style={{ color: '#67e8f9' }}>{scrollY} px</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#94a3b8' }}>Mode:</span>
          <span style={{ 
            color: isDampened ? '#fbbf24' : '#10b981',
            fontWeight: 'bold' 
          }}>
            {isDampened ? '🐌 DAMPENED' : '⚡ NORMAL'}
          </span>
        </div>
        
        {/* Speed Bar */}
        <div style={{ marginTop: '8px' }}>
          <div style={{ 
            fontSize: '11px', 
            color: '#94a3b8', 
            marginBottom: '4px' 
          }}>
            Speed Indicator
          </div>
          <div style={{
            width: '100%',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${Math.min(100, (scrollSpeed / 2000) * 100)}%`,
              height: '100%',
              background: isDampened 
                ? 'linear-gradient(90deg, #fbbf24, #f59e0b)' 
                : 'linear-gradient(90deg, #10b981, #059669)',
              transition: 'width 0.1s ease-out',
            }} />
          </div>
        </div>
        
        {/* Zone Indicator */}
        <div style={{ marginTop: '8px' }}>
          <div style={{ 
            fontSize: '11px', 
            color: '#94a3b8', 
            marginBottom: '4px' 
          }}>
            Dampening Zone (0-1000px)
          </div>
          <div style={{
            width: '100%',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${Math.min(100, (scrollY / 1000) * 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #ef4444, #10b981)',
              transition: 'width 0.2s ease-out',
            }} />
          </div>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '12px', 
        paddingTop: '12px', 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '11px',
        color: '#64748b',
        lineHeight: '1.4'
      }}>
        💡 Scroll speed is reduced by 65% in the dampening zone
      </div>
    </div>
  );
}
