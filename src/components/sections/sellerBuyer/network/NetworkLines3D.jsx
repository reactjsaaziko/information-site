import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NetworkLines3D({ 
  directLineProgress = 0, 
  routedLineProgress = 0,
  showPackets = false 
}) {
  const directLineRef = useRef();
  const routedLine1Ref = useRef();
  const routedLine2Ref = useRef();
  const packet1Ref = useRef();
  const packet2Ref = useRef();
  const packet3Ref = useRef();
  const timeRef = useRef(0);

  // Anchor positions
  const sellerPos = new THREE.Vector3(-2.8, 1.2, 0);
  const buyerPos = new THREE.Vector3(2.8, 1.2, 0);
  const hubPos = new THREE.Vector3(0, -1.5, 0);

  // Create curves
  const directCurve = useMemo(() => {
    const mid = new THREE.Vector3(0, 2.2, 0.5);
    return new THREE.QuadraticBezierCurve3(sellerPos, mid, buyerPos);
  }, []);

  const routedCurve1 = useMemo(() => {
    const mid = new THREE.Vector3(-1.4, 0, 0.3);
    return new THREE.QuadraticBezierCurve3(sellerPos, mid, hubPos);
  }, []);

  const routedCurve2 = useMemo(() => {
    const mid = new THREE.Vector3(1.4, 0, 0.3);
    return new THREE.QuadraticBezierCurve3(hubPos, mid, buyerPos);
  }, []);

  // Create tube geometries
  const directTubeGeo = useMemo(() => {
    return new THREE.TubeGeometry(directCurve, 64, 0.02, 8, false);
  }, [directCurve]);

  const routedTube1Geo = useMemo(() => {
    return new THREE.TubeGeometry(routedCurve1, 64, 0.03, 8, false);
  }, [routedCurve1]);

  const routedTube2Geo = useMemo(() => {
    return new THREE.TubeGeometry(routedCurve2, 64, 0.03, 8, false);
  }, [routedCurve2]);

  useFrame((state, delta) => {
    timeRef.current += delta;

    // Animate packets
    if (showPackets && packet1Ref.current) {
      const t1 = (timeRef.current * 0.3) % 1;
      const pos1 = directCurve.getPoint(t1);
      packet1Ref.current.position.copy(pos1);
    }

    if (showPackets && routedLineProgress >= 1 && packet2Ref.current && packet3Ref.current) {
      const t2 = (timeRef.current * 0.25) % 1;
      if (t2 < 0.5) {
        const pos2 = routedCurve1.getPoint(t2 * 2);
        packet2Ref.current.position.copy(pos2);
        packet2Ref.current.visible = true;
        packet3Ref.current.visible = false;
      } else {
        const pos3 = routedCurve2.getPoint((t2 - 0.5) * 2);
        packet3Ref.current.position.copy(pos3);
        packet2Ref.current.visible = false;
        packet3Ref.current.visible = true;
      }
    }
  });

  return (
    <group>
      {/* Direct line */}
      {directLineProgress > 0 && (
        <mesh ref={directLineRef} geometry={directTubeGeo}>
          <meshBasicMaterial 
            color="#60a5fa" 
            transparent 
            opacity={0.7 * directLineProgress}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Routed line - first segment */}
      {routedLineProgress > 0 && (
        <mesh ref={routedLine1Ref} geometry={routedTube1Geo}>
          <meshBasicMaterial 
            color="#22d3ee" 
            transparent 
            opacity={0.9 * Math.min(routedLineProgress * 2, 1)}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Routed line - second segment */}
      {routedLineProgress > 0.5 && (
        <mesh ref={routedLine2Ref} geometry={routedTube2Geo}>
          <meshBasicMaterial 
            color="#22d3ee" 
            transparent 
            opacity={0.9 * Math.min((routedLineProgress - 0.5) * 2, 1)}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Nodes */}
      <mesh position={sellerPos}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#60a5fa" />
      </mesh>
      <mesh position={buyerPos}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#60a5fa" />
      </mesh>
      {routedLineProgress > 0 && (
        <mesh position={hubPos}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>
      )}

      {/* Packets */}
      {showPackets && directLineProgress >= 1 && (
        <mesh ref={packet1Ref}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color="#93c5fd" blending={THREE.AdditiveBlending} />
        </mesh>
      )}
      {showPackets && routedLineProgress >= 1 && (
        <>
          <mesh ref={packet2Ref}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color="#22d3ee" blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh ref={packet3Ref} visible={false}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color="#22d3ee" blending={THREE.AdditiveBlending} />
          </mesh>
        </>
      )}
    </group>
  );
}
