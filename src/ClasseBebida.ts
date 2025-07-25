import { Produto } from "./ClasseProduto.js";

export class Bebida extends Produto {
    private volume: number;

    constructor(nome: string, preco: number, volume: number) {
        super(nome, preco, "Bebida");
        this.volume = volume;
    }

    public calcularPreco(): number {
        return this.preco - (this.preco * 0.1);
    }

    public getInfo(): string {
        return `Bebida - ${this.volume}L`;
    }
}