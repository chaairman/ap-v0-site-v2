Hello Agent,

I need your help to fix an animation issue in my Next.js project. The project uses GSAP for various animations, especially in the hero section. You have been provided with the entire codebase in a Repomix file.

**Overall Instructions for You (The Agent):**
1.  After completing each Phase, please **PAUSE** and explicitly state that you are awaiting my review and confirmation before proceeding to the next Phase.
2.  **Do NOT attempt to run the development server or execute any `npm run dev`/`next dev` commands.** Your task is to modify the code as instructed.
3.  If you have any questions or need clarification at any point, please ask me.

---

**The Problem:**

The decorative SVG lines in the hero section are exhibiting unintended behavior. After their initial drawing animation upon page load, they re-animate (undraw and redraw) as the user scrolls down the page. This is particularly noticeable as the "ball" element animates along its path.

The root cause is a dependency chain that leads to the `useEffect` hook responsible for setting up the line animations in `components/hero-svg-paths.tsx` being re-triggered on scroll. Here's a breakdown:
1.  The `useEffect` hook in `components/hero-svg-paths.tsx` (which sets up the line drawing and ball animations) depends on a memoized `handleScrollProgress` function.
2.  This `handleScrollProgress` function, in turn, depends on the `onBallReachContact` prop passed to `HeroSvgPaths`.
3.  The `onBallReachContact` prop is connected to the `handleBallReachContact` function defined in `app/page.tsx`.
4.  The `handleBallReachContact` function in `app/page.tsx` calls `setIsContactGold` to update a local state variable. This state update is necessary to change the contact section's background.
5.  Crucially, the `handleBallReachContact` function in `app/page.tsx` gets a *new reference* every time the `Home` component in `app/page.tsx` re-renders.
6.  Re-renders of `Home` are triggered when `isContactGold` state changes (which happens as the ball's scroll progress updates via the `onBallReachContact` -> `handleScrollProgress` -> `ScrollTrigger`'s `onUpdate` callback).
7.  This cycle of new function references causes the `useEffect` in `components/hero-svg-paths.tsx` to execute its cleanup (reverting previous GSAP animations, including the "drawn" state of the lines) and then re-run its setup logic. This re-initialization makes the lines appear to animate in response to scroll, after their initial desired animation.

**Desired Behavior:**
1.  The page loads, and the initial loading animation (gold screen with logo) completes.
2.  After the initial loading screen and a further brief delay (currently around 2.5 seconds in `HeroSvgPaths.tsx`), the decorative SVG lines in the hero section should animate in (draw themselves) **once**.
3.  Once drawn, these lines should remain fully visible and static as the user scrolls. They should **not** undraw or redraw during scrolling.
4.  As the user scrolls down the page, the small "ball" element should animate along its designated SVG path.
5.  When the ball's scroll progress indicates it has reached the vicinity of the "Contact" section, the background of the contact section should change to gold (as currently handled by the `isContactGold` state). This background change should occur smoothly and **without** causing the hero SVG lines to re-animate.

---

**Phase 1: Confirm Understanding of the Problem**

**Your Task:**
*   Review the problem explanation and the desired behavior described above.
*   Confirm that you understand why the `useEffect` hook in `components/hero-svg-paths.tsx` is being repeatedly re-triggered and why this leads to the lines re-animating on scroll.

**Action:**
*   Please state your understanding of the issue.

**(Agent: Pause here and await my confirmation before proceeding to Phase 2.)**

---

**Phase 2: Implement the Fix in `app/page.tsx`**

**Objective:**
The primary fix involves stabilizing the reference of the `handleBallReachContact` function in `app/page.tsx` using the `useCallback` hook. This will prevent the chain reaction that causes the re-initialization of the line animations in `HeroSvgPaths.tsx`.

**File to Modify:**
*   `app/page.tsx`

**Instructions:**
1.  Ensure `useCallback` is imported from React at the top of `app/page.tsx`. If it's not already there, add it:
    ```javascript
    import { useEffect, useRef, useState, useCallback } from "react";
    ```
2.  Locate the `handleBallReachContact` function definition within the `Home` component in `app/page.tsx`. It currently looks like this:
    ```javascript
    const handleBallReachContact = (isInContact: boolean) => {
      setIsContactGold(isInContact);
    };
    ```
3.  Modify this function by wrapping it with `useCallback`. The dependency array for `useCallback` should include `setIsContactGold` (which is stable from `useState` and won't cause unnecessary re-creations of the memoized callback).
    The updated function should look like this:
    ```javascript
    const handleBallReachContact = useCallback((isInContact: boolean) => {
      setIsContactGold(isInContact);
    }, [setIsContactGold]);
    ```
4.  **Important:** Do not make any changes to `components/hero-svg-paths.tsx` in this phase. The existing GSAP logic within that component for the initial line animation (including the `onComplete` callback that sets `path.style.strokeDasharray = 'none'`) is designed to make the lines draw once and stay. The fix in this phase should allow that logic to execute correctly without being prematurely reverted.

**Action:**
*   Apply the specified code changes to `app/page.tsx`.

**(Agent: Pause here and await my review and confirmation before proceeding to Phase 3.)**

---

**Phase 3: Verification and Conclusion**

**Objective:**
Acknowledge the completion of the fix. I (the user) will then manually test the application in my development environment to verify that the issue is resolved and the animations behave as desired.

**Your Task:**
*   Confirm that you have completed all the modifications requested in Phase 2.
*   State that you are awaiting my review.

**(Agent: Pause here. No further actions are required from you unless I provide additional instructions after my review.)**