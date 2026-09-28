(function () {
  'use strict';

  const CONFIG = {
    inviteUrl: "https://discord.com/oauth2/authorize?client_id=1553813680800534701",
    stripeUrl: "https://buy.stripe.com/cNi4gy3Z09D99XE4BK2oE02",
    supportUrl: "https://discord.gg/orbitdc"
  };


  /*
   * ---------------------------------------------------------
   * ORBIT ACTION LINKS
   * ---------------------------------------------------------
   */

  const actionMap = {
    invite: CONFIG.inviteUrl,
    stripe: CONFIG.stripeUrl,
    support: CONFIG.supportUrl
  };


  document.querySelectorAll('[data-action]').forEach((element) => {

    const action = element.getAttribute('data-action');
    const url = actionMap[action];

    if (!url) return;

    element.setAttribute('href', url);
    element.setAttribute('target', '_blank');
    element.setAttribute('rel', 'noopener noreferrer');

  });


  /*
   * ---------------------------------------------------------
   * MOBILE NAVIGATION
   * ---------------------------------------------------------
   */

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {

    navToggle.addEventListener('click', () => {

      const open = navLinks.classList.toggle('open');

      navToggle.setAttribute(
        'aria-expanded',
        String(open)
      );

    });


    navLinks.querySelectorAll('a').forEach((link) => {

      link.addEventListener('click', () => {

        navLinks.classList.remove('open');

        navToggle.setAttribute(
          'aria-expanded',
          'false'
        );

      });

    });

  }


  /*
   * ---------------------------------------------------------
   * FOOTER YEAR
   * ---------------------------------------------------------
   */

  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /*
   * ---------------------------------------------------------
   * STARFIELD
   * ---------------------------------------------------------
   */

  function buildStars(container, count) {

    if (!container) return;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {

      const star = document.createElement('span');

      star.className = 'star';

      star.style.top =
        Math.random() * 100 + '%';

      star.style.left =
        Math.random() * 100 + '%';

      const size =
        Math.random() * 1.6 + 1;

      star.style.width =
        size + 'px';

      star.style.height =
        size + 'px';

      star.style.setProperty(
        '--dur',
        2.5 + Math.random() * 4 + 's'
      );

      star.style.setProperty(
        '--delay',
        Math.random() * 5 + 's'
      );

      fragment.appendChild(star);

    }

    container.appendChild(fragment);

  }


  buildStars(
    document.getElementById('heroStars'),
    60
  );

  buildStars(
    document.getElementById('ctaStars'),
    40
  );


  /*
   * ---------------------------------------------------------
   * SCROLL REVEAL
   * ---------------------------------------------------------
   */

  const revealElements =
    document.querySelectorAll('.reveal');


  if (
    'IntersectionObserver' in window &&
    revealElements.length
  ) {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              'is-visible'
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px'
        }
      );


    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add('is-visible');
    });

  }

})();
