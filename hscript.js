// script.js

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

// Update cursor position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    // Main cursor
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;
    cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
    
    // Follower
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, input, textarea, select, .menu-toggle');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) scale(1.5)`;
        follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px) scale(1.5)`;
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) scale(1)`;
        follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px) scale(1)`;
    });
});

// Navigation
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.querySelector('.menu-overlay');
const menuLines = document.querySelectorAll('.menu-line');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu toggle
let menuOpen = false;

menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    
    if (menuOpen) {
        menuOverlay.classList.add('active');
        document.body.classList.add('menu-open');
        menuLines[0].style.transform = 'rotate(45deg) translateY(9px)';
        menuLines[1].style.transform = 'rotate(-45deg) translateY(-9px)';
        cursor.style.background = 'white';
        cursor.style.mixBlendMode = 'normal';
    } else {
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuLines[0].style.transform = 'rotate(0) translateY(0)';
        menuLines[1].style.transform = 'rotate(0) translateY(0)';
        cursor.style.background = 'transparent';
        cursor.style.mixBlendMode = 'difference';
    }
});

// Close menu when clicking menu links
const menuLinks = document.querySelectorAll('.menu-link');

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuOpen = false;
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuLines[0].style.transform = 'rotate(0) translateY(0)';
        menuLines[1].style.transform = 'rotate(0) translateY(0)';
    });
});

// Form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showSuccessMessage();
    
    // Reset form
    contactForm.reset();
    
    // Log form data (in real application, send to server)
    console.log('Form submitted:', data);
});

function showSuccessMessage() {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <h3>Thank you!</h3>
        <p>We'll get back to you soon.</p>
    `;
    
    document.body.appendChild(successDiv);
    
    // Show with animation
    setTimeout(() => {
        successDiv.classList.add('show');
    }, 100);
    
    // Hide after 3 seconds
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 3000);
}

// Smooth scroll for anchor links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
const animatedElements = document.querySelectorAll('.service-card, .contact-item, .form-group');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Title animation on load
window.addEventListener('load', () => {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(100%)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Parallax effect for hero elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Mobile menu swipe to close
let touchStartY = 0;
let touchEndY = 0;

menuOverlay.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

menuOverlay.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndY - touchStartY > 50 && menuOpen) {
        menuOpen = false;
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuLines[0].style.transform = 'rotate(0) translateY(0)';
        menuLines[1].style.transform = 'rotate(0) translateY(0)';
    }
}

// Disable cursor on touch devices
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    document.body.style.cursor = 'auto';
}

// Page transitions
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-out';
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}