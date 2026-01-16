import { useState, useEffect } from 'react';

export function useWebGL2() {
  const [hasWebGL2, setHasWebGL2] = useState(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    setHasWebGL2(!!gl);
  }, []);

  return hasWebGL2;
}

export function checkWebGL2() {
  const canvas = document.createElement('canvas');
  return !!canvas.getContext('webgl2');
}
