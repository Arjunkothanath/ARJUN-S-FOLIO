/**
 * ULTRA SMOOTH PORTFOLIO SCRIPT
 * Performance Optimized with Advanced Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==================== PRELOADER ====================
  const preloader = document.getElementById('preloader');
  const progressFill = document.querySelector('.progress-fill');
  
  // Simulate loading progress
  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      
      // Hide preloader with smooth animation
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Initialize animations after preloader
        setTimeout(initializeAnimations, 300);
      }, 500);
    }
    progressFill.style.width = `${progress}%`;
  }, 100);

  // ==================== NAVIGATION ====================
  const nav = document.getElementById('mainNav');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');
  
  // Toggle mobile menu
  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Add shadow on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove nav shadow
    if (currentScroll > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (currentScroll > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    lastScroll = currentScroll;
  });

  // ==================== SMOOTH SCROLLING ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = nav.offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==================== CURSOR EFFECTS ====================
  const cursorDot = document.getElementById('cursorDot');
  const cursorCircle = document.getElementById('cursorCircle');
  let mouseX = 0;
  let mouseY = 0;
  let circleX = 0;
  let circleY = 0;
  
  // Only enable cursor effects on desktop
  if (window.matchMedia('(min-width: 768px)').matches) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
      // Dot follows mouse directly
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
      
      // Circle follows with delay
      circleX += (mouseX - circleX) * 0.1;
      circleY += (mouseY - circleY) * 0.1;
      
      cursorCircle.style.left = `${circleX}px`;
      cursorCircle.style.top = `${circleY}px`;
      
      requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-category');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.width = '16px';
        cursorDot.style.height = '16px';
        cursorCircle.style.width = '60px';
        cursorCircle.style.height = '60px';
        cursorCircle.style.opacity = '0.2';
      });
      
      el.addEventListener('mouseleave', () => {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorCircle.style.width = '40px';
        cursorCircle.style.height = '40px';
        cursorCircle.style.opacity = '0.5';
      });
    });
  } else {
    // Hide cursor elements on mobile
    cursorDot.style.display = 'none';
    cursorCircle.style.display = 'none';
  }

  // ==================== PARTICLE BACKGROUND ====================
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;
    
    // Set canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(67, 97, 238, ${Math.random() * 0.5 + 0.1})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(67, 97, 238, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animateParticles);
    }
    
    // Start animation
    animateParticles();
  }

  // ==================== ANIMATION SYSTEM ====================
  function initializeAnimations() {
    // Animate hero elements
    const heroElements = document.querySelectorAll('.animate-fade-up, .animate-text-reveal, .animate-scale-in');
    
    heroElements.forEach((el, index) => {
      const delay = parseFloat(el.style.getPropertyValue('--delay') || 0);
      setTimeout(() => {
        el.classList.add('animated');
      }, index * 100 + delay * 1000);
    });
    
    // Initialize Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          
          // Add appropriate animation class
          if (el.classList.contains('animate-fade-up') ||
              el.classList.contains('animate-slide-left') ||
              el.classList.contains('animate-slide-right') ||
              el.classList.contains('animate-slide-up') ||
              el.classList.contains('animate-scale-in') ||
              el.classList.contains('animate-count')) {
            el.classList.add('animated');
          }
          
          // Special handling for text reveal
          if (el.classList.contains('animate-text-reveal')) {
            setTimeout(() => {
              el.classList.add('animated');
            }, 200);
          }
          
          // Special handling for timeline progress
          if (el.classList.contains('timeline-item')) {
            const timelineProgress = document.querySelector('.timeline-progress');
            const timelineItems = document.querySelectorAll('.timeline-item');
            const visibleItems = Array.from(timelineItems).filter(item => {
              const rect = item.getBoundingClientRect();
              return rect.top < window.innerHeight * 0.8;
            }).length;
            
            const progress = (visibleItems / timelineItems.length) * 100;
            timelineProgress.style.transform = `scaleY(${progress / 100})`;
          }
        }
      });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
      '.animate-fade-up, .animate-text-reveal, .animate-scale-in, ' +
      '.animate-slide-left, .animate-slide-right, .animate-slide-up, ' +
      '.timeline-item, .skill-category, .project-card, .certificate-card, ' +
      '.info-card, .contact-form, .soft-skill, .social-links'
    );
    
    animatableElements.forEach(el => observer.observe(el));
    
    // Animate skill bars when in view
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const width = skillBar.getAttribute('data-width');
          skillBar.style.width = `${width}%`;
        }
      });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
    
    // Animate counters
    const counters = document.querySelectorAll('.animate-count');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          counter.classList.add('animated');
          
          const countElement = counter.querySelector('.stat-number');
          const target = parseInt(counter.getAttribute('data-count'));
          const delay = parseFloat(counter.getAttribute('data-delay') || 0);
          
          setTimeout(() => {
            animateCounter(countElement, target);
          }, delay * 1000);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ==================== COUNTER ANIMATION ====================
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 30);
  }

  // ==================== CONTACT FORM ====================
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };
      
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.querySelector('.btn-text').textContent;
      submitBtn.querySelector('.btn-text').textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call (replace with actual EmailJS or backend integration)
      setTimeout(() => {
        // Show success message
        formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.querySelector('.btn-text').textContent = originalText;
        submitBtn.disabled = false;
        
        // Hide status after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }

  // ==================== PROJECT CARD HOVER EFFECTS ====================
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / 20;
        const rotateX = (centerY - y) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ==================== TECH STACK VISUAL ANIMATION ====================
  const techItems = document.querySelectorAll('.tech-item');
  
  techItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });

  // ==================== SET CURRENT YEAR ====================
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // ==================== INITIALIZE EVERYTHING ====================
  function init() {
    // Initialize particles
    initParticles();
    
    // Initialize animations after a short delay
    setTimeout(() => {
      if (document.readyState === 'complete') {
        initializeAnimations();
      }
    }, 100);
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      // Escape key closes mobile menu
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      // Tab key navigation for accessibility
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('click', () => {
      document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus styles for accessibility
    document.addEventListener('focusin', (e) => {
      if (e.target.matches('a, button, input, textarea, [tabindex]')) {
        e.target.classList.add('focused');
      }
    });
    
    document.addEventListener('focusout', (e) => {
      if (e.target.matches('a, button, input, textarea, [tabindex]')) {
        e.target.classList.remove('focused');
      }
    });
    
    // Add CSS for focused elements
    const style = document.createElement('style');
    style.textContent = `
      .focused {
        outline: 2px solid var(--primary) !important;
        outline-offset: 2px !important;
      }
      
      .keyboard-navigation :focus {
        outline: 2px solid var(--primary) !important;
        outline-offset: 2px !important;
      }
      
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Start initialization
  init();
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Recalculate anything that depends on window size
    const event = new Event('optimizedResize');
    window.dispatchEvent(event);
  }, 250);
});

// Performance optimization: Lazy load non-critical elements
if ('IntersectionObserver' in window) {
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Lazy load images
        if (element.tagName === 'IMG' && element.dataset.src) {
          element.src = element.dataset.src;
          element.removeAttribute('data-src');
        }
        
        lazyObserver.unobserve(element);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    lazyObserver.observe(img);
  });
}

// Performance optimization: RequestAnimationFrame for smooth animations
let lastTime = 0;
const fps = 60;
const interval = 1000 / fps;

function animate(time) {
  requestAnimationFrame(animate);
  
  const delta = time - lastTime;
  if (delta > interval) {
    // Update animations here if needed
    lastTime = time - (delta % interval);
  }
}

// Start animation loop
requestAnimationFrame(animate);

// Performance optimization: Preload critical resources
function preloadResources() {
  const resources = [
    // Add any critical resources to preload
  ];
  
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    document.head.appendChild(link);
  });
}

// Initialize preloading
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', preloadResources);
} else {
  preloadResources();
}
