const express = require('express');
const cookieParser = require('cookie-parser');
const { autenticar } = require('./middleware/auth');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', require('./routes/auth'));
app.use('/disciplinas', require('./routes/disciplinas'));
app.use('/questoes', require('./routes/questoes'));

app.get('/', autenticar, (req, res) => {
  res.render('home', { usuario: req.usuario });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
