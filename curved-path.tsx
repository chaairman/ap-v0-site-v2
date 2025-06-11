"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function CurvedPath() {
  const svgRef = useRef<SVGSVGElement>(null)
  const ballRef = useRef<SVGCircleElement>(null)
  const pathsRef = useRef<(SVGPathElement | null)[]>([])

  // Define our new color - Gold from the color scheme
  const lineColor = "#C9B99A" // Darker gold for better visibility
  const glowColor = "#DBCDAE" // Main gold color

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadGSAP = async () => {
        try {
          const gsapAll = await import("gsap/all")
          gsap.registerPlugin(gsapAll.ScrollTrigger, gsapAll.MotionPathPlugin)

          // Initialize the animation once GSAP plugins are loaded
          initAnimation()
        } catch (error) {
          console.error("Error loading GSAP plugins:", error)
        }
      }

      loadGSAP()

      function initAnimation() {
        if (!svgRef.current || !ballRef.current) return

        // Animate the paths drawing
        pathsRef.current.forEach((path, index) => {
          if (!path) return

          gsap.fromTo(
            path,
            { strokeDashoffset: 1000 },
            {
              strokeDashoffset: 0,
              duration: 2,
              ease: "power2.inOut",
              delay: 2.5 + index * 0.2, // Stagger the animations
            },
          )
        })

        // Add enhanced pulsing glow effect to the ball
        gsap.to(ballRef.current, {
          filter: `drop-shadow(0px 0px 15px ${glowColor}) drop-shadow(0px 0px 25px ${glowColor})`,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "sine.inOut",
        })

        // Animate the ball along the third path (index 2)
        if (pathsRef.current[2]) {
          gsap.to(ballRef.current, {
            scrollTrigger: {
              trigger: svgRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
            motionPath: {
              path: pathsRef.current[2],
              align: pathsRef.current[2],
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
            },
            ease: "none",
          })
        }

        // Add glow effect to all paths
        pathsRef.current.forEach((path) => {
          if (!path) return
          
          path.setAttribute('filter', 'url(#glow)')
        })
      }
    }
  }, [])

  // Add a path to the pathsRef array
  const addPathRef = (el: SVGPathElement | null) => {
    if (el && !pathsRef.current.includes(el)) {
      pathsRef.current.push(el)
    }
  }

  return (
    <svg
      ref={svgRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
      preserveAspectRatio="none"
      viewBox="0 0 1920 5000"
    >
      {/* Define the glow filter */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* First line - mostly vertical */}
      <path
        ref={(el) => addPathRef(el)}
        className="curved-path path-animation"
        d="M100,100 C100,500 120,1000 100,1500 C80,2000 100,2500 100,3000 C100,3500 120,4000 100,4800"
        stroke={lineColor}
        strokeWidth="6" /* 300% of original 2px */
        fill="none"
        opacity="0.7" /* Increased from 0.4 for better visibility */
      />

      {/* Second line - gentle curve */}
      <path
        ref={(el) => addPathRef(el)}
        className="curved-path path-animation"
        d="M200,100 C300,500 400,1000 500,1500 C600,2000 700,2500 800,3000 C900,3500 1000,4000 1100,4800"
        stroke={lineColor}
        strokeWidth="6" /* 300% of original 2px */
        fill="none"
        opacity="0.7" /* Increased from 0.4 for better visibility */
      />

      {/* Third line - medium curve with ball */}
      <path
        ref={(el) => addPathRef(el)}
        className="curved-path path-animation"
        d="M300,100 C400,500 600,1000 800,1500 C1000,2000 1200,2500 1400,3000 C1600,3500 1700,4000 1800,4800"
        stroke={lineColor}
        strokeWidth="7.5" /* 300% of original 2.5px */
        fill="none"
        opacity="0.8" /* Increased from 0.5 for better visibility */
      />

      {/* Fourth line - strong curve */}
      <path
        ref={(el) => addPathRef(el)}
        className="curved-path path-animation"
        d="M400,100 C600,300 800,600 1000,1000 C1200,1400 1400,1800 1600,2400 C1700,3000 1800,3600 1900,4800"
        stroke={lineColor}
        strokeWidth="6" /* 300% of original 2px */
        fill="none"
        opacity="0.7" /* Increased from 0.4 for better visibility */
      />

      {/* The ball that follows the third path - 200% larger and new color */}
      <circle 
        ref={ballRef} 
        className="ball" 
        cx="300" 
        cy="100" 
        r="24" /* 200% of original 12px */
        fill={glowColor} 
      />
    </svg>
  )
}
