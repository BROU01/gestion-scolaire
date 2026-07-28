/* ============================================
   Module API — Gestion Scolaire Admin
   Centralise tous les appels backend
   ============================================ */
var API = (function() {
  var BASE = '';

  /* Helper fetch avec gestion d'erreur et refresh automatique */
  function request(method, path, body) {
    var opts = {
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };
    var token = localStorage.getItem('ecole_token');
    if (token) opts.headers['Authorization'] = 'Bearer ' + token;
    if (body !== undefined) opts.body = JSON.stringify(body);

    return fetch(BASE + path, opts)
      .then(function(res) {
        if (res.status === 401) {
          /* Token expiré → tenter un refresh silencieux puis réessayer */
          return tryRefreshAndRetry(method, path, body);
        }
        if (!res.ok) {
          return res.json().then(function(err) {
            throw new Error(err.error || 'Erreur serveur (' + res.status + ')');
          }).catch(function(e) {
            if (e instanceof SyntaxError) throw new Error('Erreur serveur (' + res.status + ')');
            throw e;
          });
        }
        return res.json();
      });
  }

  /* Tentative de refresh token silencieux, puis redirection si échec */
  function tryRefreshAndRetry(method, path, body) {
    var refreshToken = localStorage.getItem('ecole_refresh_token');
    if (!refreshToken) {
      forceLogout();
      return;
    }

    return fetch(BASE + '/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + refreshToken
      }
    })
    .then(function(r) {
      if (!r.ok) { forceLogout(); throw new Error('Refresh échoué'); }
      return r.json();
    })
    .then(function(data) {
      if (!data || !data.token) { forceLogout(); return; }
      localStorage.setItem('ecole_token', data.token);
      /* Réessayer la requête originale avec le nouveau token */
      opts.headers['Authorization'] = 'Bearer ' + data.token;
      return fetch(BASE + path, opts).then(function(res) {
        if (res.status === 401) { forceLogout(); return; }
        if (!res.ok) {
          return res.json().then(function(err) {
            throw new Error(err.error || 'Erreur serveur (' + res.status + ')');
          }).catch(function(e) {
            if (e instanceof SyntaxError) throw new Error('Erreur serveur (' + res.status + ')');
            throw e;
          });
        }
        return res.json();
      });
    })
    .catch(function(e) {
      /* Erreur réseau ou autre → on relance l'erreur sans déconnecter */
      throw e;
    });
  }

  function forceLogout() {
    localStorage.removeItem('ecole_session');
    localStorage.removeItem('ecole_token');
    localStorage.removeItem('ecole_refresh_token');
    window.location.href = '../public/login.html';
  }

  /* --- Santé --- */
  function health() { return request('GET', '/api/health'); }

  /* --- Dashboard --- */
  function dashboard() { return request('GET', '/api/dashboard/stats'); }

  /* --- CRUD générique --- */
  function listAll(resource) { return request('GET', '/api/' + resource); }
  function getOne(resource, id) { return request('GET', '/api/' + resource + '/' + id); }
  function create(resource, data) { return request('POST', '/api/' + resource, data); }
  function update(resource, id, data) { return request('PUT', '/api/' + resource + '/' + id, data); }
  function remove(resource, id) { return request('DELETE', '/api/' + resource + '/' + id); }

  /* --- Fallback mocké pour les fonctionnalités pas encore backend --- */
  function mockGet(key) {
    if (window.MOCK && MOCK[key]) return Promise.resolve(JSON.parse(JSON.stringify(MOCK[key])));
    return Promise.resolve([]);
  }

  return {
    request: request,
    health: health,
    dashboard: dashboard,
    list: listAll,
    get: getOne,
    create: create,
    update: update,
    delete: remove,
    mockGet: mockGet
  };
})();
