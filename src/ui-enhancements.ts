// 1. Botão "Voltar ao Topo"
function criarBotaoTopo() {
  const btn = document.createElement("button");
  btn.id = "btn-topo";
  btn.textContent = "↑ Topo";
  btn.style.position = "fixed";
  btn.style.right = "24px";
  btn.style.bottom = "24px";
  btn.style.padding = "12px 18px";
  btn.style.background = "#d90429";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.borderRadius = "50px";
  btn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
  btn.style.cursor = "pointer";
  btn.style.opacity = "0";
  btn.style.transition = "opacity 0.4s";
  btn.style.zIndex = "999";
  btn.style.display = "none";
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.style.display = "block";
      setTimeout(() => btn.style.opacity = "1", 10);
    } else {
      btn.style.opacity = "0";
      setTimeout(() => btn.style.display = "none", 400);
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 2. Botão "Copiar" (Clipboard)
function configurarBotaoCopiar(idBotao: string, texto: string) {
  const btn = document.getElementById(idBotao);
  if (!btn) return;
  btn.addEventListener("click", () => {
    navigator.clipboard.writeText(texto).then(() => {
      btn.textContent = "Copiado!";
      btn.setAttribute("disabled", "true");
      setTimeout(() => {
        btn.textContent = "Copiar";
        btn.removeAttribute("disabled");
      }, 2000);
    });
  });
}

// 3. Alternador de Tema (Claro/Escuro) com persistência
function alternadorTema() {
  const btn = document.getElementById("alternar-tema");
  const aplicarTema = (tema: string) => {
    if (tema === "dark") document.body.classList.add("dark-theme");
    else document.body.classList.remove("dark-theme");
  };
  // Aplica tema salvo antes de renderizar
  const temaSalvo = localStorage.getItem("theme");
  if (temaSalvo) aplicarTema(temaSalvo);

  if (btn) {
    btn.addEventListener("click", () => {
      const escuro = !document.body.classList.contains("dark-theme");
      aplicarTema(escuro ? "dark" : "light");
      localStorage.setItem("theme", escuro ? "dark" : "light");
    });
  }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  criarBotaoTopo();
  alternadorTema();
  // Exemplo de botão copiar para cupom
  configurarBotaoCopiar("copiar-cupom", "MENGAO2025");
  // Você pode chamar configurarBotaoCopiar para outros botões também
});