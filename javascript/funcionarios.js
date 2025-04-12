window.onload = () => {
  renderizarTabela();
}

function cadastroFuncionario(nome, sobrenome, cpf, cidade, telefone){
  if (!nome || !sobrenome || !cpf || !cidade || !telefone) {
    alert("Preencha todos os campos");
    return;
  }

  const data = {
    nome: `${nome} ${sobrenome}`.toUpperCase(),
    cpf,
    cidade,
    telefone
  };

  fetch("http://localhost:3000/funcionarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro ao cadastrar funcionário.");
    }
    alert("Funcionário cadastrado com sucesso!");
    return response.json();
  })
  .then(() => {
    renderizarTabela();
  })
  .catch(error => {
    console.error(error);
    alert("Erro ao cadastrar funcionário.");
  });
}

function excluir(id) {
  fetch(`http://localhost:3000/funcionarios/${id}`, {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro ao excluir funcionário.");
    }
    renderizarTabela();
  })
  .catch(error => {
    console.error("Erro ao excluir funcionário:", error);
    alert("Erro ao excluir funcionário.");
  });
}
function atualizarNomeFuncionario(funcionario) {
  const novoNome = prompt("Digite o novo nome completo:", funcionario.nome);

  if (novoNome && novoNome.trim() !== "") {
    const dadosAtualizados = {
      ...funcionario,
      nome: novoNome.toUpperCase()
    };

    console.log("Enviando para atualização:", dadosAtualizados);

    fetch(`http://localhost:3000/funcionarios/${funcionario.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosAtualizados)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao atualizar o funcionário.");
      }
      alert("Nome atualizado com sucesso!");
      renderizarTabela();
    })
    .catch(error => {
      console.error("Erro ao atualizar funcionário:", error);
      alert("Erro ao atualizar funcionário.");
    });
  } else {
    alert("Nome inválido. A atualização foi cancelada.");
  }
}

function renderizarTabela(listaFiltrada = null) {

  const tbody = document.getElementById('tabela-funcionarios');
  
  if(!tbody) return;

  fetch("http://localhost:3000/funcionarios")
    .then(response => response.json())
    .then(data => {
      tbody.innerHTML = "";

      const lista = listaFiltrada || data;

      lista.forEach((funcionario, index) => {
        const tr = document.createElement('tr');
        tr.classList.add('funcionario');

        const thId = document.createElement('th');
        thId.innerText = (index + 1);

        const tdNome = document.createElement('td');
        tdNome.innerText = funcionario.nome;

        const tdCpf = document.createElement('td');
        tdCpf.innerText = funcionario.cpf;

        const tdAcoes = document.createElement('td');
        tdAcoes.classList.add('text-center');

        const btnAtualizar = document.createElement('button');
        btnAtualizar.classList.add('btn', 'btn-warning', 'ms-2')
        btnAtualizar.innerHTML = '<i class="bi bi-pencil-square"></i>';
        btnAtualizar.addEventListener("click", () => atualizarNomeFuncionario(funcionario));

        const btnExcluir = document.createElement('button');
        btnExcluir.classList.add('btn', 'btn-danger', 'ms-2');
        btnExcluir.innerHTML = '<i class="bi bi-trash"></i>';
        btnExcluir.addEventListener("click", () => excluir(funcionario.id));
        
        tdAcoes.appendChild(btnAtualizar);
        tdAcoes.appendChild(btnExcluir);

        tr.appendChild(thId);
        tr.appendChild(tdNome);
        tr.appendChild(tdCpf);
        tr.appendChild(tdAcoes);

        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error("Erro ao carregar funcionários:", error);
    });
}

//filtragem
const searchInput = document.getElementById("searchInput");

if(searchInput){
  searchInput.addEventListener("input", (event) => {
    const termoBusca = event.target.value.trim().toLowerCase();
  
    fetch("http://localhost:3000/funcionarios")
      .then(response => response.json())
      .then(data => {
        if (termoBusca === "") {
          renderizarTabela();
          return;
        }
  
        const funcionariosFiltrados = data.filter(funcionario =>
          funcionario.nome.toLowerCase().includes(termoBusca)
        );
  
        renderizarTabela(funcionariosFiltrados);
      })
      .catch(error => {
        console.error("Erro ao buscar funcionários para filtro:", error);
      });
  });
}
