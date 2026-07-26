// Lightbox — gallery overlay built from the currently visible work items.

export function initLightbox() {
  const lightbox = document.getElementById("custom-lightbox");
  const imgContainer = document.querySelector(".lightbox-image-container img");
  const caption = document.querySelector(".lightbox-title");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");
  const triggers = document.querySelectorAll(".work-item");
  
  if (!lightbox) return;
  
  let activeGallery = [];
  let activeIndex = 0;
  
  triggers.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Rebuild the active gallery dynamically of ONLY visible items
      activeGallery = [];
      const visibleTriggers = Array.from(triggers).filter(t => !t.classList.contains("filtered-out"));
      
      visibleTriggers.forEach((vItem, vIdx) => {
        const img = vItem.querySelector(".work-image-wrap img");
        const title = vItem.querySelector(".work-title").textContent;
        const src = img.getAttribute("src");
        activeGallery.push({ src, title });
        
        if (vItem === item) {
          activeIndex = vIdx;
        }
      });
      
      if (activeGallery.length > 0) {
        openLightbox(activeGallery[activeIndex]);
      }
    });
  });
  
  function openLightbox(item) {
    imgContainer.setAttribute("src", item.src);
    caption.textContent = item.title;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  
  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }
  
  function showNext() {
    if (!activeGallery.length) return;
    activeIndex = (activeIndex + 1) % activeGallery.length;
    imgContainer.style.opacity = "0";
    setTimeout(() => {
      imgContainer.setAttribute("src", activeGallery[activeIndex].src);
      caption.textContent = activeGallery[activeIndex].title;
      imgContainer.style.opacity = "1";
    }, 200);
  }
  
  function showPrev() {
    if (!activeGallery.length) return;
    activeIndex = (activeIndex - 1 + activeGallery.length) % activeGallery.length;
    imgContainer.style.opacity = "0";
    setTimeout(() => {
      imgContainer.setAttribute("src", activeGallery[activeIndex].src);
      caption.textContent = activeGallery[activeIndex].title;
      imgContainer.style.opacity = "1";
    }, 200);
  }
  
  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);
  
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
}
