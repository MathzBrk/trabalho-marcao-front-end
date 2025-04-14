document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.querySelector("tbody");
  
    const criarCelula = (texto) => {
      const td = document.createElement("td");
      td.textContent = texto;
      return td;
    };
  
    const criarLinha = (registro) => {
      const tr = document.createElement("tr");
      const statusTexto = registro.status ? ` (${registro.status})` : "";
      const nomeVacina = registro.nomeVacina + statusTexto;
  

  
      tr.appendChild(criarCelula(nomeVacina));
      tr.appendChild(criarCelula(registro.nomePaciente));
      tr.appendChild(criarCelula(registro.data));
  
      return tr;
    };
  
    const preencherTabela = (dados) => {
      tbody.replaceChildren();
  
      if (dados.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 4;
        td.textContent = "Nenhum registro ou agendamento encontrado.";
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
      }
      dados.forEach(registro => {
        const linha = criarLinha(registro);
        tbody.appendChild(linha);
      });
    };
  
    fetch("http://localhost:3000/registros")
      .then(res => res.json())
      .then(registros => {
        fetch("http://localhost:3000/funcionarios")
          .then(res => res.json())
          .then(funcionarios => {
            fetch("http://localhost:3000/agendamentos")
              .then(res => res.json())
              .then(agendamentos => {
                fetch("http://localhost:3000/vacinas")
                  .then(res => res.json())
                  .then(vacinas => {
                    const obterNomeVacina = (idOuNome) => {
                      const vacina = vacinas.find(v => v.id === idOuNome);
                      return vacina ? vacina.nome : idOuNome;
                    };
  
                    const registrosCompletos = registros.map(r => {
                      const paciente = funcionarios.find(f => f.id === r.funcionarioVacinadoId);
                      return {
                        nomeVacina: obterNomeVacina(r.vacina),
                        nomePaciente: paciente ? paciente.nome : "Desconhecido",
                        data: r.dataRegistro,
                        localAplicacao: r.localAplicacao,
                        status: null
                      };
                    });
  
                    const agendamentosCompletos = agendamentos.map(a => {
                      const paciente = funcionarios.find(f => f.id === a.funcionarioId);
                      return {
                        nomeVacina: obterNomeVacina(a.vacina),
                        nomePaciente: paciente ? paciente.nome : "Desconhecido",
                        data: a.dataAgendada,
                        status: "Agendada"
                      };
                    });
  
                    const historico = [...registrosCompletos, ...agendamentosCompletos]
                      .sort((a, b) => new Date(b.data) - new Date(a.data));
  
                    preencherTabela(historico);
                  })
                  .catch(erro => mostrarErro());
              })
              .catch(erro => mostrarErro());
          })
          .catch(erro => mostrarErro());
      })
      .catch(erro => mostrarErro());
  
    const mostrarErro = () => {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 4;
      td.textContent = "Erro ao carregar dados.";
      tr.appendChild(td);
      tbody.replaceChildren(tr);
    };
  });
  