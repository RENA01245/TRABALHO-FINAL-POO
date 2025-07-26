import { Produto } from "./ClasseProduto.js";
export class Bebida extends Produto {
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
