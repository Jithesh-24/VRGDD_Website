// Header — scroll state, mobile drawer and scroll-spy nav highlighting.

export function initHeader() {
  const header = document.getElementById("header");
  const hamburger = document.getElementById("hamburger");
  const drawer = document.getElementById("mobile-drawer");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-drawer-link");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    updateActiveNavLink();
  });
  
  if (hamburger && drawer) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      drawer.classList.toggle("open");
      
      if (drawer.classList.contains("open")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Dedicated Close Button click handler
    const closeBtn = document.getElementById("drawer-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        hamburger.classList.remove("active");
        drawer.classList.remove("open");
        document.body.style.overflow = "";
      });
    }
  }
  
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          if (hamburger && drawer) {
            hamburger.classList.remove("active");
            drawer.classList.remove("open");
            document.body.style.overflow = "";
          }
          
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });
        }
      }
    });
  });
  
  function updateActiveNavLink() {
    let fromTop = window.scrollY + 120;
    
    navLinks.forEach(link => {
      const sectionId = link.getAttribute("href");
      if (sectionId.startsWith("#")) {
        const section = document.querySelector(sectionId);
        if (section) {
          if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
          ) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        }
      }
    });
  }
}
