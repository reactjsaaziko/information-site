/**
 * Lightweight animated background - CSS-only for better performance
 * Replaces heavy framer-motion animations with CSS transforms
 */

export default function AnimatedBackground() {
  return (
    <div className="animated-bg">
      {/* Grid pattern */}
      <div className="animated-bg-grid" />
      
      {/* Main gradient */}
      <div className="animated-bg-gradient" />
      
      {/* Simple floating shapes - CSS animated */}
      <div className="animated-bg-shape shape-1" />
      <div className="animated-bg-shape shape-2" />
      <div className="animated-bg-shape shape-3" />
      
      {/* Corner gradients */}
      <div className="animated-bg-corner corner-tl" />
      <div className="animated-bg-corner corner-br" />
      
      <style>{`
        .animated-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        
        .animated-bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        
        .animated-bg-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 100% 80% at 50% 20%, rgba(37, 99, 235, 0.06) 0%, transparent 50%);
        }
        
        .animated-bg-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.4;
          will-change: transform;
        }
        
        .shape-1 {
          width: 100px;
          height: 100px;
          top: 15%;
          right: 10%;
          border: 1px solid rgba(37, 99, 235, 0.15);
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .shape-2 {
          width: 60px;
          height: 60px;
          bottom: 20%;
          left: 8%;
          background: rgba(37, 99, 235, 0.05);
          animation: float-slow 25s ease-in-out infinite reverse;
        }
        
        .shape-3 {
          width: 40px;
          height: 40px;
          top: 50%;
          right: 20%;
          border: 1px solid rgba(14, 165, 233, 0.12);
          animation: float-slow 18s ease-in-out infinite;
          animation-delay: -5s;
        }
        
        .animated-bg-corner {
          position: absolute;
          width: 400px;
          height: 400px;
        }
        
        .corner-tl {
          top: 0;
          left: 0;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, transparent 60%);
        }
        
        .corner-br {
          bottom: 0;
          right: 0;
          background: linear-gradient(315deg, rgba(14, 165, 233, 0.03) 0%, transparent 60%);
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animated-bg-shape {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
