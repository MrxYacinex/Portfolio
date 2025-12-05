import './style.css'

// Scroll Reveal Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Select elements to animate
const animatedElements = document.querySelectorAll('.section-title, .about-text, .stat-item, .project-card, .contact-container');

animatedElements.forEach((el, index) => {
  el.classList.add('hidden-element');
  // Add staggering delay for grid items
  if (el.classList.contains('project-card') || el.classList.contains('stat-item')) {
    el.style.transitionDelay = `${(index % 3) * 0.1}s`;
  }
  observer.observe(el);
});

console.log('Portfolio initialized with animations');
