import { Produto } from "./ClasseProduto.js";

export class Lanche extends Produto {
    constructor(nome: string, preco: number) {
        super(nome, preco, "Lanche");
    }

    public calcularPreco(): number {
        return this.preco;
    }

    public getInfo(): string {
        return `Lanche`;
    }
    
    public static mostrarTiposDisponiveis(): void {
        Produto.mostrarOpcoes(["Hambúrguer", "Sanduíche", "Wrap"]);
    }

}