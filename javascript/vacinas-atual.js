const tabelaVacinas = document.getElementById("listaVacinas");
const inputData = document.getElementById("dataFiltro");

const hoje = new Date().toISOString().split("T")[0];
inputData.value = hoje;

window.onload = () => {
  carregarVacinas();
};

inputData.addEventListener("change", carregarVacinas);

function obterNomeVacina(vacinaId, vacinas) {
  const encontrada = vacinas.find(v => v.id === vacinaId);
  return encontrada ? encontrada.nome : vacinaId;
}

function carregarVacinas() {
  const dataSelecionada = inputData.value;

  Promise.all([
    fetch("http://localhost:3000/registros").then(res => res.json()),
    fetch("http://localhost:3000/funcionarios").then(res => res.json()),
    fetch("http://localhost:3000/agendamentos").then(res => res.json()),
    fetch("http://localhost:3000/vacinas").then(res => res.json())
  ])
    .then(([registros, funcionarios, agendamentos, vacinas]) => {
      // limpar tabela
      tabelaVacinas.innerHTML = "";

      // Filtrar por data
      const registrosFiltrados = registros.filter(r => r.dataRegistro === dataSelecionada);
      const agendamentosFiltrados = agendamentos.filter(a => a.dataAgendada === dataSelecionada);

      if (registrosFiltrados.length === 0 && agendamentosFiltrados.length === 0) {
        tabelaVacinas.innerHTML = "<tr><td colspan='3'>Nenhuma vacina encontrada ou agendada para esta data.</td></tr>";
        return;
      }

      // mostrar vacinas aplicadas (registros)
      registrosFiltrados.forEach(registro => {
        const vacinado = funcionarios.find(f => f.id == registro.funcionarioVacinadoId);
        const nomeVacinado = vacinado ? vacinado.nome : "Desconhecido";
        const nomeVacina = obterNomeVacina(registro.vacina, vacinas);

        const row = `<tr>
          <td>${nomeVacina}</td>
          <td>${nomeVacinado}</td>
          <td>${registro.dataRegistro} (Aplicada)</td>
        </tr>`;

        tabelaVacinas.innerHTML += row;
      });

      agendamentosFiltrados.forEach(agendamento => {
        const funcionario = funcionarios.find(f => f.id == agendamento.funcionarioId);
        const nomeFuncionario = funcionario ? funcionario.nome : "Desconhecido";
        const nomeVacina = obterNomeVacina(agendamento.vacina, vacinas);

        const row = `<tr>
          <td>${nomeVacina}</td>
          <td>${nomeFuncionario}</td>
          <td>${agendamento.dataAgendada} (Agendada)</td>
        </tr>`;

        tabelaVacinas.innerHTML += row;
      });
    })
    .catch(error => {
      console.error("Erro ao carregar vacinas:", error);
      tabelaVacinas.innerHTML = "<tr><td colspan='3'>Erro ao carregar dados</td></tr>";
    });
}
