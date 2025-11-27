// Script spécifique à la page Contact
(function() {
    'use strict';
    
    console.log('Page Contact chargée');
    
    // Gestion spécifique du formulaire de contact
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
    
})();
