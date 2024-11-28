// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userControllers = require("../Controller/Controllers");

// Rota GET para listar todos os alunos
router.get("/users", userControllers.getUsers);

//Usuario por ID
router.get("/users/id/:id", userControllers.getUserById);

//Usuario por nome
router.get("/users/name/:name", userControllers.getUsersByName);


// Rota POST para criar um novo usuário

router.post('/users', userControllers.createUser);

// Rota PUT para atualizar um usuário existente
router.put('/users/:id', userControllers.updateUsers);

// Rota DELETE para remover um usuário
router.delete('/users/:id', userControllers.deleteUser);

module.exports = router;
