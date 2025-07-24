// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    });

    // Close mobile menu when clicking on overlay
    sidebarOverlay.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    });

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navContainer = document.querySelector('.nav-container');
        if (window.scrollY > 50) {
            navContainer.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
            navContainer.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
        } else {
            navContainer.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            navContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});