/* ============================================
   FT3 — Site Editor (WordPress-like)
   Gère les pages, sections, images, logo du site public
   ============================================ */

var SITE_DATA_KEY = 'ft3_site_data';

/* Default site structure */
var SITE_DEFAULTS = {
  logo: { text: 'FT3', icon: '🎓' },
  logoImage: '',
  nav: [
    { label: 'Accueil', href: 'index.html' },
    { label: 'Vie académique', href: 'vie-academique.html' },
    { label: 'Activités', href: 'activites.html' },
    { label: 'Bourses', href: 'bourses.html' }
  ],
  pages: [
    {
      id: 'home',
      title: 'Accueil',
      slug: 'index',
      published: true,
      sections: [
        { id: 's-hero', type: 'hero', content: { title: 'Bienvenue à FT3', subtitle: 'Formation · Technologie · Travail · Talent', btnText: 'S\'inscrire', btnLink: 'inscription.html', bgColor: '#16A34A' } },
        { id: 's-features', type: 'features', content: { title: 'Pourquoi FT3 ?', items: [{ icon: '🎓', text: 'Formation de qualité' }, { icon: '💼', text: 'Insertion professionnelle' }, { icon: '🌍', text: 'Bourses internationales' }] } },
        { id: 's-cta', type: 'cta', content: { title: 'Prêt à rejoindre FT3 ?', btnText: 'Inscription', btnLink: 'inscription.html' } }
      ]
    },
    {
      id: 'academic',
      title: 'Vie académique',
      slug: 'vie-academique',
      published: true,
      sections: [
        { id: 's-acad-hero', type: 'hero', content: { title: 'Vie académique', subtitle: 'Découvrez nos programmes et formations', bgColor: '#1D4ED8' } },
        { id: 's-acad-text', type: 'text', content: { body: '<p>FT3 propose des programmes adaptés aux besoins du marché.</p><p>Nos formations couvrent l\'informatique, la gestion et le commerce.</p>' } }
      ]
    },
    {
      id: 'activities',
      title: 'Activités',
      slug: 'activites',
      published: true,
      sections: [
        { id: 's-act-hero', type: 'hero', content: { title: 'Activités', subtitle: 'Clubs, sports et événements culturels', bgColor: '#B45309' } }
      ]
    },
    {
      id: 'scholarships',
      title: 'Bourses',
      slug: 'bourses',
      published: true,
      sections: [
        { id: 's-sch-hero', type: 'hero', content: { title: 'Bourses internationales', subtitle: 'Étudiez à l\'étranger', bgColor: '#059669' } }
      ]
    }
  ],
  globalSections: [],
  images: []
};

/* --- Store loading/saving --- */
function SITE_load() {
  var raw = localStorage.getItem(SITE_DATA_KEY);
  if (!raw) {
    SITE_save(SITE_DEFAULTS);
    return JSON.parse(JSON.stringify(SITE_DEFAULTS));
  }
  try {
    return JSON.parse(raw);
  } catch(e) {
    return JSON.parse(JSON.stringify(SITE_DEFAULTS));
  }
}

function SITE_save(data) {
  localStorage.setItem(SITE_DATA_KEY, JSON.stringify(data));
}

function SITE_generateId() { return 's-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4); }

/* --- Page CRUD --- */
function SITE_addPage(title, slug) {
  var data = SITE_load();
  data.pages.push({
    id: SITE_generateId(),
    title: title,
    slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g,'-'),
    published: true,
    sections: []
  });
  SITE_save(data);
  return data;
}

function SITE_updatePage(id, updates) {
  var data = SITE_load();
  for (var i = 0; i < data.pages.length; i++) {
    if (data.pages[i].id === id) {
      for (var k in updates) { if (updates.hasOwnProperty(k)) data.pages[i][k] = updates[k]; }
      break;
    }
  }
  SITE_save(data);
  return data;
}

function SITE_deletePage(id) {
  var data = SITE_load();
  var newPages = [];
  for (var i = 0; i < data.pages.length; i++) {
    if (data.pages[i].id !== id) newPages.push(data.pages[i]);
  }
  data.pages = newPages;
  SITE_save(data);
  return data;
}

/* --- Section CRUD --- */
function SITE_addSection(pageId, type, content) {
  var data = SITE_load();
  for (var i = 0; i < data.pages.length; i++) {
    if (data.pages[i].id === pageId) {
      data.pages[i].sections.push({
        id: SITE_generateId(),
        type: type,
        content: content || {}
      });
      break;
    }
  }
  SITE_save(data);
  return data;
}

function SITE_updateSection(pageId, sectionId, content) {
  var data = SITE_load();
  for (var i = 0; i < data.pages.length; i++) {
    if (data.pages[i].id === pageId) {
      for (var j = 0; j < data.pages[i].sections.length; j++) {
        if (data.pages[i].sections[j].id === sectionId) {
          data.pages[i].sections[j].content = content;
          break;
        }
      }
      break;
    }
  }
  SITE_save(data);
  return data;
}

function SITE_deleteSection(pageId, sectionId) {
  var data = SITE_load();
  for (var i = 0; i < data.pages.length; i++) {
    if (data.pages[i].id === pageId) {
      var newSections = [];
      for (var j = 0; j < data.pages[i].sections.length; j++) {
        if (data.pages[i].sections[j].id !== sectionId) newSections.push(data.pages[i].sections[j]);
      }
      data.pages[i].sections = newSections;
      break;
    }
  }
  SITE_save(data);
  return data;
}

/* --- Image management --- */
function SITE_addImage(name, dataUrl) {
  var site = SITE_load();
  site.images.push({
    id: SITE_generateId(),
    name: name || 'Image',
    dataUrl: dataUrl,
    addedAt: new Date().toISOString()
  });
  SITE_save(site);
  return site;
}

function SITE_deleteImage(id) {
  var site = SITE_load();
  var newImgs = [];
  for (var i = 0; i < site.images.length; i++) {
    if (site.images[i].id !== id) newImgs.push(site.images[i]);
  }
  site.images = newImgs;
  SITE_save(site);
  return site;
}

/* --- Logo management --- */
function SITE_setLogo(logoObj) {
  var site = SITE_load();
  site.logo = logoObj;
  SITE_save(site);
  return site;
}

function SITE_setLogoImage(dataUrl) {
  var site = SITE_load();
  site.logoImage = dataUrl;
  SITE_save(site);
  return site;
}

/* --- Generate page preview HTML --- */
function SITE_previewHTML(pageId) {
  var data = SITE_load();
  var page = null;
  for (var i = 0; i < data.pages.length; i++) {
    if (data.pages[i].id === pageId) { page = data.pages[i]; break; }
  }
  if (!page) return '<div class="empty-state"><h3>Page introuvable</h3></div>';

  var logoHtml = data.logoImage
    ? '<img src="' + data.logoImage + '" style="height:40px;" alt="Logo">'
    : '<span style="font-weight:800;font-size:1.2rem;">' + (data.logo.icon || '') + ' ' + (data.logo.text || 'FT3') + '</span>';

  var h = '<div style="font-family:Manrope,sans-serif;background:#fff;min-height:400px;">'
    + '<nav style="display:flex;align-items:center;justify-content:space-between;padding:16px 32px;border-bottom:2px solid #000;">'
    + '<a href="#" style="text-decoration:none;color:#000;">' + logoHtml + '</a>'
    + '<div style="display:flex;gap:16px;">';
  for (var n = 0; n < data.nav.length; n++) {
    h += '<a href="#" style="text-decoration:none;color:#333;font-weight:600;font-size:0.875rem;">' + data.nav[n].label + '</a>';
  }
  h += '</div></nav>';

  for (var s = 0; s < page.sections.length; s++) {
    var sec = page.sections[s];
    var c = sec.content;
    if (sec.type === 'hero') {
      h += '<div style="background:' + (c.bgColor || '#16A34A') + ';color:#fff;padding:80px 32px;text-align:center;">'
        + '<h1 style="font-size:2.5rem;font-weight:800;margin-bottom:12px;">' + (c.title || 'Titre') + '</h1>'
        + '<p style="font-size:1.125rem;opacity:0.9;margin-bottom:24px;">' + (c.subtitle || '') + '</p>'
        + (c.btnText ? '<a href="#" style="display:inline-block;background:#fff;color:#000;padding:12px 32px;font-weight:700;border:2px solid #000;text-decoration:none;">' + c.btnText + '</a>' : '')
        + '</div>';
    } else if (sec.type === 'text') {
      h += '<div style="padding:48px 32px;max-width:800px;margin:0 auto;">' + (c.body || '') + '</div>';
    } else if (sec.type === 'features') {
      h += '<div style="padding:48px 32px;text-align:center;"><h2 style="font-size:1.75rem;font-weight:700;margin-bottom:32px;">' + (c.title || '') + '</h2><div style="display:flex;gap:24px;justify-content:center;flex-wrap:wrap;">';
      if (c.items) {
        for (var it = 0; it < c.items.length; it++) {
          h += '<div style="background:#f9f9f9;border:2px solid #000;padding:24px;width:200px;"><div style="font-size:2rem;margin-bottom:8px;">' + (c.items[it].icon || '✓') + '</div><p style="font-weight:600;">' + (c.items[it].text || '') + '</p></div>';
        }
      }
      h += '</div></div>';
    } else if (sec.type === 'cta') {
      h += '<div style="background:#000;color:#fff;padding:48px 32px;text-align:center;">'
        + '<h2 style="font-size:1.5rem;font-weight:700;margin-bottom:16px;">' + (c.title || '') + '</h2>'
        + (c.btnText ? '<a href="#" style="display:inline-block;background:#16A34A;color:#fff;padding:12px 32px;font-weight:700;border:2px solid #000;text-decoration:none;">' + c.btnText + '</a>' : '')
        + '</div>';
    } else if (sec.type === 'image') {
      h += '<div style="padding:32px;text-align:center;"><img src="' + (c.src || '') + '" style="max-width:100%;max-height:400px;border:2px solid #000;" alt="' + (c.alt || '') + '"></div>';
    }
  }

  h += '<footer style="background:#f5f5f5;padding:24px 32px;text-align:center;border-top:2px solid #000;color:#666;font-size:0.875rem;">'
    + '&copy; ' + new Date().getFullYear() + ' ' + (data.logo.text || 'FT3') + '. Tous droits réservés.</footer></div>';

  return h;
}
