const vacinas = ["Covid-19", "Gripe", "Hepatite B", "Febre Amarela", "Sarampo"];

window.onload = () => {
  carregarFuncionarios();
  carregarVacinas();
  configurarValidacaoData();
  configurarEnvioFormulario();
};

// carrega as vacinas no select
function carregarVacinas() {
  const selectVacinas = document.getElementById("vacinas");

  vacinas.forEach(vacina => {
    const option = document.createElement("option");
    option.value = vacina;
    option.textContent = vacina;
    selectVacinas.appendChild(option);
  });
}

// carrega os funcionarios no select
function carregarFuncionarios() {
  const selectFuncionarios = document.getElementById("funcionarios");

  fetch("http://localhost:3000/funcionarios")
    .then(response => response.json())
    .then(data => {
      data.forEach(funcionario => {
        const option = document.createElement("option");
        option.value = funcionario.id;
        option.textContent = funcionario.nome;
        selectFuncionarios.appendChild(option);
      });
    })
    .catch(error => console.error("Erro ao carregar funcionários:", error));
}

// configura a validacao de data futura
function configurarValidacaoData() {
  const inputDataAgendamento = document.getElementById("dataAgendamento");

  let dataErro = document.createElement("div");
  dataErro.id = "dataErro";
  dataErro.className = "text-danger mt-1";
  dataErro.style.display = "none";

  if (!document.getElementById("dataErro")) {
    inputDataAgendamento.parentNode.appendChild(dataErro);
  }

  inputDataAgendamento.addEventListener("change", function () {
    const dataSelecionada = new Date(this.value);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataSelecionada <= hoje) {
      dataErro.textContent = "A data deve ser futura!";
      dataErro.style.display = "block";
      this.value = "";
    } else {
      dataErro.style.display = "none";
    }
  });
}

// configura o envio do formulario com validacao e POST
function configurarEnvioFormulario() {
  const form = document.getElementById("formAgendamento");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectVacinas = document.getElementById("vacinas");
    const selectFuncionarios = document.getElementById("funcionarios");
    const dataAgendamento = document.getElementById("dataAgendamento").value;
    const inputDataAgendamento = document.getElementById("dataAgendamento");
    const dataErro = document.getElementById("dataErro");

    const vacina = selectVacinas.value;
    const funcionarioId = selectFuncionarios.value;

    if (!vacina || !funcionarioId || !dataAgendamento) {
      alert("Preencha todos os campos!");
      return;
    }

    if (dataAgendamento === "") {
      dataErro.textContent = "Por favor, selecione uma data futura!";
      dataErro.style.display = "block";
      return;
    }

    const agendamento = {
      vacina,
      funcionarioId,
      dataAgendada: dataAgendamento
    };

    fetch("http://localhost:3000/agendamentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(agendamento)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao agendar vacina");
        }
        alert("Vacina agendada com sucesso!");
        form.reset();
      })
      .catch(error => {
        console.error("Erro ao agendar:", error);
        alert("Erro ao agendar vacina");
      });
  });
}
