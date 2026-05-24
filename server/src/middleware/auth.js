import jwt from 'jsonwebtoken';

export function authOptional(req, res, next) {
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) {
    try {
      req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET || 'cyberedu-dev-secret');
    } catch {
      req.user = null;
    }
  }
  next();
}

export function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Avtorizatsiya kerek' });
  }
  try {
    req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET || 'cyberedu-dev-secret');
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Token mániysiz' });
  }
}

export function adminRequired(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Basqarıwshı huqıqı kerek' });
  }
  next();
}
