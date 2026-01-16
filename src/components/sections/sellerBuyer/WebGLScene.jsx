import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import NetworkLines3D from './network/NetworkLines3D';

function Character({ url, position, rotation = [0, 0, 0], fallbackColor = '#64748b' }) {
  const [modelError, setModelError] = useState(false);
  const meshRef = useRef();

  // Try to load model
  let scene = null;
  try {
    if (!modelError) {
      const gltf = useGLTF(url);
      scene = gltf.scene;
    }
  } catch (e) {
    if (!modelError) setModelError(true);
  }

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  if (modelError || !scene) {
    // Fallback silhouette
    return (
      <group ref={meshRef} position={position} rotation={rotation}>
        {/* Head */}
        <mesh position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={fallbackColor} metalness={0.3} roughness={0.7} />
        </mesh>
        {/* Body */}
        <mesh position={[0, 1.1, 0]}>
          <capsuleGeometry args={[0.18, 0.5, 8, 16]} />
          <meshStandardMaterial color={fallbackColor} metalness={0.3} roughness={0.7} />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.08, 0.4, 0]}>
          <capsuleGeometry args={[0.06, 0.6, 4, 8]} />
          <meshStandardMaterial color={fallbackColor} metalness={0.3} roughness={0.7} />
        </mesh>
        <mesh position={[0.08, 0.4, 0]}>
          <capsuleGeometry args={[0.06, 0.6, 4, 8]} />
          <meshStandardMaterial color={fallbackColor} metalness={0.3} roughness={0.7} />
        </mesh>
      </group>
    );
  }

  return (
    <primitive 
      ref={meshRef}
      object={scene.clone()} 
      position={position} 
      rotation={rotation}
      scale={[1, 1, 1]}
    />
  );
}

function Scene({ directLineProgress, routedLineProgress, showPackets }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 7, 4]} intensity={1.6} castShadow />
      <directionalLight position={[-4, 3, -3]} intensity={0.6} color="#60a5fa" />
      <directionalLight position={[0, 2, -5]} intensity={0.5} color="#f0f9ff" />

      {/* Fog */}
      <fog attach="fog" args={['#0f172a', 5, 15]} />

      {/* Environment */}
      <Environment preset="studio" background={false} />

      {/* Ground plane with soft glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#1e293b" 
          transparent 
          opacity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Seller character */}
      <Character 
        url="/models/seller.glb" 
        position={[-2.8, 0, 0]}
        rotation={[0, 0.3, 0]}
        fallbackColor="#64748b"
      />

      {/* Buyer character */}
      <Character 
        url="/models/buyer.glb" 
        position={[2.8, 0, 0]}
        rotation={[0, -0.3, 0]}
        fallbackColor="#64748b"
      />

      {/* Network lines */}
      <NetworkLines3D 
        directLineProgress={directLineProgress}
        routedLineProgress={routedLineProgress}
        showPackets={showPackets}
      />
    </>
  );
}

export default function WebGLScene({ directLineProgress, routedLineProgress, showPackets }) {
  return (
    <div className="webgl-scene">
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <Scene 
            directLineProgress={directLineProgress}
            routedLineProgress={routedLineProgress}
            showPackets={showPackets}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
