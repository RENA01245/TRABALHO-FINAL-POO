"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sobremesa = void 0;
const ClasseProduto_js_1 = require("./ClasseProduto.js");
class Sobremesa extends ClasseProduto_js_1.Produto {
    constructor(nome, preco, sabor) {
        super(nome, preco, "Sobremesa");
        this.sabor = sabor;
    }
    calcularPreco() {
        return this.preco + 2;
    }
    getInfo() {
        return `Sobremesa - Sabor: ${this.sabor}`;
    }
}
exports.Sobremesa = Sobremesa;
