/* ============================================
   FT3 — Site Vitrine Public JS
   Navigation mobile, filtres, formulaire
   ============================================ */

/* ============================================
   FT3 — Navigation & Scroll
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
  var nav = document.getElementById('mainNav');
  var hamburger = document.querySelector('.pub-hamburger');
  var navLinks = document.querySelector('.pub-nav-links');

  /* --- Scroll : navbar fixed au scroll --- */
  if (nav) {
    var hero = document.querySelector('.pub-hero');
    var heroHeight = hero ? hero.offsetHeight : window.innerHeight;

    function onScroll() {
      if (window.scrollY > heroHeight - 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    window.addEventListener('resize', function() {
      heroHeight = hero ? hero.offsetHeight : window.innerHeight;
      onScroll();
    });
  }

  /* --- Mobile Nav Toggle --- */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      var isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    var links = navLinks.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function() {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    }
  }

  /* --- Highlight nav active link --- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navAnchors = document.querySelectorAll('.pub-nav-links a');
  for (var k = 0; k < navAnchors.length; k++) {
    var href = navAnchors[k].getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      navAnchors[k].classList.add('active');
    }
  }

  /* --- Smooth scroll for anchor links --- */
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var a = 0; a < anchors.length; a++) {
    anchors[a].addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
});

/* --- Filter Chips Helper --- */
function initFilterChips(containerSelector, cardSelector) {
  var container = document.querySelector(containerSelector);
  if (!container) return;
  var chips = container.querySelectorAll('.pub-chip');
  var cards = document.querySelectorAll(cardSelector);
  chips.forEach(function(chip) {
    chip.addEventListener('click', function() {
      chips.forEach(function(c) { c.classList.remove('active'); });
      this.classList.add('active');
      var filter = this.dataset.filter;
      cards.forEach(function(card) {
        if (filter === 'all' || card.dataset.type === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- Search Helper --- */
function initSearch(inputSelector, cardSelector, fields) {
  var input = document.querySelector(inputSelector);
  if (!input) return;
  var cards = document.querySelectorAll(cardSelector);
  input.addEventListener('input', function() {
    var q = this.value.toLowerCase().trim();
    cards.forEach(function(card) {
      if (!q) { card.style.display = ''; return; }
      var text = '';
      for (var i = 0; i < fields.length; i++) {
        var el = card.querySelector(fields[i]);
        if (el) text += ' ' + el.textContent;
      }
      card.style.display = text.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
    });
  });
}

/* --- Toast Helper --- */
function pubToast(message, type) {
  var existing = document.querySelector('.pub-toast');
  if (existing) existing.remove();
  var toast = document.createElement('div');
  toast.className = 'pub-toast';
  var bg = type === 'error' ? 'var(--pub-danger)' : type === 'success' ? 'var(--pub-success)' : 'var(--pub-primary)';
  toast.setAttribute('style', 'position:fixed;bottom:24px;right:24px;z-index:999;background:' + bg + ';color:#fff;padding:14px 24px;border-radius:10px;font-size:0.9375rem;font-weight:600;box-shadow:0 8px 24px rgba(0,0,0,0.15);animation:slideUp .2s ease;');
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(function() {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = 'all .3s ease';
    setTimeout(function() { toast.remove(); }, 300);
  }, 3000);
}
