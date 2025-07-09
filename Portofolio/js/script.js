// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true, // Animations will only happen once
  mirror: false // Elements won't animate again when scrolling back up
});

// Theme Toggle Functionality
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  const isDark = current === "dark";

  // Toggle theme
  if (isDark) {
    html.removeAttribute("data-theme");
  } else {
    html.setAttribute("data-theme", "dark");
  }

  // Update all theme toggle icons
  document.querySelectorAll(".theme-toggle i").forEach((icon) => {
    icon.classList.toggle("fa-moon", !isDark);
    icon.classList.toggle("fa-sun", isDark);
  });

  // Update theme text in mobile menu
  const themeText = document.querySelector(".theme-text");
  if (themeText) {
    themeText.textContent = isDark ? "Dark Mode" : "Light Mode";
  }

  // Save to localStorage
  localStorage.setItem("theme", isDark ? "light" : "dark");
}

// Initialize Theme
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.querySelectorAll(".theme-toggle i").forEach((icon) => {
      icon.classList.replace("fa-moon", "fa-sun");
    });
    const themeText = document.querySelector(".theme-text");
    if (themeText) themeText.textContent = "Light Mode";
  }
}

// Mobile Menu Functionality
function initMobileMenu() {
  const burger = document.querySelector(".burger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".mobile-close-btn");
  const overlay = document.querySelector(".mobile-menu-overlay");

  function openMenu() {
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (burger && mobileMenu && closeBtn && overlay) {
    burger.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    // Close when clicking on links
    document.querySelectorAll(".mobile-menu .nav-link").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }
}

// Skills Slider
function initSkillsSlider() {
  const slider = document.querySelector(".skills-slider");
  const btnLeft = document.getElementById("slide-left");
  const btnRight = document.getElementById("slide-right");

  if (slider && btnLeft && btnRight) {
    btnLeft.addEventListener("click", () => {
      slider.scrollBy({ left: -300, behavior: "smooth" });
    });

    btnRight.addEventListener("click", () => {
      slider.scrollBy({ left: 300, behavior: "smooth" });
    });
  }
}

// Hero Text Rotation
function initHeroText() {
  const descs = [
    "An Undergraduate Informatics Student",
    "A Front-end Developer",
    "A Software Developer",
    "An IT Support",
  ];
  let descIndex = 0;
  const descEl = document.getElementById("hero-desc-text");

  function updateText() {
    descEl.style.opacity = 0;
    setTimeout(() => {
      descEl.textContent = descs[descIndex];
      descEl.style.opacity = 1;
      descIndex = (descIndex + 1) % descs.length;
    }, 500);
  }

  updateText();
  setInterval(updateText, 3000);
}

// Smooth Scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // Adjusted for fixed navbar
          behavior: "smooth",
        });
      }
    });
  });
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      navbar.classList.remove('scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
      navbar.classList.remove('scroll-up');
      navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
      navbar.classList.remove('scroll-down');
      navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
  });
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initMobileMenu();
  initSkillsSlider();
  initHeroText();
  initSmoothScroll();
  initNavbarScroll();
});