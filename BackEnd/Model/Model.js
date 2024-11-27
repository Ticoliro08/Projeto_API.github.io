const createConnection = require("../db"); // Importa a função para criar a conexão com o banco de dados
const { Request, TYPES } = require("tedious"); // Importa as classes necessárias do tedious

// Função para buscar todos os usuários no banco de dados
exports.getAllUsers = (callback) => {
  const connection = createConnection(); // Cria a conexão com o banco de dados

  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Trata erros de conexão
    }

    const query = `SELECT * FROM users`; // Consulta SQL para buscar todos os usuários
    const request = new Request(query, (err, rowCount) => {
      if (err) {
        return callback(err, null); // Trata erros de execução da consulta
      }

      if (rowCount === 0) {
        return callback(null, []); // Retorna um array vazio se não houver registros
      }
    });

    // Variável para armazenar os resultados da consulta
    const result = [];

    // Evento 'row' para capturar todas as linhas de resultados
    request.on("row", (columns) => {
      result.push({
        id: columns[0].value, // Captura o valor da primeira coluna (id)
        name: columns[1].value, // Captura o valor da segunda coluna (name)
        email: columns[2].value, // Captura o valor da terceira coluna (email)
        idade: columns[3].value, // Captura o valor da quarta coluna (idade)
        contato: columns[4].value, // Captura o valor da quinta coluna (contato)
      });
    });

    // Evento 'requestCompleted' para retornar os resultados da consulta após a execução
    request.on("requestCompleted", () => {
      callback(null, result); // Retorna o array de resultados
    });

    // Executa a consulta SQL no banco de dados
    connection.execSql(request);
  });

  connection.connect(); // Inicia a conexão com o banco de dados
};


// Função para buscar um usuário pelo  CPF
exports.getUsersByCPF = (id, callback) => {
  const connection = createConnection(); // Cria a conexão com o banco de dados

  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Se houver erro de conexão
    }

    // Consulta SQL para buscar um aluno pelo RM
    const query = `SELECT * FROM users WHERE id = @id`;

    const request = new Request(query, (err, rowCount) => {
      if (err) {
        return callback(err, null); // Se houver erro na execução da consulta
      }

      if (rowCount === 0) {
        return callback(null, []); // Se nenhum aluno for encontrado
      }
    });

    // Variável para armazenar os resultados da consulta
    const result = [];

    // Evento 'row' para capturar todas as linhas de resultados
    request.on("row", (columns) => {
      result.push({
        id: columns[0].value, // Captura o valor da primeira coluna (id)
        name: columns[1].value, // Captura o valor da segunda coluna (name)
        email: columns[2].value, // Captura o valor da terceira coluna (email)
        idade: columns[3].value, // Captura o valor da quarta coluna (idade)
        contato: columns[4].value, // Captura o valor da quinta coluna (contato)
      });
    });

    // Evento 'requestCompleted' para retornar o resultado após a execução
    request.on("requestCompleted", () => {
      callback(null, result); // Retorna o aluno encontrado ou null
    });

    // Executa a consulta SQL
    request.addParameter("id", TYPES.VarChar, id); // Adiciona o RM como parâmetro
    connection.execSql(request); // Executa a consulta
  });

  connection.connect(); // Inicia a conexão com o banco de dados
};

exports.getUsersByName = (name, callback) => {
  const connection = createConnection(); // Cria a conexão com o banco de dados

  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Se houver erro de conexão
    }

    // Consulta SQL para buscar um aluno pelo RM
    const query = `SELECT * FROM users WHERE name like @name
    `;

    const request = new Request(query, (err, rowCount) => {
      if (err) {
        return callback(err, null); // Se houver erro na execução da consulta
      }

      if (rowCount === 0) {
        return callback(null, []); // Se nenhum aluno for encontrado
      }
    });

    // Variável para armazenar os resultados da consulta
    const result = [];

    // Evento 'row' para capturar todas as linhas de resultados
    request.on("row", (columns) => {
      result.push({
        id: columns[0].value, // Captura o valor da primeira coluna (id)
        name: columns[1].value, // Captura o valor da segunda coluna (name)
        email: columns[2].value, // Captura o valor da terceira coluna (email)
        idade: columns[3].value, // Captura o valor da quarta coluna (idade)
        contato: columns[4].value, // Captura o valor da quinta coluna (contato)
      });
    });

    // Evento 'requestCompleted' para retornar o resultado após a execução
    request.on("requestCompleted", () => {
      callback(null, result); // Retorna o aluno encontrado ou null
    });

    // Executa a consulta SQL
    request.addParameter("name", TYPES.VarChar, `%${name}%`); // Adiciona o nome como parâmetro
    connection.execSql(request); // Executa a consulta
  });

  connection.connect(); // Inicia a conexão com o banco de dados
};

// Função para criar um novo usuário
exports.createUser = (data, callback) => {
  const connection = createConnection(); // Cria a conexão com o banco de dados
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Trata erros de conexão
    }
    // Consulta SQL para inserir um novo usuário
    const query = `INSERT INTO users (name,idade,email,contato) VALUES (@name,@idade,@email,@contato)`;
    const request = new Request(query, (err) => {
      if (err) {
        callback(err); // Chama a função callback com erro se houver falha
      } else {
        callback(null, { message: "Usuario inserido com sucesso!" });
      }
    });
    // Adiciona os parâmetros necessários para a inserção
    request.addParameter("name", TYPES.VarChar, data.name);
    request.addParameter("idade", TYPES.Int, data.idade);
    request.addParameter("email", TYPES.VarChar, data.email);
    request.addParameter("contato", TYPES.VarChar, data.contato);
    connection.execSql(request); // Executa a consulta
  });
  connection.connect(); // Inicia a conexão
};

// Função para atualizar um user existente
exports.updateUsers = (id, data, callback) => {
  const connection = createConnection();
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null);
    }
    const query = `UPDATE users SET name = @name, idade = @idade, email = @email, contato = @contato WHERE id = @id`;
    const request = new Request(query, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { message: "User atualizado com sucesso!" });
      }
    });
    request.addParameter("id", TYPES.Int, id);
    request.addParameter("name", TYPES.VarChar, data.name);
    request.addParameter("idade", TYPES.Int, data.idade);
    request.addParameter("email", TYPES.VarChar, data.email);
    request.addParameter("contato", TYPES.VarChar, data.contato);
    connection.execSql(request); 

  });
  connection.connect(); // Inicia a conexão
};

// Função para deletar um usuário existente
exports.deleteUser = (id, callback) => {
  const connection = createConnection(); // Cria a conexão com o banco de dados
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Trata erros de conexão
    }
    // Consulta SQL para deletar o usuário pelo ID
    const query = `DELETE FROM users WHERE id = ${id}`;
    const request = new Request(query, (err) => {
      if (err) {
        callback(err); // Chama a função callback com erro se houver falha
      } else {
        callback(null, { message: "usuario deletado com sucesso!" }); // Retorna uma mensagem de sucesso
      }
    });
    connection.execSql(request); // Executa a remoção no banco de dados
  });
  connection.connect(); // Inicia a conexão
};
