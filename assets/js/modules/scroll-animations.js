// Scroll animations — GSAP ScrollTrigger reveals (IntersectionObserver fallback) and stat counters.

export function initScrollAnimations() {
  const revealItems = document.querySelectorAll(".reveal-3d");
  
  // Use GSAP ScrollTrigger for 3D unfold sections reveal
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    
    revealItems.forEach(section => {
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    });
  } else {
    // Intersection Observer Fallback
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });
    
    revealItems.forEach(item => {
      revealObserver.observe(item);
    });
  }
  
  // Counter stats count up
  const stats = document.querySelectorAll(".stat-item");
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numEl = entry.target.querySelector(".stat-number");
        const targetVal = parseInt(entry.target.getAttribute("data-counter"), 10);
        if (numEl) {
          animateCounter(numEl, targetVal);
        }
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  
  stats.forEach(item => {
    statsObserver.observe(item);
  });
}

function animateCounter(element, target) {
  const duration = 2000; // 2 seconds
  let startTime = null;
  
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    
    // Ease-out cubic: 1 - (1 - progress)^3
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    
    const currentVal = Math.floor(easeProgress * target);
    element.textContent = currentVal;
    
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = target;
    }
  }
  
  requestAnimationFrame(step);
}
