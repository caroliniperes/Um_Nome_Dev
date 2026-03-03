(function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
    });
  }

  const current = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav a, .footer nav a");
  links.forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active");
    }
  });

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealElements.length) {
    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();
