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

const imagensPorNome: Record<string, string> = {
  "Hambúrguer": "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg",
  "Sanduíche": "https://cdn.pixabay.com/photo/2016/04/24/17/48/sandwich-1341011_1280.jpg",
  "Refrigerante": "https://cdn.pixabay.com/photo/2017/06/02/18/24/cola-2363138_1280.jpg",
  "Suco": "https://cdn.pixabay.com/photo/2016/03/05/19/02/orange-juice-1234567_1280.jpg",
  "Sorvete": "https://cdn.pixabay.com/photo/2015/04/08/13/13/ice-cream-712978_1280.jpg",
  "Bolo": "https://cdn.pixabay.com/photo/2017/01/06/19/15/cake-1958416_1280.jpg"
};

let cupomAtivo = false;

function mostrarProdutosDisponiveis() {
  const div = document.getElementById("produtos-disponiveis")!;
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

    const btn = cardBody.querySelector("button")!;
    btn.addEventListener("click", () => adicionarProdutoFixo(i));

    card.appendChild(imagem);
    card.appendChild(cardBody);
    col.appendChild(card);
    div.appendChild(col);
  });
}

function adicionarProdutoFixo(i: number) {
  const produto = produtosDisponiveis[i];
  carrinho.adicionarProduto(produto);
  atualizarCarrinho();
  alert(`✅ Produto "${produto.getNome()}" adicionado com sucesso!`);
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-produtos")!;
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

  const totalElement = document.getElementById("total")!;
  const total = carrinho.calcularTotal();
  const totalFinal = cupomAtivo ? total * 0.9 : total;
  totalElement.textContent = `Total: R$ ${totalFinal.toFixed(2)}`;
}

function adicionarProduto() {
  const tipo = (document.getElementById("tipo") as HTMLSelectElement).value;
  const nome = (document.getElementById("nome") as HTMLInputElement).value;
  const preco = Number((document.getElementById("preco") as HTMLInputElement).value);
  const extra = (document.getElementById("extra") as HTMLInputElement).value;

  let produto;
  if (tipo === "Lanche") produto = new Lanche(nome, preco);
  else if (tipo === "Bebida") produto = new Bebida(nome, preco, extra);
  else if (tipo === "Sobremesa") produto = new Sobremesa(nome, preco, extra);
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

function removerProduto(indice: number) {
  carrinho.removerProduto(indice);
  atualizarCarrinho();
}

function limparCampos() {
  (document.getElementById("nome") as HTMLInputElement).value = "";
  (document.getElementById("preco") as HTMLInputElement).value = "";
  (document.getElementById("extra") as HTMLInputElement).value = "";
}

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

function alternarFormulario(mostrar: boolean = true) {
  const formulario = document.getElementById("formulario-personalizado") as HTMLElement;
  formulario.style.display = mostrar ? "block" : "none";
}

function aplicarCupom() {
  const input = document.getElementById("cupom") as HTMLInputElement;
  const cupom = input.value.trim().toUpperCase();
  const descontoMsg = document.getElementById("desconto-msg") as HTMLElement;

  if (cupom === "MENGAO2025") {
    cupomAtivo = true;
    atualizarCarrinho();
    descontoMsg.textContent = `Cupom aplicado com sucesso! Você ganhou 10% de desconto.`;
    alert("✅ Cupom aplicado com sucesso!");
  } else {
    cupomAtivo = false;
    descontoMsg.textContent = "Cupom inválido.";
    alert("❌ Cupom inválido. Tente novamente.");
  }
}

// Exportar para escopo global
(window as any).adicionarProduto = adicionarProduto;
(window as any).removerProduto = removerProduto;
(window as any).adicionarProdutoFixo = adicionarProdutoFixo;
(window as any).atualizarCampoExtra = atualizarCampoExtra;
(window as any).alternarFormulario = alternarFormulario;
(window as any).aplicarCupom = aplicarCupom;

document.addEventListener("DOMContentLoaded", () => {
  atualizarCampoExtra();
  mostrarProdutosDisponiveis();
  alternarFormulario(false);
  
});
