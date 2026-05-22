// MENU MOBILE
const menuToggle = document.querySelector(".menu-toggle");
const menuNav = document.querySelector(".menu-nav");

if (menuToggle && menuNav) {
    menuToggle.addEventListener("click", () => {
        menuNav.classList.toggle("ativo");
    });
}

// SISTEMA DE ANOTAÇÕES DO PLANO
const anotacaoInput = document.getElementById("anotacaoInput");
const salvarAnotacao = document.getElementById("salvarAnotacao");
const listaAnotacoes = document.getElementById("listaAnotacoes");

let anotacoes = JSON.parse(localStorage.getItem("anotacoesDevNotes")) || [];

function salvarNoLocalStorage() {
    localStorage.setItem("anotacoesDevNotes", JSON.stringify(anotacoes));
}

function renderizarAnotacoes() {
    if (!listaAnotacoes) return;

    listaAnotacoes.innerHTML = "";

    anotacoes.forEach((texto, index) => {
        const item = document.createElement("div");
        item.className = "anotacao-item";

        const paragrafo = document.createElement("p");
        paragrafo.innerText = texto;

        const acoes = document.createElement("div");
        acoes.className = "acoes-anotacao";

        const botaoEditar = document.createElement("button");
        botaoEditar.innerText = "✏️";
        botaoEditar.title = "Editar anotação";
        botaoEditar.addEventListener("click", () => editarAnotacao(index));

        const botaoApagar = document.createElement("button");
        botaoApagar.innerText = "🗑️";
        botaoApagar.title = "Apagar anotação";
        botaoApagar.addEventListener("click", () => apagarAnotacao(index));

        acoes.appendChild(botaoEditar);
        acoes.appendChild(botaoApagar);

        item.appendChild(paragrafo);
        item.appendChild(acoes);

        listaAnotacoes.appendChild(item);
    });
}

function adicionarAnotacao() {
    if (!anotacaoInput) return;

    const texto = anotacaoInput.value.trim();

    if (texto === "") {
        return;
    }

    anotacoes.push(texto);
    salvarNoLocalStorage();

    anotacaoInput.value = "";
    renderizarAnotacoes();
}

function apagarAnotacao(index) {
    anotacoes.splice(index, 1);
    salvarNoLocalStorage();
    renderizarAnotacoes();
}

function editarAnotacao(index) {
    if (!anotacaoInput) return;

    anotacaoInput.value = anotacoes[index];
    anotacoes.splice(index, 1);

    salvarNoLocalStorage();
    renderizarAnotacoes();
    anotacaoInput.focus();
}

if (salvarAnotacao) {
    salvarAnotacao.addEventListener("click", adicionarAnotacao);
}

if (anotacaoInput) {
    anotacaoInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && event.ctrlKey) {
            adicionarAnotacao();
        }
    });
}

renderizarAnotacoes();


// CÓDIGO ANTIGO DE ESTUDOS, MANTIDO PARA COMPATIBILIDADE
let estudos = JSON.parse(localStorage.getItem("estudosDevNotes")) || [];

function salvarEstudos() {
    localStorage.setItem("estudosDevNotes", JSON.stringify(estudos));
}

function adicionarEstudo() {
    const campoEstudo = document.getElementById("estudo");
    const mensagem = document.getElementById("mensagem");

    if (!campoEstudo) return;

    let texto = campoEstudo.value.trim();

    if (texto === "") {
        if (mensagem) {
            mensagem.innerHTML = "Digite uma etapa válida";
            mensagem.style.color = "red";
        }
        return;
    }

    estudos.push({
        nome: texto,
        concluido: false
    });

    salvarEstudos();

    campoEstudo.value = "";

    if (mensagem) {
        mensagem.innerHTML = "Etapa adicionada com sucesso";
        mensagem.style.color = "green";
    }

    mostrarEstudos();
}

function mostrarEstudos() {
    const lista = document.getElementById("listaEstudos");
    if (!lista) return;

    lista.innerHTML = "";

    estudos.forEach(function(item, index) {
        let classe = "tarefa";

        if (item.concluido === true) {
            classe = "tarefa concluida";
        }

        lista.innerHTML +=
            "<div class='" + classe + "'>" +
                "<span class='texto-tarefa'>" + item.nome + "</span>" +
                "<span class='acoes'>" +
                    "<button onclick='concluirEstudo(" + index + ")'>✅</button>" +
                    "<button onclick='editarEstudo(" + index + ")'>✏️</button>" +
                    "<button onclick='removerEstudo(" + index + ")'>🗑️</button>" +
                "</span>" +
            "</div>";
    });
}

function concluirEstudo(posicao) {
    estudos[posicao].concluido = !estudos[posicao].concluido;
    salvarEstudos();
    mostrarEstudos();
}

function removerEstudo(posicao) {
    estudos.splice(posicao, 1);
    salvarEstudos();
    mostrarEstudos();
}

function editarEstudo(posicao) {
    const campoEstudo = document.getElementById("estudo");
    const mensagem = document.getElementById("mensagem");

    if (!campoEstudo) return;

    campoEstudo.value = estudos[posicao].nome;

    estudos.splice(posicao, 1);
    salvarEstudos();
    mostrarEstudos();

    if (mensagem) {
        mensagem.innerHTML = "Edite a etapa e clique em adicionar novamente";
        mensagem.style.color = "orange";
    }
}

const inputEstudo = document.getElementById("estudo");

if (inputEstudo) {
    inputEstudo.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            adicionarEstudo();
        }
    });
}

mostrarEstudos();
