import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { Section } from "Utility/section"
import React, { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import Model from "./Model"

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

export default HTMLContent
