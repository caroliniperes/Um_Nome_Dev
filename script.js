// ==========================================
// 1. INICIALIZAÇÃO GERAL (Menu, Parallax, Reveal)
// ==========================================
(function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
  }

  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      heroSection.style.setProperty('--move-x', `${-x * 25}px`);
      heroSection.style.setProperty('--move-y', `${-y * 25}px`);
    });
    heroSection.addEventListener('mouseleave', () => {
      heroSection.style.setProperty('--move-x', '0px');
      heroSection.style.setProperty('--move-y', '0px');
    });
  }

  // Marca página ativa
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a, .footer-nav a").forEach(link => {
    if (link.getAttribute("href") === current) link.classList.add("active");
  });

  // Scroll Reveal
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

// ==========================================
// 2. POEIRA ESTELAR (STARDUST)
// ==========================================
function createStardust() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'star-particle';
    const size = Math.random() * 3 + 'px';
    particle.style.width = size; particle.style.height = size;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.opacity = Math.random();
    hero.appendChild(particle);
  }
}
window.addEventListener('load', createStardust);

// ==========================================
// 3. CONTATO (EMAILJS)
// ==========================================
(function() {
  if (typeof emailjs !== 'undefined') emailjs.init("2xo7xQpyXfuhVz4ux");
})();

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = 'Enviando...'; btn.disabled = true;

    emailjs.sendForm('service_3sjdvo9', 'template_vdbum76', this)
      .then(() => {
        alert('Solicitação enviada com sucesso!');
        this.reset();
        btn.innerText = originalText; btn.disabled = false;
      }, (err) => {
        alert('Erro ao enviar: ' + JSON.stringify(err));
        btn.innerText = originalText; btn.disabled = false;
      });
  });
}

// ==========================================
// ==========================================
// 4. LÓGICA DO MODAL (EQUIPE) - FIX "FREEZE" DEFINITIVO
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  const sociosData = {
    "1": {
      name: "Guilherme Eduardo",
      role: "Sócio | Desenvolvimento e Infraestrutura",
      summary: "Responsável pela estrutura técnica dos projetos, atua no desenvolvimento e implementação das soluções digitais, garantindo performance, estabilidade e escalabilidade.",
      skills: [],
      experience: ""
    },
    "2": {
      name: "Carolini Mathias",
      role: "Sócia | Estratégia Digital e Design",
      summary: "Responsável pela estratégia, posicionamento e identidade visual dos projetos, com foco em criar soluções que conectem negócio, comunicação e resultado.",
      skills: [],
      experience: ""
    }
  };

  const modal = document.getElementById('bio-modal');
  const teamCards = document.querySelectorAll('.team-card');

  if (modal && teamCards.length > 0) {
    teamCards.forEach(card => {
      // O evento de clique é adicionado ao card inteiro
      card.addEventListener('click', function(e) {
        // USO DO CLOSEST: Garante que pegamos o artigo pai, não a imagem ou o texto clicado
        const cardElement = e.target.closest('.team-card');
        
        if (!cardElement) return; // Se por algum motivo bizarro não achar o card, aborta.

        const id = cardElement.getAttribute('data-pro');
        const data = sociosData[id];

        if (data) {
          // Preenche os dados com segurança
          const nameEl = document.getElementById('modal-name');
          const roleEl = document.getElementById('modal-full-role');
          const summaryEl = document.getElementById('modal-summary');
          const expEl = document.getElementById('modal-experience');
          const skillsList = document.getElementById('modal-skills');
          const skillsTitle = document.getElementById('modal-skills-title');
          const experienceTitle = document.getElementById('modal-experience-title');

          if(nameEl) nameEl.innerText = data.name;
          if(roleEl) roleEl.innerText = data.role;
          if(summaryEl) summaryEl.innerText = data.summary;
          if(expEl) {
            expEl.innerText = data.experience;
            expEl.style.display = data.experience ? 'block' : 'none';
          }
          if(experienceTitle) experienceTitle.style.display = data.experience ? 'block' : 'none';
          if(skillsList) {
            skillsList.innerHTML = data.skills.map(s => `<li>${s}</li>`).join('');
            skillsList.style.display = data.skills.length ? 'grid' : 'none';
          }
          if(skillsTitle) skillsTitle.style.display = data.skills.length ? 'block' : 'none';

          // Abre o modal
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    // Eventos de fechar
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) closeBtn.onclick = closeModal;
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };
    window.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }
});
