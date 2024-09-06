const express = require('express');
const enderecoController = require('./controllers/EnderecoController');
const router = express.Router();

router.post('/enderecos', enderecoController.createEndereco);
router.post('/enderecos/cep/:cep', enderecoController.createEnderecoCep);
router.get('/enderecos', enderecoController.getAllEnderecos);
router.get('/enderecos', enderecoController.getEnderecoById);
router.put('/enderecos', enderecoController.updateEndereco);
router.delete('/enderecos', enderecoController.deleteEndereco);

module.exports = router;