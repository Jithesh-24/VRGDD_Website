// Smooth scroll — Lenis momentum scrolling wired into the GSAP ticker.

export function initSmoothScroll() {
  if (typeof Lenis === "undefined") {
    document.documentElement.style.scrollBehavior = "smooth";
    return;
  }
  
  const lenis = new Lenis({
    duration: 1.3,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1.05,
    smoothTouch: false,
    touchMultiplier: 2.1,
    infinite: false,
  });
  
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}
