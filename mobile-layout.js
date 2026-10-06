(() => {
  const container = document.getElementById('SITE_CONTAINER');
  const masterPage = document.getElementById('masterPage');

  function updateDesignHeight() {
    if (container && masterPage) {
      container.style.setProperty(
        '--lady-design-height',
        `${masterPage.offsetHeight}px`
      );
    }
  }

  function createMobileMenu() {
    if (document.querySelector('.lady-mobile-menu-button')) {
      return;
    }

    const segments = window.location.pathname.split('/').filter(Boolean);
    const prefix = '../'.repeat(Math.max(0, segments.length - 1));
    const routes = [
      ['Home', 'index.htm'],
      ['Visit', 'visit.html'],
      ['Exhibit', 'categories.html'],
      ['Events', 'event-list.html'],
      ['Apply to sell', 'book.html'],
      ['Newsletter', 'news.html'],
      ['Contact', 'contact-us.html'],
    ];

    const button = document.createElement('button');
    button.className = 'lady-mobile-menu-button';
    button.type = 'button';
    button.textContent = 'Menu';
    button.setAttribute('aria-label', 'Open site menu');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'lady-mobile-menu');

    const nav = document.createElement('nav');
    nav.className = 'lady-mobile-menu';
    nav.id = 'lady-mobile-menu';
    nav.setAttribute('aria-label', 'Mobile site');
    nav.hidden = true;

    for (const [label, route] of routes) {
      const link = document.createElement('a');
      link.href = `${prefix}${route}`;
      link.textContent = label;
      nav.append(link);
    }

    button.addEventListener('click', () => {
      nav.hidden = !nav.hidden;
      button.setAttribute('aria-expanded', String(!nav.hidden));
      button.setAttribute(
        'aria-label',
        nav.hidden ? 'Open site menu' : 'Close site menu'
      );
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !nav.hidden) {
        nav.hidden = true;
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Open site menu');
        button.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (!nav.hidden && !nav.contains(event.target) && !button.contains(event.target)) {
        nav.hidden = true;
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Open site menu');
      }
    });

    document.body.append(button, nav);
  }

  updateDesignHeight();
  createMobileMenu();

  if ('ResizeObserver' in window && masterPage) {
    new ResizeObserver(updateDesignHeight).observe(masterPage);
  }
})();
