import { Produto } from "./ClasseProduto.js";
export class Bebida extends Produto {
    constructor(nome, preco, volume) {
        super(nome, preco, "Bebida");
        this.volume = volume;
    }
    calcularPreco() {
        return this.preco - (this.preco * 0.1);
    }
    getInfo() {
        return `Bebida - ${this.volume}L`;
    }
    static mostrarTiposDisponiveis() {
        Produto.mostrarOpcoes(["Refrigerante", "Suco", "Água"]);
    }
}
