"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AnimatedScrollPath() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !pathRef.current || !svgRef.current) return;

    const pathElement = pathRef.current;
    const pathLength = pathElement.getTotalLength();

    // Initialize the path to be invisible (fully offset)
    gsap.set(pathElement, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Create the scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main", // Target the main content area
        start: "top top",
        end: "bottom bottom",
        scrub: true, // Directly tie animation to scroll position
        markers: false, // Set to true for debugging
      },
    });

    // Animate the stroke-dashoffset to reveal the path
    tl.to(pathElement, {
      strokeDashoffset: 0,
      ease: "none",
      duration: 1,
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-10 pointer-events-none"
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <svg
        ref={svgRef}
        width="2625"
        height="5886"
        viewBox="0 0 2625 5886"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{
          overflow: "visible",
          preserveAspectRatio: "xMidYMin meet",
        }}
      >
        <defs>
          <filter
            id="filter0_d_3_7"
            x="0"
            y="0"
            width="2625"
            height="5885.5"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_3_7"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_3_7"
              result="shape"
            />
          </filter>
        </defs>
        <g id="Vector 1" filter="url(#filter0_d_3_7)">
          <path
            ref={pathRef}
            id="animatedScrollPath"
            d="M379 0V463.5C379 518.728 423.772 563.5 479 563.5H2126C2181.23 563.5 2226 608.272 2226 663.5V1223.5C2226 1278.73 2181.23 1323.5 2126 1323.5H479C423.772 1323.5 379 1368.27 379 1423.5V1559C379 1614.23 423.772 1659 479 1659H2506C2561.23 1659 2606 1703.77 2606 1759V2271C2606 2326.23 2561.23 2371 2506 2371H119C63.7715 2371 19 2415.77 19 2471V3626.5C19 3681.73 63.7715 3726.5 119 3726.5H1874.5C1929.73 3726.5 1974.5 3771.27 1974.5 3826.5V3842C1974.5 3897.23 1929.73 3942 1874.5 3942H1838.5C1783.27 3942 1738.5 3986.77 1738.5 4042V4486C1738.5 4541.23 1693.73 4586 1638.5 4586H119C63.7715 4586 19 4630.77 19 4686V5309.5C19 5364.73 63.7715 5409.5 119 5409.5H2198C2253.23 5409.5 2298 5454.27 2298 5509.5V5877.5"
            stroke="#D4C2A3"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
} 