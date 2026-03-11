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

  // 2. Efeito Parallax (Independente do Menu)
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', function(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      heroSection.style.setProperty('--move-x', `${-x * 25}px`);
      heroSection.style.setProperty('--move-y', `${-y * 25}px`);
    });

    heroSection.addEventListener('mouseleave', function() {
      heroSection.style.setProperty('--move-x', '0px');
      heroSection.style.setProperty('--move-y', '0px');
    });
  }

  // 3. Marca a página atual
  const current = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav a, .footer-nav a");
  links.forEach(function (link) {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });

  // 4. Scroll Reveal
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealElements.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" });
    revealElements.forEach(el => observer.observe(el));
  }
})();

// 5. Gerador de Poeira Estelar (Stardust)
function createStardust() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'star-particle';
    const size = Math.random() * 3 + 'px';
    particle.style.width = size;
    particle.style.height = size;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.opacity = Math.random();
    hero.appendChild(particle);
  }
}
window.addEventListener('load', createStardust); 

// 6. Configuração EmailJS
(function() {
  emailjs.init("2xo7xQpyXfuhVz4ux");
})();

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = 'Enviando...';
    btn.disabled = true;

    emailjs.sendForm('service_3sjdvo9', 'template_vdbum76', this)
      .then(() => {
        alert('Solicitação enviada com sucesso!');
        contactForm.reset();
        btn.innerText = originalText;
        btn.disabled = false;
      }, (error) => {
        alert('Erro ao enviar: ' + JSON.stringify(error));
        btn.innerText = originalText;
        btn.disabled = false;
      });
  });
}