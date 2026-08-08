// Custom cursor — instant dot plus a lerped trailing ring.

export function initCustomCursor() {
  if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) return;
  
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  
  if (!dot || !ring) return;
  
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let isAnimating = false;
  
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    
    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(renderCursor);
    }
  }, { passive: true });
  
  function renderCursor() {
    const dx = mouseX - ringX;
    const dy = mouseY - ringY;
    
    ringX += dx * 0.2;
    ringY += dy * 0.2;
    
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    
    if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
      requestAnimationFrame(renderCursor);
    } else {
      isAnimating = false;
    }
  }
  
  // Attach hover state triggers
  const hoverElements = document.querySelectorAll("a, button, .btn-gold, .service-card, .category-card, .work-item, .process-card, input, textarea");
  hoverElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });
    el.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover");
    });
  });
}
