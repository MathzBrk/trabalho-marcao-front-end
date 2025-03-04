function renderizarTabela(data) {
    const tabela = document.getElementById('tabela-vacinas');
    tabela.innerHTML = '';

    data.forEach(vacina => {
      const row = document.createElement('tr');
      row.classList.add('vacina');
      row.innerHTML = `
        <td class="vacina-nome">${vacina.nome}</td>
        <td class="vacina-acoes text-center">
          <button type="button" class="btn btn-warning botao-atualizar ms-2"><i class="bi bi-pencil-square"></i></button>
          <button type="button" class="btn btn-danger botao-excluir ms-2"><i class="bi bi-trash"></i></button>
        </td>
      `;
      tabela.appendChild(row);
    });
}

function filtrarVacinas() {
    const filtro = document.getElementById('searchInput').value.toLowerCase();
    const vacinasFiltradas = vacinas.filter(vacina => vacina.nome.toLowerCase().includes(filtro));
    renderizarTabela(vacinasFiltradas);
}

const vacinas = [
    { id: 1, nome: 'Coronavac' },
    { id: 2, nome: 'Pfizer' },
    { id: 3, nome: 'AstraZeneca' },
    { id: 4, nome: 'Janssen' }
  ];
document.getElementById('searchVacinaInput').addEventListener('input', filtrarVacinas);

renderizarTabela(vacinas);