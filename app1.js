// Photo modal functionality
const photoModal = document.getElementById('photo-modal');
const modalImage = document.getElementById('modal-image');
const photoClickables = document.querySelectorAll('.photo-clickable');
const modalClose = document.querySelector('.modal-close');
const modalBackdrop = document.querySelector('.modal-backdrop');

// Image source mapping
const imageSources = {
    'main': 'img/1.png',
    'child1': 'img/2.png',
    'child2': 'img/3.png', 
    'album1': 'img/4.png',
    'album2': 'img/5.png',
    'album3': 'img/6.png',
    'album4': 'img/7.png',
    'album5': 'img/8.png',
    'album6': 'img/10.png',
    'album7': 'img/11.png',
    'venue': 'img/9.png'
};

// Initialize modal functionality
function initializeModal() {
    // Add click event listeners to all clickable photos
    photoClickables.forEach(photo => {
        photo.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const photoId = photo.getAttribute('data-photo');
            openPhotoModal(photoId);
        });
        
        // Add keyboard navigation
        photo.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const photoId = photo.getAttribute('data-photo');
                openPhotoModal(photoId);
            }
        });
        
        // Make photo items focusable
        photo.setAttribute('tabindex', '0');
    });

    // Close modal event listeners
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }

    // Global escape key listener
    document.addEventListener('keydown', handleModalEscape);
}

// Open photo modal
function openPhotoModal(photoId) {
    if (photoModal && modalImage && imageSources[photoId]) {
        console.log('Opening modal for:', photoId, imageSources[photoId]);
        
        // Set the image source
        modalImage.src = imageSources[photoId];
        modalImage.alt = `Увеличенное фото: ${photoId}`;
        
        // Show modal
        photoModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
        
        // Focus on close button for accessibility
        setTimeout(() => {
            if (modalClose) {
                modalClose.focus();
            }
        }, 100);
        
        // Add kawaii entrance effect
        const modalContent = photoModal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.8) translateY(-50px)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modalContent.style.transform = 'scale(1) translateY(0)';
                modalContent.style.opacity = '1';
                modalContent.style.transition = 'all 0.3s ease-out';
            }, 10);
        }
    } else {
        console.error('Modal elements not found or invalid photoId:', photoId);
    }
}

// Close modal function
function closeModal() {
    if (photoModal) {
        console.log('Closing modal');
        
        const modalContent = photoModal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.8) translateY(-50px)';
            modalContent.style.opacity = '0';
            modalContent.style.transition = 'all 0.3s ease-out';
        }
        
        setTimeout(() => {
            photoModal.classList.add('hidden');
            document.body.style.overflow = '';
            document.body.classList.remove('modal-open');
            
            // Reset modal content styles
            if (modalContent) {
                modalContent.style.transform = '';
                modalContent.style.opacity = '';
                modalContent.style.transition = '';
            }
        }, 300);
    }
}

// Handle escape key for modal
function handleModalEscape(e) {
    if (e.key === 'Escape' && photoModal && !photoModal.classList.contains('hidden')) {
        closeModal();
    }
}

// Kawaii effects
function createKawaiiSparkles(element) {
    const sparkles = ['✨', '💖', '🌸', '⭐', '💫'];
    const sparkle = document.createElement('span');
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.position = 'absolute';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '1.2rem';
    sparkle.style.animation = 'sparkleFloat 1.5s ease-out forwards';
    sparkle.style.zIndex = '10';
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
    sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1500);
}

// Add sparkle animation keyframes
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-30px) scale(0.5);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Add hover effects to clickable photos
function addPhotoHoverEffects() {
    photoClickables.forEach(photo => {
        photo.addEventListener('mouseenter', () => {
            createKawaiiSparkles(photo);
        });
        
        photo.addEventListener('mouseleave', () => {
            // Add a gentle glow effect on hover out
            photo.style.transition = 'all 0.3s ease';
        });
    });
}

// Smooth scroll function
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add floating animation to decorative elements
function initializeFloatingAnimations() {
    const decorativeElements = document.querySelectorAll('.birthday-decoration span, .corner-emoji, .photo-decoration');
    
    decorativeElements.forEach((element, index) => {
        element.style.animationDelay = (index * 0.2) + 's';
    });
}

// Initialize kawaii interactions
function initializeKawaiiInteractions() {
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.telegram-button, .info-card, .program-item');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// Error handling for images
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            // You could add a placeholder image here if needed
            this.style.backgroundColor = '#f0f0f0';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.innerHTML = '📸';
        });
        
        img.addEventListener('load', function() {
            console.log('Image loaded successfully:', this.src);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing birthday invitation app...');
    
    initializeModal();
    addPhotoHoverEffects();
    initializeFloatingAnimations();
    initializeKawaiiInteractions();
    handleImageErrors();
    
    console.log('Birthday invitation app initialized successfully!');
});

// Expose global functions for inline event handlers
window.closeModal = closeModal;
window.openPhotoModal = openPhotoModal;

// Add resize handler for responsive behavior
window.addEventListener('resize', function() {
    // Handle modal positioning on resize
    if (photoModal && !photoModal.classList.contains('hidden')) {
        const modalContent = photoModal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.maxWidth = '90vw';
            modalContent.style.maxHeight = '90vh';
        }
    }
});

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Call lazy loading initialization
document.addEventListener('DOMContentLoaded', initializeLazyLoading);