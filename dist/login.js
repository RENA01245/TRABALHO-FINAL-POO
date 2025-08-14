"use strict";
function mostrarErro(mensagem) {
    const erroDiv = document.getElementById("login-erro");
    if (erroDiv) {
        erroDiv.textContent = mensagem;
        erroDiv.style.display = "block";
    }
}
function limparErro() {
    const erroDiv = document.getElementById("login-erro");
    if (erroDiv) {
        erroDiv.textContent = "";
        erroDiv.style.display = "none";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    if (!form)
        return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        limparErro();
        const usuario = document.getElementById("usuario").value.trim();
        const senha = document.getElementById("senha").value;
        // Validação do usuário
        if (!usuario) {
            mostrarErro("Usuário não pode estar vazio.");
            return;
        }
        if (usuario.length > 15) {
            mostrarErro("Usuário deve ter no máximo 15 caracteres.");
            return;
        }
        // Validação da senha
        if (!senha) {
            mostrarErro("Senha não pode estar vazia.");
            return;
        }
        if (senha.length < 8) {
            mostrarErro("Senha deve ter pelo menos 8 caracteres.");
            return;
        }
        if ((senha.match(/[0-9]/g) || []).length < 2) {
            mostrarErro("Senha deve conter pelo menos 2 números.");
            return;
        }
        if (!senha.match(/[!@#$%^&*]/)) {
            mostrarErro("Senha deve conter pelo menos 1 caractere especial (!@#$%^&*).");
            return;
        }
        if (!senha.match(/[A-Z]/)) {
            mostrarErro("Senha deve conter pelo menos 1 letra maiúscula.");
            return;
        }
        if (!senha.match(/[a-z]/)) {
            mostrarErro("Senha deve conter pelo menos 1 letra minúscula.");
            return;
        }
        // Se passou todas as validações
        form.submit();
    });
});
