import { useEffect, useRef } from 'react';

export default function LightBeams({ opacity = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();

    const drawBeam = (startX, angle, beamWidth, intensity) => {
      const angleRad = (angle * Math.PI) / 180;
      
      // Beam starts from bottom and goes UP
      const startY = height + 50;
      const beamLength = height * 1.4;
      
      // End point at top
      const endX = startX + Math.sin(angleRad) * beamLength;
      const endY = startY - beamLength;
      
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      
      // Apply blur for soft glowing edges
      ctx.filter = 'blur(25px)';
      
      const bottomWidth = beamWidth;
      const topWidth = beamWidth * 0.15;
      const perpAngle = angleRad + Math.PI / 2;
      
      // Bottom points (wider)
      const bottomLeftX = startX - Math.cos(perpAngle) * bottomWidth;
      const bottomLeftY = startY;
      const bottomRightX = startX + Math.cos(perpAngle) * bottomWidth;
      const bottomRightY = startY;
      
      // Top points (narrower)
      const topLeftX = endX - Math.cos(perpAngle) * topWidth;
      const topLeftY = endY;
      const topRightX = endX + Math.cos(perpAngle) * topWidth;
      const topRightY = endY;
      
      // Draw outer glow layer (more blur, wider)
      ctx.filter = 'blur(40px)';
      ctx.beginPath();
      ctx.moveTo(bottomLeftX - 30, bottomLeftY);
      ctx.lineTo(topLeftX - 10, topLeftY);
      ctx.lineTo(topRightX + 10, topRightY);
      ctx.lineTo(bottomRightX + 30, bottomRightY);
      ctx.closePath();
      
      const outerGradient = ctx.createLinearGradient(startX, startY, endX, endY);
      outerGradient.addColorStop(0, `rgba(120, 140, 170, ${intensity * 0.3})`);
      outerGradient.addColorStop(0.3, `rgba(100, 125, 160, ${intensity * 0.18})`);
      outerGradient.addColorStop(0.6, `rgba(80, 105, 145, ${intensity * 0.08})`);
      outerGradient.addColorStop(1, 'rgba(55, 80, 120, 0)');
      ctx.fillStyle = outerGradient;
      ctx.fill();
      
      // Draw middle glow layer
      ctx.filter = 'blur(20px)';
      ctx.beginPath();
      ctx.moveTo(bottomLeftX, bottomLeftY);
      ctx.lineTo(topLeftX, topLeftY);
      ctx.lineTo(topRightX, topRightY);
      ctx.lineTo(bottomRightX, bottomRightY);
      ctx.closePath();
      
      const middleGradient = ctx.createLinearGradient(startX, startY, endX, endY);
      middleGradient.addColorStop(0, `rgba(145, 165, 195, ${intensity * 0.45})`);
      middleGradient.addColorStop(0.2, `rgba(130, 155, 185, ${intensity * 0.35})`);
      middleGradient.addColorStop(0.5, `rgba(110, 135, 170, ${intensity * 0.2})`);
      middleGradient.addColorStop(0.8, `rgba(80, 110, 150, ${intensity * 0.08})`);
      middleGradient.addColorStop(1, 'rgba(55, 80, 120, 0)');
      ctx.fillStyle = middleGradient;
      ctx.fill();
      
      // Draw inner core (brighter, less blur)
      ctx.filter = 'blur(8px)';
      const coreWidth = bottomWidth * 0.5;
      const coreTopWidth = topWidth * 0.5;
      
      ctx.beginPath();
      ctx.moveTo(startX - Math.cos(perpAngle) * coreWidth, startY);
      ctx.lineTo(endX - Math.cos(perpAngle) * coreTopWidth, endY);
      ctx.lineTo(endX + Math.cos(perpAngle) * coreTopWidth, endY);
      ctx.lineTo(startX + Math.cos(perpAngle) * coreWidth, startY);
      ctx.closePath();
      
      const coreGradient = ctx.createLinearGradient(startX, startY, endX, endY);
      coreGradient.addColorStop(0, `rgba(175, 190, 215, ${intensity * 0.7})`);
      coreGradient.addColorStop(0.15, `rgba(160, 180, 205, ${intensity * 0.55})`);
      coreGradient.addColorStop(0.4, `rgba(140, 165, 195, ${intensity * 0.35})`);
      coreGradient.addColorStop(0.7, `rgba(110, 140, 175, ${intensity * 0.15})`);
      coreGradient.addColorStop(1, 'rgba(80, 110, 150, 0)');
      ctx.fillStyle = coreGradient;
      ctx.fill();
      
      ctx.filter = 'none';
      ctx.restore();
    };

    const drawBottomGlow = () => {
      // Foggy/misty glow at the bottom - more dull/muted
      const gradient = ctx.createLinearGradient(0, height, 0, height * 0.5);
      gradient.addColorStop(0, 'rgba(140, 160, 185, 0.4)');
      gradient.addColorStop(0.2, 'rgba(120, 145, 175, 0.25)');
      gradient.addColorStop(0.5, 'rgba(90, 115, 150, 0.12)');
      gradient.addColorStop(1, 'rgba(55, 80, 120, 0)');
      
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = gradient;
      ctx.fillRect(0, height * 0.5, width, height * 0.5);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw bottom ambient glow first (the foggy bottom)
      drawBottomGlow();
      
      // Draw beams from bottom going UP - on the RIGHT side
      // Secondary beam (more to the right, steeper angle)
      drawBeam(width * 0.75, -15, 320, 0.55);
      
      // Third subtle beam (far right edge)
      drawBeam(width * 0.95, -8, 340, 0.4);
    };

    draw();

    const handleResize = () => {
      resize();
      draw();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="light-beams"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: opacity,
        transition: 'opacity 0.5s ease',
      }}
    />
  );
}
