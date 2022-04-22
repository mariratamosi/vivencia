import gsap from "gsap"
import { useRef, useEffect } from "react"

function InfiniteDot() {
  const infiniteRef = useRef()
  const circleRef = useRef()

  // wait until DOM has been rendered
  useEffect(() => {
    console.log("InfiniteDot useEffect")
    const dotAnimation = animate()

    return () => {
      console.log("InfiniteDot cleanup", dotAnimation)
      dotAnimation.kill()
    }
  }, [])

  const animate = () => {
    // Create an object that gsap can animate
    const val = { distance: 0 }
    // Create a tween
    const dotAnimationLocal = gsap.to(val, {
      // Animate from distance 0 to the total distance
      distance: infiniteRef.current.getTotalLength(),
      // Loop the animation
      repeat: -1,
      // Make the animation lasts 5 seconds
      duration: 10,
      // Function call on each frame of the animation
      onUpdate: () => {
        // Query a point at the new distance value

        if (!infiniteRef || !infiniteRef.current) return

        const point = infiniteRef.current.getPointAtLength(val.distance)
        // Update the circle coordinates
        circleRef.current.setAttribute("cy", point.y)
        circleRef.current.setAttribute("cx", point.x)
      },
    })

    return dotAnimationLocal
  }

  // DOM to render
  return (
    <div className="box">
      <svg viewBox="-10 -10 173 61">
        <path
          ref={infiniteRef}
          d="M153,20.89c0-45.88-74.95,0-74.95,0S.5,66.76.5,20.89s77.54,0,77.54,0S153,66.76,153,20.89Z"
          fill="none"
          stroke="#000"
          vectorEffect="non-scaling-stroke"
          className="inifinity"
        />
        <circle r="5" cx="0" cy="0" fill="purple" ref={circleRef} />
      </svg>
    </div>
  )
}

export default InfiniteDot
