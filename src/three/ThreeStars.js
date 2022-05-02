import { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, OrbitControls } from "@react-three/drei"
import * as random from "maath/random/dist/maath-random.esm"

export default function ThreeStars() {
  return (
    <div className="sky">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

function Stars(props) {
  const ref = useRef()
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.5 })
  )
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 2
    ref.current.rotation.y -= delta / 3
    ref.current.rotation.z -= delta / 5
  })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}
