import { Produto } from "./ClasseProduto";

export class Carrinho {
    private produtos: Produto[] = [];

    public adicionarProduto(produto: Produto): void {
        this.produtos.push(produto);
    }

    public calcularTotal(): number {
        return this.produtos.reduce((total, produto) => total + produto.calcularPreco(), 0);
    }

    public listarProdutos(): void {
        console.log("=== Carrinho de Compras ===\n");
        this.produtos.forEach((produto, index) => {
            console.log(` ${index + 1}. Produto: ${produto.getNome()}`);
            console.log(`    Tipo: ${produto.getInfo()}`);
            console.log(`    Preço Final: R$ ${produto.calcularPreco().toFixed(2)}\n`);
        });
        console.log(` Total da Compra: R$ ${this.calcularTotal().toFixed(2)}\n`);
    }

    public removerProduto(indice: number): void {
        if (indice >= 0 && indice < this.produtos.length) {
            this.produtos.splice(indice, 1);
            console.log("Produto removido com sucesso!");
        } else {
            console.log("Índice inválido.");
        }
    }
}