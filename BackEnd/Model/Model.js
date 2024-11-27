const createConnection = require("../db"); // Importa a função para criar a conexão com o banco de dados
const { Request, TYPES } = require("tedious"); // Importa as classes necessárias do tedious

// Função para buscar todos os usuários no banco de dados
exports.getAllUsers = (callback) => {
  const connection = createConnection(); // Cria a conexão com o banco de dados

  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Trata erros de conexão
    }

    const query = `SELECT * FROM professor`; // Consulta SQL para buscar todos os usuários
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
        CPF: columns[0].value, // Captura o valor da primeira coluna (CPF)
        name: columns[1].value, // Captura o valor da segunda coluna (name)
        email: columns[2].value, // Captura o valor da terceira coluna (email)
        telefone: columns[3].value, // Captura o valor da quarta coluna (telefone)
        dataNasc: columns[4].value, // Captura o valor da quinta coluna (dataNasc)
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
exports.getUsersByCPF = (CPF, callback) => {
  const connection = createConnection(); // Cria a conexão com o banco de dados

  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Se houver erro de conexão
    }

    // Consulta SQL para buscar um aluno pelo RM
    const query = `SELECT * FROM professor WHERE CPF = @CPF`;

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
        CPF: columns[0].value, // Captura o valor da primeira coluna (CPF)
        name: columns[1].value, // Captura o valor da segunda coluna (name)
        email: columns[2].value, // Captura o valor da terceira coluna (email)
        telefone: columns[3].value, // Captura o valor da quarta coluna (telefone)
        dataNasc: columns[4].value, // Captura o valor da quinta coluna (dataNasc)
      });
    });

    // Evento 'requestCompleted' para retornar o resultado após a execução
    request.on("requestCompleted", () => {
      callback(null, result); // Retorna o aluno encontrado ou null
    });

    // Executa a consulta SQL
    request.addParameter("CPF", TYPES.VarChar, CPF); // Adiciona o RM como parâmetro
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
    const query = `SELECT * FROM professor WHERE name like @name
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
        CPF: columns[0].value, // Captura o valor da primeira coluna (CPF)
        name: columns[1].value, // Captura o valor da segunda coluna (name)
        email: columns[2].value, // Captura o valor da terceira coluna (email)
        telefone: columns[3].value, // Captura o valor da quarta coluna (telefone)
        dataNasc: columns[4].value, // Captura o valor da quinta coluna (dataNasc)
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