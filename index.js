const overlay = document.getElementById("overlay");
const criarTarefaModal = document.getElementById("criarTarefa");
const lista = document.getElementById("lista");

function abrirModal() {
  overlay.classList.add("active");
  criarTarefaModal.classList.add("active");
}

function fecharModal() {
  overlay.classList.remove("active");
  criarTarefaModal.classList.remove("active");
}

function buscarTarefas() {
  fetch("http://localhost:5500/tarefas")
    .then((res) => res.json())
    .then((res) => {
      inserirTarefas(res);
    })
    .catch((error) => console.error("Erro ao buscar tarefas:", error));
}

function inserirTarefas(listaDeTarefas) {
  lista.innerHTML = "";
  if (listaDeTarefas.length > 0) {
    listaDeTarefas.forEach((tarefa) => {
      lista.innerHTML += `
        <li>
          <h5>${tarefa.titulo}</h5>
          <p>${tarefa.descricao}</p>
          <div class="actions">
            <box-icon name='trash' size="sm" onclick="deletarTarefa(${tarefa.id})" aria-label="Deletar tarefa"></box-icon>
          </div>
        </li>`;
    });
  } else {
    lista.innerHTML = `<h6>Nenhuma tarefa encontrada</h6>`;
  }
}

function novaTarefa(event) {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;

  const tarefa = { titulo, descricao };

  fetch("http://localhost:5500/tarefas", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(tarefa),
  })
    .then((res) => res.json())
    .then(() => {
      fecharModal();
      buscarTarefas();
      // Limpa os campos
      document.getElementById("titulo").value = "";
      document.getElementById("descricao").value = "";
    })
    .catch((error) => console.error("Erro ao criar tarefa:", error));
}

function deletarTarefa(id) {
  fetch(`http://localhost:5500/tarefas/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      buscarTarefas();
    })
    .catch((error) => console.error("Erro ao deletar tarefa:", error));
}

document.addEventListener("DOMContentLoaded", buscarTarefas);
