import { Canvas } from "@react-three/fiber"
import React, { Suspense, useEffect, useRef, useState } from "react"
import state from "Utility/state"
import Loader from "./Parts/Loader"
import HTMLContent from "./Parts/HtmlContent"
import Lights from "./Parts/Lights"

export default function ModelChair() {
  const domContent = useRef()
  const scrollArea = useRef()
  const modelArea = useRef()
  const [events, setEvents] = useState()

  const onScroll = (e) => (state.top.current = e.target.scrollTop)

  useEffect(() => void onScroll({ target: scrollArea.current }), [])

  return (
    <div className="model-chair" ref={modelArea}>
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
