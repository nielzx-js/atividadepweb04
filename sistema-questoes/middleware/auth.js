const jwt = require('jsonwebtoken');
const SECRET = 'segredo_jwt_123';

function autenticar(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.redirect('/login');
  }
}

module.exports = { autenticar, SECRET };
