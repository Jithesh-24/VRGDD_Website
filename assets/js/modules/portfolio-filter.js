// Portfolio filter — category buttons that hide non-matching work items.

export function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".work-item");
  
  if (!filterBtns.length || !items.length) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active states on buttons
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const filterValue = btn.getAttribute("data-filter");
      
      items.forEach(item => {
        const itemCategory = item.getAttribute("data-category");
        
        if (filterValue === "all" || itemCategory === filterValue) {
          item.classList.remove("filtered-out");
        } else {
          item.classList.add("filtered-out");
        }
      });
      
      // Update ScrollTrigger animations position if GSAP is loaded
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    });
  });
}
