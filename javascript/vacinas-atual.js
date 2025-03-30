const vacinas = [
    { nome: "COVID-19", paciente: "João Silva", data: "2025-03-30" },
    { nome: "Febre Amarela", paciente: "Maria Souza", data: "2025-03-29" },
    { nome: "Hepatite B", paciente: "Carlos Pereira", data: "2025-03-30" },
    { nome: "Influenza", paciente: "Ana Oliveira", data: "2025-03-31" }
];

const tabelaVacinas = document.getElementById("listaVacinas");
const inputData = document.getElementById("dataFiltro");

const hoje = new Date().toISOString().split("T")[0];
inputData.value = hoje;

function filtrarVacinas() {
    const dataSelecionada = inputData.value;
    tabelaVacinas.innerHTML = "";

    vacinas
        .filter(vacina => vacina.data === dataSelecionada)
        .forEach(vacina => {
            const row = `<tr>
                <td>${vacina.nome}</td>
                <td>${vacina.paciente}</td>
                <td>${vacina.data}</td>
            </tr>`;
            tabelaVacinas.innerHTML += row;
        });
}

inputData.addEventListener("change", filtrarVacinas);

filtrarVacinas();