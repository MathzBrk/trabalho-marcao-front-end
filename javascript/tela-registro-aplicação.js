window.onload = () => {
    inicializarFormulario();
  }
  
  function inicializarFormulario() {
    const vacinas = ["Covid-19", "Gripe", "Hepatite B", "Febre Amarela", "Sarampo"];
    preencherSelectFixas("vacinas", vacinas);
  
    carregarFuncionarios();
  
    configurarEnvioDoFormulario();
  }
  
  function preencherSelectFixas(idSelect, opcoes) {
    const select = document.getElementById(idSelect);
    if (!select) return;
  
    opcoes.forEach(opcao => {
      const option = document.createElement("option");
      option.value = opcao;
      option.textContent = opcao;
      select.appendChild(option);
    });
  }
  
  function carregarFuncionarios() {
    fetch("http://localhost:3000/funcionarios")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao buscar funcionários");
        }
        return response.json();
      })
      .then(data => {
        preencherSelectFuncionarios("funcionarioResponsavel", data);
        preencherSelectFuncionarios("funcionarioVacinado", data);
      })
      .catch(error => {
        console.error("Erro ao carregar funcionários:", error);
        alert("Erro ao carregar funcionários. Verifique a API.");
      });
  }
  
  function preencherSelectFuncionarios(idSelect, funcionarios) {
    const select = document.getElementById(idSelect);
    if (!select) return;
  
    funcionarios.forEach(func => {
      const option = document.createElement("option");
      option.value = func.id;
      option.textContent = func.nome;
      select.appendChild(option);
    });
  }
  
  function configurarEnvioDoFormulario() {
    const form = document.getElementById("formAgendamento");
  
    if (!form) return;
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const vacina = document.getElementById("vacinas").value;
      const funcionarioVacinadoId = document.getElementById("funcionarioVacinado").value;
      const funcionarioResponsavelId = document.getElementById("funcionarioResponsavel").value;
  
      const novoRegistro = {
        vacina: vacina,
        funcionarioVacinadoId: funcionarioVacinadoId,
        funcionarioResponsavelId: funcionarioResponsavelId,
        dataRegistro: new Date().toISOString().split('T')[0]
      };
  
      fetch("http://localhost:3000/registros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoRegistro)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Erro ao registrar vacinação");
          }
          return response.json();
        })
        .then(data => {
          alert("Registro de aplicação gravado com sucesso!");
          form.reset();
        })
        .catch(error => {
          console.error("Erro ao registrar:", error);
          alert("Erro ao registrar vacinação. Verifique a API.");
        });
    });
  }
  
  