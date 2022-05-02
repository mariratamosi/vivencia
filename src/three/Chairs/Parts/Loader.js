import { Html } from "@react-three/drei"

function Loader() {
  // const { active, progress, errors, item, loaded, total } = useProgress()
  return (
    <Html center>
      <div className="loading-spinner"></div>
    </Html>
  )
}

export default Loader
