/**
 * TIDYAI - Main JavaScript
 * Gauchère-Inspired Minimalist Navigation & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Use requestAnimationFrame for smoother execution
    requestAnimationFrame(() => {
        initNavigation();
        initScrollAnimations();
        initSmoothScroll();
        initFAQ();
    });
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const navMobileClose = document.querySelector('.nav-mobile-close');
    const navMobileLinks = document.querySelectorAll('.nav-mobile a');

    if (!navToggle || !navMobile) return;

    // Open mobile menu
    navToggle.addEventListener('click', () => {
        navMobile.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu
    const closeMenu = () => {
        navMobile.classList.remove('active');
        document.body.style.overflow = '';
    };

    navMobileClose.addEventListener('click', closeMenu);

    // Close on link click
    navMobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMobile.classList.contains('active')) {
            closeMenu();
        }
    });

    // Nav scroll effect
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    let lastScroll = 0;
    let scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.05)';
        } else {
            nav.style.background = '#FFFFFF';
            nav.style.boxShadow = 'none';
        }

        // Hide nav links on scroll down, show on scroll up
        if (navLinks) {
            if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
                navLinks.classList.add('hidden');
            } else {
                navLinks.classList.remove('hidden');
            }
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.feature-item, .step-item, .vision, .waitlist');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * FAQ Accordion Toggle
 */
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.closest('.faq-item');
            faqItem.classList.toggle('open');
        });
    });
}

/**
 * Format Number with Commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Debounce Function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Lazy Load Images
 */
function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}
