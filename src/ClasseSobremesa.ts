import { Produto } from "./ClasseProduto.js";

export class Sobremesa extends Produto {
    private sabor: string;

    constructor(nome: string, preco: number, sabor: string) {
        super(nome, preco, "Sobremesa");
        this.sabor = sabor;
    }

    public calcularPreco(): number {
        return this.preco + 2;
    }

    public getInfo(): string {
        return `Sobremesa - Sabor: ${this.sabor}`;
    }

}