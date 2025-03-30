const vacinas = ["Covid-19", "Gripe", "Hepatite B", "Febre Amarela", "Sarampo"];
const funcionarios = ["João Silva", "Maria Oliveira", "Carlos Santos", "Ana Souza"];

const selectVacinas = document.getElementById("vacinas");
const selectFuncionarios = document.getElementById("funcionarios");

vacinas.forEach(vacina => {
    const option = document.createElement("option");
    option.value = vacina;
    option.textContent = vacina;
    selectVacinas.appendChild(option);
});

funcionarios.forEach(funcionario => {
    const option = document.createElement("option");
    option.value = funcionario;
    option.textContent = funcionario;
    selectFuncionarios.appendChild(option);
});

document.addEventListener("DOMContentLoaded", function () {
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

    document.getElementById("formAgendamento").addEventListener("submit", function (event) {
        if (inputDataAgendamento.value === "") {
            event.preventDefault();
            dataErro.textContent = "Por favor, selecione uma data futura!";
            dataErro.style.display = "block";
        }
    });
});

document.getElementById("formAgendamento").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Vacina agendada com sucesso!");
});