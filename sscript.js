// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translateY(8px)' : '';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translateY(-8px)' : '';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-wrapper')) {
            navMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshol