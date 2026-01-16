import { useEffect, useRef, useCallback } from 'react';

const FOV = 500;
const BASE_RADIUS = 220;

// India position for connection origin
const INDIA_LAT = 20 * (Math.PI / 180);
const INDIA_LON = 78 * (Math.PI / 180);
const INDIA_UNIT = {
  x: Math.cos(INDIA_LAT) * Math.cos(INDIA_LON),
  y: -Math.sin(INDIA_LAT),
  z: Math.cos(INDIA_LAT) * Math.sin(INDIA_LON),
};

// Connection targets
const CONNECTIONS = [
  { lat: 40, lon: -74 }, { lat: 51, lon: 0 }, { lat: 35, lon: 139 },
  { lat: -33, lon: 151 }, { lat: 55, lon: 37 }, { lat: 1, lon: 103 },
].map(({ lat, lon }) => {
  const latR = lat * (Math.PI / 180), lonR = lon * (Math.PI / 180);
  return { x: Math.cos(latR) * Math.cos(lonR), y: -Math.sin(latR), z: Math.cos(latR) * Math.sin(lonR) };
});

// Generate Fibonacci sphere points
function generateSpherePoints(count) {
  const points = new Float32Array(count * 3);
  const phi = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / phi;
    const p = Math.acos(1 - (2 * (i + 0.5)) / count);
    const idx = i * 3;
    points[idx] = Math.sin(p) * Math.cos(theta);
    points[idx + 1] = Math.sin(p) * Math.sin(theta);
    points[idx + 2] = Math.cos(p);
  }
  return points;
}

// Create cached glow canvas
function createGlowCanvas(size, mode) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const cx = size / 2, cy = size / 2;
  const radius = size * 0.45;

  if (mode === 'none') {
    return canvas; // Empty canvas
  }

  const glow = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius);
  
  if (mode === 'full') {
    glow.addColorStop(0, 'rgba(37, 99, 235, 0.25)');
    glow.addColorStop(0.4, 'rgba(37, 99, 235, 0.1)');
    glow.addColorStop(1, 'rgba(37, 99, 235, 0)');
  } else if (mode === 'simple') {
    glow.addColorStop(0, 'rgba(37, 99, 235, 0.18)');
    glow.addColorStop(0.5, 'rgba(37, 99, 235, 0.05)');
    glow.addColorStop(1, 'rgba(37, 99, 235, 0)');
  } else { // minimal
    glow.addColorStop(0, 'rgba(37, 99, 235, 0.1)');
    glow.addColorStop(1, 'rgba(37, 99, 235, 0)');
  }

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();

  return canvas;
}

export default function FakeGlobeCanvas({ 
  progress = 0, 
  quality,
  scrollRotation = 0,
}) {
  const canvasRef = useRef(null);
  const hasInitRef = useRef(false);
  const rafIdRef = useRef(null);
  const stateRef = useRef({ progress: 0, scrollRotation: 0 });
  const qualityRef = useRef(quality);
  
  // Cached resources
  const glowCanvasRef = useRef(null);
  const pointsRef = useRef(null);
  const sortedIndicesRef = useRef(null);

  // Update state refs
  useEffect(() => {
    stateRef.current = { progress, scrollRotation };
  }, [progress, scrollRotation]);

  // Update quality ref and regenerate resources when quality changes
  useEffect(() => {
    qualityRef.current = quality;
  }, [quality]);

  // Regenerate points when quality changes
  const regeneratePoints = useCallback((dotCount) => {
    pointsRef.current = generateSpherePoints(dotCount);
    sortedIndicesRef.current = new Uint16Array(dotCount);
    for (let i = 0; i < dotCount; i++) {
      sortedIndicesRef.current[i] = i;
    }
  }, []);

  useEffect(() => {
    if (hasInitRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    hasInitRef.current = true;

    // Animation state
    let rotationAngle = 0;
    let currentScale = 0.05;
    let width = 0, height = 0, dpr = 1;
    let frameCount = 0;
    let lastRenderTime = 0;
    let lastSortFrame = 0;
    let currentDotCount = 0;
    let lastQualityName = '';

    // Transform function
    const tiltAngle = 0.25;
    const cosX = Math.cos(tiltAngle), sinX = Math.sin(tiltAngle);

    const transform = (px, py, pz, cosY, sinY, radius, cx, cy) => {
      const y1 = py * cosX - pz * sinX;
      const z1 = py * sinX + pz * cosX;
      const x2 = px * cosY - z1 * sinY;
      const z2 = px * sinY + z1 * cosY;
      const persp = FOV / (FOV + z2 * radius);
      return { x: cx + x2 * radius * persp, y: cy + y1 * radius * persp, z: z2, persp };
    };

    // Resize handler
    const resize = () => {
      const q = qualityRef.current;
      const rect = canvas.parentElement?.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, q.maxDpr);
      width = rect?.width || window.innerWidth;
      height = rect?.height || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Regenerate glow canvas
      const glowSize = Math.max(width, height) * dpr;
      glowCanvasRef.current = createGlowCanvas(glowSize, q.glowMode);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initial points generation
    const initQuality = qualityRef.current;
    currentDotCount = initQuality.maxDots;
    lastQualityName = initQuality.name;
    regeneratePoints(currentDotCount);

    // Render function
    const render = (timestamp) => {
      const q = qualityRef.current;
      const { progress, scrollRotation } = stateRef.current;

      // FPS cap
      const frameInterval = 1000 / q.fpsCap;
      if (timestamp - lastRenderTime < frameInterval) {
        rafIdRef.current = requestAnimationFrame(render);
        return;
      }
      lastRenderTime = timestamp;

      // Record frame for performance monitoring
      if (window.__perfRecordFrame) {
        window.__perfRecordFrame();
      }

      // Check if quality changed - regenerate resources
      if (q.name !== lastQualityName) {
        lastQualityName = q.name;
        const newDotCount = Math.floor(q.minDots + (q.maxDots - q.minDots) * Math.min(progress * 1.5, 1));
        if (Math.abs(newDotCount - currentDotCount) > 50) {
          currentDotCount = newDotCount;
          regeneratePoints(currentDotCount);
        }
        // Update DPR
        dpr = Math.min(window.devicePixelRatio || 1, q.maxDpr);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        // Regenerate glow
        const glowSize = Math.max(width, height) * dpr;
        glowCanvasRef.current = createGlowCanvas(glowSize, q.glowMode);
      }

      // Update dot count based on progress
      const targetDotCount = Math.floor(q.minDots + (q.maxDots - q.minDots) * Math.min(progress * 1.5, 1));
      if (Math.abs(targetDotCount - currentDotCount) > 100) {
        currentDotCount = targetDotCount;
        regeneratePoints(currentDotCount);
      }

      // Scale
      const targetScale = 0.05 + 0.95 * Math.min(progress * 1.5, 1);
      currentScale += (targetScale - currentScale) * 0.08;
      const radius = BASE_RADIUS * currentScale;

      // Rotation: combine auto rotation + scroll-driven rotation
      rotationAngle += q.rotationSpeed;
      const totalRotation = rotationAngle + scrollRotation;
      const cosY = Math.cos(totalRotation), sinY = Math.sin(totalRotation);
      const cx = width / 2, cy = height / 2;

      // Clear
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Draw cached glow
      if (glowCanvasRef.current && q.glowMode !== 'none' && radius > 10) {
        const glowSize = radius * 3.2;
        ctx.drawImage(
          glowCanvasRef.current,
          cx - glowSize / 2,
          cy - glowSize / 2,
          glowSize,
          glowSize
        );
      }

      // Transform points
      const points = pointsRef.current;
      const indices = sortedIndicesRef.current;
      if (!points || !indices) {
        rafIdRef.current = requestAnimationFrame(render);
        return;
      }

      const dotCount = Math.min(currentDotCount, points.length / 3);
      const transformed = new Float32Array(dotCount * 4);

      for (let i = 0; i < dotCount; i++) {
        const idx = i * 3;
        const px = points[idx], py = points[idx + 1], pz = points[idx + 2];
        const y1 = py * cosX - pz * sinX;
        const z1 = py * sinX + pz * cosX;
        const x2 = px * cosY - z1 * sinY;
        const z2 = px * sinY + z1 * cosY;
        const persp = FOV / (FOV + z2 * radius);
        const tIdx = i * 4;
        transformed[tIdx] = cx + x2 * radius * persp;
        transformed[tIdx + 1] = cy + y1 * radius * persp;
        transformed[tIdx + 2] = z2;
        transformed[tIdx + 3] = persp;
      }

      // Sort only every N frames (based on quality)
      frameCount++;
      if (frameCount - lastSortFrame >= q.sortEveryNFrames) {
        lastSortFrame = frameCount;
        // Simple insertion sort on indices by z
        for (let i = 1; i < dotCount; i++) {
          const key = indices[i];
          const keyZ = transformed[key * 4 + 2];
          let j = i - 1;
          while (j >= 0 && transformed[indices[j] * 4 + 2] > keyZ) {
            indices[j + 1] = indices[j];
            j--;
          }
          indices[j + 1] = key;
        }
      }

      // Draw dots
      const baseSize = Math.max(1.3 * currentScale, 0.5);
      for (let i = 0; i < dotCount; i++) {
        const idx = indices[i] * 4;
        const x = transformed[idx];
        const y = transformed[idx + 1];
        const z = transformed[idx + 2];
        const persp = transformed[idx + 3];

        const depth = (z + 1) * 0.5;
        const size = baseSize * (0.35 + depth * 0.65) * persp;
        const alpha = 0.1 + depth * 0.9;
        const bright = (130 + depth * 125) | 0;

        ctx.beginPath();
        ctx.arc(x, y, Math.max(size, 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${bright},${bright + 40},255,${alpha})`;
        ctx.fill();
      }

      // Connection lines - always visible
      if (radius > 20 && q.name !== 'FALLBACK') {
        const india = transform(INDIA_UNIT.x, INDIA_UNIT.y, INDIA_UNIT.z, cosY, sinY, radius, cx, cy);
        const targets = CONNECTIONS.map(c => transform(c.x, c.y, c.z, cosY, sinY, radius, cx, cy));

        for (const t of targets) {
          const avgZ = (india.z + t.z) / 2;
          const alpha = avgZ > 0 ? 0.45 : 0.12;
          ctx.beginPath();
          ctx.moveTo(india.x, india.y);
          ctx.lineTo(t.x, t.y);
          ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
          ctx.lineWidth = q.name === 'LOW' ? 1 : 1.5;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(t.x, t.y, q.name === 'LOW' ? 2 : 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
          ctx.fill();
        }

        // India highlight
        if (india.z > -0.3) {
          ctx.beginPath();
          ctx.arc(india.x, india.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(251, 191, 36, 0.9)';
          ctx.fill();
        }
      }

      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      window.removeEventListener('resize', resize);
      hasInitRef.current = false;
      pointsRef.current = null;
      sortedIndicesRef.current = null;
      glowCanvasRef.current = null;
    };
  }, [regeneratePoints]);

  return <canvas ref={canvasRef} className="globe-canvas" />;
}
