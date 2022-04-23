import { Canvas } from "@react-three/fiber"
import { Html, useGLTF } from "@react-three/drei"
import { Section } from "Utility/section"
import { Suspense, useEffect } from "react"

const Model = () => {
  const gltf = useGLTF("/3d/armchairYellow.gltf")
  return <primitive object={gltf.scene} dispose={null} />
}

const HTMLContent = ({ bgColor }) => {
  useEffect(() => {
    document.body.style.background = bgColor
  }, [])
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, 250, 0]}>
        <mesh>
          <Model position={[0, 0, 0]} />
        </mesh>
      </group>
    </Section>
  )
}

export default function ModelChair() {
  return (
    <div className="model-chair">
      {/* TODO solve color issue */}
      <Canvas camera={{ position: [0, 0, 120], fov: 70 }}>
        <Suspense fallback={null}>
          <HTMLContent bgColor="#00FF00" />
        </Suspense>
      </Canvas>
    </div>
  )
}
