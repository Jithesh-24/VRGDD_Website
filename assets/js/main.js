// Entry point. Wires every feature module up on DOMContentLoaded.
//
// Loaded as `type="module"`, so it is deferred and runs after the GSAP / Lenis
// CDN scripts have executed. Each module guards its own DOM lookups and returns
// early when its section is absent, so features stay independent of each other.

import { initPreloader } from "./modules/preloader.js?v=16.0";
import { initCustomCursor } from "./modules/cursor.js?v=16.0";
import { initHeader } from "./modules/header.js?v=16.0";
import { initHeroSlideshow } from "./modules/hero.js?v=16.0";
import { init3DTilt } from "./modules/tilt.js?v=16.0";
import { initLightbox } from "./modules/lightbox.js?v=30.0";
import { initPortfolioFilter } from "./modules/portfolio-filter.js?v=16.0";
import { initScrollAnimations } from "./modules/scroll-animations.js?v=16.0";
import { initSmoothScroll } from "./modules/smooth-scroll.js?v=16.0";
import { initContactForm } from "./modules/contact-form.js?v=16.0";

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initCustomCursor();
  initHeader();
  initHeroSlideshow();
  init3DTilt();
  initLightbox();
  initPortfolioFilter();
  initScrollAnimations();
  initSmoothScroll();
  initContactForm();
});
