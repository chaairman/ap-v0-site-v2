"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function OldHeroSvgPaths() {
  const svgRef = useRef<SVGSVGElement>(null)
  const ballRef = useRef<SVGCircleElement>(null)
  const pathsRef = useRef<(SVGPathElement | null)[]>([null, null, null, null, null]) // Pre-allocate array with 5 slots

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

        // Wait a bit to ensure all paths are rendered and refs are set
        setTimeout(() => {
          // Create GSAP context for proper cleanup
          const gsapContext = gsap.context(() => {
            // Create timeline for line drawing animation
            const tl = gsap.timeline({ delay: 2.5 }) // Delay to wait for loading panel to finish

            // Animate all paths drawing from top to bottom
            pathsRef.current.forEach((path, index) => {
              if (!path) return
              const len = path.getTotalLength()
              
              // Set initial state - lines are hidden
              gsap.set(path, { 
                strokeDasharray: len, 
                strokeDashoffset: len, 
                opacity: 0.7, 
                filter: 'url(#heroGlow)' 
              })

              // Add each path to the timeline with a slight stagger
              tl.to(path, {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: "power2.out",
              }, index * 0.1) // Stagger each path by 0.1 seconds
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
            const thirdPath = pathsRef.current[2]
            if (thirdPath && ballRef.current) {
              console.log("Setting up ball animation with path:", thirdPath)
              
              // First, remove any SVG positioning attributes and set initial position
              gsap.set(ballRef.current, {
                attr: { cx: "", cy: "" }, // Remove SVG positioning attributes
                x: 0, // Will be overridden by motionPath
                y: 0  // Will be overridden by motionPath
              })
              
              // Create the scroll-triggered motion path animation
              gsap.to(ballRef.current, {
                scrollTrigger: {
                  trigger: document.body,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 1, // Smooth scrubbing - takes 1 second to catch up
                  onUpdate: (self) => {
                    console.log("Scroll progress:", self.progress)
                  }
                },
                motionPath: {
                  path: thirdPath,
                  align: thirdPath,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false,
                },
                ease: "none", // Linear progression with scroll
              })
            } else {
              console.error("Third path not found for ball animation")
            }
          }, svgRef)

          // Return cleanup function
          return () => {
            gsapContext?.revert()
          }
        }, 100) // Small delay to ensure DOM is ready
      }
    }
  }, [])

  // Add a path to the pathsRef array at specific index
  const addPathRef = (el: SVGPathElement | null, index: number) => {
    if (el) {
      pathsRef.current[index] = el
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
          ref={(el) => addPathRef(el, 0)}
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
          ref={(el) => addPathRef(el, 1)}
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
          ref={(el) => addPathRef(el, 2)}
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
          ref={(el) => addPathRef(el, 3)}
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
          ref={(el) => addPathRef(el, 4)}
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
          r="5"
          fill={glowColor}
          vectorEffect="non-scaling-stroke"
          style={{ 
            transformOrigin: 'center',
            vectorEffect: 'non-scaling-stroke'
          }}
        />
      </svg>
  )
} 