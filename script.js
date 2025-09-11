// Navigation mobile et interactions
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    function animateSkills() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        skillLevels.forEach(level => {
            const width = level.getAttribute('data-width') || '0%';
            level.style.width = width;
        });
    }
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(level => {
            level.style.width = '0';
        });
        
        window.addEventListener('scroll', function() {
            const rect = skillsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                animateSkills();
            }
        });
        
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            animateSkills();
        }
    }
    
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .skills-column, .about-content');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            if (position.top < window.innerHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    const animatedElements = document.querySelectorAll('.project-card, .skills-column, .about-content');
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Vérifier les éléments visibles au chargement
    animateOnScroll();
    
    // Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Fermer le menu mobile s'il est ouvert
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                // Défilement
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('Merci pour votre message ! Je vous répondrai bientôt.');
            contactForm.reset();
        });
    }
});