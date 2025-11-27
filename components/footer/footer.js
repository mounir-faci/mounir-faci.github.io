// Footer Component Loader
(function() {
    'use strict';
    
    // Charger le CSS du footer
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/components/footer/footer.css';
    document.head.appendChild(link);
    
    // Charger le HTML du footer
    fetch('/components/footer/footer.html')
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Erreur chargement footer:', error));
})();
