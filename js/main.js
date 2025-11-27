// Script principal - Fonctionnalités globales du site
(function() {
    'use strict';
    
    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#contact') {
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
    
    // Animation au scroll (lazy reveal)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les sections et cartes de projet
    document.addEventListener('DOMContentLoaded', function() {
        const elementsToObserve = document.querySelectorAll('section, .project-card, .skill-category');
        elementsToObserve.forEach(el => observer.observe(el));
    });
    
    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Ici vous pouvez ajouter votre logique d'envoi
            // Par exemple, utiliser un service comme Formspree, EmailJS, etc.
            console.log('Données du formulaire:', data);
            
            // Afficher un message de confirmation
            alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
            this.reset();
        });
    }
    
    // Performance: Lazy loading des images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
})();

// Ajouter la classe fade-in avec CSS
const style = document.createElement('style');
style.textContent = `
    section,
    .project-card,
    .skill-category {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.fade-in,
    .project-card.fade-in,
    .skill-category.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
