"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lanche = void 0;
const ClasseProduto_js_1 = require("./ClasseProduto.js");
class Lanche extends ClasseProduto_js_1.Produto {
    constructor(nome, preco) {
        super(nome, preco, "Lanche");
    }
    calcularPreco() {
        return this.preco;
    }
    getInfo() {
        return `Lanche`;
    }
}
exports.Lanche = Lanche;
