## Implementation Plan: Revamp Hero SVG Lines & Animation (Phased Approach)

**Project Goal:** To correctly implement the decorative SVG lines on the website's hero section (and potentially extending further down the page via scroll animation). This involves fixing scaling/positioning issues, ensuring responsiveness, and setting up for scroll-driven animations.

**Overall Instruction for Agent:** After completing each Phase, please **PAUSE** and wait for me to review the changes and confirm before proceeding to the next Phase. Please also ask me if you need any clarification about anything. Also, review the overall implementation and check to see if you think it's good. If not, come back to me and we can change something

**Prerequisites:**
*   I have placed a new SVG file named `new-hero-paths.svg` in the **project's root directory**. This file contains the five updated decorative line paths designed on a 1980x1080 canvas.

---

**Phase 1: SVG Structure and Initial Styling (`components/hero-svg-paths.tsx`)**

**Goal:** Update the `HeroSvgPaths.tsx` component to use the new SVG path data from `new-hero-paths.svg` and correct its internal scaling.

1.  **Modify `HeroSvgPaths.tsx` Component:**
    *   **Update SVG `viewBox`:** Change the main `<svg>` element's `viewBox` attribute to `viewBox="0 0 1920 1080"`.
    *   **Update `preserveAspectRatio`:** Change the `preserveAspectRatio` attribute to `"xMaxYMid meet"`.
    *   **Integrate Paths from `new-hero-paths.svg`:**
        *   **Action for Agent:** Read the content of `new-hero-paths.svg` (located in the project root directory).
        *   **Action for Agent:** Parse this SVG content to extract the `d` attribute string for each of the 5 `<path>` elements found within it.
        *   **Action for Agent:** In `HeroSvgPaths.tsx`, for each of the 5 existing `<path>` elements:
            *   Replace its current `d` attribute with the corresponding `d` attribute string extracted from `new-hero-paths.svg`.
            *   Ensure each `<path>` continues to have a unique `ref` assigned via the `addPathRef` function.
            *   Verify `stroke`, `strokeWidth`, and `fill="none"` are correctly set (these might be inherited from the properties in `new-hero-paths.svg` or should be set explicitly in the JSX if not). Default to `stroke={lineColor}`, `strokeWidth="2"` (or `2.5` for the main ball path), and `fill="none"`.
            *   Keep `vectorEffect="non-scaling-stroke"`.
    *   **Glow Filter:** Keep the `<defs>` and `<filter id="heroGlow">`. Ensure paths reference it with `filter="url(#heroGlow)"` in their JSX.
    *   **Ball Element:**
        *   Keep the `<circle ref={ballRef} ... />`.
        *   **Action for Agent:** Update its initial `cx` and `cy` attributes. These should be set to the starting X and Y coordinates of the *newly updated third path* (which will be `pathsRef.current[2]`). The agent will need to parse the new `d` attribute of the third path (e.g., the `M x y` values at the beginning of the `d` string).
        *   Set the ball's radius `r` to `5`.

**Agent Task for End of Phase 1:**
*   Implement the changes to `HeroSvgPaths.tsx` as described above.
*   **PAUSE and await my review.**
*   Do you have any questions about this phase or how to access and parse `new-hero-paths.svg`?

---

**Phase 2: GSAP Logic in `HeroSvgPaths.tsx`**

**Goal:** Refine GSAP animations within `HeroSvgPaths.tsx` for initial path drawing (non-scroll based for testing) and ball movement, ensuring proper setup and cleanup.

1.  **GSAP Plugin Registration (If not already global):**
    *   If GSAP plugins (`ScrollTrigger`, `MotionPathPlugin`) are not yet registered globally (e.g., in `app/page.tsx` or `layout.tsx`), the agent can keep the dynamic import logic for `gsap/all` within `HeroSvgPaths.tsx` for now. I understand this is for ease of implementation with the agent and can be optimized later.
2.  **Refine `useEffect` and GSAP Context:**
    *   **Action for Agent:** Ensure all GSAP animation code within the `useEffect` hook in `HeroSvgPaths.tsx` is wrapped in `gsap.context(() => { ... }, svgRef);`.
    *   **Action for Agent:** Verify the `return () => { gsapContext?.revert(); };` cleanup function is correctly implemented.
3.  **Initial Path Drawing Animation (Non-Scroll Based):**
    *   **Action for Agent:** For each path in `pathsRef.current` (within the GSAP context):
        *   Get its total length: `const len = path.getTotalLength();`.
        *   Set initial state using `gsap.set()`: `strokeDasharray: len`, `strokeDashoffset: len`, `opacity: 0.7`.
        *   Add a temporary animation to draw each path on load (this helps verify paths are correct before adding scroll triggers):
            ```javascript
            gsap.to(path, {
              strokeDashoffset: 0,
              duration: 2,
              delay: 0.3 + index * 0.2, // Staggered reveal
              ease: "power2.inOut",
            });
            ```
4.  **Ball Animation (Review and Keep):**
    *   **Action for Agent:** The pulsating glow animation for `ballRef.current` should remain.
    *   **Action for Agent:** The `motionPath` animation for the ball, triggered by `ScrollTrigger` and linked to `document.body`, should also remain.
        *   Ensure `motionPath.path` correctly refers to the updated path (e.g., `pathsRef.current[2]`).
        *   Temporarily enable `markers: true` for this `ScrollTrigger` for visual debugging.

**Agent Task for End of Phase 2:**
*   Implement the GSAP changes in `HeroSvgPaths.tsx`.
*   **PAUSE and await my review.**
*   Do you have any questions about this phase?

---

**Phase 3: Page Structure and Layout (`app/page.tsx`)**

**Goal:** Position the `HeroSvgPaths` component correctly in the main page layout to act as a global background layer.

1.  **Relocate `HeroSvgPaths` Component in `app/page.tsx`:**
    *   **Action for Agent:** Move the `<HeroSvgPaths />` component. It should become a direct child of the `<main className="relative ...">` element, placed *before* the Hero `<section>` and other content sections.
        ```jsx
        // In app/page.tsx
        <main className="relative overflow-x-hidden bg-charcoal">
          <HeroSvgPaths /> {/* Moved here */}
          {/* Initial Loading Animation ... */}
          {/* Hero Section ... */}
          {/* Other Sections ... */}
        </main>
        ```
2.  **Adjust Hero Section Columns for Z-Indexing in `app/page.tsx`:**
    *   **Action for Agent:** For the two columns within the Hero `<section>`:
        *   Left Column (`w-[65%] lg:w-[70%]`): Ensure it has Tailwind classes `relative z-10`.
        *   Right Column (`w-[35%] lg:w-[30%]`):
            *   Remove `<HeroSvgPaths />` from this column if it's still there.
            *   If this column has other content, ensure that content also has `relative z-10`.
3.  **Verify CSS for `HeroSvgPaths` SVG Container:**
    *   **Action for Agent:** Confirm the `<svg>` element in `HeroSvgPaths.tsx` still has `className="fixed inset-0 w-full h-full pointer-events-none z-0"`.

**Agent Task for End of Phase 3:**
*   Implement the layout changes in `app/page.tsx`.
*   **PAUSE and await my review.**
*   At this point, I expect to see the new SVG paths rendering as a fixed background, with the initial drawing animation, and the hero content appearing on top. The ball should also animate with scroll.
*   Do you have any questions about this phase?

---

**Phase 4: Scroll-Driven Path Drawing Animation**

**Goal:** Convert the initial path drawing animation to be controlled by user scroll.

1.  **Modify Path Animation in `HeroSvgPaths.tsx`:**
    *   **Action for Agent:** Inside the `useEffect`'s `gsap.context` block in `HeroSvgPaths.tsx`:
        *   Remove or comment out the temporary timed `gsap.to(path, { strokeDashoffset: 0, duration: 2, ... });` from Phase 2, Step 3.
        *   For each path, implement a scroll-driven animation (ensure `gsap.set` for `strokeDasharray` and `strokeDashoffset` remains):
            ```javascript
            pathsRef.current.forEach((path, index) => {
              if (!path) return;
              const len = path.getTotalLength();
              // Ensure this set is still here or paths won't be 'hidden' initially for scroll animation
              gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.7, filter: 'url(#heroGlow)' });

              gsap.to(path, {
                strokeDashoffset: 0,
                ease: "none", // Linear mapping to scroll
                scrollTrigger: {
                  trigger: document.body,
                  start: "top top",
                  // For 'end', start with "bottom bottom". I will provide refined values later.
                  end: "bottom bottom",
                  scrub: 1, // Smooth scrubbing
                  // markers: true, // Keep markers enabled for this phase
                }
              });
            });
            ```

**Agent Task for End of Phase 4:**
*   Implement the scroll-driven path animation changes in `HeroSvgPaths.tsx`.
*   **PAUSE and await my review.**
*   I expect the paths to draw themselves as I scroll down the page and undraw as I scroll up. The length of scroll required for full drawing will be the entire page height for now.
*   Do you have any questions about this phase, particularly about the `ScrollTrigger` setup?

---

**Phase 5: Testing and Refinement**

**Goal:** Thoroughly test the implementation and identify areas for refinement.

1.  **Agent Action:** No direct code changes in this phase unless I request specific adjustments.
2.  **My Review Points:**
    *   **Visual Alignment:** I will check if the SVG lines align correctly with the content on the right, as per the Figma design, especially on a 1980px wide viewport.
    *   **Responsiveness (Initial Check):** I will resize the browser to observe `preserveAspectRatio="xMaxYMid meet"`.
    *   **Animation Smoothness:** I will test scrolling performance.
    *   **Ball Animation:** I will ensure the ball's `motionPath` animation tied to scroll is still smooth and correct.
    *   **Scroll-Draw Interaction:** I will test how the path drawing feels with scroll and consider the `end` trigger for `ScrollTrigger` on the paths. I will then provide feedback or specific values for `end` if changes are needed.

**Agent Task for End of Phase 5:**
*   Acknowledge this is the testing phase.
*   **PAUSE and await my feedback and any requests for adjustments.**
*   Do you have any final questions before I begin testing the completed implementation from Phase 4?