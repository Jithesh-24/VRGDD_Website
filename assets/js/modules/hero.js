// Hero — shuffled background slideshow with lazy slide loading, plus the intro reveal.

export function initHeroSlideshow() {
  const container = document.querySelector(".hero-slideshow");
  if (!container) return;
  
  const slides = Array.from(container.querySelectorAll(".hero-slide"));
  if (slides.length <= 1) return;
  
  // 1. Shuffle the slides array (Fisher-Yates Shuffle)
  for (let i = slides.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slides[i], slides[j]] = [slides[j], slides[i]];
  }
  
  // Helper to load a slide's background image if it hasn't been loaded yet
  function loadSlide(slide) {
    if (slide && slide.hasAttribute("data-bg")) {
      const bgUrl = slide.getAttribute("data-bg");
      slide.style.backgroundImage = `url('${bgUrl}')`;
      slide.removeAttribute("data-bg");
    }
  }
  
  // 2. Clear active class from all and set it on the first slide in the shuffled array
  slides.forEach((slide, idx) => {
    slide.classList.remove("active");
    if (idx === 0) {
      slide.classList.add("active");
      // Make sure the first slide has its background image loaded immediately!
      loadSlide(slide);
    }
  });
  
  // 3. Re-append the shuffled slides into the container, keeping the glow overlay at the end
  const glow = container.querySelector(".hero-slide-glow");
  slides.forEach(slide => {
    if (glow) {
      container.insertBefore(slide, glow);
    } else {
      container.appendChild(slide);
    }
  });
  
  // Preload the second slide (index 1) immediately so it's ready for the first transition
  loadSlide(slides[1]);
  
  let currentIdx = 0;
  setInterval(() => {
    // Deactivate current slide
    slides[currentIdx].classList.remove("active");
    
    // Move to next slide
    currentIdx = (currentIdx + 1) % slides.length;
    
    // Ensure the next slide is loaded
    loadSlide(slides[currentIdx]);
    
    // Activate next slide
    slides[currentIdx].classList.add("active");
    
    // Preload the slide after next to ensure zero latency on the next tick
    const nextNextIdx = (currentIdx + 1) % slides.length;
    loadSlide(slides[nextNextIdx]);
  }, 6000);
}

export function triggerHeroAnimations() {
  const tagline = document.querySelector(".hero-tagline");
  const titles = document.querySelectorAll(".hero-title-item");
  const cta = document.querySelector(".hero-cta");
  
  if (tagline) {
    tagline.style.transition = "opacity 1.2s ease 0.2s, transform 1.2s ease 0.2s";
    tagline.style.opacity = "1";
    tagline.style.transform = "translateY(0)";
  }
  
  titles.forEach((title, i) => {
    title.style.transition = `opacity 1.2s ease ${0.4 + i*0.2}s, transform 1.2s ease ${0.4 + i*0.2}s`;
    title.style.opacity = "1";
    title.style.transform = "translateY(0)";
  });
  
  if (cta) {
    cta.style.transition = "opacity 1.2s ease 1s, transform 1.2s ease 1s";
    cta.style.opacity = "1";
    cta.style.transform = "translateY(0)";
  }
}
