const botaoFunc = document.getElementById("botao-add-func");
const formulario = document.getElementById("formulario-funcionario");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    let valid = true;

    const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/; 

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const cpfInput = document.getElementById("cpf");
    const telefoneInput = document.getElementById("telefone");
    if (!regexCPF.test(cpfInput.value)) {
        valid = false;
        alert("CPF inválido! O formato deve ser XXX.XXX.XXX-XX.");
    }

    if (!regexTelefone.test(telefoneInput.value)) {
        valid = false;
        alert("Telefone inválido! O formato deve ser (XX) XXXXX-XXXX.");
    }

    if (valid) {
        cadastroFuncionario(nome, sobrenome, cpfInput.value, cidade, telefoneInput.value);
        formulario.reset();
    }
});
