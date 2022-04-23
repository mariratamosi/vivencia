import { Canvas } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { Section } from "Utility/section"

const HTMLContent = () => {
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, 250, 0]}>
        <Html>
          <div className="html-container">Hellooooooo</div>
        </Html>
      </group>
    </Section>
  )
}

export default function ModelChair() {
  return (
    <div className="model-chair">
      {/* TODO solve color issue */}
      <Canvas camera={{ position: [0, 0, 120], fov: 70 }}>
        <HTMLContent />
      </Canvas>
    </div>
  )
}
