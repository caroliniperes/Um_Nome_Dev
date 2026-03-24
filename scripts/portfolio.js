document.addEventListener('DOMContentLoaded', () => {
  const portfolioProjects = [
    {
      id: 'quilici-souza',
      category: 'Site institucional',
      client: 'Quilici e Souza Advogados',
      project: 'Site institucional e presença digital',
      description: 'Projeto voltado para apresentar o escritório de forma mais profissional, com hierarquia de conteúdo e copy orientada à confiança.',
      challenge: 'O cliente precisava ampliar credibilidade online e ter presença coerente com seu posicionamento.',
      solution: 'Criação de site responsivo com identidade visual consistente e navegação objetiva.',
      result: 'Base digital sólida, maior retenção de visitantes e aumento de leads qualificados.',
      image: 'image/QS_SOUZA_SITE PREVIA.png',
      link: 'https://quilicisouzaadvogados.com.br/',
      linkLabel: 'Ver case'
    },
    {
      id: 'mcm-autopecas',
      category: 'E-commerce',
      client: 'MCM Autopeças',
      project: 'Desenvolvimento da logo e da identidade visual, padronização de anúncios e tratamento de fotos dos produtos.',
      description: 'Criação da logo e da identidade visual da marca, aliada à padronização visual dos anúncios para marketplaces e ao tratamento das fotos dos produtos, com foco em aumentar a conversão e reforçar a percepção de qualidade.',
      challenge: '',
      solution: '',
      result: '',
      image: 'image/MCM_AUTOPECAS_LOGO.png',
      link: 'https://www.mercadolivre.com.br/pagina/mcmstoreparts?item_id=MLB4281355887&category_id=MLB47111&seller_id=2368870513&client=recoview-selleritems&recos_listing=true#origin=upp&component=seller&typeSeller=eshop',
      linkLabel: 'Ver case'
    },
    {
      id: 'reestruturacao-digital',
      category: 'Reestruturação digital',
      client: 'Empresa com operação sem foco digital',
      project: 'Otimização para conversão',
      description: 'Reestruturação de jornada do usuário em site existente para maximizar captação de leads.',
      challenge: 'Alto bounce rate e baixa geração de propostas a partir do site.',
      solution: 'Melhoria do fluxo, clarificação de ofertas e construção de caminhos rápidos para contato.',
      result: '+35% em conversão de formulários e maior engajamento com o conteúdo de serviços.',
      image: '',
      link: '#',
      linkLabel: 'Ver case'
    },
    {
      id: 'automacao-whatsapp',
      category: 'Automação de atendimento',
      client: 'Operação comercial com alto volume',
      project: 'Fluxos automáticos no WhatsApp',
      description: 'Configuração de bot com triagem, agendamento e seguimento de leads para reduzir cargas manuais.',
      challenge: 'Demora no atendimento e informações desconexas em cada conversa.',
      solution: 'Implementação de automação baseada em gatilhos e integração com workflow interno.',
      result: 'Redução de 40% no tempo de resposta e aumento de 25% em contatos qualificados.',
      image: '',
      link: '#',
      linkLabel: 'Ver case'
    }
  ];

  console.log('portfolio.js carregado, items:', portfolioProjects.length);

  const grid = document.getElementById('portfolio-grid');
  const modal = document.getElementById('portfolio-modal');

  if (!grid || !modal) return;

  const modalElements = {
    category: document.getElementById('portfolio-modal-category'),
    client: document.getElementById('portfolio-modal-client'),
    project: document.getElementById('portfolio-modal-project'),
    description: document.getElementById('portfolio-modal-description'),
    challenge: document.getElementById('portfolio-modal-challenge'),
    solution: document.getElementById('portfolio-modal-solution'),
    result: document.getElementById('portfolio-modal-result'),
    image: document.getElementById('portfolio-modal-image'),
    link: document.getElementById('portfolio-modal-link')
  };

  const renderProjectImage = (project) => {
    if (!project.image || !project.image.trim()) {
      return '';
    }

    return `<img src="${project.image}" alt="${project.project}" loading="lazy" />`;
  };

  grid.innerHTML = portfolioProjects.map((project) => `
    <article
      class="portfolio-card"
      data-portfolio-id="${project.id}"
      tabindex="0"
      role="button"
      aria-label="Abrir detalhes do projeto ${project.project}"
    >
      <div class="portfolio-card__image">
        ${renderProjectImage(project)}
      </div>

      <div class="portfolio-card__content">
        <span class="portfolio-card__category">${project.category}</span>
        <h3 class="portfolio-card__title">${project.client}</h3>
        <p class="portfolio-card__subtitle">${project.project}</p>
        ${project.link ? `
          <a
            href="${project.link}"
            class="portfolio-card__button"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${project.linkLabel || 'Ver case'}
          </a>
        ` : ''}
      </div>
    </article>
  `).join('');

  const openModal = (project) => {
    modalElements.category.textContent = project.category;
    modalElements.client.textContent = project.client;
    modalElements.project.textContent = project.project;
    modalElements.description.textContent = project.description;
    modalElements.challenge.textContent = project.challenge;
    modalElements.solution.textContent = project.solution;
    modalElements.result.textContent = project.result;

    if (project.image && project.image.trim()) {
      modalElements.image.src = project.image;
      modalElements.image.alt = project.project;
      modalElements.image.style.display = 'block';
    } else {
      modalElements.image.removeAttribute('src');
      modalElements.image.alt = '';
      modalElements.image.style.display = 'none';
    }

    if (project.link) {
      modalElements.link.href = project.link;
      modalElements.link.textContent = project.linkLabel || 'Acessar projeto';
      modalElements.link.style.display = 'inline-flex';
    } else {
      modalElements.link.style.display = 'none';
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  grid.addEventListener('click', (event) => {
    if (event.target.closest('.portfolio-card__button')) {
      return;
    }

    const card = event.target.closest('[data-portfolio-id]');
    if (!card) return;

    const project = portfolioProjects.find(
      (item) => item.id === card.dataset.portfolioId
    );

    if (project) openModal(project);
  });

  grid.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    const card = event.target.closest('[data-portfolio-id]');
    if (!card) return;

    event.preventDefault();

    const project = portfolioProjects.find(
      (item) => item.id === card.dataset.portfolioId
    );

    if (project) openModal(project);
  });

  const closeButton = modal.querySelector('.portfolio-close');

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
