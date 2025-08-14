document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form") as HTMLFormElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const usuario = (form.usuario as HTMLInputElement).value.trim();
    const senha = (form.senha as HTMLInputElement).value.trim();

    const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!usuario || usuario.length > 15) {
      alert("Usuário inválido.");
      return;
    }
    if (!senhaForte.test(senha)) {
      alert("Senha inválida.");
      return;
    }

    localStorage.setItem("usuarioLogado", usuario);
    window.location.href = "index.html";
  });
});