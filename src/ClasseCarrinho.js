"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carrinho = void 0;
class Carrinho {
    constructor() {
        this.produtos = [];
    }
    adicionarProduto(produto) {
        this.produtos.push(produto);
    }
    calcularTotal() {
        return this.produtos.reduce((total, produto) => total + produto.calcularPreco(), 0);
    }
    listarProdutos() {
        console.log("=== Carrinho de Compras ===\n");
        this.produtos.forEach((produto, index) => {
            console.log(` ${index + 1}. Produto: ${produto.getNome()}`);
            console.log(`    Tipo: ${produto.getInfo()}`);
            console.log(`    Preço Final: R$ ${produto.calcularPreco().toFixed(2)}\n`);
        });
        console.log(` Total da Compra: R$ ${this.calcularTotal().toFixed(2)}\n`);
    }
    removerProduto(indice) {
        if (indice >= 0 && indice < this.produtos.length) {
            this.produtos.splice(indice, 1);
            console.log("Produto removido com sucesso!");
        }
        else {
            console.log("Índice inválido.");
        }
    }
}
exports.Carrinho = Carrinho;
