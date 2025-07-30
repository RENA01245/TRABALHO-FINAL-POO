import { Carrinho } from "./ClasseCarrinho.js";
import { Lanche } from "./ClasseLanche.js";
import { Bebida } from "./ClasseBebida.js";
import { Sobremesa } from "./ClasseSobremesa.js";
const carrinho = new Carrinho();
const produtosDisponiveis = [
    new Lanche("Hambúrguer", 15),
    new Lanche("Sanduíche", 12),
    new Bebida("Refrigerante", 7, "500ml"),
    new Bebida("Suco", 8, "300ml"),
    new Sobremesa("Sorvete", 10, "Chocolate"),
    new Sobremesa("Bolo", 9, "Morango")
];
// Mapa de imagens por nome do produto
const imagensPorNome = {
    "Hambúrguer": "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg",
    "Sanduíche": "https://cdn.pixabay.com/photo/2016/04/24/17/48/sandwich-1341011_1280.jpg",
    "Refrigerante": "https://cdn.pixabay.com/photo/2017/06/02/18/24/cola-2363138_1280.jpg",
    "Suco": "https://cdn.pixabay.com/photo/2016/03/05/19/02/orange-juice-1234567_1280.jpg",
    "Sorvete": "https://cdn.pixabay.com/photo/2015/04/08/13/13/ice-cream-712978_1280.jpg",
    "Bolo": "https://cdn.pixabay.com/photo/2017/01/06/19/15/cake-1958416_1280.jpg"
};
function mostrarProdutosDisponiveis() {
    const div = document.getElementById("produtos-disponiveis");
    div.innerHTML = "";
    produtosDisponiveis.forEach((produto, i) => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 mb-3";
        const card = document.createElement("div");
        card.className = "card h-100 bg-dark text-white border-danger d-flex flex-column";
        const imagem = document.createElement("img");
        imagem.src = imagensPorNome[produto.getNome()] || "https://via.placeholder.com/300x180?text=Imagem+Indisponivel";
        imagem.alt = produto.getNome();
        imagem.className = "card-img-top";
        const cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column justify-content-between flex-grow-1";
        cardBody.innerHTML = `
      <div>
        <h5 class="card-title">${produto.getNome()}</h5>
        <p class="card-text">${produto.getInfo()}</p>
        <p class="card-text fw-bold text-danger">R$ ${produto.calcularPreco().toFixed(2)}</p>
      </div>
      <button class="btn btn-danger mt-auto">Adicionar</button>
    `;
        const btn = cardBody.querySelector("button");
        btn.addEventListener("click", () => adicionarProdutoFixo(i));
        card.appendChild(imagem);
        card.appendChild(cardBody);
        col.appendChild(card);
        div.appendChild(col);
    });
}
function adicionarProdutoFixo(i) {
    const produto = produtosDisponiveis[i];
    carrinho.adicionarProduto(produto);
    atualizarCarrinho();
}
function atualizarCarrinho() {
    const lista = document.getElementById("lista-produtos");
    lista.innerHTML = "";
    // @ts-ignore
    carrinho["produtos"].forEach((produto, i) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = `${produto.getNome()} - ${produto.getInfo()} - R$ ${produto.calcularPreco().toFixed(2)}`;
        const btn = document.createElement("button");
        btn.textContent = "Remover";
        btn.className = "btn btn-sm btn-outline-danger ms-2";
        btn.onclick = () => removerProduto(i);
        li.appendChild(btn);
        lista.appendChild(li);
    });
    document.getElementById("total").textContent = `Total: R$ ${carrinho.calcularTotal().toFixed(2)}`;
}
function adicionarProduto() {
    const tipo = document.getElementById("tipo").value;
    const nome = document.getElementById("nome").value;
    const preco = Number(document.getElementById("preco").value);
    const extra = document.getElementById("extra").value;
    let produto;
    if (tipo === "Lanche")
        produto = new Lanche(nome, preco);
    else if (tipo === "Bebida")
        produto = new Bebida(nome, preco, extra);
    else if (tipo === "Sobremesa")
        produto = new Sobremesa(nome, preco, extra);
    else {
        alert("Tipo de produto inválido!");
        return;
    }
    carrinho.adicionarProduto(produto);
    atualizarCarrinho();
    limparCampos();
    alternarFormulario(false); // Esconde o formulário após adicionar
}
function removerProduto(indice) {
    carrinho.removerProduto(indice);
    atualizarCarrinho();
}
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("extra").value = "";
}
function atualizarCampoExtra() {
    const tipo = document.getElementById("tipo").value;
    const extraLabel = document.getElementById("extra-label");
    const extraInput = document.getElementById("extra");
    if (tipo === "Bebida") {
        extraLabel.textContent = "Tamanho:";
        extraInput.style.display = "inline";
        extraInput.placeholder = "Ex: Grande, 500ml";
    }
    else if (tipo === "Sobremesa") {
        extraLabel.textContent = "Sabor:";
        extraInput.style.display = "inline";
        extraInput.placeholder = "Ex: Chocolate";
    }
    else {
        extraLabel.textContent = "";
        extraInput.style.display = "none";
        extraInput.placeholder = "";
    }
}
// Função para mostrar ou esconder o formulário de produto personalizado
function alternarFormulario(mostrar) {
    const formulario = document.getElementById("formulario-produto-personalizado");
    formulario.style.display = mostrar ? "block" : "none";
}
// Torna as funções globais para o HTML poder chamar
window.adicionarProduto = adicionarProduto;
window.removerProduto = removerProduto;
window.adicionarProdutoFixo = adicionarProdutoFixo;
window.atualizarCampoExtra = atualizarCampoExtra;
window.alternarFormulario = alternarFormulario;
// Inicialização
atualizarCampoExtra();
mostrarProdutosDisponiveis();
alternarFormulario(false); // Começa escondido
