import ReactDOM from "react-dom"
import { Canvas } from "@react-three/fiber"

function BasicThreeComp() {
  return (
    <div id="canvas-container">
      <Canvas>
        <mesh>
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  )
}

export default BasicThreeComp
