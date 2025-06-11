"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function HeroSvgPaths() {
  const svgRef = useRef<SVGSVGElement>(null)
  const ballRef = useRef<SVGCircleElement>(null)
  const pathsRef = useRef<(SVGPathElement | null)[]>([])

  // Define gold colors from your design system
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

        // Animate the paths with smooth opacity fade-in
        pathsRef.current.forEach((path, index) => {
          if (!path) return

          // Start with opacity 0 for smooth fade-in
          path.style.opacity = '0'

          gsap.to(path, {
            opacity: 0.7, // Match the opacity from the SVG
            duration: 1.5,
            ease: "power2.out",
            delay: 0.3 + index * 0.2, // Stagger the animations
          })
        })

        // Add enhanced pulsing glow effect to the ball
        gsap.to(ballRef.current, {
          filter: `drop-shadow(0px 0px 8px ${glowColor}) drop-shadow(0px 0px 12px ${glowColor})`,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "sine.inOut",
        })

        // Animate the ball along the middle path (index 2) based on scroll
        // Using document.body as trigger to track entire page scroll
        if (pathsRef.current[2]) {
          gsap.to(ballRef.current, {
            scrollTrigger: {
              trigger: document.body,
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
          path.setAttribute('filter', 'url(#heroGlow)')
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      preserveAspectRatio="none"
      viewBox="0 0 1980 100"
      style={{ height: '100vh' }}
    >
        {/* Define the glow filter */}
        <defs>
          <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Path 1 - Extended to full height */}
        <path
          ref={(el) => addPathRef(el)}
          d="M1607.23 0C1607.23 0 1691.97 15 1644.62 27C1597.27 39 1520.01 51 1577.33 61C1634.65 71 1634.65 100 1634.65 100"
          stroke={lineColor}
          strokeWidth="2"
          fill="none"
          opacity="0.7"
          vectorEffect="non-scaling-stroke"
        />

        {/* Path 2 - Extended to full height */}
        <path
          ref={(el) => addPathRef(el)}
          d="M1544.93 0C1544.93 0 1591.3 15 1564.84 23C1538.38 31 1523.4 33 1490.19 41C1456.98 49 1502.42 57 1490.19 65C1477.95 73 1423 100 1423 100"
          stroke={lineColor}
          strokeWidth="2"
          fill="none"
          opacity="0.7"
          vectorEffect="non-scaling-stroke"
        />

        {/* Path 3 - Main path for ball animation - Extended to full height */}
        <path
          ref={(el) => addPathRef(el)}
          d="M1565.29 0C1565.29 0 1625.57 10 1602.9 27C1580.23 44 1429.52 44 1535.21 61C1640.9 78 1592.87 100 1592.87 100"
          stroke={lineColor}
          strokeWidth="2.5"
          fill="none"
          opacity="0.8"
          vectorEffect="non-scaling-stroke"
        />

        {/* Path 4 - Extended to full height */}
        <path
          ref={(el) => addPathRef(el)}
          d="M1734.36 0C1734.36 0 1937.88 12 1771.75 27C1605.63 42 1518.6 49 1704.45 61C1890.3 73 1761.78 100 1761.78 100"
          stroke={lineColor}
          strokeWidth="2"
          fill="none"
          opacity="0.7"
          vectorEffect="non-scaling-stroke"
        />

        {/* Path 5 - Extended to full height */}
        <path
          ref={(el) => addPathRef(el)}
          d="M1798.77 0C1798.77 0 1913.49 16 1836.3 27C1759.12 38 1656.24 45 1768.74 61C1881.24 77 1826.29 100 1826.29 100"
          stroke={lineColor}
          strokeWidth="2"
          fill="none"
          opacity="0.7"
          vectorEffect="non-scaling-stroke"
        />

        {/* The ball that follows the third path */}
        <circle 
          ref={ballRef} 
          className="ball" 
          cx="1565" 
          cy="0" 
          r="2"
          fill={glowColor}
          vectorEffect="non-scaling-stroke"
          style={{ 
            transformOrigin: 'center',
            transform: 'scale(1, 1)',
            vectorEffect: 'non-scaling-stroke'
          }}
        />
      </svg>
  )
} 