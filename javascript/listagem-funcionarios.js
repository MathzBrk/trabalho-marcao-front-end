function renderizarTabela(data) {
    const tabela = document.getElementById('tabela-funcionarios');
    tabela.innerHTML = '';

    data.forEach(funcionario => {
      const row = document.createElement('tr');
      row.classList.add('funcionario');
      row.innerHTML = `
        <th class="funcionario-id" scope="row">${funcionario.id}</th>
        <td class="funcionario-nome">${funcionario.nome}</td>
        <td class="funcionario-cpf">${funcionario.cpf}</td>
        <td class="funcionario-acoes text-center">
          <button type="button" class="btn btn-info botao-dados ms-2"><i class="bi bi-eye"></i></button>
          <button type="button" class="btn btn-warning botao-atualizar ms-2"><i class="bi bi-pencil-square"></i></button>
          <button type="button" class="btn btn-danger botao-excluir ms-2"><i class="bi bi-trash"></i></button>
        </td>
      `;
      tabela.appendChild(row);
    });
}

function filtrarFuncionarios() {
    const filtro = document.getElementById('searchInput').value.toLowerCase();
    const funcionariosFiltrados = funcionarios.filter(funcionario => funcionario.nome.toLowerCase().includes(filtro));
    renderizarTabela(funcionariosFiltrados);
}

const funcionarios = [
    { id: 1, nome: 'Marcão', cpf: '123.456.789-00' },
    { id: 2, nome: 'Matheus', cpf: '987.654.321-00' },
    { id: 3, nome: 'Sergio', cpf: '111.222.333-44' }
];

document.getElementById('searchInput').addEventListener('input', filtrarFuncionarios);

renderizarTabela(funcionarios);