import { Lanche } from "./ClasseLanche.js";
import { Bebida } from "./ClasseBebida.js";
import { Sobremesa } from "./ClasseSobremesa.js";
import { Carrinho } from "./ClasseCarrinho.js";

export function iniciarCarousel(
  produtosDisponiveis: (Lanche | Bebida | Sobremesa)[],
  imagensPorNome: Record<string, string>,
  carrinho: Carrinho
) {
  const track = document.getElementById("carousel-track")!;
  const prevBtn = document.getElementById("prevBtn")!;
  const nextBtn = document.getElementById("nextBtn")!;
  const slidesToShow = 3;
  let currentIndex = 0;
  let intervalId: number;

  // Criar slides
  produtosDisponiveis.forEach(prod => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";

    const card = document.createElement("div");
    card.className = "card bg-dark text-white border-danger";

    const img = document.createElement("img");
    img.src = imagensPorNome[prod.getNome()] || "img/placeholder.jpg";
    img.alt = prod.getNome();
    img.className = "card-img-top";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body text-center";
    cardBody.innerHTML = `
      <h5 class="card-title">${prod.getNome()}</h5>
      <p class="card-text">${prod.getInfo()}</p>
      <p class="card-text fw-bold text-danger">R$ ${prod.calcularPreco().toFixed(2)}</p>
    `;

    const btn = document.createElement("button");
    btn.textContent = "Adicionar";
    btn.className = "btn btn-danger";
    btn.onclick = () => {
      carrinho.adicionarProduto(prod);
      alert(`✅ Produto "${prod.getNome()}" adicionado!`);
    };

    cardBody.appendChild(btn);
    card.appendChild(img);
    card.appendChild(cardBody);
    slide.appendChild(card);
    track.appendChild(slide);
  });

  const slides = Array.from(track.children) as HTMLElement[];
  const totalSlides = slides.length;

  // Atualizar posição do carousel
  function atualizarCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width + 20; // 20px gap
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Próximo slide
  function nextSlide() {
    currentIndex++;
    if (currentIndex > totalSlides - slidesToShow) currentIndex = 0;
    atualizarCarousel();
  }

  // Slide anterior
  function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) currentIndex = totalSlides - slidesToShow;
    atualizarCarousel();
  }

  // Iniciar autoplay
  function startAutoPlay() {
    clearInterval(intervalId);
    intervalId = window.setInterval(nextSlide, 5000);
  }

  // Eventos botões
  nextBtn.addEventListener("click", () => { nextSlide(); startAutoPlay(); });
  prevBtn.addEventListener("click", () => { prevSlide(); startAutoPlay(); });

  // Pausa inteligente no hover
  track.parentElement!.addEventListener("mouseenter", () => clearInterval(intervalId));
  track.parentElement!.addEventListener("mouseleave", startAutoPlay);

  atualizarCarousel();
  startAutoPlay();
}
