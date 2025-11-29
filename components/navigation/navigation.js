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
                initThemeToggle();
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
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Vérifier si c'est la page d'accueil
            if (currentPath === '/' || currentPath === '/index.html') {
                if (href === '/') {
                    link.classList.add('active');
                }
            }
            // Vérifier si le chemin actuel correspond au lien
            else if (href && currentPath.includes(href) && href !== '/') {
                link.classList.add('active');
            }
        });
    }
    
    // Initialiser le toggle du thème
    function initThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        
        // Charger le thème sauvegardé ou utiliser le thème système
        const savedTheme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    }
})();
