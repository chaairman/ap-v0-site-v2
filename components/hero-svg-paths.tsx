"use client"

import { useEffect, useRef, useCallback } from "react"
import gsap from "gsap"

interface HeroSvgPathsProps {
  onBallReachContact?: (isInContact: boolean) => void
}

export function HeroSvgPaths({ onBallReachContact }: HeroSvgPathsProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const ballRef = useRef<SVGCircleElement>(null)
  const pathsRef = useRef<(SVGPathElement | null)[]>(Array(11).fill(null))
  const contextRef = useRef<gsap.Context | null>(null)
  const isInitialized = useRef(false)

  // Define gold colors
  const lineColor = "#C9B99A"
  const glowColor = "#DBCDAE"

  // Memoized callback for better performance
  const handleScrollProgress = useCallback((progress: number) => {
    if (onBallReachContact) {
      onBallReachContact(progress >= 0.75)
    }
  }, [onBallReachContact])

  useEffect(() => {
    if (typeof window === "undefined" || isInitialized.current) return

    const init = async () => {
      try {
        const { ScrollTrigger, MotionPathPlugin } = await import("gsap/all")
        gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

        // Small delay to ensure DOM is ready
        setTimeout(() => {
          if (!svgRef.current || !ballRef.current) return

          // Create context for cleanup
          contextRef.current = gsap.context(() => {
            setupAnimations()
          }, svgRef)

          isInitialized.current = true
        }, 150)

      } catch (error) {
        console.error("GSAP initialization error:", error)
      }
    }

    const setupAnimations = () => {
      // Line drawing animation
      const timeline = gsap.timeline({ 
        delay: 2.5,
        onComplete: () => {
          // Remove stroke-dash properties after completion to prevent conflicts
          pathsRef.current.forEach(path => {
            if (path) {
              path.style.strokeDasharray = 'none'
              path.style.strokeDashoffset = '0'
            }
          })
        }
      })

      // Setup each path
      pathsRef.current.forEach((path, index) => {
        if (!path) return

        const length = path.getTotalLength()
        
        // Initial setup
        gsap.set(path, { 
          strokeDasharray: length, 
          strokeDashoffset: length,
          opacity: index < 7 ? 0.6 : 0.7,
          visibility: 'visible'
        })

        // Add to timeline
        timeline.to(path, {
          strokeDashoffset: 0,
          duration: 1.3,
          ease: "power2.out"
        }, index * 0.07)
      })

      // Ball glow animation
      gsap.to(ballRef.current, {
        filter: `drop-shadow(0px 0px 8px ${glowColor}) drop-shadow(0px 0px 12px ${glowColor})`,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut"
      })

      // Ball motion path
      const motionPath = pathsRef.current[10]
      if (motionPath && ballRef.current) {
        // Clear any existing positioning
        gsap.set(ballRef.current, {
          attr: { cx: "", cy: "" },
          x: 0,
          y: 0
        })

        // Motion path animation
        gsap.to(ballRef.current, {
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4, // Smoother scrubbing
            invalidateOnRefresh: false,
            onUpdate: (self) => {
              // Throttle the callback
              if (self.progress !== undefined) {
                handleScrollProgress(self.progress)
              }
            }
          },
          motionPath: {
            path: motionPath,
            align: motionPath,
            alignOrigin: [0.5, 0.5],
            autoRotate: false
          },
          ease: "none"
        })
      }
    }

    init()

    return () => {
      if (contextRef.current) {
        contextRef.current.revert()
        contextRef.current = null
      }
      isInitialized.current = false
    }
  }, [handleScrollProgress])

  const addPathRef = useCallback((el: SVGPathElement | null, index: number) => {
    if (el) {
      pathsRef.current[index] = el
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      preserveAspectRatio="xMaxYMid meet"
      viewBox="0 0 1920 1080"
      style={{ height: '100vh' }}
    >
      <defs>
        <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* All paths with consistent setup */}
      <path
        ref={(el) => addPathRef(el, 0)}
        d="M1494 -1V1103"
        stroke={lineColor}
        strokeWidth="2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        filter="url(#heroGlow)"
        style={{ visibility: 'hidden' }}
      />

      <path
        ref={(el) => addPathRef(el, 1)}
        d="M1612.68 -1.14589C1612.68 -1.14589 1494 -1.1459 1494 1102.63"
        stroke={lineColor}
        strokeWidth="2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        filter="url(#heroGlow)"
        style={{ visibility: 'hidden' }}
      />

      <path
        ref={(el) => addPathRef(el, 2)}
        d="M1526.22 -1.14589C1526.22 -1.14589 1494 -1.14587 1494 1102.63"
        stroke={lineColor}
        strokeWidth="2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        filter="url(#heroGlow)"
        style={{ visibility: 'hidden' }}
      />

      <path
        ref={(el) => addPathRef(el, 3)}
        d="M1872.06 -1.14588C1872.06 -1.14588 1494 -1.14591 1494 1115.67"
        stroke={lineColor}
        strokeWidth="2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        filter="url(#heroGlow)"
        style={{ visibility: 'hidden' }}
      />

      <path
        ref={(el) => addPathRef(el, 4)}
        d="M1777.74 -1.1459C1777.74 -1.1459 1494 -1.14589 1494 1102.63"
        stroke={lineColor}
        strokeWidth="2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        filter="url(#heroGlow)"
        style={{ visibility: 'hidden' }}
      />

      <path
        ref={(el) => addPathRef(el, 5)}
        d="M1699.14 -1.14589C1699.14 -1.14589 1494 -1.14585 1494 1102.63"
        stroke={lineColor}
        strokeWidth="2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        filter="url(#heroGlow)"
        style={{ visibility: 'hidden' }}
      />

      <path
        ref={(el) => addPathRef(el, 6)}
        d="M1565.52 -1.14589C1565.52 -1.14589 1494 -1.14592 1494 1102.63"
        stroke={lineColor}
        strokeWidth="2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        filter="url(#heroGlow)"
        style={{ visibility: 'hidden' }}
      />

      <path
        ref={(el) => addPathRef(el, 7)}
        d="M1920 -1.14588C1753.64 437.864 1494 -1.14591 1494 1123.01"
        stroke={lineColor}
        strokeWidth="2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        filter="url(#heroGlow)"
        style={{ visibility: 'hidden' }}
      />

      <path
        ref={(el) => addPathRef(el, 8)}
        d="M1826.47 -1.14589C1696.63 434.999 1494 7.41364 1494 1115.67"
        stroke={lineColor}
        strokeWidth="2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        filter="url(#heroGlow)"
        style={{ visibility: 'hidden' }}
      />

      <path
        ref={(el) => addPathRef(el, 9)}
        d="M1738.44 -1.14589C1642.98 434.999 1494 -1.14593 1494 1115.67"
        stroke={lineColor}
        strokeWidth="2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        filter="url(#heroGlow)"
        style={{ visibility: 'hidden' }}
      />

      <path
        ref={(el) => addPathRef(el, 10)}
        d="M1659.84 -1.14589C1595.08 429.906 1494 29.0164 1494 1102.63"
        stroke={lineColor}
        strokeWidth="2.5"
        fill="none"
        vectorEffect="non-scaling-stroke"
        filter="url(#heroGlow)"
        style={{ visibility: 'hidden' }}
      />

      <circle 
        ref={ballRef} 
        r="5"
        fill={glowColor}
        vectorEffect="non-scaling-stroke"
        style={{ transformOrigin: 'center' }}
      />
    </svg>
  )
} 