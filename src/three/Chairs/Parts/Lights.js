import React from "react"

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

export default Lights
