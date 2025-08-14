export function filtrarProdutos(produtos, filtro) {
    if (filtro === "all")
        return produtos;
    return produtos.filter(p => p.constructor.name === filtro);
}
export function iniciarFiltroProdutos(produtosDisponiveis, imagensPorNome, carrinho) {
    document.addEventListener("DOMContentLoaded", () => {
        const divProdutos = document.getElementById("produtos-disponiveis");
        const botoes = document.querySelectorAll("[data-filter]");
        const alternarTemaBtn = document.getElementById("alternar-tema");
        function mostrarProdutos(filtro = "all") {
            divProdutos.innerHTML = "";
            filtrarProdutos(produtosDisponiveis, filtro).forEach(prod => {
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
                const btn = cardBody.querySelector("button");
                btn.addEventListener("click", () => {
                    carrinho.adicionarProduto(prod);
                    alert(`✅ Produto "${prod.getNome()}" adicionado!`);
                });
                card.appendChild(img);
                card.appendChild(cardBody);
                col.appendChild(card);
                divProdutos.appendChild(col);
            });
        }
        botoes.forEach(btn => {
            btn.addEventListener("click", () => {
                const filtro = btn.dataset.filter;
                mostrarProdutos(filtro);
            });
        });
        // Alternar tema
        if (alternarTemaBtn) {
            alternarTemaBtn.addEventListener("click", () => {
                document.body.classList.toggle("dark-theme");
            });
        }
        // Mostrar todos inicialmente
        mostrarProdutos();
    });
}
