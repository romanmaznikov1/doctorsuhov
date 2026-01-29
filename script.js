// ===== DOM Elements =====
const header = document.getElementById('header');
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-list a, .mobile-menu .btn');
const reviewsTrack = document.querySelector('.reviews-track');
const prevBtn = document.querySelector('.reviews-btn.prev');
const nextBtn = document.querySelector('.reviews-btn.next');
const contactForm = document.getElementById('contact-form');

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

// ===== Reviews Slider =====
let currentReview = 0;
const reviewCards = document.querySelectorAll('.review-card');
let reviewsPerView = 3;

function updateReviewsPerView() {
    if (window.innerWidth <= 768) {
        reviewsPerView = 1;
    } else if (window.innerWidth <= 1024) {
        reviewsPerView = 2;
    } else {
        reviewsPerView = 3;
    }
}

function updateSlider() {
    updateReviewsPerView();
    const cardWidth = reviewCards[0]?.offsetWidth || 0;
    const gap = 30;
    const maxIndex = Math.max(0, reviewCards.length - reviewsPerView);
    
    if (currentReview > maxIndex) {
        currentReview = maxIndex;
    }
    
    const offset = currentReview * (cardWidth + gap);
    reviewsTrack.style.transform = `translateX(-${offset}px)`;
}

prevBtn?.addEventListener('click', () => {
    if (currentReview > 0) {
        currentReview--;
        updateSlider();
    }
});

nextBtn?.addEventListener('click', () => {
    updateReviewsPerView();
    const maxIndex = Math.max(0, reviewCards.length - reviewsPerView);
    if (currentReview < maxIndex) {
        currentReview++;
        updateSlider();
    }
});

window.addEventListener('resize', updateSlider);

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

// ===== Contact Form Handling =====
contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !phone) {
        alert('Пожалуйста, заполните обязательные поля');
        return;
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        alert('Пожалуйста, введите корректный номер телефона');
        return;
    }
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    alert(`Спасибо, ${name}! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.`);
    this.reset();
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

// ===== Phone Input Formatting =====
const phoneInput = document.querySelector('input[name="phone"]');

phoneInput?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value[0] === '8') {
            value = '7' + value.slice(1);
        }
        
        let formatted = '+7';
        if (value.length > 1) {
            formatted += ' (' + value.slice(1, 4);
        }
        if (value.length > 4) {
            formatted += ') ' + value.slice(4, 7);
        }
        if (value.length > 7) {
            formatted += '-' + value.slice(7, 9);
        }
        if (value.length > 9) {
            formatted += '-' + value.slice(9, 11);
        }
        
        e.target.value = formatted;
    }
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
