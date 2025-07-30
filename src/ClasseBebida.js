"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bebida = void 0;
const ClasseProduto_js_1 = require("./ClasseProduto.js");
class Bebida extends ClasseProduto_js_1.Produto {
    constructor(nome, preco, tamanho) {
        super(nome, preco, "Bebida");
        this.tamanho = tamanho;
    }
    calcularPreco() {
        return this.preco;
    }
    getInfo() {
        return `Bebida - Tamanho: ${this.tamanho}`;
    }
}
exports.Bebida = Bebida;
