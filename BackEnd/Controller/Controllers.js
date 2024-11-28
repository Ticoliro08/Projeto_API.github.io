// controllers/userController.js
const userModel = require("../Model/Model"); // Importa o model para interagir com o banco

// Função para lidar com a requisição de listagem de usuários
exports.getUsers = (req, res) => {
  userModel.getAllUsers((err, users) => {
    if (err) {
      res.status(500).send("Erro ao buscar usuario"); // Retorna um erro 500 se algo deu errado
    } else {
      res.json(users); // Retorna os usuários em formato JSON
    }
  });
};

// Função para buscar um usuário pelo ID
exports.getUserById = (req, res) => {
  const { id } = req.params;

  userModel.getUserById(parseInt(id), (err, user) => {
    if (err) {
      return res.status(400).json({ error: err.message }); // Retorna mensagem de erro detalhada
    }

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(user); // Retorna o usuário encontrado
  });
};

// Função para buscar um aluno pelo Nome
exports.getUsersByName = (req, res) => {
  const { name } = req.params; // Extrai o RM dos parâmetros da URL

  userModel.getUsersByName(name, (err, users) => {
    if (err) {
      res.status(500).send("Erro ao buscar usuario"); // Erro no servidor
    } else {
      res.json(users); // Retorna os dados do aluno em formato JSON
    }
  });
};

// Função para lrmar com a requisição de criação de usuário
exports.createUser = (req, res) => {
  const data = req.body; // Extrai o nome do corpo da requisição
  userModel.createUser(data, (err) => {
    if (err) {
      res.status(500).send("Erro ao criar usuário"); // Retorna um erro 500 se algo deu errado
    } else {
      res.status(201).send("Usuário criado com sucesso"); // Retorna status 201 (criado) se bem-sucedrmo
    }
  });
};

// Função para atualizar um user existente
exports.updateUsers = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  userModel.updateUsers(id, data, (err) => {
      if (err) {
          res.status(500).send('Erro ao atualizar user');
      } else {
          res.send('User atualizado com sucesso');
      }
  });
};
// Função para lidar com a requisição de remoção de usuário
exports.deleteUser = (req, res) => {
  const { id } = req.params; // Extrai o rm dos parâmetros da URL
  userModel.deleteUser(id, (err) => {
    if (err) {
      res.status(500).send("Erro ao deletar usuário"); // Retorna um erro 500 se algo deu errado
    } else {
      res.send("Usuário deletado com sucesso"); // Retorna uma mensagem de sucesso
    }
  });
};
