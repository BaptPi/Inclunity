document.addEventListener("DOMContentLoaded", () => {
    
    // --------------------------------------------------------
    // 1. GESTION DU LIEN ACTIF DANS LA NAVIGATION (Votre code)
    // --------------------------------------------------------
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Vérifie si l'URL courante contient le lien, ou si on est sur la racine (index.html)
        if (currentPath.includes(linkHref) || (currentPath.endsWith('/') && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // --------------------------------------------------------
    // 2. ANIMATIONS AU DÉFILEMENT (INTERSECTION OBSERVER)
    // --------------------------------------------------------
    // Fait apparaître les éléments en douceur quand on scrolle vers le bas
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // L'animation se déclenche quand 15% de l'élément est visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // L'animation ne se joue qu'une seule fois
            }
        });
    }, observerOptions);

    // Sélectionne les éléments à animer (les cartes, les titres, la chronologie)
    const elementsToAnimate = document.querySelectorAll('.card, .section-title, .section-subtitle, .timeline-item');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in-hidden'); // Cache l'élément au chargement
        observer.observe(el); // Commence à l'observer
    });

    // --------------------------------------------------------
    // 3. EN-TÊTE DYNAMIQUE (STICKY HEADER)
    // --------------------------------------------------------
    // Ajoute une ombre à la barre de navigation quand on commence à descendre
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --------------------------------------------------------
    // 4. SIMULATION DES FORMULAIRES (Newsletter, etc.)
    // --------------------------------------------------------
    // Empêche la page de se recharger et affiche un faux message de succès
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Bloque le rechargement
            const button = form.querySelector('button');
            const originalText = button.innerHTML;
            
            // Effet visuel de succès
            button.innerHTML = '<i class="fa-solid fa-check"></i> Success!';
            button.style.backgroundColor = "#2ecc71"; // Vert succès
            button.style.color = "white";

            // Remet le bouton à la normale après 3 secondes
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.backgroundColor = "";
                button.style.color = "";
                form.reset(); // Vide le champ de texte
            }, 3000);
        });
    });

    // --------------------------------------------------------
    // 5. BOUTONS DE CONNEXION FICTIFS (PORTAL LOGIN)
    // --------------------------------------------------------
    const loginLinks = document.querySelectorAll('.login-link');
    loginLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert("🔒 Secure Portal Connection\n\nThis is a demonstration environment. Real employee/member portals are restricted to authorized personnel.");
        });
    });
});