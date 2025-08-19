// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('primary-nav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // Close on link click
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Intersection observer for reveals
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -8%', threshold: 0.2 });

revealEls.forEach(el => io.observe(el));

// Parallax (subtle)
const pxEls = [...document.querySelectorAll('[data-parallax]')];
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

let ticking = false;
function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const vh = window.innerHeight;
      pxEls.forEach(el => {
        const speed = parseFloat(el.dataset.speed || '0.12');
        const rect = el.getBoundingClientRect();
        // Center-based offset
        const offset = (rect.top + rect.height/2) - (vh/2);
        const translate = clamp(-offset * speed, -60, 60);
        el.style.transform = `translate3d(0, ${translate}px, 0)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}
document.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
window.addEventListener('load', onScroll);

// Counters
const counters = document.querySelectorAll('[data-count-to]');
const co = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target, parseInt(entry.target.dataset.countTo, 10), 1200);
      co.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
counters.forEach(el => co.observe(el));

function animateCounter(el, to, duration=1000){
  const start = performance.now();
  const from = 0;

  function frame(now){
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    const val = Math.round(from + (to - from) * eased);
    el.textContent = val;
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();