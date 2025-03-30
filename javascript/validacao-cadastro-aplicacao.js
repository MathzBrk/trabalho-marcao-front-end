document.getElementById("form-vacinacao").addEventListener("submit", function(event) {
    event.preventDefault();
    let valid = true;

    const cpfVacinado = document.getElementById("funcionario-vacinado");
    const cpfResponsavel = document.getElementById("funcionario-responsavel");
    const dataAplicacao = document.getElementById("data-aplicacao");
    const tipoVacina = document.getElementById("tipo-vacina");
    const termosCondicoes = document.getElementById("invalidCheck2");

    const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (!regexCPF.test(cpfVacinado)) {
        valid = false;
        alert("CPF do vacinado inválido! O formato deve ser XXX.XXX.XXX-XX.");
    }

    if (!regexCPF.test(cpfResponsavel)) {
        valid = false;
        alert("CPF do responsável inválido! O formato deve ser XXX.XXX.XXX-XX.");
    }

    if (!dataAplicacao.value) {
        valid = false;
        alert("Por favor, informe a data de aplicação.");
    }

    if (!tipoVacina.value.trim()) {
        valid = false;
        alert("Por favor, informe o tipo de vacina.");
    }

    if (valid) {
        this.submit();
    }
});
