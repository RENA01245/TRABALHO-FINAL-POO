import { Carrinho } from "./ClasseCarrinho.js";
import { Lanche } from "./ClasseLanche.js";
import { Bebida } from "./ClasseBebida.js";
import { Sobremesa } from "./ClasseSobremesa.js";

// Instancia o carrinho de compras
const carrinho = new Carrinho();

// Produtos fixos disponíveis para seleção rápida
const produtosDisponiveis = [
    new Lanche("Hambúrguer", 15),
    new Lanche("Sanduíche", 12),
    new Bebida("Refrigerante", 7, "500ml"),
    new Bebida("Suco", 8, "300ml"),
    new Sobremesa("Sorvete", 10, "Chocolate"),
    new Sobremesa("Bolo", 9, "Morango")
];

// Exibe os produtos fixos como botões na tela
function mostrarProdutosDisponiveis() {
    const div = document.getElementById("produtos-disponiveis")!;
    div.innerHTML = "";
    produtosDisponiveis.forEach((produto, i) => {
        const btn = document.createElement("button");
        btn.textContent = `${produto.getNome()} (${produto.getInfo()}) - R$ ${produto.calcularPreco().toFixed(2)}`;
        btn.onclick = () => {
            carrinho.adicionarProduto(produto); // Adiciona ao carrinho ao clicar
            atualizarCarrinho(); // Atualiza a lista do carrinho na tela
        };
        btn.style.margin = "5px";
        div.appendChild(btn);
    });
}

// Atualiza a lista de produtos no carrinho e o valor total
function atualizarCarrinho() {
    const lista = document.getElementById("lista-produtos")!;
    lista.innerHTML = "";
    // Acessa os produtos do carrinho e exibe cada um como item da lista
    // @ts-ignore
    carrinho["produtos"].forEach((produto, i) => {
        const li = document.createElement("li");
        li.textContent = `${produto.getNome()} - ${produto.getInfo()} - R$ ${produto.calcularPreco().toFixed(2)} `;
        // Botão para remover o produto do carrinho
        const btn = document.createElement("button");
        btn.textContent = "Remover";
        btn.onclick = () => {
            removerProduto(i);
        };
        li.appendChild(btn);
        lista.appendChild(li);
    });
    // Atualiza o valor total do carrinho
    (document.getElementById("total") as HTMLElement).textContent = `Total: R$ ${carrinho.calcularTotal().toFixed(2)}`;
}

// Adiciona produto personalizado ao carrinho (via formulário)
function adicionarProduto() {
    const tipo = (document.getElementById("tipo") as HTMLSelectElement).value;
    const nome = (document.getElementById("nome") as HTMLInputElement).value;
    const preco = Number((document.getElementById("preco") as HTMLInputElement).value);
    const extra = (document.getElementById("extra") as HTMLInputElement).value;

    let produto;
    // Cria o produto conforme o tipo selecionado
    if (tipo === "Lanche") {
        produto = new Lanche(nome, preco);
    } else if (tipo === "Bebida") {
        produto = new Bebida(nome, preco, extra);
    } else if (tipo === "Sobremesa") {
        produto = new Sobremesa(nome, preco, extra);
    } else {
        alert("Tipo de produto inválido!");
        return;
    }

    carrinho.adicionarProduto(produto); // Adiciona ao carrinho
    atualizarCarrinho(); // Atualiza a tela
    limparCampos(); // Limpa o formulário
}

// Remove produto do carrinho pelo índice
function removerProduto(indice: number) {
    carrinho.removerProduto(indice);
    atualizarCarrinho();
}

// Limpa os campos do formulário após adicionar produto
function limparCampos() {
    (document.getElementById("nome") as HTMLInputElement).value = "";
    (document.getElementById("preco") as HTMLInputElement).value = "";
    (document.getElementById("extra") as HTMLInputElement).value = "";
}

// Atualiza o campo "extra" do formulário conforme o tipo selecionado
function atualizarCampoExtra() {
    const tipo = (document.getElementById("tipo") as HTMLSelectElement).value;
    const extraLabel = document.getElementById("extra-label")!;
    const extraInput = document.getElementById("extra") as HTMLInputElement;

    if (tipo === "Bebida") {
        extraLabel.textContent = "Tamanho:";
        extraInput.style.display = "inline";
        extraInput.placeholder = "Ex: Grande, 500ml";
    } else if (tipo === "Sobremesa") {
        extraLabel.textContent = "Sabor:";
        extraInput.style.display = "inline";
        extraInput.placeholder = "Ex: Chocolate";
    } else {
        extraLabel.textContent = "";
        extraInput.style.display = "none";
        extraInput.placeholder = "";
    }
}

// Evento para atualizar o campo extra quando o tipo muda
(document.getElementById("tipo") as HTMLSelectElement).addEventListener("change", atualizarCampoExtra);

// Expondo funções para o HTML (para funcionar com onclick no HTML)
window.adicionarProduto = adicionarProduto;
window.removerProduto = removerProduto;

// Inicializa o campo extra corretamente ao carregar a página
atualizarCampoExtra();

// Mostra os produtos fixos ao carregar a página
mostrarProdutosDisponiveis();




