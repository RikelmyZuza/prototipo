// script.js - Geovanna Studio

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const navbarToggler = document.querySelector('.navbar-toggler');
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
          }
        }
      });
    });
  
    // Portfolio filter
    const filterButtons = document.querySelectorAll('.btn-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.classList.add('show');
            }, 50);
          } else {
            item.classList.remove('show');
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  
    // Initialize all portfolio items as visible
    portfolioItems.forEach(item => {
      item.style.display = 'block';
      setTimeout(() => {
        item.classList.add('show');
      }, 100);
    });
  
    // Animation on scroll
    function animateOnScroll() {
      const elements = document.querySelectorAll('.section-title, .card, .sobre-img, .service-card, .testimonial-item');
      const windowHeight = window.innerHeight;
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const animationPoint = windowHeight * 0.8;
        
        if (elementPosition < animationPoint) {
          element.classList.add('animate');
        }
      });
    }
  
    // Initialize animations
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
  
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For demo purposes, we'll just show an alert
        alert('Obrigada pela sua mensagem! Entrarei em contato em breve.');
        this.reset();
      });
    }

    
  
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value) {
          alert('Obrigada por assinar nossa newsletter! Você receberá nossas novidades em breve.');
          emailInput.value = '';
        }
      });
    }
  
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  
    // Initialize testimonial carousel
    const testimonialCarousel = new bootstrap.Carousel(document.getElementById('testimonialCarousel'), {
      interval: 5000,
      pause: 'hover',
      wrap: true
    });

    // Initialize hero carousel
    const heroCarousel = new bootstrap.Carousel(document.getElementById('heroCarousel'), {
      interval: 5000,
      ride: 'carousel',
      wrap: true,
      pause: false
    });
});

// Modal gallery functionality
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('portfolio-image')) {
    const modalId = e.target.getAttribute('data-modal-target');
    const modal = document.getElementById(modalId);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
  }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
  }
});

// Hero text carousel functionality
function rotateHeroText() {
  const heroTitles = document.querySelectorAll('.title-carousel h1');
  if (heroTitles.length === 0) return;

  let currentIndex = 0;
  
  // Hide all titles except the first one
  heroTitles.forEach((title, index) => {
    title.style.opacity = index === 0 ? 1 : 0;
  });

  setInterval(() => {
    // Fade out current title
    heroTitles[currentIndex].style.opacity = 0;
    
    // Calculate next index
    currentIndex = (currentIndex + 1) % heroTitles.length;
    
    // Fade in next title
    setTimeout(() => {
      heroTitles[currentIndex].style.opacity = 1;
    }, 500);
    
  }, 3000); // Change every 3 seconds
}

// Start the hero text rotation when DOM is loaded
document.addEventListener('DOMContentLoaded', rotateHeroText);

// Atualize a função de scroll para destacar o item ativo
window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Destacar link ativo baseado na posição de scroll
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}` || 
            (link.getAttribute('href').includes('index.html') && link.getAttribute('href').includes(`#${sectionId}`))) {
          link.classList.add('active');
        }
      });
    }
  });
});