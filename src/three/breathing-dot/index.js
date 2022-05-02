import { OrbitControls } from "@react-three/drei"
import React, { useRef, useMemo } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import * as THREE from "three"

function Dots() {
  const dotsRef = useRef()
  const { vec, transform, positions, distances } = useMemo(() => {
    const vec = new THREE.Vector3()
    const transform = new THREE.Matrix4()
    const positions = [...Array(10000)].map((_, i) => {
      const position = new THREE.Vector3()
      position.x = (i % 100) - 50
      position.y = Math.floor(i / 100) - 50
      position.y += (i % 2) * 0.5
      position.x += Math.random() * 0.3
      position.y += Math.random() * 0.3
      return position
    })
    const distances = positions.map((pos) => pos.length())
    return { vec, transform, positions, distances }
  }, [])

  useFrame(({ clock }) => {
    const scale = roundedSquareWave(clock.elapsedTime, 0.001, 1, 0.5)
    for (let i = 0; i < 10000; ++i) {
      const dist = distances[i]

      // Distance affects the wave phase
      const t = clock.elapsedTime - dist / 25

      // Oscillates between -0.4 and +0.4 with period of 3.8 seconds
      const wave = roundedSquareWave(t, 0.15 + (0.2 * dist) / 72, 0.4, 1 / 3.8)

      vec.copy(positions[i]).multiplyScalar(wave + 1.3)
      transform.setPosition(vec)
      dotsRef.current.setMatrixAt(i, transform)
    }
    dotsRef.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh args={[null, null, 10000]} ref={dotsRef}>
      <circleBufferGeometry args={[0.15]} />
      <meshBasicMaterial />
    </instancedMesh>
  )
}

const roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)
}

export default function BreathingDots() {
  return (
    <Canvas orthographic camera={{ zoom: 20 }}>
      <color attach="background" args={["black"]} />
      <Dots />
      {/* <OrbitControls /> */}
    </Canvas>
  )
}
