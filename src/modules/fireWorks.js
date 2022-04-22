import gsap from "gsap"
import { useRef, useEffect, useState } from "react"

function FireWorks() {
  const infiniteRef = useRef()
  const [dynamicCircles, setDynamicCircles] = useState({})
  const dynCircleRef = useRef({})
  const bombLength = { distance: 0 }
  let lineAnimation = null
  let pointDetectAnimation = null
  // wait until DOM has been rendered
  useEffect(() => {
    animateFireWorks()

    console.log("FireWorks renders ")

    // let circles = { ...dynamicCircles }
    // Object.keys(circles).map((key) => {
    //   const circleProps = circles[key]
    //   if (!circleProps.animate) {
    //     circleProps.animate = true
    //     setDynamicCircles(circles)

    //     gsap.to(dynCircleRef.current[key], {
    //       // Random cx based on its current position
    //       cx: "+=random(-20,20)",
    //       // Random cy based on its current position
    //       cy: "+=random(-20,20)",
    //       // Fade out
    //       opacity: 0,
    //       // Random duration for each circle
    //       duration: "random(1,4)",
    //       // Prevent gsap from rounding the cx & cy values
    //       autoRound: false,
    //       // Once the animation is complete
    //       onComplete: () => {
    //         setDynamicCircles((circles) => {
    //           const newData = { ...circles }
    //           delete newData[key]
    //           return newData
    //         })
    //       },
    //     })
    // }
    //})
    return () => {
      console.log("FireWorks cleanup")
      if (pointDetectAnimation) {
        pointDetectAnimation.kill()
      }
      if (lineAnimation) {
        lineAnimation.kill()
      }
    }
  }, [])

  function createParticle(point) {
    const circle = {
      r: Math.random() * 3 + 0.2,
      cx: point.x,
      cy: point.y,
      fill: gsap.utils.random([
        "#ff0000",
        "#ff5a00",
        "#ff9a00",
        "#ffce00",
        "#ffe808",
      ]),
      animate: false,
    }

    const key = Math.floor(Math.random() * 500000)
    setDynamicCircles((dynamicCircles) => {
      return { ...dynamicCircles, [key]: circle }
    })
  }

  const animateFireWorks = () => {
    pointDetectAnimation = gsap.to(bombLength, {
      distance: infiniteRef.current.getTotalLength(),
      duration: 5,
      repeatDelay: 1,
      repeat: -1,
      onUpdate: () => {
        // Query a point at the new distance value
        if (infiniteRef === null || infiniteRef.current === null) return
        const point = infiniteRef.current.getPointAtLength(bombLength.distance)

        // Create a new particle
        createParticle(point)
      },
    })

    infiniteRef.current.setAttribute(
      "stroke-dasharray",
      infiniteRef.current.getTotalLength()
    )
    infiniteRef.current.setAttribute(
      "stroke-dashoffset",
      infiniteRef.current.getTotalLength() * 2
    )
    lineAnimation = gsap.to(infiniteRef.current, {
      strokeDashoffset: infiniteRef.current.getTotalLength(),
      duration: 5,
      repeat: -1,
      // Wait 1sec before repeating
      repeatDelay: 1,
    })
  }

  // DOM to render
  return (
    <div className="box fireworks">
      <svg viewBox="-10 -10 361 220">
        <path
          d="M96.5,43.2a8.21,8.21,0,0,0-11.24,3L78.79,57.42h0A72.21,72.21,0,1,0,131.59,89l7-12a8.21,8.21,0,0,0-3-11.24Z"
          fill="#000"
        />
        <path
          d="M260,26.88c-15.68-28.38,50.4-35.16,71.16-14s8.47,50.84-38.12,50.84S210,22.67,184.63,21.38s-71.3,34.28-71.3,34.28"
          transform="translate(0 0)"
          fill="none"
          stroke="#231f20"
          ref={infiniteRef}
        />
        {Object.keys(dynamicCircles).map((key) => {
          const circleProps = dynamicCircles[key]
          return (
            <circle
              r={circleProps.r}
              ref={(el) => (dynCircleRef.current[key] = el)}
              cx={circleProps.cx}
              cy={circleProps.cy}
              fill={circleProps.fill}
              key={key}
            ></circle>
          )
        })}
      </svg>
    </div>
  )
}

export default FireWorks
