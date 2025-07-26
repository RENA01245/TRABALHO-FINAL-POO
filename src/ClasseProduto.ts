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

    static mostrarOpcoes(opcoes: string[]): void {
        console.log("Opções disponíveis:");
        opcoes.forEach((opcao, index) => {
            console.log(`${index + 1}. ${opcao}`);
        });
    }
    
    abstract calcularPreco(): number;
    abstract getInfo(): string;
}