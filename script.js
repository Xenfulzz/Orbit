// ==========================================================
// ORBIT — site behaviour
// ==========================================================

const CONFIG = {
    inviteUrl: "https://discord.com/oauth2/authorize?client_id=1553813680800534701",
    stripeUrl: "YOUR_STRIPE_PAYMENT_LINK",
    supportUrl: "https://discord.gg/"
};

document.addEventListener('DOMContentLoaded', () => {

    // ---- wire up all config-driven buttons ----
    document.querySelectorAll('.js-invite').forEach(el => el.setAttribute('href', CONFIG.inviteUrl));
    document.querySelectorAll('.js-checkout').forEach(el => el.setAttribute('href', CONFIG.stripeUrl));
    document.querySelectorAll('.js-support').forEach(el => el.setAttribute('href', CONFIG.supportUrl));

    // ---- mobile nav toggle ----
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---- starfield generation ----
    const starfield = document.getElementById('starfield');
    if (starfield) {
        const count = window.innerWidth < 640 ? 50 : 100;
        const frag = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'twinkle';
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 4}s`;
            star.style.animationDuration = `${3 + Math.random() * 3}s`;
            frag.appendChild(star);
        }
        starfield.appendChild(frag);
    }

    // ---- scroll reveal ----
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => observer.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-visible'));
    }

    // ---- gentle parallax on hero mascot ----
    const heroMascot = document.getElementById('heroMascot');
    const heroScene = document.querySelector('.hero-scene');
    if (heroMascot && heroScene && window.matchMedia('(pointer: fine)').matches) {
        heroScene.addEventListener('mousemove', (e) => {
            const rect = heroScene.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            heroMascot.style.transform = `translate(${x * 14}px, ${y * 14}px)`;
        });
        heroScene.addEventListener('mouseleave', () => {
            heroMascot.style.transform = '';
        });
    }

    // ---- navbar shrink shadow on scroll ----
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.style.boxShadow = window.scrollY > 8 ? '0 8px 24px rgba(0,0,0,0.35)' : 'none';
        }, { passive: true });
    }
});
