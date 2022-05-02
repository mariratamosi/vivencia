import { OrbitControls } from "@react-three/drei"
import React, { useRef, useMemo } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import * as THREE from "three"

function Dots() {
  const dotsRef = useRef()
  const { vec, transform, positions } = useMemo(() => {
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
    return { vec, transform, positions }
  }, [])

  useFrame(({ clock }) => {
    const scale = 1 + Math.sin(clock.elapsedTime) * 0.3
    for (let i = 0; i < 10000; ++i) {
      vec.copy(positions[i]).multiplyScalar(scale)
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

export default function BreathingDots() {
  return (
    <Canvas orthographic camera={{ zoom: 20 }}>
      <color attach="background" args={["black"]} />
      <Dots />
      {/* <OrbitControls /> */}
    </Canvas>
  )
}
