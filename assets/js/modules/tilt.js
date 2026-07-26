// 3D tilt — pointer-tracked perspective transform on desktop only.

export function init3DTilt() {
  // Check if user is on a mobile device (disable tilt for performance)
  if (window.innerWidth <= 1024) return;
  
  const cards = document.querySelectorAll(".founder-quote-illustration, .insta-item");
  
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate inside element
      const y = e.clientY - rect.top;  // y coordinate inside element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation based on cursor offset from card center
      // Max rotation: 3 degrees for a clean luxury feel
      const rotateX = ((centerY - y) / centerY) * 3;
      const rotateY = ((x - centerX) / centerX) * 3;
      
      // Apply transforms
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
      
      // Select elements inside to give them translateZ layers (subtle depth)
      const content = card.querySelector(".service-card-content, .category-card-content, .work-details, .insta-overlay-content, .stat-label");
      if (content) {
        content.style.transform = "translateZ(20px)";
        content.style.transition = "transform 0.1s ease";
      }
      
      const numbers = card.querySelector(".service-number, .category-number, .stat-number-wrap");
      if (numbers) {
        numbers.style.transform = "translateZ(10px)";
        numbers.style.transition = "transform 0.1s ease";
      }
    });
    
    card.addEventListener("mouseleave", () => {
      // Smooth reset
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      card.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
      
      const content = card.querySelector(".service-card-content, .category-card-content, .work-details, .insta-overlay-content, .stat-label");
      if (content) {
        content.style.transform = "translateZ(0px)";
        content.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
      }
      
      const numbers = card.querySelector(".service-number, .category-number, .stat-number-wrap");
      if (numbers) {
        numbers.style.transform = "translateZ(0px)";
        numbers.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
      }
    });
    
    card.addEventListener("mouseenter", () => {
      card.style.transition = "none"; // Remove transitions on enter for responsive tracking
    });
  });
}
