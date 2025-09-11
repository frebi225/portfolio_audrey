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
    
    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
    
    // Animation des barres de compétences
    function animateSkills() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        skillLevels.forEach(level => {
            const width = level.getAttribute('data-width') || '0%';
            level.style.width = width;
        });
    }
    
    // Observer pour déclencher l'animation des compétences
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        // Initialiser les barres à 0
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(level => {
            level.style.width = '0';
        });
        
        // Animation au défilement
        window.addEventListener('scroll', function() {
            const rect = skillsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                animateSkills();
            }
        });
        
        // Vérifier si la section est déjà visible au chargement
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            animateSkills();
        }
    }
    
    // Validation du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation simple
            if (!name || !email || !message) {
                alert('Veuillez remplir tous les champs du formulaire.');
                return;
            }
            
            // Validation basique de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Si tout est valide
            alert('Merci pour votre message ! Je vous répondrai dès que possible.');
            this.reset();
        });
    }
    
    // Animation des éléments au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .skills-column, .about-content');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // Si l'élément est visible à l'écran
            if (position.top < window.innerHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialiser l'état des éléments animés
    const animatedElements = document.querySelectorAll('.project-card, .skills-column, .about-content');

animatedElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});
    
    // Défilement fluide pour les liens d'ancrage
    const navLinksAnchors = document.querySelectorAll('.nav-links a[href^="#"], .hero-buttons a[href^="#"]');
    
    navLinksAnchors.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Compensation pour la navbar fixe
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Mise à jour de la navigation active selon la section visible
    const updateActiveNav = function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinksList = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    // Déclencher les animations au chargement et au défilement
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', function() {
        animateOnScroll();
        updateActiveNav();
    });
    
    // Déclencher la mise à jour initiale de la navigation
    updateActiveNav();
});