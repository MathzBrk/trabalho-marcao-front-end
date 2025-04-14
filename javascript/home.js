document.addEventListener("DOMContentLoaded", function () {
    
    fetch("http://localhost:3000/funcionarios")
        .then(response => response.json())
        .then(funcionarios => {
            document.getElementById("totalFuncionarios").textContent = funcionarios.length;

            
            fetch("http://localhost:3000/registros")
                .then(response => response.json())
                .then(registros => {
                    document.getElementById("vacinasAplicadas").textContent = registros.length;

                    
                    const vacinadosIds = [];
                    registros.forEach(registro => {
                        if (!vacinadosIds.includes(registro.funcionarioVacinadoId)) {
                            vacinadosIds.push(registro.funcionarioVacinadoId);
                        }
                    });
                    document.getElementById("funcionariosVacinados").textContent = vacinadosIds.length;

                    
                    fetch("http://localhost:3000/agendamentos")
                        .then(response => response.json())
                        .then(agendamentos => {
                            document.getElementById("vacinasAgendadas").textContent = agendamentos.length;
                        })
                        .catch(error => {
                            console.error("Erro ao buscar agendamentos:", error);
                        });

                })
                .catch(error => {
                    console.error("Erro ao buscar registros:", error);
                });

        })
        .catch(error => {
            console.error("Erro ao buscar funcionários:", error);
        });
});
