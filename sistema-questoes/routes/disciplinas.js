const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/disciplinasController');
const { autenticar } = require('../middleware/auth');

router.get('/', autenticar, ctrl.listar);
router.get('/nova', autenticar, ctrl.getNova);
router.post('/nova', autenticar, ctrl.postNova);
router.get('/editar/:id', autenticar, ctrl.getEditar);
router.post('/editar/:id', autenticar, ctrl.postEditar);
router.get('/deletar/:id', autenticar, ctrl.deletar);

module.exports = router;
