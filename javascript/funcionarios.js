const funcionarios = [
  { id: 1, nome: 'Marcão', cpf: '123.456.789-00' },
  { id: 2, nome: 'Matheus', cpf: '987.654.321-00' },
  { id: 3, nome: 'Sergio', cpf: '111.222.333-44' }
];

function renderizarTabela(data) {
  const tabela = document.getElementById('tabela-funcionarios');
  tabela.innerHTML = '';

  data.forEach(funcionario => {
      const row = document.createElement('tr');
      row.classList.add('funcionario');

      const thId = document.createElement('th');
      thId.classList.add('funcionario-id');
      thId.textContent = funcionario.id;

      const tdNome = document.createElement('td');
      tdNome.classList.add('funcionario-nome');
      tdNome.textContent = funcionario.nome;

      const tdCpf = document.createElement('td');
      tdCpf.classList.add('funcionario-cpf');
      tdCpf.textContent = funcionario.cpf;

      const tdAcoes = document.createElement('td');
      tdAcoes.classList.add('funcionario-acoes', 'text-center');

      const btnDados = document.createElement('button');
      btnDados.type = 'button';
      btnDados.classList.add('btn', 'btn-info', 'botao-dados', 'ms-2');
      btnDados.innerHTML = '<i class="bi bi-eye"></i>';

      const btnAtualizar = document.createElement('button');
      btnAtualizar.type = 'button';
      btnAtualizar.classList.add('btn', 'btn-warning', 'botao-atualizar', 'ms-2');
      btnAtualizar.innerHTML = '<i class="bi bi-pencil-square"></i>';

      const btnExcluir = document.createElement('button');
      btnExcluir.type = 'button';
      btnExcluir.classList.add('btn', 'btn-danger', 'botao-excluir', 'ms-2');
      btnExcluir.innerHTML = '<i class="bi bi-trash"></i>';

      tdAcoes.appendChild(btnDados);
      tdAcoes.appendChild(btnAtualizar);
      tdAcoes.appendChild(btnExcluir);

      row.appendChild(thId);
      row.appendChild(tdNome);
      row.appendChild(tdCpf);
      row.appendChild(tdAcoes);

      tabela.appendChild(row);
  });
}

//filtragem
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("change", (event) => {
const termoBusca = event.target.value.trim().toLowerCase();

  if(termoBusca === "") {
    renderizarTabela(funcionarios);
    return;
  }

  const funcionariosFiltrados = funcionarios.filter(funcionario => 
    funcionario.nome.toLowerCase().includes(termoBusca)
  );

  console.log("Funcionários filtrados:", funcionariosFiltrados); // 🔍 Debug

  renderizarTabela(funcionariosFiltrados);
});

renderizarTabela(funcionarios);



