const db = require('../config/db');

exports.listar = (req, res) => {
  db.query('SELECT * FROM disciplinas', (err, results) => {
    res.render('disciplinas/index', { disciplinas: results, usuario: req.usuario });
  });
};

exports.getNova = (req, res) => {
  res.render('disciplinas/form', { disciplina: null, usuario: req.usuario });
};

exports.postNova = (req, res) => {
  const { nome, carga_horaria } = req.body;
  db.query('INSERT INTO disciplinas (nome, carga_horaria) VALUES (?, ?)', [nome, carga_horaria], (err) => {
    res.redirect('/disciplinas');
  });
};

exports.getEditar = (req, res) => {
  db.query('SELECT * FROM disciplinas WHERE id = ?', [req.params.id], (err, results) => {
    res.render('disciplinas/form', { disciplina: results[0], usuario: req.usuario });
  });
};

exports.postEditar = (req, res) => {
  const { nome, carga_horaria } = req.body;
  db.query('UPDATE disciplinas SET nome = ?, carga_horaria = ? WHERE id = ?', [nome, carga_horaria, req.params.id], () => {
    res.redirect('/disciplinas');
  });
};

exports.deletar = (req, res) => {
  db.query('DELETE FROM disciplinas WHERE id = ?', [req.params.id], () => {
    res.redirect('/disciplinas');
  });
};
