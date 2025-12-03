// Main JavaScript for Professional Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.querySelector('.preloader');
  
  // Hide preloader after page loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 1000);
  });

  // Navigation
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navBar = document.querySelector('.floating-nav');
  const sections = document.querySelectorAll('section[id]');
  const backToTop = document.querySelector('.back-to-top');

  // Toggle mobile menu
  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Add shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navBar.classList.add('scrolled');
    } else {
      navBar.classList.remove('scrolled');
    }

    // Show back to top button
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active link highlighting
    let scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.floating-nav').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animated counters
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 20);
  };

  // Skill bars animation
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const animateSkillBars = () => {
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      if (isElementInViewport(bar)) {
        bar.style.width = `${width}%`;
      }
    });
  };

  // Timeline animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const animateTimeline = () => {
    timelineItems.forEach(item => {
      if (isElementInViewport(item)) {
        item.classList.add('visible');
      }
    });
  };

  // Check if element is in viewport
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  };

  // Initialize animations on scroll
  const handleScrollAnimations = () => {
    // Animate counters
    statNumbers.forEach(number => {
      if (isElementInViewport(number) && !number.classList.contains('animated')) {
        number.classList.add('animated');
        animateCounter(number);
      }
    });
    
    // Animate skill bars
    animateSkillBars();
    
    // Animate timeline
    animateTimeline();
  };

  // Listen for scroll events
  window.addEventListener('scroll', handleScrollAnimations);
  
  // Initial animation check
  handleScrollAnimations();

  // EmailJS Contact Form
  emailjs.init('CzeZ88MZJ1_oue-I0');
  
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        from_name: this[0].value,
        from_email: this[1].value,
        subject: this[2].value,
        message: this[3].value
      };
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.querySelector('.btn-text').textContent;
      submitBtn.querySelector('.btn-text').textContent = 'Sending...';
      submitBtn.disabled = true;
      
      emailjs.send('service_2w3kt9r', 'template_0edu5tf', formData)
        .then(() => {
          showNotification('Message sent successfully!', 'success');
          contactForm.reset();
        })
        .catch((error) => {
          showNotification('Failed to send message. Please try again.', 'error');
          console.error('EmailJS Error:', error);
        })
        .finally(() => {
          submitBtn.querySelector('.btn-text').textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  // Notification system
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 400);
    }, 5000);
  }

  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero section animations
  gsap.from('.hero-badge', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power3.out'
  });
  
  gsap.from('.hero-title', {
    duration: 1.2,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.3
  });
  
  gsap.from('.hero-subtitle', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.6
  });
  
  gsap.from('.hero-cta', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.9
  });
  
  gsap.from('.hero-scroll', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power3.out',
    delay: 1.2
  });
  
  // Section headers animation
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });
  });
  
  // Project cards animation
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
      delay: i * 0.1
    });
  });
  
  // Skill categories animation
  gsap.utils.toArray('.skill-category').forEach((category, i) => {
    gsap.from(category, {
      scrollTrigger: {
        trigger: category,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
      delay: i * 0.2
    });
  });

  // Parallax effect for background elements
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const speed = 0.5;
    
    document.querySelectorAll('.bg-circle, .bg-shape').forEach(element => {
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Add hover effects to project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = (x - centerX) / 25;
      const rotateX = (centerY - y) / 25;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // Add keyboard navigation support
  document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Tab key navigation trap for mobile menu
    if (navMenu.classList.contains('active')) {
      const focusableElements = navMenu.querySelectorAll('a, button');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    }
  });

  // Add focus styles for accessibility
  document.addEventListener('focusin', (e) => {
    if (e.target.matches('a, button, input, textarea')) {
      e.target.classList.add('focused');
    }
  });

  document.addEventListener('focusout', (e) => {
    if (e.target.matches('a, button, input, textarea')) {
      e.target.classList.remove('focused');
    }
  });

  // Performance optimization: Debounce scroll events
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      handleScrollAnimations();
    }, 100);
  });

  // Lazy loading for images
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for older browsers
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }

  // Add CSS for focused elements
  const style = document.createElement('style');
  style.textContent = `
    .focused {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }
    
    .focused:not(input):not(textarea) {
      box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.3);
    }
  `;
  document.head.appendChild(style);

  // Initialize particles background if needed
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#4361ee" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#4361ee",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        }
      }
    });
  }
});
