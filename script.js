(function () {
  // 1. Controle do Menu Mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
    });
  }

  // 2. Marca a página atual no menu
  const current = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav a, .footer-nav a");
  links.forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active");
    }
  });

  // 3. A Mágica do Scroll Reveal
  const revealElements = document.querySelectorAll(".reveal");
  
  if ("IntersectionObserver" in window && revealElements.length) {
    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Quando entra na tela, adiciona a classe visible
            entry.target.classList.add("visible");
            // Para de observar para animar apenas uma vez
            obs.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: "0px 0px -100px 0px" // O segredo: faz o elemento esperar subir 100px na tela antes de animar
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback caso o navegador seja muito antigo
    revealElements.forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();