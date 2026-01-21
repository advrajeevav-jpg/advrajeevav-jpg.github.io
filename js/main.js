function toggleNav() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// --- Google Translate Integration ---
(function () {
    // 1. Create the Translate Element Container
    const translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';
    // Style it - Fixed bottom-right corner
    Object.assign(translateDiv.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '9999',
        background: '#fff',
        padding: '5px',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    });
    document.body.appendChild(translateDiv);

    // 2. Define the Google Translate Init Function
    window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,ml', // English and Malayalam
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        }, 'google_translate_element');
    };

    // 3. Load the Google Translate Script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(script);
})();
