const express = require ('express');
const router = express.Router();
const UserController = require ('../controllers/UserController');

//Rota para criar um usuário
router.post ('/', UserController.createUser)
//Listar todos os usuários
router.get ('/', UserController.getAllUsers)

// por padrão rotas com parametros ficam embaixo
//Buscar um usuario por ID
router.get ('/:id', UserController.getUserById)
//Atualizar um Usuário
router.put ('/:id', UserController.updateUser)
//Deletar um Usuário
router.delete ('/:id', UserController.deleteUser)

module.exports = router;