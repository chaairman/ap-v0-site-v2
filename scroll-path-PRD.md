## PRD: Scroll-Driven SVG Path Animation

**1. Introduction & Goal**

This document outlines the requirements for implementing a scroll-driven SVG path animation on the homepage (`page.tsx`). The goal is to have a decorative path, sourced from `public/scroll_line_path.svg`, appear to draw itself on the page as the user scrolls, visually connecting and framing various content sections. This will enhance the user's journey down the page and add a sophisticated visual element.

**2. User Story**

*   As a website visitor,
*   When I scroll down the homepage,
*   I want to see a continuous line (from `scroll_line_path.svg`) dynamically draw itself, elegantly guiding me through different sections of the page,
*   So that the page feels more engaging and the visual flow between content is enhanced.

**3. Functional Requirements**

*   **FR1: SVG Path Integration**
    *   The SVG path shall be loaded from the existing `public/scroll_line_path.svg` file and integrated into the `page.tsx` component, likely within a dedicated new component (e.g., `<AnimatedScrollPath />`).
    *   The path should be placed in a way that it can overlay or sit adjacent to the existing content sections as per the original Figma design (which `scroll_line_path.svg` is based on).
    *   The path's inherent color and stroke width from the SVG file should be used, but can be overridden via CSS if necessary to match the Figma design's muted gold/beige (e.g., approximately `stroke="#D4C2A3"`) and desired stroke width (e.g., `stroke-width="3"` or `4`).
    *   The path should have rounded end caps and joins (ideally set in the SVG file, or can be styled via CSS: `stroke-linecap="round" stroke-linejoin="round"`).
*   **FR2: Scroll-Driven Drawing Animation**
    *   The SVG path shall animate its appearance based on the user's scroll position.
    *   The animation should give the effect of the line being "drawn" onto the page (using the `stroke-dasharray` and `stroke-dashoffset` technique).
    *   The drawing animation should commence as soon as the user starts scrolling from the top of the page (or as soon as the relevant scroll trigger area begins).
    *   The animation progress must be directly tied to the scrollbar position (i.e., "scrubbing"). Scrolling down should draw the line; scrolling up should "undraw" it.
*   **FR3: Path Positioning & Viewport Behavior (Pinned SVG)**
    *   The SVG element containing the path (or a direct wrapper `div`) shall be `position: fixed` relative to the viewport during the animation.
    *   This fixed element will act as a "canvas" onto which the path is drawn.
    *   The main page content (hero, about us, services, etc.) will scroll *underneath* this fixed SVG layer.
    *   The SVG's `viewBox` (from `scroll_line_path.svg`) and dimensions must be set up via CSS to correctly align the path with the live content sections as they scroll into view.
    *   The fixed SVG container should allow pointer events to pass through (`pointer-events: none;`) so it doesn't interfere with interactions on the content underneath.
*   **FR4: Animation Synchronization & Duration**
    *   The start of the path drawing animation will be triggered when the top of the scrollable content area (likely the `main` element or a specific wrapper for scroll-bound animations) reaches the top of the viewport.
    *   The end of the path drawing animation will occur when the path is fully drawn. This should correspond to the user having scrolled through all content sections that the path interacts with.
*   **FR5: Technology Implementation**
    *   **GSAP (GreenSock Animation Platform):**
        *   `ScrollTrigger` plugin will be used to control the animation based on scroll.
        *   The path drawing will be achieved by animating `stroke-dashoffset`.
    *   **Lenis:** Already integrated for smooth scrolling, which will enhance the animation feel.
    *   **React/Next.js:** The implementation will be within the existing `page.tsx` component or, preferably, a new dedicated child component (e.g., `<AnimatedScrollPath />`).
    *   **SVG:** The path data will be loaded from `public/scroll_line_path.svg`. Inline SVG or fetching its content for direct DOM manipulation is preferred for GSAP.

**4. Non-Functional Requirements**

*   **NFR1: Performance**
    *   The animation should be smooth and performant, not causing jank or significantly impacting page load times.
    *   Leverage hardware acceleration where possible (GSAP handles this well).
*   **NFR2: Responsiveness (Desktop First)**
    *   The initial implementation will focus on desktop screen widths (e.g., 1440px, as per the Figma design `scroll_line_path.svg` is based on).
    *   The path should render correctly and align with content on this target desktop view.
    *   (Future Consideration/Separate PRD): Mobile/tablet responsiveness will be addressed later.
*   **NFR3: Code Quality & Maintainability**
    *   The JavaScript/TypeScript code for the animation should be clean, well-commented, and organized within its component.
    *   GSAP timelines and ScrollTrigger configurations should be clear and understandable.
*   **NFR4: No Content Interaction Side-Effects**
    *   The animated path is purely decorative. It should not trigger animations or state changes in the content sections it passes over.

**5. Design & Visuals**

*   The primary reference for the path shape is `public/scroll_line_path.svg`.
*   Visual properties (color, stroke-width) should match the original Figma design intent.

**6. Technical Considerations / Implementation Notes**

*   **Loading/Using `scroll_line_path.svg`:**
    *   Investigate the best way to load and use `scroll_line_path.svg` for GSAP animation in Next.js. Options:
        1.  **Inline SVG:** Manually copy the `<path>` data from `scroll_line_path.svg` into the JSX of the new component. Most straightforward for GSAP.
        2.  **React Component via SVGR:** Configure the Next.js project (if not already) to use SVGR to import `scroll_line_path.svg` as a React component, then target the inner path element(s).
        3.  **Fetch and Inject:** Fetch the SVG content and `dangerouslySetInnerHTML` (use with caution, ensure SVG is sanitized or trusted).
    *   The primary path element within the SVG will need a unique `id` (e.g., `id="animatedScrollPath"`) for GSAP to target. This ID should be present in the `scroll_line_path.svg` file or added dynamically if feasible/necessary during the import/integration process.
*   **SVG Element Styling:**
    *   The `<svg>` element (or its React component wrapper) should have CSS `overflow: visible !important;` to prevent clipping.
*   **GSAP Implementation:**
    *   Ensure the path element is accessible in the DOM before attempting to get its length or animate it (e.g., within a `useEffect` hook with appropriate dependencies, using refs).
    *   `const pathElement = document.getElementById("animatedScrollPath"); // Or via ref.current`
    *   `const pathLength = pathElement.getTotalLength();`
    *   Initialize: `gsap.set(pathElement, { strokeDasharray: pathLength, strokeDashoffset: pathLength });`
    *   Timeline: `const tl = gsap.timeline({ scrollTrigger: { ... } });`
    *   Animate: `tl.to(pathElement, { strokeDashoffset: 0, ease: "none" });`
    *   **ScrollTrigger Configuration:**
        *   `trigger`: A container element that encompasses all the content the path interacts with (e.g., the `main` element).
        *   `pin`: The SVG wrapper element.
        *   `start`: e.g., `"top top"`
        *   `end`: e.g., `"bottom bottom"` or a calculated value based on content height relative to the path length.
        *   `scrub`: `true` or a numeric value (e.g., `1`).
*   **Alignment:** The `viewBox` from `scroll_line_path.svg` is critical. The CSS for the SVG wrapper needs to scale/position this `viewBox` correctly against the live HTML content for the target desktop width. This will likely involve setting the SVG wrapper to `width: 100%; height: 100vh;` (if pinned) and ensuring the `preserveAspectRatio` attribute on the SVG is set appropriately (e.g., `xMidYMin meet` or `none` if the path is designed to stretch/squash slightly with viewport proportions).

**7. Acceptance Criteria**

*   ✅ The path from `public/scroll_line_path.svg` is rendered on the page.
*   ✅ Path visual properties (color, stroke-width) match the intended design.
*   ✅ As the user scrolls down, the path "draws" itself progressively.
*   ✅ As the user scrolls up, the path "undraws" itself.
*   ✅ The drawing animation is smooth and directly linked to scroll progress.
*   ✅ The SVG path (or its container) remains fixed in the viewport while the content scrolls underneath.
*   ✅ The path visually aligns with the content sections as intended by its design for the target desktop width.
*   ✅ The animation does not cause performance issues or jank.
*   ✅ The implementation uses GSAP ScrollTrigger and integrates with the existing Lenis setup.
*   ✅ The solution is encapsulated, ideally within a new React component, for clarity and maintainability.