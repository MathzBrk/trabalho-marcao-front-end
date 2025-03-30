document.addEventListener("DOMContentLoaded", function () {
    const vacinas = ["Covid-19", "Gripe", "Hepatite B", "Febre Amarela", "Sarampo"];
    const funcionariosResponsaveis = ["Lucas - Enfermeiro", "Leticia - Médica Geral", "Bruna - Enfermeira"];
    const funcionariosVacinados = ["Matheus", "Matheus Borges", "Sergio Rodrigues", "Wesley Sanches"];

    const selectVacinas = document.getElementById("vacinas");
    const selectFuncionarioVacinado = document.getElementById("funcionarioVacinado");
    const selectFuncionarioResponsavel = document.getElementById("funcionarioResponsavel");

    function preencherSelect(selectElement, optionsArray) {
        optionsArray.forEach(optionText => {
            const option = document.createElement("option");
            option.value = optionText;
            option.textContent = optionText;
            selectElement.appendChild(option);
        });
    }

    preencherSelect(selectVacinas, vacinas);
    preencherSelect(selectFuncionarioVacinado, funcionariosVacinados);
    preencherSelect(selectFuncionarioResponsavel, funcionariosResponsaveis);
});

document.getElementById("formAgendamento").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Registro de aplicação gravado com sucesso!");
});
