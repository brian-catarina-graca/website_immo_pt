/* Language */
document.addEventListener("DOMContentLoaded", () => {
    // Navbar
    fetch('/templates/navbar.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('navbar-container').innerHTML = html;
        setupLanguageSwitcher();
        applyTranslations(localStorage.getItem('lang') || 'en'); // Appliquer la traduction après chargement de la navbar
      });
  
    // Footer
    fetch('/templates/footer.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('footer-container').innerHTML = html;
        applyTranslations(localStorage.getItem('lang') || 'en'); // Appliquer la traduction après chargement du footer
      });
});

/* Fonction pour appliquer les traductions */
function applyTranslations(lang = 'en') {
    const elements = document.querySelectorAll('[data-i18n]'); // Sélectionner tous les éléments avec data-i18n
    elements.forEach(el => {
        const key = el.dataset.i18n;  // Récupérer la clé de traduction
        if (key && translations[lang][key]) {
            el.textContent = translations[lang][key];  // Appliquer la traduction à l'élément
        }
    });
}
  
function setupLanguageSwitcher() {
    const select = document.getElementById('languageSwitcher');
    const savedLang = localStorage.getItem('lang') || 'en';
    select.value = savedLang;
    applyTranslations(savedLang); // Appliquer la traduction dès qu'un langage est sélectionné
  
    select.addEventListener('change', (e) => {
        const lang = e.target.value;
        localStorage.setItem('lang', lang);
        applyTranslations(lang);  // Appliquer la traduction lorsque l'utilisateur change de langue
    });
}
/* Language fin */

/* Carrousel */
document.addEventListener("DOMContentLoaded", () => {
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-image');
    let index = 0;  // Indice de l'image affichée
    let intervalId;  // Variable pour stocker l'ID du setInterval
  
    // Fonction pour faire défiler l'image
    function nextImage() {
      index++;
      if (index >= images.length) index = 0; // Revenir à la première image
      updateCarousel();
    }
  
    // Fonction pour revenir à l'image précédente
    function prevImage() {
      index--;
      if (index < 0) index = images.length - 1; // Aller à la dernière image
      updateCarousel();
    }
  
    // Met à jour la position du carousel
    function updateCarousel() {
      const offset = -index * 100;  // Décalage en pourcentage pour le défilement
      carouselImages.style.transform = `translateX(${offset}%)`;
    }
  
    // Ajouter des écouteurs d'événements pour les boutons (si ajoutés)
    const nextButton = document.querySelector('.carousel-next');
    const prevButton = document.querySelector('.carousel-prev');
    
    if (nextButton && prevButton) {
      nextButton.addEventListener('click', () => {
        clearInterval(intervalId);  // Arrêter le défilement automatique quand l'utilisateur clique
        nextImage();
        startAutoScroll();  // Recommencer l'intervalle après l'interaction
      });
      
      prevButton.addEventListener('click', () => {
        clearInterval(intervalId);  // Arrêter le défilement automatique quand l'utilisateur clique
        prevImage();
        startAutoScroll();  // Recommencer l'intervalle après l'interaction
      });
    }
  
    // Démarre le défilement automatique toutes les 3 secondes
    function startAutoScroll() {
      intervalId = setInterval(nextImage, 5000);  // Changer l'image toutes les 3 secondes
    }
  
    // Lancer l'auto-scroll dès le chargement de la page
    startAutoScroll();
});
/* Carrousel fin */
