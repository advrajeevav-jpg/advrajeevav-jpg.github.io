(function () {
  'use strict';

  // --- Mobile navigation ---
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  // --- Current year in footer ---
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Path prefix of the site root, taken from this script's own src ("" or "/").
  var script = document.currentScript;
  var base = script ? script.getAttribute('src').replace(/js\/main\.js.*$/, '') : '';

  // --- Bar Council of India disclaimer (shown once per browser, on any page) ---
  var STORAGE_KEY = 'bciDisclaimerAccepted.v2';

  function hasAccepted() {
    try { return window.localStorage.getItem(STORAGE_KEY) === 'yes'; } catch (e) { return false; }
  }

  function rememberAcceptance() {
    try { window.localStorage.setItem(STORAGE_KEY, 'yes'); } catch (e) { /* storage unavailable */ }
  }

  function showDisclaimer() {
    var backdrop = document.createElement('div');
    backdrop.className = 'disclaimer-backdrop';
    backdrop.innerHTML =
      '<div class="disclaimer" role="dialog" aria-modal="true" aria-labelledby="disclaimer-title" aria-describedby="disclaimer-body">' +
        '<h2 id="disclaimer-title">Disclaimer</h2>' +
        '<div id="disclaimer-body">' +
          '<p>The Bar Council of India does not permit advocates to solicit work or advertise. By clicking <strong>“I Agree”</strong>, you acknowledge that:</p>' +
          '<ul>' +
            '<li>you are accessing this website of your own accord, to seek information about Adv. A V Rajeev;</li>' +
            '<li>there has been no advertisement, personal communication, solicitation, invitation or inducement of any kind from the advocate or anyone on his behalf to solicit work through this website;</li>' +
            '<li>the material on this website is for general information only and is not legal advice; and</li>' +
            '<li>using this website or contacting the chamber through it does not create an advocate–client relationship.</li>' +
          '</ul>' +
        '</div>' +
        '<div class="disclaimer__actions">' +
          '<a href="' + base + 'disclaimer.html">Read the full disclaimer</a>' +
          '<button type="button" class="btn btn--primary" data-accept>I Agree</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(backdrop);
    document.body.classList.add('has-dialog');

    var dialog = backdrop.querySelector('.disclaimer');
    var accept = backdrop.querySelector('[data-accept]');
    var focusable = dialog.querySelectorAll('a, button');
    accept.focus();

    // Keep keyboard focus inside the dialog until it is accepted.
    dialog.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    accept.addEventListener('click', function () {
      rememberAcceptance();
      document.body.classList.remove('has-dialog');
      backdrop.remove();
    });
  }

  if (!document.body.hasAttribute('data-no-disclaimer') && !hasAccepted()) {
    showDisclaimer();
  }

  // --- Google Translate (English / Malayalam) ---
  if (document.getElementById('google_translate_element')) {
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ml',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    };
    var gt = document.createElement('script');
    gt.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    gt.async = true;
    document.body.appendChild(gt);
  }

  // --- Discourage casual copying of photographs ---
  ['contextmenu', 'dragstart'].forEach(function (type) {
    document.addEventListener(type, function (e) {
      if (e.target && e.target.tagName === 'IMG') e.preventDefault();
    });
  });
})();
