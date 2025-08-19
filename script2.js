// script.js

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Number Animation for Stats
const animateNumbers = () => {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                
                if (target >= 1000000) {
                    number.textContent = (current / 1000000).toFixed(0) + 'M+';
                } else if (target >= 1000) {
                    number.textContent = (current / 1000).toFixed(0) + 'K+';
                } else {
                    number.textContent = Math.ceil(current) + '%';
                }
                
                requestAnimationFrame(updateNumber);
            }
        };
        
        updateNumber();
    });
};

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger number animation for stats section
            if (entry.target.classList.contains('stats')) {
                animateNumbers();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .process-step, .stats').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Form Submission (if you add forms later)
const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add your form handling logic here
    console.log('Form submitted');
};

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add CSS for mobile menu when active
const style = document.createElement('style');
style.textContent = `
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .nav-menu.active .nav-links {
        flex-direction: column;
        width: 100%;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 8px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(8px, -8px);
    }
    
    @media (min-width: 769px) {
        .nav-menu.active {
            display: flex;
            position: static;
            flex-direction: row;
            padding: 0;
            box-shadow: none;
        }
        
        .nav-menu.active .nav-links {
            flex-direction: row;
        }
    }
`;
document.head.appendChild(style);

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});