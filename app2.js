/**
 * Роскошный сайт-приглашение на свадьбу - JavaScript функционал
 * ИСПРАВЛЕНИЯ: убрана желтизна, центрирован блок особенностей, исправлена анимация timeline
 * Правильные пути к фотографиям: img/1.png - img/11.png
 */

// === МОДУЛЬ АНИМАЦИЙ ПРИ СКРОЛЛЕ ===
class ScrollAnimations {
  constructor() {
    this.observer = null;
    this.timelineObserver = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
      this.setupTimelineAnimation(); // ИСПРАВЛЕНИЕ 3: Отдельная анимация для timeline
    } else {
      this.fallbackAnimation();
    }
    
    this.setupParallaxEffects();
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.15
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.animateChildrenWithDelay(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    const animatedElements = document.querySelectorAll('.section-animate:not(.schedule-section)');
    animatedElements.forEach(element => {
      this.observer.observe(element);
    });
  }

  // ИСПРАВЛЕНИЕ 3: Улучшенная анимация timeline
  setupTimelineAnimation() {
    const scheduleSection = document.querySelector('.schedule-section');
    if (!scheduleSection) return;

    const timelineOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.2
    };

    this.timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.animateTimelineItems();
          this.timelineObserver.unobserve(entry.target);
        }
      });
    }, timelineOptions);

    this.timelineObserver.observe(scheduleSection);
  }

  // ИСПРАВЛЕНИЕ 3: Плавная последовательная анимация timeline
  animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
        
        // Добавляем эффект появления
        const timeBlock = item.querySelector('.timeline-time-block');
        const content = item.querySelector('.timeline-content');
        
        if (timeBlock) {
          timeBlock.style.animation = 'scaleIn 0.5s ease-out forwards';
        }
        
        if (content) {
          setTimeout(() => {
            content.style.animation = 'fadeInUp 0.6s ease-out forwards';
          }, 200);
        }
      }, index * 200); // 200ms задержка между элементами
    });
  }

  animateChildrenWithDelay(section) {
    // Специальные анимации для разных типов элементов
    const photos = section.querySelectorAll('.photo-item');
    const cards = section.querySelectorAll('.detail-card');
    
    // Анимация фото галереи
    photos.forEach((photo, index) => {
      setTimeout(() => {
        photo.style.opacity = '1';
        photo.style.transform = 'translateY(0) scale(1)';
      }, index * 120);
    });
    
    // Анимация карточек деталей
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
        card.style.animation = 'luxuryAppear 0.8s ease-out forwards';
      }, index * 150);
    });
  }

  setupParallaxEffects() {
    // Параллакс эффекты для фоновых элементов
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.baikal-background');
      const particles = document.querySelector('.golden-particles');
      
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.1}px)`;
      }
      
      if (particles) {
        particles.style.transform = `translateY(${scrolled * 0.05}px)`;
      }
    });
  }

  fallbackAnimation() {
    // Простая анимация для старых браузеров
    const elements = document.querySelectorAll('.section-animate');
    elements.forEach(element => {
      element.classList.add('visible');
    });
  }
}

// === МОДУЛЬ ФОТОГАЛЕРЕИ ===
class PhotoGallery {
  constructor() {
    this.modal = null;
    this.modalImage = null;
    this.currentIndex = 0;
    this.photos = [];
    this.init();
  }

  init() {
    this.setupModal();
    this.setupPhotoClickHandlers();
    this.setupKeyboardNavigation();
  }

  setupModal() {
    this.modal = document.getElementById('photoModal');
    this.modalImage = document.getElementById('modalImage');
    const closeBtn = document.getElementById('closeModal');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }
    
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal || e.target.classList.contains('modal-backdrop')) {
          this.closeModal();
        }
      });
    }
  }

  setupPhotoClickHandlers() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach((item, index) => {
      const img = item.querySelector('img');
      if (img) {
        this.photos.push({
          src: img.src,
          alt: img.alt
        });
        
        item.addEventListener('click', () => {
          this.openModal(index);
        });
        
        // Курсор pointer для указания кликабельности
        item.style.cursor = 'pointer';
        
        // Добавляем hover эффект
        item.addEventListener('mouseenter', () => {
          item.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
          item.style.transform = 'translateY(0) scale(1)';
        });
      }
    });
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (!this.modal || this.modal.classList.contains('hidden')) return;
      
      switch(e.key) {
        case 'Escape':
          this.closeModal();
          break;
        case 'ArrowLeft':
          this.showPrevious();
          break;
        case 'ArrowRight':
          this.showNext();
          break;
      }
    });
  }

  openModal(index) {
    if (!this.modal || !this.modalImage) return;
    
    this.currentIndex = index;
    const photo = this.photos[index];
    
    if (photo) {
      this.modalImage.src = photo.src;
      this.modalImage.alt = photo.alt;
      this.modal.classList.remove('hidden');
      
      // Предотвращаем прокрутку страницы
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    if (!this.modal) return;
    
    this.modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  showNext() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    this.updateModalImage();
  }

  showPrevious() {
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    this.updateModalImage();
  }

  updateModalImage() {
    if (!this.modalImage) return;
    
    const photo = this.photos[this.currentIndex];
    if (photo) {
      this.modalImage.src = photo.src;
      this.modalImage.alt = photo.alt;
    }
  }
}

// === МОДУЛЬ ОБЩИХ ИНТЕРАКТИВНЫХ ЭЛЕМЕНТОВ ===
class InteractiveElements {
  constructor() {
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupButtonEffects();
    this.setupFormValidation();
    this.setupLoadingEffects();
  }

  setupSmoothScrolling() {
    // Плавная прокрутка к якорям
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Отступ для фиксированного хедера
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupButtonEffects() {
    // Улучшенные эффекты для кнопок
    const buttons = document.querySelectorAll('.contact-btn, .detail-card');
    
    buttons.forEach(button => {
      // Ripple эффект
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
    
    // Добавляем CSS для ripple анимации
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  setupFormValidation() {
    // Валидация форм (если будут добавлены)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Можно добавить логику валидации
        console.log('Форма отправлена');
      });
    });
  }

  setupLoadingEffects() {
    // Эффекты загрузки
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      
      // Последовательное появление элементов hero секции
      setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-image, .hero-text > *');
        
        heroElements.forEach((element, index) => {
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, index * 200);
        });
      }, 500);
    });
    
    // Прелоадер для изображений
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
      }
    });
  }
}

// === ИНИЦИАЛИЗАЦИЯ ===
document.addEventListener('DOMContentLoaded', () => {
  console.log('Сайт-приглашение запущен...');
  
  try {
    // Инициализация всех модулей
    new ScrollAnimations();
    new PhotoGallery();
    new InteractiveElements();
    
    console.log('Все модули успешно инициализированы');
    
  } catch (error) {
    console.error('Ошибка инициализации:', error);
  }
});

// === ОПТИМИЗАЦИЯ ===

// Debounce функция для оптимизации scroll событий
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

// Throttle функция для оптимизации параллакс эффектов
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Ленивая загрузка изображений
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback для старых браузеров
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}