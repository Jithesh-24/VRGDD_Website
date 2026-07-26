// Preloader — fake progress bar that hands off to the hero intro animation.

import { triggerHeroAnimations } from "./hero.js";

export function initPreloader() {
  const preloader = document.getElementById("preloader");
  const bar = document.querySelector(".preloader-bar");
  const counterVal = document.querySelector(".preloader-counter-val");
  
  if (!preloader) return;
  
  let width = 0;
  const interval = setInterval(() => {
    width += Math.floor(Math.random() * 8) + 3;
    if (width >= 100) {
      width = 100;
      clearInterval(interval);
      
      bar.style.width = "100%";
      counterVal.textContent = "100";
      
      setTimeout(() => {
        preloader.classList.add("fade-out");
        triggerHeroAnimations();
      }, 500);
    } else {
      bar.style.width = width + "%";
      counterVal.textContent = width;
    }
  }, 30);
}
