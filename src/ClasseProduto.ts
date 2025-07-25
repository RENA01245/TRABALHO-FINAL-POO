export abstract class Produto {
    protected nome: string;
    protected preco: number;
    protected tipo: string; // Novo atributo

    constructor(nome: string, preco: number, tipo: string) {
        this.nome = nome;
        this.preco = preco;
        this.tipo = tipo;
    }

    public getNome(): string {
        return this.nome;
    }

    public getPreco(): number {
        return this.preco;
    }

    public getTipo(): string {
        return this.tipo;
    }

    abstract calcularPreco(): number;
    abstract getInfo(): string;
}