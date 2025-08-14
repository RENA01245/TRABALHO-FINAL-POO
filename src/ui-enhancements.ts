document.addEventListener("DOMContentLoaded", () => {
  // Voltar ao topo
  const topoBtn = document.getElementById("voltar-topo") as HTMLButtonElement;
  window.addEventListener("scroll", () => {
    topoBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
  topoBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Copiar cupom
  const copiarBtn = document.getElementById("copiar-cupom") as HTMLButtonElement;
  if (copiarBtn) {
    copiarBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(copiarBtn.dataset.cupom || "");
      copiarBtn.textContent = "Copiado!";
      copiarBtn.disabled = true;
      setTimeout(() => {
        copiarBtn.textContent = "Copiar";
        copiarBtn.disabled = false;
      }, 2000);
    });
  }

  // Tema claro/escuro
  const temaBtn = document.getElementById("alternar-tema") as HTMLButtonElement;
  if (localStorage.getItem("tema") === "dark") {
    document.body.classList.add("dark-theme");
  }
  temaBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("tema", document.body.classList.contains("dark-theme") ? "dark" : "light");
  });
});
