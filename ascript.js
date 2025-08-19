// Utilities
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

document.addEventListener('DOMContentLoaded', () => {
  // Current year
  $('#year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = $('.nav-toggle');
  const nav = $('#nav');
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  // Close on link click (mobile)
  $$('[data-nav-link]').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  // Smooth scroll with header offset
  const header = $('[data-header]');
  const headerH = () => header.getBoundingClientRect().height;
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      const target = id && $(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - (headerH() - 1);
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Progress bar
  const progress = $('#progress');
  const setProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
    progress.style.width = pct + '%';
  };
  setProgress();
  window.addEventListener('scroll', setProgress, { passive: true });

  // Nav active on scroll
  const sections = $$('[data-section]');
  const navLinks = $$('[data-nav-link]');
  const map = new Map(sections.map(sec => [sec.id, sec]));
  const observerSections = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: `-40% 0px -55% 0px`, threshold: 0.01 });
  sections.forEach(sec => observerSections.observe(sec));

  // Reveal on scroll
  const revealEls = $$('.reveal');
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  // Lazy-load images
  const lazyImgs = $$('.lazy');
  const lazyObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.onload = () => img.removeAttribute('data-src');
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '200px 0px' });
  lazyImgs.forEach(img => lazyObs.observe(img));

  // Parallax hero image
  const heroImg = $('.hero-media img');
  const parallax = () => {
    const y = window.scrollY * 0.15;
    heroImg.style.transform = `translateY(${y}px) scale(1.06)`;
  };
  parallax();
  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(parallax);
  }, { passive: true });

  // Count up stats when visible
  const counters = $$('.stat-number');
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  const counterObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        el.textContent = Math.round(target * easeOutCubic(p));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));
});