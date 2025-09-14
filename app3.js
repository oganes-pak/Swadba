// smooth-app3.js - улучшенная версия с плавными анимациями

document.addEventListener('DOMContentLoaded', () => {

// Reveal on scroll с улучшенными настройками
const revealEls = document.querySelectorAll('.reveal, .card');

const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('inview');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => obs.observe(el));

// Card hover с более плавными переходами
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.boxShadow = '0 20px 48px rgba(0,0,0,.12)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,.06)';
    });
});

// Кнопки – более плавный пульс
const buttons = document.querySelectorAll('.tg-btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.classList.add('pulse');
    });

    btn.addEventListener('mouseleave', () => {
        btn.classList.remove('pulse');
    });
});

// Улучшенные hover-подсказки
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(el => {
    const tip = document.createElement('div');
    tip.className = 'tooltip';
    tip.textContent = el.getAttribute('data-tooltip');
    document.body.appendChild(tip);

    el.addEventListener('mouseenter', e => {
        tip.style.opacity = '1';
        tip.style.transform = 'translateY(-6px)';
        tip.style.left = e.pageX + 'px';
        tip.style.top = (e.pageY - 40) + 'px';
    });

    el.addEventListener('mousemove', e => {
        tip.style.left = e.pageX + 'px';
        tip.style.top = (e.pageY - 40) + 'px';
    });

    el.addEventListener('mouseleave', () => {
        tip.style.opacity = '0';
        tip.style.transform = 'translateY(0)';
    });
});

// УЛУЧШЕННЫЙ автоскролл галереи - более плавный и приятный
function improvedAutoScroll() {
    const gallery = document.querySelector('.grid.cards-2');
    if (!gallery) return;

    let scrollAmount = 0;
    let isScrolling = false;
    let animationId;
    
    const totalWidth = gallery.scrollWidth - gallery.clientWidth;
    const scrollDuration = 60000; // 60 секунд на полный цикл
    const pauseDuration = 2000; // 2 секунды паузы
    
    function smoothScroll() {
        if (!isScrolling) return;
        
        const progress = scrollAmount / totalWidth;
        const easeProgress = easeInOutCubic(progress);
        
        gallery.scrollLeft = easeProgress * totalWidth;
        
        scrollAmount += totalWidth / (scrollDuration / 16); // 60fps
        
        if (scrollAmount >= totalWidth) {
            isScrolling = false;
            setTimeout(() => {
                scrollAmount = 0;
                gallery.scrollTo({ left: 0, behavior: 'smooth' });
                setTimeout(() => {
                    isScrolling = true;
                    smoothScroll();
                }, 1000);
            }, pauseDuration);
        } else {
            animationId = requestAnimationFrame(smoothScroll);
        }
    }
    
    // Функция плавного easing
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    // Запуск автоскролла
    isScrolling = true;
    smoothScroll();
    
    // Пауза при hover
    gallery.addEventListener('mouseenter', () => {
        isScrolling = false;
        if (animationId) cancelAnimationFrame(animationId);
    });
    
    gallery.addEventListener('mouseleave', () => {
        setTimeout(() => {
            isScrolling = true;
            smoothScroll();
        }, 500);
    });
}

// Запуск улучшенного автоскролла
setTimeout(improvedAutoScroll, 1000);

});

// Улучшенные CSS-анимации с более плавными переходами
const style = document.createElement('style');
style.innerHTML = `
.inview {
    animation: fadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.pulse {
    animation: pulseAnim 1s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes pulseAnim {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.tooltip {
    position: absolute;
    background: rgba(0,0,0,.85);
    color: #fff;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 13px;
    pointer-events: none;
    opacity: 0;
    transform: translateY(0);
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    backdrop-filter: blur(4px);
}

/* Плавный скролл для галереи */
.grid.cards-2 {
    scroll-behavior: smooth;
    overflow-x: hidden; /* скрываем стандартный скролл */
}

/* Улучшенные переходы для карточек */
.card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, box-shadow;
}

.card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 48px rgba(0,0,0,.12);
}

/* Плавные переходы для кнопок */
.tg-btn {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, box-shadow;
}

.tg-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 36px rgba(0,0,0,.08);
}

.tg-btn::after {
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Оптимизация производительности */
* {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    
    .grid.cards-2 {
        overflow-x: auto;
    }
}
`;
// Плавное появление блоков через IntersectionObserver
(function() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    // Фоллбек: сразу показываем
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Можно отключать наблюдение после появления:
        obs.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  items.forEach(el => obs.observe(el));
})();
// Разместить в app3.js (или ниже перед </body>)
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.reveal');

  // Фоллбек: если IntersectionObserver не поддерживается — показать сразу
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  items.forEach(el => obs.observe(el));
});
// Принудительно применить анимацию через JS
document.querySelector('.hero-visual').style.animation = 'heroFloat 8s ease-in-out infinite';
// Простая анимация карточек через JS
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.cards-3 .card');
  
  cards.forEach((card, index) => {
    // Начальное состояние
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    
    // Запуск анимации с задержкой
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + (index * 200)); // задержка 100ms + 200ms для каждой карточки
    
    // Hover эффект
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
      card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = 'none';
    });
  });
});
// Специальный наблюдатель для card-animated элементов
const cardAnimatedEls = document.querySelectorAll('.card-animated');
const cardAnimatedObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('inview');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

cardAnimatedEls.forEach(el => cardAnimatedObserver.observe(el));

document.head.appendChild(style);