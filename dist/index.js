import { Carrinho } from "./ClasseCarrinho.js";
import { Lanche } from "./ClasseLanche.js";
import { Bebida } from "./ClasseBebida.js";
import { Sobremesa } from "./ClasseSobremesa.js";
const carrinho = new Carrinho();
const produtosDisponiveis = [
    new Lanche("Hambúrguer", 15),
    new Lanche("Sanduíche", 12),
    new Lanche("Cheeseburger", 17),
    new Lanche("X-Bacon", 20),
    new Bebida("Refrigerante", 7, "500ml"),
    new Bebida("Suco", 8, "300ml"),
    new Bebida("Água", 4, "500ml"),
    new Sobremesa("Sorvete", 10, "Chocolate"),
    new Sobremesa("Bolo", 9, "Morango"),
    new Sobremesa("Pudim", 8, "Leite Condensado")
];
const imagensPorNome = {
    "Hambúrguer": "img/hamburguer.jpg",
    "Sanduíche": "img/sanduiche.png",
    "Cheeseburger": "img/cheeseburger.jpg",
    "X-Bacon": "img/xbacon.jpg",
    "Refrigerante": "img/refrigerante.jpg",
    "Suco": "img/suco.jpg",
    "Água": "img/agua.jpg",
    "Sorvete": "img/sorvete.jpg",
    "Bolo": "img/bolo.jpg",
    "Pudim": "img/pudim.jpg"
};
let cupomAtivo = false;
function mostrarProdutosDisponiveis() {
    const div = document.getElementById("produtos-disponiveis");
    div.innerHTML = "";
    produtosDisponiveis.forEach((produto, i) => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 mb-3";
        const card = document.createElement("div");
        card.className = "card h-100 bg-dark text-white border-danger d-flex flex-column";
        const imagem = document.createElement("img");
        imagem.src = imagensPorNome[produto.getNome()] || "img/placeholder.jpg";
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
    alert(`✅ Produto "${produto.getNome()}" adicionado com sucesso!`);
}
function atualizarCarrinho() {
    const lista = document.getElementById("lista-produtos");
    lista.innerHTML = "";
    const produtosAgrupados = {};
    // Agrupa por nome
    // @ts-ignore
    carrinho["produtos"].forEach((produto) => {
        const nome = produto.getNome();
        if (!produtosAgrupados[nome]) {
            produtosAgrupados[nome] = { produto, quantidade: 0 };
        }
        produtosAgrupados[nome].quantidade++;
    });
    Object.values(produtosAgrupados).forEach(({ produto, quantidade }) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        // Imagem
        const img = document.createElement("img");
        img.src = imagensPorNome[produto.getNome()] || "img/placeholder.jpg";
        img.alt = produto.getNome();
        img.style.width = "60px";
        img.style.height = "60px";
        img.className = "me-3 rounded";
        // Info + subtotal
        const info = document.createElement("span");
        const subtotal = produto.calcularPreco() * quantidade;
        info.textContent = `${produto.getNome()} - ${produto.getInfo()} | Qtde: ${quantidade} | Subtotal: R$ ${subtotal.toFixed(2)}`;
        // Botão remover
        const btn = document.createElement("button");
        btn.textContent = "Remover";
        btn.className = "btn btn-sm btn-outline-danger ms-2";
        btn.onclick = () => {
            for (let i = 0; i < quantidade; i++) {
                carrinho.removerProduto(carrinho["produtos"].indexOf(produto));
            }
            atualizarCarrinho();
        };
        li.appendChild(img);
        li.appendChild(info);
        li.appendChild(btn);
        lista.appendChild(li);
    });
    const totalElement = document.getElementById("total");
    const total = carrinho.calcularTotal();
    const totalFinal = cupomAtivo ? total * 0.9 : total;
    totalElement.textContent = `Total: R$ ${totalFinal.toFixed(2)}`;
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
    alert(`✅ Produto "${produto.getNome()}" adicionado com sucesso!`);
    limparCampos();
    alternarFormulario(false);
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
function alternarFormulario(mostrar = true) {
    const formulario = document.getElementById("formulario-personalizado");
    formulario.style.display = mostrar ? "block" : "none";
}
function aplicarCupom() {
    const input = document.getElementById("cupom");
    const cupom = input.value.trim().toUpperCase();
    const descontoMsg = document.getElementById("desconto-msg");
    if (cupom === "MENGAO2025") {
        cupomAtivo = true;
        atualizarCarrinho();
        descontoMsg.textContent = `Cupom aplicado com sucesso! Você ganhou 10% de desconto.`;
        alert("✅ Cupom aplicado com sucesso!");
    }
    else {
        cupomAtivo = false;
        descontoMsg.textContent = "Cupom inválido.";
        alert("❌ Cupom inválido. Tente novamente.");
    }
}
// Exportar para escopo global
window.adicionarProduto = adicionarProduto;
window.removerProduto = removerProduto;
window.adicionarProdutoFixo = adicionarProdutoFixo;
window.atualizarCampoExtra = atualizarCampoExtra;
window.alternarFormulario = alternarFormulario;
window.aplicarCupom = aplicarCupom;
document.addEventListener("DOMContentLoaded", () => {
    atualizarCampoExtra();
    mostrarProdutosDisponiveis();
    alternarFormulario(false);
});
