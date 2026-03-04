const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/auth');

exports.getLogin = (req, res) => {
  res.render('login', { erro: null });
};

exports.postLogin = (req, res) => {
  const { email, senha } = req.body;
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.render('login', { erro: 'Email ou senha inválidos' });

    const usuario = results[0];
    const valido = await bcrypt.compare(senha, usuario.senha);
    if (!valido) return res.render('login', { erro: 'Email ou senha inválidos' });

    const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  });
};

exports.getRegistro = (req, res) => {
  res.render('registro', { erro: null });
};

exports.postRegistro = async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);
  db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hash], (err) => {
    if (err) return res.render('registro', { erro: 'Email já cadastrado' });
    res.redirect('/login');
  });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
