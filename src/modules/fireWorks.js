import gsap from "gsap"
import { useRef, useEffect, useState } from "react"

function FireWorks() {
  const infiniteRef = useRef()
  const circleRef = useRef()
  const refSvg = useRef()
  const [dynamicCircles, setDynamicCircles] = useState({})
  const dynCircleRef = useRef({})
  const [count, setCount] = useState(0)
  // wait until DOM has been rendered
  useEffect(() => {
    if (count > 0) {
      //console.log("Returning")
      return
    } else {
      setCount(count + 1)
      console.log("inside useeffect")
      animateFireWorks()
    }
  })

  function createParticle(point) {
    const circle = {
      r: Math.random() * 2 + 0.2,
      cx: point.x,
      cy: point.y,
      fill: gsap.utils.random([
        "#ff0000",
        "#ff5a00",
        "#ff9a00",
        "#ffce00",
        "#ffe808",
      ]),
    }

    const key = Math.floor(Math.random() * 500000)
    setDynamicCircles((dynamicCircles) => {
      return { ...dynamicCircles, [key]: circle }
    })

    // Animate the circle
    // gsap.to(dynCircleRef[dynamicCircles.length - 1].current, {
    //   // Random cx based on its current position
    //   cx: "+=random(-10,10)",
    //   // Random cy based on its current position
    //   cy: "+=random(-10,10)",
    //   // Fade out
    //   opacity: 0,
    //   // Random duration for each circle
    //   duration: 1,
    //   // Prevent gsap from rounding the cx & cy values
    //   autoRound: false,
    //   // Once the animation is complete
    //   onComplete: () => {
    //     // Remove the SVG element from its parent
    //     //
    //     let circles = { ...dynamicCircles }
    //     delete circles[key]

    //     setDynamicCircles(circles)
    //   },
    // })
  }

  const animateFireWorks = () => {
    console.log("animateFireWorks")

    const val = { distance: 0 }
    gsap.to(val, {
      distance: infiniteRef.current.getTotalLength(),
      duration: 1,
      onUpdate: () => {
        // Query a point at the new distance value
        console.log(infiniteRef, count)
        console.log("onUpdate")

        const point = infiniteRef.current.getPointAtLength(val.distance)
        //console.log(point)
        // Create a new particle
        createParticle(point)
      },
      onComplete: () => {
        console.log("onComplete")

        // Remove the SVG element from its parent
        //
        //setDynamicCircles(dynamicCircles.slice(0, -2))
      },
    })

    infiniteRef.current.setAttribute(
      "stroke-dasharray",
      infiniteRef.current.getTotalLength()
    )
    infiniteRef.current.setAttribute(
      "stroke-dashoffset",
      infiniteRef.current.getTotalLength() * 5
    )
    gsap.to(infiniteRef.current, {
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
      <svg viewBox="-10 -10 173 61" ref={refSvg}>
        <path
          ref={infiniteRef}
          d="M153,20.89c0-45.88-74.95,0-74.95,0S.5,66.76.5,20.89s77.54,0,77.54,0S153,66.76,153,20.89Z"
          fill="none"
          stroke="#000"
          vectorEffect="non-scaling-stroke"
          className="inifinity"
        />
        <circle r="5" cx="0" cy="0" fill="purple" ref={circleRef} />
        {Object.keys(dynamicCircles).map((key) => {
          const circleProps = dynamicCircles[key]
          return (
            <circle
              r={circleProps.r}
              ref={(el) => (dynCircleRef.current[key] = el)}
              cx={circleProps.cx}
              cy={circleProps.cy}
              fill={circleProps.fill}
            ></circle>
          )
        })}
      </svg>
    </div>
  )
}

export default FireWorks
