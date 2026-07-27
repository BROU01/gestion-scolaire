/* ============================================
   Module API — Gestion Scolaire Admin
   Centralise tous les appels backend
   ============================================ */
var API = (function() {
  var BASE = '';

  /* Helper fetch avec gestion d'erreur */
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
