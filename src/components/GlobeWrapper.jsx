import { useState, useEffect } from 'react';
import Globe3D from './Globe3D';
import FakeGlobeCanvas from './FakeGlobeCanvas';

// Check WebGL support
function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}

export default function GlobeWrapper({ progress, quality, scrollRotation }) {
  const [useWebGL, setUseWebGL] = useState(true);

  useEffect(() => {
    setUseWebGL(checkWebGLSupport());
  }, []);

  if (useWebGL) {
    return (
      <Globe3D 
        progress={progress}
        scrollRotation={scrollRotation}
      />
    );
  }

  // Fallback to Canvas 2D
  return (
    <FakeGlobeCanvas 
      progress={progress}
      quality={quality}
      scrollRotation={scrollRotation}
    />
  );
}
