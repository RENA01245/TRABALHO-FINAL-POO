import { Carrinho } from "./ClasseCarrinho.js";
import { Lanche } from "./ClasseLanche.js";
import { Bebida } from "./ClasseBebida.js";
import { Sobremesa } from "./ClasseSobremesa.js";
import { iniciarCarousel } from "./carousel.js";
import { filtrarProdutos } from "./filter.js";

document.addEventListener("DOMContentLoaded", () => {
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

  const imagensPorNome: Record<string,string> = {
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

  iniciarCarousel(produtosDisponiveis, imagensPorNome, carrinho);

  // Filtros
  const divProdutos = document.getElementById("produtos-disponiveis")!;
  const listaCarrinho = document.getElementById("lista-produtos")!;
  const totalElement = document.getElementById("total")!;
  const descontoMsg = document.getElementById("desconto-msg")!;
  const inputCupom = document.getElementById("cupom") as HTMLInputElement;

  let cupomAtivo = false;

  function mostrarProdutos(filtro:string="all") {
    divProdutos.innerHTML = "";
    filtrarProdutos(produtosDisponiveis, filtro)
      .forEach(prod => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 mb-3";

        const card = document.createElement("div");
        card.className = "card h-100 bg-dark text-white border-danger d-flex flex-column";

        const img = document.createElement("img");
        img.src = imagensPorNome[prod.getNome()] || "img/placeholder.jpg";
        img.alt = prod.getNome();
        img.className = "card-img-top";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column justify-content-between flex-grow-1";
        cardBody.innerHTML = `
          <div>
            <h5 class="card-title">${prod.getNome()}</h5>
            <p class="card-text">${prod.getInfo()}</p>
            <p class="card-text fw-bold text-danger">R$ ${prod.calcularPreco().toFixed(2)}</p>
          </div>
          <button class="btn btn-danger mt-auto">Adicionar</button>
        `;

        const btn = cardBody.querySelector("button")!;
        btn.addEventListener("click",()=>{ carrinho.adicionarProduto(prod); atualizarCarrinho(); alert(`✅ Produto "${prod.getNome()}" adicionado!`); });

        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        divProdutos.appendChild(col);
      });
  }

  function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";
    const produtosAgrupados: Record<string,{produto:any,quantidade:number}> = {};
    carrinho["produtos"].forEach(prod=>{
      const nome = prod.getNome();
      if(!produtosAgrupados[nome]) produtosAgrupados[nome]={produto:prod,quantidade:0};
      produtosAgrupados[nome].quantidade++;
    });

    Object.values(produtosAgrupados).forEach(({produto,quantidade})=>{
      const li = document.createElement("li");
      li.className="list-group-item d-flex justify-content-between align-items-center";

      const img = document.createElement("img");
      img.src = imagensPorNome[produto.getNome()] || "img/placeholder.jpg";
      img.alt = produto.getNome();

      const info = document.createElement("span");
      info.textContent = `${produto.getNome()} - ${produto.getInfo()} | Qtde: ${quantidade} | Subtotal: R$ ${(produto.calcularPreco()*quantidade).toFixed(2)}`;

      const btn = document.createElement("button");
      btn.textContent = "Remover";
      btn.className = "btn btn-sm btn-outline-danger ms-2";
      btn.onclick=()=>{
        for(let i=0;i<quantidade;i++){ carrinho.removerProduto(carrinho["produtos"].indexOf(prod)); }
        atualizarCarrinho();
      }

      li.appendChild(img);
      li.appendChild(info);
      li.appendChild(btn);
      listaCarrinho.appendChild(li);
    });

    const total = carrinho.calcularTotal();
    totalElement.textContent = `Total: R$ ${(cupomAtivo?total*0.9:total).toFixed(2)}`;
  }

  // Filtros
  document.querySelectorAll("[data-filter]").forEach(btn=>{
    btn.addEventListener("click",()=>{ mostrarProdutos((btn as HTMLElement).dataset.filter!); });
  });

  // Cupom
  document.getElementById("aplicar-cupom")!.addEventListener("click",()=>{
    const cupom = inputCupom.value.trim().toUpperCase();
    if(cupom==="MENGAO2025"){ cupomAtivo=true; descontoMsg.textContent="Cupom aplicado! 10% de desconto.";}
    else { cupomAtivo=false; descontoMsg.textContent="Cupom inválido.";}
    atualizarCarrinho();
  });

  document.getElementById("copiar-cupom")!.addEventListener("click",()=>{
    navigator.clipboard.writeText("MENGAO2025");
    alert("📋 Cupom copiado: MENGAO2025");
  });

  // Alternar tema
  document.getElementById("alternar-tema")!.addEventListener("click",()=>{
    document.body.classList.toggle("dark-theme");
  });

  function atualizarMenuLogin() {
    const menu = document.getElementById("menu-login");
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (menu) {
      if (usuarioLogado) {
        menu.innerHTML = `
          <span>Bem-vindo, ${usuarioLogado}</span>
          <a href="#" id="logout-link">Sair</a>
        `;
        document.getElementById("logout-link")?.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("usuarioLogado");
          atualizarMenuLogin();
        });
      } else {
        menu.innerHTML = `<a href="login.html">Login</a>`;
      }
    }
  }

  document.addEventListener("DOMContentLoaded", atualizarMenuLogin);

  mostrarProdutos();
});
