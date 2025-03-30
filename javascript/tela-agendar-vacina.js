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

document.getElementById("formAgendamento").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Vacina agendada com sucesso!");
});