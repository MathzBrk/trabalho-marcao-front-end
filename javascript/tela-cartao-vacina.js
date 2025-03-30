const formulario = document.getElementById("form");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const cpfinput = document.getElementById("validationDefault02");
    const dataInput = document.getElementById("validationDefault04");

    const cpf = cpfinput.value;
    const data = dataInput.value;

    const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;

    function validarCPF(cpf) {
        return regexCPF.test(cpf);
    }

    function validarData(data) {
        return regexData.test(data);
    }

    if (!validarCPF(cpf)) {
        alert('Erro: CPF inválido! Certifique-se de usar o formato xxx.xxx.xxx-xx.');
        return;
    }

    if (!validarData(data)) {
        alert('Erro: Data inválida! Certifique-se de usar o formato dd/mm/yyyy.');
        return;
    }

    alert('Formulário enviado com sucesso!');
    formulario.submit();
});
