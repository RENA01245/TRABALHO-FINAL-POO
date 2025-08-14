"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const contador = document.getElementById("contador");
    form.mensagem.addEventListener("input", () => {
        const length = form.mensagem.value.length;
        contador.textContent = `${length} / 500`;
        contador.style.color = length > 500 ? "red" : "black";
    });
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nome = form.nome.value.trim();
        const email = form.email.value.trim();
        const assunto = form.assunto.value.trim();
        const mensagem = form.mensagem.value.trim();
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!nome || !emailValido.test(email) || !assunto || mensagem.length < 10) {
            alert("Preencha todos os campos corretamente!");
            return;
        }
        alert("Mensagem enviada com sucesso!");
        form.reset();
    });
});
