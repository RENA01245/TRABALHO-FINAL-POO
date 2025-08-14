document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form") as HTMLFormElement;
  const contador = document.getElementById("contador") as HTMLElement;

  (form.mensagem as HTMLTextAreaElement).addEventListener("input", () => {
    const length = (form.mensagem as HTMLTextAreaElement).value.length;
    contador.textContent = `${length} / 500`;
    contador.style.color = length > 500 ? "red" : "black";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = (form.nome as HTMLInputElement).value.trim();
    const email = (form.email as HTMLInputElement).value.trim();
    const assunto = (form.assunto as HTMLInputElement).value.trim();
    const mensagem = (form.mensagem as HTMLTextAreaElement).value.trim();

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome || !emailValido.test(email) || !assunto || mensagem.length < 10) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    alert("Mensagem enviada com sucesso!");
    form.reset();
  });
});
