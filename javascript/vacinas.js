window.onload = () => {
  const form = document.getElementById("form-vacina");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); 
      cadastrarVacina();
    });
  }
}

function cadastrarVacina() {
  const nome = document.getElementById("nomeDaVacina").value.trim();
  const tipoSelect = document.getElementById("tiposDeVacina");
  const tipo = tipoSelect.options[tipoSelect.selectedIndex].text;
  const fabricante = document.getElementById("fabricante").value.trim();
  const numeroDoses = document.getElementById("numeroDoses").value;
  const intervaloDoses = document.getElementById("intervaloDoses").value;
  const efeitosColaterais = document.getElementById("efeitosColaterais").value.trim();
  const recomendacoes = document.getElementById("recomendacoes").value.trim();

  if (!nome || tipoSelect.selectedIndex === 0 || !fabricante || !numeroDoses || !intervaloDoses) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const vacina = {
    nome: nome.toUpperCase(),
    tipo,
    fabricante,
    numeroDoses: parseInt(numeroDoses),
    intervaloDoses: parseInt(intervaloDoses),
    efeitosColaterais,
    recomendacoes
  };

  fetch("http://localhost:3000/vacinas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vacina)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro ao cadastrar vacina.");
    }
    alert("Vacina cadastrada com sucesso!");
    document.getElementById("form-vacina").reset();
  })
  .catch(error => {
    console.error("Erro ao cadastrar vacina:", error);
    alert("Erro ao cadastrar vacina.");
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const tabelaVacinas = document.getElementById('tabela-vacinas');

  function carregarVacinas() {
    fetch('http://localhost:3000/vacinas')
      .then(response => response.json())
      .then(vacinas => {
        tabelaVacinas.innerHTML = ''; 

        vacinas.forEach(vacina => {
          const tr = document.createElement('tr');
        
          tr.innerHTML = `
            <td>${vacina.nome}</td>
            <td>${vacina.tipo}</td>
            <td>${vacina.fabricante}</td>
            <td>${vacina.numeroDoses}</td>
            <td>${vacina.intervaloDoses}</td>
            <td>${vacina.efeitosColaterais}</td>
            <td>${vacina.recomendacoes}</td>
            <td class="text-center">
              <button class="btn btn-warning btn-sm me-2" onclick="editarVacina('${vacina.id}')">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="excluirVacina('${vacina.id}')">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          `;
        
          tabelaVacinas.appendChild(tr);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar vacinas:', error);
        tabelaVacinas.innerHTML = '<tr><td colspan="2" class="text-center text-danger">Erro ao carregar dados.</td></tr>';
      });
  }

  carregarVacinas();
});

function editarVacina(id) {
  window.location.href = `editar-vacina.html?id=${id}`;
}

function excluirVacina(id) {
  if (confirm('Tem certeza que deseja excluir esta vacina?')) {
    fetch(`http://localhost:3000/vacinas/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        alert('Vacina excluída com sucesso!');
        location.reload(); 
      })
      .catch(error => {
        console.error('Erro ao excluir vacina:', error);
        alert('Erro ao excluir vacina.');
      });
  }
}