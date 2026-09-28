(function () {
  'use strict';

  const CONFIG = {
    inviteUrl: "https://discord.com/oauth2/authorize?client_id=1553813680800534701",
    stripeUrl: "https://buy.stripe.com/cNi4gy3Z09D99XE4BK2oE02",
    supportUrl: "https://discord.gg/orbitdc"
  };

  // ---- wire up buttons to config urls -------------------------------
  const actionMap = {
    invite: CONFIG.inviteUrl,
    stripe: CONFIG.stripeUrl,
    support: CONFIG.supportUrl
  };
  document.querySelectorAll('[data-action]').forEach((el) => {
    const url = actionMap[el.getAttribute('data-action')];
    if (url) {
      el.setAttribute('href', url);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    }
  });

  // ---- mobile nav toggle ---------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // ---- footer year -----------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- generate a soft starfield inside given containers ---------------
  function buildStars(container, count) {
    if (!container) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'star';
      s.style.top = Math.random() * 100 + '%';
      s.style.left = Math.random() * 100 + '%';
      const size = Math.random() * 1.6 + 1;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.setProperty('--dur', 2.5 + Math.random() * 4 + 's');
      s.style.setProperty('--delay', Math.random() * 5 + 's');
      frag.appendChild(s);
    }
    container.appendChild(frag);
  }
  buildStars(document.getElementById('heroStars'), 60);
  buildStars(document.getElementById('ctaStars'), 40);

  // ---- scroll reveal -----------------------------------------------------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();
