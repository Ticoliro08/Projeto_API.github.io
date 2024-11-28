const apiUrl = "http://localhost:3000/users"; // URL da API

// Exibe o spinner enquanto carrega os dados
function showLoading(target) {
  target.innerHTML = `<div class="spinner show"></div>`;
}

// Função para buscar todos os usuários e exibir na tela
async function fetchUsers() {
  const userList = document.getElementById("userList");
  showLoading(userList); // Exibe o spinner

  const response = await fetch(apiUrl);
  const users = await response.json();

  userList.innerHTML = "<h2>Lista de Usuários</h2>";

  users.forEach((user) => {
    const userItem = document.createElement("div");
    userItem.className = "user-item";
    userItem.innerHTML = `
      <span>${user.name}</span>
      <div>
        <button class="update-user-btn" onclick="updateUser(${user.id})">Atualizar</button>
        <button class="delete-user-btn" onclick="deleteUser(${user.id})">Deletar</button>
      </div>
    `;
    userList.appendChild(userItem);
  });
}


// Função para adicionar um novo usuário
async function addUser() {
  const nameInput = document.getElementById("name");
  const idadeInput = document.getElementById("idade");
  const emailInput = document.getElementById("email");
  const contatoInput = document.getElementById("contato");

  const name = nameInput.value.trim();
  const idade = parseInt(idadeInput.value.trim());
  const email = emailInput.value.trim();
  const contato = contatoInput.value.trim();

  // Validação dos campos
  if (!name || isNaN(idade) || idade <= 0 || !email || !contato) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Por favor, insira um email válido.");
    return;
  }

  if (!validatecontato(contato)) {
    alert("Por favor, insira um contato válido (exemplo: 99999-9999).");
    return;
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, idade, email, contato }),
  });

  if (response.ok) {
    alert("Usuário adicionado com sucesso!");
    // Limpa os campos do formulário
    nameInput.value = "";
    idadeInput.value = "";
    emailInput.value = "";
    contatoInput.value = "";
    fetchUsers(); // Atualiza a lista de usuários
  } else {
    const error = await response.json();
    alert(`Erro ao adicionar usuário: ${error.messidade}`);
  }
}

// Função para validar email
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Função para validar contato (formato 99999-9999)
function validatecontato(contato) {
  const regex = /^\d{5}-\d{4}$/;
  return regex.test(contato);
}


// Função para atualizar os dados de um usuário
async function updateUser(id) {
  const newName = prompt("Digite o novo nome do usuário:");
  const newidade = prompt("Digite a nova idade do usuário:");
  const newEmail = prompt("Digite o novo email do usuário:");
  const newcontato = prompt("Digite o novo contato do usuário:");

  if (!newName || isNaN(newidade) || newidade <= 0 || !newEmail || !newcontato) {
    alert("Por favor, insira valores válidos.");
    return;
  }

  if (!validateEmail(newEmail)) {
    alert("Por favor, insira um email válido.");
    return;
  }

  if (!validatecontato(newcontato)) {
    alert("Por favor, insira um contato válido (exemplo: 99999-9999).");
    return;
  }

  const response = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: newName,
      idade: parseInt(newidade),
      email: newEmail,
      contato: newcontato,
    }),
  });

  if (response.ok) {
    alert("Usuário atualizado com sucesso!");
    fetchUsers(); // Atualiza a lista de usuários
  } else {
    alert("Erro ao atualizar usuário.");
  }
}


// Função para deletar um usuário
async function deleteUser(id) {
  if (!confirm("Tem certeza que deseja deletar este usuário? Essa ação não pode ser desfeita.")) return;

  const response = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    alert("Usuário deletado com sucesso!");
    fetchUsers(); // Atualiza a lista de usuários
  } else {
    alert("Erro ao deletar usuário.");
  }
}


// Função para buscar todos os usuários e exibir na tela
async function fetchUsers() {
  const userList = document.getElementById("userList");
  showLoading(userList); // Exibe o spinner

  const response = await fetch(apiUrl);
  if (!response.ok) {
    alert("Erro ao buscar usuários.");
    return;
  }

  const users = await response.json();

  userList.innerHTML = "<h2>Lista de Usuários</h2>";

  users.forEach((user) => {
    const userItem = document.createElement("div");
    userItem.className = "user-item";
    userItem.innerHTML = `
      <div>
        <p><strong>Nome:</strong> ${user.name}</p>
        <p><strong>Idade:</strong> ${user.idade}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Contato:</strong> ${user.contato}</p>
      </div>
      <div>
        <button class="update-user-btn" onclick="updateUser(${user.id})">Atualizar</button>
        <button class="delete-user-btn" onclick="deleteUser(${user.id})">Deletar</button>
      </div>
    `;
    userList.appendChild(userItem);
  });
}

// Função para buscar um usuário por ID
async function fetchUserById() {
  const userIdInput = document.getElementById("userId");
  const userId = userIdInput.value.trim();
  const userDetails = document.getElementById("userDetails");

  if (!userId || isNaN(userId) || userId <= 0) {
    alert("Por favor, insira um ID válido.");
    return;
  }

  showLoading(userDetails);

  try {
    const response = await fetch(`${apiUrl}/${userId}`);
    if (response.status === 404) {
      userDetails.innerHTML = `<p>Usuário não encontrado.</p>`;
    } else if (!response.ok) {
      const error = await response.json();
      alert(`Erro: ${error.error || "Erro desconhecido ao buscar usuário"}`);
    } else {
      const user = await response.json();
      userDetails.innerHTML = `
        <h2>Detalhes do Usuário</h2>
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Nome:</strong> ${user.name}</p>
        <p><strong>Idade:</strong> ${user.idade}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Contato:</strong> ${user.contato}</p>
      `;
    }
  } catch (error) {
    alert("Erro ao buscar usuário. Verifique sua conexão.");
    userDetails.innerHTML = "";
  }
}



// Carrega a lista de usuários ao carregar a página
fetchUsers();