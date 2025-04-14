document.addEventListener("DOMContentLoaded", function () {
  const preencherTabelaVacinas = (registros) => {
      const tbody = document.querySelector("tbody");
      tbody.innerHTML = "";

      if (registros.length === 0) {
          tbody.innerHTML = "<tr><td colspan='4'>Nenhum registro ou agendamento encontrado.</td></tr>";
          return;
      }

      registros.forEach(registro => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
              <td>${registro.nomeVacina}${registro.status ? ` (${registro.status})` : ''}</td>
              <td>${registro.nomePaciente}</td>
              <td>${registro.data}</td> <!-- Usar o campo 'data' corretamente -->
          `;
          tbody.appendChild(tr);
      });
  };

  // Carregar os dados
  Promise.all([
      fetch("http://localhost:3000/registros").then(res => res.json()),
      fetch("http://localhost:3000/funcionarios").then(res => res.json()),
      fetch("http://localhost:3000/agendamentos").then(res => res.json())
  ])
      .then(([registros, funcionarios, agendamentos]) => {
          // Mapear os registros com os nomes dos vacinados
          const registrosComNomes = registros.map(registro => {
              const paciente = funcionarios.find(f => f.id === registro.funcionarioVacinadoId);
              return {
                  nomeVacina: registro.vacina,
                  nomePaciente: paciente ? paciente.nome : "Desconhecido",
                  data: registro.dataRegistro, // Corrigir para usar 'dataRegistro' da vacina aplicada
                  localAplicacao: registro.localAplicacao,
                  status: null // Indica que é uma vacina aplicada
              };
          });

          // Mapear os agendamentos com os nomes dos funcionários
          const agendamentosComNomes = agendamentos.map(agendamento => {
              const paciente = funcionarios.find(f => f.id === agendamento.funcionarioId);
              return {
                  nomeVacina: agendamento.vacina,
                  nomePaciente: paciente ? paciente.nome : "Desconhecido",
                  data: agendamento.dataAgendada, // Usar a data agendada para o agendamento
                  localAplicacao: null, // No agendamento, a aplicação ainda não ocorreu
                  status: "Agendada"
              };
          });

          // Combinar e preencher a tabela com registros e agendamentos
          const historicoCompleto = [...registrosComNomes, ...agendamentosComNomes].sort((a, b) => new Date(b.data) - new Date(a.data));
          preencherTabelaVacinas(historicoCompleto);
      })
      .catch(error => {
          console.error("Erro ao carregar histórico de vacinas e agendamentos:", error);
          const tbody = document.querySelector("tbody");
          tbody.innerHTML = "<tr><td colspan='4'>Erro ao carregar dados</td></tr>";
      });
});
