const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || (() => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must be set in environment in production!');
  }
  return 'gestion-scolaire-dev-secret-key-2026';
})();

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      school_id: user.school_id || null
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      type: 'refresh'
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function refreshAuth(req, res) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.type !== 'refresh') {
      return res.status(401).json({ error: 'Token de rafraîchissement invalide' });
    }

    const db = require('../database').getDb();
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.id);
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Utilisateur introuvable ou désactivé' });
    }

    const newToken = generateToken(user);
    res.json({ token: newToken });
  } catch (err) {
    return res.status(401).json({ error: 'Token de rafraîchissement invalide ou expiré' });
  }
}

function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }
    next();
  };
}

module.exports = { generateToken, generateRefreshToken, refreshAuth, authenticate, authorize, JWT_SECRET };
