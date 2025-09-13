// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.querySelector('.modal-close');
const rsvpForm = document.querySelector('.rsvp-form');

// Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animatedElements = document.querySelectorAll('.about-person, .gallery-item');
animatedElements.forEach(el => observer.observe(el));

// Gallery modal functionality
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imageSrc = item.getAttribute('data-src');
        const imageAlt = item.querySelector('img').alt;
        
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;
        modal.classList.remove('hidden');
        modal.classList.add('visible');
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
function closeModal() {
    modal.classList.remove('visible');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('visible')) {
        closeModal();
    }
});

// RSVP Form submission
rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(rsvpForm);
    const name = formData.get('name');
    const attendance = formData.get('attendance');
    const guests = formData.get('guests');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !attendance) {
        alert('Пожалуйста, заполните обязательные поля');
        return;
    }
    
    // Simulate form submission
    const submitBtn = rsvpForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Отправляем...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert(`Спасибо, ${name}! Ваш ответ получен.`);
        rsvpForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        const speed = 0.5;
        heroImage.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.pageYOffset + 100; // Offset for fixed navbar
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${id}"]`);
        
        if (scrollPos >= top && scrollPos <= bottom) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current nav link
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Gallery staggered animation
function animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        const delay = index * 100;
        setTimeout(() => {
            if (item.classList.contains('visible')) {
                item.style.transitionDelay = `${delay}ms`;
            }
        }, delay);
    });
}

// Call gallery animation when gallery section is visible
const gallerySection = document.querySelector('.gallery-section');
if (gallerySection) {
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateGalleryItems();
                galleryObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    galleryObserver.observe(gallerySection);
}

// Add loading animation for images
function addImageLoadingEffect() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            img.style.filter = 'none';
        });
        
        // Add loading state
        img.style.opacity = '0';
        img.style.filter = 'blur(5px)';
        img.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
        
        // If image is already loaded (from cache)
        if (img.complete) {
            img.style.opacity = '1';
            img.style.filter = 'none';
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    addImageLoadingEffect();
    
    // Add entrance animations with delays
    const heroElements = document.querySelectorAll('.couple-names, .wedding-date, .wedding-time, .invitation-text, .scroll-indicator');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${0.5 + (index * 0.3)}s`;
    });
});

// Handle form field animations
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Add golden line animation on scroll
const goldenLines = document.querySelectorAll('.golden-line');

const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = 'scaleX(1)';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

goldenLines.forEach(line => {
    line.style.transform = 'scaleX(0)';
    line.style.opacity = '0';
    line.style.transition = 'transform 1s ease, opacity 1s ease';
    lineObserver.observe(line);
});

// Add typing effect for invitation text
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when hero section is visible
const heroSection = document.querySelector('.hero');
const invitationText = document.querySelector('.invitation-text');

if (heroSection && invitationText) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    const originalText = invitationText.textContent;
                    typeWriter(invitationText, originalText, 30);
                }, 2500); // After other animations complete
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    heroObserver.observe(heroSection);
}