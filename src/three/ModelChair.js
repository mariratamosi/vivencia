import { Canvas, useFrame } from "@react-three/fiber"
import { Html, useGLTF } from "@react-three/drei"
import { Section } from "Utility/section"
import { Suspense, useEffect, useRef } from "react"
import state from "Utility/state"

const Model = ({ modelPath }) => {
  const gltf = useGLTF(modelPath)
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

const HTMLContent = ({
  bgColor,
  children,
  modelPath,
  position,
  domContent,
}) => {
  const ref = useRef()

  useFrame(() => {
    ref.current.rotation.y += 0.01
    // ref.current.rotation.x += 0.001
    // ref.current.rotation.z += 0.001
  })

  useEffect(() => {
    document.body.style.background = bgColor
  }, [])
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <mesh ref={ref} position={[0, -35, 0]}>
          <Model modelPath={modelPath} />
        </mesh>
        <Html portal={domContent} fullscreen className="title">
          {children}
        </Html>
      </group>
    </Section>
  )
}

export default function ModelChair() {
  const domContent = useRef()

  return (
    <div className="model-chair">
      {/* TODO solve color issue */}
      <Canvas camera={{ position: [0, 0, 120], fov: 70 }}>
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            bgColor="#f15946"
            modelPath="/3d/armchairYellow.gltf"
            position={250}
            domContent={domContent}
          >
            <div>Yellow</div>
          </HTMLContent>
          <HTMLContent
            bgColor="#f15900"
            modelPath="/3d/armchairGreen.gltf"
            position={0}
            domContent={domContent}
          >
            <div>Green</div>
          </HTMLContent>
        </Suspense>
      </Canvas>
      <div className="scrollArea">
        {/* html content here */}
        <div style={{ position: "sticky", top: 0 }} ref={domContent}></div>

        {/* height related */}
        <div style={{ height: `${state.pages * 100}vh` }}></div>
      </div>
    </div>
  )
}
