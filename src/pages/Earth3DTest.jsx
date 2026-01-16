import { useRef, useState } from 'react'
import Earth3DModel from '../components/Earth3DModel'

export default function Earth3DTest() {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [opacity, setOpacity] = useState(1)
  const [rotationX, setRotationX] = useState(-30)
  const [rotationY, setRotationY] = useState(45)

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#030014', display: 'flex', flexDirection: 'column' }}>
      {/* Earth Container */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Earth3DModel
          containerRef={containerRef}
          scale={scale}
          opacity={opacity}
          rotation={{ x: rotationX, y: rotationY }}
          autoRotate={true}
        />
      </div>

      {/* Controls */}
      <div
        style={{
          padding: '20px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          borderTop: '1px solid rgba(100, 200, 255, 0.3)',
        }}
      >
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Scale: {scale.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Opacity: {opacity.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Rotation X: {rotationX.toFixed(0)}°
          </label>
          <input
            type="range"
            min="-180"
            max="180"
            step="5"
            value={rotationX}
            onChange={(e) => setRotationX(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Rotation Y: {rotationY.toFixed(0)}°
          </label>
          <input
            type="range"
            min="-180"
            max="180"
            step="5"
            value={rotationY}
            onChange={(e) => setRotationY(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <p style={{ fontSize: '12px', color: '#aaa', marginTop: '20px' }}>
          ✓ Earth 3D Model Test - Adjust controls to test scale, opacity, and rotation
        </p>
      </div>
    </div>
  )
}
