import { useRef, useMemo } from 'react';
import * as THREE from 'three';

/**
 * Animated particles that flow along trade routes
 * Creates the "energy flow" effect for trade lines
 */
export function createTradeFlowSystem(scene, routes, earthRadius) {
  const particles = [];
  const particleCount = 50; // Particles per route

  routes.forEach((route, routeIndex) => {
    const { curve, data } = route;
    
    // Create particles for this route
    for (let i = 0; i < particleCount * data.volume; i++) {
      const geometry = new THREE.SphereGeometry(0.015, 8, 8);
      
      // Color based on route type
      let color;
      switch (data.type) {
        case 'export': color = 0x00d4ff; break;
        case 'import': color = 0xffaa00; break;
        default: color = 0xffffff;
      }

      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
      });

      const particle = new THREE.Mesh(geometry, material);
      
      // Random starting position along curve
      const t = Math.random();
      const pos = curve.getPoint(t);
      particle.position.copy(pos);

      scene.add(particle);

      particles.push({
        mesh: particle,
        curve,
        t,
        speed: 0.002 + Math.random() * 0.003,
        routeIndex,
        volume: data.volume,
      });
    }
  });

  return {
    particles,
    update: (time, routeOpacity) => {
      particles.forEach((p) => {
        // Move along curve
        p.t += p.speed;
        if (p.t > 1) p.t = 0;

        const pos = p.curve.getPoint(p.t);
        p.mesh.position.copy(pos);

        // Fade based on position (brighter in middle)
        const fadeFactor = Math.sin(p.t * Math.PI);
        p.mesh.material.opacity = routeOpacity * fadeFactor * 0.8 * p.volume;
      });
    },
    dispose: () => {
      particles.forEach((p) => {
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        scene.remove(p.mesh);
      });
    },
  };
}

/**
 * Creates pulsing hub markers with glow effect
 */
export function createHubGlowSystem(scene, hubs, earthRadius) {
  const glows = [];

  hubs.forEach((hub) => {
    const pos = hub.mesh.position.clone();

    // Outer glow sprite
    const glowTexture = createGlowTexture();
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      color: 0x00ffff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });

    const glow = new THREE.Sprite(glowMaterial);
    glow.position.copy(pos);
    glow.scale.setScalar(0.4);
    scene.add(glow);

    glows.push({
      sprite: glow,
      baseScale: 0.4,
      hub,
    });
  });

  return {
    glows,
    update: (time, opacity) => {
      glows.forEach((g, i) => {
        const pulse = 0.8 + 0.2 * Math.sin(time * 2 + i * 0.5);
        g.sprite.scale.setScalar(g.baseScale * pulse);
        g.sprite.material.opacity = opacity * 0.6 * pulse;
      });
    },
    dispose: () => {
      glows.forEach((g) => {
        g.sprite.material.map.dispose();
        g.sprite.material.dispose();
        scene.remove(g.sprite);
      });
    },
  };
}

/**
 * Creates a radial gradient texture for glow effects
 */
function createGlowTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(0, 212, 255, 0.8)');
  gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.3)');
  gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default { createTradeFlowSystem, createHubGlowSystem };
