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
      preserveAspectRatio="xMaxYMid meet"
      viewBox="0 0 1920 1080"
      style={{ height: '100vh' }}
    >
        {/* Define the glow filter */}
        <defs>
          <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Path 1 */}
        <path
          ref={(el) => addPathRef(el)}
          d="M1607.23 0C1607.23 0 1691.97 186.253 1644.62 339.265C1597.27 492.277 1520.01 636.847 1577.33 760.84C1634.65 884.833 1634.65 1079 1634.65 1079"
          stroke={lineColor}
          strokeWidth="2"
          fill="none"
          opacity="0.7"
          vectorEffect="non-scaling-stroke"
          filter="url(#heroGlow)"
        />

        {/* Path 2 */}
        <path
          ref={(el) => addPathRef(el)}
          d="M1544.93 0C1544.93 0 1591.3 187.599 1564.84 292.663C1538.38 397.728 1523.4 413.595 1490.19 514.084C1456.98 614.574 1502.42 714.006 1490.19 806.922C1477.95 899.839 1423 1080 1423 1080"
          stroke={lineColor}
          strokeWidth="2"
          fill="none"
          opacity="0.7"
          vectorEffect="non-scaling-stroke"
          filter="url(#heroGlow)"
        />

        {/* Path 3 - Main path for ball animation */}
        <path
          ref={(el) => addPathRef(el)}
          d="M1565.29 0C1565.29 0 1625.57 124.108 1602.9 339.579C1580.23 555.051 1429.52 553.995 1535.21 761.545C1640.9 969.095 1592.87 1080 1592.87 1080"
          stroke={lineColor}
          strokeWidth="2.5"
          fill="none"
          opacity="0.8"
          vectorEffect="non-scaling-stroke"
          filter="url(#heroGlow)"
        />

        {/* Path 4 */}
        <path
          ref={(el) => addPathRef(el)}
          d="M1734.36 0C1734.36 0 1937.88 152.626 1771.75 339.579C1605.63 526.533 1518.6 615.257 1704.45 761.545C1890.3 907.834 1761.78 1080 1761.78 1080"
          stroke={lineColor}
          strokeWidth="2"
          fill="none"
          opacity="0.7"
          vectorEffect="non-scaling-stroke"
          filter="url(#heroGlow)"
        />

        {/* Path 5 */}
        <path
          ref={(el) => addPathRef(el)}
          d="M1798.77 0C1798.77 0 1913.49 202.797 1836.3 339.579C1759.12 476.362 1656.24 566.142 1768.74 761.545C1881.24 956.949 1826.29 1080 1826.29 1080"
          stroke={lineColor}
          strokeWidth="2"
          fill="none"
          opacity="0.7"
          vectorEffect="non-scaling-stroke"
          filter="url(#heroGlow)"
        />

        {/* The ball that follows the third path */}
        <circle 
          ref={ballRef} 
          className="ball" 
          cx="1565.29" 
          cy="0" 
          r="5"
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