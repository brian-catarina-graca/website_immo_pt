// Fonction pour appliquer les traductions

function applyTranslations(lang = 'fr') {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
      const key = el.dataset.i18n;
  
      if (key && translations[lang][key]) {
        // Vérifie si l'élément est une image
        if (el.tagName.toLowerCase() === 'img') {
          const imageSrc = translations[lang][key];
          
          // Ajoute un log pour voir si l'image est correctement récupérée
          console.log("Image path for", key, ":", imageSrc);
  
          // Vérifie si l'image existe avant de la charger
          if (imageSrc) {
            el.src = imageSrc; // Change le src de l'image
          } else {
            console.error("Image not found for", key);
          }
        } else {
          // Si c'est un texte, on modifie le texte comme prévu
          el.textContent = translations[lang][key];
        }
      }
    });
  }
  
  
  
  // Fonction pour configurer le sélecteur de langue et écouter les changements
  function setupLanguageSwitcher() {
    const select = document.getElementById('languageSwitcher');  // Récupère l'élément de sélection de la langue
    const savedLang = localStorage.getItem('lang') || 'en';  // Récupère la langue sauvegardée ou 'en' par défaut
    select.value = savedLang;  // Définit la valeur du sélecteur sur la langue sauvegardée
    applyTranslations(savedLang);  // Applique les traductions pour la langue sauvegardée
  
    // Change la langue au changement du sélecteur
    select.addEventListener('change', (e) => {
      const lang = e.target.value;  // Récupère la nouvelle langue sélectionnée
      localStorage.setItem('lang', lang);  // Sauvegarde la langue dans le localStorage
      applyTranslations(lang);  // Applique les traductions pour la nouvelle langue
    });
  }
  
  // Charger la navbar et le footer, puis configurer les traductions
  document.addEventListener("DOMContentLoaded", () => {
    // Charger la navbar
    fetch('./templates/navbar.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('navbar-container').innerHTML = html;
        setupLanguageSwitcher();  // Configurer le sélecteur de langue de la navbar
        applyTranslations(localStorage.getItem('lang') || 'en');  // Appliquer les traductions
      });
  
    // Charger le footer
    fetch('./templates/footer.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('footer-container').innerHTML = html;
      });
  });