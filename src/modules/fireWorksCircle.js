import gsap from "gsap"
import { useRef, useEffect } from "react"

function FireWorksCircle({ r, cx, cy, fill }) {
  const circleRef = useRef()

  useEffect(() => {
    //console.log("FireWorksCircle renders ", Math.random() * 500000)

    gsap.to(circleRef.current, {
      // Random cx based on its current position
      cx: "+=random(-20,20)",
      // Random cy based on its current position
      cy: "+=random(-20,20)",
      // Fade out
      opacity: 0,
      // Random duration for each circle
      duration: "random(1,4)",
      // Prevent gsap from rounding the cx & cy values
      autoRound: false,
      // Once the animation is complete
      onComplete: () => {},
    })
  }, [])

  // DOM to render
  return <circle r={r} ref={circleRef} cx={cx} cy={cy} fill={fill}></circle>
}

export default FireWorksCircle
