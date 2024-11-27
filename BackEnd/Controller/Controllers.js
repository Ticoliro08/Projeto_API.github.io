// controllers/userController.js
const userModel = require("../Model/Model"); // Importa o model para interagir com o banco

// Função para lidar com a requisição de listagem de usuários
exports.getUsers = (req, res) => {
  userModel.getAllUsers((err, users) => {
    if (err) {
      res.status(500).send("Erro ao buscar alunos"); // Retorna um erro 500 se algo deu errado
    } else {
      res.json(users); // Retorna os usuários em formato JSON
    }
  });
};

// Função para buscar um aluno pelo CPF
exports.getUsersByCPF = (req, res) => {
  const { CPF } = req.params; // Extrai o RM dos parâmetros da URL

  userModel.getUsersByCPF(CPF, (err, users) => {
    if (err) {
      res.status(500).send("Erro ao buscar professor"); // Erro no servidor
    } else {
      res.json(users); // Retorna os dados do aluno em formato JSON
    }
  });
};

// Função para buscar um aluno pelo Nome
exports.getUsersByName = (req, res) => {
  const { name } = req.params; // Extrai o RM dos parâmetros da URL

  userModel.getUsersByName(name, (err, users) => {
    if (err) {
      res.status(500).send("Erro ao buscar aluno"); // Erro no servidor
    } else {
      res.json(users); // Retorna os dados do aluno em formato JSON
    }
  });
};