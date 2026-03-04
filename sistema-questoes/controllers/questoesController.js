const db = require('../config/db');

exports.listar = (req, res) => {
  const sql = `SELECT q.*, d.nome AS disciplina FROM questoes q 
               LEFT JOIN disciplinas d ON q.disciplina_id = d.id`;
  db.query(sql, (err, results) => {
    res.render('questoes/index', { questoes: results, usuario: req.usuario });
  });
};

exports.getNova = (req, res) => {
  db.query('SELECT * FROM disciplinas', (err, disciplinas) => {
    res.render('questoes/form', { questao: null, disciplinas, usuario: req.usuario });
  });
};

exports.postNova = (req, res) => {
  const { enunciado, alt_a, alt_b, alt_c, alt_d, correta, disciplina_id } = req.body;
  db.query('INSERT INTO questoes (enunciado, alt_a, alt_b, alt_c, alt_d, correta, disciplina_id) VALUES (?,?,?,?,?,?,?)',
    [enunciado, alt_a, alt_b, alt_c, alt_d, correta, disciplina_id], () => {
      res.redirect('/questoes');
    });
};

exports.getEditar = (req, res) => {
  db.query('SELECT * FROM questoes WHERE id = ?', [req.params.id], (err, qRes) => {
    db.query('SELECT * FROM disciplinas', (err2, disciplinas) => {
      res.render('questoes/form', { questao: qRes[0], disciplinas, usuario: req.usuario });
    });
  });
};

exports.postEditar = (req, res) => {
  const { enunciado, alt_a, alt_b, alt_c, alt_d, correta, disciplina_id } = req.body;
  db.query('UPDATE questoes SET enunciado=?, alt_a=?, alt_b=?, alt_c=?, alt_d=?, correta=?, disciplina_id=? WHERE id=?',
    [enunciado, alt_a, alt_b, alt_c, alt_d, correta, disciplina_id, req.params.id], () => {
      res.redirect('/questoes');
    });
};

exports.deletar = (req, res) => {
  db.query('DELETE FROM questoes WHERE id = ?', [req.params.id], () => {
    res.redirect('/questoes');
  });
};
