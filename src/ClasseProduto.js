"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produto = void 0;
class Produto {
    constructor(nome, preco, tipo) {
        this.nome = nome;
        this.preco = preco;
        this.tipo = tipo;
    }
    getNome() {
        return this.nome;
    }
    getPreco() {
        return this.preco;
    }
    getTipo() {
        return this.tipo;
    }
    static mostrarOpcoes(opcoes) {
        console.log("Opções disponíveis:");
        opcoes.forEach((opcao, index) => {
            console.log(`${index + 1}. ${opcao}`);
        });
    }
}
exports.Produto = Produto;
