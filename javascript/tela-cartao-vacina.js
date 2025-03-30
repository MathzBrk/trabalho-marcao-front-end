document.addEventListener("DOMContentLoaded", function() {
    const obterHistoricoVacinas = () => {
        return [
            { nomeVacina: "Vacina A", dataAplicacao: "15/02/2025", localAplicacao: "Posto Central" },
            { nomeVacina: "Vacina B", dataAplicacao: "10/03/2025", localAplicacao: "Posto Norte" }
        ];
    };

    const preencherTabelaVacinas = (vacinas) => {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        vacinas.forEach(vacina => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${vacina.nomeVacina}</td>
                <td>${vacina.dataAplicacao}</td>
                <td>${vacina.localAplicacao}</td>
            `;
            tbody.appendChild(tr);
        });
    };

    const vacinas = obterHistoricoVacinas();
    preencherTabelaVacinas(vacinas);
});
