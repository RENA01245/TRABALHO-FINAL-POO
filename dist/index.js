import { Carrinho } from "./ClasseCarrinho.js";
import { Lanche } from "./ClasseLanche.js";
import { Bebida } from "./ClasseBebida.js";
import { Sobremesa } from "./ClasseSobremesa.js";
const carrinho = new Carrinho();
// Produtos fixos disponíveis
const produtosDisponiveis = [
    new Lanche("Hambúrguer", 15),
    new Lanche("Sanduíche", 12),
    new Bebida("Refrigerante", 7, "500ml"),
    new Bebida("Suco", 8, "300ml"),
    new Sobremesa("Sorvete", 10, "Chocolate"),
    new Sobremesa("Bolo", 9, "Morango")
];
// Mostra os produtos como botões
function mostrarProdutosDisponiveis() {
    const div = document.getElementById("produtos-disponiveis");
    div.innerHTML = "";
    produtosDisponiveis.forEach((produto, i) => {
        const btn = document.createElement("button");
        btn.textContent = `${produto.getNome()} (${produto.getInfo()}) - R$ ${produto.calcularPreco().toFixed(2)}`;
        btn.onclick = () => {
            carrinho.adicionarProduto(produto);
            atualizarCarrinho();
        };
        btn.style.margin = "5px";
        div.appendChild(btn);
    });
}
// Atualiza a lista de produtos no carrinho e o total
function atualizarCarrinho() {
    const lista = document.getElementById("lista-produtos");
    lista.innerHTML = "";
    // @ts-ignore
    carrinho["produtos"].forEach((produto, i) => {
        const li = document.createElement("li");
        li.textContent = `${produto.getNome()} - ${produto.getInfo()} - R$ ${produto.calcularPreco().toFixed(2)} `;
        const btn = document.createElement("button");
        btn.textContent = "Remover";
        btn.onclick = () => {
            removerProduto(i);
        };
        li.appendChild(btn);
        lista.appendChild(li);
    });
    document.getElementById("total").textContent = `Total: R$ ${carrinho.calcularTotal().toFixed(2)}`;
}
// Adiciona produto ao carrinho conforme seleção do usuário
function adicionarProduto() {
    const tipo = document.getElementById("tipo").value;
    const nome = document.getElementById("nome").value;
    const preco = Number(document.getElementById("preco").value);
    const extra = document.getElementById("extra").value;
    let produto;
    if (tipo === "Lanche") {
        produto = new Lanche(nome, preco);
    }
    else if (tipo === "Bebida") {
        produto = new Bebida(nome, preco, extra);
    }
    else if (tipo === "Sobremesa") {
        produto = new Sobremesa(nome, preco, extra);
    }
    else {
        alert("Tipo de produto inválido!");
        return;
    }
    carrinho.adicionarProduto(produto);
    atualizarCarrinho();
    limparCampos();
}
// Remove produto pelo índice
function removerProduto(indice) {
    carrinho.removerProduto(indice);
    atualizarCarrinho();
}
// Limpa os campos do formulário após adicionar
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("extra").value = "";
}
// Atualiza o campo extra conforme o tipo selecionado
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
// Eventos iniciais
document.getElementById("tipo").addEventListener("change", atualizarCampoExtra);
// Expondo funções para o HTML
// @ts-ignore
window.adicionarProduto = adicionarProduto;
// @ts-ignore
window.removerProduto = removerProduto;
// Inicializa o campo extra corretamente ao carregar
atualizarCampoExtra();
// No final do arquivo, chame a função para mostrar os produtos ao carregar a página
mostrarProdutosDisponiveis();
