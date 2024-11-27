// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../Controller/Controllers");

// Rota GET para listar todos os alunos
router.get("/professor", userController.getUsers);

//Professor por CPF
router.get("/professor/CPF/:CPF", userController.getUsersByCPF);

//Aluno por nome
router.get("/professor/name/:name", userController.getUsersByName);

module.exports = router;
