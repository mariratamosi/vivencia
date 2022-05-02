import { Canvas, useFrame } from "@react-three/fiber"
import { Html, useGLTF, useProgress } from "@react-three/drei"
import { a, useTransition } from "react-spring"
import { Section } from "Utility/section"
import React, { Suspense, useEffect, useRef, useState } from "react"
import state from "Utility/state"
import { useInView } from "react-intersection-observer"

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
  modelArea,
}) => {
  const ref = useRef()
  const [refItem, inView] = useInView({ threshold: 0 })

  useFrame(() => {
    ref.current.rotation.y += 0.01
    // ref.current.rotation.x += 0.001
    // ref.current.rotation.z += 0.001
  })

  useEffect(() => {
    inView && (modelArea.current.style.background = bgColor)
  }, [inView])
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <mesh ref={ref} position={[0, -35, 0]}>
          <Model modelPath={modelPath} />
        </mesh>
        <Html portal={domContent} fullscreen className="title">
          <div ref={refItem}>{children}</div>
        </Html>
      </group>
    </Section>
  )
}

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return (
    <Html center>
      <div className="loading-spinner"></div>
    </Html>
  )
}

export default function ModelChair() {
  const domContent = useRef()
  const scrollArea = useRef()
  const modelArea = useRef()
  const [events, setEvents] = useState()

  const onScroll = (e) => (state.top.current = e.target.scrollTop)

  useEffect(() => void onScroll({ target: scrollArea.current }), [])

  return (
    <div className="model-chair" ref={modelArea}>
      {/* TODO solve color issue */}
      <Canvas camera={{ position: [0, 0, 120], fov: 70 }}>
        <Lights />
        <Suspense fallback={<Loader />}>
          <HTMLContent
            bgColor="yellow"
            modelPath="/3d/armchairYellow.gltf"
            position={250}
            domContent={domContent}
            modelArea={modelArea}
          >
            <div>Yellow</div>
          </HTMLContent>
          <HTMLContent
            bgColor="#f15900"
            modelPath="/3d/armchairGreen.gltf"
            position={0}
            domContent={domContent}
            modelArea={modelArea}
          >
            <div>Green</div>
          </HTMLContent>
          <HTMLContent
            bgColor="gray"
            modelPath="/3d/armchairGray.gltf"
            position={-250}
            domContent={domContent}
            modelArea={modelArea}
          >
            <div>Gray</div>
          </HTMLContent>
        </Suspense>
      </Canvas>
      <div
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        {...events}
      >
        {/* html content here */}
        <div style={{ position: "sticky", top: 0 }} ref={domContent}></div>

        {/* height related */}
        <div style={{ height: `${state.sections * 100}vh` }}></div>
      </div>
    </div>
  )
}
