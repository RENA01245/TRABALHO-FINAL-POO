import { Produto } from "./ClasseProduto.js";
export class Lanche extends Produto {
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
