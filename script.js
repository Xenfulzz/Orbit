(function () {
  'use strict';

  /* ------------------------------------------------------------------
     CONFIG — the single source of truth for every external link.
     Any element with data-action="invite|stripe|support" is wired here.
     ------------------------------------------------------------------ */
  const CONFIG = {
    inviteUrl: "https://discord.com/oauth2/authorize?client_id=1553813680800534701",
    stripeUrl: "https://buy.stripe.com/bJe4gy3Z02aHedU3xG2oE00",
    supportUrl: "https://discord.gg/orbitdc"
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  // ---- wire action buttons to config URLs ---------------------------
  const actionMap = {
    invite: CONFIG.inviteUrl,
    stripe: CONFIG.stripeUrl,
    support: CONFIG.supportUrl
  };
  document.querySelectorAll('[data-action]').forEach((el) => {
    const url = actionMap[el.getAttribute('data-action')];
    if (!url) return;
    el.setAttribute('href', url);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
    const hint = document.createElement('span');
    hint.className = 'sr-only';
    hint.textContent = ' (opens in a new tab)';
    el.appendChild(hint);
  });

  // ---- mobile navigation --------------------------------------------
  const nav = document.getElementById('siteNav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const mobileQuery = window.matchMedia('(max-width: 900px)');

  function setMenu(open, returnFocus) {
    if (!navToggle || !navMenu) return;
    navMenu.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (!open && returnFocus) navToggle.focus();
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      setMenu(!navMenu.classList.contains('open'));
    });
    // any link/button inside the menu closes it
    navMenu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setMenu(false);
    });
    // Escape closes and returns focus to the toggle
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) setMenu(false, true);
    });
    // tap/click outside closes
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !e.target.closest('.nav')) setMenu(false);
    });
    // never stay open after resizing to desktop
    const onQueryChange = () => { if (!mobileQuery.matches) setMenu(false); };
    if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', onQueryChange);
    else if (mobileQuery.addListener) mobileQuery.addListener(onQueryChange);
    // leaving the page via back/forward cache shouldn't restore an open menu
    window.addEventListener('pageshow', () => setMenu(false));
  }

  // ---- nav background once scrolled ---------------------------------
  if (nav) {
    let ticking = false;
    const update = () => {
      nav.classList.toggle('scrolled', window.scrollY > 8);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  // ---- footer year ----------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- hero starfield (skipped for reduced motion) ---------------------
  const starHost = document.getElementById('heroStars');
  if (starHost && !reduceMotion) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 36; i++) {
      const s = document.createElement('span');
      s.className = 'star';
      const size = Math.random() * 1.4 + 1;
      s.style.cssText =
        'top:' + Math.random() * 100 + '%;' +
        'left:' + Math.random() * 100 + '%;' +
        'width:' + size + 'px;height:' + size + 'px;' +
        '--dur:' + (3 + Math.random() * 4) + 's;' +
        '--delay:' + Math.random() * 5 + 's;';
      frag.appendChild(s);
    }
    starHost.appendChild(frag);
  }

  // ---- scroll reveal ----------------------------------------------------
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (!reduceMotion && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }
  }
})();
