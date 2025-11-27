// Header Component Loader
(function() {
    'use strict';
    
    // Charger le CSS du header
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/components/header/header.css';
    document.head.appendChild(link);
    
    // Charger le HTML du header
    fetch('/components/header/header.html')
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById('header-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Erreur chargement header:', error));
})();
