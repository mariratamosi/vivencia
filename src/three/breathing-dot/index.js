import { OrbitControls } from "@react-three/drei"
import React, { useRef, useLayoutEffect } from "react"
import { Canvas } from "react-three-fiber"
import * as THREE from "three"

function Dots() {
  const dotsRef = useRef()
  useLayoutEffect(() => {
    // THREE.Matrix4 defaults to an identity matrix
    const transform = new THREE.Matrix4()

    // Apply the transform to the instance at index 0
    //dotsRef.current.setMatrixAt(0, transform)

    for (let i = 0; i < 10000; ++i) {
      const x = (i % 100) - 50
      const y = Math.floor(i / 100) - 50
      transform.setPosition(x, y, 0)
      dotsRef.current.setMatrixAt(i, transform)
    }
  }, [])
  return (
    <instancedMesh args={[null, null, 10000]} ref={dotsRef}>
      <circleBufferGeometry args={[0.15]} />
      <meshBasicMaterial />
    </instancedMesh>
  )
}

export default function BreathingDots() {
  return (
    <Canvas orthographic camera={{ zoom: 12 }}>
      <color attach="background" args={["black"]} />
      <Dots />
      {/* <OrbitControls /> */}
    </Canvas>
  )
}
