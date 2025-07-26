import { Produto } from "./ClasseProduto.js";

export class Bebida extends Produto {
    private tamanho: string;

    constructor(nome: string, preco: number, tamanho: string) {
        super(nome, preco, "Bebida");
        this.tamanho = tamanho;
    }

    public calcularPreco(): number {
        return this.preco;
    }

    public getInfo(): string {
        return `Bebida - Tamanho: ${this.tamanho}`;
    }
}