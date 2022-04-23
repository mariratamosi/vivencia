import { Canvas } from "@react-three/fiber"
import { Html, useGLTF } from "@react-three/drei"
import { Section } from "Utility/section"
import { Suspense, useEffect } from "react"

const Model = () => {
  const gltf = useGLTF("/3d/armchairYellow.gltf")
  return <primitive object={gltf.scene} dispose={null} />
}

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5}></ambientLight>
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={1} />
      <spotLight intensity={1} position={[1000, 0, 0]} />
    </>
  )
}

const HTMLContent = ({ bgColor }) => {
  useEffect(() => {
    document.body.style.background = bgColor
  }, [])
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, 250, 0]}>
        <mesh>
          <Model position={[0, -35, 0]} />
        </mesh>
      </group>
    </Section>
  )
}

export default function ModelChair() {
  return (
    <div className="model-chair">
      {/* TODO solve color issue */}
      <Canvas camera={{ position: [0, 0, 170], fov: 60 }}>
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent bgColor="#f15946" />
        </Suspense>
      </Canvas>
    </div>
  )
}
