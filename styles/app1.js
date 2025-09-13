// Photo modal functionality
const photoModal = document.getElementById('photo-modal');
const photoItems = document.querySelectorAll('.photo-item');

// Add click event listeners to photo items
photoItems.forEach(item => {
    item.addEventListener('click', () => {
        openPhotoModal(item.dataset.photo);
    });
    
    // Add keyboard navigation
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPhotoModal(item.dataset.photo);
        }
    });
    
    // Make photo items focusable
    item.setAttribute('tabindex', '0');
});

// Open photo modal
function openPhotoModal(photoId) {
    if (photoModal) {
        photoModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus on modal for accessibility
        const closeButton = photoModal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.focus();
        }
        
        // Add escape key listener
        document.addEventListener('keydown', handleModalEscape);
    }
}

// Close modal function
function closeModal() {
    if (photoModal) {
        photoModal.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Remove escape key listener
        document.removeEventListener('keydown', handleModalEscape);
    }
}

// Handle escape key for modal
function handleModalEscape(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

// RSVP button functionality
function openRSVP() {
    // Create a simple alert for RSVP confirmation
    const confirmation = confirm('Вы хотите подтвердить своё участие в празднике? Нажмите OK для подтверждения.');
    
    if (confirmation) {
        // Show success message
        showNotification('Спасибо за подтверждение! Ждём вас на празднике! 🎉', 'success');
        
        // Optional: You could integrate with a real RSVP system here
        // For example: sendRSVPToServer();
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">&times;</button>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 2000;
        background: var(--color-surface);
        border: 2px solid var(--color-success);
        border-radius: var(--radius-lg);
        padding: var(--space-16) var(--space-20);
        box-shadow: var(--shadow-lg);
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification.querySelector('.notification-close'));
        }
    }, 5000);
}

// Close notification
function closeNotification(button) {
    const notification = button.closest('.notification');
    if (notification) {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }
}

// Smooth scrolling for anchor links (if any are added)
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize scroll animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
}

// Enhanced photo hover effects
function initPhotoEffects() {
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
    
    photoPlaceholders.forEach(photo => {
        photo.addEventListener('mouseenter', () => {
            // Add a subtle glow effect
            photo.style.boxShadow = '0 0 20px rgba(33, 128, 141, 0.5), var(--shadow-lg)';
        });
        
        photo.addEventListener('mouseleave', () => {
            // Remove glow effect
            photo.style.boxShadow = 'var(--shadow-lg)';
        });
    });
}

// Fun interactive elements
function createConfetti() {
    // Simple confetti effect for special interactions
    const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 1500;
            border-radius: 50%;
            pointer-events: none;
            animation: confettiFall ${2 + Math.random() * 3}s linear infinite;
        `;
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 5000);
    }
}

// Add confetti CSS animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-12);
    }
    
    .notification-message {
        color: var(--color-text);
        font-weight: var(--font-weight-medium);
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--color-text-secondary);
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
        background-color: var(--color-secondary);
    }
`;
document.head.appendChild(confettiStyle);

// Easter egg: birthday song on triple click
let clickCount = 0;
let clickTimer = null;

document.addEventListener('click', () => {
    clickCount++;
    
    if (clickTimer) {
        clearTimeout(clickTimer);
    }
    
    clickTimer = setTimeout(() => {
        if (clickCount === 3) {
            // Triple click detected - show special birthday message
            showNotification('🎵 С днём рождения тебя! 🎵', 'success');
            createConfetti();
        }
        clickCount = 0;
    }, 500);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Birthday invitation loaded! 🎉');
    
    // Initialize scroll animations with a delay to ensure proper loading
    setTimeout(() => {
        initScrollAnimations();
    }, 100);
    
    // Initialize photo effects
    initPhotoEffects();
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Добро пожаловать на страницу приглашения! 🎊', 'info');
    }, 1000);
});

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Adjust modal size if it's open
        if (!photoModal.classList.contains('hidden')) {
            const modalPhoto = photoModal.querySelector('.modal-photo-placeholder');
            if (modalPhoto && window.innerWidth < 480) {
                modalPhoto.style.width = '280px';
                modalPhoto.style.height = '200px';
            }
        }
    }, 250);
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Skip to main content with Alt+M
    if (e.altKey && e.key === 'm') {
        const mainContent = document.querySelector('.welcome-section');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Export functions for global access
window.openRSVP = openRSVP;
window.closeModal = closeModal;
window.closeNotification = closeNotification;