// ===== DOM Elements =====
const header = document.getElementById('header');
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-list a, .mobile-menu .btn');

// ===== Header Scroll Effect =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===== Mobile Menu Toggle =====
burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
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
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Animate Elements on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    observer.observe(section);
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    updateSlider();
    
    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');
});

// ===== Active Navigation on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-list a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + header.offsetHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Image Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxBefore = document.getElementById('lightbox-before');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');

// Work cards data
const workData = [
    {
        before: 'images/before1.jpg',
        after: 'images/after1.jpg',
        title: 'Протезирование коронками',
        description: 'Восстановление зубов керамическими коронками'
    },
    {
        before: 'images/before2.png',
        after: 'images/after2.png',
        title: 'Протезирование All-on-4',
        description: 'Полное восстановление зубного ряда на четырёх имплантах'
    },
    {
        before: 'images/before3.jpg',
        after: 'images/after3.jpg',
        title: 'Имплантация и коронки',
        description: 'Комплексное восстановление с имплантами'
    },
    {
        before: 'images/before4.jpg',
        after: 'images/after4.jpg',
        title: 'Керамическая коронка',
        description: 'Протезирование 21 зуба керамической коронкой'
    },
    {
        before: 'images/before5.jpg',
        after: 'images/after5.jpg',
        title: 'Восстановление и протезирование',
        description: 'Комплексное лечение и восстановление зуба коронкой'
    },
    {
        before: 'images/before6.jpg',
        after: 'images/after6.jpg',
        title: 'Протезирование на импланте',
        description: 'Установка коронки на имплант в области зуба 4.6'
    },
    {
        before: 'images/before7.jpg',
        after: ['images/after7.jpg', 'images/after7_1.jpg'],
        title: 'Протезирование All-on-4',
        description: 'Полное восстановление зубного ряда на четырёх имплантах'
    }
];

let currentWorkIndex = 0;

// Open lightbox on work card click
const workCards = document.querySelectorAll('.work-card');
workCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        currentWorkIndex = index;
        openLightbox(index);
    });
});

function openLightbox(index) {
    const work = workData[index];
    const afterContainer = document.getElementById('lightbox-after-container');
    
    // Set before image
    lightboxBefore.src = work.before;
    
    // Clear after container
    afterContainer.innerHTML = '';
    
    // Handle single or multiple after images
    if (Array.isArray(work.after)) {
        // Multiple after images
        work.after.forEach(afterSrc => {
            const wrapper = document.createElement('div');
            wrapper.className = 'lightbox-image-wrapper';
            const img = document.createElement('img');
            img.src = afterSrc;
            img.alt = 'После лечения';
            const label = document.createElement('span');
            label.className = 'lightbox-label';
            label.textContent = 'После';
            wrapper.appendChild(img);
            wrapper.appendChild(label);
            afterContainer.appendChild(wrapper);
        });
    } else {
        // Single after image
        const wrapper = document.createElement('div');
        wrapper.className = 'lightbox-image-wrapper';
        const img = document.createElement('img');
        img.src = work.after;
        img.alt = 'После лечения';
        const label = document.createElement('span');
        label.className = 'lightbox-label';
        label.textContent = 'После';
        wrapper.appendChild(img);
        wrapper.appendChild(label);
        afterContainer.appendChild(wrapper);
    }
    
    lightboxTitle.textContent = work.title;
    lightboxDescription.textContent = work.description;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showNextWork() {
    currentWorkIndex = (currentWorkIndex + 1) % workData.length;
    openLightbox(currentWorkIndex);
}

function showPrevWork() {
    currentWorkIndex = (currentWorkIndex - 1 + workData.length) % workData.length;
    openLightbox(currentWorkIndex);
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextWork);
lightboxPrev.addEventListener('click', showPrevWork);

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowRight') {
        showNextWork();
    } else if (e.key === 'ArrowLeft') {
        showPrevWork();
    }
});
