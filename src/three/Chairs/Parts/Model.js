import { useGLTF } from "@react-three/drei"

const Model = ({ modelPath }) => {
  const gltf = useGLTF(modelPath)
  return <primitive object={gltf.scene} dispose={null} />
}

export default Model
