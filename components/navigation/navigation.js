// Navigation Component Loader
(function() {
    'use strict';
    
    // Charger le CSS de la navigation
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/components/navigation/navigation.css';
    document.head.appendChild(link);
    
    // Charger le HTML de la navigation
    fetch('/components/navigation/navigation.html')
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById('nav-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
                initMobileMenu();
                setActiveNavLink();
            }
        })
        .catch(error => console.error('Erreur chargement navigation:', error));
    
    // Initialiser le menu mobile
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navList = document.querySelector('.nav-list');
        
        if (menuToggle && navList) {
            menuToggle.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                navList.classList.toggle('active');
            });
            
            // Fermer le menu lors du clic sur un lien
            const navLinks = navList.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navList.classList.remove('active');
                });
            });
        }
    }
    
    // Marquer le lien actif dans la navigation
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
})();
