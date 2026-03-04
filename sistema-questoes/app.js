const express = require('express');
const cookieParser = require('cookie-parser');
const { autenticar } = require('./middleware/auth');
const db = require('./config/db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('./middleware/auth');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => res.redirect('/login'));

app.get('/login', (req, res) => res.render('login', { erro: null }));

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0)
      return res.render('login', { erro: 'Email ou senha inválidos' });

    const usuario = results[0];
    const valido = await bcrypt.compare(senha, usuario.senha);
    if (!valido) return res.render('login', { erro: 'Email ou senha inválidos' });

    const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/principal');
  });
});

app.get('/registro', (req, res) => res.render('registro', { erro: null }));

app.post('/registro', async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);
  db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hash], (err) => {
    if (err) return res.render('registro', { erro: 'Email já cadastrado' });
    res.redirect('/login');
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

app.get('/principal', autenticar, (req, res) => {
  db.query('SELECT COUNT(*) AS total FROM usuarios', (err, r1) => {
    db.query('SELECT COUNT(*) AS total FROM disciplinas', (err, r2) => {
      db.query('SELECT COUNT(*) AS total FROM questoes', (err, r3) => {
        res.render('home', {
          totalUsuarios:    r1[0].total,
          totalDisciplinas: r2[0].total,
          totalQuestoes:    r3[0].total
        });
      });
    });
  });
});

app.get('/usuarios', autenticar, (req, res) => {
  db.query('SELECT id, nome, email FROM usuarios', (err, results) => {
    if (err) return res.status(500).send('Erro ao buscar usuários');
    res.render('usuarios', { usuarios: results });
  });
});

app.use('/disciplinas', require('./routes/disciplinas.js'));
app.use('/questoes', require('./routes/questoes.js'));

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));