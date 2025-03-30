const formVacina = document.getElementById("form-vacina");

formVacina.addEventListener("submit", function(event) {
    event.preventDefault();
    let valid = true;

    const nomeDaVacina = document.getElementById("nomeDaVacina");
    const tiposDeVacina = document.getElementById("tiposDeVacina");
    const fabricante = document.getElementById("fabricante");
    const numeroDoses = document.getElementById("numeroDoses");
    const intervaloDoses = document.getElementById("intervaloDoses");

    if (!nomeDaVacina.value.trim()) {
        valid = false;
        alert("O nome da vacina é obrigatório.");
    }

    if (tiposDeVacina.selectedIndex === 0) {
        valid = false;
        alert("Por favor, selecione o tipo de vacina.");
    }

    if (!fabricante.value.trim()) {
        valid = false;
        alert("O fabricante é obrigatório.");
    }

    if (numeroDoses.selectedIndex === 0) {
        valid = false;
        alert("Por favor, selecione a quantidade de doses.");
    }

    if (intervaloDoses.value < 1) {
        valid = false;
        alert("O intervalo entre as doses deve ser maior que 0.");
    }

    if (valid) {
        formVacina.submit();
    }
});
