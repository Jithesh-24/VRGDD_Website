// Entry point. Wires every feature module up on DOMContentLoaded.
//
// Loaded as `type="module"`, so it is deferred and runs after the GSAP / Lenis
// CDN scripts have executed. Each module guards its own DOM lookups and returns
// early when its section is absent, so features stay independent of each other.

import { initPreloader } from "./modules/preloader.js";
import { initCustomCursor } from "./modules/cursor.js";
import { initHeader } from "./modules/header.js";
import { initHeroSlideshow } from "./modules/hero.js";
import { init3DTilt } from "./modules/tilt.js";
import { initLightbox } from "./modules/lightbox.js";
import { initPortfolioFilter } from "./modules/portfolio-filter.js";
import { initScrollAnimations } from "./modules/scroll-animations.js";
import { initSmoothScroll } from "./modules/smooth-scroll.js";
import { initContactForm } from "./modules/contact-form.js";

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
