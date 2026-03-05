// ===== DOM Elements =====
const header = document.getElementById('header');
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-list a');
const lightbox = document.getElementById('lightbox');
const lightboxBefore = document.getElementById('lightbox-before');
const lightboxAfterContainer = document.getElementById('lightbox-after-container');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');

// ===== Header Scroll Effect & Active Navigation =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-list a');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    header.style.boxShadow = currentScroll > 50
        ? '0 2px 30px rgba(0, 0, 0, 0.1)'
        : '0 2px 20px rgba(0, 0, 0, 0.05)';

    let current = '';
    const scrollPosition = currentScroll + header.offsetHeight + 100;

    sections.forEach(section => {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// ===== Mobile Menu Toggle =====
burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - header.offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Animate Elements on Scroll =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    observer.observe(section);
});

// ===== Image Lightbox =====
const workData = [
    { before: 'images/before1.jpg', after: 'images/after1.jpg', title: 'Протезирование коронками', description: 'Восстановление зубов керамическими коронками' },
    { before: 'images/before2.png', after: 'images/after2.png', title: 'Протезирование All-on-4', description: 'Полное восстановление зубного ряда на четырёх имплантах' },
    { before: 'images/before3.jpg', after: 'images/after3.jpg', title: 'Имплантация и коронки', description: 'Комплексное восстановление с имплантами' },
    { before: 'images/before4.jpg', after: 'images/after4.jpg', title: 'Керамическая коронка', description: 'Протезирование 21 зуба керамической коронкой' },
    { before: 'images/before5.jpg', after: 'images/after5.jpg', title: 'Восстановление и протезирование', description: 'Комплексное лечение и восстановление зуба коронкой' },
    { before: 'images/before6.jpg', after: 'images/after6.jpg', title: 'Протезирование на импланте', description: 'Установка коронки на имплант в области зуба 4.6' },
    { before: 'images/before7.jpg', after: ['images/after7.jpg', 'images/after7_1.jpg'], title: 'Протезирование All-on-4', description: 'Полное восстановление зубного ряда на четырёх имплантах' },
    { before: 'images/before8.png', after: 'images/after8.jpg', title: 'Протезирование коронками', description: 'Восстановление зубов керамическими коронками' },
    { before: 'images/before9.jpg', after: 'images/after9.jpg', title: 'Коронка на 13 зуб', description: 'Восстановление и эстетическая реабилитация зуба 13' },
    { before: 'images/before10.jpg', after: 'images/after10.jpg', title: 'Имплантация all-on-6', description: 'Полное восстановление зубного ряда на шести имплантах' },
];

let currentWorkIndex = 0;

document.querySelectorAll('.work-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        currentWorkIndex = index;
        openLightbox(index);
    });
});

function createAfterImage(src) {
    const wrapper = document.createElement('div');
    wrapper.className = 'lightbox-image-wrapper';
    wrapper.innerHTML = `<img src="${src}" alt="После лечения"><span class="lightbox-label">После</span>`;
    return wrapper;
}

function openLightbox(index) {
    const work = workData[index];
    lightboxBefore.src = work.before;
    lightboxAfterContainer.innerHTML = '';

    const afterImages = Array.isArray(work.after) ? work.after : [work.after];
    afterImages.forEach(src => lightboxAfterContainer.appendChild(createAfterImage(src)));

    lightboxTitle.textContent = work.title;
    lightboxDescription.textContent = work.description;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateWork(direction) {
    currentWorkIndex = (currentWorkIndex + direction + workData.length) % workData.length;
    openLightbox(currentWorkIndex);
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-next').addEventListener('click', () => navigateWork(1));
document.getElementById('lightbox-prev').addEventListener('click', () => navigateWork(-1));

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') navigateWork(1);
    else if (e.key === 'ArrowLeft') navigateWork(-1);
});

// ===== Slider Navigation (shared for reviews & works) =====
function initSliderNav({ slider, wrapper, dotsContainer, cardSelector, gapContainer }) {
    if (!slider || !dotsContainer || !wrapper) return;

    const gapEl = gapContainer || slider;
    const cards = slider.querySelectorAll(cardSelector);
    if (cards.length === 0) return;

    function getGap() {
        return parseInt(getComputedStyle(gapEl).gap) || 0;
    }

    function getCardsPerPage() {
        const cardWidth = cards[0].offsetWidth;
        const gap = getGap();
        return Math.max(1, Math.round(slider.clientWidth / (cardWidth + gap)));
    }

    function buildDots() {
        const perPage = getCardsPerPage();
        const pageCount = Math.ceil(cards.length / perPage);
        dotsContainer.innerHTML = '';
        for (let i = 0; i < pageCount; i++) {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.setAttribute('aria-label', `Страница ${i + 1}`);
            dot.addEventListener('click', () => {
                const cardWidth = cards[0].offsetWidth;
                const gap = getGap();
                slider.scrollTo({ left: i * perPage * (cardWidth + gap), behavior: 'smooth' });
            });
            dotsContainer.appendChild(dot);
        }
        updateActiveDot();
    }

    function updateActiveDot() {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        if (dots.length === 0) return;
        const perPage = getCardsPerPage();
        const cardWidth = cards[0].offsetWidth;
        const gap = getGap();
        const activeIndex = Math.round(slider.scrollLeft / (perPage * (cardWidth + gap)));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
    }

    function updateEdgeClasses() {
        const scrollLeft = slider.scrollLeft;
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        wrapper.classList.toggle('scroll-start', scrollLeft <= 5);
        wrapper.classList.toggle('scroll-end', scrollLeft >= maxScroll - 5);
    }

    slider.addEventListener('scroll', () => {
        updateActiveDot();
        updateEdgeClasses();
    });

    window.addEventListener('resize', buildDots);

    buildDots();
    updateEdgeClasses();
}

// Reviews slider
initSliderNav({
    slider: document.querySelector('.reviews-slider'),
    wrapper: document.querySelector('.reviews .slider-wrapper'),
    dotsContainer: document.querySelector('.reviews-dots'),
    cardSelector: '.review-card',
    gapContainer: document.querySelector('.reviews-track'),
});

// Works slider
initSliderNav({
    slider: document.querySelector('.works-grid'),
    wrapper: document.querySelector('.works .slider-wrapper'),
    dotsContainer: document.querySelector('.works-dots'),
    cardSelector: '.work-card',
});
