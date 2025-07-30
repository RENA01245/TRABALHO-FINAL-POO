import { Produto } from "./ClasseProduto.js";
export class Sobremesa extends Produto {
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
