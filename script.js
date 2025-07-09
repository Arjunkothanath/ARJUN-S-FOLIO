document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelector(".nav-links");
  const navSocial = document.querySelector(".nav-social");
  const navBar = document.querySelector(".floating-nav");
  const navLinkItems = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // ✅ Toggle button click
  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("active");
    navMenu.classList.toggle("active");     // Slide-in panel
    navLinks.classList.toggle("show");      // Show menu links
    navSocial.classList.toggle("show");     // Show social icons
  });

  // ✅ Close menu when a link is clicked (mobile)
  navLinkItems.forEach(link => {
    link.addEventListener("click", () => {
      toggleBtn.classList.remove("active");
      navMenu.classList.remove("active");
      navLinks.classList.remove("show");
      navSocial.classList.remove("show");
    });
  });

  // ✅ Add nav shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navBar.classList.add("scrolled");
    } else {
      navBar.classList.remove("scrolled");
    }

    // ✅ Highlight active link on scroll
    let scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinkItems.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // ✅ Smooth scrolling on nav link click
  navLinkItems.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth"
        });
      }
    });
  });
});
