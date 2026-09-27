// ---------------------------------------------------------
// Orbit — configuration
// Change these three values to update every relevant button
// and link across the whole site.
// ---------------------------------------------------------
const CONFIG = {
    inviteUrl: "https://discord.com/oauth2/authorize?client_id=1553813680800534701",
    stripeUrl: "YOUR_STRIPE_PAYMENT_LINK",
    supportUrl: "https://discord.gg/"
};

(function () {
    "use strict";

    var CTA_MAP = {
        invite: CONFIG.inviteUrl,
        stripe: CONFIG.stripeUrl,
        support: CONFIG.supportUrl
    };

    // Wire up every element that declares which link it needs.
    document.querySelectorAll("[data-cta]").forEach(function (el) {
        var key = el.getAttribute("data-cta");
        var url = CTA_MAP[key];
        if (!url) return;
        el.setAttribute("href", url);
        if (key !== "invite" || el.tagName === "A") {
            el.setAttribute("target", "_blank");
            el.setAttribute("rel", "noopener noreferrer");
        }
    });

    // Sticky nav shadow/background once the page scrolls.
    var nav = document.getElementById("nav");
    function onScroll() {
        if (window.scrollY > 8) {
            nav.classList.add("is-scrolled");
        } else {
            nav.classList.remove("is-scrolled");
        }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mobile menu toggle.
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("mobileMenu");

    function closeMenu() {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
    }

    toggle.addEventListener("click", function () {
        var isOpen = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 860) closeMenu();
    });

    // Subtle one-time reveal for sections as they enter view.
    var revealTargets = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealTargets.length) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );
        revealTargets.forEach(function (el) { observer.observe(el); });
    } else {
        revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
    }

    // Footer year.
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
