import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const EARTH_TEXTURE = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg'
const EARTH_BUMP = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png'
const EARTH_SPECULAR = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-water-mask-braun.png'

export default function Earth3DModel({ 
  containerRef, 
  scale = 1, 
  opacity = 1, 
  rotation = { x: 0, y: 0 },
  autoRotate = true 
}) {
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const earthRef = useRef(null)
  const cloudsRef = useRef(null)
  const globeGroupRef = useRef(null)
  const hasInitRef = useRef(false)
  const rafIdRef = useRef(null)
  const texturesLoadedRef = useRef({ map: false, bump: false, specular: false })

  useEffect(() => {
    if (hasInitRef.current || !containerRef?.current) return
    hasInitRef.current = true

    const container = containerRef.current
    const width = container.clientWidth || 400
    const height = container.clientHeight || 400

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    sceneRef.current = scene
    rendererRef.current = renderer

    // Globe group
    const globeGroup = new THREE.Group()
    scene.add(globeGroup)
    globeGroupRef.current = globeGroup

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.8)
    sunLight.position.set(5, 3, 5)
    sunLight.castShadow = true
    scene.add(sunLight)

    const fillLight = new THREE.DirectionalLight(0x6eb7ff, 1)
    fillLight.position.set(-5, -2, -5)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0x4a90d9, 0.8)
    rimLight.position.set(0, 0, -8)
    scene.add(rimLight)

    // Earth geometry and material
    const earthGeometry = new THREE.SphereGeometry(3.5, 128, 128)
    const earthMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a4d7a,
      metalness: 0.2,
      roughness: 0.8,
      emissive: 0x0a2a4a,
      emissiveIntensity: 0.15,
    })

    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    earth.castShadow = true
    earth.receiveShadow = true
    globeGroup.add(earth)
    earthRef.current = earth

    // Texture loader
    const textureLoader = new THREE.TextureLoader()
    textureLoader.crossOrigin = 'anonymous'

    // Load Earth texture
    textureLoader.load(
      EARTH_TEXTURE,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        earthMaterial.map = texture
        earthMaterial.needsUpdate = true
        texturesLoadedRef.current.map = true
      },
      undefined,
      (error) => {
        console.warn('Earth texture load error:', error)
      }
    )

    // Load bump map
    textureLoader.load(
      EARTH_BUMP,
      (texture) => {
        earthMaterial.bumpMap = texture
        earthMaterial.bumpScale = 0.1
        earthMaterial.needsUpdate = true
        texturesLoadedRef.current.bump = true
      },
      undefined,
      (error) => {
        console.warn('Bump map load error:', error)
      }
    )

    // Load specular map
    textureLoader.load(
      EARTH_SPECULAR,
      (texture) => {
        earthMaterial.metalnessMap = texture
        earthMaterial.needsUpdate = true
        texturesLoadedRef.current.specular = true
      },
      undefined,
      (error) => {
        console.warn('Specular map load error:', error)
      }
    )

    // Clouds layer
    const cloudsGeometry = new THREE.SphereGeometry(3.52, 128, 128)
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
      emissive: 0x88ccff,
      emissiveIntensity: 0.15,
    })
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial)
    globeGroup.add(clouds)
    cloudsRef.current = clouds

    // Atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(3.6, 64, 64)
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x4a90d9,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    })
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    globeGroup.add(atmosphere)

    // Handle resize
    const handleResize = () => {
      const w = container.clientWidth || 400
      const h = container.clientHeight || 400
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Animation loop
    let autoRotationAngle = 0
    let currentScale = scale
    let currentOpacity = opacity
    let currentRotationX = rotation.x
    let currentRotationY = rotation.y

    const animate = () => {
      rafIdRef.current = requestAnimationFrame(animate)

      // Smooth interpolation
      currentScale += (scale - currentScale) * 0.08
      currentOpacity += (opacity - currentOpacity) * 0.08
      currentRotationX += (rotation.x - currentRotationX) * 0.08
      currentRotationY += (rotation.y - currentRotationY) * 0.08

      // Apply transformations
      globeGroup.scale.setScalar(currentScale)

      if (autoRotate) {
        autoRotationAngle += 0.0008
      }

      globeGroup.rotation.y = autoRotationAngle + THREE.MathUtils.degToRad(currentRotationY)
      globeGroup.rotation.x = 0.2 + THREE.MathUtils.degToRad(currentRotationX)

      // Clouds rotate slightly faster
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += 0.0003
      }

      // Update opacity
      earthMaterial.opacity = currentOpacity
      cloudsMaterial.opacity = currentOpacity * 0.25

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      window.removeEventListener('resize', handleResize)

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })

      renderer.dispose()
      renderer.forceContextLoss()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      hasInitRef.current = false
    }
  }, [scale, opacity, rotation, autoRotate])

  return null
}
